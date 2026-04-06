import { useState } from "react";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import ScrollReveal from "./ScrollReveal";
import LeadCaptureModal from "./LeadCaptureModal";

interface UrgencyCTAProps {
  headline?: string;
  headlineAccent?: string;
  description?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  urgencyNote?: string;
  variant?: "full" | "inline";
  sourcePage?: string;
  serviceInterest?: string;
}

const UrgencyCTA = ({
  headline = "Ready to accelerate",
  headlineAccent = "growth?",
  description = "Limited strategy slots available this month. Book your free consultation before they fill up.",
  primaryCTA = "Get Your Free Marketing Audit",
  secondaryCTA = "Book a Free Strategy Call",
  urgencyNote = "Only 3 strategy slots remaining this month",
  variant = "full",
  sourcePage = "Unknown",
  serviceInterest,
}: UrgencyCTAProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLabel, setModalLabel] = useState("");

  const openModal = (label: string) => {
    setModalLabel(label);
    setModalOpen(true);
  };

  const handleChatClick = () => {
    window.open(
      "https://wa.me/919753456333?text=Hi%20I%20want%20to%20know%20more%20about%20your%20services",
      "_blank"
    );
  };

  if (variant === "inline") {
    return (
      <>
        <div className="relative py-16 site-container">
          <div className="glass rounded-2xl p-8 md:p-12 border border-foreground/[0.1] relative overflow-hidden text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] via-transparent to-transparent pointer-events-none rounded-2xl" />
            <div className="relative z-10">
              <ScrollReveal>

                {/* ORANGE URGENCY */}
                <p className="text-[#FF6A3D] font-grotesk text-xs uppercase tracking-[0.3em] mb-4 flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A3D] animate-pulse" />
                  {urgencyNote}
                </p>

                <h3 className="editorial-heading text-[clamp(1.5rem,3vw,2.5rem)] text-foreground mb-4">
                  {headline}{" "}
                  <span className="font-serif italic text-gradient-accent">{headlineAccent}</span>
                </h3>

                <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto mb-8">
                  {description}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <MagneticButton
                    className="bg-accent text-accent-foreground rounded-full text-sm font-medium glow h-[48px] md:h-[52px] px-7 min-w-[180px] flex items-center justify-center"
                    onClick={() => openModal(primaryCTA)}
                  >
                    {primaryCTA}
                  </MagneticButton>
                </div>

              </ScrollReveal>
            </div>
          </div>
        </div>

        <LeadCaptureModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          sourcePage={sourcePage}
          sourceLabel={modalLabel || primaryCTA}
          serviceInterest={serviceInterest}
        />
      </>
    );
  }

  return (
    <>
      <section className="relative py-24 site-container overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[160px] animate-glow-pulse pointer-events-none" />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <ScrollReveal>

            {/* ORANGE URGENCY */}
            <motion.p
              className="text-[#FF6A3D] font-grotesk text-xs uppercase tracking-[0.3em] mb-6 flex items-center justify-center gap-2"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A3D] animate-pulse" />
              {urgencyNote}
            </motion.p>

          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="editorial-heading text-[clamp(2rem,5vw,4.5rem)] text-foreground mb-6 leading-[1.05]">
              {headline}{" "}
              <span className="font-serif italic text-gradient-accent">{headlineAccent}</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-muted-foreground text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              {description}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">

              <MagneticButton
                className="bg-accent text-accent-foreground rounded-full text-sm sm:text-base font-medium glow w-full sm:w-auto h-[48px] md:h-[52px] px-7 min-w-[180px] flex items-center justify-center"
                onClick={() => openModal(primaryCTA)}
              >
                {primaryCTA}
              </MagneticButton>

              <MagneticButton
                className="glass rounded-full hover:bg-orange-500  text-base font-medium px-8 h-[54px] w-full sm:w-auto flex items-center justify-center"
                onClick={handleChatClick}
              >
                Chat with us
              </MagneticButton>

            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <p className="text-muted-foreground/50 text-xs mt-6">
              Free consultation · No commitment required · Response within 24 hours
            </p>
          </ScrollReveal>
        </div>
      </section>

      <LeadCaptureModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        sourcePage={sourcePage}
        sourceLabel={modalLabel || primaryCTA}
        serviceInterest={serviceInterest}
      />
    </>
  );
};

export default UrgencyCTA;