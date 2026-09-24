// Category (department) — e.g. Plumbing, Electrical, Sanitaryware
export const ICON_OPTIONS = [
  'Wrench', 'GitBranch', 'Bath', 'ShowerHead', 'Zap', 'Hammer', 'PaintBucket', 'Droplets',
  'Fan', 'Drill', 'Lightbulb', 'Plug', 'Cable', 'Package', 'Home', 'Layers', 'Lock', 'Ruler',
];

export const category = {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    { name: 'name', title: 'Category name', type: 'string', validation: (r) => r.required(),
      description: 'Shown in the menu, filters and category cards. Example: "Pipes & Fittings".' },
    { name: 'slug', title: 'URL slug', type: 'slug', options: { source: 'name', maxLength: 96 }, validation: (r) => r.required(),
      description: 'Click "Generate" to create the web address from the name. Example: pipes-and-fittings' },
    { name: 'description', title: 'Short description', type: 'text', rows: 3,
      description: 'One or two sentences shown on the category card and category page.' },
    { name: 'image', title: 'Cover image', type: 'image', options: { hotspot: true },
      description: 'Landscape image (recommended 1200 x 900 px).' },
    { name: 'icon', title: 'Icon', type: 'string', options: { list: ICON_OPTIONS.map((i) => ({ title: i, value: i })) }, initialValue: 'Package',
      description: 'Small icon displayed on the category card.' },
    { name: 'order', title: 'Display order', type: 'number', initialValue: 100,
      description: 'Lower numbers appear first on the home page.' },
  ],
  orderings: [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'slug.current', media: 'image' } },
};
