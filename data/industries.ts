import { getIndustryBySlug } from "@/lib/cms";
import { IndustryContent } from "@/types/content";

export type IndustryItem = IndustryContent;

export const industriesData: Record<string, IndustryItem> = {
  "fmcg-distribution": getIndustryBySlug("fmcg-distribution")!,
  healthcare: getIndustryBySlug("healthcare")!,
  manufacturing: getIndustryBySlug("manufacturing")!,
  "travel-hospitality": getIndustryBySlug("travel-hospitality")!,
  smes: getIndustryBySlug("smes")!,
};
