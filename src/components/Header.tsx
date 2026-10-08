import React, { useState } from 'react';
import { Volume2, VolumeX, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/sound';

interface HeaderProps {
  onOpenCommission: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCommission }) => {
  const [audioEnabled, setAudioEnabled] = useState(false);

  const toggleSound = () => {
    const newState = sound.toggle();
    setAudioEnabled(newState);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#08080a]/85 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark in display face */}
        <a 
          href="#" 
          onClick={() => sound.playClick(800)}
          className="text-2xl font-bold tracking-tighter text-white font-display hover:text-amber-400 transition-colors"
        >
          KINETIC
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a
            href="#works"
            onClick={() => sound.playClick(500)}
            className="hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-white after:transition-all"
          >
            Selected Works
          </a>
          <a
            href="#playground"
            onClick={() => sound.playClick(500)}
            className="hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-white after:transition-all"
          >
            Physics Lab
          </a>
          <a
            href="#principles"
            onClick={() => sound.playClick(500)}
            className="hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-white after:transition-all"
          >
            12 Principles
          </a>
          <a
            href="#estimator"
            onClick={() => sound.playClick(500)}
            className="hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-white after:transition-all"
          >
            Scope & Pricing
          </a>
          <a
            href="#philosophy"
            onClick={() => sound.playClick(500)}
            className="hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-white after:transition-all"
          >
            Philosophy
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSound}
            aria-label={audioEnabled ? "Mute interactive audio" : "Enable interactive audio"}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
          >
            {audioEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Sound: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
                <span className="hidden sm:inline text-zinc-500">Sound: OFF</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              sound.playWoosh();
              onOpenCommission();
            }}
            className="group flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wide uppercase text-black bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-[0_0_20px_rgba(251,191,36,0.25)] hover:shadow-[0_0_25px_rgba(251,191,36,0.45)] whitespace-nowrap shrink-0"
          >
            <span>Commission Work</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </header>
  );
};
