export const siteConfig = {
  name: "Rehome",
  description:
    "Quality second-hand washers, fridges and dryers. Tested, cleaned and ready for your home.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** E.164 format — display and tel: link are derived from this. Placeholder until confirmed. */
  phone: "+61400000000",
  /** Placeholder until confirmed. */
  serviceArea: "Sydney",
  businessHours: "Mon–Sat, 8am–6pm",
  /** Pick-up location. `placeName` helps Google Maps drop the pin on the right building. */
  address: {
    placeName: "National Storage Marrickville",
    street: "11A Edinburgh Rd",
    suburb: "Marrickville",
    state: "NSW",
    postcode: "2204",
  },
} as const;
