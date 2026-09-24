// GROQ queries. Every projection maps Sanity documents to EXACTLY the same
// shape as the local demo data in lib/data.js so UI components need no change.

export const PRODUCT_FIELDS = `
  "id": _id,
  name,
  "slug": slug.current,
  "brand": brand->slug.current,
  "brandName": brand->name,
  "category": category->slug.current,
  "categoryName": category->name,
  shortDescription,
  description,
  "image": image.asset->url,
  "gallery": gallery[].asset->url,
  availability,
  featured,
  newArrival,
  popular,
  specifications[]{ label, value },
  "relatedProductIds": relatedProducts[]->_id,
  sku,
  productCode,
  tags
`;

export const ALL_PRODUCTS_QUERY = `*[_type == "product" && defined(slug.current)] | order(featured desc, name asc) { ${PRODUCT_FIELDS} }`;

export const ALL_CATEGORIES_QUERY = `*[_type == "category" && defined(slug.current)] | order(coalesce(order, 100) asc, name asc) {
  "id": _id,
  name,
  "slug": slug.current,
  icon,
  description,
  "image": image.asset->url,
  order,
  "productCount": count(*[_type == "product" && references(^._id)])
}`;

export const ALL_BRANDS_QUERY = `*[_type == "brand" && defined(slug.current)] | order(name asc) {
  "id": _id,
  name,
  "slug": slug.current,
  description,
  "image": image.asset->url,
  "productCount": count(*[_type == "product" && references(^._id)])
}`;
