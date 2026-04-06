import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaChartLine,FaIdBadge, FaSearch, FaRobot } from "react-icons/fa";


import MagneticButton from "./MagneticButton";
import { getLenis } from "./SmoothScroll";
import LeadCaptureModal from "./LeadCaptureModal";

import heroPoster from "@/assets/hero-object.jpg";
import { Medal } from "lucide-react";

const KEYWORDS = [
  "Performance Marketing",
  "SEO",
  "AI Automation",
  "Web Development",
  "Lead Generation",
];

const HERO_VIDEO = "https://assets.mixkit.co/videos/5744/5744-720.mp4";

const HeroSection = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const { scrollY } = useScroll();
  const yOffset = useTransform(scrollY, [0, 400], [0, -60]);




  const [typedText, setTypedText] = useState("");
const [isDeleting, setIsDeleting] = useState(false);

useEffect(() => {
  const currentWord = KEYWORDS[wordIndex];
  let typingSpeed = isDeleting ? 40 : 80;

  const timeout = setTimeout(() => {
    if (!isDeleting) {
      setTypedText(currentWord.substring(0, typedText.length + 1));

      if (typedText === currentWord) {
        setTimeout(() => setIsDeleting(true), 1200);
      }
    } else {
      setTypedText(currentWord.substring(0, typedText.length - 1));

      if (typedText === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % KEYWORDS.length);
      }
    }
  }, typingSpeed);

  return () => clearTimeout(timeout);
}, [typedText, isDeleting, wordIndex]);
  
const handleChatClick = () => {
  window.open(
    "https://wa.me/919753456333?text=Hi%20I%20want%20to%20know%20more%20about%20your%20services",
    "_blank"
  );
};


  return (
    <section className="relative min-h-[680px] md:min-h-screen flex items-center overflow-hidden pt-28 md:pt-32 pb-12">

      {/* Accent glow background */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-accent/20 blur-[160px] rounded-full z-0" />

      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          poster={heroPoster}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/45 to-black/50" />

        {/* vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,0.65))]" />
      </div>

      {/* Content */}
      <div className="relative z-10 site-container w-full">
        <motion.div style={{ y: yOffset }} className="max-w-5xl">

          {/* Overline */}
  <motion.p
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2, duration: 0.8 }}
  className="flex items-center gap-2 text-accent font-semibold text-[20px] text-sm uppercase tracking-[0.35em] mb-5 whitespace-nowrap"
>
  <Medal className="text-accent w-4 h-4 shrink-0" />
  Digital <span className="text-orange-500">Growth Partner</span>
</motion.p>
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            className="editorial-heading text-[clamp(2.4rem,3vw,4rem)] leading-[1.1] text-white max-w-[24ch]"
          >
            Empowering your Digital Growth with Expert AI Solutions



          </motion.h1>

          {/* Subtext */}
<p className="text-white/90 text-lg md:text-xl max-w-xl mt-6 leading-relaxed">
  We help startups and brands grow using {" "}
  <span className="bg-orange-500 p-1 rounded-sm font-semibold">
    {typedText}
    <span className="ml-1 inline-block w-[2px] h-5 bg-accent animate-pulse" />
  </span>
</p>

          {/* Feature icons */}
          <div className="flex flex-wrap gap-6 mt-7 text-white/90 text-sm">

            <span className="flex items-center gap-2">
              <FaChartLine className="text-accent" />
              Performance Marketing
            </span>

            <span className="flex items-center gap-2">
              <FaSearch className="text-accent" />
              SEO Growth
            </span>

            <span className="flex items-center gap-2">
              <FaRobot className="text-accent" />
              AI Automation
            </span>

          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-9 w-full items-stretch sm:items-start">

            <MagneticButton
              className="bg-accent text-accent-foreground rounded-full text-base font-medium glow px-8 h-[54px] w-full sm:w-auto flex items-center justify-center"
              onClick={() => setModalOpen(true)}
            >
              Get Free Strategy →
            </MagneticButton>

<MagneticButton
  className="
    glass rounded-full text-base font-medium px-8 h-[54px]
    w-full sm:w-auto flex items-center justify-center
    
    transition-all duration-300
   hover:text-white  hover:bg-accent
  "
  onClick={handleChatClick}
>
  Chat with us
</MagneticButton>
    
          </div>

        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-orange-500 font-semibold text-xs uppercase tracking-[0.2em]">
          Scroll
        </span>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-[2px] h-8 bg-gradient-to-b from-accent to-transparent"
        />
      </motion.div>

      {/* Modal */}
      <LeadCaptureModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        sourcePage="Homepage"
        sourceLabel="Hero CTA - Get Free Strategy"
      />

    </section>
  );
};

export default HeroSection;