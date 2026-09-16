import { solutionsContent } from "@/content/solutions/solutions";
import { industriesContent } from "@/content/industries/industries";
import { workContent } from "@/content/work/work";
import { productsContent } from "@/content/products/products";
import { insightsContent } from "@/content/insights/insights";
import { proofContent } from "@/content/proof/proof";
import { authorsContent } from "@/content/authors/authors";
import { testimonialsContent } from "@/content/testimonials/testimonials";
import { faqsContent } from "@/content/faqs/faqs";

export interface ValidationIssue {
  entity: string;
  slug: string;
  message: string;
}

export function validateContentRegistry(): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const allSlugs = new Set<string>();

  const solutionSlugs = new Set(Object.keys(solutionsContent));
  const industrySlugs = new Set(Object.keys(industriesContent));
  const workSlugs = new Set(Object.keys(workContent));
  const productSlugs = new Set(Object.keys(productsContent));
  const insightSlugs = new Set(Object.keys(insightsContent));
  const authorIds = new Set(Object.keys(authorsContent));

  const checkSlug = (entity: string, slug: string) => {
    if (!slug || slug.trim() === "") {
      issues.push({ entity, slug, message: "Missing or empty slug/ID" });
    } else if (allSlugs.has(`${entity}:${slug}`)) {
      issues.push({ entity, slug, message: `Duplicate slug detected: ${slug}` });
    } else {
      allSlugs.add(`${entity}:${slug}`);
    }
  };

  // Helper for SEO validation
  const checkSEO = (entity: string, slug: string, seo?: { title?: string; description?: string }) => {
    if (!seo?.title || !seo?.description) {
      issues.push({ entity, slug, message: "Missing required SEO metadata (title or description)" });
    }
  };

  // Helper for Media validation
  const checkMedia = (entity: string, slug: string, media?: { src?: string; alt?: string; isDecorative?: boolean }) => {
    if (media && !media.isDecorative && (!media.alt || media.alt.trim() === "")) {
      issues.push({ entity, slug, message: "Media element is missing alt text" });
    }
  };

  // 1. Validate Solutions
  Object.values(solutionsContent).forEach((sol) => {
    checkSlug("solution", sol.slug);
    checkSEO("solution", sol.slug, sol.seo);

    sol.relatedIndustrySlugs?.forEach((indSlug) => {
      if (!industrySlugs.has(indSlug)) {
        issues.push({ entity: "solution", slug: sol.slug, message: `Invalid related industry reference: ${indSlug}` });
      }
    });

    sol.relatedWorkSlugs?.forEach((wSlug) => {
      if (!workSlugs.has(wSlug)) {
        issues.push({ entity: "solution", slug: sol.slug, message: `Invalid related work reference: ${wSlug}` });
      }
    });

    sol.relatedInsightSlugs?.forEach((insSlug) => {
      if (!insightSlugs.has(insSlug)) {
        issues.push({ entity: "solution", slug: sol.slug, message: `Invalid related insight reference: ${insSlug}` });
      }
    });
  });

  // 2. Validate Industries
  Object.values(industriesContent).forEach((ind) => {
    checkSlug("industry", ind.slug);
    checkSEO("industry", ind.slug, ind.seo);

    ind.relevantSolutionSlugs?.forEach((solSlug) => {
      if (!solutionSlugs.has(solSlug)) {
        issues.push({ entity: "industry", slug: ind.slug, message: `Invalid relevant solution reference: ${solSlug}` });
      }
    });

    ind.relatedWorkSlugs?.forEach((wSlug) => {
      if (!workSlugs.has(wSlug)) {
        issues.push({ entity: "industry", slug: ind.slug, message: `Invalid related work reference: ${wSlug}` });
      }
    });

    ind.relatedInsightSlugs?.forEach((insSlug) => {
      if (!insightSlugs.has(insSlug)) {
        issues.push({ entity: "industry", slug: ind.slug, message: `Invalid related insight reference: ${insSlug}` });
      }
    });
  });

  // 3. Validate Case Studies (Work)
  Object.values(workContent).forEach((work) => {
    checkSlug("work", work.slug);
    checkSEO("work", work.slug, work.seo);
    checkMedia("work", work.slug, work.heroImage);

    work.solutionsInvolved?.forEach((solId) => {
      if (!solutionSlugs.has(solId)) {
        issues.push({ entity: "work", slug: work.slug, message: `Invalid solution involved reference: ${solId}` });
      }
    });

    if (work.relatedIndustrySlug && !industrySlugs.has(work.relatedIndustrySlug)) {
      issues.push({ entity: "work", slug: work.slug, message: `Invalid related industry reference: ${work.relatedIndustrySlug}` });
    }

    work.relatedInsightSlugs?.forEach((insSlug) => {
      if (!insightSlugs.has(insSlug)) {
        issues.push({ entity: "work", slug: work.slug, message: `Invalid related insight reference: ${insSlug}` });
      }
    });
  });

  // 4. Validate Products
  Object.values(productsContent).forEach((prod) => {
    checkSlug("product", prod.slug);
    checkSEO("product", prod.slug, prod.seo);

    prod.relatedIndustrySlugs?.forEach((indSlug) => {
      if (!industrySlugs.has(indSlug)) {
        issues.push({ entity: "product", slug: prod.slug, message: `Invalid related industry reference: ${indSlug}` });
      }
    });

    prod.relatedSolutionSlugs?.forEach((solSlug) => {
      if (!solutionSlugs.has(solSlug)) {
        issues.push({ entity: "product", slug: prod.slug, message: `Invalid related solution reference: ${solSlug}` });
      }
    });
  });

  // 5. Validate Insights
  Object.values(insightsContent).forEach((insight) => {
    checkSlug("insight", insight.slug);
    checkSEO("insight", insight.slug, insight.seo);
    checkMedia("insight", insight.slug, insight.featuredImage);

    if (insight.authorId && !authorIds.has(insight.authorId)) {
      issues.push({ entity: "insight", slug: insight.slug, message: `Invalid author ID reference: ${insight.authorId}` });
    }

    insight.relatedSolutionSlugs?.forEach((solSlug) => {
      if (!solutionSlugs.has(solSlug)) {
        issues.push({ entity: "insight", slug: insight.slug, message: `Invalid related solution reference: ${solSlug}` });
      }
    });

    insight.relatedIndustrySlugs?.forEach((indSlug) => {
      if (!industrySlugs.has(indSlug)) {
        issues.push({ entity: "insight", slug: insight.slug, message: `Invalid related industry reference: ${indSlug}` });
      }
    });

    insight.relatedWorkSlugs?.forEach((wSlug) => {
      if (!workSlugs.has(wSlug)) {
        issues.push({ entity: "insight", slug: insight.slug, message: `Invalid related work reference: ${wSlug}` });
      }
    });
  });

  // 6. Validate Authors
  Object.values(authorsContent).forEach((author) => {
    checkSlug("author", author.slug);
    checkMedia("author", author.slug, author.photo);
  });

  // 7. Validate Proof Items
  Object.values(proofContent).forEach((pf) => {
    checkSlug("proof", pf.slug);
    if (!pf.claim || pf.claim.trim() === "") {
      issues.push({ entity: "proof", slug: pf.slug, message: "Missing claim property" });
    }
  });

  // 8. Validate Testimonials
  Object.values(testimonialsContent).forEach((t) => {
    checkSlug("testimonial", t.slug);
    checkMedia("testimonial", t.slug, t.image);
    if (!t.verified) {
      issues.push({ entity: "testimonial", slug: t.slug, message: "Unverified testimonial found in registry" });
    }
  });

  // 9. Validate FAQs
  faqsContent.forEach((faq) => {
    checkSlug("faq", faq.slug);
    if (faq.relatedSolutionSlug && !solutionSlugs.has(faq.relatedSolutionSlug)) {
      issues.push({ entity: "faq", slug: faq.slug, message: `Invalid related solution reference: ${faq.relatedSolutionSlug}` });
    }
    if (faq.relatedIndustrySlug && !industrySlugs.has(faq.relatedIndustrySlug)) {
      issues.push({ entity: "faq", slug: faq.slug, message: `Invalid related industry reference: ${faq.relatedIndustrySlug}` });
    }
    if (faq.relatedProductSlug && !productSlugs.has(faq.relatedProductSlug)) {
      issues.push({ entity: "faq", slug: faq.slug, message: `Invalid related product reference: ${faq.relatedProductSlug}` });
    }
  });

  return issues;
}
