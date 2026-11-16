import {HEIGHT,partner7Window,rooms,windowProfile} from './plan.js';

export const partner7Colors = {
  partnerOak:'#b88c5e', partnerDesk:'#75442f', rollerCloth:'#454d58', windowRail:'#606b71',
};

export const partner7Objects = [];
function box(px,py,w,d,h,mat,base=0,kind='detail',solid=false,extra={}) {
  partner7Objects.push({px,py,w,d,h,mat,base,kind,solid,...extra});
}
function finish(px,py,w,d,h,mat,base=0) {
  box(px,py,w,d,h,mat,base,'wallFinish',false,{cutaway:true});
}

const [entry,left,exterior,right] = rooms.find(room=>room.id==='partner7').bounds;
const wallLength = exterior-entry-7;
const wallCenter = (entry+exterior)/2;
// Clad the office faces of the two shared walls with vertical oak and black trim.
for (const [edge,inward] of [[left,1],[right,-1]]) {
  const panel = edge+inward*3.94;
  const trim = panel+inward*.51;
  finish(wallCenter,panel,wallLength,.9,HEIGHT-.025,'partnerOak');
  for (const px of [entry+4,entry+50,entry+98,exterior-4]) {
    finish(px,trim,1.45,.65,HEIGHT-.025,'black');
  }
  for (const [base,height] of [[0,.064],[2.53,.041],[HEIGHT-.085,.06]]) {
    finish(wallCenter,trim,wallLength,.65,height,'black',base);
  }
}

const {start,end} = partner7Window;
const windowCenter = (start+end)/2;
const paneWidth = (end-start)/3;
const rollerTop = windowProfile(partner7Window.kind,partner7Window).top-.025;
box(exterior-5,windowCenter,9,end-start,.215,'white');
box(exterior-5.5,windowCenter,10,end-start,.031,'pale',.215);
finish(exterior-1.5,windowCenter,4.5,end-start,.077,'windowRail',.80);
for (const boundary of [start+paneWidth,end-paneWidth]) {
  finish(exterior-1.5,boundary,4.5,2.3,rollerTop-.246,'windowRail',.246);
}
// The middle shade is fully lowered. The left and right openings admit light.
for (const [i,bottom] of [1.63,.27,1.27].entries()) {
  const center = start+(i+.5)*paneWidth;
  const width = paneWidth-4.4;
  finish(exterior-4.95,center,1.1,width,rollerTop-bottom,'rollerCloth',bottom);
  finish(exterior-5.05,center,1.45,width,.035,'windowRail',bottom);
  finish(exterior-4.85,center,2.1,width,.075,'windowRail',rollerTop-.075);
}

function windowPlant(py,size) {
  const px=exterior-7;
  box(px,py,size,size,size*.024,'pale',.247);
  for (const [dx,dy,dyBase] of [[0,0,0],[-1,1.5,.06],[.7,-1.4,.10]]) {
    box(px+dx,py+dy,size*.8,size*.74,.065,'plant',.25+size*.024+dyBase);
  }
}
windowPlant(1070,5.5);
windowPlant(1146,4.0);
windowPlant(1155,3.4);

// Two low, black mesh cantilever chairs with pale seat pads.
function chair(px,py,inward,lumbar=false) {
  box(px,py,18,17,.09,'black',.42,'chair',true);
  box(px,py+inward,16.8,15,.052,'pale',.51);
  box(px,py-inward*7.2,18,2.5,.48,'mesh',.52);
  box(px,py-inward*7.2,19,2.8,.045,'black',1);
  for (const edge of [-8.5,8.5]) {
    box(px+edge,py-inward*7.2,1.25,2.8,.47,'black',.53);
    box(px+edge,py,1.5,15,.054,'black',.65);
    box(px+edge,py+inward*6.7,1.35,1.35,.58,'metal',.065);
    box(px+edge,py,1.4,16,.036,'metal',.035);
  }
  box(px,py-inward*7.4,18,1.4,.036,'metal',.035);
  if (lumbar) box(px,py-inward*4.3,13.5,3.7,.27,'printerWhite',.57);
}

const deskX=770, deskY=1099, deskTop=.765;
box(deskX,deskY,80,31,.065,'partnerDesk',deskTop-.065,'desk',true);
box(deskX,deskY,78,29,.042,'black',deskTop-.107);
for (const px of [736,804]) {
  box(px,deskY,3.4,4.5,deskTop-.104,'black');
  box(px,deskY,3.4,24,.05,'black');
}
chair(777,1069,1,true);
chair(735,1166,-1);

// The ivory monitor faces the desk chair. Documents use plain pixel shapes.
box(790,1105,9,7,.026,'metal',deskTop);
box(791,1106,1.9,1.9,.25,'metal',deskTop+.026);
box(790,1104,25,2.2,.41,'printerWhite',1.005);
box(790,1102.7,24.6,.5,.38,'black',1.02);
box(790,1102.35,23.4,.3,.353,'dark',1.032);
box(789,1093,19,5.5,.024,'pale',deskTop);
for (const py of [1092,1094]) box(789,py,16,.72,.007,'metal',deskTop+.024);
box(775,1092,3.6,3.6,.043,'pale',deskTop);
box(767,1104,12,11,.013,'pale',deskTop);
box(750,1105,10,8,.019,'pale',deskTop);
box(760,1093,7.5,5,.033,'black',deskTop);
box(741,1109,4,4,.115,'black',deskTop);
for (const [offset,mat] of [[-1,'red'],[0,'pale'],[1,'blue']]) {
  box(741+offset,1109,1,1,.12,mat,deskTop+.081);
}
box(803,1100,5,4,.087,'blue',deskTop);
box(803,1100,4,3,.038,'pale',deskTop+.087);

// Four pale oak cabinet bays, with glass above and paneled doors below.
const cabinetStart=747, bayWidth=18.5, cabinetDepth=17, cabinetY=1166.5, cabinetTop=2.19;
const cabinetWidth=4*bayWidth, cabinetX=cabinetStart+cabinetWidth/2;
box(cabinetX,cabinetY,cabinetWidth,cabinetDepth,.067,'deskOak',0,'shelf',true);
box(cabinetX,cabinetY,cabinetWidth,cabinetDepth,.054,'deskOak',cabinetTop-.054);
box(cabinetX,1174.4,cabinetWidth,1.2,cabinetTop-.08,'oak',.05);
for (let i=0;i<=4;i++) {
  box(cabinetStart+i*bayWidth,cabinetY,1.3,cabinetDepth,cabinetTop,'deskOak');
}
for (let i=0;i<4;i++) {
  const px=cabinetStart+(i+.5)*bayWidth;
  box(px,1158.1,bayWidth-1.4,1.3,.83,'deskOak',.067);
  box(px,1157.3,bayWidth-3.8,.4,.72,'oakLight',.12);
  box(px+5.8,1156.95,1.1,1,.058,'metal',.80);
  for (const base of [.89,1.29,1.71]) box(px,cabinetY,bayWidth-1.2,cabinetDepth,.033,'deskOak',base);
  for (const offset of [-8.2,8.2]) box(px+offset,1157.9,1.2,1.3,1.24,'deskOak',.90);
  box(px,1157.9,bayWidth-1.4,1.3,.038,'deskOak',2.112);
  box(px,1157.75,bayWidth-3.3,.33,1.17,'glass',.94,'detail',false,{glass:true});
  if (i<2) {
    box(px,1165,10,7,.06,'board',.924);
  } else {
    for (const [offset,mat] of [[-4.5,'blue'],[-1,'black'],[2.5,'board']]) {
      box(px+offset,1166,3,8,.24,mat,1.323);
      box(px+offset,1161.95,1.25,.5,.072,'pale',1.45);
    }
  }
}
for (const [px,mat] of [[772,'board'],[791,'gold']]) {
  box(px,1167,14,1.5,.26,'oakDark',cabinetTop);
  box(px,1166,12.6,.6,.215,mat,cabinetTop+.022);
}
box(811,1167,6,6,.20,'oakLight',cabinetTop);
for (const [offset,h,mat] of [[-2,.28,'gold'],[0,.39,'pale'],[2,.32,'printerWhite']]) {
  box(811+offset,1167,1,1,h,'oakDark',cabinetTop+.15);
  box(811+offset,1167,2,2,.052,mat,cabinetTop+.15+h);
}

// The narrow side table sits under the office-side glass partition.
const consoleX=692, consoleY=1077, consoleTop=.89;
box(consoleX,consoleY,15,45,.052,'deskOak',consoleTop-.052,'table',true);
for (const px of [686.3,697.7]) for (const py of [1057,1097]) {
  box(px,py,1.8,1.8,consoleTop-.052,'black');
}
box(687,consoleY,1.8,42,.07,'black',.14);
box(690,1061,7,7,.24,'white',consoleTop);
box(689,1072,4,3,.165,'red',consoleTop);
box(693,1083,7.5,9,.016,'pale',consoleTop);
box(690,1091,3,3,.097,'pale',consoleTop);

// Stepped round seat and slim dark legs keep the stool in the voxel style.
box(713,1063,11,11,.066,'deskOak',.55,'chair',true);
for (const side of [-6.25,6.25]) {
  box(713+side,1063,1.5,7,.066,'deskOak',.55);
  box(713,1063+side,7,1.5,.066,'deskOak',.55);
}
for (const dx of [-4,4]) for (const dy of [-4,4]) box(713+dx,1063+dy,1.5,1.5,.55,'black');
for (const dy of [-4,4]) box(713,1063+dy,8,1.25,.035,'black',.21);
