// =============================================================
// GOOGLE SHEETS — append one row per enquiry (server-only)
// -------------------------------------------------------------
// Silently skips when the Google env vars are not configured.
// Sheet tab default: "Enquiries" with header row:
//   Date | Name | Phone | Email | Product | Quantity | Message | Source
// =============================================================

import { google } from 'googleapis';

const REQUIRED = ['GOOGLE_SERVICE_ACCOUNT_EMAIL', 'GOOGLE_PRIVATE_KEY', 'GOOGLE_SHEETS_ID'];

export function isSheetsConfigured() {
  return REQUIRED.every((k) => !!process.env[k]);
}

// Prevent spreadsheet formula injection (=, +, -, @ prefixes).
function safeCell(v) {
  const s = v == null ? '' : String(v);
  return /^[=+\-@]/.test(s) ? `'${s}` : s;
}

export async function appendEnquiryRow(enquiry) {
  if (!isSheetsConfigured()) return { ok: false, skipped: true, reason: 'not_configured' };

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n').replace(/^"|"$/g, ''),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });

  const range = process.env.GOOGLE_SHEETS_RANGE || 'Enquiries!A:H';
  const when = new Date(enquiry.createdAt || Date.now()).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const row = [
    when, enquiry.name, enquiry.phone, enquiry.email, enquiry.product, enquiry.quantity, enquiry.message, enquiry.source,
  ].map(safeCell);

  const result = await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { majorDimension: 'ROWS', values: [row] },
  });
  return { ok: true, updatedRange: result?.data?.updates?.updatedRange || null };
}
