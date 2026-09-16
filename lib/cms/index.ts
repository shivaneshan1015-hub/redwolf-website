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

export function getRelatedWorkForIndustry(industrySlug: string): CaseStudyContent[] {
  return Object.values(workContent).filter((w) =>
    w.relatedIndustrySlug === industrySlug
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

export function getRelatedInsightsForSolution(solutionSlug: string): InsightContent[] {
  return Object.values(insightsContent).filter((ins) =>
    ins.relatedSolutionSlugs.includes(solutionSlug)
  );
}

export function getRelatedInsightsForWork(workSlug: string): InsightContent[] {
  return Object.values(insightsContent).filter((ins) =>
    ins.relatedWorkSlugs.includes(workSlug)
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

export function getAuthorById(id: string): AuthorContent | undefined {
  return authorsContent[id] || Object.values(authorsContent).find((a) => a.id === id);
}

export function getRelatedIndustriesForSolution(solutionSlug: string): IndustryContent[] {
  const sol = solutionsContent[solutionSlug];
  if (!sol) return [];
  return Object.values(industriesContent).filter(
    (ind) => sol.relatedIndustrySlugs?.includes(ind.slug) || ind.relevantSolutionSlugs?.includes(solutionSlug)
  );
}

export function getRelatedProductsForSolution(solutionSlug: string): ProductContent[] {
  const sol = solutionsContent[solutionSlug];
  if (!sol || !sol.relatedProductSlugs) return [];
  return sol.relatedProductSlugs
    .map((slug) => productsContent[slug])
    .filter((p): p is ProductContent => Boolean(p));
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

export function getFAQsForSolution(solutionSlug: string): FAQContent[] {
  return faqsContent.filter((f) => f.relatedSolutionSlug === solutionSlug);
}

// 11. GLOBAL CONTENT
export function getGlobalContent(): GlobalContent {
  return globalContent;
}

