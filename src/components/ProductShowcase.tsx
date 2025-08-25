import { useRef, useEffect } from 'preact/hooks';

import { useProductGrid, useProductHover, useFadeIn } from '../hooks/useGSAP';
import { useLazyImage } from '../hooks/useLazyImage';
import { gsap } from 'gsap';

interface Product {
   id: string;
   name: string;
   imageSrc: string;
   description: string;
}

interface ProductShowcaseProps {
   products?: Product[];
}

const defaultProducts: Product[] = [
   {
      id: 'frito',
      name: 'Tomate frito',
      imageSrc: '/products/fruco_brick_frito.avif',
      description: 'Un sabor único y auténtico, hecho con ingredientes frescos y de alta calidad',
   },
   {
      id: 'artesano',
      name: 'Artesano',
      imageSrc: '/products/fruco_artesano.avif',
      description: 'Elaborado con técnicas tradicionales para un sabor único y auténtico',
   },
   {
      id: 'clasico',
      name: 'Clásico',
      imageSrc: '/products/fruco_clasico.avif',
      description: 'El sabor original que ha conquistado paladares por generaciones',
   },
   {
      id: 'pasta-pizza',
      name: 'Pasta & Pizza',
      imageSrc: '/products/fruco_pasta_pizza.avif',
      description: 'Perfecta combinación para tus platos italianos favoritos',
   },
];

const ProductCard = ({ product }: { product: Product }) => {
   const cardRef = useRef<HTMLDivElement>(null);
   const contentRef = useRef<HTMLDivElement>(null);
   
   // Lazy loading mejorado
   const { imgRef: imageRef, isLoaded, isInView } = useLazyImage({
      rootMargin: '100px',
      threshold: 0.1
   });

   // Aplicar efectos hover
   useProductHover(cardRef);

   useEffect(() => {
      if (cardRef.current && imageRef.current && contentRef.current) {
         const card = cardRef.current;
         const image = imageRef.current;
         const content = contentRef.current;

         const handleMouseEnter = () => {
            gsap.to(image, {
               scale: 1.1,
               duration: 0.4,
               ease: 'power2.out',
            });

            gsap.to(content, {
               y: -10,
               duration: 0.3,
               ease: 'power2.out',
            });

            gsap.to(card, {
               boxShadow: '0 20px 40px rgba(255, 255, 255, 0.3)',
               duration: 0.3,
               ease: 'power2.out',
            });
         };

         const handleMouseLeave = () => {
            gsap.to(image, {
               scale: 1,
               duration: 0.4,
               ease: 'power2.out',
            });

            gsap.to(content, {
               y: 0,
               duration: 0.3,
               ease: 'power2.out',
            });

            gsap.to(card, {
               boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
               duration: 0.3,
               ease: 'power2.out',
            });
         };

         card.addEventListener('mouseenter', handleMouseEnter);
         card.addEventListener('mouseleave', handleMouseLeave);

         return () => {
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mouseleave', handleMouseLeave);
         };
      }
   });

   return (
      <div
         ref={cardRef}
         className="product-item bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800/50 transition-all duration-300 cursor-pointer group"
         style={{
            willChange: 'transform, box-shadow',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
         }}
      >
         {/* Imagen del producto */}
         <div className="relative overflow-hidden aspect-square">
            <img
               ref={imageRef}
               data-src={product.imageSrc.replace('/products/', '/products/optimized/medium/')}
               data-srcset={`
                  ${product.imageSrc.replace('/products/', '/products/optimized/small/')} 200w,
                  ${product.imageSrc.replace('/products/', '/products/optimized/medium/')} 400w,
                  ${product.imageSrc.replace('/products/', '/products/optimized/large/')} 800w
               `}
               alt={product.name}
               className={`w-full h-full object-cover transition-all duration-400 p-2 ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
               }`}
               style={{ 
                  willChange: 'transform, opacity',
               }}
               sizes="(max-width: 640px) 200px, (max-width: 768px) 280px, (max-width: 1024px) 240px, 280px"
               width="280"
               height="320"
               decoding="async"
            />
            {!isLoaded && isInView && (
               <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50 backdrop-blur-sm">
                  <div className="w-8 h-8 border-2 border-fruco-gold border-t-transparent rounded-full animate-spin" />
               </div>
            )}
         </div>

         {/* Contenido */}
         <div ref={contentRef} className="p-6 text-center" style={{ willChange: 'transform' }}>
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-gray-100 transition-colors duration-300">
               {product.name}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
               {product.description}
            </p>

            {/* Línea decorativa */}
            <div className="mt-4 h-0.5 w-0 group-hover:w-full transition-all duration-500 bg-fruco-gold" />
         </div>
      </div>
   );
};

const ProductShowcase = ({ products = defaultProducts }: ProductShowcaseProps) => {
   const containerRef = useRef<HTMLElement>(null);
   const titleRef = useRef<HTMLHeadingElement>(null);
   const gridRef = useRef<HTMLDivElement>(null);

   // Animaciones
   useFadeIn(titleRef, { scrollTrigger: { start: 'top 85%' } });
   useProductGrid(gridRef);

   return (
      <section ref={containerRef} className="section-container py-20" id="productos">
         <div className="max-w-7xl mx-auto px-4">
            {/* Título de la sección */}
            <div className="text-center mb-16">
               <h2
                  ref={titleRef}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
                  style={{ willChange: 'transform, opacity' }}
               >
                  Nuestros
                  <span className="block text-white">Productos</span>
               </h2>
               <div className="w-24 h-1 bg-fruco-gold mx-auto rounded-full" />
            </div>

            {/* Grid de productos */}
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {products.map(product => (
                  <ProductCard key={product.id} product={product} />
               ))}
            </div>

            {/* Texto adicional */}
            <div className="text-center mt-16">
               <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                  Cada producto Fruco es elaborado con los más altos estándares de calidad,
                  utilizando ingredientes seleccionados para ofrecerte una experiencia gastronómica
                  excepcional.
               </p>
            </div>
         </div>
      </section>
   );
};

export default ProductShowcase;
