import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Download, Loader2 } from 'lucide-react';
import { smoothScrollToTop } from '../utils/scrollHelper';

export type SectionKey = 'resumen' | 'competidores' | 'scoring' | 'cuadrante' | 'recomendaciones' | 'todos';

interface NavbarProps {
  onDownloadPdf: () => void;
  isGeneratingPdf?: boolean;
  activeSection: SectionKey;
  onSelectSection: (section: SectionKey) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onDownloadPdf,
  isGeneratingPdf = false,
  activeSection,
  onSelectSection,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const menuItems = [
    {
      id: 'resumen' as SectionKey,
      num: '01',
      label: 'Resumen Ejecutivo',
    },
    {
      id: 'competidores' as SectionKey,
      num: '02',
      label: 'Landscape Competitivo',
    },
    {
      id: 'scoring' as SectionKey,
      num: '03',
      label: 'Matriz de Scoring',
    },
    {
      id: 'cuadrante' as SectionKey,
      num: '04',
      label: 'Cuadrante Estilo Gartner',
    },
    {
      id: 'recomendaciones' as SectionKey,
      num: '05',
      label: 'Recomendaciones y Riesgos',
    },
  ];

  // Update position of the slow, fluid sliding indicator under the active button
  const updateIndicator = useCallback(() => {
    if (!navRef.current) return;
    const activeButton = navRef.current.querySelector<HTMLButtonElement>(`[data-section="${activeSection}"]`);
    if (activeButton) {
      setIndicatorStyle({
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
        opacity: 1,
      });
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeSection]);

  useEffect(() => {
    updateIndicator();
    const timer = setTimeout(updateIndicator, 60);
    window.addEventListener('resize', updateIndicator);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [updateIndicator]);

  const handleSelect = (key: SectionKey) => {
    onSelectSection(key);
    setIsMobileMenuOpen(false);
    smoothScrollToTop(850);
  };

  const handlePdfClick = () => {
    setIsMobileMenuOpen(false);
    onDownloadPdf();
  };

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-amber-500/20">
        <div className="w-full max-w-[1800px] mx-auto flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-10 xl:px-12 py-3 sm:py-4">
          {/* Brand Zone */}
          <button 
            onClick={() => handleSelect('resumen')}
            className="font-serif text-lg sm:text-xl tracking-wider text-white hover:text-amber-300 transition-all duration-500 ease-out hover:-translate-y-0.5 active:translate-y-0.5 whitespace-nowrap shrink-0 flex items-center gap-2 text-left"
          >
            <span className="text-amber-400 font-bold text-xl sm:text-2xl font-serif">P</span>
            <span className="tracking-widest text-xs sm:text-sm uppercase font-sans font-semibold text-amber-100">
              PANAMÁ <span className="text-amber-400/80 font-serif italic text-[11px] sm:text-xs">Nexo Lite</span>
            </span>
          </button>

          {/* Desktop Nav Links with Slow, Fluid Sliding Indicator */}
          <nav 
            ref={navRef}
            className="relative hidden md:flex items-center gap-6 text-xs uppercase tracking-widest font-sans font-medium text-neutral-400 py-1"
          >
            {menuItems.map((item) => (
              <button
                key={item.id}
                data-section={item.id}
                onClick={() => handleSelect(item.id)}
                className={`relative py-1.5 px-0.5 transition-all duration-500 ease-out whitespace-nowrap shrink-0 hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer ${
                  activeSection === item.id
                    ? 'text-amber-300 font-semibold drop-shadow-[0_0_10px_rgba(251,191,36,0.45)]'
                    : 'hover:text-amber-300 text-neutral-400'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Gliding Amber Indicator Bar: Moves slowly and fluidly across the navbar */}
            <span
              className="absolute bottom-0 h-[2.5px] bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 rounded-full shadow-[0_0_12px_rgba(251,191,36,0.8)] pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity,
              }}
            />
          </nav>


          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 shrink-0">
            {/* PDF Export Button (Desktop & Mobile) */}
            <button
              onClick={handlePdfClick}
              disabled={isGeneratingPdf}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium tracking-wider text-amber-300 bg-neutral-900 border border-amber-500/40 hover:bg-neutral-800 hover:border-amber-400 rounded transition-all duration-500 ease-out hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.98] whitespace-nowrap min-h-[38px] disabled:opacity-60 cursor-pointer"
              title="Descargar informe completo en PDF"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                  <span>Generando...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden xs:inline">Descargar</span>
                  <span>PDF</span>
                </>
              )}
            </button>

            {/* Mobile Three-Lines Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="md:hidden flex items-center justify-center p-2 rounded-lg bg-neutral-900 border border-amber-500/40 text-amber-300 hover:text-white hover:bg-neutral-800 transition-all duration-500 ease-out hover:-translate-y-0.5 active:translate-y-0.5 min-h-[44px] min-w-[44px] cursor-pointer"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir opciones de visualización"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-amber-400" />
              ) : (
                <div className="flex flex-col items-center justify-center gap-1.5 w-6 h-6">
                  {/* Three distinct lines */}
                  <span className="w-5 h-0.5 bg-amber-400 rounded-full"></span>
                  <span className="w-5 h-0.5 bg-amber-400 rounded-full"></span>
                  <span className="w-5 h-0.5 bg-amber-400 rounded-full"></span>
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Drawer Menu with all visualization & PDF export options */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200 flex flex-col md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {/* Drawer Top Header */}
          <div 
            className="flex items-center justify-between p-4 border-b border-amber-500/20 bg-neutral-950"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                Opciones del Estudio
              </h3>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-full text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Cerrar menú"
            >
              <X className="w-5 h-5 text-amber-400" />
            </button>
          </div>

          {/* List of Navigation Options */}
          <div 
            className="flex-1 overflow-y-auto p-4 space-y-2.5"
            onClick={(e) => e.stopPropagation()}
          >
            {menuItems.map((item) => {
              const isSelected = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center px-4 py-3.5 rounded-lg border transition-all duration-500 ease-out hover:-translate-y-0.5 active:translate-y-0.5 text-left cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-400 text-white shadow-lg shadow-amber-500/10 font-semibold'
                      : 'bg-neutral-900/80 border-neutral-800 text-neutral-300 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  <span className="font-serif text-sm">
                    {item.label}
                  </span>
                </button>
              );
            })}

          </div>
        </div>
      )}
    </>
  );
};
