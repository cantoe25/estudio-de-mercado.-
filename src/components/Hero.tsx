import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onExploreGartner: () => void;
  onExploreScoring: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreGartner, onExploreScoring }) => {
  return (
    <section className="relative pt-8 sm:pt-12 pb-10 sm:pb-14 border-b border-amber-500/20 bg-gradient-to-b from-neutral-950 via-black to-neutral-950 overflow-hidden">
      {/* Subtle gold radiance */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-44 sm:h-56 bg-amber-500/5 blur-[90px] sm:blur-[120px] pointer-events-none rounded-full" 
        aria-hidden="true"
      />

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl 2xl:max-w-6xl mx-auto">

          {/* Main Title with responsive sizing */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.2] mb-6 sm:mb-8 text-balance text-center">
            Estudio de Mercado: Calzado no deportivo, marcas de moda y lujo en Panamá
          </h1>

          {/* Action Anchors */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full mx-auto">
            <button
              onClick={onExploreGartner}
              className="w-[500px] max-w-full mx-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-black bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 rounded transition-all duration-500 ease-out shadow-md shadow-amber-500/15 hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.98] min-h-[42px] cursor-pointer"
            >
              <span>Ver Cuadrante Gartner</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>

            <button
              onClick={onExploreScoring}
              className="w-[500px] max-w-full mx-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-amber-200 bg-neutral-900/80 hover:bg-neutral-800 border border-amber-500/30 hover:border-amber-400/60 rounded transition-all duration-500 ease-out hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.98] min-h-[42px] cursor-pointer"
            >
              <span>Ver Matriz de Scoring</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
