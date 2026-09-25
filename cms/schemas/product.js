// Product — the main catalog item. NO PRICE FIELD by design (enquiry-only catalog).
export const AVAILABILITY_OPTIONS = ['Available', 'Made to Order', 'Enquire for Availability'];

export const product = {
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic info', default: true },
    { name: 'media', title: 'Images' },
    { name: 'details', title: 'Specifications' },
    { name: 'merch', title: 'Visibility' },
  ],
  fields: [
    { name: 'name', title: 'Product name', type: 'string', group: 'basic', validation: (r) => r.required(),
      description: 'Full product name including size / variant. Example: "Havells Ceiling Fan 1200mm".' },
    { name: 'slug', title: 'URL slug', type: 'slug', group: 'basic', options: { source: 'name', maxLength: 96 }, validation: (r) => r.required(),
      description: 'Click "Generate". This becomes the product web address.' },
    { name: 'brand', title: 'Brand', type: 'reference', to: [{ type: 'brand' }], group: 'basic', validation: (r) => r.required() },
    { name: 'category', title: 'Category', type: 'reference', to: [{ type: 'category' }], group: 'basic', validation: (r) => r.required() },
    { name: 'shortDescription', title: 'Short description', type: 'string', group: 'basic', validation: (r) => r.max(160),
      description: 'One line shown on product cards (max 160 characters).' },
    { name: 'description', title: 'Full description', type: 'text', rows: 5, group: 'basic',
      description: 'Detailed description shown on the product page.' },
    { name: 'sku', title: 'SKU', type: 'string', group: 'basic', description: 'Your internal stock code. Included in WhatsApp enquiries.' },
    { name: 'productCode', title: 'Product code', type: 'string', group: 'basic', description: 'Manufacturer / catalogue code (optional).' },
    { name: 'availability', title: 'Availability', type: 'string', group: 'basic', initialValue: 'Available',
      options: { list: AVAILABILITY_OPTIONS.map((a) => ({ title: a, value: a })), layout: 'radio' }, validation: (r) => r.required() },

    { name: 'image', title: 'Main image', type: 'image', group: 'media', options: { hotspot: true },
      description: 'Square image works best (recommended 1000 x 1000 px).' },
    { name: 'gallery', title: 'Gallery images', type: 'array', group: 'media', of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Extra photos shown on the product page. The main image is added automatically.' },

    { name: 'specifications', title: 'Specifications', type: 'array', group: 'details',
      of: [{
        type: 'object', name: 'spec', title: 'Specification',
        fields: [
          { name: 'label', title: 'Label', type: 'string', validation: (r) => r.required() },
          { name: 'value', title: 'Value', type: 'string', validation: (r) => r.required() },
        ],
        preview: { select: { title: 'label', subtitle: 'value' } },
      }],
      description: 'Example: Label = "Wattage", Value = "18 W".' },
    { name: 'tags', title: 'Search tags', type: 'array', group: 'details', of: [{ type: 'string' }], options: { layout: 'tags' },
      description: 'Extra words customers may search for. Example: wire, copper, cable.' },
    { name: 'relatedProducts', title: 'Related products', type: 'array', group: 'details', of: [{ type: 'reference', to: [{ type: 'product' }] }],
      description: 'Shown under "Related products". If empty, products from the same category are shown.' },

    { name: 'featured', title: 'Featured on home page', type: 'boolean', group: 'merch', initialValue: false },
    { name: 'newArrival', title: 'New arrival badge', type: 'boolean', group: 'merch', initialValue: false },
    { name: 'popular', title: 'Popular product', type: 'boolean', group: 'merch', initialValue: false },
  ],
  preview: {
    select: { title: 'name', brand: 'brand.name', availability: 'availability', media: 'image' },
    prepare({ title, brand, availability, media }) {
      return { title, subtitle: [brand, availability].filter(Boolean).join(' • '), media };
    },
  },
};
