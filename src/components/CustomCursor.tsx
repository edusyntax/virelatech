import { useEffect, useRef } from "react";

// ─── Helpers ──────────────────────────────────────────────
const COLORS_LIGHT = ["#93c5fd","#a5b4fc","#c4b5fd","#e0e7ff","#dbeafe","#ffffff","#f0f9ff"];
const COLORS_DARK  = ["#bfdbfe","#c7d2fe","#ddd6fe","#e0e7ff","#ffffff","#e0f2fe","#f0abfc"];

function pickColor(dark: boolean) {
  const pal = dark ? COLORS_DARK : COLORS_LIGHT;
  return pal[Math.floor(Math.random() * pal.length)];
}

function drawFlake(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) {
  ctx.strokeStyle = color;
  ctx.lineCap = "round";
  for (let i = 0; i < 6; i++) {
    const ang = (Math.PI * 2 / 6) * i;
    const ex  = Math.cos(ang) * size;
    const ey  = Math.sin(ang) * size;
    ctx.lineWidth = Math.max(0.4, size * 0.22);
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(ex, ey); ctx.stroke();
    const mid = { x: Math.cos(ang) * size * 0.45, y: Math.sin(ang) * size * 0.45 };
    const b1  = {
      x: mid.x + Math.cos(ang + Math.PI / 3) * size * 0.28,
      y: mid.y + Math.sin(ang + Math.PI / 3) * size * 0.28,
    };
    const b2  = {
      x: mid.x + Math.cos(ang - Math.PI / 3) * size * 0.28,
      y: mid.y + Math.sin(ang - Math.PI / 3) * size * 0.28,
    };
    ctx.lineWidth = Math.max(0.3, size * 0.15);
    ctx.beginPath(); ctx.moveTo(mid.x, mid.y); ctx.lineTo(b1.x, b1.y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(mid.x, mid.y); ctx.lineTo(b2.x, b2.y); ctx.stroke();
  }
  ctx.beginPath(); ctx.arc(x, y, size * 0.18, 0, Math.PI * 2);
  ctx.fillStyle = color; ctx.fill();
}

function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, glow: boolean) {
  if (glow) { ctx.shadowBlur = 8; ctx.shadowColor = color; }
  ctx.fillStyle = color;
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const ang = (Math.PI / 4) * i - Math.PI / 2;
    const r   = i % 2 === 0 ? size : size * 0.38;
    i === 0
      ? ctx.moveTo(x + Math.cos(ang) * r, y + Math.sin(ang) * r)
      : ctx.lineTo(x + Math.cos(ang) * r, y + Math.sin(ang) * r);
  }
  ctx.closePath(); ctx.fill();
  ctx.shadowBlur = 0;
}

// ─── Particle classes ─────────────────────────────────────
class Snowflake {
  x: number; y: number;
  vx: number; vy: number;
  size: number; life = 1;
  decay: number; spin: number; spinSpeed: number;
  color: string; type: "flake" | "star";
  twinkle: number; twinkleSpeed: number; glow: boolean;
  gravity = 0.04;

  constructor(x: number, y: number, dark: boolean) {
    this.x = x; this.y = y;
    this.vx         = (Math.random() - 0.5) * 1.8;
    this.vy         = -(Math.random() * 2 + 1.5);
    this.size       = Math.random() * 5 + 1.5;
    this.decay      = Math.random() * 0.014 + 0.008;
    this.spin       = Math.random() * Math.PI * 2;
    this.spinSpeed  = (Math.random() - 0.5) * 0.06;
    this.color      = pickColor(dark);
    this.type       = Math.random() < 0.55 ? "flake" : "star";
    this.twinkle    = Math.random() * Math.PI * 2;
    this.twinkleSpeed = Math.random() * 0.1 + 0.05;
    this.glow       = Math.random() < 0.3;
  }

  update() {
    this.vy += this.gravity;
    this.vx *= 0.99;
    this.x  += this.vx; this.y += this.vy;
    this.spin    += this.spinSpeed;
    this.twinkle += this.twinkleSpeed;
    this.life    -= this.decay;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const a = Math.max(0, this.life * (0.7 + Math.sin(this.twinkle) * 0.3));
    ctx.save();
    ctx.globalAlpha = a;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.spin);
    if (this.type === "flake") drawFlake(ctx, 0, 0, this.size, this.color);
    else drawStar(ctx, 0, 0, this.size, this.color, this.glow);
    ctx.restore();
  }
}

class Dust {
  x: number; y: number;
  vx: number; vy: number;
  r: number; life = 1; decay: number;
  color: string; glow: boolean;
  gravity = 0.02;

  constructor(x: number, y: number, dark: boolean) {
    this.x = x; this.y = y;
    this.vx    = (Math.random() - 0.5) * 1.2;
    this.vy    = -(Math.random() * 1.5 + 0.5);
    this.r     = Math.random() * 1.8 + 0.3;
    this.decay = Math.random() * 0.02 + 0.012;
    this.color = pickColor(dark);
    this.glow  = Math.random() < 0.5;
  }

  update() {
    this.vy += this.gravity;
    this.x  += this.vx; this.y += this.vy;
    this.vx *= 0.98;
    this.life -= this.decay;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.life * 0.85);
    if (this.glow) { ctx.shadowBlur = 6; ctx.shadowColor = this.color; }
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();
  }
}

interface AmbientFlake {
  x: number; y: number; size: number;
  speed: number; drift: number;
  wobble: number; wobbleSpeed: number;
  spin: number; spinSpeed: number;
  opacity: number; color: string;
  type: "flake" | "star";
}

function makeAmbient(dark: boolean, w: number, h: number): AmbientFlake {
  return {
    x:           Math.random() * w,
    y:           Math.random() * h,
    size:        Math.random() * 3 + 0.5,
    speed:       Math.random() * 0.3 + 0.05,
    drift:       (Math.random() - 0.5) * 0.3,
    wobble:      Math.random() * Math.PI * 2,
    wobbleSpeed: Math.random() * 0.02 + 0.005,
    spin:        Math.random() * Math.PI * 2,
    spinSpeed:   (Math.random() - 0.5) * 0.015,
    opacity:     Math.random() * 0.35 + 0.1,
    color:       pickColor(dark),
    type:        Math.random() < 0.4 ? "flake" : "star",
  };
}

// ─── Component ────────────────────────────────────────────
interface SnowflakeCursorProps {
  /** Number of ambient background flakes always drifting */
  ambientCount?: number;
}

const SnowflakeCursor = ({ ambientCount = 32 }: SnowflakeCursorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef    = useRef<SVGSVGElement>(null);
  const raf       = useRef(0);

  useEffect(() => {
    const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (touch || window.innerWidth < 768) return;

    const canvas  = canvasRef.current!;
    const ctx     = canvas.getContext("2d")!;
    const isDark  = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Ambient drifters
    let ambient: AmbientFlake[] = Array.from(
      { length: ambientCount },
      () => makeAmbient(isDark, canvas.width, canvas.height)
    );

    let flakes: Snowflake[] = [];
    let dust:   Dust[]      = [];

    const spawn = (x: number, y: number) => {
      if (Math.random() < 0.45) flakes.push(new Snowflake(x, y, isDark));
      if (Math.random() < 0.6)  dust.push(new Dust(x, y, isDark));
      if (Math.random() < 0.15) {
        dust.push(new Dust(x, y, isDark));
        dust.push(new Dust(x, y, isDark));
      }
    };

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ambient flakes
      for (const a of ambient) {
        a.wobble += a.wobbleSpeed;
        a.spin   += a.spinSpeed;
        a.y      += a.speed;
        a.x      += a.drift;
        if (a.y > canvas.height + 10) { a.y = -10; a.x = Math.random() * canvas.width; }
        if (a.x < -10) a.x = canvas.width + 10;
        if (a.x > canvas.width + 10) a.x = -10;

        ctx.save();
        ctx.globalAlpha = a.opacity * (0.6 + Math.sin(a.wobble) * 0.4);
        ctx.translate(a.x, a.y); ctx.rotate(a.spin);
        if (a.type === "flake") drawFlake(ctx, 0, 0, a.size, a.color);
        else drawStar(ctx, 0, 0, a.size, a.color, false);
        ctx.restore();
      }

      flakes = flakes.filter(f => f.life > 0.01);
      dust   = dust.filter(d => d.life > 0.01);
      for (const f of flakes) { f.update(); f.draw(ctx); }
      for (const d of dust)   { d.update(); d.draw(ctx); }

      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    // Events
    const onMove = (e: MouseEvent) => {
      const dot = dotRef.current;
      if (dot) {
        dot.style.left    = `${e.clientX}px`;
        dot.style.top     = `${e.clientY}px`;
        dot.style.opacity = "1";
      }
      spawn(e.clientX, e.clientY);
    };
    const onLeave = () => { if (dotRef.current) dotRef.current.style.opacity = "0"; };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [ambientCount]);

  return (
    <>
      {/* Full-page canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed", inset: 0,
          pointerEvents: "none", zIndex: 9990,
          width: "100%", height: "100%",
        }}
      />

      {/* Snowflake cursor icon */}
      <svg
        ref={dotRef}
        width="20" height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "fixed", top: 0, left: 0,
          pointerEvents: "none", zIndex: 9999,
          transform: "translate(-50%, -50%)",
          opacity: 0,
          transition: "opacity .25s",
          filter: "drop-shadow(0 0 4px rgba(147,197,253,0.8))",
        }}
      >
        {/* 6 main arms */}
        {Array.from({ length: 6 }).map((_, i) => {
          const ang = (Math.PI * 2 / 6) * i - Math.PI / 2;
          const x2  = 10 + Math.cos(ang) * 8;
          const y2  = 10 + Math.sin(ang) * 8;
          // branch angles
          const bAng1 = ang + Math.PI / 3;
          const bAng2 = ang - Math.PI / 3;
          const mx = 10 + Math.cos(ang) * 4.5;
          const my = 10 + Math.sin(ang) * 4.5;
          return (
            <g key={i}>
              <line x1="10" y1="10" x2={x2} y2={y2} stroke="orange" strokeWidth="2"  strokeLinecap="round" />
              <line x1={mx} y1={my} x2={mx + Math.cos(bAng1)*2.8} y2={my + Math.sin(bAng1)*2.8} stroke="orange" strokeWidth="0.9" strokeLinecap="round" />
              <line x1={mx} y1={my} x2={mx + Math.cos(bAng2)*2.8} y2={my + Math.sin(bAng2)*2.8} stroke="blue" strokeWidth="1.2" strokeLinecap="round" />
            </g>
          );
        })}
        <circle cx="10" cy="10" r="1.5" fill="orange" />
      </svg>
    </>
  );
};

export default SnowflakeCursor;