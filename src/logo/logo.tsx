import { useEffect, useRef } from "react";

interface Props {
  className?: string;
}

export function VTLogo({ className = "" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    fetch("/vt-logo.svg")
      .then((r) => r.text())
      .then((raw) => {
        container.innerHTML = raw;

        const svg = container.querySelector("svg");
        if (!svg) return;

        svg.removeAttribute("width");
        svg.removeAttribute("height");
        svg.removeAttribute("style");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.style.overflow = "visible";

        // ── SVG filter defs for two glow intensities ─────────────────────
        const defs = svg.querySelector("defs")!;

        // Low glow
        const fLo = document.createElementNS("http://www.w3.org/2000/svg", "filter");
        fLo.setAttribute("id", "vt-glow-lo");
        fLo.setAttribute("x", "-20%");
        fLo.setAttribute("y", "-20%");
        fLo.setAttribute("width", "140%");
        fLo.setAttribute("height", "140%");
        fLo.innerHTML = `
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        `;
        defs.appendChild(fLo);

        // High glow — toned down for light mode compatibility
        const fHi = document.createElementNS("http://www.w3.org/2000/svg", "filter");
        fHi.setAttribute("id", "vt-glow-hi");
        fHi.setAttribute("x", "-30%");
        fHi.setAttribute("y", "-30%");
        fHi.setAttribute("width", "160%");
        fHi.setAttribute("height", "160%");
        fHi.innerHTML = `
          <feGaussianBlur stdDeviation="12" result="blur"/>
          <feColorMatrix
            in="blur"
            type="matrix"
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 1.2 0"
          />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        `;
        defs.appendChild(fHi);

        // ── Inject animation CSS ─────────────────────────────────────────
        const styleEl = document.createElementNS("http://www.w3.org/2000/svg", "style");
        styleEl.textContent = `
          /* ── ONE-TIME: stroke draw-on ── */
          .vt-stroke {
            stroke-dasharray: 2200;
            stroke-dashoffset: 2200;
            fill: none !important;
            animation: vt-draw 1.4s cubic-bezier(0.4,0,0.2,1) forwards;
          }
          .vt-s0 { animation-delay: 0.1s; }
          .vt-s1 { animation-delay: 0.4s; }
          .vt-s2 { animation-delay: 0.7s; }
          @keyframes vt-draw { to { stroke-dashoffset: 0; } }

          /* ── ONE-TIME: fill fade-in ── */
          .vt-fill {
            opacity: 0;
            animation: vt-fade 0.5s ease forwards;
          }
          .vt-f0 { animation-delay: 1.1s; }
          .vt-f1 { animation-delay: 1.25s; }
          .vt-f2 { animation-delay: 1.4s; }
          @keyframes vt-fade { to { opacity: 1; } }

          /* ── CONTINUOUS: two thick chasers per path ── */
          .vt-chaser {
            fill: none !important;
            stroke-linecap: round;
            stroke-width: 40;
            stroke-dasharray: 500 1700;
            animation: vt-chase 2.4s ease-in-out infinite;
          }
          .vt-c0a { animation-delay: 1.6s; }
          .vt-c1a { animation-delay: 2.4s; }
          .vt-c2a { animation-delay: 3.2s; }
          .vt-c0b { animation-delay: 2.8s; }
          .vt-c1b { animation-delay: 3.6s; }
          .vt-c2b { animation-delay: 4.4s; }
          @keyframes vt-chase {
            0%   { stroke-dashoffset: 2200; opacity: 0;   }
            8%   { opacity: 1; }
            90%  { opacity: 1; }
            100% { stroke-dashoffset: 0;    opacity: 0.2; }
          }

          /* ── TEXT: letter drop-in once ── */
          @keyframes vt-letter-drop {
            from { opacity: 0; transform: translateY(-18px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          /* ── TEXT: continuous travelling glow per letter ── */
          @keyframes vt-letter-glow {
            0%, 100% { opacity: 0.85; filter: url(#vt-glow-lo); }
            50%       { opacity: 1;   filter: url(#vt-glow-hi); }
          }

          .vt-lg {
            opacity: 0;
            fill: var(--foreground);
            paint-order: stroke fill;
            stroke: rgba(128, 128, 128, 0.15);
            stroke-width: 0.8px;
            animation:
              vt-letter-drop  0.45s cubic-bezier(0.34,1.56,0.64,1) forwards,
              vt-letter-glow  3s  ease-in-out                       infinite;
          }

          /* drop-in delay | glow loop delay (staggered per letter) */
          .vt-lg-0  { animation-delay: 1.60s, 2.40s; }
          .vt-lg-1  { animation-delay: 1.67s, 2.62s; }
          .vt-lg-2  { animation-delay: 1.74s, 2.84s; }
          .vt-lg-3  { animation-delay: 1.81s, 3.06s; }
          .vt-lg-4  { animation-delay: 1.88s, 3.28s; }
          .vt-lg-5  { animation-delay: 1.95s, 3.50s; }
          .vt-lg-6  { animation-delay: 2.02s, 3.72s; }
          .vt-lg-7  { animation-delay: 2.09s, 3.94s; }
          .vt-lg-8  { animation-delay: 2.16s, 4.16s; }
          .vt-lg-9  { animation-delay: 2.23s, 4.38s; }
        `;
        defs.appendChild(styleEl);

        // ── Build animated mark ──────────────────────────────────────────
        const paths = Array.from(
          svg.querySelectorAll<SVGPathElement>("#_2362010400272 > g > path")
        );

        if (paths.length === 3) {
          const gradients = ["url(#id3)", "url(#id0)", "url(#id2)"];
          const markGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");

          // Layer 1 — draw-on strokes
          paths.forEach((p, i) => {
            const clone = p.cloneNode(true) as SVGPathElement;
            clone.setAttribute("class", `vt-stroke vt-s${i}`);
            clone.setAttribute("stroke", gradients[i]);
            clone.setAttribute("stroke-width", "6");
            markGroup.appendChild(clone);
          });

          // Layer 2 — fills fade in
          paths.forEach((p, i) => {
            const clone = p.cloneNode(true) as SVGPathElement;
            clone.setAttribute("class", `vt-fill vt-f${i}`);
            markGroup.appendChild(clone);
          });

          // Layer 3 — two chasers per path
          paths.forEach((p, i) => {
            ["a", "b"].forEach((s) => {
              const clone = p.cloneNode(true) as SVGPathElement;
              clone.setAttribute("class", `vt-chaser vt-c${i}${s}`);
              clone.setAttribute("stroke", gradients[i]);
              markGroup.appendChild(clone);
            });
          });

          const parentG = paths[0].parentElement!;
          paths.forEach((p) => p.remove());
          parentG.insertBefore(markGroup, parentG.firstChild);
        }

        // ── Build letter-by-letter text with travelling glow ─────────────
        const textEl = svg.querySelector<SVGTextElement>("#_2362010400272 > text");
        if (!textEl) return;

        const word = "Virelatech";
        const x0   = parseFloat(textEl.getAttribute("x") || "1034");
        const y0   = textEl.getAttribute("y") || "653";
        const fs   = 583.334;

        // horiz-adv-x values from the embedded font
        const advMap: Record<string, number> = {
          V: 693, i: 242, r: 362, e: 494, l: 242,
          a: 470, t: 270, c: 453, h: 535,
        };

        textEl.textContent = "";

        let cursorX = x0;
        word.split("").forEach((char, idx) => {
          const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
          tspan.setAttribute("x", String(cursorX));
          tspan.setAttribute("y", y0);
          tspan.textContent = char;
          tspan.setAttribute("class", `vt-lg vt-lg-${idx}`);
          textEl.appendChild(tspan);
          cursorX += ((advMap[char] ?? 400) / 827) * fs;
        });
      })
      .catch(console.error);
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ display: "flex", alignItems: "center" }}
      aria-label="Virelatech"
    />
  );
}