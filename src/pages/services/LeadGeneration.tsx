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

// Content (Lead Generation content file)
import {
  heroData,
  problemData,
  serviceData,
  approachData,
  processData,
  resultsData,
  ctaData,
  leadGenContent
} from "@/content/leadgeneration";

const LeadGeneration = () => {
  return (
    <PageLayout>
      <SEOHead
        title="Lead Generation Services | Generate High-Quality Leads Consistently"
        description="Build a predictable pipeline with lead generation systems designed to attract, capture, and convert high-quality prospects."
        jsonLd={serviceJsonLd(
          "Lead Generation Services",
          "Multi-channel lead generation systems designed to attract, nurture, and convert qualified prospects into customers."
        )}
      />

      {/* FLOW: Conversion-focused narrative */}
      <HeroSection data={heroData} />
      <ProblemSection data={problemData} service="leadGeneration"/>
      <ServiceBreakdown data={serviceData} />

      {/* Mid CTA */}
      <CTASection data={ctaData} />

      <ApproachSection data={approachData} />
      <ProcessSection data={processData} />
      <ResultsSection data={resultsData} />
      <EditorialSection data={leadGenContent} />
      <FAQSection data={faqData} categories={["Lead Generation"]} />
      {/* Final CTA */}
      <CTASection data={ctaData} />
    </PageLayout>
  );
};

export default LeadGeneration;