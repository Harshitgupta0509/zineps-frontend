"use client";

import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";

export function RevealOnView({ children, className = "", ...props }: {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.unobserve(node);
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} reveal-on-view${visible ? " is-visible" : ""}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CountUp({
  value,
  target,
  className = "",
}: {
  value: string;
  target: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const startedAt = performance.now();
        const duration = 1100;
        const numeric = value.match(/[\d.,]+/)?.[0] ?? "0";
        const prefix = value.slice(0, value.indexOf(numeric));
        const suffix = value.slice(value.indexOf(numeric) + numeric.length);
        const decimals = numeric.includes(".") && !numeric.includes(",") ? 1 : 0;
        const formatter = new Intl.NumberFormat("en-US", {
          maximumFractionDigits: decimals,
          minimumFractionDigits: decimals,
        });
        let frame = 0;

        const tick = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - (1 - progress) ** 3;
          setDisplay(`${prefix}${formatter.format(target * eased)}${suffix}`);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
        observer.unobserve(node);
        return () => cancelAnimationFrame(frame);
      },
      { threshold: 0.65 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, value]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
