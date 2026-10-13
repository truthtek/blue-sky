/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, Pause, Play } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business.ts';

interface HoldingHeroProps {
  onOpenChat: () => void;
}

export const HoldingHero: React.FC<HoldingHeroProps> = ({ onOpenChat }) => {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  return (
    <main
      id="main-content"
      className="flex-1 relative flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 md:py-20 architectural-grid overflow-hidden"
    >
      {/* Accessible Motion Pause/Play Toggle for decorative animation */}
      <div className="absolute top-4 right-4 z-20">
        <button
          type="button"
          onClick={() => setAnimationsEnabled(!animationsEnabled)}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-slate-500 hover:text-slate-800 bg-white/80 hover:bg-white border border-slate-200/80 rounded-md backdrop-blur-xs transition-colors focus:outline-none focus:ring-1 focus:ring-blue-700"
          aria-label={animationsEnabled ? 'Pause background architectural animation' : 'Enable background architectural animation'}
          title={animationsEnabled ? 'Pause animation' : 'Play animation'}
        >
          {animationsEnabled ? (
            <>
              <Pause className="w-3 h-3 text-slate-500" aria-hidden="true" />
              <span>Pause motion</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 text-slate-500" aria-hidden="true" />
              <span>Resume motion</span>
            </>
          )}
        </button>
      </div>

      {/* Decorative Architectural Drafting Canvas (Linework reveal) */}
      <div
        className="absolute inset-0 pointer-events-none select-none flex items-center justify-center opacity-30"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1000 600"
          className="w-full h-full max-w-6xl max-h-[640px] text-blue-900"
          fill="none"
          stroke="currentColor"
        >
          {/* Subtle architectural elevation structural grid & trusses */}
          <g strokeWidth="0.8" opacity="0.4">
            <line x1="50" y1="500" x2="950" y2="500" />
            <line x1="120" y1="120" x2="120" y2="500" />
            <line x1="880" y1="120" x2="880" y2="500" />
            <line x1="500" y1="80" x2="500" y2="500" strokeDasharray="6 6" />
            <circle cx="500" cy="80" r="4" fill="currentColor" />
          </g>

          {/* Construction Blueprint Reveal Curves */}
          <g
            strokeWidth="1.2"
            opacity="0.6"
            className={animationsEnabled ? 'animate-blueprint-line' : ''}
          >
            {/* Structural roofline pitch */}
            <path d="M 120 280 L 500 130 L 880 280" />
            <path d="M 160 280 L 500 160 L 840 280" />
            {/* Horizontal datum lines */}
            <line x1="160" y1="360" x2="840" y2="360" />
            <line x1="200" y1="440" x2="800" y2="440" />
            {/* Column verticals */}
            <line x1="260" y1="230" x2="260" y2="500" />
            <line x1="420" y1="160" x2="420" y2="500" />
            <line x1="580" y1="160" x2="580" y2="500" />
            <line x1="740" y1="230" x2="740" y2="500" />
          </g>

          {/* Dimension ticks */}
          <g strokeWidth="1" opacity="0.3" fontSize="10" fontFamily="sans-serif">
            <path d="M 120 520 L 120 540 M 880 520 L 880 540 M 120 530 L 880 530" />
            <path d="M 100 130 L 80 130 M 100 500 L 80 500 M 90 130 L 90 500" />
          </g>
        </svg>
      </div>

      {/* Main Card / Core Content Container */}
      <div className="relative z-10 max-w-3xl mx-auto w-full text-center">
        
        {/* Company Identity / Architectural Brand Mark */}
        <div className="mb-6 flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200/80 rounded-full text-xs font-semibold text-blue-900 tracking-wide uppercase">
            <span>{BUSINESS_CONFIG.name}</span>
            <span aria-hidden="true" className="text-blue-300">·</span>
            <span className="text-blue-700">{BUSINESS_CONFIG.location.city}, {BUSINESS_CONFIG.location.county}</span>
          </div>
        </div>

        {/* Primary H1 Heading: Exactly as mandated */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] text-balance">
          Website development in progress
        </h1>

        {/* Mandatory Supporting Copy */}
        <div className="mt-6 sm:mt-8 max-w-2xl mx-auto space-y-2 text-base sm:text-lg text-slate-600 leading-relaxed">
          <p>
            We’re building a new online home for <strong className="font-semibold text-slate-900">BLUE X LTD</strong>.
          </p>
          <p>
            For enquiries about construction, facilities management, installation and project management, please contact our team.
          </p>
        </div>

        {/* Primary Action Buttons: Call Us, Email Us, Live Chat */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {/* Call Us */}
          <a
            href={BUSINESS_CONFIG.contact.phoneHref}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-blue-800 hover:bg-blue-900 active:bg-blue-950 rounded-lg shadow-sm hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 min-w-[140px]"
            aria-label={`Call BLUE X LTD at ${BUSINESS_CONFIG.contact.phoneDisplay}`}
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            <span>Call us</span>
          </a>

          {/* Email Us */}
          <a
            href={BUSINESS_CONFIG.contact.emailHref}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-300 rounded-lg shadow-2xs hover:shadow-xs transition-all focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 min-w-[140px]"
            aria-label={`Email BLUE X LTD at ${BUSINESS_CONFIG.contact.emailDisplay}`}
          >
            <Mail className="w-4 h-4 text-blue-800" aria-hidden="true" />
            <span>Email us</span>
          </a>

          {/* Live Chat */}
          <button
            type="button"
            onClick={onOpenChat}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 active:bg-blue-200 border border-blue-200 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 min-w-[140px]"
            aria-label="Start a human live chat conversation with our team"
          >
            <MessageSquare className="w-4 h-4 text-blue-800" aria-hidden="true" />
            <span>Live chat</span>
          </button>
        </div>

        {/* Subtle Architectural Trust / Descriptor Strip */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 max-w-xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-xs text-slate-500 font-medium">
            <span>{BUSINESS_CONFIG.primaryDescriptor}</span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span>{BUSINESS_CONFIG.serviceDescriptor}</span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span className="font-semibold text-blue-900">“{BUSINESS_CONFIG.slogan}”</span>
          </div>
        </div>

      </div>
    </main>
  );
};
