import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Sliders, Monitor, Layers, Cpu } from 'lucide-react';
import { Project } from '../types';
import { sound } from '../utils/sound';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [scrubber, setScrubber] = useState(42);

  // Keyboard escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Simulated scrubbing loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setScrubber((prev) => (prev >= 100 ? 0 : prev + 0.4));
    }, 30);
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl z-10 flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span>Client: {project.client}</span>
              <span aria-hidden="true">·</span>
              <span>Year {project.year}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
              {project.title}
            </h3>
          </div>

          <button
            onClick={() => {
              sound.playClick(400);
              onClose();
            }}
            className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 flex flex-col gap-8">
          {/* Main Visual Player Area */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-zinc-800 flex items-center justify-center group">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-100"
              style={{
                filter: `brightness(${0.85 + Math.sin((scrubber * Math.PI) / 50) * 0.15}) contrast(${1 + Math.sin((scrubber * Math.PI) / 50) * 0.1})`,
                transform: `scale(${1 + (scrubber / 100) * 0.04})`,
              }}
            />

            {/* In-Frame HUD Overlays */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>{project.fps} FPS LOSSLESS REEL</span>
            </div>

            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono text-amber-400 tabular-nums">
              FRAME {Math.round((scrubber / 100) * 360)} / 360
            </div>

            {/* Bottom Scrubber Bar Overlay */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-300">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      sound.playClick(600);
                      setIsPlaying(!isPlaying);
                    }}
                    className="p-1.5 rounded-md bg-white text-black hover:bg-zinc-200 transition-colors"
                    aria-label={isPlaying ? "Pause simulation" : "Play simulation"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black" />}
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick(400);
                      setScrubber(0);
                    }}
                    className="p-1.5 rounded-md bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
                    aria-label="Restart playback"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <span className="tabular-nums">00:{Math.floor((scrubber / 100) * 42).toString().padStart(2, '0')}</span>
                  <span className="text-zinc-500">/</span>
                  <span className="text-zinc-400">{project.duration}</span>
                </div>

                <span className="text-amber-400 tabular-nums">
                  {scrubber.toFixed(1)}% Render Progress
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={scrubber}
                onChange={(e) => {
                  setIsPlaying(false);
                  setScrubber(parseFloat(e.target.value));
                  sound.playClick(300 + parseFloat(e.target.value) * 6, 0.02);
                }}
                className="w-full h-1.5 bg-zinc-700/60 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          </div>

          {/* Description & Technical Breakdown Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <h4 className="text-lg font-semibold text-white font-display">
                Artistic Brief & Architectural Execution
              </h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {project.subtitle}. {project.description}
              </p>
              
              <div className="mt-2 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                <span className="text-xs font-mono uppercase text-zinc-400 block mb-1">
                  Empirical Performance Metric
                </span>
                <span className="text-base font-semibold text-amber-300">
                  {project.metrics}
                </span>
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="lg:col-span-5 flex flex-col gap-4 bg-zinc-900/40 p-5 rounded-xl border border-zinc-800/80">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Technical Kinetic Rig
              </span>

              <div className="flex flex-col gap-3 text-xs font-mono">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                  <span className="text-zinc-400">Easing Math</span>
                  <span className="text-white font-mono">{project.easingCurve}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                  <span className="text-zinc-400">Framerate Target</span>
                  <span className="text-amber-400 tabular-nums">{project.fps} FPS Solid</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                  <span className="text-zinc-400">Spring Stiffness</span>
                  <span className="text-white tabular-nums">{project.stiffness} N/m</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                  <span className="text-zinc-400">Spring Damping</span>
                  <span className="text-white tabular-nums">{project.damping} N·s/m</span>
                </div>
                <div className="flex flex-col gap-1.5 pt-1">
                  <span className="text-zinc-400">Software & Pipeline</span>
                  <div className="flex flex-wrap gap-x-2 gap-y-1 text-zinc-300">
                    {project.tools.map((tool, i) => (
                      <span key={tool}>
                        {tool}
                        {i < project.tools.length - 1 && <span className="text-zinc-600 ml-2" aria-hidden="true">·</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
