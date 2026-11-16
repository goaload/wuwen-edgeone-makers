import {financeRoom,HEIGHT} from './plan.js';

export const financeObjects=[];
function box(px,py,w,d,h,mat,base=0,kind='detail',solid=false,extra={}) {
  financeObjects.push({px,py,w,d,h,mat,base,kind,solid,...extra});
}
function trim(px,py,w,d,h,mat,base=0) {
  box(px,py,w,d,h,mat,base,'wallFinish',false,{cutaway:true});
}
const [left,,right,back]=financeRoom.bounds;
const wallX=(left+right)/2, wallWidth=right-left-7;
trim(wallX,back-3.95,wallWidth,.9,HEIGHT-.025,'partnerOak');
for(const px of [left+4,left+45,left+88,right-4]) {
  trim(px,back-4.56,1.25,.65,HEIGHT-.025,'black');
}
for(const [base,h] of [[0,.06],[2.64,.045],[HEIGHT-.09,.064]]) {
  trim(wallX,back-4.56,wallWidth,.65,h,'black',base);
}

const pillarX=483, pillarY=607;
box(pillarX,pillarY,13,24,.83,'white',0,'detail',true);
trim(pillarX,pillarY,13,24,HEIGHT-.855,'white',.83);
trim(490.8,609,2.6,4.7,.20,'red',1.30);
trim(492.2,609,.4,2.8,.075,'pale',1.37);
trim(490.45,609,1.85,4.7,.28,'pale',2.38);
trim(491.5,609,.55,2.7,.10,'red',2.405);

function papers(px,py,w,d,base,count) {
  const colors=['board','white','pale','white'];
  for(let i=0;i<count;i++) {
    const offset=i%3-1;
    box(px+offset*.59,py-offset*.41,w+offset*.67,d,.021,colors[i%colors.length],base+i*.025);
  }
}

const cabinetY=671, cabinetFace=663, cabinetX=509, cabinetHeight=2.11;
box(cabinetX,cabinetY,36,16,.065,'deskOak',0,'shelf',true);
box(cabinetX,cabinetY,36,16,.055,'deskOak',cabinetHeight-.055);
box(cabinetX,cabinetY+7.5,36,1.1,cabinetHeight-.07,'partnerOak',.065);
for(const px of [492,509,526]) box(px,cabinetY,1.45,16,cabinetHeight,'deskOak');
for(const px of [500.5,517.5]) {
  box(px,cabinetFace,15.9,1.2,.78,'partnerOak',.06);
  box(px,cabinetFace-.69,13.1,.45,.70,'oakLight',.10);
  box(px,cabinetFace-.82,1.05,.78,.06,'gold',.80);
  box(px,cabinetFace,14.5,.46,1.21,'glass',.84,'detail',false,{glass:true});
  for(const base of [.83,1.23,1.65]) {
    box(px,cabinetY,15.8,16,.038,'deskOak',base);
    papers(px,cabinetY-1,12,10,base+.041,base<1.3?5:4);
  }
  for(const base of [.83,2.055]) box(px,cabinetFace,16,1.3,.046,'deskOak',base);
}
box(535,673,11,11,.21,'pale');
box(535,673,11,11,.19,'white',.21);
papers(535,673,10,10,.40,4);
box(535,673,10.5,9.5,.15,'board',.50);

const deskX=526, dividerY=592, deskTop=.755;
for(const py of [578,606]) {
  box(deskX,py,62,27.4,.058,'deskOak',deskTop-.058,'desk',true);
  for(const px of [502,552]) {
    box(px,py,2.7,2.7,.7,'white');
    box(px,py,2.8,22,.047,'white');
  }
}
box(deskX,dividerY,58,1.65,.365,'board',deskTop+.01,'detail',false,{color:'#aaa8b0'});
box(deskX,dividerY,58,1.75,.019,'pale',deskTop+.375);
for(const px of [505,551]) box(px,dividerY,2.6,5.4,.023,'metal',deskTop);

function chair(px,py,facing,cushion=false) {
  const backY=py-facing*8;
  box(px,py,18,17,.105,'black',.43,'chair',true);
  box(px,backY,17.6,2.5,.475,'mesh',.535);
  box(px,backY,19,2.9,.035,'black',1.01);
  for(const dx of [-8.8,8.8]) {
    box(px+dx,backY,1.25,2.8,.48,'black',.53);
    box(px+dx,py,1.55,16,.047,'black',.645);
    box(px+dx,py-facing*6,1.2,2.3,.43,'metal');
    box(px+dx,py,1.25,16.3,.042,'metal',.037);
  }
  if(cushion) {
    box(px,py,14,13,.047,'pale',.535,'detail',false,{color:'#c5b9a6'});
    box(px,backY+facing*1.7,14,2.2,.20,'dark',.61);
  }
}
chair(531,553,1,true);
chair(527,639,-1);
papers(503,581,14,11,deskTop,4);
papers(548,581,17,11,deskTop,5);
papers(508,601,14,11,deskTop,4);
box(516,601,7,4.5,.083,'pale',deskTop,'detail',false,{color:'#a0b85d'});
box(516,601,2,2,.056,'white',deskTop+.083);
box(537,587,5,5,.116,'pale',deskTop);
box(541,595,3.7,3.7,.076,'metal',deskTop);
box(550,594,9,1.3,.145,'board',deskTop);

const sideX=593, sideTop=.72;
box(sideX,560,15,57,.054,'deskOak',sideTop-.054,'table',true);
for(const py of [537,582]) {
  box(sideX,py,2.45,2.7,sideTop-.054,'white');
  box(sideX,py,14,2.7,.043,'white');
}
for(const [py,count] of [[537,7],[550,8],[563,5],[577,9]]) {
  papers(sideX,py,13.8,11,sideTop,count);
}
box(591,563,13.4,10.6,.018,'red',sideTop+.13,'detail',false,{color:'#d383aa'});
box(583,542,13,11,.23,'board',0);
box(591,581,12,12,.27,'board',0);
box(593,594,9,9,.24,'pale',0);
papers(593,594,8,8,.24,5);
