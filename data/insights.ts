export interface InsightItem {
  slug: string;
  title: string;
  excerpt: string;
  category: "Digital Growth" | "AI Search" | "Technology" | "Business Systems" | "Products & SaaS";
  type: "Field Note" | "Problem Breakdown" | "Build Note" | "Growth Experiment" | "Product Thinking";
  publishedAt: string;
  readTime: string;
  author: {
    name: string;
    role: string;
  };
  content: {
    takeaways: string[];
    bodyHtml: string;
  };
  relatedSolutions: string[];
  relatedIndustries: string[];
}

export const insightsData: Record<string, InsightItem> = {
  "problem-before-platform": {
    slug: "problem-before-platform",
    title: "Problem Before Platform: Why Building Software First Usually Fails",
    excerpt: "Most digital transformation projects fail not because of bad code, but because teams rush to build software before diagnosing what is actually broken in the business.",
    category: "Business Systems",
    type: "Problem Breakdown",
    publishedAt: "2026-02-10",
    readTime: "5 min read",
    author: {
      name: "Redwolf Engineering Team",
      role: "Digital Systems Architecture",
    },
    content: {
      takeaways: [
        "Software automates existing operational discipline—it cannot manufacture discipline where none exists.",
        "Diagnose manual friction points (spreadsheets, WhatsApp lost messages) before picking tech stacks.",
        "The best digital system is the simplest one that solves the underlying problem cleanly.",
      ],
      bodyHtml: `
        <p>When a business experiences operational friction—whether it's delayed quote follow-ups, lost van inventory, or messy customer records—the instinct of many founders is to immediately search for an off-the-shelf software tool or hire a developer to build a custom app.</p>
        <p>However, building software on top of an unexamined process simply digitizes chaos.</p>
        <h3>The Core Distinction: Software vs. System</h3>
        <p>A <strong>software application</strong> is merely a technical tool. A <strong>digital system</strong> is the combination of business rules, human workflows, data models, and software interfaces designed to achieve a specific business outcome.</p>
        <p>At Redwolf, every client engagement begins with diagnosis: DISCOVER → DIAGNOSE → DESIGN → BUILD → DEPLOY → EVOLVE. We map how data flows through your business today before writing a single line of code.</p>
      `,
    },
    relatedSolutions: ["build", "productize"],
    relatedIndustries: ["fmcg-distribution", "manufacturing", "smes"],
  },
  "offline-first-field-sales-architecture": {
    slug: "offline-first-field-sales-architecture",
    title: "Engineering Offline-First Apps for Rural Commercial Fleets",
    excerpt: "Standard cloud apps break when field sales reps enter rural dead-zones. Here is how we engineered an offline-first sync engine using IndexedDB and background queuing.",
    category: "Products & SaaS",
    type: "Build Note",
    publishedAt: "2026-02-22",
    readTime: "7 min read",
    author: {
      name: "Redwolf Product Team",
      role: "SaaS Architecture",
    },
    content: {
      takeaways: [
        "Field mobile apps must treat offline connectivity as a primary operational state, not an error exception.",
        "Store transactions locally first using encrypted client storage (IndexedDB), then queue background syncs.",
        "Deterministic conflict resolution prevents duplicate invoices or inventory discrepancies.",
      ],
      bodyHtml: `
        <p>In the FMCG distribution sector across South India, van sales reps visit dozens of retail shops daily in areas where 4G/5G mobile signals drop frequently.</p>
        <p>If a field application depends on a constant server heartbeat, reps get stuck waiting for loading spinners, causing delayed shop visits and lost orders.</p>
        <h3>The Offline-First Paradigm</h3>
        <p>We engineered EasyTrack around an offline-first architecture. All stock levels, retailer credit balances, and price lists are cached locally on the device. When a rep submits an order, it writes instantly to local storage and prints via Bluetooth thermal printer in under 2 seconds—regardless of internet status.</p>
      `,
    },
    relatedSolutions: ["productize", "build"],
    relatedIndustries: ["fmcg-distribution"],
  },
  "ai-search-aeo-geo-for-b2b": {
    slug: "ai-search-aeo-geo-for-b2b",
    title: "AI Search & Entity Optimization (AEO/GEO): What B2B Businesses Need to Know",
    excerpt: "Search behavior is shifting from traditional keyword blue links to conversational AI answer engines. Here is how to structure your business content for AI extraction.",
    category: "AI Search",
    type: "Growth Experiment",
    publishedAt: "2026-03-05",
    readTime: "6 min read",
    author: {
      name: "Redwolf Growth Team",
      role: "Search & Growth Architecture",
    },
    content: {
      takeaways: [
        "AI engines (Google SGE, ChatGPT, Perplexity) extract concise 1-3 sentence factual answers, not keyword-stuffed paragraphs.",
        "Structured JSON-LD schema (AutoPartsStore, LocalBusiness, FAQPage) gives LLMs unambiguous entity context.",
        "Strict physical grounding and verifiable technical specs build AI citation authority.",
      ],
      bodyHtml: `
        <p>When buyers ask an AI search engine <em>"Where can I get ready-to-fit bus windows in Madurai?"</em>, the engine doesn't just match keywords—it evaluates structured entity data and factual citations.</p>
        <p>To capture AI search intent, businesses must present direct, concise Q&A blocks and clear Schema.org metadata that provide unambiguous factual answers.</p>
      `,
    },
    relatedSolutions: ["grow", "define"],
    relatedIndustries: ["manufacturing", "smes", "healthcare"],
  },
};
