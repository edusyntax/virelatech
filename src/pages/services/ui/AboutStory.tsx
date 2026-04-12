import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const story = [
  {
    step: "01",
    title: "How It Started",
    body: "Virelatech didn't start as a big agency idea. It started from watching businesses spend money on marketing that never connected — wrong audience, wrong message, zero results.",
  },
  {
    step: "02",
    title: "What We Fixed",
    body: "We stopped treating SEO, ads, content, and automation as separate services. Instead we connected them into one clear system — each part reinforcing the others.",
  },
  {
    step: "03",
    title: "How We Work",
    body: "Before touching anything, we understand what's actually broken. Then we build a direction specific to your business — not a template copied from the last client.",
  },
];

const services = [
  { label: "Search & Visibility", items: ["SEO that ranks you when people are already searching", "Google Ads focused on leads, not just clicks"] },
  { label: "Paid & Social", items: ["Meta Ads designed to generate inquiries, not just engage", "Social media that feels real — not forced or polished"] },
  { label: "Build & Convert", items: ["Websites built to turn visitors into customers", "Content that sounds human, not robotic", "Automation that saves time and improves performance"] },
];

const trust = [
  { title: "Consistent Progress", body: "Results that compound over time. Not a one-month spike followed by silence." },
  { title: "No Overpromising", body: "We tell you what's realistic before we start, then we work to exceed it." },
  { title: "Clear Communication", body: "You'll never wonder what's happening. Updates are simple, honest, and regular." },
  { title: "Strategies With Reasons", body: "Every recommendation comes with a clear explanation of why it makes sense for you." },
];

const AboutStory = () => {
  const storyRef = useRef(null);
  const servicesRef = useRef(null);
  const trustRef = useRef(null);

  const storyInView = useInView(storyRef, { once: true, margin: "-80px" });
  const servicesInView = useInView(servicesRef, { once: true, margin: "-80px" });
  const trustInView = useInView(trustRef, { once: true, margin: "-80px" });

  return (
    <div className="relative overflow-hidden">

      {/* ── BLOCK 1: Our Story ── */}
      <section ref={storyRef} className="relative py-12 md:py-12">
        <div className="absolute bottom-0 left-0 w-[32rem] h-[32rem] bg-accent/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="site-container relative">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={storyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow-orange">
              Our Story{" "}
              <span className="eyebrow-highlight">& Origin</span>
            </p>

            <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-start mb-16">
              <h2 className="editorial-heading text-[clamp(2rem,4vw,3.2rem)] text-foreground">
                Built because{" "}
                <span className="font-serif italic text-gradient-accent">
                  Good work was missing
                </span>
              </h2>
              <div className="space-y-4 text-muted-foreground text-base leading-relaxed">
                <p>
                  Most businesses we met weren't failing because of effort.
                  They were failing because their marketing didn't reach the
                  right people with the right message. Budget was being spent.
                  Results weren't coming.
                </p>
                <p>
                  We built Virelatech to close that gap — not with more
                  services, but with a clearer system. One that connects every
                  channel into a single direction instead of treating each
                  one as its own island.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={storyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden"
          >
            {story.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={storyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="bg-card p-8 md:p-10 border rounded-sm flex flex-col gap-4 group hover:bg-orange-500/[0.05] transition-colors duration-300 relative overflow-hidden"
              >
                {/* left border accent on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-orange-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-400 origin-bottom rounded-r-full" />
                <span className="font-mono text-3xl font-bold text-accent">
                  {item.step}
                </span>
                <h3 className="text-foreground font-semibold text-lg leading-snug">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BLOCK 2: What We Do ── */}
      <section ref={servicesRef} className="relative py-6 md:py-8 bg-card/30">
        {/* <div className="absolute top-0 right-0 w-[28rem] h-[28rem] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" /> */}

        <div className="site-container relative">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="grid md:grid-cols-2 gap-12 md:gap-20 items-start"
          >
            <div>
              <p className="eyebrow-orange">
                What We{" "}
                <span className="eyebrow-highlight">Actually Do</span>
              </p>

              <h2 className="editorial-heading text-[clamp(2rem,3.5vw,3rem)] text-foreground mb-6">
                We solve{" "}
                <span className="font-serif italic text-orange-500">
                  Specific problems
                </span>
              </h2>

              <p className="text-muted-foreground text-base leading-relaxed mb-6">
                We don't sell service packages. We identify what's broken and
                fix it. If your website isn't getting traffic — we fix that.
                If your ads aren't converting — we fix that. If your brand
                isn't visible — we build that presence, step by step.
              </p>

              <div className="section-divider" />

              <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
                We work with businesses in{" "}
                <span className="text-foreground font-medium">Hyderabad</span>{" "}
                and the{" "}
                <span className="text-foreground font-medium">United States</span>.
                The goal is always the same: growth that's measurable and sustainable.
              </p>

              {/* Mid-page CTA */}
              
             <a
  href="/contact"
  className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-orange-500 hover:text-orange-400 transition-colors duration-200 group"
>
  Get a free strategy audit
  <span className="group-hover:translate-x-1 transition-transform duration-200">
    →
  </span>
</a>
            </div>

            {/* Services grouped */}
            <div className="space-y-5">
              {services.map((group, gi) => (
                <motion.div
                  key={gi}
                  initial={{ opacity: 0, x: 20 }}
                  animate={servicesInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + gi * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="border border-border rounded-2xl bg-card overflow-hidden"
                >
                  <div className="px-5 py-3 border-b border-border bg-orange-500/[0.04]">
                    <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
                      {group.label}
                    </span>
                  </div>
                  <div className="p-5 space-y-3">
                    {group.items.map((item, ii) => (
                      <div key={ii} className="flex items-start gap-3">
                        <span className="text-orange-500 shrink-0 font-bold text-sm mt-0.5">✔</span>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BLOCK 3: Why Clients Stay ── */}
      <section ref={trustRef} className="relative py-12 md:py-16">
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-accent/8 blur-[130px] rounded-full pointer-events-none" />

        <div className="site-container relative">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={trustInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow-orange">
              Why Clients{" "}
              <span className="eyebrow-highlight">Stay</span>
            </p>

            <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-end mb-12">
              <h2 className="editorial-heading text-[clamp(2rem,4vw,3.2rem)] text-foreground">
                Honestly it comes down{" "}
                <span className="font-serif italic text-gradient-accent">
                  to Trust
                </span>
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                We don't overpromise. We don't disappear after onboarding.
                Clients stay because they can see progress, communication
                is clear, and strategies actually make sense for their business.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {trust.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={trustInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border border-border bg-card p-6 hover:border-orange-500/40 hover:bg-orange-500/[0.04] active:scale-[0.98] transition-all duration-300 group"
              >
                <div className="w-2 h-2 rounded-full bg-orange-500 mb-5 group-hover:scale-150 transition-transform duration-300" />
                <h4 className="text-foreground font-semibold text-base mb-2">
                  {item.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Closing pull quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={trustInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-border pt-2 max-w-3xl text-center mx-auto"
          >
            <p className="text-lg md:text-xl text-muted-foreground  leading-relaxed">
              Digital marketing keeps changing. Algorithms shift, platforms
              evolve, attention spans get shorter. We stay ahead of that so
              our clients don't have to. At the end of the day, Virelatech
              is a team focused on one thing:{" "}
              <span className="text-foreground font-semibold">
                helping your business grow without making it complicated.
              </span>
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default AboutStory;