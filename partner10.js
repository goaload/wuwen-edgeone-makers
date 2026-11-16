import {HEIGHT,partner10Room,partner10Window,windowProfile} from './plan.js';

export const partner10Objects=[];
function box(px,py,w,d,h,mat,base=0,kind='detail',solid=false,extra={}) {
  partner10Objects.push({px,py,w,d,h,mat,base,kind,solid,...extra});
}
function finish(px,py,w,d,h,mat,base=0) {
  box(px,py,w,d,h,mat,base,'wallFinish',false,{cutaway:true});
}

const [entry,oakWall,exterior]=partner10Room.bounds;
const wallWidth=exterior-entry-7, wallCenter=(entry+exterior)/2;
finish(wallCenter,oakWall+3.94,wallWidth,.9,HEIGHT-.025,'partnerOak');
for(const px of [entry+4,entry+48,entry+97,exterior-4]) {
  finish(px,oakWall+4.52,1.35,.65,HEIGHT-.025,'black');
}
for(const [base,height] of [[0,.064],[2.57,.045],[HEIGHT-.085,.06]]) {
  finish(wallCenter,oakWall+4.52,wallWidth,.65,height,'black',base);
}

const {start,end}=partner10Window;
const span=end-start, windowCenter=(start+end)/2;
const rollerTop=windowProfile('floor',partner10Window).top-.025;
box(exterior-5,windowCenter,9,span,.235,'white');
box(exterior-5.5,windowCenter,10,span,.025,'pale',.235);
finish(exterior-1.5,windowCenter,4.2,span,.08,'windowRail',.82);
const stops=[0,.30,.58,.83,1].map(fraction=>start+fraction*span);
for(const boundary of stops.slice(1,-1)) {
  finish(exterior-1.5,boundary,4.4,2.4,rollerTop-.235,'windowRail',.235);
}
for(const [i,bottom] of [1.01,1.18,1.21,1.22].entries()) {
  const center=(stops[i]+stops[i+1])/2, width=stops[i+1]-stops[i]-3.6;
  finish(exterior-4.95,center,1.15,width,rollerTop-bottom,'rollerCloth',bottom);
  finish(exterior-5.22,center,1.55,width,.035,'pale',bottom);
}

const cream={color:'#e3dfcf'};
const sofaX=773, sofaY=1522;
box(sofaX,sofaY,89,35,.075,'oakDark',.025,'sofa',true);
box(sofaX,sofaY,89,35,.095,'partnerDesk',.295);
box(sofaX,sofaY,85,33,.13,'pale',.39,'detail',false,cream);
box(sofaX,1506,89,3.4,.45,'oakDark',.37);
for(const dx of [-42,42]) {
  box(sofaX+dx,sofaY,3.5,35,.24,'oakDark',.1);
  box(sofaX+dx,sofaY,3.5,35,.07,'partnerDesk',.65);
  box(sofaX+dx*.87,sofaY,6.6,28,.15,'pale',.51,'detail',false,cream);
}
for(const dx of [-24,24]) {
  box(sofaX+dx,1509,27,6,.44,'pale',.50,'detail',false,cream);
  box(sofaX+dx,1514,19,5,.28,'pale',.51,'detail',false,{color:'#f0ebdc'});
}
box(sofaX,1520,21,26,.20,'oakDark',.52);
box(sofaX,1520,22,27,.055,'partnerDesk',.72);
box(sofaX,1524,16,14,.046,'blue',.775,'detail',false,{color:'#4861a5'});
box(sofaX,1525,5,4,.012,'white',.821);
box(sofaX,1512,15,7,.028,'dark',.775);
box(sofaX-2,1512,5.3,4.5,.075,'clay',.803);
box(sofaX+3.5,1512,3,3,.051,'pale',.803);

const deskX=756, deskY=1600, top=.77;
box(deskX,deskY,94,37,.064,'partnerDesk',top-.064,'desk',true);
for(const px of [716,796]) {
  box(px,deskY,3,4,.70,'windowRail');
  box(px,deskY,3.8,26,.046,'windowRail');
}
function chair(px,py,facing,material) {
  box(px,py,18,17,.11,material,.43,'chair',true);
  box(px,py-facing*8.2,19,2.8,.44,material,.53);
  for(const dx of [-8,8]) {
    box(px+dx,py,1.65,17,.048,'black',.625);
    box(px+dx,py-facing*3,1.65,2,.16,'black',.48);
    box(px+dx,py,1.4,15,.044,'metal',.035);
    box(px+dx,py-facing*7,1.4,1.55,.43,'metal');
  }
}
chair(756,1635,-1,'black');
chair(708,1573,1,'mesh');
box(708,1573,14,13,.055,'pale',.54);

function papers(px,py,w,d,base,count) {
  for(let i=0;i<count;i++) {
    const offset=i%3-1;
    box(px+.6*offset,py-.37*offset,w+.7*offset,d,.025,i%4===0?'board':'white',base+i*.03);
  }
}
papers(787,1598,22,26,top,6);
papers(783,1613,19,9,top,3);
box(744,1604,43,23,.02,'pale',top,'detail',false,{color:'#cfb39e'});
box(748,1608,23,8,.038,'black',top+.02);
for(const offset of [-2,0,2]) box(748,1608+offset,21,.48,.008,'windowRail',top+.058);
box(734,1601,20,14,.033,'metal',top+.02);
box(734,1595,20,1.2,.29,'dark',top+.05);
box(720,1593,15,7,.026,'black',top);
box(720,1593,3.1,3.1,.18,'black',top+.026);
box(720,1593,22,2,.34,'black',top+.206);
box(720,1594.05,20,.4,.295,'dark',top+.225);
box(711,1613,5,5,.058,'white',top);
box(711,1613,1.2,1.2,.43,'white',top+.058);
box(715.5,1613,10,1.15,.046,'white',top+.471);
box(720,1613,5.8,5.8,.11,'white',top+.361);
box(765,1592,7,5,.095,'blue',top);
box(765,1592,2,1.7,.048,'white',top+.095);

const cabinetY=1678, cabinetFace=1669;
for(const [center,glassBase] of [[708,1.58],[804,.89]]) {
  box(center,cabinetY,35,17,.07,'oakDark',0,'shelf',true);
  box(center,cabinetY+8,35,1.3,2.10,'partnerDesk',.07);
  box(center,cabinetY,35,17,.065,'oakDark',2.12);
  for(const dx of [-17,0,17]) box(center+dx,cabinetY,1.4,17,2.12,'oakDark');
  for(const dx of [-8.5,8.5]) {
    const px=center+dx;
    box(px,cabinetFace,15.8,1.2,.8,'partnerDesk',.08);
    box(px-Math.sign(dx)*5,cabinetFace-.75,1.1,1.05,.065,'black',.78);
    box(px,cabinetFace,15.2,.46,2.12-glassBase,'glass',glassBase,'detail',false,{glass:true});
    for(const level of [.88,1.21,1.57]) {
      box(px,cabinetY,15.6,17,.055,'oakDark',level);
      if(level===.88&&center===708) {
        papers(px,cabinetY,11,9,level+.055,3);
        continue;
      }
      const colors=level===1.21&&center===708?['blue','blue','black']:['pale','clay','board','blue','dark'];
      for(let i=0;i<5;i++) box(px-5.6+2.8*i,cabinetY-2,2.3,8,.21+.024*(i%3),colors[i%colors.length],level+.055);
    }
  }
}
box(756,cabinetY,52,17,.064,'oakDark',.71,'shelf',true);
box(756,cabinetY+7.5,51,2,.71,'oakDark');
box(756,cabinetY,51,15,.045,'partnerDesk',.38);
for(const px of [731,756,781]) box(px,cabinetY,2,17,.72,'oakDark');
for(const px of [738,753,769]) papers(px,cabinetY,12,11,.774,4);
for(let i=0;i<11;i++) box(733+4.4*i,cabinetY-5,2.2,3,.32,'oakDark',.035);

box(695,1651,11,10,.05,'oakDark',0);
box(695,1651,2.45,2.45,1.77,'partnerDesk',.05);
for(const dx of [-4,4]) {
  box(695+dx*.53,1651,5.4,1.5,.045,'oakDark',1.48+dx*.025);
  box(695+dx,1651,1.35,1.6,.20,'oakDark',1.5+dx*.025);
}
