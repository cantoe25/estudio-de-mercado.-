import React, { useState, useMemo } from 'react';
import { BrandData, CRITERIA, calculateWeightedScore } from '../data/marketData';
import { ArrowUpDown, ArrowUp, ArrowDown, Sliders, RotateCcw, Info, LayoutGrid, Table as TableIcon } from 'lucide-react';

interface ScoringSectionProps {
  brands: BrandData[];
  onSelectBrand: (brand: BrandData) => void;
}

type SortKey = "rank" | "name" | "quality" | "brandStrength" | "priceValue" | "accessibility" | "innovation" | "final";

export const ScoringSection: React.FC<ScoringSectionProps> = ({ brands, onSelectBrand }) => {
  const [sortKey, setSortKey] = useState<SortKey>("final");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [showWeightAdjuster, setShowWeightAdjuster] = useState(false);
  const [weights, setWeights] = useState<number[]>([0.25, 0.20, 0.20, 0.20, 0.15]);
  const [mobileViewMode, setMobileViewMode] = useState<"cards" | "table">("cards");

  // Handle header sort
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection(key === "name" ? "asc" : "desc");
    }
  };

  // Compute final score for each brand with current weights
  const brandScores = useMemo(() => {
    const list = brands.map(brand => {
      const finalScore = calculateWeightedScore(brand, weights);
      return {
        ...brand,
        finalScore
      };
    });

    const rankByScore = [...list].sort((a, b) => b.finalScore - a.finalScore);
    const rankMap = new Map(rankByScore.map((b, idx) => [b.id, idx + 1]));

    return list.sort((a, b) => {
      let valA: number | string = 0;
      let valB: number | string = 0;

      switch (sortKey) {
        case "rank":
          valA = rankMap.get(a.id) || 0;
          valB = rankMap.get(b.id) || 0;
          break;
        case "name":
          valA = a.name.toLowerCase();
          valB = b.name.toLowerCase();
          break;
        case "quality":
          valA = a.quality;
          valB = b.quality;
          break;
        case "brandStrength":
          valA = a.brandStrength;
          valB = b.brandStrength;
          break;
        case "priceValue":
          valA = a.priceValue;
          valB = b.priceValue;
          break;
        case "accessibility":
          valA = a.accessibility;
          valB = b.accessibility;
          break;
        case "innovation":
          valA = a.innovation;
          valB = b.innovation;
          break;
        case "final":
        default:
          valA = a.finalScore;
          valB = b.finalScore;
          break;
      }

      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    }).map(item => ({
      ...item,
      rank: rankMap.get(item.id) || 1
    }));
  }, [brands, weights, sortKey, sortDirection]);

  const getHeatStyle = (val: number) => {
    const opacity = 0.12 + (val / 10) * 0.75;
    const isHigh = val >= 7;
    return {
      backgroundColor: `rgba(212, 175, 55, ${opacity})`,
      color: isHigh ? "#ffffff" : "#e5e5e5",
      border: `1px solid rgba(212, 175, 55, ${opacity * 0.5})`
    };
  };

  const resetWeights = () => {
    setWeights([0.25, 0.20, 0.20, 0.20, 0.15]);
  };

  const handleWeightChange = (index: number, val: number) => {
    const newWeights = [...weights];
    newWeights[index] = val;
    setWeights(newWeights);
  };

  const totalWeight = weights.reduce((acc, curr) => acc + curr, 0);

  return (
    <section id="scoring" className="pt-10 sm:pt-14 pb-10 sm:pb-12 border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col mb-6 sm:mb-8">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-widest text-amber-400 font-medium mb-1">
            <span>SECCIÓN 03</span>
            <span className="text-neutral-600" aria-hidden="true">/</span>
            <span>EVALUACIÓN CUANTITATIVA</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
            <div>
              <h2 className="text-xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                3. Matriz de Scoring Ponderado
              </h2>
              <div className="w-14 sm:w-16 h-0.5 bg-gradient-to-r from-amber-400 to-transparent mt-2"></div>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setShowWeightAdjuster(prev => !prev)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-amber-300 bg-neutral-900 border border-amber-500/30 rounded hover:bg-neutral-800 transition-colors min-h-[38px]"
              >
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                <span>{showWeightAdjuster ? "Ocultar Pesos" : "Ajustar Ponderadores"}</span>
              </button>

              {/* Mobile View Toggle */}
              <div className="flex items-center gap-1 md:hidden">
                <button
                  onClick={() => setMobileViewMode("cards")}
                  className={`flex items-center gap-1 px-2.5 py-1.5 text-xs rounded border transition-colors min-h-[38px] ${
                    mobileViewMode === "cards"
                      ? "bg-amber-400/10 text-amber-300 border-amber-400/50 font-semibold"
                      : "bg-neutral-900 text-neutral-400 border-neutral-800"
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Móvil</span>
                </button>
                <button
                  onClick={() => setMobileViewMode("table")}
                  className={`flex items-center gap-1 px-2.5 py-1.5 text-xs rounded border transition-colors min-h-[38px] ${
                    mobileViewMode === "table"
                      ? "bg-amber-400/10 text-amber-300 border-amber-400/50 font-semibold"
                      : "bg-neutral-900 text-neutral-400 border-neutral-800"
                  }`}
                >
                  <TableIcon className="w-3.5 h-3.5" />
                  <span>Tabla</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Weights overview cards (scrollable on mobile or compact 2-col) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5 mb-6">
          {CRITERIA.map((criterion, idx) => {
            const currentWeight = weights[idx] ?? criterion.weight;
            return (
              <div 
                key={criterion.id}
                className="bg-neutral-900/90 border border-neutral-800 hover:border-amber-500/40 rounded p-3 sm:p-4 transition-colors"
              >
                <div className="font-serif text-lg sm:text-2xl font-bold text-amber-300 tabular-nums">
                  {Math.round(currentWeight * 100)}%
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-white mt-0.5 line-clamp-1">
                  {criterion.name}
                </div>
                <p className="text-[10px] text-neutral-400 mt-1 leading-tight line-clamp-2">
                  {criterion.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Interactive weight customizer panel */}
        {showWeightAdjuster && (
          <div className="bg-neutral-900/95 border border-amber-500/40 rounded p-4 sm:p-5 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h4 className="text-xs sm:text-sm font-serif font-bold text-amber-300">
                  Simulador de Ponderación
                </h4>
                <p className="text-[11px] text-neutral-400">
                  Modifica los porcentajes (suma actual: {Math.round(totalWeight * 100)}%)
                </p>
              </div>
              <button
                onClick={resetWeights}
                className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-amber-400 transition-colors self-start sm:self-auto py-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restablecer pesos oficiales</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              {CRITERIA.map((c, i) => (
                <div key={c.id} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-300 truncate text-[11px]">{c.name.split(" ")[0]}</span>
                    <span className="text-amber-400 font-bold tabular-nums text-xs">{Math.round(weights[i] * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="0.5"
                    step="0.05"
                    value={weights[i]}
                    onChange={(e) => handleWeightChange(i, parseFloat(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mobile quick sort controls */}
        <div className="md:hidden flex items-center justify-between gap-2 mb-3 bg-neutral-950 p-2.5 rounded border border-neutral-800 text-xs">
          <span className="text-neutral-400 text-[11px]">Ordenar por:</span>
          <select
            value={sortKey}
            onChange={(e) => handleSort(e.target.value as SortKey)}
            className="bg-neutral-900 text-amber-300 border border-neutral-700 text-xs rounded px-2 py-1 outline-none"
          >
            <option value="final">Puntaje Final</option>
            <option value="quality">Calidad (25%)</option>
            <option value="brandStrength">Fuerza Marca (20%)</option>
            <option value="priceValue">Precio-Valor (20%)</option>
            <option value="accessibility">Acceso PA (20%)</option>
            <option value="innovation">Innovación (15%)</option>
            <option value="name">Nombre</option>
          </select>
        </div>

        {/* 1. Mobile Scoring Cards View (Fits 100% on phone screens) */}
        <div className={`space-y-3 ${mobileViewMode === "cards" ? "block md:hidden" : "hidden"}`}>
          {brandScores.map((b) => (
            <div
              key={b.id}
              onClick={() => onSelectBrand(b)}
              className="bg-neutral-950/90 border border-neutral-800 hover:border-amber-500/40 active:border-amber-400 rounded-lg p-3.5 transition-all cursor-pointer shadow-md"
            >
              <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-neutral-900">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-sm font-bold text-amber-400 tabular-nums">
                    #{b.rank}
                  </span>
                  <span className="font-serif text-base font-bold text-white">
                    {b.name}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-sans">
                    ({b.segment})
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-base font-bold text-amber-300 tabular-nums">
                    {b.finalScore.toFixed(2)}
                  </span>
                  <span className="text-[9px] text-neutral-500 uppercase">pts</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-300"
                  style={{ width: `${(b.finalScore / 10) * 100}%` }}
                />
              </div>

              {/* 5 Criteria Micro Grid */}
              <div className="grid grid-cols-5 gap-1 text-center text-[10px]">
                <div className="bg-neutral-900/80 p-1.5 rounded border border-neutral-800/80">
                  <span className="text-neutral-400 block truncate">Calidad</span>
                  <span style={getHeatStyle(b.quality)} className="inline-block px-1.5 py-0.5 rounded font-bold text-xs mt-0.5">
                    {b.quality}
                  </span>
                </div>
                <div className="bg-neutral-900/80 p-1.5 rounded border border-neutral-800/80">
                  <span className="text-neutral-400 block truncate">Marca</span>
                  <span style={getHeatStyle(b.brandStrength)} className="inline-block px-1.5 py-0.5 rounded font-bold text-xs mt-0.5">
                    {b.brandStrength}
                  </span>
                </div>
                <div className="bg-neutral-900/80 p-1.5 rounded border border-neutral-800/80">
                  <span className="text-neutral-400 block truncate">Valor</span>
                  <span style={getHeatStyle(b.priceValue)} className="inline-block px-1.5 py-0.5 rounded font-bold text-xs mt-0.5">
                    {b.priceValue}
                  </span>
                </div>
                <div className="bg-neutral-900/80 p-1.5 rounded border border-neutral-800/80">
                  <span className="text-neutral-400 block truncate">Acceso</span>
                  <span style={getHeatStyle(b.accessibility)} className="inline-block px-1.5 py-0.5 rounded font-bold text-xs mt-0.5">
                    {b.accessibility}
                  </span>
                </div>
                <div className="bg-neutral-900/80 p-1.5 rounded border border-neutral-800/80">
                  <span className="text-neutral-400 block truncate">Innov.</span>
                  <span style={getHeatStyle(b.innovation)} className="inline-block px-1.5 py-0.5 rounded font-bold text-xs mt-0.5">
                    {b.innovation}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Desktop Table & Mobile Horizontal Table */}
        <div className={`overflow-x-auto border border-neutral-800 rounded bg-neutral-950/60 shadow-xl ${
          mobileViewMode === "cards" ? "hidden md:block" : "block"
        }`}>
          <table className="w-full text-left text-xs border-collapse min-w-[720px] md:min-w-[780px]">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-900/90 text-neutral-400 uppercase tracking-wider text-[11px]">
                <th
                  onClick={() => handleSort("rank")}
                  className="py-3.5 px-4 cursor-pointer hover:text-amber-300 transition-colors select-none whitespace-nowrap"
                >
                  <div className="flex items-center gap-1">
                    <span>Pos.</span>
                    {sortKey === "rank" ? (
                      sortDirection === "asc" ? <ArrowUp className="w-3 h-3 text-amber-400" /> : <ArrowDown className="w-3 h-3 text-amber-400" />
                    ) : (
                      <ArrowUpDown className="w-3 h-3 text-neutral-600" />
                    )}
                  </div>
                </th>

                <th
                  onClick={() => handleSort("name")}
                  className="py-3.5 px-4 cursor-pointer hover:text-amber-300 transition-colors select-none whitespace-nowrap"
                >
                  <div className="flex items-center gap-1">
                    <span>Marca</span>
                    {sortKey === "name" ? (
                      sortDirection === "asc" ? <ArrowUp className="w-3 h-3 text-amber-400" /> : <ArrowDown className="w-3 h-3 text-amber-400" />
                    ) : (
                      <ArrowUpDown className="w-3 h-3 text-neutral-600" />
                    )}
                  </div>
                </th>

                <th
                  onClick={() => handleSort("quality")}
                  className="py-3.5 px-3 text-center cursor-pointer hover:text-amber-300 transition-colors select-none whitespace-nowrap"
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>Calidad ({Math.round(weights[0] * 100)}%)</span>
                    {sortKey === "quality" ? (
                      sortDirection === "asc" ? <ArrowUp className="w-3 h-3 text-amber-400" /> : <ArrowDown className="w-3 h-3 text-amber-400" />
                    ) : (
                      <ArrowUpDown className="w-3 h-3 text-neutral-600" />
                    )}
                  </div>
                </th>

                <th
                  onClick={() => handleSort("brandStrength")}
                  className="py-3.5 px-3 text-center cursor-pointer hover:text-amber-300 transition-colors select-none whitespace-nowrap"
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>Marca ({Math.round(weights[1] * 100)}%)</span>
                    {sortKey === "brandStrength" ? (
                      sortDirection === "asc" ? <ArrowUp className="w-3 h-3 text-amber-400" /> : <ArrowDown className="w-3 h-3 text-amber-400" />
                    ) : (
                      <ArrowUpDown className="w-3 h-3 text-neutral-600" />
                    )}
                  </div>
                </th>

                <th
                  onClick={() => handleSort("priceValue")}
                  className="py-3.5 px-3 text-center cursor-pointer hover:text-amber-300 transition-colors select-none whitespace-nowrap"
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>Precio-V ({Math.round(weights[2] * 100)}%)</span>
                    {sortKey === "priceValue" ? (
                      sortDirection === "asc" ? <ArrowUp className="w-3 h-3 text-amber-400" /> : <ArrowDown className="w-3 h-3 text-amber-400" />
                    ) : (
                      <ArrowUpDown className="w-3 h-3 text-neutral-600" />
                    )}
                  </div>
                </th>

                <th
                  onClick={() => handleSort("accessibility")}
                  className="py-3.5 px-3 text-center cursor-pointer hover:text-amber-300 transition-colors select-none whitespace-nowrap"
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>Acceso ({Math.round(weights[3] * 100)}%)</span>
                    {sortKey === "accessibility" ? (
                      sortDirection === "asc" ? <ArrowUp className="w-3 h-3 text-amber-400" /> : <ArrowDown className="w-3 h-3 text-amber-400" />
                    ) : (
                      <ArrowUpDown className="w-3 h-3 text-neutral-600" />
                    )}
                  </div>
                </th>

                <th
                  onClick={() => handleSort("innovation")}
                  className="py-3.5 px-3 text-center cursor-pointer hover:text-amber-300 transition-colors select-none whitespace-nowrap"
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>Innovación ({Math.round(weights[4] * 100)}%)</span>
                    {sortKey === "innovation" ? (
                      sortDirection === "asc" ? <ArrowUp className="w-3 h-3 text-amber-400" /> : <ArrowDown className="w-3 h-3 text-amber-400" />
                    ) : (
                      <ArrowUpDown className="w-3 h-3 text-neutral-600" />
                    )}
                  </div>
                </th>

                <th
                  onClick={() => handleSort("final")}
                  className="py-3.5 px-4 cursor-pointer hover:text-amber-300 transition-colors select-none whitespace-nowrap"
                >
                  <div className="flex items-center gap-1">
                    <span>Puntaje</span>
                    {sortKey === "final" ? (
                      sortDirection === "asc" ? <ArrowUp className="w-3 h-3 text-amber-400" /> : <ArrowDown className="w-3 h-3 text-amber-400" />
                    ) : (
                      <ArrowUpDown className="w-3 h-3 text-neutral-600" />
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {brandScores.map((b) => (
                <tr
                  key={b.id}
                  onClick={() => onSelectBrand(b)}
                  className="hover:bg-neutral-900/60 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4 font-serif text-sm font-semibold text-neutral-400 tabular-nums">
                    #{b.rank}
                  </td>

                  <td className="py-3.5 px-4 font-serif text-sm font-bold text-white group-hover:text-amber-300 transition-colors whitespace-nowrap">
                    {b.name}
                  </td>

                  <td className="py-3.5 px-3 text-center">
                    <span 
                      style={getHeatStyle(b.quality)} 
                      className="inline-block min-w-6 px-1.5 py-0.5 rounded text-xs font-semibold tabular-nums shadow-sm"
                    >
                      {b.quality}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-center">
                    <span 
                      style={getHeatStyle(b.brandStrength)} 
                      className="inline-block min-w-6 px-1.5 py-0.5 rounded text-xs font-semibold tabular-nums shadow-sm"
                    >
                      {b.brandStrength}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-center">
                    <span 
                      style={getHeatStyle(b.priceValue)} 
                      className="inline-block min-w-6 px-1.5 py-0.5 rounded text-xs font-semibold tabular-nums shadow-sm"
                    >
                      {b.priceValue}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-center">
                    <span 
                      style={getHeatStyle(b.accessibility)} 
                      className="inline-block min-w-6 px-1.5 py-0.5 rounded text-xs font-semibold tabular-nums shadow-sm"
                    >
                      {b.accessibility}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-center">
                    <span 
                      style={getHeatStyle(b.innovation)} 
                      className="inline-block min-w-6 px-1.5 py-0.5 rounded text-xs font-semibold tabular-nums shadow-sm"
                    >
                      {b.innovation}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-base font-bold text-amber-300 tabular-nums min-w-[34px]">
                        {b.finalScore.toFixed(2)}
                      </span>
                      <div className="w-16 sm:w-24 h-2 bg-neutral-800 rounded-full overflow-hidden shrink-0 border border-neutral-700">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-amber-300"
                          style={{ width: `${(b.finalScore / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Note */}
        <div className="flex items-start gap-2.5 sm:gap-3 mt-4 p-3.5 sm:p-4 rounded bg-neutral-900/60 border border-neutral-800 text-[11px] sm:text-xs text-neutral-400">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-white">Hallazgo clave:</strong> Las aspiracionales ganan en acceso y precio-valor; las de lujo ganan en marca y calidad pero pierden en precio-valor. Ninguna firma domina todos los frentes en Panamá.
          </p>
        </div>
      </div>
    </section>
  );
};
