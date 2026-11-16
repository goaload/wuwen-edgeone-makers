import {HEIGHT,teaWindow} from './plan.js';

export const teaObjects=[];
function box(px,py,w,d,h,mat,base=0,kind='detail',solid=false,extra={}) {
  teaObjects.push({px,py,w,d,h,mat,base,kind,solid,...extra});
}
function finish(px,py,w,d,h,mat,base=0) {
  box(px,py,w,d,h,mat,base,'wallFinish',false,{cutaway:true});
}

// The three roller shades stop at the same height above the window ledge.
const {start,end,line}=teaWindow, pane=(end-start)/3;
box((start+end)/2,line+5,end-start,10,.22,'white');
finish((start+end)/2,line+2,end-start,4,.06,'windowRail',.73);
for(let i=0;i<3;i++) {
  const px=start+pane*(i+.5);
  finish(px,line+5,pane-3,1,HEIGHT-.085-2.05,'rollerCloth',2.05);
  finish(px,line+5,pane-3,1.6,.04,'windowRail',2.05);
  if(i) finish(start+i*pane,line+2,2.4,4.5,HEIGHT-.305,'windowRail',.22);
}
for(const px of [495,520,544,568]) {
  box(px,227,16,1.5,.36,'oakDark',.78);
  box(px,228,13,1,.30,'oakLight',.81);
}
box(530,229,76,2.2,.45,'oakDark',.24);

// Dark timber table, inset slatted tray and a woven runner.
const x=521, y=330, top=.77;
box(x,y,49,86,.078,'partnerDesk',top-.078,'table',true);
box(x,y,46,83,.13,'oakDark',top-.208);
for(const dx of [-20,20]) for(const dy of [-36,36]) box(x+dx,y+dy,4.2,4.2,.63,'partnerDesk');
box(505,333,13,79,.012,'cushion',top);
box(529,321,28,49,.024,'oakDark',top);
for(let i=0;i<9;i++) box(529,300+5*i,24,.55,.006,'partnerDesk',top+.024);

function pot(px,py,base,mat,size=6){
  box(px,py,size,size,.092,mat,base);
  box(px,py,size*.72,size*.72,.031,mat,base+.092);
  box(px,py,1.4,1.4,.025,mat,base+.123);
  box(px+size*.53,py,2.5,1.7,.033,mat,base+.05);
  box(px-size*.53,py,1.9,2.7,.043,mat,base+.035);
}
pot(532,312,.8,'red');
pot(531,325,.8,'clay',6.5);
pot(534,302,.8,'metal',7.5);
for(const [px,py,mat] of [[524,314,'pale'],[525,321,'pale'],[525,329,'pale'],[532,341,'red'],[533,361,'black']]){
  box(px,py,5,5,.027,mat,.8);
  box(px,py,3.6,3.6,.058,mat,.827);
  box(px,py,2.5,2.5,.012,'oakDark',.885);
}

// Stepped timber rails give the three chairs their horseshoe silhouettes.
function chair(px,py,facing,host=false) {
  const turn=(dx,dy)=>host?[px+dy,py+dx]:[px+facing*dx,py+dy];
  const part=(dx,dy,w,d,h,mat,base,kind='detail',solid=false)=>
    box(...turn(dx,dy),host?d:w,host?w:d,h,mat,base,kind,solid);
  part(0,0,20,22,.07,'partnerDesk',.40,'chair',true);
  part(0,0,17,19,.046,'pale',.47);
  for(const dx of [-8,8]) for(const dy of [-9,9]) part(dx,dy,2.1,2.1,.46,'oakDark',0);
  part(-8.5,0,2,7,.49,'partnerDesk',.46);
  part(-9,0,2.1,12,.052,'oakDark',.98);
  for(const side of [-1,1]) {
    part(-7.4,side*8,4,3.3,.06,'oakDark',.91);
    part(-4,side*10,4.5,2.1,.065,'oakDark',.82);
    part(1,side*10.5,6,2.1,.059,'oakDark',.74);
    part(5,side*10,3,2,.24,'oakDark',.51);
  }
}
chair(481,329,1);
chair(561,337,-1);
chair(521,270,1,true);

// The screen stands just inside the glazed partition.
for(let i=0;i<5;i++) finish(589.8,335+(i-2)*28.35,1.2,28.1,1.84,'pale',.02);

// Open display shelves with closed lower cupboards, offset to show the screen.
function shelving(py,side){
  const px=579, w=19, d=36;
  box(px,py,w,d,.58,'partnerDesk',0,'shelf',true);
  for(const offset of [-8,8]) {
    box(568.9,py+offset,1.1,14,.46,'oakDark',.07);
    box(568.2,py+offset,1.5,1.3,.07,'gold',.26);
  }
  for(const dx of [-8.7,8.7]) for(const dy of [-17.1,17.1]) box(px+dx,py+dy,1.65,1.65,2.20,'oakDark',.02);
  for(const h of [.59,1.07,1.58,2.19]) {
    box(px,py,w,d,.038,'partnerDesk',h);
    if(h<2) box(569,py,1,d,.052,'oakDark',h+.04);
  }
  box(px,py+side*3,1.8,1.8,1.61,'oakDark',.62);
  pot(576,py-8,1.11,'red',5);
  pot(576,py+8,1.11,'pale',4.7);
  pot(577,py+8,1.62,'clay',5.5);
  box(576,py-7,8,10,.16,'oakLight',.63);
  box(576,py-7,8,10,.032,'gold',.79);
  box(576,py+7,8,10,.20,'green',.63);
}
shelving(253,1);
shelving(419,-1);

box(474,243,16,16,.37,'white',0,'planter');
box(474,243,2.7,2.7,1.96,'oakDark',.35);
for(const [dx,dy,base,w] of [[1,2,.67,16],[-2,0,.91,16],[4,-2,1.32,18],[-2,1,1.59,19],[0,1,1.92,22],[3,0,2.12,19],[-4,-3,2.22,14]]) {
  box(474+dx,243+dy,w,w*.79,.25,'plant',base);
  box(471+dx,241+dy,w*.72,w*.53,.15,'plantLight',base+.12);
}
