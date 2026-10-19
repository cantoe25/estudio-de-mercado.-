import React, { useState, useMemo } from 'react';
import { BrandData, CRITERIA, calculateWeightedScore } from '../data/marketData';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface ScoringSectionProps {
  brands: BrandData[];
  onSelectBrand: (brand: BrandData) => void;
}

type SortKey = "rank" | "name" | "quality" | "brandStrength" | "priceValue" | "accessibility" | "innovation" | "final";

const WEIGHTS = [0.25, 0.20, 0.20, 0.20, 0.15];

export const ScoringSection: React.FC<ScoringSectionProps> = ({ brands, onSelectBrand }) => {
  const [sortKey, setSortKey] = useState<SortKey>("final");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

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
      const finalScore = calculateWeightedScore(brand, WEIGHTS);
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
  }, [brands, sortKey, sortDirection]);

  const getHeatStyle = (val: number) => {
    const opacity = 0.12 + (val / 10) * 0.75;
    const isHigh = val >= 7;
    return {
      backgroundColor: `rgba(212, 175, 55, ${opacity})`,
      color: isHigh ? "#ffffff" : "#e5e5e5",
      border: `1px solid rgba(212, 175, 55, ${opacity * 0.5})`
    };
  };

  return (
    <section id="scoring" className="pt-10 sm:pt-14 pb-10 sm:pb-12 border-b border-amber-500/20">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
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
          </div>
        </div>

        {/* Weights overview cards (scrollable on mobile or compact 2-col) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5 mb-6">
          {CRITERIA.map((criterion, idx) => {
            const currentWeight = WEIGHTS[idx] ?? criterion.weight;
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
        <div className="space-y-3 block md:hidden">
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

        {/* 2. Desktop Table */}
        <div className="overflow-x-auto border border-neutral-800 rounded bg-neutral-950/60 shadow-xl hidden md:block">
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
                    <span>Calidad ({Math.round(WEIGHTS[0] * 100)}%)</span>
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
                    <span>Marca ({Math.round(WEIGHTS[1] * 100)}%)</span>
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
                    <span>Precio-V ({Math.round(WEIGHTS[2] * 100)}%)</span>
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
                    <span>Acceso ({Math.round(WEIGHTS[3] * 100)}%)</span>
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
                    <span>Innovación ({Math.round(WEIGHTS[4] * 100)}%)</span>
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
      </div>
    </section>
  );
};
