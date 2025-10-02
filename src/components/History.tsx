import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "preact/hooks";
import { useFadeIn, useParallax, useSlideUp } from "@/hooks/useGSAP";

gsap.registerPlugin(ScrollTrigger);

interface HistoryProps {
  content?: string;
  highlights?: string[];
}

const defaultHighlights = [
  "Más de 65 años de tradición desde 1959",
  "Tomates cultivados por nuestros propios agricultores",
  "Elaboración artesanal con cariño y dedicación",
  "Compromiso con la autenticidad y lo honesto",
];

const History = ({
  content = "Fruco nació en 1959 con una misión sencilla: llevar a cada hogar productos llenos de sabor y confianza. Comenzamos elaborando zumos que conquistaron generaciones, y hoy seguimos honrando esa historia con una gama de salsas de tomate creadas con el mismo cariño y dedicación de siempre.",
  highlights = defaultHighlights,
}: HistoryProps) => {
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
              Nuestra
              <span className="block bg-fruco-gold bg-clip-text text-transparent">
                Historia
              </span>
            </h2>

            {/* Contenido descriptivo */}
            <p
              ref={contentRef}
              className="text-lg md:text-xl text-gray-300 leading-relaxed font-light"
              style={{ willChange: "transform, opacity" }}
            >
              {content}
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
                  Años de Tradición
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
                  Natural
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
              {highlights.map((highlight) => (
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
                <div
                  className="absolute inset-0 border-2 border-white/20 rounded-full animate-spin"
                  style={{ animationDuration: "20s" }}
                />
                <div
                  className="absolute inset-4 border-2 border-white/20 rounded-full animate-spin"
                  style={{
                    animationDuration: "15s",
                    animationDirection: "reverse",
                  }}
                />
                <div
                  className="absolute inset-8 border-2 border-white/10 rounded-full animate-spin"
                  style={{ animationDuration: "25s" }}
                />
                {/* Centro */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-white to-fruco-gold rounded-full opacity-80 animate-pulse" />
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
