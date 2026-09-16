"use client";
import { Children, useId, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

export function ShippingModes({children, labels}: {children:ReactNode;labels:string[]}) {
  const [active, setActive] = useState(0);
  const id = useId();
  const reduced = useReducedMotion();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  return <div className="shipping-modes">
    <div className="shipping-tabs" role="tablist" aria-label="Shipping modes">
      {labels.map((label,i)=><button key={label} ref={node=>{buttons.current[i]=node;}} type="button" role="tab" id={`${id}-tab-${i}`} aria-controls={`${id}-panel-${i}`} aria-selected={active===i} tabIndex={active===i?0:-1}
        onClick={()=>setActive(i)} onKeyDown={event=>{
          let next=active;
          if(event.key==="ArrowRight") next=(i+1)%labels.length;
          else if(event.key==="ArrowLeft") next=(i+labels.length-1)%labels.length;
          else if(event.key==="Home") next=0;
          else if(event.key==="End") next=labels.length-1;
          else return;
          event.preventDefault();setActive(next);buttons.current[next]?.focus();
        }}>
        {active===i&&<motion.span className="shipping-tab-indicator" layoutId={`${id}-indicator`} transition={{duration:reduced?0:.25,ease:[.16,1,.3,1]}}/>}
        <span>{label}</span>
      </button>)}
    </div>
    {Children.toArray(children).map((child,i)=><div key={i} role="tabpanel" id={`${id}-panel-${i}`} aria-labelledby={`${id}-tab-${i}`} hidden={active!==i} tabIndex={0}><motion.div key={`${i}-${active}`} initial={reduced?false:{opacity:.65,transform:"translateY(8px)"}} animate={{opacity:1,transform:"translateY(0px)"}} transition={{duration:.25,ease:[.16,1,.3,1]}}>{child}</motion.div></div>)}
  </div>;
}
