import "server-only";

import type { AdminProductRepo } from "@/actions/admin/domain/product.repo";
import type {
  AdminProductDetailResponse,
  AdminProductListResponse,
} from "@/common/admin/response/product.response";
import { fail, ok } from "@/common/server-response";
import { Prisma, type ProductStatus } from "@/generated/prisma/client";
import { db } from "@/lib/db";
// SELECT FOR LIST
/*
==================================================
Date: 2026-10-26 20:07
Purpose: CLEAN CODE 
Description: CLEAN CODE TO CHOSSE DATA FROM DB
==================================================
*/
const LIST_SELECT = {
  id: true,
  slug: true,
  title: true,
  category: true,
  brand: true,
  price: true,
  compareAtPrice: true,
  status: true,
  isSpecial: true,
  images: true,
  note: true,
  updatedAt: true,
} satisfies Record<keyof AdminProductListResponse, true>;
// SELECT FOR DETAIL
const DETAIL_SELECT = {
  id: true,
  slug: true,
  title: true,
  category: true,
  brand: true,
  model: true,
  price: true,
  compareAtPrice: true,
  condition: true,
  capacity: true,
  widthCm: true,
  heightCm: true,
  depthCm: true,
  energyRating: true,
  warrantyMonths: true,
  images: true,
  description: true,
  status: true,
  isSpecial: true,
  soldAt: true,
  note: true,
  createdAt: true,
  updatedAt: true,
} satisfies Record<keyof AdminProductDetailResponse, true>;

/** Keep the original sale date when a SOLD item is edited; clear it when un-sold. */
function nextSoldAt(status: ProductStatus, previousSoldAt: Date | null = null): Date | null {
  if (status !== "SOLD") return null;
  return previousSoldAt ?? new Date();
}

function prismaErrorCode(error: unknown): string | undefined {
  return error instanceof Prisma.PrismaClientKnownRequestError ? error.code : undefined;
}

function writeFailure(scope: string, error: unknown) {
  const code = prismaErrorCode(error);
  if (code === "P2002") return fail("That slug is already in use");
  if (code === "P2025") return fail("Product not found");
  console.error(`[adminProductRepo.${scope}]`, error);
  return fail("Failed to save product");
}
// SRP - SINGLE RESPONSIBILITY PRINCIPLE
// OOP = OBJECT ORIENTED PROGRAMMING
export const adminProductRepo: AdminProductRepo = {
  async fetchProducts() {
    try {
      const rows = await db.product.findMany({
        select: LIST_SELECT,
        orderBy: { updatedAt: "desc" },
      });
      return ok(rows);
    } catch (error) {
      console.error("[adminProductRepo.fetchProducts]", error);
      return fail("Failed to load products");
    }
  },

  async fetchProductById({ id }) {
    try {
      const row = await db.product.findUnique({ where: { id }, select: DETAIL_SELECT });
      if (!row) return ok(null, "Product not found");
      return ok(row);
    } catch (error) {
      console.error("[adminProductRepo.fetchProductById]", error);
      return fail("Failed to load product");
    }
  },

  async createProduct(payload) {
    try {
      const row = await db.product.create({
        data: { ...payload, soldAt: nextSoldAt(payload.status) },
        select: { slug: true },
      });
      return ok({ slug: row.slug }, "Product created");
    } catch (error) {
      return writeFailure("createProduct", error);
    }
  },

  async updateProduct(id, payload) {
    try {
      const previous = await db.product.findUniqueOrThrow({
        where: { id },
        select: { slug: true, soldAt: true },
      });
      const row = await db.product.update({
        where: { id },
        data: { ...payload, soldAt: nextSoldAt(payload.status, previous.soldAt) },
        select: { slug: true },
      });
      return ok({ slug: row.slug, previousSlug: previous.slug }, "Product saved");
    } catch (error) {
      return writeFailure("updateProduct", error);
    }
  },

  async updateProductStatus({ id, status }) {
    try {
      const previous = await db.product.findUniqueOrThrow({
        where: { id },
        select: { soldAt: true },
      });
      const row = await db.product.update({
        where: { id },
        data: { status, soldAt: nextSoldAt(status, previous.soldAt) },
        select: { slug: true },
      });
      return ok({ slug: row.slug }, "Status updated");
    } catch (error) {
      return writeFailure("updateProductStatus", error);
    }
  },

  async deleteProduct({ id }) {
    try {
      const row = await db.product.delete({ where: { id }, select: { slug: true } });
      return ok({ slug: row.slug }, "Product deleted");
    } catch (error) {
      return writeFailure("deleteProduct", error);
    }
  },
};
