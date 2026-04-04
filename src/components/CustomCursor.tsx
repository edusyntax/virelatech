import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const ringPos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const [hover, setHover] = useState<"none" | "link" | "cta">("none");
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const raf = useRef(0);

  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768) {
      setEnabled(false);
    }
  }, []);

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

  useEffect(() => {
    if (!enabled) return;
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("[data-cursor-cta], .glow")) setHover("cta");
      else if (el.closest("a, button, [data-hover], input, textarea, select")) setHover("link");
    };
    const out = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("[data-cursor-cta], .glow, a, button, [data-hover], input, textarea, select")) setHover("none");
    };
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    return () => { window.removeEventListener("mouseover", over); window.removeEventListener("mouseout", out); };
  }, [enabled]);

  if (!enabled) return null;

  const size = hover === "cta" ? 44 : hover === "link" ? 36 : 28;
  const opacity = hover === "cta" ? 0.4 : hover === "link" ? 0.25 : 0.12;

  return (
    <div
      ref={ringRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.25s" }}
    >
      <div
        className="rounded-full"
        style={{
          width: size,
          height: size,
          border: `1px solid hsl(var(--accent) / ${opacity * 2})`,
          background: `radial-gradient(circle, hsl(var(--accent) / ${opacity}), transparent 70%)`,
          transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background 0.3s ease",
        }}
      />
    </div>
  );
};

export default CustomCursor;
