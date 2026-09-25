// Sanity CLI config — lets you run `npx sanity <command>` from the project root,
// e.g. `npx sanity schema validate`, `npx sanity dataset export production backup.tar.gz`.
import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '67e0wbk7',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
});
