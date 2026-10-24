import { cacheLife } from "next/cache";
import Link from "next/link";

import Container from "@/components/common/Container";
import Logo from "@/components/layout/Logo";
import { LOCATION_SECTION_ID, mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { formatAddress, formatPhone, toTelHref } from "@/lib/format";

// Cache Components forbids reading the clock during prerender, so cache the year for a day.
const getCurrentYear = async () => {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
};

const Footer = async () => {
  const year = await getCurrentYear();

  return (
    <footer className="mt-auto border-t bg-muted/40">
      <Container className="grid gap-8 py-10 sm:grid-cols-3">
        <div className="space-y-3">
          <Logo />
          <p className="text-sm text-muted-foreground">{siteConfig.description}</p>
        </div>

        <nav aria-label="Footer" className="space-y-3">
          <h2 className="text-sm font-semibold">Shop</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold">Contact</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href={toTelHref(siteConfig.phone)} className="hover:text-foreground">
                {formatPhone(siteConfig.phone)}
              </a>
            </li>
            <li>{siteConfig.businessHours}</li>
            <li>
              <Link href={`/about#${LOCATION_SECTION_ID}`} className="hover:text-foreground">
                {formatAddress(siteConfig.address)}
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <Container className="border-t py-6 text-xs text-muted-foreground">
        © {year} {siteConfig.name}. All prices in AUD.
      </Container>
    </footer>
  );
};

export default Footer;
