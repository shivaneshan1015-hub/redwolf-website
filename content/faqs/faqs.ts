import { FAQContent } from "@/types/content";

export const faqsContent: FAQContent[] = [
  {
    id: "geo-definition",
    slug: "what-is-generative-engine-optimization",
    question: "What is Generative Engine Optimization (GEO)?",
    answer: "GEO is the technical practice of structuring brand knowledge graphs, entity relationships, and factual schemas so LLM engines like ChatGPT, Perplexity, and Gemini recommend your business in direct conversational answers.",
    category: "AI Search",
    relatedSolutionSlug: "grow",
  },
  {
    id: "aeo-definition",
    slug: "why-is-answer-engine-optimization-critical",
    question: "Why is Answer Engine Optimization (AEO) critical for voice search?",
    answer: "AEO structures your data into Schema.org JSON-LD markup and direct Q&A formats so voice devices like Apple Siri and Google Assistant read your business info as the primary answer.",
    category: "Voice Search",
    relatedSolutionSlug: "grow",
  },
  {
    id: "easytrack-offline-capability",
    slug: "does-easytrack-work-without-internet",
    question: "Does EasyTrack work without continuous mobile internet?",
    answer: "Yes. EasyTrack uses an offline-first local database sync engine. Field reps can take orders, print thermal invoices, and collect payments in rural dead-zones without losing data.",
    category: "Products",
    relatedProductSlug: "easytrack",
    page: "easytrack",
  },
];
