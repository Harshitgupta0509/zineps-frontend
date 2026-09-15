import verifiedCopy from "./copy.json";
export const copy: Record<string, string> = verifiedCopy;
export const site = "https://www.zineps.com";
export const register = "https://app.zineps.com/Account/Register";
export const products = [
  ["Shipping for e-commerce & SMEs", "/shipping"],
  ["Platform for logistics providers", "/logistics-operating-system"],
  ["Shipping AI", "/ai-shipping-intelligence"],
] as const;
export const knowledge = [
  ["Overview", "/knowledge-base"],
  ["Helpcenter", "/knowledge-base/helpcenter"],
  ["API Documentation", "/knowledge-base/api-docs"],
] as const;
export const integrations = [
  ["Bpost", "hero-bpost.svg"],
  ["Bol", "hero-bol.svg"],
  ["PostNL", "hero-postnl.svg"],
  ["Temu", "hero-temu.svg"],
  ["DHL", "hero-dhl.svg"],
  ["Amazon", "hero-amazon.svg"],
  ["DPD", "hero-dpd.svg"],
  ["Shopify", "hero-shopify.svg"],
  ["Correos", "hero-correos.svg"],
  ["UPS", "hero-ups.svg"],
  ["Magento", "hero-magento.svg"],
  ["GLS", "hero-gls.svg"],
  ["WooCommerce", "hero-woo.svg"],
  ["Fedex", "hero-fedex.svg"],
  ["DB Schenker", "db-schenker-logo.svg"],
  ["CCV Shop", "ccv-shop-logo.svg"],
  ["SnelStart", "snelstart-logo.svg"],
  ["Exact", "exact-logo.svg"],
] as const;
export const customers = [
  ["Mate", "image-149.png"],
  ["Monkey", "image-142.png"],
  ["Trent", "image-150.png"],
  ["The Tester", "thetester.svg"],
  ["101Kruiden", "101kruiden.svg"],
] as const;
export const news = [
  [
    "NEWS",
    "July 23, 2026",
    "Amsterdam, The Netherlands, Zineps has successfully closed its late-seed investment round.",
    "Zineps closes late-seed investment to accelerate its next phase of growth",
    "/newsroom/late-seed",
  ],
  [
    "UPDATES",
    "July 20, 2026",
    "Full customs-data support for bulk shipment imports, EORI and VAT autofill in the address book, corrected bol.",
    "Late July 2026 Platform Update: Bulk Customs Automation, Smarter Address Books, and More Reliable Carriers",
    "/newsroom/late-july-2026-platform-update",
  ],
  [
    "NEWS",
    "May 15, 2026",
    "Native shipping, tracking, and delivery automation for Ukrainian ecommerce",
    "Zineps now integrates with Nova Post",
    "/newsroom/zineps-customers-can-now-connect-nova-post-directl",
  ],
] as const;
