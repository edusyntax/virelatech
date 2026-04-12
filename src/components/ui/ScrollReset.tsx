import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getLenis } from "@/components/SmoothScroll";

const ScrollReset = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Double rAF — waits for paint + Lenis to be ready
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const lenis = getLenis();
        if (lenis) {
          lenis.stop();
          lenis.scrollTo(0, { immediate: true });
          lenis.start();
        } else {
          window.scrollTo({ top: 0, behavior: "instant" });
        }
      });
    });

    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
};

export default ScrollReset;