import {HEIGHT,partner3Room,partner3Window,windowProfile} from './plan.js';

export const partner3Objects=[];
function box(px,py,w,d,h,mat,base=0,extra={}) {
  partner3Objects.push({px,py,w,d,h,mat,base,kind:'detail',solid:false,...extra});
}
function finish(px,py,w,d,h,mat,base=0) {
  box(px,py,w,d,h,mat,base,{cutaway:true});
}

const [entry,,exterior,far]=partner3Room.bounds;
const panelY=far-3.94, trimY=panelY-.55;
const wallCenter=(entry+exterior)/2;
finish(wallCenter,panelY,exterior-entry-7,.9,HEIGHT-.025,'partnerOak');
for(const x of [684,730,778,826]) finish(x,trimY,1.45,.65,HEIGHT-.025,'black');
for(const [base,height] of [[0,.064],[2.58,.044],[HEIGHT-.08,.055]]) {
  finish(wallCenter,trimY,exterior-entry-7,.65,height,'black',base);
}

const {start,end}=partner3Window;
finish(825,(end+far-4)/2,4.7,far-4-end,HEIGHT-.025,'white');
const edges=[start,512,569,end];
const rollerTop=windowProfile('floor',partner3Window).top-.025;
box(824.7,(start+end)/2,9.5,end-start,.25,'pale');
finish(828,(start+end)/2,4.5,end-start,.079,'windowRail',.80);
for(const edge of edges.slice(1,-1)) finish(828,edge,4.5,2.5,rollerTop-.25,'windowRail',.25);
for(const [i,bottom] of [1.02,1.84,1.04].entries()) {
  const center=(edges[i]+edges[i+1])/2, width=edges[i+1]-edges[i]-3.2;
  finish(825,center,1.1,width,rollerTop-bottom,'rollerCloth',bottom);
  finish(824.4,center,1.5,width,.035,'pale',bottom);
  finish(824.4,center+width/2-1,1.1,.45,rollerTop-.83,'pale',.83);
}

const deskTop=.76, deskY=547;
box(775,deskY,92,42,.061,'partnerDesk',deskTop-.061,{kind:'desk',solid:true});
for(const x of [739,811]) {
  box(x,deskY,3.3,4.2,.70,'pale');
  box(x,deskY,3.8,31,.046,'pale');
}

function meshChair(x,y,facing) {
  const back=y-facing*7.4;
  box(x,y,18,17,.10,'black',.42,{kind:'chair',solid:true});
  box(x,back,17.8,1.2,.45,'mesh',.52);
  box(x,back,18.4,2,.037,'black',.96);
  for(const dx of [-8.9,8.9]) {
    box(x+dx,back,1.2,2,.44,'black',.53);
    box(x+dx,y,1.5,14,.043,'black',.64);
    box(x+dx,y,1.3,16,.043,'metal',.025);
    box(x+dx,y+facing*6,1.3,1.65,.58,'metal',.05);
  }
}
meshChair(780,493,1);
meshChair(762,584,-1);
meshChair(793,584,-1);
const towel={color:'#e9df58'};
box(762,591,16,1.8,.30,'gold',.67,towel);
box(762,590,15,4,.06,'gold',.955,towel);
box(758,586,8.5,12,.048,'gold',.52,towel);

const cabinetY=625, face=cabinetY-7;
for(const [left,right,openShelves] of [[744,778,false],[779.5,815,true]]) {
  const width=right-left, center=(left+right)/2, bay=width/2;
  box(center,cabinetY,width,14,.065,'oakDark',0,{kind:'shelf',solid:true});
  box(center,cabinetY,width,14,.061,'oakDark',1.97);
  box(center,cabinetY+6.5,width,1,1.90,'partnerDesk',.065);
  for(const edge of [left,center,right]) box(edge,cabinetY,1.35,14,1.97,'oakDark');
  for(const x of [left+bay/2,right-bay/2]) {
    const glassBase=openShelves?1.55:.82;
    box(x,face,bay-1.35,1,.73,'partnerDesk',.075);
    box(x,face,bay-2.6,.45,1.97-glassBase,'glass',glassBase,{glass:true});
    for(const z of [.81,1.17,1.53]) box(x,cabinetY,bay-1,14,.042,'oakDark',z);
    box(x+(x<center?4.8:-4.8),face-.6,.85,.65,.06,'black',.72);
  }
}
box(770,623,10,8,.022,'white',.852);

// Tabletop plant with thin branching stems and staggered leaves.
box(751,545,9.5,9.5,.17,'pale',deskTop);
box(751,545,8.8,8.8,.021,'oakDark',deskTop+.17);
for(const [dx,dy,height] of [[0,0,.64],[3,1,.43],[-3,1,.49],[0,-3,.53],[-1,3,.37]]) {
  box(751+dx,545+dy,.7,.7,height,'oakDark',deskTop+.17);
  const crown=deskTop+.17+height;
  for(const [lx,ly,dz] of [[2,0,0],[-2,0,.012],[0,2,-.026],[0,-2,-.014]]) {
    box(751+dx+lx,545+dy+ly,4.5,2.2,.035,'leaf',crown+dz);
  }
}

box(694,464,15,16,.79,'dark',0,{kind:'cabinet',solid:true});
box(702,464,.5,14,.66,'stone',.06);
box(703,465,1,1.2,.065,'black',.63);
box(694,464,12,13,.038,'oakDark',.79);
for(const [x,y] of [[691,461],[696,461],[691,466],[696,466]]) {
  box(x,y,2.5,2.5,.067,'oakLight',.828);
}
box(711,463,9,9,.26,'pale',.015,{color:'#d1cfc4'});
box(823,491,2.8,2.8,.055,'glass',.25,{glass:true});

const hangingY=499;
for(const x of [713,724]) finish(x,hangingY,.42,.42,.24,'metal',HEIGHT-.24);
finish(718.5,hangingY,15,11,.04,'tileCeiling',HEIGHT-.26);
