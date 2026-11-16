// A* and string pulling adapted from Homecraft's engine/world/nav.js.
// Copyright (c) 2026 Terry. MIT, see vendor/HOMECRAFT-LICENSE.txt.
// Uses the firm's traced floorplan and continuous body clearance.
import {blocked,obstacles,RADIUS} from './navigation.js';
const STEP=4,X0=210,Y0=215,COLS=157,ROWS=371,N=COLS*ROWS;
let walkable;
const centre=k=>[X0+(k%COLS)*STEP,Y0+Math.floor(k/COLS)*STEP];
const cell=([x,y])=>{const i=Math.round((x-X0)/STEP),j=Math.round((y-Y0)/STEP);return i<0||j<0||i>=COLS||j>=ROWS?-1:j*COLS+i;};
const expanded=obstacles.map(o=>[o.l-RADIUS+1e-6,o.t-RADIUS+1e-6,o.r+RADIUS-1e-6,o.b+RADIUS-1e-6]);
export function lineClear(a,b){
 if(blocked(...a)||blocked(...b))return false;
 const dx=b[0]-a[0],dy=b[1]-a[1],minX=Math.min(a[0],b[0]),maxX=Math.max(a[0],b[0]),minY=Math.min(a[1],b[1]),maxY=Math.max(a[1],b[1]);
 for(const [l,t,r,bt] of expanded){if(maxX<l||minX>r||maxY<t||minY>bt)continue;let low=0,high=1,hit=true;for(const [origin,d,start,end] of [[a[0],dx,l,r],[a[1],dy,t,bt]]){if(Math.abs(d)<1e-10){if(origin<start||origin>end){hit=false;break;}}else{const u=(start-origin)/d,v=(end-origin)/d;low=Math.max(low,Math.min(u,v));high=Math.min(high,Math.max(u,v));if(low>high){hit=false;break;}}}if(hit)return false;}
 const n=Math.max(1,Math.ceil(Math.hypot(dx,dy)/4));for(let i=1;i<n;i++)if(blocked(a[0]+dx*i/n,a[1]+dy*i/n))return false;return true;
}
function prepare(){if(walkable)return;walkable=new Uint8Array(N);for(let k=0;k<N;k++)walkable[k]=+!blocked(...centre(k));}
function nearest(p){const k=cell(p);if(k<0)return -1;const i0=k%COLS,j0=Math.floor(k/COLS);for(let r=0;r<=8;r++){let best=-1,d=Infinity;for(let dj=-r;dj<=r;dj++)for(let di=-r;di<=r;di++){if(Math.max(Math.abs(di),Math.abs(dj))!==r)continue;const i=i0+di,j=j0+dj,n=j*COLS+i;if(i<0||j<0||i>=COLS||j>=ROWS||!walkable[n])continue;const q=centre(n),dist=Math.hypot(q[0]-p[0],q[1]-p[1]);if(dist<d&&lineClear(p,q)){best=n;d=dist;}}if(best>=0)return best;}return -1;}
export function findRoute(start,goal){
 if(blocked(...start)||blocked(...goal))return null;
 if(lineClear(start,goal))return [goal.slice()];
 prepare();const sk=nearest(start),gk=nearest(goal);if(sk<0||gk<0)return null;
 const cost=new Float64Array(N).fill(Infinity),parent=new Int32Array(N).fill(-1),closed=new Uint8Array(N),heap=new Heap();
 const gi=gk%COLS,gj=Math.floor(gk/COLS),h=k=>{const dx=Math.abs(k%COLS-gi),dy=Math.abs(Math.floor(k/COLS)-gj);return dx+dy+(Math.SQRT2-2)*Math.min(dx,dy);};
 cost[sk]=0;heap.push(sk,h(sk));let found=false;
 while(heap.size){const k=heap.pop();if(k===gk){found=true;break;}if(closed[k])continue;closed[k]=1;const i=k%COLS,j=Math.floor(k/COLS);
  for(let dj=-1;dj<=1;dj++)for(let di=-1;di<=1;di++){if(!di&&!dj)continue;const ni=i+di,nj=j+dj,n=nJ(ni,nj);if(n<0||closed[n]||!walkable[n])continue;if(di&&dj&&(!walkable[j*COLS+ni]||!walkable[nj*COLS+i]))continue;if(!lineClear(centre(k),centre(n)))continue;const g=cost[k]+(di&&dj?Math.SQRT2:1);if(g<cost[n]){cost[n]=g;parent[n]=k;heap.push(n,g+h(n));}}
 }
 if(!found)return null;const points=[];for(let k=gk;k!==-1;k=parent[k])points.push(centre(k));points.reverse();points.unshift(start.slice());points.push(goal.slice());
 const route=[];let a=0;while(a<points.length-1){let b=points.length-1;while(b>a+1&&!lineClear(points[a],points[b]))b--;route.push(points[b]);a=b;}return route;
}
function nJ(i,j){return i<0||j<0||i>=COLS||j>=ROWS?-1:j*COLS+i;}
class Heap{
 constructor(){this.keys=[];this.pri=[];}get size(){return this.keys.length;}
 push(k,p){const {keys,pri}=this;let i=keys.length;keys.push(k);pri.push(p);while(i>0){const parent=(i-1)>>1;if(pri[parent]<=p)break;keys[i]=keys[parent];pri[i]=pri[parent];i=parent;}keys[i]=k;pri[i]=p;}
 pop(){const {keys,pri}=this,top=keys[0],k=keys.pop(),p=pri.pop();if(keys.length){let i=0;for(;;){let c=2*i+1;if(c>=keys.length)break;if(c+1<keys.length&&pri[c+1]<pri[c])c++;if(pri[c]>=p)break;keys[i]=keys[c];pri[i]=pri[c];i=c;}keys[i]=k;pri[i]=p;}return top;}
}
