import type { ProductStatus } from "@/generated/prisma/enums";

export const STATUS_LABELS: Record<ProductStatus, string> = {
  AVAILABLE: "Available",
  RESERVED: "Reserved",
  SOLD: "Sold",
};
