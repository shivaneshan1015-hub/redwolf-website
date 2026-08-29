import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Sparkles, ArrowRight, ChevronRight, BookOpen } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import insights from "@/data/insights.json";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return insights.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const article = insights.find((a) => a.slug === resolvedParams.slug);

  if (!article) {
    return {
      title: "Article Not Found | Redwolf Insights",
    };
  }

  return {
    title: `${article.title} | Redwolf Insights`,
    description: article.summary,
    keywords: [article.category, "Redwolf GEO guide", "AEO voice search optimization"],
  };
}

export default async function InsightArticlePage({ params }: Props) {
  const resolvedParams = await params;
  const article = insights.find((a) => a.slug === resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": article.title,
    "description": article.summary,
    "datePublished": article.date,
    "author": {
      "@type": "Organization",
      "name": "Redwolf",
      "url": "https://redwolf.digital"
    }
  };

  const faqJsonLd = article.faqs && article.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": article.faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  } : null;

  return (
    <div className="flex flex-col min-h-screen bg-[#090d16] text-white">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link href="/" className="hover:text-red-400">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/insights" className="hover:text-red-400">Insights</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-red-400 font-bold truncate">{article.title}</span>
          </nav>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="bg-red-500/10 text-red-400 px-3 py-1 rounded-full border border-red-500/20 uppercase font-bold">
                {article.category}
              </span>
              <span className="text-slate-400">{article.readTime}</span>
              <span className="text-slate-500">• Published {article.date}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight">
              {article.title}
            </h1>

            <p className="text-slate-300 text-lg leading-relaxed border-l-4 border-red-500 pl-4 py-1 italic bg-slate-900/50 rounded-r-xl">
              {article.summary}
            </p>
          </div>

          <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
            {article.content.split("\n\n").map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {article.faqs && article.faqs.length > 0 && (
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 space-y-6">
              <h3 className="text-xl font-heading font-extrabold text-white">AI & Voice Search FAQ (Schema.org AEO)</h3>
              <div className="space-y-4">
                {article.faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <h4 className="text-sm font-bold text-red-400">{faq.question}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-8 rounded-2xl bg-gradient-to-r from-red-950/40 to-slate-900 border border-red-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-heading font-extrabold text-white">Want Redwolf to implement this for your brand?</h3>
              <p className="text-xs text-slate-400">Talk to our digital strategy team today.</p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-red-600/30 shrink-0"
            >
              <span>Start Consultation</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
