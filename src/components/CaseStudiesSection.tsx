import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import metalMonolith from "@/assets/metallic-monolith.png";
import heroObject from "@/assets/hero-object.jpg";
import chromeKnot from "@/assets/chrome-knot.png";

const cases = [
  { title: "Nebula Finance", category: "Fintech Platform", year: "2024", image: metalMonolith },
  { title: "Void Studios", category: "Creative Agency", year: "2024", image: heroObject },
  { title: "Chromatic", category: "SaaS Product", year: "2023", image: chromeKnot },
];

const CaseStudiesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section id="work" className="relative py-16 md:py-20 overflow-hidden" ref={containerRef}>
      {/* Edge fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="site-container mb-12">
        <ScrollReveal>
          <p className="text-accent font-grotesk text-sm uppercase tracking-[0.3em] mb-4">Selected Work</p>
          <h2 className="editorial-heading text-[clamp(2rem,5vw,4.5rem)] text-foreground max-w-3xl">
            Case <span className="font-serif italic text-or">Studies</span>
          </h2>
        </ScrollReveal>
      </div>

      <motion.div
        style={{ x }}
        className="flex gap-6 site-container"
      >
        {cases.map((cs, i) => (
          <ScrollReveal key={cs.title} delay={i * 0.1} direction="right">
            <div className="glass rounded-2xl overflow-hidden min-w-[70vw] md:min-w-[40vw] group border border-foreground/[0.12] relative transition-shadow duration-500 hover:shadow-[0_0_30px_-8px_hsl(var(--accent)/0.2)]" data-hover>
              {/* Inner reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.03] via-transparent to-transparent pointer-events-none rounded-2xl z-10" />

              <div className="relative aspect-[16/10] overflow-hidden bg-background-secondary">
                <img
                  src={cs.image}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-accent text-xs font-grotesk uppercase tracking-widest">{cs.category}</span>
                  <span className="text-muted-foreground text-xs">{cs.year}</span>
                </div>
                <h3 className="text-foreground text-3xl md:text-4xl font-grotesk font-bold">{cs.title}</h3>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </motion.div>
    </section>
  );
};

export default CaseStudiesSection;
