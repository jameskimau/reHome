import { LeafIcon, ShieldCheckIcon, SparklesIcon, WalletIcon, type LucideIcon } from "lucide-react";

import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { siteConfig } from "@/config/site";

interface Reason {
  icon: LucideIcon;
  title: string;
  description: string;
}

const REASONS: Reason[] = [
  {
    icon: ShieldCheckIcon,
    title: "Tested before sale",
    description: "Every unit is run through a full cycle so you know it works.",
  },
  {
    icon: SparklesIcon,
    title: "Deep cleaned",
    description: "Drums, seals and shelves are cleaned and sanitised.",
  },
  {
    icon: WalletIcon,
    title: "Fair prices",
    description: "Pay a fraction of the price of new, with no hidden fees.",
  },
  {
    icon: LeafIcon,
    title: "Better for the planet",
    description: "Giving appliances a second home keeps them out of landfill.",
  },
];

const WhyUs = () => {
  return (
    <section aria-labelledby="why-heading" className="border-t bg-muted/40 py-14">
      <Container className="space-y-8">
        <SectionHeading id="why-heading" title={`Why buy from ${siteConfig.name}`} align="center" />

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map(({ icon: Icon, title, description }) => (
            <li key={title} className="space-y-2 rounded-xl border bg-card p-5">
              <Icon className="size-6 text-primary" aria-hidden="true" />
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default WhyUs;
