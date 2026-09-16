import { CatmullRomCurve3, Vector3 } from "three";

export const truckScale = .84;
export const shipmentPath = new CatmullRomCurve3([
  new Vector3(-3,-1.15,0), new Vector3(0,-1.15,0),
  new Vector3(2,-1.15,-.6), new Vector3(3.5,-1.15,-3),
]);
const dockDistance=shipmentPath.getLengths(300)[100]/shipmentPath.getLength();
export function phase(progress:number,start:number,end:number){
  const t=Math.max(0,Math.min(1,(progress-start)/(end-start)));
  return t*t*t*(t*(t*6-15)+10);
}
export function truckPosition(progress:number,position:Vector3,tangent:Vector3){
  const distance=dockDistance+(1-dockDistance)*phase(progress,.85,1);
  shipmentPath.getPointAt(distance,position);
  shipmentPath.getTangentAt(distance,tangent);
  return {yaw:Math.atan2(-tangent.z,tangent.x),distance:(distance-dockDistance)*shipmentPath.getLength()};
}
