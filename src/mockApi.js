const cache = new Map();

const STORAGE_KEYS = {
  wishlist: "zoe_wishlist",
  compareGroups: "zoe_compare_groups",
  rankings: "zoe_rankings"
};

async function loadJson(fileName) {
  if (cache.has(fileName)) {
    return cache.get(fileName);
  }
  const response = await fetch(`./data/${fileName}`);
  if (!response.ok) {
    throw new Error(`Failed to load ${fileName}`);
  }
  const data = await response.json();
  cache.set(fileName, data);
  return data;
}

function clone(data) {
  return JSON.parse(JSON.stringify(data));
}

function readStoredArray(key) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}

function writeStoredArray(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

async function getProducts() {
  return clone(await loadJson("products.json"));
}

async function getBrands() {
  return clone(await loadJson("brands.json"));
}

async function getOffers() {
  return clone(await loadJson("offers.json"));
}

async function getRankingUpdates() {
  return clone(await loadJson("ranking_updates.json"));
}

async function getRankings() {
  const existing = readStoredArray(STORAGE_KEYS.rankings);
  if (existing) {
    return clone(existing);
  }
  const initial = await loadJson("rankings.json");
  writeStoredArray(STORAGE_KEYS.rankings, initial);
  return clone(initial);
}

async function getWishlist() {
  const existing = readStoredArray(STORAGE_KEYS.wishlist);
  if (existing) {
    return clone(existing);
  }
  const initial = await loadJson("wishlist.json");
  writeStoredArray(STORAGE_KEYS.wishlist, initial);
  return clone(initial);
}

async function getCompareGroups() {
  const existing = readStoredArray(STORAGE_KEYS.compareGroups);
  if (existing) {
    return clone(existing);
  }
  const initial = await loadJson("compare_groups.json");
  writeStoredArray(STORAGE_KEYS.compareGroups, initial);
  return clone(initial);
}

export async function getFeed() {
  const [products, rankingUpdates] = await Promise.all([
    getProducts(),
    getRankingUpdates()
  ]);
  return {
    products: products.slice(0, 4),
    updates: rankingUpdates
  };
}

export async function searchCatalog(queryText) {
  const query = queryText.trim().toLowerCase();
  const [products, brands] = await Promise.all([getProducts(), getBrands()]);
  const brandById = new Map(brands.map((brand) => [brand.id, brand]));

  const matches = products.filter((product) => {
    const brand = brandById.get(product.brand_id);
    const target = [
      product.canonical_name,
      product.category,
      product.subcategory,
      ...(product.tags || []),
      brand ? brand.name : ""
    ]
      .join(" ")
      .toLowerCase();
    return target.includes(query);
  });

  return {
    top: matches,
    items: matches,
    brands: brands.filter((brand) => brand.name.toLowerCase().includes(query))
  };
}

export async function getProductById(productId) {
  const products = await getProducts();
  return products.find((product) => product.id === productId) || null;
}

export async function getOffersByProductId(productId) {
  const offers = await getOffers();
  return offers.filter((offer) => offer.product_id === productId);
}

export async function listWishlistProductIds(userId) {
  const wishlist = await getWishlist();
  return wishlist
    .filter((entry) => entry.user_id === userId)
    .map((entry) => entry.product_id);
}

export async function addWishlistItem(userId, productId) {
  const wishlist = await getWishlist();
  const exists = wishlist.some(
    (entry) => entry.user_id === userId && entry.product_id === productId
  );
  if (!exists) {
    wishlist.push({
      id: `wish_${Date.now()}`,
      user_id: userId,
      product_id: productId,
      created_at: new Date().toISOString()
    });
    writeStoredArray(STORAGE_KEYS.wishlist, wishlist);
  }
  return wishlist;
}

export async function getCompareGroupById(groupId) {
  const groups = await getCompareGroups();
  return groups.find((group) => group.id === groupId) || null;
}

export async function upsertCompareGroup(userId, productIds) {
  const groups = await getCompareGroups();
  const active = groups.find((group) => group.user_id === userId && group.status === "active");
  if (active) {
    active.product_ids = Array.from(new Set(productIds)).slice(0, 4);
  } else {
    groups.push({
      id: `compare_${Date.now()}`,
      user_id: userId,
      title: "Current Compare Tray",
      product_ids: Array.from(new Set(productIds)).slice(0, 4),
      status: "active"
    });
  }
  writeStoredArray(STORAGE_KEYS.compareGroups, groups);
  return groups.find((group) => group.user_id === userId && group.status === "active");
}

export async function addRankingEntry(listId, productId, note = "") {
  const rankings = await getRankings();
  const list = rankings.find((ranking) => ranking.id === listId);
  if (!list) {
    throw new Error("Ranking list not found.");
  }
  const exists = list.entries.some((entry) => entry.product_id === productId);
  if (!exists) {
    list.entries.push({
      product_id: productId,
      rank: list.entries.length + 1,
      note: note || "Added from Sprint 0 scaffold"
    });
  }
  writeStoredArray(STORAGE_KEYS.rankings, rankings);
  return list;
}

export async function getBootstrapData() {
  const [products, brands, rankings, rankingUpdates, users] = await Promise.all([
    getProducts(),
    getBrands(),
    getRankings(),
    getRankingUpdates(),
    loadJson("users.json")
  ]);

  return {
    products,
    brands,
    rankings,
    rankingUpdates,
    users
  };
}
