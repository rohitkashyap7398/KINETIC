import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Sparkles, Sliders, ChevronRight } from 'lucide-react';
import { sound } from '../utils/sound';

interface HeroProps {
  onScrollToWorks: () => void;
  onScrollToPlayground: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToWorks, onScrollToPlayground }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [timelineVal, setTimelineVal] = useState(38);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Continuous animation loop when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTimelineVal((prev) => (prev >= 100 ? 0 : prev + 0.35));
    }, 30);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -12;
    const rotY = ((x - centerX) / centerX) * 12;

    setTilt({
      x: rotX,
      y: rotY,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
  };

  // Rotation derived from scrubbed timeline + tilt
  const derivedRotate = (timelineVal * 3.6) + tilt.y;
  const derivedScale = 1 + Math.sin((timelineVal * Math.PI) / 50) * 0.05;

  return (
    <section className="relative pt-12 pb-20 overflow-hidden border-b border-zinc-900">
      {/* Background radial atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-amber-500/10 via-purple-900/5 to-transparent blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Bold Typographic Hierarchy & Quantitative Proof */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Studio Paradigm 2026</span>
            <span className="text-zinc-600" aria-hidden="true">·</span>
            <span className="text-zinc-400">Computational Kinetics</span>
          </div>

          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.08] font-display mb-6 [text-wrap:balance]">
            Motion that defies inertia and captivates the senses.
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl mb-8">
            We engineer high-fidelity 3D fluid simulations, kinetic typography architectures, 
            and zero-latency spatial micro-interactions for visionary brands worldwide.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-12">
            <button
              onClick={() => {
                sound.playWoosh();
                onScrollToWorks();
              }}
              className="flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-black bg-white hover:bg-zinc-200 rounded-lg transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              <span>Explore Selected Works</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                sound.playSpring();
                onScrollToPlayground();
              }}
              className="flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-zinc-300 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-colors"
            >
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>Launch Physics Lab</span>
            </button>
          </div>

          {/* Quantitative Claim-to-Proof Metric Ribbon */}
          <div className="w-full pt-8 border-t border-zinc-800/80 grid grid-cols-3 gap-6 text-left">
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight tabular-nums">
                120<span className="text-amber-400 text-lg">fps</span>
              </div>
              <div className="text-xs text-zinc-400 mt-1">Native Render Standard</div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight tabular-nums">
                0.18<span className="text-amber-400 text-lg">s</span>
              </div>
              <div className="text-xs text-zinc-400 mt-1">Settle Latency Budget</div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight tabular-nums">
                48<span className="text-amber-400 text-lg">+</span>
              </div>
              <div className="text-xs text-zinc-400 mt-1">International Design Honors</div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D Kinetic Tilt Showcase */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-md aspect-[4/4.8] rounded-2xl p-3 bg-gradient-to-b from-zinc-800/80 to-zinc-900/80 border border-zinc-700/60 shadow-2xl transition-transform duration-150 ease-out cursor-grab active:cursor-grabbing"
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Dynamic Glass Glare Sheen */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 z-20"
              style={{
                background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
              }}
            />

            {/* Main Visual Container */}
            <div className="relative w-full h-[78%] rounded-xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src="/src/assets/images/hero_motion_sculpture_1791473701334.jpg"
                alt="3D Kinetic Chrome and Iridescent Glass Sculpture"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-75"
                style={{
                  transform: `scale(${derivedScale}) rotate(${derivedRotate * 0.15}deg)`,
                }}
              />

              {/* Status Badge overlay */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>INTERACTIVE RIG</span>
              </div>

              {/* Live Angle Indicator */}
              <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-amber-300 tabular-nums">
                θ: {Math.round(derivedRotate)}°
              </div>
            </div>

            {/* Interactive Timeline Scrubber & Playback Controls */}
            <div className="mt-3 px-2 py-1.5 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      sound.playClick(600);
                      setIsPlaying(!isPlaying);
                    }}
                    className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
                    aria-label={isPlaying ? "Pause timeline" : "Play timeline"}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                  </button>
                  <span className="text-zinc-300">Timeline Scrubber</span>
                </div>
                <span className="text-amber-400 tabular-nums">
                  {timelineVal.toFixed(1)}% / 100%
                </span>
              </div>

              {/* Custom Range Slider */}
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={timelineVal}
                onChange={(e) => {
                  setIsPlaying(false);
                  setTimelineVal(parseFloat(e.target.value));
                  sound.playClick(400 + parseFloat(e.target.value) * 5, 0.02);
                }}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />

              <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                <span>Drag slider to scrub kinetic curve</span>
                <span>Tilt card with cursor</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
