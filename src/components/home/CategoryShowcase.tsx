import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { getCategoryHref } from "@/config/navigation";
import { CATEGORY_META } from "@/lib/catalog";
import { CATEGORIES } from "@/types/product";

const CategoryShowcase = () => {
  return (
    <section aria-labelledby="categories-heading" className="py-14">
      <Container className="space-y-8">
        <SectionHeading id="categories-heading" title="Shop by category" />

        <ul className="grid gap-6 sm:grid-cols-3">
          {CATEGORIES.map((category) => {
            const meta = CATEGORY_META[category];
            return (
              <li key={category}>
                <Link
                  href={getCategoryHref(meta.slug)}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] bg-muted">
                    <Image src={meta.image} alt="" fill className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col gap-1 p-5">
                    <h3 className="flex items-center justify-between font-semibold">
                      {meta.pluralLabel}
                      <ArrowRightIcon
                        className="size-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </h3>
                    <p className="text-sm text-muted-foreground">{meta.tagline}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
};

export default CategoryShowcase;
