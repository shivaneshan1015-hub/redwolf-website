import fs from "fs";
import path from "path";
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
import { CTARef, MediaRef, SEOData } from "@/types/content";

export interface ValidationIssue {
  entity: string;
  slug: string;
  field?: string;
  errorCode: string;
  message: string;
}

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const STATIC_ROUTES = new Set([
  "/",
  "/solutions",
  "/industries",
  "/work",
  "/products",
  "/insights",
  "/contact",
  "/diagnostic",
  "/about",
  "/design-system",
]);
const SERVICE_SLUGS = new Set([
  "local-seo",
  "performance-ads",
  "seo-aeo-geo",
  "web-applications",
]);

export function validateContentRegistry(): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  const solutionKeys = Object.keys(solutionsContent);
  const solutionSlugs = new Set(solutionKeys.map((k) => solutionsContent[k].slug));
  const solutionIds = new Set(solutionKeys.map((k) => solutionsContent[k].id));

  const industryKeys = Object.keys(industriesContent);
  const industrySlugs = new Set(industryKeys.map((k) => industriesContent[k].slug));

  const workKeys = Object.keys(workContent);
  const workSlugs = new Set(workKeys.map((k) => workContent[k].slug));

  const productKeys = Object.keys(productsContent);
  const productSlugs = new Set(productKeys.map((k) => productsContent[k].slug));

  const insightKeys = Object.keys(insightsContent);
  const insightSlugs = new Set(insightKeys.map((k) => insightsContent[k].slug));

  const authorKeys = Object.keys(authorsContent);
  const authorIds = new Set(authorKeys.map((k) => authorsContent[k].id));
  const authorSlugs = new Set(authorKeys.map((k) => authorsContent[k].slug));

  const proofKeys = Object.keys(proofContent);
  const proofSlugs = new Set(proofKeys.map((k) => proofContent[k].slug));

  const testimonialKeys = Object.keys(testimonialsContent);
  const testimonialSlugs = new Set(testimonialKeys.map((k) => testimonialsContent[k].slug));

  const faqSlugs = new Set(faqsContent.map((f) => f.slug));

  const seoTitles = new Map<string, { entity: string; slug: string }>();

  // 1. HELPER: IDENTITY VALIDATION
  const checkIdentity = (
    entity: string,
    id: string | undefined,
    slug: string | undefined,
    entitySlugsSet: Set<string>,
    seenIds: Set<string>,
    seenSlugs: Set<string>,
    requireMatchingIdSlug = false
  ) => {
    if (!id || id.trim() === "") {
      issues.push({
        entity,
        slug: slug || "unknown",
        field: "id",
        errorCode: "MISSING_ID",
        message: "Entity id is missing or empty.",
      });
    } else if (seenIds.has(id)) {
      issues.push({
        entity,
        slug: slug || id,
        field: "id",
        errorCode: "DUPLICATE_ID",
        message: `Duplicate entity id detected: "${id}".`,
      });
    } else {
      seenIds.add(id);
    }

    if (!slug || slug.trim() === "") {
      issues.push({
        entity,
        slug: id || "unknown",
        field: "slug",
        errorCode: "MISSING_SLUG",
        message: "Entity slug is missing or empty.",
      });
    } else {
      if (!SLUG_REGEX.test(slug)) {
        issues.push({
          entity,
          slug,
          field: "slug",
          errorCode: "MALFORMED_SLUG",
          message: `Slug "${slug}" does not match standard slug pattern.`,
        });
      }
      if (seenSlugs.has(slug)) {
        issues.push({
          entity,
          slug,
          field: "slug",
          errorCode: "DUPLICATE_SLUG",
          message: `Duplicate entity slug detected: "${slug}".`,
        });
      } else {
        seenSlugs.add(slug);
      }
    }

    if (requireMatchingIdSlug && id && slug && id !== slug) {
      issues.push({
        entity,
        slug,
        field: "id/slug",
        errorCode: "INCONSISTENT_ID_SLUG",
        message: `Entity id "${id}" does not match slug "${slug}".`,
      });
    }
  };

  // 2. HELPER: SEO VALIDATION
  const checkSEO = (entity: string, slug: string, seo?: SEOData) => {
    if (!seo) {
      issues.push({
        entity,
        slug,
        field: "seo",
        errorCode: "MISSING_SEO",
        message: "Missing SEO metadata object.",
      });
      return;
    }
    if (!seo.title || seo.title.trim() === "") {
      issues.push({
        entity,
        slug,
        field: "seo.title",
        errorCode: "EMPTY_SEO_TITLE",
        message: "SEO title is missing or empty.",
      });
    } else {
      const normalizedTitle = seo.title.trim().toLowerCase();
      if (seoTitles.has(normalizedTitle)) {
        const existing = seoTitles.get(normalizedTitle)!;
        issues.push({
          entity,
          slug,
          field: "seo.title",
          errorCode: "DUPLICATE_SEO_TITLE",
          message: `SEO title duplicates existing title in ${existing.entity}:${existing.slug}.`,
        });
      } else {
        seoTitles.set(normalizedTitle, { entity, slug });
      }
    }

    if (!seo.description || seo.description.trim() === "") {
      issues.push({
        entity,
        slug,
        field: "seo.description",
        errorCode: "EMPTY_SEO_DESCRIPTION",
        message: "SEO description is missing or empty.",
      });
    }

    if (seo.keywords) {
      seo.keywords.forEach((kw, idx) => {
        if (!kw || kw.trim() === "") {
          issues.push({
            entity,
            slug,
            field: `seo.keywords[${idx}]`,
            errorCode: "INVALID_SEO_KEYWORD",
            message: "SEO keyword cannot be empty.",
          });
        }
      });
    }
  };

  // 3. HELPER: MEDIA VALIDATION
  const checkMedia = (entity: string, slug: string, fieldName: string, media?: MediaRef) => {
    if (!media) return;
    if (!media.src || media.src.trim() === "") {
      issues.push({
        entity,
        slug,
        field: `${fieldName}.src`,
        errorCode: "EMPTY_MEDIA_SOURCE",
        message: `Media element "${fieldName}" has empty src.`,
      });
      return;
    }

    if (!media.isDecorative && (!media.alt || media.alt.trim() === "")) {
      issues.push({
        entity,
        slug,
        field: `${fieldName}.alt`,
        errorCode: "MISSING_MEDIA_ALT",
        message: `Non-decorative media "${fieldName}" is missing alt text.`,
      });
    }

    // Static local asset checking when running in Node
    if (typeof window === "undefined" && media.src.startsWith("/") && !media.src.startsWith("//")) {
      const publicPath = path.join(process.cwd(), "public", media.src);
      if (!fs.existsSync(publicPath)) {
        issues.push({
          entity,
          slug,
          field: `${fieldName}.src`,
          errorCode: "MISSING_MEDIA_ASSET",
          message: `Referenced local media asset file does not exist: "${media.src}".`,
        });
      }
    }
  };

  // 4. HELPER: CTA VALIDATION
  const validateInternalRoute = (
    entity: string,
    slug: string,
    field: string,
    href: string
  ) => {
    // Strip hash or query params if present
    const cleanPath = href.split("?")[0].split("#")[0];
    if (STATIC_ROUTES.has(cleanPath)) return;

    const parts = cleanPath.split("/").filter(Boolean);
    if (parts.length === 2) {
      const [section, itemSlug] = parts;
      if (section === "solutions" && solutionSlugs.has(itemSlug)) return;
      if (section === "industries" && industrySlugs.has(itemSlug)) return;
      if (section === "work" && workSlugs.has(itemSlug)) return;
      if (section === "products" && productSlugs.has(itemSlug)) return;
      if (section === "insights" && insightSlugs.has(itemSlug)) return;
      if (section === "services" && SERVICE_SLUGS.has(itemSlug)) return;
    }

    issues.push({
      entity,
      slug,
      field,
      errorCode: "INVALID_CTA_ROUTE",
      message: `CTA internal href "${href}" does not match any valid route or entity slug.`,
    });
  };

  const checkCTA = (entity: string, slug: string, fieldName: string, cta?: CTARef) => {
    if (!cta) {
      issues.push({
        entity,
        slug,
        field: fieldName,
        errorCode: "MISSING_CTA",
        message: `CTA "${fieldName}" is missing.`,
      });
      return;
    }

    if (!cta.label || cta.label.trim() === "") {
      issues.push({
        entity,
        slug,
        field: `${fieldName}.label`,
        errorCode: "EMPTY_CTA_LABEL",
        message: `CTA "${fieldName}" label is missing or empty.`,
      });
    }

    if (!cta.href || cta.href.trim() === "") {
      issues.push({
        entity,
        slug,
        field: `${fieldName}.href`,
        errorCode: "EMPTY_CTA_HREF",
        message: `CTA "${fieldName}" href is missing or empty.`,
      });
      return;
    }

    const href = cta.href.trim();

    if (
      cta.variant &&
      !["primary", "secondary", "tertiary", "phone", "whatsapp"].includes(cta.variant)
    ) {
      issues.push({
        entity,
        slug,
        field: `${fieldName}.variant`,
        errorCode: "INVALID_CTA_VARIANT",
        message: `CTA "${fieldName}" has invalid variant: "${cta.variant}".`,
      });
    }

    if (href.startsWith("/")) {
      validateInternalRoute(entity, slug, `${fieldName}.href`, href);
    } else if (
      !href.startsWith("http://") &&
      !href.startsWith("https://") &&
      !href.startsWith("mailto:") &&
      !href.startsWith("tel:") &&
      !href.startsWith("#")
    ) {
      issues.push({
        entity,
        slug,
        field: `${fieldName}.href`,
        errorCode: "INVALID_CTA_HREF",
        message: `CTA "${fieldName}" href "${href}" is not a valid URL or internal path.`,
      });
    }
  };

  // ----------------------------------------------------
  // ENTITY-BY-ENTITY VALIDATION PIPELINE
  // ----------------------------------------------------

  // 1. VALIDATE BRAND CONTENT
  if (!brandContent.name || brandContent.name.trim() === "") {
    issues.push({
      entity: "brand",
      slug: "brand",
      field: "name",
      errorCode: "MISSING_BRAND_NAME",
      message: "Brand name is missing.",
    });
  }

  // 2. VALIDATE SOLUTIONS
  const seenSolutionIds = new Set<string>();
  const seenSolutionSlugs = new Set<string>();

  Object.values(solutionsContent).forEach((sol) => {
    checkIdentity("solution", sol.id, sol.slug, solutionSlugs, seenSolutionIds, seenSolutionSlugs, true);
    checkSEO("solution", sol.slug, sol.seo);
    checkCTA("solution", sol.slug, "cta", sol.cta);

    sol.relatedIndustrySlugs?.forEach((indSlug) => {
      if (!industrySlugs.has(indSlug)) {
        issues.push({
          entity: "solution",
          slug: sol.slug,
          field: "relatedIndustrySlugs",
          errorCode: "INVALID_REFERENCE",
          message: `Referenced industry "${indSlug}" does not exist.`,
        });
      }
    });

    sol.relatedWorkSlugs?.forEach((wSlug) => {
      if (!workSlugs.has(wSlug)) {
        issues.push({
          entity: "solution",
          slug: sol.slug,
          field: "relatedWorkSlugs",
          errorCode: "INVALID_REFERENCE",
          message: `Referenced work "${wSlug}" does not exist.`,
        });
      }
    });

    sol.relatedProductSlugs?.forEach((pSlug) => {
      if (!productSlugs.has(pSlug)) {
        issues.push({
          entity: "solution",
          slug: sol.slug,
          field: "relatedProductSlugs",
          errorCode: "INVALID_REFERENCE",
          message: `Referenced product "${pSlug}" does not exist.`,
        });
      }
    });

    sol.relatedInsightSlugs?.forEach((insSlug) => {
      if (!insightSlugs.has(insSlug)) {
        issues.push({
          entity: "solution",
          slug: sol.slug,
          field: "relatedInsightSlugs",
          errorCode: "INVALID_REFERENCE",
          message: `Referenced insight "${insSlug}" does not exist.`,
        });
      }
    });
  });

  // 3. VALIDATE INDUSTRIES
  const seenIndustryIds = new Set<string>();
  const seenIndustrySlugs = new Set<string>();

  Object.values(industriesContent).forEach((ind) => {
    checkIdentity("industry", ind.id, ind.slug, industrySlugs, seenIndustryIds, seenIndustrySlugs, true);
    checkSEO("industry", ind.slug, ind.seo);
    checkCTA("industry", ind.slug, "cta", ind.cta);

    ind.relevantSolutionSlugs?.forEach((solSlug) => {
      if (!solutionSlugs.has(solSlug)) {
        issues.push({
          entity: "industry",
          slug: ind.slug,
          field: "relevantSolutionSlugs",
          errorCode: "INVALID_REFERENCE",
          message: `Referenced solution "${solSlug}" does not exist.`,
        });
      }
    });

    ind.relatedWorkSlugs?.forEach((wSlug) => {
      if (!workSlugs.has(wSlug)) {
        issues.push({
          entity: "industry",
          slug: ind.slug,
          field: "relatedWorkSlugs",
          errorCode: "INVALID_REFERENCE",
          message: `Referenced work "${wSlug}" does not exist.`,
        });
      }
    });

    ind.relatedProductSlugs?.forEach((pSlug) => {
      if (!productSlugs.has(pSlug)) {
        issues.push({
          entity: "industry",
          slug: ind.slug,
          field: "relatedProductSlugs",
          errorCode: "INVALID_REFERENCE",
          message: `Referenced product "${pSlug}" does not exist.`,
        });
      }
    });

    ind.relatedInsightSlugs?.forEach((insSlug) => {
      if (!insightSlugs.has(insSlug)) {
        issues.push({
          entity: "industry",
          slug: ind.slug,
          field: "relatedInsightSlugs",
          errorCode: "INVALID_REFERENCE",
          message: `Referenced insight "${insSlug}" does not exist.`,
        });
      }
    });
  });

  // 4. VALIDATE WORK / CASE STUDIES
  const seenWorkIds = new Set<string>();
  const seenWorkSlugs = new Set<string>();

  Object.values(workContent).forEach((work) => {
    checkIdentity("work", work.id, work.slug, workSlugs, seenWorkIds, seenWorkSlugs, true);
    checkSEO("work", work.slug, work.seo);
    checkMedia("work", work.slug, "heroImage", work.heroImage);

    work.solutionsInvolved?.forEach((solId) => {
      if (!solutionIds.has(solId) && !solutionSlugs.has(solId)) {
        issues.push({
          entity: "work",
          slug: work.slug,
          field: "solutionsInvolved",
          errorCode: "INVALID_REFERENCE",
          message: `Referenced solution "${solId}" does not exist.`,
        });
      }
    });

    if (work.relatedIndustrySlug && !industrySlugs.has(work.relatedIndustrySlug)) {
      issues.push({
        entity: "work",
        slug: work.slug,
        field: "relatedIndustrySlug",
        errorCode: "INVALID_REFERENCE",
        message: `Referenced industry "${work.relatedIndustrySlug}" does not exist.`,
      });
    }

    work.relatedInsightSlugs?.forEach((insSlug) => {
      if (!insightSlugs.has(insSlug)) {
        issues.push({
          entity: "work",
          slug: work.slug,
          field: "relatedInsightSlugs",
          errorCode: "INVALID_REFERENCE",
          message: `Referenced insight "${insSlug}" does not exist.`,
        });
      }
    });
  });

  // 5. VALIDATE PRODUCTS
  const seenProductIds = new Set<string>();
  const seenProductSlugs = new Set<string>();

  Object.values(productsContent).forEach((prod) => {
    checkIdentity("product", prod.id, prod.slug, productSlugs, seenProductIds, seenProductSlugs, true);
    checkSEO("product", prod.slug, prod.seo);

    if (prod.cta) {
      if (!prod.cta.primaryText || prod.cta.primaryText.trim() === "") {
        issues.push({
          entity: "product",
          slug: prod.slug,
          field: "cta.primaryText",
          errorCode: "EMPTY_CTA_LABEL",
          message: "Product primary CTA text is missing or empty.",
        });
      }
      if (!prod.cta.demoUrl || prod.cta.demoUrl.trim() === "") {
        issues.push({
          entity: "product",
          slug: prod.slug,
          field: "cta.demoUrl",
          errorCode: "EMPTY_CTA_HREF",
          message: "Product demo URL is missing or empty.",
        });
      } else if (prod.cta.demoUrl.startsWith("/")) {
        validateInternalRoute("product", prod.slug, "cta.demoUrl", prod.cta.demoUrl);
      } else if (
        !prod.cta.demoUrl.startsWith("http://") &&
        !prod.cta.demoUrl.startsWith("https://")
      ) {
        issues.push({
          entity: "product",
          slug: prod.slug,
          field: "cta.demoUrl",
          errorCode: "INVALID_CTA_HREF",
          message: `Product demoUrl "${prod.cta.demoUrl}" is not a valid URL.`,
        });
      }
    } else {
      issues.push({
        entity: "product",
        slug: prod.slug,
        field: "cta",
        errorCode: "MISSING_CTA",
        message: "Product CTA is missing.",
      });
    }

    prod.relatedIndustrySlugs?.forEach((indSlug) => {
      if (!industrySlugs.has(indSlug)) {
        issues.push({
          entity: "product",
          slug: prod.slug,
          field: "relatedIndustrySlugs",
          errorCode: "INVALID_REFERENCE",
          message: `Referenced industry "${indSlug}" does not exist.`,
        });
      }
    });

    prod.relatedSolutionSlugs?.forEach((solSlug) => {
      if (!solutionSlugs.has(solSlug)) {
        issues.push({
          entity: "product",
          slug: prod.slug,
          field: "relatedSolutionSlugs",
          errorCode: "INVALID_REFERENCE",
          message: `Referenced solution "${solSlug}" does not exist.`,
        });
      }
    });

    prod.relatedWorkSlugs?.forEach((wSlug) => {
      if (!workSlugs.has(wSlug)) {
        issues.push({
          entity: "product",
          slug: prod.slug,
          field: "relatedWorkSlugs",
          errorCode: "INVALID_REFERENCE",
          message: `Referenced work "${wSlug}" does not exist.`,
        });
      }
    });
  });

  // 6. VALIDATE INSIGHTS
  const seenInsightIds = new Set<string>();
  const seenInsightSlugs = new Set<string>();

  Object.values(insightsContent).forEach((insight) => {
    checkIdentity("insight", insight.id, insight.slug, insightSlugs, seenInsightIds, seenInsightSlugs, true);
    checkSEO("insight", insight.slug, insight.seo);
    checkMedia("insight", insight.slug, "featuredImage", insight.featuredImage);

    if (insight.authorId) {
      if (!authorIds.has(insight.authorId) && !authorSlugs.has(insight.authorId)) {
        issues.push({
          entity: "insight",
          slug: insight.slug,
          field: "authorId",
          errorCode: "INVALID_AUTHOR_REFERENCE",
          message: `Referenced author "${insight.authorId}" does not exist.`,
        });
      }
    }

    insight.relatedSolutionSlugs?.forEach((solSlug) => {
      if (!solutionSlugs.has(solSlug)) {
        issues.push({
          entity: "insight",
          slug: insight.slug,
          field: "relatedSolutionSlugs",
          errorCode: "INVALID_REFERENCE",
          message: `Referenced solution "${solSlug}" does not exist.`,
        });
      }
    });

    insight.relatedIndustrySlugs?.forEach((indSlug) => {
      if (!industrySlugs.has(indSlug)) {
        issues.push({
          entity: "insight",
          slug: insight.slug,
          field: "relatedIndustrySlugs",
          errorCode: "INVALID_REFERENCE",
          message: `Referenced industry "${indSlug}" does not exist.`,
        });
      }
    });

    insight.relatedWorkSlugs?.forEach((wSlug) => {
      if (!workSlugs.has(wSlug)) {
        issues.push({
          entity: "insight",
          slug: insight.slug,
          field: "relatedWorkSlugs",
          errorCode: "INVALID_REFERENCE",
          message: `Referenced work "${wSlug}" does not exist.`,
        });
      }
    });

    insight.relatedProductSlugs?.forEach((pSlug) => {
      if (!productSlugs.has(pSlug)) {
        issues.push({
          entity: "insight",
          slug: insight.slug,
          field: "relatedProductSlugs",
          errorCode: "INVALID_REFERENCE",
          message: `Referenced product "${pSlug}" does not exist.`,
        });
      }
    });
  });

  // 7. VALIDATE AUTHORS
  const seenAuthorIds = new Set<string>();
  const seenAuthorSlugs = new Set<string>();

  Object.values(authorsContent).forEach((author) => {
    checkIdentity("author", author.id, author.slug, authorSlugs, seenAuthorIds, seenAuthorSlugs, true);
    checkMedia("author", author.slug, "photo", author.photo);

    if (!author.name || author.name.trim() === "") {
      issues.push({
        entity: "author",
        slug: author.slug,
        field: "name",
        errorCode: "MISSING_AUTHOR_FIELD",
        message: "Author name is missing or empty.",
      });
    }
    if (!author.role || author.role.trim() === "") {
      issues.push({
        entity: "author",
        slug: author.slug,
        field: "role",
        errorCode: "MISSING_AUTHOR_FIELD",
        message: "Author role is missing or empty.",
      });
    }
    if (!author.bio || author.bio.trim() === "") {
      issues.push({
        entity: "author",
        slug: author.slug,
        field: "bio",
        errorCode: "MISSING_AUTHOR_FIELD",
        message: "Author bio is missing or empty.",
      });
    }
  });

  // 8. VALIDATE PROOF ITEMS
  const seenProofIds = new Set<string>();
  const seenProofSlugs = new Set<string>();

  Object.values(proofContent).forEach((proof) => {
    checkIdentity("proof", proof.id, proof.slug, proofSlugs, seenProofIds, seenProofSlugs, true);

    if (!proof.claim || proof.claim.trim() === "") {
      issues.push({
        entity: "proof",
        slug: proof.slug,
        field: "claim",
        errorCode: "MISSING_CLAIM",
        message: "Proof claim property is missing or empty.",
      });
    }

    if (!proof.evidence || proof.evidence.trim() === "") {
      issues.push({
        entity: "proof",
        slug: proof.slug,
        field: "evidence",
        errorCode: "MISSING_EVIDENCE",
        message: "Proof evidence property is missing or empty.",
      });
    }

    if (!proof.verified) {
      issues.push({
        entity: "proof",
        slug: proof.slug,
        field: "verified",
        errorCode: "UNVERIFIED_PROOF",
        message: "Unverified proof item detected in registry.",
      });
    }

    if (proof.relatedWorkSlug && !workSlugs.has(proof.relatedWorkSlug)) {
      issues.push({
        entity: "proof",
        slug: proof.slug,
        field: "relatedWorkSlug",
        errorCode: "INVALID_REFERENCE",
        message: `Referenced work "${proof.relatedWorkSlug}" does not exist.`,
      });
    }

    if (proof.relatedSolutionSlug && !solutionSlugs.has(proof.relatedSolutionSlug)) {
      issues.push({
        entity: "proof",
        slug: proof.slug,
        field: "relatedSolutionSlug",
        errorCode: "INVALID_REFERENCE",
        message: `Referenced solution "${proof.relatedSolutionSlug}" does not exist.`,
      });
    }

    if (proof.relatedIndustrySlug && !industrySlugs.has(proof.relatedIndustrySlug)) {
      issues.push({
        entity: "proof",
        slug: proof.slug,
        field: "relatedIndustrySlug",
        errorCode: "INVALID_REFERENCE",
        message: `Referenced industry "${proof.relatedIndustrySlug}" does not exist.`,
      });
    }
  });

  // 9. VALIDATE TESTIMONIALS
  const seenTestimonialIds = new Set<string>();
  const seenTestimonialSlugs = new Set<string>();

  Object.values(testimonialsContent).forEach((t) => {
    checkIdentity("testimonial", t.id, t.slug, testimonialSlugs, seenTestimonialIds, seenTestimonialSlugs, true);
    checkMedia("testimonial", t.slug, "image", t.image);

    if (!t.quote || t.quote.trim() === "") {
      issues.push({
        entity: "testimonial",
        slug: t.slug,
        field: "quote",
        errorCode: "MISSING_TESTIMONIAL_FIELD",
        message: "Testimonial quote is missing or empty.",
      });
    }

    if (!t.person || t.person.trim() === "") {
      issues.push({
        entity: "testimonial",
        slug: t.slug,
        field: "person",
        errorCode: "MISSING_TESTIMONIAL_FIELD",
        message: "Testimonial person name is missing or empty.",
      });
    }

    if (!t.organisation || t.organisation.trim() === "") {
      issues.push({
        entity: "testimonial",
        slug: t.slug,
        field: "organisation",
        errorCode: "MISSING_TESTIMONIAL_FIELD",
        message: "Testimonial organisation is missing or empty.",
      });
    }

    if (!t.verified) {
      issues.push({
        entity: "testimonial",
        slug: t.slug,
        field: "verified",
        errorCode: "UNVERIFIED_TESTIMONIAL",
        message: "Unverified testimonial found in registry.",
      });
    }

    if (t.relatedWorkSlug && !workSlugs.has(t.relatedWorkSlug)) {
      issues.push({
        entity: "testimonial",
        slug: t.slug,
        field: "relatedWorkSlug",
        errorCode: "INVALID_REFERENCE",
        message: `Referenced work "${t.relatedWorkSlug}" does not exist.`,
      });
    }
  });

  // 10. VALIDATE FAQS
  const seenFaqIds = new Set<string>();
  const seenFaqSlugs = new Set<string>();

  faqsContent.forEach((faq) => {
    checkIdentity("faq", faq.id, faq.slug, faqSlugs, seenFaqIds, seenFaqSlugs, true);

    if (!faq.question || faq.question.trim() === "") {
      issues.push({
        entity: "faq",
        slug: faq.slug,
        field: "question",
        errorCode: "MISSING_FAQ_QUESTION",
        message: "FAQ question is missing or empty.",
      });
    }

    if (!faq.answer || faq.answer.trim() === "") {
      issues.push({
        entity: "faq",
        slug: faq.slug,
        field: "answer",
        errorCode: "MISSING_FAQ_ANSWER",
        message: "FAQ answer is missing or empty.",
      });
    }

    if (faq.relatedSolutionSlug && !solutionSlugs.has(faq.relatedSolutionSlug)) {
      issues.push({
        entity: "faq",
        slug: faq.slug,
        field: "relatedSolutionSlug",
        errorCode: "INVALID_REFERENCE",
        message: `Referenced solution "${faq.relatedSolutionSlug}" does not exist.`,
      });
    }

    if (faq.relatedIndustrySlug && !industrySlugs.has(faq.relatedIndustrySlug)) {
      issues.push({
        entity: "faq",
        slug: faq.slug,
        field: "relatedIndustrySlug",
        errorCode: "INVALID_REFERENCE",
        message: `Referenced industry "${faq.relatedIndustrySlug}" does not exist.`,
      });
    }

    if (faq.relatedProductSlug && !productSlugs.has(faq.relatedProductSlug)) {
      issues.push({
        entity: "faq",
        slug: faq.slug,
        field: "relatedProductSlug",
        errorCode: "INVALID_REFERENCE",
        message: `Referenced product "${faq.relatedProductSlug}" does not exist.`,
      });
    }
  });

  // 11. VALIDATE GLOBAL CONTENT CTAS
  if (globalContent.commonCTAs) {
    Object.entries(globalContent.commonCTAs).forEach(([key, cta]) => {
      checkCTA("global", "commonCTAs", `commonCTAs.${key}`, cta);
    });
  }

  return issues;
}
