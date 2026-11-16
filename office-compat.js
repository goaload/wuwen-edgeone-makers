// CPU-projected view of the same office model, for browsers without WebGL.
import {exteriorLawn} from './world/layout.js';
import {boxes,palette} from './world/office-model.js';
import {allPlaces,toWorld,fromWorld,SCALE} from './plan.js';
import {spawn,blocked,location} from './navigation.js';
import {findRoute,lineClear} from './routes.js';
import {icon} from './engine/ui/icons.js';
import {createInterior} from './office-interior.js';
export function startCompatibility({toast,showPlace}){
 const $=s=>document.querySelector(s);document.body.classList.add('compat');$('#compatLabel').hidden=false;$('#hud').hidden=false;
 const canvas=document.createElement('canvas');canvas.setAttribute('aria-label','可旋转的律所方块全景，点击地面可行走');$('#world').replaceChildren(canvas);const ctx=canvas.getContext('2d');
 let W=innerWidth,H=innerHeight,scale=22,yaw=.43,pitch=.72,zoom=1,dirty=true,time='day',weather='clear';
 let firstPerson = true, lookYaw = Math.PI, lookPitch = .07, lastLook = 0;
 const interior = createInterior(() => {dirty=true;});
 function syncView() {
  document.body.classList.toggle('office-inside', firstPerson);
  const label = firstPerson ? '剖切视图' : '回到室内';
  $('#officeView').textContent = label;
  $('#viewButton').setAttribute('aria-label', label);
  $('#viewButton').setAttribute('aria-pressed', String(firstPerson));
  $('#crosshair').hidden = !firstPerson;
  $('#walkTip').textContent = firstPerson ? '点击地面行走 · 拖动环顾 · V 切换视图' : '点击地面行走 · 拖动旋转 · 滚轮 / 双指缩放';
  canvas.setAttribute('aria-label', firstPerson ? '室内漫游，拖动环顾，点击地面行走' : '可旋转的律所方块全景，点击地面可行走');
  dirty = true;
 }
 function toggleView() { firstPerson = !firstPerson; syncView(); }
 let current=spawn(allPlaces[0]),route=[],target=null,selected='lobby',drag=null,pointers=new Map(),pinch=0,prev=performance.now(),anim=0;const keys=new Set();
 const fixed=boxes.filter(b=>(!['officeUpper','officeCeiling','officeSigns','glazing'].includes(b.group)||b.cutaway)&&b.h>.008).map(b=>b.cutaway?{...b,h:Math.min(b.h,.88-b.y)}:b).filter(b=>b.h>0);
 const base=fixed.filter(b=>b.y+b.h<=.05||['carpet','workCarpet'].includes(b.mat));
 // Split long partitions so painter ordering stays local to nearby furniture.
 const pieces=[];for(const b of fixed.filter(b=>!base.includes(b))){if(b.wall){const along=b.w>b.d?'w':'d',len=b[along],n=Math.ceil(len/.8);for(let i=0;i<n;i++){const v={...b};v[along]=len/n;v[along==='w'?'x':'z']=b[along==='w'?'x':'z']-len/2+len/n*(i+.5);pieces.push(v);}}else pieces.push(b);}
 function resize(){W=innerWidth;H=innerHeight;const r=Math.min(devicePixelRatio,1.5);canvas.width=W*r;canvas.height=H*r;ctx.setTransform(r,0,0,r,0,0);scale=Math.min((W-80)/42,(H-190)/30)*zoom;dirty=true;}
 function project(x,y,z){const c=Math.cos(yaw),s=Math.sin(yaw),v=x*s+z*c;return[W*.5+(x*c-z*s)*scale,H*.48+(v*Math.sin(pitch)-y*Math.cos(pitch))*scale,v*Math.cos(pitch)+y*Math.sin(pitch)];}
 function ground(sx,sy){const u=(sx-W*.5)/scale,v=(sy-H*.48)/(scale*Math.sin(pitch)),c=Math.cos(yaw),s=Math.sin(yaw);return fromWorld(u*c+v*s,-u*s+v*c);}
 const shade=(color,f)=>{const n=parseInt((color||'#bbb').slice(1),16),r=Math.min(255,(n>>16)*f)|0,g=Math.min(255,((n>>8)&255)*f)|0,b=Math.min(255,(n&255)*f)|0;return `rgb(${r},${g},${b})`;};
 function faces(b,out){const x=b.x-b.w/2,X=b.x+b.w/2,z=b.z-b.d/2,Z=b.z+b.d/2,y=b.y,Y=b.y+b.h,c=palette[b.mat]||b.color||'#c3b397';const face=(vs,f)=>{const ps=vs.map(v=>project(...v));out.push({p:ps,d:ps.reduce((v,q)=>v+q[2],0)/4,color:shade(c,f*(time==='night'?.53:time==='dusk'?.83:1)),mat:b.mat,top:f===1.08,glass:b.glass});};
 face([[x,Y,z],[X,Y,z],[X,Y,Z],[x,Y,Z]],1.08);
 if(Math.sin(yaw)>0)face([[X,y,z],[X,y,Z],[X,Y,Z],[X,Y,z]],.78);else face([[x,y,Z],[x,y,z],[x,Y,z],[x,Y,Z]],.79);
 if(Math.cos(yaw)>0)face([[x,y,Z],[X,y,Z],[X,Y,Z],[x,Y,Z]],.91);else face([[X,y,z],[x,y,z],[x,Y,z],[X,Y,z]],.9);
 }
 function poly(f){ctx.beginPath();f.p.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();ctx.fillStyle=f.color;if(f.glass)ctx.globalAlpha=.32;ctx.fill();if(f.glass)ctx.globalAlpha=1;if(f.mat==='floor'&&f.top){ctx.save();ctx.clip();ctx.strokeStyle='#84765b22';ctx.lineWidth=.6;const ys=f.p.map(p=>p[1]);for(let y=Math.min(...ys);y<Math.max(...ys);y+=8){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y-50);ctx.stroke();}ctx.restore();}}
 function avatar(out){const [x,z]=toWorld(...current);const bob=route.length?Math.sin(anim*10)*.035:0;for(const b of [{x,z,y:0,w:.44,d:.32,h:.73,mat:'dark'},{x,z,y:.73,w:.53,d:.3,h:.58,color:'#304556'},{x,z,y:1.31,w:.43,d:.43,h:.43,color:'#d2a87e'},{x,z,y:1.67,w:.45,d:.45,h:.12,color:'#292620'},{x:x-.34,z,y:.8,w:.17,d:.25,h:.48,color:'#304556'},{x:x+.34,z,y:.8,w:.17,d:.25,h:.48,color:'#304556'}])faces({...b,y:b.y+bob},out);}
 const tree=(x,z)=>[{x,z,y:0,w:.45,d:.45,h:2.1,color:'#786246'},{x,z,y:1.7,w:2.7,d:2.2,h:1.2,color:'#527949'},{x:x+.2,z,y:2.8,w:1.8,d:1.7,h:.7,color:'#6b8d54'}];
 function draw(){
  dirty=false;
  if (firstPerson) {
   interior.draw(ctx,W,H,current,lookYaw,lookPitch,time);
   drawMini();
   return;
  }
  const bg=ctx.createLinearGradient(0,0,0,H);bg.addColorStop(0,time==='night'?'#142438':time==='dusk'?'#c8a6a0':'#8db9e3');bg.addColorStop(1,time==='night'?'#344b62':time==='dusk'?'#ebd0ae':'#c2deec');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
 // Pixel clouds stay in the distance and never obscure the office.
 ctx.fillStyle=time==='night'?'#dce4e51a':'#ffffff65';for(const [x,y,w] of [[.09,.21,140],[.72,.16,170],[.86,.43,130]]){ctx.fillRect(W*x,H*y,w,15);ctx.fillRect(W*x+20,H*y-10,w*.6,10);}
 for(const b of [{x:0,z:0,y:-1.25,w:40,d:21,h:.7,color:'#6c6e64'},{x:0,z:0,y:-.55,w:41,d:22,h:.45,color:'#8f8568'},{x:0,z:0,y:-.12,w:41,d:22,h:.12,color:'#8e8c86'},...exteriorLawn]){const f=[];faces(b,f);f.sort((a,b)=>a.d-b.d).forEach(poly);}for(const b of base){const fs=[];faces(b,fs);fs.sort((a,b)=>a.d-b.d).forEach(poly);}
 const all=[];for(const b of pieces)faces(b,all);for(const p of [[-18,-9],[18,9],[-18,9],[18,-9]])for(const b of tree(...p))faces(b,all);avatar(all);all.sort((a,b)=>a.d-b.d).forEach(poly);
 if(route.length){ctx.strokeStyle='#b86537';ctx.lineWidth=2;ctx.setLineDash([6,5]);ctx.beginPath();[current,...route].forEach((p,i)=>{const [x,z]=toWorld(...p),q=project(x,.16,z);i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]);});ctx.stroke();ctx.setLineDash([]);}
 for(const id of (W<720?['lobby']:['meeting','lobby','open','partner11','partner12'])){const q=allPlaces.find(p=>p.id===id),[l,t,r,b]=q.bounds,[x,z]=toWorld((l+r)/2,(t+b)/2),p=project(x,.15,z);ctx.font='10px sans-serif';ctx.textAlign='center';ctx.fillStyle=time==='night'?'#e1e8dd':'#485349';ctx.fillText(q.name,p[0],p[1]);}
 if(time==='night'){ctx.fillStyle='#ffe5aa25';for(const id of ['lobby','meeting','open']){const q=allPlaces.find(p=>p.id===id),[x,z]=toWorld(...spawn(q)),p=project(x,.2,z),r=40;const g=ctx.createRadialGradient(p[0],p[1],0,p[0],p[1],r);g.addColorStop(0,'#ffe8a64a');g.addColorStop(1,'#ffe8a600');ctx.fillStyle=g;ctx.fillRect(p[0]-r,p[1]-r,r*2,r*2);}}
 if(weather==='rain'||weather==='thunder'||weather==='snow'){ctx.strokeStyle='#dce8f6aa';ctx.fillStyle='#f7f9fa';ctx.lineWidth=1;for(let i=0;i<75;i++){const x=(i*173.7+anim*28)%W,y=(i*73.9+anim*(weather==='snow'?18:210))%H;if(weather==='snow')ctx.fillRect(x,y,3,3);else{ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-3,y+12);ctx.stroke();}}}if(['fog','haze','overcast'].includes(weather)){ctx.fillStyle=weather==='fog'?'#e5edf05c':'#7d8b9c25';ctx.fillRect(0,0,W,H);}
 drawMini();}
 const mini=$('#minimap canvas'),mc=mini.getContext('2d');function drawMini(){const mw=mini.width,mh=mini.height;mc.fillStyle='#83a25c';mc.fillRect(0,0,mw,mh);for(const b of base){mc.fillStyle=palette[b.mat]||'#d7ccad';mc.fillRect((b.x-b.w/2+22)/45*mw,(b.z-b.d/2+13)/27*mh,b.w/45*mw,b.d/27*mh);}for(const b of pieces.filter(b=>b.wall)){mc.fillStyle='#62675b';mc.fillRect((b.x-b.w/2+22)/45*mw,(b.z-b.d/2+13)/27*mh,Math.max(1,b.w/45*mw),Math.max(1,b.d/27*mh));}const [x,z]=toWorld(...current);mc.fillStyle='#fff';mc.beginPath();mc.arc((x+22)/45*mw,(z+13)/27*mh,3.5,0,7);mc.fill();}
 function stop(){route=[];target=null;$('#walkStatus').hidden=true;dirty=true;}
 function walk(goal,q){const path=findRoute(current,goal);if(!path){toast('请点击通道或家具旁边的地面。');return;}route=path;target=q;$('#walkStatus').hidden=false;$('#walkText').textContent='前往 '+(q?.name||'所选位置');dirty=true;}
 function visit(id){const q=allPlaces.find(p=>p.id===id);if(!q)return;selected=id;walk(spawn(q),q);}
 function jump(id) {
  const q=allPlaces.find(p=>p.id===id);
  if (!q) return;
  stop();
  current=spawn(q); selected=id;
  const [l,t,r,b]=q.bounds;
  lookAt(q.look||(id==='lobby'?[473,1079]:[(l+r)/2,(t+b)/2]));
  $('#locationText').textContent=q.name;
  dirty=true;
 }
 window.__officeCompat={visit,jump,stop,get position(){return current.slice();},get moving(){return route.length>0;},get time(){return time;},get weather(){return weather;}};
 const bar=$('#hotbar');bar.replaceChildren();for(const [id,label,art] of [['lobby','前台','about'],['meeting','会议室','blog'],['talk1','洽谈室','mail'],['open','办公区','works'],['map','平面图','map'],['about','关于','logo']]){const b=document.createElement('button');b.setAttribute('aria-label',label);b.innerHTML=`<img src="${icon(art).url}" alt="">`;b.onclick=()=>{if(id==='map')locationMap();else if(id==='about'){$('#officeHelp').click();}else showPlace(id);};bar.appendChild(b);}
 function locationMap(){window.location.href='./plan.html';}
 mini.onclick=e=>{const r=mini.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*45-22,z=(e.clientY-r.top)/r.height*27-13,p=fromWorld(x,z);if(!blocked(...p))walk(p,location(...p));else toast('这里有墙体或家具，请选择通道。');};
 $('#viewButton span').style.backgroundImage=`url(${icon('eye').url})`;$('#viewButton').onclick=toggleView;$('#moodButton span').textContent='☀';$('#moodButton b').textContent='白天';$('#moodButton').onclick=()=>{$('#weatherMenu').hidden=!$('#weatherMenu').hidden;$('#moodButton').setAttribute('aria-expanded',String(!$('#weatherMenu').hidden));};
 $('#weatherMenu .now').textContent='空间氛围';for(const b of document.querySelectorAll('[data-time],[data-weather]')){if(b.dataset.time==='auto'||b.dataset.weather==='auto'){b.hidden=true;continue;}b.onclick=()=>{if(b.dataset.time)time=b.dataset.time;if(b.dataset.weather)weather=b.dataset.weather;document.querySelectorAll('[data-time]').forEach(x=>x.setAttribute('aria-checked',String(x.dataset.time===time)));document.querySelectorAll('[data-weather]').forEach(x=>x.setAttribute('aria-checked',String(x.dataset.weather===weather)));document.body.classList.toggle('night',time==='night');$('#moodButton b').textContent=b.textContent;dirty=true;};}$('#environmentReset').textContent='恢复晴天';$('#weatherMenu .actions + p').hidden=true;$('#environmentDone').onclick=()=>{$('#weatherMenu').hidden=true;$('#moodButton').setAttribute('aria-expanded','false');};$('#environmentReset').onclick=()=>{time='day';weather='clear';document.body.classList.remove('night');dirty=true;$('#weatherMenu').hidden=true;};$('#soundButton span').textContent='♪';$('#soundButton').onclick=()=>toast('兼容导览暂不播放环境音。');syncView();
 canvas.addEventListener('pointerdown',e=>{pointers.set(e.pointerId,[e.clientX,e.clientY]);canvas.setPointerCapture(e.pointerId);if(pointers.size===2){drag=null;const [a,b]=[...pointers.values()];pinch=Math.hypot(a[0]-b[0],a[1]-b[1]);return;}drag={id:e.pointerId,x:e.clientX,y:e.clientY,sx:e.clientX,sy:e.clientY,moved:false};});canvas.addEventListener('pointermove',e=>{if(pointers.has(e.pointerId))pointers.set(e.pointerId,[e.clientX,e.clientY]);if(pointers.size>=2){if(firstPerson)return;const [a,b]=[...pointers.values()],n=Math.hypot(a[0]-b[0],a[1]-b[1]);zoom=Math.max(.65,Math.min(2.5,zoom*n/Math.max(1,pinch)));pinch=n;resize();return;}if(!drag||drag.id!==e.pointerId)return;if(Math.hypot(e.clientX-drag.sx,e.clientY-drag.sy)>6)drag.moved=true;if(drag.moved){
   const dx=e.clientX-drag.x, dy=e.clientY-drag.y;
   if (firstPerson) {
    lookYaw -= dx*.0047;
    lookPitch = Math.max(-1.2,Math.min(1.2,lookPitch-dy*.0045));
    lastLook = performance.now();
   } else {
    yaw += dx*.006;
    pitch = Math.max(.3,Math.min(1.2,pitch+dy*.004));
   }
   dirty=true;
  }drag.x=e.clientX;drag.y=e.clientY;});
 for(const ev of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(ev,e=>{pointers.delete(e.pointerId);if(drag?.id!==e.pointerId)return;const tap=ev==='pointerup'&&!drag.moved;drag=null;if(tap){
  const p=firstPerson?interior.pickFloor(e.clientX,e.clientY,W,H):ground(e.clientX,e.clientY);
  if(p&&!blocked(...p))walk(p,location(...p));
 }});
 canvas.addEventListener('wheel',e=>{e.preventDefault();if(firstPerson)return;zoom=Math.max(.65,Math.min(2.5,zoom*Math.exp(-e.deltaY*.001)));resize();},{passive:false});
 addEventListener('keydown',e=>{if(document.querySelector('dialog[open]')||e.target.closest('input,select,textarea'))return;if(e.code==='Escape'){stop();$('#weatherMenu').hidden=true;}if(e.code==='KeyV'&&!e.repeat){toggleView();return;}if(e.code==='KeyM'){locationMap();return;}if(e.code==='KeyF'){showPlace(location(...current).id);return;}if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code)){e.preventDefault();stop();keys.add(e.code);}});addEventListener('keyup',e=>keys.delete(e.code));addEventListener('blur',()=>{keys.clear();drag=null;pointers.clear();});addEventListener('resize',resize);
 function lookAt([px,py]) {
  const [dx,dy]=[px-current[0],py-current[1]];
  if (Math.hypot(dx,dy)>4.5) lookYaw=Math.atan2(dy,-dx);
  lookPitch=.07;
 }
 function faceRoute(dx,dy,dt,now) {
  if (!firstPerson || drag || now-lastLook < 1500) return;
  const angle = Math.atan2(dy,-dx);
  const turn = Math.atan2(Math.sin(angle-lookYaw),Math.cos(angle-lookYaw));
  lookYaw += turn * Math.min(1,dt*4);
 }
 function frame(now) {
  requestAnimationFrame(frame);
  const dt=Math.min((now-prev)/1000,.12);
  prev=now;
  if(document.hidden)return;
  anim+=dt;
  if(!document.querySelector('dialog[open]')&&$('#weatherMenu').hidden){
   if(route.length){
    let left=80*dt;
    while(route.length&&left>0){
     const p=route[0],dx=p[0]-current[0],dy=p[1]-current[1];
     const distance=Math.hypot(dx,dy),step=Math.min(left,distance);
     if(distance>.001){
      faceRoute(dx,dy,dt,now);
      current=[current[0]+dx/distance*step,current[1]+dy/distance*step];
     }
     left-=step;
     if(distance<=step+.001)route.shift();else break;
    }
    if(!route.length){if(firstPerson&&target?.look&&now-lastLook>=1500)lookAt(target.look);$('#walkStatus').hidden=true;toast('已抵达 '+(target?.name||'所选位置'));target=null;}
    dirty=true;
   }
   const forward=Number(keys.has('KeyW')||keys.has('ArrowUp'))-Number(keys.has('KeyS')||keys.has('ArrowDown'));
   const right=Number(keys.has('KeyD')||keys.has('ArrowRight'))-Number(keys.has('KeyA')||keys.has('ArrowLeft'));
   if(forward||right){
    const step=75*dt/Math.hypot(forward,right);
    const dx=firstPerson?-(forward*Math.cos(lookYaw)+right*Math.sin(lookYaw)):right;
    const dy=firstPerson?forward*Math.sin(lookYaw)-right*Math.cos(lookYaw):-forward;
    const next=[current[0]+dx*step,current[1]+dy*step];
    if(lineClear(current,next))current=next;
    dirty=true;
   }
   $('#locationText').textContent=location(...current).name;
  }
  if(dirty||(!firstPerson&&['rain','snow','thunder'].includes(weather)))draw();
 }
 resize();draw();requestAnimationFrame(frame);
}
