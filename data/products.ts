import { productsContent } from "@/content/products/products";
import { ProductContent } from "@/types/content";

export type ProductItem = ProductContent;

export const productsData: Record<string, ProductItem> = productsContent;
