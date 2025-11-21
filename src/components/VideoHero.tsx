import { gsap } from "gsap";
import { useEffect, useRef } from "preact/hooks";

interface VideoHeroProps {
  videoSrc?: string;
  posterSrc?: string;
}

const VideoHero = ({
  videoSrc = "/hero-video.mp4",
  posterSrc = "/hero-poster.png",
}: VideoHeroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        gsap.fromTo(
          videoRef.current,
          { opacity: 0, scale: 0.98 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
            onComplete: () => {
              window.dispatchEvent(new CustomEvent("heroAnimationComplete"));
            },
          },
        );
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex items-center justify-center overflow-hidden"
    >
      <div className="relative w-full">
        <video
          ref={videoRef}
          className="h-[55vh] w-full object-cover"
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          style={{
            opacity: 0,
            willChange: "transform, opacity",
          }}
        >
          <source src={videoSrc} type="video/mp4" />
          Tu navegador no soporta la reproducción de video.
        </video>
        <div className="absolute right-0 bottom-0 left-0 flex h-20 items-center justify-center">
          <div className="relative h-full w-full">
            {/* SVG con picos de arriba hacia abajo */}
            <svg
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="none"
              viewBox="0 0 100 20"
            >
              {/* Lateral izquierdo - triángulo de arriba (ancho) a abajo (punta) */}
              <path d="M 0,0 L 45,0 L 48,20 L 0,20 Z" fill="black" />

              {/* Lateral derecho - triángulo de arriba (ancho) a abajo (punta) */}
              <path d="M 55,0 L 100,0 L 100,20 L 52,20 Z" fill="black" />
            </svg>

            {/* Flecha central con animación bounce */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-bounce">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  className="-rotate-90 text-white drop-shadow-lg"
                  fill="currentColor"
                >
                  <path d="M17.387,20.587,14.754,18H22.02A1.979,1.979,0,0,0,24,16.02v-.04A1.979,1.979,0,0,0,22.02,14H15.057l.042-.26,2.227-2.248a2.091,2.091,0,0,0,.293-2.657A1.973,1.973,0,0,0,14.6,8.58L8.581,14.654a2.017,2.017,0,0,0,0,2.833l6,5.934a1.97,1.97,0,0,0,2.806,0A2.016,2.016,0,0,0,17.387,20.587Z"></path>
                  <path d="M32,16A16,16,0,1,0,16,32,16,16,0,0,0,32,16ZM4,16A12,12,0,1,1,16,28,12.013,12.013,0,0,1,4,16Z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoHero;
