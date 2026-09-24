import { Database, KeyRound, ListChecks, ExternalLink } from 'lucide-react';

// Shown at /studio when Sanity is not configured yet.
export default function StudioSetup() {
  const steps = [
    { icon: Database, title: '1. Create a free Sanity project', text: 'Go to sanity.io/manage → Create project → name it "Sri Ganesh Electricals", dataset "production".' },
    { icon: KeyRound, title: '2. Copy your credentials', text: 'Settings → API: copy the Project ID. Then Tokens → Add token (Editor) and copy it once.' },
    { icon: ListChecks, title: '3. Add environment variables', text: 'NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET=production and SANITY_WRITE_TOKEN in .env (locally) and in Vercel → Settings → Environment Variables. Redeploy.' },
  ];
  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-2xl rounded-2xl border border-border bg-card p-8 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-wide text-primary">Content Studio</p>
        <h1 className="mt-2 text-2xl font-extrabold text-foreground">Sanity is not connected yet</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The website is currently showing the built-in demo catalog. Connect Sanity to manage products,
          categories, brands and enquiries from this page.
        </p>
        <div className="mt-6 space-y-4">
          {steps.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-4 rounded-xl border border-border bg-background p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="h-5 w-5" /></span>
              <div>
                <p className="text-sm font-bold text-foreground">{title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
        <a href="https://www.sanity.io/manage" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground hover:brightness-95">
          Open sanity.io/manage <ExternalLink className="h-4 w-4" />
        </a>
        <p className="mt-4 text-xs text-muted-foreground">Full instructions: see CMS-GUIDE.md and DEPLOY.md in the project.</p>
      </div>
    </div>
  );
}
