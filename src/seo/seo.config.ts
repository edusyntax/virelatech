const BASE_URL = "https://www.virelatech.com";

export const seoConfig = {
  home: {
    title:
      "Digital Marketing Agency in Hyderabad | SEO-Google Ads-Social Media Services",
    description:
      "Virelatech is a leading Digital Marketing Agency in Hyderabad offering SEO, Google Ads, Social Media Marketing, and Lead Generation services. Grow your business with result-driven strategies. Get a free consultation today!",
    keywords:
      "Digital Marketing Agency Hyderabad, SEO Services Hyderabad, Google Ads Agency Hyderabad, Social Media Marketing Hyderabad, Lead Generation Services, Performance Marketing Hyderabad",
    path: "/",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Digital Marketing Services",
      provider: {
        "@type": "Organization",
        name: "Virelatech",
        url: BASE_URL,
      },
      areaServed: {
        "@type": "City",
        name: "Hyderabad",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Digital Marketing Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "SEO Services in Hyderabad",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Google Ads Management",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Social Media Marketing",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Lead Generation Services",
            },
          },
        ],
      },
    },
  },

  websiteDevelopment: {
    title:
      "Website Development Services in Hyderabad | Custom Web Design | Development",
    description:
      "Looking for website development services in Hyderabad? Virelatech builds responsive, SEO-friendly, and high-converting websites for businesses. Get custom web design, fast-loading pages, and lead-focused development. Contact us today!",
    keywords:
      "website development services hyderabad, web design company hyderabad, custom website development, responsive web design, ecommerce website development, Virelatech",
    path: "/services/website-development",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Website Development Services",
      name: "Website Development Services in Hyderabad",
      description:
        "Virelatech offers professional website development services in Hyderabad including custom web design, responsive websites, SEO-friendly development, and eCommerce solutions.",
      provider: {
        "@type": "Organization",
        name: "Virelatech",
        url: BASE_URL,
      },
      areaServed: {
        "@type": "City",
        name: "Hyderabad",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Website Development Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Custom Website Development" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Responsive Web Design" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "E-commerce Website Development" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "SEO-Friendly Website Development" },
          },
        ],
      },
    },
  },

  seo: {
    title:
      "SEO Services in Hyderabad | Best SEO Agency for Organic Growth – Virelatech",
    description:
      "Looking for Best SEO services in Hyderabad? Virelatech offers result-driven SEO strategies to improve rankings, increase organic traffic, and generate quality leads. Get expert on-page, off-page, and technical SEO services. Contact us today!",
    keywords:
      "seo services hyderabad, seo company hyderabad, best seo agency hyderabad, local seo services, technical seo services, on page seo, off page seo, virelatech",
    path: "/services/seo",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "SEO Services",
      name: "SEO Services in Hyderabad",
      description:
        "Virelatech provides professional SEO services in Hyderabad including on-page SEO, technical SEO, off-page SEO, keyword research, and local SEO to improve rankings and drive organic traffic.",
      provider: {
        "@type": "Organization",
        name: "Virelatech",
        url: BASE_URL,
      },
      areaServed: {
        "@type": "City",
        name: "Hyderabad",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "SEO Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "On-Page SEO Optimization" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Technical SEO Audit" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Off-Page SEO & Link Building" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Local SEO Services" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Keyword Research & Strategy" } },
        ],
      },
    },
  },

  googleAds: {
    title:
      "Google Ads Services in Hyderabad | PPC Management & Lead Generation – Virelatech",
    description:
      "Looking for Google Ads services in Hyderabad? Virelatech offers expert PPC management to increase leads, conversions, and ROI. Get search, display, and remarketing campaigns optimized for results. Book a free consultation today!",
    keywords:
      "google ads services hyderabad, PPC services hyderabad, google ads agency hyderabad, pay per click advertising, search ads management, display ads services.",
    path: "/services/google-ads",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Google Ads Services",
      name: "Google Ads Services in Hyderabad",
      description:
        "Virelatech provides expert Google Ads services in Hyderabad including PPC campaign management, search ads, display ads, remarketing, and conversion optimization to generate leads and maximize ROI.",
      provider: {
        "@type": "Organization",
        name: "Virelatech",
        url: BASE_URL,
      },
      areaServed: {
        "@type": "City",
        name: "Hyderabad",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Google Ads Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Search Ads Management" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Display Advertising" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Remarketing Campaigns" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "PPC Strategy & Keyword Research" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Conversion Rate Optimization" } },
        ],
      },
    },
  },

    leadGeneration: {
    title:
      "Lead Generation Services in Hyderabad | B2B & Performance Marketing – Virelatech",
    description:
      "Looking for lead generation services in Hyderabad? Virelatech helps businesses generate high-quality leads through data-driven strategies, paid ads, SEO, and automation. Increase conversions and grow your sales pipeline. Get a free consultation today!",
    keywords:
      "lead generation services hyderabad, b2b lead generation hyderabad, lead generation company hyderabad, performance marketing services, sales lead generation, digital lead generation, virelatech",
    path: "/services/lead-generation",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Lead Generation Services",
      name: "Lead Generation Services in Hyderabad",
      description:
        "Virelatech offers professional lead generation services in Hyderabad including B2B lead generation, performance marketing, paid ads, SEO, and marketing automation to generate high-quality leads and increase conversions.",
      provider: {
        "@type": "Organization",
        name: "Virelatech",
        url: BASE_URL,
      },
      areaServed: {
        "@type": "City",
        name: "Hyderabad",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Lead Generation Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "B2B Lead Generation" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Performance Marketing Campaigns" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Google Ads Lead Generation" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Social Media Lead Generation" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Marketing Automation & CRM Integration" } },
        ],
      },
    },
  },

  socialMedia: {
    title:
      "Social Media Marketing Services in Hyderabad | SMM & Meta Ads Agency – Virelatech",
    description:
      "Looking for social media marketing services in Hyderabad? Virelatech helps brands grow with Instagram, Facebook, LinkedIn & Meta Ads strategies. Increase engagement, followers, and leads with data-driven campaigns. Get a free consultation today!",
    keywords:
      "social media marketing hyderabad, smm services hyderabad, social media agency hyderabad, instagram marketing services, facebook ads agency hyderabad, meta ads services, virelatech",
    path: "/services/social-media-marketing",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Social Media Marketing Services",
      name: "Social Media Marketing Services in Hyderabad",
      description:
        "Virelatech provides expert social media marketing services in Hyderabad including Instagram marketing, Facebook ads, LinkedIn marketing, content strategy, and influencer campaigns to increase engagement and generate leads.",
      provider: {
        "@type": "Organization",
        name: "Virelatech",
        url: BASE_URL,
      },
      areaServed: {
        "@type": "City",
        name: "Hyderabad",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Social Media Marketing Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Instagram Marketing" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Facebook Ads Management" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "LinkedIn Marketing" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Content Strategy & Social Media Management" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Influencer Marketing" } },
        ],
      },
    },
  },

  contentMarketing: {
    title:
      "Content Marketing Services in Hyderabad | SEO Content & Blog Writing – Virelatech",
    description:
      "Looking for content marketing services in Hyderabad? Virelatech creates SEO-optimized blogs, website content, and marketing copy to drive traffic, build authority, and generate leads. Grow your business with strategic content. Get a free consultation today!",
    keywords:
      "Content marketing services hyderabad, content writing services hyderabad, seo content writing, blog writing services, website content writing, copywriting services, virelatech",
    path: "/services/content-marketing",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Content Marketing Services",
      name: "Content Marketing Services in Hyderabad",
      description:
        "Virelatech provides professional content marketing services in Hyderabad including SEO content writing, blog writing, website content, and copywriting to drive traffic, build brand authority, and generate leads.",
      provider: {
        "@type": "Organization",
        name: "Virelatech",
        url: BASE_URL,
      },
      areaServed: {
        "@type": "City",
        name: "Hyderabad",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Content Marketing Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO Content Writing" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Blog Writing Services" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website Content Writing" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Copywriting Services" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Content Strategy & Planning" } },
        ],
      },
    },
  },

  emailMarketing: {
    title:
      "Email Marketing Services in Hyderabad | Automation & Lead Nurturing – Virelatech",
    description:
      "Looking for email marketing services in Hyderabad? Virelatech offers automated email campaigns, lead nurturing, and personalized strategies to boost engagement, conversions, and customer retention. Get a free consultation today!",
    keywords:
      "email marketing services hyderabad, email marketing agency hyderabad, email automation services, lead nurturing campaigns, email campaign management, email marketing strategy, virelatech",
    path: "/services/email-marketing",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Email Marketing Services",
      name: "Email Marketing Services in Hyderabad",
      description:
        "Virelatech provides professional email marketing services in Hyderabad including automated email campaigns, lead nurturing, personalization, segmentation, and performance tracking to increase engagement and conversions.",
      provider: {
        "@type": "Organization",
        name: "Virelatech",
        url: BASE_URL,
      },
      areaServed: {
        "@type": "City",
        name: "Hyderabad",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Email Marketing Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Email Campaign Management" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Email Automation Workflows" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lead Nurturing Campaigns" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Email Personalization & Segmentation" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "A/B Testing & Optimization" } },
        ],
      },
    },
  },

  metaAds: {
    title:
      "Meta Ads Services in Hyderabad | Facebook & Instagram Ads Agency – Virelatech",
    description:
      "Looking for Meta Ads services in Hyderabad? Virelatech offers expert Facebook & Instagram Ads management to generate leads, boost conversions, and maximize ROI.",
    keywords:
      "Meta ads services hyderabad, facebook ads agency hyderabad, instagram ads services, meta ads management",
    path: "/services/meta-ads",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Meta Ads Services",
      name: "Meta Ads Services in Hyderabad",
      description:
        "Virelatech provides professional Meta Ads services including Facebook Ads and Instagram Ads.",
      provider: {
        "@type": "Organization",
        name: "Virelatech",
        url: BASE_URL,
      },
      areaServed: { "@type": "City", name: "Hyderabad" },
    },
  },

  aiAutomation: {
    title:
      "AI Automation Services in Hyderabad | Business Process Automation & AI Solutions – Virelatech",
    description:
      "Looking for AI automation services in Hyderabad? Virelatech helps businesses automate workflows, reduce costs, and scale operations with AI-powered solutions.",
    keywords:
      "ai automation services hyderabad, business automation services, workflow automation solutions",
    path: "/services/ai-automation",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "AI Automation Services",
      name: "AI Automation Services in Hyderabad",
      description:
        "Virelatech provides AI automation services including business process automation and AI chatbots.",
      provider: {
        "@type": "Organization",
        name: "Virelatech",
        url: BASE_URL,
      },
      areaServed: { "@type": "City", name: "Hyderabad" },
    },
  },
  about: {
  title: "About Virelatech | Digital Marketing Agency in Hyderabad",
  description:
    "Learn about Virelatech, a leading digital marketing agency in Hyderabad specializing in SEO, Google Ads, social media marketing, and AI automation. Discover our mission, expertise, and commitment to driving business growth.",
  keywords:
    "About virelatech, digital marketing agency hyderabad, virelatech company profile, marketing company hyderabad, seo agency hyderabad",
  path: "/about",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Virelatech",
    url: `${BASE_URL}/about`,
    description:
      "Learn about Virelatech, a digital marketing agency in Hyderabad specializing in SEO, Google Ads, social media marketing, and AI automation services.",
    mainEntity: {
      "@type": "Organization",
      name: "Virelatech",
      url: BASE_URL,
      logo: `${BASE_URL}/logo.png`,
      description:
        "Virelatech is a digital marketing agency focused on performance marketing, SEO, AI automation, and data-driven growth strategies.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        addressCountry: "IN"
      },
      sameAs: [
        "https://www.linkedin.com/",
        "https://www.instagram.com/",
        "https://www.facebook.com/"
      ]
    }
  }
},
contact: {
  title: "Contact Virelatech | Digital Marketing Agency in Hyderabad",
  description:
    "Contact Virelatech, a leading digital marketing agency in Hyderabad. Get in touch for SEO, Google Ads, social media marketing, and lead generation services. Book a free consultation today!",
  keywords:
    "Contact virelatech, digital marketing agency hyderabad contact, seo company hyderabad contact, marketing agency phone number, virelatech contact details",
  path: "/contact",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Virelatech",
    url: `${BASE_URL}/contact`,
    image: `${BASE_URL}/logo.png`,
    description:
      "Virelatech is a digital marketing agency in Hyderabad offering SEO, Google Ads, social media marketing, and lead generation services.",
    
    address: {
      "@type": "PostalAddress",
      streetAddress: "Your Office Address Here",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500085",
      addressCountry: "IN"
    },

    geo: {
      "@type": "GeoCoordinates",
      latitude: "17.3850",
      longitude: "78.4867"
    },

    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      opens: "09:00",
      closes: "18:00"
    },

    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9753456333",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Telugu"]
    },

    sameAs: [
      "https://www.facebook.com/",
      "https://www.instagram.com/",
      "https://www.linkedin.com/"
    ]
  }
},
services: {
  title:
    "Digital Marketing Services in Hyderabad | SEO, Google Ads & More – Virelatech",
  description:
    "Explore Virelatech’s digital marketing services in Hyderabad including SEO, Google Ads, Social Media Marketing, Lead Generation, Website Development, Content Marketing, Email Marketing, Meta Ads, and AI Automation services. Grow your business with result-driven strategies.",
  keywords:
    "digital marketing services hyderabad, seo services hyderabad, google ads services hyderabad, social media marketing hyderabad, lead generation services, website development hyderabad, content marketing services, email marketing services, meta ads services, ai automation services",
  path: "/services",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Digital Marketing Services",
    name: "Digital Marketing Services in Hyderabad",
    description:
      "Virelatech offers comprehensive digital marketing services including SEO, Google Ads, social media marketing, lead generation, website development, content marketing, email marketing, Meta Ads, and AI automation.",
    
    provider: {
      "@type": "Organization",
      name: "Virelatech",
      url: BASE_URL,
    },

    areaServed: {
      "@type": "City",
      name: "Hyderabad",
    },

    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Marketing Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO Services in Hyderabad" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Google Ads Services" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Social Media Marketing Services" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lead Generation Services" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website Development Services" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Content Marketing Services" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Email Marketing Services" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Meta Ads Services" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Automation Services" } }
      ]
    }
  }
}

};