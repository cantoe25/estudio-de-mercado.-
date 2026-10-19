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
import { PrintReportView } from './components/PrintReportView';
import { generateMarketStudyPdf } from './utils/generatePdf';
import { smoothScrollToTop } from './utils/scrollHelper';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function App() {
  const [brands] = useState<BrandData[]>(INITIAL_BRANDS);
  const [selectedBrand, setSelectedBrand] = useState<BrandData | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  
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
    smoothScrollToTop(850);
  };

  const handleDownloadPdf = async () => {
    if (isGeneratingPdf) return;
    try {
      setIsGeneratingPdf(true);
      await generateMarketStudyPdf();
    } catch (err) {
      console.warn('Fallback a impresión nativa:', err);
      try {
        window.print();
      } catch (printErr) {
        console.error('Error al imprimir:', printErr);
      }
    } finally {
      setIsGeneratingPdf(false);
    }
  };


  return (
    <>
      {/* 1. Dedicated High-Fidelity Print / PDF Layout (Visible ONLY during print/PDF generation) */}
      <PrintReportView />

      {/* 2. Interactive Screen Web & Mobile Application (Hidden during print/PDF export) */}
      <div className="print:hidden min-h-screen bg-black text-white selection:bg-amber-500/30 selection:text-amber-200 flex flex-col font-sans">
        {/* Top Bar with 3-Lines Mobile Hamburger Menu & PDF button */}
        <Navbar
          onDownloadPdf={handleDownloadPdf}
          isGeneratingPdf={isGeneratingPdf}
          activeSection={activeSection}
          onSelectSection={handleSelectSection}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          {/* Keyed container so every section switch triggers a slow, fluid, graceful entrance */}
          <div key={activeSection} className="animate-fluid-view">
            {/* Curatorial Hero Banner - visible only in Resumen Ejecutivo or Ver Todo */}
            {(activeSection === 'resumen' || activeSection === 'todos') && (
              <Hero
                onExploreGartner={() => handleSelectSection('cuadrante')}
                onExploreScoring={() => handleSelectSection('scoring')}
              />
            )}

            {/* 1. Resumen Ejecutivo (Shown when 'resumen' or 'todos') */}
            {(activeSection === 'resumen' || activeSection === 'todos') && (
              <ExecutiveSummary />
            )}

            {/* 2. Landscape Competitivo (Shown when 'competidores' or 'todos') */}
            {(activeSection === 'competidores' || activeSection === 'todos') && (
              <div>
                <LandscapeSection
                  brands={brands}
                  onSelectBrand={(brand) => setSelectedBrand(brand)}
                />
                {activeSection === 'competidores' && (
                  <div className="py-6 px-4 w-full max-w-[1800px] mx-auto flex items-center justify-between gap-2 border-b border-neutral-800">
                    <button
                      onClick={() => handleSelectSection('resumen')}
                      className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-amber-300 min-h-[38px] transition-all duration-500 ease-out hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>1. Resumen</span>
                    </button>
                    <button
                      onClick={() => handleSelectSection('scoring')}
                      className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-white font-medium bg-neutral-900 border border-neutral-800 px-3.5 py-1.5 rounded min-h-[38px] transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-amber-400/40 active:translate-y-0.5 shadow-sm hover:shadow-amber-500/10 cursor-pointer"
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
                  <div className="py-6 px-4 w-full max-w-[1800px] mx-auto flex items-center justify-between gap-2 border-b border-neutral-800">
                    <button
                      onClick={() => handleSelectSection('competidores')}
                      className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-amber-300 min-h-[38px] transition-all duration-500 ease-out hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>2. Competidores</span>
                    </button>
                    <button
                      onClick={() => handleSelectSection('cuadrante')}
                      className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-white font-medium bg-neutral-900 border border-neutral-800 px-3.5 py-1.5 rounded min-h-[38px] transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-amber-400/40 active:translate-y-0.5 shadow-sm hover:shadow-amber-500/10 cursor-pointer"
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
                  <div className="py-6 px-4 w-full max-w-[1800px] mx-auto flex items-center justify-between gap-2 border-b border-neutral-800">
                    <button
                      onClick={() => handleSelectSection('scoring')}
                      className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-amber-300 min-h-[38px] transition-all duration-500 ease-out hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>3. Scoring</span>
                    </button>
                    <button
                      onClick={() => handleSelectSection('recomendaciones')}
                      className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-white font-medium bg-neutral-900 border border-neutral-800 px-3.5 py-1.5 rounded min-h-[38px] transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-amber-400/40 active:translate-y-0.5 shadow-sm hover:shadow-amber-500/10 cursor-pointer"
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
                  <div className="py-6 px-4 w-full max-w-[1800px] mx-auto flex items-center justify-between gap-2 border-b border-neutral-800">
                    <button
                      onClick={() => handleSelectSection('cuadrante')}
                      className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-amber-300 min-h-[38px] transition-all duration-500 ease-out hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>4. Cuadrante</span>
                    </button>
                    <button
                      onClick={() => handleSelectSection('resumen')}
                      className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-white font-medium bg-neutral-900 border border-neutral-800 px-3.5 py-1.5 rounded min-h-[38px] transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-amber-400/40 active:translate-y-0.5 shadow-sm hover:shadow-amber-500/10 cursor-pointer"
                    >
                      <span>Volver al Resumen (Principal)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>

        {/* Institutional Footer */}
        <Footer onDownloadPdf={handleDownloadPdf} isGeneratingPdf={isGeneratingPdf} />

        {/* Brand In-Depth Dossier Modal */}
        <BrandDetailModal
          brand={selectedBrand}
          onClose={() => setSelectedBrand(null)}
        />
      </div>
    </>
  );
}
