import { useState } from "react";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import ScrollReveal from "./ScrollReveal";
import { toast } from "sonner";
import { submitLead } from "@/lib/lead-utils";

const budgetRanges = [
  "$5k – $15k",
  "$15k – $50k",
  "$50k – $100k",
  "$100k+",
];

const FullscreenCTA = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    await submitLead({
      name: formData.name,
      email: formData.email,
      company: formData.company,
      message: formData.message,
      budget: formData.budget,
      source_page: "Homepage",
      source_label: "Start Project CTA",
    });
    setSubmitted(true);
    toast.success("Message sent. We'll be in touch within 24 hours.");
  };

  const floatingLabel = (field: string, label: string) => {
    const hasValue = formData[field as keyof typeof formData];
    const isActive = focused === field || hasValue;
    return (
      <span
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
          isActive
            ? "top-1.5 text-[10px] text-accent font-medium tracking-wider uppercase"
            : "top-1/2 -translate-y-1/2 text-sm text-muted-foreground/60"
        }`}
      >
        {label}
      </span>
    );
  };

  const inputClasses =
    "w-full bg-foreground/[0.04] border border-foreground/[0.1] rounded-lg px-4 pt-5 pb-2 text-sm text-foreground outline-none transition-all duration-300 focus:border-accent/50 focus:bg-foreground/[0.06] focus:shadow-[0_0_20px_-4px_hsl(var(--accent)/0.15)]";

  return (
    <section id="contact" className="relative py-16 md:py-20 site-container overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[160px] animate-glow-pulse" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/3 blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left — Authority headline */}
        <div>
          <ScrollReveal>
            <p className="text-accent font-grotesk text-xs uppercase tracking-[0.3em] mb-6">
              Ready to begin?
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="editorial-heading text-[clamp(2rem,5vw,4.5rem)] text-foreground mb-6 leading-[1.05]">
              Let's build something{" "}
              <span className="font-serif italic text-gradient-accent">
                extraordinary
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-lg leading-relaxed">
              We partner with visionary brands to create digital experiences
              that define categories and captivate audiences.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground/70">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent/80" />
                Response within 24 hours
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent/80" />
                Limited client intake
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent/80" />
                Strategy session included
              </span>
            </div>
          </ScrollReveal>
        </div>

        {/* Right — Glass form */}
        <ScrollReveal delay={0.2}>
          <div className="glass rounded-2xl p-6 md:p-8 border border-foreground/[0.1] relative overflow-hidden">
            {/* Inner reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.04] via-transparent to-transparent pointer-events-none rounded-2xl" />

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 flex flex-col items-center justify-center min-h-[360px] text-center gap-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-2"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-medium text-foreground">Message received</h3>
                <p className="text-muted-foreground text-sm max-w-xs">
                  We'll review your project details and respond within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-4">
                {/* Name */}
                <div className="relative">
                  {floatingLabel("name", "Name *")}
                  <input
                    className={inputClasses}
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    maxLength={100}
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  {floatingLabel("email", "Email *")}
                  <input
                    type="email"
                    className={inputClasses}
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    maxLength={255}
                  />
                </div>

                {/* Company */}
                <div className="relative">
                  {floatingLabel("company", "Company")}
                  <input
                    className={inputClasses}
                    value={formData.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    onFocus={() => setFocused("company")}
                    onBlur={() => setFocused(null)}
                    maxLength={100}
                  />
                </div>

                {/* Budget */}
                <div>
                  <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider mb-2 ml-1">
                    Budget Range
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {budgetRanges.map((range) => (
                      <button
                        key={range}
                        type="button"
                        onClick={() => handleChange("budget", range)}
                        className={`text-xs py-2.5 px-3 rounded-lg border transition-all duration-300 ${
                          formData.budget === range
                            ? "border-accent/50 bg-accent/10 text-accent"
                            : "border-foreground/[0.08] bg-foreground/[0.03] text-muted-foreground/70 hover:border-foreground/[0.15]"
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="relative">
                  <span
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focused === "message" || formData.message
                        ? "top-1.5 text-[10px] text-accent font-medium tracking-wider uppercase"
                        : "top-4 text-sm text-muted-foreground/60"
                    }`}
                  >
                    Tell us about your project *
                  </span>
                  <textarea
                    className={`${inputClasses} min-h-[100px] resize-none`}
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    maxLength={1000}
                  />
                </div>

                <MagneticButton
                  className="w-full bg-accent text-accent-foreground py-4 rounded-xl text-sm font-medium glow mt-2"
                >
                  Start a Conversation
                </MagneticButton>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FullscreenCTA;
