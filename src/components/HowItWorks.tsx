import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ===========================
   DATA
=========================== */

const milestones = [
  {
    image: "/src/assets/services/design.jpeg",
    title: "Understand",
    caption: "We analyze your business, audience, and current gaps to uncover what truly matters.",
  },
  {
    image: "/src/assets/services/plan.jpeg",
    title: "Plan",
    caption: "A tailored strategy built around your goals—focused, practical, and growth-driven.",
  },
  {
    image: "/src/assets/services/excute.jpeg",
    title: "Execute",
    caption: "We launch campaigns and systems with clear, structured execution and full visibility.",
  },
  {
    image: "/src/assets/services/roi.jpeg",
    title: "Optimize",
    caption: "We continuously refine based on data to improve performance and scale results over time.",
  },
];

const PolaroidTimeline = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [ropePath, setRopePath] = useState("");
  const [lightbox, setLightbox] = useState<number | null>(null);

  /* ===========================
     ROPE GENERATION
  =========================== */

  const generatePath = () => {
    if (!sectionRef.current) return;

    const containerRect = sectionRef.current.getBoundingClientRect();

    const points = pinRefs.current
      .map((pin) => {
        if (!pin) return null;
        const rect = pin.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top + rect.height / 2 - containerRect.top,
        };
      })
      .filter(Boolean) as { x: number; y: number }[];

    if (points.length < 2) return;

    let d = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];

      const midX = (prev.x + curr.x) / 2;
      const midY = Math.min(prev.y, curr.y) - 40;

      d += ` Q ${midX} ${midY}, ${curr.x} ${curr.y}`;
    }

    setRopePath(d);
  };

  useEffect(() => {
    generatePath();
    window.addEventListener("resize", generatePath);
    return () => window.removeEventListener("resize", generatePath);
  }, []);

  /* ===========================
     UI
  =========================== */

  return (
    <section ref={sectionRef} className="relative py-6 site-container">
      <div className="relative max-w-6xl mx-auto">

        {/* HEADER */}
        <p className="text-xs tracking-[0.4em] uppercase text-accent mb-2">
          Operational{" "}
          <span className="bg-[#FF6A3D] text-white px-2 py-1 rounded-md">
            Framework
          </span>
        </p>

        <h2 className="text-[clamp(2.4rem,4vw,3.2rem)] leading-tight font-bold tracking-tight text-foreground max-w-2xl">
          The system behind{" "}
          <span className="font-serif text-gradient-accent">every</span> result
        </h2>

        {/* ROPE */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10">
          <motion.path
            d={ropePath}
            stroke="hsl(var(--accent))"
            strokeWidth="2"
            strokeDasharray="5 18"
            strokeLinecap="round"
            fill="none"
            animate={{ strokeDashoffset: [0, -120] }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          />
        </svg>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-16">
          {milestones.map((item, i) => {
            const tilt = (i % 2 === 0 ? -1 : 1) * (8 + i * 2);

            return (
              <motion.div
                key={i}
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                {/* Tape */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-6 bg-accent/30 rotate-[-8deg] rounded-sm opacity-80" />

                {/* Pin */}
                <div
                  ref={(el) => (pinRefs.current[i] = el)}
                  onClick={() => setLightbox(i)}
                  className="absolute -top-8 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent cursor-pointer"
                />

                {/* CARD */}
                <div>
                  <motion.div
                    className="w-full max-w-[16rem] min-h-[18rem] rounded-md border border-white/10 shadow-xl cursor-pointer relative mx-auto bg-background/40 backdrop-blur-sm overflow-hidden"
                    style={{ rotate: tilt }}
                    whileHover={{
                      scale: 1.05,
                      y: -8,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                  >
                    {/* IMAGE */}
                    <img
                      src={item.image}
                      className="w-full h-40 object-cover rounded-t-md"
                    />

                    {/* CONTENT */}
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground">
                        {item.title}
                      </h3>

                      <p className="text-sm text-muted-foreground mt-1">
                        {item.caption}
                      </p>

                      {/* <button className="mt-4 px-4 py-2 bg-accent text-white rounded-md hover:opacity-90 transition">
                        Contact Us
                      </button> */}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-background/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative">
              <img
                src={milestones[lightbox].image}
                className="max-w-4xl max-h-[80vh]"
              />

              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 text-foreground text-3xl"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PolaroidTimeline;