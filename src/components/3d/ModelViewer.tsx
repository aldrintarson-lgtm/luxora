import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import {
  AlertTriangle,
  Compass,
  Eye,
  RefreshCw,
  Rotate3d,
  Sparkles,
} from 'lucide-react';
import { LUXORA_CONFIG } from '../../config/luxora';
import type { ColorSwatch, Feature, PanelStyle } from '../../types/luxora';
import { BagMesh } from './BagMesh';
import { CameraController } from './CameraController';
import { Hotspots } from './Hotspots';

interface ModelViewerProps {
  selectedColor?: ColorSwatch;
  onColorChange?: (color: ColorSwatch) => void;
  selectedPanel?: PanelStyle;
  activeFeature?: Feature | null;
  onSelectFeature?: (feature: Feature) => void;
  showControls?: boolean;
  className?: string;
  enableHotspots?: boolean;
  onLoaded?: () => void;
  cameraPreset?: [number, number, number];
  cameraTarget?: [number, number, number];
}

export const ModelViewer: React.FC<ModelViewerProps> = ({
  selectedColor = LUXORA_CONFIG.colors[0],
  onColorChange,
  selectedPanel = LUXORA_CONFIG.panelStyles[0],
  activeFeature,
  onSelectFeature,
  showControls = true,
  className = '',
  enableHotspots = true,
  onLoaded,
  cameraPreset,
  cameraTarget,
}) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const [currentColor, setCurrentColor] = useState<ColorSwatch>(selectedColor);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [hotspotsVisible, setHotspotsVisible] = useState(enableHotspots);
  const [wireframe] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync external color changes
  useEffect(() => {
    setCurrentColor(selectedColor);
  }, [selectedColor]);

  // Determine current camera position and target
  const activeCameraPos: [number, number, number] = cameraPreset ||
    (activeFeature ? activeFeature.cameraPosition : LUXORA_CONFIG.model.defaultCameraPosition);

  const activeCameraTarget: [number, number, number] = cameraTarget ||
    (activeFeature ? activeFeature.cameraTarget : LUXORA_CONFIG.model.defaultCameraTarget);

  // Handle color change
  const handleColorSelect = useCallback(
    (color: ColorSwatch) => {
      setCurrentColor(color);
      if (onColorChange) onColorChange(color);
    },
    [onColorChange]
  );

  // Reset view to default angle
  const handleResetView = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      controlsRef.current.target.set(...LUXORA_CONFIG.model.defaultCameraTarget);
    }
  }, []);

  // Handle user interaction with OrbitControls: pause auto-rotate, then resume after 3.5s idle
  const handleInteractionStart = useCallback(() => {
    setIsUserInteracting(true);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
  }, []);

  const handleInteractionEnd = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 3500);
  }, []);

  const handleMeshLoaded = useCallback(() => {
    setIsLoading(false);
    if (onLoaded) onLoaded();
  }, [onLoaded]);

  const handleMeshError = useCallback((_err: Error) => {
    setLoadError(
      `Could not load /models/bag.stl. Displaying precision 3D CAD preview. Place your STL file into /public/models/bag.stl to view your custom model.`
    );
  }, []);

  return (
    <div className={`relative w-full h-full select-none overflow-hidden ${className}`}>
      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{
          position: LUXORA_CONFIG.model.defaultCameraPosition,
          fov: 42,
          near: 0.1,
          far: 50,
        }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        {/* Soft Studio Lighting */}
        <ambientLight intensity={0.8} />
        {/* Key Light */}
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.8}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-near={0.5}
          shadow-camera-far={25}
          shadow-bias={-0.0001}
        />
        {/* Fill Light with slight blue tint */}
        <directionalLight position={[-5, 4, -4]} intensity={0.9} color="#93c5fd" />
        {/* Accent Rim Light for luxury edge highlights */}
        <directionalLight position={[0, -4, -6]} intensity={0.6} color="#c084fc" />
        {/* Top Studio Downlight */}
        <pointLight position={[0, 6, 0]} intensity={1.2} />

        {/* Studio Environment Map */}
        <Environment preset="city" />

        {/* Camera interpolation */}
        <CameraController
          targetPosition={activeCameraPos}
          targetLookAt={activeCameraTarget}
          isUserInteracting={isUserInteracting}
        />

        {/* 3D Model with Suspense */}
        <Suspense fallback={null}>
          <group position={[0, -0.3, 0]}>
            <BagMesh
              color={currentColor}
              panelStyle={selectedPanel}
              onLoaded={handleMeshLoaded}
              onError={handleMeshError}
              wireframe={wireframe}
            />

            {/* Soft Contact Shadow under the bag */}
            <ContactShadows
              position={[0, -1.82, 0]}
              opacity={0.7}
              scale={8.5}
              blur={2.4}
              far={4.5}
              color="#020408"
            />

            {/* Floating Hotspot Markers on the model */}
            <Hotspots
              visible={hotspotsVisible}
              activeFeatureId={activeFeature?.id}
              onSelectFeature={onSelectFeature}
            />
          </group>
        </Suspense>

        {/* OrbitControls */}
        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.06}
          minDistance={2.6}
          maxDistance={12.0}
          maxPolarAngle={Math.PI / 1.75}
          minPolarAngle={Math.PI / 6}
          autoRotate={isAutoRotating && !isUserInteracting}
          autoRotateSpeed={1.4}
          onStart={handleInteractionStart}
          onEnd={handleInteractionEnd}
        />
      </Canvas>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/60 backdrop-blur-md z-20 pointer-events-none transition-opacity duration-500">
          <div className="relative flex items-center justify-center mb-3">
            <div className="w-12 h-12 rounded-full border-2 border-blue-500/20 border-t-cyan-400 animate-spin" />
            <Sparkles className="w-5 h-5 text-cyan-400 absolute animate-pulse" />
          </div>
          <span className="text-xs uppercase tracking-widest text-slate-300 font-semibold">
            Loading LUXORA 3D Shell...
          </span>
        </div>
      )}

      {/* Friendly STL Status Notice (if missing or notice is shown) */}
      {loadError && (
        <div className="absolute top-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md p-3.5 rounded-xl border border-amber-500/30 bg-amber-950/70 backdrop-blur-xl text-amber-200 text-xs shadow-2xl z-30 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-white mb-0.5">Custom STL Info</p>
            <p className="text-amber-200/90 leading-relaxed">{loadError}</p>
          </div>
          <button
            onClick={() => setLoadError(null)}
            className="text-amber-400 hover:text-white text-xs px-1.5 py-0.5 rounded border border-amber-500/40"
          >
            ✕
          </button>
        </div>
      )}

      {/* Interactive Controls Bar */}
      {showControls && (
        <div className="absolute bottom-5 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 flex flex-col items-center gap-3 z-20 pointer-events-auto">
          {/* Color Swatch Selector */}
          <div className="flex items-center gap-2 p-1.5 px-3 rounded-full border border-white/10 bg-slate-950/80 backdrop-blur-xl shadow-2xl">
            <span className="text-[11px] font-medium text-slate-400 pr-1 hidden sm:inline">
              Color:
            </span>
            <div className="flex items-center gap-2">
              {LUXORA_CONFIG.colors.map((c) => {
                const isSelected = currentColor.id === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => handleColorSelect(c)}
                    className={`relative w-6 h-6 rounded-full transition-all duration-300 transform ${
                      isSelected
                        ? 'scale-125 ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-950'
                        : 'hover:scale-110 opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={`${c.name} - ${c.description}`}
                    aria-label={`Select color ${c.name}`}
                  >
                    {isSelected && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-white shadow" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="h-4 w-px bg-white/10 mx-1 hidden sm:block" />
            <span className="text-xs font-semibold text-white hidden sm:inline">
              {currentColor.name}
            </span>
          </div>

          {/* Quick Action Toggles */}
          <div className="flex items-center gap-2 text-xs">
            {/* Auto-Rotate Toggle */}
            <button
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border backdrop-blur-md transition-all duration-200 ${
                isAutoRotating
                  ? 'bg-blue-600/30 border-blue-400/50 text-cyan-300'
                  : 'bg-slate-900/70 border-white/10 text-slate-400 hover:text-white'
              }`}
              title="Toggle automatic rotation"
            >
              <Rotate3d className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin' : ''}`} />
              <span>Auto-rotate</span>
            </button>

            {/* Hotspots Toggle */}
            <button
              onClick={() => setHotspotsVisible(!hotspotsVisible)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border backdrop-blur-md transition-all duration-200 ${
                hotspotsVisible
                  ? 'bg-purple-600/30 border-purple-400/50 text-purple-300'
                  : 'bg-slate-900/70 border-white/10 text-slate-400 hover:text-white'
              }`}
              title="Toggle 3D Feature Hotspots"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Hotspots</span>
            </button>

            {/* Reset View Button */}
            <button
              onClick={handleResetView}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-slate-900/70 backdrop-blur-md text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all duration-200"
              title="Reset 3D camera to default"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset view</span>
            </button>
          </div>
        </div>
      )}

      {/* Orbit Interaction Hint (Top right or subtle corner) */}
      <div className="absolute top-4 right-4 hidden md:flex items-center gap-1.5 text-[11px] text-slate-400/80 bg-slate-950/50 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/5 pointer-events-none">
        <Compass className="w-3.5 h-3.5 text-blue-400" />
        <span>Drag to rotate • Scroll to zoom</span>
      </div>
    </div>
  );
};
