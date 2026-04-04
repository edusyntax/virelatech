import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { submitLead } from "@/lib/lead-utils";
import MagneticButton from "./MagneticButton";

const COUNTRY_CODES = [
  { code: "+91", country: "IN", flag: "🇮🇳" },
  { code: "+1", country: "US", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+61", country: "AU", flag: "🇦🇺" },
  { code: "+971", country: "AE", flag: "🇦🇪" },
  { code: "+966", country: "SA", flag: "🇸🇦" },
  { code: "+65", country: "SG", flag: "🇸🇬" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+81", country: "JP", flag: "🇯🇵" },
  { code: "+86", country: "CN", flag: "🇨🇳" },
  { code: "+55", country: "BR", flag: "🇧🇷" },
  { code: "+27", country: "ZA", flag: "🇿🇦" },
  { code: "+234", country: "NG", flag: "🇳🇬" },
  { code: "+254", country: "KE", flag: "🇰🇪" },
];

interface LeadCaptureModalProps {
  open: boolean;
  onClose: () => void;
  sourcePage: string;
  sourceLabel: string;
  headline?: string;
  description?: string;
  serviceInterest?: string;
}

const LeadCaptureModal = ({
  open,
  onClose,
  sourcePage,
  sourceLabel,
  headline = "Get Your Free Strategy Session",
  description = "Fill in your details and we'll get back to you within 24 hours.",
  serviceInterest,
}: LeadCaptureModalProps) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0]);
  const [showCodes, setShowCodes] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: string, value: string) =>
    setForm((p) => ({ ...p, [field]: value }));

  const handlePhoneChange = (value: string) => {
    // Only allow digits, spaces, and hyphens
    const cleaned = value.replace(/[^\d\s-]/g, "");
    setForm((p) => ({ ...p, phone: cleaned }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      toast.error("Please fill in your name, email, and mobile number.");
      return;
    }
    const phoneDigits = form.phone.replace(/\D/g, "");
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      toast.error("Please enter a valid mobile number (7-15 digits).");
      return;
    }
    // Show success immediately (optimistic)
    setSubmitted(true);
    toast.success("We'll be in touch within 24 hours!");
    // Submit in background with country code prepended
    const fullPhone = `${countryCode.code} ${form.phone.trim()}`;
    submitLead({
      name: form.name,
      email: form.email,
      phone: fullPhone,
      message: form.message,
      service_interest: serviceInterest,
      source_page: sourcePage,
      source_label: sourceLabel,
    }).then((result) => {
      if (!result.success) {
        toast.error(result.error || "Submission failed. Please try again.");
      }
    });
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setForm({ name: "", email: "", phone: "", message: "" });
      setSubmitted(false);
      setShowCodes(false);
    }, 300);
  };

  const inputClasses =
    "w-full bg-foreground/[0.04] border border-foreground/[0.1] rounded-lg px-4 py-3 text-sm text-foreground outline-none transition-all duration-300 focus:border-accent/50 focus:bg-foreground/[0.06] placeholder:text-muted-foreground/50";

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md glass rounded-2xl border border-foreground/[0.1] p-6 md:p-8 overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] via-transparent to-transparent pointer-events-none rounded-2xl" />

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-foreground/[0.06] flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={16} />
            </button>

            <div className="relative z-10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-8 text-center gap-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </motion.div>
                  <h3 className="text-lg font-medium text-foreground">You're all set!</h3>
                  <p className="text-muted-foreground text-sm max-w-xs">
                    We'll review your details and reach out within 24 hours.
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-2 text-accent text-sm font-medium hover:underline"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <>
                  <h3 className="text-xl font-grotesk font-bold text-foreground mb-1">{headline}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{description}</p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                      className={inputClasses}
                      placeholder="Your name *"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      maxLength={100}
                    />
                    <input
                      type="email"
                      className={inputClasses}
                      placeholder="Email address *"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      maxLength={255}
                    />

                    {/* Phone with country code */}
                    <div className="flex gap-2">
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setShowCodes(!showCodes)}
                          className="flex items-center gap-1.5 bg-foreground/[0.04] border border-foreground/[0.1] rounded-lg px-3 py-3 text-sm text-foreground transition-all duration-300 hover:border-accent/50 min-w-[90px]"
                        >
                          <span className="text-base leading-none">{countryCode.flag}</span>
                          <span className="text-xs text-muted-foreground">{countryCode.code}</span>
                          <ChevronDown size={12} className="text-muted-foreground ml-auto" />
                        </button>
                        <AnimatePresence>
                          {showCodes && (
                            <motion.div
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{ duration: 0.15 }}
                              className="absolute top-full left-0 mt-1 w-48 max-h-48 overflow-y-auto bg-card border border-border rounded-lg shadow-lg z-50"
                            >
                              {COUNTRY_CODES.map((cc) => (
                                <button
                                  key={cc.code + cc.country}
                                  type="button"
                                  onClick={() => { setCountryCode(cc); setShowCodes(false); }}
                                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent/10 transition-colors ${
                                    countryCode.code === cc.code && countryCode.country === cc.country
                                      ? "bg-accent/5 text-accent"
                                      : "text-foreground"
                                  }`}
                                >
                                  <span className="text-base">{cc.flag}</span>
                                  <span className="text-xs text-muted-foreground">{cc.country}</span>
                                  <span className="text-xs ml-auto">{cc.code}</span>
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <input
                        type="tel"
                        className={`${inputClasses} flex-1`}
                        placeholder="Mobile number *"
                        value={form.phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        maxLength={15}
                      />
                    </div>

                    <textarea
                      className={`${inputClasses} min-h-[80px] resize-none`}
                      placeholder="Tell us about your project (optional)"
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      maxLength={1000}
                    />
                    <MagneticButton
                      type="submit"
                      className={`w-full bg-accent text-accent-foreground py-3.5 rounded-xl text-sm font-medium glow mt-1 ${submitting ? "opacity-70 pointer-events-none" : ""}`}
                    >
                      {submitting ? "Sending..." : "Get Started"}
                    </MagneticButton>
                    <p className="text-muted-foreground/50 text-[11px] text-center">
                      Free consultation · No commitment · Response within 24 hours
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default LeadCaptureModal;
