"use client";
import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
const ShaderCanvas = dynamic(() => import("./shader-canvas"), { ssr: false });
class ShaderBoundary extends Component<{children: ReactNode}, {failed: boolean}> {
  state = {failed: false};
  static getDerivedStateFromError() { return {failed: true}; }
  render() { return this.state.failed ? null : this.props.children; }
}
export function HeroShader() {
  const ref = useRef<HTMLDivElement>(null);
  const cursor = useRef({x:0,y:0});
  const [reduced, setReduced] = useState(true);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduced(query.matches);
    let visible = true;
    const sync = () => setActive(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    const hero = ref.current?.closest("section");
    const move = (event:PointerEvent) => {if(query.matches||event.pointerType!=="mouse"||!hero)return;const box=hero.getBoundingClientRect();cursor.current={x:(event.clientX-box.left)/box.width-.5,y:.5-(event.clientY-box.top)/box.height};};
    const reset = () => {cursor.current={x:0,y:0};};
    hero?.addEventListener("pointermove",move);hero?.addEventListener("pointerleave",reset);
    observer.observe(ref.current!); syncMotion();
    query.addEventListener("change", syncMotion); document.addEventListener("visibilitychange", sync);
    return () => { observer.disconnect(); query.removeEventListener("change", syncMotion); document.removeEventListener("visibilitychange", sync);hero?.removeEventListener("pointermove",move);hero?.removeEventListener("pointerleave",reset); };
  }, []);
  return <div className="hero-shader" ref={ref} aria-hidden="true">{!reduced && <ShaderBoundary><ShaderCanvas active={active} cursor={cursor} /></ShaderBoundary>}</div>;
}
