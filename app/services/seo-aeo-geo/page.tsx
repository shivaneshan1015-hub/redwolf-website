import { Metadata } from "next";
import Link from "next/link";
import { Search, Bot, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "SEO, AEO & GEO Search Dominance | Redwolf Digital Marketing",
  description:
    "Future-proof your business search rankings across Google SEO, Voice AEO, and AI Search Engines (ChatGPT, Perplexity, Google Gemini) with Redwolf's Tri-Engine Search Strategy.",
  keywords: [
    "SEO agency India",
    "AEO Answer Engine Optimization",
    "GEO Generative Engine Optimization",
    "ChatGPT business ranking",
    "Perplexity AI SEO",
    "Voice Search Optimization",
    "Schema.org knowledge graph agency"
  ],
};

export default function SEOAEOGEOPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "SEO, AEO & GEO Search Dominance",
    "provider": {
      "@type": "Organization",
      "name": "Redwolf",
      "url": "https://redwolf.digital"
    },
    "serviceType": "Search Engine & AI Optimization",
    "description": "Comprehensive Search Engine Optimization (SEO), Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO) for Google, Siri, and AI Search Models."
  };

  const faqs = [
    {
      q: "What is Generative Engine Optimization (GEO)?",
      a: "GEO is the technical practice of structuring brand knowledge graphs, entity relationships, and factual schemas so LLM engines like ChatGPT, Perplexity, and Gemini recommend your business in direct conversational answers."
    },
    {
      q: "Why is Answer Engine Optimization (AEO) critical for voice search?",
      a: "AEO structures your data into Schema.org JSON-LD markup and direct Q&A formats so voice devices like Apple Siri and Google Assistant read your business info as the primary answer."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#090d16] text-white">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link href="/" className="hover:text-red-400">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span>Services</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-red-400 font-bold">SEO, AEO & GEO</span>
          </nav>

          {/* Hero Section */}
          <div className="space-y-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Next-Gen Search Dominance Engine</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight">
              Rank on Google, Voice Devices & <span className="text-red-500">AI Search Engines</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              Search is no longer limited to traditional Google links. Buyers ask Siri for local services and rely on ChatGPT, Perplexity, and Gemini for business recommendations. Redwolf deploys a Tri-Engine Search Strategy (**SEO + AEO + GEO**) to dominate all search surfaces.
            </p>
          </div>

          {/* 3 Pillars Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-glass-card border border-slate-800 space-y-4">
              <div className="h-10 w-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold">
                <Search className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-heading font-extrabold">1. Traditional SEO</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Technical audits, high-intent commercial keywords, backlink architecture, and content silos engineered to rank #1 on Google SERPs.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-glass-card border border-slate-800 space-y-4">
              <div className="h-10 w-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <Bot className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-heading font-extrabold">2. Voice AEO</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Schema.org JSON-LD data graphs and structured Q&A formats that capture Google Featured Snippets and Siri/Alexa voice answers.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-glass-card border border-slate-800 space-y-4">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-heading font-extrabold">3. Generative GEO</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Entity authority mapping and knowledge graph optimization so Large Language Models recommend your brand first.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 space-y-6">
            <h2 className="text-2xl font-heading font-extrabold text-white">Frequently Asked Questions (AEO/GEO Optimized)</h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <h4 className="text-sm font-bold text-red-400">{faq.q}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Bar */}
          <div className="p-8 rounded-2xl bg-gradient-to-r from-red-950/40 to-slate-900 border border-red-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-heading font-extrabold text-white">Ready to dominate Google & AI Search?</h3>
              <p className="text-xs text-slate-400">Get a custom SEO, AEO & GEO technical audit from Redwolf.</p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-red-600/30 shrink-0"
            >
              <span>Get Search Audit</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
