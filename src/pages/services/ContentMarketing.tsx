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
import { EditorialSection } from "@/pages/services/ui/ContentSection";


// Content (Content Marketing content file)
import {
  heroData,
  problemData,
  serviceData,
  approachData,
  processData,
  resultsData,
  ctaData,contentMarketingContent
} from "@/content/contentMarketing";

const ContentMarketing = () => {

  return (
    <PageLayout>
      <SEOHead
        title="Content Marketing Services | Drive Traffic, Authority & Conversions"
        description="Strategic content marketing that attracts the right audience, builds authority, and improves conversions."
        jsonLd={serviceJsonLd(
          "Content Marketing Services",
          "Content strategies designed to drive organic traffic, build authority, and improve business conversions."
        )}
      />

      {/* FLOW: Intent + authority narrative */}
      <HeroSection data={heroData} />
      <ProblemSection data={problemData} service="contentMarketing" />
      <ServiceBreakdown data={serviceData} />


      <ApproachSection data={approachData} />
      <ProcessSection data={processData} />
      <ResultsSection data={resultsData} />
      <EditorialSection data={contentMarketingContent} />
      {/* FAQ (filtered by category) */}
      <FAQSection data={faqData} categories={["Content Marketing"]} />

      {/* Final CTA */}
      <CTASection data={ctaData} />
    </PageLayout>
  );
};

export default ContentMarketing;