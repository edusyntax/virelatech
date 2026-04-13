import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import vtlogo from "@/assets/Vtlg.png"

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),    // Grain appears
      setTimeout(() => setPhase(2), 700),    // Text appears
      setTimeout(() => setPhase(3), 1500),   // Light streak
      setTimeout(() => setPhase(4), 2000),   // Exit
      setTimeout(() => onComplete(), 2400),  // Done
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 4 && (
        <motion.div
          className="fixed inset-0 z-[100000] flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
        >
          {/* Grain */}
          <motion.div
            className="grain"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 0.05 : 0 }}
            transition={{ duration: 0.4 }}
            style={{ zIndex: 1 }}
          />

          {/* Brand text */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              className="overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 2 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
                 <img
  src={vtlogo}
  alt="VirelaTech"
  
  className="h-8 sm:h-9 md:h-10 lg:h-11 w-auto object-contain 
  brightness-125 contrast-125 drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]"
/>
            </motion.div>

            {/* Light streak */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
              initial={{ width: 0, opacity: 0 }}
              animate={{
                width: phase >= 3 ? "120%" : 0,
                opacity: phase >= 3 ? 1 : 0,
              }}
              transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            />

            {/* Tagline */}
            <motion.p
              className="text-muted-foreground text-xs font-grotesk tracking-[0.5em] uppercase mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 2 ? 0.6 : 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Engineered for authority
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
