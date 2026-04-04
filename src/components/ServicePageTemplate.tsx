import PageHero from "./PageHero";
import ScrollReveal from "./ScrollReveal";
import SectionTransition from "./SectionTransition";
import UrgencyCTA from "./UrgencyCTA";
import TiltCard from "./TiltCard";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ServiceBenefit {
  title: string;
  description: string;
}

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface CaseResult {
  metric: string;
  value: string;
  description: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface ServicePageProps {
  overline: string;
  title: string;
  titleAccent: string;
  description: string;
  problem: string;
  solution: string;
  process: ProcessStep[];
  benefits: ServiceBenefit[];
  caseResults: CaseResult[];
  faqs?: FAQItem[];
  caseStudyTitle?: string;
  ctaPrimary?: string;
  ctaUrgency?: string;
}

const FAQAccordion = ({ faqs }: { faqs: FAQItem[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="glass rounded-xl border border-foreground/[0.08] overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-4 text-left group"
            data-hover
          >
            <span className="text-foreground text-sm md:text-base font-grotesk font-semibold pr-4">{faq.question}</span>
            <motion.span
              animate={{ rotate: openIndex === i ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-accent text-xl flex-shrink-0"
            >
              +
            </motion.span>
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-4 text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

const ServicePageTemplate = ({
  overline,
  title,
  titleAccent,
  description,
  problem,
  solution,
  process,
  benefits,
  caseResults,
  faqs,
  caseStudyTitle = "Real Results",
  ctaPrimary = "Start Your Growth Strategy",
  ctaUrgency = "Limited strategy slots this month",
}: ServicePageProps) => {
  return (
    <>
      <PageHero
        overline={overline}
        title={title}
        titleAccent={titleAccent}
        description={description}
      />

      {/* Mid-page urgency CTA */}
      <SectionTransition>
        <UrgencyCTA
          variant="inline"
          primaryCTA={ctaPrimary}
          urgencyNote={ctaUrgency}
          headline="Don't wait to"
          headlineAccent="start growing"
          description="Every day without a strategy is revenue left on the table."
          sourcePage={`${overline} Service Page`}
          serviceInterest={overline}
        />
      </SectionTransition>

      {/* Problem → Solution */}
      <SectionTransition>
        <section className="py-20 site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <ScrollReveal>
              <div>
                <p className="text-accent font-grotesk text-xs uppercase tracking-[0.3em] mb-4">The Problem</p>
                <h3 className="text-foreground text-2xl md:text-3xl font-grotesk font-bold mb-4">
                  What's holding you back
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed">{problem}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div>
                <p className="text-accent font-grotesk text-xs uppercase tracking-[0.3em] mb-4">The Solution</p>
                <h3 className="text-foreground text-2xl md:text-3xl font-grotesk font-bold mb-4">
                  How we fix it
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed">{solution}</p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </SectionTransition>

      {/* Process */}
      <SectionTransition>
        <section className="py-20 site-container">
          <ScrollReveal>
            <p className="text-accent font-grotesk text-xs uppercase tracking-[0.3em] mb-4">Our Process</p>
            <h2 className="editorial-heading text-[clamp(1.8rem,4vw,3.5rem)] text-foreground mb-16 max-w-2xl">
              A proven <span className="font-serif italic text-gradient-accent">methodology</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {process.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 0.1}>
                <TiltCard className="h-full">
                  <div className="glass rounded-2xl p-6 h-full flex flex-col border border-foreground/[0.12] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.04] via-transparent to-transparent pointer-events-none rounded-2xl" />
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-accent/0 group-hover:bg-accent/30 blur-lg transition-all duration-500 pointer-events-none" />
                    <div className="relative z-10">
                      <span className="text-accent font-grotesk text-xs uppercase tracking-widest">{step.step}</span>
                      <h4 className="text-foreground text-lg font-grotesk font-bold mt-2 mb-3">{step.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </SectionTransition>

      {/* Benefits */}
      <SectionTransition>
        <section className="py-20 site-container">
          <ScrollReveal>
            <p className="text-accent font-grotesk text-xs uppercase tracking-[0.3em] mb-4">Key Benefits</p>
            <h2 className="editorial-heading text-[clamp(1.8rem,4vw,3.5rem)] text-foreground mb-16 max-w-2xl">
              Why brands <span className="font-serif italic text-gradient-accent">choose us</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <ScrollReveal key={b.title} delay={i * 0.08}>
                <div className="glass rounded-2xl p-6 border border-foreground/[0.12] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.04] via-transparent to-transparent pointer-events-none rounded-2xl" />
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center mb-4">
                      <span className="text-accent font-grotesk text-sm font-bold">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h4 className="text-foreground text-lg font-grotesk font-bold mb-2">{b.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{b.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </SectionTransition>

      {/* Case Results */}
      <SectionTransition>
        <section className="py-20 site-container">
          <ScrollReveal>
            <p className="text-accent font-grotesk text-xs uppercase tracking-[0.3em] mb-4">{caseStudyTitle}</p>
            <h2 className="editorial-heading text-[clamp(1.8rem,4vw,3.5rem)] text-foreground mb-16 max-w-2xl">
              Numbers that <span className="font-serif italic text-gradient-accent">speak</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {caseResults.map((r, i) => (
              <ScrollReveal key={r.metric} delay={i * 0.1}>
                <div className="glass rounded-2xl p-8 border border-foreground/[0.12] text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.04] via-transparent to-transparent pointer-events-none rounded-2xl" />
                  <div className="relative z-10">
                    <p className="text-[clamp(2.5rem,5vw,4rem)] font-grotesk font-bold text-foreground editorial-heading mb-2">
                      {r.value}
                    </p>
                    <p className="text-accent font-grotesk text-xs uppercase tracking-widest mb-2">{r.metric}</p>
                    <p className="text-muted-foreground text-sm">{r.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </SectionTransition>

      {/* FAQ Section */}
      {faqs && faqs.length > 0 && (
        <SectionTransition>
          <section className="py-20 site-container">
            <ScrollReveal>
              <p className="text-accent font-grotesk text-xs uppercase tracking-[0.3em] mb-4">FAQ</p>
              <h2 className="editorial-heading text-[clamp(1.8rem,4vw,3.5rem)] text-foreground mb-16 max-w-2xl">
                Common <span className="font-serif italic text-gradient-accent">questions</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="max-w-3xl">
                <FAQAccordion faqs={faqs} />
              </div>
            </ScrollReveal>
          </section>
        </SectionTransition>
      )}

      {/* Bottom CTA */}
      <SectionTransition>
        <UrgencyCTA
          primaryCTA={ctaPrimary}
          secondaryCTA="Book a Free Strategy Call"
          urgencyNote={ctaUrgency}
          sourcePage={`${overline} Service Page`}
          serviceInterest={overline}
        />
      </SectionTransition>
    </>
  );
};

export default ServicePageTemplate;
