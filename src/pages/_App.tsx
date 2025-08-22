import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSmoothScroll } from '@/hooks/useGSAP';
import { refreshScrollTrigger } from '@/utils/animations';

// Componentes
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import ProductShowcase from '@/components/ProductShowcase';
import BrandInfo from '@/components/BrandInfo';
import CallToAction from '@/components/CallToAction';

// Registrar plugins de GSAP
gsap.registerPlugin(ScrollTrigger);

function App() {
   // Hook para scroll suave
   useSmoothScroll();

   useEffect(() => {
      // Configuración inicial de GSAP
      gsap.config({
         force3D: true,
         nullTargetWarn: false,
      });

      // Configuración de ScrollTrigger
      ScrollTrigger.config({
         autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
         ignoreMobileResize: true,
      });

      // Animación de carga inicial
      gsap.fromTo(
         'body',
         { opacity: 0 },
         {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
         }
      );

      // Refresh ScrollTrigger después de que todo esté cargado
      const timer = setTimeout(() => {
         refreshScrollTrigger();
      }, 100);

      // Cleanup
      return () => {
         clearTimeout(timer);
         ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
   }, []);

   return (
      <div className="min-h-screen bg-fruco-black text-white overflow-x-hidden">
         {/* Navegación flotante (opcional) */}
         <NavBar />

         {/* Secciones principales */}
         <main>
            {/* Hero Section */}
            <HeroSection />

            {/* Separador visual */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto max-w-4xl" />

            {/* Product Showcase */}
            <ProductShowcase />

            {/* Separador visual */}
            <div className="h-px bg-gradient-to-r from-transparent via-fruco-green/30 to-transparent mx-auto max-w-4xl" />

            {/* Brand Info */}
            <BrandInfo />

            {/* Separador visual */}
            <div className="h-px bg-gradient-to-r from-transparent via-fruco-red/30 to-transparent mx-auto max-w-4xl" />

            {/* Call to Action */}
            <CallToAction />
         </main>

         {/* Footer minimalista */}
         <footer className="py-12 text-center border-t border-white/10">
            <div className="max-w-4xl mx-auto px-4">
               <div className="mb-4 text-gray-400 text-sm space-y-1">
                  <p>Mérida, España | Tel: 924 37 86 31 | Email: info@apis.es</p>
               </div>
               <p className="text-gray-400 text-sm">
                  © 2024 Fruco. Todos los derechos reservados. | Tradición y sabor desde 1959
               </p>
               <div className="mt-4 flex justify-center space-x-6">
                  <a
                     href="#"
                     className="text-gray-500 hover:text-fruco-green transition-colors duration-300"
                     aria-label="Facebook"
                  >
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                     </svg>
                  </a>
                  <a
                     href="#"
                     className="text-gray-500 hover:text-fruco-red transition-colors duration-300"
                     aria-label="Instagram"
                  >
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323C5.902 8.198 7.053 7.708 8.35 7.708s2.448.49 3.323 1.297c.897.875 1.387 2.026 1.387 3.323s-.49 2.448-1.297 3.323c-.875.897-2.026 1.387-3.323 1.387z" />
                     </svg>
                  </a>
                  <a
                     href="#"
                     className="text-gray-500 hover:text-white transition-colors duration-300"
                     aria-label="Twitter"
                  >
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                     </svg>
                  </a>
               </div>
            </div>
         </footer>
      </div>
   );
}

export default App;
