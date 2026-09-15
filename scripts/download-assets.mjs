import { mkdir, writeFile } from "node:fs/promises";
const files = [
  "zineps-dashboard.svg",
  "carrier-broker-mockup.svg",
  "shippng-zineps.svg",
  "shipping-zineps-b2b.svg",
  "integrations-mockup.svg",
  "zineps-partnerpanel.svg",
  "zineps-logo-black.svg",
  "image%20149.png",
  "image%20142.png",
  "image%20150.png",
  "thetester.svg",
  "101kruiden.svg",
  ...[
    "bpost",
    "bol",
    "postnl",
    "temu",
    "dhl",
    "amazon",
    "dpd",
    "shopify",
    "correos",
    "ups",
    "magento",
    "gls",
    "woo",
    "fedex",
  ].map((x) => `hero-${x}.svg`),
  "db-schenker-logo.svg",
  "ccv-shop-logo.svg",
  "snelstart-logo.svg",
  "exact-logo.svg",
];
await mkdir("public/assets", { recursive: true });
const manifest = [];
for (let start = 0; start < files.length; start += 5) {
  await Promise.all(
    files.slice(start, start + 5).map(async (file) => {
      const url = `https://www.zineps.com/${file}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`${response.status}: ${url}`);
      const body = Buffer.from(await response.arrayBuffer());
      const local = decodeURIComponent(file).replaceAll(" ", "-");
      await writeFile(`public/assets/${local}`, body);
      manifest.push({ file: local, source: url, bytes: body.length });
    }),
  );
}
await writeFile(
  "src/content/assets.json",
  JSON.stringify(
    manifest.sort((a, b) => a.file.localeCompare(b.file)),
    null,
    2,
  ) + "\n",
);
console.log(`Saved ${manifest.length} original Zineps assets.`);
