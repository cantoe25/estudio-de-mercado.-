import React, { useState } from 'react';
import { BrandData } from '../data/marketData';
import { Sparkles, Info } from 'lucide-react';

interface GartnerQuadrantProps {
  brands: BrandData[];
  selectedBrandId?: string;
  onSelectBrand: (brand: BrandData) => void;
  simulatedBrand?: {
    name: string;
    vision: number;
    execution: number;
  } | null;
}

export const GartnerQuadrant: React.FC<GartnerQuadrantProps> = ({
  brands,
  selectedBrandId,
  onSelectBrand,
  simulatedBrand
}) => {
  const [hoveredBrand, setHoveredBrand] = useState<BrandData | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("Todos");

  // SVG dimensions
  const svgWidth = 720;
  const svgHeight = 480;
  const margin = { left: 55, right: 35, top: 35, bottom: 50 };
  const plotWidth = svgWidth - margin.left - margin.right;
  const plotHeight = svgHeight - margin.top - margin.bottom;

  const minVal = 3;
  const maxVal = 10;

  const scaleX = (x: number) => margin.left + ((x - minVal) / (maxVal - minVal)) * plotWidth;
  const scaleY = (y: number) => margin.top + ((maxVal - y) / (maxVal - minVal)) * plotHeight;

  const midX = scaleX(6.5);
  const midY = scaleY(6.5);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Líder":
        return "#d4af37";
      case "Retador":
        return "#ffffff";
      case "Visionario":
        return "#6ee7b7";
      case "Nicho":
        return "#a1a1aa";
      default:
        return "#d4af37";
    }
  };

  const categories = [
    { name: "Líderes", key: "Líder", color: "#d4af37", bg: "bg-amber-400" },
    { name: "Retadores", key: "Retador", color: "#ffffff", bg: "bg-white" },
    { name: "Visionarios", key: "Visionario", color: "#6ee7b7", bg: "bg-emerald-300" },
    { name: "Jugadores de nicho", key: "Nicho", color: "#a1a1aa", bg: "bg-neutral-400" }
  ];

  return (
    <section id="cuadrante" className="pt-10 sm:pt-14 pb-10 sm:pb-12 border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col mb-6 sm:mb-8">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-widest text-amber-400 font-medium mb-1">
            <span>SECCIÓN 04</span>
            <span className="text-neutral-600" aria-hidden="true">/</span>
            <span>MATRIZ ESTRATÉGICA 2X2</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
            <div>
              <h2 className="text-xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                4. Cuadrante Estilo Gartner
              </h2>
              <div className="w-14 sm:w-16 h-0.5 bg-gradient-to-r from-amber-400 to-transparent mt-2"></div>
            </div>
            <p className="text-xs text-neutral-400 max-w-md">
              Capacidad de Ejecución en retail y logística panameña vs. Completitud de Visión de producto.
            </p>
          </div>
        </div>

        {/* Legend / Category Filter for Mobile and Desktop */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-3">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveCategoryFilter(prev => prev === c.key ? "Todos" : c.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-colors shrink-0 min-h-[38px] ${
                activeCategoryFilter === c.key
                  ? "bg-neutral-800 text-white font-semibold ring-1 ring-amber-400"
                  : "bg-neutral-900/80 text-neutral-400 hover:text-white border border-neutral-800"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${c.bg} shrink-0`} />
              <span className="tracking-wide">{c.name}</span>
            </button>
          ))}
          {activeCategoryFilter !== "Todos" && (
            <button
              onClick={() => setActiveCategoryFilter("Todos")}
              className="text-[11px] text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap px-2"
            >
              Ver todos
            </button>
          )}
        </div>

        {/* Interactive SVG Chart Container with mobile styling */}
        <div className="relative bg-neutral-950 border border-neutral-800 rounded p-2 sm:p-6 shadow-2xl overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />

          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-auto select-none overflow-visible touch-manipulation"
            role="img"
            aria-label="Cuadrante de competidores estilo Gartner"
          >
            <defs>
              <pattern id="gridPattern" width="36" height="36" patternUnits="userSpaceOnUse">
                <path d="M 36 0 L 0 0 0 36" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
              </pattern>
            </defs>

            {/* Background Grid Pattern */}
            <rect
              x={margin.left}
              y={margin.top}
              width={plotWidth}
              height={plotHeight}
              fill="url(#gridPattern)"
              stroke="rgba(212, 175, 55, 0.3)"
              strokeWidth="1"
            />

            {/* Quadrant dividing dashed hairlines */}
            <line
              x1={midX}
              y1={margin.top}
              x2={midX}
              y2={margin.top + plotHeight}
              stroke="rgba(212, 175, 55, 0.4)"
              strokeWidth="1.5"
              strokeDasharray="5 5"
            />
            <line
              x1={margin.left}
              y1={midY}
              x2={margin.left + plotWidth}
              y2={midY}
              stroke="rgba(212, 175, 55, 0.4)"
              strokeWidth="1.5"
              strokeDasharray="5 5"
            />

            {/* Quadrant Ambient Labels */}
            <text
              x={margin.left + 12}
              y={margin.top + 20}
              className="text-[11px] font-sans font-bold tracking-wider fill-neutral-500 uppercase"
            >
              RETADORES
            </text>

            <text
              x={margin.left + plotWidth - 12}
              y={margin.top + 20}
              textAnchor="end"
              className="text-[11px] font-sans font-bold tracking-wider fill-amber-400 uppercase"
            >
              LÍDERES
            </text>

            <text
              x={margin.left + 12}
              y={margin.top + plotHeight - 14}
              className="text-[11px] font-sans font-bold tracking-wider fill-neutral-600 uppercase"
            >
              NICHO
            </text>

            <text
              x={margin.left + plotWidth - 12}
              y={margin.top + plotHeight - 14}
              textAnchor="end"
              className="text-[11px] font-sans font-bold tracking-wider fill-emerald-400/80 uppercase"
            >
              VISIONARIOS
            </text>

            {/* X-Axis Numerals (3 to 10) */}
            {[3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <text
                key={`x-${num}`}
                x={scaleX(num)}
                y={margin.top + plotHeight + 18}
                textAnchor="middle"
                className="text-[10px] font-mono fill-neutral-500 tabular-nums"
              >
                {num}
              </text>
            ))}

            {/* Y-Axis Numerals (3 to 10) */}
            {[3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <text
                key={`y-${num}`}
                x={margin.left - 8}
                y={scaleY(num) + 4}
                textAnchor="end"
                className="text-[10px] font-mono fill-neutral-500 tabular-nums"
              >
                {num}
              </text>
            ))}

            {/* Axis Titles */}
            <text
              x={margin.left + plotWidth / 2}
              y={margin.top + plotHeight + 36}
              textAnchor="middle"
              className="text-[10px] font-sans font-medium uppercase tracking-widest fill-neutral-400"
            >
              Completitud de Visión →
            </text>

            <text
              transform={`translate(16, ${margin.top + plotHeight / 2}) rotate(-90)`}
              textAnchor="middle"
              className="text-[10px] font-sans font-medium uppercase tracking-widest fill-neutral-400"
            >
              Capacidad de Ejecución →
            </text>

            {/* Brands on SVG */}
            {brands.map((brand) => {
              const cx = scaleX(brand.vision);
              const cy = scaleY(brand.execution);
              const isGucci = brand.name === "Gucci";
              const isSelected = selectedBrandId === brand.id;
              const isHovered = hoveredBrand?.id === brand.id;
              const isFilteredOut = activeCategoryFilter !== "Todos" && brand.category !== activeCategoryFilter;

              const color = getCategoryColor(brand.category);

              let labelOffsetX = isGucci ? -14 : 14;
              let labelAnchor: "start" | "end" | "middle" = isGucci ? "end" : "start";
              let labelOffsetY = 4;

              if (brand.name === "BOSS") {
                labelOffsetY = -10;
              } else if (brand.name === "Michael Kors") {
                labelOffsetY = 14;
              } else if (brand.name === "Salvatore Ferragamo") {
                labelOffsetY = -10;
              } else if (brand.name === "Louis Vuitton") {
                labelOffsetY = -10;
              } else if (brand.name === "Ermenegildo Zegna") {
                labelOffsetY = 14;
              }

              return (
                <g
                  key={brand.id}
                  className="cursor-pointer transition-opacity duration-200"
                  opacity={isFilteredOut ? 0.2 : 1}
                  onMouseEnter={() => setHoveredBrand(brand)}
                  onMouseLeave={() => setHoveredBrand(null)}
                  onClick={() => onSelectBrand(brand)}
                >
                  {/* Invisible enlarged hit area for mobile touch (44px equivalent) */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={22}
                    fill="transparent"
                  />

                  {/* Outer pulse circle */}
                  {(isSelected || isHovered) && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={14}
                      fill="none"
                      stroke={color}
                      strokeWidth="2"
                      opacity="0.8"
                      className="animate-ping"
                    />
                  )}

                  {/* Dot */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected || isHovered ? 9 : 7}
                    fill={color}
                    opacity={isSelected || isHovered ? 1 : 0.9}
                    filter="drop-shadow(0px 0px 5px rgba(212,175,55,0.6))"
                  />

                  <circle
                    cx={cx}
                    cy={cy}
                    r={2.5}
                    fill="#000000"
                  />

                  {/* Label */}
                  <text
                    x={cx + labelOffsetX}
                    y={cy + labelOffsetY}
                    textAnchor={labelAnchor}
                    className={`font-sans text-[11px] sm:text-[12px] select-none ${
                      isSelected || isHovered
                        ? "fill-amber-300 font-bold"
                        : "fill-white font-semibold"
                    }`}
                  >
                    {brand.name}
                  </text>
                </g>
              );
            })}

            {/* Simulated Brand Node */}
            {simulatedBrand && (
              <g
                className="cursor-pointer"
                filter="drop-shadow(0px 0px 8px #d4af37)"
              >
                <circle
                  cx={scaleX(simulatedBrand.vision)}
                  cy={scaleY(simulatedBrand.execution)}
                  r={12}
                  fill="none"
                  stroke="#d4af37"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                />
                <circle
                  cx={scaleX(simulatedBrand.vision)}
                  cy={scaleY(simulatedBrand.execution)}
                  r={7}
                  fill="#d4af37"
                />
                <circle
                  cx={scaleX(simulatedBrand.vision)}
                  cy={scaleY(simulatedBrand.execution)}
                  r={2.5}
                  fill="#ffffff"
                />
                <text
                  x={scaleX(simulatedBrand.vision) + 14}
                  y={scaleY(simulatedBrand.execution) + 4}
                  className="fill-amber-300 font-serif font-bold text-[12px]"
                >
                  ★ {simulatedBrand.name}
                </text>
              </g>
            )}
          </svg>

          {/* Interactive Tooltip Card */}
          {hoveredBrand && (
            <div className="mt-3 sm:mt-0 sm:absolute sm:bottom-4 sm:right-4 z-20 bg-neutral-900/95 border border-amber-500/50 rounded p-3 sm:p-4 max-w-full sm:max-w-xs shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between mb-1">
                <span className="font-serif text-sm font-bold text-amber-300">
                  {hoveredBrand.name}
                </span>
                <span className="text-[9px] uppercase font-bold tracking-wider text-black bg-amber-400 px-1.5 py-0.5 rounded">
                  {hoveredBrand.category}
                </span>
              </div>
              <p className="text-xs text-neutral-300 line-clamp-2 mb-2">
                {hoveredBrand.valueProp}
              </p>
              <div className="flex items-center justify-between text-[10px] text-neutral-400 border-t border-neutral-800 pt-1.5 tabular-nums">
                <span>Visión: <b className="text-white">{hoveredBrand.vision}/10</b></span>
                <span>Ejecución: <b className="text-white">{hoveredBrand.execution}/10</b></span>
                <span>Precio: <b className="text-amber-200">${hoveredBrand.priceRange}</b></span>
              </div>
            </div>
          )}
        </div>

        {/* 4 Quadrant Category Cards (2-col on mobile, 4-col on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mt-4 sm:mt-6">
          {categories.map((c) => {
            const groupBrands = brands.filter(b => b.category === c.key);
            return (
              <div
                key={c.key}
                onClick={() => setActiveCategoryFilter(prev => prev === c.key ? "Todos" : c.key)}
                className={`bg-neutral-900/80 border rounded p-3 sm:p-4 cursor-pointer transition-all ${
                  activeCategoryFilter === c.key
                    ? "border-amber-400 shadow-md shadow-amber-500/10"
                    : "border-neutral-800 hover:border-neutral-700"
                }`}
              >
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <h3 className="font-serif text-xs sm:text-sm font-bold tracking-wide" style={{ color: c.color }}>
                    {c.name}
                  </h3>
                  <span className="text-[10px] font-mono text-neutral-500 tabular-nums">
                    ({groupBrands.length})
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-neutral-300 font-medium leading-tight">
                  {groupBrands.map(b => b.name).join(", ")}
                </p>
              </div>
            );
          })}
        </div>

        {/* Opportunity Takeaway Box */}
        <div className="flex items-start gap-2.5 sm:gap-3 mt-4 sm:mt-6 p-4 sm:p-5 rounded bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 border border-amber-500/40 text-xs">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-serif text-xs sm:text-sm font-bold text-amber-300 mb-1">
              Conclusión del Cuadrante
            </div>
            <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed">
              Ninguna marca existente en Panamá combina actualmente una <strong>alta capacidad de ejecución local</strong> (entrega express 24-48h, atención presencial y cambio de talla) con una <strong>propuesta de calzado artesanal premium ($250–$500) y adaptada al clima húmedo</strong>. Es el espacio libre ideal para una nueva firma.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
