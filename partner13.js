import {HEIGHT,partner13Room} from './plan.js';

export const partner13Objects=[];
function box(px,py,w,d,h,mat,base=0,kind='detail',solid=false,extra={}) {
  partner13Objects.push({px,py,w,d,h,mat,base,kind,solid,...extra});
}

const [left,back,right]=partner13Room.bounds;
const wallX=(left+right)/2, width=right-left-7;
function trim(px,py,w,d,h,mat,base=0) {
  box(px,py,w,d,h,mat,base,'wallFinish',false,{cutaway:true});
}
trim(wallX,back+3.95,width,.9,HEIGHT-.025,'partnerOak');
for(const px of [left+4,left+43,left+84,right-4]) {
  trim(px,back+4.56,1.25,.65,HEIGHT-.025,'black');
}
for(const [base,height] of [[0,.06],[2.71,.047],[HEIGHT-.09,.065]]) {
  trim(wallX,back+4.56,width,.65,height,'black',base);
}

function papers(px,py,w,d,base,count) {
  const colors=['board','white','pale','white','pale'];
  for(let i=0;i<count;i++) {
    const offset=i%3-1;
    box(px+offset*.47,py-offset*.31,w+offset*.64,d,.024,colors[i%colors.length],base+i*.029);
  }
}

// Four glass-fronted bays above solid oak doors, with anonymous file stacks.
const cabinetStart=484, bay=18, cabinetY=698, cabinetHeight=2.12, cabinetFace=cabinetY+8.1;
box(cabinetStart+2*bay,cabinetY,4*bay,16.2,.067,'deskOak',0,'shelf',true);
box(cabinetStart+2*bay,cabinetY,4*bay,16.2,.056,'deskOak',cabinetHeight-.056);
box(cabinetStart+2*bay,cabinetY-7.6,4*bay,1.1,cabinetHeight-.065,'partnerOak',.055);
for(let i=0;i<=4;i++) box(cabinetStart+i*bay,cabinetY,1.3,16.2,cabinetHeight,'deskOak');
for(let i=0;i<4;i++) {
  const px=cabinetStart+(i+.5)*bay;
  box(px,cabinetFace,bay-1.2,1.25,.78,'partnerOak',.068);
  box(px,cabinetFace+.69,bay-3,.45,.695,'oakLight',.11);
  box(px+(i%2?-5.8:5.8),cabinetFace+.9,1.05,.8,.064,'gold',.79);
  box(px,cabinetFace,bay-3.15,.48,1.22,'glass',.84,'detail',false,{glass:true});
  for(const base of [.83,1.23,1.66]) {
    box(px,cabinetY,bay-1.2,16.2,.036,'deskOak',base);
    if(i<3||base<1.6) papers(px,cabinetY+1.1,12,10,base+.039,base<1?5:3);
  }
  for(const base of [.83,2.057]) box(px,cabinetFace,bay-1.2,1.3,.045,'deskOak',base);
}
for(const [i,mat] of ['board','blue','white','red','pale'].entries()) {
  box(540+i*2.1,cabinetY,1.7,7,.28+(i%2)*.025,mat,1.70);
}

const deskX=529, deskY=768, deskTop=.76;
box(deskX,deskY,66,54,.066,'deskOak',deskTop-.066,'desk',true);
for(const px of [502,556]) for(const py of [746,790]) {
  box(px,py,2.7,2.7,.69,'white');
}
box(deskX,deskY,64,1.7,.36,'board',deskTop+.025,'detail',false,{color:'#b0aeba'});
box(deskX,deskY,64,1.95,.027,'pale',deskTop+.385);
for(const px of [504,554]) box(px,deskY,3,5.4,.023,'metal',deskTop);

function chair(px,py,facing,blanket=false) {
  const backY=py-facing*8, mat=blanket?'pale':'dark';
  box(px,py,18,18,.1,'black',.43,'chair',true);
  box(px,backY,17.6,2.5,.47,'mesh',.53);
  box(px,backY,19,2.9,.035,'black',.99);
  box(px,py-facing*1.7,14,13,.043,mat,.53);
  box(px,backY+facing*1.6,blanket?15:10,2.6,blanket?.34:.19,mat,blanket?.56:.82);
  for(const dx of [-9,9]) {
    box(px+dx,backY,1.1,2.8,.47,'black',.53);
    box(px+dx,py,1.6,14,.045,'black',.65);
    box(px+dx,py+facing*5.5,1.3,1.5,.16,'black',.49);
  }
  box(px,py,2.9,2.9,.39,'metal',.039);
  box(px,py,17.8,2.2,.058,'black',.048);
  box(px,py,2.2,16,.058,'black',.048);
  if(blanket) for(const [dx,base,color] of [[-4,.62,'#cd894e'],[3,.70,'#839baf'],[-2,.78,'#d2aa62']]) {
    box(px+dx,backY+facing*3,3.2,.5,.047,'pale',base,'detail',false,{color});
  }
}
chair(530,722,1);
chair(535,816,-1,true);
chair(507,827,-1);

papers(507,750,15,12,deskTop,6);
papers(552,750,13,10,deskTop,7);
papers(550,786,16,12,deskTop,6);
papers(506,785,13,11,deskTop,5);
// Small laptop and bar-shaped task lamp sit on the workstation.
box(529,782,18,13,.04,'metal',deskTop);
box(529,781.5,14.5,6.8,.011,'black',deskTop+.04);
box(529,775.7,18,1.1,.295,'metal',deskTop+.04);
box(529,776.42,16.5,.38,.265,'dark',deskTop+.055);
box(542,774,6.6,4.5,.036,'white',deskTop);
box(542,773,1.4,1.4,.49,'white',deskTop+.036);
box(531,773,24,1.9,.035,'white',deskTop+.51);
box(531,773,21,1.3,.01,'light',deskTop+.5);
box(510,775,5.5,5.5,.04,'white',deskTop);
box(510,775,1.5,1.5,.2,'white',deskTop+.04);
box(510,775,8,2.1,.16,'white',deskTop+.22);
for(const dx of [-2.6,0,2.6]) box(510+dx,776.2,.6,.4,.118,'metal',deskTop+.24);

const sideX=591, sideY=798, sideTop=.72;
box(sideX,sideY,19,48,.055,'deskOak',sideTop-.055,'table',true);
for(const py of [779,817]) {
  box(sideX,py,2.25,2.8,sideTop-.055,'white');
  box(sideX,py,17,2.8,.043,'white');
}
for(const [i,mat] of ['pale','board','white','pale','board','white'].entries()) {
  box(sideX,791+i*2.2,12,1.45,.23+(i%3)*.036,mat,sideTop);
}
papers(sideX,810,14,10,sideTop,7);

const drawerX=590, drawerY=754;
box(drawerX,drawerY,16,16,.59,'oakDark',.05,'equipment',true);
for(const base of [.13,.37]) {
  box(drawerX-8,drawerY,.78,14,.198,'partnerDesk',base);
  box(drawerX-8.5,drawerY,1.15,1.35,.045,'gold',base+.1);
}
papers(drawerX,drawerY,13,12,.64,7);

box(487,827,13,17,.06,'white',.73,'equipment',true);
for(const px of [481.5,492.5]) for(const py of [819.5,834.5]) box(px,py,1.3,1.3,.76,'white');
for(const base of [.18,.43]) box(487,827,12,16,.05,'white',base);
box(487,828,4.5,4.5,.135,'board',.79);
