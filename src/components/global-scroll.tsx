"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { copy as c } from "@/content/site";
import { LogisticsGlobe } from "./logistics-globe";
import "./global-scroll.css";

export function GlobalScroll(){
  const root=useRef<HTMLElement>(null);
  const progress=useRef({value:1});
  useLayoutEffect(()=>{
    gsap.registerPlugin(ScrollTrigger);
    const media=gsap.matchMedia();
    media.add({desktop:"(min-width:1025px)",reduced:"(prefers-reduced-motion:reduce)"},context=>{
      const el=root.current!;
      if(context.conditions?.reduced){progress.current.value=1;return;}
      progress.current.value=0;
      const desktop=!!context.conditions?.desktop;
      const timeline=gsap.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:el.querySelector(".global-scroll-runway"),start:desktop?"top 80px":"top 75%",end:desktop?"bottom bottom":"bottom 35%",scrub:1,invalidateOnRefresh:true,refreshPriority:-1}});
      timeline.to(progress.current,{value:1,duration:1},0);
      if(desktop){
        const cards=el.querySelectorAll(".network-fact");
        const poses=[[-65,-42,-7],[60,-25,6],[-48,62,5],[54,72,-5]];
        cards.forEach((card,i)=>timeline.fromTo(card,{x:poses[i][0],y:poses[i][1],rotation:0,scale:.62,opacity:.8},{x:0,y:0,rotation:0,scale:1,opacity:1,duration:.72},i*.05));
        timeline.fromTo(el.querySelector(".network-earth"),{scale:.94,y:24},{scale:1,y:0,duration:1},0);
        timeline.fromTo(el.querySelector(".network-atmosphere"),{opacity:.4,y:36},{opacity:.8,y:-20,duration:1},0);
      }
    });
    // Match mobile as well, even when neither desktop nor reduced matches.
    media.add("(max-width:1024px) and (prefers-reduced-motion:no-preference)",()=>{
      progress.current.value=0;
      gsap.to(progress.current,{value:1,ease:"none",scrollTrigger:{trigger:root.current!.querySelector(".global-scroll-runway"),start:"top 85%",end:"bottom 55%",scrub:1,invalidateOnRefresh:true}});
      root.current!.querySelectorAll(".network-fact").forEach((card,i)=>{
        gsap.fromTo(card,{x:i%2?18:-18,y:28,scale:.86,opacity:.65},{x:0,y:0,scale:1,opacity:1,ease:"none",scrollTrigger:{trigger:card.parentElement,start:"top 95%",end:"top 55%",scrub:.7,invalidateOnRefresh:true,refreshPriority:-1}});
      });
    });
    // Measure after upstream pinned sections have created their scroll spacers.
    const refreshFrame=requestAnimationFrame(()=>ScrollTrigger.refresh());
    return()=>{cancelAnimationFrame(refreshFrame);media.revert();};
  },[]);
  return <section ref={root} id="global-scale" className="section dark globe-section global-scroll-section">
    <div className="container global-scroll-intro">
      <div><p className="eyebrow">{c.globalScaleEy}</p><h2>{c.globalScaleH}</h2></div>
      <p className="lead">{c.globalScaleP}</p>
    </div>
    <div className="global-scroll-runway">
      <div className="global-scroll-sticky">
        <div className="container network-stage">
          <div className="network-atmosphere" aria-hidden="true"/>
          <div className="network-earth"><LogisticsGlobe progress={progress}/></div>
          <dl className="network-facts" aria-label="Global coverage facts" tabIndex={0}>
            {["Worldwide","Partners","Shipments","Reliability"].map((label,i)=><div key={label} className={`network-fact network-fact-${i}`}><dt>{label}</dt><dd>{c[`gsn${i}`]}</dd></div>)}
          </dl>
        </div>
      </div>
    </div>
    <dl className="container network-results">
      {[0,1,2].map(i=><div key={i}><dt>{c[`globalScaleD${i}`]}</dt><dd>{c[`globalScaleN${i}`]}</dd></div>)}
    </dl>
  </section>;
}
