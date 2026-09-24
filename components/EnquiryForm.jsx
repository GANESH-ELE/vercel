'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Send, CheckCircle2 } from 'lucide-react';
import { validateEnquiry } from '@/lib/validation';
import { quoteUrl } from '@/lib/whatsapp';
import WhatsAppButton from './WhatsAppButton';

// Reusable enquiry / quote / product enquiry form.
// variant: 'contact' | 'quote' | 'product'
export default function EnquiryForm({ variant = 'contact', product }) {
  const [values, setValues] = useState({
    name: '', phone: '', email: '',
    product: product ? product.name : '',
    sku: product ? product.sku : '',
    quantity: '', message: '',
    contactMethod: 'WhatsApp', consent: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [waLink, setWaLink] = useState('');

  const set = (k, v) => setValues((s) => ({ ...s, [k]: v }));
  const showProductFields = variant === 'quote' || variant === 'product';

  const onSubmit = (e) => {
    e.preventDefault();
    const { errors: errs, valid } = validateEnquiry(values);
    setErrors(errs);
    if (!valid) {
      toast.error('Please fix the highlighted fields.');
      return;
    }
    // First version: no DB / email. Build a WhatsApp message and show success.
    const link = quoteUrl(values);
    setWaLink(link);
    setSubmitted(true);
    toast.success('Enquiry ready! Opening WhatsApp…');
    if (typeof window !== 'undefined') window.open(link, '_blank');
  };

  const inputCls = 'h-11 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40';
  const errCls = 'mt-1 text-xs font-medium text-destructive';

  if (submitted) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
        <h3 className="mt-3 text-lg font-bold text-foreground">Thank you, {values.name.split(' ')[0]}!</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Your enquiry has been prepared. If WhatsApp did not open automatically, tap the button below.
        </p>
        <div className="mt-4 flex justify-center">
          <WhatsAppButton href={waLink} size="lg">Open WhatsApp</WhatsAppButton>
        </div>
        <button onClick={() => setSubmitted(false)} className="mt-4 text-sm font-semibold text-primary hover:underline">
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Name *</label>
          <input className={inputCls} value={values.name} onChange={(e) => set('name', e.target.value)} placeholder="Your full name" />
          {errors.name && <p className={errCls}>{errors.name}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Phone Number *</label>
          <input className={inputCls} value={values.phone} onChange={(e) => set('phone', e.target.value)} placeholder="10-digit mobile number" inputMode="tel" />
          {errors.phone && <p className={errCls}>{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Email (optional)</label>
        <input className={inputCls} value={values.email} onChange={(e) => set('email', e.target.value)} placeholder="you@example.com" />
        {errors.email && <p className={errCls}>{errors.email}</p>}
      </div>

      {showProductFields && (
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium">Product (optional)</label>
            <input className={inputCls} value={values.product} onChange={(e) => set('product', e.target.value)} placeholder="Product name" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Quantity (optional)</label>
            <input className={inputCls} value={values.quantity} onChange={(e) => set('quantity', e.target.value)} placeholder="e.g. 10" inputMode="numeric" />
          </div>
          <div className="sm:col-span-3">
            <label className="mb-1 block text-sm font-medium">SKU (optional)</label>
            <input className={inputCls} value={values.sku} onChange={(e) => set('sku', e.target.value)} placeholder="Product SKU" />
          </div>
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium">Message *</label>
        <textarea className="min-h-[110px] w-full rounded-lg border border-border bg-white p-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40" value={values.message} onChange={(e) => set('message', e.target.value)} placeholder="Tell us what you are looking for" />
        {errors.message && <p className={errCls}>{errors.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Preferred Contact Method</label>
        <div className="flex flex-wrap gap-4 pt-1">
          {['WhatsApp', 'Phone Call', 'Email'].map((m) => (
            <label key={m} className="flex items-center gap-2 text-sm">
              <input type="radio" name="contactMethod" checked={values.contactMethod === m} onChange={() => set('contactMethod', m)} className="h-4 w-4 accent-[hsl(var(--primary))]" />
              {m}
            </label>
          ))}
        </div>
      </div>

      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" checked={values.consent} onChange={(e) => set('consent', e.target.checked)} className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]" />
        <span>I agree to be contacted by {`the showroom`} regarding my enquiry.</span>
      </label>
      {errors.consent && <p className={errCls}>{errors.consent}</p>}

      <button type="submit" className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-bold text-primary-foreground hover:brightness-95 sm:w-auto">
        <Send className="h-4 w-4" /> {variant === 'quote' ? 'Send Quote Request' : 'Send Enquiry'}
      </button>
      <p className="text-xs text-muted-foreground">We’ll prepare a WhatsApp message with your details. No account or payment needed.</p>
    </form>
  );
}
