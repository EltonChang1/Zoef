import {
  addRankingEntry,
  addWishlistItem,
  getBootstrapData,
  getFeed,
  getOffersByProductId,
  getProductById,
  listWishlistProductIds,
  searchCatalog,
  upsertCompareGroup
} from "./mockApi.js";

const USER_ID = "user_001";
const state = {
  activeTab: "home",
  previousPrimaryTab: "home",
  searchText: "",
  compareTray: []
};

const view = document.querySelector("#view");
const tabButtons = Array.from(document.querySelectorAll(".tab"));
const searchInput = document.querySelector("#global-search");

let boot = null;

function currency(amount) {
  return `$${Number(amount).toFixed(2)}`;
}

function setActiveTab(tab) {
  state.activeTab = tab;
  if (tab !== "compare") {
    state.previousPrimaryTab = tab;
  }
  const navTab = state.activeTab === "compare" ? state.previousPrimaryTab : state.activeTab;
  tabButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tab === navTab);
  });
  render();
}

async function addToCompare(productId) {
  state.compareTray = Array.from(new Set([...state.compareTray, productId])).slice(0, 4);
  await upsertCompareGroup(USER_ID, state.compareTray);
  render();
}

function productCard(product, brandName) {
  return `
    <article class="card">
      <div class="product-row">
        <img src="${product.image_url}" alt="${product.canonical_name}" />
        <div>
          <strong>${product.canonical_name}</strong>
          <div class="muted">${brandName} · ${currency(product.price_min)}-${currency(product.price_max)}</div>
          <div class="muted">${product.tags.join(" · ")}</div>
          <div class="actions">
            <button data-action="save" data-product-id="${product.id}">Save</button>
            <button data-action="compare" data-product-id="${product.id}">Compare</button>
            <button data-action="rank" data-product-id="${product.id}">Rank</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderCompareTray() {
  if (!state.compareTray.length) {
    return "";
  }

  return `
    <section class="card compare-tray">
      <div class="compare-tray-header">
        <h2>Compare Tray (${state.compareTray.length}/4)</h2>
        <div class="actions">
          <button data-action="compare-review" class="primary">Review Comparison</button>
          <button data-action="compare-clear">Clear</button>
        </div>
      </div>
      <p class="muted">Compare is a contextual function: add items from any product card, then review side by side when you are ready.</p>
      <div class="pill-list">
        ${state.compareTray.map((id) => `<button data-action="compare-remove" data-product-id="${id}" class="pill-button">${id}</button>`).join("")}
      </div>
    </section>
  `;
}

async function renderHome() {
  const feed = await getFeed();
  const brandById = new Map(boot.brands.map((brand) => [brand.id, brand.name]));
  const cards = feed.products
    .map((product) => productCard(product, brandById.get(product.brand_id) || "Unknown"))
    .join("");
  const updates = feed.updates
    .map((update) => `<li>${update.message}</li>`)
    .join("");

  view.innerHTML = `
    ${renderCompareTray()}
    <section class="card">
      <h2>For You</h2>
      <p class="muted">Seeded ranked products from the unified catalog.</p>
    </section>
    ${cards}
    <section class="card">
      <h2>Rank Updates</h2>
      <ul>${updates}</ul>
    </section>
  `;
}

async function renderSearch() {
  const text = state.searchText.trim();
  if (!text) {
    view.innerHTML = `
      <section class="card">
        <h2>Search</h2>
        <p class="muted">Type in the search bar to query products, brands, and tags.</p>
      </section>
    `;
    return;
  }

  const result = await searchCatalog(text);
  const brandById = new Map(boot.brands.map((brand) => [brand.id, brand.name]));
  const items = result.items
    .map((product) => productCard(product, brandById.get(product.brand_id) || "Unknown"))
    .join("");

  view.innerHTML = `
    ${renderCompareTray()}
    <section class="card">
      <h2>Search Results</h2>
      <p class="muted">Top matches for "${text}"</p>
    </section>
    ${items || '<section class="card"><p class="muted">No matches found.</p></section>'}
  `;
}

async function renderCompare() {
  const products = await Promise.all(state.compareTray.map((id) => getProductById(id)));
  const validProducts = products.filter(Boolean);

  if (!validProducts.length) {
    view.innerHTML = `
      <section class="card">
        <h2>Comparison Workspace</h2>
        <p class="muted">Add 2-4 items from Home or Search to compare side by side.</p>
        <button data-action="compare-back">Back to ${state.previousPrimaryTab}</button>
      </section>
    `;
    return;
  }

  const rows = [
    ["Price", (p) => `${currency(p.price_min)}-${currency(p.price_max)}`],
    ["Category", (p) => p.category],
    ["Materials", (p) => p.materials.join(", ")],
    ["Tags", (p) => p.tags.slice(0, 2).join(", ")]
  ];

  const tableRows = rows
    .map(([label, getter]) => {
      const cols = validProducts.map((p) => `<td>${getter(p)}</td>`).join("");
      return `<tr><th>${label}</th>${cols}</tr>`;
    })
    .join("");

  const titleCells = validProducts.map((p) => `<th>${p.canonical_name}</th>`).join("");

  view.innerHTML = `
    <section class="card">
      <h2>Comparison Workspace</h2>
      <p class="muted">Comparing ${validProducts.length} item(s). Limit is 4.</p>
      <div class="actions">
        <button data-action="compare-back">Back to ${state.previousPrimaryTab}</button>
      </div>
    </section>
    <section class="card">
      <table class="compare-table">
        <thead><tr><th>Field</th>${titleCells}</tr></thead>
        <tbody>${tableRows}</tbody>
      </table>
    </section>
  `;
}

async function renderRank() {
  const list = boot.rankings[0];
  const productsById = new Map(boot.products.map((product) => [product.id, product]));
  const items = list.entries
    .sort((a, b) => a.rank - b.rank)
    .map((entry) => {
      const product = productsById.get(entry.product_id);
      return `<li>#${entry.rank} ${product ? product.canonical_name : entry.product_id} - ${entry.note}</li>`;
    })
    .join("");
  const updates = boot.rankingUpdates.map((update) => `<li>${update.message}</li>`).join("");

  view.innerHTML = `
    ${renderCompareTray()}
    <section class="card">
      <h2>${list.title}</h2>
      <ul>${items}</ul>
    </section>
    <section class="card">
      <h2>Recent Rank Movement</h2>
      <ul>${updates}</ul>
    </section>
  `;
}

async function renderProfile() {
  const user = boot.users[0];
  const wishlistIds = await listWishlistProductIds(USER_ID);
  const wishlistProducts = boot.products.filter((product) => wishlistIds.includes(product.id));

  view.innerHTML = `
    ${renderCompareTray()}
    <section class="card">
      <h2>@${user.username}</h2>
      <p class="muted">Style: ${user.style_tags.join(" · ")}</p>
      <p class="muted">Budget: ${currency(user.budget_min)}-${currency(user.budget_max)}</p>
    </section>
    <section class="card">
      <h2>Wishlist (${wishlistProducts.length})</h2>
      <div class="grid-2">
        ${wishlistProducts.map((product) => `
          <div class="card">
            <strong>${product.canonical_name}</strong>
            <p class="muted">${currency(product.price_min)}-${currency(product.price_max)}</p>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

async function render() {
  if (!boot) {
    return;
  }
  if (state.activeTab === "home") {
    await renderHome();
  } else if (state.activeTab === "search") {
    await renderSearch();
  } else if (state.activeTab === "compare") {
    await renderCompare();
  } else if (state.activeTab === "rank") {
    await renderRank();
  } else if (state.activeTab === "profile") {
    await renderProfile();
  }
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveTab(button.dataset.tab));
});

searchInput.addEventListener("input", (event) => {
  state.searchText = event.target.value;
  if (state.activeTab !== "search") {
    setActiveTab("search");
  } else {
    render();
  }
});

view.addEventListener("click", async (event) => {
  const target = event.target.closest("button[data-action]");
  if (!target) {
    return;
  }

  const productId = target.dataset.productId;
  const action = target.dataset.action;

  if (action === "save") {
    await addWishlistItem(USER_ID, productId);
    if (state.activeTab === "profile") {
      await renderProfile();
    }
    return;
  }

  if (action === "compare") {
    await addToCompare(productId);
    return;
  }

  if (action === "compare-review") {
    setActiveTab("compare");
    return;
  }

  if (action === "compare-back") {
    setActiveTab(state.previousPrimaryTab || "home");
    return;
  }

  if (action === "compare-clear") {
    state.compareTray = [];
    await upsertCompareGroup(USER_ID, state.compareTray);
    if (state.activeTab === "compare") {
      setActiveTab(state.previousPrimaryTab || "home");
    } else {
      render();
    }
    return;
  }

  if (action === "compare-remove") {
    state.compareTray = state.compareTray.filter((id) => id !== productId);
    await upsertCompareGroup(USER_ID, state.compareTray);
    render();
    return;
  }

  if (action === "rank") {
    await addRankingEntry("list_001", productId, "Added from quick rank action");
    boot.rankings = await getBootstrapData().then((payload) => payload.rankings);
    if (state.activeTab === "rank") {
      await renderRank();
    }
  }
});

async function init() {
  boot = await getBootstrapData();
  state.compareTray = [];
  await upsertCompareGroup(USER_ID, state.compareTray);

  await render();

  // Smoke check item + offers API shape for the scaffold.
  const first = boot.products[0];
  await Promise.all([getProductById(first.id), getOffersByProductId(first.id)]);
}

init();
