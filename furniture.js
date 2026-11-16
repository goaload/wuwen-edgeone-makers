import {archiveObjects} from './archive.js';
import {financeObjects} from './finance.js';
import {partner13Objects} from './partner13.js';
import {hallEndObjects} from './hall-end.js';
import {rooms} from './plan.js';
import {receptionObjects} from './reception.js';
import {workplaceObjects} from './workplace.js';
import {teaObjects} from './tea-room.js';
import {talk1Objects,talk2Objects,talkCorridorObjects} from './talk-rooms.js';
import {meetingObjects} from './meeting.js';
import {partner2Objects} from './partner2.js';
import {partner12Objects} from './partner12.js';
import {partner11Objects} from './partner11.js';
import {partner3Objects} from './partner3.js';
import {partner4Objects} from './partner4.js';
import {partner5Objects} from './partner5.js';
import {partner6Objects} from './partner6.js';
import {partner7Objects} from './partner7.js';
import {partner10Objects} from './partner10.js';
import {partner8Objects} from './partner8.js';
import {partner9Objects} from './partner9.js';
// Box-based furniture in the same drawing coordinates as the traced plan.
export const objects=[];
const b=(px,py,w,d,h,mat='wood',base=0,solid=false,kind='detail')=>objects.push({px,py,w,d,h,mat,base,solid,kind});
function chair(x,y,dir=0){b(x,y,19,19,.12,'blue',.42,true,'chair');const dx=Math.sin(dir)*8,dy=Math.cos(dir)*8;b(x+dx,y+dy,Math.abs(dx)>4?4:20,Math.abs(dx)>4?20:4,.46,'blue',.48);for(const sx of [-6,6])for(const sy of [-6,6])b(x+sx,y+sy,2,2,.42,'dark');}
function desk(x,y,w=42,d=68,screen=true){b(x,y,w,d,.11,'wood',.73,true,'desk');for(const sx of [-w/2+4,w/2-4])for(const sy of [-d/2+4,d/2-4])b(x+sx,y+sy,3,3,.73,'dark');if(screen){b(x,y-12,24,3,.37,'dark',.87);b(x,y-12,3,3,.12,'dark',.79);b(x,y+3,22,7,.02,'pale',.79);b(x+12,y+13,8,11,.03,'red',.8);}}
function plant(x,y){b(x,y,15,15,.29,'red');b(x,y,4,4,.45,'wood',.25);b(x,y,27,23,.38,'green',.55);b(x+5,y-2,18,18,.26,'leaf',.87);}
for(const r of rooms){const [l,t,rr,bb]=r.bounds,cx=(l+rr)/2,cy=(t+bb)/2;
 if(r.id==='partner2'){objects.push(...partner2Objects);continue;}
 if(r.id==='partner12'){objects.push(...partner12Objects);continue;}
 if(r.id==='finance'){objects.push(...financeObjects);continue;}
 if(r.id==='partner13'){objects.push(...partner13Objects);continue;}
 if(r.id==='partner11'){objects.push(...partner11Objects);continue;}
 if(r.id==='partner10'){objects.push(...partner10Objects);continue;}
 if(r.id==='partner8'){objects.push(...partner8Objects);continue;}
 if(r.id==='partner9'){objects.push(...partner9Objects);continue;}
 if(r.id==='partner3'){objects.push(...partner3Objects);continue;}
 if(r.id==='partner4'){objects.push(...partner4Objects);continue;}
 if(r.id==='partner5'){objects.push(...partner5Objects);continue;}
 if(r.id==='partner6'){objects.push(...partner6Objects);continue;}
 if(r.id==='partner7'){objects.push(...partner7Objects);continue;}
 if(r.type==='partner'){const x=cx,y=cy;desk(x,y);const east=l>=680;chair(x+(east?36:-36),y,east?Math.PI/2:-Math.PI/2);chair(x+(east?-34:34),y-19,east?-Math.PI/2:Math.PI/2);chair(x+(east?-34:34),y+19,east?-Math.PI/2:Math.PI/2);plant(rr-18,t+20);
 }else if(r.type==='archive'){objects.push(...archiveObjects);
 }else if(r.type==='meeting'){objects.push(...meetingObjects);
 }else if(r.type==='tea'){objects.push(...teaObjects);
 }else if(r.id==='talk1'){objects.push(...talk1Objects);
 }else if(r.id==='talk2'){objects.push(...talk2Objects);
 }else if(r.type==='stairs'){for(let i=0;i<10;i++)b(350,t+9+i*16,250,14,.07,'stone',.03,false,'step');b(350,cy,250,4,.1,'dark',.15);
 }}
// Reception and lounge follow the four supplied photographs.
objects.push(...receptionObjects);chair(455,1091,Math.PI/2);
objects.push(...workplaceObjects,...talkCorridorObjects,...hallEndObjects);
plant(652,490);
