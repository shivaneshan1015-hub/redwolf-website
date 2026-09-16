export interface OptionItem {
  id: string;
  label: string;
  description?: string;
  weights: {
    grow: number;
    define: number;
    build: number;
    productize: number;
  };
}

export interface QuestionItem {
  id: string;
  step: number;
  title: string;
  subtitle: string;
  options: OptionItem[];
}

export const diagnosticQuestions: QuestionItem[] = [
  {
    id: "primary_problem",
    step: 1,
    title: "What is getting in the way of your business right now?",
    subtitle: "Select the challenge that best describes your immediate friction.",
    options: [
      {
        id: "more_customers",
        label: "We need more qualified customers and leads.",
        description: "Our marketing isn't generating predictable inquiries or search visibility.",
        weights: { grow: 40, define: 10, build: 0, productize: 0 },
      },
      {
        id: "brand_mismatch",
        label: "Our brand doesn't reflect the business we've become.",
        description: "Our website, positioning, or identity feels outdated and misaligned with our current scale.",
        weights: { grow: 15, define: 40, build: 5, productize: 0 },
      },
      {
        id: "manual_processes",
        label: "Our business processes are too manual and chaotic.",
        description: "We rely on spreadsheets, paper clipboards, WhatsApp groups, and memory.",
        weights: { grow: 0, define: 10, build: 40, productize: 10 },
      },
      {
        id: "build_software",
        label: "We have an idea or workflow that needs to become software.",
        description: "We want to build a custom SaaS platform, mobile app, or internal product.",
        weights: { grow: 0, define: 5, build: 15, productize: 40 },
      },
      {
        id: "underperforming_site",
        label: "Our website gets traffic but doesn't convert into business.",
        description: "Visitors leave without taking action or contacting our team.",
        weights: { grow: 30, define: 25, build: 5, productize: 0 },
      },
      {
        id: "not_sure",
        label: "We know something is wrong, but aren't sure where to start.",
        description: "We need a diagnostic review of our strategy, digital presence, and operations.",
        weights: { grow: 15, define: 20, build: 15, productize: 10 },
      },
    ],
  },
  {
    id: "industry",
    step: 2,
    title: "Which industry vertical does your business operate in?",
    subtitle: "This helps us contextualize operational workflows and regulatory standards.",
    options: [
      {
        id: "fmcg",
        label: "FMCG & Distribution",
        description: "Field sales, van inventory, retail beat routes, and distributor operations.",
        weights: { grow: 10, define: 0, build: 30, productize: 20 },
      },
      {
        id: "healthcare",
        label: "Healthcare & Medical Centers",
        description: "Hospitals, clinics, patient booking, and medical services.",
        weights: { grow: 20, define: 20, build: 20, productize: 0 },
      },
      {
        id: "manufacturing",
        label: "Manufacturing & Engineering",
        description: "Factory production, custom quote requests, dealer supply, and B2B fabrication.",
        weights: { grow: 10, define: 15, build: 30, productize: 5 },
      },
      {
        id: "travel",
        label: "Travel & Hospitality",
        description: "Tour packages, cab fleet rentals, holiday itineraries, and resort bookings.",
        weights: { grow: 25, define: 20, build: 15, productize: 0 },
      },
      {
        id: "smes",
        label: "SMEs & Growing Enterprises",
        description: "Regional services, commercial trading, and growing business operations.",
        weights: { grow: 20, define: 20, build: 20, productize: 10 },
      },
      {
        id: "other",
        label: "Other Industry",
        description: "Technology, professional services, education, or specialized sectors.",
        weights: { grow: 15, define: 15, build: 15, productize: 15 },
      },
    ],
  },
  {
    id: "business_stage",
    step: 3,
    title: "What stage is your business currently in?",
    subtitle: "Understanding your scale determines the appropriate system complexity.",
    options: [
      {
        id: "starting",
        label: "Starting (0–2 years)",
        description: "Establishing initial market presence and customer acquisition.",
        weights: { grow: 25, define: 25, build: 5, productize: 5 },
      },
      {
        id: "growing",
        label: "Growing (2–5 years)",
        description: "Experiencing rapid inquiry volume and operational scaling pain.",
        weights: { grow: 20, define: 15, build: 25, productize: 10 },
      },
      {
        id: "established",
        label: "Established Enterprise (5+ years)",
        description: "Solid customer base needing modernized digital systems and positioning.",
        weights: { grow: 15, define: 20, build: 25, productize: 15 },
      },
      {
        id: "scaling_saas",
        label: "Scaling Product / SaaS",
        description: "Building or expanding a dedicated commercial software application.",
        weights: { grow: 10, define: 10, build: 10, productize: 35 },
      },
    ],
  },
  {
    id: "current_state",
    step: 4,
    title: "How do you currently handle this area of your business?",
    subtitle: "Tell us about your current tools and operational methods.",
    options: [
      {
        id: "spreadsheets_paper",
        label: "Spreadsheets, paper clipboards, and WhatsApp messages",
        description: "Manual coordination across fragmented personal tools.",
        weights: { grow: 0, define: 5, build: 35, productize: 10 },
      },
      {
        id: "basic_website",
        label: "A basic website built years ago that we rarely update",
        description: "Outdated web presence with minimal lead generation.",
        weights: { grow: 25, define: 30, build: 5, productize: 0 },
      },
      {
        id: "multiple_tools",
        label: "Multiple disconnected SaaS tools that don't talk to each other",
        description: "Data silos requiring manual double-entry.",
        weights: { grow: 5, define: 5, build: 30, productize: 15 },
      },
      {
        id: "custom_legacy",
        label: "Legacy software or custom tools that are slow and hard to use",
        description: "Old technology stack causing staff resistance.",
        weights: { grow: 0, define: 10, build: 30, productize: 20 },
      },
    ],
  },
  {
    id: "severity",
    step: 5,
    title: "How severe is this problem for your business growth?",
    subtitle: "Measures operational urgency and risk.",
    options: [
      {
        id: "low",
        label: "Low — Nice to fix when convenient",
        description: "Not blocking daily operations, but would improve efficiency.",
        weights: { grow: 10, define: 10, build: 5, productize: 5 },
      },
      {
        id: "moderate",
        label: "Moderate — Causing noticeable friction and lost time",
        description: "Staff and customers frequently experience delays or confusion.",
        weights: { grow: 15, define: 15, build: 15, productize: 10 },
      },
      {
        id: "high",
        label: "High — Actively losing revenue and leads every month",
        description: "Inquiries are dropping off and manual errors are costing money.",
        weights: { grow: 25, define: 15, build: 25, productize: 15 },
      },
      {
        id: "critical",
        label: "Critical — Blocking company scaling and daily operations",
        description: "Immediate operational intervention required.",
        weights: { grow: 20, define: 10, build: 35, productize: 25 },
      },
    ],
  },
  {
    id: "desired_outcome",
    step: 6,
    title: "What is the single most important outcome you want to achieve?",
    subtitle: "Focuses the primary capability recommendation.",
    options: [
      {
        id: "outcome_growth",
        label: "Predictable monthly inquiries and higher search visibility",
        description: "Consistent inbound leads from qualified target buyers.",
        weights: { grow: 40, define: 10, build: 0, productize: 0 },
      },
      {
        id: "outcome_positioning",
        label: "A modern brand identity & web platform that wins commercial trust",
        description: "Repositioning our enterprise to close higher-value projects.",
        weights: { grow: 10, define: 40, build: 5, productize: 0 },
      },
      {
        id: "outcome_automation",
        label: "Automated business workflows that reduce manual labor",
        description: "Digitized operational floor, inventory, and inquiry tracking.",
        weights: { grow: 0, define: 5, build: 40, productize: 10 },
      },
      {
        id: "outcome_software",
        label: "A launched software product ready for commercial users",
        description: "Scalable SaaS product engineered for market launch.",
        weights: { grow: 0, define: 5, build: 10, productize: 40 },
      },
    ],
  },
  {
    id: "tech_readiness",
    step: 7,
    title: "What is your team's current technology readiness?",
    subtitle: "Ensures we recommend systems built for real-world staff usage.",
    options: [
      {
        id: "non_technical",
        label: "Non-technical — We need simple, intuitive tools with minimal training",
        description: "Staff prefers mobile apps, WhatsApp, or direct visual UIs.",
        weights: { grow: 15, define: 15, build: 15, productize: 5 },
      },
      {
        id: "comfortable",
        label: "Comfortable — We use standard web dashboards and cloud apps",
        description: "Team is comfortable adopting modern digital platforms.",
        weights: { grow: 15, define: 15, build: 20, productize: 15 },
      },
      {
        id: "tech_savvy",
        label: "Tech-savvy / Engineering — We have internal developers or PMs",
        description: "Capable of managing complex software specs and APIs.",
        weights: { grow: 10, define: 10, build: 20, productize: 30 },
      },
    ],
  },
  {
    id: "budget_range",
    step: 8,
    title: "What investment range are you considering for this project?",
    subtitle: "Helps scope realistic digital path phases.",
    options: [
      {
        id: "exploring",
        label: "Exploring options / Planning stage",
        description: "Gathering technical recommendations and budget guidance.",
        weights: { grow: 10, define: 10, build: 10, productize: 10 },
      },
      {
        id: "under_50k",
        label: "Under ₹50,000",
        description: "Focused website audit, landing page, or initial diagnostic.",
        weights: { grow: 20, define: 20, build: 5, productize: 0 },
      },
      {
        id: "50k_2L",
        label: "₹50,000 – ₹2,000,000",
        description: "Comprehensive website transformation, SEO engine, or mid-scale application.",
        weights: { grow: 20, define: 20, build: 25, productize: 10 },
      },
      {
        id: "2L_5L",
        label: "₹2,000,000 – ₹5,000,000",
        description: "Custom full-stack business application or MVP SaaS product.",
        weights: { grow: 15, define: 15, build: 30, productize: 25 },
      },
      {
        id: "above_5L",
        label: "₹5,000,000+",
        description: "Enterprise digital transformation or multi-tenant SaaS architecture.",
        weights: { grow: 15, define: 15, build: 30, productize: 35 },
      },
    ],
  },
];
