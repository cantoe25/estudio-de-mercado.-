import React, { useState, useMemo } from 'react';
import { BrandData } from '../data/marketData';
import { ExternalLink } from 'lucide-react';

interface LandscapeSectionProps {
  brands: BrandData[];
  onSelectBrand: (brand: BrandData) => void;
}

const SEGMENTS = ["Todos", "Aspiracional", "Lujo heritage", "Lujo de moda"] as const;

export const LandscapeSection: React.FC<LandscapeSectionProps> = ({ brands, onSelectBrand }) => {
  const [selectedSegment, setSelectedSegment] = useState<string>("Todos");

  const filteredBrands = useMemo(() => {
    return brands.filter((brand) => {
      return selectedSegment === "Todos" || brand.segment === selectedSegment;
    });
  }, [brands, selectedSegment]);

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
                  className={`px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-medium tracking-wider uppercase transition-all duration-500 ease-out hover:-translate-y-0.5 active:translate-y-0.5 rounded shrink-0 min-h-[38px] cursor-pointer ${
                    active
                      ? "bg-amber-400 text-black font-semibold shadow-md shadow-amber-400/25"
                      : "bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800"
                  }`}
                >
                  {seg}
                </button>
              );
            })}
          </div>

        </div>

        {/* 1. Mobile Cards View (Optimized for mobile touch and full width) */}
        <div className="space-y-3.5 block md:hidden">
          {filteredBrands.map((brand) => (
            <div
              key={brand.id}
              onClick={() => onSelectBrand(brand)}
              className="bg-neutral-950/90 border border-neutral-800 hover:border-amber-500/40 active:border-amber-400 rounded-lg p-4 transition-all duration-500 ease-out hover:-translate-y-0.5 group cursor-pointer shadow-lg active:scale-[0.99]"
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
                </div>

                <div className="text-right">
                  <div className="font-serif text-lg sm:text-xl font-bold text-amber-300 tabular-nums">
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
              <div className="text-xs text-neutral-400 mb-3 leading-relaxed">
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

        {/* 2. Desktop Table */}
        <div className="overflow-x-auto border border-neutral-800 rounded bg-neutral-950/60 shadow-xl hidden md:block">
          <table className="w-full text-left text-xs border-collapse min-w-[760px] md:min-w-[850px]">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-900/80 text-neutral-400 uppercase tracking-wider font-semibold text-[11px]">
                <th className="py-3.5 px-4">Marca</th>
                <th className="py-3.5 px-4">Origen</th>
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

                  {/* Price */}
                  <td className="py-4 px-4 font-serif text-base md:text-lg font-bold text-amber-300 tabular-nums whitespace-nowrap">
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
      </div>
    </section>
  );
};
