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
          className="h-[30vh] w-full object-cover"
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
      </div>
    </section>
  );
};

export default VideoHero;
