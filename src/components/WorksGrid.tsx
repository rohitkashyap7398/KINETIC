import React, { useState } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { Project } from '../types';
import { sound } from '../utils/sound';

interface WorksGridProps {
  onSelectProject: (p: Project) => void;
}

export const PROJECTS: Project[] = [
  {
    id: 'obsidian-zero',
    title: 'OBSIDIAN ZERO',
    category: '3D & Fluid',
    subtitle: 'Zero-gravity high-viscosity molten chrome collision simulation',
    description: 'Designed as the centerpiece brand film for Nivalis Acoustics. Built with custom procedural particle fluid engines to simulate the tactile density of acoustic sub-bass waves colliding at 120,000 particles per second.',
    image: '/src/assets/images/project_spatial_liquid_1791473727022.jpg',
    year: '2026',
    client: 'Nivalis Acoustics',
    fps: 120,
    duration: '0:42 Reel',
    tools: ['SideFX Houdini', 'Cinema 4D', 'Octane Render', 'OpenVDB'],
    easingCurve: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
    stiffness: 380,
    damping: 32,
    accentColor: '#f59e0b',
    metrics: '3.2M Organic Impressions · 89% Complete-Watch Rate',
  },
  {
    id: 'vox-avant-garde',
    title: 'VOX AVANT-GARDE',
    category: 'Kinetic Typography',
    subtitle: '3D variable typographic sculpture with volumetric photon scattering',
    description: 'Commissioned by the Venice Biennale Contemporary Pavilion. Explores variable font geometry deformed through fluid dynamic fields and illuminated by volumetric light shafts in an obsidian virtual gallery.',
    image: '/src/assets/images/project_kinetic_type_1791473765315.jpg',
    year: '2026',
    client: 'Venice Biennale Contemporary',
    fps: 120,
    duration: '1:15 Sequence',
    tools: ['GLSL Custom Shaders', 'Three.js Metal', 'Typeflow', 'After Effects'],
    easingCurve: 'spring(450, 26, 1.1)',
    stiffness: 450,
    damping: 26,
    accentColor: '#38bdf8',
    metrics: 'Site of the Day Winner · 100/100 Lighthouse Performance',
  },
  {
    id: 'synapse-spatial',
    title: 'SYNAPSE SPATIAL',
    category: 'Spatial UI',
    subtitle: 'Next-generation gestural interface motion and holographic tactile feedback',
    description: 'An interactive design system developed for ExoCompute spatial headsets. Explores predictive inertia, eye-tracked focal depth changes, and micro-vibrations translated into visual luminescence.',
    image: '/src/assets/images/project_hologram_interface_1791473795216.jpg',
    year: '2025',
    client: 'ExoCompute Spatial OS',
    fps: 90,
    duration: '2:04 Spatial Rig',
    tools: ['VisionOS Spatial Framework', 'Figma Motion Engine', 'SwiftUI Metal', 'WebAudio'],
    easingCurve: 'cubic-bezier(0.0, 0.0, 0.2, 1.0)',
    stiffness: 520,
    damping: 38,
    accentColor: '#a855f7',
    metrics: '0.14s Latency Benchmark · 4.9/5 Spatial Accessibility Score',
  },
  {
    id: 'orbital-harmonics',
    title: 'ORBITAL HARMONICS',
    category: 'Mechanical',
    subtitle: 'Mathematical gyroscopic kinetics in brushed titanium and architectural space',
    description: 'An art installation and film reel commissioned for Geneva Horological Foundation. Rigged with true physical kinematics simulating multi-axis gimbal precession with synchronized acoustic drone synthesis.',
    image: '/src/assets/images/project_kinetic_geometry_1791473827859.jpg',
    year: '2025',
    client: 'Geneva Horological Foundation',
    fps: 120,
    duration: '0:58 Film',
    tools: ['SolidWorks Kinematics', 'Cinema 4D Rigging', 'Redshift', 'Ableton Live'],
    easingCurve: 'Damped Pendulum Oscillation',
    stiffness: 280,
    damping: 42,
    accentColor: '#e4e4e7',
    metrics: 'Permanent Museum Exhibition · 14 Design Awards',
  },
];

type CategoryFilter = 'All' | '3D & Fluid' | 'Kinetic Typography' | 'Spatial UI' | 'Mechanical';

export const WorksGrid: React.FC<WorksGridProps> = ({ onSelectProject }) => {
  const [filter, setFilter] = useState<CategoryFilter>('All');

  const filteredProjects = filter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="works" className="py-24 border-b border-zinc-900 bg-[#08080a]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header & Interactive Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
              <span>Curated Showreel & Archive</span>
              <span className="text-zinc-600" aria-hidden="true">·</span>
              <span className="text-zinc-400">2024–2026 Production</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display">
              Selected Works
            </h2>
          </div>

          {/* Interactive Filter Controls (Allowed button tabs) */}
          <div className="flex items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-xl overflow-x-auto">
            {(['All', '3D & Fluid', 'Kinetic Typography', 'Spatial UI', 'Mechanical'] as CategoryFilter[]).map((category) => (
              <button
                key={category}
                onClick={() => {
                  sound.playClick(500);
                  setFilter(category);
                }}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  filter === category
                    ? 'bg-white text-black shadow-sm font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {category === 'All' ? 'All Productions' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            const isWide = index === 0;

            return (
              <div
                key={project.id}
                onClick={() => {
                  sound.playWoosh();
                  onSelectProject(project);
                }}
                className={`group cursor-pointer rounded-2xl bg-zinc-900/50 border border-zinc-800/80 overflow-hidden hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between ${
                  isWide ? 'md:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Visual Image Container */}
                <div className={`relative w-full overflow-hidden bg-black ${isWide ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />

                  {/* Gradient Scrim for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Play Affordance Button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-14 h-14 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                      <Play className="w-6 h-6 fill-black ml-0.5" />
                    </div>
                  </div>

                  {/* Top metadata tags */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-mono text-zinc-300 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                    <span>{project.fps} FPS</span>
                    <span className="text-zinc-500" aria-hidden="true">·</span>
                    <span>{project.duration}</span>
                  </div>

                  <div className="absolute top-4 right-4 p-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Editorial Footer (Zero Pills: Clean unboxed metadata) */}
                <div className="p-6 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                    <span>{project.category}</span>
                    <span className="text-zinc-600" aria-hidden="true">·</span>
                    <span>{project.client}</span>
                    <span className="text-zinc-600" aria-hidden="true">·</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-amber-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                    {project.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
