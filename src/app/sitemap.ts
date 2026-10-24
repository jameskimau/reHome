import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getProducts } from "@/lib/products";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const products = await getProducts();

  const staticRoutes = ["", "/about"].map((path) => ({
    url: `${siteConfig.url}${path}`,
  }));
  const productRoutes = products.map((product) => ({
    url: `${siteConfig.url}/products/${product.slug}`,
    lastModified: product.createdAt,
  }));

  return [...staticRoutes, ...productRoutes];
};

export default sitemap;
