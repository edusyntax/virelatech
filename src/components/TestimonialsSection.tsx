import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    quote:
      "We had tried a couple of agencies before, but things always felt unclear. With Zendigitals, the approach was simple and transparent. Within a few weeks, we started getting consistent enquiries, which made a real difference for our business.",
    name: "Ravi Kumar",
    role: "Local Business Owner",
  },
  {
    quote:
      "What I liked most was that they didn’t overpromise. They clearly explained what would work and what wouldn’t. Our Google Ads campaigns are now more stable, and we’re consistently getting better quality leads.",
    name: "Sneha Reddy",
    role: "E-commerce Brand",
  },
  {
    quote:
      "Our social media was active, but it lacked direction. After working with them, the content became more structured, and engagement started improving steadily. It finally feels like we’re moving forward.",
    name: "Arjun Mehta",
    role: "Startup Founder",
  },
  {
    quote:
      "We approached them for a website redesign, and the changes were not just visual. They improved how users interact with the site, and we’ve seen a noticeable increase in enquiries since then.",
    name: "Priya Sharma",
    role: "Service Business",
  },
  {
    quote:
      "They took time to truly understand our business before suggesting anything. That stood out. The strategy is simple but effective, and we’re now seeing steady growth in leads month after month.",
    name: "Karthik Varma",
    role: "Real Estate Consultant",
  },
  {
    quote:
      "Communication has been smooth throughout. We always know what’s happening and why. The results didn’t come overnight, but they’ve been consistent, which is exactly what we were looking for.",
    name: "Anjali Verma",
    role: "D2C Brand",
  },
];

const TestimonialCard = ({ t, active }: any) => (
  <div
    className={`
      w-[340px]
      h-[300px]
      rounded-2xl
      p-6
      shadow-sm
      flex flex-col justify-between
      mx-3
      select-none
      transition-all duration-300

      ${
        active
          ? "border border-orange-500 shadow-[0_0_25px_rgba(255,106,61,0.35)]"
          : "border border-border opacity-80"
      }

      bg-card
    `}
  >
    <p className="text-foreground text-sm leading-relaxed">
      “{t.quote}”
    </p>

    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white text-sm font-semibold">
        {t.name.split(" ").map((n: string) => n[0]).join("")}
      </div>

      <div>
        <p className="text-sm font-semibold text-card-foreground">
          {t.name}
        </p>
        <p className="text-xs text-foreground">
          {t.role}
        </p>
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => {
  const [index, setIndex] = useState(0);
  const isHovered = useRef(false);

  const prev = () =>
    setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));

  const next = () =>
    setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  // ✅ Auto-scroll with pause on hover
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered.current) next();
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // ✅ Full 5-layer positioning
  const getPosition = (i: number) => {
    const prevIdx = (index - 1 + testimonials.length) % testimonials.length;
    const nextIdx = (index + 1) % testimonials.length;
    const farPrev = (index - 2 + testimonials.length) % testimonials.length;
    const farNext = (index + 2) % testimonials.length;

    if (i === index) return "center";
    if (i === prevIdx) return "left";
    if (i === nextIdx) return "right";
    if (i === farPrev) return "farLeft";
    if (i === farNext) return "farRight";
    return "hidden";
  };

  return (
    <section className="relative py-6 overflow-hidden">
      {/* ===== HEADING ===== */}
      <div className="site-container">
        <ScrollReveal>
          <p className="text-xs tracking-[0.4em] uppercase text-accent mb-2">
            Strategic{" "}
            <span className="bg-[#FF6A3D] text-white px-2 py-2 rounded-md">
              Intelligence
            </span>
          </p>

          <h2 className="text-[clamp(2.4rem,3.5vw,3.2rem)] mb-1 leading-tight font-bold tracking-tight text-foreground max-w-2xl">
            Insights shaping digital{" "}
            <span className="font-serif text-gradient-accent">
              authority
            </span>
          </h2>
        </ScrollReveal>
      </div>

      {/* ===== CAROUSEL ===== */}
      <div
        className="relative site-container flex flex-col items-center justify-center mt-10"
        onMouseEnter={() => (isHovered.current = true)}
        onMouseLeave={() => (isHovered.current = false)}
      >
        <div className="relative h-[280px] w-full max-w-5xl flex items-center justify-center">
          {testimonials.map((t, i) => {
            const position = getPosition(i);

            return (
              <motion.div
                key={i}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, info) => {
                  if (info.offset.x > 80) prev();
                  if (info.offset.x < -80) next();
                }}
                className="absolute cursor-grab active:cursor-grabbing"
                animate={{
                  x:
                    position === "center"
                      ? 0
                      : position === "left"
                      ? -220
                      : position === "right"
                      ? 220
                      : position === "farLeft"
                      ? -380
                      : position === "farRight"
                      ? 380
                      : 0,

                  scale:
                    position === "center"
                      ? 1
                      : position === "left" || position === "right"
                      ? 0.92
                      : 0.82,

                  opacity:
                    position === "center"
                      ? 1
                      : position === "left" || position === "right"
                      ? 0.6
                      : 0.25,

                  zIndex:
                    position === "center"
                      ? 5
                      : position === "left" || position === "right"
                      ? 4
                      : 3,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 25,
                }}
              >
                <TestimonialCard t={t} active={position === "center"} />
              </motion.div>
            );
          })}
        </div>

        {/* ===== CONTROLS ===== */}
        <div className="flex items-center gap-4 mt-10">
          <button
            onClick={prev}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground"
          >
            ←
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i === index ? "bg-foreground" : "bg-muted"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

// import { useRef, useState } from "react";
// import { motion, useAnimationFrame } from "framer-motion";

// const testimonials = [
//   {
//     name: "Ravi Kumar",
//     role: "Local Business Owner",
//     image: "https://i.pravatar.cc/400?img=12",
//     quote: `"We had tried a couple of agencies before, but things always felt unclear. With VirelaTechs, the approach was simple and transparent. Within a few weeks, we started getting consistent enquiries. That made a big difference for us."`,
//     metric: "380%",
//     metricLabel: "Growth in Meetings Booked",
//   },
//   {
//     name: "Sneha Reddy",
//     role: "E-commerce Brand",
//     image: "https://i.pravatar.cc/400?img=13",
//     quote: "What I liked most was that they didn’t overpromise. They explained what would work and what wouldn’t. Our Google Ads campaigns are now much more stable, and we’re seeing better quality leads.",
//     metric: "210%",
//     metricLabel: "Increase in ROI",
//   },
//   {
//     name: "Arjun Mehta",
//     role: "Startup Founder",
//     image: "https://i.pravatar.cc/400?img=14",
//     quote: "Our social media was active, but it didn’t feel like it was doing anything. After working with them, the content started looking more structured, and engagement improved gradually. It finally feels like we’re moving in the right direction.",
//     metric: "150%",
//     metricLabel: "Lead Growth",
//   },
//   {
//     name: "Priya Sharma",
//     role: "Service Business",
//     image: "https://i.pravatar.cc/400?img=11",
//     quote: "We approached them for a website redesign. The changes were not just visual—they improved how users interact with the site. We’ve seen more enquiries coming through since the update.",
//     metric: "300%",
//     metricLabel: "Revenue Growth",
//   },
//     {
//     name: "Karthik Varma",
//     role: "Real Estate Consultant",
//     image: "https://i.pravatar.cc/400?img=8",
//     quote: "They took time to understand our business before suggesting anything. That stood out. The strategy they implemented is simple but effective, and we’re seeing steady growth in leads.",
//     metric: "300%",
//     metricLabel: "Revenue Growth",
//   },
// ];

// export default function TestimonialsShowcase() {
//   const [active, setActive] = useState(0);

//   const marqueeRef = useRef<HTMLDivElement>(null);
//   const x = useRef(0);

//   const speed = 40; // px/sec
//   const ITEM_WIDTH = 180; // avatar item width (important for sync)

//   // 🔥 MARQUEE LOOP + ACTIVE SYNC
//   useAnimationFrame((_, delta) => {
//     if (!marqueeRef.current) return;

//     x.current -= (speed * delta) / 1000;

//     const totalWidth = marqueeRef.current.scrollWidth / 2;

//     // seamless loop reset
//     if (Math.abs(x.current) >= totalWidth) {
//       x.current = 0;
//     }

//     marqueeRef.current.style.transform = `translateX(${x.current}px)`;

//     // 🔥 sync active index with scroll position
//     const index =
//       Math.abs(Math.floor(Math.abs(x.current) / ITEM_WIDTH)) %
//       testimonials.length;

//     setActive(index);
//   });

//   const t = testimonials[active];

//   return (
//     <section className="py-12">

//       {/* ===== MAIN CARD ===== */}
//       <div className="site-container">
        
//           <p className="text-xs tracking-[0.4em] uppercase text-accent mb-2">
//             Strategic{" "}
//             <span className="bg-[#FF6A3D] text-white px-2 py-2 rounded-md">
//               Intelligence
//             </span>
//           </p>

//           <h2 className="text-[clamp(2.4rem,3.5vw,3.2rem)] mb-1 leading-tight font-bold tracking-tight text-foreground max-w-2xl">
//             Insights shaping digital{" "}
//             <span className="font-serif text-gradient-accent">authority</span>
//           </h2>
        
//         <div className="bg-[#071022] border border-border rounded-2xl p-8 flex flex-col lg:flex-row gap-8 items-center overflow-hidden">

//           {/* LEFT CONTENT */}
//           <div className="flex-1">
//             <motion.div
//               key={active}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4 }}
//             >
//               <div className="text-[#FF8A00] text-6xl mb-4">“</div>

//               <p className="text-white text-md max-w-xl">
//                 {t.quote}
//               </p>

//               <div className="mt-8">
//                 <h3 className="text-4xl font-bold text-[#FF8A00]">
//                   {t.metric}
//                 </h3>
//                 <p className="text-sm text-muted-foreground">
//                   {t.metricLabel}
//                 </p>
//               </div>
//             </motion.div>
//           </div>

//           {/* RIGHT IMAGE */}
//           <motion.div
//             key={active}
//             className="relative w-[260px] h-[320px] rounded-2xl overflow-hidden border border-border flex-shrink-0"
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//           >
//             <img
//               src={t.image}
//               className="w-full h-full object-cover"
//               alt={t.name}
//             />

//             {/* FIXED OVERLAY */}
//             <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
//               <p className="text-[#FF8A00] font-bold text-2xl ">{t.name}</p>
//               <p className="text-xs text-white">
//                 {t.role}
//               </p>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* ===== MARQUEE ===== */}
//       <div className="site-container mt-10">
//         <div className="overflow-hidden">
//           <div
//             ref={marqueeRef}
//             className="flex gap-6 w-max"
//             style={{ willChange: "transform" }}
//           >
//             {[...testimonials, ...testimonials].map((item, i) => {
//               const isActive = i % testimonials.length === active;

//               return (
//                 <div
//                   key={i}
//                   className={`flex items-center gap-3 px-4 py-2 rounded-full border transition whitespace-nowrap ${isActive
//                       ? "border-[#FF8A00] bg-[#FF8A00]/10"
//                       : "border-border"
//                     }`}
//                   style={{ minWidth: ITEM_WIDTH }}
//                 >
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className={`w-10 h-10 rounded-full ${isActive ? "ring-2 ring-[#FF8A00]" : ""
//                       }`}
//                   />
//                   <div>
//                     <p className="text-sm">{item.name}</p>
//                     <p className="text-xs text-muted-foreground">
//                       {item.role}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }