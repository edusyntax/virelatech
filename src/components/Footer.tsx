import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ScrollReveal from "./ScrollReveal";

const serviceLinks = [
  { label: "Web Development",  href: "/services/website-design" },
  { label: "SEO Services", href: "/services/seo-services" },
  { label: "Google Ads",  href: "/services/google-ads" },
  { label: "Lead Generation",  href: "/services/lead-generation-campaigns" },
  { label: "Social Media Marketing", href: "/services/social-media-marketing" },
  {label:"content marketing",  href: "/services/content-marketing"},  
  {label:"email marketing",  href: "/services/email-marketing"},
  { label: "Meta Ads",  href: "/services/meta-ads" },
  { label: "AI Automation",  href: "/services/ai-automation" },
];



const companyLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services"},
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "Twitter / X", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Dribbble", href: "#" },
  { label: "Instagram", href: "#" },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    navigate(href);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("Subscribed successfully.", { description: "You'll hear from us soon." });
    setEmail("");
  };

  return (
    <footer className="relative pt-16 pb-8 site-container overflow-hidden">
       
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="glass rounded-2xl p-8 md:p-12 lg:p-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1 — Company */}
          <ScrollReveal>
            <div>
              <h3 className="text-foreground font-grotesk font-bold text-xl tracking-tight mb-4">VirelaTech</h3>
              <p className="text-foreground text-sm leading-relaxed mb-6">
                Engineering digital authority for visionary brands.
              </p>
              <p className="text-foreground/50 text-xs font-bold font-grotesk">
                © {new Date().getFullYear()} VirelaTech. All rights reserved.
              </p>
            </div>
          </ScrollReveal>

          {/* Column 2 — Services */}
          <ScrollReveal delay={0.1}>
            <div>
              <h4 className="text-foreground font-grotesk font-semibold text-sm uppercase tracking-widest mb-5">Services</h4>
              <ul className="space-y-3">
                {serviceLinks.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      onClick={(e) => handleNavClick(e, s.href)}
                      className="text-foreground text-sm hover:text-foreground transition-colors relative group"
                      data-hover
                    >
                      {s.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Column 3 — Company nav */}
          <ScrollReveal delay={0.2}>
            <div>
              <h4 className="text-foreground font-grotesk font-semibold text-sm uppercase tracking-widest mb-5">Company</h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-foreground text-sm hover:text-foreground transition-colors relative group"
                      data-hover
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Column 4 — Connect */}
          <ScrollReveal delay={0.3}>
            <div>
              <h4 className="text-foreground font-grotesk font-semibold text-sm uppercase tracking-widest mb-5">Connect</h4>
              <div className="flex flex-wrap gap-3 mb-6">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="text-foreground text-xs uppercase tracking-widest hover:text-foreground transition-colors"
                    data-hover
                  >
                    {s.label}
                  </a>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full glass rounded-full px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent/40 transition-shadow bg-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-accent text-accent-foreground rounded-full px-4 py-1.5 text-xs font-grotesk font-semibold hover:glow transition-shadow"
                  data-hover
                >
                  →
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
   
  
    </footer>
  );
};

export default Footer;
