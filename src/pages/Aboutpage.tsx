import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import ScrollReveal from "../components/ScrollReveal";
import holographicFluid from "@/assets/aboutus.png";
import { useIsMobile } from "@/hooks/use-mobile";
import PageLayout from "../components/PageLayout";
import SEOHead from "../components/SEOHead";
import PageHero from "../components/PageHero";

/* =========================== DATA =========================== */

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
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
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
        title="About VirelaTech"
        description="Discover VirelaTech's system-driven approach to scaling brands through digital infrastructure."
      />

<section className="relative pt-28 sm:pt-32 md:pt-36 pb-20 sm:pb-24 md:pb-32 overflow-hidden">

  {/* Background Glow */}
  <div className="absolute top-0 right-0 w-[20rem] sm:w-[30rem] md:w-[40rem] h-[20rem] sm:h-[30rem] md:h-[40rem] bg-accent/10 blur-[100px] md:blur-[140px] rounded-full" />

  <div className="site-container relative mx-auto text-center px-4 sm:px-6">

    {/* EYEBROW */}
    <p className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase 
      bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 
      bg-clip-text text-transparent mb-4 sm:mb-6">
      About VirelaTech
    </p>

    {/* HEADING */}
    <h1 className="font-semibold leading-[1.1] tracking-tight
      text-[clamp(3rem,5vw,4.4rem)]">

      We Build Systems That{" "}

      <span className="relative inline-block">
        <span className="relative z-10 text-white px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-lg">
          Scale Businesses
        </span>
        <span className="absolute inset-0 bg-orange-500 rounded-lg -rotate-1" />
      </span>

    </h1>

    {/* DESCRIPTION */}
    <p className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
      We don’t run campaigns. We engineer structured digital systems that compound 
      visibility, authority, and revenue over time.
    </p>

    {/* CTA */}
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-10 justify-center items-center">

      <button className="w-full sm:w-auto bg-orange-500 text-white 
        px-6 py-3 rounded-xl font-medium 
        hover:opacity-90 transition text-sm sm:text-base">
        Work With Us
      </button>

      <button className="w-full sm:w-auto border border-orange-500 
        px-6 py-3 rounded-xl font-medium 
        hover:bg-orange-500/10 transition text-sm sm:text-base">
        See Our Systems
      </button>

    </div>

  </div>
</section>

      <section ref={sectionRef} className="relative py-16 site-container">

        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-6xl">

          <ScrollReveal>
            <p className="text-xs tracking-[0.4em] uppercase text-accent mb-2">
              About{" "}
              <span className="bg-[#FF6A3D] text-white px-2 py-1 rounded-md">
                VirelaTech
              </span>
            </p>
          </ScrollReveal>

          <div className="grid lg:grid-cols-12 gap-16 items-center">

            {/* ================= LEFT ================= */}
            <div className="lg:col-span-6">

              <h2 className="text-[clamp(2.6rem,3.5vw,3.6rem)] leading-[1.1] font-semibold tracking-tight text-foreground max-w-2xl">
                We don’t build campaigns. We engineer{" "}
                <span className="text-accent">systems.</span>
              </h2>

              <p className="text-muted-foreground/80 text-base leading-relaxed max-w-md mt-5">
                Every engagement becomes a structured digital command center —
                built to scale authority, narrative, and conversion.
              </p>

              {/* DESKTOP CALLOUTS */}
              <div className="hidden md:flex flex-col gap-5 mt-12 relative">

                {callouts.map((c, i) => {
                  const isActive = activeIndex === i;

                  return (
                    <div key={c.id} className="relative flex items-start gap-4">

                      <svg
                        className="hidden lg:block absolute -right-[160px] top-2 w-[150px] h-[60px]"
                        viewBox="-5 -40 155 100"
                        fill="none"
                      >
                        <motion.path
                          d={arrowPaths[i]}
                          stroke="hsl(var(--accent))"
                          strokeWidth={2}
                          strokeLinecap="round"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={
                            isActive
                              ? { pathLength: 1, opacity: 0.9 }
                              : { pathLength: 0, opacity: 0 }
                          }
                          transition={{ duration: 0.8 }}
                        />
                      </svg>

                      <motion.button
                        onMouseEnter={() => !isMobile && setActiveIndex(i)}
                        onClick={() => handleActivate(i)}
                        className={`group w-full  text-left rounded-2xl border  px-5 py-4 transition-all duration-500 ${
                          isActive
                            ? "border-accent/50 bg-accent/[0.08]"
                            : "border-white/10 bg-white/[0.03]"
                        }`}
                      >
                        <div className="flex items-center gap-3 font-bold">
                          <div className={`w-2 h-2 rounded-full ${isActive ? "bg-accent" : "bg-muted-foreground/30"}`} />
                          <span className={`${isActive ? "text-accent" : "text-muted-foreground"}`}>
                            {c.label}
                          </span>
                        </div>

                        <AnimatePresence>
                          {isActive && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="text-sm mt-3 ml-5"
                            >
                              {c.description}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.button>

                    </div>
                  );
                })}
              </div>

              {/* ✅ PREMIUM MOBILE CALLOUTS */}
              <div className="md:hidden mt-10 flex flex-col gap-4">

                {callouts.map((c, i) => {
                  const isActive = activeIndex === i;

                  return (
                    <motion.button
                      key={c.id}
                      onClick={() => handleActivate(i)}
                      className={`relative w-full text-left rounded-2xl px-5 py-4 overflow-hidden border ${
                        isActive
                          ? "border-accent/60 bg-accent/[0.08]"
                          : "border-white/10 bg-white/[0.03]"
                      }`}
                    >

                      <div className={`absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`} />

                      <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-3">

                          <motion.div
                            className={`w-2 h-2 rounded-full ${
                              isActive ? "bg-accent" : "bg-muted-foreground/30"
                            }`}
                            animate={isActive ? { scale: [1, 1.4, 1] } : {}}
                          />

                          <span className={`text-sm ${
                            isActive ? "text-accent" : "text-muted-foreground"
                          }`}>
                            {c.label}
                          </span>
                        </div>

                        <motion.span animate={{ rotate: isActive ? 180 : 0 }}>
                          ▾
                        </motion.span>
                      </div>

                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-sm mt-3"
                          >
                            {c.description}
                          </motion.p>
                        )}
                      </AnimatePresence>

                    </motion.button>
                  );
                })}
              </div>

            </div>

            {/* RIGHT IMAGE */}
            <div className="lg:col-span-5 lg:col-start-8">

              <div className="relative rounded-3xl overflow-hidden border border-white/10">
                <div className="relative aspect-[4/5]">

                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeIndex ?? "default"}
                      src={
                        activeIndex !== null
                          ? callouts[activeIndex].image
                          : holographicFluid
                      }
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AboutSection;