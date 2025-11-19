import { gsap } from "gsap";
import { useEffect, useRef } from "preact/hooks";
import { useSlideUp } from "@/hooks/useGSAP";
import { useTranslations } from "@/hooks/useI18n";

interface ContactProps {
  title?: string;
  subtitle?: string;
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
}

const Contact = ({ title, subtitle, contactInfo }: ContactProps) => {
  const t = useTranslations();
  const finalTitle = title || t.contact.title;
  const finalSubtitle = subtitle || t.contact.subtitle;
  const finalContactInfo = contactInfo || t.contact.contactInfo;
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const mapsTitleRef = useRef<HTMLHeadingElement>(null);
  const map1Ref = useRef<HTMLAnchorElement>(null);
  const map2Ref = useRef<HTMLAnchorElement>(null);

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
      className="section-container relative overflow-hidden pt-12 md:pt-20"
      id="contacto"
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Título principal */}
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          style={{ willChange: "transform, opacity" }}
        >
          {finalTitle}
        </h2>

        {/* Subtítulo */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          style={{ willChange: "transform, opacity" }}
        >
          {finalSubtitle}
        </p>

        {/* Información de contacto */}
        <div
          ref={contactRef}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto"
          style={{ willChange: "transform, opacity" }}
        >
          {finalContactInfo.email && (
            <a
              href={`mailto:${finalContactInfo.email}`}
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
                {finalContactInfo.email}
              </p>
            </a>
          )}

          {finalContactInfo.phone && (
            <a
              href={`tel:${finalContactInfo.phone.replace(/\s/g, "")}`}
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
                {finalContactInfo.phone}
              </p>
            </a>
          )}
        </div>

        {/* Ubicaciones */}
        <div className="mt-16 space-y-8">
          <h3
            ref={mapsTitleRef}
            className="text-2xl md:text-3xl font-bold text-white mb-8"
            style={{ willChange: "transform, opacity" }}
          >
            {t.contact.locations.title}
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Primera ubicación - Mérida */}
            <a
              ref={map1Ref}
              href="https://www.google.com/maps/place/APIS+FRUCO/@38.9179174,-6.3857546,17z/data=!3m1!4b1!4m6!3m5!1s0xd1427121bd2a0d7:0x6650603617384c14!8m2!3d38.9179174!4d-6.3831797!16s%2Fg%2F1tfc5z9k"
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-8 bg-linear-to-br from-fruco-gold/10 to-transparent border-2 border-fruco-gold/30 rounded-xl hover:border-fruco-gold hover:shadow-2xl hover:shadow-fruco-gold/20 transition-all duration-300"
              style={{ willChange: "opacity" }}
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-fruco-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-label="Icono de ubicación"
                >
                  <title>{t.contact.locations.merida.name}</title>
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
              <h4 className="text-2xl md:text-3xl font-semibold text-white mb-2 group-hover:text-fruco-gold transition-colors duration-300">
                {t.contact.locations.merida.name}
              </h4>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                {t.contact.locations.merida.address}
              </p>
            </a>

            {/* Segunda ubicación - Montijo */}
            <a
              ref={map2Ref}
              href="https://www.google.com/maps/place/Apis+Fruco/@38.9148476,-6.5998126,17z/data=!3m1!4b1!4m6!3m5!1s0xd1690ec8ce03ae5:0xd67aca27bbab419b!8m2!3d38.9148476!4d-6.5972377!16s%2Fg%2F1tqy_b7_"
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-8 bg-linear-to-br from-fruco-gold/10 to-transparent border-2 border-fruco-gold/30 rounded-xl hover:border-fruco-gold hover:shadow-2xl hover:shadow-fruco-gold/20 transition-all duration-300"
              style={{ willChange: "opacity" }}
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-fruco-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-label="Icono de ubicación"
                >
                  <title>{t.contact.locations.montijo.name}</title>
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
              <h4 className="text-2xl md:text-3xl font-semibold text-white mb-2 group-hover:text-fruco-gold transition-colors duration-300">
                {t.contact.locations.montijo.name}
              </h4>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                {t.contact.locations.montijo.address}
              </p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
