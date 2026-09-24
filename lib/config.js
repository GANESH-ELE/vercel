// =============================================================
// CENTRAL BUSINESS CONFIGURATION
// -------------------------------------------------------------
// Edit business contact details, hours, links and theme colours
// here ONLY. Values fall back to placeholders when the matching
// NEXT_PUBLIC_* environment variable is not set. (DEMO values.)
// =============================================================

export const config = {
  businessName: process.env.NEXT_PUBLIC_BUSINESS_NAME || 'Sri Ganesh Electricals',
  tagline: 'Your Complete Electrical, Plumbing & Building Materials Showroom',
  city: 'Mangaluru, Karnataka',

  // Contact (DEMO placeholders — replace with real numbers)
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+91 8050 123 456',
  // WhatsApp must be in international format WITHOUT + or spaces
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918050123456',
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'sales@sriganeshelectricals.example',

  address: {
    line1: 'Ground Floor, Balmatta Road',
    line2: 'Hampankatta, Mangaluru',
    state: 'Karnataka 575001',
    country: 'India',
  },

  openingHours: [
    { days: 'Monday – Saturday', time: '9:30 AM – 8:30 PM' },
    { days: 'Sunday', time: '10:00 AM – 2:00 PM' },
  ],

  googleMapsUrl:
    process.env.NEXT_PUBLIC_MAPS_URL ||
    'https://www.google.com/maps/search/?api=1&query=Balmatta+Road+Mangaluru',

  social: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
  },

  // Theme (also mirrored in globals.css :root as HSL tokens)
  theme: {
    primaryColor: '#0a6b6f', // deep teal
    accentColor: '#25D366', // whatsapp green
  },
};

export const WHATSAPP_GREEN = '#25D366';
export const WHATSAPP_GREEN_DARK = '#1da851';

export default config;
