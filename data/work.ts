export interface CaseStudyItem {
  id: string;
  slug: string;
  client: string;
  category: string;
  industry: string;
  tagline: string;
  summary: string;
  context: string;
  problem: string;
  discovery: string;
  approach: string;
  intervention: string[];
  systemDelivered: string[];
  qualitativeOutcome: string;
  learnings: string;
  capabilitiesUsed: ("GROW" | "DEFINE" | "BUILD" | "PRODUCTIZE")[];
  heroImage: string;
}

export const workData: Record<string, CaseStudyItem> = {
  "sri-nantha": {
    id: "sri-nantha",
    slug: "sri-nantha",
    client: "Sri Nantha Glasses & Stickers",
    category: "Automotive Glass & Ready-to-Fit Window Solutions",
    industry: "Manufacturing & Vehicle Body Building",
    tagline: "Digitizing automotive glass discovery & ready-to-fit window assemblies",
    summary: "Built a requirement-driven web platform and multi-step Vehicle Glass Finder for a regional automotive glass supplier and window assembler in Madurai and Srivilliputhur.",
    context: "Sri Nantha Glasses & Stickers is a specialized automotive glass supplier and window assembler operating physical units in Madurai and Srivilliputhur, serving bus body builders, workshops, fleet operators, and vehicle owners across South India.",
    problem: "The business relied on unorganized phone calls where customers struggled to describe exact glass dimensions or part numbers. Previous web efforts misaligned their brand positioning by claiming raw glass manufacturing rather than ready-to-fit assembly solutions.",
    discovery: "We discovered that B2B clients (bus body builders, fleet owners) needed technical frame specs and bulk quote flows, while B2C vehicle owners needed simple, photo-assisted glass identification without technical part numbers.",
    approach: "Designed an intent-driven web platform centered around an interactive Vehicle Glass Finder, grounded in factual ready-to-fit assembly positioning, and anchored to verified physical locations in Madurai and Srivilliputhur.",
    intervention: [
      "Re-architected brand positioning to highlight pre-assembled 6063-T6 aluminum sliding windows and leakproof EPDM fitting.",
      "Engineered an interactive 7-step Vehicle Glass Finder with photo upload capability and automatic WhatsApp template pre-fills.",
      "Created audience-tailored solution landing pages for Bus Body Builders, Workshops, Fleet Owners, and Vehicle Owners.",
      "Implemented comprehensive Local SEO, Schema.org (AutoPartsStore, LocalBusiness), and AEO/GEO structured FAQ data.",
    ],
    systemDelivered: [
      "28-route static Next.js 16 web application with zero client-side layout shifts.",
      "Interactive Vehicle Glass Finder wizard supporting manual model fallbacks and photo attachments.",
      "Persistent mobile sticky action bar (Call | WhatsApp | Get a Quote) for 1-tap conversion.",
      "Lead collection API storing inquiries safely with full audience context.",
    ],
    qualitativeOutcome: "Significantly reduced inquiry friction by allowing customers to attach photos or select vehicle types directly. Bus body builders and fleet operators now access clear technical specifications and bulk quote workflows without guesswork.",
    learnings: "Commercial transport buyers prioritize operational clarity (alloy specs, fitment speed, photo identification) over decorative marketing copy.",
    capabilitiesUsed: ["DEFINE", "GROW", "BUILD"],
    heroImage: "/images/work/sri-nantha.png",
  },
  mahalakshmi: {
    id: "mahalakshmi",
    slug: "mahalakshmi",
    client: "Mahalakshmi Tours & Travels",
    category: "Regional Transport & Tour Operations",
    industry: "Travel & Hospitality",
    tagline: "Streamlining regional tour package discovery and direct WhatsApp inquiries",
    summary: "Created a mobile-first digital inquiry platform for a regional tour operator, structuring package itineraries and instant booking pathways.",
    context: "Mahalakshmi Tours & Travels provides temple tour packages, corporate cab rentals, and South India tour itineraries for families, groups, and pilgrims.",
    problem: "Customers found it difficult to compare package itineraries, vehicle options (tempo traveller, bus, sedan), and pricing options on mobile devices, leading to dropped calls and lost booking opportunities.",
    discovery: "Travelers in the region overwhelmingly prefer communicating via WhatsApp once they see a clear, transparent itinerary breakdown.",
    approach: "Built a responsive, visual tour discovery platform with structured itinerary highlights and 1-tap WhatsApp consultation buttons.",
    intervention: [
      "Restructured tour package layouts into clear day-by-day itineraries and inclusion checklists.",
      "Integrated direct WhatsApp pre-filled messages specifying desired travel dates and passenger counts.",
      "Optimized local mobile performance for fast loading on 3G/4G networks.",
    ],
    systemDelivered: [
      "Responsive tour catalog with category filtering (Pilgrimage, Family, Corporate).",
      "Instant WhatsApp inquiry integration across all package cards.",
      "SEO metadata targeting South India regional travel searches.",
    ],
    qualitativeOutcome: "Improved inquiry clarity by enabling travelers to select specific tour packages and vehicle preferences before contacting the booking team.",
    learnings: "In regional travel, presenting transparent day-by-day inclusions upfront builds far greater booking confidence than hiding details behind contact forms.",
    capabilitiesUsed: ["DEFINE", "GROW"],
    heroImage: "/images/work/mahalakshmi.png",
  },
  gateway: {
    id: "gateway",
    slug: "gateway",
    client: "Gateway Holidays",
    category: "Custom Tour Operator & Destination Management",
    industry: "Travel & Hospitality",
    tagline: "Elevating brand positioning and custom holiday package consultation",
    summary: "Engineered a high-trust digital experience for a custom holiday tour operator specializing in experiential domestic and international travel.",
    context: "Gateway Holidays designs customized vacation itineraries, honeymoon packages, and group tours for discerning travelers seeking tailored travel experiences.",
    problem: "Their existing digital presence did not reflect the premium quality of their customized travel planning, making it hard to compete with larger online travel agencies.",
    discovery: "Custom holiday clients require visual inspiration combined with direct access to experienced travel planners who can tailor every leg of the journey.",
    approach: "Designed an editorial-style digital experience showcasing curated destinations, clear planning processes, and direct consultant inquiry pathways.",
    intervention: [
      "Defined an elegant visual identity and editorial layout for destination showcases.",
      "Built interactive inquiry forms collecting travel dates, group size, and destination preferences.",
      "Optimized page speed and image delivery for high-resolution travel photography.",
    ],
    systemDelivered: [
      "Editorial destination & package showcase platform.",
      "Custom travel inquiry management integration.",
      "Comprehensive search engine metadata and social sharing previews.",
    ],
    qualitativeOutcome: "Established a professional digital presence that instills traveler confidence and generates qualified holiday planning inquiries.",
    learnings: "High-value custom service inquiries depend heavily on polished typography, visual clarity, and fast response channels.",
    capabilitiesUsed: ["DEFINE", "GROW", "BUILD"],
    heroImage: "/images/work/gateway.png",
  },
};
