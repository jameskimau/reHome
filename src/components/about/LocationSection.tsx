import { ClockIcon, MapPinIcon, NavigationIcon } from "lucide-react";

import CallButton from "@/components/common/CallButton";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import { LOCATION_SECTION_ID } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { formatAddress } from "@/lib/format";
import { getDirectionsUrl, getMapEmbedUrl } from "@/lib/maps";

const LocationSection = () => {
  const address = formatAddress(siteConfig.address);
  const mapQuery = `${siteConfig.address.placeName}, ${address}`;

  return (
    <section
      id={LOCATION_SECTION_ID}
      aria-labelledby="location-heading"
      className="scroll-mt-16 py-14"
    >
      <Container className="space-y-8">
        <SectionHeading
          id="location-heading"
          title="Find us"
          description="Come and see the appliances in person. Give us a call before you visit so we can have your item ready."
          align="center"
        />

        <div className="grid overflow-hidden rounded-2xl border bg-card md:grid-cols-[1fr_1.4fr]">
          <div className="flex flex-col gap-6 p-6 sm:p-8">
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPinIcon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="font-semibold">Pick-up location</p>
                  <address className="text-muted-foreground not-italic">{address}</address>
                </div>
              </li>
              <li className="flex gap-3">
                <ClockIcon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="font-semibold">Hours</p>
                  <p className="text-muted-foreground">{siteConfig.businessHours}</p>
                </div>
              </li>
            </ul>

            <div className="mt-auto flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
              <Button asChild size="lg" className="h-11 px-5">
                <a href={getDirectionsUrl(mapQuery)} target="_blank" rel="noopener noreferrer">
                  <NavigationIcon aria-hidden="true" />
                  Get directions
                </a>
              </Button>
              <CallButton label="Call" showNumber variant="outline" className="h-11 px-5" />
            </div>
          </div>

          <iframe
            src={getMapEmbedUrl(mapQuery)}
            title={`Map of ${address}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="aspect-[4/3] h-full min-h-72 w-full border-0 md:aspect-auto"
          />
        </div>
      </Container>
    </section>
  );
};

export default LocationSection;
