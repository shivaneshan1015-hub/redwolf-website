# M12 — Content Architecture & Validation System

This document outlines the architecture, data models, CMS access layer, relationship integrity rules, and automated validation for the **Redwolf Website**.

---

## 1. Structure & Location

- **Content Entities**: Stored in `content/<entity-type>/<entity-type>.ts`
  - `content/brand/brand.ts`
  - `content/solutions/solutions.ts`
  - `content/industries/industries.ts`
  - `content/work/work.ts`
  - `content/products/products.ts`
  - `content/insights/insights.ts`
  - `content/proof/proof.ts`
  - `content/authors/authors.ts`
  - `content/testimonials/testimonials.ts`
  - `content/faqs/faqs.ts`
  - `content/global/global.ts`
- **Content Types**: Defined in `types/content.ts`
- **CMS Access Layer**: Access functions in `lib/cms/index.ts`
- **Validation Engine**: Validator logic in `lib/cms/validation.ts`
- **CLI Validator**: Execution script in `scripts/validate-content.ts`
- **CI Workflow**: GitHub Actions pipeline in `.github/workflows/content-validation.yml`

---

## 2. Content Types (`types/content.ts`)

All content entities are strongly typed interfaces:
- `BrandContent`
- `SolutionContent`
- `IndustryContent`
- `CaseStudyContent`
- `ProductContent`
- `InsightContent`
- `ProofContent`
- `AuthorContent`
- `TestimonialContent`
- `FAQContent`
- `GlobalContent`

Auxiliary models enforce structure for:
- `SEOData` (title, description, canonical, keywords, OG metadata)
- `MediaRef` (src, alt, width, height, caption, isDecorative)
- `CTARef` (label, labelWithArrow, href, variant, external)

---

## 3. CMS Access Layer (`lib/cms/index.ts`)

Application components and Next.js routes consume content **exclusively** through `lib/cms/index.ts`. Direct imports from `content/**` in application code are disallowed.

Standard access patterns:
- **All Entities**: `getSolutions()`, `getIndustries()`, `getCaseStudies()`, `getProducts()`, `getInsights()`, `getProofItems()`, `getAuthors()`, `getTestimonials()`, `getFAQs()`
- **Lookup by Slug**: `getSolutionBySlug(slug)`, `getIndustryBySlug(slug)`, `getCaseStudyBySlug(slug)`, `getProductBySlug(slug)`, `getInsightBySlug(slug)`, `getAuthorBySlug(slug)`, `getProofBySlug(slug)`, `getTestimonialBySlug(slug)`
- **Lookup by ID**: `getSolutionById(id)`, `getIndustryById(id)`, `getCaseStudyById(id)`, `getProductById(id)`, `getInsightById(id)`, `getAuthorById(id)`, `getProofById(id)`, `getTestimonialById(id)`
- **Cross-Entity Relationships**:
  - `getRelatedWorkForSolution(solutionSlug)`
  - `getRelatedWorkForIndustry(industrySlug)`
  - `getRelatedInsightsForSolution(solutionSlug)`
  - `getRelatedInsightsForIndustry(industrySlug)`
  - `getRelatedInsightsForWork(workSlug)`
  - `getRelatedInsightsForProduct(productSlug)`
  - `getRelatedIndustriesForSolution(solutionSlug)`
  - `getRelatedProductsForSolution(solutionSlug)`
  - `getFAQsForSolution(solutionSlug)`
  - `getFAQsForIndustry(industrySlug)`
  - `getFAQsForProduct(productSlug)`

---

## 4. Relationship Integrity Rules

The M12 validation engine verifies all entity relationships statically:
- **Solution** references valid `industrySlugs`, `workSlugs`, `productSlugs`, and `insightSlugs`.
- **Industry** references valid `relevantSolutionSlugs`, `workSlugs`, `productSlugs`, and `insightSlugs`.
- **CaseStudy (Work)** references valid `solutionsInvolved` IDs, `relatedIndustrySlug`, and `insightSlugs`.
- **Product** references valid `industrySlugs`, `solutionSlugs`, and `workSlugs`.
- **Insight** references valid `authorId`, `solutionSlugs`, `industrySlugs`, `workSlugs`, and `productSlugs`.
- **FAQ** references valid `relatedSolutionSlug`, `relatedIndustrySlug`, and `relatedProductSlug`.
- **Proof / Testimonials** reference valid target entity slugs (`relatedWorkSlug`, `relatedSolutionSlug`, `relatedIndustrySlug`).

Dangling references or nonexistent slugs trigger validation failures.

---

## 5. Content Validation Engine

`lib/cms/validation.ts` performs read-only, non-mutating validation across 10 categories:
1. **Identity**: Validates non-empty IDs/slugs, slug regex formatting, uniqueness, and ID/slug consistency.
2. **Schema**: Enforces presence of required entity fields.
3. **Relationships**: Enforces referential integrity across all linked entities.
4. **SEO**: Validates title/description presence and detects duplicate SEO titles.
5. **Media**: Validates alt text for non-decorative media and checks local asset existence in `public/`.
6. **CTAs**: Validates non-empty labels, permitted variants, valid URL syntax, and internal route resolution.
7. **Authors**: Ensures `authorId` resolves to existing author records and author metadata is complete.
8. **Proof**: Verifies claims, evidence, and verification flags.
9. **Testimonials**: Verifies quotes, client details, and verification flags.
10. **FAQs**: Verifies Q&A content and relationship links.

---

## 6. Local Validation

To run the content validator locally:

```bash
npm run content:validate
```

To run the full suite (validation, typecheck, lint, build):

```bash
npm run content:validate
npm run typecheck
npm run lint
npm run build
```

---

## 7. CI Pipeline Validation

GitHub Actions workflow `.github/workflows/content-validation.yml` runs automatically on pushes and pull requests to `main`/`master`:
1. `npm ci`
2. `npm run content:validate`
3. `npm run typecheck`
4. `npm run lint`
5. `npm run build`

Deployment is blocked if any validation check fails.

---

## 8. Safely Adding a New Content Entity

To add a new entity (e.g., a new Case Study or Insight):

1. **Add Data**: Add the entry to the relevant file in `content/<entity-type>/<entity-type>.ts`.
2. **Assign Unique ID & Slug**: Ensure `id` and `slug` match and adhere to lowercase hyphenated format (`my-new-entity`).
3. **Set Required Fields**: Complete title, summary, SEO metadata (`title`, `description`), and media alt text.
4. **Link Relationships**: Reference existing entity slugs (e.g. `relatedIndustrySlugs: ["fmcg-distribution"]`).
5. **Validate**: Run `npm run content:validate` to ensure zero validation errors before committing.
