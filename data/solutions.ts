import { solutionsContent } from "@/content/solutions/solutions";
import { SolutionContent } from "@/types/content";

export type CapabilityItem = SolutionContent;

export const solutionsData: Record<string, CapabilityItem> = solutionsContent;
