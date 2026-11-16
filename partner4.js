import {HEIGHT,partner4Room,partner4Window,windowProfile} from './plan.js';

export const partner4Objects=[];
function box(px,py,w,d,h,mat,base=0,extra={}) {
  partner4Objects.push({px,py,w,d,h,mat,base,kind:'detail',solid:false,...extra});
}
function finish(px,py,w,d,h,mat,base=0) {
  box(px,py,w,d,h,mat,base,{cutaway:true});
}

const [entry,near,exterior,far]=partner4Room.bounds;
for(const [edge,inward] of [[near,1],[far,-1]]) {
  const panel=edge+inward*3.94, trim=panel+inward*.55;
  finish((entry+exterior)/2,panel,exterior-entry-7,.9,HEIGHT-.025,'partnerOak');
  for(const x of [684,730,778,826]) finish(x,trim,1.45,.65,HEIGHT-.025,'black');
  for(const [base,height] of [[0,.064],[2.58,.044],[HEIGHT-.08,.055]]) {
    finish((entry+exterior)/2,trim,exterior-entry-7,.65,height,'black',base);
  }
}

const {start,end}=partner4Window;
const edges=[start,668,701,734,end];
const rollerTop=windowProfile('floor',partner4Window).top-.025;
box(824.7,(start+end)/2,9.5,end-start,.25,'pale');
finish(828,(start+end)/2,4.5,end-start,.079,'windowRail',.80);
for(const edge of edges.slice(1,-1)) finish(828,edge,4.5,2.5,rollerTop-.25,'windowRail',.25);
for(const [i,bottom] of [.29,1.67,1.67,.29].entries()) {
  const center=(edges[i]+edges[i+1])/2, width=edges[i+1]-edges[i]-3.2;
  finish(825,center,1.1,width,rollerTop-bottom,'rollerCloth',bottom);
  finish(824.4,center,1.5,width,.035,'pale',bottom);
  finish(824.4,center+width/2-1,1.1,.44,rollerTop-.29,'pale',.29);
}

const deskTop=.76, deskY=733;
box(777,deskY,83,36,.064,'partnerDesk',deskTop-.064,{kind:'desk',solid:true});
for(const x of [742,811]) {
  box(x,deskY,3.1,4.3,.70,'pale');
  box(x,deskY,3.7,26,.046,'pale');
}

function meshChair(x,y,executive=false) {
  const back=y+(executive?7.5:-7.5);
  const frame=executive?'pale':'metal';
  box(x,y,17.5,15.5,.10,'black',.42,{kind:'chair',solid:true});
  box(x,back,17.8,2.6,.44,frame,.52);
  box(x,back+(executive?-1.35:1.35),15.8,.55,.395,'mesh',.545);
  for(const dx of [-8.9,8.9]) {
    box(x+dx,y,1.5,13,.045,'black',.64);
    if(!executive) {
      box(x+dx,y,1.3,15,.043,'metal',.025);
      box(x+dx,y+6,1.3,1.65,.58,'metal',.05);
    }
  }
  if(executive) {
    box(x,back,2.7,2,.095,'metal',.96);
    box(x,back,12.6,3.1,.14,'pale',1.05);
    box(x,back-1.6,11.3,.5,.113,'black',1.063);
    box(x,y,2.8,2.8,.39,'black',.036);
    box(x,y,21,2,.043,'black',.035);
    box(x,y,2,20,.043,'black',.035);
  }
}
meshChair(779,761,true);
meshChair(770,704);
meshChair(798,704);

const cabinetY=650, face=cabinetY+7;
for(const [left,right,openShelves] of [[747,781,false],[782.5,816,true]]) {
  const width=right-left, center=(left+right)/2, bay=width/2;
  box(center,cabinetY,width,14,.065,'oakDark',0,{kind:'shelf',solid:true});
  box(center,cabinetY,width,14,.061,'oakDark',1.97);
  box(center,cabinetY-6.5,width,1,1.90,'partnerDesk',.065);
  for(const edge of [left,center,right]) box(edge,cabinetY,1.35,14,1.97,'oakDark');
  for(const x of [left+bay/2,right-bay/2]) {
    const glassBase=openShelves?1.55:.82;
    box(x,face,bay-1.35,1,.73,'partnerDesk',.075);
    box(x,face,bay-2.6,.45,1.97-glassBase,'glass',glassBase,{glass:true});
    for(const z of [.81,1.17,1.53]) box(x,cabinetY,bay-1,14,.042,'oakDark',z);
    box(x+(x<center?4.8:-4.8),face+.6,.85,.65,.06,'black',.72);
  }
}
for(const [x,base,count] of [[752,.86,3],[760,1.22,2],[790,1.22,4],[805,.855,1]]) {
  for(let i=0;i<count;i++) box(x+i*.24,652,10,8,.017,'white',base+i*.02);
}
for(let i=0;i<6;i++) {
  const x=766+i*2.2;
  box(x,651,1.9,7,.25,'pale',1.214);
  box(x,651,1.9,7,.052,'red',1.464);
}
box(755,652,4.1,3.7,.12,'white',1.575);
box(755,652,3.8,3,.12,'white',1.69);
for(const x of [753.7,756.3]) box(x,652,1,1.25,.05,'white',1.8);
box(755,653.6,.7,.4,.06,'red',1.66);

// Padded lounge chair beside the bookcases and window.
const loungeX=806, loungeY=679;
const cushion={color:'#8b8a83'};
box(loungeX,loungeY,22,24,.14,'stone',.31,{...cushion,kind:'chair',solid:true});
box(815,loungeY,4.5,20,.38,'stone',.44,cushion);
box(817,loungeY,5,19,.12,'stone',.79,cushion);
for(const y of [667.7,690.3]) {
  box(loungeX,y,25,1.65,.057,'pale',.037);
  for(const x of [797,815]) box(x,y,1.6,1.6,.54,'pale',.075);
  box(loungeX,y,19,2.2,.053,'black',.615);
}

box(823,687,5,5,.14,'black',.25);
for(const [x,y,height] of [[822,685,.29],[823,686,.40],[822,687,.39],[823,689,.32],[824,690,.24]]) {
  box(x,y,1.2,1.2,height,'leaf',.39);
}
box(822,696,4.8,4.8,.14,'gold',.25);
box(822,696,3.9,3.9,.12,'gold',.36);
box(822,696,2.7,2.7,.11,'gold',.46);

for(const [x,y] of [[696,754],[703,760],[706,750]]) {
  box(x,y,1.4,1.4,1.69,'oakLight',.04);
  box(x,y,1.6,1.6,.12,'red',.025);
}
box(701,754,7,16,.80,'black',.30);
box(702,754,6,14,.11,'black',1.10);

box(746,733,4.6,4.2,.11,'red',deskTop);
box(746,733,3.8,3.4,.013,'pale',deskTop+.11);
box(743.2,733,1.2,2.7,.048,'red',deskTop+.042);
box(752,732,6.4,4.5,.085,'gold',deskTop);
box(752,732,1.8,.7,.028,'white',deskTop+.085);
box(759,728,3.6,3.6,.13,'green',deskTop);
for(const dx of [-.8,.8]) box(759+dx,728,.55,.5,.10,'metal',deskTop+.13);

// Copper desk fan with a stepped grille.
const copper={color:'#a77250'};
box(811,728,6,4.8,.045,'metal',deskTop,copper);
box(811,728,1.8,1.7,.14,'metal',deskTop+.045,copper);
for(const [i,width] of [2.7,4.6,5.5,5.5,4.6,2.7].entries()) {
  box(811,728,width,1.6,.021,'metal',deskTop+.18+i*.020,copper);
  box(811,727.05,width-.55,.34,.009,'pale',deskTop+.19+i*.02);
}
box(751,697,7,7,.27,'pale',.014,{color:'#c2c4bf'});
