import { solutionsContent } from "@/content/solutions/solutions";
import { industriesContent } from "@/content/industries/industries";
import { workContent } from "@/content/work/work";
import { productsContent } from "@/content/products/products";
import { insightsContent } from "@/content/insights/insights";

export interface ValidationIssue {
  entity: string;
  slug: string;
  message: string;
}

export function validateContentRegistry(): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const allSlugs = new Set<string>();

  const checkSlug = (entity: string, slug: string) => {
    if (!slug || slug.trim() === "") {
      issues.push({ entity, slug, message: "Missing or empty slug" });
    } else if (allSlugs.has(`${entity}:${slug}`)) {
      issues.push({ entity, slug, message: `Duplicate slug detected: ${slug}` });
    } else {
      allSlugs.add(`${entity}:${slug}`);
    }
  };

  // 1. Validate Solutions
  Object.values(solutionsContent).forEach((sol) => {
    checkSlug("solution", sol.slug);
    if (!sol.seo?.title || !sol.seo?.description) {
      issues.push({ entity: "solution", slug: sol.slug, message: "Missing SEO metadata" });
    }
  });

  // 2. Validate Industries
  Object.values(industriesContent).forEach((ind) => {
    checkSlug("industry", ind.slug);
    if (!ind.seo?.title || !ind.seo?.description) {
      issues.push({ entity: "industry", slug: ind.slug, message: "Missing SEO metadata" });
    }
  });

  // 3. Validate Case Studies (Work)
  Object.values(workContent).forEach((work) => {
    checkSlug("work", work.slug);
    if (!work.seo?.title || !work.seo?.description) {
      issues.push({ entity: "work", slug: work.slug, message: "Missing SEO metadata" });
    }
  });

  // 4. Validate Products
  Object.values(productsContent).forEach((prod) => {
    checkSlug("product", prod.slug);
    if (!prod.seo?.title || !prod.seo?.description) {
      issues.push({ entity: "product", slug: prod.slug, message: "Missing SEO metadata" });
    }
  });

  // 5. Validate Insights
  Object.values(insightsContent).forEach((insight) => {
    checkSlug("insight", insight.slug);
    if (!insight.seo?.title || !insight.seo?.description) {
      issues.push({ entity: "insight", slug: insight.slug, message: "Missing SEO metadata" });
    }
  });

  return issues;
}
