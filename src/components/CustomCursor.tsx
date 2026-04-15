import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const ringPos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });

const [hover, setHover] = useState<"none" | "link" | "cta" | "text">("none");
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(true);

  const raf = useRef(0);

  // Disable on mobile/touch
  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768) {
      setEnabled(false);
    }
  }, []);

  // Track mouse movement
  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [enabled, visible]);

  // Smooth follow animation
  useEffect(() => {
    if (!enabled) return;

    const loop = () => {
      ringPos.current.x += (target.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (target.current.y - ringPos.current.y) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      }

      raf.current = requestAnimationFrame(loop);
    };

    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, [enabled]);

  // Hover detection
  useEffect(() => {
    if (!enabled) return;

    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement;

      if (el.closest("[data-cursor-cta], .glow")) setHover("cta");
      else if (el.closest("a, button, [data-hover], input, textarea, select")) setHover("link");
      else if (el.closest("p, span, h1, h2, h3, h4, h5, h6")) setHover("text"); 
  
    };

    const out = (e: MouseEvent) => {
      const el = e.target as HTMLElement;

      if (el.closest("[data-cursor-cta], .glow, a, button, [data-hover], input, textarea, select, p, span, h1, h2, h3, h4, h5, h6")) {
        setHover("none");
      }
    };

    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);

    return () => {
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
    };
  }, [enabled]);

  if (!enabled) return null;

  // Dynamic sizing
  const size = hover === "cta" ? 20 : hover === "link" ? 48 : hover === "text"? 50 : 38;

  // Increased brightness levels
  const opacity = hover === "cta" ? 2.9 : hover === "link" ? 0.45 : hover === "text"? 0.18: 0.28;

  return (
    <div
      ref={ringRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.25s ease",
      }}
    >
      <div
        className="rounded-full "
        style={{
          width: size,
          height: size,

          // 🔶 Orange border (strong)
          border: `3px solid rgba(255, 106, 91, ${Math.min(opacity * 8, 0.9)})`,

        
   background:
  hover === "link" || hover === "text"
    ? `radial-gradient(circle,
        rgba(59,130,246,0.25) 15%,
        rgba(59,130,246,0.12) 40%,
        transparent 70%)`
    : `radial-gradient(circle,
        rgba(69,150,246,${opacity * 1.8}) 10%,
        rgba(59,150,246,0.4) 50%,
        transparent 65%)`,

    
  boxShadow:
  hover === "cta"
    ? `
      0 0 15px rgba(255,106,61,0.8),
      0 0 30px rgba(255,106,61,0.4)
    `
    : hover === "link" || hover === "text"
    ? `
      0 0 12px rgba(59,130,246,0.6),
      0 0 25px rgba(59,130,246,0.25)
    `
    : `
      0 0 5px rgba(59,130,246,0.6),
      0 0 4px rgba(255,106,61,0.4)
    `,
    

          transition:
            "width 0.3s ease, height 0.3s ease, border 0.3s ease, background 0.3s ease, box-shadow 0.3s ease",
        }}
      />
    </div>
  );
};

export default CustomCursor;