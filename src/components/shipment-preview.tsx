"use client";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const stages = [
  { label: "Prepare", title: "Every detail, in place.", description: "Bring the order, destination and parcel details into one workspace.", status: "Order imported", code: "01", detail: "Store → Zineps" },
  { label: "Label", title: "Ready for the next step.", description: "Prepare a shipping label using your own contracts or partner shipping rates.", status: "Label prepared", code: "02", detail: "Zineps → Carrier" },
  { label: "Track", title: "Keep the journey in view.", description: "Bring shipment updates back to the people waiting for their delivery.", status: "Shipment in transit", code: "03", detail: "Carrier → Customer" },
];
export function ShipmentPreview() {
  const [step,setStep]=useState(0);
  const reduced=useReducedMotion();
  const current=stages[step];
  return <div className="shipment-preview hero-network" data-step={step}>
    <div className="preview-top"><span><i/> THE SHIPPING WORKSPACE</span><span>INTERACTIVE PREVIEW</span></div>
    <div className="preview-scene" aria-hidden="true">
      <div className="preview-orbit orbit-one"/><div className="preview-orbit orbit-two"/>
      <div className="preview-coordinate coordinate-a">AMS / ORIGIN</div><div className="preview-coordinate coordinate-b">BER / DESTINATION</div>
      <motion.div className="preview-package" animate={{y:step===2?-14:0,rotate:step===1?-4:0}} transition={{duration:reduced?0:.7,ease:[.22,1,.36,1]}}>
        <svg viewBox="0 0 280 250" role="presentation"><defs><linearGradient id="parcel-front" x2="1" y2="1"><stop stopColor="#d9be93"/><stop offset="1" stopColor="#b9996d"/></linearGradient></defs>
          <path d="M32 77 143 23 253 77 143 134Z" fill="#ead5af"/><path d="M32 77 143 134 143 235 32 174Z" fill="url(#parcel-front)"/><path d="M143 134 253 77 253 174 143 235Z" fill="#a58c66"/>
          <path d="m78 55 25-12 111 56-26 14Z" fill="#74bfa2"/><path d="m188 113 26-14v99l-26 14Z" fill="#50886e"/>
          <path d="m53 103 62 32v47l-62-32Z" fill="#fbfaf4"/>
          <path d="m63 121 42 22m-42-13 35 19m-35-9 22 12" stroke="#466555" strokeWidth="3"/>
        </svg>
      </motion.div>
      <motion.div className="preview-status" key={step} initial={reduced?false:{opacity:0,y:8}} animate={{opacity:1,y:0}}><span className="status-check">✓</span>{current.status}</motion.div>
      <span className="preview-scene-foot">{current.detail}</span>
    </div>
    <div className="preview-story">
      <div className="preview-tabs" role="group" aria-label="Explore shipment stages">{stages.map((stage,i)=><button key={stage.label} type="button" aria-pressed={step===i} onClick={()=>setStep(i)}><span>{stage.code}</span>{stage.label}<i/></button>)}</div>
      <div className="preview-description" aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait" initial={false}><motion.div key={step} initial={reduced?false:{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:reduced?0:.16}}><h3>{current.title}</h3><p>{current.description}</p></motion.div></AnimatePresence>
      </div>
      <div className="preview-bottom"><span>Illustrative workflow · no live shipment</span><button type="button" aria-label={step===2?"Restart shipment preview":"Next shipment stage"} onClick={()=>setStep((step+1)%3)}>{step===2?"Replay":"Next step"} <span aria-hidden="true">↗</span></button></div>
    </div>
  </div>;
}
