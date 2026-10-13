/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Cookie, SlidersHorizontal, Check } from 'lucide-react';
import { CookiePreferences } from '../types/index.ts';

interface CookieBannerProps {
  onAcceptAll: () => void;
  onRejectOptional: () => void;
  onOpenSettings: () => void;
  onOpenPrivacy: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({
  onAcceptAll,
  onRejectOptional,
  onOpenSettings,
  onOpenPrivacy,
}) => {
  return (
    <aside
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-40 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl border border-slate-300 text-slate-800 animate-entrance"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-blue-50 text-blue-800 rounded-lg shrink-0 mt-0.5">
          <Cookie className="w-5 h-5" aria-hidden="true" />
        </div>
        <div className="space-y-1.5 flex-1">
          <h2 className="text-xs font-bold text-slate-900 tracking-tight">
            Privacy &amp; Cookie Notice
          </h2>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            BLUE X LTD uses strictly necessary cookies for security and site navigation. Optional functional storage is used for live-chat support continuity. No advertising cookies are used.
          </p>
        </div>
      </div>

      <div className="mt-3.5 pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenPrivacy}
            className="text-[11px] text-slate-500 hover:text-blue-900 underline"
          >
            Privacy Notice
          </button>
          <span className="text-slate-300">·</span>
          <button
            type="button"
            onClick={onOpenSettings}
            className="text-[11px] font-semibold text-blue-900 hover:text-blue-950 inline-flex items-center gap-1"
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>Manage</span>
          </button>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            type="button"
            onClick={onRejectOptional}
            className="px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
          >
            Reject Optional
          </button>
          <button
            type="button"
            onClick={onAcceptAll}
            className="px-3 py-1.5 text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 rounded-md shadow-2xs transition-colors flex items-center gap-1"
          >
            <Check className="w-3 h-3" />
            <span>Accept All</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
