import {HEIGHT,partner11Room} from './plan.js';

export const partner11Objects=[];
function box(px,py,w,d,h,mat,base=0,kind='detail',solid=false,extra={}) {
  partner11Objects.push({px,py,w,d,h,mat,base,kind,solid,...extra});
}
function finish(px,py,w,d,h,mat,base=0) {
  box(px,py,w,d,h,mat,base,'wallFinish',false,{cutaway:true});
}

const [left,back,right,front]=partner11Room.bounds;
const panelWidth=right-left-7, wallCenter=(left+right)/2;
finish(wallCenter,front-3.95,panelWidth,.9,HEIGHT-.025,'partnerOak');
for(const px of [left+4,left+44,right-44,right-4]) {
  finish(px,front-4.63,1.4,.65,HEIGHT-.025,'black');
}
for(const [base,height] of [[0,.065],[2.72,.047],[HEIGHT-.09,.065]]) {
  finish(wallCenter,front-4.63,panelWidth,.65,height,'black',base);
}
finish(left+4,(back+front)/2,1.1,front-back-8,.075,'black');

const deskX=553, deskY=1542, top=.76;
// Both work surfaces share a pale oak top with a fabric divider.
box(deskX,deskY,72,60,.064,'deskOak',top-.064,'desk',true);
for(const py of [1511,1573]) box(deskX,py,66,2,.064,'deskOak',top-.064);
for(const px of [523,583]) for(const py of [1518,1566]) box(px,py,2.65,2.65,.69,'metal');
box(deskX,deskY,68,1.7,.37,'board',top+.025,'detail',false,{color:'#b2afbc'});
box(deskX,deskY,67,2.1,.027,'pale',top+.395);
for(const px of [526,579]) box(px,deskY,5,7,.026,'metal',top);

function chair(px,py,facing,pad) {
  const backY=py-facing*7.5;
  box(px,py,19,19,.084,'black',.42,'chair',true);
  box(px,py,17,16,.035,'pale',.504);
  box(px,py,12,12,.016,pad,.539);
  box(px,backY,16.8,2.1,.47,'mesh',.52);
  for(const base of [.52,.98]) box(px,backY,19,2.6,.034,'black',base);
  for(const dx of [-8.6,8.6]) {
    box(px+dx,backY,1.25,2.3,.47,'black',.52);
    box(px+dx,py,1.7,16,.047,'black',.66);
    box(px+dx,py+facing*7,1.4,1.4,.61,'metal',.04);
    box(px+dx,py,1.4,17,.044,'metal',.035);
  }
  box(px,backY,18,1.4,.044,'metal',.035);
}
chair(552,1496,1,'green');
chair(552,1588,-1,'cushion');

for(const [px,py,mat] of [[529,1522,'pale'],[535,1556,'white'],[577,1526,'white'],[581,1559,'pale']]) {
  box(px,py,10,8,.022,mat,top);
  box(px+.8,py+.4,9,7,.011,'white',top+.022);
}
box(542,1534,5.6,4.3,.076,'blue',top);
box(542,1534,2.3,1.2,.060,'white',top+.076);
box(570,1555,4.5,4.5,.086,'red',top);
box(570,1555,3.4,3.4,.013,'pale',top+.086);
box(572.7,1555,1.5,1.6,.032,'red',top+.025);
box(561,1562,5,7,.033,'black',top);

// Two matching cabinets with three shelves above solid doors.
function cabinet(py,filled) {
  const px=502.5, width=39, depth=17, height=2.12, face=px+depth/2;
  box(px,py,depth,width,.061,'deskOak',0,'shelf',true);
  box(px-depth/2,py,1.3,width,height,'partnerOak');
  box(px,py,depth,width,.05,'deskOak',height-.05);
  for(const dy of [-19,0,19]) box(px,py+dy,depth,1.35,height,'deskOak');
  for(const base of [.83,1.22,1.62]) box(px,py,depth,width,.036,'deskOak',base);
  for(const dy of [-9.5,9.5]) {
    const at=py+dy;
    box(face,at,1.2,17.4,.76,'partnerOak',.065);
    box(face+.55,at,.55,15,.68,'oakLight',.104);
    box(face+.91,at+(dy<0?6.3:-6.3),1.0,1.2,.055,'gold',.79);
    box(face,at,.55,16.8,1.21,'glass',.85,'detail',false,{glass:true});
    box(face+.23,at,1.2,17.4,.039,'deskOak',.83);
    box(face+.23,at,1.2,17.4,.042,'deskOak',2.045);
    box(px+1,at,9,12,.029,'white',.868);
    box(px+1.6,at+.7,8,11,.019,'pale',.897);
    box(px-1,at,7,10,.031,filled?'red':'pale',1.256);
  }
  if(filled) for(let i=0;i<5;i++) {
    box(px-1,py+9,8,12,.034,i%2?'pale':'blue',1.656+i*.035);
  }
}
cabinet(1471,false);
cabinet(1611,true);

box(606,1615,9,9,.046,'pale',0,'equipment',true);
for(const side of [-1,1]) {
  box(606+side*4,1615,1,9,.27,'pale');
  box(606,1615+side*4,7,1,.27,'pale');
}
