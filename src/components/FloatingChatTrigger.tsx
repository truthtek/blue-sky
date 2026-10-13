/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MessageSquare } from 'lucide-react';

interface FloatingChatTriggerProps {
  onOpenChat: () => void;
  isOpen: boolean;
}

export const FloatingChatTrigger: React.FC<FloatingChatTriggerProps> = ({ onOpenChat, isOpen }) => {
  if (isOpen) return null;

  return (
    <div className="fixed bottom-5 right-5 z-30">
      <button
        type="button"
        onClick={onOpenChat}
        className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#002b70] hover:bg-[#001f54] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-blue-400/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Open human live chat support with BLUE X LTD"
      >
        <span className="relative flex h-3 w-3">
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
        </span>
        <MessageSquare className="w-4 h-4 text-sky-300" aria-hidden="true" />
        <span className="text-xs font-bold tracking-wide">Live Support</span>
      </button>
    </div>
  );
};
