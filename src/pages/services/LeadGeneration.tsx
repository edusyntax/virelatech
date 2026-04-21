import PageLayout from "@/components/PageLayout";
import SEOHead from "@/components/SEOHead";
import { seoConfig } from "@/seo/seo.config";

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
       {...seoConfig.leadGeneration}
      />

      {/* FLOW: Conversion-focused narrative */}
      <HeroSection data={heroData} />
      <ProblemSection data={problemData} service="leadGeneration"/>
      <ServiceBreakdown data={serviceData} />


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