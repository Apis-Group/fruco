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
      className="from-fruco-black via-fruco-black/95 to-fruco-black relative bg-linear-to-b px-6 py-20"
      id="vision-mision"
    >
      <div className="mx-auto max-w-4xl text-center">
        {/* Título */}
        <h2
          ref={titleRef}
          className="mb-12 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
        >
          {t.vision.title}
        </h2>

        {/* Contenido */}
        <div
          ref={contentRef}
          className="space-y-8 text-lg leading-relaxed text-white/90 md:text-xl lg:text-2xl"
        >
          <p className="font-light">{t.vision.content[0]}</p>

          <p className="font-light">{t.vision.content[1]}</p>

          <p
            className="text-fruco-gold text-xl font-medium italic md:text-2xl lg:text-3xl"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            "{t.vision.content[2]}"
          </p>
        </div>
      </div>

      {/* Decoración de fondo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-fruco-gold/5 absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full blur-3xl" />
      </div>

      <div
        ref={visionElementsRef}
        className="mx-auto mt-20 flex w-full flex-col items-center justify-center gap-8 px-50 md:flex-row md:gap-0 lg:gap-1"
      >
        {VISION_ELEMENTS.map((element) => {
          const { imgRef, isLoaded } = useLazyImage({
            rootMargin: "20px",
            threshold: 0.1,
          });

          return (
            <div
              key={element.id}
              className="vision-element relative flex w-full items-center justify-center md:w-1/3"
            >
              <div className="relative h-48 w-48 shrink-0 md:h-40 md:w-40 lg:h-52 lg:w-52">
                <img
                  ref={imgRef}
                  data-src={element.image}
                  alt={element.alt}
                  className={`h-full w-full rounded-full object-cover grayscale-50 transition-opacity duration-500 ${
                    isLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    backgroundColor: isLoaded ? "transparent" : "#1a1a1a",
                  }}
                />
                <p className="pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform px-2 py-1 text-center text-3xl font-bold whitespace-nowrap text-white uppercase md:text-2xl lg:text-4xl xl:text-5xl">
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
