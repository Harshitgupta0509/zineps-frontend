"use client";
import { useState } from "react";
import { copy } from "@/content/site";
export function Faq() {
  const [query, setQuery] = useState("");
  const entries = Array.from({ length: 6 }, (_, i) => ({
    question: copy[`faqQ${i}`],
    answer: copy[`faqA${i}`],
    id: i,
  }));
  const filtered = entries.filter((item) =>
    `${item.question} ${item.answer}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <section className="section muted" id="faq">
      <div className="container faq-layout">
        <div className="section-intro">
          <h2>{copy.faqH}</h2>
          <p>{copy.faqP}</p>
          <label className="search-label" htmlFor="faq-search">
            Search questions
          </label>
          <input
            id="faq-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions…"
          />
        </div>
        <div className="faq-list">
          <span className="sr-only" role="status">
            {filtered.length} questions found
          </span>
          {filtered.map((item) => (
            <details name="faq" key={item.id} className="faq-item">
              <summary>
                <span className="faq-number">0{item.id + 1}</span>
                <h3>{item.question}</h3>
                <span className="faq-icon" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
          {filtered.length === 0 && (
            <p className="empty-state">
              No matching questions. Try another search.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
