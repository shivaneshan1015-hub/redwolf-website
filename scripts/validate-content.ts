import {
  getBrandContent,
  getSolutions,
  getIndustries,
  getCaseStudies,
  getProducts,
  getInsights,
  getProofItems,
  getAuthors,
  getFAQs,
  getGlobalContent,
} from "../lib/cms/index";
import { validateContentRegistry } from "../lib/cms/validation";

function runValidation() {
  console.log("\nRedwolf Content Validation\n");

  const brand = getBrandContent();
  const solutions = getSolutions();
  const industries = getIndustries();
  const work = getCaseStudies();
  const products = getProducts();
  const insights = getInsights();
  const proof = getProofItems();
  const authors = getAuthors();
  const faqs = getFAQs();
  const global = getGlobalContent();

  const issues = validateContentRegistry();

  if (issues.length > 0) {
    console.error("CONTENT VALIDATION FAILED\n");
    console.error("✗ Validation issues detected:");
    issues.forEach((issue) => {
      console.error(`  - [${issue.entity}:${issue.slug}] ${issue.message}`);
    });
    console.error(`\n${issues.length} error(s) found.\n`);
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
  process.exit(0);
}

runValidation();
