import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SmoothScroll from "@/components/SmoothScroll";
import BackgroundLayers from "@/components/BackgroundLayers";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import PageTransition from "@/components/PageTransition";
import SectionTransition from "@/components/SectionTransition";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <SmoothScroll>
      <BackgroundLayers />
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      <ScrollToTop />
      <PageTransition>
        <main>
          {children}
          <SectionTransition>
            <Footer />
          </SectionTransition>
        </main>
      </PageTransition>
    </SmoothScroll>
  );
};

export default PageLayout;
