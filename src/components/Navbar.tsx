import React, { useState } from 'react';
import { Menu, X, PieChart, Users, BarChart3, Compass, Lightbulb, ChevronRight, FileText, Download, Loader2 } from 'lucide-react';

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

  const menuItems = [
    {
      id: 'resumen' as SectionKey,
      num: '01',
      label: 'Resumen Ejecutivo',
      subtitle: 'Vista principal, KPIs macro y brecha de mercado',
      icon: PieChart,
    },
    {
      id: 'competidores' as SectionKey,
      num: '02',
      label: 'Landscape Competitivo',
      subtitle: '8 marcas, origen, retail USD y presencia',
      icon: Users,
    },
    {
      id: 'scoring' as SectionKey,
      num: '03',
      label: 'Matriz de Scoring',
      subtitle: 'Evaluación ponderada multicriterio (1–10)',
      icon: BarChart3,
    },
    {
      id: 'cuadrante' as SectionKey,
      num: '04',
      label: 'Cuadrante Estilo Gartner',
      subtitle: 'Visión vs. Ejecución y nichos de mercado',
      icon: Compass,
    },
    {
      id: 'recomendaciones' as SectionKey,
      num: '05',
      label: 'Recomendaciones y Riesgos',
      subtitle: '8 mandamientos y planes de mitigación',
      icon: Lightbulb,
    },
  ];

  const handleSelect = (key: SectionKey) => {
    onSelectSection(key);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            className="font-serif text-lg sm:text-xl tracking-wider text-white hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 text-left"
          >
            <span className="text-amber-400 font-bold text-xl sm:text-2xl font-serif">P</span>
            <span className="tracking-widest text-xs sm:text-sm uppercase font-sans font-semibold text-amber-100">
              PANAMÁ <span className="text-amber-400/80 font-serif italic text-[11px] sm:text-xs">Footwear Study</span>
            </span>
          </button>

          {/* Desktop Nav Links (Visible on desktop >= md) */}
          <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest font-sans font-medium text-neutral-400">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`transition-colors whitespace-nowrap shrink-0 ${
                  activeSection === item.id
                    ? 'text-amber-300 font-semibold border-b-2 border-amber-400 pb-0.5'
                    : 'hover:text-amber-400'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleSelect('todos')}
              className={`transition-colors whitespace-nowrap shrink-0 ${
                activeSection === 'todos'
                  ? 'text-amber-300 font-semibold border-b-2 border-amber-400 pb-0.5'
                  : 'hover:text-amber-400 text-neutral-500'
              }`}
            >
              Ver Todo
            </button>
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 shrink-0">
            {/* PDF Export Button (Desktop & Mobile) */}
            <button
              onClick={handlePdfClick}
              disabled={isGeneratingPdf}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium tracking-wider text-amber-300 bg-neutral-900 border border-amber-500/40 hover:bg-neutral-800 hover:border-amber-400 rounded transition-all active:scale-95 whitespace-nowrap min-h-[38px] disabled:opacity-60"
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
              className="md:hidden flex items-center justify-center p-2 rounded-lg bg-neutral-900 border border-amber-500/40 text-amber-300 hover:text-white hover:bg-neutral-800 transition-colors min-h-[44px] min-w-[44px]"
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
              <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold block">
                MENÚ DE VISUALIZACIÓN
              </span>
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
            {/* Direct PDF Export Button inside drawer */}
            <div className="bg-gradient-to-r from-amber-500/20 to-neutral-900 border border-amber-400/50 rounded-xl p-3.5 mb-3">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[10px] uppercase tracking-widest text-amber-300 font-bold flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5" />
                  EXPORTAR REPORTE COMPLETO
                </span>
                <span className="text-[9px] bg-amber-400 text-black font-bold px-1.5 py-0.5 rounded">PDF</span>
              </div>
              <p className="text-xs text-neutral-300 mb-2.5">
                Genera y descarga directamente un archivo PDF con las 5 partes completas del estudio.
              </p>
              <button
                onClick={handlePdfClick}
                disabled={isGeneratingPdf}
                className="w-full py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 active:scale-95 disabled:opacity-60"
              >
                {isGeneratingPdf ? (
                  <>
                    <Loader2 className="w-4 h-4 text-black animate-spin" />
                    <span>Generando PDF...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-black" />
                    <span>Descargar PDF Completo</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-[11px] uppercase tracking-widest text-neutral-400 font-semibold mb-2 px-1">
              Partes del Estudio
            </div>

            {menuItems.map((item) => {
              const Icon = item.icon;
              const isSelected = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-lg border transition-all text-left ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-400 text-white shadow-lg shadow-amber-500/10'
                      : 'bg-neutral-900/80 border-neutral-800 text-neutral-300 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-md ${
                      isSelected ? 'bg-amber-400 text-black' : 'bg-neutral-800 text-amber-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-sm font-bold">
                          {item.label}
                        </span>
                        {item.id === 'resumen' && (
                          <span className="text-[9px] uppercase tracking-wider font-semibold text-black bg-amber-400 px-1.5 py-0.2 rounded">
                            Principal
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 ${
                    isSelected ? 'text-amber-400' : 'text-neutral-600'
                  }`} />
                </button>
              );
            })}

            {/* Option to view all sections continuously */}
            <button
              onClick={() => handleSelect('todos')}
              className={`w-full flex items-center justify-between p-3.5 rounded-lg border transition-all text-left mt-1 ${
                activeSection === 'todos'
                  ? 'bg-amber-500/15 border-amber-400 text-white'
                  : 'bg-neutral-950 border-neutral-850 text-neutral-400 hover:bg-neutral-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-neutral-800 text-amber-400">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-serif text-sm font-bold text-neutral-200">
                    Ver Estudio Completo
                  </span>
                  <p className="text-[11px] text-neutral-500">
                    Todas las secciones seguidas en un solo documento
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-600 shrink-0" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
