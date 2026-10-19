import { jsPDF } from 'jspdf';
import { INITIAL_BRANDS, CRITERIA, calculateWeightedScore, STRATEGIC_RECOMMENDATIONS, RISKS_AND_MITIGATIONS, EXECUTIVE_INSIGHTS } from '../data/marketData';

export async function generateMarketStudyPdf(): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // Colors
  const bgDark = [10, 10, 12] as const;
  const goldPrimary = [212, 175, 55] as const;
  const goldLight = [245, 223, 168] as const;
  const textWhite = [255, 255, 255] as const;
  const textMuted = [163, 163, 163] as const;
  const cardBg = [20, 20, 24] as const;
  const borderGold = [70, 60, 30] as const;

  const paintBackground = () => {
    doc.setFillColor(bgDark[0], bgDark[1], bgDark[2]);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
  };

  const drawHeader = (pageNumber: number, totalPages: number) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(goldPrimary[0], goldPrimary[1], goldPrimary[2]);
    doc.text('PANAMÁ NEXO LITE · INFORME ESTRATÉGICO', margin, 10);

    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(`Página ${pageNumber} de ${totalPages}`, pageWidth - margin, 10, { align: 'right' });

    doc.setDrawColor(goldPrimary[0], goldPrimary[1], goldPrimary[2]);
    doc.setLineWidth(0.3);
    doc.line(margin, 12, pageWidth - margin, 12);
  };

  const drawFooter = () => {
    doc.setDrawColor(borderGold[0], borderGold[1], borderGold[2]);
    doc.setLineWidth(0.2);
    doc.line(margin, pageHeight - 10, pageWidth - margin, pageHeight - 10);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text('Estudio de Mercado: Calzado no deportivo, marcas de moda y lujo en Panamá · Precios en USD', margin, pageHeight - 6);
    doc.text('Confidencial / Uso Estratégico', pageWidth - margin, pageHeight - 6, { align: 'right' });
  };

  // ==========================================
  // PÁGINA 1: PORTADA Y RESUMEN EJECUTIVO
  // ==========================================
  paintBackground();
  drawHeader(1, 5);

  let y = 20;

  // Title section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(goldPrimary[0], goldPrimary[1], goldPrimary[2]);
  doc.text('INFORME EJECUTIVO DE MERCADO · METODOLOGÍA GARTNER', margin, y);
  y += 6;

  doc.setFont('times', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
  const titleLines = doc.splitTextToSize('Estudio de Mercado: Calzado no deportivo, marcas de moda y lujo en Panamá', contentWidth);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 7 + 2;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  const subLines = doc.splitTextToSize('Estimaciones cualitativas, precios en USD y análisis cuantitativo de 8 marcas globales para identificar la brecha desatendida de calzado artesanal en Ciudad de Panamá.', contentWidth);
  doc.text(subLines, margin, y);
  y += subLines.length * 4 + 4;

  // Section 1 Header
  doc.setFont('times', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(goldLight[0], goldLight[1], goldLight[2]);
  doc.text('1. Resumen Ejecutivo & KPIs Clave', margin, y);
  y += 5;

  // 4 KPIs Box Grid
  const kpiWidth = (contentWidth - 6) / 4;
  const kpis = [
    { label: 'BRECHA DE MERCADO', val: '$250–$500', note: 'Franja desatendida' },
    { label: 'MARCAS ANALIZADAS', val: '8 Firmas', note: 'UE y EE. UU.' },
    { label: 'SEGMENTOS', val: '3 Activos', note: 'Aspiracional / Lujo' },
    { label: 'IMPUESTO LOCAL', val: '7% ITBMS', note: 'Más arancel calzado' }
  ];

  kpis.forEach((kpi, idx) => {
    const kx = margin + idx * (kpiWidth + 2);
    doc.setFillColor(cardBg[0], cardBg[1], cardBg[2]);
    doc.setDrawColor(goldPrimary[0], goldPrimary[1], goldPrimary[2]);
    doc.setLineWidth(0.3);
    doc.roundedRect(kx, y, kpiWidth, 18, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(goldPrimary[0], goldPrimary[1], goldPrimary[2]);
    doc.text(kpi.label, kx + 3, y + 4.5);

    doc.setFont('times', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
    doc.text(kpi.val, kx + 3, y + 10.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(kpi.note, kx + 3, y + 15);
  });

  y += 22;

  // 6 Analytical Insight Cards
  doc.setFont('times', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(goldPrimary[0], goldPrimary[1], goldPrimary[2]);
  doc.text('Diagnóstico de Mercado en Ciudad de Panamá', margin, y);
  y += 4;

  const cardW = (contentWidth - 3) / 2;
  const cardH = 31;

  EXECUTIVE_INSIGHTS.forEach((ins, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const cx = margin + col * (cardW + 3);
    const cy = y + row * (cardH + 2.5);

    doc.setFillColor(cardBg[0], cardBg[1], cardBg[2]);
    doc.setDrawColor(ins.isHighlight ? goldPrimary[0] : borderGold[0], ins.isHighlight ? goldPrimary[1] : borderGold[1], ins.isHighlight ? goldPrimary[2] : borderGold[2]);
    doc.setLineWidth(ins.isHighlight ? 0.6 : 0.2);
    doc.roundedRect(cx, cy, cardW, cardH, 1, 1, 'FD');

    doc.setFont('times', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(ins.isHighlight ? goldPrimary[0] : textWhite[0], ins.isHighlight ? goldPrimary[1] : textWhite[1], ins.isHighlight ? goldPrimary[2] : textWhite[2]);
    doc.text(ins.title + (ins.isHighlight ? ' ★ (Oportunidad Clave)' : ''), cx + 3, cy + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(ins.isHighlight ? textWhite[0] : textMuted[0], ins.isHighlight ? textWhite[1] : textMuted[1], ins.isHighlight ? textWhite[2] : textMuted[2]);
    const lines = doc.splitTextToSize(ins.content, cardW - 6);
    doc.text(lines.slice(0, 6), cx + 3, cy + 9.5);
  });

  drawFooter();

  // ==========================================
  // PÁGINA 2: LANDSCAPE COMPETITIVO
  // ==========================================
  doc.addPage();
  paintBackground();
  drawHeader(2, 5);

  y = 20;
  doc.setFont('times', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(goldLight[0], goldLight[1], goldLight[2]);
  doc.text('2. Landscape Competitivo (8 Marcas Analizadas)', margin, y);
  y += 4;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Mapeo de marcas aspiracionales y de lujo presentes en centros comerciales y boutiques de Ciudad de Panamá.', margin, y);
  y += 6;

  // Table header
  const tableCols = [
    { title: 'Marca', w: 32 },
    { title: 'Origen', w: 20 },
    { title: 'Segmento', w: 28 },
    { title: 'Precio (USD)', w: 25 },
    { title: 'Propuesta de Valor Central', w: 42 },
    { title: 'Presencia en Panamá', w: 35 }
  ];

  doc.setFillColor(30, 28, 20);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setDrawColor(goldPrimary[0], goldPrimary[1], goldPrimary[2]);
  doc.setLineWidth(0.3);
  doc.line(margin, y + 7, margin + contentWidth, y + 7);

  let tx = margin + 2;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(goldPrimary[0], goldPrimary[1], goldPrimary[2]);

  tableCols.forEach(col => {
    doc.text(col.title, tx, y + 4.8);
    tx += col.w;
  });

  y += 7;

  // Table rows
  INITIAL_BRANDS.forEach((b, idx) => {
    const rowH = 18;
    const isEven = idx % 2 === 0;

    doc.setFillColor(isEven ? 16 : 22, isEven ? 16 : 22, isEven ? 18 : 25);
    doc.rect(margin, y, contentWidth, rowH, 'F');
    doc.setDrawColor(40, 40, 45);
    doc.setLineWidth(0.2);
    doc.line(margin, y + rowH, margin + contentWidth, y + rowH);

    tx = margin + 2;

    // Marca
    doc.setFont('times', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
    doc.text(b.name, tx, y + 6);

    // Origen
    tx += tableCols[0].w;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(b.origin, tx, y + 6);

    // Segmento
    tx += tableCols[1].w;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(goldPrimary[0], goldPrimary[1], goldPrimary[2]);
    doc.text(b.segment, tx, y + 6);

    // Precio
    tx += tableCols[2].w;
    doc.setFont('times', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
    doc.text(`$${b.priceRange}`, tx, y + 6);

    // Propuesta de valor
    tx += tableCols[3].w;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    const propLines = doc.splitTextToSize(b.valueProp, tableCols[4].w - 2);
    doc.text(propLines.slice(0, 3), tx, y + 5);

    // Presencia local
    tx += tableCols[4].w;
    const presLines = doc.splitTextToSize(b.localPresence, tableCols[5].w - 2);
    doc.text(presLines.slice(0, 3), tx, y + 5);

    y += rowH;
  });

  y += 6;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(goldPrimary[0], goldPrimary[1], goldPrimary[2]);
  doc.text('*Nota de verificación: La presencia local y precios retail son estimaciones referenciales para modelado financiero.', margin, y);

  drawFooter();

  // ==========================================
  // PÁGINA 3: MATRIZ DE SCORING PONDERADO
  // ==========================================
  doc.addPage();
  paintBackground();
  drawHeader(3, 5);

  y = 20;
  doc.setFont('times', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(goldLight[0], goldLight[1], goldLight[2]);
  doc.text('3. Matriz de Scoring Ponderado', margin, y);
  y += 4;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Evaluación multicriterio en escala de 1 a 10 con ponderación oficial de factores de compra en Panamá.', margin, y);
  y += 6;

  // Criteria summary boxes
  const cWidth = (contentWidth - 8) / 5;
  CRITERIA.forEach((crit, i) => {
    const cx = margin + i * (cWidth + 2);
    doc.setFillColor(cardBg[0], cardBg[1], cardBg[2]);
    doc.setDrawColor(goldPrimary[0], goldPrimary[1], goldPrimary[2]);
    doc.setLineWidth(0.2);
    doc.roundedRect(cx, y, cWidth, 14, 1, 1, 'FD');

    doc.setFont('times', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(goldPrimary[0], goldPrimary[1], goldPrimary[2]);
    doc.text(`${Math.round(crit.weight * 100)}%`, cx + 2.5, y + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
    const nameLines = doc.splitTextToSize(crit.name, cWidth - 4);
    doc.text(nameLines.slice(0, 2), cx + 2.5, y + 8.5);
  });

  y += 18;

  // Scoring Table
  const sorted = [...INITIAL_BRANDS].map(b => ({
    ...b,
    score: calculateWeightedScore(b)
  })).sort((a, b) => b.score - a.score);

  const scoreCols = [
    { title: 'Pos', w: 12 },
    { title: 'Marca', w: 38 },
    { title: 'Calidad (25%)', w: 25 },
    { title: 'Marca (20%)', w: 25 },
    { title: 'Precio-V (20%)', w: 25 },
    { title: 'Acceso (20%)', w: 25 },
    { title: 'Innov. (15%)', w: 22 },
    { title: 'Puntaje Final', w: 10 }
  ];

  doc.setFillColor(30, 28, 20);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setDrawColor(goldPrimary[0], goldPrimary[1], goldPrimary[2]);
  doc.setLineWidth(0.3);
  doc.line(margin, y + 7, margin + contentWidth, y + 7);

  tx = margin + 2;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(goldPrimary[0], goldPrimary[1], goldPrimary[2]);

  scoreCols.forEach(col => {
    doc.text(col.title, tx, y + 4.8);
    tx += col.w;
  });

  y += 7;

  sorted.forEach((b, idx) => {
    const rowH = 11;
    const isEven = idx % 2 === 0;

    doc.setFillColor(isEven ? 16 : 22, isEven ? 16 : 22, isEven ? 18 : 25);
    doc.rect(margin, y, contentWidth, rowH, 'F');
    doc.setDrawColor(40, 40, 45);
    doc.setLineWidth(0.2);
    doc.line(margin, y + rowH, margin + contentWidth, y + rowH);

    tx = margin + 2;

    // Pos
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(goldPrimary[0], goldPrimary[1], goldPrimary[2]);
    doc.text(`#${idx + 1}`, tx, y + 7);

    // Marca
    tx += scoreCols[0].w;
    doc.setFont('times', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
    doc.text(b.name, tx, y + 7);

    // Metrics
    const metrics = [b.quality, b.brandStrength, b.priceValue, b.accessibility, b.innovation];
    metrics.forEach((val, mi) => {
      tx += scoreCols[mi + 1].w;
      doc.setFont('helvetica', val >= 7 ? 'bold' : 'normal');
      doc.setFontSize(8);
      doc.setTextColor(val >= 7 ? 245 : 180, val >= 7 ? 220 : 180, val >= 7 ? 160 : 180);
      doc.text(`${val} / 10`, tx + 4, y + 7);
    });

    // Score final
    tx += scoreCols[6].w;
    doc.setFont('times', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(goldPrimary[0], goldPrimary[1], goldPrimary[2]);
    doc.text(b.score.toFixed(2), tx + 2, y + 7);

    y += rowH;
  });

  y += 8;
  doc.setFillColor(cardBg[0], cardBg[1], cardBg[2]);
  doc.setDrawColor(goldPrimary[0], goldPrimary[1], goldPrimary[2]);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, contentWidth, 24, 1.5, 1.5, 'FD');

  doc.setFont('times', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(goldPrimary[0], goldPrimary[1], goldPrimary[2]);
  doc.text('Hallazgo de la Matriz de Scoring:', margin + 3, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  const scoringTakeaway = 'Las marcas aspiracionales (BOSS, Michael Kors) lideran en accesibilidad local y percepción de precio-valor, pero sacrifican la durabilidad de cueros. Las marcas de lujo tradicional (Gucci, Louis Vuitton, Ferragamo) dominan en calidad e imagen de marca pero se desploman en relación precio-valor. Ninguna marca existente cubre simultáneamente alta calidad artesanal y precio honesto.';
  const tkLines = doc.splitTextToSize(scoringTakeaway, contentWidth - 6);
  doc.text(tkLines, margin + 3, y + 11);

  drawFooter();

  // ==========================================
  // PÁGINA 4: CUADRANTE ESTILO GARTNER
  // ==========================================
  doc.addPage();
  paintBackground();
  drawHeader(4, 5);

  y = 20;
  doc.setFont('times', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(goldLight[0], goldLight[1], goldLight[2]);
  doc.text('4. Cuadrante Estilo Gartner', margin, y);
  y += 4;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Mapeo bidimensional: Completitud de Visión vs. Capacidad de Ejecución en retail y logística panameña.', margin, y);
  y += 8;

  // Draw Gartner Chart
  const qWidth = contentWidth;
  const qHeight = 110;
  const qx = margin;
  const qy = y;

  doc.setFillColor(15, 15, 18);
  doc.setDrawColor(borderGold[0], borderGold[1], borderGold[2]);
  doc.setLineWidth(0.5);
  doc.rect(qx, qy, qWidth, qHeight, 'FD');

  const qMidX = qx + qWidth / 2;
  const qMidY = qy + qHeight / 2;

  // Cross axes
  doc.setDrawColor(goldPrimary[0], goldPrimary[1], goldPrimary[2]);
  doc.setLineWidth(0.3);
  doc.line(qMidX, qy, qMidX, qy + qHeight);
  doc.line(qx, qMidY, qx + qWidth, qMidY);

  // Quadrant Labels
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);

  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('RETADORES (CHALLENGERS)', qx + 4, qy + 7);

  doc.setTextColor(goldPrimary[0], goldPrimary[1], goldPrimary[2]);
  doc.text('LÍDERES (LEADERS)', qx + qWidth - 4, qy + 7, { align: 'right' });

  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('JUGADORES DE NICHO', qx + 4, qy + qHeight - 4);

  doc.setTextColor(110, 231, 183);
  doc.text('VISIONARIOS', qx + qWidth - 4, qy + qHeight - 4, { align: 'right' });

  // Axis Labels
  doc.setFontSize(6.5);
  doc.setTextColor(goldPrimary[0], goldPrimary[1], goldPrimary[2]);
  doc.text('Completitud de Visión (Eje X) →', qMidX, qy + qHeight + 4.5, { align: 'center' });

  // Plot brands as circles
  INITIAL_BRANDS.forEach(b => {
    const px = qx + ((b.vision - 3) / 7) * (qWidth - 20) + 10;
    const py = qy + ((10 - b.execution) / 7) * (qHeight - 20) + 10;

    const isLider = b.category === 'Líder';
    const isVisionario = b.category === 'Visionario';

    doc.setFillColor(isLider ? goldPrimary[0] : isVisionario ? 110 : 255, isLider ? goldPrimary[1] : isVisionario ? 231 : 255, isLider ? goldPrimary[2] : isVisionario ? 183 : 255);
    doc.circle(px, py, 2.5, 'F');

    doc.setFont('times', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
    const alignLeft = b.name === 'Gucci';
    doc.text(b.name, px + (alignLeft ? -3.5 : 3.5), py + 1.2, { align: alignLeft ? 'right' : 'left' });
  });

  y = qy + qHeight + 9;

  // 4 Quadrant Categories Breakdown
  const catBoxes = [
    { name: 'Líderes', brands: 'Ermenegildo Zegna, Gucci, Louis Vuitton', color: goldPrimary },
    { name: 'Retadores', brands: 'BOSS, Michael Kors, Salvatore Ferragamo', color: textWhite },
    { name: 'Visionarios', brands: 'Adolfo Domínguez', color: [110, 231, 183] },
    { name: 'Jugadores de Nicho', brands: 'Tod’s', color: textMuted },
  ];

  const catW = (contentWidth - 6) / 2;
  catBoxes.forEach((cb, ci) => {
    const cx = margin + (ci % 2) * (catW + 6);
    const cy = y + Math.floor(ci / 2) * 16;

    doc.setFillColor(cardBg[0], cardBg[1], cardBg[2]);
    doc.setDrawColor(borderGold[0], borderGold[1], borderGold[2]);
    doc.setLineWidth(0.2);
    doc.roundedRect(cx, cy, catW, 13, 1, 1, 'FD');

    doc.setFont('times', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(cb.color[0], cb.color[1], cb.color[2]);
    doc.text(cb.name, cx + 3, cy + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
    doc.text(cb.brands, cx + 3, cy + 9.5);
  });

  y += 35;
  doc.setFillColor(cardBg[0], cardBg[1], cardBg[2]);
  doc.setDrawColor(goldPrimary[0], goldPrimary[1], goldPrimary[2]);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, contentWidth, 20, 1.5, 1.5, 'FD');

  doc.setFont('times', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(goldPrimary[0], goldPrimary[1], goldPrimary[2]);
  doc.text('Espacio en Blanco del Mercado:', margin + 3, y + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  const whiteSpaceText = 'Ninguna marca existente en Panamá combina actualmente una alta ejecución local (entrega rápida 24-48h, atención personalizada y cambio de talla) con una propuesta de calzado artesanal premium ($250–$500) y adaptada al clima húmedo tropical. Ese espacio libre es la oportunidad clave.';
  const wsLines = doc.splitTextToSize(whiteSpaceText, contentWidth - 6);
  doc.text(wsLines, margin + 3, y + 10);

  drawFooter();

  // ==========================================
  // PÁGINA 5: RECOMENDACIONES Y RIESGOS
  // ==========================================
  doc.addPage();
  paintBackground();
  drawHeader(5, 5);

  y = 20;
  doc.setFont('times', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(goldLight[0], goldLight[1], goldLight[2]);
  doc.text('5. Recomendaciones Estratégicas y Gestión de Riesgos', margin, y);
  y += 4;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('8 mandamientos de ejecución comercial para capturar la brecha y matriz de mitigación de riesgos.', margin, y);
  y += 6;

  // 8 Recommendations in 2 columns
  const recW = (contentWidth - 4) / 2;
  const recH = 20;

  STRATEGIC_RECOMMENDATIONS.forEach((rec, ri) => {
    const rx = margin + (ri % 2) * (recW + 4);
    const ry = y + Math.floor(ri / 2) * (recH + 2);

    doc.setFillColor(cardBg[0], cardBg[1], cardBg[2]);
    doc.setDrawColor(borderGold[0], borderGold[1], borderGold[2]);
    doc.setLineWidth(0.2);
    doc.roundedRect(rx, ry, recW, recH, 1, 1, 'FD');

    doc.setFont('times', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(goldPrimary[0], goldPrimary[1], goldPrimary[2]);
    doc.text(`${rec.id}. ${rec.title}`, rx + 2.5, ry + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
    const actLines = doc.splitTextToSize(`Acción: ${rec.action}`, recW - 5);
    doc.text(actLines.slice(0, 2), rx + 2.5, ry + 8.5);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(6);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    const rznLines = doc.splitTextToSize(`Por qué: ${rec.reason}`, recW - 5);
    doc.text(rznLines.slice(0, 2), rx + 2.5, ry + 15.5);
  });

  y += 4 * (recH + 2) + 4;

  // Risks & Mitigations Table
  doc.setFont('times', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(goldPrimary[0], goldPrimary[1], goldPrimary[2]);
  doc.text('Matriz de Riesgos y Mitigación Operativa', margin, y);
  y += 4;

  const riskCols = [
    { title: 'Riesgo Detectado', w: 70 },
    { title: 'Plan de Mitigación Operativa', w: 87 },
    { title: 'Criticidad', w: 25 }
  ];

  doc.setFillColor(30, 28, 20);
  doc.rect(margin, y, contentWidth, 5.5, 'F');
  doc.setDrawColor(goldPrimary[0], goldPrimary[1], goldPrimary[2]);
  doc.setLineWidth(0.2);
  doc.line(margin, y + 5.5, margin + contentWidth, y + 5.5);

  tx = margin + 2;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(goldPrimary[0], goldPrimary[1], goldPrimary[2]);
  riskCols.forEach(rc => {
    doc.text(rc.title, tx, y + 4);
    tx += rc.w;
  });

  y += 5.5;

  RISKS_AND_MITIGATIONS.forEach((rm, rmi) => {
    const rh = 13.5;
    const isEven = rmi % 2 === 0;

    doc.setFillColor(isEven ? 16 : 22, isEven ? 16 : 22, isEven ? 18 : 25);
    doc.rect(margin, y, contentWidth, rh, 'F');
    doc.setDrawColor(40, 40, 45);
    doc.setLineWidth(0.2);
    doc.line(margin, y + rh, margin + contentWidth, y + rh);

    tx = margin + 2;

    // Riesgo
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(textWhite[0], textWhite[1], textWhite[2]);
    const rkLines = doc.splitTextToSize(rm.risk, riskCols[0].w - 3);
    doc.text(rkLines.slice(0, 3), tx, y + 4.5);

    // Mitigación
    tx += riskCols[0].w;
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    const mtLines = doc.splitTextToSize(rm.mitigation, riskCols[1].w - 3);
    doc.text(mtLines.slice(0, 3), tx, y + 4.5);

    // Criticidad
    tx += riskCols[1].w;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(rm.impactLevel === 'Crítico' ? 239 : goldPrimary[0], rm.impactLevel === 'Crítico' ? 68 : goldPrimary[1], rm.impactLevel === 'Crítico' ? 68 : goldPrimary[2]);
    doc.text(rm.impactLevel, tx + 4, y + 7);

    y += rh;
  });

  drawFooter();

  // Save PDF file directly to client browser
  doc.save('Estudio_Mercado_Calzado_Panama.pdf');
}
