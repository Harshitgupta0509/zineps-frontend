"use client";
import { useState } from "react";
import { site } from "@/content/site";
export function Newsletter() {
  const [continueOnSource, setContinueOnSource] = useState(false);
  return (
    <div className="newsletter">
      <h3>Stay updated.</h3>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setContinueOnSource(true);
          }}
        >
          <label className="sr-only" htmlFor="newsletter-email">
            Email address
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email address"
            required
          />
          <button className="button" type="submit">
            Subscribe
          </button>
        </form>
        {continueOnSource && (
          <p role="status" className="form-status">
            <a href={site}>
              Continue on Zineps to complete your subscription →
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
