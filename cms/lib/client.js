// Server-side Sanity clients. `client` is read-only (safe anywhere on the
// server); `writeClient` carries the secret token and must ONLY be used in
// API routes / server code.
import { createClient } from '@sanity/client';
import { projectId, dataset, apiVersion, isSanityConfigured } from '../env';

export const client = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: 'published' })
  : null;

export function getWriteClient() {
  const token = process.env.SANITY_WRITE_TOKEN;
  if (!isSanityConfigured || !token) return null;
  return createClient({ projectId, dataset, apiVersion, useCdn: false, token, ignoreBrowserTokenWarning: true });
}

export { isSanityConfigured };
