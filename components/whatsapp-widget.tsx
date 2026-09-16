"use client";

import React, { useState } from "react";
import { MessageCircle, X, Sparkles } from "lucide-react";

interface WhatsAppWidgetProps {
  onOpenEnquiry?: () => void;
  phoneNumber?: string; // WhatsApp number
}

export function WhatsAppWidget({ onOpenEnquiry, phoneNumber = "919000000000" }: WhatsAppWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDirectWhatsApp = () => {
    const message = encodeURIComponent(
      "Hello Redwolf Team! I am interested in your Digital Marketing & App Development services."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Popover Bubble */}
      {isOpen && (
        <div className="mb-3 w-80 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <MessageCircle className="h-4 w-4 fill-current" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Chat with Redwolf</div>
                <div className="text-[10px] text-emerald-400 font-mono">Typically replies instantly</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Need quick answers about SEO, Meta Ads, or Custom App Building? Message our engineering & growth team directly.
          </p>

          <div className="space-y-2 pt-1">
            <button
              onClick={handleDirectWhatsApp}
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl shadow-lg shadow-emerald-600/30 cursor-pointer"
            >
              <MessageCircle className="h-4 w-4 fill-current" />
              <span>Chat on WhatsApp</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                if (onOpenEnquiry) onOpenEnquiry();
              }}
              className="w-full inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl border border-slate-700 cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-red-400" />
              <span>Submit Project Enquiry</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative h-14 w-14 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white flex items-center justify-center shadow-xl shadow-emerald-600/30 transition-all hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Open WhatsApp Chat"
      >
        <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-red-500 border-2 border-[#090d16] animate-ping" />
        <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-red-500 border-2 border-[#090d16]" />

        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-7 w-7 fill-current" />
        )}
      </button>
    </div>
  );
}
