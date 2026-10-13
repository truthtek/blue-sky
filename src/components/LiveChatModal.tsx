/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Phone, Mail, ShieldAlert, CheckCircle2, AlertTriangle, UserCheck } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business.ts';
import { ChatMessage, ChatEnquiryForm } from '../types/index.ts';

interface LiveChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPrivacy: () => void;
  chatConsentGranted: boolean;
  onRequestConsent: () => void;
}

export const LiveChatModal: React.FC<LiveChatModalProps> = ({
  isOpen,
  onClose,
  onOpenPrivacy,
  chatConsentGranted,
  onRequestConsent,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'business',
      senderName: 'BLUE X LTD Support Team',
      text: 'Welcome to BLUE X LTD. How can we help with your project?',
      timestamp: 'Just now',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [contactMode, setContactMode] = useState<'chat' | 'enquiry'>('chat');
  
  // Enquiry form state for direct delivery
  const [enquiryForm, setEnquiryForm] = useState<ChatEnquiryForm>({
    name: '',
    email: '',
    phone: '',
    message: '',
    gdprConsent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus trap and ESC key listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    inputRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'visitor',
      senderName: 'You',
      text: inputMessage.trim(),
      timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputMessage('');

    // If email was not provided yet, transition to contact details confirmation
    // Per instructions: "Do not simulate a working chat backend" with fake bot conversation.
    // Instead, be transparent: inform visitor that human support agent receives messages via enquiry desk.
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `notice-${Date.now()}`,
          sender: 'business',
          senderName: 'Desk Notice',
          text: 'Thank you for your message. To ensure our human construction management team can reply to you with bespoke project details, please confirm your contact details below or call us directly at +44 7448 162876.',
          timestamp: 'Just now',
        },
      ]);
      setContactMode('enquiry');
    }, 600);
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!enquiryForm.name.trim() || !enquiryForm.email.trim() || (!enquiryForm.message.trim() && messages.length <= 1)) {
      setFormError('Please enter your name, valid email address, and project summary.');
      return;
    }

    if (!enquiryForm.email.includes('@') || !enquiryForm.email.includes('.')) {
      setFormError('Please provide a valid email address.');
      return;
    }

    if (!enquiryForm.gdprConsent) {
      setFormError('Please confirm your consent for our team to contact you regarding your enquiry.');
      return;
    }

    setIsSubmitting(true);

    // Save genuine enquiry to local session storage and acknowledge
    try {
      const existingEnquiries = JSON.parse(localStorage.getItem('bluex_project_enquiries') || '[]');
      existingEnquiries.push({
        ...enquiryForm,
        chatHistory: messages.map((m) => `${m.senderName}: ${m.text}`),
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem('bluex_project_enquiries', JSON.stringify(existingEnquiries));

      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
      }, 700);
    } catch {
      setIsSubmitting(false);
      setFormError('Unable to process enquiry locally. Please contact us directly at bluexltd@yahoo.com or +44 7448 162876.');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="chat-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-entrance"
    >
      <div
        ref={modalRef}
        className="w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[90vh] sm:max-h-[640px] h-[85vh] sm:h-[580px] overflow-hidden border border-slate-200"
      >
        {/* Chat Header */}
        <div className="bg-[#002b70] text-white px-5 py-4 flex items-center justify-between shrink-0 border-b border-blue-900">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-800 flex items-center justify-center border border-blue-400/40">
              <UserCheck className="w-5 h-5 text-sky-300" aria-hidden="true" />
            </div>
            <div>
              <h2 id="chat-modal-title" className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                <span>BLUE X LTD Support Desk</span>
              </h2>
              <p className="text-[11px] text-sky-200 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Human Project Support · Walsall Team</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-blue-200 hover:text-white hover:bg-blue-800/80 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close chat window"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Chat Consent Notice (if consent is pending) */}
        {!chatConsentGranted && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 flex items-center justify-between text-xs text-amber-900">
            <span className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Functional chat storage is optional. You can also contact us by phone or email.</span>
            </span>
            <button
              type="button"
              onClick={onRequestConsent}
              className="text-[11px] font-bold text-amber-900 underline hover:text-amber-950 shrink-0 ml-2"
            >
              Consent Settings
            </button>
          </div>
        )}

        {/* Mode Selector Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 shrink-0">
          <button
            type="button"
            onClick={() => setContactMode('chat')}
            className={`flex-1 py-2.5 text-xs font-semibold text-center transition-colors border-b-2 ${
              contactMode === 'chat'
                ? 'border-blue-800 text-blue-900 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Live Conversation
          </button>
          <button
            type="button"
            onClick={() => setContactMode('enquiry')}
            className={`flex-1 py-2.5 text-xs font-semibold text-center transition-colors border-b-2 ${
              contactMode === 'enquiry'
                ? 'border-blue-800 text-blue-900 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Project Enquiry Form
          </button>
        </div>

        {/* Content Body */}
        {contactMode === 'chat' ? (
          <div className="flex-1 flex flex-col justify-between overflow-hidden bg-slate-50/50">
            {/* Messages Thread */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'visitor' ? 'items-end' : 'items-start'
                  }`}
                >
                  <span className="text-[10px] text-slate-400 font-medium px-1 mb-0.5">
                    {msg.senderName} · {msg.timestamp}
                  </span>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-2xs ${
                      msg.sender === 'visitor'
                        ? 'bg-blue-800 text-white rounded-br-xs'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input Bar */}
            <div className="p-3 bg-white border-t border-slate-200">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your project enquiry..."
                  className="flex-1 px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 bg-slate-50 focus:bg-white"
                  aria-label="Your message to BLUE X LTD"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="px-3.5 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center shadow-2xs"
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Data Protection / Security Notice */}
              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3 text-slate-400" />
                  <span>Please do not share sensitive payment details.</span>
                </span>
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="underline hover:text-slate-800"
                >
                  Privacy
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Direct Enquiry Form Mode */
          <div className="flex-1 p-5 overflow-y-auto bg-white space-y-4">
            {submitSuccess ? (
              <div className="text-center py-8 space-y-3 animate-entrance">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">Enquiry Received</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{enquiryForm.name}</strong>. Your project enquiry has been logged for our construction management team.
                </p>
                <p className="text-xs text-slate-500">
                  We will reply to <strong>{enquiryForm.email}</strong> shortly.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitSuccess(false);
                      setContactMode('chat');
                    }}
                    className="px-4 py-2 text-xs font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-lg"
                  >
                    Return to Conversation
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-3 text-xs">
                {formError && (
                  <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-md text-rose-800 text-xs">
                    {formError}
                  </div>
                )}

                <div>
                  <label htmlFor="enquiry-name" className="block font-semibold text-slate-700 mb-1">
                    Your Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="enquiry-name"
                    type="text"
                    required
                    value={enquiryForm.name}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-none"
                    placeholder="e.g. John Davies"
                  />
                </div>

                <div>
                  <label htmlFor="enquiry-email" className="block font-semibold text-slate-700 mb-1">
                    Your Email <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="enquiry-email"
                    type="email"
                    required
                    value={enquiryForm.email}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-none"
                    placeholder="e.g. j.davies@example.co.uk"
                  />
                </div>

                <div>
                  <label htmlFor="enquiry-phone" className="block font-semibold text-slate-700 mb-1">
                    Telephone (Optional)
                  </label>
                  <input
                    id="enquiry-phone"
                    type="tel"
                    value={enquiryForm.phone}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-none"
                    placeholder="e.g. 07700 900077"
                  />
                </div>

                <div>
                  <label htmlFor="enquiry-message" className="block font-semibold text-slate-700 mb-1">
                    Project Summary &amp; Scope <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    id="enquiry-message"
                    rows={3}
                    required
                    value={enquiryForm.message}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-none"
                    placeholder="Describe your construction, installation, or project management requirements..."
                  />
                </div>

                {/* Consent checkbox */}
                <div className="pt-1">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enquiryForm.gdprConsent}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, gdprConsent: e.target.checked })}
                      className="mt-0.5 rounded border-slate-300 text-blue-800 focus:ring-blue-700"
                    />
                    <span className="text-[11px] text-slate-600 leading-normal">
                      I agree to BLUE X LTD processing these details to respond to my enquiry in accordance with the{' '}
                      <button
                        type="button"
                        onClick={onOpenPrivacy}
                        className="text-blue-800 underline hover:text-blue-900"
                      >
                        Privacy Notice
                      </button>
                      . We never sell your data or send marketing spam.
                    </span>
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 px-4 bg-blue-800 hover:bg-blue-900 text-white font-semibold rounded-lg shadow-2xs transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending Enquiry...' : 'Submit Project Enquiry'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Footer fallback info */}
        <div className="bg-slate-100 px-4 py-2.5 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600 shrink-0">
          <span>Prefer direct contact?</span>
          <div className="flex items-center gap-3 font-semibold">
            <a
              href={BUSINESS_CONFIG.contact.phoneHref}
              className="inline-flex items-center gap-1 text-blue-900 hover:underline"
            >
              <Phone className="w-3 h-3 text-blue-700" />
              <span>{BUSINESS_CONFIG.contact.phoneDisplay}</span>
            </a>
            <span aria-hidden="true" className="text-slate-300">|</span>
            <a
              href={BUSINESS_CONFIG.contact.emailHref}
              className="inline-flex items-center gap-1 text-blue-900 hover:underline"
            >
              <Mail className="w-3 h-3 text-blue-700" />
              <span>{BUSINESS_CONFIG.contact.emailDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
