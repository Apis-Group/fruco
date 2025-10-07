export interface Product {
  id: string;
  name: string;
  imageSrc: string;
  description: string;
  detailedDescription?: string;
  ingredients?: string[];
  nutritionalInfo?: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
}

export const products: Product[] = [
  {
    id: "frito",
    name: "Tomate frito",
    imageSrc: "/products/fruco_brick_frito.avif",
    description:
      "Un sabor único y auténtico, hecho con ingredientes frescos y de alta calidad",
    detailedDescription:
      "Tomate frito elaborado con un 87% de tomate (a partir de tomate concentrado) y aceite de girasol. Nuestro tomate frito es el resultado de una cuidadosa selección de tomates maduros, procesados con técnicas que preservan todo su sabor natural. Ideal para acompañar cualquier comida.",
    ingredients: [
      "Tomate 87% (a partir de tomate concentrado)",
      "Aceite de girasol",
      "Azúcar",
      "Almidón modificado de maíz",
      "Sal",
      "Cebolla",
      "Ajo",
      "Pimentón",
      "Aromas",
      "Ácido cítrico (corrector acidez)",
    ],
    nutritionalInfo: {
      calories: "68 kcal",
      protein: "1,3g",
      carbs: "8,5g",
      fat: "3,3g",
    },
  },
  {
    id: "frito-virgen-extra",
    name: "Tomate Frito con AOVE",
    imageSrc: "/products/fruco_brick_aceite.avif",
    description:
      "La máxima calidad con aceite de oliva virgen extra para un sabor excepcional",
    detailedDescription:
      "Tomate frito elaborado con un 87% de tomate (a partir de tomate concentrado) y aceite de oliva virgen extra. Una versión premium de nuestro clásico tomate frito, con aceite de oliva virgen extra de primera calidad. Su sabor refinado y textura perfecta lo convierten en el complemento ideal para los paladares más exigentes.",
    ingredients: [
      "Tomate 87% (a partir de tomate concentrado)",
      "Aceite de oliva virgen extra",
      "Azúcar",
      "Almidón modificado de maíz",
      "Sal",
      "Cebolla",
      "Ajo",
      "Pimentón",
      "Aromas",
      "Ácido cítrico (corrector acidez)",
    ],
    nutritionalInfo: {
      calories: "68 kcal",
      protein: "1,3g",
      carbs: "8,5g",
      fat: "3,3g",
    },
  },

  {
    id: "clasico",
    name: "Clásico",
    imageSrc: "/products/fruco_clasico.avif",
    description:
      "El sabor original que ha conquistado paladares por generaciones",
    detailedDescription:
      "Salsa de color rojo brillante. Homogénea y fina sin separación de aceite. Formada por mezcla de tomate, aceite de girasol, azúcar, almidón, aromas y especias. Es espesa,consistente, si bien su viscosidad le permite fluir fácilmente",
    ingredients: [
      "Tomate (160 g para elaborar 100 g de producto)",
      "Manzana",
      "Aceite de girasol",
      "Jarabe de glucosa y fructosa",
      "Azúcar",
      "Almidón modificado",
      "Sal",
      "Aromas y especias",
    ],
    nutritionalInfo: {
      calories: "75.5KJ/316Kcal",
      protein: "1.5g",
      carbs: "8.9g",
      fat: "3.5g",
    },
  },
  {
    id: "artesano",
    name: "Artesano",
    imageSrc: "/products/fruco_artesano.avif",
    description:
      "Elaborado con técnicas tradicionales para un sabor único y auténtico",
    detailedDescription:
      "Salsa de color rojo brillante con puré de tomate y aceite de oliva. Formada por la mezcla de tomate concentrado, puré de tomate, agua, aceite de oliva, azúcar, ajo y sal. Es espesa y consistente.",
    ingredients: [
      "Tomate (230 g de tomate para elaborar 100 g de producto)",
      "Aceite de oliva (15%)",
      "Azúcar",
      "Sal y ajo",
    ],
    nutritionalInfo: {
      calories: "731kJ / 176 kcal",
      protein: "1.8g",
      carbs: "11.3g",
      fat: "13.1g",
    },
  },
  {
    id: "pasta-pizza",
    name: "Pasta & Pizza",
    imageSrc: "/products/fruco_pasta_pizza.avif",
    description: "Perfecta combinación para tus platos italianos favoritos",
    detailedDescription:
      "Salsa de color rojizo elaborada por mezcla de tomate y concentrado de tomate, con aceite, sal y especias. Es espesa, consistente, si bien, su viscosidad le permite fluir fácilmente.",
    ingredients: [
      "Tomate (160 g de tomate para elaborar 100 g de producto)",
      "Aceite de oliva virgen extra",
      "Azúcar",
      "Almidón modificado",
      "Sal y especias",
    ],
    nutritionalInfo: {
      calories: "59 kcal / 248 kJ",
      protein: "1.2g",
      carbs: "5.7g",
      fat: "3.0g",
    },
  },
];
