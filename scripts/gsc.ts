/**
 * Google Search Console utilities
 * Usage:
 *   npx tsx scripts/gsc.ts submit-sitemap
 *   npx tsx scripts/gsc.ts request-indexing <url>
 *   npx tsx scripts/gsc.ts indexing-status
 *   npx tsx scripts/gsc.ts performance [days]
 */

import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';

const SITE_URL = 'https://getfencefind.com';
// Search Console requires the site URL in a specific format
const SITE_PROPERTY = 'sc-domain:getfencefind.com'; // or 'https://getfencefind.com/'

const KEY_PATH = path.join(__dirname, '..', 'gsc-service-account.json');

async function getAuth() {
  const key = JSON.parse(fs.readFileSync(KEY_PATH, 'utf8'));
  const auth = new google.auth.GoogleAuth({
    credentials: key,
    scopes: [
      'https://www.googleapis.com/auth/webmasters',
      'https://www.googleapis.com/auth/webmasters.readonly',
      'https://www.googleapis.com/auth/indexing',
    ],
  });
  return auth;
}

async function submitSitemap() {
  const auth = await getAuth();
  const searchconsole = google.searchconsole({ version: 'v1', auth });

  const sitemapUrl = `${SITE_URL}/sitemap.xml`;

  try {
    await searchconsole.sitemaps.submit({
      siteUrl: SITE_PROPERTY,
      feedpath: sitemapUrl,
    });
    console.log(`✅ Sitemap submitted: ${sitemapUrl}`);
  } catch (e: any) {
    // Try alternate site URL format
    try {
      await searchconsole.sitemaps.submit({
        siteUrl: `${SITE_URL}/`,
        feedpath: sitemapUrl,
      });
      console.log(`✅ Sitemap submitted: ${sitemapUrl}`);
    } catch (e2: any) {
      console.error('❌ Failed to submit sitemap:', e2.message);
      console.error('Make sure the service account has access to the property in Search Console');
    }
  }
}

async function requestIndexing(url: string) {
  const auth = await getAuth();
  const indexing = google.indexing({ version: 'v3', auth });

  try {
    const res = await indexing.urlNotifications.publish({
      requestBody: {
        url,
        type: 'URL_UPDATED',
      },
    });
    console.log(`✅ Indexing requested: ${url}`, res.data);
  } catch (e: any) {
    console.error(`❌ Failed for ${url}:`, e.message);
  }
}

async function batchRequestIndexing(urls: string[]) {
  console.log(`Requesting indexing for ${urls.length} URLs...`);
  let success = 0;
  let failed = 0;

  for (const url of urls) {
    try {
      await requestIndexing(url);
      success++;
      // Rate limit: ~1 request per second
      await new Promise(r => setTimeout(r, 1200));
    } catch {
      failed++;
    }
  }

  console.log(`\nDone: ${success} succeeded, ${failed} failed`);
}

async function getPerformance(days: number = 30) {
  const auth = await getAuth();
  const searchconsole = google.searchconsole({ version: 'v1', auth });

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  try {
    // Try domain property first, then URL prefix
    let res;
    try {
      res = await searchconsole.searchanalytics.query({
        siteUrl: SITE_PROPERTY,
        requestBody: {
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
          dimensions: ['query'],
          rowLimit: 25,
        },
      });
    } catch {
      res = await searchconsole.searchanalytics.query({
        siteUrl: `${SITE_URL}/`,
        requestBody: {
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
          dimensions: ['query'],
          rowLimit: 25,
        },
      });
    }

    console.log(`\n📊 Search Performance (last ${days} days)\n`);

    if (!res.data.rows || res.data.rows.length === 0) {
      console.log('No data yet — Google may need a few days to collect data for new properties.');
      return;
    }

    console.log('Query'.padEnd(50) + 'Clicks'.padStart(8) + 'Impr'.padStart(8) + 'CTR'.padStart(8) + 'Pos'.padStart(8));
    console.log('-'.repeat(82));

    for (const row of res.data.rows) {
      const query = (row.keys?.[0] || '').substring(0, 48);
      console.log(
        query.padEnd(50) +
        String(row.clicks || 0).padStart(8) +
        String(row.impressions || 0).padStart(8) +
        ((row.ctr || 0) * 100).toFixed(1).padStart(7) + '%' +
        (row.position || 0).toFixed(1).padStart(8)
      );
    }

    // Also get top pages
    let pagesRes;
    try {
      pagesRes = await searchconsole.searchanalytics.query({
        siteUrl: SITE_PROPERTY,
        requestBody: {
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
          dimensions: ['page'],
          rowLimit: 20,
        },
      });
    } catch {
      pagesRes = await searchconsole.searchanalytics.query({
        siteUrl: `${SITE_URL}/`,
        requestBody: {
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
          dimensions: ['page'],
          rowLimit: 20,
        },
      });
    }

    if (pagesRes.data.rows && pagesRes.data.rows.length > 0) {
      console.log('\n\n📄 Top Pages\n');
      console.log('Page'.padEnd(60) + 'Clicks'.padStart(8) + 'Impr'.padStart(8));
      console.log('-'.repeat(76));

      for (const row of pagesRes.data.rows) {
        const page = (row.keys?.[0] || '').replace(SITE_URL, '').substring(0, 58);
        console.log(
          page.padEnd(60) +
          String(row.clicks || 0).padStart(8) +
          String(row.impressions || 0).padStart(8)
        );
      }
    }

  } catch (e: any) {
    console.error('❌ Failed to get performance data:', e.message);
  }
}

async function checkIndexingStatus() {
  const auth = await getAuth();
  const searchconsole = google.searchconsole({ version: 'v1', auth });

  try {
    let res;
    try {
      res = await searchconsole.sitemaps.list({ siteUrl: SITE_PROPERTY });
    } catch {
      res = await searchconsole.sitemaps.list({ siteUrl: `${SITE_URL}/` });
    }

    console.log('\n📋 Sitemaps\n');
    if (res.data.sitemap) {
      for (const sm of res.data.sitemap) {
        console.log(`${sm.path}`);
        console.log(`  Last submitted: ${sm.lastSubmitted}`);
        console.log(`  Last downloaded: ${sm.lastDownloaded}`);
        console.log(`  Pending: ${sm.isPending ? 'Yes' : 'No'}`);
        console.log(`  Warnings: ${sm.warnings || 0}`);
        console.log(`  Errors: ${sm.errors || 0}`);
        if (sm.contents) {
          for (const c of sm.contents) {
            console.log(`  ${c.type}: ${c.submitted} submitted, ${c.indexed} indexed`);
          }
        }
        console.log();
      }
    } else {
      console.log('No sitemaps found. Submit one first.');
    }
  } catch (e: any) {
    console.error('❌ Failed:', e.message);
  }
}

// ─── CLI ───
const command = process.argv[2];

switch (command) {
  case 'submit-sitemap':
    submitSitemap();
    break;

  case 'request-indexing': {
    const url = process.argv[3];
    if (url) {
      requestIndexing(url);
    } else {
      // Batch: index high-priority new pages
      const priorityPages = [
        '/',
        '/states',
        '/guides',
        '/guides/fence-cost',
        '/guides/fence-permits',
        // Top cities - fence cost
        '/fence-cost/denver-co',
        '/fence-cost/dallas-tx',
        '/fence-cost/los-angeles-ca',
        '/fence-cost/houston-tx',
        '/fence-cost/chicago-il',
        '/fence-cost/phoenix-az',
        '/fence-cost/san-antonio-tx',
        '/fence-cost/jacksonville-fl',
        '/fence-cost/charlotte-nc',
        '/fence-cost/austin-tx',
        // Top cities - fence permits
        '/fence-permits/denver-co',
        '/fence-permits/dallas-tx',
        '/fence-permits/los-angeles-ca',
        '/fence-permits/houston-tx',
        '/fence-permits/chicago-il',
        '/fence-permits/phoenix-az',
      ];
      batchRequestIndexing(priorityPages.map(p => `${SITE_URL}${p}`));
    }
    break;
  }

  case 'performance':
    getPerformance(parseInt(process.argv[3]) || 30);
    break;

  case 'indexing-status':
    checkIndexingStatus();
    break;

  default:
    console.log('Usage:');
    console.log('  npx tsx scripts/gsc.ts submit-sitemap');
    console.log('  npx tsx scripts/gsc.ts request-indexing [url]');
    console.log('  npx tsx scripts/gsc.ts performance [days]');
    console.log('  npx tsx scripts/gsc.ts indexing-status');
}
