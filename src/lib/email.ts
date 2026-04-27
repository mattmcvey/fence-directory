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

export async function notifyContactMessage(contact: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      replyTo: contact.email,
      subject: `📩 Contact: ${contact.subject}`,
      html: `
        <h2>New Contact Message on FenceFind</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
          <tr><td style="padding: 8px; font-weight: bold;">Name</td><td style="padding: 8px;">${contact.name}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Email</td><td style="padding: 8px;"><a href="mailto:${contact.email}">${contact.email}</a></td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Subject</td><td style="padding: 8px;">${contact.subject}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Message</td><td style="padding: 8px;">${contact.message}</td></tr>
        </table>
      `,
    });
  } catch (error) {
    console.error('Failed to send contact notification email:', error);
  }
}

export async function confirmQuoteToHomeowner(details: {
  homeownerName: string;
  homeownerEmail: string;
  contractorName: string;
}) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: details.homeownerEmail,
      subject: `Your quote request was sent to ${details.contractorName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto;">
          <div style="background: #16a34a; padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px;">Quote Request Sent!</h1>
          </div>
          <div style="background: #ffffff; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
            <p style="color: #374151; font-size: 15px; line-height: 1.6; margin-top: 0;">
              Hi ${details.homeownerName},
            </p>
            <p style="color: #374151; font-size: 15px; line-height: 1.6;">
              Your quote request has been sent to <strong>${details.contractorName}</strong>. They typically respond within 1–2 business days.
            </p>
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; margin: 20px 0;">
              <p style="color: #166534; font-size: 14px; margin: 0;"><strong>What happens next?</strong></p>
              <ul style="color: #166534; font-size: 14px; margin: 8px 0 0; padding-left: 20px;">
                <li>The contractor will review your request</li>
                <li>They'll reach out to you via phone or email</li>
                <li>You can discuss your project and get a detailed estimate</li>
              </ul>
            </div>
            <p style="color: #6b7280; font-size: 13px; line-height: 1.5;">
              If you don't hear back within a few days, try reaching out to them directly from their
              <a href="https://getfencefind.com" style="color: #16a34a;">FenceFind profile</a>.
            </p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
            <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-bottom: 0;">
              FenceFind — Find Trusted Fence Contractors Near You
            </p>
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error('Failed to send homeowner confirmation email:', error);
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
