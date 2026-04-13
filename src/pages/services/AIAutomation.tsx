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

// Content (AI Automation content file)
import {
  heroData,
  problemData,
  serviceData,
  approachData,
  processData,
  resultsData,
  ctaData,aiAutomationContent
} from "@/content/aiAutomation";

const AIAutomation = () => {
  return (
    <PageLayout>
      <SEOHead
        title="AI Automation Services | Automate Workflows & Scale Faster"
        description="Streamline your business with AI automation. Automate repetitive tasks, improve efficiency, and build scalable systems."
        jsonLd={serviceJsonLd(
          "AI Automation Services",
          "AI-powered automation systems designed to streamline workflows, reduce manual work, and improve efficiency."
        )}
      />

      {/* FLOW: System-focused narrative */}
      <HeroSection data={heroData} />
      <ProblemSection data={problemData} service="aiAutomation"/>
      <ServiceBreakdown data={serviceData} />

      {/* Mid CTA */}
      <CTASection data={ctaData} />

      <ApproachSection data={approachData} />
      <ProcessSection data={processData} />
      <ResultsSection data={resultsData} />
      <EditorialSection data={aiAutomationContent} />
      <FAQSection data={faqData} categories={["AI Automation"]} />

      {/* Final CTA */}
      <CTASection data={ctaData} />
    </PageLayout>
  );
};

export default AIAutomation;