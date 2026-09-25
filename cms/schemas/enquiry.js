// Enquiry — created automatically by the website forms (POST /api/enquiries).
// Staff only need to update "Status" and "Internal notes".
export const enquiry = {
  name: 'enquiry',
  title: 'Enquiry',
  type: 'document',
  fields: [
    { name: 'status', title: 'Status', type: 'string', initialValue: 'new',
      options: { list: [
        { title: 'New', value: 'new' },
        { title: 'Contacted', value: 'contacted' },
        { title: 'Quoted', value: 'quoted' },
        { title: 'Closed', value: 'closed' },
      ], layout: 'radio', direction: 'horizontal' } },
    { name: 'notes', title: 'Internal notes', type: 'text', rows: 3, description: 'Only visible to staff.' },
    { name: 'createdAt', title: 'Received at', type: 'datetime', readOnly: true },
    { name: 'name', title: 'Customer name', type: 'string', readOnly: true },
    { name: 'phone', title: 'Phone', type: 'string', readOnly: true },
    { name: 'email', title: 'Email', type: 'string', readOnly: true },
    { name: 'product', title: 'Product', type: 'string', readOnly: true },
    { name: 'sku', title: 'SKU', type: 'string', readOnly: true },
    { name: 'quantity', title: 'Quantity', type: 'string', readOnly: true },
    { name: 'message', title: 'Message', type: 'text', readOnly: true },
    { name: 'contactMethod', title: 'Preferred contact', type: 'string', readOnly: true },
    { name: 'source', title: 'Form', type: 'string', readOnly: true, description: 'contact / quote / product' },
    { name: 'page', title: 'Page URL', type: 'url', readOnly: true },
  ],
  orderings: [{ title: 'Newest first', name: 'createdAtDesc', by: [{ field: 'createdAt', direction: 'desc' }] }],
  preview: {
    select: { name: 'name', phone: 'phone', product: 'product', status: 'status', createdAt: 'createdAt' },
    prepare({ name, phone, product, status, createdAt }) {
      const date = createdAt ? new Date(createdAt).toLocaleDateString('en-IN') : '';
      return {
        title: `${name || 'Unknown'} • ${phone || ''}`,
        subtitle: [status ? status.toUpperCase() : '', product, date].filter(Boolean).join(' | '),
      };
    },
  },
};
