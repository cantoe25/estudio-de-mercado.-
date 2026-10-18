import React from 'react';
import { BrandData, calculateWeightedScore } from '../data/marketData';
import { X, Check, AlertCircle, MapPin, DollarSign, Award } from 'lucide-react';

interface BrandDetailModalProps {
  brand: BrandData | null;
  onClose: () => void;
}

export const BrandDetailModal: React.FC<BrandDetailModalProps> = ({ brand, onClose }) => {
  if (!brand) return null;

  const score = calculateWeightedScore(brand);

  const criteriaList = [
    { label: "Calidad y Materiales", val: brand.quality, weight: "25%" },
    { label: "Fuerza de Marca", val: brand.brandStrength, weight: "20%" },
    { label: "Relación Calidad-Precio", val: brand.priceValue, weight: "20%" },
    { label: "Accesibilidad en Panamá", val: brand.accessibility, weight: "20%" },
    { label: "Innovación & Clima", val: brand.innovation, weight: "15%" },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-neutral-950 border-t sm:border border-amber-500/40 rounded-t-2xl sm:rounded-lg shadow-2xl p-5 sm:p-8 text-white max-h-[88vh] sm:max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Handle */}
        <div className="w-12 h-1 bg-neutral-700 rounded-full mx-auto mb-4 sm:hidden" />

        {/* Close Button with generous touch hitbox */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white p-2 rounded-full hover:bg-neutral-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-800 pb-4 mb-5 pr-8 sm:pr-0">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
                {brand.name}
              </h2>
              <span className="text-[10px] sm:text-xs uppercase font-medium tracking-wider text-amber-300 border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 rounded">
                {brand.segment}
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-1 flex items-center gap-2">
              <span>Origen: <strong className="text-neutral-200">{brand.origin}</strong></span>
              <span className="text-neutral-600">·</span>
              <span>Cuadrante: <strong className="text-amber-300">{brand.category}</strong></span>
            </p>
          </div>

          <div className="text-left sm:text-right mt-1 sm:mt-0">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-400 block">Puntaje Global</span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-amber-300 tabular-nums">
              {score.toFixed(2)}
              <span className="text-xs font-normal text-neutral-500"> / 10</span>
            </span>
          </div>
        </div>

        {/* Value Prop & Presence */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5">
          <div className="bg-neutral-900/90 border border-neutral-800 p-3.5 sm:p-4 rounded">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 mb-1">
              <DollarSign className="w-3.5 h-3.5" />
              <span>Precio y Propuesta</span>
            </div>
            <div className="font-serif text-lg sm:text-xl font-bold text-white mb-1 tabular-nums">
              ${brand.priceRange} <span className="text-xs font-sans text-neutral-400">USD</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {brand.valueProp}
            </p>
          </div>

          <div className="bg-neutral-900/90 border border-neutral-800 p-3.5 sm:p-4 rounded">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Presencia en Panamá</span>
            </div>
            <div className="text-xs text-neutral-300 leading-relaxed mt-1">
              {brand.localPresence}
            </div>
          </div>
        </div>

        {/* Scoring Breakdown */}
        <div className="mb-5">
          <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2.5 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Desglose Multicriterio</span>
          </h4>
          <div className="space-y-2.5 bg-neutral-900/60 border border-neutral-800 p-3.5 rounded">
            {criteriaList.map((c) => (
              <div key={c.label} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-300 text-[11px] sm:text-xs">
                    {c.label} <span className="text-neutral-500 font-mono">({c.weight})</span>
                  </span>
                  <span className="font-serif font-bold text-amber-300 tabular-nums text-xs">
                    {c.val} / 10
                  </span>
                </div>
                <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-300"
                    style={{ width: `${(c.val / 10) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        {(brand.strengths || brand.weaknesses) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
            {brand.strengths && (
              <div className="bg-neutral-900/40 border border-neutral-800/80 p-3 rounded">
                <div className="text-xs font-semibold text-emerald-400 mb-1.5 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>Fortalezas</span>
                </div>
                <ul className="text-xs text-neutral-300 space-y-1">
                  {brand.strengths.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-400">·</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {brand.weaknesses && (
              <div className="bg-neutral-900/40 border border-neutral-800/80 p-3 rounded">
                <div className="text-xs font-semibold text-amber-300 mb-1.5 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Vulnerabilidades</span>
                </div>
                <ul className="text-xs text-neutral-300 space-y-1">
                  {brand.weaknesses.map((w, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-400">·</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-4 pt-3 border-t border-neutral-800 flex justify-end pb-2 sm:pb-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 text-xs uppercase font-semibold tracking-wider text-black bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 rounded transition-colors min-h-[44px]"
          >
            Cerrar Ficha
          </button>
        </div>
      </div>
    </div>
  );
};
