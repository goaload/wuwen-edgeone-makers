import * as THREE from 'three';
import {BoxBatch} from '@engine/world/blocks.js';
import {buildIsland} from '@engine/world/terrain.js';
import {buildForest} from '@engine/world/landscape.js';
import {boxes,palette,textureFor,ceilingLights} from './office-model.js';
import {ISLAND,officeFloorAreas,ROOF_TOP,roofAt} from './layout.js';
import {obstacles as sourceObstacles} from '../navigation.js';
import {HEIGHT,toWorld,wallSegments} from '../plan.js';
import {officeDecals,officeArtwork} from '../office-art.js';
export function build({grid,layer}){
 const surfaceAt=(x,z)=>officeFloorAreas.some(({x0,x1,z0,z1})=>
  x<x1&&x+1>x0&&z<z1&&z+1>z0) ? 'concrete' : 'grass';
 buildIsland(grid,ISLAND,{surfaceAt,corner:3,wobble:0,depth:5});
 const batches={};for(const b of boxes){const B=batches[b.group]??=new BoxBatch(layer);const natural=['wood','floor','white','deskOak','talkOak','partnerOak','partnerDesk','workCarpet','blind','mesh','oak','oakLight','oakDark'].includes(b.mat);B.box(b.x,b.y,b.z,b.w,b.h,b.d,{tex:textureFor(b.mat),tint:b.color??(natural?0xffffff:palette[b.mat]),glass:b.glass,emissive:b.emissive});}
 const obstacles=sourceObstacles.map(o=>{const [x0,z1]=toWorld(o.l,o.t),[x1,z0]=toWorld(o.r,o.b);return{x0:Math.min(x0,x1),x1:Math.max(x0,x1),z0:Math.min(z0,z1),z1:Math.max(z0,z1),level:0};});
 for (const b of boxes.filter(b => b.entry)) {
  obstacles.push({x0:b.x-b.w/2,x1:b.x+b.w/2,z0:b.z-b.d/2,z1:b.z+b.d/2,level:0});
 }
 const roof = {
  levels(x,z,out) { if (roofAt(x,z)) out.push({y:ROOF_TOP,site:'roof'}); },
  obstructed(x,z,feet) { return roofAt(x,z) && feet < ROOF_TOP && feet + 1.8 > HEIGHT; },
 };
 const planes=[];for(const d of officeDecals){const t=new THREE.TextureLoader().load('data:image/svg+xml;charset=utf-8,'+encodeURIComponent(officeArtwork[d.id]));t.colorSpace=THREE.SRGBColorSpace;const m=new THREE.Mesh(new THREE.PlaneGeometry(d.width,d.height),new THREE.MeshBasicMaterial({map:t,transparent:true,depthWrite:false}));const [x,z]=toWorld(d.px,d.py);m.position.set(x,d.y+.025,z);m.rotation.y={front:0,back:Math.PI,south:Math.PI/2,north:-Math.PI/2}[d.normal];m.userData.group='officeSigns';planes.push(m);}
 const bakes=ceilingLights.map(([x,z],i)=>({id:'ceiling'+i,position:[x,HEIGHT-.14,z],power:1.8,radius:5,direction:[0,-1,0]}));
 const [lx,lz]=toWorld(414,1080);
 bakes.push({id:'front',position:[lx,HEIGHT-.45,lz],power:2.2,radius:5,direction:[0,-1,0]});
 const forest=buildForest(grid,layer,[[-19,-9],[20,10],[-18,10],[19,-9]]);
 return{batches,planes,obstacles,bakes,forest,sites:[roof],named:{drawMap}};
}
function drawMap(ctx,X,Z,ppm){for(const b of boxes){if(b.y>.9||b.h>2||b.group!=='static')continue;ctx.fillStyle=palette[b.mat]||'#ddd';ctx.fillRect(X(b.x-b.w/2),Z(b.z-b.d/2),b.w*ppm,b.d*ppm);}ctx.strokeStyle='#626b65';ctx.lineWidth=1;for(const s of wallSegments()){const a=toWorld(...s.a),b=toWorld(...s.b);ctx.beginPath();ctx.moveTo(X(a[0]),Z(a[1]));ctx.lineTo(X(b[0]),Z(b[1]));ctx.stroke();}}
export function setup({world,rig,stage}){let previous=null;return{update(){const fp=rig.firstPerson&&!rig.introActive;const light=world.lighting.uniforms.uInteriorBoost;light.value=Math.max(light.value,.42);if(fp!==previous){previous=fp;world.setHidden('officeUpper',!fp);world.setHidden('officeSigns',!fp);world.setHidden('officeCeiling',!fp);stage.renderer.shadowMap.needsUpdate=true;}}};}
