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

// Content (Email Marketing content file)
import {
  heroData,
  problemData,
  serviceData,
  approachData,
  processData,
  resultsData,
  ctaData,emailMarketingContent
} from "@/content/emailMarketing";

const EmailMarketing = () => {
  return (
    <PageLayout>
      <SEOHead
        title="Email Marketing Services | Engage, Nurture & Convert Customers"
        description="Email marketing systems designed to improve engagement, nurture leads, and drive consistent conversions through relevant communication."
        jsonLd={serviceJsonLd(
          "Email Marketing Services",
          "Strategic email marketing campaigns and automation designed to engage audiences, nurture leads, and improve conversions."
        )}
      />

      {/* FLOW: Relationship + conversion narrative */}
      <HeroSection data={heroData} />
      <ProblemSection data={problemData} service="emailMarketing"/>
      <ServiceBreakdown data={serviceData} />

      {/* Mid CTA */}
      <CTASection data={ctaData} />

      <ApproachSection data={approachData} />
      <ProcessSection data={processData} />
      <ResultsSection data={resultsData} />
      <EditorialSection data={emailMarketingContent} />
      <FAQSection data={faqData} categories={["Email Marketing"]} />  

      {/* Final CTA */}
      <CTASection data={ctaData} />
    </PageLayout>
  );
};

export default EmailMarketing;