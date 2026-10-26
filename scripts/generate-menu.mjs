import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_INPUT = path.join(PROJECT_ROOT, "data", "kukipos-menu.raw.json");
const MENU_PAGE = path.join(PROJECT_ROOT, "public", "menu.html");
const FRAGMENT_OUTPUT = path.join(PROJECT_ROOT, "public", "generated", "menu-content.html");
const CATALOG_OUTPUT = path.join(PROJECT_ROOT, "public", "data", "menu-catalog.json");
const MENU_IMAGE_DIR = path.join(PROJECT_ROOT, "public", "images", "menu");
const START_MARKER = "<!-- KUKIPOS_MENU_START -->";
const END_MARKER = "<!-- KUKIPOS_MENU_END -->";
const STORE_TOKEN = process.env.KUKIPOS_STORE_TOKEN || "OT-Pastores";
const IMAGE_EXTENSIONS = ["webp", "avif", "jpg", "jpeg", "png"];

function readFlag(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function stripHtml(value = "") {
  return String(value)
    .replace(/<br\s*\/?\s*>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "menu";
}

function cleanItemName(value = "") {
  return String(value)
    .replace(/^pt\.?\s+/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function activeItems(category) {
  return (Array.isArray(category?.data) ? category.data : []).filter(
    (item) => Number(item?.off || 0) === 0 && item?.code && item?.description,
  );
}

function getPrices(item) {
  return [item.price1, item.price2, item.price3]
    .map(Number)
    .filter((price) => Number.isFinite(price) && price > 0);
}

function priceLabel(item) {
  const prices = [...new Set(getPrices(item))];
  if (!prices.length) return "See online";
  const minimum = Math.min(...prices);
  return `${prices.length > 1 ? "From " : ""}$${minimum.toFixed(2)}`;
}

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 883228847d4f1fef2446cea118e0c307f5c2e34a
function safeApiImageUrl(value) {
  if (!value) return "";

  try {
    const url = new URL(String(value).trim());
    return url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
}

async function resolveImage(item) {
<<<<<<< HEAD
=======
=======
async function firstExistingImage(item) {
>>>>>>> b69fff521baa45f17081013e676f6a6946d3c7b0
>>>>>>> 883228847d4f1fef2446cea118e0c307f5c2e34a
  const code = String(item.code || "").trim();
  const slug = slugify(cleanItemName(item.description));
  const bases = [code, slug].filter(Boolean);

  for (const base of bases) {
    for (const extension of IMAGE_EXTENSIONS) {
      const filename = `${base}.${extension}`;
      try {
        await fs.access(path.join(MENU_IMAGE_DIR, filename));
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 883228847d4f1fef2446cea118e0c307f5c2e34a
        return {
          url: `images/menu/${filename}`,
          source: "local",
          apiUrl: safeApiImageUrl(item.htmlurl),
        };
<<<<<<< HEAD
=======
=======
        return `images/menu/${filename}`;
>>>>>>> b69fff521baa45f17081013e676f6a6946d3c7b0
>>>>>>> 883228847d4f1fef2446cea118e0c307f5c2e34a
      } catch {
        // Try the next supported filename.
      }
    }
  }

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 883228847d4f1fef2446cea118e0c307f5c2e34a
  const apiUrl = safeApiImageUrl(item.htmlurl);
  return {
    url: apiUrl,
    source: apiUrl ? "kukipos" : "",
    apiUrl,
  };
<<<<<<< HEAD
=======
=======
  return "";
>>>>>>> b69fff521baa45f17081013e676f6a6946d3c7b0
>>>>>>> 883228847d4f1fef2446cea118e0c307f5c2e34a
}

function orderUrl(code) {
  const params = new URLSearchParams({ id: STORE_TOKEN, code: String(code) });
  return `order/index.html?${params.toString()}`;
}

async function normalizeMenu(payload) {
  const categories = [];

  for (const category of payload.data) {
    const items = [];
    for (const item of activeItems(category)) {
<<<<<<< HEAD
      const image = await resolveImage(item);
=======
<<<<<<< HEAD
      const image = await resolveImage(item);
=======
>>>>>>> b69fff521baa45f17081013e676f6a6946d3c7b0
>>>>>>> 883228847d4f1fef2446cea118e0c307f5c2e34a
      items.push({
        code: String(item.code),
        name: cleanItemName(item.description),
        description: stripHtml(item.htmlnotes),
        price: priceLabel(item),
<<<<<<< HEAD
        image: image.url,
        imageSource: image.source,
        apiImage: image.apiUrl,
=======
<<<<<<< HEAD
        image: image.url,
        imageSource: image.source,
        apiImage: image.apiUrl,
=======
        image: await firstExistingImage(item),
>>>>>>> b69fff521baa45f17081013e676f6a6946d3c7b0
>>>>>>> 883228847d4f1fef2446cea118e0c307f5c2e34a
        orderUrl: orderUrl(item.code),
      });
    }

    if (!items.length) continue;

    const categoryName = String(category.title || "Menu").trim();
    categories.push({
      id: category.id ?? categories.length + 1,
      name: categoryName,
      key: `${category.id ?? categories.length + 1}-${slugify(categoryName)}`,
      items,
    });
  }

  return {
    generatedAt: new Date().toISOString(),
    source: "KukiPOS",
    storeToken: STORE_TOKEN,
    restaurant: payload.message || "Los Pastores",
    categories,
    itemCount: categories.reduce((total, category) => total + category.items.length, 0),
  };
}

function renderButton(category, index) {
  const active = index === 0;
  return `              <button type="button" class="lp-menu-category-button${active ? " is-active" : ""}" role="tab" id="menu-tab-${escapeHtml(category.key)}" aria-controls="${escapeHtml(category.key)}" aria-selected="${active}" data-menu-target="${escapeHtml(category.key)}"${active ? "" : ' tabindex="-1"'}>${escapeHtml(category.name)}</button>`;
}

function renderItem(item) {
  const image = item.image
    ? `\n              <img class="lp-menu-item-image" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" loading="lazy">`
    : "";
  const description = item.description
    ? `\n                <p>${escapeHtml(item.description)}</p>`
    : "";

  return `            <article class="lp-menu-item${item.image ? " lp-menu-item-with-image" : ""}" data-item-code="${escapeHtml(item.code)}">${image}
              <div class="lp-menu-item-copy">
                <h3>${escapeHtml(item.name)}</h3>${description}
              </div>
              <div class="lp-menu-item-actions">
                <strong class="lp-menu-item-price">${escapeHtml(item.price)}</strong>
                <a class="lp-menu-item-add" href="${escapeHtml(item.orderUrl)}" aria-label="Order ${escapeHtml(item.name)} online" title="Order ${escapeHtml(item.name)} online"><span aria-hidden="true">+</span></a>
              </div>
            </article>`;
}

function renderPanel(category, index) {
  const active = index === 0;
  return `        <section id="${escapeHtml(category.key)}" class="lp-menu-section lp-menu-section-cream${active ? " is-active" : ""}" role="tabpanel" aria-labelledby="menu-tab-${escapeHtml(category.key)}" data-menu-panel${active ? "" : " hidden"}>
          <div class="lp-container">
            <div class="lp-menu-section-heading lp-menu-section-heading-simple">
              <div>
                <span class="lp-section-eyebrow">${category.items.length} ${category.items.length === 1 ? "item" : "items"}</span>
                <h2>${escapeHtml(category.name)}</h2>
              </div>
            </div>
            <div class="lp-menu-grid lp-menu-grid-three">
${category.items.map(renderItem).join("\n")}
            </div>
          </div>
        </section>`;
}

function renderFragment(catalog) {
  return `        <div class="lp-menu-browser-layout" data-generated-menu="kukipos">
          <aside class="lp-menu-sidebar" aria-label="Choose a menu group">
            <div class="lp-menu-category-list" role="tablist" aria-label="Menu groups">
${catalog.categories.map(renderButton).join("\n")}
            </div>
          </aside>
          <div class="lp-menu-panels">
${catalog.categories.map(renderPanel).join("\n\n")}
          </div>
        </div>`;
}

async function injectFragment(fragment) {
  const page = await fs.readFile(MENU_PAGE, "utf8");
  const start = page.indexOf(START_MARKER);
  const end = page.indexOf(END_MARKER);

  if (start < 0 || end < 0 || end <= start) {
    throw new Error("menu.html is missing the KUKIPOS_MENU_START / KUKIPOS_MENU_END markers.");
  }

  const nextPage = `${page.slice(0, start + START_MARKER.length)}\n${fragment}\n        ${page.slice(end)}`;
  await fs.writeFile(MENU_PAGE, nextPage, "utf8");
}

async function main() {
  const input = path.resolve(readFlag("--input") || DEFAULT_INPUT);
  const payload = JSON.parse(await fs.readFile(input, "utf8"));

  if (!Array.isArray(payload?.data)) {
    throw new Error(`${input} does not contain a KukiPOS data array.`);
  }

  const catalog = await normalizeMenu(payload);
  const fragment = renderFragment(catalog);

  await fs.mkdir(path.dirname(FRAGMENT_OUTPUT), { recursive: true });
  await fs.mkdir(path.dirname(CATALOG_OUTPUT), { recursive: true });
  await fs.writeFile(FRAGMENT_OUTPUT, `${fragment}\n`, "utf8");
  await fs.writeFile(CATALOG_OUTPUT, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
  await injectFragment(fragment);

  console.log(`Generated ${catalog.categories.length} categories and ${catalog.itemCount} items.`);
  console.log(`Updated ${MENU_PAGE}`);
}

main().catch((error) => {
  console.error(`Menu generation failed: ${error.message}`);
  process.exitCode = 1;
});
