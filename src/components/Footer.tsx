import React from 'react';
import { ArrowUp, Download, Loader2 } from 'lucide-react';
import { smoothScrollToTop } from '../utils/scrollHelper';

interface FooterProps {
  onDownloadPdf?: () => void;
  isGeneratingPdf?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onDownloadPdf, isGeneratingPdf = false }) => {
  const scrollToTop = () => {
    smoothScrollToTop(850);
  };

  return (
    <footer className="border-t border-amber-500/20 bg-neutral-950 text-neutral-400 py-8 print:hidden">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-serif text-base sm:text-lg font-bold text-white tracking-wider">
              <span className="text-amber-400">ESTUDIO DE MERCADO</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {onDownloadPdf && (
              <button
                onClick={onDownloadPdf}
                disabled={isGeneratingPdf}
                className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-amber-300 bg-neutral-900 border border-amber-500/30 hover:border-amber-400 hover:text-white rounded transition-all duration-500 ease-out hover:-translate-y-0.5 active:translate-y-0.5 min-h-[40px] disabled:opacity-60 cursor-pointer"
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
              className="flex items-center gap-2 px-3 py-2 text-xs text-neutral-400 hover:text-amber-300 border border-neutral-800 hover:border-amber-500/40 rounded transition-all duration-500 ease-out hover:-translate-y-0.5 active:translate-y-0.5 min-h-[40px] cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Volver arriba</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
