import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ScrollReveal from "./ScrollReveal";
import fimg from "@/assets/ft_we.jpg"
import vtlogo from "@/assets/Vtlg.png"
import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,

  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const serviceLinks = [
  { label: "Web Development", href: "/services/website-development-services" },
  { label: "SEO Services", href: "/services/seo-services" },
  { label: "Google Ads", href: "/services/google-ads-services" },
  { label: "Lead Generation", href: "/services/lead-generation-campaigns-services" },
  { label: "Social Media Marketing", href: "/services/social-media-marketing-services" },
  { label: "Content Marketing", href: "/services/content-marketing-services" },
  { label: "Email Marketing", href: "/services/email-marketing-services" },
  { label: "Meta Ads", href: "/services/meta-ads-services" },
  { label: "AI Automation", href: "/services/ai-automation-services" },
];

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];


export const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/VirelaTech",
    icon: FaFacebook,
    color: "text-[#1877F2]",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/virelatech",
    icon: FaLinkedin,
    color: "text-[#0A66C2]",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: FaInstagram,
    color: "text-[#E4405F]",
  },
  {
    label: "",
    href: "https://twitter.com/",
    icon: FaXTwitter,
    color: "text-[#1DA1F2]",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/+919753456333", 
    icon: FaWhatsapp,
    color: "text-[#25D366]",
  },
];
const Footer = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    navigate(href);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("Subscribed successfully.", {
      description: "You'll hear from us soon.",
    });
    setEmail("");
  };

  return (
    <footer className="relative pt-16 pb-8 site-container overflow-hidden">

      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      {/* Glass container */}
      <div className="relative glass rounded-2xl p-8 md:p-12 lg:p-16 overflow-hidden border border-accent">

        {/* Background Image */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `url(${fimg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Light mode matte */}
        <div className="absolute inset-0 -z-10 bg-white/30 dark:bg-transparent" />

        {/* Dark mode matte */}
        <div className="absolute inset-0 -z-10 bg-black/40 dark:bg-black/70" />

        {/* Subtle grain */}
        <div className="absolute inset-0 -z-10 opacity-[0.03] mix-blend-overlay bg-[url('/noise.png')]" />

        {/* CONTENT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 text-white dark:text-foreground ">

          {/* Column 1 */}
          <ScrollReveal>
            <div>
              <img
                src={vtlogo}
                alt="VirelaTech"
                className="h-8 sm:h-9 md:h-10 lg:h-11 w-auto object-contain mb-5
  brightness-125 contrast-125 drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]"
              />
              <p className="text-white dark:text-foreground text-sm leading-relaxed mb-6">
                Engineering digital authority for visionary brands.
              </p>
              <p className="text-white/80 dark:text-foreground/50 text-xs font-bold font-grotesk">
                © {new Date().getFullYear()} VirelaTech. All rights reserved.
              </p>
            </div>
          </ScrollReveal>

          {/* Column 2 */}
          <ScrollReveal delay={0.1}>
            <div>
              <h4 className="text-orange-500 font-grotesk font-bold text-md uppercase tracking-widest mb-5">
                Services
              </h4>
              <ul className="space-y-3">
                {serviceLinks.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      onClick={(e) => handleNavClick(e, s.href)}
                      className="text-white dark:text-foreground text-sm relative group"
                    >
                      {s.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Column 3 */}
          <ScrollReveal delay={0.2}>
            <div>
              <h4 className="text-orange-500 font-grotesk font-bold text-md uppercase tracking-widest mb-5">
                Company
              </h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-white dark:text-foreground text-sm relative group"
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Column 4 */}
          <ScrollReveal delay={0.3}>
            <div>
              <h4 className="text-orange-500 font-grotesk font-bold text-md uppercase tracking-widest mb-5">
                Connect
              </h4>

       <div className="flex flex-wrap gap-4 mb-6">
  {socialLinks.map((s) => {
  const Icon = s.icon;

  return (
    <a
      key={s.label}
      href={s.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-sm"
    >
      <Icon size={18} className={s.color} />
      {s.label}
    </a>
  );
})}
</div>

              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full glass rounded-full px-5 py-3 text-sm text-white dark:text-foreground placeholder:text-white/40 dark:placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent/40 bg-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-accent text-accent-foreground rounded-full px-4 py-1.5 text-xs font-grotesk font-semibold hover:glow"
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