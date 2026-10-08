import React from 'react';
import { Award, Zap, Shield, Sparkles } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote:
        "Before working with KINETIC, our 3D product launches felt like generic tech renders. Their physical spring simulations and zero-gravity fluid dynamics drove an 89% full completion rate on our keynote video and an immediate 140% spike in pre-orders.",
      author: "Elena Rostova",
      role: "VP of Product Experience",
      company: "Nivalis Acoustics Zurich",
    },
    {
      quote:
        "The kinetic typography system KINETIC engineered for the Biennale pavilion became the defining visual signature of our exhibition. The frame-perfect 120fps GPU shaders handled 100,000 visitors without a dropped millisecond.",
      author: "Dr. Matteo Valenti",
      role: "Lead Exhibition Curator",
      company: "Venice Contemporary Arts",
    },
    {
      quote:
        "KINETIC transformed our spatial OS interface from sluggish floating windows into an organic extension of human motor reflex. The 0.14s haptic latency benchmark they achieved set a new standard for our engineering team.",
      author: "Marcus Thorne",
      role: "Chief Design Architect",
      company: "ExoCompute Spatial OS",
    },
  ];

  return (
    <section id="philosophy" className="py-24 border-b border-zinc-900 bg-[#060608]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
              <span>Studio Ethos & Verification</span>
              <span className="text-zinc-600" aria-hidden="true">·</span>
              <span className="text-zinc-400">Verified Client Outcomes</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display">
              Why Motion Dictates Retention
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
            The human visual cortex processes kinetic changes 40% faster than static imagery. 
            When timing is mathematically tuned, user perception transforms into visceral belief.
          </p>
        </div>

        {/* 3 Testimonials in a Clean Horizontal Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 flex flex-col justify-between gap-8 hover:border-zinc-700 transition-colors"
            >
              <p className="text-zinc-300 text-sm leading-relaxed italic">
                "{t.quote}"
              </p>

              <div className="pt-6 border-t border-zinc-800/80">
                <div className="text-sm font-semibold text-white font-display">
                  {t.author}
                </div>
                <div className="text-xs text-amber-400 font-mono mt-0.5">
                  {t.role}
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">
                  {t.company}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Studio Benchmarks Bar */}
        <div className="mt-16 p-8 rounded-2xl bg-zinc-950 border border-zinc-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold font-mono text-white tabular-nums">98.4%</div>
            <div className="text-xs text-zinc-400 font-mono mt-1">Average Retention Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold font-mono text-white tabular-nums">120 FPS</div>
            <div className="text-xs text-zinc-400 font-mono mt-1">Lossless Master Renders</div>
          </div>
          <div>
            <div className="text-3xl font-bold font-mono text-white tabular-nums">0.14s</div>
            <div className="text-xs text-zinc-400 font-mono mt-1">Median Micro-Latency</div>
          </div>
          <div>
            <div className="text-3xl font-bold font-mono text-white tabular-nums">100%</div>
            <div className="text-xs text-zinc-400 font-mono mt-1">Original Procedural Code</div>
          </div>
        </div>
      </div>
    </section>
  );
};
