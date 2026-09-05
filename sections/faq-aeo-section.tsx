"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Sparkles, MessageSquare, Bot, Search } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: "GEO" | "AEO" | "SEO" | "Pricing" | "Engineering";
}

const faqs: FAQItem[] = [
  {
    category: "GEO",
    question: "What is GEO (Generative Engine Optimization) and how does it rank brands on ChatGPT, Perplexity & Gemini?",
    answer: "Generative Engine Optimization (GEO) is the strategy of structuring brand data, entity relationships, citations, and authority signals so AI search engines (ChatGPT, Perplexity, Google Gemini) actively recommend your business when users ask conversational questions."
  },
  {
    category: "AEO",
    question: "How does AEO (Answer Engine Optimization) capture Voice Search & Featured Snippets?",
    answer: "AEO uses structured Schema.org JSON-LD microdata and direct, factual Q&A formatting to position your answers in Google Featured Snippets and voice assistant devices like Apple Siri, Amazon Alexa, and Google Assistant."
  },
  {
    category: "Pricing",
    question: "How much does digital marketing cost for Small and Medium Industries (SMEs)?",
    answer: "Redwolf provides transparent SME growth plans starting at ₹14,999/mo ($189/mo) for micro businesses and ₹34,999/mo ($429/mo) for full industrial growth. We eliminate agency markups and setup fees so SMEs get high-ROI growth."
  },
  {
    category: "SEO",
    question: "What is the difference between traditional SEO and Redwolf's Tri-Engine Dominance?",
    answer: "Traditional SEO only optimizes meta tags for Google links. Redwolf's Tri-Engine framework optimizes across 3 search paradigms simultaneously: Google organic search (SEO), Voice assistant answers (AEO), and Generative AI recommendations (GEO)."
  },
  {
    category: "Engineering",
    question: "How does Redwolf build custom web applications and business software?",
    answer: "We engineer full-stack web applications using Next.js, React, Tailwind CSS, and cloud serverless architecture. This guarantees sub-second page loads, 100% Google Lighthouse scores, and seamless conversion paths."
  }
];

export function FaqAeoSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section id="faqs" className="py-24 bg-[#070a12] relative border-b border-slate-800/80">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Header Tag */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs uppercase tracking-wider">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Search, AI & Voice Optimization (AEO/GEO)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
            Direct Answers for <span className="text-red-500">Google, Voice & AI Search</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Optimized for human search queries, voice assistant responses, and generative AI search indexing.
          </p>
        </div>

        {/* Badges for AI Engines */}
        <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
          <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-slate-300">
            <Search className="h-3.5 w-3.5 text-blue-400" /> Google Search SEO
          </span>
          <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-slate-300">
            <MessageSquare className="h-3.5 w-3.5 text-emerald-400" /> ChatGPT & Perplexity GEO
          </span>
          <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-slate-300">
            <Bot className="h-3.5 w-3.5 text-amber-400" /> Siri & Alexa Voice AEO
          </span>
        </div>

        {/* Accordion FAQ Container */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-slate-900/90 border-red-500/50 shadow-xl shadow-red-950/20"
                    : "bg-slate-900/50 border-slate-800/80 hover:border-slate-700"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="shrink-0 px-2.5 py-1 rounded bg-slate-800 text-[10px] font-mono font-bold uppercase text-red-400 border border-slate-700">
                      {faq.category}
                    </span>
                    <span className="text-base sm:text-lg font-heading font-bold text-white">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-red-500" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-2 text-slate-300 text-sm leading-relaxed border-t border-slate-800/60 font-sans">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
