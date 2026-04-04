export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function calculateReadingTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function countWords(content: string): number {
  const text = content.replace(/<[^>]*>/g, "");
  return text.split(/\s+/).filter(Boolean).length;
}

export function generateArticleJsonLd(post: {
  title: string;
  seo_description?: string;
  cover_image?: string;
  published_at?: string;
  updated_at?: string;
  author_name?: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seo_description || "",
    image: post.cover_image || "",
    datePublished: post.published_at || "",
    dateModified: post.updated_at || post.published_at || "",
    author: {
      "@type": "Person",
      name: post.author_name || "VirelaTech",
    },
    publisher: {
      "@type": "Organization",
      name: "VirelaTech",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://VirelaTech.com/blog/${post.slug}`,
    },
  };
}
