import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

// ✅ FIXED: correct paths (NO /public)
const companies = [
  { name: "NVIDIA", src: "/logos/1.svg" },
  { name: "Stripe", src: "/logos/2.svg" },
  { name: "Vercel", src: "/logos/3.svg" },
  { name: "Linear", src: "/logos/4.svg" },
  { name: "Figma", src: "/logos/5.svg" },
  { name: "Notion", src: "/logos/6.svg" },
  { name: "Arc", src: "/logos/7.svg" },
  { name: "Supabase", src: "/logos/8.svg" },
  { name: "Datadog", src: "/logos/9.svg" },
  { name: "Loom", src: "/logos/10.svg" },
  { name: "Scale AI", src: "/logos/11.svg" },
  { name: "Ramp", src: "/logos/12.svg" },
];

// ✅ Logo Item (COLOR FIXED)
const LogoItem = ({
  logo,
}: {
  logo: { name: string; src: string };
}) => (
  <div className="flex items-center justify-center px-8 md:px-10 py-3 md:py-4 select-none">
    <img
      src={logo.src}
      alt={logo.name}
      className="
        h-6 md:h-8 lg:h-9
        object-contain
        opacity-80
        hover:opacity-100
        hover:scale-110
        transition-all duration-300
      "
    />
  </div>
);

// ✅ Main Component
const TrustStrip = () => {
  return (
    <section className="relative py-4 md:py-6 overflow-hidden">
      
      {/* Title */}
      <div className="site-container">
        <ScrollReveal>
          <p className="text-center text-foreground text-[0.7rem] md:text-xs font-grotesk font-semibold uppercase tracking-[0.3em] mb-8">
            Trusted by <span className="text-orange-500">industry leaders</span>
          </p>
        </ScrollReveal>
      </div>

      {/* Logo Strip */}
      <div className="relative group site-container">
        
        {/* Left Fade */}
        <div className="absolute left-0 top-0 bottom-0 z-10 w-16 md:w-24 bg-gradient-to-r from-background to-transparent pointer-events-none" />

        {/* Right Fade */}
        <div className="absolute right-0 top-0 bottom-0 z-10 w-16 md:w-24 bg-gradient-to-l from-background to-transparent pointer-events-none" />

        <div className="flex overflow-hidden group-hover:[&>div]:animation-play-state-paused">
          <motion.div
            className="flex shrink-0"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {[...companies, ...companies].map((logo, i) => (
              <LogoItem key={`${logo.name}-${i}`} logo={logo} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Divider */}
      <div className="site-container mt-10 md:mt-12">
        <div className="section-divider" />
      </div>
    </section>
  );
};

export default TrustStrip;