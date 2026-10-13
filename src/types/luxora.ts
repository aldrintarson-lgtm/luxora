export interface Feature {
  id: number;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  category: 'Security' | 'Convenience' | 'Durability' | 'Smart Tech';
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  hotspotPosition?: [number, number, number];
  badge?: string;
  specs?: string[];
}

export interface ColorSwatch {
  id: string;
  name: string;
  hex: string;
  accentHex: string;
  roughness: number;
  metalness: number;
  clearcoat: number;
  clearcoatRoughness: number;
  description: string;
}

export interface PanelStyle {
  id: string;
  name: string;
  textureType: 'matte' | 'carbon' | 'aluminum' | 'prismatic';
  roughnessModifier: number;
  metalnessModifier: number;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar?: string;
  bio: string;
  initials: string;
}

export interface PresentationSection {
  id: string;
  title: string;
  subtitle: string;
}
