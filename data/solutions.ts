export interface CapabilityItem {
  id: "grow" | "define" | "build" | "productize";
  slug: string;
  name: string;
  heroHeadline: string;
  positioning: string;
  summary: string;
  workflow: string[];
  systems: {
    title: string;
    description: string;
  }[];
  capabilities: string[];
  problemsSolved: string[];
  iconName: string;
}

export const solutionsData: Record<string, CapabilityItem> = {
  grow: {
    id: "grow",
    slug: "grow",
    name: "GROW",
    heroHeadline: "Make your business easier to find, trust and choose.",
    positioning: "Turn digital attention into business growth.",
    summary: "Help qualified buyers discover your business, understand your value, build commercial trust, and convert into active leads or clients.",
    workflow: ["SEARCH", "DISCOVER", "TRUST", "ACT", "RETURN"],
    systems: [
      {
        title: "Discoverability Systems",
        description: "Technical SEO, Local SEO, and AI Search Optimization (AEO/GEO) to ensure your business answers high-intent searches.",
      },
      {
        title: "Demand Generation",
        description: "Targeted Google Ads and Meta campaign architectures built around clear audience intent rather than broad vanity metrics.",
      },
      {
        title: "Trust & Conversion Architecture",
        description: "High-converting landing pages, friction-free inquiry flows, and clear value presentation that turn traffic into inquiries.",
      },
      {
        title: "Measurement & Optimization",
        description: "Server-side event analytics and conversion tracking to understand real client acquisition velocity.",
      },
    ],
    capabilities: [
      "Technical SEO",
      "Local SEO & GBP Optimization",
      "AI Search Optimization (AEO/GEO)",
      "Google & Meta Performance Ads",
      "Landing Page Engineering",
      "Conversion Rate Optimization (CRO)",
      "Analytics & Conversion Tracking",
      "Customer Acquisition Strategy",
    ],
    problemsSolved: [
      "We're doing marketing, but the right customers aren't finding us.",
      "Our website gets traffic, but visitors rarely turn into inquiries.",
      "Local customers don't find our physical units in regional searches.",
      "We can't measure which marketing efforts actually generate sales.",
    ],
    iconName: "TrendingUp",
  },
  define: {
    id: "define",
    slug: "define",
    name: "DEFINE",
    heroHeadline: "Make your business clear before you make it bigger.",
    positioning: "Clarify what your business stands for, how it should be perceived, and how that thinking translates into every digital experience.",
    summary: "Align core brand positioning, message hierarchy, visual identity, and user interface design to accurately reflect the true scale of your enterprise.",
    workflow: ["POSITION", "EXPRESS", "EXPERIENCE", "CONNECT"],
    systems: [
      {
        title: "Positioning & Messaging Systems",
        description: "Clarify core value proposition, primary target audiences, competitive differentiation, and tone of voice.",
      },
      {
        title: "Visual Identity Systems",
        description: "Design durable, modern typography, color palettes, layout systems, and brand assets built for digital clarity.",
      },
      {
        title: "User Experience Architecture",
        description: "Structure complex information, service catalogs, and navigation into intuitive user journeys.",
      },
      {
        title: "Digital Experience Systems",
        description: "Translate strategic clarity into modern, responsive, server-rendered web platforms.",
      },
    ],
    capabilities: [
      "Brand Strategy & Positioning",
      "Message Hierarchy & Copywriting",
      "Visual Identity Design",
      "Information Architecture (IA)",
      "UX Strategy & Wireframing",
      "UI & Interaction Design",
      "Design System Development",
      "Digital Experience Audit",
    ],
    problemsSolved: [
      "Our website doesn't represent the business we've become.",
      "Customers don't understand the full scope of what we offer.",
      "Our brand feels outdated compared to newer market competitors.",
      "Our team struggles to explain our value clearly and consistently.",
    ],
    iconName: "Compass",
  },
  build: {
    id: "build",
    slug: "build",
    name: "BUILD",
    heroHeadline: "Turn business processes into digital systems.",
    positioning: "We design and build web applications, business platforms, and automation systems around how your business actually works.",
    summary: "Eliminate manual chaos, spreadsheets, paper clipboards, and disconnected tools by engineering custom digital workflow platforms.",
    workflow: ["MANUAL", "UNDERSTAND", "MAP", "DIGITIZE", "CONNECT", "MEASURE"],
    systems: [
      {
        title: "Business Process Platforms",
        description: "Custom web applications that digitize core operations—from quote requests and job tracking to inventory and invoicing.",
      },
      {
        title: "Web Application Engineering",
        description: "Server-first Next.js, React, and TypeScript platforms engineered for fast load times, accessibility, and high security.",
      },
      {
        title: "System Integration & Automation",
        description: "Connect disparate APIs, webhooks, databases, and communication channels (WhatsApp, Email, CRM) into unified flows.",
      },
      {
        title: "Digital Transformation",
        description: "Modernize legacy operational workflows into resilient software systems built for real-world staff usage.",
      },
    ],
    capabilities: [
      "Full-Stack Web Development",
      "Custom Business Applications",
      "API & Webhook Integrations",
      "Workflow Automation",
      "Database Architecture",
      "CRM & Lead Management Systems",
      "Security & Role-Based Access",
      "Legacy Code Modernization",
    ],
    problemsSolved: [
      "Our team still depends on spreadsheets, calls, and manual processes.",
      "Inquiries and leads get lost or take too long for our team to follow up.",
      "Existing off-the-shelf software doesn't fit how our operational floor works.",
      "Data is fragmented across multiple tools with no single source of truth.",
    ],
    iconName: "Cpu",
  },
  productize: {
    id: "productize",
    slug: "productize",
    name: "PRODUCTIZE",
    heroHeadline: "Turn ideas and workflows into software products.",
    positioning: "From product strategy to SaaS engineering, we help businesses turn internal workflows and market ideas into scalable software products.",
    summary: "Transform operational expertise or internal tools into standalone SaaS platforms, field applications, or commercial digital products.",
    workflow: ["IDEA", "VALIDATE", "DESIGN", "BUILD", "LAUNCH", "LEARN", "SCALE"],
    systems: [
      {
        title: "Product Strategy & Validation",
        description: "Validate product hypotheses, define minimum viable scope (MVP), and map user roles before writing production code.",
      },
      {
        title: "Product Experience Design",
        description: "Design intuitive multi-tenant SaaS dashboards, mobile field application UIs, and administrative control panels.",
      },
      {
        title: "SaaS & App Engineering",
        description: "Engineer resilient multi-tenant architectures, offline-first sync engines, and subscription platforms.",
      },
      {
        title: "Product Intelligence & Growth",
        description: "Implement product analytics, user onboarding funnels, and continuous feature evolution based on user behavior.",
      },
    ],
    capabilities: [
      "SaaS Architecture & Engineering",
      "Offline-First Mobile/Field Apps",
      "Multi-Tenant Database Systems",
      "Product Discovery & MVP Scope",
      "User Onboarding Experience",
      "Subscription & License Billing",
      "Product Analytics & Event Tracking",
      "API & SDK Engineering",
    ],
    problemsSolved: [
      "We have an internal workflow that could become a SaaS product for our industry.",
      "We know what software we want to build, but don't know where to start.",
      "Our field team works in low-connectivity environments where standard cloud apps fail.",
      "We need a reliable technology partner to design, build, and scale our SaaS product.",
    ],
    iconName: "Box",
  },
};
