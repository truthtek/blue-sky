/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { HoldingHero } from './components/HoldingHero.tsx';
import { Footer } from './components/Footer.tsx';
import { LiveChatModal } from './components/LiveChatModal.tsx';
import { PrivacyModal } from './components/PrivacyModal.tsx';
import { CookieBanner } from './components/CookieBanner.tsx';
import { CookieSettingsModal } from './components/CookieSettingsModal.tsx';
import { HandoverModal } from './components/HandoverModal.tsx';
import { FloatingChatTrigger } from './components/FloatingChatTrigger.tsx';
import { CookiePreferences } from './types/index.ts';

const COOKIE_STORAGE_KEY = 'bluex_cookie_consent_v1';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isCookieSettingsOpen, setIsCookieSettingsOpen] = useState(false);
  const [isHandoverOpen, setIsHandoverOpen] = useState(false);

  // Cookie consent state
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>({
    necessary: true,
    chat: false,
    analytics: false,
  });
  const [hasUserRespondedToCookies, setHasUserRespondedToCookies] = useState(true); // default true to avoid flash

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (stored) {
        setCookiePreferences(JSON.parse(stored));
        setHasUserRespondedToCookies(true);
      } else {
        setHasUserRespondedToCookies(false);
      }
    } catch {
      // In private browsing mode where localStorage might be blocked
      setHasUserRespondedToCookies(true);
    }
  }, []);

  const handleSaveCookiePreferences = (prefs: CookiePreferences) => {
    setCookiePreferences(prefs);
    setHasUserRespondedToCookies(true);
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // Ignore storage errors in restricted contexts
    }
  };

  const handleAcceptAllCookies = () => {
    const prefs: CookiePreferences = {
      necessary: true,
      chat: true,
      analytics: true,
      consentedAt: new Date().toISOString(),
    };
    handleSaveCookiePreferences(prefs);
  };

  const handleRejectOptionalCookies = () => {
    const prefs: CookiePreferences = {
      necessary: true,
      chat: false,
      analytics: false,
      consentedAt: new Date().toISOString(),
    };
    handleSaveCookiePreferences(prefs);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. Fully functional, responsive header */}
      <Header onOpenChat={() => setIsChatOpen(true)} />

      {/* 2. Main body displaying the animated holding message */}
      <HoldingHero onOpenChat={() => setIsChatOpen(true)} />

      {/* 3. Fully functional, responsive footer */}
      <Footer
        onOpenChat={() => setIsChatOpen(true)}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenCookieSettings={() => setIsCookieSettingsOpen(true)}
        onOpenHandover={() => setIsHandoverOpen(true)}
      />

      {/* 4. Floating Human Support Chat Launcher */}
      <FloatingChatTrigger
        isOpen={isChatOpen}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* 5. Human-support Live Chat & Enquiry Interface */}
      <LiveChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onOpenPrivacy={() => {
          setIsChatOpen(false);
          setIsPrivacyOpen(true);
        }}
        chatConsentGranted={cookiePreferences.chat}
        onRequestConsent={() => setIsCookieSettingsOpen(true)}
      />

      {/* 6. Privacy Notice Modal (UK GDPR & DPA 2018) */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      {/* 7. Granular Cookie Settings Modal */}
      <CookieSettingsModal
        isOpen={isCookieSettingsOpen}
        onClose={() => setIsCookieSettingsOpen(false)}
        currentPreferences={cookiePreferences}
        onSavePreferences={handleSaveCookiePreferences}
        onOpenPrivacy={() => {
          setIsCookieSettingsOpen(false);
          setIsPrivacyOpen(true);
        }}
      />

      {/* 8. Initial Cookie Notice Banner (PECR compliant) */}
      {!hasUserRespondedToCookies && (
        <CookieBanner
          onAcceptAll={handleAcceptAllCookies}
          onRejectOptional={handleRejectOptionalCookies}
          onOpenSettings={() => setIsCookieSettingsOpen(true)}
          onOpenPrivacy={() => setIsPrivacyOpen(true)}
        />
      )}

      {/* 9. Owner Handover Documentation & System Status Panel */}
      <HandoverModal
        isOpen={isHandoverOpen}
        onClose={() => setIsHandoverOpen(false)}
      />
    </div>
  );
}
