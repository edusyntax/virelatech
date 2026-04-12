import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/* TYPES */
export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQCategory = {
  category: string;
  faqs: FAQItem[];
};

type Props = {
  data: FAQCategory[];
  categories?: string[];
  title?: string;
};

const FAQSection = ({
  data,
  categories,
  title = "Frequently Asked Questions",
}: Props) => {
 const [active, setActive] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* SCREEN DETECT */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* AUTO SCROLL MOBILE */
  // useEffect(() => {
  //   if (isMobile && active !== null) {
  //     itemRefs.current[active]?.scrollIntoView({
  //       behavior: "smooth",
  //       block: "center",
  //     });
  //   }
  // }, [active, isMobile]);

  /* GENERAL */
  const generalFaq = data.find((item) => item.category === "General");

  /* FILTER */
  const filtered = categories
    ? data.filter(
        (item) =>
          categories.includes(item.category) &&
          item.category !== "General"
      )
    : data.filter((item) => item.category !== "General");

  /* MERGE */
  const finalData = filtered.flatMap((section) => [
    ...section.faqs,
    ...(generalFaq?.faqs || []),
  ]);

  return (
    <section className="relative py-6 md:py-12  overflow-hidden">
      <div className="site-container ">

        {/* HEADER (MATCHED STYLE) */}
        <p className="eyebrow-orange">
          Frequently{" "}
          <span className="eyebrow-highlight">Asked</span>
        </p>
        {/* LIST */}
        <div className="space-y-4 md:space-y-6">
          {finalData.map((faq, index) => {
            const isActive = active === index;

            return (
              <motion.div
                key={index}
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
                    ? "#f97316"
                    : "hsl(var(--border))",
                }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-start md:items-center justify-between py-5 px-4 md:py-8 md:px-10 gap-3 md:gap-4">

                  {/* LEFT */}
                  <div className="flex-1 flex items-start gap-3 md:gap-6">

                    <span className="font-mono text-xl md:text-2xl font-bold flex-shrink-0 text-accent">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>

                    <div className="flex-1">

                      <h3 className="text-lg md:text-2xl font-bold text-foreground leading-snug">
                        {faq.question}
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
                            {faq.answer}
                          </motion.p>
                        )}
                      </AnimatePresence>

                    </div>
                  </div>

                  {/* RIGHT */}
                  <motion.div
                    animate={{ rotate: isActive ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full border-2 ${
                      isActive
                        ? "border-accent/60 text-accent"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    <ArrowUpRight size={18} strokeWidth={2.5} />
                  </motion.div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;