// Helpers to build JSON-LD structured data for comparison pages.

export type ComparisonRow = [string, string, string];

export function comparisonItemList(opts: {
  name: string;
  url: string;
  competitorName: string;
  rows: ComparisonRow[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: opts.name,
    url: opts.url,
    numberOfItems: opts.rows.length,
    itemListElement: opts.rows.map((row, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: row[0],
      description: `${opts.competitorName}: ${row[1]} — Liner: ${row[2]}`,
    })),
  };
}

export function faqPage(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
}

export function softwareApplication(opts: {
  name: string;
  url: string;
  description: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: opts.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: opts.url,
    description: opts.description,
    ...(opts.image ? { image: opts.image } : {}),
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/PreOrder" },
  };
}
