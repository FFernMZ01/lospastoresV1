import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const RAW_MENU_FILE = path.join(PROJECT_ROOT, "data", "kukipos-menu.raw.json");

function readFlag(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function run(script, args = []) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [path.join(PROJECT_ROOT, "scripts", script), ...args], {
      cwd: PROJECT_ROOT,
      stdio: "inherit",
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${script} exited with code ${code}.`));
    });
  });
}

async function main() {
  const source = readFlag("--source");

  if (source) {
    await fs.mkdir(path.dirname(RAW_MENU_FILE), { recursive: true });
    await fs.copyFile(path.resolve(source), RAW_MENU_FILE);
    console.log(`Imported menu snapshot from ${path.resolve(source)}`);
  } else {
    await run("fetch-menu.mjs");
  }

  await run("generate-menu.mjs");
}

main().catch((error) => {
  console.error(`Menu sync failed: ${error.message}`);
  process.exitCode = 1;
});
