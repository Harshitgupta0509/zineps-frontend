"use client";

import { useLayoutEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** One scroll director; every timeline is scoped and removed on navigation. */
export function ExperienceDirector({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.1 } });
      intro.from(".hero h1", { clipPath:"inset(0 0 14% 0)",y: 18, opacity: .6 })
        .from(".hero-copy > .lead, .hero-copy > .actions", { y: 16, opacity: .35, stagger: .1 }, .15)
        .from(".hero-network", { y: 46, rotateX: 7, transformPerspective: 1400, opacity: .5 }, .25);
      gsap.fromTo("#logistics-partners .partner-interface-main",{clipPath:"inset(0% 0% 8% 0% round 14px)"},{clipPath:"inset(0% 0% 0% 0% round 14px)",ease:"none",scrollTrigger:{trigger:"#logistics-partners",start:"top 85%",end:"top 30%",scrub:.5}});
    });
    const rails=document.querySelectorAll<HTMLElement>(".customer-marquee,.logo-marquee");
    const inView=new Set<Element>();
    const sync=()=>rails.forEach(rail=>{rail.dataset.motionActive=String(inView.has(rail)&&!document.hidden);});
    const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)inView.add(entry.target);else inView.delete(entry.target);});sync();});
    rails.forEach(rail=>observer.observe(rail));document.addEventListener("visibilitychange",sync);
    return () => {media.revert();observer.disconnect();document.removeEventListener("visibilitychange",sync);};
  }, []);
  return <main id="main-content" tabIndex={-1}>{children}</main>;
}
