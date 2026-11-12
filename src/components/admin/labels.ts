import type { Category, Condition, ProductStatus } from "@/generated/prisma/enums";

export const STATUS_LABELS: Record<ProductStatus, string> = {
  AVAILABLE: "판매중",
  RESERVED: "예약중",
  SOLD: "판매완료",
};

export const CATEGORY_LABELS: Record<Category, string> = {
  WASHER: "세탁기",
  FRIDGE: "냉장고",
  DRYER: "건조기",
};

export const CONDITION_LABELS: Record<Condition, string> = {
  LIKE_NEW: "새것 같음",
  GOOD: "좋음",
  FAIR: "보통",
};
