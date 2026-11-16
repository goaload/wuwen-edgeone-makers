import {HEIGHT,partner8Room,partner8Window,windowProfile} from './plan.js';

export const partner8Objects=[];
function box(px,py,w,d,h,mat,base=0,kind='detail',solid=false,extra={}) {
  partner8Objects.push({px,py,w,d,h,mat,base,kind,solid,...extra});
}
function finish(px,py,w,d,h,mat,base=0) {
  box(px,py,w,d,h,mat,base,'wallFinish',false,{cutaway:true});
}

const [entry,near,exterior,far]=partner8Room.bounds;
for(const [edge,inward] of [[near,1],[far,-1]]) {
  const panel=edge+inward*3.94, trim=panel+inward*.58;
  finish((entry+exterior)/2,panel,exterior-entry-7,.9,HEIGHT-.025,'partnerOak');
  for(const x of [684,729,775,826]) finish(x,trim,1.4,.65,HEIGHT-.025,'black');
  for(const [base,h] of [[0,.06],[2.58,.046],[HEIGHT-.08,.055]]) {
    finish((entry+exterior)/2,trim,exterior-entry-7,.65,h,'black',base);
  }
}

const {start,end}=partner8Window;
const span=end-start, middle=(start+end)/2;
const railTop=windowProfile('floor',partner8Window).top-.025;
box(824.5,middle,10,span,.255,'pale');
finish(828,middle,4.5,span,.08,'windowRail',.79);
const edges=[start,start+span*.37,start+span*.75,end];
for(const edge of edges.slice(1,-1)) finish(828,edge,4.4,2.7,railTop-.25,'windowRail',.25);
for(const [i,bottom] of [3.12,2.15,1.80].entries()) {
  const center=(edges[i]+edges[i+1])/2, width=edges[i+1]-edges[i]-3.5;
  finish(825,center,1.15,width,railTop-bottom,'rollerCloth',bottom);
  finish(824.4,center,1.5,width,.034,'pale',bottom);
}

const deskTop=.77, deskY=1269;
box(778,deskY,84,36,.062,'partnerDesk',deskTop-.062,'desk',true);
for(const x of [742,813]) {
  box(x,deskY,3,4,.70,'pale');
  box(x,deskY,3.8,26,.044,'pale');
}

function chair(x,y,executive=false) {
  const back=y+(executive?8:-8);
  const backHeight=executive?.56:.45;
  box(x,y,18,17,.105,'black',.43,'chair',true);
  box(x,back,17.6,2.5,backHeight,'mesh',.535);
  box(x,back,19,2.9,.04,'black',.535+backHeight);
  for(const offset of [-8.8,8.8]) {
    box(x+offset,back,1.2,3,backHeight,'black',.53);
    box(x+offset,y,1.45,16,.045,'black',.64);
    if(!executive) {
      box(x+offset,y,1.35,16,.045,'metal',.035);
      box(x+offset,back,1.35,2,.43,'metal');
    }
  }
  if(executive) {
    box(x,back,16,5,.16,'black',1.11);
    box(x,y,3.5,3.5,.39,'metal',.035);
    box(x,y,18,2.4,.047,'black',.038);
    box(x,y,2.4,16,.047,'black',.038);
  }
}
chair(780,1301,true);
chair(762,1199);
chair(795,1199);

function papers(x,y,w,d,base,count,cover='white') {
  for(let i=0;i<count;i++) {
    const offset=i%3-1;
    const color=i===count-1?cover:['white','pale','board'][i%3];
    box(x+offset*.55,y-offset*.37,w+.62*offset,d,.022,color,base+i*.028);
  }
}
papers(748,1272,18,21,deskTop,9);
papers(806,1273,17,17,deskTop,6,'blue');
papers(795,1199,13,12,.535,4);
papers(822,1209,8,15,.255,4);
papers(822,1229,8,13,.255,5);

// Two-tier white desktop riser with folded metal laptop stand.
const riserX=779, riserY=1268;
box(riserX,riserY+4,37,26,.044,'white',deskTop+.21);
box(riserX,riserY-9,36,10,.039,'white',deskTop+.095);
for(const x of [riserX-15,riserX+15]) {
  box(x,riserY+4,3.1,21,.031,'metal',deskTop+.01);
  box(x,riserY+4,2.15,7,.17,'dark',deskTop+.04);
}
box(riserX-4,riserY-10,22,6.7,.035,'black',deskTop+.135);
for(const offset of [-2,0,2]) box(riserX-4,riserY-10+offset,20.5,.36,.008,'dark',deskTop+.17);
box(riserX+12,riserY-10,8,8,.012,'dark',deskTop+.135);
for(const x of [riserX-6,riserX+6]) {
  box(x,riserY+5,2.3,15,.029,'metal',deskTop+.255);
  box(x,riserY+10,2.3,3,.054,'dark',deskTop+.283);
}
box(riserX,riserY+5,13,1.1,.024,'metal',deskTop+.284);
box(792,1277,5,5,.16,'pale',deskTop+.254,'detail',false,{color:'#9db4a3'});
for(const offset of [-1,1]) box(792+offset,1277,.55,.55,.1,'black',deskTop+.41);
box(810,1284,5,5,.135,'dark',deskTop);
box(805,1284,6,5,.086,'blue',deskTop);

const cabinetY=far-12, cabinetFace=cabinetY-7.5;
box(780,cabinetY,72,15,.062,'oakDark',0,'shelf',true);
box(780,cabinetY,72,15,.063,'oakDark',2.02);
box(780,cabinetY+7,72,1.2,2,'partnerDesk',.062);
for(const x of [744,762,780,798,816]) box(x,cabinetY,1.35,15,2.03,'oakDark');
const spines=['pale','red','board','blue','pale','dark'];
for(const [i,x] of [753,771,789,807].entries()) {
  const glassBase=i<2?1.61:.86;
  box(x,cabinetFace,16.7,1.1,.76,'partnerDesk',.078);
  box(x,cabinetFace,15.3,.46,2.02-glassBase,'glass',glassBase,'detail',false,{glass:true});
  box(x,cabinetFace,16.7,1.1,.042,'oakDark',glassBase);
  for(const base of [.84,1.22,1.60]) {
    box(x,cabinetY,16.7,15,.039,'oakDark',base);
    if(base===1.60&&i%2) {
      papers(x,cabinetY-1,11.7,9,base+.04,5,i===1?'gold':'pale');
      continue;
    }
    for(let j=0;j<6;j++) {
      const spineX=x-6.3+j*2.5, mat=spines[(i+j)%spines.length];
      box(spineX,cabinetY-2,2.15,8,.23+(j%3)*.03,mat,base+.04);
      box(spineX,cabinetY-6.05,1.35,.25,.036,'white',base+.145);
    }
  }
  box(x+(i%2?-5.5:5.5),cabinetFace-.72,1.05,.7,.058,'black',.73);
}
box(796,cabinetY,11,2.2,.25,'oakLight',2.083);
box(796,cabinetY-1.18,8.4,.35,.19,'pale',2.111);

const tableX=696, tableY=1296, tableTop=.73;
box(tableX,tableY,21,44,.055,'deskOak',tableTop-.055,'table',true);
for(const y of [1279,1313]) {
  box(tableX,y,2.65,2.9,.67,'white');
  box(tableX,y,17.5,3,.045,'white');
}
for(const [y,count,cover] of [[1279,5,'white'],[1290,6,'pale'],[1302,4,'board'],[1311,7,'white']]) {
  papers(tableX,y,15.5,9,tableTop,count,cover);
}
box(697,1299,16,23,.41,'dark',.025);
box(697,1299,17,24,.045,'pale',.437);
box(705,1299,1.2,1.8,.078,'oakLight',.22);

for(const x of [698,705,711]) box(x,1321,1.8,2.3,1.79,'oakLight',.025);
box(704,1321,13,6,.67,'black',.39);
box(700,1318,5,1.2,.21,'gold',1.08);
box(711,1319,5.5,1.2,.16,'pale',1.12);
box(726,1318,17,16,.055,'pale',.35,'chair',true,{color:'#d5c29f'});
box(726,1325,16.7,2.6,.31,'pale',.39,'detail',false,{color:'#d5c29f'});
for(const x of [720,732]) box(x,1318,1.15,13,.034,'oakDark',.045);

// The board uses generic marker strokes and an unlabeled notice.
const boardX=722, boardY=near+5.1;
finish(boardX,boardY,22,.82,.65,'white',1.15);
finish(boardX-5.7,boardY+.52,6.4,.23,.31,'pale',1.36);
for(const [i,width] of [7,6,8,5,7,5,6].entries()) {
  finish(boardX+4,boardY+.5,width,.19,.009,'dark',1.66-i*.039);
}
