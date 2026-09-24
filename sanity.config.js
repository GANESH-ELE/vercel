'use client';

// =============================================================
// SANITY STUDIO CONFIG (embedded at /studio)
// =============================================================
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';
import { structure } from './sanity/structure';
import { projectId, dataset } from './sanity/env';

export default defineConfig({
  name: 'default',
  title: 'Sri Ganesh Electricals — Catalog',
  projectId: projectId || 'placeholder',
  dataset,
  basePath: '/studio',
  plugins: [structureTool({ structure })],
  schema: { types: schemaTypes },
  document: {
    // Enquiries are created by the website; hide them from the "Create new" menu.
    newDocumentOptions: (prev) => prev.filter((t) => t.templateId !== 'enquiry'),
  },
});
