import createImageUrlBuilder from '@sanity/image-url';
import { projectId, dataset, isSanityConfigured } from '../env';

const builder = isSanityConfigured ? createImageUrlBuilder({ projectId, dataset }) : null;

// Accepts a Sanity image object; returns a CDN URL (or empty string).
export function urlFor(source, { width = 940 } = {}) {
  if (!builder || !source) return '';
  try {
    return builder.image(source).width(width).auto('format').fit('max').url();
  } catch {
    return '';
  }
}
