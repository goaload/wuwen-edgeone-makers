import {HEIGHT} from './plan.js';

export const hallEndObjects=[];
function box(px,py,w,d,h,mat,base=0,kind='detail',solid=false,extra={}) {
  hallEndObjects.push({px,py,w,d,h,mat,base,kind,solid,...extra});
}
function finish(px,py,w,d,h,mat,base=0) {
  box(px,py,w,d,h,mat,base,'wallFinish',false,{cutaway:true});
}

// The veneer continues past the framed print into the short return.
for(const [left,right] of [[485,510],[582,679]]) {
  const px=(left+right)/2;
  finish(px,1685.9,right-left,.9,HEIGHT-.025,'partnerOak');
  finish(px,1685.32,right-left,.35,.012,'oakDark',2.91);
  finish(px,1685.3,right-left,.35,.048,'oakDark');
}
for(const px of [496,596,622,650,675]) {
  finish(px,1685.35,.31,.4,HEIGHT-.025,'oakDark');
}
finish(604,1685.22,26,.45,.018,'oakDark',2.23);
for(const base of [.32,1.93]) finish(616,1685.05,.9,.65,.103,'black',base);

// White tapered planter beneath the grape print.
const plantX=663, plantY=1677;
box(plantX,plantY,10.5,10,.14,'white',0,'planter',true);
box(plantX,plantY,12,11.5,.17,'white',.14);
box(plantX,plantY,14,12.5,.19,'white',.31);
box(plantX,plantY,11.6,10.3,.045,'oakDark',.477);
box(plantX,plantY-5.8,1.1,.5,.08,'dark',.12);
box(plantX,plantY,2,2,.49,'oakDark',.5);
for(const [dx,dy,base,w,d] of [[-6,0,.66,10,7],[6,-1,.7,9,8],[1,-4,.77,11,6],[-5,3,.81,8,6],[4,3,.91,8,6],[-2,-2,.95,7,7],[2,1,1.08,6,6]]) {
  box(plantX+dx,plantY+dy,w,d,.12,base>.9?'plantLight':'plant',base);
}

// Two folding screens lean against the white end wall.
for(const py of [1653,1668]) {
  box(501,py,3,14,1.51,'partnerOak',.04,'equipment',true);
  for(const edge of [-7,7]) box(499.2,py+edge,1.5,1.5,1.59,'oakLight',.04);
  for(const base of [.04,1.56]) box(499.2,py,1.5,15,.056,'oakLight',base);
}
for(const px of [514,522]) {
  box(px,1681,5,7,.98,'black',.07,'equipment',true);
  for(const dx of [-1.8,1.8]) box(px+dx,1681,1,7,.04,'metal',.13);
  for(const dy of [-2.65,2.65]) box(px,1681+dy,1.1,1.1,.78,'metal');
}
box(533,1649,12,11,.25,'oakLight',0,'equipment',true);
box(533,1649,11,10,.3,'oakLight',.25,'detail',true);
box(533,1649,10,9,.042,'green',.55,'detail',false,{color:'#729081'});
for(const px of [547,558,569]) {
  box(px,1649,9,9,.34,'bottle',0,'equipment',true);
  box(px,1649,7.1,7.1,.105,'bottle',.34);
  box(px,1649,2.4,2.4,.06,'clay',.445);
}
