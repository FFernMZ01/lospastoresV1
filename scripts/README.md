# Los Pastores menu sync

Run `npm run menu:sync` from the project root to fetch the current menu for store token `OT-Pastores`, save a local snapshot, regenerate the menu catalog, and inject the generated navigation and cards into `public/menu.html`.

Useful commands:

- `npm run menu:fetch` — fetch only.
- `npm run menu:generate` — rebuild from `data/kukipos-menu.raw.json` without calling the API.
- `node scripts/sync-menu.mjs --source "path/to/menu.json"` — import a saved KukiPOS response and rebuild.

## Item images

Images are optional. Place them in `public/images/menu/` using either the KukiPOS item code or the generated item slug:

- `001-013.webp`
- `huevos-rancheros.webp`

Supported extensions are `.webp`, `.avif`, `.jpg`, `.jpeg`, and `.png`. Code-based filenames take priority. Items without a matching image render as clean text-only cards.

If there is no matching local file, the generator uses the secure `htmlurl` image supplied by KukiPOS. The catalog records the final `image`, its `imageSource` (`local` or `kukipos`), and the original `apiImage` URL. Local files always take priority, so an API image can be replaced later without changing the menu data.

## Online ordering

Each generated card includes a `+` link to `order/index.html?id=OT-Pastores&code=<item-code>`, which opens the matching product in the existing KukiPOS order app.
