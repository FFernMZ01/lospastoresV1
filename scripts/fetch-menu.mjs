import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const API_URL = "https://api.kukipos.com/api/restaurant/onlinemenu";
const DEFAULT_OUTPUT = path.join(PROJECT_ROOT, "data", "kukipos-menu.raw.json");
const RETRY_DELAYS_MS = [15_000, 30_000, 60_000];

function readFlag(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function requestMenu(token) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  let payload;
  try {
    payload = await response.json();
  } catch {
    throw new Error(`KukiPOS returned invalid JSON (HTTP ${response.status}).`);
  }

  if (!response.ok) {
    throw new Error(payload?.message || `KukiPOS request failed (HTTP ${response.status}).`);
  }

  if (payload?.error) {
    throw new Error(payload.message || "KukiPOS returned an error.");
  }

  if (!Array.isArray(payload?.data) || payload.data.length === 0) {
    throw new Error("KukiPOS returned no menu categories.");
  }

  return payload;
}

async function fetchWithRetry(token) {
  for (let attempt = 0; ; attempt += 1) {
    try {
      return await requestMenu(token);
    } catch (error) {
      const message = String(error?.message || error);
      const rateLimited = /rate|exceeded the number of calls allowed|429/i.test(message);

      if (!rateLimited || attempt >= RETRY_DELAYS_MS.length) {
        throw error;
      }

      const delay = RETRY_DELAYS_MS[attempt];
      console.warn(`KukiPOS rate limit reached. Retrying in ${delay / 1000}s...`);
      await wait(delay);
    }
  }
}

async function main() {
  const token = readFlag("--token") || process.env.KUKIPOS_STORE_TOKEN || "OT-Pastores";
  const output = path.resolve(readFlag("--output") || DEFAULT_OUTPUT);

  console.log(`Fetching KukiPOS menu for ${token}...`);
  const payload = await fetchWithRetry(token);

  await fs.mkdir(path.dirname(output), { recursive: true });
  await fs.writeFile(output, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  const itemCount = payload.data.reduce(
    (total, category) => total + (Array.isArray(category.data) ? category.data.length : 0),
    0,
  );

  console.log(`Saved ${payload.data.length} categories and ${itemCount} items to ${output}`);
}

main().catch((error) => {
  console.error(`Menu fetch failed: ${error.message}`);
  process.exitCode = 1;
});
