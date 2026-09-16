import { getCaseStudyBySlug } from "@/lib/cms";
import { CaseStudyContent } from "@/types/content";

export type WorkItem = CaseStudyContent;

export const workData: Record<string, WorkItem> = {
  "sri-nantha-glasses": getCaseStudyBySlug("sri-nantha-glasses")!,
  "mahalakshmi-tours": getCaseStudyBySlug("mahalakshmi-tours")!,
  "gateway-holidays": getCaseStudyBySlug("gateway-holidays")!,
};
