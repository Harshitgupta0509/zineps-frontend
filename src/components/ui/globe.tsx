"use client";

// Adapted from Aceternity UI's GitHub Globe by Manu Arora.
// https://ui.aceternity.com/components/github-globe
// Retains its ThreeGlobe / React Three Fiber foundation; routes are illustrative.
import { useEffect, useRef, type RefObject } from "react";
import { Color, Group, MeshPhongMaterial, Mesh, ShaderMaterial, TubeGeometry, CatmullRomCurve3, Vector3, SphereGeometry, MeshBasicMaterial } from "three";
import ThreeGlobe from "three-globe";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import countries from "@/data/globe.json";

export type GlobePalette = { mint: string; dark: string; ink: string; land: string };
type Props = { active: boolean; reduced: boolean; mobile: boolean; palette: GlobePalette; onReady: () => void; progress:RefObject<{value:number}> };
// Illustrative geography only. These are not actual Zineps lanes or live telemetry.
const geography = [[52.37,4.9],[51.5,-.12],[48.85,2.35],[50.11,8.68],[40.71,-74.01],[34.05,-118.24],[43.65,-79.38],[19.43,-99.13],[-23.55,-46.63],[-34.6,-58.38],[4.71,-74.07],[25.2,55.27],[19.08,72.88],[1.35,103.82],[31.23,121.47],[35.68,139.69],[37.56,126.97],[-33.87,151.21],[-36.85,174.76],[-33.92,18.42],[-1.29,36.82],[30.04,31.24],[6.52,3.38],[41.01,28.97],[59.33,18.07],[13.75,100.5],[40.42,-3.7],[-6.2,106.85],[49.28,-123.12],[-33.45,-70.67],[25.29,51.53],[52.23,21.01],[5.6,-.19]];
const connections = [[0,1],[0,2],[0,3],[0,4],[0,11],[0,13],[0,8],[0,24],[4,5],[4,6],[5,7],[7,10],[10,8],[8,9],[11,12],[12,13],[13,14],[14,15],[15,16],[13,17],[17,18],[0,19],[19,20],[20,21],[2,26],[13,27],[6,28],[8,29],[11,30],[3,31],[20,32]];

function Globe({ active, reduced, mobile, palette, onReady, progress }: Props) {
  const group = useRef<Group>(null);
  const instance = useRef<ThreeGlobe | null>(null);
  const advance = useRef<(value:number,delta:number)=>void>(()=>{});
  const spin = useRef(0);
  useFrame((_,delta)=>{
    const step=active&&!reduced?Math.min(delta,.05):0;
    const p=reduced?1:progress.current.value;
    spin.current+=step*.025;
    advance.current(p,step);
    if(group.current)group.current.rotation.set(.65-p*.06,-.4+p*.65+(reduced?0:spin.current),-.08+p*.04);
  });
  const { invalidate } = useThree();
  useEffect(() => {
    if (!group.current) return;
    const parent = group.current;
    const globe = new ThreeGlobe({ animateIn: false });
    instance.current = globe;
    const material = globe.globeMaterial() as MeshPhongMaterial;
    material.color = new Color(palette.dark);
    material.emissive = new Color(palette.ink);
    material.emissiveIntensity = .24;
    material.shininess = 12;
    globe.hexPolygonsData(countries.features).hexPolygonResolution(3)
      .hexPolygonMargin(.55).hexPolygonColor(() => palette.land)
      .showAtmosphere(true).atmosphereColor(palette.mint).atmosphereAltitude(.075);
    const routes = connections.filter((_,i)=>![1,24,29].includes(i)).map(([a,b],order)=>({startLat:geography[a][0],startLng:geography[a][1],endLat:geography[b][0],endLng:geography[b][1],arcAlt:.12+(order%5)*.055,order,moving:false,hub:a===0}));
    const pulses=routes.filter((_,i)=>[3,5,14,20,27].includes(i)).slice(0,mobile?3:5).map(r=>({...r,moving:true}));
    const arcs=[...routes,...(!reduced?pulses:[])];
    const nodes=geography.map(([lat,lng],i)=>({lat,lng,hub:i===0,size:i===0?1.3:i%3===0?.6:.42}));
    const rgb=new Color(palette.mint).convertLinearToSRGB();
    const faint=(alpha:number)=>`rgba(${Math.round(rgb.r*255)},${Math.round(rgb.g*255)},${Math.round(rgb.b*255)},${alpha})`;
    const route = (d: object) => d as typeof arcs[number];
    globe.arcStartLat('startLat').arcStartLng('startLng').arcEndLat('endLat').arcEndLng('endLng')
      .arcAltitude(d=>route(d).arcAlt).arcColor((d: object)=>route(d).moving ? [faint(0),"#ddfff0",faint(0)] : faint(route(d).hub?.78:.38+(route(d).order%3)*.12))
      .arcStroke(d=>route(d).moving ? .55 : route(d).hub?.38:.24).arcCurveResolution(mobile?32:64).arcCircularResolution(5)
      .arcDashLength(d=>route(d).moving ? .035 : 1).arcDashGap(d=>route(d).moving ? 1.4 : 0)
      .arcDashInitialGap(d=>route(d).moving ? route(d).order*.19 : 0).arcDashAnimateTime(reduced ? 0 : 12000)
      .arcsTransitionDuration(reduced ? 0 : 200)
      .pointColor((d:object)=>(d as typeof nodes[number]).hub?palette.mint:palette.land).pointRadius((d:object)=>(d as typeof nodes[number]).size).pointAltitude(.008).pointsMerge(true)
      .pointsTransitionDuration(0).ringColor(()=>faint(.35)).ringMaxRadius(2.6)
      .ringPropagationSpeed(.5).ringRepeatPeriod(6500);
    parent.add(globe);
    // Initial view exposes Europe, the Atlantic, Africa, and Asian connections.
    parent.rotation.set(.65,-.25,-.08);
    // Allocate the mesh once. Scroll only changes shader uniforms and node scales.
    const network=new Group();parent.add(network);
    const routeMeshes=routes.map((r,i)=>{
      const a=new Vector3().copy(globe.getCoords(r.startLat,r.startLng,0));
      const b=new Vector3().copy(globe.getCoords(r.endLat,r.endLng,0));
      const radius=a.length();a.normalize();b.normalize();
      const angle=Math.acos(Math.max(-1,Math.min(1,a.dot(b))));
      const points=Array.from({length:49},(_,j)=>{
        const t=j/48;
        const point=angle<.001?a.clone().lerp(b,t):a.clone().multiplyScalar(Math.sin((1-t)*angle)).addScaledVector(b,Math.sin(t*angle)).divideScalar(Math.sin(angle));
        return point.normalize().multiplyScalar(radius*(1+.008+r.arcAlt*Math.sin(Math.PI*t)));
      });
      const material=new ShaderMaterial({transparent:true,depthWrite:false,uniforms:{reveal:{value:0},clock:{value:0},pulse:{value:0},tint:{value:new Color(palette.mint)},strength:{value:r.hub?.78:.38+(i%3)*.12}},vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`varying vec2 vUv;uniform float reveal;uniform float clock;uniform float pulse;uniform float strength;uniform vec3 tint;void main(){float visible=1.-smoothstep(reveal-.035,reveal,vUv.x);float head=fract(clock*.09);float light=exp(-pow((vUv.x-head)*65.,2.))*pulse;gl_FragColor=vec4(mix(tint,vec3(.86,1.,.92),light),visible*(strength+light*.35));}`});
      const mesh=new Mesh(new TubeGeometry(new CatmullRomCurve3(points),mobile?40:64,r.hub?.19:.12,4,false),material);network.add(mesh);return mesh;
    });
    const nodeGeometry=new SphereGeometry(1,mobile?8:12,8);
    const nodeMaterial=new MeshBasicMaterial({color:palette.mint});
    const nodeMeshes=nodes.map(n=>{const mesh=new Mesh(nodeGeometry,nodeMaterial);mesh.position.copy(globe.getCoords(n.lat,n.lng,.012));mesh.scale.setScalar(0);network.add(mesh);return mesh;});
    const smooth=(v:number)=>{const t=Math.max(0,Math.min(1,v));return t*t*(3-2*t);};
    advance.current = (value,delta) => {
      const p=Math.max(0,Math.min(1,value));
      routeMeshes.forEach((mesh,i)=>{
        mesh.material.uniforms.reveal.value=reduced?1.04:smooth((p-(.16+i/routes.length*.48))/.18)*1.04;
        mesh.material.uniforms.clock.value+=delta;
        mesh.material.uniforms.pulse.value=!reduced&&[3,5,14,20,27].slice(0,mobile?3:5).includes(i)?smooth((p-.84)/.12):0;
      });
      nodeMeshes.forEach((mesh,i)=>mesh.scale.setScalar(nodes[i].size*(reduced?1:smooth((p-(.08+i/nodes.length*.52))/.13))));
    };
    advance.current(reduced?1:progress.current.value,0);
    if(reduced)globe.pauseAnimation();
    invalidate(); onReady();
    return () => { advance.current=()=>{};parent.remove(network);routeMeshes.forEach(mesh=>{mesh.geometry.dispose();mesh.material.dispose();});nodeGeometry.dispose();nodeMaterial.dispose();parent.remove(globe); globe._destructor(); instance.current=null; };
  }, [palette, mobile, reduced, invalidate, onReady, progress]);
  useEffect(() => {
    const globe = instance.current;
    if (!globe) return;
    if (active && !reduced) globe.resumeAnimation(); else globe.pauseAnimation();
    invalidate();
  }, [active,reduced,palette,mobile,invalidate]);
  return <group ref={group} />;
}

export function World(props: Props) {
  return <Canvas dpr={props.mobile ? 1 : [1,1.5]} frameloop={props.active && !props.reduced ? "always" : "demand"}
    camera={{position:[0,0,335],fov:48,near:.1,far:1000}} gl={{alpha:true,antialias:!props.mobile,powerPreference:"low-power"}}>
    <ambientLight intensity={1.5} color={props.palette.mint} />
    <directionalLight position={[-200,300,400]} intensity={2} color={props.palette.land} />
    <Globe {...props}/>
  </Canvas>;
}
