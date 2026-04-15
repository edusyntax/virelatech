// ─── SmoothScroll.tsx — FULL REPLACEMENT ─────────────────────────────────────
import { useEffect, useRef } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;
export const getLenis = () => lenisInstance;

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // ✅ GUARD 1: Reduced motion — skip entirely
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // ✅ GUARD 2: Touch device — skip Lenis entirely.
    // This is THE primary cause of the "needs 2 swipes" bug.
    // Lenis intercepts touchstart/touchmove non-passively.
    // The browser holds the first swipe waiting to see if JS
    // calls preventDefault() — then gives up and scrolls on swipe 2.
    // Native iOS/Android scroll is already smooth — Lenis adds nothing.
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      lenisInstance = null;
      return;
    }

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    lenisInstance = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;