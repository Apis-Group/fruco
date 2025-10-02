import { gsap } from "gsap";
import { useEffect, useRef } from "preact/hooks";
import { useSlideUp } from "@/hooks/useGSAP";

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
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          style={{ willChange: "transform, opacity" }}
        >
          {contactInfo.email && (
            <div className="group cursor-pointer">
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
                  aria-label="Icono de ubicación"
                >
                  <title>Ubicación</title>
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
    </section>
  );
};

export default CallToAction;
