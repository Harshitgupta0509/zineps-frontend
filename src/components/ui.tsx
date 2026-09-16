import type { ReactNode } from "react";
import { asset } from "@/content/images";
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M4 12h15m-6-6 6 6-6 6" />
    </svg>
  );
}
export function ButtonLink({
  href,
  children,
  secondary = false,
  text = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  text?: boolean;
}) {
  return (
    <a className={`button ${text ? "button-text" : secondary ? "button-secondary" : "button-primary"}`} href={href}>
      {children}
      <Arrow />
    </a>
  );
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}
export function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="container">{children}</div>
    </section>
  );
}
export function Intro({
  label,
  title,
  description,
  center = false,
}: {
  label?: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div className={`section-intro ${center ? "center" : ""}`}>
      {label && <Eyebrow>{label}</Eyebrow>}
      <h2>{title}</h2>
      {description && <p className="lead">{description}</p>}
    </div>
  );
}
export function ProductImage({
  file,
  alt,
  priority = false,
  className = "",
}: {
  file: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  const image = asset(file);
  return (
    <div className={`product-image ${className}`}>
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes="(max-width: 639px) 90vw, (max-width: 959px) 45vw, 650px"
        alt={alt}
        width={image.width}
        height={image.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    </div>
  );
}
export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="bullets">
      {items.map((item) => (
        <li key={item}>
          <span aria-hidden="true">✓</span>
          {item}
        </li>
      ))}
    </ul>
  );
}
