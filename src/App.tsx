/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { INITIAL_BRANDS, BrandData } from './data/marketData';
import { Navbar, SectionKey } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExecutiveSummary } from './components/ExecutiveSummary';
import { LandscapeSection } from './components/LandscapeSection';
import { ScoringSection } from './components/ScoringSection';
import { GartnerQuadrant } from './components/GartnerQuadrant';
import { RecommendationsSection } from './components/RecommendationsSection';
import { Footer } from './components/Footer';
import { BrandDetailModal } from './components/BrandDetailModal';
import { NewBrandSimulator } from './components/NewBrandSimulator';
import { ArrowLeft, ArrowRight, Menu, Sliders, ChevronRight } from 'lucide-react';

export default function App() {
  const [brands] = useState<BrandData[]>(INITIAL_BRANDS);
  const [selectedBrand, setSelectedBrand] = useState<BrandData | null>(null);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  
  // Default to 'resumen' so ONLY the Executive Summary is in the main view
  const [activeSection, setActiveSection] = useState<SectionKey>('resumen');

  const [simulatedBrand, setSimulatedBrand] = useState<{
    name: string;
    vision: number;
    execution: number;
    quality: number;
    priceValue: number;
    price: number;
  } | null>(null);

  const handleSelectSection = (key: SectionKey) => {
    setActiveSection(key);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSectionTitle = (key: SectionKey) => {
    switch (key) {
      case 'resumen':
        return '1. Resumen Ejecutivo';
      case 'competidores':
        return '2. Landscape Competitivo';
      case 'scoring':
        return '3. Matriz de Scoring Ponderado';
      case 'cuadrante':
        return '4. Cuadrante Estilo Gartner';
      case 'recomendaciones':
        return '5. Recomendaciones Estratégicas y Riesgos';
      case 'todos':
        return 'Estudio Completo (Todas las secciones)';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-amber-500/30 selection:text-amber-200 flex flex-col font-sans">
      {/* Top Bar with 3-Lines Mobile Hamburger Menu */}
      <Navbar
        onOpenSimulator={() => setIsSimulatorOpen(true)}
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Curatorial Hero Banner */}
        <Hero
          onExploreGartner={() => handleSelectSection('cuadrante')}
          onExploreScoring={() => handleSelectSection('scoring')}
        />

        {/* Section Navigation Banner for Mobile (indicates current view and back button) */}
        {activeSection !== 'resumen' && (
          <div className="bg-neutral-900/90 border-b border-amber-500/30 px-4 py-2.5 flex items-center justify-between text-xs sticky top-14 z-30 backdrop-blur-md">
            <button
              onClick={() => handleSelectSection('resumen')}
              className="inline-flex items-center gap-1.5 text-amber-300 hover:text-white font-medium py-1 px-2 rounded hover:bg-neutral-800 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
              <span>Volver al Resumen Principal</span>
            </button>

            <span className="text-[11px] text-neutral-400 font-serif italic truncate max-w-[180px]">
              {getSectionTitle(activeSection)}
            </span>
          </div>
        )}

        {/* 1. Resumen Ejecutivo (Shown when 'resumen' or 'todos') */}
        {(activeSection === 'resumen' || activeSection === 'todos') && (
          <div>
            <ExecutiveSummary />

            {/* Quick Navigation Cards on Mobile at the end of Executive Summary */}
            {activeSection === 'resumen' && (
              <section className="py-8 border-b border-amber-500/20 bg-neutral-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                  <div className="bg-neutral-900/90 border border-amber-500/40 rounded-xl p-5 shadow-2xl">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold block">
                          EXPLORAR MÁS SECCIONES
                        </span>
                        <h3 className="font-serif text-lg font-bold text-white">
                          Opciones de Visualización Disponibles
                        </h3>
                      </div>
                      <span className="hidden sm:inline-block text-xs text-neutral-400">
                        O usa el menú de tres líneas (☰)
                      </span>
                    </div>

                    <p className="text-xs text-neutral-300 mb-4 leading-relaxed">
                      El informe completo cuenta con datos detallados de cada competidor, la matriz interactiva de puntuación, el cuadrante Gartner y recomendaciones de mitigación de riesgo:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        onClick={() => handleSelectSection('competidores')}
                        className="flex items-center justify-between p-3 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-amber-400/50 text-left transition-colors group"
                      >
                        <div>
                          <span className="font-serif text-xs font-bold text-white group-hover:text-amber-300 block">
                            2. Landscape Competitivo
                          </span>
                          <span className="text-[11px] text-neutral-400">
                            8 marcas: BOSS, Gucci, Zegna, Tod&apos;s, etc.
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-400 shrink-0" />
                      </button>

                      <button
                        onClick={() => handleSelectSection('scoring')}
                        className="flex items-center justify-between p-3 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-amber-400/50 text-left transition-colors group"
                      >
                        <div>
                          <span className="font-serif text-xs font-bold text-white group-hover:text-amber-300 block">
                            3. Matriz de Scoring Ponderado
                          </span>
                          <span className="text-[11px] text-neutral-400">
                            Calidad, marca, valor, acceso e innovación
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-400 shrink-0" />
                      </button>

                      <button
                        onClick={() => handleSelectSection('cuadrante')}
                        className="flex items-center justify-between p-3 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-amber-400/50 text-left transition-colors group"
                      >
                        <div>
                          <span className="font-serif text-xs font-bold text-white group-hover:text-amber-300 block">
                            4. Cuadrante Estilo Gartner
                          </span>
                          <span className="text-[11px] text-neutral-400">
                            Líderes, retadores, visionarios y nicho
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-400 shrink-0" />
                      </button>

                      <button
                        onClick={() => handleSelectSection('recomendaciones')}
                        className="flex items-center justify-between p-3 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-amber-400/50 text-left transition-colors group"
                      >
                        <div>
                          <span className="font-serif text-xs font-bold text-white group-hover:text-amber-300 block">
                            5. Recomendaciones Estratégicas
                          </span>
                          <span className="text-[11px] text-neutral-400">
                            8 mandamientos y tabla de riesgos
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-400 shrink-0" />
                      </button>
                    </div>

                    <div className="mt-4 pt-3 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <button
                        onClick={() => setIsSimulatorOpen(true)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-amber-300 to-amber-500 rounded hover:from-amber-200 hover:to-amber-400 transition-all shadow-md shadow-amber-500/15"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                        <span>Simular Marca en la Brecha ($250–$500)</span>
                      </button>

                      <button
                        onClick={() => handleSelectSection('todos')}
                        className="text-xs text-neutral-400 hover:text-amber-300 underline py-1"
                      >
                        Ver todo el estudio seguido
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        )}

        {/* 2. Landscape Competitivo (Shown when 'competidores' or 'todos') */}
        {(activeSection === 'competidores' || activeSection === 'todos') && (
          <div>
            <LandscapeSection
              brands={brands}
              onSelectBrand={(brand) => setSelectedBrand(brand)}
            />
            {activeSection === 'competidores' && (
              <div className="py-6 px-4 max-w-7xl mx-auto flex items-center justify-between gap-2 border-b border-neutral-800">
                <button
                  onClick={() => handleSelectSection('resumen')}
                  className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-amber-300"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>1. Resumen</span>
                </button>
                <button
                  onClick={() => handleSelectSection('scoring')}
                  className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-white font-medium bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded"
                >
                  <span>Siguiente: 3. Scoring</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* 3. Matriz de Scoring Ponderado (Shown when 'scoring' or 'todos') */}
        {(activeSection === 'scoring' || activeSection === 'todos') && (
          <div>
            <ScoringSection
              brands={brands}
              onSelectBrand={(brand) => setSelectedBrand(brand)}
            />
            {activeSection === 'scoring' && (
              <div className="py-6 px-4 max-w-7xl mx-auto flex items-center justify-between gap-2 border-b border-neutral-800">
                <button
                  onClick={() => handleSelectSection('competidores')}
                  className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-amber-300"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>2. Competidores</span>
                </button>
                <button
                  onClick={() => handleSelectSection('cuadrante')}
                  className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-white font-medium bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded"
                >
                  <span>Siguiente: 4. Cuadrante</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* 4. Cuadrante Estilo Gartner (Shown when 'cuadrante' or 'todos') */}
        {(activeSection === 'cuadrante' || activeSection === 'todos') && (
          <div>
            <GartnerQuadrant
              brands={brands}
              selectedBrandId={selectedBrand?.id}
              onSelectBrand={(brand) => setSelectedBrand(brand)}
              simulatedBrand={simulatedBrand}
            />
            {activeSection === 'cuadrante' && (
              <div className="py-6 px-4 max-w-7xl mx-auto flex items-center justify-between gap-2 border-b border-neutral-800">
                <button
                  onClick={() => handleSelectSection('scoring')}
                  className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-amber-300"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>3. Scoring</span>
                </button>
                <button
                  onClick={() => handleSelectSection('recomendaciones')}
                  className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-white font-medium bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded"
                >
                  <span>Siguiente: 5. Recomendaciones</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* 5. Recomendaciones Estratégicas y Riesgos (Shown when 'recomendaciones' or 'todos') */}
        {(activeSection === 'recomendaciones' || activeSection === 'todos') && (
          <div>
            <RecommendationsSection />
            {activeSection === 'recomendaciones' && (
              <div className="py-6 px-4 max-w-7xl mx-auto flex items-center justify-between gap-2 border-b border-neutral-800">
                <button
                  onClick={() => handleSelectSection('cuadrante')}
                  className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-amber-300"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>4. Cuadrante</span>
                </button>
                <button
                  onClick={() => handleSelectSection('resumen')}
                  className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-white font-medium bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded"
                >
                  <span>Volver al Resumen (Principal)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Institutional Footer */}
      <Footer />

      {/* Brand In-Depth Dossier Modal */}
      <BrandDetailModal
        brand={selectedBrand}
        onClose={() => setSelectedBrand(null)}
      />

      {/* Interactive New Brand Simulator Modal */}
      <NewBrandSimulator
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        onApplySimulation={(sim) => {
          setSimulatedBrand(sim);
          handleSelectSection('cuadrante');
        }}
      />
    </div>
  );
}
