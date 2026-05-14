import {
  addRankingEntry,
  addWishlistItem,
  getApiRuntimeStatus,
  getActiveCompareGroup,
  getBootstrapData,
  getFeed,
  getOffersByProductId,
  getProductById,
  listWishlistProductIds,
  probeBackendHealth,
  saveCompareGroup,
  searchCatalog,
  upsertCompareGroup
} from "./apiClient.js";

const USER_ID = "user_001";
const state = {
  activeTab: "home",
  previousPrimaryTab: "home",
  searchText: "",
  compareTray: [],
  activeSearchSubtab: "top",
  activeRankSubtab: "following",
  selectedProductId: null,
  wishlistIds: []
};

const view = document.querySelector("#view");
const tabButtons = Array.from(document.querySelectorAll(".tab"));
const searchInput = document.querySelector("#global-search");
const devBanner = document.querySelector("#dev-backend-banner");

let boot = null;
let renderNonce = 0;
let backendHealthTicker = null;

function currency(amount) {
  return `$${Number(amount).toFixed(2)}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderLoadingState(title = "Loading") {
  view.innerHTML = `
    <section class="card">
      <h2 class="section-title">${escapeHtml(title)}</h2>
      <p class="muted">Fetching the latest data...</p>
    </section>
  `;
}

function renderErrorState(message, details = "") {
  view.innerHTML = `
    <section class="card">
      <h2 class="section-title">Something went wrong</h2>
      <p class="muted">${escapeHtml(message)}</p>
      ${
        details
          ? `<p class="muted">${escapeHtml(details)}</p>`
          : ""
      }
      <div class="actions">
        <button class="button-primary" data-action="retry-render">Retry</button>
      </div>
    </section>
  `;
}

function formatBackendHealth(value) {
  if (value === true) {
    return "ok";
  }
  if (value === false) {
    return "down";
  }
  return "unknown";
}

function updateDevBannerFromStatus() {
  if (!devBanner) {
    return;
  }
  const status = getApiRuntimeStatus();
  devBanner.classList.toggle("is-healthy", status.backendHealthy === true);
  devBanner.classList.toggle("is-unhealthy", status.backendHealthy === false);
  const source =
    status.lastSource === "unknown" ? "n/a" : status.lastSource;
  devBanner.textContent = `DEV mode:${status.mode} health:${formatBackendHealth(
    status.backendHealthy
  )} source:${source}`;
}

function getBrandName(brandId) {
  const brand = boot.brands.find((item) => item.id === brandId);
  return brand ? brand.name : "Unknown";
}

function isContextualTab(tab) {
  return tab === "compare" || tab === "detail";
}

function setActiveTab(tab) {
  state.activeTab = tab;
  if (!isContextualTab(tab)) {
    state.previousPrimaryTab = tab;
  }
  const navTab = isContextualTab(state.activeTab)
    ? state.previousPrimaryTab
    : state.activeTab;
  tabButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tab === navTab);
  });
  render();
}

async function addToCompare(productId) {
  const nextTray = Array.from(new Set([...state.compareTray, productId])).slice(
    0,
    4
  );
  const active = await upsertCompareGroup(USER_ID, nextTray);
  state.compareTray = Array.isArray(active?.product_ids) ? active.product_ids : nextTray;
  render();
}

function buildProductCard(product) {
  const brandName = getBrandName(product.brand_id);
  const isSaved = state.wishlistIds.includes(product.id);
  return `
    <article class="product-card">
      <button class="product-image-wrap" data-action="open-detail" data-product-id="${product.id}">
        <img src="${product.image_url}" alt="${product.canonical_name}" />
      </button>
      <div class="product-content">
        <p class="product-brand">${brandName}</p>
        <h3 class="product-title">${product.canonical_name}</h3>
        <p class="product-price">${currency(product.price_min)}-${currency(
    product.price_max
  )}</p>
        <div class="actions">
          <button data-action="save" data-product-id="${product.id}">${isSaved ? "Saved" : "Save"}</button>
          <button data-action="compare" data-product-id="${product.id}">Compare</button>
          <button class="button-primary" data-action="rank" data-product-id="${product.id}">Rank</button>
        </div>
      </div>
    </article>
  `;
}

function buildSearchResultCard(product) {
  const brandName = getBrandName(product.brand_id);
  return `
    <article class="search-result-card">
      <button class="search-image-wrap" data-action="open-detail" data-product-id="${product.id}">
        <img src="${product.image_url}" alt="${product.canonical_name}" />
      </button>
      <button class="search-bookmark" data-action="save" data-product-id="${product.id}" aria-label="Save item">
        <span class="material-symbols-outlined">bookmark</span>
      </button>
      <div class="search-card-content">
        <p class="product-brand">${brandName}</p>
        <h3 class="product-title">${product.canonical_name}</h3>
        <p class="product-price">${currency(product.price_min)}</p>
        <div class="actions">
          <button data-action="compare" data-product-id="${product.id}">
            <span class="material-symbols-outlined">compare_arrows</span>
            Compare
          </button>
          <button class="button-primary" data-action="rank" data-product-id="${product.id}">
            <span class="material-symbols-outlined">add</span>
            Rank
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderCompareTray() {
  if (!state.compareTray.length) {
    return "";
  }
  const trayProducts = state.compareTray
    .map((id) => boot.products.find((product) => product.id === id))
    .filter(Boolean);

  return `
    <section class="compare-tray">
      <div class="compare-tray-row">
        <strong>Comparing (${state.compareTray.length}/4)</strong>
        <div class="actions">
          <button class="button-primary button-pill" data-action="compare-review">Review</button>
          <button class="button button-pill" data-action="compare-clear">Clear</button>
        </div>
      </div>
      <p class="muted">Compare is contextual across Home, Search, Rank, and Profile.</p>
      <div class="compare-tray-thumbs">
        ${trayProducts
          .map(
            (product) =>
              `<button data-action="compare-remove" data-product-id="${product.id}" class="compare-thumb" aria-label="Remove ${product.canonical_name}">
                <img src="${product.image_url}" alt="${product.canonical_name}" />
              </button>`
          )
          .join("")}
        ${
          state.compareTray.length < 4
            ? '<button class="compare-thumb compare-thumb-add" aria-label="Add compare item"><span class="material-symbols-outlined">add</span></button>'
            : ""
        }
      </div>
    </section>
  `;
}

async function renderHome() {
  const feed = await getFeed();
  const cards = (feed.products || []).map((product) => buildProductCard(product)).join("");
  const updates = feed.updates.map((update) => `<li>${update.message}</li>`).join("");
  const rankingRail = boot.rankings
    .map(
      (list) => `
      <article class="card">
        <p class="product-brand">${list.visibility}</p>
        <h3 class="section-title">${list.title}</h3>
        <p class="muted">${list.entries.length} ranked pieces</p>
      </article>
    `
    )
    .join("");

  view.innerHTML = `
    <section class="card hero-card">
      <h2 class="section-title">For You</h2>
      <p class="muted">Daily discovery feed blending ranked picks, trend movement, and saved-friendly pieces.</p>
    </section>

    <section>
      <div class="section-heading">
        <h2 class="section-title">Trending now</h2>
      </div>
      <div class="grid-products">
        ${cards || '<article class="card"><p class="muted">No trending items right now.</p></article>'}
      </div>
    </section>

    <section class="card">
      <div class="section-heading">
        <h2 class="section-title">Rank Updates</h2>
      </div>
      ${updates ? `<ul>${updates}</ul>` : '<p class="muted">No ranking updates yet.</p>'}
    </section>

    <section>
      <div class="section-heading">
        <h2 class="section-title">Popular Rankings</h2>
      </div>
      <div class="rankings-rail">${rankingRail}</div>
    </section>

    ${renderCompareTray()}
  `;
}

function getSearchTabs() {
  return [
    ["top", "Top"],
    ["items", "Items"],
    ["rankings", "Rankings"],
    ["brands", "Brands"],
    ["creators", "Creators"],
    ["alternatives", "Alternatives"]
  ];
}

function renderSearchSubtabs() {
  return `
    <div class="subtabs">
      ${getSearchTabs()
        .map(
          ([id, label]) => `
            <button data-action="search-subtab" data-subtab="${id}" class="${state.activeSearchSubtab === id ? "is-active" : ""}">${label}</button>
          `
        )
        .join("")}
    </div>
  `;
}

async function renderSearch() {
  const text = state.searchText.trim();
  if (!text) {
    view.innerHTML = `
      ${renderSearchSubtabs()}
      <section class="card hero-card"><h2 class="section-title">Search</h2><p class="muted">Type in the search bar to query products, brands, rankings, and alternatives.</p></section>
      ${renderCompareTray()}
    `;
    return;
  }

  const result = await searchCatalog(text);
  const items = result.items.map((product) => buildSearchResultCard(product)).join("");
  const rankingCards = boot.rankings
    .map(
      (list) => `
      <article class="search-ranking-card card">
        <div class="search-ranking-head">
          <div class="search-ranking-thumb"></div>
          <span class="search-ranking-badge">Trending</span>
        </div>
        <h3 class="section-title">${list.title}</h3>
        <p class="muted">Curated selection with ${list.entries.length} ranked items.</p>
        <p class="muted">${list.entries.length} Items</p>
      </article>
    `
    )
    .join("");
  const brandCards = result.brands
    .map(
      (brand) => `
      <article class="card">
        <h3 class="section-title">${brand.name}</h3>
        <p class="muted">${brand.tier.replace("_", " ")}</p>
      </article>
    `
    )
    .join("");

  let panel = "";
  if (state.activeSearchSubtab === "items" || state.activeSearchSubtab === "top") {
    panel = items
      ? `<div class="grid-products">${items}</div>`
      : '<section class="card"><p class="muted">No items match your search yet.</p></section>';
  } else if (state.activeSearchSubtab === "rankings") {
    panel = rankingCards
      ? `<div class="rankings-rail">${rankingCards}</div>`
      : '<section class="card"><p class="muted">No ranking matches.</p></section>';
  } else if (state.activeSearchSubtab === "brands") {
    panel = `<div class="grid-products">${brandCards || "<section class='card'><p class='muted'>No brand matches.</p></section>"}</div>`;
  } else if (state.activeSearchSubtab === "creators") {
    panel = `<section class="card"><h3 class="section-title">Creators</h3><p class="muted">Creator recommendations are seeded in Rank feed for this sprint.</p></section>`;
  } else {
    panel = `<section class="card"><h3 class="section-title">Alternatives</h3><p class="muted">Use Compare and Rank to discover alternatives while this panel is expanded in future sprints.</p></section>`;
  }

  view.innerHTML = `
    ${renderSearchSubtabs()}
    <section>
      <div class="pill-row">
        <button class="chip">Category</button>
        <button class="chip">Brand</button>
        <button class="chip">Price</button>
        <button class="chip">All Filters</button>
      </div>
    </section>
    <section>
      <div class="section-heading">
        <h2 class="section-title">Popular Rankings</h2>
        <button class="section-link">View All</button>
      </div>
      <div class="rankings-rail">${rankingCards}</div>
    </section>
    <section>
      <div class="section-heading">
        <h2 class="section-title">Results for "${text}"</h2>
      </div>
    </section>
    ${panel || '<section class="card"><p class="muted">No matches found.</p></section>'}
    ${renderCompareTray()}
  `;
}

async function renderCompare() {
  const products = await Promise.all(state.compareTray.map((id) => getProductById(id)));
  const validProducts = products.filter(Boolean);

  if (!validProducts.length) {
    view.innerHTML = `
      <section class="card">
        <h2 class="section-title">Comparison Workspace</h2>
        <p class="muted">Add 2-4 items from Home, Search, or Item Detail to compare side by side.</p>
        <button class="button" data-action="compare-back">Back to ${state.previousPrimaryTab}</button>
      </section>
    `;
    return;
  }

  const winner = validProducts
    .slice()
    .sort((a, b) => a.price_min - b.price_min)[0];
  const minPrice = Math.min(...validProducts.map((product) => product.price_min));
  const maxPrice = Math.max(...validProducts.map((product) => product.price_min));
  const compareCards = validProducts
    .map((product, index) => {
      let badge = "";
      if (index === 0) {
        badge = '<span class="compare-item-badge">Luxury Pick</span>';
      } else if (index === 1) {
        badge = '<span class="compare-item-badge secondary">Most Saved</span>';
      }
      return `
        <article class="compare-item-card card">
          ${badge}
          <img src="${product.image_url}" alt="${product.canonical_name}" />
          <div>
            <p class="product-brand">${getBrandName(product.brand_id)}</p>
            <h3 class="section-title">${product.canonical_name}</h3>
            <p class="product-price">${currency(product.price_min)}</p>
            <p class="muted">#${index + 4} Hobos · ${(12.4 - index * 2.1).toFixed(1)}k</p>
          </div>
        </article>
      `;
    })
    .join("");
  const priceRows = validProducts
    .map(
      (p) => `
      <div class="compare-row">
        <span>${getBrandName(p.brand_id)}</span>
        <strong>${currency(p.price_min)}</strong>
      </div>
    `
    )
    .join("");
  const styleRows = validProducts
    .map(
      (p, index) => `
      <div class="compare-row">
        <span>${getBrandName(p.brand_id)}</span>
        <span>${["Slouchy Hobo", "Structured Crescent", "Oversized Tote", "Classic"][index] || p.category}</span>
      </div>
    `
    )
    .join("");
  const materialRows = validProducts
    .map(
      (p) => `
      <div class="compare-row">
        <span>${getBrandName(p.brand_id)}</span>
        <span>${p.materials[0] || "N/A"}</span>
      </div>
    `
    )
    .join("");

  view.innerHTML = `
    <section class="compare-page-header">
      <h2>Compare</h2>
      <button class="icon-button" data-action="compare-back" aria-label="Close compare">
        <span class="material-symbols-outlined">close</span>
      </button>
    </section>
    <section class="card compare-winner-card">
      <p class="product-brand">ZOE Pick</p>
      <div class="compare-winner-main">
        <img src="${winner.image_url}" alt="${winner.canonical_name}" />
        <div>
          <h3 class="section-title">${winner.canonical_name}</h3>
          <p class="muted">Best overall value</p>
        </div>
      </div>
      <div class="pill-row">
        <span class="chip">Better price</span>
        <span class="chip">More saves</span>
        <span class="chip">Structured shape</span>
      </div>
    </section>
    <section class="compare-list">${compareCards}</section>
    <section class="card compare-section">
      <div class="compare-section-head"><h3>Price & Value</h3><span class="material-symbols-outlined">expand_less</span></div>
      ${priceRows}
      <div class="compare-row compare-row-total"><span>Price Range Difference</span><strong>${currency(maxPrice - minPrice)}</strong></div>
    </section>
    <section class="card compare-section">
      <div class="compare-section-head"><h3>Style</h3><span class="material-symbols-outlined">expand_less</span></div>
      ${styleRows}
    </section>
    <section class="card compare-section">
      <div class="compare-section-head"><h3>Material</h3><span class="material-symbols-outlined">expand_less</span></div>
      ${materialRows}
    </section>
    <section class="compare-collapsed-row"><span>Brand</span><span class="material-symbols-outlined">expand_more</span></section>
    <section class="compare-collapsed-row"><span>ZOE Rank</span><span class="material-symbols-outlined">expand_more</span></section>
    <section class="compare-collapsed-row"><span>Saves</span><span class="material-symbols-outlined">expand_more</span></section>
    <section class="compare-collapsed-row"><span>Details</span><span class="material-symbols-outlined">expand_more</span></section>
    <section class="compare-footer-actions">
      <button class="button button-primary" data-action="compare-shop-winner" data-product-id="${winner.id}">Shop Winner</button>
      <button class="button" data-action="compare-save">Save Comparison</button>
      <button class="button" data-action="compare-ask-friends">Ask Friends</button>
    </section>
    ${renderCompareTray()}
  `;
}

function renderRankSubtabs() {
  const tabs = [
    ["following", "Following"],
    ["trending", "Trending"],
    ["myLists", "My Lists"]
  ];
  return `
    <div class="subtabs">
      ${tabs
        .map(
          ([id, label]) =>
            `<button data-action="rank-subtab" data-subtab="${id}" class="${state.activeRankSubtab === id ? "is-active" : ""}">${label}</button>`
        )
        .join("")}
    </div>
  `;
}

async function renderRank() {
  const list = boot.rankings[0];
  const productsById = new Map(boot.products.map((product) => [product.id, product]));
  const items = list.entries.sort((a, b) => a.rank - b.rank);
  const influencerCards = `
    <article class="rank-influencer-card card">
      <div class="rank-user-row">
        <img src="${boot.products[0].image_url}" alt="Maya" />
        <div>
          <p class="rank-user-name">Maya</p>
          <p class="rank-user-role">Tastemaker</p>
        </div>
      </div>
      <h3 class="rank-card-title">Maya's Top 5 Fall Essentials</h3>
      <button class="button button-pill">Following</button>
    </article>
    <article class="rank-influencer-card card">
      <div class="rank-user-row">
        <img src="${boot.products[1].image_url}" alt="Elena_Style" />
        <div>
          <p class="rank-user-name">Elena_Style</p>
          <p class="rank-user-role">New for you</p>
        </div>
      </div>
      <h3 class="rank-card-title">My Everyday Carry Favorites</h3>
      <button class="button button-pill button-secondary">Follow</button>
    </article>
  `;

  const updates = boot.rankingUpdates
    .map(
      (update, index) => `
      <article class="card rank-update-card">
        <img class="rank-update-thumb" src="${
          (boot.products.find((product) => product.id === update.product_id) || boot.products[0]).image_url
        }" alt="Rank update" />
        <div>
          <p>${index === 1 ? `<strong>Followed by you:</strong> ${update.message}` : update.message}</p>
          <p class="muted">${new Date(update.created_at).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit"
          })}</p>
        </div>
        ${
          index === 1
            ? `<div class="rank-update-avatars">
                <span class="rank-update-avatar"></span>
                <span class="rank-update-avatar"></span>
              </div>`
            : ""
        }
      </article>
    `
    )
    .join("");
  const trendingCards = boot.products
    .slice(0, 2)
    .map(
      (product, index) => `
      <article class="card rank-trending-card">
        <img src="${product.image_url}" alt="${product.canonical_name}" />
        <h3 class="section-title">${index === 0 ? "Transitional Jackets" : "Office Core Footwear"}</h3>
        <p class="muted">${index === 0 ? "37 people with your style saved this jacket today." : "Rapidly climbing in community rankings this week."}</p>
        <div class="rank-avatar-row">
          <span class="rank-avatar"></span>
          <span class="rank-avatar"></span>
          <span class="rank-avatar">${index === 0 ? "+34" : ""}</span>
        </div>
      </article>
    `
    )
    .join("");
  const myRankingCards = items
    .slice(0, 2)
    .map((entry, index) => {
      const product = productsById.get(entry.product_id);
      return `
        <article class="card rank-mini-card">
          <div class="rank-mini-overlay"></div>
          <div class="rank-mini-top">
            <span class="material-symbols-outlined">${index === 0 ? "shopping_bag" : "steps"}</span>
            <span class="chip">${index === 0 ? "12 Items" : "8 Items"}</span>
          </div>
          <h3 class="section-title">${index === 0 ? "Everyday Bags" : "Sneaker Rotation"}</h3>
          <p class="muted">${product ? product.canonical_name : "My list"}</p>
        </article>
      `;
    })
    .join("");

  view.innerHTML = `
    ${renderRankSubtabs()}
    <section>
      <div class="section-heading">
        <h2 class="section-title">Influencer Picks</h2>
        <button class="section-link">See More</button>
      </div>
      <div class="rankings-rail">${influencerCards}</div>
    </section>
    <section>
      <div class="section-heading">
        <h2 class="section-title">Social Feed</h2>
        <span class="muted">Live</span>
      </div>
      <div class="profile-grid">${updates || '<article class="card"><p class="muted">No social rank activity yet.</p></article>'}</div>
    </section>
    <section>
      <div class="section-heading">
        <h2 class="section-title">Trending Lists</h2>
      </div>
      <div class="rankings-rail">${trendingCards}</div>
    </section>
    <section class="card">
      <div class="section-heading">
        <h2 class="section-title">My Rankings</h2>
        <button class="section-link">View All</button>
      </div>
      <div class="rank-mini-grid">${myRankingCards || '<article class="card"><p class="muted">No ranking lists yet.</p></article>'}</div>
      <button class="button rank-create-list"><span class="material-symbols-outlined">add</span>Create New List</button>
    </section>
    <aside class="rank-desktop-rail" aria-label="Desktop rank navigation">
      <h2>ZOE</h2>
      <nav>
        <a href="#" class="rank-rail-link">Home</a>
        <a href="#" class="rank-rail-link">Search</a>
        <a href="#" class="rank-rail-link is-active">Rank</a>
        <a href="#" class="rank-rail-link">Profile</a>
      </nav>
    </aside>
    ${renderCompareTray()}
  `;
}

async function renderProfile() {
  const user = boot.users[0];
  const wishlistProducts = boot.products.filter((product) =>
    state.wishlistIds.includes(product.id)
  );
  const compareProducts = boot.products.filter((product) =>
    state.compareTray.includes(product.id)
  );
  const styleTagPills = user.style_tags
    .map((tag) => `<span class="chip">${tag}</span>`)
    .join("");
  const topRankedCards = boot.rankings[0].entries
    .slice(0, 2)
    .map((entry, index) => {
      const product = boot.products.find((item) => item.id === entry.product_id) || boot.products[0];
      return `
      <article class="card profile-list-card">
        <img src="${product.image_url}" alt="${product.canonical_name}" />
        <h3 class="section-title">${index === 0 ? "Essential Winter Coats" : "Minimalist Sneakers"}</h3>
        <p class="muted">${index === 0 ? "8 items ranked" : "5 items ranked"}</p>
      </article>
    `;
    })
    .join("");
  const wishlistPreview = wishlistProducts
    .slice(0, 3)
    .map(
      (product) => `
      <div class="profile-preview-tile">
        <img src="${product.image_url}" alt="${product.canonical_name}" />
      </div>
    `
    )
    .join("");
  const wishlistPreviewFallbacks = Math.max(0, 3 - Math.min(3, wishlistProducts.length));
  const wishlistPreviewPlaceholders = Array.from({ length: wishlistPreviewFallbacks })
    .map(() => '<div class="profile-preview-tile profile-preview-placeholder"></div>')
    .join("");
  const comparePreview = compareProducts.slice(0, 2);
  const comparePreviewCards =
    comparePreview.length >= 2
      ? `
      <div class="profile-compare-item">
        <img src="${comparePreview[0].image_url}" alt="${comparePreview[0].canonical_name}" />
        <h4>${comparePreview[0].canonical_name}</h4>
        <p>${currency(comparePreview[0].price_min)}</p>
      </div>
      <span class="profile-vs">VS</span>
      <div class="profile-compare-item">
        <img src="${comparePreview[1].image_url}" alt="${comparePreview[1].canonical_name}" />
        <h4>${comparePreview[1].canonical_name}</h4>
        <p>${currency(comparePreview[1].price_min)}</p>
      </div>
    `
      : "";

  view.innerHTML = `
    <section class="profile-header">
      <div class="profile-avatar-wrap">
        <img src="${boot.products[0].image_url}" alt="${user.username}" />
      </div>
      <h2 class="section-title">Elena_Style</h2>
      <p class="muted">Curating minimalist fashion and quiet luxury pieces. Always looking for the perfect capsule wardrobe.</p>
      <div class="pill-row">${styleTagPills}</div>
      <div class="profile-header-actions">
        <button class="button button-primary">Edit Profile</button>
        <button class="button"><span class="material-symbols-outlined">settings</span></button>
      </div>
    </section>
    <section class="card profile-stats">
      <div><h3>${boot.rankings[0].entries.length}</h3><p class="profile-stat-label">Rankings</p></div>
      <div><h3>${wishlistProducts.length}</h3><p class="profile-stat-label">Wishlist</p></div>
      <div><h3>${state.compareTray.length}</h3><p class="profile-stat-label">Saved</p></div>
    </section>
    <section class="card">
      <h2 class="section-title">Style Preferences</h2>
      <div class="profile-preferences">
        <div class="profile-pref-row">
          <span class="material-symbols-outlined">payments</span>
          <div>
            <p class="muted">Budget Range</p>
            <p>${currency(user.budget_min)} - ${currency(user.budget_max)}</p>
          </div>
        </div>
        <div class="profile-pref-row">
          <span class="material-symbols-outlined">favorite</span>
          <div>
            <p class="muted">Favorite Brands</p>
            <p>${user.favorite_brands.map((id) => getBrandName(id)).join(", ")}</p>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="section-heading">
        <h2 class="section-title">Top Ranked Lists</h2>
        <button class="section-link">View All</button>
      </div>
      <div class="profile-grid">${topRankedCards}</div>
    </section>
    <section>
      <div class="section-heading">
        <h2 class="section-title">Wishlist Previews</h2>
        <button class="section-link">View All</button>
      </div>
      <div class="card profile-preview-grid">
        ${
          wishlistProducts.length
            ? `${wishlistPreview}${wishlistPreviewPlaceholders}<div class="profile-preview-tile profile-preview-more">+125 more</div>`
            : '<div class="profile-preview-empty"><p class="muted">No wishlist items yet. Save from Search or Detail.</p></div>'
        }
      </div>
    </section>
    <section class="card">
      <div class="section-heading">
        <h2 class="section-title">Recently Compared</h2>
      </div>
      <div class="profile-compare-row">
        ${
          compareProducts.length >= 2
            ? comparePreviewCards
            : compareProducts.length
              ? compareProducts.map((product) => `<span class="chip">${product.canonical_name}</span>`).join("")
            : '<p class="muted">No recent comparisons yet.</p>'
        }
      </div>
    </section>
    ${renderCompareTray()}
  `;
}

function availabilityLabel(value) {
  if (value === "in_stock") {
    return "In Stock";
  }
  if (value === "low_stock") {
    return "Low Stock";
  }
  return "Sold Out";
}

async function renderDetail() {
  const product = await getProductById(state.selectedProductId);
  if (!product) {
    setActiveTab(state.previousPrimaryTab || "home");
    return;
  }
  const offers = await getOffersByProductId(product.id);
  const brand = getBrandName(product.brand_id);
  const alternatives = boot.products.filter((item) => item.id !== product.id);

  view.innerHTML = `
    <section class="detail-hero">
      <img src="${product.image_url}" alt="${product.canonical_name}" />
      <div class="detail-floating-actions">
        <button class="icon-button detail-float-btn" data-action="detail-back"><span class="material-symbols-outlined">arrow_back</span></button>
        <button class="icon-button detail-float-btn"><span class="material-symbols-outlined">ios_share</span></button>
      </div>
    </section>
    <section class="card">
      <p class="product-brand">${brand}</p>
      <h2 class="section-title">${product.canonical_name}</h2>
      <p class="product-price">${currency(product.price_min)}-${currency(product.price_max)}</p>
      <div class="actions">
        <button data-action="save" data-product-id="${product.id}">${state.wishlistIds.includes(product.id) ? "Saved" : "Save"}</button>
        <button data-action="compare" data-product-id="${product.id}">Compare</button>
        <button data-action="rank" data-product-id="${product.id}">Rank</button>
        <button class="button-primary" data-action="shop" data-product-id="${product.id}">Shop</button>
      </div>
    </section>
    <section class="detail-grid">
      <article class="card"><h3 class="section-title">Fit</h3><p class="muted">${product.tags.join(", ")}</p></article>
      <article class="card"><h3 class="section-title">Material</h3><p class="muted">${product.materials.join(", ")}</p></article>
      <article class="card"><h3 class="section-title">Why people rank it</h3><p class="muted">Strong silhouette, wearable palette, and repeat-save behavior in ranking lists.</p></article>
    </section>
    <section class="card">
      <h3 class="section-title">Available at</h3>
      <div class="profile-grid">
        ${
          offers.length
            ? offers
                .map(
                  (offer) => `
                  <article class="card">
                    <h4>${offer.retailer_name}</h4>
                    <p class="muted">${currency(offer.current_price)}</p>
                    <span class="stock-pill ${
                      offer.availability_status === "in_stock"
                        ? "is-in"
                        : offer.availability_status === "low_stock"
                          ? "is-low"
                          : "is-out"
                    }">${availabilityLabel(offer.availability_status)}</span>
                  </article>
                `
                )
                .join("")
            : '<p class="muted">No offers available.</p>'
        }
      </div>
    </section>
    <section>
      <div class="section-heading"><h3 class="section-title">Style Alternatives</h3></div>
      <div class="rankings-rail">
        ${alternatives.map((item) => buildProductCard(item)).join("")}
      </div>
    </section>
    ${renderCompareTray()}
  `;
}

async function render() {
  if (!boot) {
    return;
  }
  const currentNonce = ++renderNonce;
  document.body.dataset.activeTab = state.activeTab;
  renderLoadingState(`Loading ${state.activeTab}`);

  try {
    if (state.activeTab === "home") {
      await renderHome();
    } else if (state.activeTab === "search") {
      await renderSearch();
    } else if (state.activeTab === "compare") {
      await renderCompare();
    } else if (state.activeTab === "detail") {
      await renderDetail();
    } else if (state.activeTab === "rank") {
      await renderRank();
    } else if (state.activeTab === "profile") {
      await renderProfile();
    }
  } catch (error) {
    if (currentNonce === renderNonce) {
      renderErrorState(
        "We could not load this screen.",
        error instanceof Error ? error.message : String(error)
      );
    }
  }
  updateDevBannerFromStatus();
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

  if (action === "retry-render") {
    await render();
    return;
  }

  try {
  if (action === "save") {
    await addWishlistItem(USER_ID, productId);
    state.wishlistIds = await listWishlistProductIds(USER_ID);
    if (state.activeTab === "profile") {
      await renderProfile();
    } else {
      await render();
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

  if (action === "detail-back") {
    setActiveTab(state.previousPrimaryTab || "home");
    return;
  }

  if (action === "compare-clear") {
    const active = await upsertCompareGroup(USER_ID, []);
    state.compareTray = Array.isArray(active?.product_ids) ? active.product_ids : [];
    if (state.activeTab === "compare") {
      setActiveTab(state.previousPrimaryTab || "home");
    } else {
      render();
    }
    return;
  }

  if (action === "compare-remove") {
    const nextTray = state.compareTray.filter((id) => id !== productId);
    const active = await upsertCompareGroup(USER_ID, nextTray);
    state.compareTray = Array.isArray(active?.product_ids) ? active.product_ids : nextTray;
    render();
    return;
  }

  if (action === "open-detail") {
    state.selectedProductId = productId;
    setActiveTab("detail");
    return;
  }

  if (action === "search-subtab") {
    state.activeSearchSubtab = target.dataset.subtab || "top";
    render();
    return;
  }

  if (action === "rank-subtab") {
    state.activeRankSubtab = target.dataset.subtab || "following";
    render();
    return;
  }

  if (action === "shop" || action === "compare-shop-winner") {
    const offers = await getOffersByProductId(productId);
    const best = offers.sort((a, b) => a.current_price - b.current_price)[0];
    if (best) {
      window.open(best.affiliate_url || best.product_url, "_blank", "noopener");
    }
    return;
  }

  if (action === "compare-save") {
    await saveCompareGroup(USER_ID, "Saved comparison from workspace");
    return;
  }

  if (action === "compare-ask-friends") {
    return;
  }

  if (action === "rank") {
    await addRankingEntry("list_001", productId, "Added from quick rank action");
    const payload = await getBootstrapData();
    boot.rankings = payload.rankings;
    boot.rankingUpdates = payload.rankingUpdates;
    if (state.activeTab === "rank") {
      await renderRank();
    } else {
      render();
    }
  }
  } catch (error) {
    renderErrorState(
      "Action failed. Please retry.",
      error instanceof Error ? error.message : String(error)
    );
  } finally {
    updateDevBannerFromStatus();
  }
});

async function init() {
  try {
    await probeBackendHealth();
    updateDevBannerFromStatus();
    if (backendHealthTicker) {
      clearInterval(backendHealthTicker);
    }
    backendHealthTicker = setInterval(async () => {
      await probeBackendHealth();
      updateDevBannerFromStatus();
    }, 20000);

    renderLoadingState("Initializing app");
    boot = await getBootstrapData();
    state.wishlistIds = await listWishlistProductIds(USER_ID);
    const activeCompare = await getActiveCompareGroup(USER_ID);
    if (Array.isArray(activeCompare?.product_ids)) {
      state.compareTray = activeCompare.product_ids.slice(0, 4);
    } else {
      state.compareTray = [];
      await upsertCompareGroup(USER_ID, []);
    }

    await render();

    // Smoke check item + offers API shape for the scaffold.
    const first = boot.products[0];
    if (first) {
      await Promise.all([getProductById(first.id), getOffersByProductId(first.id)]);
    }
  } catch (error) {
    updateDevBannerFromStatus();
    renderErrorState(
      "Initialization failed.",
      error instanceof Error ? error.message : String(error)
    );
  }
}

init();
