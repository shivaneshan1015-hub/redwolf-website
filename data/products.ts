import { getProductBySlug } from "@/lib/cms";
import { ProductContent } from "@/types/content";

export type ProductItem = ProductContent;

export const productsData: Record<string, ProductItem> = {
  easytrack: getProductBySlug("easytrack")!,
};
