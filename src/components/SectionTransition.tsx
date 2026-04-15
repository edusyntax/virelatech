// ─── SectionTransition.tsx — FULL REPLACEMENT ────────────────────────────────
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionTransitionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const SectionTransition = ({
  children,
  className = "",
  delay = 0,
}: SectionTransitionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SectionTransition;