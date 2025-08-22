import React, { useRef, useEffect, RefObject } from 'react';

import { useProductGrid, useProductHover, useFadeIn } from '../hooks/useGSAP';
import { gsap } from 'gsap';

interface Product {
   id: string;
   name: string;
   imageSrc: string;
   description: string;
   color: 'green' | 'red';
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
      color: 'red',
   },
   {
      id: 'artesano',
      name: 'Artesano',
      imageSrc: '/products/fruco_artesano.avif',

      description: 'Elaborado con técnicas tradicionales para un sabor único y auténtico',
      color: 'green',
   },
   {
      id: 'clasico',
      name: 'Clásico',
      imageSrc: '/products/fruco_clasico.avif',

      description: 'El sabor original que ha conquistado paladares por generaciones',
      color: 'red',
   },
   {
      id: 'eco',
      name: 'Ecológico',
      imageSrc: '/products/fruco_eco.avif',

      description: 'Ingredientes orgánicos para una experiencia natural y sostenible',
      color: 'green',
   },
   {
      id: 'pasta-pizza',
      name: 'Pasta & Pizza',
      imageSrc: '/products/fruco_pasta_pizza.avif',
      description: 'Perfecta combinación para tus platos italianos favoritos',
      color: 'red',
   },
];

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
   const cardRef = useRef<HTMLDivElement>(null);
   const imageRef = useRef<HTMLImageElement>(null);
   const contentRef = useRef<HTMLDivElement>(null);

   // Aplicar efectos hover
   useProductHover(cardRef as RefObject<HTMLDivElement>);

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
               boxShadow: `0 20px 40px rgba(${product.color === 'green' ? '45, 80, 22' : '196, 30, 58'}, 0.3)`,
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
   }, [product.color]);

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
               src={product.imageSrc}
               alt={product.name}
               className="w-full h-full object-cover transition-transform duration-400 p-2"
               style={{ willChange: 'transform' }}
            />

            {/* Overlay con color del producto */}
            <div
               className={`absolute inset-0 bg-gradient-to-t from-${product.color === 'green' ? 'fruco-green' : 'fruco-red'}/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />

            {/* Indicador de color */}
            <div
               className={`absolute top-4 right-4 w-3 h-3 rounded-full ${
                  product.color === 'green' ? 'bg-fruco-green' : 'bg-fruco-red'
               } shadow-lg`}
            />
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
            <div
               className={`mt-4 h-0.5 w-0 group-hover:w-full transition-all duration-500 ${
                  product.color === 'green' ? 'bg-fruco-green' : 'bg-fruco-red'
               }`}
            />
         </div>
      </div>
   );
};

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ products = defaultProducts }) => {
   const containerRef = useRef<HTMLElement>(null);
   const titleRef = useRef<HTMLHeadingElement>(null);
   const gridRef = useRef<HTMLDivElement>(null);

   // Animaciones
   useFadeIn(titleRef as RefObject<HTMLElement>, { scrollTrigger: { start: 'top 85%' } });
   useProductGrid(gridRef as RefObject<HTMLElement>);

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
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
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

         {/* Elementos decorativos de fondo */}
         <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -left-20 w-40 h-40 bg-fruco-green/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-fruco-red/5 rounded-full blur-3xl" />
         </div>
      </section>
   );
};

export default ProductShowcase;
