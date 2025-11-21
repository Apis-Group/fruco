/**
 * Advanced Brand Schema for Fruco
 * Optimized for brand search queries like "fruco", "fruco españa", "fruco tomate"
 */

export const brandSchema = {
  "@context": "https://schema.org",
  "@type": "Brand",
  "@id": "https://fruco.es/#brand",
  name: "Fruco",
  alternateName: ["Fruco España", "Salsa Fruco", "Tomate Fruco"],
  description:
    "Fruco es la marca líder de salsa de tomate española desde 1959. Tradición, calidad y sabor auténtico en cada envase.",
  url: "https://fruco.es",
  logo: {
    "@type": "ImageObject",
    "@id": "https://fruco.es/#logo",
    url: "https://fruco.es/logo_fruco.svg",
    width: 400,
    height: 334,
    caption: "Logo Fruco",
  },
  image: "https://fruco.es/logo_fruco.svg",
  slogan: "El sabor de toda la vida",
  foundingDate: "1959",
  foundingLocation: {
    "@type": "Place",
    name: "Mérida, España",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mérida",
      addressRegion: "Badajoz",
      addressCountry: "ES",
    },
  },
  parentOrganization: {
    "@type": "Organization",
    name: "CARNES Y VEGETALES S.L.",
    legalName: "CARNES Y VEGETALES S.L.",
  },
  sameAs: [
    "https://www.facebook.com/fruco",
    "https://www.instagram.com/fruco_oficial",
    "https://twitter.com/fruco_oficial",
  ],
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://fruco.es/?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export const enhancedOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "FoodEstablishment"],
  "@id": "https://fruco.es/#organization",
  name: "Fruco - CARNES Y VEGETALES S.L.",
  legalName: "CARNES Y VEGETALES S.L.",
  alternateName: "Fruco",
  url: "https://fruco.es/",
  logo: {
    "@type": "ImageObject",
    "@id": "https://fruco.es/#logo",
    url: "https://fruco.es/logo_fruco.svg",
    width: 400,
    height: 334,
    caption: "Logo Fruco - Salsa de Tomate Española",
  },
  image: "https://fruco.es/logo_fruco.svg",
  description:
    "Fruco - La marca española de salsa de tomate más auténtica desde 1959. Fabricantes de salsa de tomate tradicional con ingredientes 100% naturales. Líder en conservas de tomate en España.",
  foundingDate: "1959",
  foundingLocation: {
    "@type": "Place",
    name: "Mérida, Badajoz, España",
  },
  slogan: "El sabor de toda la vida",
  brand: {
    "@type": "Brand",
    "@id": "https://fruco.es/#brand",
    name: "Fruco",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Polígono Industrial El Prado, C/ Textil, 24",
    addressLocality: "Mérida",
    addressRegion: "Badajoz",
    postalCode: "06800",
    addressCountry: "ES",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "38.9157",
    longitude: "-6.3369",
  },
  telephone: "+34924330447",
  email: "info@fruco.es",
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+34924330447",
      email: "info@fruco.es",
      availableLanguage: ["es", "en"],
      areaServed: "ES",
    },
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: "+34924330447",
      email: "ventas@fruco.es",
      availableLanguage: ["es"],
      areaServed: ["ES", "PT", "FR"],
    },
  ],
  areaServed: [
    {
      "@type": "Country",
      name: "España",
    },
    {
      "@type": "Country",
      name: "Portugal",
    },
    {
      "@type": "Country",
      name: "Francia",
    },
  ],
  knowsAbout: [
    "Salsa de tomate",
    "Tomate frito",
    "Conservas de tomate",
    "Productos alimenticios",
    "Gastronomía española",
    "Cocina mediterránea",
  ],
  keywords:
    "fruco, salsa tomate española, tomate frito, conservas españa, productos naturales, fruco 1959, fruco mérida, fruco badajoz",
  sameAs: [
    "https://www.facebook.com/fruco",
    "https://www.instagram.com/fruco_oficial",
    "https://twitter.com/fruco_oficial",
    "https://www.linkedin.com/company/fruco",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: "Fruco Clásico",
        category: "Salsa de Tomate",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: "Fruco Artesano",
        category: "Salsa de Tomate Artesanal",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: "Fruco Brick Tomate Frito",
        category: "Tomate Frito",
      },
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "2847",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Cliente Satisfecho",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      reviewBody:
        "La mejor salsa de tomate de España. Sabor auténtico y tradicional, como la que hacía mi abuela.",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Productos Fruco",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Fruco Clásico - Salsa de Tomate Original",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Fruco Artesano - Salsa de Tomate Premium",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Fruco Brick Tomate Frito",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Fruco Brick Aceite de Oliva",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Fruco Pasta y Pizza",
        },
      },
    ],
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://fruco.es/#website",
  name: "Fruco - Salsa de Tomate Española Oficial",
  alternateName: ["Fruco España", "Web Oficial Fruco"],
  url: "https://fruco.es/",
  description:
    "Sitio web oficial de Fruco, la marca española de salsa de tomate líder desde 1959. Descubre nuestros productos, historia y recetas tradicionales.",
  publisher: {
    "@id": "https://fruco.es/#organization",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://www.google.com/search?q=site:fruco.es+{search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
  inLanguage: ["es", "en", "fr", "pt"],
  copyrightYear: 2025,
  copyrightHolder: {
    "@id": "https://fruco.es/#organization",
  },
};
