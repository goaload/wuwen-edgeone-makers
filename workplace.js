import {receptionWorkDoor} from './plan.js';

// Shared work area traced from the photos, in the plan's drawing units.
export const workplaceColors = {
  deskOak:'#ddd0b8', workCarpet:'#969697', blind:'#aeb5b5', frost:'#c2d0ca',
  metal:'#aeb6ba', printerWhite:'#deddd3', vent:'#878b89',
  mesh:'#353b3c', bottle:'#769bb1', board:'#e6eae7',
};

export const workplaceObjects = [];
function box(px, py, w, d, h, mat, base=0, kind='detail', solid=false, extra={}) {
  workplaceObjects.push({px,py,w,d,h,mat,base,kind,solid,...extra});
}

function plant(px, py, tall=false, base=0) {
  const pot = tall ? 17 : 8;
  const height = tall ? .42 : .17;
  box(px,py,pot,pot,height,'white',base,'planter');
  box(px,py,2,2,tall ? .91 : .21,'oakDark',base+height-.02);
  const spread = tall ? 10 : 5;
  for (let i=0;i<9;i++) {
    const angle=i*2.4, radius=spread*(1-i*.047);
    box(px+Math.cos(angle)*radius,py+Math.sin(angle)*radius,tall?10:5,tall?8:4,
      tall?.16:.065,i%3?'plant':'plantLight',base+height+.05+i*(tall?.115:.027));
  }
}

function workChair(px, py, inward) {
  box(px,py,20,20,.12,'black',.43,'chair',true);
  box(px+inward*9,py,3,20,.56,'mesh',.50);
  box(px+inward*9,py,3.8,21,.035,'black',1.05);
  for (const side of [-9,9]) box(px,py+side,14,2,.06,'black',.62);
  box(px,py,3.2,3.2,.42,'metal',.035);
  box(px,py,18,2,.06,'black',.06);
  box(px,py,2,18,.06,'black',.06);
}

// Two facing pairs share one pale-wood bench. Raised cubbies and pixel
// lattice organizers replace the generic monitors in the original model.
const deskX=534, deskY=1031;
box(deskX,deskY,55,72,.065,'deskOak',.735,'desk',true);
for (const px of [510,558]) for (const offset of [-33,33]) box(px,deskY+offset,2.5,2.5,.735,'black');
for (const offset of [-19,19]) {
  const py=deskY+offset;
  workChair(497,py,-1);
  workChair(571,py,1);
}
box(deskX,deskY,13,64,.036,'deskOak',.80);
box(deskX,deskY,13,64,.04,'deskOak',1.04);
box(deskX,deskY,1.5,64,.24,'black',.8);
for (const offset of [-32,0,32]) box(deskX,deskY+offset,13,1.6,.24,'black',.8);
for (const px of [516,551]) for (const offset of [-21,19]) {
  const py=deskY+offset;
  box(px,py,1.1,25,.03,'black',.801);
  box(px,py,1.1,25,.024,'black',.99);
  for (let i=-2;i<=2;i++) box(px,py+i*5.8,1,1,.17,'black',.827);
  box(px,py-8,9,7,.02,'board',.801);
}
plant(deskX,deskY-6,false,1.08);
plant(499,deskY,true);

// Equipment is grouped along the solid wall, leaving the middle clear.
plant(506,1083,true);
box(507,1114,29,25,1.76,'metal',0,'equipment',true);
for (const y of [.51,.79]) box(522,1114,1,25,.026,'black',y);
box(522,1122,1,4,.09,'board',1.60);
box(504,1156,32,51,.085,'oak',.88,'table',true);
for (const px of [491,517]) for (const py of [1134,1178]) box(px,py,3.4,3.4,.88,'oak');
box(505,1156,3,48,.07,'oak',.18);
box(503,1143,12,12,.31,'black',.97);
box(509,1143,4,9,.11,'metal',1.03);
box(505,1160,6,7,.20,'metal',.97);
box(505,1169,5,5,.14,'clay',.97);
box(505,1169,5.5,5.5,.035,'gold',1.11);
box(503,1190,28,14,.70,'black',0,'equipment',true);
box(502,1190,12,12,.28,'bottle',.70);
box(502,1190,6,6,.09,'bottle',.98);
box(502,1190,5,5,.035,'black',1.07);
box(505,1219,31,30,.78,'printerWhite',0,'equipment',true);
box(505,1219,31,30,.18,'black',.78);
box(505,1219,31,30,.13,'printerWhite',.96);
box(511,1219,16,20,.03,'board',1.09);
for (const y of [.21,.42,.59]) box(520.8,1219,1,23,.022,'vent',y);

// The stepped black and pale cubbies are open at the front.
for (const [py,y,mat] of [[1199,1.28,'black'],[1184,1.28,'black'],[1169,1.28,'printerWhite'],
 [1184,1.61,'black'],[1169,1.61,'printerWhite'],[1169,1.94,'printerWhite']]) {
  box(488,py,2,15,.32,mat,y);
  for (const side of [-7,7]) box(494,py+side,12,1.2,.32,mat,y);
  for (const offset of [0,.30]) box(494,py,12,15,.027,mat,y+offset);
}
box(498,1158,5.6,5.6,.2,'white',1.61);
for (let i=0;i<5;i++) box(498,1155+i*1.5,1,1,.16+i*.012,'gold',1.79);

// Keep the photo board over the workbench on the solid wall.
const boardWidth=83, boardBase=1.40, boardX=receptionWorkDoor.line+4;
const boardY=deskY+26.5;
box(boardX,boardY,1,boardWidth,.91,'board',boardBase);
for (let i=0;i<25;i++) {
  const col=i%8, row=Math.floor(i/8), py=boardY-34+col*9+(row%2)*2;
  const y=boardBase+.70-row*.17+((i*7)%5)*.013;
  const color=['#394d5f','#8b6d52','#6b8276','#a47771','#536476'][i%5];
  box(boardX+1,py,.75,7.6,.137,'white',y);
  box(boardX+1.45,py,.25,6.9,.104,'board',y+.02,'detail',false,{color});
  box(boardX+1.62,py+1,.14,3.9,.035,'oakDark',y+.027);
}
