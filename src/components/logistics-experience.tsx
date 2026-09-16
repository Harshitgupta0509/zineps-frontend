"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion, useMotionValueEvent, useMotionValue, useSpring } from "motion/react";

/** Shared route motif. Decorative paths are conceptual, not carrier coverage claims. */
export function RouteField() {
  return <svg className="route-field" viewBox="0 0 600 440" fill="none" aria-hidden="true">
    <g className="route-lines" stroke="currentColor" strokeWidth="1">
      <path d="M60 110H160Q190 110 210 140L300 220Q340 270 410 270H540" />
      <path d="M85 345H190Q230 345 250 300L300 220Q340 140 420 110H520" />
      <path d="M170 55Q220 80 250 145L300 220Q360 345 465 360" />
    </g>
    {[ [60,110], [85,345], [170,55], [300,220], [540,270], [520,110], [465,360] ].map(([cx,cy],i)=><g key={i}>
      <circle cx={cx} cy={cy} r={i===3 ? 12 : 6} fill="var(--mint)" fillOpacity=".16" />
      <circle cx={cx} cy={cy} r={i===3 ? 4 : 2.5} fill="var(--mint)" />
    </g>)}
    <circle className="route-parcel" r="3.5" fill="var(--mint)"><animateMotion dur="12s" repeatCount="indefinite" path="M60 110H160Q190 110 210 140L300 220Q340 270 410 270H540" /></circle>
    <circle className="route-parcel" r="3" fill="var(--mint)"><animateMotion dur="16s" begin="4s" repeatCount="indefinite" path="M85 345H190Q230 345 250 300L300 220Q340 140 420 110H520" /></circle>
  </svg>;
}

export function ProductStage({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const pointerX=useMotionValue(0),pointerY=useMotionValue(0);
  const tiltX=useSpring(pointerX,{duration:.5,bounce:.2}),tiltY=useSpring(pointerY,{duration:.5,bounce:.2});
  const pointerTransform=useTransform(()=>`perspective(1500px) rotateY(${tiltX.get()}deg) rotateX(${tiltY.get()}deg)`);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const transform = useTransform(scrollYProgress, [0,.55,1], ["perspective(1400px) rotateX(3deg) rotateY(-3deg) translateY(16px)", "perspective(1400px) rotateX(0deg) rotateY(0deg) translateY(0px)", "perspective(1400px) rotateX(-1deg) rotateY(1deg) translateY(-12px)"]);
  return <div ref={ref} className={`experience-stage ${className}`} onPointerMove={event=>{if(reduce||event.pointerType!=="mouse"||!matchMedia("(hover:hover) and (pointer:fine)").matches)return;const box=event.currentTarget.getBoundingClientRect();pointerX.set(((event.clientX-box.left)/box.width-.5)*3);pointerY.set(-((event.clientY-box.top)/box.height-.5)*3);}} onPointerLeave={()=>{pointerX.set(0);pointerY.set(0);}}>
    <motion.div className="experience-product" style={{ transform: reduce ? "none" : transform }}>
      <motion.div className="product-pointer-depth" style={{transform:reduce?"none":pointerTransform}}>
      {children}
      </motion.div>
    </motion.div>
  </div>;
}

export function ShippingStory({ children, images, labels }: { children: ReactNode; images: ReactNode[]; labels: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const transform = useTransform(scrollYProgress, [0,1], ["scaleY(0.03)", "scaleY(1)"]);
  const firstOpacity = useTransform(scrollYProgress, [0,.42,.54,1], [1,1,0,0]);
  const secondOpacity = useTransform(scrollYProgress, [0,.44,.56,1], [0,0,1,1]);
  const firstTransform = useTransform(scrollYProgress, [0,.54], ["perspective(1100px) rotateY(-4deg) scale(1)","perspective(1100px) rotateY(1deg) scale(1.045)"]);
  const secondTransform = useTransform(scrollYProgress, [.44,1], ["perspective(1100px) rotateY(-3deg) translateY(20px)","perspective(1100px) rotateY(0deg) translateY(0px)"]);
  useMotionValueEvent(scrollYProgress, "change", v => setActive(v < 0.5 ? 0 : 1));
  return <div className="shipping-story" ref={ref}>
    <div className="story-visual" aria-hidden="true">
      <div className="story-track"><motion.i style={{ transform: reduce ? "scaleY(1)" : transform }} /></div>
      <div className="story-step-index">0{active + 1} / 02</div>
      <div className="story-images">{images.map((image,i)=><motion.div key={i} className={`story-image ${active===i ? "is-active" : ""}`} style={{opacity:reduce ? (active===i?1:0) : i===0?firstOpacity:secondOpacity,transform:reduce?"none":i===0?firstTransform:secondTransform,transition:"none"}}>{image}</motion.div>)}</div>
      <div className="story-labels">{labels.map((label,i)=><span className={active===i ? "is-active" : ""} key={label}>{label}</span>)}</div>
    </div>
    <div className="story-content">{children}</div>
  </div>;
}
