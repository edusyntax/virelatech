import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PageLayout from "../components/PageLayout";
import SEOHead from "../components/SEOHead";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import vlogo from "@/assets/vr.png";

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(10);
  const navigate = useNavigate();
  const roleLabelMap: any = {
  superadmin: "Super Admin",
  admin: "Admin",
  editor: "Author",
  viewer: "Viewer",
};

 const { data: posts = [], isLoading } = useQuery<any>({
    queryKey: ["public-posts"],
    queryFn: async () => {
  const { data: posts, error } = await supabase
    .from("posts")
    .select(`
      id,
      title,
      slug,
      excerpt,
      cover_image,
      reading_time_minutes,
      published_at,
      feature_status,
      author_id
    `)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) throw error;

  // 👉 fetch profiles
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, display_name, avatar_url");

  // 👉 fetch roles
  const { data: roles } = await supabase
    .from("user_roles")
    .select("user_id, role");

  // 👉 merge
  const mergedPosts = posts.map((post: any) => {
    const profile = profiles?.find((p) => p.id === post.author_id);
    const role = roles?.find((r) => r.user_id === post.author_id);

    return {
      ...post,
      author: profile,
      role: role?.role || "editor",
    };
  });

  return mergedPosts ?? [];
}
  });

  // Featured logic
const featuredPost = posts.find((p: any) => p.feature_status === "featured");
const upcomingPosts = posts.filter((p: any) => p.feature_status === "upcoming");
const normalPosts = posts.filter(
  (p: any) => !p.feature_status || p.feature_status === "none"
);  

  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <PageLayout>
      <SEOHead
        title="VirelaTech Blog"
        description="Insights on growth systems and client workflows"
      />

      {/* Scroll bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-50"
      />

      {/* HERO */}
      <section className="relative pt-28 sm:pt-32 md:pt-36 pb-20 sm:pb-24 md:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-accent/10 blur-[140px] rounded-full" />

        <div className="site-container text-center px-4">
          <p className="text-orange-500 font-bold uppercase tracking-[0.4em] mb-6">
            Insights
          </p>

          <h1 className="text-4xl font-semibold">
            The Systems Behind High-Performance{" "}
            <span className="italic text-accent">
              Client Work
            </span>
          </h1>

          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            Learn how modern growth actually works — through structured systems, not random tactics.
          </p>
        </div>
      </section>

      {/* FEATURED */}
<section className="site-container mx-auto">
       {featuredPost && (
  <div
    onClick={() => navigate(`/blog/${featuredPost.slug}`)}
    className="cursor-pointer rounded-2xl hover:border-orange-500 overflow-hidden border border-border bg-card grid md:grid-cols-2 gap-0 hover:shadow-lg transition"
  >
    {/* LEFT IMAGE */}
    <div className="relative h-[260px] md:h-full">
      <img
        src={featuredPost.cover_image || "https://picsum.photos/800/600"}
        className="w-full h-full object-cover"
      />

      {/* Badge */}
      <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-md font-medium">
        Featured
      </span>
    </div>

    {/* RIGHT CONTENT */}
    <div className="p-3 flex flex-col justify-center">
      {/* Title */}
      <h2 className="text-xl md:text-2xl font-semibold leading-tight mb-3">
        {featuredPost.title}
      </h2>

      {/* Excerpt */}
      <p className="text-sm text-muted-foreground mb-5 line-clamp-3">
        {featuredPost.excerpt}
      </p>

      {/* Author + Meta */}
      <div className="flex items-center gap-3">
        <img
          src={featuredPost.author?.avatar_url || vlogo ||"https://i.pravatar.cc/40"}
          className="w-8 h-8 rounded-full"
        />

        <div className="text-xs">
          <p className="font-medium">
            {featuredPost.author?.display_name || "VirelaTech"}
          </p>

          <p className="text-muted-foreground">
            {featuredPost.reading_time_minutes} min read
          </p>
        </div>
      </div>
    </div>
  </div>
)}


</section>


      {/* EMPTY STATE */}
      {!isLoading && posts.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          No posts found
        </div>
      )}

      {/* GRID */}
      <section className="site-container mt-12 grid md:grid-cols-3 gap-8 pb-24">
        {normalPosts.slice(0, visibleCount).map((post: any)=> (
          <article
            key={post.id}
            onClick={() => navigate(`/blog/${post.slug}`)}
            className="group cursor-pointer flex flex-col rounded-2xl overflow-hidden border border-border bg-card hover:-translate-y-2 transition hover:border-orange-500"
          >
            {/* Image */}
           <div className="relative aspect-video overflow-hidden">
  <img
    src={post.cover_image ||"https://picsum.photos/800/600"}
    className="w-full h-full object-cover group-hover:scale-105 transition"
  />

  {/* Read Time Badge */}
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

  {/* Author */}
  <div className="flex items-center gap-2">
    <img
      src={post.author?.avatar_url || vlogo ||"https://i.pravatar.cc/40"}
      className="w-7 h-7 rounded-full"
    />

    <div>
      <p className="text-xs font-medium">
        {post.author?.display_name || "VirelaTech"}
      </p>

      {/* <p className="text-[10px] text-muted-foreground">
        {roleLabelMap[post.role] || post.role}
      </p> */}
      <p className="text-[10px] text-muted-foreground">
      {post.published_at
        ? new Date(post.published_at).toLocaleDateString()
        : ""}
    </p>
    </div>
  </div>

  {/* Right side */}
  <div className="text-right">
    

    <span className="text-sm text-accent">
      Read →
    </span>
  </div>

</div>

                   
                 
               

               
              
            </div>
          </article>
        ))}
      </section>
 {visibleCount < normalPosts.length && (
  <div className="text-center mb-16">
    <button
      onClick={() => {
        setVisibleCount((prev) => prev + 10);
       window.scrollBy({ top: window.innerHeight * 0.5, behavior: "smooth" });
      }}
      className="px-6 py-3 rounded-xl bg-accent text-white hover:opacity-90 transition"
    >
      Load More
    </button>
  </div>
)}

      {upcomingPosts.length > 0 && (
  <section className="site-container mx-auto mb-16">
    <h2 className="text-xl font-semibold mb-6">Upcoming</h2>

    <div className="grid md:grid-cols-3 gap-6">
      {upcomingPosts.map((post: any) => (
        <article
          key={post.id}
          className="flex flex-col rounded-2xl overflow-hidden border border-border bg-card opacity-80 cursor-not-allowed"
        >
          {/* Image */}
          <div className="relative aspect-video overflow-hidden">
            <img
              src={post.cover_image || "https://picsum.photos/800/600"}
              className="w-full h-full object-cover"
            />

            {/* Upcoming Badge */}
            <span className="absolute top-3 left-3 bg-yellow-500 text-black text-[10px] px-2 py-1 rounded-md font-medium">
              Upcoming
            </span>

            {/* Read Time */}
            <span className="absolute bottom-3 left-3 bg-black/60 text-white text-[10px] px-2 py-1 rounded-md backdrop-blur">
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
            <div className="mt-6 flex items-center gap-2">
              <img
                src={post.author?.avatar_url || vlogo || "https://i.pravatar.cc/40"}
                className="w-7 h-7 rounded-full"
              />

              <div>
                <p className="text-xs font-medium">
                  {post.author?.display_name || "VirelaTech"}
                </p>

               <p className="text-[10px] text-muted-foreground">
        {roleLabelMap[post.role] || post.role}
      </p>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  </section>
)}
    </PageLayout>
  );
};

export default BlogPage;