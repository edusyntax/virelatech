import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { useIsMobile } from "@/hooks/use-mobile";

import holographicFluid from "@/assets/aboutus.png";
import aboutM2 from "@/assets/aboutm2.jpg";
import aboutM1 from "@/assets/aboutm1.jpg";

const callouts = [
  {
    id: "leverage",
    label: "Digital Leverage",
    description: "We engineer compounding digital systems...",
    image: holographicFluid,
  },
  {
    id: "architecture",
    label: "Brand Architecture",
    description: "Strategic positioning that turns attention into authority...",
    image: aboutM2,
  },
  {
    id: "dominance",
    label: "Market Dominance",
    description: "Every engagement is designed as a scalable command center...",
    image: aboutM1,
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
    <section
      id="about"
      ref={sectionRef}
      className="relative py-6 site-container"
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl">

        {/* LABEL */}
<ScrollReveal>
  <p className="section-title">
    About{" "}
    <span className="section-highlight">
      VirelaTech
    </span>
  </p>
</ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-16 items-center">

          {/* LEFT SIDE */}
          <div className="lg:col-span-6">

            <h2 className="text-[clamp(2.4rem,3vw,3.2rem)] leading-tight font-light tracking-tight text-foreground max-w-2xl">
              We don’t build campaigns. We engineer{" "}
              <span className="font-medium text-accent font-serif italic">systems.</span>
            </h2>

            <p className="text-muted-foreground/80 text-base leading-relaxed max-w-md mt-4">
              Every engagement becomes a structured digital command center —
              built to scale authority, narrative, and conversion.
            </p>

            {/* DESKTOP CALLOUTS */}
            <div className="hidden md:flex flex-col gap-4 mt-10 relative">

              {callouts.map((c, i) => {
                const isActive = activeIndex === i;

                return (
                  <div key={c.id} className="relative flex items-start gap-4">

                    <svg
                      className="hidden lg:block absolute -right-[160px] top-2 w-[150px] h-[60px] z-10"
                      viewBox="-5 -40 155 100"
                      fill="none"
                    >
                      <motion.path
                        d={arrowPaths[i]}
                        stroke="#f97316"
                        strokeWidth={2}
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={
                          isActive
                            ? { pathLength: 1, opacity: 0.9 }
                            : { pathLength: 0, opacity: 0 }
                        }
                        transition={{ duration: 0.6 }}
                      />

                      <motion.circle
                        cx={i === 0 ? 120 : i === 1 ? 140 : 130}
                        cy={i === 0 ? 10 : i === 1 ? 5 : 20}
                        r={3}
                        fill="#f97316"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={
                          isActive
                            ? { opacity: 1, scale: 1 }
                            : { opacity: 0, scale: 0 }
                        }
                        transition={{ duration: 0.3, delay: 0.4 }}
                      />
                    </svg>

                    <motion.button
                      onMouseEnter={() => !isMobile && setActiveIndex(i)}
                      onClick={() => handleActivate(i)}
                      className={`w-full text-left rounded-2xl border px-5 py-4 transition-all duration-300 ${isActive
                          ? "border-orange-500/40 bg-orange-500/[0.06]"
                          : "border-white/15 bg-white/[0.02] hover:border-orange-500/40"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${isActive ? "bg-orange-500" : "bg-muted-foreground/30"
                            }`}
                        />
                        <span
                          className={`text-lg font-semibold ${isActive ? "text-accent" : "text-muted-foreground"
                            }`}
                        >
                          {c.label}
                        </span>
                      </div>

                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
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

            {/* ✅ MOBILE CALLOUTS (ADDED ONLY THIS) */}
            <div className="md:hidden mt-10 flex flex-col gap-3">

              {callouts.map((c, i) => {
                const isActive = activeIndex === i;

                return (
                  <motion.button
                    key={c.id}
                    onClick={() => handleActivate(i)}
                    className={`w-full text-left rounded-xl px-4 py-3 ${isActive
                        ? "border-accent/50 bg-accent/[0.06]"
                        : "border-white/[0.9] bg-white/[0.02]"
                      }`}
                  >
                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-2">
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${isActive
                              ? "bg-accent"
                              : "bg-muted-foreground/30"
                            }`}
                        />
                        <span className="text-sm">{c.label}</span>
                      </div>

                      <motion.span
                        animate={{ rotate: isActive ? 180 : 0 }}
                        className="text-xs"
                      >
                        ▾
                      </motion.span>

                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="text-sm mt-2"
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
              <div className="relative aspect-[4/5] overflow-hidden">

                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeIndex ?? "default"}
                    src={
                      activeIndex !== null
                        ? callouts[activeIndex].image
                        : holographicFluid
                    }
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                <AnimatePresence>
                  {activeIndex !== null && (
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute bottom-6 left-6 right-6 bg-background/70 backdrop-blur-md rounded-xl px-5 py-4"
                    >
                      <p className="text-accent text-xs uppercase mb-1">
                        {callouts[activeIndex].label}
                      </p>

                      <p className="text-foreground/80 text-sm">
                        {callouts[activeIndex].description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;