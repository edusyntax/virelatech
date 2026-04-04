import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PageLayout from "../components/PageLayout";
import SEOHead from "../components/SEOHead";
import { CTASection } from "./services/ui/CTASection";
import SectionTransition from "../components/SectionTransition";     
import UrgencyCTA from "../components/UrgencyCTA";  
import { blogctaData } from "@/content/aboutus";

/* ================= DATA ================= */

const posts = [
  {
    title: "Why Most Marketing Fails After 90 Days",
    category: "Strategy",
    excerpt:
      "Most brands don’t fail because of bad execution — they fail because there’s no system behind it.When processes are unclear, results become random instead of repeatable.The difference between growth and stagnation is always structure.",
    image: "https://picsum.photos/800/600?1",
  },
  {
    title: "Building Digital Authority in 2026",
    category: "Marketing",
    excerpt: "Strategic frameworks for establishing category dominance through precision engineering.",

    image: "https://picsum.photos/800/600?2",
  },
  {
    title: "Building a Growth System (Not Campaigns)",
    category: "Growth",
    excerpt: "Campaigns give spikes. Systems give predictability.",
    image: "https://picsum.photos/800/600?3",
  },
  {
    title: "Why Content Alone Doesn’t Convert",
    category: "Strategy",
    excerpt:
      "Content without structure creates noise, not revenue.",
    image: "https://picsum.photos/800/600?4",
  },
];

/* ================= PAGE ================= */

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <PageLayout>
      <SEOHead title="VirelaTech Blog" description="Insights on growth systems and client workflows" />

      {/* 🔥 Scroll Progress */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-50"
      />

      {/* ================= HERO ================= */}
   <section className="relative pt-28 sm:pt-32 md:pt-36 pb-20 sm:pb-24 md:pb-32 overflow-hidden">
  
  {/* Background Glow */}
  <div className="absolute top-0 right-0 w-[20rem] sm:w-[30rem] md:w-[40rem] h-[20rem] sm:h-[30rem] md:h-[40rem] bg-accent/10 blur-[100px] md:blur-[140px] rounded-full" />

  <div className="site-container relative mx-auto text-center px-4 sm:px-6">

    {/* Overline */}
    <p className="mt-2 sm:mt-0 text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-accent mb-4 sm:mb-6">
      Insights
    </p>

    {/* Heading */}
    <h1 className="font-semibold leading-[1.1] tracking-tight
      text-[clamp(3rem,5vw,4.4rem)]">

      The Systems Behind High-Performance{" "}

      <span className="relative inline-block">
        <span className="relative z-10 text-white px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-lg">
          Client Work
        </span>
        <span className="absolute inset-0 bg-orange-500 rounded-lg -rotate-1" />
      </span>

    </h1>

    {/* Description */}
    <p className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
      Learn how modern growth actually works — through structured systems, not random tactics.
    </p>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-10 justify-center items-center">

      {/* Call Button */}
      <a href="tel:+919753456333" className="w-full sm:w-auto">
        <button className="w-full sm:w-auto bg-background border border-foreground text-foreground 
          px-5 sm:px-6 py-3 rounded-xl font-medium 
          hover:opacity-90 transition text-sm sm:text-base">
          Unlock Your Growth
        </button>
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919753456333"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full sm:w-auto"
      >
        <button className="w-full sm:w-auto border border-orange-500 
          px-5 sm:px-6 py-3 rounded-xl font-medium 
          hover:bg-background/20 transition text-sm sm:text-base">
          Create With Us
        </button>
      </a>

    </div>

  </div>
</section>

      {/* ================= FEATURED ================= */}
      <section className="site-container  mx-auto ">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="rounded-3xl overflow-hidden border border-foreground/20"
        >
          <div className="grid md:grid-cols-2">

            <img
              src={posts[0].image}
              className="w-full h-full object-cover"
            />

            <div className="p-10  flex flex-col justify-start">
              <p className="text-xs text-accent uppercase">
                {posts[0].category}
              </p>

              <h2 className="text-2xl font-semibold mt-3">
                {posts[0].title}
              </h2>

              <p className="text-muted-foreground mt-4">
                {posts[0].excerpt}
              </p>

      <a
        href="https://wa.me/919753456333"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full sm:w-auto py-6"
      >
        <button className="w-full sm:w-auto border border-foreground/30 text-foreground
          px-5 sm:px-6 py-3 rounded-xl font-medium 
          hover:bg-background/20 transition text-sm sm:text-base">
          Read more 
        </button>
      </a>
            </div>

          </div>
        </motion.div>
      </section>

      {/* ================= FILTER ================= */}
      <section className="site-container mt-16 text-center">
        <div className="flex gap-3 flex-wrap justify-center">
          {["All", "Strategy", "SEO", "Growth"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full border text-sm ${
                activeCategory === cat
                  ? "bg-accent text-white border-accent"
                  : "border-border text-muted-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ================= GRID ================= */}
      <section className="site-container mt-12  mx-auto grid md:grid-cols-3 gap-8 pb-24 ">
        {posts.map((post, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6 }}
            className="rounded-2xl overflow-hidden border border-foreground/20 bg-white/[0.02]"
          >
            <img
              src={post.image}
              className="w-full h-48 object-cover"
            />

            <div className="p-5 ">
              <p className="text-xs text-accent uppercase">
                {post.category}
              </p>

              <h3 className="mt-2 font-semibold text-lg">
                {post.title}
              </h3>

              <p className="text-sm text-muted-foreground mt-3">
                {post.excerpt}
              </p>

              <button className="mt-4 text-accent text-sm">
                Read →
              </button>
            </div>
          </motion.div>
        ))}
      </section>

    
         <CTASection data={blogctaData} />
     

    </PageLayout>
  );
};

export default BlogPage;