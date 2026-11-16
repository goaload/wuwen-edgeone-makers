import {HEIGHT,partner9Room,partner9Window,windowProfile} from './plan.js';

export const partner9Objects=[];
function box(px,py,w,d,h,mat,base=0,kind='detail',solid=false,extra={}) {
  partner9Objects.push({px,py,w,d,h,mat,base,kind,solid,...extra});
}
function finish(px,py,w,d,h,mat,base=0) {
  box(px,py,w,d,h,mat,base,'wallFinish',false,{cutaway:true});
}

const [entry,left,exterior,right]=partner9Room.bounds;
const wallCenter=(entry+exterior)/2, wallWidth=exterior-entry-7;
for(const [edge,inward] of [[left,1],[right,-1]]) {
  const panel=edge+inward*3.94, trim=panel+inward*.58;
  finish(wallCenter,panel,wallWidth,.9,HEIGHT-.025,'partnerOak');
  for(const px of [entry+4,entry+48,entry+96,exterior-4]) {
    finish(px,trim,1.35,.65,HEIGHT-.025,'black');
  }
  for(const [base,height] of [[0,.064],[2.62,.047],[HEIGHT-.085,.06]]) {
    finish(wallCenter,trim,wallWidth,.65,height,'black',base);
  }
}

// Full-height glazing with four independently lowered roller shades.
const {start,end}=partner9Window;
const windowCenter=(start+end)/2, windowWidth=end-start;
const rollerTop=windowProfile('floor',partner9Window).top-.025;
box(exterior-5,windowCenter,9,windowWidth,.235,'white');
box(exterior-5.5,windowCenter,10,windowWidth,.025,'pale',.235);
finish(exterior-1.5,windowCenter,4.1,windowWidth,.085,'windowRail',.83);
const stops=[0,.19,.46,.73,1].map(f=>start+f*windowWidth);
for(const boundary of stops.slice(1,-1)) {
  finish(exterior-1.5,boundary,4.2,2.35,rollerTop-.235,'windowRail',.235);
}
for(const [i,bottom] of [2.19,2.02,1.93,1.68].entries()) {
  const center=(stops[i]+stops[i+1])/2, width=stops[i+1]-stops[i]-3.8;
  finish(exterior-4.95,center,1.08,width,rollerTop-bottom,'rollerCloth',bottom);
  finish(exterior-5.15,center,1.45,width,.04,'windowRail',bottom);
}

const deskX=777, deskY=1408, deskTop=.77;
box(deskX,deskY,78,34,.066,'partnerDesk',deskTop-.066,'desk',true);
for(const px of [742,811]) {
  box(px,deskY,3.1,4,.70,'black');
  box(px,deskY,3.5,24,.05,'black');
}
const rust={color:'#b14437'};
function redChair(px,py,facing) {
  const backY=py-facing*8.3;
  box(px,py,19,19,.105,'clay',.425,'chair',true,rust);
  box(px,backY,18.8,3.8,.33,'clay',.72,'detail',false,rust);
  box(px,backY,16.4,3.85,.07,'clay',1.05,'detail',false,rust);
  for(const dx of [-8,8]) {
    box(px+dx,backY,2.2,2.4,.88,'oakDark');
    box(px+dx,py+6*facing,2.15,2.15,.45,'oakDark');
    box(px+dx,py,2.15,16,.05,'oakDark',.09);
  }
}
redChair(786,1378,1);
redChair(780,1437,-1);
box(780,1446,19,3.3,.57,'clay',.43,'detail',false,{color:'#843a33'});

function documents(px,py,w,d,base,count) {
  const covers=['pale','white','board','blue','white','oakLight'];
  for(let i=0;i<count;i++) {
    const offset=i%3-1;
    box(px+offset*.56,py-offset*.43,w-offset*.75,d,.028,covers[i%covers.length],base+i*.035);
  }
}
box(797,1405,24,21,.017,'dark',deskTop);
box(797,1404,20,15,.034,'metal',deskTop+.017);
box(797,1404,16,8,.011,'black',deskTop+.051);
box(797,1397,20,1.1,.31,'metal',deskTop+.048);
box(797,1397.65,18.4,.35,.275,'dark',deskTop+.06);
documents(762,1410,19,13,deskTop,5);
documents(748,1404,13,11,deskTop,4);
box(810,1417,5,5,.22,'black',deskTop);
box(810,1417,5.2,5.2,.038,'metal',deskTop+.22);
box(812.5,1417,3,1.4,.048,'black',deskTop+.14);
// The pegboard holds folders at the end of the desk.
box(740,1406,2.3,32,.56,'partnerOak',deskTop);
for(const dy of [-12,-6,0,6,12]) for(const rise of [.19,.33,.47]) {
  box(741.25,1406+dy,.25,.9,.016,'oakDark',deskTop+rise);
}
for(const dy of [-9,3,11]) {
  box(743,1406+dy,4.7,6,.072,'metal',deskTop+.06);
  box(744,1406+dy,1.1,5,.22,'board',deskTop+.075);
}

const cabinetY=1347, cabinetStart=687, bay=17, cabinetTop=2.12;
const cabinetX=cabinetStart+2*bay, cabinetFace=cabinetY+8.5;
box(cabinetX,cabinetY,4*bay,17,.064,'oakDark',0,'shelf',true);
box(cabinetX,cabinetY,4*bay,17,.055,'oakDark',cabinetTop-.055);
box(cabinetX,cabinetY-8,4*bay,1.1,cabinetTop-.06,'partnerDesk',.045);
for(let i=0;i<=4;i++) box(cabinetStart+i*bay,cabinetY,1.4,17,cabinetTop,'oakDark');
for(let i=0;i<4;i++) {
  const px=cabinetStart+(i+.5)*bay;
  box(px,cabinetFace,bay-1.4,1.3,.79,'oakDark',.065);
  box(px+5.5,cabinetFace+.9,1.25,1,.053,'black',.78);
  for(const base of [.87,1.28,1.69]) box(px,cabinetY,bay-1.2,17,.04,'oakDark',base);
  const glassBase=i<2?.88:1.73;
  box(px,cabinetFace,bay-2.8,.5,2.07-glassBase,'glass',glassBase,'detail',false,{glass:true});
  for(const base of [glassBase,2.075]) box(px,cabinetFace,bay-1.3,1.25,.038,'oakDark',base);
  if(i<2) for(const base of [.91,1.32,1.73]) documents(px,cabinetY,11,9,base,3);
  else for(const [dx,base,mat] of [[-3,.92,'oakLight'],[3,1.32,'black'],[-2,1.73,'board']]) {
    box(px+dx,cabinetY,4.2,4.5,.14,mat,base);
  }
}
box(695,cabinetY,9,11,.29,'blue',cabinetTop);
box(712,cabinetY,11,12,.064,'gold',cabinetTop);
for(const base of [cabinetTop,cabinetTop+.105,cabinetTop+.21]) {
  box(744,cabinetY,12,10,.035,'black',base);
}

const sideX=698, sideY=1383, sideTop=.76;
box(sideX,sideY,24,53,.059,'deskOak',sideTop-.059,'table',true);
for(const py of [1362,1404]) {
  box(sideX,py,3.1,3.8,.71,'white');
  box(sideX,py,21,3.8,.05,'white');
}
documents(698,1373,16,17,sideTop,9);
documents(698,1394,13,16,sideTop,6);
box(700,1404,10,7,.14,'printerWhite',sideTop);

// White ring stool by the glass; its four seat strips leave the middle open.
const stoolX=697, stoolY=1433;
for(const side of [-1,1]) {
  box(stoolX+side*6,stoolY,4,13,.052,'white',.57);
  box(stoolX,stoolY+side*6,12,4,.052,'white',.57);
}
box(stoolX,stoolY,18,18,.01,'white',.025,'chair',true,{mapDiameter:18});
for(const dx of [-6,6]) for(const dy of [-6,6]) box(stoolX+dx,stoolY+dy,1.15,1.15,.57,'white');
for(const dy of [-6,6]) box(stoolX,stoolY+dy,12,1.1,.03,'white',.24);

box(788,right-10,63,11,.23,'partnerOak',0,'table',true);
box(797,1465,20,14,.061,'partnerDesk',.37,'table',true);
for(const dx of [-8,8]) for(const dy of [-5.5,5.5]) box(797+dx,1465+dy,1.8,1.8,.37,'oakDark');
finish(741,right-5.28,25,1.0,.87,'board',1.02);
finish(750,right-6,3.5,1.0,.106,'blue',1.17);
finish(750,right-6,2.8,1.1,.079,'black',1.62);
documents(exterior-7,1478,9,13,.26,5);

// Slim white fan on the sill.
box(exterior-8,1356,11,10,.045,'pale',.26);
box(exterior-8,1356,1.45,1.45,.58,'white',.305);
box(exterior-8,1356,2.1,12,.26,'white',.86);
box(exterior-9.25,1356,1.1,10,.213,'metal',.883);
for(const py of [1352,1354,1356,1358,1360]) box(exterior-9.95,py,.5,.4,.211,'pale',.883);
box(exterior-10.2,1356,.8,3,.058,'white',.961);
