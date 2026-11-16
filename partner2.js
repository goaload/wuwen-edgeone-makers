import {HEIGHT,partner2Windows} from './plan.js';

export const partner2Objects=[];
function box(px,py,w,d,h,mat,base=0,kind='detail',solid=false,extra={}) {
  partner2Objects.push({px,py,w,d,h,mat,base,kind,solid,...extra});
}
function finish(px,py,w,d,h,mat,base=0) {
  box(px,py,w,d,h,mat,base,'wallFinish',false,{cutaway:true});
}

// The corner has four bays on each side. One shade is raised above the others.
for(const [{axis,line,start,end},bottoms] of [
  [partner2Windows[0],[2.12,.31,.31,.31]],
  [partner2Windows[1],[2.09,.98,.31,.31]],
]) {
  const span=(end-start)/bottoms.length;
  const trim=(at,depth,w,d,h,mat,base=0)=>
    axis==='h'?finish(at,line+depth,w,d,h,mat,base):finish(line-depth,at,d,w,h,mat,base);
  trim((start+end)/2,4,end-start,8,.22,'white');
  trim((start+end)/2,1.5,end-start,3,.07,'windowRail',.77);
  for(const [i,bottom] of bottoms.entries()) {
    const mid=start+span*(i+.5);
    trim(mid,4.3,span-3,1,HEIGHT-.075-bottom,'rollerCloth',bottom);
    trim(mid,4.5,span-3,1.7,.036,'metal',bottom);
    if(i) trim(start+span*i,1.8,2.25,4,HEIGHT-.275,'windowRail',.22);
  }
}

const top=.77;
// Black desk pad on a timber worktop with pale metal trestles.
box(749,378,93,43,.07,'partnerOak',top-.07,'desk',true);
box(749,380,78,33,.013,'black',top);
for(const px of [710,788]) {
  box(px,378,2.8,3.4,.69,'pale');
  box(px,378,3.5,31,.045,'pale',.025);
}
box(753,374,30,2.2,.43,'black',.94);
box(753,374,3,3.5,.17,'metal',top);
box(753,374,11,8,.025,'metal',top);
box(752,384,21,6,.019,'pale',top+.013);
box(768,384,4,4,.031,'pale',top+.013);
for(const [px,py,n] of [[715,371,4],[725,360,3],[782,368,5],[789,386,2]]) {
  for(let i=0;i<n;i++) {
    box(px+i*.45,py,13,9,.016,i===0?'deskOak':'white',top+i*.018);
  }
}
box(735,364,7,4.2,.08,'pale',top);
box(735,364,2.3,1,.06,'white',top+.08);

function officeChair(px,py,executive) {
  const facing=executive?1:-1;
  box(px,py,executive?24:19,20,.10,'black',.41,'chair',true);
  if(!executive) box(px,py,17,17,.045,'cushion',.51);
  box(px,py+facing*8.5,executive?23:18,3,executive?.63:.47,executive?'black':'mesh',.50);
  if(executive) {
    box(px,py+9.2,22,5,.19,'black',1.11);
    box(px,py,3,3,.41,'black');
    box(px,py,19,2,.05,'black',.035);
    box(px,py,2,19,.05,'black',.035);
  }
  for(const dx of [-8,8]) {
    box(px+dx,py,executive?4:1.6,16,.055,'black',.67);
    box(px+dx,py-facing*6.8,1.5,1.5,executive?.32:.60,executive?'black':'metal',executive?.35:.04);
    if(!executive) box(px+dx,py,1.5,17,.047,'metal',.035);
  }
}
officeChair(752,411,true);
officeChair(750,345,false);

// Book and trophy cabinet below the corridor-facing glazing.
box(755,435,91,19,.75,'partnerOak',0,'shelf',true);
box(755,443,91,2,2.04,'partnerDesk');
for(const px of [710,732.5,755,777.5,800]) box(px,435,1.7,19,2.04,'partnerOak');
for(const y of [.74,1.12,1.50,2.02]) box(755,435,91,19,.045,'partnerOak',y);
for(const px of [721,744,766,789]) {
  box(px,424.9,19,1.3,.63,'partnerOak',.06);
  box(px+6.5,424,1.3,1.2,.06,'gold',.39);
  const base=px<747?1.52:.79;
  box(px,425,20,.6,2.02-base,'glass',base,'detail',false,{glass:true});
}
for(const px of [760,763,766,769,774,778,781,784,787,790,793]) {
  box(px,430,2.3,6,.29,['blue','red','white','oakLight'][px%4],.80);
}
for(let i=0;i<4;i++) box(765+i*.3,430,14,7,.043,'red',1.17+i*.046);
box(786,429,10,1.5,.26,'gold',1.17);
box(786,427.9,8,1,.22,'pale',1.19);
box(725,429,7,6,.21,'clay',1.56);

// Golden live-edge slab, three horseshoe chairs and a separate tea tray.
box(677,298,83,53,.089,'partnerOak',top-.089,'table',true);
for(const [px,py,w,d] of [[675,269.9,77,4],[678,325.5,72,2],[719,298,3,47],[634.5,299,2,44]]) {
  box(px,py,w,d,.089,'oakLight',top-.089);
}
for(const px of [642,711]) for(const py of [278,319]) box(px,py,3.4,3.4,.68,'oakDark');
box(694,293,21,13,.023,'cushion',top);
box(684,306,16,8,.018,'partnerDesk',top);
for(const [px,py,mat] of [[684,294,'pale'],[693,304,'white'],[699,304,'white'],[705,304,'pale']]) {
  box(px,py,4.4,4.4,.074,mat,top);
  box(px,py,3.2,3.2,.008,'oakDark',top+.074);
  box(px+2.6,py,1.3,1.4,.035,mat,top+.025);
}
box(654,310,17,12,.025,'white',top);
box(653,306,14,9,.028,'red',top+.025);
box(653,306,13,8.5,.02,'pale',top+.052);
function teaChair(px,py,dir) {
  const around=(side,depth,w,d,h,mat,base,kind='detail',solid=false)=>{
    const across=dir==='north';
    const dx=across?side:depth*(dir==='left'?-1:1);
    const dy=across?-depth:side;
    box(px+dx,py+dy,across?w:d,across?d:w,h,mat,base,kind,solid);
  };
  around(0,0,18,19,.078,'oakDark',.42,'chair',true);
  around(0,0,16,17,.038,'cushion',.50);
  for(const side of [-1,1]) {
    for(const depth of [-7,7]) around(side*7,depth,2,2,.42,'oakDark',0);
    around(side*8.3,6,2.8,4,.06,'partnerOak',.84);
    around(side*10,1.5,2.3,6,.059,'partnerOak',.75);
    around(side*9,-4,2.4,5,.055,'partnerOak',.69);
  }
  around(0,8,13,2.4,.058,'partnerOak',.91);
  around(0,7.7,5,1.8,.37,'oakDark',.49);
}
teaChair(676,250,'north');
teaChair(617,299,'left');
teaChair(737,296,'right');

box(701,248,23,15,.065,'oakDark',.60,'table',true);
for(const dx of [-8,8]) for(const dy of [-5,5]) box(701+dx,248+dy,1.9,1.9,.60,'oakDark');
box(701,248,18,10,.027,'black',.665);
for(const [px,mat] of [[696,'metal'],[704,'clay']]) {
  box(px,248,5,5,.115,mat,.69);
  box(px,248,4,4,.027,mat,.805);
  box(px+2.8,248,1.6,1.4,.04,mat,.742);
}

// Open tea shelves by the glass, with cupboards and small ceramic pieces.
box(609,260,18,45,.55,'partnerDesk',0,'shelf',true);
for(const dx of [-8,8]) for(const dy of [-21,21]) box(609+dx,260+dy,2,2,2.04,'oakDark');
for(const y of [.54,.87,1.24,1.64,2.02]) box(609,260,18,45,.05,'partnerDesk',y);
for(const [i,y] of [.92,1.29,1.69].entries()) {
  for(const [dy,mat] of [[-13,'pale'],[-5,'red'],[4,'clay'],[13,'white']]) {
    box(612,260+dy,5.1,4.8,i===2?.22:.092,mat,y);
  }
}
box(606,373,1.8,30,1.87,'pale',.045,'screen',true);
box(607.7,373,.7,29,1.85,'white',.055);
box(806,242,22,20,.87,'metal',0,'equipment',true);
box(795,242,1.2,20,.017,'dark',.58);
box(806,242,1.8,1.8,.085,'metal',.87);
box(806,242,12,1.8,.037,'metal',.98);
box(806,242,3,9,.03,'metal',.965);
box(603,397,10,10,.31,'bottle',0,'equipment',true);
box(603,397,4,4,.037,'red',.31);

for(const [px,py] of [[611,232],[812,433]]) {
  box(px,py,12,12,.06,'oakDark',.61);
  for(const dx of [-4,4]) for(const dy of [-4,4]) box(px+dx,py+dy,1.6,1.6,.61,'oakDark');
  box(px,py,9,9,.22,'white',.67,'planter');
  box(px,py,1.2,1.2,.52,'oakDark',.88);
  for(const [dx,dy,y] of [[-4,2,1.02],[4,-1,1.14],[-3,-3,1.28],[3,3,1.43]]) {
    box(px+dx,py+dy,8,6,.11,'plant',y);
    box(px+dx+1,py+dy,6,4,.08,'plantLight',y+.08);
  }
}
