import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

interface NewBrandSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySimulation: (simulated: {
    name: string;
    vision: number;
    execution: number;
    quality: number;
    priceValue: number;
    price: number;
  }) => void;
}

export const NewBrandSimulator: React.FC<NewBrandSimulatorProps> = ({
  isOpen,
  onClose,
  onApplySimulation
}) => {
  const [brandName, setBrandName] = useState("Atelier Panamá");
  const [targetPrice, setTargetPrice] = useState(340);
  const [qualityLevel, setQualityLevel] = useState(9);
  const [brandStrength, setBrandStrength] = useState(5);
  const [priceValue, setPriceValue] = useState(9);
  const [localAccess, setLocalAccess] = useState(8);
  const [tropicalAdaptation, setTropicalAdaptation] = useState(9);

  if (!isOpen) return null;

  const visionCoord = Math.min(10, Math.max(3, (tropicalAdaptation * 0.4) + (priceValue * 0.3) + (qualityLevel * 0.3)));
  const executionCoord = Math.min(10, Math.max(3, (localAccess * 0.5) + (brandStrength * 0.25) + (qualityLevel * 0.25)));

  const weightedScore = (
    qualityLevel * 0.25 +
    brandStrength * 0.20 +
    priceValue * 0.20 +
    localAccess * 0.20 +
    tropicalAdaptation * 0.15
  );

  const handleSimulate = () => {
    onApplySimulation({
      name: brandName,
      vision: parseFloat(visionCoord.toFixed(1)),
      execution: parseFloat(executionCoord.toFixed(1)),
      quality: qualityLevel,
      priceValue: priceValue,
      price: targetPrice
    });
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-neutral-950 border-t sm:border border-amber-400 rounded-t-2xl sm:rounded-lg shadow-2xl p-4 sm:p-8 text-white max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Handle */}
        <div className="w-12 h-1 bg-neutral-700 rounded-full mx-auto mb-3 sm:hidden" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white p-2 rounded-full hover:bg-neutral-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Cerrar simulador"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 mb-2 pr-8 sm:pr-0">
          <div className="p-1.5 sm:p-2 rounded bg-amber-400/10 border border-amber-400/30 text-amber-400 shrink-0">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-2xl font-serif font-bold text-white">
              Simulador en la Brecha ($250–$500)
            </h2>
            <p className="text-[11px] sm:text-xs text-neutral-400">
              Prueba un modelo de negocio artesanal para capitalizar la franja desatendida.
            </p>
          </div>
        </div>

        <div className="w-full h-0.5 bg-gradient-to-r from-amber-400 via-amber-200/20 to-transparent my-3 sm:my-4"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 my-4 sm:my-6">
          {/* Controls Column */}
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label className="text-[11px] font-semibold text-neutral-300 uppercase tracking-wider block mb-1">
                Nombre de la Marca
              </label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-400 text-white text-xs rounded px-3 py-2 outline-none min-h-[40px]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-neutral-300">Precio de Venta</span>
                <span className="text-amber-300 font-serif font-bold text-sm tabular-nums">${targetPrice} USD</span>
              </div>
              <input
                type="range"
                min="250"
                max="500"
                step="10"
                value={targetPrice}
                onChange={(e) => setTargetPrice(parseInt(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-2"
              />
              <span className="text-[10px] sm:text-[11px] text-neutral-400 block mt-0.5">
                Entre BOSS (~$250) y Tod&apos;s (~$600)
              </span>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-neutral-300">Calidad Artesanal (25%)</span>
                <span className="text-amber-300 font-bold tabular-nums">{qualityLevel}/10</span>
              </div>
              <input
                type="range"
                min="6"
                max="10"
                step="1"
                value={qualityLevel}
                onChange={(e) => setQualityLevel(parseInt(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-2"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-neutral-300">Servicio & Concierge (20%)</span>
                <span className="text-amber-300 font-bold tabular-nums">{localAccess}/10</span>
              </div>
              <input
                type="range"
                min="5"
                max="10"
                step="1"
                value={localAccess}
                onChange={(e) => setLocalAccess(parseInt(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-2"
              />
              <span className="text-[10px] text-neutral-400 block mt-0.5">
                Entrega 24h y prueba en domicilio.
              </span>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-neutral-300">Clima Tropical (15%)</span>
                <span className="text-amber-300 font-bold tabular-nums">{tropicalAdaptation}/10</span>
              </div>
              <input
                type="range"
                min="5"
                max="10"
                step="1"
                value={tropicalAdaptation}
                onChange={(e) => setTropicalAdaptation(parseInt(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-2"
              />
            </div>
          </div>

          {/* Real-Time Projected Outcomes */}
          <div className="flex flex-col justify-between bg-neutral-900/90 border border-amber-500/30 rounded-lg p-3.5 sm:p-5">
            <div>
              <div className="text-[10px] sm:text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2 sm:mb-3">
                Proyección en Panamá
              </div>

              {/* Big Score Card */}
              <div className="bg-neutral-950 border border-neutral-800 rounded p-3 sm:p-4 mb-3 text-center">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400 block">
                  Puntaje Ponderado
                </span>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-amber-300 my-1 tabular-nums">
                  {weightedScore.toFixed(2)}
                  <span className="text-xs font-normal text-neutral-500"> / 10</span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-emerald-400 font-medium">
                  {weightedScore > 7.5 ? "★ Supera a marcas de lujo en valor-calidad" : "Posición sólida"}
                </span>
              </div>

              {/* Gartner Coordinates */}
              <div className="space-y-1.5 text-[11px] sm:text-xs">
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">Coordenada Visión (X):</span>
                  <span className="font-bold text-white tabular-nums">{visionCoord.toFixed(1)} / 10</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">Coordenada Ejecución (Y):</span>
                  <span className="font-bold text-white tabular-nums">{executionCoord.toFixed(1)} / 10</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">Cuadrante:</span>
                  <span className="font-serif font-bold text-amber-300">
                    {visionCoord >= 6.5 && executionCoord >= 6.5 ? "Líder Nueva Generación" : "Visionario / Retador"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 sm:mt-6">
              <button
                onClick={handleSimulate}
                className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 rounded transition-all shadow-md shadow-amber-500/20 min-h-[44px]"
              >
                Trazar en el Cuadrante Gartner
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
