import React from 'react';
import { ArrowUp, Award, Download, Loader2 } from 'lucide-react';

interface FooterProps {
  onDownloadPdf?: () => void;
  isGeneratingPdf?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onDownloadPdf, isGeneratingPdf = false }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-amber-500/20 bg-neutral-950 text-neutral-400 pt-10 pb-24 md:pb-12 print:hidden">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-neutral-900">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-serif text-base sm:text-lg font-bold text-white tracking-wider flex items-center gap-2">
              <span className="text-amber-400">ESTUDIO DE MERCADO</span>
              <span className="text-neutral-600 font-sans text-xs">/</span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-neutral-400 font-sans font-medium">Panamá 2026</span>
            </span>
            <p className="text-[11px] sm:text-xs text-neutral-400 mt-1 max-w-md">
              Calzado no deportivo, marcas de moda y lujo en Ciudad de Panamá. Metodología de análisis cualitativo y cuantitativo estilo Gartner.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {onDownloadPdf && (
              <button
                onClick={onDownloadPdf}
                disabled={isGeneratingPdf}
                className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-amber-300 bg-neutral-900 border border-amber-500/30 hover:border-amber-400 hover:text-white rounded transition-colors min-h-[40px] disabled:opacity-60"
              >
                {isGeneratingPdf ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                    <span>Generando PDF...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>Descargar PDF</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-3 py-2 text-xs text-neutral-400 hover:text-amber-300 border border-neutral-800 hover:border-amber-500/40 rounded transition-colors min-h-[40px]"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Volver arriba</span>
            </button>
          </div>
        </div>

        <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-neutral-400 gap-2 sm:gap-4 text-center sm:text-left">
          <p>
            Estimaciones cualitativas con fines de planificación. Precios y disponibilidad sujetos a confirmación con boutiques en Panamá.
          </p>
          <div className="flex items-center gap-1.5 text-neutral-400 shrink-0">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>Black · Gold · White Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
