/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { X, Cookie, Shield, MessageSquare, BarChart3, Check } from 'lucide-react';
import { CookiePreferences } from '../types/index.ts';

interface CookieSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPreferences: CookiePreferences;
  onSavePreferences: (prefs: CookiePreferences) => void;
  onOpenPrivacy: () => void;
}

export const CookieSettingsModal: React.FC<CookieSettingsModalProps> = ({
  isOpen,
  onClose,
  currentPreferences,
  onSavePreferences,
  onOpenPrivacy,
}) => {
  const [chatEnabled, setChatEnabled] = useState(currentPreferences.chat);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(currentPreferences.analytics);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChatEnabled(currentPreferences.chat);
    setAnalyticsEnabled(currentPreferences.analytics);
  }, [currentPreferences]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSavePreferences({
      necessary: true,
      chat: chatEnabled,
      analytics: analyticsEnabled,
      consentedAt: new Date().toISOString(),
    });
    onClose();
  };

  const handleAcceptAll = () => {
    onSavePreferences({
      necessary: true,
      chat: true,
      analytics: true,
      consentedAt: new Date().toISOString(),
    });
    onClose();
  };

  const handleRejectOptional = () => {
    onSavePreferences({
      necessary: true,
      chat: false,
      analytics: false,
      consentedAt: new Date().toISOString(),
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-settings-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-entrance"
    >
      <div
        ref={modalRef}
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-slate-200"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <Cookie className="w-5 h-5 text-sky-400" aria-hidden="true" />
            <div>
              <h2 id="cookie-settings-title" className="text-sm sm:text-base font-bold text-white">
                Cookie &amp; Storage Preferences
              </h2>
              <p className="text-xs text-slate-400">UK PECR &amp; GDPR Compliance</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close cookie settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
          <p className="leading-relaxed">
            BLUE X LTD respects your privacy. In accordance with UK PECR regulations, strictly necessary cookies and session tokens are set automatically. Non-essential storage (such as persistent live-chat history) requires your consent.
          </p>

          <div className="space-y-4 pt-1">
            {/* 1. Strictly Necessary */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 flex items-center gap-2 text-xs">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span>Strictly Necessary Storage</span>
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Always Active
                </span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Essential for core website operation, CSRF security tokens, and recording your cookie consent preferences. Exempt from PECR consent under the strictly necessary exception.
              </p>
            </div>

            {/* 2. Functional & Live Chat */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="toggle-chat" className="font-bold text-slate-900 flex items-center gap-2 text-xs cursor-pointer">
                  <MessageSquare className="w-4 h-4 text-blue-700" />
                  <span>Live Chat &amp; Session Continuity</span>
                </label>
                <input
                  id="toggle-chat"
                  type="checkbox"
                  checked={chatEnabled}
                  onChange={(e) => setChatEnabled(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-blue-800 focus:ring-blue-700 cursor-pointer"
                />
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Allows the human live-chat widget to maintain your active message history and project enquiry drafts between page refreshes.
              </p>
            </div>

            {/* 3. Analytics & Performance */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 opacity-80">
              <div className="flex items-center justify-between">
                <label htmlFor="toggle-analytics" className="font-bold text-slate-900 flex items-center gap-2 text-xs cursor-pointer">
                  <BarChart3 className="w-4 h-4 text-slate-600" />
                  <span>Performance &amp; Analytics (None Active)</span>
                </label>
                <input
                  id="toggle-analytics"
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-blue-800 focus:ring-blue-700 cursor-pointer"
                />
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                No third-party analytics or marketing trackers are active in this release. Preserved as a future permission switch if anonymous aggregate telemetry is added.
              </p>
            </div>
          </div>

          <div className="pt-2 text-slate-500 text-[11px]">
            Read our full{' '}
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenPrivacy();
              }}
              className="text-blue-800 underline hover:text-blue-900"
            >
              Privacy Notice
            </button>{' '}
            for full details on data retention and subject rights.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleRejectOptional}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Reject Optional
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="px-3.5 py-2 text-xs font-semibold text-blue-900 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
            >
              Save Preferences
            </button>
            <button
              type="button"
              onClick={handleAcceptAll}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-800 hover:bg-blue-900 rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Accept All</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
