export interface BrandData {
  id: string;
  name: string;
  origin: string;
  segment: "Aspiracional" | "Lujo heritage" | "Lujo de moda";
  priceRange: string;
  minPrice: number;
  maxPrice: number;
  valueProp: string;
  localPresence: string;
  quality: number;        // Calidad de producto y materiales (25%)
  brandStrength: number;  // Fuerza de marca y posicionamiento (20%)
  priceValue: number;     // Relación calidad-precio (20%)
  accessibility: number;  // Accesibilidad en Panamá (20%)
  innovation: number;     // Innovación, diseño y experiencia digital (15%)
  vision: number;         // X coordinate in Gartner Quadrant (3 to 10)
  execution: number;      // Y coordinate in Gartner Quadrant (3 to 10)
  category: "Líder" | "Retador" | "Visionario" | "Nicho";
  description?: string;
  strengths?: string[];
  weaknesses?: string[];
}

export interface WeightCriterion {
  id: string;
  name: string;
  weight: number;
  description: string;
}

export const CRITERIA: WeightCriterion[] = [
  { id: "quality", name: "Calidad de producto y materiales", weight: 0.25, description: "Curtiduría, cueros de grano completo, construcción artesanal y durabilidad." },
  { id: "brandStrength", name: "Fuerza de marca y posicionamiento", weight: 0.20, description: "Reconocimiento de marca, prestigio social y deseabilidad global." },
  { id: "priceValue", name: "Relación calidad-precio", weight: 0.20, description: "Valor tangible recibido por cada dólar invertido frente al sobreprecio de logo." },
  { id: "accessibility", name: "Accesibilidad en Panamá", weight: 0.20, description: "Presencia en boutiques, centros comerciales, inventario y rapidez de compra." },
  { id: "innovation", name: "Innovación, diseño y exp. digital", weight: 0.15, description: "Adaptación climática, estética contemporánea y canales omnicanal." },
];

export const INITIAL_BRANDS: BrandData[] = [
  {
    id: "boss",
    name: "BOSS",
    origin: "Alemania",
    segment: "Aspiracional",
    priceRange: "150–350",
    minPrice: 150,
    maxPrice: 350,
    valueProp: "Smart casual y sastrería moderna, sneakers y zapato de vestir accesible",
    localPresence: "Tiendas y multimarca en centros comerciales (Multiplaza, etc.)",
    quality: 7,
    brandStrength: 8,
    priceValue: 7,
    accessibility: 9,
    innovation: 7,
    vision: 6,
    execution: 9,
    category: "Retador",
    description: "Líder en vestimenta corporativa y casual premium en Panamá, con fuerte disponibilidad pero calidad industrial estándar.",
    strengths: ["Amplia distribución en centros comerciales", "Reconocimiento corporativo masivo", "Variedad en sneakers y mocasines"],
    weaknesses: ["Cueros de grado comercial", "Poco valor artesanal de zapatero tradicional"]
  },
  {
    id: "michael-kors",
    name: "Michael Kors",
    origin: "EE. UU.",
    segment: "Aspiracional",
    priceRange: "100–250",
    minPrice: 100,
    maxPrice: 250,
    valueProp: "Lujo accesible, estética de logo y moda de temporada",
    localPresence: "Tiendas y departamentales en centros comerciales",
    quality: 6,
    brandStrength: 7,
    priceValue: 7,
    accessibility: 9,
    innovation: 6,
    vision: 5,
    execution: 8,
    category: "Retador",
    description: "Muy popular en el segmento femenino y lifestyle urbano con alta rotación de inventario en Panamá.",
    strengths: ["Precios de entrada muy accesibles", "Puntos de venta de alto tráfico", "Conocimiento de marca transversal"],
    weaknesses: ["Rápida depreciación percibida", "Diseño supeditado a tendencias efímeras", "Cueros sintéticos y corregidos"]
  },
  {
    id: "adolfo-dominguez",
    name: "Adolfo Domínguez",
    origin: "España",
    segment: "Aspiracional",
    priceRange: "120–250",
    minPrice: 120,
    maxPrice: 250,
    valueProp: "Moda mediterránea, lino y slow fashion, mensaje de sostenibilidad",
    localPresence: "Tiendas propias o multimarca seleccionadas",
    quality: 6,
    brandStrength: 6,
    priceValue: 7,
    accessibility: 7,
    innovation: 6,
    vision: 7,
    execution: 5,
    category: "Visionario",
    description: "Pionero en narrativa de sostenibilidad y calzado transpirable adaptado al clima, aunque con menor músculo de distribución.",
    strengths: ["Filosofía de 'compra menos pero mejor'", "Diseño sobrio y materiales orgánicos", "Estética adecuada para el trópico"],
    weaknesses: ["Huella retail limitada en Panamá", "Poco enfoque específico en calzado de alta gama"]
  },
  {
    id: "tods",
    name: "Tod’s",
    origin: "Italia",
    segment: "Lujo heritage",
    priceRange: "450–900",
    minPrice: 450,
    maxPrice: 900,
    valueProp: "Gommino y mocasines artesanales, elegancia italiana discreta",
    localPresence: "Boutique o multimarca de lujo (Multiplaza Luxury Avenue)",
    quality: 9,
    brandStrength: 8,
    priceValue: 5,
    accessibility: 6,
    innovation: 5,
    vision: 5,
    execution: 6,
    category: "Nicho",
    description: "El estándar dorado del mocasín Gommino italiano. Reverenciado por el cliente connoisseur, pero con presencia y stock limitados localmente.",
    strengths: ["Cueros y antes italianos supremos", "Comodidad excepcional para conducir y ocio", "Estatus 'quiet luxury' sin logos ruidosos"],
    weaknesses: ["Suelas con 'gommini' se desgastan rápido en aceras duras", "Precio elevado sobre $500", "Disponibilidad irregular"]
  },
  {
    id: "salvatore-ferragamo",
    name: "Salvatore Ferragamo",
    origin: "Italia",
    segment: "Lujo heritage",
    priceRange: "600–1,100",
    minPrice: 600,
    maxPrice: 1100,
    valueProp: "Tradición de zapatería italiana, íconos como Gancini y Vara",
    localPresence: "Boutique o multimarca de lujo (Multiplaza)",
    quality: 9,
    brandStrength: 8,
    priceValue: 5,
    accessibility: 6,
    innovation: 6,
    vision: 6,
    execution: 7,
    category: "Retador",
    description: "Legado centenario en zapatería florentina. Preferido por la élite ejecutiva y diplomática en Ciudad de Panamá.",
    strengths: ["Horma y calce anatómico refinado", "Construcción Blake y Goodyear", "Prestigio histórico intachable"],
    weaknesses: ["Precios restrictivos (> $600)", "Muchos compradores prefieren comprarlo en Miami durante viajes"]
  },
  {
    id: "zegna",
    name: "Ermenegildo Zegna",
    origin: "Italia",
    segment: "Lujo heritage",
    priceRange: "700–1,200",
    minPrice: 700,
    maxPrice: 1200,
    valueProp: "Lujo masculino integral, sneakers de triple costura y mocasines de calidad",
    localPresence: "Verificar boutique local o corners de sastrería",
    quality: 8,
    brandStrength: 8,
    priceValue: 5,
    accessibility: 7,
    innovation: 7,
    vision: 7,
    execution: 8,
    category: "Líder",
    description: "Referente del lujo masculino contemporáneo con modelos icónicos como Triple Stitch que dominan juntas directivas.",
    strengths: ["Innovación en calzado híbrido de negocios", "Materiales ultraligeros", "Marca sinónimo de alta dirección"],
    weaknesses: ["Barrera de precio extrema ($700–$1,200)", "Servicio local sujeto a disponibilidad de tallas"]
  },
  {
    id: "gucci",
    name: "Gucci",
    origin: "Italia",
    segment: "Lujo de moda",
    priceRange: "600–1,300",
    minPrice: 600,
    maxPrice: 1300,
    valueProp: "Moda icónica: Horsebit loafer, sneakers de diseñador y logo reconocible",
    localPresence: "Boutique o multimarca de lujo",
    quality: 8,
    brandStrength: 10,
    priceValue: 4,
    accessibility: 7,
    innovation: 9,
    vision: 9,
    execution: 8,
    category: "Líder",
    description: "Poderío de marketing indiscutible. El mocasín Horsebit de 1953 es una insignia de estatus social en Panamá.",
    strengths: ["Mocasin Horsebit icónico global", "Capacidad inigualable de fijación de tendencias", "Alta demanda en público joven de alto poder"],
    weaknesses: ["Elevado margen de prima por marca vs costo real", "Exposición al mercado de réplicas no oficiales"]
  },
  {
    id: "louis-vuitton",
    name: "Louis Vuitton",
    origin: "Francia",
    segment: "Lujo de moda",
    priceRange: "900–1,600",
    minPrice: 900,
    maxPrice: 1600,
    valueProp: "Lujo aspiracional global, sneakers y mocasines de marca insignia",
    localPresence: "Boutique en Multiplaza Pacific Mall",
    quality: 9,
    brandStrength: 10,
    priceValue: 3,
    accessibility: 7,
    innovation: 8,
    vision: 8,
    execution: 9,
    category: "Líder",
    description: "La cúspide del posicionamiento de lujo en la región, respaldada por tienda insignia en Multiplaza y clientela leal.",
    strengths: ["Experiencia de compra de clase mundial", "Retención de valor de marca", "Artesanía en pieles seleccionadas"],
    weaknesses: ["Precios prohibitivos (> $900)", "Baja relación costo-beneficio funcional para uso diario"]
  }
];

export function calculateWeightedScore(brand: BrandData, customWeights?: number[]): number {
  const w = customWeights || CRITERIA.map(c => c.weight);
  const values = [
    brand.quality,
    brand.brandStrength,
    brand.priceValue,
    brand.accessibility,
    brand.innovation
  ];
  return values.reduce((acc, v, i) => acc + v * (w[i] ?? 0.2), 0);
}

export interface Recommendation {
  id: number;
  title: string;
  action: string;
  reason: string;
  focusArea: string;
}

export const STRATEGIC_RECOMMENDATIONS: Recommendation[] = [
  {
    id: 1,
    title: "Ocupar la brecha $250–$500",
    action: "Línea de calzado de cuero de calidad artesanal, por encima de BOSS y Michael Kors y muy por debajo del lujo.",
    reason: "Es la franja con menos oferta directa en el mercado panameño.",
    focusArea: "Posicionamiento de Precio"
  },
  {
    id: 2,
    title: "Competir en calidad por dólar, no en logo",
    action: "Diseño sobrio, materiales visibles y transparencia de costos, curtido y origen artesanal.",
    reason: "Contrasta directamente con el sobreprecio de marca de Gucci y Louis Vuitton.",
    focusArea: "Propuesta de Valor"
  },
  {
    id: 3,
    title: "Diseñar para el clima tropical",
    action: "Cueros ligeros, forros transpirables, suelas de goma/EVA microporosa y tratamiento hidrofugante contra aguaceros.",
    reason: "La humedad y las lluvias son un dolor real del usuario panameño que las firmas europeas tradicionales ignoran.",
    focusArea: "Ingeniería de Producto"
  },
  {
    id: 4,
    title: "Servicio local superior",
    action: "Entrega express en 24–48 h en Ciudad de Panamá, cambio de talla sin fricción, prueba a domicilio y atención VIP por WhatsApp.",
    reason: "Neutraliza la tentación habitual del comprador de pedir a casilleros en Miami.",
    focusArea: "Experiencia & Logística"
  },
  {
    id: 5,
    title: "Personalización & Exclusividad",
    action: "Grabado de iniciales en talón o plantilla, combinaciones de color a pedido y series numeradas para regalos corporativos.",
    reason: "Ofrece la exclusividad que busca el ejecutivo sin requerir precios de cuatro dígitos.",
    focusArea: "Diferenciación"
  },
  {
    id: 6,
    title: "Canales físicos selectivos",
    action: "Pop-ups curados en centros financieros, alianzas con sastrerías de prestigio (Soho, Costa del Este), clubes privados y hoteles 5 estrellas.",
    reason: "Construye aura de prestigio con bajo costo fijo sin caer en contratos leoninos de centros comerciales masivos.",
    focusArea: "Estrategia Go-to-Market"
  },
  {
    id: 7,
    title: "Postventa y reparación local",
    action: "Servicio de resuelado, hidratación de pieles, pulido y mantención preventiva en taller aliado local.",
    reason: "Sostiene el argumento de calzado como inversión para toda la vida y crea fidelidad de largo plazo.",
    focusArea: "Ciclo de Vida"
  },
  {
    id: 8,
    title: "Narrativa de autenticidad",
    action: "Trazabilidad de la curtiduría, visibilidad del maestro zapatero y propósito ético con transparencia sostenible.",
    reason: "Retoma el ángulo vanguardista de Adolfo Domínguez y combate frontalmente el estigma de las réplicas y falsificaciones.",
    focusArea: "Branding & Confianza"
  }
];

export interface RiskItem {
  risk: string;
  mitigation: string;
  impactLevel: "Alto" | "Medio" | "Crítico";
}

export const RISKS_AND_MITIGATIONS: RiskItem[] = [
  {
    risk: "Marcas globales con presupuestos multimillonarios y presencia consolidada en centros comerciales de Panamá.",
    mitigation: "No competir por reconocimiento de logo ni economías de escala: competir frontalmente en calidad tangible por cada dólar, servicio a medida y cercanía personal.",
    impactLevel: "Alto"
  },
  {
    risk: "Aranceles de importación, tasa ITBMS (7%) y costos logísticos que comprimen márgenes operativos.",
    mitigation: "Calcular minuciosamente el precio landed real (FOB + flete aéreo/marítimo + aranceles específicos + ITBMS) antes de fijar políticas de precios y márgenes comerciales.",
    impactLevel: "Crítico"
  },
  {
    risk: "Comportamiento del cliente de clase media-alta que acostumbra comprar calzado en viajes a Miami o vía casillero postal (Miami box).",
    mitigation: "Ofrecer inmediatez de entrega local en 24-48 horas, prueba de múltiples tallas en el domicilio u oficina, cambios instantáneos y servicio postventa que Miami no puede igualar.",
    impactLevel: "Alto"
  },
  {
    risk: "Proliferación de falsificaciones y réplicas de lujo ('clones 1:1') que desincentivan el gasto en marcas tradicionales.",
    mitigation: "Emitir certificado de autenticidad digital/físico numerado, trazabilidad del taller de origen e incrustar la marca en calidades de cuero imposibles de replicar en copias baratas.",
    impactLevel: "Medio"
  }
];

export const EXECUTIVE_INSIGHTS = [
  {
    title: "Visión del Mercado",
    content: "Mercado cuantitativamente pequeño pero con una concentración excepcional de alto poder adquisitivo en Ciudad de Panamá (Costa del Este, Santa María, Punta Pacífica, San Francisco). Economía dolarizada, hub aéreo internacional de Tocumen, Zona Libre de Colón, turismo de negocios y una creciente comunidad ejecutiva y de expatriados."
  },
  {
    title: "Estructura de Oferta",
    content: "Polarización clara: marcas aspiracionales (BOSS, Michael Kors, Adolfo Domínguez) con locales en centros comerciales como Multiplaza y Albrook; lujo selecto en boutiques de lujo y tiendas multimarca; y una cuota significativa de fuga hacia compras en el extranjero (Miami, casilleros e-commerce)."
  },
  {
    title: "Drivers de Crecimiento",
    content: "Evolución hacia el estilo 'smart casual' ejecutivo, auge de la tendencia 'quiet luxury' (lujo silencioso sin logomanía), sneakers de cuero de vestir que reemplazan al zapato tradicional de suela de cuero dura, e incremento de compras corporativas e institucionales."
  },
  {
    title: "Tendencias Clave",
    content: "Consolidación de mocasines y loafers desestructurados como prenda icónica diaria. Creciente aprecio por hormas anatómicas, materiales transpirables adaptados al calor, personalización con monogramas grabados y demanda de artesanía demostrable."
  },
  {
    title: "Barreras de Entrada",
    content: "Impacto del 7% de ITBMS y aranceles sobre calzado importado, complejidad en gestión de inventario por curvas de tallas, clima tropical con humedad extrema y lluvias torrenciales, y amenaza latente de copias en el mercado informal."
  },
  {
    title: "Brecha Principal (Golden Opportunity)",
    content: "Las firmas aspiracionales dominan el segmento de hasta ~$250 con manufactura asiática o calidad industrial media, mientras que el lujo tradicional comienza en ~$600. La franja $250–$500 de auténtica artesanía en piel de becerro, suela ligera y sin inflado de logo está prácticamente desierta en Panamá.",
    isHighlight: true
  }
];
