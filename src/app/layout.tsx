import type { Metadata } from "next";
import "@fontsource-variable/geist";
import "./globals.css";
export const metadata: Metadata = {
  title: "AI Shipping Software for e-commerce & Logistics | Zineps",
  description:
    "One infrastructure with a dashboard and API. Use competitive shipping rates from our network of logistics service providers, your own shipping contracts, or both.",
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
