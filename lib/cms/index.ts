import {
  BrandContent,
  SolutionContent,
  IndustryContent,
  CaseStudyContent,
  ProductContent,
  InsightContent,
  ProofContent,
  AuthorContent,
  TestimonialContent,
  FAQContent,
  GlobalContent,
} from "@/types/content";

import { brandContent } from "@/content/brand/brand";
import { solutionsContent } from "@/content/solutions/solutions";
import { industriesContent } from "@/content/industries/industries";
import { workContent } from "@/content/work/work";
import { productsContent } from "@/content/products/products";
import { insightsContent } from "@/content/insights/insights";
import { proofContent } from "@/content/proof/proof";
import { authorsContent } from "@/content/authors/authors";
import { testimonialsContent } from "@/content/testimonials/testimonials";
import { faqsContent } from "@/content/faqs/faqs";
import { globalContent } from "@/content/global/global";

// 1. BRAND
export function getBrandContent(): BrandContent {
  return brandContent;
}

// 2. SOLUTIONS
export function getSolutions(): SolutionContent[] {
  return Object.values(solutionsContent);
}

export function getSolutionBySlug(slug: string): SolutionContent | undefined {
  return solutionsContent[slug];
}

// 3. INDUSTRIES
export function getIndustries(): IndustryContent[] {
  return Object.values(industriesContent);
}

export function getIndustryBySlug(slug: string): IndustryContent | undefined {
  return industriesContent[slug];
}

// 4. CASE STUDIES / WORK
export function getCaseStudies(): CaseStudyContent[] {
  return Object.values(workContent);
}

export function getFeaturedCaseStudies(): CaseStudyContent[] {
  return Object.values(workContent).filter((w) => w.featured);
}

export function getCaseStudyBySlug(slug: string): CaseStudyContent | undefined {
  return workContent[slug];
}

export function getRelatedWorkForSolution(solutionSlug: string): CaseStudyContent[] {
  const targetId = solutionSlug as SolutionContent["id"];
  return Object.values(workContent).filter((w) =>
    w.solutionsInvolved.includes(targetId)
  );
}

// 5. PRODUCTS
export function getProducts(): ProductContent[] {
  return Object.values(productsContent);
}

export function getProductBySlug(slug: string): ProductContent | undefined {
  return productsContent[slug];
}

// 6. INSIGHTS
export function getInsights(): InsightContent[] {
  return Object.values(insightsContent);
}

export function getInsightBySlug(slug: string): InsightContent | undefined {
  return insightsContent[slug];
}

export function getRelatedInsightsForIndustry(industrySlug: string): InsightContent[] {
  return Object.values(insightsContent).filter((ins) =>
    ins.relatedIndustrySlugs.includes(industrySlug)
  );
}

// 7. PROOF
export function getProofItems(): ProofContent[] {
  return Object.values(proofContent);
}

export function getProofBySlug(slug: string): ProofContent | undefined {
  return proofContent[slug];
}

// 8. AUTHORS
export function getAuthors(): AuthorContent[] {
  return Object.values(authorsContent);
}

export function getAuthorBySlug(slug: string): AuthorContent | undefined {
  return authorsContent[slug];
}

// 9. TESTIMONIALS
export function getTestimonials(): TestimonialContent[] {
  return Object.values(testimonialsContent);
}

// 10. FAQS
export function getFAQs(category?: string): FAQContent[] {
  if (!category) return faqsContent;
  return faqsContent.filter((f) => f.category === category);
}

export function getFAQsByPage(page: string): FAQContent[] {
  return faqsContent.filter((f) => f.page === page);
}

// 11. GLOBAL CONTENT
export function getGlobalContent(): GlobalContent {
  return globalContent;
}
