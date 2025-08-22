import React, { useRef, useState, useEffect } from 'react';
import { useSlideUp } from '../hooks/useGSAP';
import { gsap } from 'gsap';

interface CallToActionProps {
   title?: string;
   subtitle?: string;
   buttonText?: string;
   contactInfo?: {
      email?: string;
      phone?: string;
      address?: string;
   };
}

const CallToAction: React.FC<CallToActionProps> = ({
   title = '¿Listo para descubrir el auténtico sabor?',
   subtitle = 'Únete a la familia Fruco y experimenta la tradición en cada bocado. Contáctanos para conocer más sobre nuestros productos y dónde encontrarlos.',
   buttonText = 'Contactar Ahora',
   contactInfo = {
      email: 'info@apis.es',
      phone: '924 37 86 31',
      address: 'Mérida, España',
   },
}) => {
   const [isHovered, setIsHovered] = useState(false);
   const [formData, setFormData] = useState({ name: '', email: '', message: '' });
   const [showForm, setShowForm] = useState(false);

   const containerRef = useRef<HTMLElement>(null);
   const titleRef = useRef<HTMLHeadingElement>(null);
   const subtitleRef = useRef<HTMLParagraphElement>(null);
   const buttonRef = useRef<HTMLButtonElement>(null);
   const contactRef = useRef<HTMLDivElement>(null);
   const formRef = useRef<HTMLDivElement>(null);
   const decorativeRef = useRef<HTMLDivElement>(null);

   // Configurar animaciones después del montaje
   useEffect(() => {
      const titleElement = titleRef.current;
      const subtitleElement = subtitleRef.current;
      const animations: gsap.core.Tween[] = [];

      if (titleElement) {
         gsap.set(titleElement, { opacity: 0, y: 30 });
         const titleAnimation = gsap.to(titleElement, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
               trigger: titleElement,
               start: 'top 80%',
               toggleActions: 'play none none none',
               once: true,
            },
         });
         animations.push(titleAnimation);
      }

      if (subtitleElement) {
         gsap.set(subtitleElement, { opacity: 0, y: 30 });
         const subtitleAnimation = gsap.to(subtitleElement, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            delay: 0.2,
            scrollTrigger: {
               trigger: subtitleElement,
               start: 'top 75%',
               toggleActions: 'play none none none',
               once: true,
            },
         });
         animations.push(subtitleAnimation);
      }

      // Cleanup function
      return () => {
         animations.forEach(animation => {
            if (animation && animation.scrollTrigger) {
               animation.scrollTrigger.kill();
            }
            if (animation && animation.kill) {
               animation.kill();
            }
         });
      };
   }, []);

   useSlideUp(buttonRef, 0.4);
   useSlideUp(contactRef, 0.6);

   // Animación personalizada para el formulario
   useEffect(() => {
      if (showForm && formRef.current) {
         gsap.fromTo(
            formRef.current,
            { opacity: 0, y: 30, scale: 0.95 },
            {
               opacity: 1,
               y: 0,
               scale: 1,
               duration: 0.5,
               ease: 'back.out(1.7)',
            }
         );
      }
   }, [showForm]);

   // Animación de hover para el botón
   const handleButtonHover = (hovered: boolean) => {
      setIsHovered(hovered);
      if (buttonRef.current) {
         gsap.to(buttonRef.current, {
            scale: hovered ? 1.05 : 1,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto',
         });
      }
   };

   // Manejar click del botón
   const handleButtonClick = () => {
      setShowForm(!showForm);

      // Animación de pulso
      if (buttonRef.current) {
         gsap.to(buttonRef.current, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut',
            overwrite: 'auto',
         });
      }
   };

   // Manejar envío del formulario
   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Aquí iría la lógica de envío
      console.log('Formulario enviado:', formData);

      // Animación de éxito
      if (formRef.current) {
         gsap.to(formRef.current, {
            scale: 1.02,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut',
         });
      }
   };

   return (
      <section
         ref={containerRef}
         className="section-container relative overflow-hidden"
         id="contacto"
      >
         <div className="max-w-4xl mx-auto px-4 text-center">
            {/* Título principal */}
            <h2
               ref={titleRef}
               className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
               style={{ willChange: 'transform, opacity' }}
            >
               {title}
            </h2>

            {/* Subtítulo */}
            <p
               ref={subtitleRef}
               className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
               style={{ willChange: 'transform, opacity' }}
            >
               {subtitle}
            </p>

            {/* Botón principal */}
            <button
               ref={buttonRef}
               onClick={handleButtonClick}
               onMouseEnter={() => handleButtonHover(true)}
               onMouseLeave={() => handleButtonHover(false)}
               className={`
            relative px-12 py-4 text-lg font-semibold rounded-full
            bg-fruco-gold
            text-white shadow-2xl
            transition-all duration-300
            hover:shadow-fruco-green/25
            focus:outline-none focus:ring-4 focus:ring-fruco-green/30
            transform-gpu
            ${isHovered ? 'shadow-2xl' : 'shadow-xl'}
          `}
               style={{ willChange: 'transform' }}
            >
               <span className="relative z-10">{buttonText}</span>

               {/* Efecto de brillo */}
               <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

               {/* Partículas decorativas */}
               <div className="absolute -inset-1 bg-gradient-to-r from-fruco-green to-fruco-red rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
            </button>

            {/* Formulario de contacto */}
            {showForm && (
               <div
                  ref={formRef}
                  className="mt-12 p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
                  style={{ willChange: 'transform, opacity' }}
               >
                  <form onSubmit={handleSubmit} className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                           type="text"
                           placeholder="Tu nombre"
                           value={formData.name}
                           onChange={e => setFormData({ ...formData, name: e.target.value })}
                           className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fruco-green/50 focus:border-transparent transition-all duration-300"
                           required
                        />
                        <input
                           type="email"
                           placeholder="Tu email"
                           value={formData.email}
                           onChange={e =>
                              setFormData({
                                 ...formData,
                                 email: e.target.value,
                              })
                           }
                           className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fruco-green/50 focus:border-transparent transition-all duration-300"
                           required
                        />
                     </div>
                     <textarea
                        placeholder="Tu mensaje"
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fruco-green/50 focus:border-transparent transition-all duration-300 resize-none"
                        required
                     />
                     <button
                        type="submit"
                        className="w-full py-3 bg-fruco-gold text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                     >
                        Enviar Mensaje
                     </button>
                  </form>
               </div>
            )}

            {/* Información de contacto */}
            <div
               ref={contactRef}
               className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
               style={{ willChange: 'transform, opacity' }}
            >
               {contactInfo.email && (
                  <div className="group cursor-pointer">
                     <div className="w-12 h-12 mx-auto mb-4 bg-fruco-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg
                           className="w-6 h-6 text-white"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                           />
                        </svg>
                     </div>
                     <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                        {contactInfo.email}
                     </p>
                  </div>
               )}

               {contactInfo.phone && (
                  <div className="group cursor-pointer">
                     <div className="w-12 h-12 mx-auto mb-4 bg-fruco-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg
                           className="w-6 h-6 text-white"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                           />
                        </svg>
                     </div>
                     <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                        {contactInfo.phone}
                     </p>
                  </div>
               )}

               {contactInfo.address && (
                  <div className="group cursor-pointer">
                     <div className="w-12 h-12 mx-auto mb-4 bg-fruco-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg
                           className="w-6 h-6 text-white"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                           />
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                           />
                        </svg>
                     </div>
                     <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                        {contactInfo.address}
                     </p>
                  </div>
               )}
            </div>
         </div>

         {/* Elementos decorativos de fondo */}
         <div ref={decorativeRef} className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Gradientes de fondo */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-fruco-green/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-fruco-red/10 rounded-full blur-3xl" />

            {/* Líneas decorativas */}
            <div className="absolute top-0 left-1/2 w-px h-32 bg-gradient-to-b from-transparent via-fruco-green/30 to-transparent" />
            <div className="absolute bottom-0 left-1/2 w-px h-32 bg-gradient-to-t from-transparent via-fruco-red/30 to-transparent" />
         </div>
      </section>
   );
};

export default CallToAction;
