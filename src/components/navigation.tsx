"use client";
import { useState, useRef, useEffect } from "react";
import { site, products, knowledge, register } from "@/content/site";
import { Arrow } from "./ui";

function Dropdown({
  name,
  items,
  soon = false,
}: {
  name: string;
  items: readonly (readonly [string, string])[];
  soon?: boolean;
}) {
  return (
    <details className="nav-dropdown">
      <summary>
        {name}
      </summary>
      <div className="dropdown-panel">
        {items.map(([label, url]) => (
          <a key={url} href={`${site}${url}`}>
            {label}
          </a>
        ))}
        {soon && (
          <span className="coming-soon">
            Use Cases <small>Coming soon</small>
          </span>
        )}
      </div>
    </details>
  );
}
export function Navigation() {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    function close(event: MouseEvent) {
      if (!header.current?.contains(event.target as Node)) {
        header.current
          ?.querySelectorAll("details[open]")
          .forEach((el) => el.removeAttribute("open"));
        setOpen(false);
      }
    }
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);
  return (
    <header
      ref={header}
      className="site-header"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false);
          header.current
            ?.querySelectorAll("details[open]")
            .forEach((el) => el.removeAttribute("open"));
          toggle.current?.focus();
        }
      }}
    >
      <div className="container nav-shell">
        <a className="brand" href="/" aria-label="Zineps home">
          <img
            src="/assets/zineps-logo-black.svg"
            width="118"
            height="36"
            alt="Zineps"
          />
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
          <span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>
        <nav
          id="primary-navigation"
          aria-label="Primary navigation"
          className={open ? "nav-content is-open" : "nav-content"}
        >
          <div className="nav-links">
            <Dropdown name="Products" items={products} />
            <a href={`${site}/integrations`}>Integrations</a>
            <a href={`${site}/pricing`}>Pricing</a>
            <a href={`${site}/blog?lang=en`}>Blog</a>
            <Dropdown name="Knowledge Base" items={knowledge} soon />
          </div>
          <div className="nav-actions">
            <details className="nav-dropdown language">
              <summary aria-label="Select language, current language English">
                <span lang="en">EN</span>
                <svg className="language-chevron" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </summary>
              <div className="dropdown-panel">
                <a href="/" lang="en" aria-current="page">
                  English (EN)
                </a>
                {[
                  ["Nederlands (NL)", "nl"],
                  ["Deutsch (DE)", "de"],
                  ["Español (ES)", "es"],
                ].map(([label, lang]) => (
                  <a href={`${site}/?lang=${lang}`} lang={lang} key={lang}>
                    {label}
                  </a>
                ))}
              </div>
            </details>
            <a className="button nav-cta" href={register}>
              Sign up for free
              <Arrow />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
