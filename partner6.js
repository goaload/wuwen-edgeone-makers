import {HEIGHT,partner6Room,partner6Windows,windowProfile} from './plan.js';

export const partner6Objects=[];
function box(px,py,w,d,h,mat,base=0,extra={}) {
  partner6Objects.push({px,py,w,d,h,mat,base,kind:'detail',solid:false,...extra});
}
function finish(px,py,w,d,h,mat,base=0) {
  box(px,py,w,d,h,mat,base,{cutaway:true});
}

const [entry,near,exterior,far]=partner6Room.bounds;
const wallCenter=(entry+exterior)/2;
for(const [edge,inward] of [[near,1],[far,-1]]) {
  const panel=edge+inward*3.94, trim=panel+inward*.55;
  finish(wallCenter,panel,exterior-entry-7,.9,HEIGHT-.025,'partnerOak');
  for(const x of [684,730,778,826]) finish(x,trim,1.45,.65,HEIGHT-.025,'black');
  for(const [base,height] of [[0,.064],[2.58,.044],[HEIGHT-.08,.055]]) {
    finish(wallCenter,trim,exterior-entry-7,.65,height,'black',base);
  }
}

const [narrow,wide]=partner6Windows;
const pillarY=(narrow.end+wide.start)/2;
finish(821,pillarY,13,wide.start-narrow.end,HEIGHT-.025,'white');
finish(814.2,pillarY,.7,wide.start-narrow.end,.055,'black');
const sill=.25;
for(const opening of partner6Windows) {
  const {start,end}=opening;
  box(824.7,(start+end)/2,9.5,end-start,sill,'pale');
  finish(828,(start+end)/2,4.5,end-start,.079,'windowRail',.80);
}
const middle=wide.start+(wide.end-wide.start)*.44;
const rollerTop=windowProfile('floor',wide).top-.025;
finish(828,middle,4.5,2.5,rollerTop-sill,'windowRail',sill);
for(const [start,end,bottom] of [[narrow.start,narrow.end,1.36],[wide.start,middle,2.01],[middle,wide.end,1.97]]) {
  const center=(start+end)/2, width=end-start-3.2;
  finish(825,center,1.1,width,rollerTop-bottom,'rollerCloth',bottom);
  finish(824.4,center,1.5,width,.035,'pale',bottom);
}

const deskTop=.76, deskY=972;
box(773,deskY,90,34,.064,'partnerDesk',deskTop-.064,{kind:'desk',solid:true});
for(const x of [736,809]) {
  box(x,deskY,3.3,4.4,.70,'pale');
  box(x,deskY,3.8,25,.046,'pale');
}

const cream={color:'#e5d9b8'};
box(786,932,19,18,.12,'pale',.42,{...cream,kind:'chair',solid:true});
box(786,923,19,3.4,.57,'black',.53);
box(786,925,18,2.5,.56,'pale',.53,cream);
box(786,932,3.5,3.5,.39,'black',.035);
box(786,932,23,2.4,.045,'black',.04);
box(786,932,2.4,21,.045,'black',.04);
for(const x of [776,796]) {
  box(x,930,1.4,2,.22,'black',.43);
  box(x,931,2,12,.047,'pale',.65,cream);
}
for(const [x,y] of [[775,932],[797,932],[786,922],[786,942]]) {
  box(x,y,2.1,2.1,.062,'black');
}

box(775,1003,18,16,.1,'black',.43,{kind:'chair',solid:true});
box(775,1010,17,1.4,.44,'mesh',.53);
box(775,1010,18.5,2,.039,'black',.955);
for(const x of [766.4,783.6]) {
  box(x,1010,1.3,2,.47,'black',.52);
  box(x,1003,1.6,14,.049,'black',.64);
  box(x,1003,1.35,16,.041,'metal',.035);
  box(x,996,1.35,2,.45,'metal');
}

function papers(x,y,w,d,base,count,cover='white') {
  for(let i=0;i<count;i++) {
    box(x+(i%3-1)*.35,y-(i%3-1)*.25,w,d,.018,i===count-1?cover:'white',base+i*.021);
  }
}

// The monitor faces the black chair, with paperwork toward the door.
box(804,960,19,1.9,.28,'black',deskTop+.12);
box(804,961.05,17.6,.26,.244,'dark',deskTop+.136);
box(804,960,3.6,3.7,.11,'black',deskTop+.012);
box(804,960,9,5.5,.024,'black',deskTop);
box(804,965,18,4.7,.025,'black',deskTop);
for(const y of [964,965.3,966.6]) box(804,y,16,.28,.009,'dark',deskTop+.026);
papers(740,969,13,13,deskTop,5,'gold');
box(740,969,9,10,.032,'stone',deskTop+.11);
papers(749,982,10,8,deskTop,4,'red');
box(758,984,7.7,5.2,.043,'black',deskTop);
for(const x of [756,758,760]) for(const y of [983,985]) box(x,y,1.05,.7,.01,'pale',deskTop+.044);
box(764,975,4.2,4.2,.135,'black',deskTop);
box(764,975,1.1,1.1,.048,'gold',deskTop+.135);
box(767,975,1.5,1.2,.068,'gold',deskTop+.05);
box(781,967,9.5,9.5,.011,'board',deskTop);
box(781,967,3,4.2,.033,'pale',deskTop+.012);

const cabinetY=1034, face=cabinetY-7.5;
box(777,cabinetY,73,15,.059,'oakDark',0,{kind:'shelf',solid:true});
box(777,cabinetY,73,15,.06,'oakDark',1.96);
box(777,cabinetY+7,73,1,1.9,'partnerDesk',.06);
for(const x of [740.5,758.75,777,795.25,813.5]) box(x,cabinetY,1.35,15,1.96,'oakDark');
for(const [index,x] of [749.6,767.9,786.1,804.4].entries()) {
  const open=index>=2;
  const glassBase=open?1.55:.78;
  box(x,face,17,1,.70,'partnerDesk',.075);
  box(x,face,15.4,.5,1.95-glassBase,'glass',glassBase,{glass:true});
  for(const shelf of [.78,1.15,1.54]) {
    box(x,cabinetY,17,15,.039,'oakDark',shelf);
    box(x,face,17,1,.042,'oakDark',shelf);
  }
  box(x+(index%2?-5.7:5.7),face-.6,.9,.6,.06,'black',.72);
  if(open) {
    for(let j=0;j<6;j++) {
      box(x-6+j*2.35,cabinetY-1,1.9,8,.26+(j%3)*.022,j%3?'pale':'board',1.19);
    }
  }
  if(index!==1) papers(x,cabinetY-1,11,8,.82,index+2);
}

// The ink painting, carton and garment bag sit at the corridor end.
box(729,1040,16,2,.91,'oakLight',.015);
box(729,1038.85,14,.42,.83,'pale',.055);
for(const [x,h,w] of [[725,.38,4],[730,.48,5],[733,.29,3]]) {
  box(x,1038.56,w,.15,.084,'stone',h);
  box(x,1038.53,.6,.15,h-.23,'dark',.20);
}
box(697,1031,19,21,.48,'board',0,{kind:'box',solid:true,color:'#ae8d64'});
box(697,1031,18.5,.6,.014,'oakDark',.48);
box(685.2,1001,1.2,1.7,.23,'black',.86);
for(const [width,base,height] of [[13,.09,.075],[16,.165,.63],[12,.795,.065],[6,.86,.045]]) {
  box(686.6,1001,2.5,width,height,'dark',base,{color:'#37243d'});
}
