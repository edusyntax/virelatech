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
        title="SEO Services in Hyderabad | Drive Organic Traffic & Leads"
        description="Get high-quality organic traffic with SEO strategies focused on intent, visibility, and long-term growth."
        jsonLd={serviceJsonLd(
          "SEO Services",
          "Search engine optimization services designed to improve visibility, attract the right audience, and generate consistent leads."
        )}
      />

      {/* FLOW: Trust-driven narrative */}
      <HeroSection data={heroData} />
      <ProblemSection data={problemData} service="seo"/>
      <ServiceBreakdown data={serviceData} />

      {/* Mid CTA */}
      <CTASection data={ctaData} />

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