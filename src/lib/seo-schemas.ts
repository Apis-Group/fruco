export const productsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Productos Fruco",
  description: "Gama completa de salsas de tomate Fruco",
  itemListElement: [
    {
      "@type": "Product",
      position: 1,
      name: "Fruco Clásico",
      description:
        "La salsa de tomate original que ha endulzado los platos de generaciones. Con su receta tradicional y su sabor inconfundible.",
      brand: {
        "@type": "Brand",
        name: "Fruco",
      },
      manufacturer: {
        "@type": "Organization",
        name: "CARNES Y VEGETALES S.L.",
      },
      category: "Salsa de Tomate",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        priceCurrency: "EUR",
      },
    },
    {
      "@type": "Product",
      position: 2,
      name: "Fruco Artesano",
      description:
        "Elaborado con tomates madurados al sol y una cuidadosa selección de especias. Perfecto para realzar cualquier receta.",
      brand: {
        "@type": "Brand",
        name: "Fruco",
      },
      manufacturer: {
        "@type": "Organization",
        name: "CARNES Y VEGETALES S.L.",
      },
      category: "Salsa de Tomate Artesanal",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        priceCurrency: "EUR",
      },
    },
    {
      "@type": "Product",
      position: 3,
      name: "Fruco Brick Tomate Frito",
      description:
        "El sabor casero en formato práctico. Ideal para tus platos del día a día.",
      brand: {
        "@type": "Brand",
        name: "Fruco",
      },
      manufacturer: {
        "@type": "Organization",
        name: "CARNES Y VEGETALES S.L.",
      },
      category: "Tomate Frito",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        priceCurrency: "EUR",
      },
    },
    {
      "@type": "Product",
      position: 4,
      name: "Fruco Brick Aceite de Oliva",
      description:
        "Tomate frito con aceite de oliva virgen extra. La combinación perfecta de tradición y calidad.",
      brand: {
        "@type": "Brand",
        name: "Fruco",
      },
      manufacturer: {
        "@type": "Organization",
        name: "CARNES Y VEGETALES S.L.",
      },
      category: "Tomate Frito con Aceite de Oliva",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        priceCurrency: "EUR",
      },
    },
    {
      "@type": "Product",
      position: 5,
      name: "Fruco Pasta y Pizza",
      description:
        "Especialmente diseñada para pizzas y pastas. Textura perfecta y sabor auténtico italiano.",
      brand: {
        "@type": "Brand",
        name: "Fruco",
      },
      manufacturer: {
        "@type": "Organization",
        name: "CARNES Y VEGETALES S.L.",
      },
      category: "Salsa para Pasta y Pizza",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        priceCurrency: "EUR",
      },
    },
  ],
};

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Desde cuándo existe Fruco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fruco fue fundada en 1959, teniendo más de 60 años de tradición en la elaboración de salsas de tomate de calidad premium.",
      },
    },
    {
      "@type": "Question",
      name: "¿Dónde se fabrican los productos Fruco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Todos nuestros productos se fabrican en Mérida, Badajoz, España, en nuestras instalaciones del Polígono Industrial El Prado.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué hace especial a la salsa Fruco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fruco se caracteriza por usar ingredientes naturales de calidad, mantener recetas tradicionales desde 1959, y ofrecer un sabor casero auténtico que ha pasado de generación en generación.",
      },
    },
    {
      "@type": "Question",
      name: "¿Fruco utiliza conservantes artificiales?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, nuestros productos están elaborados con ingredientes naturales y seguimos procesos de calidad que garantizan la conservación natural del producto.",
      },
    },
    {
      "@type": "Question",
      name: "¿Dónde puedo comprar productos Fruco?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Los productos Fruco están disponibles en supermercados y tiendas de alimentación a lo largo de toda España.",
      },
    },
  ],
};
