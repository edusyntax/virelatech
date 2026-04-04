import { useRef } from "react";
import { motion, useInView, useSpring, useMotionValue } from "framer-motion";
import { useEffect } from "react";
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
  const displayRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (isInView) motionValue.set(target);
  }, [isInView, target, motionValue]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (displayRef.current) {
        displayRef.current.textContent = Math.round(latest) + suffix;
      }
    });
    return unsubscribe;
  }, [spring, suffix]);

  return <span ref={(el) => { ref.current = el; displayRef.current = el; }}>0{suffix}</span>;
};

const metrics = [
  { value: 150, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Retention" },
  { value: 12, suffix: "", label: "Industry Awards" },
  { value: 40, suffix: "M+", label: "Users Reached" },
];

const MetricsSection = () => {
  return (
    <section className="relative py-8 md:py-12   site-container ">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
        {metrics.map((m, i) => (
          <ScrollReveal key={m.label} delay={i * 0.1}>
            <div className="text-center md:text-left">
              <div className="text-[clamp(2rem,6vw,7rem)] font-grotesk font-bold text-foreground editorial-heading">
                <AnimatedCounter target={m.value} suffix={m.suffix} />
              </div>
              <p className="text-muted-foreground text-sm mt-2 uppercase tracking-widest">{m.label}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default MetricsSection;
