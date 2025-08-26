import { useRef, useEffect, useState } from 'preact/hooks';

interface UseLazyImageOptions {
   rootMargin?: string;
   threshold?: number;
   fallbackSrc?: string;
}

interface UseLazyImageReturn {
   imgRef: preact.RefObject<HTMLImageElement>;
   isLoaded: boolean;
   isInView: boolean;
   error: boolean;
}

export const useLazyImage = (options: UseLazyImageOptions = {}): UseLazyImageReturn => {
   const { rootMargin = '50px', threshold = 0.1, fallbackSrc } = options;

   const imgRef = useRef<HTMLImageElement>(null);
   const [isLoaded, setIsLoaded] = useState(false);
   const [isInView, setIsInView] = useState(false);
   const [error, setError] = useState(false);

   useEffect(() => {
      const imgElement = imgRef.current;
      if (!imgElement) return;

      // Crear el observer
      const observer = new IntersectionObserver(
         entries => {
            entries.forEach(entry => {
               if (entry.isIntersecting) {
                  setIsInView(true);

                  // Cargar la imagen cuando esté en vista
                  const img = entry.target as HTMLImageElement;
                  const src = img.dataset.src;
                  const srcset = img.dataset.srcset;

                  if (src) {
                     img.src = src;
                  }
                  if (srcset) {
                     img.srcset = srcset;
                  }

                  // Manejar eventos de carga
                  const handleLoad = () => {
                     setIsLoaded(true);
                     setError(false);
                     img.classList.add('loaded');
                  };

                  const handleError = () => {
                     setError(true);
                     if (fallbackSrc) {
                        img.src = fallbackSrc;
                     }
                  };

                  img.addEventListener('load', handleLoad);
                  img.addEventListener('error', handleError);

                  // Dejar de observar una vez que se ha cargado
                  observer.unobserve(img);
               }
            });
         },
         {
            rootMargin,
            threshold,
         }
      );

      // Comenzar a observar
      observer.observe(imgElement);

      // Cleanup
      return () => {
         if (imgElement) {
            observer.unobserve(imgElement);
         }
      };
   }, [rootMargin, threshold, fallbackSrc]);

   return {
      imgRef,
      isLoaded,
      isInView,
      error,
   };
};

export default useLazyImage;
