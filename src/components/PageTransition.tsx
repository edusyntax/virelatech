// ─── PageTransition.tsx — FULL REPLACEMENT ───────────────────────────────────
import { motion } from "framer-motion";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      // ✅ FIX: Removed y:-20/y:20 and filter:blur entirely.
      // filter:blur on a wrapper that contains the ENTIRE PAGE forces the GPU
      // to re-composite every pixel on every animation frame during route change.
      // On mobile this stalls the scroll pipeline for 300-600ms — feels "stuck".
      // Opacity-only transition is GPU layer promotion: zero layout, zero paint.
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;