// =============================================================
// WHATSAPP HELPERS
// -------------------------------------------------------------
// Builds wa.me deep links with correctly URL-encoded messages.
// No API key required — opens the customer's WhatsApp app.
// =============================================================

import config from './config';

export function buildWhatsAppUrl(message, number) {
  const to = (number || config.whatsappNumber || '').replace(/[^0-9]/g, '');
  return `https://wa.me/${to}?text=${encodeURIComponent(message || '')}`;
}

export function productEnquiryMessage(product) {
  return `Hello, I want to enquire about ${product.name}, SKU ${product.sku}. Please share the price and availability.`;
}

export function productEnquiryUrl(product) {
  return buildWhatsAppUrl(productEnquiryMessage(product));
}

export function generalEnquiryUrl() {
  return buildWhatsAppUrl(
    `Hello ${config.businessName}, I would like some help choosing products. Please assist.`
  );
}

export function quoteMessage({ name, phone, product, sku, quantity, message }) {
  const lines = [
    `Hello ${config.businessName}, I would like to request a quote.`,
    name ? `Name: ${name}` : '',
    phone ? `Phone: ${phone}` : '',
    product ? `Product: ${product}` : '',
    sku ? `SKU: ${sku}` : '',
    quantity ? `Quantity: ${quantity}` : '',
    message ? `Message: ${message}` : '',
  ].filter(Boolean);
  return lines.join('\n');
}

export function quoteUrl(values) {
  return buildWhatsAppUrl(quoteMessage(values));
}
