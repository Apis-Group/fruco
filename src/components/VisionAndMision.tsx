import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "preact/hooks";
import { useLazyImage } from "@/hooks/useLazyImage";
import { useTranslations } from "@/hooks/useI18n";

function VisionMision() {
  const t = useTranslations();

  // Elementos dinámicos con traducciones
  const VISION_ELEMENTS = [
    {
      id: "artesania",
      title: t.vision.elements.artesania,
      image: "/resources/pizarra.avif",
      alt: "Artesanía tradicional",
    },
    {
      id: "tradicion",
      title: t.vision.elements.tradicion,
      image: "/resources/cocina.avif",
      alt: "Tradición culinaria",
    },
    {
      id: "vanguardia",
      title: t.vision.elements.vanguardia,
      image: "/resources/sartenes.avif",
      alt: "Vanguardia gastronómica",
    },
  ];
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
        ease: "power2.out",
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      },
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
        ease: "power2.out",
        delay: 0.3,
        scrollTrigger: {
          trigger: content,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      },
    );

    // Animación de los elementos de visión (uno por uno)
    const visionElements =
      visionElementsRef.current?.querySelectorAll(".vision-element");
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
            ease: "power2.out",
            delay: index * 0.3, // Delay progresivo para cada elemento
            scrollTrigger: {
              trigger: visionElementsRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.trigger === title ||
          trigger.trigger === content ||
          trigger.trigger === visionElementsRef.current
        ) {
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
          {t.vision.title}
        </h2>

        {/* Contenido */}
        <div
          ref={contentRef}
          className="space-y-8 text-lg md:text-xl lg:text-2xl leading-relaxed text-white/90"
        >
          <p className="font-light">{t.vision.content[0]}</p>

          <p className="font-light">{t.vision.content[1]}</p>

          <p
            className="text-fruco-gold font-medium text-xl md:text-2xl lg:text-3xl italic"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            "{t.vision.content[2]}"
          </p>
        </div>
      </div>

      {/* Decoración de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-fruco-gold/5 rounded-full blur-3xl" />
      </div>

      <div
        ref={visionElementsRef}
        className="flex justify-center items-center flex-col md:flex-row mt-20 gap-16 md:gap-4 lg:gap-6 w-full mx-auto px-6"
      >
        {VISION_ELEMENTS.map((element) => {
          const { imgRef, isLoaded } = useLazyImage({
            rootMargin: "20px",
            threshold: 0.1,
          });

          return (
            <div
              key={element.id}
              className="w-full md:w-1/3 relative vision-element flex justify-center items-center"
            >
              <div className="relative w-48 h-48 md:w-40 md:h-40 lg:w-52 lg:h-52 flex-shrink-0">
                <img
                  ref={imgRef}
                  data-src={element.image}
                  alt={element.alt}
                  className={`rounded-full grayscale-50 transition-opacity duration-500 w-full h-full object-cover ${
                    isLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    backgroundColor: isLoaded ? "transparent" : "#1a1a1a",
                  }}
                />
                <p className="uppercase absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white px-2 py-1 text-3xl md:text-2xl lg:text-4xl xl:text-5xl font-bold z-10 whitespace-nowrap pointer-events-none text-center">
                  {element.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default VisionMision;
