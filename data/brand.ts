import { getBrandContent } from "@/lib/cms";
import { BrandContent } from "@/types/content";

export type BrandInfo = BrandContent;

export const brandData: BrandInfo = getBrandContent();
