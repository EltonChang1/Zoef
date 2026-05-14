import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = dirname(__dirname);
const dataDir = join(rootDir, "data");

const PORT = Number(process.env.PORT || 3001);

const db = {
  products: [],
  brands: [],
  offers: [],
  rankings: [],
  rankingUpdates: [],
  users: [],
  wishlist: [],
  compareGroups: []
};

async function loadSeed() {
  const read = async (name) =>
    JSON.parse(await readFile(join(dataDir, name), "utf8"));
  db.products = await read("products.json");
  db.brands = await read("brands.json");
  db.offers = await read("offers.json");
  db.rankings = await read("rankings.json");
  db.rankingUpdates = await read("ranking_updates.json");
  db.users = await read("users.json");
  db.wishlist = await read("wishlist.json");
  db.compareGroups = await read("compare_groups.json");
}

function json(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PATCH,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  res.end(JSON.stringify(payload));
}

function notFound(res) {
  json(res, 404, { error: "Not found" });
}

function lower(text) {
  return String(text || "").toLowerCase();
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  if (!chunks.length) {
    return {};
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function searchCatalog(query) {
  const q = lower(query).trim();
  const brandById = new Map(db.brands.map((brand) => [brand.id, brand]));
  const matches = db.products.filter((product) => {
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
    return target.includes(q);
  });
  return {
    top: matches,
    items: matches,
    brands: db.brands.filter((brand) => lower(brand.name).includes(q))
  };
}

function getPathMatch(pathname, prefix) {
  if (!pathname.startsWith(prefix)) {
    return null;
  }
  return decodeURIComponent(pathname.slice(prefix.length));
}

const server = createServer(async (req, res) => {
  try {
    if (!req.url || !req.method) {
      return notFound(res);
    }
    if (req.method === "OPTIONS") {
      return json(res, 204, {});
    }

    const url = new URL(req.url, `http://localhost:${PORT}`);
    const { pathname, searchParams } = url;

    if (req.method === "GET" && pathname === "/health") {
      return json(res, 200, { ok: true });
    }

    if (req.method === "GET" && pathname === "/api/feed") {
      return json(res, 200, {
        products: db.products.slice(0, 4),
        updates: db.rankingUpdates
      });
    }

    if (req.method === "GET" && pathname === "/api/search") {
      return json(res, 200, searchCatalog(searchParams.get("q") || ""));
    }

    if (req.method === "GET" && pathname === "/api/bootstrap") {
      return json(res, 200, {
        products: db.products,
        brands: db.brands,
        rankings: db.rankings,
        rankingUpdates: db.rankingUpdates,
        users: db.users
      });
    }

    if (req.method === "GET" && pathname === "/api/wishlist") {
      const userId = searchParams.get("userId") || "";
      const ids = db.wishlist
        .filter((item) => item.user_id === userId)
        .map((item) => item.product_id);
      return json(res, 200, ids);
    }

    if (req.method === "GET" && pathname === "/api/compare-groups/active") {
      const userId = searchParams.get("userId") || "";
      if (!userId) {
        return json(res, 400, { error: "userId is required" });
      }
      const active = db.compareGroups.find(
        (group) => group.user_id === userId && group.status === "active"
      );
      return json(
        res,
        200,
        active || {
          id: null,
          user_id: userId,
          title: "Current Compare Tray",
          product_ids: [],
          status: "active"
        }
      );
    }

    const productId = getPathMatch(pathname, "/api/products/");
    if (req.method === "GET" && productId && !productId.includes("/")) {
      const product = db.products.find((item) => item.id === productId);
      if (!product) {
        return json(res, 404, { error: "Product not found" });
      }
      return json(res, 200, product);
    }

    const offerPathPrefix = "/api/products/";
    if (
      req.method === "GET" &&
      pathname.startsWith(offerPathPrefix) &&
      pathname.endsWith("/offers")
    ) {
      const dynamic = pathname.slice(offerPathPrefix.length, -"/offers".length);
      const offers = db.offers.filter((offer) => offer.product_id === dynamic);
      return json(res, 200, offers);
    }

    if (req.method === "POST" && pathname === "/api/wishlist") {
      const { userId, productId: bodyProductId } = await readBody(req);
      if (!userId || !bodyProductId) {
        return json(res, 400, { error: "userId and productId are required" });
      }
      const exists = db.wishlist.some(
        (item) => item.user_id === userId && item.product_id === bodyProductId
      );
      if (!exists) {
        db.wishlist.push({
          id: `wish_${Date.now()}`,
          user_id: userId,
          product_id: bodyProductId,
          created_at: new Date().toISOString()
        });
      }
      return json(res, 200, db.wishlist);
    }

    if (req.method === "POST" && pathname === "/api/compare-groups") {
      const { userId, productIds = [] } = await readBody(req);
      if (!userId) {
        return json(res, 400, { error: "userId is required" });
      }
      const normalized = Array.from(new Set(productIds)).slice(0, 4);
      const active = db.compareGroups.find(
        (group) => group.user_id === userId && group.status === "active"
      );
      if (active) {
        active.product_ids = normalized;
        return json(res, 200, active);
      }
      const group = {
        id: `compare_${Date.now()}`,
        user_id: userId,
        title: "Current Compare Tray",
        product_ids: normalized,
        status: "active"
      };
      db.compareGroups.push(group);
      return json(res, 200, group);
    }

    if (req.method === "POST" && pathname === "/api/compare-groups/save") {
      const { userId, title } = await readBody(req);
      if (!userId) {
        return json(res, 400, { error: "userId is required" });
      }
      const active = db.compareGroups.find(
        (group) => group.user_id === userId && group.status === "active"
      );
      if (!active || !active.product_ids.length) {
        return json(res, 400, { error: "No active compare group to save" });
      }
      const saved = {
        id: `compare_saved_${Date.now()}`,
        user_id: userId,
        title: title || "Saved comparison",
        product_ids: [...active.product_ids],
        status: "saved",
        created_at: new Date().toISOString()
      };
      db.compareGroups.push(saved);
      return json(res, 200, saved);
    }

    if (req.method === "POST" && pathname === "/api/rankings") {
      const { listId, productId: bodyProductId, note = "" } = await readBody(req);
      const list = db.rankings.find((ranking) => ranking.id === listId);
      if (!list) {
        return json(res, 404, { error: "Ranking list not found" });
      }
      const exists = list.entries.some((entry) => entry.product_id === bodyProductId);
      if (!exists) {
        list.entries.push({
          product_id: bodyProductId,
          rank: list.entries.length + 1,
          note: note || "Added from API"
        });
      }
      return json(res, 200, list);
    }

    return notFound(res);
  } catch (error) {
    return json(res, 500, {
      error: "Unhandled server error",
      detail: error instanceof Error ? error.message : String(error)
    });
  }
});

loadSeed()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`zoef-backend running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to load seed data", error);
    process.exit(1);
  });
