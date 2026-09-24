// =============================================================
// DATA TYPES (JSDoc typedefs)
// -------------------------------------------------------------
// Documentation-only typedefs describing the shape of catalog
// data. Kept separate so a CMS (e.g. Sanity) can later return
// the exact same shapes without changing the UI.
// =============================================================

/**
 * @typedef {Object} Specification
 * @property {string} label
 * @property {string} value
 */

/**
 * @typedef {Object} Category
 * @property {string} id
 * @property {string} name
 * @property {string} slug
 * @property {string} description
 * @property {string} image
 * @property {string} icon    lucide-react icon name
 */

/**
 * @typedef {Object} Brand
 * @property {string} id
 * @property {string} name
 * @property {string} slug
 * @property {string} description
 * @property {string} image
 */

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {string} slug
 * @property {string} brand           brand slug
 * @property {string} category        category slug
 * @property {string} shortDescription
 * @property {string} description
 * @property {string} image
 * @property {string[]} gallery
 * @property {string} availability    'Available' | 'Made to Order' | 'Enquire for Availability'
 * @property {boolean} featured
 * @property {boolean} newArrival
 * @property {boolean} popular
 * @property {Specification[]} specifications
 * @property {string[]} relatedProductIds
 * @property {string} sku
 * @property {string} productCode
 * @property {string[]} tags
 */

export {};
