// =============================================================
// CENTRAL BUSINESS CONFIGURATION
// -------------------------------------------------------------
// Edit business contact details, hours, links and theme colours
// here ONLY. Values fall back to placeholders when the matching
// NEXT_PUBLIC_* environment variable is not set. (DEMO values.)
// =============================================================

export const config = {
  businessName: process.env.NEXT_PUBLIC_BUSINESS_NAME || 'Sri Ganesh Electricals',
  tagline: 'Your Complete Electrical, Plumbing & Building Materials',
  city: 'Brahmavara, Karnataka',

  // Contact (DEMO placeholders — replace with real numbers)
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+91 7619373606',
  // WhatsApp must be in international format WITHOUT + or spaces
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '917619373606',
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'ganeshelectricals576213@gmail.com',

  address: {
    line1: 'Holy Family Church Complex, N.H.66',
    line2: 'Brahmavara',
    state: 'Karnataka 576213',
    country: 'India',
  },

  openingHours: [
    { days: 'Monday – Saturday', time: '8:00 AM – 8:00 PM' },
    { days: 'Sunday', time: '08:00 AM – 2:00 PM' },
  ],

  googleMapsUrl:
    process.env.NEXT_PUBLIC_MAPS_URL ||
    'https://maps.app.goo.gl/iiiqk4LpsSKzzTtz9',

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
