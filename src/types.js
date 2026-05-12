/**
 * Canonical type samples for Sprint 0.
 * These JSDoc typedefs mirror the PRD entities and help keep
 * the mock API contract source-agnostic.
 */

/**
 * @typedef {Object} CanonicalProduct
 * @property {string} id
 * @property {string} canonical_name
 * @property {string} brand_id
 * @property {string} category
 * @property {string} subcategory
 * @property {number} price_min
 * @property {number} price_max
 * @property {string} currency
 * @property {string[]} tags
 * @property {string[]} materials
 * @property {string} image_url
 */

/**
 * @typedef {Object} RetailerOffer
 * @property {string} id
 * @property {string} product_id
 * @property {string} retailer_name
 * @property {string} product_url
 * @property {number} current_price
 * @property {number} original_price
 * @property {string} availability_status
 */

/**
 * @typedef {Object} RankingList
 * @property {string} id
 * @property {string} owner_user_id
 * @property {string} title
 * @property {string} visibility
 * @property {{product_id: string, rank: number, note: string}[]} entries
 */

export {};
