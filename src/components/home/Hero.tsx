import { CheckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import CallButton from "@/components/common/CallButton";
import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { CATEGORY_META } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/types/product";

const HIGHLIGHTS = ["Tested & cleaned", "Warranty on most items", "Local delivery"];

// Staggered offsets give the image strip some depth.
const IMAGE_OFFSETS = ["", "mt-6", "mt-12"];

const Hero = () => {
  return (
    <section className="border-b bg-gradient-to-b from-primary/5 to-background">
      <Container className="grid items-center gap-10 py-14 md:grid-cols-2 md:py-20">
        <div className="space-y-6">
          <p className="text-sm font-semibold text-primary">
            Second-hand appliances · {siteConfig.serviceArea}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Quality used washers, fridges &amp; dryers for less
          </h1>
          <p className="text-lg text-muted-foreground">
            Every appliance is inspected, cleaned and tested before it goes on sale. See something
            you like? Just give us a call.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 px-6 text-base">
              <Link href="/products">Browse appliances</Link>
            </Button>
            <CallButton
              label="Call us"
              showNumber
              variant="outline"
              className="h-12 px-6 text-base"
            />
          </div>

          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {HIGHLIGHTS.map((highlight) => (
              <li key={highlight} className="flex items-center gap-1.5">
                <CheckIcon className="size-4 text-primary" aria-hidden="true" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-3 gap-3" aria-hidden="true">
          {CATEGORIES.map((category, index) => (
            <div
              key={category}
              className={cn(
                "relative aspect-[3/4] overflow-hidden rounded-2xl border bg-muted shadow-sm",
                IMAGE_OFFSETS[index],
              )}
            >
              <Image src={CATEGORY_META[category].image} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Hero;
