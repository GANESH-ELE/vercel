// =============================================================
// POST /api/enquiries — capture website enquiries
// -------------------------------------------------------------
// Saves to (all that are configured): Sanity ("Enquiry" docs),
// Google Sheets (one row), MongoDB (local/dev backup).
// The WhatsApp deep link is still opened client-side.
// =============================================================

import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import { validateEnquiry } from '@/lib/validation';
import { getWriteClient } from '@/sanity/lib/client';
import { appendEnquiryRow, isSheetsConfigured } from '@/lib/sheets';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const clean = (v, max = 500) => (v == null ? '' : String(v)).trim().slice(0, max);

// ---- MongoDB (optional backup store; skipped when MONGO_URL is absent) ----
let mongoPromise;
async function saveToMongo(doc) {
  if (!process.env.MONGO_URL) return { ok: false, skipped: true };
  if (!mongoPromise) mongoPromise = new MongoClient(process.env.MONGO_URL).connect();
  const conn = await mongoPromise;
  await conn.db(process.env.DB_NAME || 'catalog').collection('enquiries').insertOne(doc);
  return { ok: true };
}

// ---- Sanity ----
async function saveToSanity(doc) {
  const writeClient = getWriteClient();
  if (!writeClient) return { ok: false, skipped: true };
  const created = await writeClient.create({
    _type: 'enquiry',
    status: 'new',
    createdAt: doc.createdAt,
    name: doc.name, phone: doc.phone, email: doc.email,
    product: doc.product, sku: doc.sku, quantity: doc.quantity,
    message: doc.message, contactMethod: doc.contactMethod,
    source: doc.source, page: doc.page || undefined,
  });
  return { ok: true, id: created._id };
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const values = {
    name: clean(body.name, 120),
    phone: clean(body.phone, 30),
    email: clean(body.email, 160),
    product: clean(body.product, 200),
    sku: clean(body.sku, 80),
    quantity: clean(body.quantity, 40),
    message: clean(body.message, 2000),
    contactMethod: clean(body.contactMethod, 30) || 'WhatsApp',
    consent: body.consent === true || body.consent === 'true',
  };

  const { errors, valid } = validateEnquiry(values, { requireConsent: true });
  if (!valid) {
    return NextResponse.json({ ok: false, error: 'Validation failed', errors }, { status: 400 });
  }

  const doc = {
    id: uuidv4(),
    ...values,
    source: ['contact', 'quote', 'product'].includes(body.source) ? body.source : 'contact',
    page: clean(body.page, 500),
    createdAt: new Date().toISOString(),
  };
  delete doc.consent;

  const [sanity, sheets, mongo] = await Promise.allSettled([
    saveToSanity(doc),
    appendEnquiryRow(doc),
    saveToMongo({ ...doc }),
  ]);

  const report = (r, label) => {
    if (r.status === 'fulfilled') return r.value.skipped ? 'skipped' : 'saved';
    console.error(`[enquiries] ${label} failed:`, r.reason?.message || r.reason);
    return 'failed';
  };

  const stored = {
    sanity: report(sanity, 'sanity'),
    sheets: report(sheets, 'sheets'),
    mongo: report(mongo, 'mongo'),
  };
  const savedAnywhere = Object.values(stored).includes('saved');

  return NextResponse.json(
    { ok: true, id: doc.id, stored, saved: savedAnywhere, sheetsConfigured: isSheetsConfigured() },
    { status: 201 },
  );
}

export async function GET() {
  // Health/config check only — never returns enquiry data.
  return NextResponse.json({
    ok: true,
    sanity: !!getWriteClient(),
    sheets: isSheetsConfigured(),
    mongo: !!process.env.MONGO_URL,
  });
}
