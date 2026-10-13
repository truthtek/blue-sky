/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { X, CheckCircle2, AlertCircle, FileCode2, Layers, ShieldCheck, KeyRound } from 'lucide-react';
import { BUSINESS_CONFIG, HANDOVER_AUDIT_CHECKLIST } from '../config/business.ts';

interface HandoverModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HandoverModal: React.FC<HandoverModalProps> = ({ isOpen, onClose }) => {
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
      aria-labelledby="handover-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-entrance"
    >
      <div
        ref={modalRef}
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-slate-200"
      >
        {/* Header */}
        <div className="bg-[#001f54] text-white px-6 py-4 flex items-center justify-between shrink-0 border-b border-blue-900">
          <div className="flex items-center gap-2.5">
            <FileCode2 className="w-5 h-5 text-sky-400" aria-hidden="true" />
            <div>
              <h2 id="handover-title" className="text-base font-bold text-white">
                BLUE X LTD — Owner Handover &amp; System Status
              </h2>
              <p className="text-xs text-sky-200">Engineering Release Documentation &amp; Roadmap</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-blue-300 hover:text-white hover:bg-blue-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close handover panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 text-xs text-slate-700 leading-relaxed">
          {/* Executive Summary */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Initial Holding Release: Verified Operational</span>
            </h3>
            <p className="text-xs text-slate-600">
              The branded holding page for <strong>{BUSINESS_CONFIG.name}</strong> has been engineered to production standards. Both supplied brand assets (Asset 1: 68296.jpg and Asset 2: 68297.jpg) have been integrated in both raster JPG and clean scalable vector SVG formats, preserving original proportions and text fidelity.
            </p>
          </div>

          {/* Section 1: Business Details Audit & Missing Items */}
          <section className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Owner Action Checklist: Pending Statutory Information</span>
            </h4>
            <p className="text-xs text-slate-600">
              Per strict UK legal standards, we do not fabricate registered company numbers or trade accreditations. The following items should be supplied prior to commercial full-site rollout:
            </p>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
              {HANDOVER_AUDIT_CHECKLIST.map((item, idx) => (
                <div key={idx} className="p-3 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400">{item.category}</span>
                    <p className="font-semibold text-slate-900 text-xs">{item.item}</p>
                    <p className="text-[11px] text-slate-500">{item.note}</p>
                  </div>
                  <span className="shrink-0 self-start sm:self-auto text-[11px] font-semibold px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Genuine Live Chat Provider Activation */}
          <section className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-blue-700" />
              <span>Live Chat Provider Integration Guide</span>
            </h4>
            <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl space-y-2 text-xs">
              <p>
                <strong>Current State:</strong> Human support enquiry desk active. Visitors can compose project enquiries and messages, which are recorded and ready for direct dispatch to <code>{BUSINESS_CONFIG.contact.emailDisplay}</code>.
              </p>
              <p>
                <strong>Connecting 3rd-Party Live Agent Provider:</strong> To connect a direct live desk (e.g. Crisp, Tawk.to, or LiveChat):
              </p>
              <ol className="list-decimal pl-5 space-y-1 text-slate-700">
                <li>Create an account at the provider of your choice (e.g. crisp.chat or tawk.to).</li>
                <li>Add your agent team seats and mobile apps for push notifications on incoming project leads.</li>
                <li>Add your public Website ID to <code>.env</code> as <code>VITE_LIVECHAT_PROVIDER_ID="your-widget-id"</code>.</li>
                <li>The widget automatically mounts only after user functional cookie consent is confirmed.</li>
              </ol>
            </div>
          </section>

          {/* Section 3: Future Full Website Architecture Roadmap */}
          <section className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-700" />
              <span>Full Website Expansion Roadmap (Pre-Engineered)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <span className="font-bold text-slate-900">Phase 1: Core Service Pages</span>
                <p className="text-[11px] text-slate-600">
                  Dedicated landing pages for Building Services, Development Consultancy, Construction, Facilities Management, Installation, and Project Management.
                </p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <span className="font-bold text-slate-900">Phase 2: Project Case Studies</span>
                <p className="text-[11px] text-slate-600">
                  Approved photography portfolio showcasing West Midlands and UK commercial/residential completed works.
                </p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <span className="font-bold text-slate-900">Phase 3: Interactive Quote Builder</span>
                <p className="text-[11px] text-slate-600">
                  Multi-step scope estimation tool allowing architectural drawing uploads and tender document submissions.
                </p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <span className="font-bold text-slate-900">Phase 4: Verified Accreditations</span>
                <p className="text-[11px] text-slate-600">
                  Formal badges for verified insurance, CHAS, SafeContractor, or RICS affiliations upon receipt.
                </p>
              </div>
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
            Close Handover Panel
          </button>
        </div>
      </div>
    </div>
  );
};
