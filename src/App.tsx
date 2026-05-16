import { lazy, Suspense } from "react";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeProvider from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { LeadModalProvider } from "./contexts/LeadModalContext";

import Index from "./pages/Index";
const NotFound = lazy(() => import("./pages/NotFound"));
const ServicesPage = lazy(() => import("./pages/Services"));
const WebsiteDesign = lazy(() => import("./pages/services/WebsiteDesign"));
const SEOServices = lazy(() => import("./pages/services/SEOServices"));
const GoogleAds = lazy(() => import("./pages/services/GoogleAds"));
const LeadGeneration = lazy(() => import("./pages/services/LeadGeneration"));
const SocialMediaMarketing = lazy(() => import("./pages/services/SocialMediaMarketing"));
const PPCServices = lazy(() => import("./pages/services/PPCServices"));
const AIAutomation = lazy(() => import("./pages/services/AIAutomation"));
const Aboutus = lazy(() => import("./pages/Aboutpage"));
const BlogPage = lazy(() => import("./pages/Blogpage"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const ContactPage = lazy(() => import("./pages/Contact"));
const AdminLogin = lazy(() => import("./pages/admin/Login"));
const ForgotPassword = lazy(() => import("./pages/admin/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/admin/ResetPassword"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Posts = lazy(() => import("./pages/admin/Posts"));
const PostEditor = lazy(() => import("./pages/admin/PostEditor"));
const Categories = lazy(() => import("./pages/admin/Categories"));
const TagsPage = lazy(() => import("./pages/admin/Tags"));
const MediaLibrary = lazy(() => import("./pages/admin/MediaLibrary"));
const Authors = lazy(() => import("./pages/admin/Authors"));
const Leads = lazy(() => import("./pages/admin/Leads"));
const LeadDetail = lazy(() => import("./pages/admin/LeadDetail"));

const TestimonialsPage = lazy(() => import("./pages/TestimonialsPage"));
const EmailMarketing = lazy(() => import("./pages/services/Emailmarketing"));
const ContentMarketing = lazy(() => import("./pages/services/ContentMarketing"));

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
            <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
              
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/about" element={<Aboutus />} />
                <Route path="/services/website-development-services" element={<WebsiteDesign />} />
                <Route path="/services/seo-services" element={<SEOServices />} />
                <Route path="/services/google-ads-services" element={<GoogleAds />} />
                <Route path="/services/lead-generation-campaigns-services" element={<LeadGeneration />} />
                <Route path="/services/social-media-marketing-services" element={<SocialMediaMarketing />} />
                <Route path="/services/meta-ads-services" element={<PPCServices />} />
                <Route path="/services/content-marketing-services" element={<ContentMarketing />} />
                <Route path="/services/email-marketing-services" element={<EmailMarketing />} />
                <Route path="/services/ai-automation-services" element={<AIAutomation />} />
                <Route path="/testimonials" element={<TestimonialsPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/preview/:slug" element={<BlogArticle />} />
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

                <Route path="*" element={<NotFound />} />
              </Routes>

            </Suspense>
            

          </AuthProvider>
        </BrowserRouter>
      </LeadModalProvider>
    </TooltipProvider>
  </QueryClientProvider>
</ThemeProvider>
);

export default App;
