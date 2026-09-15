export interface IndustryItem {
  id: string;
  slug: string;
  name: string;
  heroHeadline: string;
  businessReality: string;
  problems: string[];
  opportunities: string[];
  redwolfApproach: string;
  workflow: string[];
  capabilities: string[];
  featuredProductOrWork?: {
    title: string;
    description: string;
    link: string;
    type: "product" | "work";
  };
  iconName: string;
}

export const industriesData: Record<string, IndustryItem> = {
  "fmcg-distribution": {
    id: "fmcg-distribution",
    slug: "fmcg-distribution",
    name: "FMCG & Distribution",
    heroHeadline: "Distribution moves fast. Your systems should too.",
    businessReality: "FMCG distributors manage high-velocity van sales, credit cycles, route optimization, and thousands of retail shop accounts across fast-paced physical supply chains.",
    problems: [
      "Field sales agents rely on paper order pads or WhatsApp messages, causing delayed order entry.",
      "Van sales stock reconciliation takes hours at the end of each day.",
      "Retailer credit limits and collection tracking are scattered across manual ledgers.",
      "Intermittent cellular network coverage in rural routes breaks standard cloud apps.",
    ],
    opportunities: [
      "Digitize van inventory loading, route management, and on-site invoicing.",
      "Enable offline-first order capturing that automatically syncs when connectivity returns.",
      "Track retailer credit history, payment collections, and returns in real time.",
    ],
    redwolfApproach: "We combine operational distribution workflow analysis with custom software engineering. Our EasyTrack platform was built specifically to solve offline van sales and inventory friction for regional FMCG distributors.",
    workflow: ["INVENTORY", "VAN LOADING", "ROUTE / BEAT", "FIELD SALES", "RETAILER", "ORDER", "INVOICE", "CREDIT / PAYMENT", "RETURN", "ANALYTICS"],
    capabilities: ["BUILD", "PRODUCTIZE"],
    featuredProductOrWork: {
      title: "EasyTrack — FMCG Distribution Management Software",
      description: "Manage field sales, van inventory, routes, orders, credit, and collections from one connected platform.",
      link: "/products/easytrack",
      type: "product",
    },
    iconName: "Truck",
  },
  healthcare: {
    id: "healthcare",
    slug: "healthcare",
    name: "Healthcare",
    heroHeadline: "Better systems should make better care possible.",
    businessReality: "Hospitals, clinics, and diagnostic centers must balance complex patient appointment scheduling, record privacy, staff coordination, and local patient trust.",
    problems: [
      "Patients struggle to find clear department info, doctor availability, or online booking options.",
      "Front-desk staff waste hours managing phone appointments and manual patient check-ins.",
      "Medical center websites look outdated and fail to communicate specialization trust.",
      "Local patients choose competing regional hospitals simply due to better online discoverability.",
    ],
    opportunities: [
      "Build clear, accessible digital portals for instant appointment requests and doctor profiles.",
      "Establish high-authority local search discoverability for specialized treatments and clinics.",
      "Integrate WhatsApp appointment confirmation and automated patient reminder workflows.",
    ],
    redwolfApproach: "We design healthcare platforms prioritizing patient trust, WCAG accessibility, clear communication, and seamless front-desk workflow integrations—ensuring technology supports patient care.",
    workflow: ["DISCOVER", "ACCESS", "APPOINTMENT", "CARE", "FOLLOW-UP", "ENGAGEMENT"],
    capabilities: ["DEFINE", "GROW", "BUILD"],
    iconName: "Activity",
  },
  manufacturing: {
    id: "manufacturing",
    slug: "manufacturing",
    name: "Manufacturing",
    heroHeadline: "When operations grow, complexity grows with them.",
    businessReality: "Industrial manufacturers manage multi-step production lines, raw material inventory, custom quote configurations, and regional distribution networks.",
    problems: [
      "Custom product quotes require manual calculations across spreadsheets and engineering drawings.",
      "Production floor updates are disconnected from sales teams and customer inquiry desks.",
      "B2B buyers and dealers have no self-service portal to check order status or product catalogs.",
      "Brand messaging fails to highlight specialized fabrication standards and technical certifications.",
    ],
    opportunities: [
      "Digitize custom quotation workflows with automated spec inputs and component calculations.",
      "Build dealer portals for instant order placement, technical drawing access, and status tracking.",
      "Elevate brand positioning to showcase manufacturing precision, machinery, and quality specs.",
    ],
    redwolfApproach: "We bridge the gap between factory floor reality and digital experience. By engineering custom business platforms, we help manufacturers reduce quote turnaround times and systemize operations.",
    workflow: ["INQUIRY", "QUOTE", "PLANNING", "PRODUCTION", "INVENTORY", "QUALITY", "DISPATCH", "CUSTOMER"],
    capabilities: ["BUILD", "DEFINE"],
    featuredProductOrWork: {
      title: "Sri Nantha Glasses & Stickers",
      description: "Automotive glass assembly & ready-to-fit window solution platform for bus body builders and workshops.",
      link: "/work/sri-nantha",
      type: "work",
    },
    iconName: "Factory",
  },
  "travel-hospitality": {
    id: "travel-hospitality",
    slug: "travel-hospitality",
    name: "Travel & Hospitality",
    heroHeadline: "Turn travel interest into confident decisions.",
    businessReality: "Tour operators, travel agencies, and resort properties compete for traveler attention by presenting itinerary clarity, local expertise, transparent pricing, and instant inquiry response.",
    problems: [
      "Travelers drop off because itinerary options, inclusions, and exclusions aren't clearly structured.",
      "Inquiries sent via contact forms receive delayed responses, losing bookings to competitors.",
      "High reliance on third-party OTAs reduces direct agency margins and brand loyalty.",
      "Unoptimized mobile experience frustrates travelers searching for holiday packages on phones.",
    ],
    opportunities: [
      "Engineered mobile-first package discovery with instant WhatsApp itinerary sharing.",
      "Build high-converting travel portals that showcase authentic local experiences and reviews.",
      "Streamline lead intake directly to travel consultant WhatsApp dashboards.",
    ],
    redwolfApproach: "We design high-converting travel discovery experiences that combine visual storytelling, clear package itineraries, and 1-tap WhatsApp consultation pathways.",
    workflow: ["DISCOVER", "INSPIRE", "COMPARE", "TRUST", "ENQUIRE", "BOOK", "TRAVEL", "RETURN"],
    capabilities: ["GROW", "DEFINE", "BUILD"],
    featuredProductOrWork: {
      title: "Mahalakshmi Tours & Travels & Gateway Holidays",
      description: "Digital growth & inquiry platforms for tour operators and holiday package providers.",
      link: "/work/mahalakshmi",
      type: "work",
    },
    iconName: "Globe",
  },
  smes: {
    id: "smes",
    slug: "smes",
    name: "SMEs & Growing Businesses",
    heroHeadline: "Build the digital system your business has grown into.",
    businessReality: "Growing regional enterprises often outgrow their original word-of-mouth reputation and basic websites, requiring cohesive branding, digital systems, and customer acquisition engines.",
    problems: [
      "Operational processes are fragmented across WhatsApp groups, paper, and memory.",
      "Current website looks like a starter site and doesn't reflect current business capability.",
      "Sales depend on the founder's personal involvement in every customer interaction.",
      "Marketing efforts produce unpredictable results without clear attribution.",
    ],
    opportunities: [
      "Define a clear, authoritative brand positioning that wins larger commercial projects.",
      "Implement a structured customer inquiry engine linked to direct CRM workflows.",
      "Build custom internal tools to systemize daily repetitive business operations.",
    ],
    redwolfApproach: "We act as a long-term technology and growth partner for SMEs—helping business owners diagnose where friction lies and building digital systems that enable sustainable scaling.",
    workflow: ["START", "GROW", "COMPLEXITY", "FRAGMENTATION", "SYSTEMIZE", "SCALE"],
    capabilities: ["DEFINE", "GROW", "BUILD", "PRODUCTIZE"],
    iconName: "Building2",
  },
};
