import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { LUXORA_CONFIG } from '../../config/luxora';
import type { ColorSwatch, PanelStyle } from '../../types/luxora';

interface BagMeshProps {
  color: ColorSwatch;
  panelStyle?: PanelStyle;
  onLoaded?: () => void;
  onError?: (err: Error) => void;
  wireframe?: boolean;
}

export const BagMesh: React.FC<BagMeshProps> = ({
  color,
  panelStyle,
  onLoaded,
  onError,
  wireframe = false,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const [useFallback, setUseFallback] = useState(false);

  // Compute final physical material values based on color and panel style
  const roughness = useMemo(() => {
    const base = color.roughness;
    const mod = panelStyle?.roughnessModifier || 0;
    return Math.max(0.05, Math.min(0.95, base + mod));
  }, [color.roughness, panelStyle]);

  const metalness = useMemo(() => {
    const base = color.metalness;
    const mod = panelStyle?.metalnessModifier || 0;
    return Math.max(0.0, Math.min(1.0, base + mod));
  }, [color.metalness, panelStyle]);

  // Load the STL file with STLLoader
  useEffect(() => {
    let isCancelled = false;
    const loader = new STLLoader();

    loader.load(
      LUXORA_CONFIG.model.stlPath,
      (loadedGeo) => {
        if (isCancelled) return;

        // Auto-center and normalize geometry so it fits perfectly in the scene
        loadedGeo.computeVertexNormals();
        loadedGeo.center();
        loadedGeo.computeBoundingBox();

        const bbox = loadedGeo.boundingBox;
        if (bbox) {
          const size = new THREE.Vector3();
          bbox.getSize(size);
          const maxDim = Math.max(size.x, size.y, size.z);
          // Target model height of approximately 3.4 units
          const targetScale = (3.4 / maxDim) * LUXORA_CONFIG.model.scaleMultiplier;
          loadedGeo.scale(targetScale, targetScale, targetScale);
        }

        setGeometry(loadedGeo);
        setUseFallback(false);
        if (onLoaded) onLoaded();
      },
      undefined,
      (error) => {
        if (isCancelled) return;
        console.warn('Could not load /models/bag.stl, switching to high-fidelity procedural fallback:', error);
        setUseFallback(true);
        if (onError) onError(error as Error);
        if (onLoaded) onLoaded();
      }
    );

    return () => {
      isCancelled = true;
    };
  }, [onLoaded, onError]);

  // Cleanup geometry on unmount
  useEffect(() => {
    return () => {
      if (geometry) {
        geometry.dispose();
      }
    };
  }, [geometry]);

  // High-fidelity fallback procedural suitcase mesh if STL is unavailable
  const fallbackMesh = useMemo(() => {
    if (!useFallback) return null;

    const group = new THREE.Group();

    // Suitcase Main Body
    const bodyGeo = new THREE.BoxGeometry(2.0, 3.0, 1.3, 6, 6, 6);
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(color.hex),
      roughness,
      metalness,
      clearcoat: color.clearcoat,
      clearcoatRoughness: color.clearcoatRoughness,
      wireframe,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // Front modular panel
    const panelGeo = new THREE.BoxGeometry(1.76, 2.65, 0.15);
    const panelMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(color.hex),
      roughness: Math.max(0.1, roughness - 0.1),
      metalness: Math.min(1.0, metalness + 0.15),
      clearcoat: 1.0,
      wireframe,
    });
    const panel = new THREE.Mesh(panelGeo, panelMat);
    panel.position.set(0, 0, 0.68);
    panel.castShadow = true;
    group.add(panel);

    // Top control console
    const topConsoleGeo = new THREE.BoxGeometry(1.5, 0.25, 0.9);
    const darkConsoleMat = new THREE.MeshStandardMaterial({
      color: 0x111318,
      roughness: 0.2,
      metalness: 0.8,
    });
    const topConsole = new THREE.Mesh(topConsoleGeo, darkConsoleMat);
    topConsole.position.set(0, 1.55, 0);
    group.add(topConsole);

    // OLED Display glow strip
    const oledGeo = new THREE.BoxGeometry(0.8, 0.05, 0.35);
    const oledMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.8,
      roughness: 0.1,
    });
    const oled = new THREE.Mesh(oledGeo, oledMat);
    oled.position.set(0, 1.68, 0);
    group.add(oled);

    // Telescopic Handle & Grip
    const poleGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.1, 16);
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x88909e, metalness: 0.9, roughness: 0.2 });

    const poleL = new THREE.Mesh(poleGeo, poleMat);
    poleL.position.set(-0.45, 1.95, -0.25);
    group.add(poleL);

    const poleR = new THREE.Mesh(poleGeo, poleMat);
    poleR.position.set(0.45, 1.95, -0.25);
    group.add(poleR);

    const gripGeo = new THREE.BoxGeometry(1.1, 0.12, 0.18);
    const gripMat = new THREE.MeshStandardMaterial({ color: 0x1e222d, roughness: 0.4 });
    const grip = new THREE.Mesh(gripGeo, gripMat);
    grip.position.set(0, 2.5, -0.25);
    group.add(grip);

    // 4 Dual 360-degree Spinner Wheels
    const wheelPositions: [number, number, number][] = [
      [-0.75, -1.65, -0.45],
      [0.75, -1.65, -0.45],
      [-0.75, -1.65, 0.45],
      [0.75, -1.65, 0.45],
    ];

    const wheelGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.08, 16);
    wheelGeo.rotateZ(Math.PI / 2);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x222630, roughness: 0.6 });

    wheelPositions.forEach((pos) => {
      const mountGeo = new THREE.CylinderGeometry(0.1, 0.12, 0.15, 12);
      const mount = new THREE.Mesh(mountGeo, darkConsoleMat);
      mount.position.set(pos[0], pos[1] + 0.1, pos[2]);
      group.add(mount);

      const w1 = new THREE.Mesh(wheelGeo, wheelMat);
      w1.position.set(pos[0] - 0.05, pos[1], pos[2]);
      group.add(w1);

      const w2 = new THREE.Mesh(wheelGeo, wheelMat);
      w2.position.set(pos[0] + 0.05, pos[1], pos[2]);
      group.add(w2);
    });

    // 2FA Lock Module on Side
    const lockGeo = new THREE.BoxGeometry(0.12, 0.45, 0.35);
    const lock = new THREE.Mesh(lockGeo, darkConsoleMat);
    lock.position.set(1.05, 0.35, 0);
    group.add(lock);

    // Retractable Cup Holder Ring on Side
    const cupRingGeo = new THREE.TorusGeometry(0.2, 0.03, 8, 20);
    cupRingGeo.rotateX(Math.PI / 2);
    const cupRing = new THREE.Mesh(cupRingGeo, darkConsoleMat);
    cupRing.position.set(1.2, -0.25, 0);
    group.add(cupRing);

    return group;
  }, [useFallback, color, roughness, metalness, wireframe]);

  if (useFallback && fallbackMesh) {
    return <primitive object={fallbackMesh} />;
  }

  if (!geometry) return null;

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={LUXORA_CONFIG.model.rotationOffset}
      castShadow
      receiveShadow
    >
      <meshPhysicalMaterial
        color={new THREE.Color(color.hex)}
        roughness={roughness}
        metalness={metalness}
        clearcoat={color.clearcoat}
        clearcoatRoughness={color.clearcoatRoughness}
        reflectivity={0.9}
        transmission={0.0}
        ior={1.5}
        wireframe={wireframe}
      />
    </mesh>
  );
};
