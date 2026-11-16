import {wallSegments,inside,rooms,doorPoint,zones,talkCorridor,partnerHall,hallTurn,workDoorLeaves} from './plan.js';
import {objects} from './furniture.js';
export const RADIUS=7.8;
export const obstacles=wallSegments().map(s=>({l:Math.min(s.a[0],s.b[0])-3.5,t:Math.min(s.a[1],s.b[1])-3.5,r:Math.max(s.a[0],s.b[0])+3.5,b:Math.max(s.a[1],s.b[1])+3.5,kind:'wall'}));
for(const o of objects.filter(o=>o.solid||['green','leaf','plant','plantLight'].includes(o.mat)||o.kind==='planter'))obstacles.push({l:o.px-o.w/2,t:o.py-o.d/2,r:o.px+o.w/2,b:o.py+o.d/2,kind:o.kind});
for(const {px,py,w,d} of workDoorLeaves) obstacles.push({l:px-w/2,t:py-d/2,r:px+w/2,b:py+d/2,kind:'door'});
const stair=rooms.find(r=>r.id==='stairs');obstacles.push({l:stair.bounds[0],t:stair.bounds[1],r:stair.bounds[2],b:stair.bounds[3],kind:'stairs'});
export function blocked(x,y){return !inside(x,y)||obstacles.some(o=>x>o.l-RADIUS&&x<o.r+RADIUS&&y>o.t-RADIUS&&y<o.b+RADIUS);}
export function spawn(q){const p=q.point||doorPoint(q);if(!blocked(...p))return p;const [l,t,r,b]=q.bounds;let best=null,dist=Infinity;for(let x=l+18;x<r-18;x+=5)for(let y=t+18;y<b-18;y+=5){let d=(x-p[0])**2+(y-p[1])**2;if(d<dist&&!blocked(x,y)){best=[x,y];dist=d;}}if(!best)throw new Error('No walkable arrival point for '+q.id);return best;}
export function location(x,y){return rooms.find(q=>q.type!=='stairs'&&x>q.bounds[0]&&x<q.bounds[2]&&y>q.bounds[1]&&y<q.bounds[3])||[zones[1],zones[0],zones[2],talkCorridor,partnerHall,hallTurn].find(q=>x>q.bounds[0]&&x<q.bounds[2]&&y>q.bounds[1]&&y<q.bounds[3])||zones[3];}
