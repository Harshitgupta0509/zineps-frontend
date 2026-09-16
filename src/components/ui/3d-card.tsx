"use client";

// Adapted from Aceternity UI 3D Card, Manu Arora.
// Source: https://ui.aceternity.com/registry/3d-card.json
// Keeps its context-based layer separation; adds bounded tilt and reduced motion.
import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

const MouseEnterContext = createContext(false);
export function CardContainer({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);
  const reduced = useReducedMotion();
  return <MouseEnterContext.Provider value={entered && !reduced}>
    <article ref={ref} className={`aceternity-card ${className}`}
      onPointerMove={event => {
        if (reduced || event.pointerType !== "mouse") return;
        const box = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - box.left) / box.width - .5;
        const y = (event.clientY - box.top) / box.height - .5;
        event.currentTarget.style.transform = `perspective(1200px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
      }}
      onPointerEnter={event => { if (event.pointerType === "mouse") setEntered(true); }}
      onPointerLeave={() => { setEntered(false); if (ref.current) ref.current.style.transform = ""; }}>
      {children}
    </article>
  </MouseEnterContext.Provider>;
}
export function CardItem({ children, translateZ = 24, className = "" }: { children: ReactNode; translateZ?: number; className?: string }) {
  const entered = useContext(MouseEnterContext);
  return <div className={`aceternity-layer ${className}`} style={{ transform: `translateZ(${entered ? translateZ : 0}px)` }}>{children}</div>;
}
