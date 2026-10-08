import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { Sliders, RefreshCw, Magnet, Shapes, Type, Sparkles } from 'lucide-react';
import { PhysicsPreset } from '../types';
import { sound } from '../utils/sound';

const PRESETS: PhysicsPreset[] = [
  {
    name: 'Snappy UI Spring',
    stiffness: 420,
    damping: 30,
    mass: 1.0,
    description: 'Crisp, premium iOS-grade feedback with near-zero overshoot.',
  },
  {
    name: 'Liquid Organic',
    stiffness: 140,
    damping: 18,
    mass: 1.8,
    description: 'Deep viscous fluid sensation with sustained rhythmic oscillation.',
  },
  {
    name: 'Hyper Elastic',
    stiffness: 600,
    damping: 12,
    mass: 0.7,
    description: 'Playful high-rebound bounce for gamified and kinetic flourishes.',
  },
  {
    name: 'Brutalist Monolith',
    stiffness: 240,
    damping: 48,
    mass: 3.2,
    description: 'Heavy structural momentum suited for luxury and architectural surfaces.',
  },
];

export const PhysicsPlayground: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<PhysicsPreset>(PRESETS[0]);
  const [stiffness, setStiffness] = useState(PRESETS[0].stiffness);
  const [damping, setDamping] = useState(PRESETS[0].damping);
  const [mass, setMass] = useState(PRESETS[0].mass);
  const [activeTab, setActiveTab] = useState<'spring' | 'magnetic' | 'morph' | 'stagger'>('spring');

  // Magnetic button state
  const magnetRef = useRef<HTMLButtonElement>(null);
  const [magnetPos, setMagnetPos] = useState({ x: 0, y: 0 });

  // Spring animation state for tab 'spring'
  const [springKey, setSpringKey] = useState(0);

  // Morph state
  const [shapeIndex, setShapeIndex] = useState(0);

  // Stagger state
  const [staggerTrigger, setStaggerTrigger] = useState(0);

  const shapes = [
    { name: 'Prism', d: 'M50 5 L95 85 L5 85 Z' },
    { name: 'Hexagon', d: 'M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z' },
    { name: 'Diamond', d: 'M50 5 L95 50 L50 95 L5 50 Z' },
    { name: 'Octa-Star', d: 'M50 0 L62 38 L100 50 L62 62 L50 100 L38 62 L0 50 L38 38 Z' },
  ];

  const handlePresetSelect = (preset: PhysicsPreset) => {
    sound.playWoosh();
    setSelectedPreset(preset);
    setStiffness(preset.stiffness);
    setDamping(preset.damping);
    setMass(preset.mass);
    setSpringKey((k) => k + 1);
  };

  const handleMagneticMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!magnetRef.current) return;
    const rect = magnetRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
    const maxRadius = 140;

    if (dist < maxRadius) {
      const pullFactor = (1 - dist / maxRadius) * 26;
      setMagnetPos({
        x: ((e.clientX - centerX) / dist) * pullFactor,
        y: ((e.clientY - centerY) / dist) * pullFactor,
      });
    } else {
      setMagnetPos({ x: 0, y: 0 });
    }
  };

  const handleMagneticLeave = () => {
    setMagnetPos({ x: 0, y: 0 });
  };

  // Generate Spring Curve SVG points dynamically
  const generateCurvePoints = () => {
    const points: string[] = [];
    const width = 360;
    const height = 100;
    const centerY = 50;
    
    // Damped harmonic oscillator approximation:
    // x(t) = exp(-zeta * omega * t) * cos(omega_d * t)
    const omega = Math.sqrt(stiffness / mass);
    const zeta = damping / (2 * Math.sqrt(stiffness * mass));
    const omegaD = omega * Math.sqrt(Math.max(0.001, 1 - zeta * zeta));

    for (let i = 0; i <= 100; i++) {
      const t = (i / 100) * 1.5; // 0 to 1.5s
      const x = (i / 100) * width;
      let envelope = Math.exp(-zeta * omega * t);
      if (isNaN(envelope)) envelope = 0;
      let val = 1 - envelope * Math.cos(omegaD * t);
      if (isNaN(val)) val = 1;
      
      const y = centerY - (val - 0.5) * 40;
      points.push(`${x},${Math.max(10, Math.min(height - 10, y))}`);
    }
    return points.join(' ');
  };

  return (
    <section id="playground" className="py-24 border-b border-zinc-900 bg-[#060608] relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
              <span>Interactive Physics Engine</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-400">Computational Spring Sandbox</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display [text-wrap:balance]">
              The Motion Physics Laboratory
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
            Test and calibrate custom mass-spring-damper mathematical curves in real time. 
            Feel how physics changes the tactile soul of an interface.
          </p>
        </div>

        {/* 2-Column Grid: Controls & Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-5 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 flex flex-col gap-6">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3 block">
                Select Calibrated Spring Presets
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => handlePresetSelect(preset)}
                    className={`p-3 rounded-xl text-left border transition-all text-xs flex flex-col gap-1 ${
                      selectedPreset.name === preset.name
                        ? 'border-amber-400/80 bg-amber-400/10 text-white'
                        : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                    }`}
                  >
                    <span className="font-semibold text-zinc-200">{preset.name}</span>
                    <span className="text-[11px] text-zinc-400 line-clamp-2 leading-tight">
                      {preset.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Parameter Sliders */}
            <div className="flex flex-col gap-5 pt-4 border-t border-zinc-800/80">
              {/* Stiffness Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-zinc-300">Stiffness (k)</span>
                  <span className="text-amber-400 tabular-nums">{stiffness} N/m</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="800"
                  step="10"
                  value={stiffness}
                  onChange={(e) => {
                    setStiffness(Number(e.target.value));
                    setSpringKey((k) => k + 1);
                    sound.playClick(200 + Number(e.target.value) / 2, 0.02);
                  }}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-1">
                  <span>Soft / Elastic (60)</span>
                  <span>Rigid / Instant (800)</span>
                </div>
              </div>

              {/* Damping Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-zinc-300">Damping (c)</span>
                  <span className="text-amber-400 tabular-nums">{damping} N·s/m</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="1"
                  value={damping}
                  onChange={(e) => {
                    setDamping(Number(e.target.value));
                    setSpringKey((k) => k + 1);
                    sound.playClick(300 + Number(e.target.value) * 6, 0.02);
                  }}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-1">
                  <span>Underdamped / Ringing (5)</span>
                  <span>Critically Damped (60)</span>
                </div>
              </div>

              {/* Mass Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-zinc-300">Mass (m)</span>
                  <span className="text-amber-400 tabular-nums">{mass.toFixed(1)} kg</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.1"
                  value={mass}
                  onChange={(e) => {
                    setMass(Number(e.target.value));
                    setSpringKey((k) => k + 1);
                    sound.playClick(150 + Number(e.target.value) * 40, 0.02);
                  }}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-1">
                  <span>Featherweight (0.5)</span>
                  <span>Heavy Monolith (5.0)</span>
                </div>
              </div>
            </div>

            {/* Live Oscillation Curve Graph */}
            <div className="p-4 rounded-xl bg-black/60 border border-zinc-800 flex flex-col gap-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>Calculated Oscillation Curve</span>
                <span className="text-zinc-400">t = 0 → 1.5s</span>
              </div>
              <div className="w-full h-24 relative overflow-hidden bg-zinc-950 rounded-lg flex items-center justify-center">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 360 100" preserveAspectRatio="none">
                  {/* Grid lines */}
                  <line x1="0" y1="50" x2="360" y2="50" stroke="#27272a" strokeDasharray="3 3" />
                  <polyline
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    points={generateCurvePoints()}
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Interactive Sandbox Visualization Canvas */}
          <div className="lg:col-span-7 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 flex flex-col gap-6">
            {/* Visualizer Mode Tabs */}
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-1.5 p-1 bg-zinc-900 rounded-lg">
                <button
                  onClick={() => {
                    sound.playClick(500);
                    setActiveTab('spring');
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                    activeTab === 'spring'
                      ? 'bg-amber-400 text-black shadow-sm font-semibold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Draggable Spring</span>
                </button>
                <button
                  onClick={() => {
                    sound.playClick(500);
                    setActiveTab('magnetic');
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                    activeTab === 'magnetic'
                      ? 'bg-amber-400 text-black shadow-sm font-semibold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Magnet className="w-3.5 h-3.5" />
                  <span>Magnetic Field</span>
                </button>
                <button
                  onClick={() => {
                    sound.playClick(500);
                    setActiveTab('morph');
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                    activeTab === 'morph'
                      ? 'bg-amber-400 text-black shadow-sm font-semibold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Shapes className="w-3.5 h-3.5" />
                  <span>Shape Morph</span>
                </button>
                <button
                  onClick={() => {
                    sound.playClick(500);
                    setActiveTab('stagger');
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                    activeTab === 'stagger'
                      ? 'bg-amber-400 text-black shadow-sm font-semibold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Type className="w-3.5 h-3.5" />
                  <span>Text Choreography</span>
                </button>
              </div>

              <div className="text-xs font-mono text-zinc-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>60 FPS Hardware Rendered</span>
              </div>
            </div>

            {/* Sandbox Canvas */}
            <div className="relative w-full h-[400px] rounded-xl bg-black border border-zinc-800/80 overflow-hidden flex items-center justify-center p-4">
              {/* Grid Background Pattern */}
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`,
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Tab 1: Draggable Spring Disc */}
              {activeTab === 'spring' && (
                <div className="flex flex-col items-center justify-center w-full h-full">
                  <motion.div
                    key={springKey}
                    drag
                    dragConstraints={{ left: -140, right: 140, top: -110, bottom: 110 }}
                    dragElastic={0.25}
                    dragTransition={{
                      bounceStiffness: stiffness,
                      bounceDamping: damping,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness,
                      damping,
                      mass,
                    }}
                    onDragStart={() => sound.playSpring()}
                    onDragEnd={() => sound.playClick(320)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-32 h-32 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-200 text-black font-bold p-4 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing shadow-[0_0_35px_rgba(251,191,36,0.35)] select-none z-10"
                  >
                    <span className="text-xs font-mono uppercase tracking-wider text-black/70">Drag Me</span>
                    <span className="text-sm font-display font-black text-black">SPRING RIG</span>
                    <span className="text-[10px] font-mono text-black/60 mt-1">Release to feel</span>
                  </motion.div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-zinc-400 pointer-events-none">
                    <span>Click & fling orb anywhere</span>
                    <span>Physics updates automatically</span>
                  </div>
                </div>
              )}

              {/* Tab 2: Magnetic Field Arena */}
              {activeTab === 'magnetic' && (
                <div
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                  className="w-full h-full flex flex-col items-center justify-center relative cursor-crosshair"
                >
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-56 h-56 rounded-full border border-dashed border-amber-400/20 animate-pulse" />
                  </div>

                  <motion.button
                    ref={magnetRef}
                    animate={{ x: magnetPos.x, y: magnetPos.y }}
                    transition={{
                      type: 'spring',
                      stiffness: stiffness * 1.2,
                      damping: damping * 0.9,
                      mass,
                    }}
                    onClick={() => {
                      sound.playChime();
                    }}
                    className="px-8 py-4 rounded-xl bg-zinc-900 border border-amber-400/60 text-white font-display font-bold text-base flex items-center gap-3 shadow-[0_0_30px_rgba(251,191,36,0.2)] hover:border-amber-400 transition-colors"
                  >
                    <Magnet className="w-5 h-5 text-amber-400" />
                    <span>Magnetic Core Button</span>
                  </motion.button>

                  <div className="absolute bottom-4 text-xs font-mono text-zinc-400">
                    Hover cursor near button to trigger magnetic attraction radius
                  </div>
                </div>
              )}

              {/* Tab 3: Morphing Geometric Paths */}
              {activeTab === 'morph' && (
                <div className="flex flex-col items-center justify-center w-full h-full gap-6">
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <motion.path
                        d={shapes[shapeIndex].d}
                        fill="rgba(251, 191, 36, 0.15)"
                        stroke="#fbbf24"
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                        transition={{
                          type: 'spring',
                          stiffness,
                          damping,
                          mass,
                        }}
                      />
                    </svg>
                  </div>

                  <div className="flex items-center gap-3">
                    {shapes.map((s, idx) => (
                      <button
                        key={s.name}
                        onClick={() => {
                          sound.playSpring();
                          setShapeIndex(idx);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                          shapeIndex === idx
                            ? 'bg-amber-400 text-black font-bold'
                            : 'bg-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>

                  <span className="text-xs font-mono text-zinc-400">
                    Click shapes to interpolate vertices with active spring parameters
                  </span>
                </div>
              )}

              {/* Tab 4: Staggered Kinetic Typography */}
              {activeTab === 'stagger' && (
                <div className="flex flex-col items-center justify-center w-full h-full gap-8">
                  <div className="flex items-center gap-1.5 text-3xl sm:text-5xl font-black font-display tracking-tight text-white overflow-hidden">
                    {"KINETIC".split("").map((letter, i) => (
                      <motion.span
                        key={`${staggerTrigger}-${i}`}
                        initial={{ y: 80, opacity: 0, rotateZ: 20 }}
                        animate={{ y: 0, opacity: 1, rotateZ: 0 }}
                        transition={{
                          type: 'spring',
                          stiffness,
                          damping,
                          mass,
                          delay: i * 0.05,
                        }}
                        className="inline-block hover:text-amber-400 cursor-default transition-colors"
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      sound.playWoosh();
                      setStaggerTrigger((prev) => prev + 1);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Re-trigger Stagger Choreography</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
