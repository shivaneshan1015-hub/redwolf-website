import { getSolutionBySlug } from "@/lib/cms";
import { SolutionContent } from "@/types/content";

export type CapabilityItem = SolutionContent;

export const solutionsData: Record<string, CapabilityItem> = {
  grow: getSolutionBySlug("grow")!,
  define: getSolutionBySlug("define")!,
  build: getSolutionBySlug("build")!,
  productize: getSolutionBySlug("productize")!,
};
