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
  return solutionsContent[slug] || Object.values(solutionsContent).find((s) => s.slug === slug);
}

export function getSolutionById(id: string): SolutionContent | undefined {
  return Object.values(solutionsContent).find((s) => s.id === id);
}

// 3. INDUSTRIES
export function getIndustries(): IndustryContent[] {
  return Object.values(industriesContent);
}

export function getIndustryBySlug(slug: string): IndustryContent | undefined {
  return industriesContent[slug] || Object.values(industriesContent).find((i) => i.slug === slug);
}

export function getIndustryById(id: string): IndustryContent | undefined {
  return Object.values(industriesContent).find((i) => i.id === id);
}

// 4. CASE STUDIES / WORK
export function getCaseStudies(): CaseStudyContent[] {
  return Object.values(workContent);
}

export function getFeaturedCaseStudies(): CaseStudyContent[] {
  return Object.values(workContent).filter((w) => w.featured);
}

export function getCaseStudyBySlug(slug: string): CaseStudyContent | undefined {
  return workContent[slug] || Object.values(workContent).find((w) => w.slug === slug);
}

export function getCaseStudyById(id: string): CaseStudyContent | undefined {
  return Object.values(workContent).find((w) => w.id === id);
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
  return productsContent[slug] || Object.values(productsContent).find((p) => p.slug === slug);
}

export function getProductById(id: string): ProductContent | undefined {
  return Object.values(productsContent).find((p) => p.id === id);
}

// 6. INSIGHTS
export function getInsights(): InsightContent[] {
  return Object.values(insightsContent);
}

export function getInsightBySlug(slug: string): InsightContent | undefined {
  return insightsContent[slug] || Object.values(insightsContent).find((ins) => ins.slug === slug);
}

export function getInsightById(id: string): InsightContent | undefined {
  return Object.values(insightsContent).find((ins) => ins.id === id);
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

export function getRelatedInsightsForProduct(productSlug: string): InsightContent[] {
  return Object.values(insightsContent).filter((ins) =>
    ins.relatedProductSlugs?.includes(productSlug)
  );
}

// 7. PROOF
export function getProofItems(): ProofContent[] {
  return Object.values(proofContent);
}

export function getProofBySlug(slug: string): ProofContent | undefined {
  return proofContent[slug] || Object.values(proofContent).find((p) => p.slug === slug);
}

export function getProofById(id: string): ProofContent | undefined {
  return Object.values(proofContent).find((p) => p.id === id);
}

// 8. AUTHORS
export function getAuthors(): AuthorContent[] {
  return Object.values(authorsContent);
}

export function getAuthorBySlug(slug: string): AuthorContent | undefined {
  return authorsContent[slug] || Object.values(authorsContent).find((a) => a.slug === slug);
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

export function getTestimonialBySlug(slug: string): TestimonialContent | undefined {
  return testimonialsContent[slug] || Object.values(testimonialsContent).find((t) => t.slug === slug);
}

export function getTestimonialById(id: string): TestimonialContent | undefined {
  return Object.values(testimonialsContent).find((t) => t.id === id);
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

export function getFAQsForIndustry(industrySlug: string): FAQContent[] {
  return faqsContent.filter((f) => f.relatedIndustrySlug === industrySlug);
}

export function getFAQsForProduct(productSlug: string): FAQContent[] {
  return faqsContent.filter((f) => f.relatedProductSlug === productSlug);
}

// 11. GLOBAL CONTENT
export function getGlobalContent(): GlobalContent {
  return globalContent;
}


