import React, { useRef, useEffect, RefObject } from 'react';
import { useFadeIn, useSlideUp, useParallax } from '../hooks/useGSAP';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface BrandInfoProps {
   content?: string;
   highlights?: string[];
}

const defaultHighlights = [
   'Más de 65 años de tradición desde 1959',
   'Tomates cultivados por nuestros propios agricultores',
   'Elaboración artesanal con cariño y dedicación',
   'Compromiso con la autenticidad y lo honesto',
];

const BrandInfo: React.FC<BrandInfoProps> = ({
   content = 'Fruco nació en 1959 con una misión sencilla: llevar a cada hogar productos llenos de sabor y confianza. Comenzamos elaborando zumos que conquistaron generaciones, y hoy seguimos honrando esa historia con una gama de salsas de tomate creadas con el mismo cariño y dedicación de siempre. Nuestros tomates son fruto del trabajo de nuestros propios agricultores, que cuidan la tierra con paciencia y sabiduría, como se ha hecho toda la vida. En Fruco creemos en la tradición, en la calidad que se cultiva día a día y en el compromiso de ofrecer lo mejor.',
   highlights = defaultHighlights,
}) => {
   const containerRef = useRef<HTMLElement>(null);
   const titleRef = useRef<HTMLHeadingElement>(null);
   const contentRef = useRef<HTMLParagraphElement>(null);
   const highlightsRef = useRef<HTMLDivElement>(null);
   const decorativeRef = useRef<HTMLDivElement>(null);
   const statsRef = useRef<HTMLDivElement>(null);

   // Animaciones
   useFadeIn(titleRef as RefObject<HTMLElement>, { scrollTrigger: { start: 'top 80%' } });
   useFadeIn(contentRef as RefObject<HTMLElement>, { scrollTrigger: { start: 'top 75%' } });
   useSlideUp(highlightsRef as RefObject<HTMLElement>, 0.2);
   useParallax(decorativeRef as RefObject<HTMLElement>, 0.3);

   // Animación de contador para números con ScrollTrigger
   useEffect(() => {
      if (!statsRef.current) return;

      const numberElements = statsRef.current.querySelectorAll('.animate-number');
      
      if (numberElements.length > 0) {
         // Establecer valores iniciales
         numberElements.forEach(element => {
            element.textContent = '0';
         });

         // Crear animación con ScrollTrigger
         const tl = gsap.timeline({
            scrollTrigger: {
               trigger: statsRef.current,
               start: 'top 80%',
               end: 'bottom 20%',
               toggleActions: 'play none none reverse'
            }
         });

         numberElements.forEach((element, index) => {
            const target = parseInt(element.getAttribute('data-target') || '0');
            
            tl.to(element, {
               textContent: target,
               duration: 0.7,
               ease: 'power2.out',
               snap: { textContent: 1 },
               onUpdate: function () {
                  element.textContent = Math.round(this.targets()[0].textContent).toString();
               },
               onComplete: () => {
                  element.textContent = target.toString();
               },
            }, index * 0.2);
         });
      }

      return () => {
         ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.trigger === statsRef.current) {
               trigger.kill();
            }
         });
      };
   }, []);

   return (
      <section ref={containerRef} className="section-container relative overflow-hidden" id="marca">
         <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               {/* Contenido principal */}
               <div className="space-y-8">
                  {/* Título */}
                  <h2
                     ref={titleRef}
                     className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                     style={{ willChange: 'transform, opacity' }}
                  >
                     Nuestra
                     <span className="block bg-fruco-gold bg-clip-text text-transparent">
                        Historia
                     </span>
                  </h2>

                  {/* Contenido descriptivo */}
                  <p
                     ref={contentRef}
                     className="text-lg md:text-xl text-gray-300 leading-relaxed font-light"
                     style={{ willChange: 'transform, opacity' }}
                  >
                     {content}
                  </p>

                  {/* Estadísticas */}
                  <div ref={statsRef} className="grid grid-cols-2 gap-8 pt-8">
                     <div className="text-center">
                        <div className="text-4xl md:text-5xl font-bold text-fruco-green mb-2">
                           <span className="animate-number" data-target="65">65</span>+
                        </div>
                        <p className="text-gray-400 text-sm uppercase tracking-wider">
                           Años de Tradición
                        </p>
                     </div>
                     <div className="text-center">
                        <div className="text-4xl md:text-5xl font-bold text-fruco-red mb-2">
                           <span className="animate-number" data-target="100">100</span>%
                        </div>
                        <p className="text-gray-400 text-sm uppercase tracking-wider">Natural</p>
                     </div>
                  </div>
               </div>

               {/* Highlights y elementos visuales */}
               <div className="space-y-8">
                  {/* Lista de highlights */}
                  <div
                     ref={highlightsRef}
                     className="space-y-6"
                     style={{ willChange: 'transform, opacity' }}
                  >
                     {highlights.map((highlight, index) => (
                        <div
                           key={index}
                           className="flex items-center space-x-4 group cursor-pointer"
                        >
                           {/* Icono decorativo */}
                           <div
                              className={`w-3 h-3 rounded-full ${
                                 index % 2 === 0 ? 'bg-fruco-green' : 'bg-fruco-red'
                              } group-hover:scale-125 transition-transform duration-300`}
                           />

                           {/* Texto */}
                           <p className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium">
                              {highlight}
                           </p>
                        </div>
                     ))}
                  </div>

                  {/* Elemento decorativo */}
                  <div
                     ref={decorativeRef}
                     className="relative mt-12"
                     style={{ willChange: 'transform' }}
                  >
                     {/* Círculos decorativos */}
                     <div className="relative w-64 h-64 mx-auto">
                        <div
                           className="absolute inset-0 border-2 border-fruco-green/20 rounded-full animate-spin"
                           style={{ animationDuration: '20s' }}
                        />
                        <div
                           className="absolute inset-4 border-2 border-fruco-red/20 rounded-full animate-spin"
                           style={{
                              animationDuration: '15s',
                              animationDirection: 'reverse',
                           }}
                        />
                        <div
                           className="absolute inset-8 border-2 border-white/10 rounded-full animate-spin"
                           style={{ animationDuration: '25s' }}
                        />

                        {/* Centro */}
                        <div className="absolute inset-0 flex items-center justify-center">
                           <div className="w-16 h-16 bg-gradient-to-br from-fruco-green to-fruco-red rounded-full opacity-80 animate-pulse" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Elementos de fondo */}
         <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Gradientes de fondo */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-fruco-green/7 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fruco-red/5 rounded-full blur-3xl" />
         </div>
      </section>
   );
};

export default BrandInfo;
