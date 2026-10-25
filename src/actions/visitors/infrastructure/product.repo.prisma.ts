import "server-only";

import type { VisitorProductRepo } from "@/actions/visitors/domain/product.repo";
import { fail, ok } from "@/common/server-response";
import type {
  ProductDetailResponse,
  ProductListingResponse,
} from "@/common/visitors/response/product.response";
import { db } from "@/lib/db";

// Column whitelists. `satisfies Record<keyof ..., true>` fails to compile if a key is missing or
// not part of the response type, so admin-only columns like `note` can't slip in.
/*
==================================================
Date: 2026-10-25 16:41
Purpose: INFRA STRUCTURE LAYER
Description: CALL PRISMA REPO TO FETCH DATA FROM DATABASE
==================================================
*/
// LISTING FOR ROUGH DETAILS
const LISTING_SELECT = {
  id: true,
  slug: true,
  title: true,
  category: true,
  brand: true,
  capacity: true,
  price: true,
  compareAtPrice: true,
  status: true,
  isSpecial: true,
  images: true,
  createdAt: true,
  updatedAt: true,
} satisfies Record<keyof ProductListingResponse, true>;

// DETAIL FOR FULL DETAILS
const DETAIL_SELECT = {
  ...LISTING_SELECT,
  model: true,
  condition: true,
  widthCm: true,
  heightCm: true,
  depthCm: true,
  energyRating: true,
  warrantyMonths: true,
  description: true,
  soldAt: true,
} satisfies Record<keyof ProductDetailResponse, true>;

// SRP - SINGLE RESPONSIBILITY PRINCIPLE - THIS REPO IS ONLY FOR VISITORS
// BASED ON REPO CONTRACT IN DOMAIN LAYER
export const visitorProductRepo: VisitorProductRepo = {
  async fetchProducts() {
    try {
      const rows = await db.product.findMany({
        select: LISTING_SELECT,
        orderBy: { createdAt: "desc" },
      });
      return ok(rows);
    } catch (error) {
      console.error("[visitorProductRepo.fetchProducts]", error);
      return fail("Failed to load products");
    }
  },

  async fetchProductDetails({ slug }) {
    try {
      const row = await db.product.findUnique({
        where: { slug },
        select: DETAIL_SELECT,
      });
      if (!row) return ok(null, "Product not found");
      return ok(row);
    } catch (error) {
      console.error("[visitorProductRepo.fetchProductDetails]", error);
      return fail("Failed to load product");
    }
  },
};
