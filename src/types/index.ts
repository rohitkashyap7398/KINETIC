export interface Project {
  id: string;
  title: string;
  category: '3D & Fluid' | 'Kinetic Typography' | 'Spatial UI' | 'Mechanical';
  subtitle: string;
  description: string;
  image: string;
  year: string;
  client: string;
  fps: number;
  duration: string;
  tools: string[];
  easingCurve: string;
  stiffness: number;
  damping: number;
  accentColor: string;
  metrics: string;
}

export interface PhysicsPreset {
  name: string;
  stiffness: number;
  damping: number;
  mass: number;
  description: string;
}

export interface MotionPrinciple {
  id: string;
  title: string;
  tagline: string;
  explanation: string;
  digitalBenefit: string;
  demoType: 'squash' | 'anticipation' | 'stagger' | 'inertia';
}
