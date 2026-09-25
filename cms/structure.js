// Custom sidebar for the Studio — friendly grouping for showroom staff.
export const structure = (S) =>
  S.list()
    .title('Sri Ganesh Electricals')
    .items([
      S.listItem().title('Products').schemaType('product').child(S.documentTypeList('product').title('Products')),
      S.listItem().title('Categories').schemaType('category').child(S.documentTypeList('category').title('Categories').defaultOrdering([{ field: 'order', direction: 'asc' }])),
      S.listItem().title('Brands').schemaType('brand').child(S.documentTypeList('brand').title('Brands')),
      S.divider(),
      S.listItem().title('Enquiries (new)').child(
        S.documentList().title('New enquiries').schemaType('enquiry')
          .filter('_type == "enquiry" && (status == "new" || !defined(status))')
          .defaultOrdering([{ field: 'createdAt', direction: 'desc' }])
      ),
      S.listItem().title('All enquiries').schemaType('enquiry').child(
        S.documentTypeList('enquiry').title('All enquiries').defaultOrdering([{ field: 'createdAt', direction: 'desc' }])
      ),
    ]);
