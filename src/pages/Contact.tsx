import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import PageLayout from "@/components/PageLayout";
import { submitLead } from "@/lib/lead-utils";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import SectionTransition from "@/components/SectionTransition";
import MagneticButton from "@/components/MagneticButton";
import SEOHead from "@/components/SEOHead";

const serviceOptions = ["SEO Services", "Performance Marketing", "Social Media Marketing", "Conversion Rate Optimization", "AI Marketing Automation", "Content Marketing", "Full-Service Strategy"];

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    setSubmitted(true);
    toast.success("Message sent. We'll be in touch within 24 hours.");
    const result = await submitLead({
      name: formData.name,
      email: formData.email,
      company: formData.company,
      service_interest: formData.service,
      message: formData.message,
      source_page: "Contact Page",
      source_label: "Contact Form",
    });
    if (!result.success) {
      toast.error(result.error || "Submission failed. Please try again.");
    }
    setSubmitting(false);
  };

  const floatingLabel = (field: string, label: string) => {
    const hasValue = formData[field as keyof typeof formData];
    const isActive = focused === field || hasValue;
    return (
      <span className={`absolute left-4 transition-all duration-300 pointer-events-none ${isActive ? "top-1.5 text-[10px] text-accent font-medium tracking-wider uppercase" : "top-1/2 -translate-y-1/2 text-sm text-muted-foreground/60"}`}>
        {label}
      </span>
    );
  };

  const inputClasses = "w-full bg-foreground/[0.04] border border-foreground/[0.1] rounded-lg px-4 pt-5 pb-2 text-sm text-foreground outline-none transition-all duration-300 focus:border-accent/50 focus:bg-foreground/[0.06] focus:shadow-[0_0_20px_-4px_hsl(var(--accent)/0.15)]";

  return (
    <PageLayout>
      <SEOHead
        title="Contact Us"
        description="Get in touch with VirelaTech. Book a free strategy consultation and discover how we can accelerate your digital growth."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact VirelaTech",
          description: "Get in touch for a free strategy consultation.",
          mainEntity: {
            "@type": "Organization",
            name: "VirelaTech",
            email: "connect@virelatech.com ",
            telephone: "+919753456333",
          },
        }}
      />
      <PageHero overline="Contact" title="Let's build something" titleAccent="extraordinary" description="Whether you're looking to scale your marketing, optimize conversions, or build AI-powered systems — we're ready to help." />

      <SectionTransition>
        <section className="py-20 site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <ScrollReveal>
                <h2 className="text-orange-600 text-2xl md:text-3xl font-grotesk font-bold mb-6">Get in Touch</h2>
                <p className="text-muted-foreground text-base leading-relaxed mb-8">We partner with visionary brands to create digital experiences that define categories. Tell us about your project and we'll respond within 24 hours.</p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <div className="space-y-6 mb-10">
                  <div><p className="text-accent font-grotesk text-xs uppercase tracking-[0.3em] mb-2">Email</p><p className="text-foreground text-sm">connect@virelatech.com</p></div>
                  <div><p className="text-accent font-grotesk text-xs uppercase tracking-[0.3em] mb-2">Phone</p><p className="text-foreground text-sm">+919753456333</p></div>
                  <div><p className="text-accent font-grotesk text-xs uppercase tracking-[0.3em] mb-2">Office</p><p className="text-foreground text-sm">Parsippany, NJ-07054, USA and Hyderabad, india</p></div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div className="flex flex-col gap-3 text-sm text-muted-foreground/70">
                  {["Response within 24 hours", "Free strategy consultation included", "Limited client intake — apply now"].map((t) => (
                    <span key={t} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent/80" />{t}</span>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.15}>
              <div className="glass rounded-2xl p-6 md:p-8 border border-orange-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.04] via-transparent to-transparent pointer-events-none rounded-2xl" />
                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 flex flex-col items-center justify-center min-h-[400px] text-center gap-4">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }} className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-2">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent"><polyline points="20 6 9 17 4 12" /></svg>
                    </motion.div>
                    <h3 className="text-xl font-medium text-foreground">Message received</h3>
                    <p className="text-muted-foreground text-sm max-w-xs">We'll review your project details and respond within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-4">
                    <div className="relative">{floatingLabel("name", "Name *")}<input className={inputClasses} value={formData.name} onChange={(e) => handleChange("name", e.target.value)} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} maxLength={100} /></div>
                    <div className="relative">{floatingLabel("email", "Email *")}<input type="email" className={inputClasses} value={formData.email} onChange={(e) => handleChange("email", e.target.value)} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} maxLength={255} /></div>
                    <div className="relative">{floatingLabel("company", "Company")}<input className={inputClasses} value={formData.company} onChange={(e) => handleChange("company", e.target.value)} onFocus={() => setFocused("company")} onBlur={() => setFocused(null)} maxLength={100} /></div>
                    <div>
                      <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider mb-2 ml-1">Service Interest</p>
                      <div className="flex flex-wrap gap-2">
                        {serviceOptions.map((svc) => (
                          <button key={svc} type="button" onClick={() => handleChange("service", svc)} className={`text-xs py-2 px-3 rounded-lg border   transition-all duration-300 ${formData.service === svc ? "border-orange-500/50 bg-orange-500/10 text-foreground" : "border-orange-500/10 bg-orange-500/10 text-foreground/70 hover:border-foreground/[0.15]"}`}>{svc}</button>
                        ))}
                      </div>
                    </div>
                    <div className="relative">
                      <span className={`absolute left-4 transition-all duration-300 pointer-events-none ${focused === "message" || formData.message ? "top-1.5 text-[10px] text-accent font-medium tracking-wider uppercase" : "top-4 text-sm text-muted-foreground/60"}`}>Tell us about your project *</span>
                      <textarea className={`${inputClasses} min-h-[120px] resize-none`} value={formData.message} onChange={(e) => handleChange("message", e.target.value)} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} maxLength={1000} />
                    </div>
                    <MagneticButton type="submit" className={`w-full bg-accent text-accent-foreground py-4 rounded-xl text-sm font-medium glow mt-2 ${submitting ? "opacity-70 pointer-events-none" : ""}`}>{submitting ? "Sending..." : "Start a Conversation"}</MagneticButton>
                    <p className="text-muted-foreground/40 text-xs text-center mt-2">Free consultation · No commitment · Response within 24 hours</p>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </section>
      </SectionTransition>
    </PageLayout>
  );
};

export default ContactPage;
