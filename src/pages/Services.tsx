import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import SectionTransition from "@/components/SectionTransition";
import TiltCard from "@/components/TiltCard";
import UrgencyCTA from "@/components/UrgencyCTA";
import SEOHead, { serviceJsonLd } from "@/components/SEOHead";

const services = [
  {
    title: "Web Development",
    micro: "Design & development",
    description: "Stunning, conversion-focused websites that captivate visitors and drive measurable business results.",
    tags: ["Custom Design", "Responsive", "Performance"],
    slug: "/services/website-development-services",
  },
  {
    title: "SEO Services",
    micro: "Organic growth",
    description: "Dominate search rankings with data-driven SEO strategies that drive sustainable traffic and revenue.",
    tags: ["Technical SEO", "Content Strategy", "Link Building"],
    slug: "/services/seo-services",
  },
  {
    title: "Google Ads",
    micro: "Paid search",
    description: "High-converting Google Ads campaigns designed to generate qualified leads and maximize ROI.",
    tags: ["Search Ads", "Display", "Conversion Tracking"],
    slug: "/services/google-ads-services",
  },
  {
    title: "Meta Ads",
    micro: "Social advertising",
    description: "Facebook and Instagram ad campaigns that scale reach, engagement, and conversions.",
    tags: ["Facebook Ads", "Instagram Ads", "Retargeting"],
    slug: "/services/meta-ads-services",
  },
  {
    title: "Lead Generation",
    micro: "Pipeline growth",
    description: "End-to-end lead generation systems that consistently bring in high-quality prospects.",
    tags: ["Funnels", "CRM", "Automation"],
    slug: "/services/lead-generation-campaigns-services",
  },
  {
    title: "Social Media Marketing",
    micro: "Brand growth",
    description: "Strategic social media management that builds authority, engagement, and loyal communities.",
    tags: ["Content", "Strategy", "Community"],
    slug: "/services/social-media-marketing-services",
  },
  {
    title: "Content Marketing",
    micro: "Content & authority",
    description: "Engaging, SEO-optimized content that ranks on Google and converts visitors into customers.",
    tags: ["Blogs", "SEO Content", "Copywriting"],
    slug: "/services/content-marketing-services",
  },
  {
    title: "Email Marketing",
    micro: "Retention & nurture",
    description: "Automated email campaigns that nurture leads, increase retention, and boost lifetime value.",
    tags: ["Automation", "Sequences", "CRM"],
    slug: "/services/email-marketing-services",
  },
  {
    title: "AI Automation",
    micro: "Intelligent systems",
    description: "AI-powered workflows and automation systems that scale your marketing operations efficiently.",
    tags: ["AI Workflows", "Chatbots", "Automation"],
    slug: "/services/ai-automation-services",
  },
];

const ServicesPage = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <SEOHead
        title="Digital Marketing Services"
        description="Explore our full suite of digital marketing services including website design, SEO, lead generation, social media, PPC, and AI automation."
        jsonLd={serviceJsonLd(
          "Digital Marketing Services",
          "Full-service digital marketing agency offering website design, SEO, lead generation, social media, PPC, and AI automation."
        )}
      />

      <PageHero
        overline={{
    normal: "Our",
    highlight: "Services",
}}
        title="Services built for"
        titleAccent="exceptional outcomes"
        description="We combine deep expertise in digital marketing with cutting-edge technology to deliver measurable results for ambitious brands."
      />

      <SectionTransition>
        <section className="py-12 site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {services.map((svc, i) => (
              <ScrollReveal key={svc.title} delay={i * 0.08}>
                <TiltCard className="h-full">

                  <div
                    className="glass rounded-2xl p-5 md:p-6 h-[300px] md:h-[310px] flex flex-col group 
                    border border-orange-500 bg-white/[0.06] dark:bg-white/[0.04]
                    relative overflow-hidden cursor-pointer 
                    transition-all duration-300 
                    hover:bg-white/[0.08] hover:-translate-y-1 
                    "
                    onClick={() => navigate(svc.slug)}
                  >

                    {/* subtle highlight (no blur) */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] pointer-events-none rounded-2xl" />

                    {/* bottom accent (no blur) */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-accent/0 group-hover:bg-accent/30 transition-all duration-500 pointer-events-none" />

                    <div className="relative z-10 flex flex-col h-full">

                      {/* micro */}
                      <p className="text-accent text-xs font-grotesk uppercase tracking-widest mb-2">
                        {svc.micro}
                      </p>

                      {/* title */}
                      <h3 className="text-foreground font-semibold text-lg md:text-xl font-grotesk mb-3">
                        {svc.title}
                      </h3>

                      {/* description */}
                      <p className="text-foreground/80 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                        {svc.description}
                      </p>

                      {/* tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {svc.tags.map((tag) => (
                          <span
                            key={tag}
                            className="glass text-xs text-foreground px-3 py-1 rounded-full border border-white/10 bg-white/[0.08] dark:bg-white/[0.05]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <span className="text-accent font-medium text-xs font-grotesk uppercase tracking-wider group-hover:tracking-[0.2em] transition-all duration-300">
                        Learn More →
                      </span>

                    </div>
                  </div>

                </TiltCard>
              </ScrollReveal>
            ))}

          </div>
        </section>
      </SectionTransition>

      <SectionTransition>
        <UrgencyCTA
          headline="Ready to dominate"
          headlineAccent="your market?"
          primaryCTA="Get Your Free Marketing Audit"
          secondaryCTA="Book a Free Strategy Call"
          urgencyNote="Free consultation available — limited slots this month"
          sourcePage="Services Page"
        />
      </SectionTransition>

    </PageLayout>
  );
};

export default ServicesPage;