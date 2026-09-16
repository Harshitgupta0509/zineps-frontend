"use client";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { Group, Vector3, Mesh, Material } from "three";
import { phase, truckPosition, truckScale } from "./shipment-path";

/** A compact cab-over delivery truck. All travel, including wheels, follows scroll. */
export function ShipmentTruck({progress,reduced}:{progress:RefObject<{value:number}>;reduced:boolean}){
  const truck=useRef<Group>(null);
  const wheels=useRef<(Group|null)[]>([]);
  const doors=useRef<(Group|null)[]>([]);
  const vectors=useMemo(()=>({position:new Vector3(),tangent:new Vector3()}),[]);
  const materials=useRef<Material[]>([]);
  useEffect(()=>{const unique=new Set<Material>();truck.current?.traverse(object=>{if(object instanceof Mesh){const list=Array.isArray(object.material)?object.material:[object.material];list.forEach(material=>{material.transparent=true;unique.add(material);});}});materials.current=[...unique];},[]);
  useFrame(()=>{
    if(!truck.current)return;
    const p=reduced?.84:progress.current.value;
    const pose=truckPosition(p,vectors.position,vectors.tangent);
    truck.current.visible=p>.48;
    const visibility=reduced?1:phase(p,.48,.55);
    materials.current.forEach(material=>{material.opacity=visibility;material.depthWrite=visibility>.99;});
    truck.current.position.copy(vectors.position);
    truck.current.rotation.y=pose.yaw;
    truck.current.scale.setScalar(truckScale);
    wheels.current.forEach(wheel=>{if(wheel)wheel.rotation.z=-pose.distance/(truckScale*.27);});
    const open=phase(p,.54,.60)*(1-phase(p,.77,.84));
    doors.current.forEach((door,i)=>{if(door)door.rotation.y=(i===0?-1:1)*open*Math.PI*.56;});
  });
  return <group ref={truck}>
    {/* Hollow cargo compartment: the parcel enters an actual opening at negative X. */}
    {[-.61,.61].map(z=><RoundedBox key={z} args={[2.28,1.27,.045]} position={[-.48,1.04,z]} radius={.012} smoothness={2} castShadow receiveShadow><meshStandardMaterial color="#e4e9df" roughness={.52} metalness={.12}/></RoundedBox>)}
    <RoundedBox args={[2.28,.045,1.25]} position={[-.48,1.675,0]} radius={.012} smoothness={2} castShadow><meshStandardMaterial color="#e4e9df" roughness={.52}/></RoundedBox>
    <mesh position={[-.48,.405,0]} receiveShadow><boxGeometry args={[2.28,.05,1.25]}/><meshStandardMaterial color="#657568" roughness={.85}/></mesh>
    <mesh position={[.66,1.04,0]} castShadow><boxGeometry args={[.045,1.27,1.25]}/><meshStandardMaterial color="#d4ded1" roughness={.6}/></mesh>
    <RoundedBox args={[.96,1.08,1.2]} position={[1.18,.94,0]} radius={.08} smoothness={4} castShadow><meshStandardMaterial color="#f2f1e7" roughness={.4} metalness={.15}/></RoundedBox>
    <RoundedBox args={[3.35,.15,1.12]} position={[.1,.36,0]} radius={.025} smoothness={2} castShadow><meshStandardMaterial color="#28352f" roughness={.65} metalness={.35}/></RoundedBox>
    <mesh position={[1.67,1.15,0]} rotation={[0,Math.PI/2,0]}><planeGeometry args={[1.04,.48]}/><meshPhysicalMaterial color="#284440" roughness={.16} metalness={.3} clearcoat={1}/></mesh>
    {[-1,1].map(side=><group key={side}>
      <mesh position={[1.23,1.17,side*.608]}><planeGeometry args={[.65,.4]}/><meshPhysicalMaterial color="#304b46" roughness={.17} metalness={.25} side={2}/></mesh>
      <mesh position={[-.48,.87,side*.631]}><planeGeometry args={[2.22,.16]}/><meshStandardMaterial color="#75b99c" roughness={.55} side={2}/></mesh>
      <mesh position={[1.3,.66,side*.611]}><planeGeometry args={[.72,.12]}/><meshStandardMaterial color="#75b99c" side={2}/></mesh>
      <RoundedBox args={[.13,.2,.08]} position={[1.5,1.2,side*.71]} radius={.02} smoothness={2}><meshStandardMaterial color="#263c32"/></RoundedBox>
    </group>)}
    <RoundedBox args={[.08,.16,1.13]} position={[1.7,.5,0]} radius={.025} smoothness={2}><meshStandardMaterial color="#344a3e" roughness={.6}/></RoundedBox>
    {[-.39,.39].map(z=><mesh key={z} position={[1.717,.69,z]} rotation={[0,Math.PI/2,0]}><planeGeometry args={[.23,.1]}/><meshStandardMaterial color="#fff6df" emissive="#bcae87" emissiveIntensity={.15}/></mesh>)}
    {[-1.14,1.14].flatMap(x=>[-.64,.64].map(z=>[x,z])).map(([x,z],i)=><group key={i} position={[x,.27,z]} ref={node=>{wheels.current[i]=node;}}>
      <mesh rotation={[Math.PI/2,0,0]} castShadow><cylinderGeometry args={[.27,.27,.18,20]}/><meshStandardMaterial color="#17201c" roughness={.95}/></mesh>
      <mesh rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.145,.145,.19,16]}/><meshStandardMaterial color="#929f97" metalness={.65} roughness={.32}/></mesh>
      <mesh position={[.055,0,z>0?.105:-.105]}><boxGeometry args={[.035,.21,.018]}/><meshStandardMaterial color="#53645a" metalness={.5} roughness={.5}/></mesh>
    </group>)}
    {[-1,1].map((side,i)=><group key={side} position={[-1.64,1.04,side*.61]} ref={node=>{doors.current[i]=node;}}>
      <mesh position={[0,0,-side*.305]} castShadow><boxGeometry args={[.045,1.22,.61]}/><meshStandardMaterial color="#d7e0d3" roughness={.55} metalness={.12}/></mesh>
      <mesh position={[-.027,0,-side*.42]}><boxGeometry args={[.02,.92,.025]}/><meshStandardMaterial color="#7d8e81" metalness={.65} roughness={.4}/></mesh>
    </group>)}
  </group>;
}
