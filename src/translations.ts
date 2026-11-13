import { EcosystemType, FullLang } from './services/nasaPower';

export type { FullLang } from './services/nasaPower';
export type Lang = FullLang;
export type AdvisorPromptId = 'schedule' | 'peatland' | 'roi';

export interface WorldLanguageOption {
  code: string;
  shortCode: string;
  nativeName: string;
  englishName: string;
  dir: 'ltr' | 'rtl';
  dictLang: FullLang;
  hasFullDictionary: boolean;
}

export const WORLD_LANGUAGES: WorldLanguageOption[] = [
  { code: 'en', shortCode: 'EN', nativeName: 'English', englishName: 'English', dir: 'ltr', dictLang: 'en', hasFullDictionary: true },
  { code: 'id', shortCode: 'ID', nativeName: 'Bahasa Indonesia', englishName: 'Indonesian', dir: 'ltr', dictLang: 'id', hasFullDictionary: true },
  { code: 'ar', shortCode: 'AR', nativeName: 'العربية', englishName: 'Arabic', dir: 'rtl', dictLang: 'ar', hasFullDictionary: true },
  { code: 'pt', shortCode: 'PT', nativeName: 'Português', englishName: 'Portuguese', dir: 'ltr', dictLang: 'pt', hasFullDictionary: true },
  { code: 'es', shortCode: 'ES', nativeName: 'Español', englishName: 'Spanish', dir: 'ltr', dictLang: 'es', hasFullDictionary: true },
  { code: 'hi', shortCode: 'HI', nativeName: 'हिन्दी', englishName: 'Hindi', dir: 'ltr', dictLang: 'hi', hasFullDictionary: true },
  { code: 'fr', shortCode: 'FR', nativeName: 'Français', englishName: 'French', dir: 'ltr', dictLang: 'fr', hasFullDictionary: true },
  // 17 additional searchable world languages
  { code: 'de', shortCode: 'DE', nativeName: 'Deutsch', englishName: 'German', dir: 'ltr', dictLang: 'en', hasFullDictionary: false },
  { code: 'zh', shortCode: 'ZH', nativeName: '中文', englishName: 'Chinese (Mandarin)', dir: 'ltr', dictLang: 'en', hasFullDictionary: false },
  { code: 'ja', shortCode: 'JA', nativeName: '日本語', englishName: 'Japanese', dir: 'ltr', dictLang: 'en', hasFullDictionary: false },
  { code: 'ko', shortCode: 'KO', nativeName: '한국어', englishName: 'Korean', dir: 'ltr', dictLang: 'en', hasFullDictionary: false },
  { code: 'tr', shortCode: 'TR', nativeName: 'Türkçe', englishName: 'Turkish', dir: 'ltr', dictLang: 'en', hasFullDictionary: false },
  { code: 'sw', shortCode: 'SW', nativeName: 'Kiswahili', englishName: 'Swahili', dir: 'ltr', dictLang: 'en', hasFullDictionary: false },
  { code: 'vi', shortCode: 'VI', nativeName: 'Tiếng Việt', englishName: 'Vietnamese', dir: 'ltr', dictLang: 'en', hasFullDictionary: false },
  { code: 'th', shortCode: 'TH', nativeName: 'ไทย', englishName: 'Thai', dir: 'ltr', dictLang: 'en', hasFullDictionary: false },
  { code: 'bn', shortCode: 'BN', nativeName: 'বাংলা', englishName: 'Bengali', dir: 'ltr', dictLang: 'en', hasFullDictionary: false },
  { code: 'ur', shortCode: 'UR', nativeName: 'اردو', englishName: 'Urdu', dir: 'rtl', dictLang: 'ar', hasFullDictionary: false },
  { code: 'ru', shortCode: 'RU', nativeName: 'Русский', englishName: 'Russian', dir: 'ltr', dictLang: 'en', hasFullDictionary: false },
  { code: 'it', shortCode: 'IT', nativeName: 'Italiano', englishName: 'Italian', dir: 'ltr', dictLang: 'en', hasFullDictionary: false },
  { code: 'nl', shortCode: 'NL', nativeName: 'Nederlands', englishName: 'Dutch', dir: 'ltr', dictLang: 'en', hasFullDictionary: false },
  { code: 'pl', shortCode: 'PL', nativeName: 'Polski', englishName: 'Polish', dir: 'ltr', dictLang: 'en', hasFullDictionary: false },
  { code: 'ms', shortCode: 'MS', nativeName: 'Bahasa Melayu', englishName: 'Malay', dir: 'ltr', dictLang: 'id', hasFullDictionary: false },
  { code: 'tl', shortCode: 'TL', nativeName: 'Filipino', englishName: 'Tagalog', dir: 'ltr', dictLang: 'en', hasFullDictionary: false },
  { code: 'ha', shortCode: 'HA', nativeName: 'Hausa', englishName: 'Hausa', dir: 'ltr', dictLang: 'en', hasFullDictionary: false },
];

export function getWorldLanguageOption(code: string): WorldLanguageOption {
  return WORLD_LANGUAGES.find((item) => item.code === code) ?? WORLD_LANGUAGES[0];
}

export function getNumberLocale(lang: FullLang): string {
  switch (lang) {
    case 'id':
      return 'id-ID';
    case 'ar':
      return 'ar-EG';
    case 'pt':
      return 'pt-BR';
    case 'es':
      return 'es-ES';
    case 'hi':
      return 'hi-IN';
    case 'fr':
      return 'fr-FR';
    default:
      return 'en-US';
  }
}

export interface TranslationDictionary {
  header: {
    subtitle: string;
    langSwitcherLabel: string;
    langSearchPlaceholder: string;
    langFullLabel: string;
    langFallbackNote: string;
    langNoMatch: string;
    tabs: {
      macro: string;
      ops: string;
      feasibility: string;
    };
    mobileTabs: {
      macro: string;
      ops: string;
      feasibility: string;
    };
    telemetry: {
      syncing: string;
      live: string;
      ready: string;
      sourceLive: string;
      sourceFallback: string;
      solarDate: string;
      moistureDate: string;
    };
    themeTooltip: {
      toLight: string;
      toDark: string;
    };
  };
  tab1: {
    title: string;
    subtitle: string;
    mobileFilterBtn: string;
    zonesWord: string;
    filteredBadge: string;
    filtersTitle: string;
    resetFilters: string;
    targetRegionLabel: string;
    allRegionsOption: string;
    stapleCropLabel: string;
    allCropsOption: string;
    severityLabel: string;
    severities: {
      All: string;
      Severe: string;
      Moderate: string;
      Mild: string;
    };
    crops: Record<string, string>;
    mapLegendTitle: string;
    legendSevere: string;
    legendModerate: string;
    legendMild: string;
    legendPump: string;
    globalExplorer: {
      title: string;
      subtitle: string;
      cityPlaceholder: string;
      latLabel: string;
      lonLabel: string;
      fetchBtn: string;
      fetchingBtn: string;
      presetsLabel: string;
      syncLangBtn: string;
      liveSourceBadge: string;
      fallbackSourceBadge: string;
      districtsPrefix: string;
      geocodeError: string;
      invalidCoordsError: string;
      langNames: Record<FullLang, string>;
    };
    simulator: {
      title: string;
      simActive: string;
      liveBaseline: string;
      resetBtn: string;
      rainfallLabel: string;
      solarLabel: string;
      extremeDry: string;
    };
    map: {
      resolutionLabel: string;
      resolutionValue: string;
      pumpCapPrefix: string;
      pumpStatuses: {
        Active: string;
        Standby: string;
        Optimizing: string;
      };
      interactiveHint: string;
      showAllPrefix: string;
    };
    districtsStrip: {
      title: string;
    };
    priorityBanner: {
      title: string;
      pumpSitePrefix: string;
      criticalMoistureText: string;
      recordsText: string;
      macroWetnessText: string;
    };
    telemetryPanel: {
      title: string;
      droughtSuffix: string;
      plantationSuffix: string;
      smapMoisture: string;
      criticalDry: string;
      moderate: string;
      humidOptimal: string;
      volumetricDepth: string;
      sevenDayTrend: string;
      deficit: string;
      gain: string;
      nasaRadiance: string;
      strong: string;
      moderateSolar: string;
      solarPumpYield: string;
      capacityUnit: string;
      surfaceTempLabel: string;
    };
    peatland: {
      eyebrow: string;
      moisturePrefix: string;
      sendWarningBtn: string;
      confirmedTitle: string;
      confirmedBodyPrefix: string;
    };
    solarSizing: {
      eyebrow: string;
      title: string;
      arraySizeLabel: string;
      panelUnit: string;
      dailyWaterLabel: string;
      dailyWaterUnit: string;
      dailyEnergyUnit: string;
      monthlySavingsLabel: string;
      vsDiesel: string;
      saveFuelPrefix: string;
      saveFuelSuffix: string;
    };
    advisor: {
      eyebrow: string;
      title: string;
      liveBriefPrefix: string;
      quickPromptsTitle: string;
      analyzingPrefix: string;
      prompts: {
        schedule: string;
        peatland: string;
        roi: string;
      };
    };
  };
  tab2: {
    bannerTitle: string;
    bannerSubtitle: string;
    telemetryOk: string;
    kpis: {
      solarOutput: string;
      solarSub: string;
      pumpCapacity: string;
      pumpSub: string;
      waterReserve: string;
      waterSub: string;
      rain3Day: string;
      rainLatestPrefix: string;
      rainOptimalSolar: string;
      rainActiveRecharge: string;
      yieldSaved: string;
      yieldSub: string;
    };
    heatmap: {
      title: string;
      subtitle: string;
      scaleLabel: string;
      reRunBtn: string;
      pumpingActive: string;
      resetDemoBtn: string;
      plotPrefix: string;
      legend: {
        severe: string;
        high: string;
        moderate: string;
        low: string;
        hydrated: string;
      };
      cellLabels: {
        hydrated: string;
        severe: string;
        high: string;
        moderate: string;
        low: string;
      };
    };
    vfd: {
      affinityLawPrefix: string;
      title: string;
      subtitle: string;
      sourcePlotArray: string;
      autoSyncOn: string;
      autoSyncOff: string;
      liveRootMoisturePrefix: string;
      criticalWord: string;
      hydratedWord: string;
      zoneTelemetryPrefix: string;
      meanArrayPrefix: string;
      suggestedAdjustment: string;
      optimalSynced: string;
      rampDown: string;
      rampUp: string;
      activeInverterSpeed: string;
      targetPrefix: string;
      recommendedTooltipPrefix: string;
      manualSliderLabel: string;
      nominalRpmSuffix: string;
      syncedBtn: string;
      applyBtnPrefix: string;
      kpiSuggestedSpeed: string;
      kpiAdjustedFlow: string;
      kpiVsActivePrefix: string;
      kpiVsActiveSuffix: string;
      kpiInverterLoad: string;
      kpiVsCurrentSuffix: string;
      kpiBaseline50Hz: string;
      kpiEnergySaved: string;
      kpiToBatterySuffix: string;
    };
    allocation: {
      title: string;
      subtitle: string;
    };
    forecast: {
      title: string;
      subtitlePrefix: string;
      subtitleMiddle: string;
      subtitleSuffix: string;
      estTotal: string;
      peakLabel: string;
    };
  };
  tab3: {
    rankBadge: string;
    siteCodePrefix: string;
    siteTitleSuffix: string;
    siteSubtitlePrefix: string;
    suitabilityScore: string;
    tierGrade: string;
    confidencePrefix: string;
    metrics: { label: string; val: string; sub: string }[];
    reasoningTitle: string;
    confidenceBadgePrefix: string;
    reasons: {
      title: string;
      bodyBefore?: string;
      bodyAfter?: string;
      body?: string;
    }[];
    riskTitle: string;
    riskBodyBefore: string;
    riskBodyHighlight: string;
    riskBodyAfter: string;
    weightsTitle: string;
    weightsSubtitle: string;
    weights: string[];
    solarProfileTitle: string;
    solarProfileSubtitle: string;
    solarMaxBadge: string;
    solarPeakZen: string;
    irradianceMonthlyTitle: string;
    irradianceMonthlySubtitle: string;
    irradianceAvgBadge: string;
    months: string[];
  };
  footer: {
    brandLine: string;
    resolution: string;
    iec: string;
    vfdProtocol: string;
  };
  toast: {
    title: string;
    bodyPrefix: string;
    bodyMiddle: string;
  };
  whatsappPreview: {
    botName: string;
    onlineStatus: string;
    previewTag: string;
    todayLabel: string;
    copyBtn: string;
    copiedBtn: string;
    closeBtn: string;
  };
}

const SHARED_CROPS_EN: Record<string, string> = {
  Maize: 'Maize',
  Wheat: 'Wheat',
  Tomatoes: 'Tomatoes',
  Olives: 'Olives',
  Almonds: 'Almonds',
  Pistachios: 'Pistachios',
  Soybeans: 'Soybeans',
  Cotton: 'Cotton',
  Citrus: 'Citrus',
  'Date Palms': 'Date Palms',
  Grapes: 'Grapes',
  Rice: 'Rice',
  Horticulture: 'Horticulture',
  'Chili & Leafy Greens': 'Chili & Leafy Greens',
};

export const TRANSLATIONS: Record<FullLang, TranslationDictionary> = {
  en: {
    header: {
      subtitle: 'Global Agrivoltaic & Satellite Solar Irrigation Command',
      langSwitcherLabel: 'Language selector',
      langSearchPlaceholder: 'Search language...',
      langFullLabel: 'Full UI',
      langFallbackNote: 'Localized alerts + EN interface',
      langNoMatch: 'No matching language',
      tabs: {
        macro: 'Drought & Pump Map',
        ops: 'Precision Irrigation Ops',
        feasibility: 'Site Intelligence',
      },
      mobileTabs: {
        macro: 'Drought Map',
        ops: 'Operations',
        feasibility: 'Site Intel',
      },
      telemetry: {
        syncing: 'Syncing NASA POWER...',
        live: 'NASA POWER Live',
        ready: 'NASA POWER Ready',
        sourceLive: 'Live NASA POWER API',
        sourceFallback: 'NASA POWER Calibrated Fallback',
        solarDate: 'Solar',
        moistureDate: 'Moisture',
      },
      themeTooltip: {
        toLight: 'Switch to Light Mode',
        toDark: 'Switch to Dark Mode',
      },
    },
    tab1: {
      title: 'Global Drought Stress & Solar Pump Monitoring',
      subtitle: 'Planetary NASA POWER satellite telemetry, real district detection, and automated VFD pump dispatch',
      mobileFilterBtn: 'Filters & Legend',
      zonesWord: 'Zones',
      filteredBadge: 'Filtered',
      filtersTitle: 'Telemetry Filters',
      resetFilters: 'Reset',
      targetRegionLabel: 'Target Sub-Region',
      allRegionsOption: 'All Regions',
      stapleCropLabel: 'Crop / Commodity',
      allCropsOption: 'All Crops',
      severityLabel: 'Drought Severity',
      severities: {
        All: 'All',
        Severe: 'Severe',
        Moderate: 'Moderate',
        Mild: 'Mild',
      },
      crops: SHARED_CROPS_EN,
      mapLegendTitle: 'Map Legend',
      legendSevere: 'Severe Stress (< 20%)',
      legendModerate: 'Moderate Stress (20-29%)',
      legendMild: 'Mild / Optimal (>= 30%)',
      legendPump: 'Solar Pump Station',
      globalExplorer: {
        title: 'Global Satellite Coordinate & City Explorer',
        subtitle: 'Select a NASA partner benchmark or enter any city / GPS coordinates worldwide for live NASA POWER & real district names',
        cityPlaceholder: 'Search any city worldwide (e.g., Nairobi, Jaipur, Seville, Mendoza)...',
        latLabel: 'LAT',
        lonLabel: 'LON',
        fetchBtn: 'Fetch NASA Satellite Data',
        fetchingBtn: 'Syncing Satellite...',
        presetsLabel: 'Benchmarks:',
        syncLangBtn: 'Sync Language to Region',
        liveSourceBadge: 'LIVE NASA POWER API',
        fallbackSourceBadge: 'LATITUDE CALIBRATED FALLBACK',
        districtsPrefix: 'Districts',
        geocodeError: 'City not found. Try a larger nearby city or enter latitude/longitude directly.',
        invalidCoordsError: 'Please enter valid coordinates (Latitude -90 to 90, Longitude -180 to 180).',
        langNames: {
          en: 'English',
          id: 'Bahasa Indonesia',
          ar: 'العربية',
          pt: 'Português',
          es: 'Español',
          hi: 'हिन्दी',
          fr: 'Français',
        },
      },
      simulator: {
        title: 'What-If Extreme Weather Simulator',
        simActive: 'Simulation Active',
        liveBaseline: 'Live NASA Baseline',
        resetBtn: 'Reset to Live NASA Data',
        rainfallLabel: 'Simulated Daily Rainfall',
        solarLabel: 'Simulated Solar Irradiance',
        extremeDry: '0 mm (Extreme Drought)',
      },
      map: {
        resolutionLabel: 'Spatial Res:',
        resolutionValue: 'NASA SMAP / POWER 0.5°',
        pumpCapPrefix: 'Cap:',
        pumpStatuses: {
          Active: 'Active',
          Standby: 'Standby',
          Optimizing: 'Optimizing',
        },
        interactiveHint: 'Click any zone marker to inspect telemetry & solar sizing',
        showAllPrefix: 'Show All',
      },
      districtsStrip: {
        title: 'Pontianak District Telemetry',
      },
      priorityBanner: {
        title: 'AI Solar Pump Dispatch Priority',
        pumpSitePrefix: 'Priority Site:',
        criticalMoistureText: 'critical soil moisture',
        recordsText: 'records',
        macroWetnessText: 'basin soil wetness',
      },
      telemetryPanel: {
        title: 'Zone Telemetry',
        droughtSuffix: 'Drought',
        plantationSuffix: 'Plot',
        smapMoisture: 'Soil Moisture (GWETTOP)',
        criticalDry: 'Critical Dry',
        moderate: 'Moderate',
        humidOptimal: 'Optimal',
        volumetricDepth: 'Surface root zone',
        sevenDayTrend: '7-Day Moisture Trend',
        deficit: 'deficit',
        gain: 'gain',
        nasaRadiance: 'Solar Radiation',
        strong: 'High Yield',
        moderateSolar: 'Moderate',
        solarPumpYield: 'Solar Pump Capacity',
        capacityUnit: 'Bars',
        surfaceTempLabel: 'Surface Air Temp (T2M)',
      },
      peatland: {
        eyebrow: 'Ecosystem Early Warning',
        moisturePrefix: 'Soil moisture',
        sendWarningBtn: 'Send Farmer WhatsApp/SMS Early Warning',
        confirmedTitle: 'Alert Dispatched',
        confirmedBodyPrefix: 'WhatsApp/SMS warning queued for farmers in',
      },
      solarSizing: {
        eyebrow: 'Smart PV Engineering',
        title: 'Solar Pump Sizing & Fuel Savings',
        arraySizeLabel: 'Recommended Solar Array',
        panelUnit: '550Wp Panels',
        dailyWaterLabel: 'Est. Daily Water Pumped',
        dailyWaterUnit: 'L/day',
        dailyEnergyUnit: 'kWh/day',
        monthlySavingsLabel: 'Est. Monthly Fuel Savings',
        vsDiesel: 'vs Diesel Pump',
        saveFuelPrefix: 'Displaces',
        saveFuelSuffix: 'L diesel / month',
      },
      advisor: {
        eyebrow: 'Zero-API Telemetry Engine',
        title: 'SOLVARA AI Agronomist Advisor',
        liveBriefPrefix: 'LIVE BRIEF',
        quickPromptsTitle: 'Quick Agronomist Prompts',
        analyzingPrefix: 'Analyzing NASA telemetry for',
        prompts: {
          schedule: 'Best irrigation schedule today?',
          peatland: 'Ecosystem stress & mitigation plan?',
          roi: 'Diesel vs Solar pump ROI?',
        },
      },
    },
    tab2: {
      bannerTitle: 'AUTONOMOUS SOLAR VFD PUMP DISPATCH ONLINE',
      bannerSubtitle: 'Closed-loop MPPT + Variable Frequency Drive modulation synchronized with NASA POWER',
      telemetryOk: 'TELEMETRY NOMINAL',
      kpis: {
        solarOutput: 'PV Array Output',
        solarSub: 'MPPT Tracking 98.6%',
        pumpCapacity: 'Pump Flow Rate',
        pumpSub: 'Variable Speed VFD',
        waterReserve: 'Buffer Tank Reserve',
        waterSub: '20,000 L Reservoir',
        rain3Day: '3-Day Avg Rain',
        rainLatestPrefix: 'Latest:',
        rainOptimalSolar: 'Optimal Solar',
        rainActiveRecharge: 'Active Recharge',
        yieldSaved: 'Crop Yield Protected',
        yieldSub: 'Preventing wilting loss',
      },
      heatmap: {
        title: '140-Plot Field Moisture Matrix & Emergency Ripple',
        subtitle: 'Simulate radial solar-powered drip hydration across stressed plots',
        scaleLabel: 'SCALE:',
        reRunBtn: 'Run Emergency Solar Irrigation',
        pumpingActive: 'Hydration Wave Active',
        resetDemoBtn: 'Reset Field Stress',
        plotPrefix: 'Plot #',
        legend: {
          severe: 'Severe',
          high: 'High Stress',
          moderate: 'Moderate',
          low: 'Low Stress',
          hydrated: 'Hydrated',
        },
        cellLabels: {
          hydrated: 'Hydrated (Optimal)',
          severe: 'Severe Stress (<15%)',
          high: 'High Stress (15-25%)',
          moderate: 'Moderate Stress (25-40%)',
          low: 'Low Stress (40-60%)',
        },
      },
      vfd: {
        affinityLawPrefix: 'Affinity Law: P ∝ N³',
        title: 'VFD Efficiency Optimizer',
        subtitle: 'Modulate centrifugal pump RPM dynamically based on live root-zone moisture',
        sourcePlotArray: 'Field Matrix',
        autoSyncOn: 'Auto-Sync ON',
        autoSyncOff: 'Auto-Sync OFF',
        liveRootMoisturePrefix: 'Effective Root Moisture',
        criticalWord: 'critical',
        hydratedWord: 'hydrated',
        zoneTelemetryPrefix: 'Zone Telemetry',
        meanArrayPrefix: 'Mean array:',
        suggestedAdjustment: 'Suggested Delta',
        optimalSynced: 'Optimal Synced',
        rampDown: 'Ramp Down',
        rampUp: 'Ramp Up',
        activeInverterSpeed: 'Active Inverter Speed:',
        targetPrefix: 'Target:',
        recommendedTooltipPrefix: 'Optimal target:',
        manualSliderLabel: 'Manual Frequency Override (20 - 50 Hz)',
        nominalRpmSuffix: 'Nominal RPM',
        syncedBtn: 'Inverter Synced',
        applyBtnPrefix: 'Apply',
        kpiSuggestedSpeed: 'Target VFD Speed',
        kpiAdjustedFlow: 'Adjusted Flow Rate',
        kpiVsActivePrefix: 'vs',
        kpiVsActiveSuffix: 'active',
        kpiInverterLoad: 'Inverter Load',
        kpiVsCurrentSuffix: 'kW saved',
        kpiBaseline50Hz: 'Full 50 Hz baseline',
        kpiEnergySaved: 'Energy Saved',
        kpiToBatterySuffix: 'kWh/day saved',
      },
      allocation: {
        title: 'Solar Dispatch Allocation',
        subtitle: 'Real-time PV power split across top priority district zones',
      },
      forecast: {
        title: 'Water Output · 24H Solar Forecast',
        subtitlePrefix: 'Peak pumping window',
        subtitleMiddle: '10:00 - 14:30',
        subtitleSuffix: 'aligned with peak irradiance',
        estTotal: 'Est. 114,500 L/day',
        peakLabel: '12h (Peak)',
      },
    },
    tab3: {
      rankBadge: 'RANK #1 AGRIVOLTAIC SITE',
      siteCodePrefix: 'SITE CODE:',
      siteTitleSuffix: 'Agrivoltaic Feasibility Dossier',
      siteSubtitlePrefix: 'Multi-criteria spatial intelligence anchored to live NASA POWER telemetry at',
      suitabilityScore: 'Suitability Score',
      tierGrade: 'Tier-A Prime',
      confidencePrefix: 'Confidence',
      metrics: [
        { label: 'PV Capacity', val: '120 kWp', sub: 'Bifacial elevated' },
        { label: 'Annual Yield', val: '198 MWh', sub: 'PR 81.4%' },
        { label: 'Water Lift', val: '145 m³/day', sub: '18m TDH head' },
        { label: 'Capex Est.', val: '$108K', sub: 'Turnkey + VFD' },
        { label: 'Payback', val: '3.4 Yrs', sub: 'Diesel displaced' },
        { label: 'CO₂ Offset', val: '142 t/yr', sub: 'Verified Tier-1' },
        { label: 'Crop Shade', val: '+18%', sub: 'Microclimate gain' },
      ],
      reasoningTitle: 'AI Spatial & Agronomic Reasoning',
      confidenceBadgePrefix: 'Model Confidence',
      reasons: [
        {
          title: 'Solar Resource Verification:',
          bodyBefore: 'NASA POWER surface shortwave irradiance averages',
          bodyAfter: 'providing high capacity factor for daytime VFD pumping without deep battery cycling.',
        },
        {
          title: 'Root-Zone Deficit Mitigation:',
          body: 'Elevated 3.2m agrivoltaic racking reduces topsoil evapotranspiration by 18–24% during midday thermal peaks.',
        },
        {
          title: 'Zero-Diesel Hydraulic Economics:',
          body: 'Direct DC-coupled VFD pumping eliminates fuel transport logistics and stabilizes smallholder irrigation margins.',
        },
      ],
      riskTitle: 'Site Risk Mitigation Note',
      riskBodyBefore: 'Seasonal cloud cover or extreme heat spikes can shift peak pump duty cycles. Pair',
      riskBodyHighlight: '20,000 L gravity buffer storage',
      riskBodyAfter: 'with automated WhatsApp drought dispatch to bridge multi-day cloud events.',
      weightsTitle: 'MCDA Criteria Weights',
      weightsSubtitle: 'Weighted spatial scoring framework for site ranking',
      weights: [
        'Solar Irradiance (NASA POWER)',
        'Soil Moisture Deficit Urgency',
        'Aquifer / Canal Proximity',
        'Crop Shade Synergy',
        'Grid & Diesel Displacement ROI',
      ],
      solarProfileTitle: '24H Solar Generation Curve',
      solarProfileSubtitle: 'Hourly PV array power output profile',
      solarMaxBadge: 'Peak 98.4 kW',
      solarPeakZen: '12:15 (Zenith)',
      irradianceMonthlyTitle: '12-Month Irradiance Profile',
      irradianceMonthlySubtitle: 'Historical kWh/m²/day seasonal distribution',
      irradianceAvgBadge: 'Avg 6.08 kWh/m²',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    footer: {
      brandLine: 'SOLVARA Planetary Agrivoltaics • NASA POWER & SMAP Telemetry Suite',
      resolution: '0.5° × 0.625° NASA POWER Grid',
      iec: 'IEC 61724 PV Performance',
      vfdProtocol: 'Modbus VFD Affinity Control',
    },
    toast: {
      title: 'Farmer Early Warning Dispatched',
      bodyPrefix: 'WhatsApp/SMS alert sent to farmers in',
      bodyMiddle: 'for',
    },
    whatsappPreview: {
      botName: 'SOLVARA Sat-Alert Bot',
      onlineStatus: 'Online',
      previewTag: 'Farmer Mobile Preview',
      todayLabel: 'TODAY',
      copyBtn: 'Copy Message',
      copiedBtn: 'Copied!',
      closeBtn: 'Close',
    },
  },
  id: {
    header: {
      subtitle: 'Pusat Komando Agrivoltaik & Irigasi Surya Satelit Global',
      langSwitcherLabel: 'Pemilih bahasa',
      langSearchPlaceholder: 'Cari bahasa...',
      langFullLabel: 'UI Lengkap',
      langFallbackNote: 'Notifikasi lokal + antarmuka EN',
      langNoMatch: 'Bahasa tidak ditemukan',
      tabs: {
        macro: 'Peta Kekeringan & Pompa',
        ops: 'Operasi Irigasi Presisi',
        feasibility: 'Intelijen Lahan',
      },
      mobileTabs: {
        macro: 'Peta Kekeringan',
        ops: 'Operasi Pompa',
        feasibility: 'Intelijen Lahan',
      },
      telemetry: {
        syncing: 'Sinkronisasi NASA POWER...',
        live: 'NASA POWER Live',
        ready: 'NASA POWER Siap',
        sourceLive: 'API NASA POWER Langsung',
        sourceFallback: 'Data Kalibrasi NASA POWER',
        solarDate: 'Surya',
        moistureDate: 'Kelembapan',
      },
      themeTooltip: {
        toLight: 'Ganti ke Mode Terang',
        toDark: 'Ganti ke Mode Gelap',
      },
    },
    tab1: {
      title: 'Pemantauan Kekeringan Global & Pompa Surya',
      subtitle: 'Telemetri satelit NASA POWER langsung, deteksi distrik asli, dan pengiriman pompa VFD otomatis',
      mobileFilterBtn: 'Filter & Legenda',
      zonesWord: 'Zona',
      filteredBadge: 'Terfilter',
      filtersTitle: 'Filter Telemetri',
      resetFilters: 'Reset',
      targetRegionLabel: 'Sub-Wilayah Target',
      allRegionsOption: 'Semua Wilayah',
      stapleCropLabel: 'Komoditas Tanaman',
      allCropsOption: 'Semua Tanaman',
      severityLabel: 'Tingkat Kekeringan',
      severities: {
        All: 'Semua',
        Severe: 'Parah',
        Moderate: 'Sedang',
        Mild: 'Ringan',
      },
      crops: {
        ...SHARED_CROPS_EN,
        Maize: 'Jagung',
        Wheat: 'Gandum',
        Tomatoes: 'Tomat',
        Olives: 'Zaitun',
        Almonds: 'Almond',
        Pistachios: 'Pistachio',
        Soybeans: 'Kedelai',
        Cotton: 'Kapas',
        Citrus: 'Jeruk',
        'Date Palms': 'Kurma',
        Grapes: 'Anggur',
        Rice: 'Padi',
        Horticulture: 'Hortikultura',
        'Chili & Leafy Greens': 'Cabai & Sayuran Daun',
      },
      mapLegendTitle: 'Legenda Peta',
      legendSevere: 'Stres Berat (< 20%)',
      legendModerate: 'Stres Sedang (20-29%)',
      legendMild: 'Ringan / Optimal (>= 30%)',
      legendPump: 'Stasiun Pompa Surya',
      globalExplorer: {
        title: 'Penjelajah Koordinat & Kota Satelit Global',
        subtitle: 'Pilih benchmark mitra NASA atau cari kota / koordinat GPS mana pun di dunia untuk data NASA POWER & nama distrik asli',
        cityPlaceholder: 'Cari kota mana pun di dunia (mis. Nairobi, Jaipur, Seville, Mendoza)...',
        latLabel: 'LAT',
        lonLabel: 'LON',
        fetchBtn: 'Fetch NASA Satellite Data',
        fetchingBtn: 'Mengambil Data Satelit...',
        presetsLabel: 'Preset Mitra:',
        syncLangBtn: 'Sinkronkan Bahasa Wilayah',
        liveSourceBadge: 'API NASA POWER LANGSUNG',
        fallbackSourceBadge: 'FALLBACK KALIBRASI LINTANG',
        districtsPrefix: 'Distrik Asli',
        geocodeError: 'Kota tidak ditemukan. Coba nama kota terdekat atau masukkan Latitude/Longitude langsung.',
        invalidCoordsError: 'Masukkan koordinat valid (Latitude -90 s.d. 90, Longitude -180 s.d. 180).',
        langNames: {
          en: 'English',
          id: 'Bahasa Indonesia',
          ar: 'العربية',
          pt: 'Português',
          es: 'Español',
          hi: 'हिन्दी',
          fr: 'Français',
        },
      },
      simulator: {
        title: 'Simulator Cuaca Ekstrem (What-If)',
        simActive: 'Simulasi Aktif',
        liveBaseline: 'Baseline NASA Langsung',
        resetBtn: 'Reset ke Data NASA Live',
        rainfallLabel: 'Simulasi Curah Hujan Harian',
        solarLabel: 'Simulasi Radiasi Surya',
        extremeDry: '0 mm (Kekeringan Ekstrem)',
      },
      map: {
        resolutionLabel: 'Resolusi Spasial:',
        resolutionValue: 'NASA SMAP / POWER 0.5°',
        pumpCapPrefix: 'Kap:',
        pumpStatuses: {
          Active: 'Aktif',
          Standby: 'Siaga',
          Optimizing: 'Optimasi',
        },
        interactiveHint: 'Klik pin zona untuk melihat telemetri & ukuran panel surya',
        showAllPrefix: 'Tampilkan Semua',
      },
      districtsStrip: {
        title: 'Telemetri Distrik Pontianak',
      },
      priorityBanner: {
        title: 'Prioritas Pengiriman Pompa Surya AI',
        pumpSitePrefix: 'Lokasi Prioritas:',
        criticalMoistureText: 'kelembapan tanah kritis',
        recordsText: 'mencatat',
        macroWetnessText: 'kelembapan tanah wilayah',
      },
      telemetryPanel: {
        title: 'Telemetri Zona',
        droughtSuffix: 'Kekeringan',
        plantationSuffix: 'Lahan',
        smapMoisture: 'Kelembapan Tanah (GWETTOP)',
        criticalDry: 'Kering Kritis',
        moderate: 'Sedang',
        humidOptimal: 'Optimal',
        volumetricDepth: 'Zona perakaran permukaan',
        sevenDayTrend: 'Tren Kelembapan 7 Hari',
        deficit: 'defisit',
        gain: 'naik',
        nasaRadiance: 'Radiasi Matahari',
        strong: 'Panen Tinggi',
        moderateSolar: 'Sedang',
        solarPumpYield: 'Kapasitas Pompa Surya',
        capacityUnit: 'Bar',
        surfaceTempLabel: 'Suhu Udara Permukaan (T2M)',
      },
      peatland: {
        eyebrow: 'Peringatan Dini Ekosistem',
        moisturePrefix: 'Kelembapan tanah',
        sendWarningBtn: 'Send Farmer WhatsApp/SMS Early Warning',
        confirmedTitle: 'Peringatan Terkirim',
        confirmedBodyPrefix: 'Notifikasi WhatsApp/SMS petani dikirim ke wilayah',
      },
      solarSizing: {
        eyebrow: 'Rekayasa PV Cerdas',
        title: 'Kalkulator Ukuran Surya & Hemat BBM',
        arraySizeLabel: 'Rekomendasi Array Surya',
        panelUnit: 'Panel 550Wp',
        dailyWaterLabel: 'Estimasi Air Terpompa Harian',
        dailyWaterUnit: 'L/hari',
        dailyEnergyUnit: 'kWh/hari',
        monthlySavingsLabel: 'Estimasi Hemat BBM Bulanan',
        vsDiesel: 'vs Pompa Diesel',
        saveFuelPrefix: 'Menghemat',
        saveFuelSuffix: 'L solar / bulan',
      },
      advisor: {
        eyebrow: 'Mesin Telemetri Lokal',
        title: 'SOLVARA AI Agronomist Advisor',
        liveBriefPrefix: 'RINGKASAN LIVE',
        quickPromptsTitle: 'Pertanyaan Cepat Agronomis',
        analyzingPrefix: 'Menganalisis telemetri NASA untuk',
        prompts: {
          schedule: 'Jadwal irigasi terbaik hari ini?',
          peatland: 'Rencana mitigasi risiko ekosistem?',
          roi: 'Perbandingan ROI Diesel vs Surya?',
        },
      },
    },
    tab2: {
      bannerTitle: 'OPERASI POMPA VFD SURYA OTONOM AKTIF',
      bannerSubtitle: 'Modulasi MPPT + Variable Frequency Drive tersinkronisasi dengan satelit NASA POWER',
      telemetryOk: 'TELEMETRI NORMAL',
      kpis: {
        solarOutput: 'Output Array PV',
        solarSub: 'Pelacakan MPPT 98.6%',
        pumpCapacity: 'Debit Pompa',
        pumpSub: 'VFD Kecepatan Variabel',
        waterReserve: 'Cadangan Tangki Penyangga',
        waterSub: 'Reservoir 20.000 L',
        rain3Day: 'Rata-rata Hujan 3 Hari',
        rainLatestPrefix: 'Terbaru:',
        rainOptimalSolar: 'Surya Optimal',
        rainActiveRecharge: 'Pengisian Aktif',
        yieldSaved: 'Hasil Panen Terlindungi',
        yieldSub: 'Mencegah gagal panen',
      },
      heatmap: {
        title: 'Matriks Kelembapan 140 Petak & Gelombang Irigasi Darurat',
        subtitle: 'Simulasikan gelombang hidrasi tetes bertenaga surya secara radial ke seluruh lahan',
        scaleLabel: 'SKALA:',
        reRunBtn: 'Jalankan Irigasi Surya Darurat',
        pumpingActive: 'Gelombang Hidrasi Aktif',
        resetDemoBtn: 'Reset Stres Lahan',
        plotPrefix: 'Petak #',
        legend: {
          severe: 'Parah',
          high: 'Stres Tinggi',
          moderate: 'Sedang',
          low: 'Rendah',
          hydrated: 'Terhidrasi',
        },
        cellLabels: {
          hydrated: 'Terhidrasi (Optimal)',
          severe: 'Stres Parah (<15%)',
          high: 'Stres Tinggi (15-25%)',
          moderate: 'Stres Sedang (25-40%)',
          low: 'Stres Rendah (40-60%)',
        },
      },
      vfd: {
        affinityLawPrefix: 'Hukum Afinitas: P ∝ N³',
        title: 'Optimizer Efisiensi VFD',
        subtitle: 'Atur RPM pompa sentrifugal secara dinamis berdasarkan kelembapan akar langsung',
        sourcePlotArray: 'Matriks Lahan',
        autoSyncOn: 'Sinkron Otomatis AKTIF',
        autoSyncOff: 'Sinkron Otomatis MATI',
        liveRootMoisturePrefix: 'Kelembapan Akar Efektif',
        criticalWord: 'kritis',
        hydratedWord: 'terhidrasi',
        zoneTelemetryPrefix: 'Telemetri Zona',
        meanArrayPrefix: 'Rata-rata lahan:',
        suggestedAdjustment: 'Penyesuaian Disarankan',
        optimalSynced: 'Tersinkron Optimal',
        rampDown: 'Turunkan RPM',
        rampUp: 'Naikkan RPM',
        activeInverterSpeed: 'Kecepatan Inverter Aktif:',
        targetPrefix: 'Target:',
        recommendedTooltipPrefix: 'Target optimal:',
        manualSliderLabel: 'Kontrol Frekuensi Manual (20 - 50 Hz)',
        nominalRpmSuffix: 'RPM Nominal',
        syncedBtn: 'Inverter Tersinkron',
        applyBtnPrefix: 'Terapkan',
        kpiSuggestedSpeed: 'Target Kecepatan VFD',
        kpiAdjustedFlow: 'Debit Air Disesuaikan',
        kpiVsActivePrefix: 'vs',
        kpiVsActiveSuffix: 'aktif',
        kpiInverterLoad: 'Beban Inverter',
        kpiVsCurrentSuffix: 'kW dihemat',
        kpiBaseline50Hz: 'Baseline penuh 50 Hz',
        kpiEnergySaved: 'Energi Dihemat',
        kpiToBatterySuffix: 'kWh/hari dihemat',
      },
      allocation: {
        title: 'Alokasi Daya Surya',
        subtitle: 'Pembagian daya PV langsung ke zona distrik prioritas tertinggi',
      },
      forecast: {
        title: 'Output Air · Prakiraan Surya 24 Jam',
        subtitlePrefix: 'Jendela pompa puncak',
        subtitleMiddle: '10:00 - 14:30',
        subtitleSuffix: 'selaras dengan radiasi surya puncak',
        estTotal: 'Est. 114.500 L/hari',
        peakLabel: '12j (Puncak)',
      },
    },
    tab3: {
      rankBadge: 'LOKASI AGRIVOLTAIK PERINGKAT #1',
      siteCodePrefix: 'KODE LOKASI:',
      siteTitleSuffix: 'Analisis Kelayakan Agrivoltaik',
      siteSubtitlePrefix: 'Intelijen spasial multikriteria berbasis telemetri NASA POWER langsung di',
      suitabilityScore: 'Skor Kelayakan',
      tierGrade: 'Tier-A Utama',
      confidencePrefix: 'Akurasi',
      metrics: [
        { label: 'Kapasitas PV', val: '120 kWp', sub: 'Bifacial tinggi' },
        { label: 'Energi Tahunan', val: '198 MWh', sub: 'PR 81.4%' },
        { label: 'Angkat Air', val: '145 m³/hari', sub: 'Head 18m TDH' },
        { label: 'Est. Capex', val: '$108K', sub: 'Turnkey + VFD' },
        { label: 'Balik Modal', val: '3.4 Thn', sub: 'Gantikan diesel' },
        { label: 'Kurangi CO₂', val: '142 t/thn', sub: 'Terverifikasi' },
        { label: 'Naungan Crop', val: '+18%', sub: 'Mikroklimat sejuk' },
      ],
      reasoningTitle: 'Penalaran Spasial & Agronomi AI',
      confidenceBadgePrefix: 'Kepercayaan Model',
      reasons: [
        {
          title: 'Verifikasi Sumber Daya Surya:',
          bodyBefore: 'Rata-rata radiasi gelombang pendek NASA POWER mencapai',
          bodyAfter: 'memberikan faktor kapasitas tinggi untuk pemompaan VFD siang hari tanpa siklus baterai berat.',
        },
        {
          title: 'Mitigasi Defisit Zona Akar:',
          body: 'Rangka agrivoltaik setinggi 3,2 m menurunkan evapotranspirasi lapisan tanah atas sebesar 18–24% saat puncak panas siang.',
        },
        {
          title: 'Ekonomi Hidrolik Bebas Solar:',
          body: 'Pompa VFD kopel-DC langsung menghilangkan biaya angkut BBM diesel dan menstabilkan margin petani.',
        },
      ],
      riskTitle: 'Catatan Mitigasi Risiko Lokasi',
      riskBodyBefore: 'Tutupan awan musiman atau lonjakan panas ekstrem dapat menggeser jam kerja pompa. Pasangkan',
      riskBodyHighlight: 'tangki penyangga gravitasi 20.000 L',
      riskBodyAfter: 'dengan peringatan dini WhatsApp otomatis untuk menjembatani hari berawan.',
      weightsTitle: 'Bobot Kriteria MCDA',
      weightsSubtitle: 'Kerangka penilaian spasial berbobot untuk pemeringkatan lahan',
      weights: [
        'Radiasi Surya (NASA POWER)',
        'Urgensi Defisit Kelembapan Tanah',
        'Kedekatan Akuifer / Kanal',
        'Sinergi Naungan Tanaman',
        'ROI Penggantian Diesel & Jaringan',
      ],
      solarProfileTitle: 'Kurva Pembangkitan Surya 24 Jam',
      solarProfileSubtitle: 'Profil daya output array PV per jam',
      solarMaxBadge: 'Puncak 98.4 kW',
      solarPeakZen: '12:15 (Zenit)',
      irradianceMonthlyTitle: 'Profil Radiasi 12 Bulan',
      irradianceMonthlySubtitle: 'Distribusi musiman kWh/m²/hari historis',
      irradianceAvgBadge: 'Rata-rata 6.08 kWh/m²',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
    },
    footer: {
      brandLine: 'SOLVARA Agrivoltaik Skala Planet • Rangkaian Telemetri NASA POWER & SMAP',
      resolution: 'Grid NASA POWER 0.5° × 0.625°',
      iec: 'Performa PV IEC 61724',
      vfdProtocol: 'Kontrol Afinitas VFD Modbus',
    },
    toast: {
      title: 'Peringatan Dini Petani Terkirim',
      bodyPrefix: 'Notifikasi WhatsApp/SMS terkirim ke petani di',
      bodyMiddle: 'untuk',
    },
    whatsappPreview: {
      botName: 'SOLVARA Sat-Alert Bot',
      onlineStatus: 'Online',
      previewTag: 'Pratinjau Ponsel Petani',
      todayLabel: 'HARI INI',
      copyBtn: 'Copy Message',
      copiedBtn: 'Copied!',
      closeBtn: 'Close',
    },
  },
  ar: {
    header: {
      subtitle: 'منصة القيادة العالمية للزراعة الكهروضوئية والري الشمسي الفضائي',
      langSwitcherLabel: 'محدد اللغة',
      langSearchPlaceholder: 'ابحث عن اللغة...',
      langFullLabel: 'واجهة كاملة',
      langFallbackNote: 'تنبيهات محلية + واجهة EN',
      langNoMatch: 'لا توجد لغة مطابقة',
      tabs: {
        macro: 'خريطة الجفاف والمضخات',
        ops: 'تشغيل الري الدقيق',
        feasibility: 'ذكاء الموقع',
      },
      mobileTabs: {
        macro: 'خريطة الجفاف',
        ops: 'عمليات الري',
        feasibility: 'ذكاء الموقع',
      },
      telemetry: {
        syncing: 'مزامنة NASA POWER...',
        live: 'NASA POWER مباشر',
        ready: 'NASA POWER جاهز',
        sourceLive: 'بيانات NASA POWER الحية',
        sourceFallback: 'بيانات NASA POWER المعايرة',
        solarDate: 'الإشعاع',
        moistureDate: 'الرطوبة',
      },
      themeTooltip: {
        toLight: 'التبديل إلى الوضع الفاتح',
        toDark: 'التبديل إلى الوضع الداكن',
      },
    },
    tab1: {
      title: 'مراقبة الجفاف العالمي ومضخات الري الشمسية',
      subtitle: 'بيانات أقمار NASA POWER الحية، كشف المناطق الحقيقية، وتشغيل مضخات VFD تلقائياً',
      mobileFilterBtn: 'الفلاتر والدليل',
      zonesWord: 'مناطق',
      filteredBadge: 'مفلتر',
      filtersTitle: 'فلاتر القياس الفضائي',
      resetFilters: 'إعادة ضبط',
      targetRegionLabel: 'المنطقة الفرعية',
      allRegionsOption: 'جميع المناطق',
      stapleCropLabel: 'نوع المحصول',
      allCropsOption: 'جميع المحاصيل',
      severityLabel: 'شدة الجفاف',
      severities: {
        All: 'الكل',
        Severe: 'شديد',
        Moderate: 'متوسط',
        Mild: 'خفيف',
      },
      crops: {
        Maize: 'الذرة',
        Wheat: 'القمح',
        Tomatoes: 'الطماطم',
        Olives: 'الزيتون',
        Almonds: 'اللوز',
        Pistachios: 'الفستق',
        Soybeans: 'فول الصويا',
        Cotton: 'القطن',
        Citrus: 'الحمضيات',
        'Date Palms': 'نخيل التمر',
        Grapes: 'العنب',
        Rice: 'الأرز',
        Horticulture: 'البستنة',
        'Chili & Leafy Greens': 'الفلفل والخضروات الورقية',
      },
      mapLegendTitle: 'دليل الخريطة',
      legendSevere: 'إجهاد شديد (< 20%)',
      legendModerate: 'إجهاد متوسط (20-29%)',
      legendMild: 'خفيف / مثالي (>= 30%)',
      legendPump: 'محطة ضخ شمسية',
      globalExplorer: {
        title: 'مستكشف الإحداثيات والمدن الفضائي العالمي',
        subtitle: 'اختر موقعاً مرجعياً لـ NASA أو ابحث عن أي مدينة أو إحداثيات GPS عالمياً لجلب بيانات ناسا وأسماء المناطق الحقيقية',
        cityPlaceholder: 'ابحث عن أي مدينة في العالم (مثل: القاهرة، نيروبي، جايبور)...',
        latLabel: 'خط العرض',
        lonLabel: 'خط الطول',
        fetchBtn: 'جلب بيانات قمر ناسا',
        fetchingBtn: 'جاري المزامنة الفضائية...',
        presetsLabel: 'مواقع ناسا المرجعية:',
        syncLangBtn: 'مزامنة لغة المنطقة',
        liveSourceBadge: 'بيانات NASA POWER حية',
        fallbackSourceBadge: 'معايرة حسب خط العرض',
        districtsPrefix: 'مناطق حقيقية',
        geocodeError: 'تعذر العثور على المدينة. جرّب مدينة قريبة أكبر أو أدخل الإحداثيات مباشرة.',
        invalidCoordsError: 'يرجى إدخال إحداثيات صحيحة (خط العرض -90 إلى 90، خط الطول -180 إلى 180).',
        langNames: {
          en: 'English',
          id: 'Bahasa Indonesia',
          ar: 'العربية',
          pt: 'Português',
          es: 'Español',
          hi: 'हिन्दी',
          fr: 'Français',
        },
      },
      simulator: {
        title: 'محاكي الطقس المتطرف (What-If)',
        simActive: 'المحاكاة نشطة',
        liveBaseline: 'مرجع ناسا المباشر',
        resetBtn: 'إعادة ضبط لبيانات ناسا',
        rainfallLabel: 'محاكاة الأمطار اليومية',
        solarLabel: 'محاكاة الإشعاع الشمسي',
        extremeDry: '0 مم (جفاف شديد)',
      },
      map: {
        resolutionLabel: 'الدقة المكانية:',
        resolutionValue: 'NASA SMAP / POWER 0.5°',
        pumpCapPrefix: 'السعة:',
        pumpStatuses: {
          Active: 'نشطة',
          Standby: 'احتياط',
          Optimizing: 'تحسين',
        },
        interactiveHint: 'انقر على أي علامة منطقة لعرض القياس الفضائي وحجم الألواح',
        showAllPrefix: 'عرض الكل',
      },
      districtsStrip: {
        title: 'قياس مناطق بونتياناك الحقيقية',
      },
      priorityBanner: {
        title: 'أولوية تشغيل المضخة الشمسية بالذكاء الاصطناعي',
        pumpSitePrefix: 'الموقع ذو الأولوية:',
        criticalMoistureText: 'رطوبة تربة حرجة',
        recordsText: 'يسجل',
        macroWetnessText: 'رطوبة حوض التربة',
      },
      telemetryPanel: {
        title: 'قياس المنطقة الفضائي',
        droughtSuffix: 'جفاف',
        plantationSuffix: 'قطاع زراعي',
        smapMoisture: 'رطوبة التربة (GWETTOP)',
        criticalDry: 'جفاف حرج',
        moderate: 'متوسط',
        humidOptimal: 'مثالي',
        volumetricDepth: 'منطقة الجذور السطحية',
        sevenDayTrend: 'اتجاه الرطوبة لـ 7 أيام',
        deficit: 'عجز',
        gain: 'زيادة',
        nasaRadiance: 'الإشعاع الشمسي',
        strong: 'إنتاج مرتفع',
        moderateSolar: 'متوسط',
        solarPumpYield: 'كفاءة المضخة الشمسية',
        capacityUnit: 'درجات',
        surfaceTempLabel: 'درجة حرارة الهواء السطحي (T2M)',
      },
      peatland: {
        eyebrow: 'الإنذار المبكر للنظام البيئي',
        moisturePrefix: 'رطوبة التربة',
        sendWarningBtn: 'إرسال إنذار مبكر للمزارع عبر واتساب/SMS',
        confirmedTitle: 'تم إرسال الإنذار',
        confirmedBodyPrefix: 'تمت جدولة تنبيه واتساب/SMS للمزارعين في',
      },
      solarSizing: {
        eyebrow: 'هندسة الطاقة الشمسية الذكية',
        title: 'حاسبة حجم الألواح وتوفير الوقود',
        arraySizeLabel: 'مصفوفة الألواح الموصى بها',
        panelUnit: 'لوح 550Wp',
        dailyWaterLabel: 'تقدير ضخ المياه اليومي',
        dailyWaterUnit: 'لتر/يوم',
        dailyEnergyUnit: 'ك.و.س/يوم',
        monthlySavingsLabel: 'التوفير الشهري في الوقود',
        vsDiesel: 'مقابل الديزل',
        saveFuelPrefix: 'يوفر',
        saveFuelSuffix: 'لتر ديزل / شهر',
      },
      advisor: {
        eyebrow: 'محرك الذكاء الزراعي المحلي',
        title: 'مستشار SOLVARA الزراعي الذكي',
        liveBriefPrefix: 'ملخص مباشر',
        quickPromptsTitle: 'استفسارات زراعية سريعة',
        analyzingPrefix: 'تحليل بيانات ناسا للمنطقة',
        prompts: {
          schedule: 'أفضل جدول للري اليوم؟',
          peatland: 'خطة تخفيف الإجهاد البيئي؟',
          roi: 'عائد المضخة الشمسية مقابل الديزل؟',
        },
      },
    },
    tab2: {
      bannerTitle: 'نظام ضخ VFD الشمسي الذاتي قيد التشغيل',
      bannerSubtitle: 'تعديل التردد المتغير MPPT + VFD متزامن مع بيانات أقمار NASA POWER',
      telemetryOk: 'القياس الفضائي مستقر',
      kpis: {
        solarOutput: 'إنتاج مصفوفة PV',
        solarSub: 'تتبع MPPT بنسبة 98.6%',
        pumpCapacity: 'معدل تدفق المضخة',
        pumpSub: 'تردد متغير VFD',
        waterReserve: 'احتياطي الخزان',
        waterSub: 'سعة 20,000 لتر',
        rain3Day: 'متوسط أمطار 3 أيام',
        rainLatestPrefix: 'الأحدث:',
        rainOptimalSolar: 'طاقة شمسية مثالية',
        rainActiveRecharge: 'تغذية مائية نشطة',
        yieldSaved: 'حماية المحصول',
        yieldSub: 'منع خسائر الذبول',
      },
      heatmap: {
        title: 'مصفوفة رطوبة 140 قطعة أرض وموجة الري الطارئ',
        subtitle: 'محاكاة موجة الري بالتنقيط الشمسي المتوسعة شعاعياً عبر القطاعات المجهدة',
        scaleLabel: 'المقياس:',
        reRunBtn: 'تشغيل الري الشمسي الطارئ',
        pumpingActive: 'موجة الري نشطة',
        resetDemoBtn: 'إعادة ضبط إجهاد الحقل',
        plotPrefix: 'قطعة #',
        legend: {
          severe: 'شديد',
          high: 'إجهاد عالٍ',
          moderate: 'متوسط',
          low: 'منخفض',
          hydrated: 'مروي',
        },
        cellLabels: {
          hydrated: 'مروي (مثالي)',
          severe: 'إجهاد شديد (<15%)',
          high: 'إجهاد عالٍ (15-25%)',
          moderate: 'إجهاد متوسط (25-40%)',
          low: 'إجهاد منخفض (40-60%)',
        },
      },
      vfd: {
        affinityLawPrefix: 'قانون التقارب: P ∝ N³',
        title: 'محسّن كفاءة VFD',
        subtitle: 'تعديل سرعة دوران المضخة ديناميكياً حسب رطوبة منطقة الجذور الحية',
        sourcePlotArray: 'مصفوفة الحقل',
        autoSyncOn: 'مزامنة تلقائية مفعّلة',
        autoSyncOff: 'مزامنة تلقائية متوقفة',
        liveRootMoisturePrefix: 'رطوبة الجذور الفعالة',
        criticalWord: 'حرجة',
        hydratedWord: 'مروية',
        zoneTelemetryPrefix: 'قياس المنطقة',
        meanArrayPrefix: 'متوسط الحقل:',
        suggestedAdjustment: 'التعديل المقترح',
        optimalSynced: 'متزامن مثالياً',
        rampDown: 'خفض السرعة',
        rampUp: 'رفع السرعة',
        activeInverterSpeed: 'سرعة العاكس النشطة:',
        targetPrefix: 'الهدف:',
        recommendedTooltipPrefix: 'الهدف المثالي:',
        manualSliderLabel: 'التحكم اليدوي بالتردد (20 - 50 Hz)',
        nominalRpmSuffix: 'من السرعة الاسمية',
        syncedBtn: 'العاكس متزامن',
        applyBtnPrefix: 'تطبيق',
        kpiSuggestedSpeed: 'تردد VFD المستهدف',
        kpiAdjustedFlow: 'التدفق المعدّل',
        kpiVsActivePrefix: 'مقابل',
        kpiVsActiveSuffix: 'نشط',
        kpiInverterLoad: 'حمل العاكس',
        kpiVsCurrentSuffix: 'ك.و توفير',
        kpiBaseline50Hz: 'خط أساس 50 هرتز',
        kpiEnergySaved: 'الطاقة الموفرة',
        kpiToBatterySuffix: 'ك.و.س/يوم توفير',
      },
      allocation: {
        title: 'توزيع الطاقة الشمسية',
        subtitle: 'توزيع قدرة الألواح الفوري على المناطق ذات الأولوية القصوى',
      },
      forecast: {
        title: 'إنتاج المياه · توقعات 24 ساعة',
        subtitlePrefix: 'نافذة الضخ المثلى',
        subtitleMiddle: '10:00 - 14:30',
        subtitleSuffix: 'متوافقة مع ذروة الإشعاع الشمسي',
        estTotal: 'تقدير 114,500 لتر/يوم',
        peakLabel: '12ظ (الذروة)',
      },
    },
    tab3: {
      rankBadge: 'الموقع رقم 1 للزراعة الكهروضوئية',
      siteCodePrefix: 'رمز الموقع:',
      siteTitleSuffix: 'ملف الجدوى الهندسية والزراعية',
      siteSubtitlePrefix: 'تحليل مكاني متعدد المعايير مدعوم ببيانات NASA POWER الحية في',
      suitabilityScore: 'مؤشر الملاءمة',
      tierGrade: 'الفئة الممتازة A',
      confidencePrefix: 'الموثوقية',
      metrics: [
        { label: 'سعة الألواح', val: '120 kWp', sub: 'ألواح ثنائية الوجه' },
        { label: 'الإنتاج السنوي', val: '198 MWh', sub: 'كفاءة 81.4%' },
        { label: 'ضخ المياه', val: '145 m³/يوم', sub: 'رفع 18 متر' },
        { label: 'التكلفة التقديرية', val: '$108K', sub: 'نظام متكامل VFD' },
        { label: 'الاسترداد', val: '3.4 سنوات', sub: 'بديل الديزل' },
        { label: 'خفض CO₂', val: '142 طن/سنة', sub: 'موثق' },
        { label: 'تظليل المحصول', val: '+18%', sub: 'تحسن المناخ الدقيق' },
      ],
      reasoningTitle: 'التحليل المكاني والزراعي الذكي',
      confidenceBadgePrefix: 'ثقة النموذج',
      reasons: [
        {
          title: 'التحقق من المورد الشمسي:',
          bodyBefore: 'يبلغ متوسط الإشعاع الشمسي من NASA POWER نحو',
          bodyAfter: 'مما يتيح ضخاً نهارياً عالي الكفاءة بدون استهلاك بطاريات مكلف.',
        },
        {
          title: 'تقليل تبخر منطقة الجذور:',
          body: 'ترفع الهياكل الشمسية بارتفاع 3.2 متر كفاءة التربة وتقلل البخر النتح بنسبة 18–24% في ذروة الظهيرة.',
        },
        {
          title: 'اقتصاديات هيدروليكية بدون ديزل:',
          body: 'الضخ المباشر عبر عاكس VFD يلغي تكاليف نقل الوقود ويحمي هوامش أرباح المزارعين.',
        },
      ],
      riskTitle: 'ملاحظة تخفيف مخاطر الموقع',
      riskBodyBefore: 'قد تؤثر الغيوم الموسمية أو موجات الحر الشديدة على ساعات الضخ. ادمج',
      riskBodyHighlight: 'خزان تخزين بالجاذبية سعة 20,000 لتر',
      riskBodyAfter: 'مع تنبيهات واتساب الآلية لضمان استمرارية الري.',
      weightsTitle: 'أوزان معايير القرار MCDA',
      weightsSubtitle: 'نموذج التقييم الموزون لترتيب أولوية المواقع',
      weights: [
        'الإشعاع الشمسي (NASA POWER)',
        'إلحاح عجز رطوبة التربة',
        'القرب من المياه الجوفية / القنوات',
        'تآزر التظليل مع المحصول',
        'عائد الاستغناء عن الديزل',
      ],
      solarProfileTitle: 'منحنى التوليد الشمسي لـ 24 ساعة',
      solarProfileSubtitle: 'توزيع القدرة الساعية لمصفوفة الألواح',
      solarMaxBadge: 'ذروة 98.4 kW',
      solarPeakZen: '12:15 (الذروة)',
      irradianceMonthlyTitle: 'ملف الإشعاع لـ 12 شهراً',
      irradianceMonthlySubtitle: 'التوزيع الموسمي التاريخي (kWh/m²/يوم)',
      irradianceAvgBadge: 'المتوسط 6.08 kWh/m²',
      months: ['ينا', 'فبر', 'مار', 'أبر', 'ماي', 'يون', 'يول', 'أغس', 'سبت', 'أكت', 'نوف', 'ديس'],
    },
    footer: {
      brandLine: 'SOLVARA للزراعة الكهروضوئية العالمية • منظومة قياس NASA POWER & SMAP',
      resolution: 'شبكة NASA POWER بدقة 0.5° × 0.625°',
      iec: 'معيار الأداء IEC 61724',
      vfdProtocol: 'تحكم VFD عبر بروتوكول Modbus',
    },
    toast: {
      title: 'تم إرسال إنذار المزارع المبكر',
      bodyPrefix: 'تم إرسال تنبيه واتساب/SMS إلى المزارعين في',
      bodyMiddle: 'لمنطقة',
    },
    whatsappPreview: {
      botName: 'SOLVARA Sat-Alert Bot',
      onlineStatus: 'متصل الآن',
      previewTag: 'معاينة هاتف المزارع',
      todayLabel: 'اليوم',
      copyBtn: 'نسخ الرسالة',
      copiedBtn: 'تم النسخ!',
      closeBtn: 'إغلاق',
    },
  },
  pt: {
    header: {
      subtitle: 'Comando Global de Agrivoltaica e Irrigação Solar por Satélite',
      langSwitcherLabel: 'Seletor de idioma',
      langSearchPlaceholder: 'Buscar idioma...',
      langFullLabel: 'Interface Completa',
      langFallbackNote: 'Alertas locais + interface EN',
      langNoMatch: 'Nenhum idioma encontrado',
      tabs: {
        macro: 'Mapa de Seca e Bombas',
        ops: 'Operação de Irrigação',
        feasibility: 'Inteligência de Local',
      },
      mobileTabs: {
        macro: 'Mapa Seca',
        ops: 'Operações',
        feasibility: 'Viabilidade',
      },
      telemetry: {
        syncing: 'Sincronizando NASA POWER...',
        live: 'NASA POWER Ao Vivo',
        ready: 'NASA POWER Pronto',
        sourceLive: 'API NASA POWER em Tempo Real',
        sourceFallback: 'Fallback Calibrado NASA POWER',
        solarDate: 'Solar',
        moistureDate: 'Umidade',
      },
      themeTooltip: {
        toLight: 'Mudar para Modo Claro',
        toDark: 'Mudar para Modo Escuro',
      },
    },
    tab1: {
      title: 'Monitoramento Global de Seca e Bombeamento Solar',
      subtitle: 'Telemetria NASA POWER ao vivo, detecção real de distritos e despacho automatizado VFD',
      mobileFilterBtn: 'Filtros e Legenda',
      zonesWord: 'Zonas',
      filteredBadge: 'Filtrado',
      filtersTitle: 'Filtros de Telemetria',
      resetFilters: 'Resetar',
      targetRegionLabel: 'Sub-região Alvo',
      allRegionsOption: 'Todas as Regiões',
      stapleCropLabel: 'Cultura Agrícola',
      allCropsOption: 'Todas as Culturas',
      severityLabel: 'Severidade da Seca',
      severities: {
        All: 'Todas',
        Severe: 'Severa',
        Moderate: 'Moderada',
        Mild: 'Leve',
      },
      crops: {
        ...SHARED_CROPS_EN,
        Maize: 'Milho',
        Wheat: 'Trigo',
        Tomatoes: 'Tomate',
        Olives: 'Oliveiras',
        Almonds: 'Amêndoas',
        Pistachios: 'Pistache',
        Soybeans: 'Soja',
        Cotton: 'Algodão',
        Citrus: 'Citros',
        'Date Palms': 'Tamareiras',
        Grapes: 'Uvas',
        Rice: 'Arroz',
        Horticulture: 'Horticultura',
        'Chili & Leafy Greens': 'Pimenta e Folhosas',
      },
      mapLegendTitle: 'Legenda do Mapa',
      legendSevere: 'Estresse Severo (< 20%)',
      legendModerate: 'Estresse Moderado (20-29%)',
      legendMild: 'Leve / Ideal (>= 30%)',
      legendPump: 'Estação de Bomba Solar',
      globalExplorer: {
        title: 'Explorador Global de Coordenadas e Cidades por Satélite',
        subtitle: 'Selecione um benchmark NASA ou pesquise qualquer cidade / GPS no mundo para telemetria NASA POWER e distritos reais',
        cityPlaceholder: 'Pesquisar qualquer cidade no mundo (ex: Barreiras, Nairóbi, Sevilha)...',
        latLabel: 'LAT',
        lonLabel: 'LON',
        fetchBtn: 'Buscar Dados NASA',
        fetchingBtn: 'Sincronizando...',
        presetsLabel: 'Benchmarks:',
        syncLangBtn: 'Sincronizar Idioma da Região',
        liveSourceBadge: 'API NASA POWER AO VIVO',
        fallbackSourceBadge: 'CALIBRAÇÃO POR LATITUDE',
        districtsPrefix: 'Distritos Reais',
        geocodeError: 'Cidade não encontrada. Tente outra cidade próxima ou insira latitude/longitude.',
        invalidCoordsError: 'Insira coordenadas válidas (Latitude -90 a 90, Longitude -180 a 180).',
        langNames: {
          en: 'English',
          id: 'Bahasa Indonesia',
          ar: 'العربية',
          pt: 'Português',
          es: 'Español',
          hi: 'हिन्दी',
          fr: 'Français',
        },
      },
      simulator: {
        title: 'Simulador Climático Extremo (What-If)',
        simActive: 'Simulação Ativa',
        liveBaseline: 'Linha de Base NASA',
        resetBtn: 'Resetar para NASA Ao Vivo',
        rainfallLabel: 'Chuva Diária Simulada',
        solarLabel: 'Irradiância Solar Simulada',
        extremeDry: '0 mm (Seca Extrema)',
      },
      map: {
        resolutionLabel: 'Resolução:',
        resolutionValue: 'NASA SMAP / POWER 0.5°',
        pumpCapPrefix: 'Cap:',
        pumpStatuses: {
          Active: 'Ativa',
          Standby: 'Reserva',
          Optimizing: 'Otimizando',
        },
        interactiveHint: 'Clique em uma zona para inspecionar telemetria e dimensionamento PV',
        showAllPrefix: 'Mostrar Todas',
      },
      districtsStrip: {
        title: 'Telemetria dos Distritos',
      },
      priorityBanner: {
        title: 'Prioridade de Despacho Solar por IA',
        pumpSitePrefix: 'Local Prioritário:',
        criticalMoistureText: 'umidade crítica do solo',
        recordsText: 'registra',
        macroWetnessText: 'umidade da bacia',
      },
      telemetryPanel: {
        title: 'Telemetria da Zona',
        droughtSuffix: 'Seca',
        plantationSuffix: 'Talhão',
        smapMoisture: 'Umidade do Solo (GWETTOP)',
        criticalDry: 'Seca Crítica',
        moderate: 'Moderada',
        humidOptimal: 'Ideal',
        volumetricDepth: 'Zona radicular superficial',
        sevenDayTrend: 'Tendência 7 Dias',
        deficit: 'déficit',
        gain: 'ganho',
        nasaRadiance: 'Radiação Solar',
        strong: 'Alto Rendimento',
        moderateSolar: 'Moderado',
        solarPumpYield: 'Capacidade Solar',
        capacityUnit: 'Barras',
        surfaceTempLabel: 'Temp. do Ar Superficial (T2M)',
      },
      peatland: {
        eyebrow: 'Alerta Antecipado do Ecossistema',
        moisturePrefix: 'Umidade do solo',
        sendWarningBtn: 'Enviar Alerta WhatsApp/SMS ao Produtor',
        confirmedTitle: 'Alerta Enviado',
        confirmedBodyPrefix: 'Aviso WhatsApp/SMS enfileirado para produtores em',
      },
      solarSizing: {
        eyebrow: 'Engenharia PV Inteligente',
        title: 'Dimensionamento Solar e Economia',
        arraySizeLabel: 'Arranjo Solar Recomendado',
        panelUnit: 'Painéis 550Wp',
        dailyWaterLabel: 'Água Bombeada Diária Est.',
        dailyWaterUnit: 'L/dia',
        dailyEnergyUnit: 'kWh/dia',
        monthlySavingsLabel: 'Economia Mensal Est.',
        vsDiesel: 'vs Bomba Diesel',
        saveFuelPrefix: 'Economiza',
        saveFuelSuffix: 'L diesel / mês',
      },
      advisor: {
        eyebrow: 'Motor de Telemetria Local',
        title: 'Consultor Agronômico IA SOLVARA',
        liveBriefPrefix: 'RESUMO AO VIVO',
        quickPromptsTitle: 'Consultas Rápidas',
        analyzingPrefix: 'Analisando telemetria NASA para',
        prompts: {
          schedule: 'Melhor horário de irrigação hoje?',
          peatland: 'Plano de mitigação de estresse?',
          roi: 'ROI Bomba Solar vs Diesel?',
        },
      },
    },
    tab2: {
      bannerTitle: 'DESPACHO AUTÔNOMO DE BOMBAS SOLARES VFD ATIVO',
      bannerSubtitle: 'Modulação MPPT + Inversor VFD sincronizada com NASA POWER',
      telemetryOk: 'TELEMETRIA NOMINAL',
      kpis: {
        solarOutput: 'Potência PV',
        solarSub: 'Rastreamento MPPT 98.6%',
        pumpCapacity: 'Vazão da Bomba',
        pumpSub: 'Inversor VFD Variável',
        waterReserve: 'Reserva do Tanque',
        waterSub: 'Reservatório 20.000 L',
        rain3Day: 'Chuva Média 3D',
        rainLatestPrefix: 'Última:',
        rainOptimalSolar: 'Solar Ideal',
        rainActiveRecharge: 'Recarga Ativa',
        yieldSaved: 'Safra Protegida',
        yieldSub: 'Prevenção de perdas',
      },
      heatmap: {
        title: 'Matriz de Umidade de 140 Talhões e Pulso de Irrigação',
        subtitle: 'Simule a hidratação radial por gotejamento solar em áreas críticas',
        scaleLabel: 'ESCALA:',
        reRunBtn: 'Executar Irrigação Solar',
        pumpingActive: 'Onda de Hidratação Ativa',
        resetDemoBtn: 'Resetar Estresse',
        plotPrefix: 'Talhão #',
        legend: {
          severe: 'Severo',
          high: 'Estresse Alto',
          moderate: 'Moderado',
          low: 'Baixo',
          hydrated: 'Hidratado',
        },
        cellLabels: {
          hydrated: 'Hidratado (Ideal)',
          severe: 'Estresse Severo (<15%)',
          high: 'Estresse Alto (15-25%)',
          moderate: 'Estresse Moderado (25-40%)',
          low: 'Estresse Baixo (40-60%)',
        },
      },
      vfd: {
        affinityLawPrefix: 'Lei de Afinidade: P ∝ N³',
        title: 'Otimizador de Eficiência VFD',
        subtitle: 'Ajuste a rotação da bomba pela umidade radicular em tempo real',
        sourcePlotArray: 'Matriz do Campo',
        autoSyncOn: 'Sincronia Auto ON',
        autoSyncOff: 'Sincronia Auto OFF',
        liveRootMoisturePrefix: 'Umidade Radicular Efetiva',
        criticalWord: 'críticos',
        hydratedWord: 'hidratados',
        zoneTelemetryPrefix: 'Telemetria da Zona',
        meanArrayPrefix: 'Média do campo:',
        suggestedAdjustment: 'Ajuste Sugerido',
        optimalSynced: 'Sincronizado',
        rampDown: 'Reduzir Hz',
        rampUp: 'Aumentar Hz',
        activeInverterSpeed: 'Frequência Ativa:',
        targetPrefix: 'Meta:',
        recommendedTooltipPrefix: 'Meta ideal:',
        manualSliderLabel: 'Ajuste Manual de Frequência (20 - 50 Hz)',
        nominalRpmSuffix: 'RPM Nominal',
        syncedBtn: 'Inversor Sincronizado',
        applyBtnPrefix: 'Aplicar',
        kpiSuggestedSpeed: 'Frequência Alvo VFD',
        kpiAdjustedFlow: 'Vazão Ajustada',
        kpiVsActivePrefix: 'vs',
        kpiVsActiveSuffix: 'ativo',
        kpiInverterLoad: 'Carga do Inversor',
        kpiVsCurrentSuffix: 'kW economizados',
        kpiBaseline50Hz: 'Base 50 Hz',
        kpiEnergySaved: 'Energia Poupada',
        kpiToBatterySuffix: 'kWh/dia poupados',
      },
      allocation: {
        title: 'Alocação de Energia Solar',
        subtitle: 'Divisão de potência PV entre as zonas prioritárias',
      },
      forecast: {
        title: 'Produção de Água · Previsão 24H',
        subtitlePrefix: 'Janela de pico',
        subtitleMiddle: '10:00 - 14:30',
        subtitleSuffix: 'alinhada com máxima irradiância',
        estTotal: 'Est. 114.500 L/dia',
        peakLabel: '12h (Pico)',
      },
    },
    tab3: {
      rankBadge: 'LOCAL AGRIVOLTAICO #1',
      siteCodePrefix: 'CÓDIGO:',
      siteTitleSuffix: 'Dossiê de Viabilidade Agrivoltaica',
      siteSubtitlePrefix: 'Inteligência espacial multicritério ancorada em dados NASA POWER em',
      suitabilityScore: 'Índice de Aptidão',
      tierGrade: 'Classe A Prime',
      confidencePrefix: 'Confiança',
      metrics: [
        { label: 'Capacidade PV', val: '120 kWp', sub: 'Bifacial elevado' },
        { label: 'Geração Anual', val: '198 MWh', sub: 'PR 81.4%' },
        { label: 'Bombeamento', val: '145 m³/dia', sub: 'Altura 18m TDH' },
        { label: 'Capex Est.', val: '$108K', sub: 'Turnkey + VFD' },
        { label: 'Retorno', val: '3.4 Anos', sub: 'Substitui diesel' },
        { label: 'CO₂ Evitado', val: '142 t/ano', sub: 'Verificado' },
        { label: 'Sombra Útil', val: '+18%', sub: 'Microclima ameno' },
      ],
      reasoningTitle: 'Raciocínio Espacial e Agronômico IA',
      confidenceBadgePrefix: 'Confiança do Modelo',
      reasons: [
        {
          title: 'Verificação Solar:',
          bodyBefore: 'A irradiância NASA POWER registra média de',
          bodyAfter: 'garantindo alto fator de capacidade para bombeamento diurno sem sobrecarga de baterias.',
        },
        {
          title: 'Mitigação de Déficit Radicular:',
          body: 'Estruturas elevadas a 3,2 m reduzem a evapotranspiração do solo em 18–24% nos picos de calor.',
        },
        {
          title: 'Economia Hidráulica Zero-Diesel:',
          body: 'O bombeamento VFD acoplado em CC elimina logística de diesel e protege a margem do produtor.',
        },
      ],
      riskTitle: 'Nota de Mitigação de Riscos',
      riskBodyBefore: 'Nebulosidade sazonal ou ondas de calor podem alterar ciclos de bombeamento. Combine',
      riskBodyHighlight: 'reservatório gravitacional de 20.000 L',
      riskBodyAfter: 'com alertas automáticos de WhatsApp para garantir autonomia.',
      weightsTitle: 'Pesos Multicritério MCDA',
      weightsSubtitle: 'Estrutura ponderada para ranqueamento de locais',
      weights: [
        'Irradiância Solar (NASA POWER)',
        'Urgência de Déficit Hídrico',
        'Proximidade de Aquífero / Canal',
        'Sinergia de Sombreamento',
        'ROI de Substituição de Diesel',
      ],
      solarProfileTitle: 'Curva de Geração Solar 24H',
      solarProfileSubtitle: 'Perfil horário de potência PV',
      solarMaxBadge: 'Pico 98.4 kW',
      solarPeakZen: '12:15 (Zênite)',
      irradianceMonthlyTitle: 'Perfil Mensal de Irradiância',
      irradianceMonthlySubtitle: 'Distribuição sazonal histórica (kWh/m²/dia)',
      irradianceAvgBadge: 'Média 6.08 kWh/m²',
      months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    },
    footer: {
      brandLine: 'SOLVARA Agrivoltaica Planetária • Telemetria NASA POWER & SMAP',
      resolution: 'Grade NASA POWER 0.5° × 0.625°',
      iec: 'Desempenho PV IEC 61724',
      vfdProtocol: 'Controle VFD Modbus',
    },
    toast: {
      title: 'Alerta Antecipado Enviado',
      bodyPrefix: 'Alerta WhatsApp/SMS enviado aos produtores em',
      bodyMiddle: 'para',
    },
    whatsappPreview: {
      botName: 'SOLVARA Sat-Alert Bot',
      onlineStatus: 'Online',
      previewTag: 'Prévia Celular do Produtor',
      todayLabel: 'HOJE',
      copyBtn: 'Copiar Mensagem',
      copiedBtn: 'Copiado!',
      closeBtn: 'Fechar',
    },
  },
  es: {
    header: {
      subtitle: 'Comando Global de Agrovoltaica y Riego Solar Satelital',
      langSwitcherLabel: 'Selector de idioma',
      langSearchPlaceholder: 'Buscar idioma...',
      langFullLabel: 'UI Completa',
      langFallbackNote: 'Alertas locales + interfaz EN',
      langNoMatch: 'Idioma no encontrado',
      tabs: {
        macro: 'Mapa de Sequía y Bombas',
        ops: 'Operación de Riego',
        feasibility: 'Inteligencia de Sitio',
      },
      mobileTabs: {
        macro: 'Mapa Sequía',
        ops: 'Operaciones',
        feasibility: 'Viabilidad',
      },
      telemetry: {
        syncing: 'Sincronizando NASA POWER...',
        live: 'NASA POWER En Vivo',
        ready: 'NASA POWER Listo',
        sourceLive: 'API NASA POWER en Vivo',
        sourceFallback: 'Fallback Calibrado NASA POWER',
        solarDate: 'Solar',
        moistureDate: 'Humedad',
      },
      themeTooltip: {
        toLight: 'Cambiar a Modo Claro',
        toDark: 'Cambiar a Modo Oscuro',
      },
    },
    tab1: {
      title: 'Monitoreo Global de Sequía y Bombeo Solar',
      subtitle: 'Telemetría satelital NASA POWER en vivo, detección real de distritos y despacho VFD automático',
      mobileFilterBtn: 'Filtros y Leyenda',
      zonesWord: 'Zonas',
      filteredBadge: 'Filtrado',
      filtersTitle: 'Filtros de Telemetría',
      resetFilters: 'Reiniciar',
      targetRegionLabel: 'Subregión Objetivo',
      allRegionsOption: 'Todas las Regiones',
      stapleCropLabel: 'Cultivo',
      allCropsOption: 'Todos los Cultivos',
      severityLabel: 'Severidad de Sequía',
      severities: {
        All: 'Todas',
        Severe: 'Severa',
        Moderate: 'Moderada',
        Mild: 'Leve',
      },
      crops: {
        ...SHARED_CROPS_EN,
        Maize: 'Maíz',
        Wheat: 'Trigo',
        Tomatoes: 'Tomate',
        Olives: 'Olivos',
        Almonds: 'Almendras',
        Pistachios: 'Pistachos',
        Soybeans: 'Soja',
        Cotton: 'Algodón',
        Citrus: 'Cítricos',
        'Date Palms': 'Palmeras Datileras',
        Grapes: 'Uvas',
        Rice: 'Arroz',
        Horticulture: 'Horticultura',
        'Chili & Leafy Greens': 'Chile y Hortalizas',
      },
      mapLegendTitle: 'Leyenda del Mapa',
      legendSevere: 'Estrés Severo (< 20%)',
      legendModerate: 'Estrés Moderado (20-29%)',
      legendMild: 'Leve / Óptimo (>= 30%)',
      legendPump: 'Estación de Bombeo Solar',
      globalExplorer: {
        title: 'Explorador Global de Coordenadas y Ciudades por Satélite',
        subtitle: 'Elige un referente NASA o busca cualquier ciudad / GPS del mundo para obtener datos NASA POWER y distritos reales',
        cityPlaceholder: 'Buscar cualquier ciudad del mundo (ej. Mendoza, Sevilla, Nairobi)...',
        latLabel: 'LAT',
        lonLabel: 'LON',
        fetchBtn: 'Obtener Datos NASA',
        fetchingBtn: 'Sincronizando...',
        presetsLabel: 'Referentes:',
        syncLangBtn: 'Sincronizar Idioma Regional',
        liveSourceBadge: 'API NASA POWER EN VIVO',
        fallbackSourceBadge: 'CALIBRACIÓN POR LATITUD',
        districtsPrefix: 'Distritos Reales',
        geocodeError: 'Ciudad no encontrada. Prueba otra ciudad cercana o ingresa latitud y longitud.',
        invalidCoordsError: 'Ingresa coordenadas válidas (Latitud -90 a 90, Longitud -180 a 180).',
        langNames: {
          en: 'English',
          id: 'Bahasa Indonesia',
          ar: 'العربية',
          pt: 'Português',
          es: 'Español',
          hi: 'हिन्दी',
          fr: 'Français',
        },
      },
      simulator: {
        title: 'Simulador de Clima Extremo (What-If)',
        simActive: 'Simulación Activa',
        liveBaseline: 'Línea Base NASA',
        resetBtn: 'Restaurar Datos NASA',
        rainfallLabel: 'Lluvia Diaria Simulada',
        solarLabel: 'Irradiancia Solar Simulada',
        extremeDry: '0 mm (Sequía Extrema)',
      },
      map: {
        resolutionLabel: 'Resolución:',
        resolutionValue: 'NASA SMAP / POWER 0.5°',
        pumpCapPrefix: 'Cap:',
        pumpStatuses: {
          Active: 'Activa',
          Standby: 'Espera',
          Optimizing: 'Optimizando',
        },
        interactiveHint: 'Haz clic en una zona para ver telemetría y dimensionamiento solar',
        showAllPrefix: 'Mostrar Todas',
      },
      districtsStrip: {
        title: 'Telemetría de Distritos',
      },
      priorityBanner: {
        title: 'Prioridad de Despacho Solar IA',
        pumpSitePrefix: 'Sitio Prioritario:',
        criticalMoistureText: 'humedad crítica del suelo',
        recordsText: 'registra',
        macroWetnessText: 'humedad de cuenca',
      },
      telemetryPanel: {
        title: 'Telemetría de Zona',
        droughtSuffix: 'Sequía',
        plantationSuffix: 'Parcela',
        smapMoisture: 'Humedad del Suelo (GWETTOP)',
        criticalDry: 'Seco Crítico',
        moderate: 'Moderado',
        humidOptimal: 'Óptimo',
        volumetricDepth: 'Zona radicular superficial',
        sevenDayTrend: 'Tendencia 7 Días',
        deficit: 'déficit',
        gain: 'ganancia',
        nasaRadiance: 'Radiación Solar',
        strong: 'Alto Rendimiento',
        moderateSolar: 'Moderado',
        solarPumpYield: 'Capacidad Solar',
        capacityUnit: 'Barras',
        surfaceTempLabel: 'Temp. Aire Superficial (T2M)',
      },
      peatland: {
        eyebrow: 'Alerta Temprana del Ecosistema',
        moisturePrefix: 'Humedad del suelo',
        sendWarningBtn: 'Enviar Alerta WhatsApp/SMS al Agricultor',
        confirmedTitle: 'Alerta Enviada',
        confirmedBodyPrefix: 'Aviso WhatsApp/SMS enviado a agricultores en',
      },
      solarSizing: {
        eyebrow: 'Ingeniería PV Inteligente',
        title: 'Dimensionamiento Solar y Ahorro',
        arraySizeLabel: 'Arreglo Solar Recomendado',
        panelUnit: 'Paneles 550Wp',
        dailyWaterLabel: 'Agua Bombeada Diaria Est.',
        dailyWaterUnit: 'L/día',
        dailyEnergyUnit: 'kWh/día',
        monthlySavingsLabel: 'Ahorro Mensual Est.',
        vsDiesel: 'vs Bomba Diésel',
        saveFuelPrefix: 'Ahorra',
        saveFuelSuffix: 'L diésel / mes',
      },
      advisor: {
        eyebrow: 'Motor de Telemetría Local',
        title: 'Asesor Agronómico IA SOLVARA',
        liveBriefPrefix: 'RESUMEN EN VIVO',
        quickPromptsTitle: 'Consultas Rápidas',
        analyzingPrefix: 'Analizando telemetría NASA para',
        prompts: {
          schedule: '¿Mejor horario de riego hoy?',
          peatland: '¿Plan de mitigación de estrés?',
          roi: '¿ROI Bomba Solar vs Diésel?',
        },
      },
    },
    tab2: {
      bannerTitle: 'DESPACHO AUTÓNOMO DE BOMBAS SOLARES VFD EN LÍNEA',
      bannerSubtitle: 'Modulación MPPT + Variador VFD sincronizada con NASA POWER',
      telemetryOk: 'TELEMETRÍA NOMINAL',
      kpis: {
        solarOutput: 'Salida Arreglo PV',
        solarSub: 'Seguimiento MPPT 98.6%',
        pumpCapacity: 'Caudal de Bomba',
        pumpSub: 'VFD Velocidad Variable',
        waterReserve: 'Reserva de Tanque',
        waterSub: 'Reservorio 20,000 L',
        rain3Day: 'Lluvia Prom. 3D',
        rainLatestPrefix: 'Última:',
        rainOptimalSolar: 'Solar Óptimo',
        rainActiveRecharge: 'Recarga Activa',
        yieldSaved: 'Cosecha Protegida',
        yieldSub: 'Prevención de marchitez',
      },
      heatmap: {
        title: 'Matriz de Humedad de 140 Parcelas y Riego de Emergencia',
        subtitle: 'Simula la ola radial de hidratación solar por goteo en parcelas estresadas',
        scaleLabel: 'ESCALA:',
        reRunBtn: 'Ejecutar Riego Solar de Emergencia',
        pumpingActive: 'Ola de Hidratación Activa',
        resetDemoBtn: 'Reiniciar Estrés',
        plotPrefix: 'Parcela #',
        legend: {
          severe: 'Severo',
          high: 'Estrés Alto',
          moderate: 'Moderado',
          low: 'Bajo',
          hydrated: 'Hidratado',
        },
        cellLabels: {
          hydrated: 'Hidratado (Óptimo)',
          severe: 'Estrés Severo (<15%)',
          high: 'Estrés Alto (15-25%)',
          moderate: 'Estrés Moderado (25-40%)',
          low: 'Estrés Bajo (40-60%)',
        },
      },
      vfd: {
        affinityLawPrefix: 'Ley de Afinidad: P ∝ N³',
        title: 'Optimizador de Eficiencia VFD',
        subtitle: 'Modula las RPM de la bomba según la humedad radicular en vivo',
        sourcePlotArray: 'Matriz del Campo',
        autoSyncOn: 'Auto-Sincronía ON',
        autoSyncOff: 'Auto-Sincronía OFF',
        liveRootMoisturePrefix: 'Humedad Radicular Efectiva',
        criticalWord: 'críticas',
        hydratedWord: 'hidratadas',
        zoneTelemetryPrefix: 'Telemetría de Zona',
        meanArrayPrefix: 'Promedio:',
        suggestedAdjustment: 'Ajuste Sugerido',
        optimalSynced: 'Sincronizado',
        rampDown: 'Bajar Hz',
        rampUp: 'Subir Hz',
        activeInverterSpeed: 'Velocidad Activa:',
        targetPrefix: 'Meta:',
        recommendedTooltipPrefix: 'Meta óptima:',
        manualSliderLabel: 'Control Manual de Frecuencia (20 - 50 Hz)',
        nominalRpmSuffix: 'RPM Nominal',
        syncedBtn: 'Inversor Sincronizado',
        applyBtnPrefix: 'Aplicar',
        kpiSuggestedSpeed: 'Frecuencia Meta VFD',
        kpiAdjustedFlow: 'Caudal Ajustado',
        kpiVsActivePrefix: 'vs',
        kpiVsActiveSuffix: 'activo',
        kpiInverterLoad: 'Carga del Inversor',
        kpiVsCurrentSuffix: 'kW ahorrados',
        kpiBaseline50Hz: 'Base 50 Hz',
        kpiEnergySaved: 'Energía Ahorrada',
        kpiToBatterySuffix: 'kWh/día ahorrados',
      },
      allocation: {
        title: 'Asignación de Despacho Solar',
        subtitle: 'Reparto de potencia PV en tiempo real por prioridad de zonas',
      },
      forecast: {
        title: 'Producción Hídrica · Pronóstico 24H',
        subtitlePrefix: 'Ventana pico',
        subtitleMiddle: '10:00 - 14:30',
        subtitleSuffix: 'alineada con máxima radiación',
        estTotal: 'Est. 114,500 L/día',
        peakLabel: '12h (Pico)',
      },
    },
    tab3: {
      rankBadge: 'SITIO AGROVOLTAICO #1',
      siteCodePrefix: 'CÓDIGO:',
      siteTitleSuffix: 'Dossier de Viabilidad Agrovoltaica',
      siteSubtitlePrefix: 'Inteligencia espacial multicriterio anclada a NASA POWER en',
      suitabilityScore: 'Puntuación de Aptitud',
      tierGrade: 'Nivel A Óptimo',
      confidencePrefix: 'Confianza',
      metrics: [
        { label: 'Capacidad PV', val: '120 kWp', sub: 'Bifacial elevado' },
        { label: 'Energía Anual', val: '198 MWh', sub: 'PR 81.4%' },
        { label: 'Bombeo', val: '145 m³/día', sub: 'Altura 18m TDH' },
        { label: 'Capex Est.', val: '$108K', sub: 'Llave en mano' },
        { label: 'Retorno', val: '3.4 Años', sub: 'Sin diésel' },
        { label: 'CO₂ Evitado', val: '142 t/año', sub: 'Verificado' },
        { label: 'Sombra Cultivo', val: '+18%', sub: 'Microclima fresco' },
      ],
      reasoningTitle: 'Razonamiento Espacial y Agronómico IA',
      confidenceBadgePrefix: 'Confianza del Modelo',
      reasons: [
        {
          title: 'Verificación Solar:',
          bodyBefore: 'La irradiancia NASA POWER promedia',
          bodyAfter: 'ofreciendo alto factor de planta para bombeo diurno sin ciclado profundo de baterías.',
        },
        {
          title: 'Mitigación Radicular:',
          body: 'Estructuras elevadas a 3.2 m reducen la evapotranspiración superficial entre 18–24% al mediodía.',
        },
        {
          title: 'Economía Cero-Diésel:',
          body: 'El bombeo VFD directo en CC elimina logística de combustible y estabiliza el margen agrícola.',
        },
      ],
      riskTitle: 'Nota de Mitigación de Riesgos',
      riskBodyBefore: 'La nubosidad estacional o picos térmicos pueden desplazar ciclos de bombeo. Combina',
      riskBodyHighlight: 'almacenamiento por gravedad de 20,000 L',
      riskBodyAfter: 'con alertas tempranas de WhatsApp.',
      weightsTitle: 'Pesos Multicriterio MCDA',
      weightsSubtitle: 'Modelo ponderado para priorización espacial',
      weights: [
        'Irradiancia Solar (NASA POWER)',
        'Urgencia de Déficit Hídrico',
        'Proximidad a Acuífero / Canal',
        'Sinergia de Sombra Agrícola',
        'ROI de Desplazamiento Diésel',
      ],
      solarProfileTitle: 'Curva de Generación Solar 24H',
      solarProfileSubtitle: 'Perfil horario de potencia PV',
      solarMaxBadge: 'Pico 98.4 kW',
      solarPeakZen: '12:15 (Cenit)',
      irradianceMonthlyTitle: 'Perfil Mensual de Irradiancia',
      irradianceMonthlySubtitle: 'Distribución estacional histórica (kWh/m²/día)',
      irradianceAvgBadge: 'Prom 6.08 kWh/m²',
      months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    },
    footer: {
      brandLine: 'SOLVARA Agrovoltaica Planetaria • Telemetría NASA POWER & SMAP',
      resolution: 'Malla NASA POWER 0.5° × 0.625°',
      iec: 'Rendimiento PV IEC 61724',
      vfdProtocol: 'Control VFD Modbus',
    },
    toast: {
      title: 'Alerta Temprana Enviada',
      bodyPrefix: 'Alerta WhatsApp/SMS enviada a agricultores en',
      bodyMiddle: 'para',
    },
    whatsappPreview: {
      botName: 'SOLVARA Sat-Alert Bot',
      onlineStatus: 'En línea',
      previewTag: 'Vista Móvil del Agricultor',
      todayLabel: 'HOY',
      copyBtn: 'Copiar Mensaje',
      copiedBtn: '¡Copiado!',
      closeBtn: 'Cerrar',
    },
  },
  hi: {
    header: {
      subtitle: 'वैश्विक एग्रीवोल्टाइक और सैटेलाइट सौर सिंचाई कमांड',
      langSwitcherLabel: 'भाषा चयनकर्ता',
      langSearchPlaceholder: 'भाषा खोजें...',
      langFullLabel: 'पूर्ण भाषा',
      langFallbackNote: 'स्थानीय अलर्ट + EN इंटरफ़ेस',
      langNoMatch: 'कोई भाषा नहीं मिली',
      tabs: {
        macro: 'सूखा और पंप मानचित्र',
        ops: 'सटीक सिंचाई संचालन',
        feasibility: 'साइट इंटेलिजेंस',
      },
      mobileTabs: {
        macro: 'सूखा मानचित्र',
        ops: 'संचालन',
        feasibility: 'साइट विश्लेषण',
      },
      telemetry: {
        syncing: 'NASA POWER सिंक हो रहा है...',
        live: 'NASA POWER लाइव',
        ready: 'NASA POWER तैयार',
        sourceLive: 'लाइव NASA POWER API',
        sourceFallback: 'अक्षांश कैलिब्रेटेड बैकअप',
        solarDate: 'सौर',
        moistureDate: 'नमी',
      },
      themeTooltip: {
        toLight: 'लाइट मोड पर जाएं',
        toDark: 'डार्क मोड पर जाएं',
      },
    },
    tab1: {
      title: 'वैश्विक सूखा तनाव और सौर पंप निगरानी',
      subtitle: 'लाइव NASA POWER उपग्रह टेलीमेट्री, वास्तविक जिला पहचान और स्वचालित VFD पंप प्रेषण',
      mobileFilterBtn: 'फ़िल्टर और संकेत',
      zonesWord: 'क्षेत्र',
      filteredBadge: 'फ़िल्टर किया गया',
      filtersTitle: 'टेलीमेट्री फ़िल्टर',
      resetFilters: 'रीसेट',
      targetRegionLabel: 'लक्ष्य उप-क्षेत्र',
      allRegionsOption: 'सभी क्षेत्र',
      stapleCropLabel: 'फसल',
      allCropsOption: 'सभी फसलें',
      severityLabel: 'सूखे की गंभीरता',
      severities: {
        All: 'सभी',
        Severe: 'गंभीर',
        Moderate: 'मध्यम',
        Mild: 'सामान्य',
      },
      crops: {
        ...SHARED_CROPS_EN,
        Maize: 'मक्का',
        Wheat: 'गेहूं',
        Tomatoes: 'टमाटर',
        Olives: 'जैतून',
        Almonds: 'बादाम',
        Pistachios: 'पिस्ता',
        Soybeans: 'सोयाबीन',
        Cotton: 'कपास',
        Citrus: 'नींबू वर्गीय',
        'Date Palms': 'खजूर',
        Grapes: 'अंगूर',
        Rice: 'धान',
        Horticulture: 'बागवानी',
        'Chili & Leafy Greens': 'मिर्च और पत्तेदार सब्जियां',
      },
      mapLegendTitle: 'मानचित्र संकेत',
      legendSevere: 'गंभीर तनाव (< 20%)',
      legendModerate: 'मध्यम तनाव (20-29%)',
      legendMild: 'सामान्य / उत्तम (>= 30%)',
      legendPump: 'सौर पंप स्टेशन',
      globalExplorer: {
        title: 'वैश्विक उपग्रह निर्देशांक और शहर एक्सप्लोरर',
        subtitle: 'नासा पार्टनर बेंचमार्क चुनें या लाइव NASA POWER और वास्तविक जिला नामों के लिए दुनिया का कोई भी शहर खोजें',
        cityPlaceholder: 'दुनिया का कोई भी शहर खोजें (जैसे: जयपुर, नैरोबी, सेविले)...',
        latLabel: 'अक्षांश',
        lonLabel: 'देशांतर',
        fetchBtn: 'नासा डेटा प्राप्त करें',
        fetchingBtn: 'सिंक हो रहा है...',
        presetsLabel: 'बेंचमार्क:',
        syncLangBtn: 'क्षेत्र की भाषा चुनें',
        liveSourceBadge: 'लाइव NASA POWER API',
        fallbackSourceBadge: 'अक्षांश कैलिब्रेटेड फ़ॉलबैक',
        districtsPrefix: 'वास्तविक जिले',
        geocodeError: 'शहर नहीं मिला। कृपया नजदीकी शहर आज़माएँ या अक्षांश/देशांतर दर्ज करें।',
        invalidCoordsError: 'कृपया मान्य निर्देशांक दर्ज करें (अक्षांश -90 से 90, देशांतर -180 से 180)।',
        langNames: {
          en: 'English',
          id: 'Bahasa Indonesia',
          ar: 'العربية',
          pt: 'Português',
          es: 'Español',
          hi: 'हिन्दी',
          fr: 'Français',
        },
      },
      simulator: {
        title: 'चरम मौसम सिम्युलेटर (What-If)',
        simActive: 'सिमुलेशन सक्रिय',
        liveBaseline: 'लाइव नासा बेसलाइन',
        resetBtn: 'लाइव नासा डेटा पर रीसेट करें',
        rainfallLabel: 'दैनिक वर्षा सिमुलेशन',
        solarLabel: 'सौर विकिरण सिमुलेशन',
        extremeDry: '0 मिमी (अत्यधिक सूखा)',
      },
      map: {
        resolutionLabel: 'स्थानिक रिज़ॉल्यूशन:',
        resolutionValue: 'NASA SMAP / POWER 0.5°',
        pumpCapPrefix: 'क्षमता:',
        pumpStatuses: {
          Active: 'सक्रिय',
          Standby: 'स्टैंडबाय',
          Optimizing: 'अनुकूलन',
        },
        interactiveHint: 'टेलीमेट्री और सौर पंप आकार देखने के लिए किसी भी क्षेत्र पर क्लिक करें',
        showAllPrefix: 'सभी दिखाएं',
      },
      districtsStrip: {
        title: 'जिला टेलीमेट्री',
      },
      priorityBanner: {
        title: 'AI सौर पंप प्रेषण प्राथमिकता',
        pumpSitePrefix: 'प्राथमिकता स्थल:',
        criticalMoistureText: 'गंभीर मिट्टी नमी',
        recordsText: 'दर्ज करता है',
        macroWetnessText: 'बेसिन मिट्टी नमी',
      },
      telemetryPanel: {
        title: 'क्षेत्र टेलीमेट्री',
        droughtSuffix: 'सूखा',
        plantationSuffix: 'प्लॉट',
        smapMoisture: 'मिट्टी की नमी (GWETTOP)',
        criticalDry: 'अत्यंत शुष्क',
        moderate: 'मध्यम',
        humidOptimal: 'उत्तम',
        volumetricDepth: 'सतह जड़ क्षेत्र',
        sevenDayTrend: '7-दिन नमी रुझान',
        deficit: 'कमी',
        gain: 'वृद्धि',
        nasaRadiance: 'सौर विकिरण',
        strong: 'उच्च उत्पादन',
        moderateSolar: 'मध्यम',
        solarPumpYield: 'सौर पंप क्षमता',
        capacityUnit: 'बार',
        surfaceTempLabel: 'सतह वायु तापमान (T2M)',
      },
      peatland: {
        eyebrow: 'पारिस्थितिकी तंत्र प्रारंभिक चेतावनी',
        moisturePrefix: 'मिट्टी की नमी',
        sendWarningBtn: 'किसान WhatsApp/SMS चेतावनी भेजें',
        confirmedTitle: 'चेतावनी भेजी गई',
        confirmedBodyPrefix: 'किसानों के लिए WhatsApp/SMS चेतावनी भेजी गई:',
      },
      solarSizing: {
        eyebrow: 'स्मार्ट पीवी इंजीनियरिंग',
        title: 'सौर पंप साइजिंग और ईंधन बचत',
        arraySizeLabel: 'अनुशंसित सौर पैनल',
        panelUnit: '550Wp पैनल',
        dailyWaterLabel: 'दैनिक जल पंपिंग अनुमान',
        dailyWaterUnit: 'ली/दिन',
        dailyEnergyUnit: 'kWh/दिन',
        monthlySavingsLabel: 'मासिक ईंधन बचत अनुमान',
        vsDiesel: 'बनाम डीजल पंप',
        saveFuelPrefix: 'बचत',
        saveFuelSuffix: 'ली डीजल / माह',
      },
      advisor: {
        eyebrow: 'स्थानीय टेलीमेट्री इंजन',
        title: 'SOLVARA AI कृषि सलाहकार',
        liveBriefPrefix: 'लाइव सारांश',
        quickPromptsTitle: 'त्वरित कृषि प्रश्न',
        analyzingPrefix: 'नासा टेलीमेट्री विश्लेषण:',
        prompts: {
          schedule: 'आज सिंचाई का सर्वोत्तम समय?',
          peatland: 'तनाव शमन योजना क्या है?',
          roi: 'डीजल बनाम सौर पंप ROI?',
        },
      },
    },
    tab2: {
      bannerTitle: 'स्वायत्त सौर VFD पंप प्रेषण सक्रिय',
      bannerSubtitle: 'NASA POWER उपग्रह डेटा के साथ MPPT + VFD नियंत्रण सिंक्रनाइज़',
      telemetryOk: 'टेलीमेट्री सामान्य',
      kpis: {
        solarOutput: 'PV पैनल आउटपुट',
        solarSub: 'MPPT ट्रैकिंग 98.6%',
        pumpCapacity: 'पंप प्रवाह दर',
        pumpSub: 'वेरिएबल स्पीड VFD',
        waterReserve: 'टैंक जल भंडार',
        waterSub: '20,000 ली जलाशय',
        rain3Day: '3-दिन औसत वर्षा',
        rainLatestPrefix: 'नवीनतम:',
        rainOptimalSolar: 'उत्तम सौर',
        rainActiveRecharge: 'सक्रिय रिचार्ज',
        yieldSaved: 'फसल उपज सुरक्षित',
        yieldSub: 'मुरझाने से बचाव',
      },
      heatmap: {
        title: '140-प्लॉट नमी मैट्रिक्स और आपातकालीन सिंचाई',
        subtitle: 'प्रभावित प्लॉटों में रेडियल सौर ड्रिप सिंचाई का सिमुलेशन करें',
        scaleLabel: 'स्केल:',
        reRunBtn: 'आपातकालीन सौर सिंचाई चलाएं',
        pumpingActive: 'सिंचाई तरंग सक्रिय',
        resetDemoBtn: 'फील्ड तनाव रीसेट करें',
        plotPrefix: 'प्लॉट #',
        legend: {
          severe: 'गंभीर',
          high: 'उच्च तनाव',
          moderate: 'मध्यम',
          low: 'कम तनाव',
          hydrated: 'सिंचित',
        },
        cellLabels: {
          hydrated: 'सिंचित (उत्तम)',
          severe: 'गंभीर तनाव (<15%)',
          high: 'उच्च तनाव (15-25%)',
          moderate: 'मध्यम तनाव (25-40%)',
          low: 'कम तनाव (40-60%)',
        },
      },
      vfd: {
        affinityLawPrefix: 'एफिनिटी नियम: P ∝ N³',
        title: 'VFD दक्षता ऑप्टिमाइज़र',
        subtitle: 'जड़ क्षेत्र की लाइव नमी के अनुसार पंप की गति स्वचालित समायोजित करें',
        sourcePlotArray: 'फील्ड मैट्रिक्स',
        autoSyncOn: 'ऑटो-सिंक चालू',
        autoSyncOff: 'ऑटो-सिंक बंद',
        liveRootMoisturePrefix: 'प्रभावी जड़ नमी',
        criticalWord: 'गंभीर',
        hydratedWord: 'सिंचित',
        zoneTelemetryPrefix: 'क्षेत्र टेलीमेट्री',
        meanArrayPrefix: 'औसत:',
        suggestedAdjustment: 'सुझावित बदलाव',
        optimalSynced: 'इष्टतम सिंक',
        rampDown: 'गति घटाएं',
        rampUp: 'गति बढ़ाएं',
        activeInverterSpeed: 'सक्रिय इन्वर्टर गति:',
        targetPrefix: 'लक्ष्य:',
        recommendedTooltipPrefix: 'इष्टतम लक्ष्य:',
        manualSliderLabel: 'मैनुअल आवृत्ति नियंत्रण (20 - 50 Hz)',
        nominalRpmSuffix: 'नॉमिनल RPM',
        syncedBtn: 'इन्वर्टर सिंक',
        applyBtnPrefix: 'लागू करें',
        kpiSuggestedSpeed: 'लक्ष्य VFD गति',
        kpiAdjustedFlow: 'समायोजित प्रवाह',
        kpiVsActivePrefix: 'बनाम',
        kpiVsActiveSuffix: 'सक्रिय',
        kpiInverterLoad: 'इन्वर्टर लोड',
        kpiVsCurrentSuffix: 'kW बचत',
        kpiBaseline50Hz: '50 Hz बेसलाइन',
        kpiEnergySaved: 'ऊर्जा बचत',
        kpiToBatterySuffix: 'kWh/दिन बचत',
      },
      allocation: {
        title: 'सौर ऊर्जा वितरण',
        subtitle: 'शीर्ष प्राथमिकता वाले क्षेत्रों में लाइव PV शक्ति विभाजन',
      },
      forecast: {
        title: 'जल उत्पादन · 24 घंटे सौर पूर्वानुमान',
        subtitlePrefix: 'शिखर पंपिंग अवधि',
        subtitleMiddle: '10:00 - 14:30',
        subtitleSuffix: 'उच्चतम विकिरण के साथ संरेखित',
        estTotal: 'अनुमानित 114,500 ली/दिन',
        peakLabel: '12बजे (शिखर)',
      },
    },
    tab3: {
      rankBadge: 'रैंक #1 एग्रीवोल्टाइक साइट',
      siteCodePrefix: 'साइट कोड:',
      siteTitleSuffix: 'एग्रीवोल्टाइक व्यवहार्यता डोजियर',
      siteSubtitlePrefix: 'लाइव NASA POWER टेलीमेट्री पर आधारित बहु-मानदंड स्थानिक विश्लेषण:',
      suitabilityScore: 'उपयुक्तता स्कोर',
      tierGrade: 'टियर-A प्रमुख',
      confidencePrefix: 'विश्वसनीयता',
      metrics: [
        { label: 'PV क्षमता', val: '120 kWp', sub: 'बाइफेशियल पैनल' },
        { label: 'वार्षिक ऊर्जा', val: '198 MWh', sub: 'PR 81.4%' },
        { label: 'जल उठाव', val: '145 m³/दिन', sub: '18m TDH हेड' },
        { label: 'अनुमानित लागत', val: '$108K', sub: 'टर्नकी + VFD' },
        { label: 'पेबैक', val: '3.4 वर्ष', sub: 'डीजल मुक्त' },
        { label: 'CO₂ कमी', val: '142 t/वर्ष', sub: 'सत्यापित' },
        { label: 'फसल छाया', val: '+18%', sub: 'सूक्ष्म जलवायु लाभ' },
      ],
      reasoningTitle: 'AI स्थानिक और कृषि तर्क',
      confidenceBadgePrefix: 'मॉडल विश्वसनीयता',
      reasons: [
        {
          title: 'सौर संसाधन सत्यापन:',
          bodyBefore: 'NASA POWER सतह विकिरण औसत',
          bodyAfter: 'जो दिन के समय VFD पंपिंग के लिए उच्च क्षमता कारक प्रदान करता है।',
        },
        {
          title: 'जड़ क्षेत्र वाष्पीकरण में कमी:',
          body: '3.2 मीटर ऊंचे सौर पैनल दोपहर की गर्मी में मिट्टी के वाष्पीकरण को 18–24% कम करते हैं।',
        },
        {
          title: 'शून्य-डीजल हाइड्रोलिक अर्थव्यवस्था:',
          body: 'सीधा DC-कपल्ड VFD पंप ईंधन परिवहन खर्च समाप्त करता है और किसानों की आय बढ़ाता है।',
        },
      ],
      riskTitle: 'साइट जोखिम न्यूनीकरण नोट',
      riskBodyBefore: 'मौसमी बादल या अत्यधिक गर्मी पंप चक्र को प्रभावित कर सकती है।',
      riskBodyHighlight: '20,000 लीटर गुरुत्वाकर्षण भंडारण टैंक',
      riskBodyAfter: 'को स्वचालित WhatsApp चेतावनी के साथ जोड़ें।',
      weightsTitle: 'MCDA मानदंड भार',
      weightsSubtitle: 'साइट रैंकिंग के लिए भारित स्थानिक मॉडल',
      weights: [
        'सौर विकिरण (NASA POWER)',
        'मिट्टी नमी कमी की तात्कालिकता',
        'जलभृत / नहर निकटता',
        'फसल छाया तालमेल',
        'डीजल प्रतिस्थापन ROI',
      ],
      solarProfileTitle: '24 घंटे सौर उत्पादन वक्र',
      solarProfileSubtitle: 'प्रति घंटा PV पैनल ऊर्जा आउटपुट',
      solarMaxBadge: 'शिखर 98.4 kW',
      solarPeakZen: '12:15 (शिखर)',
      irradianceMonthlyTitle: '12-माह विकिरण प्रोफ़ाइल',
      irradianceMonthlySubtitle: 'ऐतिहासिक मौसमी वितरण (kWh/m²/दिन)',
      irradianceAvgBadge: 'औसत 6.08 kWh/m²',
      months: ['जन', 'फर', 'मार्च', 'अप्रै', 'मई', 'जून', 'जुल', 'अग', 'सित', 'अक्टू', 'नव', 'दिस'],
    },
    footer: {
      brandLine: 'SOLVARA वैश्विक एग्रीवोल्टाइक • NASA POWER और SMAP टेलीमेट्री सुइट',
      resolution: '0.5° × 0.625° NASA POWER ग्रिड',
      iec: 'IEC 61724 PV प्रदर्शन',
      vfdProtocol: 'Modbus VFD नियंत्रण',
    },
    toast: {
      title: 'किसान प्रारंभिक चेतावनी भेजी गई',
      bodyPrefix: 'WhatsApp/SMS चेतावनी भेजी गई:',
      bodyMiddle: 'क्षेत्र',
    },
    whatsappPreview: {
      botName: 'SOLVARA Sat-Alert Bot',
      onlineStatus: 'ऑनलाइन',
      previewTag: 'किसान मोबाइल पूर्वावलोकन',
      todayLabel: 'आज',
      copyBtn: 'संदेश कॉपी करें',
      copiedBtn: 'कॉपी हो गया!',
      closeBtn: 'बंद करें',
    },
  },
  fr: {
    header: {
      subtitle: 'Centre de Commandement Agrivoltaïque et Irrigation Solaire Satellitaire',
      langSwitcherLabel: 'Sélecteur de langue',
      langSearchPlaceholder: 'Rechercher une langue...',
      langFullLabel: 'Interface Complète',
      langFallbackNote: 'Alertes locales + interface EN',
      langNoMatch: 'Aucune langue trouvée',
      tabs: {
        macro: 'Carte Sécheresse & Pompes',
        ops: 'Opérations Irrigation',
        feasibility: 'Intelligence de Site',
      },
      mobileTabs: {
        macro: 'Carte Sécheresse',
        ops: 'Opérations',
        feasibility: 'Étude Site',
      },
      telemetry: {
        syncing: 'Synchro NASA POWER...',
        live: 'NASA POWER En Direct',
        ready: 'NASA POWER Prêt',
        sourceLive: 'API NASA POWER en Direct',
        sourceFallback: 'Secours Calibré NASA POWER',
        solarDate: 'Solaire',
        moistureDate: 'Humidité',
      },
      themeTooltip: {
        toLight: 'Passer en Mode Clair',
        toDark: 'Passer en Mode Sombre',
      },
    },
    tab1: {
      title: 'Surveillance Mondiale de la Sécheresse & Pompage Solaire',
      subtitle: 'Télémétrie NASA POWER en direct, détection réelle des districts et pilotage VFD automatisé',
      mobileFilterBtn: 'Filtres & Légende',
      zonesWord: 'Zones',
      filteredBadge: 'Filtré',
      filtersTitle: 'Filtres Télémétrie',
      resetFilters: 'Réinitialiser',
      targetRegionLabel: 'Sous-Région Cible',
      allRegionsOption: 'Toutes les Régions',
      stapleCropLabel: 'Culture',
      allCropsOption: 'Toutes les Cultures',
      severityLabel: 'Sévérité Sécheresse',
      severities: {
        All: 'Toutes',
        Severe: 'Sévère',
        Moderate: 'Modérée',
        Mild: 'Faible',
      },
      crops: {
        ...SHARED_CROPS_EN,
        Maize: 'Maïs',
        Wheat: 'Blé',
        Tomatoes: 'Tomates',
        Olives: 'Olives',
        Almonds: 'Amandes',
        Pistachios: 'Pistaches',
        Soybeans: 'Soja',
        Cotton: 'Coton',
        Citrus: 'Agrumes',
        'Date Palms': 'Palmiers Dattiers',
        Grapes: 'Raisins',
        Rice: 'Riz',
        Horticulture: 'Horticulture',
        'Chili & Leafy Greens': 'Piments & Légumes Feuillus',
      },
      mapLegendTitle: 'Légende de la Carte',
      legendSevere: 'Stress Sévère (< 20%)',
      legendModerate: 'Stress Modéré (20-29%)',
      legendMild: 'Faible / Optimal (>= 30%)',
      legendPump: 'Station de Pompage Solaire',
      globalExplorer: {
        title: 'Explorateur Mondial de Coordonnées & Villes par Satellite',
        subtitle: 'Choisissez un site NASA ou recherchez toute ville / GPS dans le monde pour les données NASA POWER et les districts réels',
        cityPlaceholder: 'Rechercher une ville mondiale (ex: Dakar, Séville, Nairobi, Mendoza)...',
        latLabel: 'LAT',
        lonLabel: 'LON',
        fetchBtn: 'Charger Données NASA',
        fetchingBtn: 'Synchronisation...',
        presetsLabel: 'Références :',
        syncLangBtn: 'Synchroniser Langue Régionale',
        liveSourceBadge: 'API NASA POWER EN DIRECT',
        fallbackSourceBadge: 'CALIBRATION PAR LATITUDE',
        districtsPrefix: 'Districts Réels',
        geocodeError: 'Ville introuvable. Essayez une ville voisine ou saisissez latitude/longitude.',
        invalidCoordsError: 'Veuillez saisir des coordonnées valides (Latitude -90 à 90, Longitude -180 à 180).',
        langNames: {
          en: 'English',
          id: 'Bahasa Indonesia',
          ar: 'العربية',
          pt: 'Português',
          es: 'Español',
          hi: 'हिन्दी',
          fr: 'Français',
        },
      },
      simulator: {
        title: 'Simulateur Climatique Extrême (What-If)',
        simActive: 'Simulation Active',
        liveBaseline: 'Référence NASA Live',
        resetBtn: 'Rétablir Données NASA',
        rainfallLabel: 'Pluie Quotidienne Simulée',
        solarLabel: 'Irradiance Solaire Simulée',
        extremeDry: '0 mm (Sécheresse Extrême)',
      },
      map: {
        resolutionLabel: 'Résolution :',
        resolutionValue: 'NASA SMAP / POWER 0.5°',
        pumpCapPrefix: 'Cap :',
        pumpStatuses: {
          Active: 'Active',
          Standby: 'Veille',
          Optimizing: 'Optimisation',
        },
        interactiveHint: 'Cliquez sur une zone pour inspecter la télémétrie et le dimensionnement PV',
        showAllPrefix: 'Tout Afficher',
      },
      districtsStrip: {
        title: 'Télémétrie des Districts',
      },
      priorityBanner: {
        title: 'Priorité de Pompage Solaire IA',
        pumpSitePrefix: 'Site Prioritaire :',
        criticalMoistureText: 'humidité critique du sol',
        recordsText: 'enregistre',
        macroWetnessText: 'humidité du bassin',
      },
      telemetryPanel: {
        title: 'Télémétrie de Zone',
        droughtSuffix: 'Sécheresse',
        plantationSuffix: 'Parcelle',
        smapMoisture: 'Humidité du Sol (GWETTOP)',
        criticalDry: 'Sec Critique',
        moderate: 'Modéré',
        humidOptimal: 'Optimal',
        volumetricDepth: 'Zone racinaire de surface',
        sevenDayTrend: 'Tendance 7 Jours',
        deficit: 'déficit',
        gain: 'gain',
        nasaRadiance: 'Rayonnement Solaire',
        strong: 'Haut Rendement',
        moderateSolar: 'Modéré',
        solarPumpYield: 'Capacité Solaire',
        capacityUnit: 'Barres',
        surfaceTempLabel: 'Temp. Air Surface (T2M)',
      },
      peatland: {
        eyebrow: 'Alerte Précoce Écosystème',
        moisturePrefix: 'Humidité du sol',
        sendWarningBtn: 'Envoyer Alerte WhatsApp/SMS Agriculteur',
        confirmedTitle: 'Alerte Envoyée',
        confirmedBodyPrefix: 'Alerte WhatsApp/SMS envoyée aux agriculteurs de',
      },
      solarSizing: {
        eyebrow: 'Ingénierie PV Intelligente',
        title: 'Dimensionnement Solaire & Économies',
        arraySizeLabel: 'Champ Solaire Recommandé',
        panelUnit: 'Panneaux 550Wc',
        dailyWaterLabel: 'Eau Pompée / Jour Est.',
        dailyWaterUnit: 'L/jour',
        dailyEnergyUnit: 'kWh/jour',
        monthlySavingsLabel: 'Économies Mensuelles Est.',
        vsDiesel: 'vs Pompe Diesel',
        saveFuelPrefix: 'Économise',
        saveFuelSuffix: 'L diesel / mois',
      },
      advisor: {
        eyebrow: 'Moteur Télémétrie Local',
        title: 'Conseiller Agronomique IA SOLVARA',
        liveBriefPrefix: 'SYNTHÈSE LIVE',
        quickPromptsTitle: 'Questions Rapides',
        analyzingPrefix: 'Analyse télémétrie NASA pour',
        prompts: {
          schedule: 'Meilleur horaire d’irrigation aujourd’hui ?',
          peatland: 'Plan d’atténuation du stress ?',
          roi: 'ROI Pompe Solaire vs Diesel ?',
        },
      },
    },
    tab2: {
      bannerTitle: 'PILOTAGE AUTONOME DES POMPES SOLAIRES VFD ACTIF',
      bannerSubtitle: 'Modulation MPPT + Variateur VFD synchronisée avec NASA POWER',
      telemetryOk: 'TÉLÉMÉTRIE NOMINALE',
      kpis: {
        solarOutput: 'Puissance PV',
        solarSub: 'Suivi MPPT 98.6%',
        pumpCapacity: 'Débit Pompe',
        pumpSub: 'VFD Vitesse Variable',
        waterReserve: 'Réserve Tampon',
        waterSub: 'Réservoir 20 000 L',
        rain3Day: 'Pluie Moy. 3J',
        rainLatestPrefix: 'Dernière :',
        rainOptimalSolar: 'Solaire Optimal',
        rainActiveRecharge: 'Recharge Active',
        yieldSaved: 'Récolte Protégée',
        yieldSub: 'Prévention du flétrissement',
      },
      heatmap: {
        title: 'Matrice d’Humidité 140 Parcelles & Irrigation d’Urgence',
        subtitle: 'Simulez une onde radiale d’irrigation goutte-à-goutte solaire',
        scaleLabel: 'ÉCHELLE :',
        reRunBtn: 'Lancer Irrigation Solaire',
        pumpingActive: 'Onde d’Hydratation Active',
        resetDemoBtn: 'Réinitialiser Stress',
        plotPrefix: 'Parcelle #',
        legend: {
          severe: 'Sévère',
          high: 'Stress Élevé',
          moderate: 'Modéré',
          low: 'Faible',
          hydrated: 'Hydraté',
        },
        cellLabels: {
          hydrated: 'Hydraté (Optimal)',
          severe: 'Stress Sévère (<15%)',
          high: 'Stress Élevé (15-25%)',
          moderate: 'Stress Modéré (25-40%)',
          low: 'Stress Faible (40-60%)',
        },
      },
      vfd: {
        affinityLawPrefix: 'Loi d’Affinité : P ∝ N³',
        title: 'Optimiseur d’Efficacité VFD',
        subtitle: 'Adaptez la vitesse de pompe selon l’humidité racinaire en direct',
        sourcePlotArray: 'Matrice Champ',
        autoSyncOn: 'Synchro Auto ON',
        autoSyncOff: 'Synchro Auto OFF',
        liveRootMoisturePrefix: 'Humidité Racinaire Effective',
        criticalWord: 'critiques',
        hydratedWord: 'hydratées',
        zoneTelemetryPrefix: 'Télémétrie Zone',
        meanArrayPrefix: 'Moyenne :',
        suggestedAdjustment: 'Ajustement Suggéré',
        optimalSynced: 'Synchronisé',
        rampDown: 'Réduire Hz',
        rampUp: 'Augmenter Hz',
        activeInverterSpeed: 'Vitesse Onduleur Active :',
        targetPrefix: 'Cible :',
        recommendedTooltipPrefix: 'Cible optimale :',
        manualSliderLabel: 'Réglage Manuel Fréquence (20 - 50 Hz)',
        nominalRpmSuffix: 'RPM Nominal',
        syncedBtn: 'Onduleur Synchronisé',
        applyBtnPrefix: 'Appliquer',
        kpiSuggestedSpeed: 'Fréquence Cible VFD',
        kpiAdjustedFlow: 'Débit Ajusté',
        kpiVsActivePrefix: 'vs',
        kpiVsActiveSuffix: 'actif',
        kpiInverterLoad: 'Charge Onduleur',
        kpiVsCurrentSuffix: 'kW économisés',
        kpiBaseline50Hz: 'Base 50 Hz',
        kpiEnergySaved: 'Énergie Économisée',
        kpiToBatterySuffix: 'kWh/jour économisés',
      },
      allocation: {
        title: 'Allocation Solaire',
        subtitle: 'Répartition en direct de la puissance PV vers les zones prioritaires',
      },
      forecast: {
        title: 'Production d’Eau · Prévision 24H',
        subtitlePrefix: 'Fenêtre de pointe',
        subtitleMiddle: '10:00 - 14:30',
        subtitleSuffix: 'alignée sur l’irradiance maximale',
        estTotal: 'Est. 114 500 L/jour',
        peakLabel: '12h (Pic)',
      },
    },
    tab3: {
      rankBadge: 'SITE AGRIVOLTAÏQUE #1',
      siteCodePrefix: 'CODE :',
      siteTitleSuffix: 'Dossier de Faisabilité Agrivoltaïque',
      siteSubtitlePrefix: 'Intelligence spatiale multicritère ancrée aux données NASA POWER à',
      suitabilityScore: 'Score d’Aptitude',
      tierGrade: 'Classe A Prime',
      confidencePrefix: 'Confiance',
      metrics: [
        { label: 'Capacité PV', val: '120 kWc', sub: 'Bifacial surélevé' },
        { label: 'Production/an', val: '198 MWh', sub: 'PR 81.4%' },
        { label: 'Pompage', val: '145 m³/jour', sub: 'HMT 18m' },
        { label: 'Capex Est.', val: '$108K', sub: 'Clé en main + VFD' },
        { label: 'Retour', val: '3.4 Ans', sub: 'Hors diesel' },
        { label: 'CO₂ Évité', val: '142 t/an', sub: 'Vérifié' },
        { label: 'Ombrage Utile', val: '+18%', sub: 'Microclimat frais' },
      ],
      reasoningTitle: 'Analyse Spatiale & Agronomique IA',
      confidenceBadgePrefix: 'Confiance Modèle',
      reasons: [
        {
          title: 'Vérification Solaire :',
          bodyBefore: 'L’irradiance NASA POWER atteint en moyenne',
          bodyAfter: 'assurant un fort facteur de charge diurne sans cyclage profond de batteries.',
        },
        {
          title: 'Réduction du Stress Hydrique :',
          body: 'Des structures surélevées à 3,2 m réduisent l’évapotranspiration du sol de 18 à 24 % aux pics thermiques.',
        },
        {
          title: 'Économie Zéro-Diesel :',
          body: 'Le pompage VFD couplé en CC supprime la logistique carburant et stabilise les revenus agricoles.',
        },
      ],
      riskTitle: 'Note d’Atténuation des Risques',
      riskBodyBefore: 'La nébulosité saisonnière ou les pics thermiques peuvent décaler les cycles. Associez',
      riskBodyHighlight: 'un réservoir gravitaire de 20 000 L',
      riskBodyAfter: 'aux alertes automatisées WhatsApp.',
      weightsTitle: 'Critères Pondérés MCDA',
      weightsSubtitle: 'Cadre de notation spatiale pour le classement des sites',
      weights: [
        'Irradiance Solaire (NASA POWER)',
        'Urgence Déficit Hydrique',
        'Proximité Aquifère / Canal',
        'Synergie Ombrage Cultural',
        'ROI Substitution Diesel',
      ],
      solarProfileTitle: 'Courbe Solaire 24H',
      solarProfileSubtitle: 'Profil horaire de puissance PV',
      solarMaxBadge: 'Pic 98.4 kW',
      solarPeakZen: '12:15 (Zénith)',
      irradianceMonthlyTitle: 'Profil Mensuel d’Irradiance',
      irradianceMonthlySubtitle: 'Distribution saisonnière historique (kWh/m²/jour)',
      irradianceAvgBadge: 'Moy 6.08 kWh/m²',
      months: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
    },
    footer: {
      brandLine: 'SOLVARA Agrivoltaïque Planétaire • Télémétrie NASA POWER & SMAP',
      resolution: 'Grille NASA POWER 0.5° × 0.625°',
      iec: 'Performance PV IEC 61724',
      vfdProtocol: 'Contrôle VFD Modbus',
    },
    toast: {
      title: 'Alerte Précoce Envoyée',
      bodyPrefix: 'Alerte WhatsApp/SMS envoyée aux agriculteurs de',
      bodyMiddle: 'pour',
    },
    whatsappPreview: {
      botName: 'SOLVARA Sat-Alert Bot',
      onlineStatus: 'En ligne',
      previewTag: 'Aperçu Mobile Agriculteur',
      todayLabel: 'AUJOURD’HUI',
      copyBtn: 'Copier le message',
      copiedBtn: 'Copié !',
      closeBtn: 'Fermer',
    },
  },
};

export function getEcosystemRiskCopy(
  lang: FullLang,
  ecosystem: EcosystemType,
  level: 'critical' | 'moderate' | 'low'
): { cardTitle: string; label: string; advice: string } {
  const isPeat = ecosystem === 'peatland';
  const isDesert = ecosystem === 'desert_oasis' || ecosystem === 'arid_orchard';

  if (lang === 'id') {
    const cardTitle = isPeat
      ? 'Peringatan Dini Risiko Kebakaran Gambut'
      : isDesert
      ? 'Risiko Panas Ekstrem & Layu Tanaman'
      : 'Risiko Defisit Kelembapan Ekosistem';
    if (level === 'critical') {
      return {
        cardTitle,
        label: isPeat ? 'KRITIS — RISIKO KARHUTLA GAMBUT TINGGI' : 'KRITIS — STRES KEKERINGAN & LAYU EKSTREM',
        advice: isPeat
          ? 'Segera aktifkan pembasahan gambut VFD dan kirim peringatan ke kelompok tani.'
          : 'Aktifkan pompa surya penuh & jadwalkan irigasi tetes sebelum puncak panas siang.',
      };
    }
    if (level === 'moderate') {
      return {
        cardTitle,
        label: isPeat ? 'WASPADA — PERMUKAAN GAMBUT MENGERING' : 'WASPADA — DEFISIT AIR ZONA AKAR',
        advice: 'Tingkatkan siklus irigasi surya pada jendela 08:30–14:30 untuk menjaga kelembapan.',
      };
    }
    return {
      cardTitle,
      label: 'AMAN — KELEMBAPAN EKOSISTEM TERJAGA',
      advice: 'Pertahankan mode VFD Eco dan lanjutkan pemantauan satelit NASA POWER.',
    };
  }

  if (lang === 'ar') {
    const cardTitle = isPeat
      ? 'إنذار حرائق أراضي الخث'
      : isDesert
      ? 'مخاطر الحرارة الصحراوية الشديدة والذبول'
      : 'مخاطر عجز رطوبة التربة';
    if (level === 'critical') {
      return {
        cardTitle,
        label: isDesert ? 'حرج — إجهاد حراري وذبول شديد' : 'حرج — خطر جفاف واشتعال مرتفع',
        advice: 'فعّل الضخ الشمسي الفوري وأرسل تنبيهاً عاجلاً للمزارعين لحماية الجذور.',
      };
    }
    if (level === 'moderate') {
      return {
        cardTitle,
        label: 'تنبيه — انخفاض رطوبة منطقة الجذور',
        advice: 'زد دورة الري الشمسي خلال ذروة السطوع لتثبيت رطوبة التربة.',
      };
    }
    return {
      cardTitle,
      label: 'آمن — رطوبة النظام البيئي مستقرة',
      advice: 'حافظ على وضع VFD الاقتصادي وتابع القياس الفضائي من ناسا.',
    };
  }

  if (lang === 'pt') {
    const cardTitle = isPeat
      ? 'Alerta de Risco de Fogo em Turfeiras'
      : isDesert
      ? 'Risco de Calor Árido e Murcha'
      : 'Risco de Déficit Hídrico na Savana';
    if (level === 'critical') {
      return {
        cardTitle,
        label: isDesert ? 'CRÍTICO — CALOR EXTREMO E ESTRESSE' : 'CRÍTICO — RISCO SEVERO DE SECA',
        advice: 'Acione bombeamento solar máximo e dispare alerta imediato aos produtores.',
      };
    }
    if (level === 'moderate') {
      return {
        cardTitle,
        label: 'ALERTA — DÉFICIT NA ZONA RADICULAR',
        advice: 'Amplie o ciclo de irrigação solar entre 08:30 e 14:30.',
      };
    }
    return {
      cardTitle,
      label: 'SEGURO — UMIDADE ESTÁVEL',
      advice: 'Mantenha o modo VFD Eco com monitoramento contínuo NASA POWER.',
    };
  }

  if (lang === 'es') {
    const cardTitle = isPeat
      ? 'Alerta de Riesgo en Turberas'
      : isDesert
      ? 'Riesgo de Calor Extremo y Marchitez'
      : 'Riesgo de Déficit Hídrico';
    if (level === 'critical') {
      return {
        cardTitle,
        label: isDesert ? 'CRÍTICO — CALOR ÁRIDO Y MARCHITEZ' : 'CRÍTICO — SEQUÍA SEVERA',
        advice: 'Activa bombeo solar VFD al máximo y envía alerta temprana al agricultor.',
      };
    }
    if (level === 'moderate') {
      return {
        cardTitle,
        label: 'ALERTA — DÉFICIT RADICULAR',
        advice: 'Incrementa el riego solar en la ventana de mayor irradiancia.',
      };
    }
    return {
      cardTitle,
      label: 'SEGURO — HUMEDAD EQUILIBRADA',
      advice: 'Mantén modo VFD Eco bajo vigilancia satelital NASA POWER.',
    };
  }

  if (lang === 'hi') {
    const cardTitle = isPeat
      ? 'पीटलैंड अग्नि जोखिम चेतावनी'
      : isDesert
      ? 'अत्यधिक शुष्क गर्मी और मुरझाने का जोखिम'
      : 'पारिस्थितिकी तंत्र नमी कमी जोखिम';
    if (level === 'critical') {
      return {
        cardTitle,
        label: isDesert ? 'गंभीर — अत्यधिक गर्मी और सूखा तनाव' : 'गंभीर — उच्च सूखा व अग्नि जोखिम',
        advice: 'तुरंत VFD सौर पंपिंग सक्रिय करें और किसानों को चेतावनी भेजें।',
      };
    }
    if (level === 'moderate') {
      return {
        cardTitle,
        label: 'सावधान — जड़ क्षेत्र में नमी की कमी',
        advice: 'सौर पीक घंटों में सिंचाई चक्र बढ़ाएं।',
      };
    }
    return {
      cardTitle,
      label: 'सुरक्षित — मिट्टी की नमी संतुलित',
      advice: 'VFD इको मोड जारी रखें और नासा डेटा की निगरानी करें।',
    };
  }

  if (lang === 'fr') {
    const cardTitle = isPeat
      ? 'Risque Incendie Tourbières'
      : isDesert
      ? 'Risque Chaleur Extrême & Flétrissement'
      : 'Risque Déficit Hydrique';
    if (level === 'critical') {
      return {
        cardTitle,
        label: isDesert ? 'CRITIQUE — CHALEUR ARIDE EXTRÊME' : 'CRITIQUE — SÉCHERESSE SÉVÈRE',
        advice: 'Activez le pompage solaire VFD maximal et alertez les agriculteurs.',
      };
    }
    if (level === 'moderate') {
      return {
        cardTitle,
        label: 'ALERTE — DÉFICIT RACINAIRE',
        advice: 'Augmentez le cycle d’irrigation solaire durant le pic d’irradiance.',
      };
    }
    return {
      cardTitle,
      label: 'SÛR — HUMIDITÉ STABILISÉE',
      advice: 'Maintenez le mode VFD Éco sous suivi NASA POWER.',
    };
  }

  // Default English
  const cardTitle = isPeat
    ? 'Peatland Fire & Crop Wilting Risk'
    : isDesert
    ? 'Extreme Arid Heat & Wilting Risk'
    : ecosystem === 'river_basin_drought'
    ? 'El Niño Basin Drought & Stress Risk'
    : 'Savanna & Agrivoltaic Moisture Risk';

  if (level === 'critical') {
    return {
      cardTitle,
      label: isPeat
        ? 'CRITICAL — PEATLAND FIRE & WILTING RISK'
        : isDesert
        ? 'CRITICAL — EXTREME ARID HEAT & WILTING RISK'
        : 'CRITICAL — SEVERE CROP MOISTURE DEFICIT',
      advice: isPeat
        ? 'Dispatch immediate solar re-wetting pulse and alert local farmer cooperatives.'
        : 'Engage full VFD solar pumping and dispatch WhatsApp early warning to growers.',
    };
  }
  if (level === 'moderate') {
    return {
      cardTitle,
      label: 'ELEVATED — ROOT-ZONE MOISTURE DEFICIT',
      advice: 'Increase midday solar drip cycle to stabilize topsoil moisture above 30%.',
    };
  }
  return {
    cardTitle,
    label: 'OPTIMAL — ECOSYSTEM MOISTURE PROTECTED',
    advice: 'Maintain VFD Eco throttling while continuing NASA POWER satellite tracking.',
  };
}

export function getVfdRegimeCopy(
  lang: FullLang,
  regime: 'boost' | 'adaptive' | 'cruise' | 'eco'
): { regimeLabel: string; actionAdvice: string } {
  if (lang === 'id') {
    switch (regime) {
      case 'boost':
        return {
          regimeLabel: 'MODE BOOST DARURAT',
          actionAdvice: 'Kelembapan kritis (<20%). Jalankan inverter VFD pada 47–50 Hz untuk hidrasi cepat.',
        };
      case 'adaptive':
        return {
          regimeLabel: 'MODE ADAPTIF SEDANG',
          actionAdvice: 'Turunkan kecepatan ke 38–46 Hz untuk menghemat energi PV hingga 35% sesuai hukum kubik.',
        };
      case 'cruise':
        return {
          regimeLabel: 'MODE CRUISE EFISIEN',
          actionAdvice: 'Kelembapan cukup baik. Operasikan 30–37 Hz untuk penghematan daya VFD maksimal.',
        };
      default:
        return {
          regimeLabel: 'MODE ECO OPTIMAL',
          actionAdvice: 'Lahan terhidrasi (>55%). Throttle VFD ke 22–29 Hz untuk memangkas beban hingga 75%.',
        };
    }
  }
  if (lang === 'ar') {
    switch (regime) {
      case 'boost':
        return {
          regimeLabel: 'وضع الدفع الطارئ',
          actionAdvice: 'الرطوبة حرجة (<20%). شغّل عاكس VFD عند 47–50 هرتز للترطيب الفوري.',
        };
      case 'adaptive':
        return {
          regimeLabel: 'الوضع التكيفي',
          actionAdvice: 'خفّض التردد إلى 38–46 هرتز لتوفير حتى 35% من طاقة الألواح.',
        };
      case 'cruise':
        return {
          regimeLabel: 'وضع الكفاءة المتوازن',
          actionAdvice: 'الرطوبة مستقرة. شغّل المضخة عند 30–37 هرتز لتحسين الكفاءة.',
        };
      default:
        return {
          regimeLabel: 'الوضع الاقتصادي ECO',
          actionAdvice: 'التربة مروية (>55%). خفّض VFD إلى 22–29 هرتز لتقليل استهلاك الطاقة بنسبة 75%.',
        };
    }
  }
  if (lang === 'pt') {
    switch (regime) {
      case 'boost':
        return {
          regimeLabel: 'MODO BOOST EMERGENCIAL',
          actionAdvice: 'Umidade crítica (<20%). Opere o VFD em 47–50 Hz para hidratação imediata.',
        };
      case 'adaptive':
        return {
          regimeLabel: 'MODO ADAPTATIVO',
          actionAdvice: 'Reduza para 38–46 Hz e poupe até 35% da energia PV pela lei cúbica.',
        };
      case 'cruise':
        return {
          regimeLabel: 'MODO CRUZEIRO EFICIENTE',
          actionAdvice: 'Umidade moderada. Opere em 30–37 Hz para fluxo constante e economia.',
        };
      default:
        return {
          regimeLabel: 'MODO ECO OTIMIZADO',
          actionAdvice: 'Solo hidratado (>55%). Reduza o VFD para 22–29 Hz e poupe até 75% de kWh.',
        };
    }
  }
  if (lang === 'es') {
    switch (regime) {
      case 'boost':
        return {
          regimeLabel: 'MODO IMPULSO EMERGENCIA',
          actionAdvice: 'Humedad crítica (<20%). Opera el VFD a 47–50 Hz para recuperación rápida.',
        };
      case 'adaptive':
        return {
          regimeLabel: 'MODO ADAPTATIVO',
          actionAdvice: 'Reduce a 38–46 Hz para ahorrar hasta 35% de energía solar.',
        };
      case 'cruise':
        return {
          regimeLabel: 'MODO CRUCERO EFICIENTE',
          actionAdvice: 'Humedad estable. Mantén 30–37 Hz para equilibrar caudal y consumo.',
        };
      default:
        return {
          regimeLabel: 'MODO ECO ÓPTIMO',
          actionAdvice: 'Suelo hidratado (>55%). Modula el VFD a 22–29 Hz ahorrando hasta 75% de energía.',
        };
    }
  }
  if (lang === 'hi') {
    switch (regime) {
      case 'boost':
        return {
          regimeLabel: 'आपातकालीन बूस्ट मोड',
          actionAdvice: 'गंभीर नमी (<20%)। त्वरित सिंचाई के लिए VFD को 47–50 Hz पर चलाएं।',
        };
      case 'adaptive':
        return {
          regimeLabel: 'अनुकूली मोड',
          actionAdvice: '35% तक सौर ऊर्जा बचाने के लिए 38–46 Hz पर गति कम करें।',
        };
      case 'cruise':
        return {
          regimeLabel: 'कुशल क्रूज़ मोड',
          actionAdvice: 'नमी संतुलित है। स्थिर प्रवाह के लिए 30–37 Hz पर चलाएं।',
        };
      default:
        return {
          regimeLabel: 'इको ऑप्टिमल मोड',
          actionAdvice: 'खेत सिंचित है (>55%)। 75% ऊर्जा बचत के लिए 22–29 Hz पर थ्रॉटल करें।',
        };
    }
  }
  if (lang === 'fr') {
    switch (regime) {
      case 'boost':
        return {
          regimeLabel: 'MODE BOOST URGENCE',
          actionAdvice: 'Humidité critique (<20%). Réglez le VFD à 47–50 Hz pour réhydratation rapide.',
        };
      case 'adaptive':
        return {
          regimeLabel: 'MODE ADAPTATIF',
          actionAdvice: 'Réduisez à 38–46 Hz pour économiser jusqu’à 35% d’énergie PV.',
        };
      case 'cruise':
        return {
          regimeLabel: 'MODE CROISIÈRE EFFICACE',
          actionAdvice: 'Humidité modérée. Maintenez 30–37 Hz pour un débit régulier.',
        };
      default:
        return {
          regimeLabel: 'MODE ÉCO OPTIMAL',
          actionAdvice: 'Sol hydraté (>55%). Modulez à 22–29 Hz pour réduire la charge jusqu’à 75%.',
        };
    }
  }

  switch (regime) {
    case 'boost':
      return {
        regimeLabel: 'EMERGENCY BOOST MODE',
        actionAdvice: 'Critical root dryness (<20%). Run VFD inverter at 47–50 Hz for rapid re-wetting.',
      };
    case 'adaptive':
      return {
        regimeLabel: 'ADAPTIVE MODULATION',
        actionAdvice: 'Throttle speed to 38–46 Hz to cut PV draw by up to 35% via the cubic affinity law.',
      };
    case 'cruise':
      return {
        regimeLabel: 'EFFICIENT CRUISE MODE',
        actionAdvice: 'Balanced moisture profile. Cruise at 30–37 Hz to preserve buffer reserves.',
      };
    default:
      return {
        regimeLabel: 'ECO THROTTLE OPTIMAL',
        actionAdvice: 'Field hydrated (>55%). Step down VFD to 22–29 Hz to slash power draw by up to 75%.',
      };
  }
}

export function getAdvisorSummary(
  lang: FullLang,
  p: {
    moisture: number;
    crop: string;
    cropLocalized: string;
    zoneName: string;
    locationName: string;
    solar: number;
    pumpId: string;
    dailyWaterLiters: number;
  }
): string {
  const liters = p.dailyWaterLiters.toLocaleString(getNumberLocale(lang));
  if (lang === 'id') {
    return `${p.zoneName} (${p.locationName}) mencatat kelembapan tanah ${p.moisture}% pada plot ${p.cropLocalized} dengan radiasi surya ${p.solar.toFixed(2)} kWh/m²/hari. Disarankan mengaktifkan ${p.pumpId} selama jendela surya puncak untuk memompa target ${liters} L/hari.`;
  }
  if (lang === 'ar') {
    return `تسجل ${p.zoneName} في ${p.locationName} رطوبة تربة ${p.moisture}% لمحصول ${p.cropLocalized} مع إشعاع شمسي ${p.solar.toFixed(2)} kWh/m²/يوم. يُوصى بتشغيل ${p.pumpId} خلال ذروة السطوع لضخ ${liters} لتر/يوم.`;
  }
  if (lang === 'pt') {
    return `${p.zoneName} (${p.locationName}) registra umidade de ${p.moisture}% no cultivo de ${p.cropLocalized} com irradiância de ${p.solar.toFixed(2)} kWh/m²/dia. Recomenda-se despachar ${p.pumpId} na janela solar de pico para entregar ${liters} L/dia.`;
  }
  if (lang === 'es') {
    return `${p.zoneName} (${p.locationName}) registra ${p.moisture}% de humedad en ${p.cropLocalized} con radiación solar de ${p.solar.toFixed(2)} kWh/m²/día. Se recomienda activar ${p.pumpId} en el pico solar para bombear ${liters} L/día.`;
  }
  if (lang === 'hi') {
    return `${p.zoneName} (${p.locationName}) में ${p.cropLocalized} फसल पर मिट्टी की नमी ${p.moisture}% और सौर विकिरण ${p.solar.toFixed(2)} kWh/m²/दिन दर्ज है। पीक सौर समय में ${liters} ली/दिन के लिए ${p.pumpId} सक्रिय करें।`;
  }
  if (lang === 'fr') {
    return `${p.zoneName} (${p.locationName}) affiche ${p.moisture}% d’humidité sur ${p.cropLocalized} avec ${p.solar.toFixed(2)} kWh/m²/jour d’irradiance. Activez ${p.pumpId} durant le pic solaire pour pomper ${liters} L/jour.`;
  }
  return `${p.zoneName} (${p.locationName}) records ${p.moisture}% root-zone moisture on ${p.cropLocalized} with ${p.solar.toFixed(2)} kWh/m²/day irradiance. Dispatch ${p.pumpId} during peak solar hours to deliver ${liters} L/day.`;
}

export function getAdvisorPromptAnswer(
  lang: FullLang,
  promptId: AdvisorPromptId,
  p: {
    moisture: number;
    zoneName: string;
    region: string;
    locationName: string;
    ecosystem: EcosystemType;
    solar: number;
    pumpId: string;
    pumpFlowRate: string;
    dailyWaterLiters: number;
    dailyEnergyKwh: number;
    recommendedWp: number;
    moduleCount: number;
    monthlySavingsDisplay: string;
    monthlyDieselLiters: number;
    optimalWindow: string;
  }
): { title: string; body: string } {
  const numLocale = getNumberLocale(lang);
  const waterStr = p.dailyWaterLiters.toLocaleString(numLocale);
  const wpStr = p.recommendedWp.toLocaleString(numLocale);

  if (lang === 'id') {
    if (promptId === 'schedule') {
      return {
        title: `Jadwal Irigasi Optimal (${p.optimalWindow})`,
        body: `Gunakan ${p.pumpId} (${p.pumpFlowRate}) dalam dua pulsa: 08:30–11:30 untuk hidrasi awal dan 12:30–14:30 saat radiasi puncak ${p.solar.toFixed(2)} kWh/m²/hari guna memenuhi target ${waterStr} L/hari.`,
      };
    }
    if (promptId === 'peatland') {
      return {
        title: `Mitigasi Risiko Ekosistem (${p.region})`,
        body: `Pada kelembapan ${p.moisture}%, jaga tinggi muka air kapiler dan aktifkan irigasi tetes VFD secara berkala. Gunakan peringatan dini WhatsApp ke petani ${p.locationName} bila kelembapan turun di bawah 20%.`,
      };
    }
    return {
      title: `Analisis ROI Surya vs Diesel`,
      body: `Array ${wpStr} Wp (${p.moduleCount}× 550Wp) menghasilkan ${p.dailyEnergyKwh.toFixed(1)} kWh/hari, menghemat ${p.monthlyDieselLiters} L solar/bulan (~${p.monthlySavingsDisplay}/bulan) dengan payback ~3,4 tahun.`,
    };
  }

  if (lang === 'ar') {
    if (promptId === 'schedule') {
      return {
        title: `أفضل جدول ري (${p.optimalWindow})`,
        body: `شغّل ${p.pumpId} (${p.pumpFlowRate}) على دفعتين صباحية وظهرية خلال ذروة الإشعاع ${p.solar.toFixed(2)} kWh/m²/يوم لضخ ${waterStr} لتر/يوم بأقل تبخر.`,
      };
    }
    if (promptId === 'peatland') {
      return {
        title: `خطة تخفيف الإجهاد (${p.region})`,
        body: `عند رطوبة ${p.moisture}% في ${p.locationName}، فعّل الري بالتنقيط عالي الكفاءة وأرسل تنبيه واتساب فورياً عند هبوط الرطوبة دون 20%.`,
      };
    }
    return {
      title: `تحليل العائد: الشمسية مقابل الديزل`,
      body: `مصفوفة ${wpStr} Wp (${p.moduleCount} ألواح) تنتج ${p.dailyEnergyKwh.toFixed(1)} ك.و.س/يوم وتوفر ${p.monthlyDieselLiters} لتر ديزل شهرياً (~${p.monthlySavingsDisplay}/شهر).`,
    };
  }

  if (lang === 'pt') {
    if (promptId === 'schedule') {
      return {
        title: `Agenda Solar Ideal (${p.optimalWindow})`,
        body: `Opere ${p.pumpId} (${p.pumpFlowRate}) em dois pulsos durante a janela de pico (${p.solar.toFixed(2)} kWh/m²/dia) para entregar ${waterStr} L/dia com mínima evaporação.`,
      };
    }
    if (promptId === 'peatland') {
      return {
        title: `Mitigação de Estresse (${p.region})`,
        body: `Com umidade de ${p.moisture}% em ${p.locationName}, priorize o gotejamento VFD noturno/matinal e mantenha alertas WhatsApp ativos abaixo de 20%.`,
      };
    }
    return {
      title: `ROI Solar vs Bomba a Diesel`,
      body: `O arranjo de ${wpStr} Wp (${p.moduleCount}× 550Wp) gera ${p.dailyEnergyKwh.toFixed(1)} kWh/dia e evita ${p.monthlyDieselLiters} L de diesel/mês (~${p.monthlySavingsDisplay}/mês).`,
    };
  }

  if (lang === 'es') {
    if (promptId === 'schedule') {
      return {
        title: `Horario Óptimo (${p.optimalWindow})`,
        body: `Opera ${p.pumpId} (${p.pumpFlowRate}) en dos pulsos solares aprovechando ${p.solar.toFixed(2)} kWh/m²/día para alcanzar ${waterStr} L/día.`,
      };
    }
    if (promptId === 'peatland') {
      return {
        title: `Mitigación de Estrés (${p.region})`,
        body: `Con ${p.moisture}% de humedad en ${p.locationName}, modula el caudal VFD y activa alertas tempranas de WhatsApp si cae bajo 20%.`,
      };
    }
    return {
      title: `ROI Solar vs Diésel`,
      body: `Un arreglo de ${wpStr} Wp (${p.moduleCount} paneles) produce ${p.dailyEnergyKwh.toFixed(1)} kWh/día y ahorra ${p.monthlyDieselLiters} L diésel/mes (~${p.monthlySavingsDisplay}/mes).`,
    };
  }

  if (lang === 'hi') {
    if (promptId === 'schedule') {
      return {
        title: `सर्वोत्तम सिंचाई समय (${p.optimalWindow})`,
        body: `${p.solar.toFixed(2)} kWh/m²/दिन सौर विकिरण के दौरान ${p.pumpId} (${p.pumpFlowRate}) को दो चरणों में चलाकर ${waterStr} ली/दिन सिंचाई करें।`,
      };
    }
    if (promptId === 'peatland') {
      return {
        title: `तनाव शमन योजना (${p.region})`,
        body: `${p.locationName} में ${p.moisture}% नमी पर ड्रिप सिंचाई को प्राथमिकता दें और 20% से नीचे जाने पर WhatsApp चेतावनी भेजें।`,
      };
    }
    return {
      title: `सौर बनाम डीजल ROI`,
      body: `${wpStr} Wp (${p.moduleCount} पैनल) से ${p.dailyEnergyKwh.toFixed(1)} kWh/दिन ऊर्जा और प्रति माह ${p.monthlyDieselLiters} ली डीजल (~${p.monthlySavingsDisplay}/माह) की बचत होती है।`,
    };
  }

  if (lang === 'fr') {
    if (promptId === 'schedule') {
      return {
        title: `Calendrier Optimal (${p.optimalWindow})`,
        body: `Pilotez ${p.pumpId} (${p.pumpFlowRate}) en deux créneaux solaires à ${p.solar.toFixed(2)} kWh/m²/jour pour fournir ${waterStr} L/jour.`,
      };
    }
    if (promptId === 'peatland') {
      return {
        title: `Plan d’Atténuation (${p.region})`,
        body: `Avec ${p.moisture}% d’humidité à ${p.locationName}, activez le goutte-à-goutte VFD et l’alerte WhatsApp sous 20%.`,
      };
    }
    return {
      title: `ROI Solaire vs Diesel`,
      body: `Un champ de ${wpStr} Wc (${p.moduleCount} panneaux) génère ${p.dailyEnergyKwh.toFixed(1)} kWh/jour et économise ${p.monthlyDieselLiters} L diesel/mois (~${p.monthlySavingsDisplay}/mois).`,
    };
  }

  if (promptId === 'schedule') {
    return {
      title: `Optimal Pumping Schedule (${p.optimalWindow})`,
      body: `Run ${p.pumpId} (${p.pumpFlowRate}) in two solar-aligned pulses during ${p.optimalWindow} at ${p.solar.toFixed(2)} kWh/m²/day to deliver ${waterStr} L/day with minimal evaporation loss.`,
    };
  }
  if (promptId === 'peatland') {
    return {
      title: `Ecosystem Stress Mitigation (${p.region})`,
      body: `At ${p.moisture}% soil moisture in ${p.locationName}, engage VFD drip hydration to protect root health and fire/wilting thresholds; trigger WhatsApp alerts if moisture drops below 20%.`,
    };
  }
  return {
    title: `Solar vs Diesel Pump ROI Breakdown`,
    body: `A ${wpStr} Wp array (${p.moduleCount}× 550Wp) generates ${p.dailyEnergyKwh.toFixed(1)} kWh/day, displacing ${p.monthlyDieselLiters} L of diesel/month (~${p.monthlySavingsDisplay}/month) with a ~3.4-year payback.`,
  };
}

export function buildWhatsAppAlertMessage(p: {
  lang: FullLang;
  locationName: string;
  ecosystem: EcosystemType;
  riskLevel: 'critical' | 'moderate' | 'low';
  zoneName: string;
  region: string;
  coordsStr: string;
  moisturePct: number;
  solarKwh: number;
  tempC: number;
  pumpId: string;
  pumpName: string;
  dailyWaterLiters: number;
  optimalWindow: string;
  sentAt: string;
}): string {
  const numLocale = getNumberLocale(p.lang);
  const waterStr = p.dailyWaterLiters.toLocaleString(numLocale);

  if (p.lang === 'id') {
    const statusTag =
      p.riskLevel === 'critical'
        ? '🚨 *PERINGATAN DINI KRITIS SOLVARA*'
        : p.riskLevel === 'moderate'
        ? '⚠️ *PERINGATAN WASPADA SOLVARA*'
        : '✅ *RINGKASAN STATUS HARIAN SOLVARA*';
    return [
      statusTag,
      `📍 *Wilayah:* ${p.locationName}`,
      `🗺️ *Distrik:* ${p.zoneName} (${p.region})`,
      `🛰️ *GPS:* ${p.coordsStr}`,
      '',
      `📊 *Telemetri Satelit NASA POWER:*`,
      `• Kelembapan Tanah: *${p.moisturePct}%*`,
      `• Radiasi Surya: *${p.solarKwh.toFixed(2)} kWh/m²/hari*`,
      `• Suhu Permukaan: *${p.tempC.toFixed(1)}°C*`,
      '',
      `⚡ *Rekomendasi Pompa Surya:*`,
      `• Unit: *${p.pumpId}* (${p.pumpName})`,
      `• Target Volume Air: *${waterStr} L/hari*`,
      `• Jam Operasi Optimal: *${p.optimalWindow}*`,
      '',
      `_Dikirim otomatis oleh SOLVARA Sat-Alert pada ${p.sentAt}_`,
    ].join('\n');
  }

  if (p.lang === 'ar') {
    const statusTag =
      p.riskLevel === 'critical'
        ? '🚨 *تنبيه مبكر حرج من SOLVARA*'
        : p.riskLevel === 'moderate'
        ? '⚠️ *تنبيه وقائي من SOLVARA*'
        : '✅ *ملخص الحالة اليومي من SOLVARA*';
    return [
      statusTag,
      `📍 *المنطقة:* ${p.locationName}`,
      `🗺️ *القطاع:* ${p.zoneName} (${p.region})`,
      `🛰️ *الإحداثيات:* ${p.coordsStr}`,
      '',
      `📊 *بيانات أقمار NASA POWER:*`,
      `• رطوبة التربة: *${p.moisturePct}%*`,
      `• الإشعاع الشمسي: *${p.solarKwh.toFixed(2)} kWh/m²/يوم*`,
      `• درجة الحرارة السطحية: *${p.tempC.toFixed(1)}°C*`,
      '',
      `⚡ *توصية المضخة الشمسية:*`,
      `• المضخة: *${p.pumpId}* (${p.pumpName})`,
      `• كمية المياه المستهدفة: *${waterStr} لتر/يوم*`,
      `• ساعات التشغيل المثلى: *${p.optimalWindow}*`,
      '',
      `_أُرسل آلياً عبر SOLVARA Sat-Alert الساعة ${p.sentAt}_`,
    ].join('\n');
  }

  if (p.lang === 'pt') {
    const statusTag =
      p.riskLevel === 'critical'
        ? '🚨 *ALERTA CRÍTICO SOLVARA*'
        : p.riskLevel === 'moderate'
        ? '⚠️ *ALERTA PREVENTIVO SOLVARA*'
        : '✅ *BOLETIM DIÁRIO SOLVARA*';
    return [
      statusTag,
      `📍 *Região:* ${p.locationName}`,
      `🗺️ *Distrito:* ${p.zoneName} (${p.region})`,
      `🛰️ *GPS:* ${p.coordsStr}`,
      '',
      `📊 *Satélite NASA POWER:*`,
      `• Umidade do Solo: *${p.moisturePct}%*`,
      `• Irradiação Solar: *${p.solarKwh.toFixed(2)} kWh/m²/dia*`,
      `• Temperatura: *${p.tempC.toFixed(1)}°C*`,
      '',
      `⚡ *Despacho Bomba Solar:*`,
      `• Unidade: *${p.pumpId}* (${p.pumpName})`,
      `• Volume Alvo: *${waterStr} L/dia*`,
      `• Janela Ideal: *${p.optimalWindow}*`,
      '',
      `_Enviado automaticamente pelo SOLVARA Sat-Alert às ${p.sentAt}_`,
    ].join('\n');
  }

  if (p.lang === 'es') {
    const statusTag =
      p.riskLevel === 'critical'
        ? '🚨 *ALERTA CRÍTICA SOLVARA*'
        : p.riskLevel === 'moderate'
        ? '⚠️ *ALERTA PREVENTIVA SOLVARA*'
        : '✅ *REPORTE DIARIO SOLVARA*';
    return [
      statusTag,
      `📍 *Región:* ${p.locationName}`,
      `🗺️ *Distrito:* ${p.zoneName} (${p.region})`,
      `🛰️ *GPS:* ${p.coordsStr}`,
      '',
      `📊 *Satélite NASA POWER:*`,
      `• Humedad del Suelo: *${p.moisturePct}%*`,
      `• Radiación Solar: *${p.solarKwh.toFixed(2)} kWh/m²/día*`,
      `• Temperatura: *${p.tempC.toFixed(1)}°C*`,
      '',
      `⚡ *Despacho Bomba Solar:*`,
      `• Equipo: *${p.pumpId}* (${p.pumpName})`,
      `• Volumen Objetivo: *${waterStr} L/día*`,
      `• Horario Óptimo: *${p.optimalWindow}*`,
      '',
      `_Enviado automáticamente por SOLVARA Sat-Alert a las ${p.sentAt}_`,
    ].join('\n');
  }

  if (p.lang === 'hi') {
    const statusTag =
      p.riskLevel === 'critical'
        ? '🚨 *SOLVARA गंभीर प्रारंभिक चेतावनी*'
        : p.riskLevel === 'moderate'
        ? '⚠️ *SOLVARA सतर्कता सूचना*'
        : '✅ *SOLVARA दैनिक सिंचाई बुलेटिन*';
    return [
      statusTag,
      `📍 *स्थान:* ${p.locationName}`,
      `🗺️ *जिला:* ${p.zoneName} (${p.region})`,
      `🛰️ *GPS:* ${p.coordsStr}`,
      '',
      `📊 *NASA POWER उपग्रह डेटा:*`,
      `• मिट्टी की नमी: *${p.moisturePct}%*`,
      `• सौर विकिरण: *${p.solarKwh.toFixed(2)} kWh/m²/दिन*`,
      `• तापमान: *${p.tempC.toFixed(1)}°C*`,
      '',
      `⚡ *सौर पंप अनुशंसा:*`,
      `• पंप आईडी: *${p.pumpId}* (${p.pumpName})`,
      `• दैनिक जल लक्ष्य: *${waterStr} ली/दिन*`,
      `• सर्वोत्तम समय: *${p.optimalWindow}*`,
      '',
      `_SOLVARA Sat-Alert द्वारा ${p.sentAt} पर भेजा गया_`,
    ].join('\n');
  }

  if (p.lang === 'fr') {
    const statusTag =
      p.riskLevel === 'critical'
        ? '🚨 *ALERTE CRITIQUE SOLVARA*'
        : p.riskLevel === 'moderate'
        ? '⚠️ *ALERTE PRÉVENTIVE SOLVARA*'
        : '✅ *BULLETIN QUOTIDIEN SOLVARA*';
    return [
      statusTag,
      `📍 *Région :* ${p.locationName}`,
      `🗺️ *District :* ${p.zoneName} (${p.region})`,
      `🛰️ *GPS :* ${p.coordsStr}`,
      '',
      `📊 *Satellite NASA POWER :*`,
      `• Humidité du Sol : *${p.moisturePct}%*`,
      `• Irradiance Solaire : *${p.solarKwh.toFixed(2)} kWh/m²/jour*`,
      `• Température : *${p.tempC.toFixed(1)}°C*`,
      '',
      `⚡ *Recommandation Pompe Solaire :*`,
      `• Unité : *${p.pumpId}* (${p.pumpName})`,
      `• Volume Cible : *${waterStr} L/jour*`,
      `• Créneau Optimal : *${p.optimalWindow}*`,
      '',
      `_Envoyé automatiquement par SOLVARA Sat-Alert à ${p.sentAt}_`,
    ].join('\n');
  }

  // English default
  const statusTag =
    p.riskLevel === 'critical'
      ? '🚨 *SOLVARA CRITICAL EARLY WARNING*'
      : p.riskLevel === 'moderate'
      ? '⚠️ *SOLVARA DROUGHT ADVISORY*'
      : '✅ *SOLVARA DAILY IRRIGATION BRIEF*';

  return [
    statusTag,
    `📍 *Region:* ${p.locationName}`,
    `🗺️ *District:* ${p.zoneName} (${p.region})`,
    `🛰️ *GPS:* ${p.coordsStr}`,
    '',
    `📊 *NASA POWER Satellite Data:*`,
    `• Soil Moisture: *${p.moisturePct}%*`,
    `• Solar Radiation: *${p.solarKwh.toFixed(2)} kWh/m²/day*`,
    `• Surface Temp: *${p.tempC.toFixed(1)}°C*`,
    '',
    `⚡ *Recommended Solar Pump:*`,
    `• Unit: *${p.pumpId}* (${p.pumpName})`,
    `• Daily Water Target: *${waterStr} L/day*`,
    `• Optimal Operating Hours: *${p.optimalWindow}*`,
    '',
    `_Automated dispatch via SOLVARA Sat-Alert at ${p.sentAt}_`,
  ].join('\n');
}
