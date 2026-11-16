import {HEIGHT,partner12Room} from './plan.js';

export const partner12Objects=[];
function box(px,py,w,d,h,mat,base=0,kind='detail',solid=false,extra={}) {
  partner12Objects.push({px,py,w,d,h,mat,base,kind,solid,...extra});
}
function finish(px,py,w,d,h,mat,base=0) {
  box(px,py,w,d,h,mat,base,'wallFinish',false,{cutaway:true});
}

const [left,back,right,front]=partner12Room.bounds;
const panelWidth=right-left-7, wallCenter=(left+right)/2;
finish(wallCenter,back+3.95,panelWidth,.9,HEIGHT-.025,'partnerOak');
for(const px of [left+4,left+44,right-44,right-4]) {
  finish(px,back+4.63,1.4,.65,HEIGHT-.025,'black');
}
for(const [base,height] of [[0,.065],[2.72,.047],[HEIGHT-.09,.065]]) {
  finish(wallCenter,back+4.63,panelWidth,.65,height,'black',base);
}

// The solid white door is shown closed on the interior face of the wall.
const doorY=1345;
finish(left+4.2,doorY,1.4,41,2.15,'metal');
finish(left+5,doorY,1.4,38,2.11,'white');
for(const dy of [-20,20]) finish(left+6,doorY+dy,1.8,2.3,2.19,'pale');
finish(left+6,doorY,1.8,42,.06,'pale',2.13);
finish(left+7,doorY-13,1.9,5,.038,'dark',1.04);
finish(left+7.2,doorY+10,2.7,7,.085,'metal',1.96);
finish(left+7.8,doorY+8,1.1,4,.045,'metal',2.06);
for(const base of [.22,.96,1.76]) finish(left+6.2,doorY+18,1,1.2,.07,'metal',base);
for(const py of [(back+doorY-20)/2,(doorY+20+front)/2]) {
  finish(left+4,py,1.1,front-doorY-24,.075,'black');
}

function filingCabinet(py) {
  const px=507;
  box(px,py,23,41,1.76,'printerWhite',.03,'shelf',true);
  box(px,py,23.5,41.5,.045,'pale',1.79);
  for(const dy of [-10.1,10.1]) {
    box(px+11.7,py+dy,.7,19.5,1.63,'printerWhite',.09);
    box(px+12.1,py+Math.sign(dy)*2.6,.6,1.8,.11,'metal',.78);
    box(px+12.5,py+Math.sign(dy)*2.6,.4,.95,.085,'dark',.79);
  }
  box(px+11.75,py,.25,.45,1.65,'metal',.09);
}
filingCabinet(back+28);
filingCabinet(front-28);
box(506,back+28,23,37,.021,'board',1.835);

function storedChair(px,py) {
  box(px,py,20,20,.105,'dark',.42,'chair',true);
  box(px,py+8.5,18,3.1,.57,'mesh',.49);
  for(const base of [.49,1.045]) box(px,py+8.5,20,3.7,.042,'black',base);
  for(const dx of [-10,10]) {
    box(px+dx,py+8.5,1.4,3.5,.57,'black',.49);
    box(px+dx,py,1.8,16,.049,'black',.65);
    box(px+dx,py+5,1.5,1.7,.18,'black',.47);
  }
  box(px,py,3,3,.39,'metal',.035);
  box(px,py,19,2,.053,'black',.056);
  box(px,py,2,18,.053,'black',.056);
  for(const [dx,dy] of [[9,0],[-9,0],[0,8],[0,-8]]) {
    box(px+dx,py+dy,2.7,2.7,.066,'black');
  }
}
for(const px of [539,565,591]) storedChair(px,front-19);

// Folded stepladder and spare paper cartons sit clear of the entrance.
const ladderX=606, ladderY=1328;
box(ladderX,ladderY,9,18,.04,'metal',0,'equipment',true);
for(const dy of [-8,8]) box(ladderX,ladderY+dy,2.2,1.8,1.47,'metal');
box(ladderX,ladderY,2.6,18,.045,'black',1.44);
for(const base of [.24,.53,.82]) {
  box(ladderX-1.3,ladderY,4,14.5,.051,'metal',base);
  box(ladderX-3,ladderY,1,12.5,.024,'dark',base+.051);
}
box(604,1362,17,21,.26,'oakLight',0,'equipment',true);
box(603,1363,15,18,.22,'printerWhite',.26);
box(603,1363,14,17,.018,'board',.48);
box(550,front-5,27,2.2,1.15,'partnerOak');
