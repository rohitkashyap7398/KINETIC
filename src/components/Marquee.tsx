import React from 'react';

export const Marquee: React.FC = () => {
  const items = [
    "3D DYNAMICS",
    "KINETIC TYPOGRAPHY",
    "FLUID SIMULATION",
    "SPATIAL UI",
    "SPRING PHYSICS",
    "PROCEDURAL SHADERS",
    "MICRO-INTERACTIONS",
    "COMMERCIAL SHOWREELS",
    "120 FPS RENDERS",
  ];

  return (
    <div className="w-full overflow-hidden border-y border-zinc-800/80 bg-zinc-950/60 py-4 select-none">
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
        {[...items, ...items].map((item, index) => (
          <div key={index} className="flex items-center gap-8 text-sm sm:text-base font-mono tracking-widest text-zinc-400 uppercase">
            <span>{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
};
