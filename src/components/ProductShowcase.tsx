import { useRef, useState, useEffect } from "preact/hooks";
import { memo } from "preact/compat";
import { gsap } from "gsap";
import { useLazyImage } from "@/hooks/useLazyImage";
import { Product } from "../lib/Products";
import { useTranslations } from "../hooks/useI18n";
import { useTranslatedProducts } from "../hooks/useTranslatedProducts";

// Componente para mostrar detalles del producto
const ProductDetails = memo(
  ({
    product,
    onClose,
    t,
  }: {
    product: Product;
    onClose: () => void;
    t: {
      products: {
        nutritionalInfo: {
          title: string;
          per100g: string;
          nutrient: string;
          amount: string;
          energyValue: string;
          proteins: string;
          carbs: string;
          fats: string;
          orderText: string;
        };
        ingredients: {
          title: string;
        };
        close: string;
      };
    };
  }) => {
    const handleBackdropClick = (e: MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    return (
      <div
        className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        onClick={handleBackdropClick}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            onClose();
          }
        }}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        style={{
          animation: "fadeIn 0.3s ease-out forwards",
        }}
      >
        <div
          className="max-h-[90vh] w-full max-w-6xl cursor-default overflow-y-auto rounded-3xl border border-gray-200 bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          role="document"
          style={{
            animation:
              "slideUpScale 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        >
          {/* Header con botón cerrar */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white p-4">
            <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-900"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-label="Cerrar"
              >
                <title>{t.products.close}</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Contenido principal */}
          <div className="flex flex-col lg:flex-row">
            {/* Imagen del producto */}
            <div className="flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 p-4 lg:w-1/2">
              <div className="relative w-full max-w-md">
                <img
                  src={product.imageSrc.replace(
                    "/products/",
                    "/products/optimized/large/",
                  )}
                  alt={product.name}
                  className="h-auto w-full rounded-2xl object-contain shadow-2xl"
                  style={{
                    filter: "drop-shadow(0 8px 24px rgba(0, 0, 0, 0.15))",
                    maxHeight: "500px",
                  }}
                />
                {/* Efecto de brillo */}
                <div className="from-fruco-gold/10 absolute inset-0 rounded-2xl bg-gradient-to-tr via-transparent to-transparent opacity-60" />
              </div>
            </div>

            {/* Información del producto */}
            <div className="bg-white p-4 lg:w-1/2 lg:overflow-y-auto">
              {/* Descripción detallada */}
              {product.detailedDescription && (
                <div className="mb-4">
                  <p className="text-sm leading-relaxed text-gray-700">
                    {product.detailedDescription}
                  </p>
                </div>
              )}

              {/* Información nutricional en tabla */}
              {product.nutritionalInfo && (
                <div className="mb-4">
                  <h3 className="text-fruco-red border-fruco-red/30 mb-3 border-b pb-2 text-lg font-bold">
                    {t.products.nutritionalInfo.title}
                  </h3>
                  <div className="mb-3 rounded-lg bg-gray-50 p-2 text-xs text-gray-600">
                    <span className="italic">
                      {t.products.nutritionalInfo.per100g}
                    </span>
                  </div>

                  {/* Tabla nutricional */}
                  <div className="overflow-hidden rounded-xl border border-gray-200 bg-linear-to-br from-gray-50 to-gray-100">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-gray-100 to-gray-50">
                          <th className="text-fruco-red p-2 text-left text-sm font-semibold">
                            {t.products.nutritionalInfo.nutrient}
                          </th>
                          <th className="text-fruco-red p-2 text-right text-sm font-semibold">
                            {t.products.nutritionalInfo.amount}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-200 transition-colors hover:bg-gray-50">
                          <td className="p-2 text-sm text-gray-700">
                            {t.products.nutritionalInfo.energyValue}
                          </td>
                          <td className="p-2 text-right text-sm font-semibold text-gray-900">
                            {product.nutritionalInfo.calories}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-200 transition-colors hover:bg-gray-50">
                          <td className="p-2 text-sm text-gray-700">
                            {t.products.nutritionalInfo.proteins}
                          </td>
                          <td className="p-2 text-right text-sm font-semibold text-gray-900">
                            {product.nutritionalInfo.protein}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-200 transition-colors hover:bg-gray-50">
                          <td className="p-2 text-sm text-gray-700">
                            {t.products.nutritionalInfo.carbs}
                          </td>
                          <td className="p-2 text-right text-sm font-semibold text-gray-900">
                            {product.nutritionalInfo.carbs}
                          </td>
                        </tr>
                        <tr className="transition-colors hover:bg-gray-50">
                          <td className="p-2 text-sm text-gray-700">
                            {t.products.nutritionalInfo.fats}
                          </td>
                          <td className="p-2 text-right text-sm font-semibold text-gray-900">
                            {product.nutritionalInfo.fat}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Ingredientes */}
              {product.ingredients && (
                <div>
                  <h3 className="text-fruco-red border-fruco-red/30 mb-3 border-b pb-2 text-lg font-bold">
                    {t.products.ingredients.title}
                  </h3>
                  <div className="mb-2">
                    <span className="text-xs tracking-wider text-gray-600 uppercase">
                      {t.products.nutritionalInfo.orderText}
                    </span>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-linear-to-br from-gray-50 to-gray-100 p-3">
                    <p className="text-sm leading-relaxed text-gray-700">
                      {product.ingredients.join(", ")}.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

// Componente de tarjeta informativa
const InfoCard = memo(
  ({
    infoCard,
  }: {
    infoCard: { title: string; subtitle: string; quality: string };
  }) => {
    return (
      <div className="from-fruco-red via-fruco-red/90 to-fruco-red/80 border-fruco-red/50 shadow-fruco-red/20 relative flex h-full w-full max-w-sm flex-col overflow-hidden rounded-3xl border-2 bg-linear-to-br text-left shadow-xl">
        {/* Efecto de brillo */}
        <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent" />

        {/* Patrón decorativo de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-white blur-3xl" />
        </div>

        {/* Contenido */}
        <div className="relative z-10 flex flex-grow flex-col items-center justify-center p-6 text-center">
          {/* Icono o logo */}
          <div className="mb-4">
            <svg
              className="h-16 w-16 text-white/90"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-label="Icono de libro"
            >
              <title>Libro</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>

          <h3 className="mb-4 text-2xl leading-tight font-bold text-white">
            {infoCard.title}
          </h3>

          <p className="mb-4 text-sm leading-relaxed text-white/90">
            {infoCard.subtitle}
          </p>

          <div className="mt-auto pt-4">
            <div className="inline-flex items-center space-x-2 text-xs font-medium text-white/80">
              <svg
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-label="Icono de verificación"
              >
                <title>Verificación</title>
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{infoCard.quality}</span>
            </div>
          </div>
        </div>

        {/* Línea decorativa inferior */}
        <div className="absolute right-0 bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </div>
    );
  },
);

const ProductCard = memo(
  ({
    product,
    onClick,
    isSelected,
    isHidden,
    seeDetailsText,
  }: {
    product: Product;
    onClick: (product: Product) => void;
    isSelected: boolean;
    isHidden: boolean;
    seeDetailsText: string;
  }) => {
    const cardRef = useRef<HTMLButtonElement>(null);

    // Lazy loading optimizado
    const {
      imgRef: imageRef,
      isLoaded,
      isInView,
    } = useLazyImage({
      rootMargin: "50px",
      threshold: 0.1,
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick(product);
      }
    };

    return (
      <button
        type="button"
        ref={cardRef}
        onClick={() => onClick(product)}
        onKeyDown={handleKeyDown}
        className={`product-item group relative flex h-full w-full max-w-sm cursor-pointer flex-col overflow-hidden rounded-3xl border-2 border-gray-200 bg-white text-left transition-all duration-700 hover:-translate-y-2 hover:scale-[1.02] ${
          isHidden ? "pointer-events-none scale-75" : "scale-100"
        } ${
          isSelected
            ? "ring-fruco-red/60 shadow-fruco-red/30 border-fruco-red -translate-y-2 scale-[1.02] shadow-2xl ring-4"
            : "shadow-xl shadow-black/10 hover:shadow-2xl hover:shadow-black/20"
        }`}
        style={{
          willChange: "transform, box-shadow, opacity",
          opacity: isHidden ? 0 : 0, // Iniciar con opacidad 0 para que GSAP la anime, pero mantener 0 si está oculto
        }}
      >
        {/* Efecto de brillo sutil */}
        <div className="from-fruco-gold/5 absolute inset-0 bg-linear-to-br via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

        {/* Borde dorado sutil */}
        <div className="from-fruco-red/10 to-fruco-red/5 absolute inset-0 rounded-3xl bg-linear-to-br via-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

        {/* Imagen del producto */}
        <div className="relative aspect-square shrink-0 overflow-hidden bg-linear-to-br from-gray-50 to-gray-100">
          {/* Overlay decorativo */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-white/20 via-transparent to-transparent" />

          <img
            ref={imageRef}
            data-src={product.imageSrc.replace(
              "/products/",
              "/products/optimized/medium/",
            )}
            data-srcset={`
                  ${product.imageSrc.replace("/products/", "/products/optimized/small/")} 200w,
                  ${product.imageSrc.replace("/products/", "/products/optimized/medium/")} 400w,
                  ${product.imageSrc.replace("/products/", "/products/optimized/large/")} 800w
               `}
            alt={product.name}
            className={`h-full w-full object-cover object-center p-6 transition-all duration-700 group-hover:scale-105 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{
              willChange: "transform, opacity",
              filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))",
            }}
            sizes="(max-width: 640px) 200px, (max-width: 768px) 280px, (max-width: 1024px) 240px, 280px"
            width="280"
            height="280"
            decoding="async"
          />
          {!isLoaded && isInView && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-100 backdrop-blur-sm">
              <div className="relative">
                <div className="border-fruco-red/30 border-t-fruco-red h-10 w-10 animate-spin rounded-full border-3" />
                <div
                  className="border-t-fruco-red/60 absolute inset-0 h-10 w-10 animate-spin rounded-full border-3 border-transparent"
                  style={{
                    animationDirection: "reverse",
                    animationDuration: "1.5s",
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Contenido */}
        <div
          className="relative flex grow flex-col justify-between bg-white p-6 text-center"
          style={{ willChange: "transform" }}
        >
          {/* Línea decorativa superior */}
          <div className="via-fruco-red/60 absolute top-0 left-1/2 h-0.5 w-16 -translate-x-1/2 transform bg-linear-to-r from-transparent to-transparent" />

          <div className="flex grow flex-col justify-center">
            <h3 className="group-hover:text-fruco-red mb-3 flex min-h-[3.5rem] items-center justify-center text-lg leading-tight font-bold tracking-wide text-gray-900 transition-all duration-500">
              {product.name}
            </h3>
            <p className="flex min-h-[4.5rem] items-center justify-center text-center text-sm leading-relaxed font-light text-gray-600 transition-colors duration-500 group-hover:text-gray-800">
              {product.description}
            </p>
          </div>

          {/* Indicador de interacción */}
          <div className="mt-4 flex translate-y-2 transform items-center justify-center space-x-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="text-fruco-red text-xs font-medium tracking-wider uppercase">
              {seeDetailsText}
            </span>
            <svg
              className="text-fruco-red h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-label="Flecha derecha"
            >
              <title>Flecha derecha</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>

          {/* Línea decorativa inferior */}
          <div className="via-fruco-red/60 absolute right-0 bottom-0 left-0 h-0.5 scale-x-0 transform bg-linear-to-r from-transparent to-transparent transition-transform duration-700 group-hover:scale-x-100" />
        </div>
      </button>
    );
  },
);

const ProductShowcase = () => {
  const t = useTranslations();
  const translatedProducts = useTranslatedProducts();
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [startAnimations, setStartAnimations] = useState(false);

  // Escuchar cuando el hero termine su animación
  useEffect(() => {
    const handleHeroComplete = () => {
      setStartAnimations(true);
    };

    window.addEventListener("heroAnimationComplete", handleHeroComplete);

    return () => {
      window.removeEventListener("heroAnimationComplete", handleHeroComplete);
    };
  }, []);

  // Animaciones secuenciales: primero el título, luego los productos
  useEffect(() => {
    if (startAnimations && titleRef.current && gridRef.current) {
      // Animar título primero
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            // Cuando termine el título, animar los productos
            const products = gridRef.current?.querySelectorAll(".product-item");
            if (products) {
              gsap.fromTo(
                products,
                {
                  opacity: 0,
                  y: 50,
                  scale: 0.9,
                },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.4,
                  ease: "power2.out",
                  stagger: 0.08,
                },
              );
            }
          },
        },
      );
    }
  }, [startAnimations]);

  // Funciones para manejar la selección de productos
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedProduct(null);
  };

  return (
    <section
      ref={containerRef}
      className="section-container py-20"
      id="productos"
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* Título de la sección */}
        <div className="mb-16 text-center">
          <h2
            ref={titleRef}
            className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
            style={{ willChange: "transform, opacity", opacity: 0 }}
          >
            {t.products.titlePrefix}
            <span className="block text-white">{t.products.title}</span>
          </h2>
          <div className="bg-fruco-gold mx-auto h-1 w-24 rounded-full" />
        </div>

        {/* Grid de productos */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 items-stretch gap-6 lg:grid-cols-5"
        >
          {translatedProducts.map((product) => (
            <div key={product.id}>
              <ProductCard
                product={product}
                onClick={handleProductClick}
                isSelected={selectedProduct?.id === product.id}
                isHidden={
                  selectedProduct !== null && selectedProduct.id !== product.id
                }
                seeDetailsText={t.products.seeDetails}
              />
            </div>
          ))}

          {/* Tarjeta informativa cuando hay número impar de productos */}
          {translatedProducts.length % 2 !== 0 && (
            <div className="lg:hidden">
              <InfoCard infoCard={t.products.infoCard} />
            </div>
          )}
        </div>

        {/* Texto adicional */}
        <div className="mt-16 text-center">
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400">
            {t.products.qualityText}
          </p>
        </div>
      </div>

      {/* Modal de detalles del producto */}
      {showDetails && selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={handleCloseDetails}
          t={t}
        />
      )}
    </section>
  );
};

export default ProductShowcase;
