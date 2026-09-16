"use client";
// Spotlight interaction; depth cards use the adapted Aceternity component.
import { CardContainer, CardItem } from "./ui/3d-card";
import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";

export function InteractiveCard({children,className="",variant="spotlight"}:{children:ReactNode;className?:string;variant?:"depth"|"spotlight"|"border"}){
  const ref=useRef<HTMLElement>(null);const reduced=useReducedMotion();
  const rx=useMotionValue(0),ry=useMotionValue(0);
  const sx=useSpring(rx,{duration:.5,bounce:.2}),sy=useSpring(ry,{duration:.5,bounce:.2});
  const transform=useTransform(()=>`perspective(1100px) rotateX(${sx.get()}deg) rotateY(${sy.get()}deg) translate3d(0,0,0)`);
  if(variant==="depth") return <CardContainer className={className}><CardItem translateZ={28}>{children}</CardItem></CardContainer>;
  return <motion.article ref={ref} className={`interactive-card interaction-${variant} ${className}`} style={{transform:reduced||variant==="border"?"none":transform}}
    onPointerMove={e=>{if(reduced||e.pointerType!=="mouse")return;const r=e.currentTarget.getBoundingClientRect();rx.set(((e.clientY-r.top)/r.height-.5)*-2.4);ry.set(((e.clientX-r.left)/r.width-.5)*2.4);e.currentTarget.style.setProperty("--spot-x",`${e.clientX-r.left}px`);e.currentTarget.style.setProperty("--spot-y",`${e.clientY-r.top}px`);}}
    onPointerLeave={()=>{rx.set(0);ry.set(0);}}>{children}</motion.article>;
}
