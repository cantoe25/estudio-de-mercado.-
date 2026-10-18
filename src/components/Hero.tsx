import React from 'react';
import { Compass, Sparkles, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

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
        <div className="flex flex-col items-start max-w-5xl 2xl:max-w-6xl">
          {/* Curatorial Header Lead */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs uppercase tracking-widest text-amber-400/90 font-medium mb-3">
            <span>INFORME DE ESTRATEGIA</span>
            <span className="text-neutral-600 font-serif" aria-hidden="true">·</span>
            <span>ESTILO GARTNER</span>
            <span className="text-neutral-600 font-serif" aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1 text-neutral-300">
              <MapPin className="w-3 h-3 text-amber-400" />
              Panamá
            </span>
          </div>

          {/* Main Title with responsive sizing */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.2] mb-4 text-balance">
            Estudio de Mercado: Calzado no deportivo, marcas de moda y lujo en Panamá
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-neutral-300 font-light leading-relaxed mb-5 max-w-3xl">
            Estimaciones cualitativas y precios de referencia en USD. Análisis de 8 marcas globales, 
            scoring ponderado multicriterio y detección de la brecha desatendida entre el calzado aspiracional y el ultralujo.
          </p>

          {/* Verification Warning Notice */}
          <div className="flex items-start gap-2.5 text-[11px] sm:text-xs text-neutral-400 bg-neutral-900/90 border border-amber-500/30 p-3 sm:px-3.5 sm:py-2 rounded mb-6 w-full sm:w-auto">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>Validar presencia en boutiques físicas y listas de precios locales previo a decisiones de inversión.</span>
          </div>

          {/* Action Anchors */}
          <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3 w-full xs:w-auto">
            <button
              onClick={onExploreGartner}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-wider uppercase text-black bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 rounded transition-all shadow-md shadow-amber-500/15 active:scale-95 min-h-[42px]"
            >
              <Compass className="w-4 h-4 shrink-0" />
              <span>Ver Cuadrante Gartner</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>

            <button
              onClick={onExploreScoring}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-wider uppercase text-amber-200 bg-neutral-900/80 hover:bg-neutral-800 border border-amber-500/30 rounded transition-all min-h-[42px]"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Ver Matriz de Scoring</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
