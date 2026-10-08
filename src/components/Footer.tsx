import React from 'react';
import { ArrowUp } from 'lucide-react';
import { sound } from '../utils/sound';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playWoosh();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#050507] border-t border-zinc-900 text-zinc-400 py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="text-2xl font-bold font-display text-white tracking-tighter">
              KINETIC
            </span>
            <p className="text-xs text-zinc-400 mt-2 max-w-sm">
              Independent digital motion design laboratory. Engineering physics, fluid choreography, and spatial micro-interactions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-8 text-xs font-mono text-zinc-400">
            <div>
              <span className="text-white block font-semibold mb-1">Studios</span>
              <span>Zurich · Tokyo · New York</span>
            </div>
            <div>
              <span className="text-white block font-semibold mb-1">Timezones</span>
              <span className="tabular-nums">CET / JST / EST Synchronized</span>
            </div>
            <div>
              <span className="text-white block font-semibold mb-1">Direct Desk</span>
              <a href="mailto:inquiry@kinetic-motion.studio" className="hover:text-amber-400 transition-colors">
                inquiry@kinetic-motion.studio
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-zinc-900 text-xs text-zinc-400">
          <div>
            © {new Date().getFullYear()} KINETIC Studio AG. All rights reserved. Built with precision spring physics.
          </div>

          <div className="flex items-center gap-6">
            <a href="#works" className="hover:text-white transition-colors">Selected Works</a>
            <a href="#playground" className="hover:text-white transition-colors">Physics Lab</a>
            <a href="#principles" className="hover:text-white transition-colors">12 Principles</a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
