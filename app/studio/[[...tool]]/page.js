// Embedded Sanity Studio — https://yoursite.com/studio
// Optional catch-all so nested Studio routes (/studio/structure/...) resolve here.
import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config';
import { isSanityConfigured } from '@/sanity/env';
import StudioSetup from '@/components/StudioSetup';

export const dynamic = 'force-static';
export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
  if (!isSanityConfigured) return <StudioSetup />;
  return <NextStudio config={config} />;
}
