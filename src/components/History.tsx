import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "preact/hooks";
import { useFadeIn, useParallax, useSlideUp } from "@/hooks/useGSAP";
import { useTranslations } from "@/hooks/useI18n";

gsap.registerPlugin(ScrollTrigger);

interface HistoryProps {
  content?: string;
  highlights?: string[];
}

const History = ({ content, highlights }: HistoryProps) => {
  const t = useTranslations();
  const finalContent = content || t.history.content;
  const finalHighlights = highlights || t.history.highlights;
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const decorativeRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Animaciones
  useFadeIn(titleRef, { scrollTrigger: { start: "top 80%" } });
  useFadeIn(contentRef, { scrollTrigger: { start: "top 75%" } });
  useSlideUp(highlightsRef, 0.2);
  useParallax(decorativeRef, 0.3);

  // Animación de contador para números con ScrollTrigger
  useEffect(() => {
    if (!statsRef.current) return;

    // Guardar referencia actual para usar en cleanup
    const currentStatsRef = statsRef.current;
    const numberElements = currentStatsRef.querySelectorAll(".animate-number");

    if (numberElements.length > 0) {
      // Establecer valores iniciales
      numberElements.forEach((element) => {
        element.textContent = "0";
      });

      // Crear animación con ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: currentStatsRef,
          start: "top 100%",
          end: "bottom 10%",
          toggleActions: "play none none none",
        },
      });

      numberElements.forEach((element, index) => {
        const target = parseInt(element.getAttribute("data-target") || "0", 10);

        tl.to(
          element,
          {
            textContent: target,
            duration: 1.5,
            ease: "power2.out",
            snap: { textContent: 1 },
            onUpdate: function () {
              element.textContent = Math.round(
                this.targets()[0].textContent,
              ).toString();
            },
            onComplete: () => {
              element.textContent = target.toString();
            },
          },
          index * 0.2,
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === currentStatsRef) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="section-container relative overflow-hidden"
      id="historia"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Contenido principal */}
          <div className="space-y-8">
            {/* Título */}
            <h2
              ref={titleRef}
              className="text-4xl leading-tight font-bold text-white md:text-5xl lg:text-6xl"
              style={{ willChange: "transform, opacity" }}
            >
              {t.history.title.split(" ").slice(0, -1).join(" ")}
              <span className="bg-fruco-gold block bg-clip-text text-transparent">
                {t.history.title.split(" ").slice(-1)[0]}
              </span>
            </h2>

            {/* Contenido descriptivo */}
            <p
              ref={contentRef}
              className="text-lg leading-relaxed font-light text-gray-300 md:text-xl"
              style={{ willChange: "transform, opacity" }}
            >
              {finalContent}
            </p>

            {/* Estadísticas */}
            <div ref={statsRef} className="grid grid-cols-2 gap-8 pt-8">
              <div className="text-center">
                <div className="text-fruco-gold mb-2 text-4xl font-bold md:text-5xl">
                  <span className="animate-number" data-target="65">
                    65
                  </span>
                  +
                </div>
                <p className="text-sm tracking-wider text-gray-400 uppercase">
                  {t.history.stats.years}
                </p>
              </div>
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-white md:text-5xl">
                  <span className="animate-number" data-target="100">
                    100
                  </span>
                  %
                </div>
                <p className="text-sm tracking-wider text-gray-400 uppercase">
                  {t.history.stats.natural}
                </p>
              </div>
            </div>
          </div>

          {/* Highlights y elementos visuales */}
          <div className="space-y-8">
            {/* Lista de highlights */}
            <div
              ref={highlightsRef}
              className="space-y-6"
              style={{ willChange: "transform, opacity" }}
            >
              {finalHighlights.map((highlight) => (
                <div
                  key={`highlight-${highlight.slice(0, 20).replace(/\s+/g, "-").toLowerCase()}`}
                  className="group flex cursor-pointer items-center space-x-4"
                >
                  {/* Icono decorativo */}
                  <div
                    className={`h-3 w-3 rounded-full bg-white transition-transform duration-300 group-hover:scale-125`}
                  />

                  {/* Texto */}
                  <p className="font-medium text-gray-300 transition-colors duration-300 group-hover:text-white">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>

            {/* Elemento decorativo */}
            <div
              ref={decorativeRef}
              className="relative mt-12"
              style={{ willChange: "transform" }}
            >
              {/* Círculos decorativos */}
              <div className="relative mx-auto h-64 w-64">
                {/* Centro */}
                <div className="flex">
                  <img
                    src="/tomato_100_spain.svg"
                    alt="Sello de calidad, tomate 100% español"
                    class={"mx-auto h-52 w-52"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default History;
