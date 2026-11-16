import {HEIGHT,partner5Room,partner5Window,windowProfile} from './plan.js';

export const partner5Objects=[];
function box(px,py,w,d,h,mat,base=0,extra={}) {
  partner5Objects.push({px,py,w,d,h,mat,base,kind:'detail',solid:false,...extra});
}
function finish(px,py,w,d,h,mat,base=0) {
  box(px,py,w,d,h,mat,base,{cutaway:true});
}

const [entry,near,exterior,far]=partner5Room.bounds;
const wallCenter=(entry+exterior)/2;
for(const [edge,inward] of [[near,1],[far,-1]]) {
  const panel=edge+inward*3.94, trim=panel+inward*.55;
  finish(wallCenter,panel,exterior-entry-7,.9,HEIGHT-.025,'partnerOak');
  for(const x of [684,730,778,826]) finish(x,trim,1.45,.65,HEIGHT-.025,'black');
  for(const [base,height] of [[0,.064],[2.58,.044],[HEIGHT-.08,.055]]) {
    finish(wallCenter,trim,exterior-entry-7,.65,height,'black',base);
  }
}

const {start,end}=partner5Window;
const pane=(end-start)/3, rollerTop=windowProfile('floor',partner5Window).top-.025;
box(824.7,(start+end)/2,9.5,end-start,.25,'pale');
finish(828,(start+end)/2,4.5,end-start,.079,'windowRail',.80);
for(const index of [1,2]) finish(828,start+index*pane,4.5,2.5,rollerTop-.25,'windowRail',.25);
for(const [i,bottom] of [1.03,1.22,1.96].entries()) {
  const center=start+(i+.5)*pane, width=pane-3.2;
  finish(825,center,1.1,width,rollerTop-bottom,'rollerCloth',bottom);
  finish(824.4,center,1.5,width,.035,'pale',bottom);
  finish(824.4,center+width/2-1,1.1,.47,bottom-.76,'pale',.76);
}

const deskTop=.76, deskY=834;
box(772,deskY,94,37,.064,'partnerDesk',deskTop-.064,{kind:'desk',solid:true});
for(const x of [734,811]) {
  box(x,deskY,3.4,4.4,.70,'pale');
  box(x,deskY,3.8,27,.046,'pale');
}

const executiveX=789, executiveY=802;
box(executiveX,executiveY,20,18,.12,'black',.43,{kind:'chair',solid:true});
box(executiveX,794,20,3.8,.62,'black',.54);
for(const [y,base,width] of [[795,.57,17.8],[795.4,.77,18.6],[795.8,.97,20.3]]) {
  box(executiveX,y,width,3,.18,'dark',base);
}
box(executiveX,executiveY,3,3,.41,'black',.032);
box(executiveX,executiveY,21,2.5,.05,'black',.04);
box(executiveX,executiveY,2.5,21,.05,'black',.04);
for(const x of [779,799]) {
  box(x,executiveY,1.4,2,.23,'black',.43);
  box(x,executiveY,2.2,12,.055,'black',.65);
}

const guestX=776, guestY=862;
box(guestX,guestY,18,15,.09,'black',.43,{kind:'chair',solid:true});
box(guestX,869,17,1.45,.43,'mesh',.52);
box(guestX,869,18.5,2.25,.045,'black',.93);
for(const x of [767.4,784.6]) {
  box(x,869,1.2,2,.43,'black',.52);
  box(x,guestY,1.3,16,.04,'metal',.03);
  box(x,855,1.3,2,.44,'metal');
}

function papers(x,y,w,d,base,count) {
  for(let i=0;i<count;i++) {
    const mat=i===count-1?'white':['pale','white','white','red','board'][i%5];
    box(x+(i%4-1.5)*.65,y+(i%3-1)*.63,w+(i%3-1)*.72,d,.021,mat,base+i*.023);
  }
}
for(const [x,y,w,d,n] of [[735,825,19,14,14],[737,843,20,14,11],[760,841,18,17,8],[782,837,18,14,3],[804,824,17,14,5],[808,841,16,16,7]]) {
  papers(x,y,w,d,deskTop,n);
}
box(767,823,7,5,.084,'blue',deskTop);
for(const x of [755,793]) box(x,826,2.7,2.7,.092,'glass',deskTop,{glass:true});

const cabinetY=788, face=cabinetY+8;
const cabinetUnits=[[701,737.5,2,true],[739,774.5,2,false]];
for(const [left,right,count,openShelves] of cabinetUnits) {
  const w=right-left, x=(left+right)/2, bay=w/count;
  box(x,cabinetY,w,16,.065,'oakDark',0,{kind:'shelf',solid:true});
  box(x,cabinetY,w,16,.064,'oakDark',1.98);
  box(x,cabinetY-7.5,w,1.1,1.92,'partnerDesk',.06);
  for(const edge of [left,x,right]) box(edge,cabinetY,1.4,16,1.98,'oakDark');
  for(let i=0;i<count;i++) {
    const center=left+(i+.5)*bay;
    const glassBase=openShelves?1.58:.82;
    box(center,face,bay-1.35,1,.72,'partnerDesk',.075);
    box(center,face,bay-2.8,.45,1.98-glassBase,'glass',glassBase,{glass:true});
    for(const base of [.81,1.19,1.56]) box(center,cabinetY,bay-1,16,.043,'oakDark',base);
    box(center+(i===0?5:-5),face+.56,.85,.65,.065,'black',.72);
    if(openShelves) {
      papers(center,cabinetY+2,13,10,1.235,i===0?9:3);
      papers(center,cabinetY+2,13,10,.855,i===0?4:2);
    } else {
      for(const base of [.855,1.235]) {
        for(const [j,mat] of ['green','blue','gold','red','pale'].entries()) {
          box(center-5.5+j*2.65,cabinetY+2,2.3,7,.23+j%3*.028,base>1?'pale':mat,base);
        }
      }
    }
  }
}
box(764,cabinetY,4.5,4.5,.16,'white',2.045);
box(764,cabinetY,2.6,2.6,.11,'white',2.2);
for(const [x,base,h] of [[763,2.27,.31],[764,2.28,.38],[765,2.27,.34]]) {
  box(x,cabinetY,.5,.5,h,'gold',base);
  box(x,cabinetY,1.15,1.15,.086,'gold',base+h-.025);
}

for(const [x,y] of [[721,801],[737,801],[752,801],[814,856],[814,872],[812,884]]) {
  box(x,y,5.5,7,.30,'pale',.014);
  box(x,y-3.2,5.1,.65,.25,'red',.025);
  box(x,y,1.15,3,.054,'oakLight',.313);
}

// Stationary bike with a stepped flywheel, pedals and raised handlebars.
const bikeY=825;
const bikePart=(x,y,...geometry)=>box(x,2*bikeY-y,...geometry);
bikePart(698,825,17,38,.048,'black',0,{kind:'bike',solid:true});
for(const y of [809,841]) bikePart(698,y,22,2.6,.055,'black');
for(const [i,width] of [6,10,13,13,10,6].entries()) {
  bikePart(698,823,5.6,width,.052,'dark',.06+i*.046);
  bikePart(701.1,823,.5,width*.7,.044,'red',.06+i*.046);
}
for(const [i,y] of [828,830.4,832.8,835.2,837.6].entries()) {
  bikePart(698,y,3.4,3.4,.105,'black',.13+i*.091);
}
bikePart(698,836,3.1,2.9,.25,'black',.56);
bikePart(698,836,8.8,7,.067,'black',.805);
bikePart(698,813,3.3,4,.49,'black',.27);
bikePart(698,813,12,2.8,.056,'black',.76);
for(const x of [692,704]) {
  bikePart(x,810.6,2.1,6,.061,'black',.77);
  bikePart(x,807.8,2.2,2.4,.119,'black',.79);
}
bikePart(698,812,4.7,4.2,.048,'dark',.82);
bikePart(704,826,5.2,1.9,.045,'black',.174);
bikePart(692,820,5.2,1.9,.045,'black',.243);

box(814,897,1.1,1.1,1.3,'black',.045);
box(814,897,17,1.1,.041,'black',.016);
box(814,891,1.2,12,.041,'black',.016);
box(814,897,4,2.4,.085,'black',1.33);
