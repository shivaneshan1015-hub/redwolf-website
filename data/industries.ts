import { industriesContent } from "@/content/industries/industries";
import { IndustryContent } from "@/types/content";

export type IndustryItem = IndustryContent;

export const industriesData: Record<string, IndustryContent> = industriesContent;
