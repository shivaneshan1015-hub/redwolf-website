import { insightsContent } from "@/content/insights/insights";
import { InsightContent } from "@/types/content";

export type InsightItem = InsightContent;

export const insightsData: Record<string, InsightItem> = insightsContent;
