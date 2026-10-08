import React, { useState } from 'react';
import { Calculator, Check, ArrowRight, ShieldCheck, Clock, Layers } from 'lucide-react';
import { sound } from '../utils/sound';

interface ScopeCalculatorProps {
  onOpenCommission: (prefillNotes?: string) => void;
}

export const ScopeCalculator: React.FC<ScopeCalculatorProps> = ({ onOpenCommission }) => {
  const [projectType, setProjectType] = useState<'brand' | 'product3d' | 'ui' | 'commercial'>('brand');
  const [format, setFormat] = useState<'video' | 'interactive' | 'spatial'>('video');
  const [turnaround, setTurnaround] = useState<'express' | 'standard' | 'deep'>('standard');
  const [soundDesign, setSoundDesign] = useState<boolean>(true);

  // Dynamic pricing algorithm
  const basePrices = {
    brand: 4800,
    product3d: 7200,
    ui: 5400,
    commercial: 11500,
  };

  const formatMultipliers = {
    video: 1.0,
    interactive: 1.25,
    spatial: 1.45,
  };

  const turnaroundMultipliers = {
    express: 1.35,
    standard: 1.0,
    deep: 1.15,
  };

  const soundFee = soundDesign ? 1400 : 0;

  const totalEstimate = Math.round(
    basePrices[projectType] * formatMultipliers[format] * turnaroundMultipliers[turnaround] + soundFee
  );

  const estimatedWeeks = turnaround === 'express' ? '1.5 - 2' : turnaround === 'standard' ? '3 - 4' : '5 - 6';

  const handleLaunchCommission = () => {
    sound.playWoosh();
    const notes = `Type: ${projectType}, Format: ${format}, Turnaround: ${turnaround}, Sound: ${soundDesign ? 'Yes' : 'No'}, Estimate: $${totalEstimate.toLocaleString()}`;
    onOpenCommission(notes);
  };

  return (
    <section id="estimator" className="py-24 border-b border-zinc-900 bg-[#08080a]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
              <span>Transparent Estimation</span>
              <span className="text-zinc-600" aria-hidden="true">·</span>
              <span className="text-zinc-400">Deterministic Scope Engine</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display">
              Motion Scope & Cost Matrix
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
            Calibrate your production requirements with full fidelity. Every project includes
            uncompressed 120fps master exports and complete source rigs.
          </p>
        </div>

        {/* 2-Column Layout: Parameters on Left, Output Summary Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-7 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 flex flex-col gap-8">
            {/* Step 1: Project Type */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3 block">
                01. Production Classification
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'brand', title: 'Brand Motion Identity', desc: 'Kinetic logo systems, typography guidelines, and sonic transitions.' },
                  { id: 'product3d', title: '3D Product Physics', desc: 'Exploded mechanical rigs, raytraced materials, and zero-gravity fluid dynamics.' },
                  { id: 'ui', title: 'UI / Interaction Design', desc: 'Lottie micro-interactions, spring curves, and code-ready web choreography.' },
                  { id: 'commercial', title: 'Commercial Film Reel', desc: 'Full narrative 4K title sequence, 3D character rigs, and cinematic post.' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      sound.playClick(400);
                      setProjectType(item.id as typeof projectType);
                    }}
                    className={`p-4 rounded-xl text-left border transition-all flex flex-col gap-1 ${
                      projectType === item.id
                        ? 'border-amber-400/80 bg-amber-400/10 text-white'
                        : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                    }`}
                  >
                    <span className="font-semibold text-sm text-zinc-200">{item.title}</span>
                    <span className="text-xs text-zinc-400 leading-tight">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Format & Pipeline */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3 block">
                02. Delivery Pipeline Format
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'video', label: 'ProRes 4K / WebM', sub: 'Standard Video Deliverables' },
                  { id: 'interactive', label: 'React / WebGL Code', sub: 'Hardware Accelerated' },
                  { id: 'spatial', label: 'Spatial VisionOS', sub: '3D Immersive Spatial Rig' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      sound.playClick(500);
                      setFormat(item.id as typeof format);
                    }}
                    className={`p-3 rounded-xl text-left border transition-all text-xs flex flex-col gap-1 ${
                      format === item.id
                        ? 'border-amber-400 bg-amber-400/10 text-white font-semibold'
                        : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                    }`}
                  >
                    <span className="text-zinc-200 font-medium">{item.label}</span>
                    <span className="text-[10px] text-zinc-400">{item.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Turnaround & Audio Addon */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-zinc-800/80">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2.5 block">
                  03. Production Velocity
                </label>
                <div className="flex flex-col gap-2">
                  {[
                    { id: 'express', label: 'Express Sprint (10-14 Days)' },
                    { id: 'standard', label: 'Standard Cadence (3-4 Weeks)' },
                    { id: 'deep', label: 'Comprehensive R&D (5-6 Weeks)' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        sound.playClick(450);
                        setTurnaround(item.id as typeof turnaround);
                      }}
                      className={`px-3 py-2 rounded-lg text-left text-xs font-mono border transition-all ${
                        turnaround === item.id
                          ? 'border-amber-400 bg-amber-400/10 text-white font-bold'
                          : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2.5 block">
                  04. Bespoke Audio Engineering
                </label>
                <button
                  onClick={() => {
                    sound.playClick(soundDesign ? 300 : 700);
                    setSoundDesign(!soundDesign);
                  }}
                  className={`w-full p-3 rounded-xl border text-left flex items-start gap-3 transition-colors ${
                    soundDesign
                      ? 'border-amber-400/80 bg-amber-400/10 text-white'
                      : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center shrink-0 ${
                    soundDesign ? 'border-amber-400 bg-amber-400 text-black' : 'border-zinc-700'
                  }`}>
                    {soundDesign && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-zinc-200 block">
                      Sonic Brand Design & Foley (+ $1,400)
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      Bespoke synthesizers, tactile haptic clicks, and sub-bass whooshes.
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Real-time Summary Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-8 sticky top-24">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                  Calibrated Investment
                </span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Q3/Q4 Slot Availability
                </span>
              </div>

              {/* Total Price Display */}
              <div className="my-6">
                <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white tabular-nums">
                  ${totalEstimate.toLocaleString()}
                  <span className="text-xs font-normal text-zinc-400 ml-2">USD Net</span>
                </div>
                <div className="text-xs text-zinc-400 mt-2 flex items-center gap-4 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {estimatedWeeks} Weeks Timeline
                  </span>
                  <span>·</span>
                  <span>Full IP Rights Transfer</span>
                </div>
              </div>

              {/* Deliverables Checklist */}
              <div className="flex flex-col gap-2.5 text-xs text-zinc-300 font-mono py-4 border-t border-zinc-800">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Uncompressed 120fps ProRes 4444XQ</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Full source files (Houdini / C4D / Figma / GLSL)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Kinetic tokens & mass-spring calibration specs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>2 rounds of micro-timing refinements included</span>
                </div>
              </div>
            </div>

            {/* Launch Action */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleLaunchCommission}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm font-display tracking-wide uppercase transition-all shadow-[0_0_25px_rgba(251,191,36,0.3)] hover:shadow-[0_0_35px_rgba(251,191,36,0.5)]"
              >
                <span>Reserve Production Window</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-400 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>NDA signed prior to project kick-off</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
