// ─── MODIFIED: src/pages/Index.tsx ───────────────────────────────────────────
import { useState, useCallback, lazy, Suspense } from "react";

// ✅ FIX: Import PageLayout — homepage was bypassing SmoothScroll entirely
import PageLayout from "@/components/PageLayout";
import SEOHead from "@/components/SEOHead";
import { seoConfig } from "@/seo/seo.config";
import LoadingScreen from "@/components/LoadingScreen";
import HeroSection from "@/components/HeroSection";
import TrustStrip from "@/components/TrustStrip";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import AboutSection from "@/components/AboutSection";
import Faq from "@/components/ui/Faq";
import HowItWorks from "@/components/HowItWorks";
import MetricsSection from "@/components/MetricsSection";
import SectionTransition from "@/components/SectionTransition";
import TestimonialsSection from "@/components/TestimonialsSection";


const LazyBlogPage = lazy(() => import("./Blog"));

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const handleLoadComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
     <SEOHead {...seoConfig.home} />

      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}

      {/* ✅ FIX: PageLayout provides SmoothScroll + ScrollReset + Navigation +
          CustomCursor + ScrollProgress + ScrollToTop — don't duplicate them */}
      <PageLayout>
        <HeroSection />
        <SectionTransition><TrustStrip /></SectionTransition>
        <SectionTransition><CapabilitiesSection /></SectionTransition>
        <SectionTransition><AboutSection /></SectionTransition>
        <SectionTransition><MetricsSection /></SectionTransition>
        <SectionTransition><HowItWorks /></SectionTransition>
        <SectionTransition><TestimonialsSection /></SectionTransition>
        <Suspense fallback={null}>
          <LazyBlogPage />
        </Suspense>
        <Faq />
        {/* ✅ NOTE: Footer is already rendered by PageLayout inside SectionTransition.
            Remove it here to avoid a duplicate footer. */}
      </PageLayout>
    </>
  );
};

export default Index;