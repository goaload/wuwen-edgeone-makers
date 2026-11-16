// Photo-traced drawing coordinates. No surveyed dimensions were supplied.
// The marked floor plans specify glazing, partition positions and door openings.
export const SCALE=45, HEIGHT=3.6;
export const FOOTPRINT=[[270,220],[830,220],[830,1690],[485,1690],[485,1340],[215,1340],[215,1048],[290,1048],[290,880],[270,880]];
export const floorSections=[[270,220,830,880],[290,880,830,1048],[215,1048,830,1340],[485,1340,830,1690]];
export const toWorld=(px,py)=>[(py-955)/SCALE,(520-px)/SCALE];
export const fromWorld=(x,z)=>[520-z*SCALE,955+x*SCALE];
const r=(id,name,bounds,side,gap,type,description)=>({id,name,bounds,door:side?{side,gap}:null,type,description});
const partnerWall78=1180, partnerWall89=1334;
export const teaRoom={...r('partner1','茶室',[450,220,595,450],'left',[390,450],'tea','从会议室进入，深木茶桌配圈椅，博古架与水墨山景屏风沿侧墙布置。'),point:[478,411],look:[543,252]};
export const talk1Room={...r('talk1','洽谈室 1',[270,595,405,750],'right',[708,750],'talk','灰木长桌配四把黑色网椅，白墙挂「无问」书法，磨砂玻璃门通向前台侧走廊。'),point:[374,725],look:[324,620]};
export const talk2Room={...r('talk2','洽谈室 2',[270,750,405,880],'right',[752,794],'talk','浅木圆桌配两把黑色网椅，白墙挂竖幅「无问西东」书法。'),point:[365,776],look:[305,830]};
export const talkCorridor={id:'talkCorridor',name:'洽谈室外走廊',bounds:[405,595,475,880],point:[440,829],look:[430,582],description:'两间洽谈室外的灰毯走廊，两侧是黑框百叶玻璃，尽头可进入会议室。'};
export const partner2Room={...r('partner2','主任办公室',[595,220,830,450],'bottom',[597,639],'partner','转角落地窗配灰色卷帘，室内分设办公桌和实木茶桌，沿百叶隔断摆放书柜与茶具架。'),point:[627,411],look:[710,271]};
export const partner12Room={...r('partner12','档案室',[490,1245,620,1445],'right',[1247,1289],'partner','灰毯房间，两组浅灰文件柜分列白门两侧，百叶隔断旁摆放办公椅和折叠梯。'),point:[580,1270],look:[502,1350]};
export const partner11Room={...r('partner11','办公室10',[490,1445,620,1640],'right',[1448,1490],'partner','浅木双人工作台配中间隔板和黑色网椅，白墙两端各有一组玻璃文件柜，门侧为木饰面。'),point:[581,1469],look:[526,1570]};
export const partner3Room={...r('partner3','办公室1',[680,450,830,637],'left',[595,637],'partner','木桌上摆放绿植，桌边是三把黑色网椅。木墙边有两组文件柜，百叶玻璃转角摆着灰色茶具柜。'),point:[708,609],look:[790,554]};
export const partner4Room={...r('partner4','办公室2',[680,637,830,775],'left',[639,681],'partner','木墙边摆放两组书柜，窗边有灰色休闲椅，木桌配一把带头枕的办公椅和两把黑色网椅。'),point:[710,672],look:[787,720]};
export const partner5Room={...r('partner5','办公室3',[680,775,830,912],'left',[870,912],'partner','深木办公桌两侧摆放黑色高背椅和网椅，木墙边是两组文件柜，百叶隔断旁停着黑色健身车。'),point:[710,883],look:[782,827]};
export const partner6Room={...r('partner6','办公室4',[680,912,830,1047],'left',[914,956],'partner','窗间有白色立柱，深木办公桌两侧分别是黑色网椅和米白转椅，玻璃文件柜沿木墙布置。'),point:[710,973],look:[792,990]};
export const partner8Room={...r('partner8','办公室5',[680,partnerWall78,830,partnerWall89],'left',[1227,1269],'partner','深木办公桌配白色桌面升降台，主椅背后是玻璃书柜，两把会客椅靠对面木墙，门边设白板和资料桌。'),point:[720,1248],look:[780,1281]};
export const partner9Room={...r('partner9','办公室6',[680,partnerWall89,830,1495],'left',[1453,1495],'partner','木饰面和黑框百叶隔断，落地窗配四幅深灰卷帘，深木办公桌两侧摆放红色座椅。'),point:[714,1471],look:[778,1393]};
export const partner10Room={...r('partner10','办公室7',[680,1495,830,1690],'left',[1497,1539],'partner','灰色卷帘落地窗、米白坐垫木榻、深木办公桌，白墙两侧立书柜，中间挂帆船画。'),point:[710,1548],look:[774,1601]};
export const archiveRoom={...r('archive','资料室',[450,450,552,525],null,null,'archive','开放式资料室，从走廊直接进入。两侧是黑框百叶玻璃，尽头靠木饰面墙摆放浅木文件柜。'),point:[535,489],look:[467,486]};
export const financeRoom={...r('finance','办公室8',[475,525,605,685],'right',[643,685],'finance','浅木双人工位配灰色隔板，黑框百叶玻璃围合，木饰面墙旁设玻璃文件柜，靠墙另有资料桌。'),point:[554,656],look:[526,582]};
export const partner13Room={...r('partner13','办公室9',[475,685,605,850],'right',[687,729],'partner','浅木双人工位带灰色隔板，三面为黑框百叶玻璃，进门一侧摆放四门玻璃文件柜。'),point:[575,713],look:[535,781]};
export const rooms=[
{...r('meeting','会议室',[270,220,450,595],'bottom',[408,450],'meeting','浅木圆头长桌、窗边显示屏、百叶隔断和木书柜，靠茶室一侧设有通道。'),point:[427,550],look:[344,252]},
teaRoom,
partner2Room,
archiveRoom,
financeRoom,
partner13Room,
partner12Room,
partner11Room,
partner3Room,
partner4Room,
partner5Room,
partner6Room,
{...r('partner7','财务室',[680,1047,830,partnerWall78],'left',[1138,partnerWall78],'partner','木饰面办公室，落地窗配三幅深灰卷帘，右侧靠窗摆放玻璃文件柜。'),point:[699,1128],look:[813,1118]},
partner8Room,
partner9Room,
partner10Room,
talk1Room,
talk2Room,
r('stairs','公共楼梯间',[215,1165,485,1340],null,null,'stairs','按图保留楼梯间占位。此次只展示这一层，不提供上下楼。')];
export const partnerHall={id:'partnerHall',name:'办公室6、7门外走廊',bounds:[620,1453,680,1640],point:[649,1571],look:[649,1685],description:'两侧是黑框百叶玻璃，灰毯走廊通向挂有葡萄画的木饰面墙。'};
export const hallTurn={id:'hallTurn',name:'走廊右端拐角',bounds:[485,1640,680,1690],point:[618,1665],look:[501,1664],description:'沿木饰面墙转入短廊，末端是白墙，折叠椅、纸箱和水桶靠边摆放。'};
export const zones=[
{id:'lobby',name:'前台接待',bounds:[290,880,480,1165],point:[308,1094],yaw:0,description:'按实景照片还原木格栅招牌墙、红色标志、斜切石纹前台、白色展示柜与黑色轨道灯。'},
{id:'waiting',name:'等候区域',bounds:[290,880,475,1015],point:[408,968],yaw:Math.PI,description:'按实景布置深灰双人沙发、单人椅、两张错层石纹圆茶几，以及木饰面、锦旗和书法画。'},
{id:'open',name:'开放办公区',bounds:[480,932,615,1245],point:[606,1084],look:[539,979],yaw:Math.PI,description:'浅木工位与共享设备分列两端，靠墙依次布置复印机、饮水机、茶水桌和冰箱。办公区直接连通主走廊。'},
{id:'corridor',name:'主走廊',bounds:[615,450,680,1690],point:[644,1000],yaw:Math.PI,description:'沿长走廊可到达两侧办公室及端部空间。'},
talkCorridor,partnerHall,hallTurn];
// The work area opens across the corridor and toward the waiting area.
export const receptionWorkDoor = {line:485,gap:[855,924],frostEnd:876,oakWidth:12};
const openSide = {a:[receptionWorkDoor.line,849], b:[receptionWorkDoor.line,1165]};
export const workGlazing = [
 {axis:'v',line:talk1Room.bounds[2],start:talk1Room.bounds[1],end:talk1Room.door.gap[0],panes:2},
 {axis:'v',line:talk2Room.bounds[2],start:talk2Room.door.gap[1],end:talk2Room.bounds[3],panes:2},
 {axis:'v',line:475,start:525,end:850},
 {axis:'v',line:450,start:220,end:390},
 {axis:'v',line:595,start:220,end:450},
 {axis:'h',line:450,start:450,end:552,panes:3},
 {axis:'h',line:450,start:552,end:597},
 {axis:'h',line:450,start:639,end:680},
 {axis:'h',line:450,start:680,end:830,panes:3},
 {axis:'v',line:680,start:450,end:595,panes:2},
 {axis:'v',line:680,start:681,end:775,panes:3},
 {axis:'v',line:680,start:775,end:870,panes:2},
 {axis:'v',line:680,start:956,end:1047,panes:2},
 {axis:'v',line:680,start:450,end:1690},
 {axis:'v',line:605,start:525,end:850},
 {axis:'h',line:525,start:450,end:552,panes:3},
 {axis:'h',line:financeRoom.bounds[1],start:financeRoom.bounds[0],end:financeRoom.bounds[2],panes:3},
 {axis:'h',line:850,start:475,end:605,panes:3},
 {axis:'v',line:620,start:1245,end:1640},
 {axis:'h',line:1445,start:490,end:620,panes:3},
 {axis:'h',line:1640,start:490,end:620,panes:3},
 {axis:'v',line:receptionWorkDoor.line,start:openSide.a[1],end:receptionWorkDoor.gap[0]},
 {axis:'h',line:1245,start:490,end:620},
];
export const workDoorways = [
 {id:partner2Room.id,line:partner2Room.bounds[3],gap:partner2Room.door.gap,inward:-1,label:partner2Room.name,horizontal:true},
 ...rooms.filter(q => q.door && (q.bounds[0] === 680 || ['finance','partner13','partner12','partner11','talk1','talk2'].includes(q.id)))
  .map(q => ({id:q.id,line:q.door.side === 'left' ? q.bounds[0] : q.bounds[2],
   gap:q.door.gap, inward:q.door.side === 'left' ? 1 : -1, label:q.name, hingeAtEnd:['partner3','partner5','partner7','partner9','talk1'].includes(q.id)})),
];
const {line:workEntry,gap:[workEntryStart,workEntryEnd],frostEnd} = receptionWorkDoor;
export const workDoorLeaves = [
 ...workDoorways.map(({id,line,gap:[a,b],inward,hingeAtEnd,horizontal}) => {
  const width=b-a-3;
  const axis=hingeAtEnd?b-5.5:a;
  const depth=line+inward*width/2;
  return horizontal?{id,px:axis,py:depth,w:1.2,d:width,handle:inward,horizontal}:
   {id,px:depth,py:axis,w:width,d:1.2,handle:inward};
 }),
 {px:473,py:445.5,w:43,d:1.2,handle:1},
 {px:workEntry+12,py:workEntryEnd,w:24,d:1.2,handle:1,finish:'clear'},
 {px:workEntry,py:(workEntryStart+frostEnd)/2,w:1.2,d:frostEnd-workEntryStart,finish:'frost'},
];
export const entrances=[{id:'main',name:'201 室入口',a:[215,1060],b:[215,1153]},{id:'end',name:'紧急出口',a:[510,1690],b:[582,1690]}];
export const adjustedWalls=[
 [[680,partnerWall78],[830,partnerWall78]],
 [[680,partnerWall89],[830,partnerWall89]],
 [[550,teaRoom.bounds[3]],[592,teaRoom.bounds[3]]],
];
// Opening lengths are traced approximately from the photographed annotations.
export const partner3Window={axis:'v',line:830,start:455,end:608,kind:'floor'};
export const partner4Window={axis:'v',line:830,start:642,end:771,kind:'floor'};
export const partner5Window={axis:'v',line:830,start:779,end:908,kind:'floor'};
export const partner6Windows=[[916,944],[971,1043]].map(([start,end])=>({axis:'v',line:830,start,end,kind:'floor'}));
export const partner7Window={axis:'v',line:830,start:1050,end:1177,kind:'floor'};
export const partner8Window={axis:'v',line:830,start:1186,end:1329,kind:'floor'};
export const partner9Window={axis:'v',line:830,start:1338,end:1491,kind:'floor'};
export const partner10Window={axis:'v',line:830,start:1500,end:1679,kind:'floor'};
export const meetingWindow={axis:'h',line:220,start:274,end:446,kind:'floor'};
export const teaWindow={axis:'h',line:220,start:478,end:591,kind:'floor'};
export const partner2Windows=[{axis:'h',line:220,start:604,end:787,kind:'floor'},{axis:'v',line:830,start:251,end:436,kind:'floor'}];
export const floorWindows=[
meetingWindow,teaWindow,...partner2Windows,
{axis:'v',line:830,start:305,end:353,kind:'floor'},
partner3Window,partner4Window,partner5Window,...partner6Windows,partner7Window,partner8Window,partner9Window,partner10Window];
const regularWindows=[...rooms.filter(q=>q.bounds[2]===830&&q!==partner3Room&&q!==partner6Room).map(q=>({axis:'v',line:830,start:q.bounds[1]+25,end:q.bounds[3]-25,kind:'regular'})),...[[625,800]].map(([start,end])=>({axis:'h',line:220,start,end,kind:'regular'}))];
// Split ordinary glazing where a marked full-height panel takes precedence.
export const windowOpenings=[];
for(const [axis,line] of [['v',830],['h',220]]){const all=[...regularWindows,...floorWindows].filter(w=>w.axis===axis&&w.line===line),ends=[...new Set(all.flatMap(w=>[w.start,w.end]))].sort((a,b)=>a-b);for(let i=0;i<ends.length-1;i++){const start=ends[i],end=ends[i+1],mid=(start+end)/2,matches=all.filter(w=>mid>=w.start&&mid<=w.end);if(!matches.length)continue;const kind=matches.some(w=>w.kind==='floor')?'floor':'regular';const prev=windowOpenings.at(-1);if(prev&&prev.axis===axis&&prev.line===line&&prev.end===start&&prev.kind===kind)prev.end=end;else windowOpenings.push({axis,line,start,end,kind});}}
export function windowProfile(kind,opening) {
 if (kind!=='floor') return {sill:.72,top:2.35};
 const reachesCeiling=[partner3Window,partner4Window,partner5Window,...partner6Windows,partner7Window,partner8Window,partner9Window,partner10Window,meetingWindow,teaWindow,...partner2Windows].some(w=>opening?.axis===w.axis && opening.line===w.line && opening.start===w.start && opening.end===w.end);
 return {sill:.055,top:HEIGHT-(reachesCeiling ? .06 : .45)};
}
export const allPlaces=[...zones,...rooms.filter(r=>r.type!=='stairs')];
export function wallSegments(){const raw=[],gaps=[];const add=(a,b,outer=false)=>raw.push({a,b,outer});for(let i=0;i<FOOTPRINT.length;i++)add(FOOTPRINT[i],FOOTPRINT[(i+1)%FOOTPRINT.length],true);
for(const q of rooms){const [l,t,r,b]=q.bounds;add([l,t],[r,t]);add([r,t],[r,b]);add([r,b],[l,b]);add([l,b],[l,t]);if(q.door){const {side,gap:[a,c]}=q.door;gaps.push(side==='left'||side==='right'?{axis:'v',line:side==='left'?l:r,start:a,end:c}:{axis:'h',line:side==='top'?t:b,start:a,end:c});}}
add(openSide.a,openSide.b);
const [,archiveStart,archiveEntry,archiveEnd]=archiveRoom.bounds;
gaps.push({axis:'v',line:archiveEntry,start:archiveStart,end:archiveEnd});
gaps.push({axis:'v',line:receptionWorkDoor.line,start:receptionWorkDoor.gap[0],end:receptionWorkDoor.gap[1]});
for(const e of entrances)gaps.push({axis:e.a[0]===e.b[0]?'v':'h',line:e.a[0]===e.b[0]?e.a[0]:e.a[1],start:e.a[0]===e.b[0]?e.a[1]:e.a[0],end:e.a[0]===e.b[0]?e.b[1]:e.b[0]});
const groups=new Map();for(const s of raw){const axis=s.a[0]===s.b[0]?'v':'h',i=axis==='v'?0:1,j=1-i,line=s.a[i],start=Math.min(s.a[j],s.b[j]),end=Math.max(s.a[j],s.b[j]),key=axis+line;if(!groups.has(key))groups.set(key,[]);groups.get(key).push({axis,line,start,end,outer:s.outer});}
const out=[];for(const spans of groups.values()){spans.sort((a,b)=>a.start-b.start);const merged=[];for(const s of spans){const p=merged.at(-1);if(p&&s.start<=p.end){p.end=Math.max(p.end,s.end);p.outer ||= s.outer;}else merged.push({...s});}for(const s of merged){let pieces=[[s.start,s.end]];for(const g of gaps.filter(g=>g.axis===s.axis&&g.line===s.line))pieces=pieces.flatMap(([a,b])=>g.end<=a||g.start>=b?[[a,b]]:[[a,Math.min(b,g.start)],[Math.max(a,g.end),b]].filter(([a,b])=>b>a));if(s.axis==='h'&&(s.line===archiveStart||s.line===archiveEnd)){
 pieces=pieces.flatMap(([a,b])=>a<archiveEntry&&archiveEntry<b?[[a,archiveEntry],[archiveEntry,b]]:[[a,b]]);
}
if(s.axis==='h'&&s.line===partner3Room.bounds[1]){
 const corner=partner3Room.bounds[0];
 pieces=pieces.flatMap(([a,b])=>a<corner&&corner<b?[[a,corner],[corner,b]]:[[a,b]]);
}
if(s.axis==='v'&&s.line===partner5Room.bounds[0]){
 for(const boundary of [partner5Room.bounds[1],partner6Room.bounds[3]]) {
  pieces=pieces.flatMap(([a,b])=>a<boundary&&boundary<b?[[a,boundary],[boundary,b]]:[[a,b]]);
 }
}
for(const [a,b] of pieces)out.push({a:s.axis==='v'?[s.line,a]:[a,s.line],b:s.axis==='v'?[s.line,b]:[b,s.line],outer:s.outer});}}return out;}
export function workWallFinish({a,b}) {
 const vertical = a[0] === b[0], axis = vertical ? 'v' : 'h';
 const line = a[vertical ? 0 : 1], i = vertical ? 1 : 0;
 return workGlazing.find(g => g.axis === axis && g.line === line && a[i] >= g.start && b[i] <= g.end);
}
export function inside(px,py){let yes=false;for(let i=0,j=FOOTPRINT.length-1;i<FOOTPRINT.length;j=i++){const a=FOOTPRINT[i],b=FOOTPRINT[j];if((a[1]>py)!==(b[1]>py)&&px<(b[0]-a[0])*(py-a[1])/(b[1]-a[1])+a[0])yes=!yes;}return yes;}
export function doorPoint(q,inset=24){const [l,t,r,b]=q.bounds,{side,gap}=q.door,v=(gap[0]+gap[1])/2;return side==='left'?[l+inset,v]:side==='right'?[r-inset,v]:side==='top'?[v,t+inset]:[v,b-inset];}
