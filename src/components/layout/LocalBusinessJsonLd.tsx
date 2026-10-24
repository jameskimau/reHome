import { siteConfig } from "@/config/site";

// Structured data so search engines can show the business name, phone and area.
const LocalBusinessJsonLd = () => {
  const data = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    areaServed: siteConfig.serviceArea,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.suburb,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.postcode,
      addressCountry: "AU",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
};

export default LocalBusinessJsonLd;
