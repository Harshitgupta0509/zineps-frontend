# Zineps frontend foundation

Next.js App Router, React, TypeScript and Tailwind CSS. Static export; no backend, account handling, shipping APIs, or database.

## Run

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000. `npm run build` creates the static site in `out/`.

## Verify

```sh
npm run typecheck
npx playwright install chromium
npm run test:e2e
```

The browser suite covers the complete page at 390, 768 and 1440 pixels, overflow, images, WCAG A/AA automated checks, navigation, FAQ search, keyboard activation, and the newsletter handoff. Automated accessibility checks complement, rather than replace, human review.

## References and content

- Content: https://www.zineps.com/ (English copy captured during the preceding verification phase).
- Structure: https://organic-pepper-375154.framer.app/ and the saved Framer scripts in the project root. Framer was not modified in this phase.
- `src/content/copy.json`: verified copy mechanically imported from the prior phase; `src/content/site.ts`: navigation, logos and current news snapshot.
- `src/content/assets.json`: provenance for the local original Zineps dashboard, mockups and logos. These assets remain the property of their respective owners.
- Large source SVGs contain embedded raster data (one exceeds 40 MB). `scripts/optimize-assets.mjs` generates lightweight WebP copies and responsive product variants. The page uses these through `src/content/optimized-assets.json`, with dimensions from the actual images. Source artwork is preserved unchanged.
- The English live source says “The intelligent layer for global logistics”; this is preserved in preference to the shorter example in the brief.
- The source displays `info@zineps.com` but links it to `mailto:support@zineps.com`. The implementation preserves both.
- The current English source navigation has a signup action, not a separate Login link; no unverified account destination is invented.
- Other locales hand off to the original website. This foundation itself is English.
- Newsletter submission validates email locally and offers a handoff to the original Zineps site. It does not send/store the address or report a successful subscription. A real subscription endpoint remains outside this frontend-only phase.
- Recent news is a static snapshot of the three newest cards in the approved blueprint; View all goes to the source newsroom.
- Robots remain noindex/nofollow for the review foundation. Update deliberately for the production launch.

## Structure

`src/components/sections/` contains product, platform and company sections. Shared presentation primitives live in `ui.tsx`; navigation, FAQ and newsletter are the only client interaction boundaries. `src/app/globals.css` defines the responsive design tokens and layouts. Original assets are served locally with explicit dimensions and lazy loading below the hero.

The hero, Shipping AI and global coverage areas reserve room for later visual work via `data-future-visual` markers. Advanced motion, component libraries and 3D are intentionally deferred to subsequent phases.
