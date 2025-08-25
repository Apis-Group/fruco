import { useEffect, useRef } from 'preact/hooks';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLazyImage } from '@/hooks/useLazyImage';

// Constantes para los elementos dinámicos
const VISION_ELEMENTS = [
   {
      id: 'artesania',
      title: 'Artesanía',
      image: '/resources/pizarra.avif',
      alt: 'Artesanía tradicional',
   },
   {
      id: 'tradicion',
      title: 'Tradición',
      image: '/resources/cocina.avif',
      alt: 'Tradición culinaria',
   },
   {
      id: 'vanguardia',
      title: 'Vanguardia',
      image: '/resources/sartenes.avif',
      alt: 'Vanguardia gastronómica',
   }
];

function VisionMision() {
   const sectionRef = useRef<HTMLElement>(null);
   const titleRef = useRef<HTMLHeadingElement>(null);
   const contentRef = useRef<HTMLDivElement>(null);
   const visionElementsRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const section = sectionRef.current;
      const title = titleRef.current;
      const content = contentRef.current;

      if (!section || !title || !content) return;

      // Animación del título
      gsap.fromTo(
         title,
         {
            opacity: 0,
            y: 50,
         },
         {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
               trigger: title,
               start: 'top 80%',
               end: 'bottom 20%',
               toggleActions: 'play none none none',
            },
         }
      );

      // Animación del contenido
      gsap.fromTo(
         content,
         {
            opacity: 0,
            y: 30,
         },
         {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power2.out',
            delay: 0.3,
            scrollTrigger: {
               trigger: content,
               start: 'top 80%',
               end: 'bottom 20%',
               toggleActions: 'play none none none',
            },
         }
      );

      // Animación de los elementos de visión (uno por uno)
      const visionElements = visionElementsRef.current?.querySelectorAll('.vision-element');
      if (visionElements) {
         visionElements.forEach((element, index) => {
            gsap.fromTo(
               element,
               {
                  opacity: 0,
                  y: 50,
                  scale: 0.8,
               },
               {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.8,
                  ease: 'power2.out',
                  delay: index * 0.3, // Delay progresivo para cada elemento
                  scrollTrigger: {
                     trigger: visionElementsRef.current,
                     start: 'top 80%',
                     end: 'bottom 20%',
                     toggleActions: 'play none none none',
                  },
               }
            );
         });
      }

      // Cleanup
      return () => {
         ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.trigger === title || trigger.trigger === content || trigger.trigger === visionElementsRef.current) {
               trigger.kill();
            }
         });
      };
   }, []);

   return (
      <section
         ref={sectionRef}
         className="relative py-20 px-6 bg-gradient-to-b from-fruco-black via-fruco-black/95 to-fruco-black"
         id="vision-mision"
      >
         <div className="max-w-4xl mx-auto text-center">
            {/* Título */}
            <h2
               ref={titleRef}
               className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-white"
            >
               Visión y Misión
            </h2>

            {/* Contenido */}
            <div
               ref={contentRef}
               className="space-y-8 text-lg md:text-xl lg:text-2xl leading-relaxed text-white/90"
            >
               <p className="font-light">
                  Nuestros tomates son fruto del trabajo de nuestros propios agricultores, que cuidan la tierra con paciencia y sabiduría,
                  <br className="hidden md:block" />
                  como se ha hecho toda la vida.
               </p>

               <p className="font-light">
                  En Fruco creemos en la tradición, en la calidad que se cultiva día a día y en el compromiso de ofrecer lo mejor. Fabricamos salsas y creamos
                  <br className="hidden md:block" />
                  experiencias que unen a las personas en momentos especiales.
                  <br className="hidden md:block" />
                  Queremos formar parte de tu historia, de tu mesa y de tu vida.
               </p>

               <p className="text-fruco-gold font-medium text-xl md:text-2xl lg:text-3xl italic"
                  style={{ fontFamily: 'Playfair Display, serif' }}
               >
                  "Porque Fruco, es una familia que elige lo auténtico,
                  <br className="hidden md:block" />
                  lo honesto… lo que está hecho con el corazón"
               </p>
            </div>
         </div>

         {/* Decoración de fondo */}
         <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-fruco-gold/5 rounded-full blur-3xl" />
         </div>

         <div ref={visionElementsRef} className="flex justify-between align-middle flex-col md:flex-row mt-15 gap-15 w-[50%] mx-auto">
            {VISION_ELEMENTS.map((element) => {
               const { imgRef, isLoaded } = useLazyImage({
                  rootMargin: '100px',
                  threshold: 0.1
               });
               
               return (
                  <div key={element.id} className="w-30 relative vision-element">
                     <img 
                        ref={imgRef}
                        data-src={element.image}
                        alt={element.alt} 
                        className={`rounded-full scale-130 grayscale-50 transition-opacity duration-500 ${
                           isLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{
                           backgroundColor: isLoaded ? 'transparent' : '#1a1a1a'
                        }}
                     />
                     <p className="uppercase absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white px-4 py-1 rounded-4xl text-4xl font-bold z-10">
                        {element.title}
                     </p>
                  </div>
               );
            })}
         </div>
      </section>
   );
}

export default VisionMision;