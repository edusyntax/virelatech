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
import { EditorialSection } from "./ui/ContentSection";


// Content (SEO content file)
import {
  heroData,
  problemData,
  serviceData,
  approachData,
  processData,
  resultsData,
  ctaData,
  seoContent 
} from "@/content/seoservices";

const SEOService = () => {
  return (
    <PageLayout>
      <SEOHead
      {...seoConfig.seo}
      />

      {/* FLOW: Trust-driven narrative */}
      <HeroSection data={heroData} />
      <ProblemSection data={problemData} service="seo"/>
      <ServiceBreakdown data={serviceData} />

    

      <ApproachSection data={approachData} />
      <ProcessSection data={processData} />
      <ResultsSection data={resultsData} />
       <EditorialSection data={seoContent} /> 
      <FAQSection data={faqData} categories={["SEO"]} />

      {/* Final CTA */}
      <CTASection data={ctaData} />
    </PageLayout>
  );
};

export default SEOService;