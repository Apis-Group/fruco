import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "preact/hooks";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import History from "@/components/History";
// Componentes
import NavBar from "@/components/NavBar";
import ProductShowcase from "@/components/ProductShowcase";
import Spliter from "@/components/Spliter";
import VisionMision from "@/components/VisionAndMision";
import { useSmoothScroll } from "@/hooks/useGSAP";
import { refreshScrollTrigger } from "@/utils/animations";

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
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      ignoreMobileResize: true,
    });

    // Animación de carga inicial
    gsap.fromTo(
      "body",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      },
    );

    // Refresh ScrollTrigger después de que todo esté cargado
    const timer = setTimeout(() => {
      refreshScrollTrigger();
    }, 100);

    // Cleanup
    return () => {
      clearTimeout(timer);
      for (const trigger of ScrollTrigger.getAll()) {
        trigger.kill();
      }
    };
  }, []);

  return (
    <>
      <NavBar />
      <main>
        <HeroSection />

        <Spliter />

        <ProductShowcase />

        <Spliter />

        <History />

        <Spliter />

        <VisionMision />

        <Spliter />

        <CallToAction />
      </main>
      <Footer />
    </>
  );
}

export default App;
