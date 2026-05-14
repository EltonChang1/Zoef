import * as mock from "./mockApi.js";

const runtimeStatus = {
  mode: "backend-first",
  backendHealthy: null,
  lastSource: "unknown",
  lastBackendError: "",
  lastHealthCheckAt: 0
};

function useMockOnly() {
  try {
    return localStorage.getItem("zoe_use_mock") === "1";
  } catch {
    return false;
  }
}

function forceBackend() {
  try {
    return localStorage.getItem("zoe_force_backend") === "1";
  } catch {
    return false;
  }
}

function currentMode() {
  if (useMockOnly()) {
    return "mock-only";
  }
  if (forceBackend()) {
    return "backend-only";
  }
  return "backend-first";
}

function apiBase() {
  const configured =
    globalThis.ZOEF_API_BASE ||
    globalThis.__ZOEF_API_BASE__ ||
    "http://localhost:3001";
  return String(configured).replace(/\/+$/, "");
}

async function fetchJson(path, init) {
  const response = await fetch(`${apiBase()}${path}`, init);
  if (!response.ok) {
    throw new Error(`API ${response.status} for ${path}`);
  }
  return response.json();
}

export async function probeBackendHealth() {
  const mode = currentMode();
  runtimeStatus.mode = mode;
  if (mode === "mock-only") {
    runtimeStatus.backendHealthy = false;
    runtimeStatus.lastHealthCheckAt = Date.now();
    runtimeStatus.lastSource = "mock";
    return false;
  }
  try {
    const health = await fetchJson("/health");
    runtimeStatus.backendHealthy = health?.ok === true;
    runtimeStatus.lastBackendError = "";
  } catch (error) {
    runtimeStatus.backendHealthy = false;
    runtimeStatus.lastBackendError =
      error instanceof Error ? error.message : String(error);
  }
  runtimeStatus.lastHealthCheckAt = Date.now();
  return runtimeStatus.backendHealthy === true;
}

export function getApiRuntimeStatus() {
  runtimeStatus.mode = currentMode();
  return { ...runtimeStatus };
}

async function backendFirst(backendCall, mockCall) {
  runtimeStatus.mode = currentMode();
  if (runtimeStatus.mode === "mock-only") {
    runtimeStatus.lastSource = "mock";
    return mockCall();
  }
  try {
    const data = await backendCall();
    runtimeStatus.lastSource = "backend";
    runtimeStatus.backendHealthy = true;
    runtimeStatus.lastBackendError = "";
    return data;
  } catch (error) {
    runtimeStatus.backendHealthy = false;
    runtimeStatus.lastBackendError =
      error instanceof Error ? error.message : String(error);
    if (runtimeStatus.mode === "backend-only") {
      runtimeStatus.lastSource = "backend-error";
      throw error;
    }
    runtimeStatus.lastSource = "mock-fallback";
    return mockCall();
  }
}

export async function getFeed() {
  return backendFirst(() => fetchJson("/api/feed"), () => mock.getFeed());
}

export async function searchCatalog(queryText) {
  return backendFirst(
    () => fetchJson(`/api/search?q=${encodeURIComponent(queryText)}`),
    () => mock.searchCatalog(queryText)
  );
}

export async function getProductById(productId) {
  return backendFirst(
    () => fetchJson(`/api/products/${encodeURIComponent(productId)}`),
    () => mock.getProductById(productId)
  );
}

export async function getOffersByProductId(productId) {
  return backendFirst(
    () => fetchJson(`/api/products/${encodeURIComponent(productId)}/offers`),
    () => mock.getOffersByProductId(productId)
  );
}

export async function listWishlistProductIds(userId) {
  return backendFirst(
    () => fetchJson(`/api/wishlist?userId=${encodeURIComponent(userId)}`),
    () => mock.listWishlistProductIds(userId)
  );
}

export async function addWishlistItem(userId, productId) {
  return backendFirst(
    () =>
      fetchJson("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId })
      }),
    () => mock.addWishlistItem(userId, productId)
  );
}

export async function upsertCompareGroup(userId, productIds) {
  return backendFirst(
    () =>
      fetchJson("/api/compare-groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productIds })
      }),
    () => mock.upsertCompareGroup(userId, productIds)
  );
}

export async function addRankingEntry(listId, productId, note = "") {
  return backendFirst(
    () =>
      fetchJson("/api/rankings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listId, productId, note })
      }),
    () => mock.addRankingEntry(listId, productId, note)
  );
}

export async function getBootstrapData() {
  return backendFirst(
    () => fetchJson("/api/bootstrap"),
    () => mock.getBootstrapData()
  );
}

export async function getActiveCompareGroup(userId) {
  return backendFirst(
    () => fetchJson(`/api/compare-groups/active?userId=${encodeURIComponent(userId)}`),
    async () => null
  );
}

export async function saveCompareGroup(userId, title) {
  return backendFirst(
    () =>
      fetchJson("/api/compare-groups/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, title })
      }),
    async () => null
  );
}
