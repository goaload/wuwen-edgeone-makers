import {HEIGHT} from './plan.js';

export const archiveObjects=[];
function box(px,py,w,d,h,mat,base=0,extra={}) {
  archiveObjects.push({px,py,w,d,h,mat,base,kind:'detail',solid:false,...extra});
}
function trim(px,py,w,d,h,mat,base=0) {
  box(px,py,w,d,h,mat,base,{cutaway:true});
}

// The timber end wall and the glass-fronted cabinet sit beyond the open aisle.
trim(454,487.5,.85,67,HEIGHT-.025,'partnerOak');
for(const y of [454,477,499,521]) trim(454.6,y,.64,1.4,HEIGHT-.025,'black');
for(const [base,height] of [[0,.064],[2.57,.045],[HEIGHT-.08,.055]]) {
  trim(454.6,487.5,.65,67,height,'black',base);
}

const cabinetX=463, face=470;
box(cabinetX,471,14,30,.075,'oakLight',0,{solid:true,kind:'shelf'});
box(cabinetX,471,14,30,.06,'oakLight',1.94);
box(456.4,471,.9,30,1.9,'oakLight',.065);
for(const y of [456,471,486]) box(cabinetX,y,14,1.35,1.94,'oakLight');
for(const [index,y] of [463.5,478.5].entries()) {
  box(face,y,1.05,13.65,.75,'oakLight',.075);
  box(face,y,.48,11.8,1.10,'glass',.84,{glass:true});
  for(const level of [.83,1.17,1.54]) {
    box(cabinetX,y,14,13.6,.04,'oakLight',level);
  }
  for(const [level,count] of [[.87,index===0?0:5],[1.21,4]]) {
    for(let i=0;i<count;i++) {
      box(464,y+(i%3-1)*.28,8,10,.018,i%2?'pale':'white',level+i*.022);
    }
  }
  box(face+.6,y+(index===0?5:-5),.7,1.05,.065,'oakDark',.76);
}

// One metallic appliance sits on the white cabinet beside the left partition.
box(491,509,19,20,.92,'white',0,{solid:true,kind:'cabinet'});
box(501,509,.85,18,.85,'pale',.045);
box(491,508,15.8,16,.45,'metal',.92);
box(491,499.8,14.4,.55,.39,'dark',.949);
box(491,499.4,10.3,.45,.29,'stone',1.005);
box(497.4,499.1,1.05,.95,.23,'pale',1.014);
