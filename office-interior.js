import {exteriorLawn} from './world/layout.js';
import {boxes, palette} from './world/office-model.js';
import {fromWorld, toWorld} from './plan.js';
import {officeDecals,officeArtwork} from './office-art.js';

const EYE_HEIGHT = 1.62;
const NEAR = .045;
const WHITE = [255, 255, 255];

function boxFaces(box) {
  const {x, z, y, h, w, d, mat, glass, emissive} = box;
  const left = x - w / 2, right = x + w / 2;
  const back = z - d / 2, front = z + d / 2, top = y + h;
  const color = (box.color || palette[mat] || '#86a462').slice(1).match(/../g).map(hex => parseInt(hex, 16));
  const face = (axis, plane, side, points, shade, ground = false) => {
    const slats = axis !== 1 && ['blind','mesh'].includes(mat);
    const sideGrain = axis !== 1 && mat === 'partnerOak';
    const woodGrain = sideGrain || (axis === 1 && mat === 'partnerDesk');
    return {axis, plane, side,
      points: points.map(p => [...p, (slats || sideGrain) && axis===0 ? p[2] : p[0], slats || sideGrain ? p[1] : p[2]]),
      color, shade, mat, glass, emissive, ground, slats, woodGrain};
  };
  return [
    face(0, left, -1, [[left,y,back],[left,y,front],[left,top,front],[left,top,back]], .9),
    face(0, right, 1, [[right,y,front],[right,y,back],[right,top,back],[right,top,front]], .92),
    face(1, y, -1, [[left,y,front],[left,y,back],[right,y,back],[right,y,front]], .95),
    face(1, top, 1, [[left,top,back],[left,top,front],[right,top,front],[right,top,back]], 1.04,
      top <= .06 && ['hall','floor','carpet','workCarpet'].includes(mat)),
    face(2, back, -1, [[right,y,back],[left,y,back],[left,top,back],[right,top,back]], .96),
    face(2, front, 1, [[left,y,front],[right,y,front],[right,top,front],[left,top,front]], .98),
  ];
}

// Clip in camera space before projecting. A wall crossing the eye plane still
// fills the correct part of the view instead of stretching behind the viewer.
function nearClip(points) {
  const output = [];
  let a = points.at(-1);
  for (const b of points) {
    const aInside = a[2] >= NEAR, bInside = b[2] >= NEAR;
    if (aInside !== bInside) {
      const t = (NEAR - a[2]) / (b[2] - a[2]);
      output.push(a.map((v, i) => v + (b[i] - v) * t));
    }
    if (bInside) output.push(b);
    a = b;
  }
  return output;
}

export function createInterior(onTextureReady) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const faces = boxes.flatMap(boxFaces);
  faces.push(...exteriorLawn.flatMap(boxFaces));
  const opaque = faces.filter(face => !face.glass);
  const glazing = faces.filter(face => face.glass);
  const decals = officeDecals.map(decal => {
    const [x,z] = toWorld(decal.px, decal.py);
    const axis = ['front','back'].includes(decal.normal) ? 2 : 0;
    const side = ['front','south'].includes(decal.normal) ? 1 : -1;
    const horizontal = decal.width / 2;
    const vertical = decal.height / 2;
    const image = new Image();
    const face = {axis, side, plane: axis === 2 ? z : x, color:WHITE, shade:1, emissive:1};
    face.points = [[-1,1,0,0],[1,1,1,0],[1,-1,1,1],[-1,-1,0,1]].map(([u,v,s,t]) => [
      x + (axis === 2 ? u * horizontal * side : 0),
      decal.y + .025 + v * vertical,
      z + (axis === 0 ? -u * horizontal * side : 0), s, t,
    ]);
    image.onload = () => {
      const imageCanvas = document.createElement('canvas');
      imageCanvas.width = 384;
      imageCanvas.height = Math.max(1, Math.round(384 * decal.height / decal.width));
      const imageContext = imageCanvas.getContext('2d');
      imageContext.drawImage(image,0,0,imageCanvas.width,imageCanvas.height);
      face.texture = imageContext.getImageData(0,0,imageCanvas.width,imageCanvas.height);
      onTextureReady();
    };
    image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(officeArtwork[decal.id]);
    return face;
  });

  let width, height, image, depth, floor, camera;
  function raster(a,b,c,face,brightness) {
    const minX = Math.max(0, Math.floor(Math.min(a[0],b[0],c[0])));
    const maxX = Math.min(width-1, Math.ceil(Math.max(a[0],b[0],c[0])));
    const minY = Math.max(0, Math.floor(Math.min(a[1],b[1],c[1])));
    const maxY = Math.min(height-1, Math.ceil(Math.max(a[1],b[1],c[1])));
    if (minX > maxX || minY > maxY) return;
    const abX = b[0]-a[0], abY = b[1]-a[1], acX = c[0]-a[0], acY = c[1]-a[1];
    const area = abX * acY - abY * acX;
    if (Math.abs(area) < .0001) return;
    const rgb = face.color.map(channel => Math.min(255, channel * face.shade * (face.emissive ? 1 : brightness)));
    const tiled = face.axis === 1 && ['floor','ceiling','hall','workCarpet'].includes(face.mat);
    const tex = face.texture;
    const pixels = image.data;
    for (let y = minY; y <= maxY; y++) {
      const dy = y+.5-a[1];
      for (let x = minX; x <= maxX; x++) {
        const dx = x+.5-a[0];
        const bv = (dx * acY - dy * acX) / area;
        const cv = (abX * dy - abY * dx) / area;
        const av = 1-bv-cv;
        if (av < -1e-7 || bv < -1e-7 || cv < -1e-7) continue;
        const z = a[2]*av + b[2]*bv + c[2]*cv;
        const index = x+y*width;
        if (z <= depth[index]) continue;
        const k = index*4;
        let r = rgb[0], g = rgb[1], blue = rgb[2], alpha = face.glass ? .32 : 1;
        if (tex || tiled || face.slats || face.woodGrain) {
          const u = (a[3]*av+b[3]*bv+c[3]*cv)/z;
          const v = (a[4]*av+b[4]*bv+c[4]*cv)/z;
          if (tex) {
            const i = Math.max(0,Math.min(tex.width-1,Math.floor(u*tex.width)));
            const j = Math.max(0,Math.min(tex.height-1,Math.floor(v*tex.height)));
            const at = (i+j*tex.width)*4;
            r=tex.data[at]; g=tex.data[at+1]; blue=tex.data[at+2]; alpha=tex.data[at+3]/255;
          } else if (face.slats) {
            const rows = Math.floor(v*16);
            const strength = Math.min(1, z*3.4);
            const cord = face.mat === 'blind' && (u*2-Math.floor(u*2)) < .035;
            const tone = 1+(rows%2===0 ? .075 : -.075)*strength-(cord ? .085 : 0);
            r*=tone; g*=tone; blue*=tone;
          } else if (face.woodGrain) {
            const grain = Math.floor(u*22), pixel = Math.floor(v*9);
            const tone = 1+((grain*71 & 15)-7.5)*.016+((grain*19+pixel*5 & 7)-3.5)*.007;
            r*=tone; g*=tone; blue*=tone;
          } else if (face.mat === 'workCarpet') {
            const weave = Math.floor(u*24) + Math.floor(v*12)*137;
            const grain = 1+((weave*31 & 15)-7.5)*.008;
            const rib = (u*4-Math.floor(u*4)) < .16 ? .95 : 1;
            r*=grain*rib; g*=grain*rib; blue*=grain*rib;
          } else {
            const size = face.mat === 'floor' ? .26 : .74;
            const edge = (v / size - Math.floor(v / size)) < .018 ||
              (face.mat !== 'floor' && (u / size - Math.floor(u / size)) < .018);
            if (edge) {r*=.91; g*=.91; blue*=.91;}
          }
        }
        if (alpha <= .01) continue;
        pixels[k] = pixels[k]*(1-alpha)+r*alpha;
        pixels[k+1] = pixels[k+1]*(1-alpha)+g*alpha;
        pixels[k+2] = pixels[k+2]*(1-alpha)+blue*alpha;
        if (!face.glass) {depth[index] = z; floor[index] = Number(face.ground || false);}
      }
    }
  }

  function draw(target, viewWidth, viewHeight, position, yaw, pitch, time) {
    const ratio = Math.min(1, 760/viewWidth, 540/viewHeight);
    const w = Math.max(1, Math.round(viewWidth*ratio)), h = Math.max(1,Math.round(viewHeight*ratio));
    if (w !== width || h !== height) {
      width=canvas.width=w; height=canvas.height=h;
      image=context.createImageData(w,h);
      depth=new Float32Array(w*h);
      floor=new Uint8Array(w*h);
    }
    const [x,z] = toWorld(...position), eye = [x,EYE_HEIGHT,z];
    const sin = Math.sin(yaw), cos = Math.cos(yaw), sp = Math.sin(pitch), cp = Math.cos(pitch);
    const focal = Math.min(height*.66,width*.86);
    camera = {x,z,sin,cos,sp,cp,focal};
    const night = time === 'night', dusk = time === 'dusk';
    const sky = night ? [40,57,78] : dusk ? [194,171,164] : [161,198,223];
    for (let i=0;i<image.data.length;i+=4) {
      image.data[i]=sky[0]; image.data[i+1]=sky[1]; image.data[i+2]=sky[2]; image.data[i+3]=255;
    }
    depth.fill(0); floor.fill(0);
    function paint(face) {
      if ((eye[face.axis]-face.plane)*face.side <= 0) return;
      const points = nearClip(face.points.map(([px,py,pz,u,v]) => {
        const dx=px-x, dy=py-EYE_HEIGHT, dz=pz-z;
        const forward=dx*sin+dz*cos;
        return [-dx*cos+dz*sin,dy*cp-forward*sp,forward*cp+dy*sp,u,v];
      }));
      if (points.length < 3) return;
      const projected=points.map(([px,py,pz,u,v]) => [width/2+focal*px/pz,height/2-focal*py/pz,1/pz,u/pz,v/pz]);
      const light = night ? .70 : dusk ? .91 : 1;
      for (let i=1;i<projected.length-1;i++) raster(projected[0],projected[i],projected[i+1],face,light);
    }
    opaque.forEach(paint);
    decals.forEach(face => {if (face.texture) paint(face);});
    glazing.forEach(paint);
    context.putImageData(image,0,0);
    target.drawImage(canvas,0,0,viewWidth,viewHeight);
  }

  function pickFloor(sx,sy,viewWidth,viewHeight) {
    if (!camera || sx<0 || sx>=viewWidth || sy<0 || sy>=viewHeight) return null;
    const ix = Math.floor(sx/viewWidth*width), iy = Math.floor(sy/viewHeight*height);
    const index = ix+iy*width;
    if (!floor[index]) return null;
    const {x,z,sin,cos,sp,cp,focal} = camera;
    const distance = 1/depth[index];
    const right = (ix+.5-width/2)*distance/focal;
    const up = (height/2-iy-.5)*distance/focal;
    const forward = distance*cp-up*sp;
    return fromWorld(x+forward*sin-right*cos,z+forward*cos+right*sin);
  }
  return {draw,pickFloor};
}
