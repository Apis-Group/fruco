import { gsap } from "gsap";
import { useEffect, useRef } from "preact/hooks";
import { useSlideUp } from "@/hooks/useGSAP";
import GoogleMaps from "./GoogleMaps";

interface CallToActionProps {
  title?: string;
  subtitle?: string;
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
}

const CallToAction = ({
  title = "¿Listo para descubrir el auténtico sabor?",
  subtitle = "Únete a la familia Fruco y experimenta la tradición en cada bocado. Contáctanos para conocer más sobre nuestros productos y dónde encontrarlos.",
  contactInfo = {
    email: "info@fruco.es",
    phone: "660 85 80 90",
    address: "Mérida, España",
  },
}: CallToActionProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const mapsTitleRef = useRef<HTMLHeadingElement>(null);
  const map1Ref = useRef<HTMLDivElement>(null);
  const map2Ref = useRef<HTMLDivElement>(null);

  // Configurar animaciones después del montaje
  useEffect(() => {
    const titleElement = titleRef.current;
    const subtitleElement = subtitleRef.current;
    const mapsTitleElement = mapsTitleRef.current;
    const map1Element = map1Ref.current;
    const map2Element = map2Ref.current;
    const animations: gsap.core.Tween[] = [];

    if (titleElement) {
      gsap.set(titleElement, { opacity: 0, y: 30 });
      const titleAnimation = gsap.to(titleElement, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleElement,
          start: "top 80%",
          toggleActions: "play none none none",
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
        ease: "power2.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: subtitleElement,
          start: "top 75%",
          toggleActions: "play none none none",
          once: true,
        },
      });
      animations.push(subtitleAnimation);
    }

    // Animación para el título "Encuéntranos"
    if (mapsTitleElement) {
      gsap.set(mapsTitleElement, { opacity: 0, y: 30 });
      const mapsTitleAnimation = gsap.to(mapsTitleElement, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: mapsTitleElement,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
      });
      animations.push(mapsTitleAnimation);
    }

    // Animación para el primer mapa
    if (map1Element) {
      gsap.set(map1Element, { opacity: 0 });
      const map1Animation = gsap.to(map1Element, {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: map1Element,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
      });
      animations.push(map1Animation);
    }

    // Animación para el segundo mapa
    if (map2Element) {
      gsap.set(map2Element, { opacity: 0 });
      const map2Animation = gsap.to(map2Element, {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        delay: 0.3,
        scrollTrigger: {
          trigger: map2Element,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
      });
      animations.push(map2Animation);
    }

    // Cleanup function
    return () => {
      animations.forEach((animation) => {
        if (animation?.scrollTrigger) {
          animation.scrollTrigger.kill();
        }
        if (animation?.kill) {
          animation.kill();
        }
      });
    };
  }, []);

  useSlideUp(contactRef, 0.4);

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
          style={{ willChange: "transform, opacity" }}
        >
          {title}
        </h2>

        {/* Subtítulo */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          style={{ willChange: "transform, opacity" }}
        >
          {subtitle}
        </p>

        {/* Información de contacto */}
        <div
          ref={contactRef}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto"
          style={{ willChange: "transform, opacity" }}
        >
          {contactInfo.email && (
            <a
              href={`mailto:${contactInfo.email}`}
              className="group cursor-pointer block"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-fruco-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-label="Icono de email"
                >
                  <title>Email</title>
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
            </a>
          )}

          {contactInfo.phone && (
            <a
              href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
              className="group cursor-pointer block"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-fruco-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-label="Icono de teléfono"
                >
                  <title>Teléfono</title>
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
            </a>
          )}
        </div>

        {/* Mapas de ubicación */}
        <div className="mt-16 space-y-8">
          <h3
            ref={mapsTitleRef}
            className="text-2xl md:text-3xl font-bold text-white mb-8"
            style={{ willChange: "transform, opacity" }}
          >
            Encuéntranos
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Primer mapa - Mérida */}
            <div ref={map1Ref} style={{ willChange: "opacity" }}>
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <GoogleMaps
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6208.530237654223!2d-6.3857546!3d38.9179174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1427121bd2a0d7%3A0x6650603617384c14!2sAPIS%20FRUCO!5e2!3m2!1ses!2ses!4v1759388986011!5m2!1ses!2ses"
                  height="400px"
                />
              </div>
              <h4 className="text-xl md:text-2xl font-semibold text-white mt-4">
                Mérida
              </h4>
            </div>

            {/* Segundo mapa - Montijo */}
            <div ref={map2Ref} style={{ willChange: "opacity" }}>
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <GoogleMaps
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3104.399405376706!2d-6.599812623249521!3d38.91484757172036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1690ec8ce03ae5%3A0xd67aca27bbab419b!2sApis%20Fruco!5e2!3m2!1ses!2ses!4v1759389029022!5m2!1ses!2ses"
                  height="400px"
                />
              </div>
              <h4 className="text-xl md:text-2xl font-semibold text-white mt-4">
                Montijo
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
