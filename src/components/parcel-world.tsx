"use client";
import { Suspense, useEffect, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, useTexture } from "@react-three/drei";
import { ShipmentTruck } from "./shipment-truck";
import { phase, shipmentPath, truckPosition, truckScale } from "./shipment-path";
import { BufferGeometry, CatmullRomCurve3, DataTexture, Group, Line, LineBasicMaterial, Mesh, RGBAFormat, RepeatWrapping, SRGBColorSpace, Vector3 } from "three";
type Props = { progress: RefObject<{value: number}>; active: boolean; reduced: boolean };
function Label() {
  const texture = useTexture("/assets/zineps-logo-black.svg");
  return <mesh position={[.38, .763, .12]} rotation={[-Math.PI / 2, 0, 0]}>
    <planeGeometry args={[.56, .18]} /><meshBasicMaterial map={texture} transparent toneMapped={false} />
  </mesh>;
}
function Parcel({ progress, reduced }: Pick<Props, "progress" | "reduced">) {
  const group = useRef<Group>(null);
  const label = useRef<Group>(null);
  const shipment = useRef<Mesh>(null);
  const poseVectors=useMemo(()=>({position:new Vector3(),tangent:new Vector3(),target:new Vector3(),up:new Vector3(0,1,0)}),[]);
  const grain = useMemo(() => {
    const pixels = new Uint8Array(128 * 128 * 4);
    let seed = 541;
    for (let i = 0; i < pixels.length; i += 4) {
      seed = (seed * 16807) % 2147483647;
      const v = 205 + seed % 40;
      pixels.set([v, v - 9, v - 22, 255], i);
    }
    const texture = new DataTexture(pixels, 128, 128, RGBAFormat);
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.repeat.set(5, 5); texture.colorSpace = SRGBColorSpace; texture.needsUpdate = true;
    return texture;
  }, []);
  const curve = shipmentPath;
  const route = useMemo(() => {
    return new Line(new BufferGeometry().setFromPoints(curve.getPoints(100)), new LineBasicMaterial({color: "#81d8bd", transparent: true, opacity: .55}));
  }, [curve]);
  useEffect(() => () => { grain.dispose(); route.geometry.dispose(); route.material.dispose(); }, [grain, route]);
  useFrame(() => {
    const p = reduced ? .84 : progress.current.value;
    const travel=Math.max(0,Math.min(1,(p-.4)/.35));
    if(label.current)label.current.position.y=reduced?0:(1-phase(p,.30,.36))*.48;
    if(shipment.current){shipment.current.visible=!reduced&&p>.88;curve.getPointAt(travel,shipment.current.position);shipment.current.position.y+=.025;}
    if (group.current) {
      const approach=phase(p,.36,.47),load=phase(p,.61,.76);
      const pose=truckPosition(p<.52?.52:p,poseVectors.position,poseVectors.tangent);
      // Align behind the door first, then move straight along the cargo floor.
      poseVectors.target.set(-2.25+load*1.65,.68,0).multiplyScalar(truckScale).applyAxisAngle(poseVectors.up,pose.yaw).add(poseVectors.position);
      group.current.position.set(0,-.06,0).lerp(poseVectors.target,approach);
      group.current.rotation.set(.16*(1-approach),(-.2)*(1-approach)+pose.yaw*approach,-.04*(1-approach));
      group.current.scale.setScalar(1-approach*.72);
    }
    route.geometry.setDrawRange(0, reduced ? 101 : Math.min(101, Math.floor(Math.max(0, (p - .35) / .38) * 101)));
  });
  return <>
    <group ref={group}>
      <RoundedBox args={[2.3, 1.5, 1.7]} radius={.055} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color="#b99972" map={grain} roughness={.92} metalness={0} />
      </RoundedBox>
      <mesh position={[0, .754, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[.28, 1.67]} /><meshStandardMaterial color="#6dab93" roughness={.64} /></mesh>
      <mesh position={[0, 0, .854]}><planeGeometry args={[.28, 1.48]} /><meshStandardMaterial color="#6dab93" roughness={.64} /></mesh>
      <group ref={label}>
        <mesh position={[.42, .758, .15]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[.91, .66]} /><meshStandardMaterial color="#f1f0e4" roughness={.88} side={2} /></mesh>
        <Suspense fallback={null}><Label /></Suspense>
      </group>
      <mesh position={[-.006, .756, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[.012, 1.68]} /><meshStandardMaterial color="#487764" roughness={1} /></mesh>
    </group>
    <primitive object={route} position={[0,.015,0]}/>
    <mesh ref={shipment}><sphereGeometry args={[.048,12,12]}/><meshBasicMaterial color="#c7ffe2" toneMapped={false}/></mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.15, 0]} receiveShadow><planeGeometry args={[200, 200]} /><shadowMaterial transparent opacity={.32} /></mesh>
  </>;
}
export default function ParcelWorld(props: Props) {
  return <Canvas shadows dpr={[1, 1.35]} frameloop={props.active && !props.reduced ? "always" : "demand"}
    camera={{ position: [-4.8, 3.4, 8.4], fov: 42 }} gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}>
    <ambientLight intensity={1.6} color="#d9e7df" />
    <directionalLight position={[-3, 6, 4]} intensity={3.2} color="#fff0d8" castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-.0004} />
    <directionalLight position={[4, 2, -3]} intensity={2.4} color="#8ce3c8" />
    <directionalLight position={[-4, 0, -1]} intensity={.7} color="#7da9b6" />
    <Parcel {...props} />
    <ShipmentTruck progress={props.progress} reduced={props.reduced}/>
  </Canvas>;
}
