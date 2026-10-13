/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, Mail, MapPin, MessageSquare, Shield, SlidersHorizontal, Info } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business.ts';

interface FooterProps {
  onOpenChat: () => void;
  onOpenPrivacy: () => void;
  onOpenCookieSettings: () => void;
  onOpenHandover: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenChat,
  onOpenPrivacy,
  onOpenCookieSettings,
  onOpenHandover,
}) => {
  const currentYear = 2026;

  return (
    <footer className="w-full bg-[#00173d] text-white border-t border-blue-950 mt-auto">
      {/* Visual Brand Artwork Integration (Asset 2: 68297) */}
      <div className="w-full bg-[#00102b] border-b border-blue-900/40">
        <div className="max-w-5xl mx-auto px-4 py-3 sm:py-4 flex justify-center">
          <picture className="w-full max-w-3xl flex justify-center">
            <source srcSet={BUSINESS_CONFIG.assets.footerVector} type="image/svg+xml" />
            <img
              src={BUSINESS_CONFIG.assets.footerArtwork}
              alt="BLUE X LTD - Walsall Contact Details and 'The Niche In Professional Works' brand banner"
              width="900"
              height="380"
              className="w-full h-auto max-h-56 sm:max-h-64 object-contain rounded-lg shadow-md"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </picture>
        </div>
      </div>

      {/* Accessible HTML Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          
          {/* Column 1: Company & Business Descriptors */}
          <div className="space-y-3">
            <h2 className="text-lg font-extrabold tracking-tight text-white flex items-center gap-2">
              <span>{BUSINESS_CONFIG.name}</span>
            </h2>
            <p className="text-xs font-semibold uppercase tracking-wider text-sky-400">
              {BUSINESS_CONFIG.primaryDescriptor}
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              {BUSINESS_CONFIG.serviceDescriptor}
            </p>
            <div className="pt-2">
              <p className="text-xs font-medium text-amber-200/90 italic">
                “{BUSINESS_CONFIG.slogan}”
              </p>
            </div>
          </div>

          {/* Column 2: Location & Trading Base */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Business Location
            </h3>
            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-semibold text-white">{BUSINESS_CONFIG.location.city}</p>
                <p>{BUSINESS_CONFIG.location.county}</p>
                <p>{BUSINESS_CONFIG.location.country}, {BUSINESS_CONFIG.location.sovereignState}</p>
                <p className="text-[11px] text-slate-400 mt-1 italic">
                  * Trading base. Registered office details pending Companies House filing confirmation.
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: Direct Contact Information */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Contact Details
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <a
                  href={BUSINESS_CONFIG.contact.phoneHref}
                  className="inline-flex items-center gap-2 hover:text-white transition-colors group"
                  aria-label={`Call ${BUSINESS_CONFIG.contact.phoneDisplay}`}
                >
                  <Phone className="w-3.5 h-3.5 text-sky-400 group-hover:text-sky-300" aria-hidden="true" />
                  <span className="font-bold text-white group-hover:underline">{BUSINESS_CONFIG.contact.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_CONFIG.contact.emailHref}
                  className="inline-flex items-center gap-2 hover:text-white transition-colors group"
                  aria-label={`Email ${BUSINESS_CONFIG.contact.emailDisplay}`}
                >
                  <Mail className="w-3.5 h-3.5 text-sky-400 group-hover:text-sky-300" aria-hidden="true" />
                  <span className="font-bold text-amber-300 group-hover:underline">{BUSINESS_CONFIG.contact.emailDisplay}</span>
                </a>
              </li>
              <li className="pt-1">
                <button
                  type="button"
                  onClick={onOpenChat}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-900/80 hover:bg-blue-800 text-sky-100 rounded-md text-xs font-semibold border border-blue-700/60 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
                  <span>Launch Live Chat Support</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Compliance & Controls */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Compliance &amp; Governance
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              BLUE X LTD complies with UK GDPR, Data Protection Act 2018, and PECR regulations.
            </p>
            <div className="flex flex-col gap-2 pt-1 text-xs">
              <button
                type="button"
                onClick={onOpenPrivacy}
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors text-left"
              >
                <Shield className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
                <span className="underline underline-offset-2">Privacy Notice (UK GDPR)</span>
              </button>

              <button
                type="button"
                onClick={onOpenCookieSettings}
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors text-left"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
                <span className="underline underline-offset-2">Cookie Settings &amp; Notice</span>
              </button>

              <button
                type="button"
                onClick={onOpenHandover}
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors text-left pt-1"
                aria-label="Open Owner Handover & System Status Panel"
              >
                <Info className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                <span className="text-[11px]">Owner Handover &amp; System Status</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Legal Copyright Bar */}
        <div className="mt-10 pt-6 border-t border-blue-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {currentYear} {BUSINESS_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <span>British English Edition</span>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="hover:text-slate-200 transition-colors"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={onOpenCookieSettings}
              className="hover:text-slate-200 transition-colors"
            >
              Cookies
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
