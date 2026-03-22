import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = 'FenceFind <noreply@getfencefind.com>';
const NOTIFY_EMAIL = 'matt@getfencefind.com';

export async function notifyClaimSubmission(claim: {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  website?: string;
  message?: string;
}) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject: `🏗️ New Claim: ${claim.businessName} (${claim.city}, ${claim.state})`,
      html: `
        <h2>New Listing Claim on FenceFind</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
          <tr><td style="padding: 8px; font-weight: bold;">Business</td><td style="padding: 8px;">${claim.businessName}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Contact</td><td style="padding: 8px;">${claim.contactName}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Email</td><td style="padding: 8px;"><a href="mailto:${claim.email}">${claim.email}</a></td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Phone</td><td style="padding: 8px;"><a href="tel:${claim.phone}">${claim.phone}</a></td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Location</td><td style="padding: 8px;">${claim.city}, ${claim.state}</td></tr>
          ${claim.website ? `<tr><td style="padding: 8px; font-weight: bold;">Website</td><td style="padding: 8px;"><a href="${claim.website}">${claim.website}</a></td></tr>` : ''}
          ${claim.message ? `<tr><td style="padding: 8px; font-weight: bold;">Message</td><td style="padding: 8px;">${claim.message}</td></tr>` : ''}
        </table>
        <p style="margin-top: 20px; color: #666;">Review in <a href="https://supabase.com/dashboard">Supabase Dashboard</a> → claim_requests table</p>
      `,
    });
  } catch (error) {
    console.error('Failed to send claim notification email:', error);

  }
}

export async function notifyQuoteRequest(quote: {
  contractorName: string;
  name: string;
  email: string;
  phone?: string;
  zip: string;
  fenceType?: string;
  material?: string;
  approximateLength?: string;
  message?: string;
}) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject: `📬 New Quote Request: ${quote.contractorName} (${quote.zip})`,
      html: `
        <h2>New Quote Request on FenceFind</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
          <tr><td style="padding: 8px; font-weight: bold;">Contractor</td><td style="padding: 8px;">${quote.contractorName}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Homeowner</td><td style="padding: 8px;">${quote.name}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Email</td><td style="padding: 8px;"><a href="mailto:${quote.email}">${quote.email}</a></td></tr>
          ${quote.phone ? `<tr><td style="padding: 8px; font-weight: bold;">Phone</td><td style="padding: 8px;"><a href="tel:${quote.phone}">${quote.phone}</a></td></tr>` : ''}
          <tr><td style="padding: 8px; font-weight: bold;">ZIP</td><td style="padding: 8px;">${quote.zip}</td></tr>
          ${quote.fenceType ? `<tr><td style="padding: 8px; font-weight: bold;">Fence Type</td><td style="padding: 8px;">${quote.fenceType}</td></tr>` : ''}
          ${quote.material ? `<tr><td style="padding: 8px; font-weight: bold;">Material</td><td style="padding: 8px;">${quote.material}</td></tr>` : ''}
          ${quote.approximateLength ? `<tr><td style="padding: 8px; font-weight: bold;">Approx Length</td><td style="padding: 8px;">${quote.approximateLength}</td></tr>` : ''}
          ${quote.message ? `<tr><td style="padding: 8px; font-weight: bold;">Message</td><td style="padding: 8px;">${quote.message}</td></tr>` : ''}
        </table>
        <p style="margin-top: 20px; color: #666;">Review in <a href="https://supabase.com/dashboard">Supabase Dashboard</a> → quote_requests table</p>
      `,
    });
  } catch (error) {
    console.error('Failed to send quote notification email:', error);
  }
}
