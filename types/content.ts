export type EntityType =
  | "brand"
  | "solution"
  | "industry"
  | "work"
  | "product"
  | "insight"
  | "proof"
  | "author"
  | "testimonial"
  | "faq"
  | "global";

export interface ContentReference {
  type: EntityType;
  slug: string;
}

export interface SEOData {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: "summary" | "summary_large_image";
  noIndex?: boolean;
}

export interface MediaRef {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  isDecorative?: boolean;
}

export interface CTARef {
  label: string;
  labelWithArrow?: string;
  href: string;
  variant?: "primary" | "secondary" | "tertiary" | "phone" | "whatsapp";
  external?: boolean;
}

// 1. BRAND CONTENT MODEL
export interface BrandSystemStage {
  id: string;
  step: string;
  title: string;
  description: string;
}

export interface BrandPrinciple {
  title: string;
  description: string;
}

export interface BrandContent {
  name: string;
  category: string;
  positioning: string;
  essence: string;
  promise: string;
  tagline: string;
  mission: string;
  vision: string;
  personality: string[];
  voice: string[];
  systemStages: BrandSystemStage[];
  principles: BrandPrinciple[];
  address: {
    city: string;
    region: string;
    country: string;
  };
  phone: string;
  email: string;
  social: {
    linkedin: string;
    github: string;
    twitter: string;
  };
}

// 2. SOLUTION CONTENT MODEL
export interface SolutionSystem {
  title: string;
  description: string;
}

export interface SolutionContent {
  id: "grow" | "define" | "build" | "productize";
  slug: string;
  name: string;
  heroHeadline: string;
  positioning: string;
  summary: string;
  shortDescription: string;
  workflow: string[];
  systems: SolutionSystem[];
  capabilities: string[];
  problemsSolved: string[];
  outcomes?: string[];
  relatedIndustrySlugs: string[];
  relatedWorkSlugs: string[];
  relatedInsightSlugs: string[];
  iconName: string;
  cta: CTARef;
  seo: SEOData;
}

// 3. INDUSTRY CONTENT MODEL
export interface IndustryContent {
  id: string;
  slug: string;
  name: string;
  heroHeadline: string;
  businessReality: string;
  problems: string[];
  opportunities?: string[];
  relevantRedwolfSystems: string[];
  relevantSolutionSlugs: string[];
  relatedWorkSlugs: string[];
  relatedInsightSlugs: string[];
  cta: CTARef;
  seo: SEOData;
}

// 4. WORK / CASE STUDY CONTENT MODEL
export interface CaseStudyIntervention {
  title: string;
  description: string;
}

export interface CaseStudyContent {
  id: string;
  slug: string;
  client: string;
  category: string;
  industry: string;
  summary: string;
  context: string;
  problem: string;
  discovery: string;
  approach: string;
  interventions: CaseStudyIntervention[];
  system: string;
  outcome: string;
  evidence?: string[];
  learning: string;
  nextStep?: string;
  capabilitiesUsed: string[];
  solutionsInvolved: ("grow" | "define" | "build" | "productize")[];
  relatedIndustrySlug: string;
  relatedInsightSlugs: string[];
  featured: boolean;
  heroImage?: MediaRef;
  seo: SEOData;
}

// 5. PRODUCT CONTENT MODEL
export interface ProductUserRole {
  role: string;
  title: string;
  description: string;
  features: string[];
}

export interface ProductDiagramStep {
  step: string;
  label: string;
  description: string;
}

export interface ProductFeatureCategory {
  category: string;
  items: string[];
}

export interface ProductContent {
  id: string;
  slug: string;
  name: string;
  category: string;
  tagline: string;
  summary: string;
  heroHeadline: string;
  supportingCopy: string;
  workflow: string[];
  userRoles: ProductUserRole[];
  offlineFirstArchitecture: {
    title: string;
    description: string;
    diagramSteps: ProductDiagramStep[];
  };
  features: ProductFeatureCategory[];
  capabilities: string[];
  relatedIndustrySlugs: string[];
  relatedSolutionSlugs: string[];
  cta: {
    primaryText: string;
    secondaryText: string;
    demoUrl: string;
  };
  seo: SEOData;
}

// 6. INSIGHT / ARTICLE CONTENT MODEL
export interface InsightFAQ {
  question: string;
  answer: string;
}

export interface InsightContent {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "Digital Growth" | "AI Search" | "Technology" | "Business Systems" | "Product & SaaS";
  type: string;
  readTime: string;
  publishedAt: string;
  updatedAt?: string;
  authorId?: string;
  featuredImage?: MediaRef;
  content: string;
  relatedSolutionSlugs: string[];
  relatedIndustrySlugs: string[];
  relatedWorkSlugs: string[];
  relatedProductSlugs: string[];
  tags: string[];
  faqs?: InsightFAQ[];
  seo: SEOData;
}

// 7. PROOF / EVIDENCE CONTENT MODEL
export interface ProofContent {
  id: string;
  slug: string;
  title: string;
  claim: string;
  evidence: string;
  source: string;
  verified: boolean;
  metricValue?: string;
  metricLabel?: string;
  metricContext?: string;
  quote?: string;
  author?: string;
  role?: string;
  company?: string;
}

// 8. AUTHOR CONTENT MODEL
export interface AuthorContent {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  photo?: MediaRef;
  expertise: string[];
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

// 9. TESTIMONIAL CONTENT MODEL
export interface TestimonialContent {
  id: string;
  slug: string;
  quote: string;
  person: string;
  role: string;
  organisation: string;
  image?: MediaRef;
  relatedWorkSlug?: string;
  verified: boolean;
}

// 10. FAQ CONTENT MODEL
export interface FAQContent {
  id: string;
  slug: string;
  question: string;
  answer: string;
  category: string;
  relatedSolutionSlug?: string;
  relatedIndustrySlug?: string;
  relatedProductSlug?: string;
  page?: string;
}

// 11. GLOBAL WEBSITE CONTENT MODEL
export interface GlobalContent {
  siteName: string;
  positioning: string;
  promise: string;
  tagline: string;
  commonCTAs: {
    primary: CTARef;
    diagnostic: CTARef;
    work: CTARef;
    easytrack: CTARef;
    easytrackDemo: CTARef;
    insights: CTARef;
  };
  footerLinks: {
    label: string;
    href: string;
  }[];
}
