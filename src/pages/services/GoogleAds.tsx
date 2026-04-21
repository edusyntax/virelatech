import PageLayout from "@/components/PageLayout";
import SEOHead from "@/components/SEOHead";
import { seoConfig } from "@/seo/seo.config";
import { useEffect } from "react";
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


// Content (Google Ads content file)
import {
  heroData,
  problemData,
  serviceData,
  approachData,
  processData,
  resultsData,
  ctaData,
  googleAdsContent
} from "@/content/googleads";

const GoogleAds = () => {
 useEffect(() => {
  const timer = setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, 50); // slight delay ensures content is mounted

  return () => clearTimeout(timer);
}, []);
  return (
    <PageLayout>
      <SEOHead
       {...seoConfig.googleAds}
      />

      {/* FLOW: Conversion-focused narrative */}
      <HeroSection data={heroData} />
      <ProblemSection data={problemData} service="googleAds" />
      <ServiceBreakdown data={serviceData} />



      <ApproachSection data={approachData} />
      <ProcessSection data={processData} />
      <ResultsSection data={resultsData} />
      <EditorialSection data={googleAdsContent} />
      <FAQSection data={faqData} categories={["Google Ads"]} />

      {/* Final CTA */}
      <CTASection data={ctaData} />
    </PageLayout>
  );
};

export default GoogleAds;