import {allPlaces,toWorld,fromWorld,inside,floorSections,HEIGHT} from '../plan.js';
import {spawn} from '../navigation.js';
export const ISLAND={x0:-22,x1:23,z0:-13,z1:14};
// The same office outline bounds the structural floor and excludes outdoor turf.
export const officeFloorAreas=floorSections.map(([l,t,r,b])=>{
 const [x0,z1]=toWorld(l,t), [x1,z0]=toWorld(r,b);
 return {x0,x1,z0,z1};
});
const lawnBox=(x0,x1,z0,z1)=>({
 x:(x0+x1)/2,z:(z0+z1)/2,w:x1-x0,d:z1-z0,y:-.12,h:.12,
 mat:'land',color:'#83a25c',
});
const first=officeFloorAreas[0],last=officeFloorAreas.at(-1);
export const exteriorLawn=[
 lawnBox(-20.5,first.x0,-11,11),
 ...officeFloorAreas.flatMap(({x0,x1,z0,z1})=>[
  lawnBox(x0,x1,-11,z0),lawnBox(x0,x1,z1,11),
 ]),
 lawnBox(last.x1,20.5,-11,11),
];
export const HOUSE={x0:-16.4,x1:16.4,z0:-7,z1:6.9,height:HEIGHT};
const p=toWorld(...spawn(allPlaces.find(p=>p.id==='lobby')));
export const START_INDOORS=true;
export const ROOF_TOP=HEIGHT+.16;
export const roofAt=(x,z)=>inside(...fromWorld(x,z));
export const SPAWN={x:p[0],z:p[1],heading:Math.PI};
export const EXIT={x:3.5,z:7.8};
export const DOORWAY=[{x:3.5,z:6.6,y:0},{x:3.5,z:8,y:0}];
export const INTRO={pos:[29,27,32],portrait:[36,40,42],look:[0,.1,0]};
export const STATIONS=allPlaces.map(q=>{const [x,z]=toWorld(...spawn(q)),[l,t,r,b]=q.bounds;return{id:q.id,name:q.name,en:q.name,icon:q.id==='lobby'?'about':q.type==='partner'?'works':q.type==='meeting'?'blog':q.id==='waiting'||q.type==='tea'?'mail':'map',at:[x,z],look:toWorld(...(q.look||[(l+r)/2,(t+b)/2])),floor:0};});
export const floorAt=()=>0;

export const NAV_RESOLUTION=12;
