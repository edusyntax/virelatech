import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

interface PageHeroProps {
  overline: string;
  title: string;
  titleAccent?: string;
  description: string;
}

const PageHero = ({ overline, title, titleAccent, description }: PageHeroProps) => {
  return (
    <section className="relative pt-40 pb-20 md:pt-48 md:pb-28 site-container overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] animate-glow-pulse pointer-events-none" />

      <div className="relative z-10 max-w-4xl">
        <ScrollReveal>
          <p className="text-orange-500 font-grotesk text-xs sm:text-sm uppercase tracking-[0.3em] mb-6">
            {overline}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h1 className="editorial-heading text-[clamp(2rem,5vw,4.5rem)] text-foreground mb-6 leading-[1.05]">
            {title}{" "}
            {titleAccent && (
              <span className="font-serif italic text-gradient-accent">{titleAccent}</span>
            )}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed">
            {description}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PageHero;
