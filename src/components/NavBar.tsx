import { useState, useRef } from 'react';

export default function NavBar() {
   const [, setHoveredIndex] = useState<number | null>(null);
   const [hoverStyle, setHoverStyle] = useState({});
   const navRef = useRef<HTMLDivElement>(null);

   const navItems = [
      { label: 'Inicio', target: 'inicio' },
      { label: 'Productos', target: 'productos' },
      { label: 'Marca', target: 'marca' },
      { label: 'Contacto', target: 'contacto' },
   ];

   const handleMouseEnter = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const navRect = navRef.current?.getBoundingClientRect();

      if (navRect) {
         setHoveredIndex(index);
         setHoverStyle({
            left: rect.left - navRect.left,
            width: rect.width,
            opacity: 1,
         });
      }
   };

   const handleMouseLeave = () => {
      setHoveredIndex(null);
      setHoverStyle(prev => ({ ...prev, opacity: 0 }));
   };

   return (
      <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
         <div
            ref={navRef}
            className="relative flex bg-white/10 backdrop-blur-md rounded-full border border-white/20"
            onMouseLeave={handleMouseLeave}
         >
            {/* Elemento de hover deslizante */}
            <div
               className="absolute top-0 bottom-0 bg-white/20 rounded-full transition-all duration-300 ease-out pointer-events-none"
               style={hoverStyle}
            />

            {navItems.map((item, index) => (
               <button
                  key={item.target}
                  onClick={() =>
                     document
                        .getElementById(item.target)
                        ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  }
                  onMouseEnter={e => handleMouseEnter(index, e)}
                  className="relative z-10 px-4 py-3 text-white/70 hover:text-white transition-colors duration-300 text-sm font-medium cursor-pointer"
               >
                  {item.label}
               </button>
            ))}
         </div>
      </nav>
   );
}
