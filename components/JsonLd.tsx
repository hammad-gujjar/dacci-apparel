/**
 * JsonLd — lightweight server component that injects JSON-LD structured data.
 * Usage: <JsonLd data={{ "@type": "Organization", ... }} />
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted server-rendered structured data
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
