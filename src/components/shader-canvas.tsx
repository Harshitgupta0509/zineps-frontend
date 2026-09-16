"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, type RefObject } from "react";
import { ShaderMaterial, Vector2 } from "three";
const vertex = `varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}`;
const fragment = `
precision highp float;
varying vec2 vUv; uniform float uTime; uniform vec2 uCursor;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.)),f.x),f.y);}
float fbm(vec2 p){float v=0.;float a=.5;for(int i=0;i<4;i++){v+=a*noise(p);p=p*2.03+1.7;a*=.5;}return v;}
void main(){
 vec2 uv=vUv+uCursor*.065;float t=uTime*.025;
 vec2 warp=vec2(fbm(uv*1.8+vec2(t,0.)),fbm(uv*2.4-vec2(0.,t*.6)));
 float silk=fbm(uv*2.8+warp*2.1);
 vec2 lens=(uv-vec2(.50,.28))*vec2(.84,1.23);
 float radius=length(lens);
 float bend=radius+silk*.12+sin(atan(lens.y,lens.x)*2.+t)*.03;
 float ribbon=exp(-pow((bend-.45)*8.,2.));
 float fold=exp(-pow((bend-.39)*28.,2.));
 float glow=1.-smoothstep(.15,.95,distance(uv,vec2(.5,.3)));
 vec3 col=mix(vec3(.018,.048,.044),vec3(.035,.12,.10),silk);
 col=mix(col,vec3(.17,.46,.34),ribbon*glow*.78);
 col+=vec3(.19,.33,.27)*fold*glow*.46;
 col=mix(col,vec3(.07,.23,.25),warp.x*ribbon*.32);
 // A few short traveling signals follow the same field, rather than a particle sky.
 for(int i=0;i<4;i++){
   float fi=float(i);float x=fract(t*.18+fi*.263);
   float y=.34+fi*.09-sin(x*3.3+t)*.14;
   vec2 d=(uv-vec2(x,y))*vec2(1.,2.);
   float mark=exp(-dot(d,d)*18000.);
   col+=vec3(.25,.48,.37)*mark*.32*smoothstep(.4,.7,uv.x);
 }
 col+=(hash(gl_FragCoord.xy)-.5)*.012;
 gl_FragColor=vec4(col,1.);
}`;
function Plane({cursor}:{cursor:RefObject<{x:number;y:number}>}) {
  const ref = useRef<ShaderMaterial>(null);
  const uniforms = useMemo(() => ({uTime: {value: 0},uCursor:{value:new Vector2()}}), []);
  useFrame((_, delta) => { if(ref.current) {ref.current.uniforms.uTime.value += Math.min(delta, .05);const point=ref.current.uniforms.uCursor.value as Vector2;const blend=1-Math.exp(-2*Math.min(delta,.05));point.x+=(cursor.current.x-point.x)*blend;point.y+=(cursor.current.y-point.y)*blend;} });
  return <mesh frustumCulled={false}><planeGeometry args={[2,2]} /><shaderMaterial ref={ref} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} depthTest={false} depthWrite={false} /></mesh>;
}
export default function ShaderCanvas({active,cursor}: {active: boolean;cursor:RefObject<{x:number;y:number}>}) {
  return <Canvas dpr={[1,1.25]} frameloop={active ? "always" : "demand"} gl={{alpha:false,antialias:false,powerPreference:"low-power"}}><Plane cursor={cursor}/></Canvas>;
}
