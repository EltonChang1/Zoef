import assert from "node:assert/strict";

const BASE_URL = process.env.ZOEF_API_BASE || "http://localhost:3001";
const USER_ID = "user_001";

async function request(path, init) {
  const response = await fetch(`${BASE_URL}${path}`, init);
  const text = await response.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${path}: ${JSON.stringify(data)}`);
  }
  return data;
}

async function run() {
  const health = await request("/health");
  assert.equal(health.ok, true, "health endpoint should respond with ok=true");

  const search = await request("/api/search?q=bag");
  assert.ok(Array.isArray(search.items), "search.items must be an array");
  assert.ok(search.items.length > 0, "search should return at least one item");

  const first = search.items[0];
  const detail = await request(`/api/products/${encodeURIComponent(first.id)}`);
  assert.equal(detail.id, first.id, "detail endpoint should return selected product");

  const offers = await request(
    `/api/products/${encodeURIComponent(first.id)}/offers`
  );
  assert.ok(Array.isArray(offers), "offers must be an array");

  const feed = await request("/api/feed");
  assert.ok(Array.isArray(feed.products), "feed.products must be an array");
  const secondCandidate =
    feed.products.find((product) => product.id !== first.id) || first;

  const active = await request("/api/compare-groups", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: USER_ID,
      productIds: [first.id, secondCandidate.id]
    })
  });
  assert.equal(active.status, "active", "compare group should be active");
  assert.ok(active.product_ids.length >= 1, "active compare must contain products");

  const saved = await request("/api/compare-groups/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: USER_ID,
      title: "E2E scaffold comparison"
    })
  });
  assert.equal(saved.status, "saved", "saved compare group should have status=saved");

  await request("/api/wishlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: USER_ID,
      productId: first.id
    })
  });
  const wishlistIds = await request(
    `/api/wishlist?userId=${encodeURIComponent(USER_ID)}`
  );
  assert.ok(
    wishlistIds.includes(first.id),
    "wishlist should include product after save"
  );

  console.log("E2E scaffold passed: search -> detail -> compare -> save comparison");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
