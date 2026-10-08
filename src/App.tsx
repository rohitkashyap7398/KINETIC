/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { WorksGrid } from './components/WorksGrid';
import { PhysicsPlayground } from './components/PhysicsPlayground';
import { MotionPrinciples } from './components/MotionPrinciples';
import { ScopeCalculator } from './components/ScopeCalculator';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { CommissionModal } from './components/CommissionModal';
import { Project } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCommissionOpen, setIsCommissionOpen] = useState(false);
  const [commissionNotes, setCommissionNotes] = useState('');

  const handleOpenCommission = (prefillNotes = '') => {
    setCommissionNotes(prefillNotes);
    setIsCommissionOpen(true);
  };

  const scrollToWorks = () => {
    const el = document.getElementById('works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPlayground = () => {
    const el = document.getElementById('playground');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-[#ededef] flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      {/* 3-Zone Fixed Navigation Header */}
      <Header onOpenCommission={() => handleOpenCommission()} />

      <main className="flex-1">
        {/* Avant-Garde Split Hero with 3D Tilt Card & Scrubber */}
        <Hero
          onScrollToWorks={scrollToWorks}
          onScrollToPlayground={scrollToPlayground}
        />

        {/* Continuous Kinetic Ribbon Divider */}
        <Marquee />

        {/* Selected Works Bento Grid */}
        <WorksGrid onSelectProject={(p) => setSelectedProject(p)} />

        {/* Interactive Physics Sandbox & Spring Calibrator */}
        <PhysicsPlayground />

        {/* The 12 Laws of Digital Motion Comparison */}
        <MotionPrinciples />

        {/* Dynamic Project Scope & Budget Calculator */}
        <ScopeCalculator onOpenCommission={handleOpenCommission} />

        {/* Studio Philosophy & Proven Client Outcomes */}
        <Testimonials />
      </main>

      {/* Editorial Studio Footer */}
      <Footer />

      {/* Interactive Project Lightbox Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Project Commission Inquiry Modal */}
      <CommissionModal
        isOpen={isCommissionOpen}
        onClose={() => setIsCommissionOpen(false)}
        initialNotes={commissionNotes}
      />
    </div>
  );
}
