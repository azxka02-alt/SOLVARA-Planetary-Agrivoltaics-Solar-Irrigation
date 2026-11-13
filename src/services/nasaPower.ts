export type FullLang = 'en' | 'id' | 'ar' | 'pt' | 'es' | 'hi' | 'fr';

export type EcosystemType =
  | 'peatland'
  | 'arid_orchard'
  | 'savanna'
  | 'river_basin_drought'
  | 'desert_oasis'
  | 'global_agrivoltaic';

export interface ZoneConfig {
  id: string;
  name: string;
  region: string;
  crop: string;
  baseMoisture: number;
  solarOffset: number;
  x: number;
  y: number;
  recommendedPump: string;
  nasaAnchored?: boolean;
}

export interface PumpConfig {
  id: string;
  name: string;
  flowRate: string;
  status: 'Active' | 'Standby' | 'Optimizing';
  x: number;
  y: number;
}

export interface GlobalLocationPreset {
  id: string;
  name: string;
  shortLabel: string;
  flag: string;
  country: string;
  latitude: number;
  longitude: number;
  ecosystem: EcosystemType;
  focus: Record<FullLang, string>;
  benchmarkBadge: Record<FullLang, string>;
  suggestedLang: FullLang;
  optimalWindow: string;
  currency: 'IDR' | 'USD';
  zones: ZoneConfig[];
  pumps: PumpConfig[];
}

export interface NasaTelemetryState {
  solarMj: number;
  solarKwh: number;
  soilMoisturePct: number;
  precipMm: number;
  avg3DayPrecipMm: number;
  tempC: number;
  sevenDayMoistureTrend: number[];
  moistureDeltaPct: number;
  latestDate: string;
  solarDate: string;
  tempDate: string;
  source: 'live' | 'fallback';
  isLoading: boolean;
}

export interface GeocodedCityResult {
  name: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  admin1?: string;
}

export const GLOBAL_LOCATION_PRESETS: GlobalLocationPreset[] = [
  {
    id: 'pontianak',
    name: 'Pontianak, Indonesia',
    shortLabel: 'Pontianak, ID',
    flag: '🇮🇩',
    country: 'Indonesia',
    latitude: -0.0677,
    longitude: 109.24,
    ecosystem: 'peatland',
    suggestedLang: 'id',
    optimalWindow: '08:30 - 14:30 WIB',
    currency: 'IDR',
    focus: {
      en: 'Equatorial Peatland Fire & Horticulture',
      id: 'Karhutla Gambut Khatulistiwa & Hortikultura',
      ar: 'أراضي الخث الاستوائية والوقاية من الحرائق',
      pt: 'Turfeiras Equatoriais e Horticultura',
      es: 'Turberas Ecuatoriales y Horticultura',
      hi: 'भूमध्यरेखीय पीटलैंड अग्नि सुरक्षा और बागवानी',
      fr: 'Tourbières Équatoriales et Horticulture',
    },
    benchmarkBadge: {
      en: 'NASA Earth Observation & Tropical Peatland Benchmark',
      id: 'Tolok Ukur Observasi Bumi NASA & Gambut Tropis',
      ar: 'مرجع ناسا لرصد الأرض وأراضي الخث الاستوائية',
      pt: 'Referência NASA Observação da Terra e Turfeiras Tropicais',
      es: 'Referencia NASA Observación Terrestre y Turberas Tropicales',
      hi: 'नासा पृथ्वी अवलोकन और उष्णकटिबंधीय पीटलैंड बेंचमार्क',
      fr: 'Référence NASA Observation Terrestre & Tourbières Tropicales',
    },
    zones: [
      {
        id: 'Z-1',
        name: 'Zone A - Sungai Beliung (Pontianak Barat)',
        region: 'Pontianak Barat',
        crop: 'Maize',
        baseMoisture: 18,
        solarOffset: 0.25,
        x: 24,
        y: 35,
        recommendedPump: 'PUMP-01',
      },
      {
        id: 'Z-2',
        name: 'Zone B - Parit Tokaya (Pontianak Selatan)',
        region: 'Pontianak Selatan',
        crop: 'Wheat',
        baseMoisture: 26,
        solarOffset: 0.12,
        x: 42,
        y: 52,
        recommendedPump: 'PUMP-02',
      },
      {
        id: 'Z-3',
        name: 'Zone C - Siantan Hilir (Pontianak Utara)',
        region: 'Pontianak Utara',
        crop: 'Tomatoes',
        baseMoisture: 22,
        solarOffset: 0.0,
        x: 68,
        y: 28,
        recommendedPump: 'PUMP-02',
        nasaAnchored: true,
      },
      {
        id: 'Z-4',
        name: 'Zone D - Tanjung Hulu (Pontianak Timur)',
        region: 'Pontianak Timur',
        crop: 'Olives',
        baseMoisture: 34,
        solarOffset: -0.15,
        x: 76,
        y: 62,
        recommendedPump: 'PUMP-03',
      },
      {
        id: 'Z-5',
        name: 'Zone E - Saigon (Pontianak Timur)',
        region: 'Pontianak Timur',
        crop: 'Almonds',
        baseMoisture: 29,
        solarOffset: 0.08,
        x: 56,
        y: 74,
        recommendedPump: 'PUMP-03',
      },
      {
        id: 'Z-6',
        name: 'Zone F - Pal Lima (Pontianak Barat)',
        region: 'Pontianak Barat',
        crop: 'Chili & Leafy Greens',
        baseMoisture: 19,
        solarOffset: 0.18,
        x: 18,
        y: 66,
        recommendedPump: 'PUMP-01',
      },
      {
        id: 'Z-7',
        name: 'Zone G - Batu Layang (Pontianak Utara)',
        region: 'Pontianak Utara',
        crop: 'Horticulture',
        baseMoisture: 38,
        solarOffset: -0.05,
        x: 50,
        y: 22,
        recommendedPump: 'PUMP-02',
      },
    ],
    pumps: [
      { id: 'PUMP-01', name: 'Solar Pump #01 (Kapuas Barat)', flowRate: '12,000 L/hr', status: 'Active', x: 28, y: 46 },
      { id: 'PUMP-02', name: 'Solar Pump #02 (Siantan Tengah)', flowRate: '18,500 L/hr', status: 'Optimizing', x: 58, y: 38 },
      { id: 'PUMP-03', name: 'Solar Pump #03 (Timur Microgrid)', flowRate: '10,200 L/hr', status: 'Standby', x: 68, y: 68 },
    ],
  },
  {
    id: 'central-valley',
    name: 'Central Valley, USA',
    shortLabel: 'Central Valley, US',
    flag: '🇺🇸',
    country: 'United States',
    latitude: 36.7378,
    longitude: -119.7871,
    ecosystem: 'arid_orchard',
    suggestedLang: 'en',
    optimalWindow: '08:00 - 15:30 PST',
    currency: 'USD',
    focus: {
      en: 'Precision Arid Orchards & Groundwater Deficit',
      id: 'Kebun Buah Kering Presisi & Defisit Air Tanah',
      ar: 'بساتين المناطق الجافة وعجز المياه الجوفية',
      pt: 'Pomares Áridos de Precisão e Déficit Hídrico',
      es: 'Huertos Áridos de Precisión y Déficit Hídrico',
      hi: 'सटीक शुष्क बागान और भूजल कमी प्रबंधन',
      fr: 'Vergers Arides de Précision & Déficit Hydrique',
    },
    benchmarkBadge: {
      en: 'NASA Acres / OpenET Arid Irrigation Benchmark',
      id: 'Tolok Ukur Irigasi Kering NASA Acres / OpenET',
      ar: 'مرجع NASA Acres / OpenET للري في المناطق الجافة',
      pt: 'Referência NASA Acres / OpenET de Irrigação Árida',
      es: 'Referencia NASA Acres / OpenET de Riego Árido',
      hi: 'नासा एकर्स / ओपनईटी शुष्क सिंचाई बेंचमार्क',
      fr: 'Référence NASA Acres / OpenET Irrigation Aride',
    },
    zones: [
      { id: 'Z-1', name: 'Zone A - Fresno West', region: 'Fresno County', crop: 'Almonds', baseMoisture: 17, solarOffset: 0.22, x: 24, y: 38, recommendedPump: 'PUMP-01' },
      { id: 'Z-2', name: 'Zone B - Bakersfield South', region: 'Kern Basin', crop: 'Pistachios', baseMoisture: 14, solarOffset: 0.34, x: 45, y: 74, recommendedPump: 'PUMP-03' },
      { id: 'Z-3', name: 'Zone C - Visalia Valley', region: 'Tulare County', crop: 'Citrus', baseMoisture: 21, solarOffset: 0.0, x: 64, y: 50, recommendedPump: 'PUMP-02', nasaAnchored: true },
      { id: 'Z-4', name: 'Zone D - Modesto North', region: 'Stanislaus', crop: 'Grapes', baseMoisture: 28, solarOffset: -0.18, x: 26, y: 20, recommendedPump: 'PUMP-01' },
      { id: 'Z-5', name: 'Zone E - Merced Basin', region: 'Merced County', crop: 'Tomatoes', baseMoisture: 24, solarOffset: -0.06, x: 48, y: 28, recommendedPump: 'PUMP-02' },
      { id: 'Z-6', name: 'Zone F - Tulare Plains', region: 'Tulare Basin', crop: 'Maize', baseMoisture: 16, solarOffset: 0.19, x: 74, y: 66, recommendedPump: 'PUMP-03' },
      { id: 'Z-7', name: 'Zone G - Madera Ridge', region: 'Madera County', crop: 'Olives', baseMoisture: 31, solarOffset: 0.05, x: 68, y: 26, recommendedPump: 'PUMP-02' },
    ],
    pumps: [
      { id: 'PUMP-01', name: 'Solar Pump #01 (San Joaquin North)', flowRate: '16,500 L/hr', status: 'Active', x: 30, y: 31 },
      { id: 'PUMP-02', name: 'Solar Pump #02 (Kings River Array)', flowRate: '21,000 L/hr', status: 'Optimizing', x: 58, y: 40 },
      { id: 'PUMP-03', name: 'Solar Pump #03 (Kern Aqueduct Array)', flowRate: '14,800 L/hr', status: 'Active', x: 62, y: 71 },
    ],
  },
  {
    id: 'bahia-cerrado',
    name: 'Bahia Cerrado, Brazil',
    shortLabel: 'Bahia Cerrado, BR',
    flag: '🇧🇷',
    country: 'Brazil',
    latitude: -12.1489,
    longitude: -44.9968,
    ecosystem: 'savanna',
    suggestedLang: 'pt',
    optimalWindow: '08:15 - 15:00 BRT',
    currency: 'USD',
    focus: {
      en: 'Tropical Savanna Maize & Soy Agrivoltaics',
      id: 'Agrivoltaik Jagung & Kedelai Sabana Tropis',
      ar: 'الزراعة الكهروضوئية للذرة وفول الصويا في السافانا',
      pt: 'Agrivoltaica de Milho e Soja no Cerrado Tropical',
      es: 'Agrovoltaica de Maíz y Soja en Sabana Tropical',
      hi: 'उष्णकटिबंधीय सवाना मक्का और सोया एग्रीवोल्टाइक्स',
      fr: 'Agrivoltaïque Maïs & Soja en Savane Tropicale',
    },
    benchmarkBadge: {
      en: 'NASA Harvest / Cerrado Tropical Savanna Benchmark',
      id: 'Tolok Ukur NASA Harvest / Sabana Tropis Cerrado',
      ar: 'مرجع NASA Harvest لسافانا سيرادو الاستوائية',
      pt: 'Referência NASA Harvest / Cerrado Tropical Brasileiro',
      es: 'Referencia NASA Harvest / Sabana Tropical Cerrado',
      hi: 'नासा हार्वेस्ट / सेराडो उष्णकटिबंधीय सवाना बेंचमार्क',
      fr: 'Référence NASA Harvest / Savane Tropicale du Cerrado',
    },
    zones: [
      { id: 'Z-1', name: 'Zone A - Barreiras Sul', region: 'Oeste Baiano', crop: 'Soybeans', baseMoisture: 22, solarOffset: 0.14, x: 25, y: 34, recommendedPump: 'PUMP-01' },
      { id: 'Z-2', name: 'Zone B - Luís Eduardo Magalhães', region: 'LEM Agritech Hub', crop: 'Maize', baseMoisture: 18, solarOffset: 0.25, x: 42, y: 26, recommendedPump: 'PUMP-01' },
      { id: 'Z-3', name: 'Zone C - São Desidério', region: 'Rio Grande Basin', crop: 'Cotton', baseMoisture: 24, solarOffset: 0.0, x: 56, y: 48, recommendedPump: 'PUMP-02', nasaAnchored: true },
      { id: 'Z-4', name: 'Zone D - Correntina', region: 'Chapadão Sul', crop: 'Soybeans', baseMoisture: 19, solarOffset: 0.18, x: 34, y: 70, recommendedPump: 'PUMP-03' },
      { id: 'Z-5', name: 'Zone E - Formosa do Rio Preto', region: 'Extremo Oeste', crop: 'Maize', baseMoisture: 27, solarOffset: -0.09, x: 72, y: 24, recommendedPump: 'PUMP-02' },
      { id: 'Z-6', name: 'Zone F - Riachão das Neves', region: 'Vale do Rio Preto', crop: 'Tomatoes', baseMoisture: 32, solarOffset: -0.14, x: 76, y: 58, recommendedPump: 'PUMP-02' },
      { id: 'Z-7', name: 'Zone G - Baianópolis', region: 'Serra Geral', crop: 'Wheat', baseMoisture: 29, solarOffset: 0.05, x: 60, y: 76, recommendedPump: 'PUMP-03' },
    ],
    pumps: [
      { id: 'PUMP-01', name: 'Solar Pump #01 (Rio Grande Oeste)', flowRate: '19,200 L/hr', status: 'Active', x: 35, y: 32 },
      { id: 'PUMP-02', name: 'Solar Pump #02 (Cerrado Pivot Array)', flowRate: '22,400 L/hr', status: 'Optimizing', x: 64, y: 42 },
      { id: 'PUMP-03', name: 'Solar Pump #03 (Correntina Microgrid)', flowRate: '15,000 L/hr', status: 'Standby', x: 48, y: 72 },
    ],
  },
  {
    id: 'murray-darling',
    name: 'Murray-Darling, Australia',
    shortLabel: 'Murray-Darling, AU',
    flag: '🇦🇺',
    country: 'Australia',
    latitude: -34.1855,
    longitude: 142.1625,
    ecosystem: 'river_basin_drought',
    suggestedLang: 'en',
    optimalWindow: '08:00 - 15:45 AEST',
    currency: 'USD',
    focus: {
      en: 'El Niño Drought & Citrus/Wheat Irrigation',
      id: 'Kekeringan El Niño & Irigasi Jeruk/Gandum',
      ar: 'جفاف النينو وري الحمضيات والقمح',
      pt: 'Seca El Niño e Irrigação de Citros e Trigo',
      es: 'Sequía El Niño y Riego de Cítricos y Trigo',
      hi: 'अल नीनो सूखा और नींबू/गेहूं सिंचाई',
      fr: 'Sécheresse El Niño & Irrigation Agrumes/Blé',
    },
    benchmarkBadge: {
      en: 'NASA SMAP / GRACE-FO Basin Drought Benchmark',
      id: 'Tolok Ukur Kekeringan DAS NASA SMAP / GRACE-FO',
      ar: 'مرجع NASA SMAP / GRACE-FO لجفاف الأحواض النهرية',
      pt: 'Referência NASA SMAP / GRACE-FO Seca em Bacia',
      es: 'Referencia NASA SMAP / GRACE-FO Sequía en Cuenca',
      hi: 'नासा एसएमएपी / ग्रेस-एफओ बेसिन सूखा बेंचमार्क',
      fr: 'Référence NASA SMAP / GRACE-FO Sécheresse Bassin',
    },
    zones: [
      { id: 'Z-1', name: 'Zone A - Mildura Irrigation District', region: 'Sunraysia', crop: 'Citrus', baseMoisture: 18, solarOffset: 0.21, x: 26, y: 36, recommendedPump: 'PUMP-01' },
      { id: 'Z-2', name: 'Zone B - Renmark Riverland', region: 'South Australia', crop: 'Grapes', baseMoisture: 23, solarOffset: 0.11, x: 18, y: 58, recommendedPump: 'PUMP-01' },
      { id: 'Z-3', name: 'Zone C - Griffith Murrumbidgee', region: 'MIA New South Wales', crop: 'Wheat', baseMoisture: 20, solarOffset: 0.0, x: 58, y: 34, recommendedPump: 'PUMP-02', nasaAnchored: true },
      { id: 'Z-4', name: 'Zone D - Swan Hill', region: 'Mallee Victoria', crop: 'Almonds', baseMoisture: 16, solarOffset: 0.27, x: 42, y: 64, recommendedPump: 'PUMP-03' },
      { id: 'Z-5', name: 'Zone E - Echuca Murray', region: 'Campaspe Basin', crop: 'Maize', baseMoisture: 31, solarOffset: -0.12, x: 64, y: 70, recommendedPump: 'PUMP-03' },
      { id: 'Z-6', name: 'Zone F - Wentworth Basin', region: 'Darling Confluence', crop: 'Citrus', baseMoisture: 19, solarOffset: 0.15, x: 40, y: 24, recommendedPump: 'PUMP-02' },
      { id: 'Z-7', name: 'Zone G - Shepparton Goulburn', region: 'Goulburn Valley', crop: 'Tomatoes', baseMoisture: 35, solarOffset: -0.18, x: 78, y: 54, recommendedPump: 'PUMP-02' },
    ],
    pumps: [
      { id: 'PUMP-01', name: 'Solar Pump #01 (Sunraysia Weir)', flowRate: '15,400 L/hr', status: 'Active', x: 24, y: 48 },
      { id: 'PUMP-02', name: 'Solar Pump #02 (Murrumbidgee Canal)', flowRate: '18,900 L/hr', status: 'Optimizing', x: 60, y: 46 },
      { id: 'PUMP-03', name: 'Solar Pump #03 (Mallee Solar Bore)', flowRate: '11,600 L/hr', status: 'Active', x: 52, y: 68 },
    ],
  },
  {
    id: 'al-ahsa',
    name: 'Al-Ahsa Oasis, Saudi Arabia',
    shortLabel: 'Al-Ahsa, SA',
    flag: '🇸🇦',
    country: 'Saudi Arabia',
    latitude: 25.3833,
    longitude: 49.5833,
    ecosystem: 'desert_oasis',
    suggestedLang: 'ar',
    optimalWindow: '07:30 - 15:30 AST',
    currency: 'USD',
    focus: {
      en: 'Desert Oasis Date Palms & Extreme Solar Yield',
      id: 'Oasis Kurma Gurun & Panen Energi Surya Ekstrem',
      ar: 'نخيل واحة الأحساء والإنتاجية الشمسية القصوى',
      pt: 'Oásis de Tamareiras no Deserto e Alto Rendimento Solar',
      es: 'Oasis de Palmeras Datileras y Máximo Rendimiento Solar',
      hi: 'रेगिस्तानी नखलिस्तान खजूर और अत्यधिक सौर उपज',
      fr: 'Palmeraie Dattière Désertique & Haut Rendement Solaire',
    },
    benchmarkBadge: {
      en: 'Desert Agrivoltaic & MENA Solar Benchmark',
      id: 'Tolok Ukur Agrivoltaik Gurun & Surya MENA',
      ar: 'معيار الطاقة الشمسية الصحراوية والزراعة في الشرق الأوسط',
      pt: 'Referência Agrivoltaica Desértica e Solar MENA',
      es: 'Referencia Agrovoltaica Desértica y Solar MENA',
      hi: 'डेजर्ट एग्रीवोल्टाइक और मेना सोलर बेंचमार्क',
      fr: 'Référence Agrivoltaïque Désertique & Solaire MENA',
    },
    zones: [
      { id: 'Z-1', name: 'Zone A - Al-Hofuf Oasis', region: 'Hofuf Central', crop: 'Date Palms', baseMoisture: 15, solarOffset: 0.24, x: 34, y: 46, recommendedPump: 'PUMP-01' },
      { id: 'Z-2', name: 'Zone B - Al-Mubarraz', region: 'Mubarraz North', crop: 'Date Palms', baseMoisture: 18, solarOffset: 0.12, x: 30, y: 26, recommendedPump: 'PUMP-01' },
      { id: 'Z-3', name: 'Zone C - Al-Oyoun North', region: 'Al-Oyoun Basin', crop: 'Wheat', baseMoisture: 13, solarOffset: 0.0, x: 56, y: 22, recommendedPump: 'PUMP-02', nasaAnchored: true },
      { id: 'Z-4', name: 'Zone D - Al-Omran East', region: 'Eastern Oasis', crop: 'Tomatoes', baseMoisture: 22, solarOffset: -0.08, x: 74, y: 44, recommendedPump: 'PUMP-02' },
      { id: 'Z-5', name: 'Zone E - Al-Jishah', region: 'East Corridor', crop: 'Citrus', baseMoisture: 17, solarOffset: 0.16, x: 78, y: 66, recommendedPump: 'PUMP-03' },
      { id: 'Z-6', name: 'Zone F - Al-Taraf', region: 'Southern Oasis', crop: 'Olives', baseMoisture: 16, solarOffset: 0.21, x: 46, y: 74, recommendedPump: 'PUMP-03' },
      { id: 'Z-7', name: 'Zone G - Al-Jafr', region: 'Al-Jafr Sector', crop: 'Date Palms', baseMoisture: 25, solarOffset: -0.05, x: 60, y: 52, recommendedPump: 'PUMP-02' },
    ],
    pumps: [
      { id: 'PUMP-01', name: 'Solar Pump #01 (Hofuf Deep Aquifer)', flowRate: '17,500 L/hr', status: 'Active', x: 32, y: 36 },
      { id: 'PUMP-02', name: 'Solar Pump #02 (Al-Oyoun Bifacial PV)', flowRate: '22,000 L/hr', status: 'Optimizing', x: 64, y: 36 },
      { id: 'PUMP-03', name: 'Solar Pump #03 (Al-Taraf Drip Grid)', flowRate: '14,200 L/hr', status: 'Active', x: 60, y: 70 },
    ],
  },
];

function formatYYYYMMDD(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

function formatReadableDate(yyyymmdd: string): string {
  if (!/^\d{8}$/.test(yyyymmdd)) return yyyymmdd;
  return `${yyyymmdd.slice(0, 4)}-${yyyymmdd.slice(4, 6)}-${yyyymmdd.slice(6, 8)}`;
}

function isValidNasaVal(val: unknown): val is number {
  return typeof val === 'number' && Number.isFinite(val) && val > -900 && val !== -999;
}

export function formatCoordinates(lat: number, lon: number): {
  latStr: string;
  lonStr: string;
  full: string;
} {
  const latDir = lat >= 0 ? 'N' : 'S';
  const lonDir = lon >= 0 ? 'E' : 'W';
  const latStr = `${lat.toFixed(4)}° ${latDir}`;
  const lonStr = `${lon.toFixed(4)}° ${lonDir}`;
  return {
    latStr,
    lonStr,
    full: `${latStr}, ${lonStr}`,
  };
}

export function buildSparklineGeometry(values: number[]): {
  pathD: string;
  lastY: number;
} {
  const safeValues = values.length > 1 ? values : [50, 50];
  const minVal = Math.min(...safeValues);
  const maxVal = Math.max(...safeValues);
  const range = Math.max(4, maxVal - minVal);

  const points = safeValues.map((val, idx) => {
    const x = Number(((idx / (safeValues.length - 1)) * 100).toFixed(1));
    const norm = (val - minVal) / range;
    const y = Number((20 - norm * 16).toFixed(1));
    return { x, y };
  });

  const pathD = points
    .map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`)
    .join(' ');

  return {
    pathD,
    lastY: points[points.length - 1]?.y ?? 12,
  };
}

export function getFallbackNasaTelemetry(
  lat = -0.0677,
  lon = 109.24,
  ecosystem: EcosystemType = 'peatland'
): NasaTelemetryState {
  const today = new Date();
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  const twoDaysAgo = new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000);
  const latestDate = formatReadableDate(formatYYYYMMDD(yesterday));
  const solarDate = formatReadableDate(formatYYYYMMDD(twoDaysAgo));

  // Pontianak reference calibrated to NASA POWER daily point sample
  const isPontianak = Math.abs(lat + 0.0677) < 0.6 && Math.abs(lon - 109.24) < 0.6;
  if (isPontianak) {
    return {
      solarMj: 18.54,
      solarKwh: 5.15,
      soilMoisturePct: 24,
      precipMm: 4.94,
      avg3DayPrecipMm: 6.49,
      tempC: 28.4,
      sevenDayMoistureTrend: [31, 30, 29, 27, 26, 25, 24],
      moistureDeltaPct: -7,
      latestDate,
      solarDate,
      tempDate: latestDate,
      source: 'fallback',
      isLoading: false,
    };
  }

  const absLat = Math.abs(lat);
  let solarKwh = 5.2;
  let soilMoisturePct = 28;
  let precipMm = 2.4;
  let avg3DayPrecipMm = 2.8;
  let tempC = 26.5;
  let trend = [34, 33, 32, 30, 29, 29, 28];

  if (ecosystem === 'desert_oasis' || (absLat >= 18 && absLat <= 31)) {
    solarKwh = Number((7.15 - Math.abs(absLat - 25) * 0.04).toFixed(2));
    soilMoisturePct = 14;
    precipMm = 0.08;
    avg3DayPrecipMm = 0.12;
    tempC = 35.8;
    trend = [19, 18, 17, 16, 15, 15, 14];
  } else if (ecosystem === 'arid_orchard' || (absLat > 31 && absLat <= 40)) {
    solarKwh = Number((6.05 - Math.abs(absLat - 35) * 0.05).toFixed(2));
    soilMoisturePct = 21;
    precipMm = 0.45;
    avg3DayPrecipMm = 0.6;
    tempC = 25.9;
    trend = [26, 25, 24, 23, 22, 22, 21];
  } else if (ecosystem === 'savanna' || (absLat >= 8 && absLat < 18)) {
    solarKwh = Number((5.85 - Math.abs(absLat - 12) * 0.03).toFixed(2));
    soilMoisturePct = 25;
    precipMm = 1.9;
    avg3DayPrecipMm = 2.3;
    tempC = 29.6;
    trend = [31, 30, 29, 28, 27, 26, 25];
  } else if (absLat > 40) {
    const latFactor = Math.max(0.35, 1 - (absLat - 40) / 50);
    solarKwh = Number((4.4 * latFactor + 1.2).toFixed(2));
    soilMoisturePct = Math.round(36 + (absLat - 40) * 0.45);
    precipMm = 3.2;
    avg3DayPrecipMm = 3.6;
    tempC = Number((19.5 - (absLat - 40) * 0.42).toFixed(1));
    trend = [
      soilMoisturePct + 2,
      soilMoisturePct + 1,
      soilMoisturePct + 2,
      soilMoisturePct + 1,
      soilMoisturePct,
      soilMoisturePct,
      soilMoisturePct,
    ];
  } else {
    // Equatorial tropics (< 8 deg)
    solarKwh = Number((5.15 - absLat * 0.03).toFixed(2));
    soilMoisturePct = 29;
    precipMm = 5.4;
    avg3DayPrecipMm = 6.1;
    tempC = 28.2;
    trend = [34, 33, 32, 31, 30, 29, 29];
  }

  return {
    solarMj: Number((solarKwh * 3.6).toFixed(2)),
    solarKwh,
    soilMoisturePct,
    precipMm,
    avg3DayPrecipMm,
    tempC,
    sevenDayMoistureTrend: trend,
    moistureDeltaPct: trend[trend.length - 1] - trend[0],
    latestDate,
    solarDate,
    tempDate: latestDate,
    source: 'fallback',
    isLoading: false,
  };
}

export async function fetchNasaPowerForCoords(
  lat: number,
  lon: number,
  ecosystem: EcosystemType = 'global_agrivoltaic',
  timeoutMs = 6500
): Promise<NasaTelemetryState> {
  const fallback = getFallbackNasaTelemetry(lat, lon, ecosystem);
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - 14 * 24 * 60 * 60 * 1000);
  const startYYYYMMDD = formatYYYYMMDD(startDate);
  const endYYYYMMDD = formatYYYYMMDD(endDate);

  const url = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=ALLSKY_SFC_SW_DWN,GWETTOP,PRECTOTCORR,T2M&community=AG&longitude=${lon.toFixed(
    4
  )}&latitude=${lat.toFixed(4)}&start=${startYYYYMMDD}&end=${endYYYYMMDD}&format=JSON`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);

    if (!res.ok) {
      return fallback;
    }

    const json = await res.json();
    const params = json?.properties?.parameter;
    if (!params) {
      return fallback;
    }

    const solarSeries: Record<string, number> = params.ALLSKY_SFC_SW_DWN ?? {};
    const wetnessSeries: Record<string, number> = params.GWETTOP ?? {};
    const precipSeries: Record<string, number> = params.PRECTOTCORR ?? {};
    const tempSeries: Record<string, number> = params.T2M ?? {};

    const sortedKeys = Array.from(
      new Set([
        ...Object.keys(solarSeries),
        ...Object.keys(wetnessSeries),
        ...Object.keys(precipSeries),
        ...Object.keys(tempSeries),
      ])
    ).sort();

    // Latest valid solar radiation (MJ/m²/day -> kWh/m²/day by / 3.6)
    let latestSolarKey = '';
    let latestSolarMj = fallback.solarMj;
    for (let i = sortedKeys.length - 1; i >= 0; i--) {
      const k = sortedKeys[i];
      const v = solarSeries[k];
      if (isValidNasaVal(v) && v >= 0) {
        latestSolarKey = k;
        latestSolarMj = v;
        break;
      }
    }

    // Valid soil wetness (GWETTOP 0..1 -> %)
    const validWetnessEntries: { key: string; pct: number }[] = [];
    for (const k of sortedKeys) {
      const v = wetnessSeries[k];
      if (isValidNasaVal(v) && v >= 0 && v <= 1.2) {
        validWetnessEntries.push({
          key: k,
          pct: Math.min(100, Math.max(1, Math.round(v * 100))),
        });
      }
    }

    // Valid precipitation (mm/day)
    const validPrecipEntries: { key: string; mm: number }[] = [];
    for (const k of sortedKeys) {
      const v = precipSeries[k];
      if (isValidNasaVal(v) && v >= 0) {
        validPrecipEntries.push({ key: k, mm: Number(v.toFixed(2)) });
      }
    }

    // Latest valid air temperature T2M (°C)
    let latestTempKey = '';
    let latestTempC = fallback.tempC;
    for (let i = sortedKeys.length - 1; i >= 0; i--) {
      const k = sortedKeys[i];
      const v = tempSeries[k];
      if (isValidNasaVal(v) && v > -80 && v < 68) {
        latestTempKey = k;
        latestTempC = Number(v.toFixed(1));
        break;
      }
    }

    // If none of the core metrics resolved to valid NASA entries, return fallback
    if (
      !latestSolarKey &&
      validWetnessEntries.length === 0 &&
      validPrecipEntries.length === 0 &&
      !latestTempKey
    ) {
      return fallback;
    }

    const lastWetness = validWetnessEntries[validWetnessEntries.length - 1];
    const sevenDayTrend =
      validWetnessEntries.length >= 2
        ? validWetnessEntries.slice(-7).map((item) => item.pct)
        : fallback.sevenDayMoistureTrend;
    const moistureDeltaPct =
      sevenDayTrend.length >= 2
        ? Number((sevenDayTrend[sevenDayTrend.length - 1] - sevenDayTrend[0]).toFixed(1))
        : 0;

    const lastPrecip = validPrecipEntries[validPrecipEntries.length - 1];
    const last3Precip = validPrecipEntries.slice(-3);
    const avg3DayPrecipMm =
      last3Precip.length > 0
        ? Number(
            (
              last3Precip.reduce((acc, item) => acc + item.mm, 0) /
              last3Precip.length
            ).toFixed(2)
          )
        : fallback.avg3DayPrecipMm;

    const solarKwh = Number((latestSolarMj / 3.6).toFixed(2));

    return {
      solarMj: Number(latestSolarMj.toFixed(2)),
      solarKwh,
      soilMoisturePct: lastWetness ? lastWetness.pct : fallback.soilMoisturePct,
      precipMm: lastPrecip ? lastPrecip.mm : fallback.precipMm,
      avg3DayPrecipMm,
      tempC: latestTempC,
      sevenDayMoistureTrend: sevenDayTrend,
      moistureDeltaPct,
      latestDate: lastWetness
        ? formatReadableDate(lastWetness.key)
        : latestSolarKey
        ? formatReadableDate(latestSolarKey)
        : fallback.latestDate,
      solarDate: latestSolarKey ? formatReadableDate(latestSolarKey) : fallback.solarDate,
      tempDate: latestTempKey ? formatReadableDate(latestTempKey) : fallback.tempDate,
      source: 'live',
      isLoading: false,
    };
  } catch {
    clearTimeout(timer);
    return fallback;
  }
}

export async function geocodeGlobalCity(
  query: string,
  timeoutMs = 6000
): Promise<GeocodedCityResult | null> {
  const trimmed = query.trim();
  if (!trimmed) return null;

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    trimmed
  )}&count=1&language=en&format=json`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) return null;

    const data = await res.json();
    const first = data?.results?.[0];
    if (!first || typeof first.latitude !== 'number' || typeof first.longitude !== 'number') {
      return null;
    }

    return {
      name: String(first.name || trimmed),
      country: String(first.country || 'Global'),
      countryCode: String(first.country_code || '').toUpperCase(),
      latitude: Number(first.latitude.toFixed(4)),
      longitude: Number(first.longitude.toFixed(4)),
      admin1: first.admin1 ? String(first.admin1) : undefined,
    };
  } catch {
    clearTimeout(timer);
    return null;
  }
}

interface ReversePointSpec {
  zoneLetter: string;
  zoneId: string;
  dLat: number;
  dLon: number;
  directionLabel: string;
  crop: string;
  baseMoisture: number;
  solarOffset: number;
  x: number;
  y: number;
  recommendedPump: string;
}

const SURROUNDING_POINTS: ReversePointSpec[] = [
  {
    zoneLetter: 'B',
    zoneId: 'Z-2',
    dLat: 0.085,
    dLon: 0.015,
    directionLabel: 'North Sector',
    crop: 'Wheat',
    baseMoisture: 24,
    solarOffset: 0.14,
    x: 48,
    y: 22,
    recommendedPump: 'PUMP-01',
  },
  {
    zoneLetter: 'C',
    zoneId: 'Z-3',
    dLat: 0.062,
    dLon: 0.105,
    directionLabel: 'Northeast Sector',
    crop: 'Maize',
    baseMoisture: 19,
    solarOffset: 0.22,
    x: 74,
    y: 30,
    recommendedPump: 'PUMP-02',
  },
  {
    zoneLetter: 'D',
    zoneId: 'Z-4',
    dLat: -0.058,
    dLon: 0.112,
    directionLabel: 'Southeast Sector',
    crop: 'Tomatoes',
    baseMoisture: 27,
    solarOffset: -0.08,
    x: 76,
    y: 66,
    recommendedPump: 'PUMP-02',
  },
  {
    zoneLetter: 'E',
    zoneId: 'Z-5',
    dLat: -0.095,
    dLon: -0.018,
    directionLabel: 'South Sector',
    crop: 'Olives',
    baseMoisture: 31,
    solarOffset: -0.14,
    x: 50,
    y: 78,
    recommendedPump: 'PUMP-03',
  },
  {
    zoneLetter: 'F',
    zoneId: 'Z-6',
    dLat: -0.065,
    dLon: -0.104,
    directionLabel: 'Southwest Sector',
    crop: 'Citrus',
    baseMoisture: 17,
    solarOffset: 0.19,
    x: 24,
    y: 68,
    recommendedPump: 'PUMP-03',
  },
  {
    zoneLetter: 'G',
    zoneId: 'Z-7',
    dLat: 0.072,
    dLon: -0.092,
    directionLabel: 'Northwest Sector',
    crop: 'Horticulture',
    baseMoisture: 35,
    solarOffset: 0.06,
    x: 22,
    y: 32,
    recommendedPump: 'PUMP-01',
  },
];

interface BigDataCloudResponse {
  locality?: string;
  city?: string;
  principalSubdivision?: string;
  countryName?: string;
  countryCode?: string;
}

async function fetchReverseGeocodePoint(
  lat: number,
  lon: number,
  timeoutMs = 4500
): Promise<BigDataCloudResponse | null> {
  const clampedLat = Math.max(-90, Math.min(90, lat));
  const clampedLon = Math.max(-180, Math.min(180, lon));
  const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${clampedLat.toFixed(
    4
  )}&longitude=${clampedLon.toFixed(4)}&localityLanguage=en`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) return null;
    return (await res.json()) as BigDataCloudResponse;
  } catch {
    clearTimeout(timer);
    return null;
  }
}

function isWaterOrGenericLabel(label: string): boolean {
  const lower = label.trim().toLowerCase();
  if (!lower) return true;
  return (
    lower.includes('ocean') ||
    lower.includes('sea') ||
    lower.includes('gulf') ||
    lower.includes('strait') ||
    lower.includes('channel') ||
    lower === 'earth'
  );
}

function inferEcosystemFromCoords(lat: number): EcosystemType {
  const absLat = Math.abs(lat);
  if (absLat < 8) return 'peatland';
  if (absLat >= 18 && absLat <= 31) return 'desert_oasis';
  if (absLat > 31 && absLat <= 40) return 'arid_orchard';
  if (absLat >= 8 && absLat < 18) return 'savanna';
  return 'global_agrivoltaic';
}

function inferSuggestedLang(countryCode: string): FullLang {
  const code = countryCode.toUpperCase();
  if (code === 'ID') return 'id';
  if (code === 'BR' || code === 'PT' || code === 'AO' || code === 'MZ') return 'pt';
  if (['SA', 'AE', 'EG', 'MA', 'JO', 'OM', 'QA', 'KW', 'BH', 'IQ', 'TN', 'DZ'].includes(code)) {
    return 'ar';
  }
  if (['ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'EC', 'VE'].includes(code)) return 'es';
  if (code === 'IN') return 'hi';
  if (['FR', 'SN', 'CI', 'MA', 'CM', 'BE'].includes(code)) return 'fr';
  return 'en';
}

function countryCodeToFlag(countryCode: string): string {
  const clean = countryCode.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(clean)) return '🌍';
  return String.fromCodePoint(
    ...Array.from(clean).map((char) => 127397 + char.charCodeAt(0))
  );
}

function selectCropsForEcosystem(ecosystem: EcosystemType): string[] {
  switch (ecosystem) {
    case 'desert_oasis':
      return ['Date Palms', 'Wheat', 'Tomatoes', 'Olives', 'Citrus', 'Maize', 'Horticulture'];
    case 'arid_orchard':
      return ['Almonds', 'Pistachios', 'Citrus', 'Grapes', 'Tomatoes', 'Olives', 'Maize'];
    case 'savanna':
      return ['Soybeans', 'Maize', 'Cotton', 'Tomatoes', 'Wheat', 'Horticulture', 'Rice'];
    case 'peatland':
      return ['Maize', 'Chili & Leafy Greens', 'Tomatoes', 'Horticulture', 'Rice', 'Wheat', 'Olives'];
    default:
      return ['Wheat', 'Maize', 'Tomatoes', 'Olives', 'Soybeans', 'Horticulture', 'Citrus'];
  }
}

export function createCustomGlobalLocation(params: {
  cityLabel: string;
  country: string;
  countryCode?: string;
  latitude: number;
  longitude: number;
  centerDistrictName?: string;
  surroundingDistrictNames?: string[];
}): GlobalLocationPreset {
  const {
    cityLabel,
    country,
    countryCode = '',
    latitude,
    longitude,
    centerDistrictName,
    surroundingDistrictNames,
  } = params;

  const ecosystem = inferEcosystemFromCoords(latitude);
  const suggestedLang = inferSuggestedLang(countryCode);
  const flag = countryCode ? countryCodeToFlag(countryCode) : '🌍';
  const crops = selectCropsForEcosystem(ecosystem);
  const fullDisplay =
    country && country !== 'Global Coordinate' && !cityLabel.includes(country)
      ? `${cityLabel}, ${country}`
      : cityLabel;

  const centerZoneName = `Zone A - ${centerDistrictName || `${cityLabel} Central`}`;

  const surroundingZones: ZoneConfig[] = SURROUNDING_POINTS.map((spec, idx) => {
    const districtLabel =
      surroundingDistrictNames?.[idx] || `${cityLabel} ${spec.directionLabel}`;
    return {
      id: spec.zoneId,
      name: `Zone ${spec.zoneLetter} - ${districtLabel}`,
      region: districtLabel,
      crop: crops[(idx + 1) % crops.length],
      baseMoisture: spec.baseMoisture,
      solarOffset: spec.solarOffset,
      x: spec.x,
      y: spec.y,
      recommendedPump: spec.recommendedPump,
      nasaAnchored: idx === 1,
    };
  });

  const zones: ZoneConfig[] = [
    {
      id: 'Z-1',
      name: centerZoneName,
      region: centerDistrictName || cityLabel,
      crop: crops[0],
      baseMoisture: ecosystem === 'desert_oasis' ? 15 : 22,
      solarOffset: 0.0,
      x: 50,
      y: 48,
      recommendedPump: 'PUMP-01',
      nasaAnchored: true,
    },
    ...surroundingZones,
  ];

  return {
    id: `custom-${latitude.toFixed(2)}-${longitude.toFixed(2)}`,
    name: fullDisplay,
    shortLabel: cityLabel.length > 20 ? `${cityLabel.slice(0, 18)}…` : cityLabel,
    flag,
    country,
    latitude,
    longitude,
    ecosystem,
    suggestedLang,
    optimalWindow: '08:30 - 14:30 Local',
    currency: countryCode === 'ID' ? 'IDR' : 'USD',
    focus: {
      en: `Live Global Telemetry & Agrivoltaic Sizing (${fullDisplay})`,
      id: `Telemetri Satelit Global & Sizing Agrivoltaik (${fullDisplay})`,
      ar: `القياس الفضائي المباشر وتقدير الطاقة الشمسية (${fullDisplay})`,
      pt: `Telemetria Satelital Global e Dimensionamento Solar (${fullDisplay})`,
      es: `Telemetría Satelital Global y Dimensionamiento Solar (${fullDisplay})`,
      hi: `लाइव वैश्विक उपग्रह टेलीमेट्री और एग्रीवोल्टाइक साइजिंग (${fullDisplay})`,
      fr: `Télémétrie Satellitaire Globale & Dimensionnement Solaire (${fullDisplay})`,
    },
    benchmarkBadge: {
      en: 'Live NASA POWER Global Agrivoltaic Node',
      id: 'Simpul Agrivoltaik Global NASA POWER Live',
      ar: 'عقدة ناسا باور العالمية المباشرة للزراعة الشمسية',
      pt: 'Nó Agrivoltaico Global NASA POWER ao Vivo',
      es: 'Nodo Agrovoltaico Global NASA POWER en Vivo',
      hi: 'लाइव नासा पावर वैश्विक एग्रीवोल्टाइक नोड',
      fr: 'Nœud Agrivoltaïque Mondial NASA POWER en Direct',
    },
    zones,
    pumps: [
      { id: 'PUMP-01', name: `Solar Pump #01 (${cityLabel} Core)`, flowRate: '14,500 L/hr', status: 'Active', x: 42, y: 42 },
      { id: 'PUMP-02', name: `Solar Pump #02 (${cityLabel} East)`, flowRate: '18,000 L/hr', status: 'Optimizing', x: 66, y: 46 },
      { id: 'PUMP-03', name: `Solar Pump #03 (${cityLabel} South)`, flowRate: '12,400 L/hr', status: 'Standby', x: 38, y: 70 },
    ],
  };
}

export async function resolveCustomGlobalLocation(params: {
  cityLabel?: string;
  country?: string;
  countryCode?: string;
  latitude: number;
  longitude: number;
}): Promise<GlobalLocationPreset> {
  const { latitude, longitude } = params;

  // Fetch center + 6 surrounding points (±0.05° to ±0.12°) in parallel via BigDataCloud
  const [centerGeo, ...surroundingGeos] = await Promise.all([
    fetchReverseGeocodePoint(latitude, longitude),
    ...SURROUNDING_POINTS.map((pt) =>
      fetchReverseGeocodePoint(latitude + pt.dLat, longitude + pt.dLon)
    ),
  ]);

  const resolvedCity =
    params.cityLabel ||
    centerGeo?.city ||
    centerGeo?.locality ||
    centerGeo?.principalSubdivision ||
    `${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`;

  const resolvedCountry =
    params.country || centerGeo?.countryName || 'Global Coordinate';
  const resolvedCountryCode =
    params.countryCode || centerGeo?.countryCode || '';

  const centerRaw =
    centerGeo?.locality || centerGeo?.city || centerGeo?.principalSubdivision || '';
  const centerDistrictName = !isWaterOrGenericLabel(centerRaw)
    ? centerRaw
    : `${resolvedCity} Central`;

  const usedNames = new Set<string>([centerDistrictName.toLowerCase()]);

  const surroundingDistrictNames = SURROUNDING_POINTS.map((pt, idx) => {
    const geo = surroundingGeos[idx];
    const candidates = [geo?.locality, geo?.city, geo?.principalSubdivision].filter(
      (c): c is string => Boolean(c && !isWaterOrGenericLabel(c))
    );

    let chosen = candidates.find((c) => !usedNames.has(c.toLowerCase()));
    if (!chosen && candidates.length > 0) {
      chosen = `${candidates[0]} (${pt.directionLabel.replace(' Sector', '')})`;
    }
    if (!chosen) {
      chosen = `${resolvedCity} ${pt.directionLabel}`;
    }

    usedNames.add(chosen.toLowerCase());
    return chosen;
  });

  return createCustomGlobalLocation({
    cityLabel: resolvedCity,
    country: resolvedCountry,
    countryCode: resolvedCountryCode,
    latitude,
    longitude,
    centerDistrictName,
    surroundingDistrictNames,
  });
}
