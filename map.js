import {FOOTPRINT,rooms,zones,wallSegments,entrances,floorWindows,adjustedWalls,workWallFinish,workDoorLeaves} from './plan.js';
import {objects} from './furniture.js';
import {receptionColors} from './reception.js';
const NS='http://www.w3.org/2000/svg';
export function drawMap(svg,{mini=false,portrait=false,onSelect=()=>{}}={}){const el=(tag,attrs,parent=svg)=>{const n=document.createElementNS(NS,tag);for(const [k,v] of Object.entries(attrs||{}))n.setAttribute(k,v);parent.appendChild(n);return n;};
const upright=mini||portrait,point=(x,y)=>upright?[x,y]:[y-170,900-x],rect=([l,t,r,b])=>upright?{x:l,y:t,width:r-l,height:b-t}:{x:t-170,y:900-r,width:b-t,height:r-l};
svg.setAttribute('viewBox',upright?'180 185 690 1550':'-25 15 1580 735');
el('polygon',{points:FOOTPRINT.map(p=>point(...p).join(',')).join(' '),fill:mini?'#e7eadb':'#f5f4e8',stroke:'#d6ddc7','stroke-width':mini?5:2});
for(const q of [...zones,...rooms]){if(q.id==='corridor'||q.id==='partnerHall'||q.id==='hallTurn')continue;let bounds=q.bounds;if(q.id==='lobby')bounds=[290,1015,480,1165];const a=rect(bounds);const g=el('g',{'data-place':q.id,class:'plan-room',...(mini?{}:{tabindex:0,role:'button','aria-label':q.name})});const fill=q.type==='stairs'?'#dce1d0':q.type==='partner'?'#ebeede':q.type==='meeting'?'#dde4cc':q.type==='service'?'#e4e6dc':'#f0f0e4';el('rect',{...a,fill,class:'room-fill'},g);if(!mini||q.type==='partner'||q.type==='meeting'||q.id==='open'){let name=mini?(q.type==='partner'?q.name.split(' ')[1]:q.type==='meeting'?'会议':q.id==='open'?'工位':''):q.name;const text=el('text',{x:a.x+a.width/2,y:mini?a.y+a.height/2+7:a.y+a.height-13,'text-anchor':'middle',fill:'#6b7a5c','font-size':mini?25:14,class:'plan-label'},g);if(mini)text.setAttribute('style','font-size:25px');text.textContent=name;}g.addEventListener('click',()=>onSelect(q.id));g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onSelect(q.id);}});}
if(!mini)for(const o of objects.filter(o=>['desk','chair','sofa','table','shelf','counter','equipment','step'].includes(o.kind))){if(o.mapDiameter){const [cx,cy]=point(o.px,o.py);el('circle',{cx,cy,r:o.mapDiameter/2,class:'plan-furniture',fill:'#d6d9c8'});continue;}const attrs=rect([o.px-o.w/2,o.py-o.d/2,o.px+o.w/2,o.py+o.d/2]);el('rect',{...attrs,rx:o.kind==='chair'?3:1,class:'plan-furniture',fill:o.kind==='sofa'?'#b6c7b2':'#d6d9c8',...(o.zone?{style:`fill:${receptionColors[o.mat]};stroke:#9a9f92;stroke-width:1`}:{})});}
function drawWall(from,to,glazed=false) {
 const [x1,y1]=point(...from),[x2,y2]=point(...to);
 const style=glazed?`stroke:#7f9796;stroke-width:${mini?5:3};stroke-dasharray:7 2`:mini?'stroke-width:5':'';
 el('line',{x1,y1,x2,y2,class:'plan-wall',...(style?{style}:{})});
}
for(const wall of wallSegments()){
 const {a,b}=wall, finish=workWallFinish(wall);
 if(!finish){drawWall(a,b);continue;}
 const axis=finish.axis==='v'?0:1, along=1-axis;
 // The sealed tea-room doorway uses the ordinary wall style on the plan.
 const solid=adjustedWalls.filter(([from,to])=>
  from[axis]===a[axis]&&to[axis]===a[axis]&&from[along]<b[along]&&to[along]>a[along])
  .map(([from,to])=>{
   const start=[...from], end=[...to];
   start[along]=Math.max(from[along],a[along]);
   end[along]=Math.min(to[along],b[along]);
   return [start,end];
  });
 let start=a;
 for(const [from,to] of solid){
  if(start[along]<from[along]) drawWall(start,from,true);
  drawWall(from,to);
  start=to;
 }
 if(start[along]<b[along]) drawWall(start,b,true);
}
for(const leaf of workDoorLeaves.filter(d=>d.finish)){
 const {px,py,w,d,finish}=leaf,clear=finish==='clear';
 const [x1,y1]=point(px-(clear?w/2:0),py-(clear?0:d/2));
 const [x2,y2]=point(px+(clear?w/2:0),py+(clear?0:d/2));
 const pane=el('line',{x1,y1,x2,y2,stroke:'#70a8a8','stroke-width':mini?5:3,'data-kind':'glass-door','pointer-events':'none'});
 el('title',{},pane).textContent='前台与办公区之间的玻璃门';
}
for(const w of floorWindows){const a=point(...(w.axis==='v'?[w.line,w.start]:[w.start,w.line])),b=point(...(w.axis==='v'?[w.line,w.end]:[w.end,w.line]));el('line',{x1:a[0],y1:a[1],x2:b[0],y2:b[1],stroke:'#f4f4e7','stroke-width':mini?15:9,'pointer-events':'none'});const pane=el('line',{x1:a[0],y1:a[1],x2:b[0],y2:b[1],stroke:'#70a8a8','stroke-width':mini?10:5,'data-kind':'floor-window','pointer-events':'none'});const title=el('title',{},pane);title.textContent='落地窗';}
for(const e of entrances){const a=point(...e.a),b=point(...e.b);el('line',{x1:a[0],y1:a[1],x2:b[0],y2:b[1],stroke:'#bd7955','stroke-width':mini?12:6});if(!mini){let [x,y]=point(...e.a);const text=el('text',{x:e.id==='main'?x+40:x-40,y:e.id==='main'?y+34:y+8,'text-anchor':'middle',fill:'#a86d4e','font-size':12});text.textContent=e.id==='main'?'← '+e.name:e.name;}}
if(!mini){
// Lift room names above furniture and give them a small quiet backing.
for(const text of Array.from(svg.querySelectorAll('.plan-room > text'))){const font=portrait?20:14,x=Number(text.getAttribute('x')),y=Number(text.getAttribute('y')),w=text.textContent.length*font+12;const g=el('g',{'pointer-events':'none'});text.setAttribute('style',`font-size:${font}px`);el('rect',{x:x-w/2,y:y-font+2,width:w,height:font+5,rx:3,fill:'#f4f4e7','fill-opacity':.92},g);g.appendChild(text);}}
const routeLine=el('polyline',{fill:'none',stroke:'#b17455','stroke-width':mini?7:4,'stroke-dasharray':mini?'10 7':'7 5','stroke-linejoin':'round','stroke-linecap':'round','pointer-events':'none','data-kind':'walk-route'});
const goalDot=el('circle',{r:mini?13:8,fill:'#fff6e5',stroke:'#b17455','stroke-width':mini?5:3,visibility:'hidden','pointer-events':'none'});
const dot=el('circle',{id:mini?'miniDot':'planDot',cx:0,cy:0,r:mini?12:6,fill:'#b77250',stroke:'#fff9ee','stroke-width':mini?5:2,visibility:'hidden','pointer-events':'none'});
return {route(points){routeLine.setAttribute('points',points.map(p=>point(...p).join(',')).join(' '));goalDot.setAttribute('visibility',points.length?'visible':'hidden');if(points.length){const [x,y]=point(...points.at(-1));goalDot.setAttribute('cx',x);goalDot.setAttribute('cy',y);}},update(px,py,id){const [x,y]=point(px,py);dot.setAttribute('cx',x);dot.setAttribute('cy',y);dot.setAttribute('visibility','visible');svg.querySelectorAll('[data-place]').forEach(g=>g.classList.toggle('selected',g.dataset.place===id));}};
}
