// Photo-based reception and lounge, kept in the original plan coordinates.
// The small stepped boxes deliberately preserve the tour's voxel vocabulary.
export const receptionColors={oak:'#bb935d',oakLight:'#d1b180',oakDark:'#967348',marble:'#eeeae3',vein:'#aeb3b2',carpet:'#8c9092',leather:'#353d40',cushion:'#4b4441',black:'#252b2c',white:'#f0eee7',plant:'#47764c',plantLight:'#64864f',clay:'#a44b3e',gold:'#cfab5b'};
export const receptionObjects=[];let zone='desk';
const b=(px,py,w,d,h,mat='oak',base=0,solid=false,kind='detail',extra={})=>receptionObjects.push({px,py,w,d,h,mat,base,solid,kind,zone,...extra});
// White backing and individual oak battens on the brand wall.
b(476,1079,3,124,2.74,'white',.025,true,'backdrop',{cutaway:true});
for(let py=1018;py<=1140;py+=3.7)b(473.3,py,3.4,1.9,2.71,'oakLight',.04,false,'batten',{cutaway:true});
// A slatted base with a stepped diagonal marble apron, as in the photo.
b(423,1092,34,96,.06,'black',0);
b(423,1092,33,96,.93,'oak',.06,true,'desk');
for(let py=1045;py<=1139;py+=3.6)b(405.5,py,2,1.8,.91,'oakDark',.08);
b(423,1092,35,98,.045,'oakLight',1.0);
b(423,1102,35,78,.045,'marble',1.045);
for(let i=0;i<26;i++){const h=.25+i*.028;b(403.9,1063+i*3,1.3,3.1,h,'marble',1.075-h);}
// Tray, small red mascot, and three vessels on the counter.
b(418,1054,24,18,.035,'white',1.05);for(let py=1047;py<=1061;py+=3)b(418,py,24,.65,.07,'white',1.05);
b(414,1104,9,8,.12,'black',1.09);b(414,1104,8,8,.15,'clay',1.21);b(414,1104,5,5,.08,'clay',1.36);b(414,1104,9,3,.035,'black',1.4);
for(const [py,s] of [[1119,5],[1128,5],[1136,4]]){b(416,py,s,s,.11,'oakDark',1.09);b(416,py,s+1,s+1,.025,'black',1.2);}
// The white open cabinet at the right end of the counter.
for(const py of [1141,1163])b(456,py,26,1.5,2.14,'white',0,false,'cabinet',{cutaway:true});
b(468,1152,1.5,23,2.14,'white',0,false,'cabinet',{cutaway:true});
for(const y of [.03,.54,1.06,1.59,2.11])b(456,1152,26,23,.05,'white',y,y===.03,'shelf');
for(const [py,y,s] of [[1147,.62,5],[1158,1.15,4],[1149,1.69,6]]){b(453,py,s,s,.2,'white',y);b(453,py,s*.6,s*.6,.08,'gold',y+.2);}
// Black ceiling track, four square spotlights, and their luminous faces.
b(416,1080,2.4,137,.055,'black',2.71,false,'track',{overhead:true});
for(const py of [1028,1063,1098,1133]){b(416,py,2,2,.1,'black',2.61,false,'light',{overhead:true});b(416,py,6,7,.19,'black',2.43,false,'light',{overhead:true});b(416,py,5,6,.015,'white',2.425,false,'light',{overhead:true});}
function plant(px,py,tall=false){b(px,py,tall?17:15,tall?17:15,tall?.58:.39,'white',0,false,'planter');const stem=tall?.9:.35;b(px,py,2.5,2.5,stem,'oakDark',tall?.5:.36);for(let i=0;i<7;i++){const a=i*Math.PI*2/7,r=tall?11:8;b(px+Math.cos(a)*r,py+Math.sin(a)*r,7,6,tall?.14:.12,i%2?'plantLight':'plant',(tall?.87:.59)+i*.055);}if(tall){b(px+6,py,11,7,.22,'plant',1.52);b(px-5,py+2,8,10,.23,'plantLight',1.38);}}
plant(449,1012);plant(397,1148,true);plant(411,1145);
zone='waiting';
// Wood panel behind the single chair; black divisions reflect the real panel.
b(345,883,112,3,2.72,'oak',.025,false,'wood-panel',{cutaway:true});
for(const px of [289,345,401])b(px,885,1.5,1.5,2.72,'black',.025,false,'trim',{cutaway:true});b(345,885,112,1.5,.035,'black',2.02);
// Two-seat charcoal sofa facing the open reception.
b(315,970,34,77,.14,'black',.12,false,'sofa');
for(const py of [951,989]){b(318,py,30,36,.2,'leather',.26,true,'sofa');b(302,py,7,36,.53,'leather',.37);b(308,py,6,22,.33,'cushion',.48);}
for(const py of [929,1011])b(314,py,37,7,.5,'leather',.25);
for(const px of [301,328])for(const py of [935,1004])b(px,py,2,2,.16,'black');
// Matching single armchair, with its back against the wood panel.
b(352,917,35,34,.17,'black',.13,false,'sofa');b(352,919,31,30,.2,'leather',.28,true,'sofa');b(352,901,35,7,.53,'leather',.39);for(const px of [333,371])b(px,918,6,36,.47,'leather',.27);b(352,908,23,7,.3,'cushion',.51);
// Two stepped round marble tables with black legs, at different heights.
function roundTable(px,py,r,h){for(let i=-4;i<=4;i++){const dy=i*r/4.5,half=Math.sqrt(Math.max(0,r*r-dy*dy));b(px,py+dy,half*2,r/4.5+.15,.055,'marble',h,true,'table');}for(let i=0;i<10;i++){const a=i*Math.PI/5;b(px+Math.cos(a)*r*.81,py+Math.sin(a)*r*.81,1.2,1.2,h-.03,'black',.03);}b(px,py,9,9,.035,'black');}
roundTable(363,971,20,.42);roundTable(376,997,14,.31);
// Dark side table and yellow flowers between the sofa and armchair.
b(308,916,23,20,.055,'black',.46,false,'table');for(const px of [299,317])for(const py of [909,923])b(px,py,1.2,1.2,.46,'black');b(308,916,6,6,.16,'white',.52);for(let i=0;i<6;i++)b(305+(i%3)*3,913+Math.floor(i/3)*4,4,4,.06,'gold',.69+i*.012);
plant(306,1028);
export const receptionDecals=[
{id:'brand',px:470.8,py:1078,y:2.04,width:2.43,height:.62,normal:'front',zone:'desk'},
{id:'team',px:351,py:1160.5,y:1.76,width:1.7,height:.85,normal:'north',zone:'desk'},
{id:'calligraphy',px:294.1,py:970,y:1.92,width:1.85,height:.66,normal:'back',zone:'waiting'},
{id:'banner',px:351,py:887,y:1.8,width:.54,height:.97,normal:'south',zone:'waiting'}];
