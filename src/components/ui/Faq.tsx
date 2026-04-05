import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const items = [
  {
    id: "01",
    title: "What exactly do you help businesses with?",
    description:
      "We help businesses get more visibility online and turn that visibility into actual leads. That can be through SEO, ads, social media, or improving your website—depending on what you need.",
  },
  {
    id: "02",
    title: "Which service should I start with?",
    description:
      "That depends on your goal. If you need quick results, ads usually make sense. If you're thinking long-term, SEO and content help.",
  },
  {
    id: "03",
    title: "How soon can I expect results?",
    description:
      "Paid campaigns can start showing activity within a few days. SEO takes longer but gives consistent long-term results.",
  },
  {
    id: "04",
    title: "Do I need all your services or just one?",
    description:
      "Not necessarily all. We recommend only what’s required instead of pushing everything.",
  },
  {
    id: "05",
    title: "Will I be able to track what’s happening?",
    description:
      "Yes. Everything is transparent—you’ll know what’s working and what’s not.",
  },
  {
    id: "06",
    title: "Do you work with small businesses or only big brands?",
    description:
      "We work with both, especially growing businesses where structured marketing makes a big impact.",
  },
];

const HoverFlexSection = () => {
  const [active, setActive] = useState<number | null>(0);
  const [isMobile, setIsMobile] = useState(false);

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Detect screen
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Auto scroll into view on mobile
  useEffect(() => {
    if (isMobile && active !== null) {
      itemRefs.current[active]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [active, isMobile]);

  return (
    <section className="relative py-6 md:py-12 overflow-hidden">
      <div className="site-container">

        {/* Heading */}
        <p className="text-accent text-xs uppercase tracking-[0.25em] mb-3">
          Frequently{" "}
          <span className="bg-[#FF6A3D] text-accent-foreground px-2 py-1 rounded-md">
            Asked
          </span>
        </p>

        <h2 className="text-[clamp(2.2rem,4vw,3.2rem)] font-semibold text-foreground max-w-3xl mb-10 md:mb-14">
          Clear answers.{" "}
          <span className="font-serif text-gradient-accent">
            No noise.
          </span>
        </h2>

        <div className="space-y-4 md:space-y-6">
          {items.map((item, index) => {
            const isActive = active === index;

            return (
              <motion.div
                key={item.id}
                ref={(el) => (itemRefs.current[index] = el)}
                onMouseEnter={() => {
                  if (!isMobile) setActive(index);
                }}
                onClick={() => {
                  if (isMobile) {
                    setActive((prev) =>
                      prev === index ? null : index
                    );
                  }
                }}
                className="relative border rounded-xl cursor-pointer overflow-hidden bg-card"
 animate={{
  backgroundColor: isActive
    ? "rgba(249,115,22,0.08)"
    : "hsl(var(--card))",
  scale: isActive ? 1.02 : 1,
  borderColor: isActive
    ? "#f97316"                // 🟠 active → orange
    : "hsl(var(--border))",   // ⚪ default → normal border
}}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-start md:items-center justify-between py-5 px-4 md:py-8 md:px-10 gap-3 md:gap-4">

                  {/* LEFT */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3 md:gap-6">

                      <span className="font-mono text-xl md:text-2xl font-bold flex-shrink-0 text-accent">
                        {item.id}
                      </span>

                      <div className="flex-1">

                        <h3 className="text-lg md:text-2xl font-bold text-foreground leading-snug">
                          {item.title}
                        </h3>

                        <AnimatePresence>
                          {isActive && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-2 md:mt-3 text-sm md:text-base leading-relaxed text-foreground"
                            >
                              {item.description}
                            </motion.p>
                          )}
                        </AnimatePresence>

                      </div>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-2 md:gap-6 flex-shrink-0">
                    <motion.div
                      animate={{ rotate: isActive ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full border-2 transition-all ${
                        isActive
                          ? "border-accent/60 text-accent"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      <ArrowUpRight size={18} strokeWidth={2.5} />
                    </motion.div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HoverFlexSection;