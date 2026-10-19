import React from 'react';
import { STRATEGIC_RECOMMENDATIONS, RISKS_AND_MITIGATIONS } from '../data/marketData';

export const RecommendationsSection: React.FC = () => {
  return (
    <section id="recomendaciones" className="pt-10 sm:pt-14 pb-14 sm:pb-16">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Section Header */}
        <div className="flex flex-col mb-6 sm:mb-8">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-widest text-amber-400 font-medium mb-1">
            <span>SECCIÓN 05</span>
            <span className="text-neutral-600" aria-hidden="true">/</span>
            <span>PLAN DE ACCIÓN Y RIESGOS</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
            <div>
              <h2 className="text-xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                5. Recomendaciones Estratégicas
              </h2>
              <div className="w-14 sm:w-16 h-0.5 bg-gradient-to-r from-amber-400 to-transparent mt-2"></div>
            </div>
          </div>
        </div>

        {/* 8 Recommendations Grid (Scales from 1-col on mobile, 2-col on laptops, to 4-col on wide PC displays) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3.5 sm:gap-5 2xl:gap-6 mb-10 sm:mb-14">
          {STRATEGIC_RECOMMENDATIONS.map((rec) => (
            <div
              key={rec.id}
              className="bg-neutral-900/80 border border-neutral-800 hover:border-amber-500/40 rounded p-4 sm:p-6 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="mb-2 sm:mb-3 min-h-[2.8rem] sm:min-h-[3.2rem] flex flex-col justify-center">
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white group-hover:text-amber-200 transition-colors leading-snug text-balance">
                    {rec.title}
                  </h3>
                </div>

                {/* Acción */}
                <div className="text-xs text-neutral-300 mb-3 leading-relaxed">
                  <strong className="text-white block mb-0.5 uppercase tracking-wider text-[10px] sm:text-[11px] text-amber-300">
                    Acción recomendada:
                  </strong>
                  {rec.action}
                </div>
              </div>

              {/* Por qué */}
              <div className="border-t border-neutral-800/80 pt-2.5 sm:pt-3 text-[11px] sm:text-xs text-neutral-400 leading-relaxed bg-neutral-950/40 p-2.5 rounded">
                <strong className="text-neutral-200 font-medium">Por qué: </strong>
                {rec.reason}
              </div>
            </div>
          ))}
        </div>

        {/* Subsection: Matriz de Riesgos y Mitigación */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                Riesgos del Mercado Panameño y Mitigación
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Estrategias preventivas contra barreras arancelarias, compras en Miami y gigantes del retail.
              </p>
            </div>
          </div>

          {/* 1. Mobile Risk Cards View (Fits 100% on phone screens with zero horizontal overflow) */}
          <div className="space-y-3 md:hidden">
            {RISKS_AND_MITIGATIONS.map((item, idx) => (
              <div key={idx} className="bg-neutral-950/90 border border-neutral-800 rounded-lg p-3.5 shadow-md">
                <div className="flex items-start justify-between gap-2 mb-2 pb-2 border-b border-neutral-900">
                  <span className="text-[10px] uppercase font-semibold text-neutral-400">
                    Riesgo #{idx + 1}
                  </span>
                </div>

                <p className="text-xs font-medium text-white mb-3 leading-relaxed">
                  {item.risk}
                </p>

                <div className="bg-neutral-900/80 p-2.5 rounded border border-neutral-800/80">
                  <div className="text-[11px] text-neutral-300 leading-relaxed">
                    <strong className="text-amber-300 block mb-0.5 uppercase tracking-wider text-[10px]">
                      Mitigación Operativa:
                    </strong>
                    {item.mitigation}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 2. Desktop Full Table View (Active on md screens and above) */}
          <div className="hidden md:block overflow-x-auto border border-neutral-800 rounded bg-neutral-950/60 shadow-xl">
            <table className="w-full text-left text-xs border-collapse min-w-[680px]">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-900/90 text-neutral-400 uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-5 w-1/3">Riesgo Detectado</th>
                  <th className="py-3.5 px-5 w-1/2">Plan de Mitigación Operativa</th>
                  <th className="py-3.5 px-5 text-center">Criticidad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {RISKS_AND_MITIGATIONS.map((item, idx) => (
                  <tr key={idx} className="hover:bg-neutral-900/50 transition-colors">
                    <td className="py-4 px-5 font-medium text-white align-top leading-relaxed">
                      {item.risk}
                    </td>
                    <td className="py-4 px-5 text-neutral-300 align-top leading-relaxed">
                      <span>{item.mitigation}</span>
                    </td>
                    <td className="py-4 px-5 text-center align-top whitespace-nowrap text-neutral-300 font-sans">
                      {item.impactLevel}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
