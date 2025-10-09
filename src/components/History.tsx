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
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Contenido principal */}
          <div className="space-y-8">
            {/* Título */}
            <h2
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              style={{ willChange: "transform, opacity" }}
            >
              {t.history.title.split(" ").slice(0, -1).join(" ")}
              <span className="block bg-fruco-gold bg-clip-text text-transparent">
                {t.history.title.split(" ").slice(-1)[0]}
              </span>
            </h2>

            {/* Contenido descriptivo */}
            <p
              ref={contentRef}
              className="text-lg md:text-xl text-gray-300 leading-relaxed font-light"
              style={{ willChange: "transform, opacity" }}
            >
              {finalContent}
            </p>

            {/* Estadísticas */}
            <div ref={statsRef} className="grid grid-cols-2 gap-8 pt-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-fruco-gold mb-2">
                  <span className="animate-number" data-target="65">
                    65
                  </span>
                  +
                </div>
                <p className="text-gray-400 text-sm uppercase tracking-wider">
                  {t.history.stats.years}
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  <span className="animate-number" data-target="100">
                    100
                  </span>
                  %
                </div>
                <p className="text-gray-400 text-sm uppercase tracking-wider">
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
                  className="flex items-center space-x-4 group cursor-pointer"
                >
                  {/* Icono decorativo */}
                  <div
                    className={`w-3 h-3 rounded-full bg-white group-hover:scale-125 transition-transform duration-300`}
                  />

                  {/* Texto */}
                  <p className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium">
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
              <div className="relative w-64 h-64 mx-auto">
                {/* Centro */}
                <div className="flex">
                  <img
                    src="/tomato_100_spain.svg"
                    alt="Sello de calidad, tomate 100% español"
                    class={"w-52 h-52 mx-auto"}
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
