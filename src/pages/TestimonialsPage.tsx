import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import SectionTransition from "@/components/SectionTransition";
import TiltCard from "@/components/TiltCard";
import UrgencyCTA from "@/components/UrgencyCTA";
import SEOHead from "@/components/SEOHead";
import HoverFlexSection from "@/components/ui/Faq";

const testimonials = [
  { quote: "VirelaTech didn't just build our platform — they engineered our market position. Revenue up 340% in 8 months.", name: "Alexei Volkov", role: "CEO", company: "Nebula Finance" },
  { quote: "The precision. The craft. Every pixel, every interaction — deliberately architected. This is what elite looks like.", name: "Maya Chen", role: "CPO", company: "Void Studios" },
  { quote: "We interviewed 12 agencies. VirelaTech was the only team that understood systems, not just aesthetics.", name: "James Whitfield", role: "Founder", company: "Chromatic" },
  { quote: "Our conversion rate tripled. Our brand perception shifted entirely. They don't build websites — they build authority.", name: "Sophia Laurent", role: "CMO", company: "Scale Dynamics" },
  { quote: "Working with VirelaTech felt like upgrading from a sedan to a spacecraft. Technically flawless execution.", name: "Raj Patel", role: "CTO", company: "Apex Protocol" },
  { quote: "Our organic traffic increased by 400% in 6 months. The SEO strategy they built is a competitive moat.", name: "Elena Rodriguez", role: "VP Marketing", company: "DataCore" },
  { quote: "The AI automation systems they built saved us 30 hours per week in manual campaign management. Game changer.", name: "Michael Torres", role: "Head of Growth", company: "Quantum Labs" },
  { quote: "From day one, the team showed a level of strategic thinking we hadn't seen from any other agency. Exceptional.", name: "Sarah Kim", role: "Director of Digital", company: "Meridian Health" },
];

const clientLogos = ["Nebula Finance", "Void Studios", "Chromatic", "Scale Dynamics", "Apex Protocol", "DataCore", "Quantum Labs", "Meridian Health"];

const metrics = [
  { value: "340%", label: "Average Revenue Growth" },
  { value: "98%", label: "Client Retention Rate" },
  { value: "150+", label: "Projects Delivered" },
  { value: "4.9/5", label: "Client Satisfaction" },
];

const TestimonialsPage = () => (
  <PageLayout>
    <SEOHead
      title="Client Testimonials"
      description="Read what our clients say about working with VirelaTech. Real results, real stories from industry leaders who trust our digital marketing expertise."
    />
    <PageHero
      overline={{ normal: "What our clients say", highlight: "about us" }}
      title="Trusted by brands that demand"
      titleAccent="excellence"
      description="Hear directly from the leaders and teams who've experienced the VirelaTech difference."
    />

    <SectionTransition>
      <section className="py-12 site-container">
        <div className="glass rounded-2xl p-8 border border-foreground/[0.12]">
          <p className="text-muted-foreground text-xs font-grotesk uppercase tracking-[0.3em] text-center mb-6">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {clientLogos.map((logo) => (
              <span key={logo} className="text-muted-foreground/40 font-grotesk font-bold text-sm md:text-base uppercase tracking-wider">{logo}</span>
            ))}
          </div>
        </div>
      </section>
    </SectionTransition>

    <SectionTransition>
      <section className="py-16 site-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((m, i) => (
            <ScrollReveal key={m.label} delay={i * 0.1}>
              <div className="text-center">
                <p className="text-[clamp(2rem,5vw,3.5rem)] font-grotesk font-bold text-foreground editorial-heading">{m.value}</p>
                <p className="text-muted-foreground text-sm mt-2 uppercase tracking-widest">{m.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </SectionTransition>

    <SectionTransition>
   <HoverFlexSection/>
    </SectionTransition>

    <SectionTransition>
      <UrgencyCTA headline="Ready to write your" headlineAccent="success story?" primaryCTA="Start Your Growth Strategy" secondaryCTA="Book a Free Strategy Call" urgencyNote="Join 150+ brands that trust VirelaTech" sourcePage="Testimonials Page" />
    </SectionTransition>
  </PageLayout>
);

export default TestimonialsPage;
