import {HEIGHT,talk1Room,talk2Room} from './plan.js';

export const talk1Colors={talkOak:'#b8afa1'};
export const talk1Objects=[],talk2Objects=[],talkCorridorObjects=[];
const builder=objects=>(px,py,w,d,h,mat,base=0,kind='detail',solid=false,extra={})=>{
  objects.push({px,py,w,d,h,mat,base,kind,solid,...extra});
};
const box=builder(talk1Objects);
const roundRoom=builder(talk2Objects);
const corridor=builder(talkCorridorObjects);

function finish(box,px,py,w,d,h,mat,base=0) {
  box(px,py,w,d,h,mat,base,'wallFinish',false,{cutaway:true});
}

// Oak clads both short walls in each room.
function cladRoom(box,{bounds:[left,back,right,front]}) {
  const center=(left+right)/2;
  for(const [edge,inward] of [[back,1],[front,-1]]) {
    const surface=edge+inward*3.95;
    const trim=edge+inward*4.65;
    finish(box,center,surface,right-left-7,.9,HEIGHT-.025,'partnerOak');
    for(const px of [left+4,center,right-4]) finish(box,px,trim,1.45,.65,HEIGHT-.025,'black');
    for(const [base,height] of [[0,.065],[2.72,.05],[HEIGHT-.09,.065]]) {
      finish(box,center,trim,right-left-7,.65,height,'black',base);
    }
  }
  finish(box,left+4,(back+front)/2,1.1,front-back-8,.075,'black');
}
cladRoom(box,talk1Room);
cladRoom(roundRoom,talk2Room);

const tableX=334, tableY=656, top=.76;
box(tableX,tableY,48,74,.064,'talkOak',top-.064,'table',true);
for(const py of [tableY-38.5,tableY+38.5]) box(tableX,py,44,3,.064,'talkOak',top-.064);
for(const px of [314,354]) for(const py of [625,686]) box(px,py,2.2,2.2,.70,'black');
box(tableX,662,9,5,.085,'leaf',top);
box(tableX,662,8.8,4.8,.018,'pale',top+.085);
box(tableX,662,4,1.2,.072,'white',top+.103);
box(tableX+.6,662,2.8,1.2,.034,'white',top+.175);
for(const px of [331.5,336.5]) {
  box(px,651,2.8,2.8,.125,'bottle',top);
  box(px,651,1.7,1.7,.024,'red',top+.125);
}
box(tableX,667,6.8,1.3,.082,'pale',top);

function chair(box,px,py,side,arms=true) {
  const backX=px+side*7;
  box(px,py,16,18,.073,'black',.43,'chair',true);
  box(backX,py,1.5,16,.43,'mesh',.51);
  for(const y of [.51,.94]) box(backX,py,2,19,.03,'black',y);
  for(const dy of [-8.3,8.3]) {
    box(backX,py+dy,1.9,1.4,.45,'black',.51);
    if(arms) box(px,py+dy,14,1.45,.04,'black',.62);
    box(px-side*6,py+dy,1.5,1.5,arms?.61:.39,arms?'black':'metal',.04);
    box(px,py+dy,15,1.5,.04,arms?'black':'metal',.035);
  }
}
for(const py of [638,670]) {
  chair(box,296,py,-1);
  chair(box,372,py,1);
}

function planter(box,x,y) {
  box(x,y,12,12,.35,'white',0,'planter');
  box(x,y,9.5,9.5,.015,'oakDark',.35);
  for(const [dx,dy,h] of [[-3,-2,.26],[1,2,.39],[3,-2,.34],[-4,3,.29],[2,4,.25]]) {
    box(x+dx,y+dy,1,1,h,'plant',.35);
    box(x+dx*1.6,y+dy*1.5,5,4,.075,'plantLight',.35+h);
  }
}
planter(box,286,728);

// Draw the circular tabletop in narrow strips to keep the stepped voxel edge.
const roundX=335, roundY=834, radius=25;
for(let offset=-24;offset<=24;offset+=2) {
  const width=2*Math.sqrt(radius**2-offset**2);
  roundRoom(roundX,roundY+offset,width,2,.057,'deskOak',top-.057,
    offset===0?'table':'detail',true,offset===0?{mapDiameter:radius*2}:{});
}
for(const [dx,dy] of [[-13,-13],[13,-13],[0,16]]) {
  roundRoom(roundX+dx,roundY+dy,2.8,2.8,top-.057,'oakLight');
}
roundRoom(roundX,roundY,3,3,.13,'bottle',top);
roundRoom(roundX,roundY,3.2,3.2,.045,'red',top+.037);
roundRoom(roundX,roundY,1.9,1.9,.024,'red',top+.13);
chair(roundRoom,297,838,-1,false);
chair(roundRoom,373,838,1,false);

// The oak return beside the meeting-room doorway and a pot at the opposite edge.
finish(corridor,393,598.95,27,.9,HEIGHT-.025,'partnerOak');
for(const y of [.055,2.72,HEIGHT-.09]) finish(corridor,393,599.6,27,.65,.05,'black',y);
finish(corridor,406,599.6,1.5,.65,HEIGHT-.025,'black');
planter(corridor,460,616);
