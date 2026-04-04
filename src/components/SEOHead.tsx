import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  type?: string;
  jsonLd?: Record<string, unknown>;
}

const SITE_NAME = "VirelaTech";
const BASE_URL = "https://VirelaTech.com";

const SEOHead = ({ title, description, path, type = "website", jsonLd }: SEOHeadProps) => {
  const location = useLocation();
  const currentPath = path || location.pathname;
  const fullUrl = `${BASE_URL}${currentPath}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  useEffect(() => {
    // Title
    document.title = fullTitle;

    // Meta tags
    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta("description", description);
    setMeta("robots", "index, follow");

    // Open Graph
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:type", type, true);
    setMeta("og:url", fullUrl, true);
    setMeta("og:site_name", SITE_NAME, true);

    // Twitter
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:site", "@VirelaTech");

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = fullUrl;

    // JSON-LD
    const existingLd = document.querySelector('script[data-seo-jsonld]');
    if (existingLd) existingLd.remove();

    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-jsonld", "true");
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const ld = document.querySelector('script[data-seo-jsonld]');
      if (ld) ld.remove();
    };
  }, [fullTitle, description, fullUrl, type, jsonLd]);

  return null;
};

export default SEOHead;

// Reusable JSON-LD generators
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VirelaTech",
  url: "https://VirelaTech.com",
  description: "Elite digital marketing agency engineering brand authority through strategy, performance marketing, and AI-powered technology.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@VirelaTech.com",
    contactType: "sales",
  },
  sameAs: [
    "https://twitter.com/VirelaTech",
    "https://linkedin.com/company/VirelaTech",
  ],
};

export const serviceJsonLd = (name: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  provider: { "@type": "Organization", name: "VirelaTech" },
  name,
  description,
  areaServed: "Worldwide",
});

export const blogPostJsonLd = (title: string, description: string, date: string, slug: string) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: title,
  description,
  datePublished: date,
  author: { "@type": "Organization", name: "VirelaTech" },
  publisher: { "@type": "Organization", name: "VirelaTech" },
  mainEntityOfPage: `https://VirelaTech.com/blog/${slug}`,
});
