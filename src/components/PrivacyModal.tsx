/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { X, ShieldCheck, Mail, Phone, FileText } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business.ts';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-entrance"
    >
      <div
        ref={modalRef}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[88vh] overflow-hidden border border-slate-200"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-sky-400" aria-hidden="true" />
            <div>
              <h2 id="privacy-title" className="text-base font-bold text-white">
                Privacy Notice (UK GDPR &amp; DPA 2018)
              </h2>
              <p className="text-xs text-slate-400">BLUE X LTD · Version 1.0 (Holding Release)</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close privacy notice"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 p-6 overflow-y-auto space-y-5 text-xs text-slate-700 leading-relaxed">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-900">
            <p className="font-semibold flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-700" />
              <span>Tailored for BLUE X LTD (Holding Website)</span>
            </p>
            <p className="mt-1 text-[11px] text-blue-800">
              This notice outlines how BLUE X LTD handles personal data received via our website, telephone, email, and live-support enquiries in England &amp; Wales.
            </p>
          </div>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900">1. Data Controller</h3>
            <p>
              The data controller responsible for personal information collected on this website is <strong>{BUSINESS_CONFIG.name}</strong>, operating from {BUSINESS_CONFIG.location.formatted}.
            </p>
            <p className="text-slate-500 italic">
              * Note for business owner: Upon completion of Companies House company profile registration, the statutory registered office address and company registration number will be appended here.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900">2. Information We Collect</h3>
            <p>
              During this holding release, we only collect personal information that you voluntarily choose to provide to us:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Contact Information:</strong> Your name, email address, telephone number, and company name when you send an enquiry or chat message.</li>
              <li><strong>Project Details:</strong> Any project scope, site address, or specification notes you supply to request consultancy or construction quotes.</li>
              <li><strong>Technical Data:</strong> Basic technical logs (such as IP address, browser type, and timestamp) automatically processed by web servers to ensure network security and prevent denial-of-service abuse.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900">3. Purpose and Lawful Basis for Processing</h3>
            <p>
              Under the UK General Data Protection Regulation (UK GDPR), we rely on the following lawful bases:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Contract or Steps Prior to Entering a Contract (Art. 6(1)(b)):</strong> To respond to your enquiries, provide pricing estimates, and discuss building services, consultancy, or project management scopes.</li>
              <li><strong>Legitimate Interests (Art. 6(1)(f)):</strong> To operate a secure, functional business website and protect our communications infrastructure against spam and malicious traffic.</li>
              <li><strong>Consent (Art. 6(1)(a)):</strong> For non-essential functional browser storage (such as persistent live chat preferences) where chosen via our Cookie Settings.</li>
            </ul>
            <p className="font-semibold text-slate-800">
              We never sell your data, do not engage in behavioural ad tracking, and do not send unsolicited marketing newsletters.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900">4. Data Retention</h3>
            <p>
              Enquiries submitted through this site are retained only for as long as necessary to address your project request and maintain records for standard UK commercial dispute limitation periods (typically up to 6 years for contractual correspondence). General non-converting enquiries are pruned within 12 months.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900">5. Your Data Protection Rights</h3>
            <p>
              Under UK data protection law, you have the right to request access to your personal data, request correction of inaccurate data, request erasure, or object to processing. You also have the right to lodge a complaint with the UK Information Commissioner’s Office (ICO) at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-blue-800 underline">ico.org.uk</a>.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900">6. Contacting the Controller</h3>
            <p>
              To exercise any of your data rights or query how your project data is handled, contact our team directly:
            </p>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
              <p className="font-semibold text-slate-900">{BUSINESS_CONFIG.name}</p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-700" />
                <a href={BUSINESS_CONFIG.contact.emailHref} className="text-blue-800 font-medium hover:underline">
                  {BUSINESS_CONFIG.contact.emailDisplay}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-700" />
                <a href={BUSINESS_CONFIG.contact.phoneHref} className="text-blue-800 font-medium hover:underline">
                  {BUSINESS_CONFIG.contact.phoneDisplay}
                </a>
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-xs transition-colors"
          >
            Close Notice
          </button>
        </div>
      </div>
    </div>
  );
};
