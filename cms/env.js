// =============================================================
// SANITY ENVIRONMENT
// -------------------------------------------------------------
// Only PROJECT ID and DATASET are public. The write token is
// server-only and must NEVER be prefixed with NEXT_PUBLIC_.
// When the project id is missing the site transparently falls
// back to the local demo catalog in lib/data.js.
// =============================================================

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.SANITY_API_VERSION || process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-02-19';

export const isSanityConfigured = /^[a-z0-9-]+$/.test(projectId) && projectId.length > 3;
