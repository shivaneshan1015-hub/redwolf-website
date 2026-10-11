import {
  getBrandContent,
  getSolutions,
  getIndustries,
  getCaseStudies,
  getProducts,
  getInsights,
  getProofItems,
  getAuthors,
  getTestimonials,
  getFAQs,
  getGlobalContent,
} from "../lib/cms/index";
import { validateContentRegistry } from "../lib/cms/validation";

function runValidation() {
  console.log("\nM12 Content Validation\n");

  const brand = getBrandContent();
  const solutions = getSolutions();
  const industries = getIndustries();
  const work = getCaseStudies();
  const products = getProducts();
  const insights = getInsights();
  const proof = getProofItems();
  const authors = getAuthors();
  const testimonials = getTestimonials();
  const faqs = getFAQs();
  const global = getGlobalContent();

  const issues = validateContentRegistry();

  if (issues.length > 0) {
    console.error("M12 CONTENT VALIDATION FAILED\n");
    console.error(`✗ ${issues.length} validation issue(s) detected:`);
    issues.forEach((issue) => {
      const fieldInfo = issue.field ? ` (${issue.field}: ${issue.errorCode})` : ` (${issue.errorCode})`;
      console.error(`  - [${issue.entity}:${issue.slug}]${fieldInfo} ${issue.message}`);
    });
    console.error("\nPlease correct the content validation issues listed above.\n");
    process.exit(1);
  }

  console.log(`✓ Brand: ${brand.name}`);
  console.log(`✓ Solutions: ${solutions.length}`);
  console.log(`✓ Industries: ${industries.length}`);
  console.log(`✓ Work: ${work.length}`);
  console.log(`✓ Products: ${products.length}`);
  console.log(`✓ Insights: ${insights.length}`);
  console.log(`✓ Proof: ${proof.length}`);
  console.log(`✓ Authors: ${authors.length}`);
  console.log(`✓ FAQs: ${faqs.length}`);
  console.log(`✓ Global content: ${global.siteName}\n`);

  console.log("✓ IDs & Slugs");
  console.log("✓ Relationships");
  console.log("✓ SEO");
  console.log("✓ Media");
  console.log("✓ CTAs\n");

  console.log("CONTENT VALIDATION PASSED\n");
  console.log(`✓ Work / Case Studies: ${work.length}`);
  console.log(`✓ Products: ${products.length}`);
  console.log(`✓ Insights: ${insights.length}`);
  console.log(`✓ Proof Items: ${proof.length}`);
  console.log(`✓ Authors: ${authors.length}`);
  console.log(`✓ Testimonials: ${testimonials.length}`);
  console.log(`✓ FAQs: ${faqs.length}`);
  console.log(`✓ Global Content: ${global.siteName}\n`);

  console.log("✓ Identity");
  console.log("✓ Schema");
  console.log("✓ Relationships");
  console.log("✓ SEO");
  console.log("✓ Media");
  console.log("✓ CTAs");
  console.log("✓ Authors");
  console.log("✓ Proof");
  console.log("✓ Testimonials");
  console.log("✓ FAQs\n");

  console.log("No validation errors found.");
  console.log("M12 CONTENT VALIDATION PASSED\n");
  process.exit(0);
}

runValidation();
