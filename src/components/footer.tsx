import { products, site } from "@/content/site";
const company = [
  ["About us", "/about-us"],
  ["Blog", "/blog/"],
  ["Careers", "/careers"],
  ["Privacy Policy", "/privacy-policy"],
  ["Terms and conditions", "/terms"],
];
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a href="/" aria-label="Zineps home">
            <img
              src="/assets/zineps-logo-black.svg"
              width="118"
              height="36"
              alt="Zineps"
            />
          </a>
          <p>© 2025 Zineps.</p>
        </div>
        <nav aria-label="Product links">
          <h2>Products</h2>
          {products.map(([label, href]) => (
            <a key={href} href={`${site}${href}`}>
              {label}
            </a>
          ))}
        </nav>
        <nav aria-label="Company links">
          <h2>Company</h2>
          {company.map(([label, href]) => (
            <a key={href} href={`${site}${href}`}>
              {label}
            </a>
          ))}
        </nav>
        <div>
          <h2>Contact</h2>
          <address>
            <a href="mailto:support@zineps.com">info@zineps.com</a>
            <a href="tel:0202614474">020 261 4474</a>
            <a href="https://maps.google.com/?q=Herikerbergweg+288+Amsterdam">
              Herikerbergweg 288
              <br />
              1101CT, Amsterdam
            </a>
          </address>
        </div>
      </div>
    </footer>
  );
}
