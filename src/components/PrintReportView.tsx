import React from 'react';
import { INITIAL_BRANDS, CRITERIA, calculateWeightedScore, STRATEGIC_RECOMMENDATIONS, RISKS_AND_MITIGATIONS, EXECUTIVE_INSIGHTS } from '../data/marketData';

export const PrintReportView: React.FC = () => {
  const brands = INITIAL_BRANDS;
  const sortedBrands = [...brands].map(b => ({
    ...b,
    finalScore: calculateWeightedScore(b)
  })).sort((a, b) => b.finalScore - a.finalScore);

  return (
    <div className="hidden print:block text-white bg-black p-4 font-sans text-xs">
      {/* Print Document Header / Cover */}
      <div className="border-b-2 border-amber-400 pb-6 mb-8">
        <div className="flex items-center justify-between text-[11px] text-amber-400 uppercase tracking-widest font-semibold mb-2">
          <span>INFORME OFICIAL DE ESTRATEGIA COMERCIAL</span>
          <span>PANAMÁ · 2026</span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-white mb-2 leading-tight">
          Estudio de Mercado: Calzado no deportivo, marcas de moda y lujo en Panamá
        </h1>
        <p className="text-neutral-300 text-xs leading-relaxed max-w-3xl">
          Análisis cualitativo y cuantitativo bajo metodología estilo Gartner. Evaluación de marcas globales, 
          scoring ponderado multicriterio, cuadrante de posicionamiento y detección de la brecha $250–$500 USD.
        </p>
        <div className="mt-3 text-[10px] text-neutral-400 italic">
          *Estimaciones de precios aproximados en USD y presencia en retail local. Validar inventario previo a decisiones de inversión.
        </div>
      </div>

      {/* 1. RESUMEN EJECUTIVO */}
      <div className="mb-10 print-avoid-break">
        <div className="flex items-center gap-2 text-amber-400 font-serif font-bold text-lg border-b border-neutral-800 pb-2 mb-4">
          <span>1. Resumen Ejecutivo</span>
        </div>

        {/* 4 KPIs */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          <div className="border border-amber-500/40 bg-neutral-900/80 p-3 rounded">
            <span className="text-[10px] uppercase text-neutral-400 font-semibold block">Brecha de Mercado</span>
            <span className="font-serif text-xl font-bold text-amber-300 block my-1">$250–$500</span>
            <span className="text-[10px] text-neutral-400 leading-tight block">Franja desatendida entre el calzado estándar y el lujo.</span>
          </div>
          <div className="border border-neutral-800 bg-neutral-900/80 p-3 rounded">
            <span className="text-[10px] uppercase text-neutral-400 font-semibold block">Marcas Analizadas</span>
            <span className="font-serif text-xl font-bold text-white block my-1">8</span>
            <span className="text-[10px] text-neutral-400 leading-tight block">Alemania, Italia, España, Francia y EE. UU.</span>
          </div>
          <div className="border border-neutral-800 bg-neutral-900/80 p-3 rounded">
            <span className="text-[10px] uppercase text-neutral-400 font-semibold block">Segmentos</span>
            <span className="font-serif text-xl font-bold text-white block my-1">3</span>
            <span className="text-[10px] text-neutral-400 leading-tight block">Aspiracional · Lujo Heritage · Lujo de Moda.</span>
          </div>
          <div className="border border-amber-500/40 bg-neutral-900/80 p-3 rounded">
            <span className="text-[10px] uppercase text-neutral-400 font-semibold block">Impuesto ITBMS</span>
            <span className="font-serif text-xl font-bold text-amber-300 block my-1">7% ITBMS</span>
            <span className="text-[10px] text-neutral-400 leading-tight block">Base impositiva panameña; verificar aranceles.</span>
          </div>
        </div>

        {/* 6 Analytical Insights */}
        <div className="grid grid-cols-2 gap-3">
          {EXECUTIVE_INSIGHTS.map((item, idx) => (
            <div 
              key={idx} 
              className={`p-3 rounded border text-[11px] ${
                item.isHighlight 
                  ? 'border-amber-400 bg-neutral-900/90' 
                  : 'border-neutral-800 bg-neutral-950'
              }`}
            >
              <span className={`font-serif font-bold block mb-1 ${item.isHighlight ? 'text-amber-300' : 'text-white'}`}>
                {item.title} {item.isHighlight && '(Oportunidad Clave)'}
              </span>
              <p className="text-neutral-300 leading-normal">{item.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. LANDSCAPE COMPETITIVO */}
      <div className="mb-10 print-page-break">
        <div className="flex items-center gap-2 text-amber-400 font-serif font-bold text-lg border-b border-neutral-800 pb-2 mb-4">
          <span>2. Landscape Competitivo (8 Marcas Analizadas)</span>
        </div>

        <table className="w-full text-left text-[11px] border-collapse border border-neutral-800 mb-4">
          <thead>
            <tr className="bg-neutral-900 text-neutral-400 uppercase text-[10px] border-b border-neutral-800">
              <th className="p-2 border-r border-neutral-800">Marca</th>
              <th className="p-2 border-r border-neutral-800">Origen</th>
              <th className="p-2 border-r border-neutral-800">Segmento</th>
              <th className="p-2 border-r border-neutral-800">Precio (USD)</th>
              <th className="p-2 border-r border-neutral-800">Propuesta de Valor</th>
              <th className="p-2">Presencia en Panamá</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {brands.map(b => (
              <tr key={b.id} className="border-b border-neutral-800">
                <td className="p-2 font-serif font-bold text-white border-r border-neutral-800 whitespace-nowrap">{b.name}</td>
                <td className="p-2 text-neutral-300 border-r border-neutral-800">{b.origin}</td>
                <td className="p-2 text-amber-300 border-r border-neutral-800">{b.segment}</td>
                <td className="p-2 text-amber-200 font-bold border-r border-neutral-800 whitespace-nowrap">${b.priceRange}</td>
                <td className="p-2 text-neutral-300 border-r border-neutral-800">{b.valueProp}</td>
                <td className="p-2 text-neutral-400">{b.localPresence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 3. MATRIZ DE SCORING PONDERADO */}
      <div className="mb-10 print-avoid-break">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-4">
          <span className="text-amber-400 font-serif font-bold text-lg">3. Matriz de Scoring Ponderado</span>
          <span className="text-[10px] text-neutral-400">Escala de 1 a 10 con ponderación oficial</span>
        </div>

        {/* Weights */}
        <div className="grid grid-cols-5 gap-2 mb-4 text-[10px]">
          {CRITERIA.map(c => (
            <div key={c.id} className="border border-neutral-800 p-2 rounded bg-neutral-900/60">
              <span className="font-bold text-amber-300 block">{Math.round(c.weight * 100)}%</span>
              <span className="text-white block leading-tight">{c.name}</span>
            </div>
          ))}
        </div>

        <table className="w-full text-left text-[11px] border-collapse border border-neutral-800">
          <thead>
            <tr className="bg-neutral-900 text-neutral-400 uppercase text-[10px] border-b border-neutral-800">
              <th className="p-2 border-r border-neutral-800">Pos.</th>
              <th className="p-2 border-r border-neutral-800">Marca</th>
              <th className="p-2 text-center border-r border-neutral-800">Calidad (25%)</th>
              <th className="p-2 text-center border-r border-neutral-800">Marca (20%)</th>
              <th className="p-2 text-center border-r border-neutral-800">Precio-V (20%)</th>
              <th className="p-2 text-center border-r border-neutral-800">Acceso (20%)</th>
              <th className="p-2 text-center border-r border-neutral-800">Innov. (15%)</th>
              <th className="p-2 text-right">Puntaje Final</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {sortedBrands.map((b, idx) => (
              <tr key={b.id} className="border-b border-neutral-800">
                <td className="p-2 font-bold text-neutral-400 border-r border-neutral-800">#{idx + 1}</td>
                <td className="p-2 font-serif font-bold text-white border-r border-neutral-800">{b.name}</td>
                <td className="p-2 text-center border-r border-neutral-800 font-bold">{b.quality}</td>
                <td className="p-2 text-center border-r border-neutral-800 font-bold">{b.brandStrength}</td>
                <td className="p-2 text-center border-r border-neutral-800 font-bold">{b.priceValue}</td>
                <td className="p-2 text-center border-r border-neutral-800 font-bold">{b.accessibility}</td>
                <td className="p-2 text-center border-r border-neutral-800 font-bold">{b.innovation}</td>
                <td className="p-2 text-right font-serif font-bold text-amber-300">{b.finalScore.toFixed(2)} / 10</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 4. CUADRANTE ESTILO GARTNER */}
      <div className="mb-10 print-page-break">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-4">
          <span className="text-amber-400 font-serif font-bold text-lg">4. Cuadrante Estilo Gartner</span>
          <span className="text-[10px] text-neutral-400">Capacidad de Ejecución vs. Completitud de Visión</span>
        </div>

        <div className="border border-neutral-800 p-4 rounded bg-neutral-950 mb-4">
          <svg viewBox="0 0 720 420" className="w-full h-auto">
            <rect x="50" y="20" width="640" height="360" fill="none" stroke="#444" strokeWidth="1" />
            <line x1="370" y1="20" x2="370" y2="380" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="50" y1="200" x2="690" y2="200" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="4 4" />
            
            <text x="60" y="40" fill="#999" fontSize="12" fontWeight="bold">RETADORES</text>
            <text x="680" y="40" fill="#d4af37" fontSize="12" fontWeight="bold" textAnchor="end">LÍDERES</text>
            <text x="60" y="370" fill="#777" fontSize="12" fontWeight="bold">NICHO</text>
            <text x="680" y="370" fill="#6ee7b7" fontSize="12" fontWeight="bold" textAnchor="end">VISIONARIOS</text>

            <text x="370" y="405" fill="#888" fontSize="11" textAnchor="middle">Completitud de Visión →</text>
            <text transform="translate(18, 200) rotate(-90)" fill="#888" fontSize="11" textAnchor="middle">Capacidad de Ejecución →</text>

            {brands.map(b => {
              const cx = 50 + ((b.vision - 3) / 7) * 640;
              const cy = 20 + ((10 - b.execution) / 7) * 360;
              const isGucci = b.name === "Gucci";
              const col = b.category === "Líder" ? "#d4af37" : b.category === "Retador" ? "#ffffff" : b.category === "Visionario" ? "#6ee7b7" : "#a1a1aa";
              return (
                <g key={b.id}>
                  <circle cx={cx} cy={cy} r={6} fill={col} stroke="#000" strokeWidth="1" />
                  <text 
                    x={cx + (isGucci ? -10 : 10)} 
                    y={cy + 4} 
                    fill="#fff" 
                    fontSize="11" 
                    fontWeight="bold"
                    textAnchor={isGucci ? "end" : "start"}
                  >
                    {b.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Categories breakdown */}
        <div className="grid grid-cols-4 gap-3 text-[11px]">
          <div className="border border-amber-400/40 p-2.5 rounded bg-neutral-900/60">
            <span className="font-bold text-amber-400 block mb-1">Líderes</span>
            <span className="text-neutral-300">Ermenegildo Zegna, Gucci, Louis Vuitton</span>
          </div>
          <div className="border border-neutral-700 p-2.5 rounded bg-neutral-900/60">
            <span className="font-bold text-white block mb-1">Retadores</span>
            <span className="text-neutral-300">BOSS, Michael Kors, Salvatore Ferragamo</span>
          </div>
          <div className="border border-emerald-500/40 p-2.5 rounded bg-neutral-900/60">
            <span className="font-bold text-emerald-300 block mb-1">Visionarios</span>
            <span className="text-neutral-300">Adolfo Domínguez</span>
          </div>
          <div className="border border-neutral-800 p-2.5 rounded bg-neutral-900/60">
            <span className="font-bold text-neutral-400 block mb-1">Jugadores de Nicho</span>
            <span className="text-neutral-300">Tod’s</span>
          </div>
        </div>
      </div>

      {/* 5. RECOMENDACIONES Y RIESGOS */}
      <div className="mb-6 print-page-break">
        <div className="flex items-center gap-2 text-amber-400 font-serif font-bold text-lg border-b border-neutral-800 pb-2 mb-4">
          <span>5. Recomendaciones Estratégicas y Gestión de Riesgos</span>
        </div>

        {/* 8 Recommendations */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {STRATEGIC_RECOMMENDATIONS.map(rec => (
            <div key={rec.id} className="border border-neutral-800 p-2.5 rounded bg-neutral-950 text-[10px]">
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="font-serif font-bold text-amber-400 text-xs">{rec.id}.</span>
                <span className="font-serif font-bold text-white text-xs">{rec.title}</span>
              </div>
              <p className="text-neutral-300 mb-1"><strong className="text-amber-300">Acción:</strong> {rec.action}</p>
              <p className="text-neutral-400"><strong>Por qué:</strong> {rec.reason}</p>
            </div>
          ))}
        </div>

        {/* Risks Table */}
        <span className="font-serif font-bold text-white text-sm block mb-2">Matriz de Riesgos y Mitigación Operativa</span>
        <table className="w-full text-left text-[10px] border-collapse border border-neutral-800">
          <thead>
            <tr className="bg-neutral-900 text-neutral-400 uppercase text-[9px] border-b border-neutral-800">
              <th className="p-2 border-r border-neutral-800 w-1/3">Riesgo</th>
              <th className="p-2 border-r border-neutral-800 w-1/2">Mitigación Operativa</th>
              <th className="p-2 text-center">Nivel</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {RISKS_AND_MITIGATIONS.map((r, i) => (
              <tr key={i} className="border-b border-neutral-800">
                <td className="p-2 font-medium text-white border-r border-neutral-800">{r.risk}</td>
                <td className="p-2 text-neutral-300 border-r border-neutral-800">{r.mitigation}</td>
                <td className="p-2 text-center font-bold text-amber-300">{r.impactLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-800 pt-4 text-center text-[10px] text-neutral-500">
        Estudio de Mercado: Calzado no deportivo, marcas de moda y lujo en Panamá · Documento Estratégico Oficial
      </div>
    </div>
  );
};
