import { useRef, useEffect } from "react";
import { motion, useInView, useSpring, useMotionValue } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
}

const AnimatedCounter = ({ target, suffix = "" }: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true });

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 50, damping: 30 });

  const numberRef = useRef<HTMLSpanElement | null>(null);

  // Trigger animation
  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, target, motionValue]);

  // Update number only (not suffix)
  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (numberRef.current) {
        numberRef.current.textContent = Math.round(latest).toString();
      }
    });
    return unsubscribe;
  }, [spring]);

  return (
    <span ref={ref} className="inline-flex items-baseline">
      {/* Number */}
      <span ref={numberRef}>0</span>

      {/* Suffix (styled separately) */}
      {suffix && (
        <span className="text-orange-500 text-[0.9em] ml-1 font-semibold">
          {suffix}
        </span>
      )}
    </span>
  );
};

const metrics = [
  { value: 150, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Retention" },
  { value: 12, suffix: "+", label: "Industry Awards" },
  { value: 40, suffix: "M+", label: "Users Reached" },
];

const MetricsSection = () => {
  return (
    <section className="relative py-8 md:py-12 site-container">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
        {metrics.map((m, i) => (
          <ScrollReveal key={m.label} delay={i * 0.1}>
            <div className="text-center md:text-left">
              
              {/* Counter */}
              <div className="text-[clamp(2rem,6vw,7rem)] font-grotesk font-bold text-foreground editorial-heading">
                <AnimatedCounter target={m.value} suffix={m.suffix} />
              </div>

              {/* Label */}
              <p className="text-accent text-sm mt-2 uppercase tracking-widest">
                {m.label}
              </p>

            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default MetricsSection;