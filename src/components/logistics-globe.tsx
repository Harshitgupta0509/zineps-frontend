"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { GlobePalette } from "./ui/globe";

const World = dynamic(()=>import("./ui/globe").then(m=>m.World), {ssr:false});
class GlobeBoundary extends Component<{children:ReactNode}, {failed:boolean}> {
  state={failed:false};
  static getDerivedStateFromError(){return {failed:true};}
  render(){return this.state.failed ? null : this.props.children;}
}
export function LogisticsGlobe({progress}:{progress:RefObject<{value:number}>}) {
  const ref=useRef<HTMLDivElement>(null);
  const [near,setNear]=useState(false);
  const [active,setActive]=useState(false);
  const [visible,setVisible]=useState(true);
  const [ready,setReady]=useState(false);
  const [mobile,setMobile]=useState(false);
  const [palette,setPalette]=useState<GlobePalette>();
  const [reduce,setReduce]=useState(true);
  const x=useMotionValue(0), y=useMotionValue(0);
  const sx=useSpring(x,{duration:.5,bounce:.2}), sy=useSpring(y,{duration:.5,bounce:.2});
  const transform=useTransform(()=>`translate3d(${sx.get()}px,${sy.get()}px,0)`);
  const onReady=useCallback(()=>setReady(true),[]);
  useEffect(()=>{
    const el=ref.current!;
    const css=getComputedStyle(el);
    setPalette({mint:css.getPropertyValue('--mint').trim(),dark:css.getPropertyValue('--dark').trim(),ink:css.getPropertyValue('--ink').trim(),land:css.getPropertyValue('--globe-land').trim()});
    const query=matchMedia('(max-width:639px)');
    const motionQuery=matchMedia('(prefers-reduced-motion:reduce)');
    const motionChange=()=>setReduce(motionQuery.matches);motionChange();motionQuery.addEventListener('change',motionChange);
    const resize=()=>setMobile(query.matches); resize(); query.addEventListener('change',resize);
    const preload=new IntersectionObserver(([e])=>{if(e.isIntersecting){setNear(true);preload.disconnect();}},{rootMargin:'300px'});
    const viewport=new IntersectionObserver(([e])=>{setActive(e.isIntersecting);});
    preload.observe(el);viewport.observe(el);
    const visibility=()=>setVisible(!document.hidden);
    document.addEventListener('visibilitychange',visibility);visibility();
    return ()=>{preload.disconnect();viewport.disconnect();query.removeEventListener('change',resize);motionQuery.removeEventListener('change',motionChange);document.removeEventListener('visibilitychange',visibility);};
  },[]);
  return <div ref={ref} className={`logistics-globe ${ready ? 'is-ready' : ''}`} data-active={active&&visible} data-reduced={!!reduce}
    onPointerMove={e=>{if(reduce || e.pointerType!=='mouse' || !matchMedia('(hover:hover) and (pointer:fine)').matches)return;const r=e.currentTarget.getBoundingClientRect();x.set(((e.clientX-r.left)/r.width-.5)*6);y.set(((e.clientY-r.top)/r.height-.5)*6);}}
    onPointerLeave={()=>{x.set(0);y.set(0);}}>
    <motion.div className="globe-depth" style={{transform:reduce ? 'none' : transform}} aria-hidden="true">
      <div className="globe-canvas">{near && palette && <GlobeBoundary><World active={active&&visible} reduced={!!reduce} mobile={mobile} palette={palette} onReady={onReady} progress={progress}/></GlobeBoundary>}</div>
    </motion.div>
    <p className="globe-caption">Illustrative logistics connections · not live tracking</p>
  </div>;
}
