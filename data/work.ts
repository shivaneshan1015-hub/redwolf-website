import { workContent } from "@/content/work/work";
import { CaseStudyContent } from "@/types/content";

export type WorkItem = CaseStudyContent;

export const workData: Record<string, WorkItem> = workContent;
