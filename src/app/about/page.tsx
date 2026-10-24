import type { Metadata } from "next";

import CallButton from "@/components/common/CallButton";
import Container from "@/components/common/Container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `${siteConfig.name} sells tested, cleaned second-hand appliances in ${siteConfig.serviceArea}.`,
};

const AboutPage = () => {
  return (
    <Container className="max-w-3xl space-y-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">About {siteConfig.name}</h1>
      <div className="space-y-4 leading-relaxed text-muted-foreground">
        <p>
          {siteConfig.name} gives good appliances a second home. We buy quality used washing
          machines, fridges and dryers, then inspect, clean and test every one before it goes on
          sale.
        </p>
        <p>
          Whether you&apos;re setting up a rental, replacing a broken machine or just want to save
          money, we help you get a reliable appliance for a fraction of the price of new — and keep
          it out of landfill.
        </p>
        <p>
          We serve {siteConfig.serviceArea} and surrounding suburbs, with pick-up or local delivery
          available. Our hours are {siteConfig.businessHours}.
        </p>
      </div>
      <CallButton label="Call us" showNumber />
    </Container>
  );
};

export default AboutPage;
