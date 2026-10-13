import fs from 'fs';
import path from 'path';
import * as THREE from 'three';

// Create a stylish travel bag geometry using Three.js geometries and CSG/merges
const geometries = [];

// 1. Main Bag Body (rounded suitcase)
const bodyWidth = 36;
const bodyHeight = 52;
const bodyDepth = 24;
const bodyGeo = new THREE.BoxGeometry(bodyWidth, bodyHeight, bodyDepth, 8, 8, 8);
geometries.push(bodyGeo);

// 2. Front Accent Shell / Interchangeable Face Panel
const panelGeo = new THREE.BoxGeometry(bodyWidth - 4, bodyHeight - 6, 2.5, 4, 4, 2);
panelGeo.translate(0, 0, (bodyDepth / 2) + 1.25);
geometries.push(panelGeo);

// 3. Top Smart Control Console & OLED Display Section
const topConsoleGeo = new THREE.BoxGeometry(bodyWidth - 8, 4, bodyDepth - 6, 4, 2, 4);
topConsoleGeo.translate(0, (bodyHeight / 2) + 2, 0);
geometries.push(topConsoleGeo);

// Display screen inset
const screenGeo = new THREE.BoxGeometry(16, 0.5, 8);
screenGeo.translate(0, (bodyHeight / 2) + 4.1, 0);
geometries.push(screenGeo);

// 4. Telescopic Handle Poles & Grip
const poleLeft = new THREE.CylinderGeometry(1.2, 1.2, 18, 12);
poleLeft.translate(-8, (bodyHeight / 2) + 9, -bodyDepth / 4);
geometries.push(poleLeft);

const poleRight = new THREE.CylinderGeometry(1.2, 1.2, 18, 12);
poleRight.translate(8, (bodyHeight / 2) + 9, -bodyDepth / 4);
geometries.push(poleRight);

const gripGeo = new THREE.BoxGeometry(20, 2.5, 3.5);
gripGeo.translate(0, (bodyHeight / 2) + 18, -bodyDepth / 4);
geometries.push(gripGeo);

// 5. Four 360-degree Dual Wheels at bottom
const wheelOffsets = [
  [-bodyWidth / 2 + 5, -bodyHeight / 2 - 4, -bodyDepth / 2 + 5],
  [bodyWidth / 2 - 5, -bodyHeight / 2 - 4, -bodyDepth / 2 + 5],
  [-bodyWidth / 2 + 5, -bodyHeight / 2 - 4, bodyDepth / 2 - 5],
  [bodyWidth / 2 - 5, -bodyHeight / 2 - 4, bodyDepth / 2 - 5],
];

wheelOffsets.forEach(([x, y, z]) => {
  const mount = new THREE.CylinderGeometry(2, 2.2, 3, 12);
  mount.translate(x, y + 2, z);
  geometries.push(mount);

  const wheelL = new THREE.CylinderGeometry(2.5, 2.5, 1.2, 16);
  wheelL.rotateZ(Math.PI / 2);
  wheelL.translate(x - 0.8, y, z);
  geometries.push(wheelL);

  const wheelR = new THREE.CylinderGeometry(2.5, 2.5, 1.2, 16);
  wheelR.rotateZ(Math.PI / 2);
  wheelR.translate(x + 0.8, y, z);
  geometries.push(wheelR);
});

// 6. Side Ergonomic Carry Handle & 2FA Lock Module
const sideHandle = new THREE.BoxGeometry(2.5, 12, 3);
sideHandle.translate(-bodyWidth / 2 - 1.5, 2, 0);
geometries.push(sideHandle);

// 2FA NFC/PIN Lock unit on side
const lockUnit = new THREE.BoxGeometry(2, 8, 6);
lockUnit.translate(bodyWidth / 2 + 1, 6, 0);
geometries.push(lockUnit);

// 7. Retractable Cup Holder Ring (Side)
const cupRing = new THREE.TorusGeometry(3.5, 0.6, 8, 16);
cupRing.rotateX(Math.PI / 2);
cupRing.translate(bodyWidth / 2 + 3.8, -4, 0);
geometries.push(cupRing);

// 8. Foldable Mobile Stand (Top/Rear)
const phoneStand = new THREE.BoxGeometry(10, 1.2, 4);
phoneStand.rotateX(0.3);
phoneStand.translate(0, (bodyHeight / 2) + 2.5, 4);
geometries.push(phoneStand);

// Convert all to triangles and export binary STL
let totalTriangles = 0;
const processedGeos = geometries.map(geo => {
  const nonIndexed = geo.toNonIndexed();
  nonIndexed.computeVertexNormals();
  const count = nonIndexed.attributes.position.count / 3;
  totalTriangles += count;
  return nonIndexed;
});

const bufferSize = 80 + 4 + (totalTriangles * 50);
const buffer = Buffer.alloc(bufferSize);

// 80 bytes header
buffer.write('LUXORA Smart Travel Bag 3D CAD Model - Binary STL', 0, 80, 'utf8');

// 4 bytes triangle count
buffer.writeUInt32LE(totalTriangles, 80);

let offset = 84;
processedGeos.forEach(geo => {
  const pos = geo.attributes.position;
  const norm = geo.attributes.normal;
  const triangleCount = pos.count / 3;

  for (let i = 0; i < triangleCount; i++) {
    const i0 = i * 3;
    const i1 = i * 3 + 1;
    const i2 = i * 3 + 2;

    // Face normal (average or from norm attr)
    const nx = (norm.getX(i0) + norm.getX(i1) + norm.getX(i2)) / 3 || 0;
    const ny = (norm.getY(i0) + norm.getY(i1) + norm.getY(i2)) / 3 || 0;
    const nz = (norm.getZ(i0) + norm.getZ(i1) + norm.getZ(i2)) / 3 || 1;

    buffer.writeFloatLE(nx, offset);
    buffer.writeFloatLE(ny, offset + 4);
    buffer.writeFloatLE(nz, offset + 8);

    // Vertex 1
    buffer.writeFloatLE(pos.getX(i0), offset + 12);
    buffer.writeFloatLE(pos.getY(i0), offset + 16);
    buffer.writeFloatLE(pos.getZ(i0), offset + 20);

    // Vertex 2
    buffer.writeFloatLE(pos.getX(i1), offset + 24);
    buffer.writeFloatLE(pos.getY(i1), offset + 28);
    buffer.writeFloatLE(pos.getZ(i1), offset + 32);

    // Vertex 3
    buffer.writeFloatLE(pos.getX(i2), offset + 36);
    buffer.writeFloatLE(pos.getY(i2), offset + 40);
    buffer.writeFloatLE(pos.getZ(i2), offset + 44);

    // Attribute byte count (2 bytes)
    buffer.writeUInt16LE(0, offset + 48);

    offset += 50;
  }
});

const outDir = path.resolve('public', 'models');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
const outPath = path.join(outDir, 'bag.stl');
fs.writeFileSync(outPath, buffer);
console.log(`Successfully generated STL bag model: ${outPath} (${totalTriangles} triangles, ${(bufferSize / 1024).toFixed(1)} KB)`);
