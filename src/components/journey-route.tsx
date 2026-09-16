"use client";
import { useLayoutEffect,useRef } from "react";
import gsap from "gsap";

export function JourneyRoute({network=false}:{network?:boolean}){
  const ref=useRef<HTMLDivElement>(null);
  useLayoutEffect(()=>{
    const media=gsap.matchMedia();
    media.add("(prefers-reduced-motion:no-preference)",()=>{
      const el=ref.current!;
      const paths=el.querySelectorAll<SVGPathElement>(".journey-flow-path");
      const pulses=el.querySelectorAll<SVGCircleElement>(".journey-route-pulse");
      const loops=Array.from(paths,(path,i)=>{
        const length=path.getTotalLength(),state={value:0};
        return gsap.to(state,{value:1,duration:4.5+i*.5,repeat:-1,paused:true,ease:"none",onUpdate:()=>{
          const point=path.getPointAtLength(state.value*length);
          pulses[i].setAttribute("cx",String(point.x));pulses[i].setAttribute("cy",String(point.y));
          pulses[i].style.opacity=String(Math.min(1,state.value*12,(1-state.value)*12));
        }});
      });
      let visible=false;
      const sync=()=>loops.forEach(loop=>visible&&!document.hidden?loop.resume():loop.pause());
      const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();});
      observer.observe(el);document.addEventListener("visibilitychange",sync);
      return()=>{observer.disconnect();document.removeEventListener("visibilitychange",sync);};
    });
    return()=>media.revert();
  },[network]);
  return <div ref={ref} className={`journey-route ${network?"journey-route-network":""}`} aria-hidden="true"><svg viewBox="0 0 600 100" fill="none">
    <path className="journey-route-main journey-flow-path" d={network?"M50 18H180Q240 18 275 50L300 80":"M35 72H170C245 72 265 25 335 25H565"} stroke="currentColor" strokeWidth="1.4" opacity=".55"/>
    {network&&<path className="journey-flow-path" d="M550 18H420Q360 18 325 50L300 80" stroke="currentColor" strokeWidth="1.4" opacity=".55"/>}
    {network&&<g stroke="currentColor" strokeWidth="1" opacity=".45"><path d="M550 18H420Q360 18 325 50L300 80M160 48H238L300 80M440 48H362L300 80"/>{[[50,18],[180,18],[550,18],[420,18],[160,48],[440,48],[300,80]].map(([x,y],i)=><circle className="journey-network-node" key={i} cx={x} cy={y} r={i===6?4:2.5} fill="currentColor"/>)}</g>}
    <circle className="journey-route-pulse" cx={network?50:35} cy={network?18:72} r="4" fill="#287e61" stroke="#c4efda" strokeWidth="2"/>
    {network&&<circle className="journey-route-pulse" cx="550" cy="18" r="4" fill="#287e61" stroke="#c4efda" strokeWidth="2"/>}
  </svg></div>;
}
