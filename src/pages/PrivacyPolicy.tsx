import { motion } from "framer-motion";

import PageLayout from "../components/PageLayout";
import SEOHead from "@/components/SEOHead";

const PrivacyPolicy = () => {
  return (
   <>
      <SEOHead
        title="Privacy Policy | Virelatech"
        description="Learn how Virelatech collects, uses, and protects your information."
      />

      {/* ── HERO ── */}
      <section className="relative pt-32 sm:pt-36 md:pt-40 overflow-hidden">
        <div className="site-container relative text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow-orange text-[18px]"
          >
            Privacy{" "}
            <span className="eyebrow-highlight">Policy</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="editorial-heading text-[clamp(2.5rem,5vw,4.5rem)] text-foreground mt-4"
          >
            Protecting your{" "}
            <span className="font-serif italic text-gradient-accent">
              privacy & trust
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            We are committed to protecting your personal information and
            maintaining transparency in how your data is collected, used, and
            safeguarded.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-5 text-sm text-muted-foreground/70"
          >
            Effective Date: 26/04/2026
          </motion.p>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="relative py-20 md:py-24">
        <div className="site-container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                Welcome to{" "}
                <span className="font-semibold text-foreground">
                  Virelatech
                </span>{" "}
                (“Company”, “we”, “our”, or “us”). We are committed to
                protecting your privacy and ensuring that your personal
                information is handled in a safe and responsible manner.
              </p>

              <p className="mt-5 text-muted-foreground leading-relaxed text-base md:text-lg">
                This Privacy Policy outlines how we collect, use, disclose, and
                safeguard your information when you visit our website and use
                our digital marketing services.
              </p>
            </motion.div>

            <div className="space-y-14">
              {[
                {
                  title: "1. Information We Collect",
                  content: (
                    <>
                      <h3 className="text-lg font-semibold text-foreground mt-4">
                        a. Personal Information
                      </h3>

                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li>Name</li>
                        <li>Email address</li>
                        <li>Phone number</li>
                        <li>Business/company details</li>
                        <li>
                          Any information you provide through contact forms,
                          lead forms, or consultations
                        </li>
                      </ul>

                      <h3 className="text-lg font-semibold text-foreground mt-8">
                        b. Non-Personal Information
                      </h3>

                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li>Browser type</li>
                        <li>IP address</li>
                        <li>Device information</li>
                        <li>
                          Website usage data (pages visited, time spent, clicks)
                        </li>
                      </ul>

                      <h3 className="text-lg font-semibold text-foreground mt-8">
                        c. Cookies & Tracking Technologies
                      </h3>

                      <p className="mt-4">
                        We use cookies, pixels, and similar technologies to
                        enhance user experience and track performance for
                        marketing campaigns.
                      </p>
                    </>
                  ),
                },
                {
                  title: "2. How We Use Your Information",
                  content: (
                    <>
                      <p>We use the collected information to:</p>

                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li>Provide and manage our services</li>
                        <li>
                          Respond to inquiries and customer support requests
                        </li>
                        <li>
                          Improve website functionality and user experience
                        </li>
                        <li>Run and optimize advertising campaigns</li>
                        <li>
                          Send marketing communications (only with consent)
                        </li>
                        <li>Analyze user behavior and trends</li>
                      </ul>
                    </>
                  ),
                },
                {
                  title: "3. Sharing of Information",
                  content: (
                    <>
                      <p>We do not sell your personal data.</p>

                      <p className="mt-4">
                        We may share your information with:
                      </p>

                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li>
                          Trusted third-party service providers (analytics, CRM,
                          email tools)
                        </li>
                        <li>
                          Advertising platforms for campaign execution
                        </li>
                        <li>Legal authorities when required by law</li>
                      </ul>

                      <p className="mt-4">
                        All partners are obligated to keep your information
                        secure and confidential.
                      </p>
                    </>
                  ),
                },
                {
                  title: "4. Data Security",
                  content: (
                    <>
                      <p>
                        We implement appropriate technical and organizational
                        security measures to protect your data from:
                      </p>

                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li>Unauthorized access</li>
                        <li>Data breaches</li>
                        <li>Misuse or alteration</li>
                      </ul>

                      <p className="mt-4">
                        However, no method of transmission over the internet is
                        100% secure.
                      </p>
                    </>
                  ),
                },
                {
                  title: "5. Your Rights",
                  content: (
                    <>
                      <p>
                        Depending on your location, you may have the right to:
                      </p>

                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li>Access your personal data</li>
                        <li>Request correction or deletion</li>
                        <li>
                          Withdraw consent for marketing communications
                        </li>
                        <li>Object to data processing</li>
                      </ul>

                      <p className="mt-4">
                        To exercise your rights, contact us at:
                      </p>

                      <p className="mt-2 font-medium text-orange-500">
                        Connect@virelatech.com
                      </p>
                    </>
                  ),
                },
                {
                  title: "6. Third-Party Links",
                  content: (
                    <p>
                      Our website may contain links to third-party websites. We
                      are not responsible for the privacy practices or content
                      of those sites.
                    </p>
                  ),
                },
                {
                  title: "7. Data Retention",
                  content: (
                    <>
                      <p>
                        We retain your personal information only for as long as
                        necessary to:
                      </p>

                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li>
                          Fulfill the purposes outlined in this policy
                        </li>
                        <li>Comply with legal obligations</li>
                        <li>Resolve disputes and enforce agreements</li>
                      </ul>
                    </>
                  ),
                },
                {
                  title: "8. Children’s Privacy",
                  content: (
                    <p>
                      Our services are not intended for individuals under the
                      age of 18. We do not knowingly collect personal
                      information from children.
                    </p>
                  ),
                },
                {
                  title: "9. Changes to This Privacy Policy",
                  content: (
                    <p>
                      We may update this Privacy Policy from time to time. Any
                      changes will be posted on this page with an updated
                      “Effective Date.”
                    </p>
                  ),
                },
                {
                  title: "10. Contact Us",
                  content: (
                    <div className="rounded-2xl border border-border bg-card/50 p-6 mt-4">
                      <p className="font-semibold text-foreground">
                        Virelatech
                      </p>

                      <p className="mt-3 text-muted-foreground">
                        Email: connect@virelatech.com
                      </p>

                      <p className="mt-2 text-muted-foreground">
                        Phone: +91-9753456333
                      </p>

                      <p className="mt-2 text-muted-foreground">
                        Address: Hyderabad
                      </p>
                    </div>
                  ),
                },
                {
                  title: "11. Consent",
                  content: (
                    <p>
                      By using our website, you consent to our Privacy Policy
                      and agree to its terms.
                    </p>
                  ),
                },
              ].map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative border-b border-border/60 pb-12"
                >
                  <div className="absolute -left-4 top-2 h-full w-px bg-gradient-to-b from-orange-500/60 to-transparent hidden md:block" />

                  <h2 className="editorial-heading text-2xl md:text-3xl text-foreground">
                    {section.title}
                  </h2>

                  <div className="mt-6 text-muted-foreground leading-relaxed text-sm sm:text-base space-y-4">
                    {section.content}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/[0.03] to-transparent pointer-events-none" />

        <div className="site-container text-center">
          <p className="eyebrow-orange">
            Your trust{" "}
            <span className="eyebrow-highlight eyebrow-highlight-orange">
              matters
            </span>
          </p>

          <h2 className="editorial-heading text-[clamp(2rem,4vw,3.2rem)] mt-4">
            Built with transparency,{" "}
            <span className="font-serif italic text-orange-500">
              protected with care
            </span>
          </h2>

          <p className="mt-5 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We believe privacy should be clear, understandable, and respected at
            every step of your experience with Virelatech.
          </p>
        </div>
      </section>
   </>
  );
};

export default PrivacyPolicy;