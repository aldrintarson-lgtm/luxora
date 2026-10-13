import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraControllerProps {
  targetPosition: [number, number, number];
  targetLookAt: [number, number, number];
  isUserInteracting?: boolean;
}

export const CameraController: React.FC<CameraControllerProps> = ({
  targetPosition,
  targetLookAt,
  isUserInteracting = false,
}) => {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(...targetPosition));
  const currentLookAt = useRef(new THREE.Vector3(...targetLookAt));
  const desiredPos = useRef(new THREE.Vector3(...targetPosition));
  const desiredLookAt = useRef(new THREE.Vector3(...targetLookAt));

  useEffect(() => {
    desiredPos.current.set(...targetPosition);
    desiredLookAt.current.set(...targetLookAt);
  }, [targetPosition, targetLookAt]);

  useFrame((_, delta) => {
    // If user is manually orbiting or interacting, don't force camera interpolation
    if (isUserInteracting) return;

    // Smooth lerp dampening
    const step = Math.min(1.0, delta * 3.2);

    currentPos.current.lerp(desiredPos.current, step);
    currentLookAt.current.lerp(desiredLookAt.current, step);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
};
