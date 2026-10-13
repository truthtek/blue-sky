/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, Menu, X, ArrowUpRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business.ts';

interface HeaderProps {
  onOpenChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenChat }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* WCAG 2.2 Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-900 focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24 gap-4">
            
            {/* Brand Logo & Descriptor */}
            <div className="flex items-center gap-4 sm:gap-6 min-w-0">
              <a
                href="/"
                className="group flex items-center shrink-0 focus:rounded-lg focus:outline-none"
                aria-label="BLUE X LTD - Return to homepage"
              >
                <picture>
                  <source srcSet={BUSINESS_CONFIG.assets.headerVector} type="image/svg+xml" />
                  <img
                    src={BUSINESS_CONFIG.assets.headerLogo}
                    alt="BLUE X LTD - Building Services & Construction Management"
                    width="220"
                    height="84"
                    className="h-12 sm:h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />
                </picture>
              </a>

              {/* Verified Business Descriptor separated cleanly as accessible HTML text */}
              <div className="hidden lg:block border-l border-slate-200 pl-4 py-1">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-900">
                  {BUSINESS_CONFIG.primaryDescriptor}
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  {BUSINESS_CONFIG.serviceDescriptor}
                </p>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3 lg:gap-4 shrink-0">
              {/* Telephone */}
              <a
                href={BUSINESS_CONFIG.contact.phoneHref}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-blue-900 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
                aria-label={`Telephone BLUE X LTD at ${BUSINESS_CONFIG.contact.phoneDisplay}`}
              >
                <Phone className="w-3.5 h-3.5 text-blue-700" aria-hidden="true" />
                <span>Call us</span>
                <span className="hidden xl:inline text-slate-400 font-normal">({BUSINESS_CONFIG.contact.phoneDisplay})</span>
              </a>

              {/* Email */}
              <a
                href={BUSINESS_CONFIG.contact.emailHref}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-blue-900 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
                aria-label={`Email BLUE X LTD at ${BUSINESS_CONFIG.contact.emailDisplay}`}
              >
                <Mail className="w-3.5 h-3.5 text-blue-700" aria-hidden="true" />
                <span>Email us</span>
              </a>

              {/* Live Chat Action */}
              <button
                type="button"
                onClick={onOpenChat}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 active:bg-blue-950 rounded-lg shadow-xs hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                aria-label="Open human live chat support"
              >
                <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Live Chat</span>
              </button>
            </div>

            {/* Mobile Actions & Menu Toggle */}
            <div className="flex md:hidden items-center gap-2">
              <button
                type="button"
                onClick={onOpenChat}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 rounded-lg focus:outline-none"
                aria-label="Open live chat"
              >
                <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Chat</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:text-blue-900 hover:bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-contact-panel"
                aria-label={mobileMenuOpen ? 'Close contact menu' : 'Open contact menu'}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div
            id="mobile-contact-panel"
            className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 animate-entrance"
          >
            <div className="pb-2 border-b border-slate-100">
              <p className="text-xs font-bold text-blue-900">
                {BUSINESS_CONFIG.primaryDescriptor}
              </p>
              <p className="text-xs text-slate-500">
                {BUSINESS_CONFIG.serviceDescriptor}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {BUSINESS_CONFIG.location.formatted}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2 pt-1">
              <a
                href={BUSINESS_CONFIG.contact.phoneHref}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200"
              >
                <span className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-blue-700" />
                  <span>Call {BUSINESS_CONFIG.contact.phoneDisplay}</span>
                </span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </a>

              <a
                href={BUSINESS_CONFIG.contact.emailHref}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200"
              >
                <span className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-blue-700" />
                  <span>Email {BUSINESS_CONFIG.contact.emailDisplay}</span>
                </span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
