import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

import { useIsMobile } from "@/hooks/use-mobile";
import PageLayout from "../components/PageLayout";
import SEOHead from "../components/SEOHead";
import AboutStory from "./services/ui/AboutStory";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { aboutHeroButtons,aboutClosingButtons } from "@/content/aboutus";

const metrics = [
  { value: "47+", label: "Clients Served" },
  { value: "3.2x", label: "Avg. Lead Increase" },
  { value: "91%", label: "Client Retention" },
  { value: "6mo", label: "Avg. to Page 1 SEO" },
];

const callouts = [
  {
    id: "leverage",
    label: "Digital Leverage",
    description:
      "We engineer compounding digital systems — not campaigns. Every asset we create multiplies in value over time.",
    image: "/src/assets/aboutus.png",
  },
  {
    id: "architecture",
    label: "Brand Architecture",
    description:
      "Strategic positioning that turns attention into authority. We don't decorate — we construct perception.",
    image: "/src/assets/aboutm2.jpg",
  },
  {
    id: "dominance",
    label: "Market Dominance",
    description:
      "Every engagement is designed as a scalable command center — built to capture, convert, and control your category.",
    image: "/src/assets/aboutm1.jpg",
  },
];

const arrowPaths = [
  "M 0,0 C 40,-30 80,-20 120,10",
  "M 0,0 C 50,20 100,30 140,5",
  "M 0,0 C 30,40 90,50 130,20",
];


const AboutSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const metricsInView = useInView(metricsRef, { once: true, margin: "-60px" });
  const isMobile = useIsMobile();
  const autoTriggered = useRef(false);

  useEffect(() => {
    if (isInView && !autoTriggered.current) {
      autoTriggered.current = true;
      const timer = setTimeout(() => setActiveIndex(0), 600);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const handleActivate = useCallback(
    (i: number) => setActiveIndex((prev) => (prev === i ? null : i)),
    []
  );

  return (
    <PageLayout>
      <SEOHead
        title="About VirelaTech — Digital Marketing Agency in Hyderabad"
        description="Discover how VirelaTech helps businesses in Hyderabad and the US grow through performance marketing, SEO, and AI automation."
      />

      {/* ── HERO ── */}
      <section className="relative pt-32 sm:pt-36 md:pt-36  overflow-hidden">
        {/* <div className="absolute top-0 right-0 w-[20rem] sm:w-[36rem] h-[20rem] sm:h-[36rem] bg-accent/10 blur-[140px] rounded-full pointer-events-none" /> */}
        {/* <div className="absolute bottom-0 left-0 w-[18rem] h-[18rem] bg-orange-500/5 blur-[100px] rounded-full pointer-events-none" /> */}

        <div className="site-container relative text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow-orange text-[18px] "
          >
            About{" "}
            <span className="eyebrow-highlight ">VirelaTech</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="editorial-heading text-[clamp(2.4rem,5vw,4.2rem)] text-foreground mt-4"
          >
            We fix marketing that{" "}
            <span className="font-serif italic text-gradient-accent">
              doesn't connect
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl sm:max-w-2xl mx-auto leading-relaxed"
          >
            Most businesses don't fail because of lack of effort. They fail
            because their marketing reaches the wrong people with the wrong
            message. We built Virelatech to fix exactly that — for brands in
            Hyderabad and the United States.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex justify-center"
          >
            <ButtonGroup buttons={aboutHeroButtons} />

          </motion.div>
        </div>
      </section>

      {/* ── METRICS STRIP ── */}
      {/* <div ref={metricsRef} className="site-container mb-20 md:mb-28">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              animate={metricsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="bg-card px-6 py-8 md:py-10 flex flex-col gap-1 hover:bg-orange-500/[0.04] transition-colors duration-300"
            >
              <span className="editorial-heading text-[clamp(2rem,4vw,3rem)] text-orange-500">
                {m.value}
              </span>
              <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider font-medium">
                {m.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div> */}

      {/* ── INTERACTIVE CALLOUTS + IMAGE ── */}
     

      {/* ── STORY + SERVICES + TRUST ── */}
      <AboutStory />

      {/* ── CLOSING CTA ── */}
      <section className="relative py-8 md:py-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/[0.03] to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[20rem] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="site-container relative text-center">
           <p className="eyebrow-orange justify-center flex">
              Ready to{" "}
              <span className="eyebrow-highlight eyebrow-highlight-orange">
               Grow?
              </span>
            </p>
         
          <h2 className="editorial-heading text-[clamp(2rem,4vw,3.4rem)] text-foreground mt-4 max-w-2xl mx-auto">
            Let's build something that{" "}
            <span className="font-serif italic text-orange-500">
              actually works
            </span>
          </h2>

          <p className="mt-6 text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            No long-term contracts. No vague reports. Just a clear strategy,
            honest communication, and results you can measure.
          </p>

          <div className="mt-10 flex justify-center">
            <ButtonGroup buttons={aboutClosingButtons} />
          </div>

          <p className="mt-6 text-xs text-muted-foreground/60">
            Serving businesses in Hyderabad &amp; the United States
          </p>
        </div>
      </section>

    </PageLayout>
  );
};

export default AboutSection;