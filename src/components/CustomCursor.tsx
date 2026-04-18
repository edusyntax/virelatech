import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const ringPos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });

  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(true);

  const raf = useRef(0);

  // Disable on mobile
  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768) {
      setEnabled(false);
    }
  }, []);

  // Mouse tracking
  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [enabled, visible]);

  // Animation loop
  useEffect(() => {
    if (!enabled) return;

    const loop = () => {
      // 🟠 Large ring (slow)
      ringPos.current.x += (target.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (target.current.y - ringPos.current.y) * 0.12;

      // ⚪ Small dot (fast)
      dotPos.current.x += (target.current.x - dotPos.current.x) * 0.35;
      dotPos.current.y += (target.current.y - dotPos.current.y) * 0.35;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x}px, ${dotPos.current.y}px) translate(-50%, -50%)`;
      }

      raf.current = requestAnimationFrame(loop);
    };

    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* 🔵 Large transparent ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: 40,
          height: 40,
          // background:"orange",
          border: "2.1px solid rgba(255,255,255,0.6)", // subtle white
          borderRadius: "50%",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      />

      {/* ⚪ Small dot */}
     <div
  ref={dotRef}
  className="fixed top-0 left-0 z-[9999] pointer-events-none"
  style={{
    width: 14, // slightly bigger than dot
    height: 14,
    border: "1.9px solid rgba(255,255,255,0.8)", // ring instead of fill
    borderRadius: "50%",
    opacity: visible ? 1 : 0,
    transition: "opacity 0.2s ease",
  }}
/>
    </>
  );
};

export default CustomCursor;