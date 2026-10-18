import React from 'react';
import { EXECUTIVE_INSIGHTS } from '../data/marketData';
import { Target, TrendingUp, Gem, DollarSign } from 'lucide-react';

export const ExecutiveSummary: React.FC = () => {
  return (
    <section id="resumen" className="pt-10 sm:pt-14 pb-10 sm:pb-12 border-b border-amber-500/20">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Section Header */}
        <div className="flex flex-col mb-6 sm:mb-8">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-widest text-amber-400 font-medium mb-1">
            <span>SECCIÓN 01</span>
            <span className="text-neutral-600" aria-hidden="true">/</span>
            <span>DIAGNÓSTICO MACRO</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            1. Resumen Ejecutivo
          </h2>
          <div className="w-14 sm:w-16 h-0.5 bg-gradient-to-r from-amber-400 to-transparent mt-2"></div>
        </div>

        {/* 4 Core KPIs in 2x2 Mobile / 4-Col Desktop Grid with Golden Borders */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 2xl:gap-6 mb-8 sm:mb-10">
          <div className="bg-neutral-900/90 border border-amber-500/30 rounded-lg p-4 sm:p-6 relative overflow-hidden group hover:border-amber-400/60 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-neutral-400 font-medium truncate">Brecha de Mercado</span>
              <Target className="w-4 h-4 text-amber-400 shrink-0" />
            </div>
            <div className="font-serif text-xl sm:text-3xl 2xl:text-4xl font-bold text-amber-300 tabular-nums">
              $250–$500
            </div>
            <p className="text-[11px] sm:text-xs text-neutral-400 mt-1.5 sm:mt-2.5 leading-relaxed">
              Espacio sin atender entre el calzado comercial y el lujo.
            </p>
          </div>

          <div className="bg-neutral-900/90 border border-amber-500/30 rounded-lg p-4 sm:p-6 relative overflow-hidden group hover:border-amber-400/60 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-neutral-400 font-medium truncate">Marcas Analizadas</span>
              <Gem className="w-4 h-4 text-amber-400 shrink-0" />
            </div>
            <div className="font-serif text-xl sm:text-3xl 2xl:text-4xl font-bold text-white tabular-nums">
              8
            </div>
            <p className="text-[11px] sm:text-xs text-neutral-400 mt-1.5 sm:mt-2.5 leading-relaxed">
              Alemania, Italia, España, Francia y EE. UU.
            </p>
          </div>

          <div className="bg-neutral-900/90 border border-amber-500/30 rounded-lg p-4 sm:p-6 relative overflow-hidden group hover:border-amber-400/60 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-neutral-400 font-medium truncate">Segmentos Activos</span>
              <TrendingUp className="w-4 h-4 text-amber-400 shrink-0" />
            </div>
            <div className="font-serif text-xl sm:text-3xl 2xl:text-4xl font-bold text-white tabular-nums">
              3
            </div>
            <p className="text-[11px] sm:text-xs text-neutral-400 mt-1.5 sm:mt-2.5 leading-relaxed">
              Aspiracional · Lujo Heritage · Lujo de Moda.
            </p>
          </div>

          <div className="bg-neutral-900/90 border border-amber-500/30 rounded-lg p-4 sm:p-6 relative overflow-hidden group hover:border-amber-400/60 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-neutral-400 font-medium truncate">Impuesto ITBMS</span>
              <DollarSign className="w-4 h-4 text-amber-400 shrink-0" />
            </div>
            <div className="font-serif text-xl sm:text-3xl 2xl:text-4xl font-bold text-amber-300 tabular-nums">
              7% ITBMS
            </div>
            <p className="text-[11px] sm:text-xs text-neutral-400 mt-1.5 sm:mt-2.5 leading-relaxed">
              Base impositiva panameña; verificar aranceles.
            </p>
          </div>
        </div>

        {/* 6 Analytical Narrative Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 2xl:gap-8">
          {EXECUTIVE_INSIGHTS.map((item, index) => {
            const isHighlighted = item.isHighlight;
            return (
              <div
                key={index}
                className={`rounded p-4 sm:p-6 transition-all duration-200 ${
                  isHighlighted
                    ? "bg-neutral-900/95 border-2 border-amber-400 shadow-xl shadow-amber-500/10 md:col-span-2 lg:col-span-1"
                    : "bg-neutral-950/80 border border-neutral-800 hover:border-neutral-700"
                }`}
              >
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <h3 className={`font-serif font-semibold tracking-wide ${
                    isHighlighted ? "text-amber-300 text-base sm:text-lg" : "text-white text-sm sm:text-base"
                  }`}>
                    {item.title}
                  </h3>
                  {isHighlighted && (
                    <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-semibold text-black bg-amber-400 px-2 py-0.5 rounded whitespace-nowrap">
                      Oportunidad Clave
                    </span>
                  )}
                </div>
                <p className={`text-xs sm:text-sm leading-relaxed ${
                  isHighlighted ? "text-neutral-200 font-normal" : "text-neutral-400"
                }`}>
                  {item.content}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
