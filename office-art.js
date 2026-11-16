import {partner13Room,workDoorLeaves} from './plan.js';
import {receptionDecals} from './reception.js';
import {receptionArtwork} from './reception-art-paths.js';

const partner13Door=workDoorLeaves.find(leaf=>leaf.id===partner13Room.id);
export const officeDecals=[
  ...receptionDecals,
  {id:'partner13Peace',px:partner13Door.px,py:partner13Door.py+partner13Door.d/2+.07,y:1.55,width:.36,height:.38,normal:'south'},
  {id:'partner10SailingShip',px:756,py:1686.25,y:1.92,width:.87,height:.94,normal:'north'},
  {id:'hallGrapes',px:664,py:1684.85,y:1.64,width:.54,height:1.21,normal:'north'},
  {id:'hallExit',px:548,py:1685.11,y:2.71,width:.30,height:.13,normal:'north'},
  {id:'partner2Screen',px:608.15,py:373,y:.98,width:.65,height:1.88,normal:'back'},
  {id:'talk2Calligraphy',px:274,py:783,y:2.06,width:.73,height:1.28,normal:'back'},
  {id:'talk1Calligraphy',px:274,py:667,y:2.34,width:1.8,height:.78,normal:'back'},
  {id:'teaMountains',px:589,py:335,y:.94,width:3.15,height:1.84,normal:'front'},
  {id:'teaCalligraphy',px:530,py:230.3,y:.465,width:1.65,height:.44,normal:'south'},
  {id:'meetingDisplays',px:274,py:402,y:1.99,width:7.6,height:1.62,normal:'back'},
  {id:'meetingCalligraphy',px:339,py:588.9,y:2.48,width:1.91,height:.47,normal:'north'},
];
const red='#96333b', ink='#342e30', paper='#f6ebdf';
const rect=(x,y,w,h,fill,stroke='none',rx=0)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="3"/>`;
const label=(x,y,size,value,color=red)=>`<text x="${x}" y="${y}" font-size="${size}" fill="${color}">${value}</text>`;
const svg=(w,h,content)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><g font-family="Noto Sans CJK SC, sans-serif" text-anchor="middle" font-weight="700">${content}</g></svg>`;
function panel(x,y,w,h,title){
  const lines=Array.from({length:Math.floor((h-46)/8)},(_,i)=>rect(x+9,y+30+8*i,w-18-(i%4===3?10:0),1.5,'#aa9291')).join('');
  return rect(x,y,w,h,paper,red,5)+rect(x+6,y+6,w-12,17,red,'none',6)+
    label(x+w/2,y+19,10,title,'#f7dfaa')+lines+rect(x+2,y+h-12,w-4,10,red,'none',2);
}
function branchGallery(){
  const rows=[[4,1],[6,2],[5,3],[3,4],[1,5]];
  const frames=rows.map(([count,row])=>Array.from({length:count},(_,i)=>{
    const x=369+(i-(count-1)/2)*28, y=32+row*23;
    return rect(x-11,y,23,17,row>3?'#eddcda':['#b7aa8d','#979c86','#8da4a7'][i%3],red,1);
  }).join('')).join('');
  return frames+rect(332,78,75,40,red)+label(370,102,15,'支部风采','#f8ece1');
}
function grapes(x,y,scale) {
  const colors=['#444352','#565262','#625b70','#4d475c'];
  const rows=[5,5,4,3,2,1];
  return `<g transform="translate(${x} ${y}) scale(${scale})">`+
    rows.map((n,j)=>Array.from({length:n},(_,i)=>{
      const cx=(i-(n-1)/2)*9+(j%2)*2, cy=j*7+(i%2);
      return `<circle cx="${cx}" cy="${cy}" r="4.65" fill="${colors[(i+j*3)%colors.length]}"/><circle cx="${cx-1.4}" cy="${cy-1.5}" r="1.05" fill="#c3b6c0" opacity=".55"/>`;
    }).join('')).join('')+'</g>';
}
function grapePrint(){
  return svg(160,358,rect(0,0,160,358,'#382827')+
    rect(4,4,152,350,'#72564d')+rect(8,8,144,342,'#ece7d9')+
    rect(17,22,126,309,'#f5f1e8')+
    '<path d="M30 179C30 143 16 104 49 72S106 68 133 50M41 149C65 113 82 98 120 110M44 181C77 185 106 214 97 244S75 279 120 291M68 203C63 233 86 236 105 226" fill="none" stroke="#4e514e" stroke-width="3"/>'+
    '<path fill="#63686a" d="M39 84L21 63l14-5 12 7 10-15 16 6-5 12 11 6-22 10z M75 116l-9-12 10-8 10 4 13-10 12 6-2 11-10 8z M28 126l-12-16 5-9 14 9 9-6 10 11-9 7z M105 78l-9-8 4-15 12 4 11-13 13 8-12 14z M92 277l8-8 12 2 5-10 10 4 1 8-14 11z"/>'+
    grapes(94,73,1)+grapes(49,119,.9)+grapes(107,130,.93)+grapes(74,157,.83)+
    '<path d="M39 184c-16 5-22 18-15 26 8 6 18-2 17-10m52 38c10 10 16 9 22 4" fill="none" stroke="#656662" stroke-width="2"/>'+
    rect(28,244,7,7,'#a65c53')+rect(120,306,6,6,'#a65c53'));
}
export const officeArtwork={
  ...receptionArtwork,
  partner13Peace:svg(130,140,
    '<path d="M43 8Q51 0 65 6Q80 1 89 10Q102 7 107 20Q123 23 120 40Q130 52 125 66Q131 81 121 92Q125 105 111 111Q107 126 92 126Q81 139 66 133Q48 139 39 127Q24 128 20 113Q5 107 10 92Q1 81 6 67Q0 53 10 42Q7 26 23 21Q28 8 43 8Z" fill="#f8ead1" fill-opacity=".86" stroke="#c74435" stroke-width="5"/>'+
    rect(38,17,54,106,'#f8eee3','#c78063',3)+rect(18,59,10,33,'#b73e31','none',2)+
    label(66,58,39,'平',ink)+label(66,103,42,'安',ink)+
    '<path d="M108 49l7 7-7 7-7-7z M107 68l7 7-7 7-7-7z" fill="#5596b5"/>'+rect(99,101,10,10,'#c74435','none',3)),
  partner10SailingShip:svg(180,195,rect(0,0,180,195,'#563728')+
    rect(4,4,172,187,'#a88462')+rect(8,8,164,179,'#f5ecda')+
    rect(20,20,140,154,'#8bb6d4')+
    '<path d="M20 42L53 33 81 40 117 30 160 42V49L129 45 103 52 76 48 49 55 20 50Z" fill="#c4d8e3"/>'+
    rect(20,145,140,29,'#3b5d77')+
    '<path d="M20 153l20-4 16 6 25-4 20 5 28-6 31 4M20 164l20-3 25 5 17-6 26 5 21-4 31 4M21 171l27-3 16 3 21-3 30 3 24-3 19 3" fill="none" stroke="#9dbdce" stroke-width="2"/>'+
    '<path d="M65 138V65m26 72V46m26 93V60m-65 77 85-21M54 130l37-83 38 85" fill="none" stroke="#73573b" stroke-width="2"/>'+
    '<path d="M47 76Q61 71 74 73L70 91Q58 95 45 94Z M42 98Q59 91 76 91L73 115Q58 120 40 115Z M76 54Q90 51 102 56L101 73Q91 78 74 75Z M71 79Q91 76 108 79L104 99Q90 103 68 101Z M68 105Q88 100 109 102L107 127Q88 130 64 126Z M107 71Q119 70 129 75L127 91Q121 97 106 94Z M108 98Q125 95 138 101L135 123Q125 127 105 123Z" fill="#e9ddaf" stroke="#a9895c" stroke-width="1.4"/>'+
    '<path d="M43 137L113 136 140 126 130 145Q118 156 84 155L59 152Z" fill="#956a3b" stroke="#583e2b" stroke-width="2"/>'+
    '<path d="M52 141l60-1 21-8m-76 15 51-1 18-6m-62 11 47-1" fill="none" stroke="#e2b574" stroke-width="2"/>'),
  hallGrapes:grapePrint(),
  hallExit:svg(90,39,rect(0,0,90,39,'#334039')+
    '<path d="M54 5H80V34H54M12 20H31M17 13L10 20l7 7M55 17l-9 8-10-3m10 3 5 8m4-16 8 1 5-4" fill="none" stroke="#a0ec8f" stroke-width="3"/>'+
    '<circle cx="58" cy="11" r="3" fill="#a0ec8f"/>'),
  teaMountains:svg(540,315,
    `<defs><linearGradient id="mist" x2="0" y2="1"><stop stop-color="#e5e5df"/><stop offset="1" stop-color="#faf8f1"/></linearGradient></defs>
    <path fill="url(#mist)" d="M0 0H540V315H0Z"/>
    <path fill="#b9c3c9" opacity=".58" d="M0 110L36 97 71 100 120 85 145 95 189 86 238 108 279 102 319 113 364 97 403 108 444 96 480 105 540 93V184H0Z"/>
    <path fill="#aeb8bf" opacity=".64" d="M0 151L47 138 76 149 105 132 147 150 193 141 234 165 282 147 311 157 337 145 386 172 419 149 471 162 497 149 540 161V233H0Z"/>
    <path fill="#7c838a" opacity=".72" d="M0 202L40 190 61 169 92 159 110 124 126 118 155 160 173 163 196 189 224 187 251 214 278 210 322 242 355 238 398 263 440 251 475 271 509 260 540 275V315H0Z"/>
    <path fill="#d7dad9" opacity=".72" d="M0 259L52 274 99 266 151 284 206 272 250 292 307 288 359 301 402 292 449 309 495 300 540 305V315H0Z"/>`+
    [108,216,324,432].map(x=>rect(x,0,1.4,315,'#73777a')).join('')),
  teaCalligraphy:svg(420,112,rect(0,0,420,112,'#603c2d')+
    rect(6,6,408,100,'#c4a478')+rect(20,16,380,80,'#f1e3c8')+
    label(215,73,61,'和　仁　正　中',ink)+rect(32,83,7,7,red)),

  talk1Calligraphy:svg(420,182,
    rect(0,0,420,182,'#573b2c')+rect(6,6,408,170,'#e6dec5')+
    rect(38,25,344,132,'#c5a272')+
    '<text x="210" y="126" font-family="KaiTi, STKaiti, Noto Serif CJK SC, serif" font-size="87" fill="#302927">問 無</text>'+
    '<g fill="#49372d" font-size="11" writing-mode="vertical-rl"><text x="347" y="45">立德立言無問西東</text><text x="331" y="45">同仁一視泱泱大風</text></g>'+
    rect(61,126,8,9,red)),
  partner2Screen:svg(120,350,
    rect(0,0,120,350,'#e7e4d8')+
    '<path fill="#d2d4cb" d="M0 196 26 150 47 174 63 141 120 205V280H0Z"/>'+
    '<path fill="#8b8980" d="M0 264 25 224 42 221 58 181 70 189 91 234 120 250V289H0Z"/>'+
    '<path fill="#b7b2a2" d="M0 270 22 251 42 257 64 230 82 250 98 241 120 275V304H0Z"/>'+
    '<path fill="#a39d8b" d="M0 301 25 291 38 299 65 280 87 280 120 301V320H0Z"/>'),
  talk2Calligraphy:svg(204,358,
    rect(0,0,204,358,'#3c2d29')+rect(7,7,190,344,'#acb290')+
    rect(24,41,156,275,'#eae7d4')+
    [...'無問西東'].map((char,i)=>label(138,93+55*i,49,char,ink)).join('')+
    [...'祝賀浙江無問律師事務所'].map((char,i)=>label(100,106+15*i,13,char,ink)).join('')+
    [...'事業蒸蒸日上'].map((char,i)=>label(78,142+17*i,14,char,ink)).join('')+
    rect(59,269,8,9,red)),
  meetingDisplays:svg(900,192,
    label(122,36,30,'致公之家')+rect(11,43,226,2,red)+
    panel(11,51,108,127,'中国致公党简介')+panel(126,51,111,60,'历届支委会')+panel(126,119,111,59,'支部党员')+
    label(370,30,21,'致力为公  侨海报国',ink)+rect(271,37,198,5,red,'none',2)+branchGallery()+
    label(532,83,26,'共筑')+label(532,119,30,'中国梦')+
    label(734,34,20,'创建先进党组织  争当优秀共产党员')+
    ['党员义务','党员权利','入党誓词','党员风采'].map((title,i)=>panel(592+i*75,47,68,130,title)).join('')),
  meetingCalligraphy:svg(420,103,rect(3,3,414,97,'#8d593c')+
    rect(9,9,402,85,'#eae7db')+rect(30,24,360,55,'#e8d8ad')+
    label(213,64,40,'廉　同　心　同',ink)),
};
