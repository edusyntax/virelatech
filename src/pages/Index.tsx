import { useState, useCallback, lazy, Suspense } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import BackgroundLayers from "@/components/BackgroundLayers";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TrustStrip from "@/components/TrustStrip";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import AboutSection from "@/components/AboutSection";
import Faq from "@/components/ui/Faq";
import HowItWorks from "@/components/HowItWorks";
import MetricsSection from "@/components/MetricsSection";
import FullscreenCTA from "@/components/FullscreenCTA";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollToTop from "@/components/ScrollToTop";
import PageTransition from "@/components/PageTransition";
import SectionTransition from "@/components/SectionTransition";
import SEOHead, { organizationJsonLd } from "@/components/SEOHead";
import TestimonialsSection from "@/components/TestimonialsSection";
const LazyBlogPage = lazy(() => import("./Blog"));

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const handleLoadComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      <SEOHead
        title="Digital Marketing Agency"
        description="VirelaTech is an elite digital marketing agency engineering brand authority through performance marketing, SEO, AI automation, and data-driven growth strategies."
        path="/"
        jsonLd={organizationJsonLd}
      />
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}
      <SmoothScroll>
        <BackgroundLayers />
        <CustomCursor />
        <ScrollProgress />
        <Navigation />
        <ScrollToTop />
        <PageTransition>
          <main>
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
            <SectionTransition><Footer /></SectionTransition>
          </main>
        </PageTransition>
      </SmoothScroll>
    </>
  );
};

export default Index;
