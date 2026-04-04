import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import SectionTransition from "@/components/SectionTransition";
import TiltCard from "@/components/TiltCard";
import UrgencyCTA from "@/components/UrgencyCTA";
import SEOHead, { blogPostJsonLd } from "@/components/SEOHead";
import { format } from "date-fns";

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: post, isLoading } = useQuery({
    queryKey: ["public-blog-post", slug],
    enabled: !!slug,
    queryFn: async () => {
      const { data } = await supabase
        .from("posts")
        .select("*, categories(name), profiles!posts_author_id_fkey(display_name, avatar_url, bio)")
        .eq("slug", slug!)
        .eq("status", "published")
        .maybeSingle();
      return data;
    },
  });

  // Increment view count
  useQuery({
    queryKey: ["increment-view", slug],
    enabled: !!post?.id,
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
    queryKey: ["public-related-posts", slug],
    enabled: !!post,
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
        <section className="pt-40 pb-20 site-container text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto" />
        </section>
      </PageLayout>
    );
  }

  if (!post) {
    return (
      <PageLayout>
        <SEOHead title="Article Not Found" description="The article you're looking for doesn't exist." />
        <section className="pt-40 pb-20 site-container text-center">
          <h1 className="text-foreground text-3xl font-grotesk font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
          <button onClick={() => navigate("/blog")} className="text-accent underline" data-hover>Back to Blog</button>
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
        jsonLd={(post.json_ld as Record<string, unknown>) || blogPostJsonLd(post.title, post.excerpt || "", post.published_at || "", post.slug)}
      />

      {/* Article Header */}
      <section className="relative pt-40 pb-16 md:pt-48 md:pb-20 site-container">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] animate-glow-pulse pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-accent text-xs font-grotesk uppercase tracking-wider">{category?.name ?? "Uncategorized"}</span>
              <span className="text-muted-foreground/50 text-xs">·</span>
              <span className="text-muted-foreground text-xs">{post.reading_time_minutes} min read</span>
              <span className="text-muted-foreground/50 text-xs">·</span>
              <span className="text-muted-foreground text-xs">{post.published_at ? format(new Date(post.published_at), "MMMM d, yyyy") : ""}</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="editorial-heading text-[clamp(1.8rem,4vw,3.5rem)] text-foreground mb-6 leading-[1.1]">{post.title}</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="flex items-center gap-3">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} className="w-10 h-10 rounded-full object-cover" alt="" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-accent font-grotesk text-sm font-bold">{profile?.display_name?.charAt(0) || "Z"}</span>
                </div>
              )}
              <div>
                <p className="text-foreground text-sm font-medium">{profile?.display_name ?? "VirelaTech"}</p>
                {profile?.bio && <p className="text-muted-foreground text-xs line-clamp-1">{profile.bio}</p>}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Cover Image */}
      {post.cover_image && (
        <section className="pb-8 site-container">
          <div className="max-w-3xl mx-auto">
            <img src={post.cover_image} alt={post.title} className="w-full rounded-2xl object-cover max-h-[400px]" />
          </div>
        </section>
      )}

      {/* Article Body */}
      <SectionTransition>
        <section className="pb-20 site-container">
          <div className="max-w-3xl mx-auto">
            <div className="section-divider mb-12" />
            <div
              className="prose prose-sm sm:prose dark:prose-invert max-w-none prose-headings:font-grotesk prose-headings:text-foreground prose-p:text-foreground/90 prose-a:text-accent"
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />
          </div>
        </section>
      </SectionTransition>

      {/* Share */}
      <SectionTransition>
        <section className="pb-16 site-container">
          <div className="max-w-3xl mx-auto">
            <div className="section-divider mb-8" />
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-sm">Share this article</p>
              <div className="flex gap-4">
                {["Twitter", "LinkedIn", "Email"].map((p) => (
                  <button key={p} className="text-muted-foreground text-xs uppercase tracking-wider hover:text-foreground transition-colors" data-hover>{p}</button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </SectionTransition>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <SectionTransition>
          <section className="py-20 site-container">
            <ScrollReveal>
              <p className="text-accent font-grotesk text-xs uppercase tracking-[0.3em] mb-4">Keep Reading</p>
              <h2 className="editorial-heading text-[clamp(1.8rem,4vw,3rem)] text-foreground mb-12">Related <span className="font-serif italic text-gradient-accent">articles</span></h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedPosts.map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 0.08}>
                  <TiltCard className="h-full">
                    <div className="glass rounded-2xl p-6 h-full flex flex-col group border border-foreground/[0.12] relative overflow-hidden cursor-pointer" onClick={() => navigate(`/blog/${p.slug}`)}>
                      <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.04] via-transparent to-transparent pointer-events-none rounded-2xl" />
                      <div className="relative z-10 flex flex-col h-full">
                        <span className="text-accent text-xs font-grotesk uppercase tracking-wider mb-2">{(p as any).categories?.name ?? "Uncategorized"}</span>
                        <h3 className="text-foreground text-lg font-grotesk font-bold mb-3 group-hover:text-accent transition-colors duration-300 line-clamp-2">{p.title}</h3>
                        <p className="text-muted-foreground text-sm line-clamp-2 flex-1">{p.excerpt}</p>
                        <p className="text-muted-foreground/60 text-xs mt-4">{p.reading_time_minutes} min read</p>
                      </div>
                    </div>
                  </TiltCard>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </SectionTransition>
      )}

      <SectionTransition>
        <UrgencyCTA variant="inline" headline="Want results like" headlineAccent="these?" primaryCTA="Get Your Free Marketing Audit" urgencyNote="Free strategy session available" sourcePage="Blog Article" />
      </SectionTransition>
    </PageLayout>
  );
};

export default BlogArticle;
