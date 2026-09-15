import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
const assets = JSON.parse(await readFile("src/content/assets.json", "utf8"));
const manifest = {};
for (const asset of assets) {
  const input = `public/assets/${asset.file}`;
  // This original SVG contains an embedded raster exceeding libxml's text-node limit.
  const options = {
    unlimited: asset.file === "shippng-zineps.svg",
    limitInputPixels: 40000000,
  };
  const info = await sharp(input, options).metadata();
  const entry = {
    src: `/assets/${asset.file}`,
    width: info.width,
    height: info.height,
  };
  if (asset.bytes > 150000) {
    const product =
      /dashboard|mockup|shippng|shipping-zineps|partnerpanel/.test(asset.file);
    const width = product ? 1600 : 320;
    const output = `${asset.file}.webp`;
    const result = await sharp(input, options)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 90 })
      .toFile(`public/assets/${output}`);
    entry.src = `/assets/${output}`;
    entry.width = result.width;
    entry.height = result.height;
    if (product) {
      const small = `${asset.file}.small.webp`;
      await sharp(input, options)
        .resize({ width: 640, withoutEnlargement: true })
        .webp({ quality: 88 })
        .toFile(`public/assets/${small}`);
      entry.srcSet = `/assets/${small} 640w, /assets/${output} ${result.width}w`;
    }
    console.log(
      `${asset.file}: ${Math.round(asset.bytes / 1024)} KB → ${Math.round(result.size / 1024)} KB`,
    );
  }
  manifest[asset.file] = entry;
}
await writeFile(
  "src/content/optimized-assets.json",
  JSON.stringify(manifest, null, 2) + "\n",
);
