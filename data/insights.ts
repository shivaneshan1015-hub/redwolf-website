import { getInsightBySlug } from "@/lib/cms";
import { InsightContent } from "@/types/content";

export type InsightItem = InsightContent;

export const insightsData: Record<string, InsightItem> = {
  "how-to-rank-on-chatgpt-perplexity-gemini-geo-guide": getInsightBySlug("how-to-rank-on-chatgpt-perplexity-gemini-geo-guide")!,
  "scaling-meta-google-ads-cpa-reduction-funnel-guide": getInsightBySlug("scaling-meta-google-ads-cpa-reduction-funnel-guide")!,
  "local-seo-google-maps-pack-ranking-strategy": getInsightBySlug("local-seo-google-maps-pack-ranking-strategy")!,
};
