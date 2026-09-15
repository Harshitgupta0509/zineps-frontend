import optimizedAssets from "./optimized-assets.json";
type Asset = { src: string; width: number; height: number; srcSet?: string };
export function asset(file: string): Asset {
  return (
    (optimizedAssets as Record<string, Asset>)[file] ?? {
      src: `/assets/${file}`,
      width: 1429,
      height: 982,
    }
  );
}
