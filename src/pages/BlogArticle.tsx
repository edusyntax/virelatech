import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import PageLayout from "@/components/PageLayout";
import SectionTransition from "@/components/SectionTransition";
import UrgencyCTA from "@/components/UrgencyCTA";
import SEOHead, { blogPostJsonLd } from "@/components/SEOHead";
import { format } from "date-fns";

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const isPreview = location.pathname.startsWith("/blog/preview");

  // ✅ FIXED QUERY (no invalid columns)
  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug, isPreview],
    enabled: !!slug,
    queryFn: async () => {
      let query = supabase
        .from("posts")
        .select(
          "*, categories(name), profiles!posts_author_id_fkey(display_name)"
        )
        .eq("slug", slug!);

      if (!isPreview) {
        query = query.eq("status", "published");
      }

      const { data, error } = await query.maybeSingle();

      if (error) {
        console.error("Fetch error:", error);
        return null;
      }

      return data;
    },
  });

  // ✅ view count (safe)
  useQuery({
    queryKey: ["increment-view", slug],
    enabled: !!post?.id && !isPreview,
    queryFn: async () => {
      await supabase
        .from("posts")
        .update({ view_count: (post?.view_count ?? 0) + 1 })
        .eq("id", post!.id);
      return true;
    },
    staleTime: Infinity,
  });

  const { data: relatedPosts } = useQuery({
    queryKey: ["related-posts", slug],
    enabled: !!post && !isPreview,
    queryFn: async () => {
      const { data } = await supabase
        .from("posts")
        .select("id, title, slug, excerpt, reading_time_minutes, categories(name)")
        .eq("status", "published")
        .neq("slug", slug!)
        .order("published_at", { ascending: false })
        .limit(3);

      return data ?? [];
    },
  });

  if (isLoading) {
    return (
      <PageLayout>
        <SEOHead title="Loading..." description="" />
        <section className="pt-40 pb-20 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto" />
        </section>
      </PageLayout>
    );
  }

  if (!post) {
    return (
      <PageLayout>
        <SEOHead title="Article Not Found" description="The article doesn't exist." />
        <section className="pt-40 pb-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <button onClick={() => navigate("/blog")} className="text-accent underline">
            Back to Blog
          </button>
        </section>
      </PageLayout>
    );
  }

  const profile = (post as any).profiles;
  const category = (post as any).categories;

  return (
    <PageLayout>
      <SEOHead
        title={post.seo_title || post.title}
        description={post.seo_description || post.excerpt || ""}
        jsonLd={
          isPreview
            ? undefined
            : (post.json_ld as Record<string, unknown>) ||
              blogPostJsonLd(
                post.title,
                post.excerpt || "",
                post.published_at || "",
                post.slug
              )
        }
      />

      {/* Preview banner */}
      {isPreview && (
        <div className="bg-yellow-500 text-black text-center py-2 text-sm font-medium">
          Preview Mode — Not publicly visible
        </div>
      )}

      {/* Header */}
      <section className="pt-40 pb-16 max-w-6xl mx-auto px-2">
        <div className="flex gap-3 mb-6 text-xs text-muted-foreground">
          <span>{category?.name ?? "Uncategorized"}</span>
          <span>·</span>
          <span>{post.reading_time_minutes} min read</span>
          <span>·</span>
          <span>
            {post.published_at
              ? format(new Date(post.published_at), "MMMM d, yyyy")
              : "Unpublished"}
          </span>
        </div>

        <h1 className="text-3xl font-bold mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Author (fixed for your DB) */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
            <span className="text-accent font-bold">
              {profile?.display_name?.charAt(0) || "V"}
            </span>
          </div>

          <div>
            <p className="text-sm font-medium">
              {profile?.display_name || "VirelaTech"}
            </p>
          </div>
        </div>
      </section>

      {/* Cover */}
      {post.cover_image && (
        <section className="pb-8 max-w-6xl mx-auto px-2">
          <img
            src={post.cover_image}
            alt={post.title}
           className="w-full h-[250px] md:h-[350px] lg:h-[420px] rounded-2xl object-cover"
          />
        </section>
      )}

      {/* Content (kept your theme, improved spacing only) */}
      <SectionTransition>
        <section className="pb-20 max-w-6xl mx-auto px-2">
          <div
            className="prose dark:prose-invert max-w-none prose-lg leading-relaxed
                       prose-headings:font-semibold prose-headings:tracking-tight
                       prose-p:leading-8 prose-p:text-[17px]"
            dangerouslySetInnerHTML={{ __html: post.content || "" }}
          />
        </section>
      </SectionTransition>

      {/* Related */}
     {!isPreview && relatedPosts && relatedPosts.length > 0 && (
  <section className="py-20 px-2">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-10">Related Articles</h2>

      <div className="grid md:grid-cols-3 gap-5">
        {relatedPosts.map((post: any) => (
          <article
            key={post.id}
            onClick={() => navigate(`/blog/${post.slug}`)}
            className="group cursor-pointer flex flex-col rounded-2xl overflow-hidden border border-border bg-card hover:-translate-y-2 transition hover:border-orange-500"
          >
            {/* Image */}
            <div className="relative aspect-video overflow-hidden">
              <img
                src={post.cover_image || "https://picsum.photos/800/600"}
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />

              {/* Read Time */}
              <span className="absolute top-3 left-3 bg-black/60 text-white text-[10px] px-2 py-1 rounded-md backdrop-blur">
                {post.reading_time_minutes} min read
              </span>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-lg font-semibold line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-6 flex items-center justify-between">
                {/* Author (safe for your DB) */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-accent text-xs font-bold">
                      {(post.profiles?.display_name || "V")[0]}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs font-medium">
                      {post.profiles?.display_name || "VirelaTech"}
                    </p>

                    <p className="text-[10px] text-muted-foreground">
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString()
                        : ""}
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="text-right">
                  <span className="text-sm text-accent">Read →</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
)}

      <UrgencyCTA variant="inline" headline="Want results like these?" />
    </PageLayout>
  );
};

export default BlogArticle;