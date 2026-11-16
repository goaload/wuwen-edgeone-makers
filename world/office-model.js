import {floorSections,rooms,archiveRoom,financeRoom,partner3Room,partner4Room,partner5Room,partner6Room,partner8Room,partner9Room,partner10Room,partner2Room,partner11Room,partner12Room,partner13Room,talk1Room,talk2Room,talkCorridor,entrances,wallSegments,toWorld,SCALE,HEIGHT,windowOpenings,windowProfile,workWallFinish,workDoorways,workDoorLeaves,receptionWorkDoor} from '../plan.js';
import {objects} from '../furniture.js';
import {receptionColors} from '../reception.js';
import {workplaceColors} from '../workplace.js';
import {partner7Colors} from '../partner7.js';
import {talk1Colors} from '../talk-rooms.js';
export const palette={wood:'#c6a576',floor:'#d6c7ab',stone:'#9da49d',dark:'#333e40',pale:'#edece1',blue:'#596b6c',red:'#a36b50',green:'#6d8c54',leaf:'#8da86b',hall:'#c9cac0',glass:'#a8cbd7',ceiling:'#f5f4ef',tileCeiling:'#deded9',light:'#fff8e4',...receptionColors,...workplaceColors,...partner7Colors,...talk1Colors};
export const boxes=[];
function box(px,py,w,d,h,mat='wood',y=0,group='static',extra={}){const [x,z]=toWorld(px,py);const b={x,z,y,w:d/SCALE,d:w/SCALE,h,mat,group,...extra};boxes.push(b);return b;}
for(const [l,t,r,b] of floorSections) {
 const px=(l+r)/2, py=(t+b)/2;
 box(px,py,r-l+4,b-t+4,.26,'stone',-.26);
 box(px,py,r-l,b-t,.025,'workCarpet');
 box(px,py,r-l,b-t,.16,'ceiling',HEIGHT,'officeCeiling',{roof:true});
}
for (const o of objects) {
 const extraHeight = HEIGHT - 2.9;
 const tallFinish = ['backdrop', 'batten', 'wood-panel', 'trim'].includes(o.kind) && o.h > 2.7;
 const height = o.h + (tallFinish ? extraHeight : 0);
 const base = o.base + .025 + (o.overhead ? extraHeight + .08 : 0);
 box(o.px, o.py, o.w, o.d, height, o.mat, base,
   o.overhead ? 'officeCeiling' : o.cutaway ? 'officeUpper' : 'static',
   {cutaway: !!o.cutaway, color: o.color, glass: o.glass, emissive: o.overhead && o.mat === 'white' ? 1 : 0});
}
export const ceilingLights = [];
function ceilingLight(px, py, w, d) {
 box(px, py, w + 3, d + 3, .035, 'white', HEIGHT - .035, 'officeCeiling');
 box(px, py, w, d, .015, 'light', HEIGHT - .05, 'officeCeiling', {emissive: 1});
 ceilingLights.push(toWorld(px, py));
}
for (const q of rooms) {
 if(q===archiveRoom||q===partner3Room||q===partner4Room||q===partner5Room||q===partner6Room||q===partner2Room||q===partner11Room||q===partner12Room||q===financeRoom||q===partner13Room||q===partner8Room||q===partner9Room||q===partner10Room||q.id==='partner7'||q.type==='talk'||q.type==='meeting'||q.type==='tea') continue;
 const [l, t, r, b] = q.bounds;
 const length = b - t;
 const count = Math.max(1, Math.round(length / 135));
 for (let i = 0; i < count; i++) ceilingLight((l + r) / 2, t + length * (i + .5) / count, 48, 19);
}
for (const [px, py] of [[355, 1094], [352, 945]]) ceilingLight(px, py, 40, 20);
const officeTop = 'officeCeiling';
function tiledCeiling(l,t,r,b,cols,rows) {
 const w=(r-l)/cols, d=(b-t)/rows, y=HEIGHT-.012;
 box((l+r)/2,(t+b)/2,r-l,b-t,.01,'tileCeiling',y,officeTop);
 for(let i=1;i<cols;i++) box(l+i*w,(t+b)/2,.52,b-t,.012,'vent',y-.008,officeTop);
 for(let i=1;i<rows;i++) box((l+r)/2,t+i*d,r-l,.52,.012,'vent',y-.008,officeTop);
 return (column,row) => [l+(column+.5)*w,t+(row+.5)*d];
}
function grille(px,py) {
 box(px,py,22,22,.019,'printerWhite',HEIGHT-.035,officeTop);
 box(px,py,19,19,.01,'vent',HEIGHT-.043,officeTop);
 for (let i=-3;i<=3;i++) box(px+i*2.5,py,1,18,.006,'printerWhite',HEIGHT-.049,officeTop);
}
const aisleTile=tiledCeiling(620,450,680,1690,2,44);
for(let row=2;row<43;row+=3) {
 ceilingLight(...aisleTile(0,row),26,25);
 if(row%6===2) grille(...aisleTile(0,row+1));
}
tiledCeiling(485,1640,620,1690,5,2);
const workTile=tiledCeiling(485,880,620,1245,5,13);
for (const row of [1,4,7,10,12]) ceilingLight(...workTile(2,row),24,25);
grille(...workTile(2,8));
const archiveTile=tiledCeiling(...archiveRoom.bounds,4,2);
ceilingLight(...archiveTile(1,0),21,21);
const partner3Tile=tiledCeiling(...partner3Room.bounds,5,7);
ceilingLight(...partner3Tile(2,3),25,25);
grille(...partner3Tile(1,2));
const partner4Tile=tiledCeiling(...partner4Room.bounds,5,5);
ceilingLight(...partner4Tile(2,2),25,25);
const partner5Tile=tiledCeiling(...partner5Room.bounds,5,5);
ceilingLight(...partner5Tile(2,2),25,25);
const partner6Tile=tiledCeiling(...partner6Room.bounds,5,5);
ceilingLight(...partner6Tile(2,2),25,25);
const partner7Tile=tiledCeiling(...rooms.find(q=>q.id==='partner7').bounds,5,5);
ceilingLight(...partner7Tile(2,2),24,24);
const partner8Tile=tiledCeiling(...partner8Room.bounds,5,5);
ceilingLight(...partner8Tile(2,2),25,25);
const partner9Tile=tiledCeiling(...partner9Room.bounds,5,5);
ceilingLight(...partner9Tile(1,2),25,25);
const partner10Tile=tiledCeiling(...partner10Room.bounds,5,6);
ceilingLight(...partner10Tile(2,2),25,25);
const partner11Tile=tiledCeiling(...partner11Room.bounds,5,7);
for(const row of [1,5]) ceilingLight(...partner11Tile(2,row),23,24);
const partner12Tile=tiledCeiling(...partner12Room.bounds,5,7);
for(const row of [1,5]) ceilingLight(...partner12Tile(2,row),23,24);
const financeTile=tiledCeiling(...financeRoom.bounds,5,6);
ceilingLight(...financeTile(2,2),24,24);
const partner13Tile=tiledCeiling(...partner13Room.bounds,5,6);
ceilingLight(...partner13Tile(2,2),24,24);
grille(...partner13Tile(2,4));
const partner2Tile=tiledCeiling(...partner2Room.bounds,8,8);
for(const col of [2,5]) for(const row of [2,5]) ceilingLight(...partner2Tile(col,row),25,25);
grille(...partner2Tile(4,4));
const meetingTile=tiledCeiling(...rooms.find(q=>q.type==='meeting').bounds,6,13);
for(const row of [2,6,10]) ceilingLight(...meetingTile(2,row),25,25);
for(const row of [3,9]) grille(...meetingTile(2,row));
const teaTile=tiledCeiling(...rooms.find(q=>q.type==='tea').bounds,5,8);
for(const row of [2,6]) ceilingLight(...teaTile(2,row),24,24);
grille(...teaTile(3,5));
const talk1Tile=tiledCeiling(...talk1Room.bounds,5,6);
ceilingLight(...talk1Tile(2,2),24,24);
grille(...talk1Tile(3,4));
const talk2Tile=tiledCeiling(...talk2Room.bounds,5,5);
ceilingLight(...talk2Tile(2,2),24,24);
const [hallLeft,,hallRight]=talkCorridor.bounds;
const talkHallTile=tiledCeiling(...talkCorridor.bounds,2,10);
for(const row of [2,6,9]) ceilingLight((hallLeft+hallRight)/2,talkHallTile(0,row)[1],25,25);
for(const row of [4,8]) grille((hallLeft+hallRight)/2,talkHallTile(0,row)[1]);
box(486,1080,2.7,167,.085,'black');
box(487,1205,2.7,80,.085,'black');

function wall(a,b,base=0,height=HEIGHT,glass=false){if(height<.002)return;const horizontal=a[1]===b[1],w=horizontal?Math.abs(b[0]-a[0])+3:7,d=horizontal?7:Math.abs(b[1]-a[1])+3,px=(a[0]+b[0])/2,py=(a[1]+b[1])/2;
 if(glass){box(px,py,w,d,height,'glass',base,'glazing',{glass:true});return;}
 const low=Math.max(0,Math.min(height,.88-base));if(low)box(px,py,w,d,low,'white',base,'static',{wall:true});if(height>low)box(px,py,w,d,height-low,'white',base+low,'officeUpper',{wall:true});
}
const upper='officeUpper';
function blindPartition({a,b},panes) {
 const horizontal = a[1] === b[1];
 const point = along => horizontal ? [along,a[1]] : [a[0],along];
 const i=horizontal?0:1, length=b[i]-a[i];
 const panel=(pos,span,thick,y,h,mat,group=upper,extra={}) =>
  box(...point(pos),horizontal?span:thick,horizontal?thick:span,h,mat,y,group,extra);
 const mid=(a[i]+b[i])/2;
 panel(mid,length+2,4,0,.88,'blind','static',{wall:true});
 panel(mid,length+2,4,.88,HEIGHT-.88,'blind');
 panel(mid,length+2,4.7,0,.05,'black');
 panel(mid,length+2,4.7,HEIGHT-.06,.06,'black');
 const count=panes??Math.max(1,Math.round(length/41));
 for(let j=0;j<=count;j++) panel(a[i]+length*j/count,2.1,4.7,0,HEIGHT,'black');
}
const doorHead=2.45;
for(const {line,gap:[a,b],inward,label,hingeAtEnd,horizontal} of [...workDoorways,receptionWorkDoor]) {
 const mid=(a+b)/2;
 const piece=(normal,along,thickness,length,h,mat,base,extra) =>
  horizontal?box(along,normal,length,thickness,h,mat,base,upper,extra):
   box(normal,along,thickness,length,h,mat,base,upper,extra);
 piece(line,mid,2,b-a,HEIGHT-doorHead,'glass',doorHead,{glass:true});
 for(const edge of [a,hingeAtEnd?b-4.3:b]) piece(line,edge,4.7,2.1,HEIGHT,'black',0);
 for(const y of [doorHead,HEIGHT-.06]) piece(line,mid,4.7,b-a,.06,'black',y);
 if (label) {
  const plaque=horizontal?b+4:a+5;
  piece(line-inward*2.7,plaque,1.2,4,.24,'oakLight',1.70);
  for (let i=0;i<3;i++) piece(line-inward*3.5,plaque,.4,1.6,.012,'oakDark',1.76+i*.039);
 }
}
// The entrance has a timber jamb panel, a clear door held open toward
// the office, and a frosted leaf in the same plane as the partition.
const {line:entryX,gap:[entryStart,entryEnd],oakWidth}=receptionWorkDoor;
const oakY=entryEnd+oakWidth/2;
box(entryX,(entryStart+entryEnd)/2,3,entryEnd-entryStart,.014,'metal',.021);
box(entryX+3.2,oakY,.85,oakWidth,HEIGHT,'oakLight',0,upper);
for(const py of [entryEnd,entryEnd+oakWidth]) box(entryX+3.55,py,1.1,1.3,HEIGHT,'black',0,upper);
for(const y of [0,doorHead,HEIGHT-.06]) box(entryX+3.55,oakY,1.1,oakWidth,.06,'black',y,upper);
for (const {px,py,w,d,handle,finish,horizontal} of workDoorLeaves) {
 const leafHeight=doorHead-.07;
 if (finish === 'frost') {
  box(px,py,w,d-1,leafHeight,'frost',.035,upper);
  box(px,py+d/2-.6,w+.5,1.2,leafHeight,'black',.035,upper);
  for(const side of [-1,1]) box(px+side*1.6,py+d/2-3,1.5,1.3,.74,'black',.82,upper);
 } else if (finish === 'clear') {
  box(px,py,w,d,leafHeight,'glass',.035,upper,{glass:true});
  for(const side of [-1,1]) {
   const x=px+w/2-3, z=py+side*1.55;
   box(x,z,1.5,1.5,.74,'black',.82,upper);
   for(const y of [.83,1.52]) box(x,py,1.5,3.3,.045,'black',y,upper);
  }
 } else {
  const length=horizontal?d:w,thickness=horizontal?w:d;
  const leafPart=(offset,span,depth,h,mat,base)=>
   horizontal?box(px,py+offset,depth,span,h,mat,base,upper):
    box(px+offset,py,span,depth,h,mat,base,upper);
  leafPart(0,length-1.6,thickness,leafHeight,'frost',.035);
  for(const end of [-1,1]) leafPart(end*(length/2-.6),1.2,thickness+.6,leafHeight,'black',.035);
  leafPart(handle*(length/2-4),2.4,thickness+2.2,.11,'black',.98);
 }
}
for(const s of wallSegments()){const finish=workWallFinish(s);if(finish){blindPartition(s,finish.panes);continue;}const vertical=s.a[0]===830&&s.b[0]===830,top=s.a[1]===220&&s.b[1]===220;if(!vertical&&!top){wall(s.a,s.b);continue;}const axis=vertical?1:0,start=Math.min(s.a[axis],s.b[axis]),end=Math.max(s.a[axis],s.b[axis]),point=v=>vertical?[830,v]:[v,220];let cursor=start;
 for(const o of windowOpenings.filter(w=>w.axis===(vertical?'v':'h')).sort((a,b)=>a.start-b.start)){const a=Math.max(start,o.start),b=Math.min(end,o.end);if(b<=a)continue;if(a>cursor)wall(point(cursor),point(a));const {sill,top}=windowProfile(o.kind,o);wall(point(a),point(b),0,sill);wall(point(a),point(b),top,HEIGHT-top);wall(point(a),point(b),sill,top-sill,true);for(const v of [a,b]){const p=point(v);box(...p,2.2,2.2,top-sill,'black',sill,'glazing');}cursor=b;}if(cursor<end)wall(point(cursor),point(end));
}
for(const q of rooms.filter(q=>q.door&&!workDoorways.some(d=>d.label===q.name))){
 const {side,gap:[a,b]}=q.door,[l,t,r,bt]=q.bounds,vert=side==='left'||side==='right',px=vert?(side==='left'?l:r):(a+b)/2,py=vert?(a+b)/2:(side==='top'?t:bt);
 if(q.type==='tea'||q.type==='meeting'){
  box(px,py,vert?2:b-a,vert?b-a:2,HEIGHT-doorHead,'glass',doorHead,upper,{glass:true});
  for(const edge of [a,b]) box(vert?px:edge,vert?edge:py,vert?6:2.2,vert?2.2:6,HEIGHT,'black',0,upper);
  for(const y of [doorHead,HEIGHT-.06]) box(px,py,vert?6:b-a,vert?b-a:6,.06,'black',y,upper);
 }else box(px,py,vert?7:b-a,vert?b-a:7,HEIGHT-doorHead,'white',doorHead,upper);
}
// Both exterior entries are closed. The far entry sits flush with the oak wall.
for (const {id, a, b} of entrances) {
 const horizontal = a[1] === b[1];
 const axis = horizontal ? 0 : 1;
 const length = b[axis] - a[axis];
 const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
 if(id==='end') {
  const [left,y]=a;
  const doorHeight=2.23;
  box(mid[0],y-2.3,length,3,doorHeight,'partnerOak',0,'static',{entry:true});
  box(mid[0],y-2.3,length,3,HEIGHT-doorHeight,'partnerOak',doorHeight,upper,{cutaway:true});
  box(mid[0],y-4.0,length,.55,.023,'oakDark',doorHeight-.018,upper,{cutaway:true});
  for(const x of [left+.3,mid[0],b[0]-.3]) {
   box(x,y-4.0,.45,.6,doorHeight,'oakDark',0,upper,{cutaway:true});
  }
  for(const dx of [-3,3]) box(mid[0]+dx,y-4.4,1.2,1.2,.19,'metal',1.06,upper,{cutaway:true});
  for(const x of [left+2,b[0]-2]) for(const base of [.31,1.82]) {
   box(x,y-4.0,1.05,.65,.088,'black',base,upper,{cutaway:true});
  }
  continue;
 }
 wall(a,b,2.55,HEIGHT-2.55);
 box(...mid, horizontal ? length : 2.4, horizontal ? 2.4 : length, 2.51, 'glass', .035, 'glazing', {glass: true, entry: true});
 box(...mid, horizontal ? length : 3, horizontal ? 3 : length, .045, 'black', 2.51, 'glazing');
 box(...mid, horizontal ? length : 3, horizontal ? 3 : length, .035, 'black', 0, 'glazing');
 for (const p of [a, mid, b]) box(...p, 2.3, 2.3, 2.55, 'black', 0, 'glazing');
 box(...mid, horizontal ? 11 : 4, horizontal ? 4 : 11, .035, 'black', 1.03, 'glazing');
}
export const textureFor=mat=>({blind:'office_blind',mesh:'office_mesh',deskOak:'desk_oak',talkOak:'talk_oak',partnerOak:'partner_oak',partnerDesk:'partner_desk',workCarpet:'work_carpet',tileCeiling:'white',wood:'oak',floor:'wood_floor',hall:'greige_floor',stone:'concrete',dark:'steel',black:'black_metal',blue:'chair_mesh',pale:'white',white:'plaster',ceiling:'white',light:'paint',oak:'oak',oakLight:'maple',oakDark:'walnut',carpet:'linen',marble:'white',vein:'concrete',leather:'leather',cushion:'velvet',plant:'foliage',plantLight:'foliage',green:'foliage',leaf:'foliage',clay:'terracotta',gold:'paint'}[mat]||'paint');
