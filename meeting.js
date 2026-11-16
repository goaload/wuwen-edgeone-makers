import {HEIGHT,meetingWindow} from './plan.js';

export const meetingObjects=[];
function box(px,py,w,d,h,mat,base=0,kind='detail',solid=false,extra={}) {
  meetingObjects.push({px,py,w,d,h,mat,base,kind,solid,...extra});
}
function finish(px,py,w,d,h,mat,base=0) {
  box(px,py,w,d,h,mat,base,'wallFinish',false,{cutaway:true});
}
const tableX=355, top=.77;
// The straight sections and stepped end caps share a single height.
for (const [py,d] of [[360,86],[446.5,86]]) {
  box(tableX,py,76,d,.06,'partnerOak',top-.06,'table',true);
  box(tableX,py,75,d,.024,'metal',top-.084);
}
for (const [edge,dir] of [[317,-1],[490,1]]) {
  let at=edge+dir*.45;
  for(const [w,d] of [[75,7],[70,7],[62,6],[49,5],[32,4]]) {
    box(tableX,at+dir*d/2,w,d,.06,'partnerOak',top-.06,'table',true);
    box(tableX,at+dir*d/2,w-.5,d,.024,'metal',top-.084);
    at+=dir*d;
  }
}
for (const py of [311,383,423,497]) for(const px of [324,386]) {
  box(px,py,3.2,3.2,top-.08,'metal');
}
for(const py of [361,446]) {
  box(tableX,py,12,6,.017,'pale',top);
  box(tableX,py+1.7,8,.35,.008,'metal',top+.017);
}
box(355,309,7,7,.12,'gold',top);
box(355,309,8,8,.11,'pale',top+.12);
for(const [dx,dy,height] of [[0,0,.22],[-3,-1,.16],[3,-2,.18],[0,4,.14],[-3,3,.20]]) {
  box(355+dx,309+dy,1,1,height,'oakDark',.98);
  box(355+dx,309+dy,4,4,.04,'pale',.98+height);
  box(355+dx,309+dy,2,2,.055,'gold',1.01+height);
}
box(369,318,8,1.7,.03,'black',top);

function chair(px,py,side) {
  box(px,py,18,19,.082,'black',.43,'chair',true);
  box(px+side*7.4,py,2.5,19,.47,'mesh',.51);
  box(px+side*7.4,py,3,20,.04,'black',.98);
  for(const dy of [-8.5,8.5]) {
    box(px,py+dy,17,1.25,.04,'metal',.03);
    box(px-side*7,py+dy,1.5,1.5,.63,'metal',.04);
    box(px,py+dy,15,1.35,.045,'black',.64);
  }
  box(px+side*7,py,1.4,18,.045,'metal',.03);
}
for(const py of [321,370,419,468]) {
  chair(314,py,-1);
  chair(405,py,1);
}
box(355,274,19,16,.085,'black',.43,'chair',true);
box(355,267,19,2.5,.46,'mesh',.51);
for(const px of [347,363]) box(px,275,1.4,14,.43,'metal');

// Four roller shades across the window, raised on the display-wall side.
const {start,end,line}=meetingWindow, span=(end-start)/4;
box((start+end)/2,line+5,end-start,10,.20,'white');
box((start+end)/2,line+5,end-start,11,.04,'pale',.20);
finish((start+end)/2,line+2,end-start,4,.06,'windowRail',.73);
for(const [i,bottom] of [2.92,.79,.93,1.02].entries()) {
  const px=start+span*(i+.5);
  finish(px,line+5,span-3.2,1.0,HEIGHT-.085-bottom,'rollerCloth',bottom);
  finish(px,line+5,span-3.2,1.6,.036,'windowRail',bottom);
  if(i>0) finish(start+i*span,line+2,2.4,4.5,HEIGHT-.32,'windowRail',.24);
}
box(361,240,66,13,.075,'black',0,'equipment',true);
for(const px of [346,376]) box(px,239,2.1,3,1.36,'black',.05);
box(361,241,45,8,.055,'black',.59);
box(361,240,65,2.8,.83,'black',1.02);
box(361,241.6,62.5,.55,.78,'black',1.045);

function plant(px,py,size,height) {
  box(px,py,size,size,.38,'white',0,'planter');
  box(px,py,2,2,height-.35,'oakDark',.36);
  for(const [dx,dy,y] of [[0,0,.48],[-3,2,.61],[4,-3,.72],[0,2,.84],[2,0,.92]]) {
    box(px+dx,py+dy,size*.77,size*.76,height*.22,'plant',height*y);
    box(px+dx-2,py+dy-2,size*.49,size*.52,height*.14,'plantLight',height*y+.085);
  }
}
plant(422,240,16,2.18);
box(293,241,14,14,.34,'white',0,'planter');
for(const [i,h] of [.48,.65,.75,.51,.69,.56].entries()) {
  box(289+i*1.6,238+(i%3)*2,1.5,1.65,h,i%2?'plant':'plantLight',.31);
}
// Mobile glass board by the window.
box(435,268,17,24,.055,'pale',.06,'equipment',true);
for(const py of [260,276]) box(436,py,2.4,2.4,1.12,'pale',.1);
box(435,268,1.5,28,1.09,'frost',.84);

// Timber wainscot framing the two entrances.
for(const [px,py,w,d] of [[339,590.8,132,1],[445.8,522.5,1,145]]) {
  finish(px,py,w,d,HEIGHT-.025,'partnerOak');
  const alongX=w>d;
  for(const offset of alongX?[-65,-28,14,48,65]:[-72,-36,0,35,71]) {
    finish(px+(alongX?offset:-.65),py+(alongX?-.65:offset),alongX?1.8:1,alongX?1:1.8,HEIGHT-.025,'black');
  }
  for(const base of [0,2.41,HEIGHT-.085]) {
    finish(px-(alongX?0:.65),py-(alongX?.65:0),w,d,.06,'black',base);
  }
}
box(339,581,111,17,.07,'oakLight',0,'shelf',true);
box(339,588.5,111,1.5,2.15,'oak',.05);
box(339,581,111,17,.055,'oakLight',2.17);
for(let i=0;i<=6;i++) box(283.5+i*18.5,581,1.5,17,2.18,'oakLight',.025);
for(let i=0;i<6;i++){
  const px=292.75+i*18.5;
  box(px,573,17,1.5,.89,'deskOak',.07);
  box(px,572.1,14.9,.7,.77,'oakLight',.12);
  for(const y of [.96,1.36,1.75]) box(px,581,17,16,.032,'oakLight',y);
  for(const y of [.98,2.13]) box(px,572.7,17,1.4,.035,'oakLight',y);
  box(px,572.55,16,.42,1.14,'glass',1,'detail',false,{glass:true});
  for(const [j,y] of [1,1.4,1.79].entries()) {
    if((i+j)%4===3) continue;
    for(let k=0;k<3;k++) box(px-5+k*4,579,2.8,5,.16+((i+j+k)%3)*.043,['red','blue','pale','gold'][(i+j+k)%4],y);
  }
}
box(291,554,15,17,.05,'black',.09,'equipment',true);
for(const y of [.43,.78]) box(291,554,15,17,.045,'black',y);
for(const px of [285,297]) for(const py of [547,561]) box(px,py,1.45,1.45,.82,'black',.05);
for(const px of [288,294]) for(const py of [550,557]) box(px,py,2.8,2.8,.075,'pale',.475);
box(291,551,5,5,.11,'oakLight',.825);
