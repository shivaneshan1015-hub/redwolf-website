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
    id: "define-brand-positioning-timing",
    slug: "why-define-brand-positioning-before-website-redesign",
    question: "Why clarify brand positioning before building a new digital platform?",
    answer: "Defining positioning, message hierarchy, and user journeys upfront ensures your website design accurately reflects your company's true scale and value proposition, avoiding costly post-launch rewrites.",
    category: "Brand Strategy",
    relatedSolutionSlug: "define",
  },
  {
    id: "build-custom-vs-off-the-shelf",
    slug: "why-choose-custom-web-app-over-off-the-shelf-software",
    question: "How do custom business web applications compare to off-the-shelf software?",
    answer: "Off-the-shelf software forces your staff to adapt to generic workflows. Custom web applications engineered by Redwolf digitize your exact operational processes, eliminating manual workarounds and spreadsheets.",
    category: "Software Engineering",
    relatedSolutionSlug: "build",
  },
  {
    id: "productize-vs-build-difference",
    slug: "what-is-the-difference-between-build-and-productize",
    question: "What is the difference between BUILD and PRODUCTIZE?",
    answer: "BUILD solves an internal business problem by digitizing operational workflows. PRODUCTIZE transforms an internal tool or market hypothesis into a commercial, multi-tenant SaaS product or field application opportunity.",
    category: "Product Architecture",
    relatedSolutionSlug: "productize",
  },
  {
    id: "easytrack-offline-capability",
    slug: "does-easytrack-work-without-internet",
    question: "Does EasyTrack work without continuous mobile internet?",
    answer: "Yes. EasyTrack uses an offline-first local database sync engine. Field reps can take orders, print thermal invoices, and collect payments in rural dead-zones without losing data.",
    category: "Products",
    relatedProductSlug: "easytrack",
    relatedSolutionSlug: "productize",
    page: "easytrack",
  },
];
