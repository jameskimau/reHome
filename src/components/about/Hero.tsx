import { ArrowRightIcon, ShieldCheckIcon, SparklesIcon, TruckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import CallButton from "@/components/common/CallButton";
import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import { SHOP_SECTION_ID, getCategoryHref } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { CATEGORY_META } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { getProducts } from "@/lib/products";
import { cn } from "@/lib/utils";
import { CATEGORIES, type Category, type Product } from "@/types/product";

const HIGHLIGHTS = [
  { icon: ShieldCheckIcon, label: "Tested before sale" },
  { icon: SparklesIcon, label: "Deep cleaned" },
  { icon: TruckIcon, label: "Local delivery" },
];

// Staggered offsets and tilts make the tiles feel stacked rather than gridded.
const TILE_STYLES = ["md:-rotate-3", "md:mt-10 md:rotate-2", "md:-rotate-1"];

function getLowestPrice(products: Product[], category: Category): number | undefined {
  const prices = products
    .filter((product) => product.category === category)
    .map((product) => product.price);
  return prices.length > 0 ? Math.min(...prices) : undefined;
}

const Hero = async () => {
  const products = await getProducts();

  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-24 size-96 rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-20 size-96 rounded-full bg-emerald-300/20 blur-3xl"
      />

      <Container className="relative grid items-center gap-10 py-12 md:grid-cols-[1.15fr_1fr] md:py-20">
        <div className="space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-medium">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-300" />
            </span>
            {products.length} appliances in stock · {siteConfig.serviceArea}
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Quality used appliances,{" "}
            <span className="text-emerald-200">without the new price tag.</span>
          </h1>

          <p className="max-w-xl text-lg text-primary-foreground/80">
            Washers, fridges and dryers — inspected, cleaned and tested before they go on sale.
            Found one you like? Just call.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 bg-white px-6 text-base text-primary hover:bg-white/90"
            >
              <Link href={`/#${SHOP_SECTION_ID}`}>
                Shop now
                <ArrowRightIcon aria-hidden="true" />
              </Link>
            </Button>
            <CallButton
              label="Call us"
              showNumber
              variant="outline"
              className="h-12 border-white/40 bg-transparent px-6 text-base text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
            />
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-primary-foreground/80">
            {HIGHLIGHTS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-1.5">
                <Icon className="size-4 text-emerald-200" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <ul className="grid grid-cols-3 gap-3 md:gap-4">
          {CATEGORIES.map((category, index) => {
            const meta = CATEGORY_META[category];
            const lowestPrice = getLowestPrice(products, category);

            return (
              <li key={category} className={cn("transition-transform", TILE_STYLES[index])}>
                <Link
                  href={getCategoryHref(meta.slug)}
                  className="group block overflow-hidden rounded-2xl bg-card text-card-foreground shadow-xl ring-1 ring-black/5 transition-transform hover:-translate-y-1"
                >
                  <div className="relative aspect-[3/4] bg-muted">
                    <Image src={meta.image} alt="" fill className="object-cover" />
                    {lowestPrice !== undefined && (
                      <span className="absolute top-2 right-2 rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                        From {formatPrice(lowestPrice)}
                      </span>
                    )}
                  </div>
                  <p className="px-3 py-2.5 text-center text-sm font-semibold group-hover:text-primary">
                    {meta.pluralLabel}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
};

export default Hero;
