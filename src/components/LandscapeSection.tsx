import React, { useState, useMemo } from 'react';
import { BrandData } from '../data/marketData';
import { Search, Info, ExternalLink, LayoutGrid, Table as TableIcon, MapPin } from 'lucide-react';

interface LandscapeSectionProps {
  brands: BrandData[];
  onSelectBrand: (brand: BrandData) => void;
}

const SEGMENTS = ["Todos", "Aspiracional", "Lujo heritage", "Lujo de moda"] as const;

export const LandscapeSection: React.FC<LandscapeSectionProps> = ({ brands, onSelectBrand }) => {
  const [selectedSegment, setSelectedSegment] = useState<string>("Todos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mobileViewMode, setMobileViewMode] = useState<"cards" | "table">("cards");

  const filteredBrands = useMemo(() => {
    return brands.filter((brand) => {
      const matchesSegment = selectedSegment === "Todos" || brand.segment === selectedSegment;
      const matchesSearch = 
        brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brand.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brand.valueProp.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brand.localPresence.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSegment && matchesSearch;
    });
  }, [brands, selectedSegment, searchQuery]);

  return (
    <section id="competidores" className="pt-10 sm:pt-14 pb-10 sm:pb-12 border-b border-amber-500/20">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Section Header */}
        <div className="flex flex-col mb-6 sm:mb-8">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-widest text-amber-400 font-medium mb-1">
            <span>SECCIÓN 02</span>
            <span className="text-neutral-600" aria-hidden="true">/</span>
            <span>MAPEO DE MERCADO</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
            <div>
              <h2 className="text-xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                2. Landscape Competitivo
              </h2>
              <div className="w-14 sm:w-16 h-0.5 bg-gradient-to-r from-amber-400 to-transparent mt-2"></div>
            </div>
            <p className="text-xs text-neutral-400 max-w-md">
              Desglose de origen, rango tarifario de venta en retail y propuesta central de valor para el consumidor panameño.
            </p>
          </div>
        </div>

        {/* Filter Toolbar (Segment buttons + Search + Mobile View Toggle) */}
        <div className="flex flex-col gap-3.5 mb-6">
          {/* Segment Filter (Horizontal scrollable on mobile for clean touch) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {SEGMENTS.map((seg) => {
              const active = selectedSegment === seg;
              return (
                <button
                  key={seg}
                  onClick={() => setSelectedSegment(seg)}
                  className={`px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-medium tracking-wider uppercase transition-all duration-150 rounded shrink-0 min-h-[38px] ${
                    active
                      ? "bg-amber-400 text-black font-semibold shadow-sm shadow-amber-400/20"
                      : "bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800"
                  }`}
                >
                  {seg}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Search Box */}
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar marca, origen o tienda..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400/80 focus:ring-1 focus:ring-amber-400/50 text-white text-xs rounded pl-9 pr-3 py-2.5 outline-none transition-colors placeholder:text-neutral-500 min-h-[42px]"
              />
            </div>

            {/* Mobile View Toggle Switch */}
            <div className="flex items-center gap-1 self-end sm:self-auto md:hidden">
              <span className="text-[11px] text-neutral-400 mr-1">Vista:</span>
              <button
                onClick={() => setMobileViewMode("cards")}
                className={`flex items-center gap-1 px-2.5 py-1.5 text-xs rounded border transition-colors ${
                  mobileViewMode === "cards"
                    ? "bg-amber-400/10 text-amber-300 border-amber-400/50 font-semibold"
                    : "bg-neutral-900 text-neutral-400 border-neutral-800"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Tarjetas</span>
              </button>
              <button
                onClick={() => setMobileViewMode("table")}
                className={`flex items-center gap-1 px-2.5 py-1.5 text-xs rounded border transition-colors ${
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

        {/* 1. Mobile Cards View (Active on mobile by default so EVERYTHING fits with zero sideways scrolling) */}
        <div className={`space-y-3.5 ${mobileViewMode === "table" ? "hidden" : "block md:hidden"}`}>
          {filteredBrands.map((brand) => (
            <div
              key={brand.id}
              onClick={() => onSelectBrand(brand)}
              className="bg-neutral-950/90 border border-neutral-800 hover:border-amber-500/40 active:border-amber-400 rounded-lg p-4 transition-all group cursor-pointer shadow-lg"
            >
              <div className="flex items-start justify-between gap-2 mb-2 pb-2 border-b border-neutral-900">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {brand.name}
                    </h3>
                    <span className="text-[10px] text-neutral-400 font-sans">
                      ({brand.origin})
                    </span>
                  </div>
                  <span className="inline-block text-[10px] font-medium text-amber-300/90 border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 rounded mt-1">
                    {brand.segment}
                  </span>
                </div>

                <div className="text-right">
                  <div className="font-serif text-base font-bold text-amber-300 tabular-nums">
                    ${brand.priceRange}
                  </div>
                  <span className="text-[9px] uppercase tracking-wider text-neutral-500 block">
                    USD Retail
                  </span>
                </div>
              </div>

              {/* Value Prop */}
              <div className="text-xs text-neutral-300 mb-2 leading-relaxed">
                <span className="text-neutral-500 font-medium">Propuesta: </span>
                {brand.valueProp}
              </div>

              {/* Presence */}
              <div className="flex items-start gap-1.5 text-xs text-neutral-400 mb-3 leading-relaxed">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{brand.localPresence}</span>
              </div>

              {/* Tap to view */}
              <div className="flex items-center justify-between pt-2 border-t border-neutral-900 text-xs">
                <span className="text-neutral-500 text-[11px]">
                  Cuadrante: <strong className="text-neutral-300">{brand.category}</strong>
                </span>
                <span className="inline-flex items-center gap-1 text-amber-400 font-semibold group-hover:text-amber-300 text-[11px]">
                  Ver ficha completa
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}

          {filteredBrands.length === 0 && (
            <div className="py-8 text-center text-neutral-500 text-xs bg-neutral-950/60 rounded border border-neutral-800">
              No se encontraron marcas con el criterio seleccionado.
            </div>
          )}
        </div>

        {/* 2. Desktop Table & Mobile Optional Horizontal Table */}
        <div className={`overflow-x-auto border border-neutral-800 rounded bg-neutral-950/60 shadow-xl ${
          mobileViewMode === "cards" ? "hidden md:block" : "block"
        }`}>
          <table className="w-full text-left text-xs border-collapse min-w-[760px] md:min-w-[850px]">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-900/80 text-neutral-400 uppercase tracking-wider font-semibold text-[11px]">
                <th className="py-3.5 px-4">Marca</th>
                <th className="py-3.5 px-4">Origen</th>
                <th className="py-3.5 px-4">Segmento</th>
                <th className="py-3.5 px-4">Precio Calzado (USD)</th>
                <th className="py-3.5 px-4">Propuesta de Valor</th>
                <th className="py-3.5 px-4">Presencia en Panamá</th>
                <th className="py-3.5 px-4 text-right">Detalle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80">
              {filteredBrands.map((brand) => (
                <tr
                  key={brand.id}
                  onClick={() => onSelectBrand(brand)}
                  className="hover:bg-neutral-900/60 transition-colors cursor-pointer group"
                >
                  {/* Brand name */}
                  <td className="py-4 px-4 font-serif text-sm font-semibold text-white group-hover:text-amber-300 transition-colors whitespace-nowrap">
                    {brand.name}
                  </td>

                  {/* Origin */}
                  <td className="py-4 px-4 text-neutral-300 font-sans whitespace-nowrap">
                    {brand.origin}
                  </td>

                  {/* Segment */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="text-[11px] font-sans font-medium text-amber-300/90 border border-amber-500/30 bg-amber-500/5 px-2.5 py-1 rounded">
                      {brand.segment}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="py-4 px-4 font-serif text-sm font-medium text-amber-200 tabular-nums whitespace-nowrap">
                    ${brand.priceRange}
                  </td>

                  {/* Value Prop */}
                  <td className="py-4 px-4 text-neutral-300 max-w-xs leading-relaxed">
                    {brand.valueProp}
                  </td>

                  {/* Local Presence */}
                  <td className="py-4 px-4 text-neutral-400 max-w-xs leading-relaxed">
                    {brand.localPresence}
                  </td>

                  {/* Action Link */}
                  <td className="py-4 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectBrand(brand);
                      }}
                      className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 font-medium py-1 px-2 rounded hover:bg-amber-400/10 transition-colors min-h-[36px]"
                      title="Ver análisis de marca"
                    >
                      <span>Ver ficha</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Note / Disclaimer */}
        <div className="flex items-start gap-2.5 sm:gap-3 mt-4 p-3.5 sm:p-4 rounded bg-neutral-900/60 border border-neutral-800 text-[11px] sm:text-xs text-neutral-400">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-white">Nota de inventario:</strong> Estimación basada en centros comerciales (Multiplaza, Soho Mall, Albrook Mall) y boutiques en Ciudad de Panamá. Confirma disponibilidad de tallas previo a decisiones de inversión.
          </p>
        </div>
      </div>
    </section>
  );
};
