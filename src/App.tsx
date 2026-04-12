import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeProvider from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ServicesPage from "./pages/Services";
import WebsiteDesign from "./pages/services/WebsiteDesign";
import SEOServices from "./pages/services/SEOServices";
import GoogleAds from "./pages/services/GoogleAds"; 
import LeadGeneration from "./pages/services/LeadGeneration";
import SocialMediaMarketing from "./pages/services/SocialMediaMarketing";
import PPCServices from "./pages/services/PPCServices";
import AIAutomation from "./pages/services/AIAutomation";
import Aboutus from "./pages/Aboutpage";
import BlogPage from "./pages/Blogpage";
import BlogArticle from "./pages/BlogArticle";
import ContactPage from "./pages/Contact";

// Admin
import AdminLogin from "./pages/admin/Login";
import ForgotPassword from "./pages/admin/ForgotPassword";
import ResetPassword from "./pages/admin/ResetPassword";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Posts from "./pages/admin/Posts";
import PostEditor from "./pages/admin/PostEditor";
import Categories from "./pages/admin/Categories";
import TagsPage from "./pages/admin/Tags";
import MediaLibrary from "./pages/admin/MediaLibrary";
import Authors from "./pages/admin/Authors";
import Leads from "./pages/admin/Leads";
import LeadDetail from "./pages/admin/LeadDetail";
import { LeadModalProvider } from "./contexts/LeadModalContext";

import TestimonialsPage from "./pages/TestimonialsPage";
import EmailMarketing from "./pages/services/Emailmarketing";
import ContentMarketing from "./pages/services/ContentMarketing";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 min
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LeadModalProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/about" element={<Aboutus />} />
              <Route path="/services/website-design" element={<WebsiteDesign />} />
              <Route path="/services/seo-services" element={<SEOServices />} />
              <Route path="/services/google-ads" element={<GoogleAds />} />
              <Route path="/services/lead-generation-campaigns" element={<LeadGeneration />} />
              <Route path="/services/social-media-marketing" element={<SocialMediaMarketing />} />
              <Route path="/services/meta-ads" element={<PPCServices />} />
              <Route path="/services/content-marketing" element={<ContentMarketing />} />
              <Route path="/services/email-marketing" element={<EmailMarketing />} />
              <Route path="/services/ai-automation" element={<AIAutomation />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/blog" element={<BlogPage/>} />
              <Route path="/blog/:slug" element={<BlogArticle />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/forgot-password" element={<ForgotPassword />} />
              <Route path="/admin/reset-password" element={<ResetPassword />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="posts" element={<Posts />} />
                <Route path="posts/create" element={<PostEditor />} />
                <Route path="posts/edit/:id" element={<PostEditor />} />
                <Route path="categories" element={<Categories />} />
                <Route path="tags" element={<TagsPage />} />
                <Route path="media" element={<MediaLibrary />} />
                <Route path="authors" element={<Authors />} />
                <Route path="leads" element={<Leads />} />
                <Route path="leads/:id" element={<LeadDetail />} />
              </Route>

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
        </LeadModalProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
