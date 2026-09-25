// Brand — e.g. Havells, Finolex, Jaquar
export const brand = {
  name: 'brand',
  title: 'Brand',
  type: 'document',
  fields: [
    { name: 'name', title: 'Brand name', type: 'string', validation: (r) => r.required() },
    { name: 'slug', title: 'URL slug', type: 'slug', options: { source: 'name', maxLength: 96 }, validation: (r) => r.required(),
      description: 'Click "Generate" to create the web address from the name.' },
    { name: 'description', title: 'Short description', type: 'text', rows: 3,
      description: 'One sentence about the brand shown on the brand page.' },
    { name: 'image', title: 'Brand image / logo', type: 'image', options: { hotspot: true } },
  ],
  preview: { select: { title: 'name', subtitle: 'slug.current', media: 'image' } },
};
