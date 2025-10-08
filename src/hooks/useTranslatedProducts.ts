import { useTranslations } from "@/hooks/useI18n";
import { products as baseProducts, type Product } from "@/lib/Products";

export function useTranslatedProducts(): Product[] {
  const t = useTranslations();

  return baseProducts.map((product) => {
    const translation = t.products.items[product.id];
    if (!translation) {
      return product; // Fallback to original if no translation
    }

    return {
      ...product,
      name: translation.name,
      description: translation.description,
      detailedDescription:
        translation.detailedDescription || product.detailedDescription,
      ingredients: translation.ingredients || product.ingredients,
    };
  });
}
