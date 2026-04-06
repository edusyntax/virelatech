// import { useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { supabase } from "@/integrations/supabase/client";
// import PageLayout from "@/components/PageLayout";
// import PageHero from "@/components/PageHero";
// import ScrollReveal from "@/components/ScrollReveal";
// import SectionTransition from "@/components/SectionTransition";
// import TiltCard from "@/components/TiltCard";
// import SEOHead from "@/components/SEOHead";
// import { format } from "date-fns";

// const BlogPage = () => {
//   const navigate = useNavigate();

//   const { data: posts, isLoading } = useQuery({
//     queryKey: ["public-blog-posts"],
//     queryFn: async () => {
//       const { data } = await supabase
//         .from("posts")
//         .select("id, title, slug, excerpt, status, published_at, reading_time_minutes, cover_image, category_id, author_id, categories(name), profiles!posts_author_id_fkey(display_name)")
//         .eq("status", "published")
//         .order("published_at", { ascending: false });
//       return data ?? [];
//     },
//   });

//   const featured = posts?.[0];
//   const rest = posts?.slice(1) ?? [];

//   return (
//     <PageLayout>
//       <SEOHead
//         title="Blog — Digital Marketing Insights"
//         description="Actionable strategies, industry analysis, and expert perspectives on digital marketing, SEO, AI, and growth from the VirelaTech team."
//       />
//       <PageHero overline="Blog" title="Insights for" titleAccent="growth-driven brands" description="Actionable strategies, industry analysis, and expert perspectives on digital marketing, SEO, AI, and growth." />

//       {isLoading && (
//         <section className="py-12 site-container text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto" />
//         </section>
//       )}

//       {!isLoading && posts?.length === 0 && (
//         <section className="py-12 site-container text-center">
//           <p className="text-muted-foreground">No articles published yet. Check back soon!</p>
//         </section>
//       )}

//       {featured && (
//         <SectionTransition>
//           <section className="py-12 site-container">
//             <ScrollReveal>
//               <div className="glass rounded-2xl p-8 md:p-12 border border-foreground/[0.12] relative overflow-hidden cursor-pointer group" onClick={() => navigate(`/blog/${featured.slug}`)}>
//                 <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] via-transparent to-transparent pointer-events-none rounded-2xl" />
//                 {featured.cover_image && (
//                   <div className="absolute inset-0 pointer-events-none">
//                     <img src={featured.cover_image} alt="" className="w-full h-full object-cover opacity-10" />
//                   </div>
//                 )}
//                 <div className="relative z-10">
//                   <div className="flex items-center gap-3 mb-4">
//                     <span className="glass text-xs text-accent px-3 py-1 rounded-full border border-accent/20">Featured</span>
//                     <span className="text-muted-foreground text-xs">{(featured as any).categories?.name ?? "Uncategorized"}</span>
//                     <span className="text-muted-foreground/50 text-xs">·</span>
//                     <span className="text-muted-foreground text-xs">{featured.reading_time_minutes} min read</span>
//                   </div>
//                   <h2 className="text-foreground text-2xl md:text-4xl font-grotesk font-bold mb-4 group-hover:text-accent transition-colors duration-300 max-w-3xl">{featured.title}</h2>
//                   <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed mb-6">{featured.excerpt}</p>
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center"><span className="text-accent font-grotesk text-xs font-bold">Z</span></div>
//                     <div>
//                       <p className="text-foreground text-sm font-medium">{(featured as any).profiles?.display_name ?? "VirelaTech"}</p>
//                       <p className="text-muted-foreground text-xs">{featured.published_at ? format(new Date(featured.published_at), "MMMM d, yyyy") : ""}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </ScrollReveal>
//           </section>
//         </SectionTransition>
//       )}

//       {rest.length > 0 && (
//         <SectionTransition>
//           <section className="py-16 site-container">
//             <ScrollReveal>
//               <p className="text-accent font-grotesk text-xs uppercase tracking-[0.3em] mb-4">Latest Articles</p>
//               <h2 className="editorial-heading text-[clamp(1.8rem,4vw,3rem)] text-foreground mb-12">All <span className="font-serif italic text-gradient-accent">articles</span></h2>
//             </ScrollReveal>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//               {rest.map((post, i) => (
//                 <ScrollReveal key={post.id} delay={i * 0.08}>
//                   <TiltCard className="h-full">
//                     <div className="glass rounded-2xl p-6 h-full flex flex-col group border border-foreground/[0.12] relative overflow-hidden cursor-pointer" onClick={() => navigate(`/blog/${post.slug}`)}>
//                       <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.04] via-transparent to-transparent pointer-events-none rounded-2xl" />
//                       <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-accent/0 group-hover:bg-accent/30 blur-lg transition-all duration-500 pointer-events-none" />
//                       <div className="relative z-10 flex flex-col h-full">
//                         <div className="flex items-center gap-2 mb-3">
//                           <span className="text-accent text-xs font-grotesk uppercase tracking-wider">{(post as any).categories?.name ?? "Uncategorized"}</span>
//                           <span className="text-muted-foreground/50 text-xs">·</span>
//                           <span className="text-muted-foreground text-xs">{post.reading_time_minutes} min read</span>
//                         </div>
//                         <h3 className="text-foreground text-lg font-grotesk font-bold mb-3 group-hover:text-accent transition-colors duration-300 line-clamp-2">{post.title}</h3>
//                         <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1 line-clamp-3">{post.excerpt}</p>
//                         <div className="flex items-center justify-between">
//                           <p className="text-muted-foreground/60 text-xs">{post.published_at ? format(new Date(post.published_at), "MMMM d, yyyy") : ""}</p>
//                           <span className="text-accent text-xs font-grotesk uppercase tracking-wider group-hover:tracking-[0.2em] transition-all duration-300">Read →</span>
//                         </div>
//                       </div>
//                     </div>
//                   </TiltCard>
//                 </ScrollReveal>
//               ))}
//             </div>
//           </section>
//         </SectionTransition>
//       )}
//     </PageLayout>
//   );
// };

// export default BlogPage;

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal"; 
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SEOHead from "@/components/SEOHead";
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

const TiltCard = ({ children, className = "" }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setTilt({ rotateX: y * -15, rotateY: x * 15 });
  };

  const reset = () => setTilt({ rotateX: 0, rotateY: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        transformPerspective: 1000,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      style={{ transformStyle: "preserve-3d" }}
      className={`${className}`}
      data-hover
    >
      <div style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </motion.div>
  );
};





interface Post {
  id: string;
  image: string;
  title: string;
  excerpt: string;
  description: string;
  readTime: string;
  tags: string[];
}

// placeholder data - real site would fetch from API
const posts: Post[] = [
  {
    id: "post-1",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop",
    title: "Building Digital Authority in 2026",
    excerpt: "Strategic frameworks for establishing category dominance through precision engineering.",
    description: "Explore how leading brands are using data-driven positioning and architectural thinking to create lasting digital authority. Learn the systems that drive sustainable growth.",
    readTime: "5 min read",
    tags: ["Strategy", "Digital"],
  },
{
  id: "post-2",
  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
  title: "Conversion-First UX Systems guide",
  excerpt: "Designing interfaces that guide users toward decisive action.",
  description:
    "Explore how structured UX systems eliminate friction and increase conversion velocity. From behavioral triggers to layout psychology, we unpack what actually drives user decisions.",
  readTime: "6 min read",
  tags: ["UX", "Conversion"],
},
{
  id: "post-3",
  image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
  title: "Scaling Paid Acquisition with Precision",
  excerpt: "How to turn ad spend into predictable growth engines.",
  description:
    "A deep dive into performance marketing frameworks that scale efficiently. Learn how data modeling, audience segmentation, and creative testing work together to maximize ROI.",
  readTime: "8 min read",
  tags: ["Marketing", "Paid Ads"],
} 
];

const BlogSection = () => {
  return (
    <>
      <SEOHead
        title="Blog — Digital Marketing Insights"
        description="Actionable strategies, industry analysis, and expert perspectives on digital marketing, SEO, AI, and growth from the VirelaTech team."
      />
      {/* <PageHero overline="Blog" title="Insights for" titleAccent="growth-driven brands" description="Actionable strategies, industry analysis, and expert perspectives on digital marketing, SEO, AI, and growth." />      */}
    <section
      id="blog"
      className="relative py-6 md:py-12 px-6 md:px-24 lg:px-24"
    >
      <ScrollReveal>
<p className="text-xs tracking-[0.4em] uppercase text-accent mb-2">
  Strategic{" "}
  <span className="bg-[#FF6A3D] text-white px-2 py-2 rounded-md">
    Intelligence
  </span>
</p>

<h2 className="text-[clamp(2.4rem,4vw,3.2rem)] mb-2 leading-tight font-bold tracking-tight text-foreground max-w-2xl">
  Insights shaping digital{" "}
  <span className="font-serif text-gradient-accent">authority</span>
</h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <ScrollReveal key={post.id}>
<article className="group relative flex flex-col h-full rounded-2xl overflow-hidden border border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:border-orange-400">

  {/* Image */}
  <div className="relative aspect-video overflow-hidden flex-shrink-0">
    <img
      src={post.image}
      alt={post.title}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      loading="lazy"
    />

    <span className="absolute top-4 left-4 bg-background/70 backdrop-blur-md text-xs px-3 py-1 rounded-full border border-border">
      {post.readTime}
    </span>
  </div>

  {/* Content */}
  <div className="p-6 flex flex-col flex-1">

    {/* Title + Excerpt */}
    <div>
      <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors duration-300 line-clamp-2">
        {post.title}
      </h3>

      {/* <p className="text-sm text-muted-foreground mt-4 line-clamp-2">
        {post.excerpt}
      </p> */}
    </div>

    {/* Footer */}
    {/* addons :border-t border-border */}
    <div className="mt-auto pt-6  flex items-center justify-between">

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-muted overflow-hidden">
          <img
            src="https://i.pravatar.cc/40"
            alt="Author"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">
            VirelaTech Team
          </p>
          <p className="text-xs text-muted-foreground">
            June 2026
          </p>
        </div>
      </div>

      {/* Read More */}
      <button className="text-sm font-medium text-accent hover:underline transition-all">
        Read More →
      </button>

    </div>
  </div>
</article>
          </ScrollReveal>
        ))}
      </div>
    </section>
    </>
  );
};
export default BlogSection;
