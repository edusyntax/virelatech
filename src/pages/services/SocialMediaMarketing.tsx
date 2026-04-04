import PageLayout from "@/components/PageLayout";
import SEOHead, { serviceJsonLd } from "@/components/SEOHead";

// Sections
import { HeroSection } from "@/pages/services/ui/HeroSection";
import { ProblemSection } from "@/pages/services/ui/ProblemSection";
import { ServiceBreakdown } from "@/pages/services/ui/ServiceBreakdown";
import { ApproachSection } from "@/pages/services/ui/ApproachSection";
import { ProcessSection } from "@/pages/services/ui/ProcessSection";
import { ResultsSection } from "@/pages/services/ui/ResultsSection";
import { CTASection } from "@/pages/services/ui/CTASection";
import FAQSection from "@/components/ui/serviceFaq";
import { faqData } from "@/content/servicesfaq";

// Content (Social Media content file)
import {
  heroData,
  problemData,
  serviceData,
  approachData,
  processData,
  resultsData,
  ctaData
} from "@/content/smmarketing";

const SocialMedia = () => {
  return (
    <PageLayout>
      <SEOHead
        title="Social Media Marketing Services | Build Engagement & Brand Growth"
        description="Strategic social media marketing that builds brand presence, improves engagement, and drives real business results."
        jsonLd={serviceJsonLd(
          "Social Media Marketing Services",
          "Social media strategies designed to build brand presence, engage audiences, and drive measurable growth."
        )}
      />

      {/* FLOW: Brand + engagement narrative */}
      <HeroSection data={heroData} />
      <ProblemSection data={problemData} service="socialMedia" />
      <ServiceBreakdown data={serviceData} />

      {/* Mid CTA */}
      <CTASection data={ctaData} />

      <ApproachSection data={approachData} />
      <ProcessSection data={processData} />
      <ResultsSection data={resultsData} />
      <FAQSection data={faqData} categories={["Social Media Marketing"]} />
      {/* Final CTA */}
      <CTASection data={ctaData} />
    </PageLayout>
  );
};

export default SocialMedia;