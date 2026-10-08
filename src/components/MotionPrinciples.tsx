import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MotionPrinciple } from '../types';
import { sound } from '../utils/sound';
import { Play, RotateCcw, Check, Sparkles } from 'lucide-react';

const PRINCIPLES: MotionPrinciple[] = [
  {
    id: 'squash',
    title: 'Squash & Stretch',
    tagline: 'Giving organic elasticity and kinetic mass to digital objects',
    explanation: 'When an object moves fast or collides, rigid geometry looks artificial. Squash & Stretch maintains volume while deforming along velocity vectors, signaling weight and material density.',
    digitalBenefit: 'Turns rigid cards and modal sheets into tactile physical surfaces.',
    demoType: 'squash',
  },
  {
    id: 'anticipation',
    title: 'Anticipation',
    tagline: 'Pre-cueing user attention before high-velocity displacement',
    explanation: 'A baseball pitcher draws back before throwing. In motion interfaces, a slight backward recoil or scale-down primes human visual cognition for the upcoming transition.',
    digitalBenefit: 'Prevents jarring transitions and increases task completion confidence.',
    demoType: 'anticipation',
  },
  {
    id: 'stagger',
    title: 'Staging & Choreographed Stagger',
    tagline: 'Directing ocular focus sequentially across content density',
    explanation: 'Revealing 12 items simultaneously causes cognitive overload. By staggering reveals by 25–40ms, the eye is guided along the visual reading path effortlessly.',
    digitalBenefit: 'Transforms dense dashboard matrices into readable progressive hierarchy.',
    demoType: 'stagger',
  },
  {
    id: 'inertia',
    title: 'Follow-Through & Natural Decay',
    tagline: 'Momentum dissipation that honors physical laws of nature',
    explanation: 'Nothing in the physical universe stops instantaneously. Kinetic interfaces simulate residual inertia, allowing nested children to follow the parent with natural lag.',
    digitalBenefit: 'Creates an effortless luxury sensation of fluidity and digital grace.',
    demoType: 'inertia',
  },
];

export const MotionPrinciples: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('squash');
  const [isEnhanced, setIsEnhanced] = useState<boolean>(true);
  const [animCycle, setAnimCycle] = useState<number>(0);

  const currentPrinciple = PRINCIPLES.find((p) => p.id === selectedId) || PRINCIPLES[0];

  const triggerAnim = () => {
    sound.playSpring();
    setAnimCycle((c) => c + 1);
  };

  return (
    <section id="principles" className="py-24 border-b border-zinc-900 bg-[#060608]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
              <span>Foundation & Theory</span>
              <span className="text-zinc-600" aria-hidden="true">·</span>
              <span className="text-zinc-400">Classical Principles In Code</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display">
              The Laws of Digital Motion
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
            How we translate Disney's 12 timeless animation principles into zero-latency, 
            GPU-accelerated interface choreography.
          </p>
        </div>

        {/* Interactive Layout: Left Principle Switcher, Right Live Interactive Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Principle Tabs */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {PRINCIPLES.map((principle) => {
              const active = principle.id === selectedId;
              return (
                <button
                  key={principle.id}
                  onClick={() => {
                    sound.playClick(450);
                    setSelectedId(principle.id);
                    setAnimCycle((c) => c + 1);
                  }}
                  className={`text-left p-5 rounded-xl border transition-all flex flex-col gap-1.5 ${
                    active
                      ? 'border-amber-400/80 bg-zinc-900/90 text-white shadow-lg'
                      : 'border-zinc-800/80 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold font-display text-white">
                      {principle.title}
                    </span>
                    {active && <span className="text-xs font-mono text-amber-400">ACTIVE DEMO</span>}
                  </div>
                  <span className="text-xs text-zinc-400 leading-relaxed">
                    {principle.tagline}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Live Interactive Comparison Stage */}
          <div className="lg:col-span-7 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 flex flex-col gap-6">
            {/* Top Stage Control Header */}
            <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-zinc-800">
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  {currentPrinciple.title}
                </h3>
                <span className="text-xs text-zinc-400 font-mono">
                  Interactive Physics Comparison
                </span>
              </div>

              {/* Mode Toggle: With vs Without Principle */}
              <div className="flex items-center gap-2 p-1 bg-zinc-900 rounded-lg border border-zinc-800">
                <button
                  onClick={() => {
                    sound.playClick(300);
                    setIsEnhanced(false);
                    setAnimCycle((c) => c + 1);
                  }}
                  className={`px-3 py-1.5 text-xs rounded-md font-mono transition-colors ${
                    !isEnhanced
                      ? 'bg-zinc-800 text-white font-semibold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Linear (Raw)
                </button>
                <button
                  onClick={() => {
                    sound.playClick(600);
                    setIsEnhanced(true);
                    setAnimCycle((c) => c + 1);
                  }}
                  className={`px-3 py-1.5 text-xs rounded-md font-mono transition-colors ${
                    isEnhanced
                      ? 'bg-amber-400 text-black font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Kinetic Principle
                </button>
              </div>
            </div>

            {/* Interactive Motion Stage */}
            <div className="relative w-full h-64 rounded-xl bg-black border border-zinc-800 flex items-center justify-center overflow-hidden p-6">
              {/* Background Ruler */}
              <div className="absolute inset-x-8 bottom-8 h-[1px] bg-zinc-800 flex justify-between">
                {[0, 25, 50, 75, 100].map((tick) => (
                  <span key={tick} className="text-[9px] font-mono text-zinc-600 -translate-y-4">
                    {tick}%
                  </span>
                ))}
              </div>

              {/* Demo: Squash & Stretch */}
              {currentPrinciple.id === 'squash' && (
                <div className="w-full flex items-center justify-center">
                  <motion.div
                    key={`squash-${animCycle}-${isEnhanced}`}
                    initial={{ y: -80, scaleX: 1, scaleY: 1 }}
                    animate={
                      isEnhanced
                        ? {
                            y: [ -80, 40, 40, -40, 40, 40 ],
                            scaleX: [ 1, 1.45, 1.3, 0.9, 1.15, 1 ],
                            scaleY: [ 1, 0.65, 0.75, 1.15, 0.88, 1 ],
                          }
                        : {
                            y: [ -80, 40, 40, 40 ],
                            scaleX: 1,
                            scaleY: 1,
                          }
                    }
                    transition={
                      isEnhanced
                        ? { duration: 1.4, times: [0, 0.35, 0.45, 0.75, 0.95, 1], ease: 'easeInOut' }
                        : { duration: 0.6, ease: 'linear' }
                    }
                    className="w-18 h-18 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 shadow-[0_0_30px_rgba(251,191,36,0.3)] flex items-center justify-center text-black font-black text-xs font-mono select-none"
                  >
                    MASS
                  </motion.div>
                </div>
              )}

              {/* Demo: Anticipation */}
              {currentPrinciple.id === 'anticipation' && (
                <div className="w-full flex items-center justify-center">
                  <motion.div
                    key={`anticipation-${animCycle}-${isEnhanced}`}
                    initial={{ x: -120 }}
                    animate={
                      isEnhanced
                        ? {
                            x: [ -120, -145, 120, 105, 110 ],
                            scale: [ 1, 0.88, 1.05, 0.98, 1 ],
                          }
                        : {
                            x: [ -120, 110 ],
                            scale: 1,
                          }
                    }
                    transition={
                      isEnhanced
                        ? { duration: 1.2, times: [0, 0.25, 0.7, 0.88, 1], ease: 'easeOut' }
                        : { duration: 0.8, ease: 'linear' }
                    }
                    className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-sky-400 to-cyan-200 text-black font-black text-xs font-mono flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.3)] select-none"
                  >
                    THRUST
                  </motion.div>
                </div>
              )}

              {/* Demo: Staging & Stagger */}
              {currentPrinciple.id === 'stagger' && (
                <div className="flex items-center gap-3">
                  {[0, 1, 2, 3].map((cardIdx) => (
                    <motion.div
                      key={`stagger-${cardIdx}-${animCycle}-${isEnhanced}`}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={
                        isEnhanced
                          ? { type: 'spring', stiffness: 380, damping: 24, delay: cardIdx * 0.08 }
                          : { duration: 0.2, delay: 0 }
                      }
                      className="w-14 h-24 rounded-lg bg-zinc-800 border border-zinc-700 flex flex-col items-center justify-center gap-1 text-[11px] font-mono text-zinc-300"
                    >
                      <span className="text-amber-400 font-bold">0{cardIdx + 1}</span>
                      <span className="text-[9px] text-zinc-400">LAYER</span>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Demo: Follow Through & Inertia */}
              {currentPrinciple.id === 'inertia' && (
                <div className="w-full flex items-center justify-center">
                  <motion.div
                    key={`inertia-${animCycle}-${isEnhanced}`}
                    initial={{ x: -140, rotate: 0 }}
                    animate={
                      isEnhanced
                        ? {
                            x: [ -140, 60, -20, 10, 0 ],
                            rotate: [ 0, 15, -8, 3, 0 ],
                          }
                        : {
                            x: [ -140, 0 ],
                            rotate: 0,
                          }
                    }
                    transition={
                      isEnhanced
                        ? { duration: 1.3, times: [0, 0.45, 0.75, 0.9, 1], ease: 'easeOut' }
                        : { duration: 0.5, ease: 'linear' }
                    }
                    className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-300 text-black font-black text-xs font-mono flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.3)] select-none"
                  >
                    MOMENTUM
                  </motion.div>
                </div>
              )}

              {/* Stage Replay Button */}
              <div className="absolute top-4 right-4">
                <button
                  onClick={triggerAnim}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Replay</span>
                </button>
              </div>
            </div>

            {/* Explanatory Prose & Real-World Impact */}
            <div className="flex flex-col gap-3">
              <p className="text-zinc-300 text-sm leading-relaxed">
                {currentPrinciple.explanation}
              </p>
              <div className="flex items-start gap-2 text-xs font-mono text-amber-300/90 bg-amber-400/5 p-3 rounded-xl border border-amber-400/20">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Impact: {currentPrinciple.digitalBenefit}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
