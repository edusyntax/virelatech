import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { getLenis } from "./SmoothScroll";
import { useTheme } from "next-themes";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const SERVICE_ITEMS = [
  { label: "Web Development", description: "Stunning, conversion-focused websites", href: "/services/website-design" },
  { label: "SEO Services", description: "Organic search dominance", href: "/services/seo-services" },
  { label: "Google Ads", description: "High-converting lead campaigns", href: "/services/google-ads" },
  { label: "Lead Generation", description: "High-converting lead campaigns", href: "/services/lead-generation-campaigns" },
  { label: "Social Media Marketing", description: "Community & brand growth", href: "/services/social-media-marketing" },
  { label: "Content Marketing", description: "Engaging content that ranks and converts", href: "/services/content-marketing" },
  { label: "Email Marketing", description: "Nurture leads and drive repeat business", href: "/services/email-marketing" },
  { label: "Meta Ads", description: "Facebook and Instagram advertising", href: "/services/meta-ads" },
  { label: "AI Automation", description: "Intelligent marketing systems", href: "/services/ai-automation" },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout>>();
  const navigate = useNavigate();
  const location = useLocation();
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
      e.preventDefault();
      if (href.startsWith("#")) {
        const el = document.getElementById(href.replace("#", ""));
        if (!el) return;
        setMenuOpen(false);
        const lenis = getLenis();
        if (lenis) {
          lenis.scrollTo(el, { offset: -80, duration: 1.6, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
        } else {
          const y = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      } else {
        setMenuOpen(false);
        setDropdownOpen(false);
        navigate(href);
      }
    },
    [navigate]
  );

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const openDropdown = () => {
    clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };

  const closeDropdown = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 200);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{ position: "fixed", top: 24, left: 0, right: 0, zIndex: 1002 }}
      >
        <nav
          className={`mx-auto border border-orange-400 w-[calc(100vw-2rem)] max-w-5xl rounded-full px-5 py-3 md:px-8 md:py-4 transition-all duration-500 overflow-visible ${
            scrolled ? "glass-strong" : "glass"
          }`}
        >
          {/* Mobile: simple flex row. Desktop: 3-col grid */}
          <div className="flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] md:items-center w-full">

            {/* Left: Logo — fixed duplicate nested <a> */}
            <a
              href="/"
              onClick={(e) => handleNavClick(e, "/")}
              className="flex items-center flex-shrink-0"
              data-hover
            >
              <img
                src="/vtg.png"
                alt="VirelaTech"
                className="h-8 sm:h-9 md:h-10 lg:h-11 w-auto object-contain rounded-md px-1 py-[2px]"
              />
            </a>

            {/* Center: Nav links (desktop only) */}
            <div className="hidden md:flex items-center justify-center gap-4 lg:gap-6">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);

                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.label}
                      className="relative"
                      onMouseEnter={openDropdown}
                      onMouseLeave={closeDropdown}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`relative text-[15px] font-medium tracking-wider uppercase transition-colors duration-300 group whitespace-nowrap inline-flex items-center gap-1 ${
                          active ? "text-orange-500" : "text-foreground hover:text-orange-500"
                        }`}
                        data-hover
                      >
                        {link.label}
                        <svg
                          width="8"
                          height="8"
                          viewBox="0 0 12 12"
                          fill="none"
                          className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
                        >
                          <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span
                          className={`absolute -bottom-1 left-0 h-[2px] bg-dark rounded-full transition-all duration-300 ${
                            active ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                        />
                      </a>

                      {/* Dropdown */}
                      <AnimatePresence>
                        {dropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.96 }}
                            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-5"
                            style={{ width: 300 }}
                          >
                            <div className="bg-popover rounded-xl p-2 border border-border shadow-xl shadow-background/30 backdrop-blur-xl">
                              {SERVICE_ITEMS.map((item) => (
                                <a
                                  key={item.href}
                                  href={item.href}
                                  onClick={(e) => handleNavClick(e, item.href)}
                                  className="flex flex-col gap-0.5 px-3 py-2.5 rounded-lg hover:bg-accent/10 transition-colors duration-200 group/item"
                                  data-hover
                                >
                                  <span className="text-popover-foreground text-[15px] font-grotesk font-semibold group-hover/item:text-accent transition-colors duration-200">
                                    {item.label}
                                  </span>
                                  <span className="text-muted-foreground text-[10px]">
                                    {item.description}
                                  </span>
                                </a>
                              ))}
                              <div className="h-px bg-border my-1" />
                              {/* Fixed: was href="/" instead of href="/services" */}
                              <a
                                href="/services"
                                onClick={(e) => handleNavClick(e, "/services")}
                                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-accent/10 transition-colors duration-200"
                                data-hover
                              >
                                <span className="text-accent text-[10px] font-grotesk uppercase tracking-wider">
                                  View All Services
                                </span>
                                <span className="text-accent text-[10px]">→</span>
                              </a>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative text-[15px] font-medium tracking-wider uppercase transition-colors duration-300 group whitespace-nowrap ${
                      active ? "text-orange-500" : "text-foreground hover:text-orange-500"
                    }`}
                    data-hover
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] bg-accent rounded-full transition-all duration-300 ${
                        active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </a>
                );
              })}
            </div>

            {/* Right: CTA + Hamburger */}
            <div className="flex items-center gap-3 md:justify-self-end flex-shrink-0">
              {/* Theme toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme(isDark ? "light" : "dark")}
                aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
                className="glass w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-xs text-foreground"
                data-hover
              >
                {isDark ? (
                  <span className="inline-block">☼</span>
                ) : (
                  <span className="inline-block">☾</span>
                )}
              </motion.button>

              <motion.div
                className="relative group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div
                  className="absolute inset-[-2px] rounded-full overflow-hidden opacity-40 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none"
                  aria-hidden
                >
                  <div
                    className="absolute inset-[-50%] w-[200%] h-[200%]"
                    style={{
                      background: "conic-gradient(from 0deg, hsl(var(--accent)), transparent 40%, transparent 60%, hsl(var(--accent)))",
                      animation: "spin 8s linear infinite",
                    }}
                  />
                </div>
                <div
                  className="absolute inset-[-4px] rounded-full overflow-hidden opacity-20 group-hover:opacity-40 blur-md transition-opacity duration-500 pointer-events-none"
                  aria-hidden
                >
                  <div
                    className="absolute inset-[-50%] w-[200%] h-[200%]"
                    style={{
                      background: "conic-gradient(from 0deg, hsl(var(--accent)), transparent 40%, transparent 60%, hsl(var(--accent)))",
                      animation: "spin 8s linear infinite",
                    }}
                  />
                </div>
                <button
                  onClick={() => navigate("/contact")}
                  className="relative glass px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs font-medium text-foreground whitespace-nowrap z-10"
                  data-hover
                  data-cursor-cta
                >
                  <span className="hidden sm:inline">Get a Free Audit</span>
                  <span className="sm:hidden">Start</span>
                </button>
              </motion.div>

              {/* Hamburger (mobile) */}
              <button
                className="md:hidden text-foreground relative z-[1002]"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Toggle menu"
                data-hover
              >
                <div className="w-6 flex flex-col gap-1.5">
                  <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} transition={{ duration: 0.3 }} className="block h-px bg-foreground w-full origin-center" />
                  <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} transition={{ duration: 0.2 }} className="block h-px bg-foreground w-full" />
                  <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} transition={{ duration: 0.3 }} className="block h-px bg-foreground w-full origin-center" />
                </div>
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[1000] bg-background/98 backdrop-blur-2xl flex flex-col overflow-y-auto"
          >
            <nav className="flex flex-col gap-5 px-6 w-full max-w-sm mx-auto pt-28 pb-10">
              {NAV_LINKS.map((link, i) => {
                const active = isActive(link.href);

                if (link.hasDropdown) {
                  return (
                    <div key={link.label} className="flex flex-col">
                      <motion.button
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: i * 0.08, duration: 0.4 }}
                        className={`text-3xl sm:text-4xl font-grotesk font-bold tracking-tight transition-colors duration-300 flex items-center gap-2 ${
                          active ? "text-accent" : "text-foreground hover:text-accent"
                        }`}
                        onClick={() => setMobileServicesOpen((v) => !v)}
                        data-hover
                      >
                        {link.label}
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 12 12"
                          fill="none"
                          className={`transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`}
                        >
                          <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.button>

                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden w-full"
                          >
                            <div className="flex flex-col gap-3 mt-4 mb-2">
                              {SERVICE_ITEMS.map((item) => (
                                <a
                                  key={item.href}
                                  href={item.href}
                                  onClick={(e) => handleNavClick(e, item.href)}
                                  className="text-foreground text-base sm:text-lg font-grotesk hover:text-accent transition-colors"
                                  data-hover
                                >
                                  {item.label}
                                </a>
                              ))}
                              <a
                                href="/services"
                                onClick={(e) => handleNavClick(e, "/services")}
                                className="text-accent text-sm font-grotesk uppercase tracking-wider mt-2"
                                data-hover
                              >
                                View All Services →
                              </a>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className={`text-3xl sm:text-4xl font-grotesk font-bold tracking-tight transition-colors duration-300 ${
                      active ? "text-accent" : "text-foreground hover:text-accent"
                    }`}
                    onClick={(e) => handleNavClick(e, link.href)}
                    data-hover
                  >
                    {link.label}
                  </motion.a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;