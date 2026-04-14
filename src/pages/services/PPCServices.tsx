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

// Content (Meta Ads content file)
import {
  heroData,
  problemData,
  serviceData,
  approachData,
  processData,
  resultsData,
  ctaData
} from "@/content/metaads";

const MetaAds = () => {
  return (
    <PageLayout>
      <SEOHead
        title="Meta Ads Services | Facebook & Instagram Ads for Lead Generation"
        description="Run high-performing Meta Ads campaigns on Facebook and Instagram. Target the right audience, improve conversions, and scale results."
        jsonLd={serviceJsonLd(
          "Meta Ads Services",
          "Facebook and Instagram advertising campaigns designed to generate leads, improve conversions, and scale business growth."
        )}
      />

      {/* FLOW: Performance + creative narrative */}
      <HeroSection data={heroData} />
      <ProblemSection data={problemData} service="metaAds" />
      <ServiceBreakdown data={serviceData} />



      <ApproachSection data={approachData} />
      <ProcessSection data={processData} />
      <ResultsSection data={resultsData} />
      <FAQSection data={faqData} categories={["Meta Ads"]} />
      {/* Final CTA */}
      <CTASection data={ctaData} />
    </PageLayout>
  );
};

export default MetaAds;