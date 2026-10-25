import type { MetadataRoute } from "next";

import { fetchProducts } from "@/actions/visitors/application/fetch-products";
import { siteConfig } from "@/config/site";
import { filterProducts } from "@/lib/product-filter";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const { data } = await fetchProducts();
  const products = filterProducts(data ?? []);

  const staticRoutes = ["", "/about"].map((path) => ({
    url: `${siteConfig.url}${path}`,
  }));
  const productRoutes = products.map((product) => ({
    url: `${siteConfig.url}/products/${product.slug}`,
    lastModified: product.updatedAt,
  }));

  return [...staticRoutes, ...productRoutes];
};

export default sitemap;
