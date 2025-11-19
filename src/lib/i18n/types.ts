export type Language = "es" | "en" | "fr" | "pt";

export interface ProductTranslation {
  name: string;
  description: string;
  detailedDescription?: string;
  ingredients?: string[];
}

export interface Translations {
  common: {
    company: string;
    tagline: string;
    since: string;
  };
  navigation: {
    home: string;
    products: string;
    history: string;
    visionMission: string;
    contact: string;
  };
  hero: {
    subtitle: string;
    scrollIndicator: string;
  };
  products: {
    title: string;
    titlePrefix: string;
    subtitle: string;
    infoCard: {
      title: string;
      subtitle: string;
      quality: string;
    };
    nutritionalInfo: {
      title: string;
      per100g: string;
      calories: string;
      proteins: string;
      carbs: string;
      fats: string;
      nutrient: string;
      amount: string;
      energyValue: string;
      orderText: string;
    };
    ingredients: {
      title: string;
    };
    findUs: string;
    seeDetails: string;
    close: string;
    qualityText: string;
    items: Record<string, ProductTranslation>;
  };
  history: {
    title: string;
    content: string;
    highlights: string[];
    stats: {
      years: string;
      natural: string;
    };
  };
  vision: {
    title: string;
    visionTitle: string;
    visionContent: string;
    missionTitle: string;
    missionContent: string;
    content: string[];
    elements: {
      artesania: string;
      tradicion: string;
      vanguardia: string;
    };
  };
  contact: {
    title: string;
    subtitle: string;
    contactInfo: {
      email: string;
      phone: string;
      address: string;
    };
    locations: {
      title: string;
      merida: {
        name: string;
        address: string;
      };
      montijo: {
        name: string;
        address: string;
      };
    };
  };
  footer: {
    rights: string;
    location: string;
    phone: string;
    email: string;
  };
}
