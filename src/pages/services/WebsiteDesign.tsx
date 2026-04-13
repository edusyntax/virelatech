import PageLayout from "@/components/PageLayout";
import SEOHead, { serviceJsonLd } from "@/components/SEOHead";

// Sections
import { HeroSection } from "@/pages/services/ui/HeroSection";
import { ProblemSection } from "@/pages/services/ui/ProblemSection";
import { ServiceBreakdown } from "@/pages/services/ui/ServiceBreakdown";
import { ApproachSection } from "@/pages/services/ui/ApproachSection";
import { ProcessSection } from "@/pages/services/ui/ProcessSection";
import { ResultsSection } from "@/pages/services/ui/ResultsSection";
import FAQSection from "@/components/ui/serviceFaq";
import { CTASection } from "@/pages/services/ui/CTASection";
import { ctaData ,webDevelopmentContent} from "@/content/webDesign";
import { EditorialSection } from "@/pages/services/ui/ContentSection";



// Content
import { heroData, problemData, serviceData, approachData, processData, resultsData } from "@/content/webDesign";
import { faqData } from "@/content/servicesfaq";

// Reusable CTA (clean + reusable)


const WebsiteDesign = () => {
  return (
    <PageLayout>
      <SEOHead
        title="Premium Website Design Services | High-Converting Websites"
        description="Conversion-focused website design services. Fast, scalable, SEO-optimized websites that turn visitors into customers."
        jsonLd={serviceJsonLd(
          "Website Design",
          "High-performance custom website design built for conversion, speed, and scalability."
        )}
      />

      {/* FLOW: clean linear narrative */}
      <HeroSection data={heroData} />
      <ProblemSection data={problemData} service="webDevelopment" />
      <ServiceBreakdown data={serviceData} />

     <CTASection data={ctaData} />

      <ApproachSection data={approachData} />
      <ProcessSection data={processData} />
      <ResultsSection data={resultsData} />
      <EditorialSection data={webDevelopmentContent} />
      <FAQSection data={faqData} categories={["Web Development"]} />

      <CTASection data={ctaData} />
    </PageLayout>
  );
};

export default WebsiteDesign;