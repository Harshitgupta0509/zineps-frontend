"use client";
import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProductImage } from "./ui";
import { integrations } from "@/content/site";
const ParcelWorld = dynamic(() => import("./parcel-world"), { ssr: false });
class SceneBoundary extends Component<{children: ReactNode}, {failed: boolean}> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <div className="parcel-fallback" /> : this.props.children; }
}
export function ParcelStory({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useRef({ value: .5 });
  const [near, setNear] = useState(false);
  const [active, setActive] = useState(false);
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const element = ref.current!;
    let inView = false;
    const sync = () => setActive(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; if(inView) setNear(true); sync(); }, { rootMargin: "180px" });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    const media = gsap.matchMedia();
    media.add({ animated: "(prefers-reduced-motion: no-preference) and (min-height: 620px), (prefers-reduced-motion: no-preference) and (min-width: 1025px)", compact: "(max-width: 1024px)", static: "(prefers-reduced-motion: reduce), (max-width: 1024px) and (max-height: 619px)" }, context => {
      const animate = !!context.conditions?.animated;
      setReduced(!animate);
      progress.current.value = animate ? 0 : .5;
      if (!animate) return;
      const timeline = gsap.timeline({ paused: true, defaults: { ease: "none" } });
      timeline.to(progress.current, { value: 1, duration: 1 }, 0)
        .fromTo(element.querySelector(".parcel-order"), { opacity: 1, y: 0, scale: 1 }, { opacity: 0, y: -46, scale: .94, duration: .18 }, .06)
        .fromTo(element.querySelector(".parcel-object"), { opacity: 0 }, { opacity: 1, duration: .12 }, .28)
        .to(element.querySelector(".parcel-object"), { opacity:0, duration: .02 }, .98)
        .fromTo(element.querySelector(".parcel-studio-light"),{scale:.95,opacity:.5},{scale:1.1,opacity:1,duration:.5},.25);
      element.querySelectorAll(".dispatch-carrier").forEach((card,i)=>{
        timeline.fromTo(card,{opacity:0,y:24,rotation:i%2?4:-4,scale:.94},{opacity:1,y:0,rotation:i%2?1:-1,scale:1,duration:.08},.42+i*.055)
          .to(card,{opacity:0,y:-12,duration:.06},.77);
      });
      timeline.fromTo(element.querySelector(".dispatch-progress-fill"),{scaleX:0},{scaleX:1,duration:1},0);
      // One smoothed playhead drives the DOM and all 3D objects together.
      // Give loading and departure more room than the introductory transition.
      const playback = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: {
        trigger: element, start: context.conditions?.compact ? "top 74px" : "top 78px",
        end: () => `+=${context.conditions?.compact ? Math.max(window.innerHeight * 4, 2600) : Math.max(window.innerHeight * 5.5, 4200)}`,
        pin: element.querySelector<HTMLElement>(".parcel-sticky")!,
        pinSpacing: true, anticipatePin: 1, scrub: 1,
        invalidateOnRefresh: true,
      } });
      playback.to(timeline, { time: .34, duration: 2 })
        .to(timeline, { time: .47, duration: 1.8 })
        .to(timeline, { time: .61, duration: 1.5 })
        .to(timeline, { time: .76, duration: 2.6 })
        .to(timeline, { time: .85, duration: 1.3 })
        .to(timeline, { time: 1, duration: 2.8 })
        // Exit buffer lets the scrub settle before normal scrolling resumes.
        .to({}, { duration: 1.4 });
    });
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); media.revert(); };
  }, []);
  return <div className="parcel-story" ref={ref}>
    <div className="parcel-sticky">
      <div className="parcel-copy">{children}</div>
      <div className="parcel-studio" aria-hidden="true">
        <div className="parcel-studio-light" />
        <div className="parcel-object">{near && <SceneBoundary><ParcelWorld progress={progress} active={active} reduced={reduced} /></SceneBoundary>}</div>
        <div className="parcel-order"><ProductImage file="shippng-zineps.svg" alt="" /></div>
        <div className="dispatch-carriers">{integrations.filter(([name])=>["DHL","PostNL","DPD","UPS"].includes(name)).map(([name,file],i)=><div className={`dispatch-carrier dispatch-carrier-${i}`} key={name}><img src={`/assets/${file}`} alt="" width="88" height="42" loading="lazy" /></div>)}</div>
      </div>
      <div className="dispatch-progress" aria-hidden="true"><div className="dispatch-progress-track"><i className="dispatch-progress-fill" /></div><div className="dispatch-progress-labels"><span>Order</span><span>Shipment</span><span>Transport</span><span>Network</span></div></div>
    </div>
  </div>;
}
