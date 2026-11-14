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
  { code: 'fr', shortCode: 'FR', nativeName: 'Français', englishName: 'French', dir: 'ltr', dictLang: 'fr', hasFullDictionary: true },
  { code: 'de', shortCode: 'DE', nativeName: 'Deutsch', englishName: 'German', dir: 'ltr', dictLang: 'de', hasFullDictionary: true },
  { code: 'nl', shortCode: 'NL', nativeName: 'Nederlands', englishName: 'Dutch', dir: 'ltr', dictLang: 'nl', hasFullDictionary: true },
  { code: 'sv', shortCode: 'SV', nativeName: 'Svenska', englishName: 'Swedish', dir: 'ltr', dictLang: 'sv', hasFullDictionary: true },
  { code: 'no', shortCode: 'NO', nativeName: 'Norsk', englishName: 'Norwegian', dir: 'ltr', dictLang: 'no', hasFullDictionary: true },
  { code: 'th', shortCode: 'TH', nativeName: 'ไทย', englishName: 'Thai', dir: 'ltr', dictLang: 'th', hasFullDictionary: true },
  { code: 'ja', shortCode: 'JA', nativeName: '日本語', englishName: 'Japanese', dir: 'ltr', dictLang: 'ja', hasFullDictionary: true },
  { code: 'ko', shortCode: 'KO', nativeName: '한국어', englishName: 'Korean', dir: 'ltr', dictLang: 'ko', hasFullDictionary: true },
  { code: 'it', shortCode: 'IT', nativeName: 'Italiano', englishName: 'Italian', dir: 'ltr', dictLang: 'it', hasFullDictionary: true },
  { code: 'ar', shortCode: 'AR', nativeName: 'العربية', englishName: 'Arabic', dir: 'rtl', dictLang: 'ar', hasFullDictionary: true },
  { code: 'es', shortCode: 'ES', nativeName: 'Español', englishName: 'Spanish', dir: 'ltr', dictLang: 'es', hasFullDictionary: true },
  { code: 'pt', shortCode: 'PT', nativeName: 'Português', englishName: 'Portuguese', dir: 'ltr', dictLang: 'pt', hasFullDictionary: true },
  { code: 'hi', shortCode: 'HI', nativeName: 'हिन्दी', englishName: 'Hindi', dir: 'ltr', dictLang: 'hi', hasFullDictionary: true },
];

export function getWorldLanguageOption(code: string): WorldLanguageOption {
  const clean = code.trim().toLowerCase().split('-')[0];
  const mapped = clean === 'nb' || clean === 'nn' ? 'no' : clean;
  return WORLD_LANGUAGES.find((item) => item.code === mapped) ?? WORLD_LANGUAGES[0];
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
    case 'ja':
      return 'ja-JP';
    case 'ko':
      return 'ko-KR';
    case 'it':
      return 'it-IT';
    case 'th':
      return 'th-TH';
    case 'sv':
      return 'sv-SE';
    case 'no':
      return 'nb-NO';
    case 'nl':
      return 'nl-NL';
    case 'de':
      return 'de-DE';
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
  intro: {
    startButton: string;
    logoAria: string;
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
          ja: '日本語',
          ko: '한국어',
          it: 'Italiano',
          th: 'ไทย',
          sv: 'Svenska',
          no: 'Norsk',
          nl: 'Nederlands',
          de: 'Deutsch',
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
        { label: 'Capex Est.', val: '108K USD', sub: 'Turnkey + VFD' },
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
    intro: {
      startButton: 'Launch System',
      logoAria: 'Enter SOLVARA platform',
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
          ja: '日本語',
          ko: '한국어',
          it: 'Italiano',
          th: 'ไทย',
          sv: 'Svenska',
          no: 'Norsk',
          nl: 'Nederlands',
          de: 'Deutsch',
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
        { label: 'Angkat Air', val: '145 m³/day', sub: 'Head 18m TDH' },
        { label: 'Est. Capex', val: '108K USD', sub: 'Turnkey + VFD' },
        { label: 'Balik Modal', val: '3.4 Thn', sub: 'Gantikan diesel' },
        { label: 'Kurangi CO₂', val: '142 t/yr', sub: 'Terverifikasi' },
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
      copyBtn: 'Salin Pesan',
      copiedBtn: 'Tersalin!',
      closeBtn: 'Tutup',
    },
    intro: {
      startButton: 'Launch System',
      logoAria: 'Masuk ke platform SOLVARA',
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
          ja: '日本語',
          ko: '한국어',
          it: 'Italiano',
          th: 'ไทย',
          sv: 'Svenska',
          no: 'Norsk',
          nl: 'Nederlands',
          de: 'Deutsch',
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
        { label: 'ضخ المياه', val: '145 m³/day', sub: '18m TDH' },
        { label: 'التكلفة التقديرية', val: '108K USD', sub: 'نظام متكامل VFD' },
        { label: 'الاسترداد', val: '3.4 سنوات', sub: 'بديل الديزل' },
        { label: 'خفض CO₂', val: '142 t/yr', sub: 'موثق' },
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
      irradianceMonthlySubtitle: 'التوزيع الموسمي التاريخي (kWh/m²/day)',
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
    intro: {
      startButton: 'Launch System',
      logoAria: 'الدخول إلى منصة SOLVARA',
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
          ja: '日本語',
          ko: '한국어',
          it: 'Italiano',
          th: 'ไทย',
          sv: 'Svenska',
          no: 'Norsk',
          nl: 'Nederlands',
          de: 'Deutsch',
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
        { label: 'Bombeamento', val: '145 m³/day', sub: '18m TDH' },
        { label: 'Capex Est.', val: '108K USD', sub: 'Turnkey + VFD' },
        { label: 'Retorno', val: '3.4 Anos', sub: 'Substitui diesel' },
        { label: 'CO₂ Evitado', val: '142 t/yr', sub: 'Verificado' },
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
    intro: {
      startButton: 'Launch System',
      logoAria: 'Acessar plataforma SOLVARA',
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
          ja: '日本語',
          ko: '한국어',
          it: 'Italiano',
          th: 'ไทย',
          sv: 'Svenska',
          no: 'Norsk',
          nl: 'Nederlands',
          de: 'Deutsch',
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
        { label: 'Bombeo', val: '145 m³/day', sub: '18m TDH' },
        { label: 'Capex Est.', val: '108K USD', sub: 'Llave en mano + VFD' },
        { label: 'Retorno', val: '3.4 Años', sub: 'Sin diésel' },
        { label: 'CO₂ Evitado', val: '142 t/yr', sub: 'Verificado' },
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
      irradianceMonthlySubtitle: 'Distribución estacional histórica (kWh/m²/day)',
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
    intro: {
      startButton: 'Launch System',
      logoAria: 'Entrar a la plataforma SOLVARA',
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
          ja: '日本語',
          ko: '한국어',
          it: 'Italiano',
          th: 'ไทย',
          sv: 'Svenska',
          no: 'Norsk',
          nl: 'Nederlands',
          de: 'Deutsch',
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
        { label: 'जल उठाव', val: '145 m³/day', sub: '18m TDH हेड' },
        { label: 'अनुमानित लागत', val: '108K USD', sub: 'टर्नकी + VFD' },
        { label: 'पेबैक', val: '3.4 वर्ष', sub: 'डीजल मुक्त' },
        { label: 'CO₂ कमी', val: '142 t/yr', sub: 'सत्यापित' },
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
      irradianceMonthlySubtitle: 'ऐतिहासिक मौसमी वितरण (kWh/m²/day)',
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
    intro: {
      startButton: 'Launch System',
      logoAria: 'SOLVARA प्लेटफ़ॉर्म शुरू करें',
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
          ja: '日本語',
          ko: '한국어',
          it: 'Italiano',
          th: 'ไทย',
          sv: 'Svenska',
          no: 'Norsk',
          nl: 'Nederlands',
          de: 'Deutsch',
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
        { label: 'Capacité PV', val: '120 kWp', sub: 'Bifacial surélevé' },
        { label: 'Production/an', val: '198 MWh', sub: 'PR 81.4%' },
        { label: 'Pompage', val: '145 m³/day', sub: '18m TDH' },
        { label: 'Capex Est.', val: '108K USD', sub: 'Clé en main + VFD' },
        { label: 'Retour', val: '3.4 Ans', sub: 'Hors diesel' },
        { label: 'CO₂ Évité', val: '142 t/yr', sub: 'Vérifié' },
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
      irradianceMonthlySubtitle: 'Distribution saisonnière historique (kWh/m²/day)',
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
    intro: {
      startButton: 'Launch System',
      logoAria: 'Accéder à la plateforme SOLVARA',
    },
  },
  ja: {
    header: {
      subtitle: 'グローバル・アグリボルタイクス＆衛星太陽光灌漑コマンド',
      langSwitcherLabel: '言語選択',
      langSearchPlaceholder: '言語を検索...',
      langFullLabel: '完全なUI',
      langFallbackNote: '完全ローカライズ',
      langNoMatch: '一致する言語が見つかりません',
      tabs: {
        macro: '干ばつ・ポンプマップ',
        ops: '精密灌漑運用',
        feasibility: '適地インテリジェンス',
      },
      mobileTabs: {
        macro: '干ばつマップ',
        ops: '運用管理',
        feasibility: '適地評価',
      },
      telemetry: {
        syncing: 'NASA POWER 同期中...',
        live: 'NASA POWER ライブ',
        ready: 'NASA POWER 準備完了',
        sourceLive: 'ライブ NASA POWER API',
        sourceFallback: 'NASA POWER 補正済みバックアップ',
        solarDate: '日射観測日',
        moistureDate: '土壌水分日',
      },
      themeTooltip: {
        toLight: 'ライトモードへ切替',
        toDark: 'ダークモードへ切替',
      },
    },
    tab1: {
      title: '世界干ばつストレス＆ソーラーポンプ監視',
      subtitle: 'ライブ NASA POWER 衛星テレメトリ、実在地区検出、自動 VFD ポンプ制御',
      mobileFilterBtn: 'フィルター・凡例',
      zonesWord: 'ゾーン',
      filteredBadge: '絞込中',
      filtersTitle: 'テレメトリ・フィルター',
      resetFilters: 'リセット',
      targetRegionLabel: '対象サブ地域',
      allRegionsOption: 'すべての地域',
      stapleCropLabel: '作物',
      allCropsOption: 'すべての作物',
      severityLabel: '干ばつ深刻度',
      severities: {
        All: 'すべて',
        Severe: '深刻',
        Moderate: '中程度',
        Mild: '軽度・良好',
      },
      crops: {
        Maize: 'トウモロコシ',
        Wheat: '小麦',
        Tomatoes: 'トマト',
        Olives: 'オリーブ',
        Almonds: 'アーモンド',
        Pistachios: 'ピスタチオ',
        Soybeans: '大豆',
        Cotton: '綿花',
        Citrus: '柑橘類',
        'Date Palms': 'ナツメヤシ',
        Grapes: 'ブドウ',
        Rice: '水稲',
        Horticulture: '園芸作物',
        'Chili & Leafy Greens': '唐辛子・葉物野菜',
      },
      mapLegendTitle: 'マップ凡例',
      legendSevere: '深刻な乾燥 (< 20%)',
      legendModerate: '中程度のストレス (20-29%)',
      legendMild: '軽度 / 最適 (>= 30%)',
      legendPump: 'ソーラーポンプ拠点',
      globalExplorer: {
        title: 'グローバル衛星座標・都市エクスプローラー',
        subtitle: 'NASA パートナー拠点を選択するか、世界中の都市・GPS を検索してライブ NASA POWER データと実在地区を取得',
        cityPlaceholder: '世界の都市を検索（例: 長野、メンドーサ、セビリア、ナイロビ）...',
        latLabel: 'LAT',
        lonLabel: 'LON',
        fetchBtn: 'NASA データ取得',
        fetchingBtn: '衛星同期中...',
        presetsLabel: 'ベンチマーク:',
        syncLangBtn: '地域言語に合わせる',
        liveSourceBadge: 'LIVE NASA POWER API',
        fallbackSourceBadge: '緯度補正フォールバック',
        districtsPrefix: '実在地区',
        geocodeError: '都市が見つかりません。近隣の主要都市または緯度・経度を入力してください。',
        invalidCoordsError: '有効な座標を入力してください（緯度 -90〜90、経度 -180〜180）。',
        langNames: {
          en: 'English',
          id: 'Bahasa Indonesia',
          ar: 'العربية',
          pt: 'Português',
          es: 'Español',
          hi: 'हिन्दी',
          fr: 'Français',
          ja: '日本語',
          ko: '한국어',
          it: 'Italiano',
          th: 'ไทย',
          sv: 'Svenska',
          no: 'Norsk',
          nl: 'Nederlands',
          de: 'Deutsch',
        },
      },
      simulator: {
        title: '異常気象シミュレーター (What-If)',
        simActive: 'シミュレーション中',
        liveBaseline: 'NASA リアルタイム基準',
        resetBtn: 'NASA ライブ値に戻す',
        rainfallLabel: '日降水量シミュレーション',
        solarLabel: '日射量シミュレーション',
        extremeDry: '0 mm（極度乾燥）',
      },
      map: {
        resolutionLabel: '空間解像度:',
        resolutionValue: 'NASA SMAP / POWER 0.5°',
        pumpCapPrefix: '能力:',
        pumpStatuses: {
          Active: '稼働中',
          Standby: '待機中',
          Optimizing: '最適化中',
        },
        interactiveHint: '各ゾーンのピンをクリックして衛星テレメトリと太陽光設計を確認',
        showAllPrefix: 'すべて表示',
      },
      districtsStrip: {
        title: 'ポンティアナク地区別テレメトリ',
      },
      priorityBanner: {
        title: 'AI ソーラーポンプ優先稼働指示',
        pumpSitePrefix: '優先サイト:',
        criticalMoistureText: '危機的土壌水分',
        recordsText: '観測値:',
        macroWetnessText: '流域土壌水分',
      },
      telemetryPanel: {
        title: 'ゾーン別テレメトリ',
        droughtSuffix: '干ばつ',
        plantationSuffix: '区画',
        smapMoisture: '土壌水分 (GWETTOP)',
        criticalDry: '極度乾燥',
        moderate: '中程度',
        humidOptimal: '適正水分',
        volumetricDepth: '表層根域水分',
        sevenDayTrend: '7日間水分推移',
        deficit: '減少',
        gain: '増加',
        nasaRadiance: '全天日射量',
        strong: '高発電ポテンシャル',
        moderateSolar: '標準日射',
        solarPumpYield: 'ソーラーポンプ出力',
        capacityUnit: '段階',
        surfaceTempLabel: '地表気温 (T2M)',
      },
      peatland: {
        eyebrow: '生態系早期警戒アラート',
        moisturePrefix: '現在の土壌水分',
        sendWarningBtn: '農家へ WhatsApp/SMS 警報を送信',
        confirmedTitle: '早期警報を送信しました',
        confirmedBodyPrefix: '対象地域の農家グループへ WhatsApp/SMS を送信:',
      },
      solarSizing: {
        eyebrow: 'スマート PV 設計計算',
        title: '太陽光アレイ容量・燃料削減試算',
        arraySizeLabel: '推奨ソーラーアレイ',
        panelUnit: '枚 (550Wp パネル)',
        dailyWaterLabel: '推定日次揚水量',
        dailyWaterUnit: 'L/day',
        dailyEnergyUnit: 'kWh/day',
        monthlySavingsLabel: '月間燃料削減見込み',
        vsDiesel: '対ディーゼルポンプ',
        saveFuelPrefix: '削減量',
        saveFuelSuffix: 'L 軽油 / 月',
      },
      advisor: {
        eyebrow: 'ローカル衛星推論エンジン',
        title: 'SOLVARA AI 営農アドバイザー',
        liveBriefPrefix: 'ライブ要約',
        quickPromptsTitle: 'クイック営農相談',
        analyzingPrefix: 'NASA テレメトリ解析中:',
        prompts: {
          schedule: '本日の最適灌漑時間帯は？',
          peatland: '乾燥ストレス緩和計画は？',
          roi: '太陽光 vs ディーゼル ROI 比較',
        },
      },
    },
    tab2: {
      bannerTitle: '自律型ソーラー VFD ポンプ制御 オンライン',
      bannerSubtitle: 'MPPT 追従 + VFD インバーターが NASA POWER データと完全同期',
      telemetryOk: 'テレメトリ正常',
      kpis: {
        solarOutput: 'PV アレイ出力',
        solarSub: 'MPPT 追従効率 98.6%',
        pumpCapacity: 'ポンプ流量',
        pumpSub: 'VFD 可変速制御',
        waterReserve: '貯水タンク残量',
        waterSub: '20,000 L 重力式バッファ',
        rain3Day: '3日平均降水量',
        rainLatestPrefix: '最新:',
        rainOptimalSolar: '晴天・太陽光最適',
        rainActiveRecharge: '降水による自然補給',
        yieldSaved: '収穫量保全率',
        yieldSub: '萎凋・枯死の防止',
      },
      heatmap: {
        title: '140区画圃場水分マトリクス＆緊急灌漑シミュレーション',
        subtitle: '乾燥ストレス区画への放射状ソーラー点滴灌漑ウェーブを再現',
        scaleLabel: '縮尺:',
        reRunBtn: '緊急ソーラー灌漑を実行',
        pumpingActive: '灌漑ウェーブ作動中',
        resetDemoBtn: '乾燥状態をリセット',
        plotPrefix: '区画 #',
        legend: {
          severe: '深刻',
          high: '高ストレス',
          moderate: '中程度',
          low: '軽度',
          hydrated: '潤沢',
        },
        cellLabels: {
          hydrated: '潤沢（最適）',
          severe: '深刻な乾燥 (<15%)',
          high: '高ストレス (15-25%)',
          moderate: '中ストレス (25-40%)',
          low: '低ストレス (40-60%)',
        },
      },
      vfd: {
        affinityLawPrefix: '相似則: P ∝ N³',
        title: 'VFD 効率オプティマイザー',
        subtitle: 'リアルタイム根域水分に応じてポンプ回転数と電力を最適変調',
        sourcePlotArray: '圃場マトリクス',
        autoSyncOn: '自動同期 ON',
        autoSyncOff: '自動同期 OFF',
        liveRootMoisturePrefix: '実効根域水分',
        criticalWord: '危機的',
        hydratedWord: '潤沢',
        zoneTelemetryPrefix: 'ゾーン・テレメトリ',
        meanArrayPrefix: '平均:',
        suggestedAdjustment: '推奨周波数調整',
        optimalSynced: '最適値同期済み',
        rampDown: '減速省エネ',
        rampUp: '増速揚水',
        activeInverterSpeed: '現在のインバーター周波数:',
        targetPrefix: '目標:',
        recommendedTooltipPrefix: '推奨目標:',
        manualSliderLabel: '手動周波数調整 (20 - 50 Hz)',
        nominalRpmSuffix: '定格回転数',
        syncedBtn: 'インバーター同期済み',
        applyBtnPrefix: '適用',
        kpiSuggestedSpeed: '目標 VFD 周波数',
        kpiAdjustedFlow: '調整後流量',
        kpiVsActivePrefix: '現在値比',
        kpiVsActiveSuffix: '稼働中',
        kpiInverterLoad: 'インバーター負荷',
        kpiVsCurrentSuffix: 'kW 削減',
        kpiBaseline50Hz: '50 Hz 基準値',
        kpiEnergySaved: '省エネ削減率',
        kpiToBatterySuffix: 'kWh/day 節約',
      },
      allocation: {
        title: '太陽光電力ディスパッチ配分',
        subtitle: '優先地区ごとのリアルタイム PV 電力配分バランス',
      },
      forecast: {
        title: '揚水量 24時間ソーラー予測',
        subtitlePrefix: '最適稼働時間帯',
        subtitleMiddle: '10:00 - 14:30',
        subtitleSuffix: '（ピーク日射と同期）',
        estTotal: '推定 114,500 L/day',
        peakLabel: '12h (ピーク)',
      },
    },
    tab3: {
      rankBadge: '第1位 アグリボルタイクス適地',
      siteCodePrefix: 'SITE CODE:',
      siteTitleSuffix: 'アグリボルタイクス事業性評価書',
      siteSubtitlePrefix: 'ライブ NASA POWER テレメトリに基づく多基準空間適地評価:',
      suitabilityScore: '適地総合スコア',
      tierGrade: 'Tier-A 最優秀',
      confidencePrefix: '信頼度',
      metrics: [
        { label: 'PV 設備容量', val: '120 kWp', sub: '高架両面発電' },
        { label: '年間発電量', val: '198 MWh', sub: 'PR 81.4%' },
        { label: '日次揚水量', val: '145 m³/day', sub: '18m TDH 揚程' },
        { label: '初期投資概算', val: '108K USD', sub: '一式 + VFD' },
        { label: '投資回収', val: '3.4 年', sub: '脱ディーゼル' },
        { label: 'CO₂ 削減', val: '142 t/yr', sub: 'Tier-1 認証' },
        { label: '作物遮光効果', val: '+18%', sub: '微気象改善' },
      ],
      reasoningTitle: 'AI 空間・農学的評価根拠',
      confidenceBadgePrefix: 'モデル信頼度',
      reasons: [
        {
          title: '日射資源の検証:',
          bodyBefore: 'NASA POWER 地表短波日射量の平均は',
          bodyAfter: 'に達し、大型蓄電池の深放電なしで昼間 VFD 揚水に高い設備利用率を確保できます。',
        },
        {
          title: '根域蒸発散の抑制:',
          body: '地上高 3.2m の高架アグリボルタイクス架台により、正午ピーク時の表土蒸発散量を 18〜24% 低減します。',
        },
        {
          title: 'ゼロ・ディーゼル水利経済性:',
          body: 'DC 直結 VFD ソーラー揚水により遠隔地への燃料輸送コストを撤廃し、農家の収益を安定化します。',
        },
      ],
      riskTitle: 'サイトリスク緩和策',
      riskBodyBefore: '季節性の雲量増加や極端な猛暑は揚水サイクルに影響します。',
      riskBodyHighlight: '20,000 L 重力式バッファ貯水槽',
      riskBodyAfter: 'と WhatsApp 自動渇水アラートを併用して曇天日に備えてください。',
      weightsTitle: 'MCDA 多基準評価ウェイト',
      weightsSubtitle: 'グローバル適地ランキング用加重スコアリング枠組み',
      weights: [
        '日射量資源 (NASA POWER)',
        '土壌水分不足の緊急度',
        '帯水層・用水路への近接性',
        '作物遮光シナジー',
        'ディーゼル・系統代替 ROI',
      ],
      solarProfileTitle: '24時間太陽光発電カーブ',
      solarProfileSubtitle: '時間帯別 PV アレイ出力プロファイル',
      solarMaxBadge: 'ピーク 98.4 kW',
      solarPeakZen: '12:15 (南中)',
      irradianceMonthlyTitle: '12ヶ月日射量プロファイル',
      irradianceMonthlySubtitle: '過去の季節別 kWh/m²/day 分布',
      irradianceAvgBadge: '平均 6.08 kWh/m²',
      months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    },
    footer: {
      brandLine: 'SOLVARA グローバル・アグリボルタイクス • NASA POWER & SMAP テレメトリスイート',
      resolution: '0.5° × 0.625° NASA POWER グリッド',
      iec: 'IEC 61724 PV 性能規格',
      vfdProtocol: 'Modbus VFD 相似則制御',
    },
    toast: {
      title: '農家向け早期警報を送信',
      bodyPrefix: 'WhatsApp/SMS 警報を以下の地域へ送信しました:',
      bodyMiddle: '·',
    },
    whatsappPreview: {
      botName: 'SOLVARA Sat-Alert Bot',
      onlineStatus: 'オンライン',
      previewTag: '農家モバイルプレビュー',
      todayLabel: '今日',
      copyBtn: 'メッセージをコピー',
      copiedBtn: 'コピー完了！',
      closeBtn: '閉じる',
    },
    intro: {
      startButton: 'Launch System',
      logoAria: 'SOLVARA プラットフォームを起動',
    },
  },
  ko: {
    header: {
      subtitle: '글로벌 영농형 태양광 및 위성 스마트 관개 지휘 플랫폼',
      langSwitcherLabel: '언어 선택기',
      langSearchPlaceholder: '언어 검색...',
      langFullLabel: '전체 UI',
      langFallbackNote: '완전 현지화',
      langNoMatch: '일치하는 언어가 없습니다',
      tabs: {
        macro: '가뭄 및 펌프 지도',
        ops: '정밀 관개 제어',
        feasibility: '입지 인텔리전스',
      },
      mobileTabs: {
        macro: '가뭄 지도',
        ops: '관개 운영',
        feasibility: '입지 분석',
      },
      telemetry: {
        syncing: 'NASA POWER 동기화 중...',
        live: 'NASA POWER 실시간',
        ready: 'NASA POWER 준비됨',
        sourceLive: '실시간 NASA POWER API',
        sourceFallback: 'NASA POWER 보정 백업',
        solarDate: '일사 관측일',
        moistureDate: '수분 관측일',
      },
      themeTooltip: {
        toLight: '라이트 모드로 전환',
        toDark: '다크 모드로 전환',
      },
    },
    tab1: {
      title: '글로벌 가뭄 스트레스 및 태양광 펌프 모니터링',
      subtitle: '실시간 NASA POWER 위성 텔레메트리, 실제 행정구역 감지 및 자동 VFD 펌프 배차',
      mobileFilterBtn: '필터 및 범례',
      zonesWord: '구역',
      filteredBadge: '필터 적용됨',
      filtersTitle: '텔레메트리 필터',
      resetFilters: '초기화',
      targetRegionLabel: '대상 세부 지역',
      allRegionsOption: '모든 지역',
      stapleCropLabel: '작물',
      allCropsOption: '모든 작물',
      severityLabel: '가뭄 심각도',
      severities: {
        All: '전체',
        Severe: '심각',
        Moderate: '보통',
        Mild: '경미 / 양호',
      },
      crops: {
        Maize: '옥수수',
        Wheat: '밀',
        Tomatoes: '토마토',
        Olives: '올리브',
        Almonds: '아몬드',
        Pistachios: '피스타치오',
        Soybeans: '대두',
        Cotton: '면화',
        Citrus: '감귤류',
        'Date Palms': '대추야자',
        Grapes: '포도',
        Rice: '벼',
        Horticulture: '원예 작물',
        'Chili & Leafy Greens': '고추 및 엽채류',
      },
      mapLegendTitle: '지도 범례',
      legendSevere: '심각한 가뭄 (< 20%)',
      legendModerate: '중간 스트레스 (20-29%)',
      legendMild: '양호 / 최적 (>= 30%)',
      legendPump: '태양광 펌프 스테이션',
      globalExplorer: {
        title: '글로벌 위성 좌표 및 도시 탐색기',
        subtitle: 'NASA 파트너 기준점을 선택하거나 전 세계 도시/GPS를 검색하여 실시간 NASA POWER 및 실제 행정구역을 조회하세요',
        cityPlaceholder: '전 세계 도시 검색 (예: 상주, 멘도사, 세비야, 나이로비)...',
        latLabel: 'LAT',
        lonLabel: 'LON',
        fetchBtn: 'NASA 데이터 조회',
        fetchingBtn: '위성 동기화 중...',
        presetsLabel: '벤치마크:',
        syncLangBtn: '지역 언어 맞추기',
        liveSourceBadge: 'LIVE NASA POWER API',
        fallbackSourceBadge: '위도 보정 대체 데이터',
        districtsPrefix: '실제 구역',
        geocodeError: '도시를 찾을 수 없습니다. 인근 주요 도시를 검색하거나 위도/경도를 입력하세요.',
        invalidCoordsError: '유효한 좌표를 입력하세요 (위도 -90~90, 경도 -180~180).',
        langNames: {
          en: 'English',
          id: 'Bahasa Indonesia',
          ar: 'العربية',
          pt: 'Português',
          es: 'Español',
          hi: 'हिन्दी',
          fr: 'Français',
          ja: '日本語',
          ko: '한국어',
          it: 'Italiano',
          th: 'ไทย',
          sv: 'Svenska',
          no: 'Norsk',
          nl: 'Nederlands',
          de: 'Deutsch',
        },
      },
      simulator: {
        title: '극한 기상 가상 시뮬레이터 (What-If)',
        simActive: '시뮬레이션 활성',
        liveBaseline: 'NASA 실시간 기준',
        resetBtn: 'NASA 실시간 값 복원',
        rainfallLabel: '일일 강수량 시뮬레이션',
        solarLabel: '일사량 시뮬레이션',
        extremeDry: '0 mm (극심한 가뭄)',
      },
      map: {
        resolutionLabel: '공간 해상도:',
        resolutionValue: 'NASA SMAP / POWER 0.5°',
        pumpCapPrefix: '용량:',
        pumpStatuses: {
          Active: '가동 중',
          Standby: '대기 중',
          Optimizing: '최적화 중',
        },
        interactiveHint: '구역 마커를 클릭하여 위성 텔레메트리와 태양광 펌프 설계를 확인하세요',
        showAllPrefix: '전체 보기',
      },
      districtsStrip: {
        title: '폰티아낙 구역별 텔레메트리',
      },
      priorityBanner: {
        title: 'AI 태양광 펌프 우선 배차 권고',
        pumpSitePrefix: '우선 구역:',
        criticalMoistureText: '위험 토양 수분',
        recordsText: '관측 기록:',
        macroWetnessText: '유역 토양 수분',
      },
      telemetryPanel: {
        title: '구역 텔레메트리',
        droughtSuffix: '가뭄',
        plantationSuffix: '필지',
        smapMoisture: '토양 수분 (GWETTOP)',
        criticalDry: '심각 건조',
        moderate: '보통',
        humidOptimal: '적정 수분',
        volumetricDepth: '표층 근권부 수분',
        sevenDayTrend: '7일 수분 추세',
        deficit: '감소',
        gain: '증가',
        nasaRadiance: '태양 일사량',
        strong: '고발전 잠재력',
        moderateSolar: '보통 일사',
        solarPumpYield: '태양광 펌프 출력',
        capacityUnit: '단계',
        surfaceTempLabel: '지표 기온 (T2M)',
      },
      peatland: {
        eyebrow: '생태계 조기 경보',
        moisturePrefix: '현재 토양 수분',
        sendWarningBtn: '농가 WhatsApp/SMS 경보 발송',
        confirmedTitle: '조기 경보 발송 완료',
        confirmedBodyPrefix: '해당 지역 농가 그룹으로 WhatsApp/SMS 알림 발송:',
      },
      solarSizing: {
        eyebrow: '스마트 PV 설계 계산',
        title: '태양광 용량 및 연료 절감 산출',
        arraySizeLabel: '권장 태양광 어레이',
        panelUnit: '매 (550Wp 모듈)',
        dailyWaterLabel: '일일 예상 양수량',
        dailyWaterUnit: 'L/day',
        dailyEnergyUnit: 'kWh/day',
        monthlySavingsLabel: '월간 예상 비용 절감',
        vsDiesel: '디젤 펌프 대비',
        saveFuelPrefix: '월간 절감',
        saveFuelSuffix: 'L 경유 / 월',
      },
      advisor: {
        eyebrow: '로컬 텔레메트리 추론 엔진',
        title: 'SOLVARA AI 영농 어드바이저',
        liveBriefPrefix: '실시간 브리핑',
        quickPromptsTitle: '빠른 영농 질의',
        analyzingPrefix: 'NASA 텔레메트리 분석 중:',
        prompts: {
          schedule: '오늘 최적 관개 시간대는?',
          peatland: '가뭄 스트레스 완화 방안은?',
          roi: '태양광 vs 디젤 펌프 ROI 비교',
        },
      },
    },
    tab2: {
      bannerTitle: '자율형 태양광 VFD 펌프 제어 온라인',
      bannerSubtitle: 'MPPT 추적 + VFD 인버터 제어가 NASA POWER 데이터와 실시간 동기화됨',
      telemetryOk: '텔레메트리 정상',
      kpis: {
        solarOutput: 'PV 어레이 출력',
        solarSub: 'MPPT 추적 효율 98.6%',
        pumpCapacity: '펌프 유량',
        pumpSub: 'VFD 가변 속도 제어',
        waterReserve: '저장 탱크 잔량',
        waterSub: '20,000 L 중력식 버퍼',
        rain3Day: '3일 평균 강수량',
        rainLatestPrefix: '최신:',
        rainOptimalSolar: '태양광 발전 최적',
        rainActiveRecharge: '자연 강수 보충 중',
        yieldSaved: '작물 수확량 보존율',
        yieldSub: '시들음 피해 예방',
      },
      heatmap: {
        title: '140개 필지 토양 수분 매트릭스 및 비상 관개 시뮬레이션',
        subtitle: '건조 스트레스 필지로 퍼져나가는 방사형 태양광 점적 관개 파동 모의',
        scaleLabel: '축척:',
        reRunBtn: '비상 태양광 관개 실행',
        pumpingActive: '관개 파동 가동 중',
        resetDemoBtn: '가뭄 상태 초기화',
        plotPrefix: '필지 #',
        legend: {
          severe: '심각',
          high: '높음',
          moderate: '보통',
          low: '낮음',
          hydrated: '충분',
        },
        cellLabels: {
          hydrated: '수분 충분 (최적)',
          severe: '심각한 스트레스 (<15%)',
          high: '높은 스트레스 (15-25%)',
          moderate: '중간 스트레스 (25-40%)',
          low: '낮은 스트레스 (40-60%)',
        },
      },
      vfd: {
        affinityLawPrefix: '상사 법칙: P ∝ N³',
        title: 'VFD 효율 최적화 엔진',
        subtitle: '실시간 근권부 수분에 맞춰 펌프 회전수(RPM)와 전력을 동적 변조',
        sourcePlotArray: '필지 매트릭스',
        autoSyncOn: '자동 동기화 ON',
        autoSyncOff: '자동 동기화 OFF',
        liveRootMoisturePrefix: '유효 근권부 수분',
        criticalWord: '위험',
        hydratedWord: '충분',
        zoneTelemetryPrefix: '구역 텔레메트리',
        meanArrayPrefix: '평균:',
        suggestedAdjustment: '권장 주파수 조정',
        optimalSynced: '최적 동기화됨',
        rampDown: '감속 절전',
        rampUp: '가속 증압',
        activeInverterSpeed: '현재 인버터 속도:',
        targetPrefix: '목표:',
        recommendedTooltipPrefix: '권장 목표:',
        manualSliderLabel: '수동 주파수 제어 (20 - 50 Hz)',
        nominalRpmSuffix: '정격 RPM',
        syncedBtn: '인버터 동기화됨',
        applyBtnPrefix: '적용',
        kpiSuggestedSpeed: '목표 VFD 주파수',
        kpiAdjustedFlow: '조정된 유량',
        kpiVsActivePrefix: '현재 대비',
        kpiVsActiveSuffix: '가동 중',
        kpiInverterLoad: '인버터 부하',
        kpiVsCurrentSuffix: 'kW 절감',
        kpiBaseline50Hz: '50 Hz 기준선',
        kpiEnergySaved: '에너지 절감률',
        kpiToBatterySuffix: 'kWh/day 절감',
      },
      allocation: {
        title: '태양광 전력 배분 현황',
        subtitle: '우선순위 구역별 실시간 PV 출력 분배 비율',
      },
      forecast: {
        title: '24시간 양수량 태양광 예측',
        subtitlePrefix: '최적 가동 창',
        subtitleMiddle: '10:00 - 14:30',
        subtitleSuffix: '(최대 일사량 구간 동기화)',
        estTotal: '예상 114,500 L/day',
        peakLabel: '12h (피크)',
      },
    },
    tab3: {
      rankBadge: '1순위 영농형 태양광 최적 입지',
      siteCodePrefix: 'SITE CODE:',
      siteTitleSuffix: '영농형 태양광 타당성 분석 보고서',
      siteSubtitlePrefix: '실시간 NASA POWER 텔레메트리 기반 다기준 공간 의사결정 분석:',
      suitabilityScore: '입지 적합도 점수',
      tierGrade: 'Tier-A 최우수 등급',
      confidencePrefix: '신뢰도',
      metrics: [
        { label: 'PV 설비 용량', val: '120 kWp', sub: '고상 양면 모듈' },
        { label: '연간 발전량', val: '198 MWh', sub: 'PR 81.4%' },
        { label: '일일 양수량', val: '145 m³/day', sub: '18m TDH 양정' },
        { label: '예상 투자비', val: '108K USD', sub: '턴키 + VFD' },
        { label: '투자 회수', val: '3.4 년', sub: '디젤 대체' },
        { label: 'CO₂ 감축', val: '142 t/yr', sub: 'Tier-1 인증' },
        { label: '작물 차광 효과', val: '+18%', sub: '미기후 개선' },
      ],
      reasoningTitle: 'AI 공간 및 농학적 추론 근거',
      confidenceBadgePrefix: '모델 신뢰도',
      reasons: [
        {
          title: '태양광 자원 검증:',
          bodyBefore: 'NASA POWER 지표 단파 일사량 평균이',
          bodyAfter: '로 측정되어 대용량 배터리 방전 없이도 주간 VFD 펌핑의 높은 설비 이용률을 보장합니다.',
        },
        {
          title: '근권부 증발산 완화:',
          body: '3.2m 높이의 고상 영농형 태양광 구조물은 정오 고온 시간대 표토 증발산을 18~24% 감소시킵니다.',
        },
        {
          title: '무디젤 수리 경제성:',
          body: 'DC 직결 VFD 태양광 양수는 연료 운송 비용을 완전히 제거하여 소농의 관개 수익성을 안정화합니다.',
        },
      ],
      riskTitle: '입지 리스크 완화 노트',
      riskBodyBefore: '계절성 구름이나 극한 폭염으로 양수 주기가 변할 수 있습니다.',
      riskBodyHighlight: '20,000 L 중력식 버퍼 저장 탱크',
      riskBodyAfter: '와 자동 WhatsApp 가뭄 경보를 결합하여 흐린 날에도 안정적으로 급수하세요.',
      weightsTitle: 'MCDA 다기준 가중치',
      weightsSubtitle: '입지 우선순위 산정을 위한 가중 공간 평가 프레임워크',
      weights: [
        '태양 일사량 (NASA POWER)',
        '토양 수분 결핍 시급성',
        '대수층 / 수로 접근성',
        '작물 차광 시너지',
        '디젤·계통 대체 ROI',
      ],
      solarProfileTitle: '24시간 태양광 발전 곡선',
      solarProfileSubtitle: '시간대별 PV 어레이 출력 프로파일',
      solarMaxBadge: '최대 98.4 kW',
      solarPeakZen: '12:15 (정오)',
      irradianceMonthlyTitle: '12개월 일사량 분포',
      irradianceMonthlySubtitle: '월별 kWh/m²/day 계절 변화 추이',
      irradianceAvgBadge: '연평균 6.08 kWh/m²',
      months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    },
    footer: {
      brandLine: 'SOLVARA 글로벌 영농형 태양광 • NASA POWER & SMAP 텔레메트리 스위트',
      resolution: '0.5° × 0.625° NASA POWER 격자',
      iec: 'IEC 61724 PV 성능 표준',
      vfdProtocol: 'Modbus VFD 상사 제어 프로토콜',
    },
    toast: {
      title: '농가 조기 경보 발송됨',
      bodyPrefix: 'WhatsApp/SMS 경보가 다음 지역 농가로 발송되었습니다:',
      bodyMiddle: '·',
    },
    whatsappPreview: {
      botName: 'SOLVARA Sat-Alert Bot',
      onlineStatus: '온라인',
      previewTag: '농가 모바일 미리보기',
      todayLabel: '오늘',
      copyBtn: '메시지 복사',
      copiedBtn: '복사됨!',
      closeBtn: '닫기',
    },
    intro: {
      startButton: 'Launch System',
      logoAria: 'SOLVARA 플랫폼 시작',
    },
  },
  it: {
    header: {
      subtitle: 'Comando Globale Agrivoltaico e Irrigazione Solare Satellitare',
      langSwitcherLabel: 'Selettore lingua',
      langSearchPlaceholder: 'Cerca lingua...',
      langFullLabel: 'UI Completa',
      langFallbackNote: 'Localizzazione completa',
      langNoMatch: 'Nessuna lingua trovata',
      tabs: {
        macro: 'Mappa Siccità e Pompe',
        ops: 'Operazioni Irrigazione',
        feasibility: 'Analisi del Sito',
      },
      mobileTabs: {
        macro: 'Mappa Siccità',
        ops: 'Operazioni',
        feasibility: 'Fattibilità',
      },
      telemetry: {
        syncing: 'Sincronizzazione NASA POWER...',
        live: 'NASA POWER In Diretta',
        ready: 'NASA POWER Pronto',
        sourceLive: 'API NASA POWER Live',
        sourceFallback: 'Backup Calibrato NASA POWER',
        solarDate: 'Solare',
        moistureDate: 'Umidità',
      },
      themeTooltip: {
        toLight: 'Passa a Modalità Chiara',
        toDark: 'Passa a Modalità Scura',
      },
    },
    tab1: {
      title: 'Monitoraggio Globale Siccità e Pompaggio Solare',
      subtitle: 'Telemetria satellitare NASA POWER dal vivo, rilevamento reale dei distretti e dispacciamento VFD automatico',
      mobileFilterBtn: 'Filtri e Legenda',
      zonesWord: 'Zone',
      filteredBadge: 'Filtrato',
      filtersTitle: 'Filtri Telemetria',
      resetFilters: 'Ripristina',
      targetRegionLabel: 'Sottoregione Target',
      allRegionsOption: 'Tutte le Regioni',
      stapleCropLabel: 'Coltura',
      allCropsOption: 'Tutte le Colture',
      severityLabel: 'Gravità Siccità',
      severities: {
        All: 'Tutte',
        Severe: 'Grave',
        Moderate: 'Moderata',
        Mild: 'Lieve / Ottimale',
      },
      crops: {
        Maize: 'Mais',
        Wheat: 'Grano',
        Tomatoes: 'Pomodori',
        Olives: 'Ulivi',
        Almonds: 'Mandorli',
        Pistachios: 'Pistacchi',
        Soybeans: 'Soia',
        Cotton: 'Cotone',
        Citrus: 'Agrumi',
        'Date Palms': 'Palme da Dattero',
        Grapes: 'Uva',
        Rice: 'Riso',
        Horticulture: 'Orticoltura',
        'Chili & Leafy Greens': 'Peperoncino e Verdure a Foglia',
      },
      mapLegendTitle: 'Legenda Mappa',
      legendSevere: 'Stress Grave (< 20%)',
      legendModerate: 'Stress Moderato (20-29%)',
      legendMild: 'Lieve / Ottimale (>= 30%)',
      legendPump: 'Stazione di Pompaggio Solare',
      globalExplorer: {
        title: 'Esploratore Globale Coordinate e Città Satellitari',
        subtitle: 'Scegli un benchmark NASA o cerca qualsiasi città / GPS nel mondo per ottenere dati NASA POWER e distretti reali',
        cityPlaceholder: 'Cerca qualsiasi città nel mondo (es. Catania, Siviglia, Mendoza)...',
        latLabel: 'LAT',
        lonLabel: 'LON',
        fetchBtn: 'Ottieni Dati NASA',
        fetchingBtn: 'Sincronizzazione...',
        presetsLabel: 'Benchmark:',
        syncLangBtn: 'Sincronizza Lingua Locale',
        liveSourceBadge: 'LIVE NASA POWER API',
        fallbackSourceBadge: 'BACKUP CALIBRATO PER LATITUDINE',
        districtsPrefix: 'Distretti Reali',
        geocodeError: 'Città non trovata. Prova un centro vicino o inserisci latitudine e longitudine.',
        invalidCoordsError: 'Inserisci coordinate valide (Latitudine da -90 a 90, Longitudine da -180 a 180).',
        langNames: {
          en: 'English',
          id: 'Bahasa Indonesia',
          ar: 'العربية',
          pt: 'Português',
          es: 'Español',
          hi: 'हिन्दी',
          fr: 'Français',
          ja: '日本語',
          ko: '한국어',
          it: 'Italiano',
          th: 'ไทย',
          sv: 'Svenska',
          no: 'Norsk',
          nl: 'Nederlands',
          de: 'Deutsch',
        },
      },
      simulator: {
        title: 'Simulatore Clima Estremo (What-If)',
        simActive: 'Simulazione Attiva',
        liveBaseline: 'Linea Base NASA Live',
        resetBtn: 'Ripristina Dati NASA',
        rainfallLabel: 'Pioggia Giornaliera Simulata',
        solarLabel: 'Irradianza Solare Simulata',
        extremeDry: '0 mm (Siccità Estrema)',
      },
      map: {
        resolutionLabel: 'Risoluzione:',
        resolutionValue: 'NASA SMAP / POWER 0.5°',
        pumpCapPrefix: 'Portata:',
        pumpStatuses: {
          Active: 'Attiva',
          Standby: 'Standby',
          Optimizing: 'In Ottimizzazione',
        },
        interactiveHint: 'Clicca una zona per visualizzare telemetria e dimensionamento solare',
        showAllPrefix: 'Mostra Tutte',
      },
      districtsStrip: {
        title: 'Telemetria Distretti',
      },
      priorityBanner: {
        title: 'Priorità Dispacciamento Solare IA',
        pumpSitePrefix: 'Sito Prioritario:',
        criticalMoistureText: 'umidità critica del suolo',
        recordsText: 'registra',
        macroWetnessText: 'umidità del bacino',
      },
      telemetryPanel: {
        title: 'Telemetria di Zona',
        droughtSuffix: 'Siccità',
        plantationSuffix: 'Appezzamento',
        smapMoisture: 'Umidità del Suolo (GWETTOP)',
        criticalDry: 'Secco Critico',
        moderate: 'Moderato',
        humidOptimal: 'Ottimale',
        volumetricDepth: 'Zona radicale superficiale',
        sevenDayTrend: 'Tendenza 7 Giorni',
        deficit: 'deficit',
        gain: 'recupero',
        nasaRadiance: 'Radiazione Solare',
        strong: 'Alta Resa',
        moderateSolar: 'Moderata',
        solarPumpYield: 'Capacità Solare',
        capacityUnit: 'Barre',
        surfaceTempLabel: 'Temp. Aria Superficiale (T2M)',
      },
      peatland: {
        eyebrow: 'Allerta Precoce Ecosistema',
        moisturePrefix: 'Umidità del suolo',
        sendWarningBtn: 'Invia Allerta WhatsApp/SMS Agricoltori',
        confirmedTitle: 'Allerta Inviata',
        confirmedBodyPrefix: 'Notifica WhatsApp/SMS inviata agli agricoltori in',
      },
      solarSizing: {
        eyebrow: 'Ingegneria PV Intelligente',
        title: 'Dimensionamento Solare e Risparmio',
        arraySizeLabel: 'Impianto Solare Consigliato',
        panelUnit: 'Pannelli 550Wp',
        dailyWaterLabel: 'Acqua Pompata Stimata',
        dailyWaterUnit: 'L/day',
        dailyEnergyUnit: 'kWh/day',
        monthlySavingsLabel: 'Risparmio Mensile Stimato',
        vsDiesel: 'vs Pompa Diesel',
        saveFuelPrefix: 'Risparmia',
        saveFuelSuffix: 'L diesel / mese',
      },
      advisor: {
        eyebrow: 'Motore Telemetrico Locale',
        title: 'Consulente Agronomico IA SOLVARA',
        liveBriefPrefix: 'RIEPILOGO LIVE',
        quickPromptsTitle: 'Richieste Rapide',
        analyzingPrefix: 'Analisi telemetria NASA per',
        prompts: {
          schedule: 'Miglior orario di irrigazione oggi?',
          peatland: 'Piano di mitigazione dello stress?',
          roi: 'ROI Pompa Solare vs Diesel?',
        },
      },
    },
    tab2: {
      bannerTitle: 'DISPACCIAMENTO AUTONOMO POMPE SOLARI VFD ONLINE',
      bannerSubtitle: 'Modulazione MPPT + Inverter VFD sincronizzata con NASA POWER',
      telemetryOk: 'TELEMETRIA NOMINALE',
      kpis: {
        solarOutput: 'Potenza Array PV',
        solarSub: 'Tracking MPPT 98.6%',
        pumpCapacity: 'Portata Pompa',
        pumpSub: 'VFD Velocità Variabile',
        waterReserve: 'Riserva Serbatoio',
        waterSub: 'Serbatoio 20,000 L',
        rain3Day: 'Pioggia Media 3G',
        rainLatestPrefix: 'Ultima:',
        rainOptimalSolar: 'Solare Ottimale',
        rainActiveRecharge: 'Ricarica Attiva',
        yieldSaved: 'Raccolto Protetto',
        yieldSub: 'Prevenzione appassimento',
      },
      heatmap: {
        title: 'Matrice Umidità 140 Parcelle e Irrigazione d’Emergenza',
        subtitle: 'Simula l’onda radiale di idratazione solare a goccia nei campi in stress',
        scaleLabel: 'SCALA:',
        reRunBtn: 'Avvia Irrigazione Solare d’Emergenza',
        pumpingActive: 'Onda di Idratazione Attiva',
        resetDemoBtn: 'Ripristina Stress',
        plotPrefix: 'Parcella #',
        legend: {
          severe: 'Grave',
          high: 'Alto Stress',
          moderate: 'Moderato',
          low: 'Lieve',
          hydrated: 'Idratato',
        },
        cellLabels: {
          hydrated: 'Idratato (Ottimale)',
          severe: 'Stress Grave (<15%)',
          high: 'Alto Stress (15-25%)',
          moderate: 'Stress Moderato (25-40%)',
          low: 'Stress Lieve (40-60%)',
        },
      },
      vfd: {
        affinityLawPrefix: 'Legge di Affinità: P ∝ N³',
        title: 'Ottimizzatore Efficienza VFD',
        subtitle: 'Modula dinamicamente i giri della pompa secondo l’umidità radicale in tempo reale',
        sourcePlotArray: 'Matrice Campo',
        autoSyncOn: 'Auto-Sincronia ON',
        autoSyncOff: 'Auto-Sincronia OFF',
        liveRootMoisturePrefix: 'Umidità Radicale Effettiva',
        criticalWord: 'critiche',
        hydratedWord: 'idratate',
        zoneTelemetryPrefix: 'Telemetria Zona',
        meanArrayPrefix: 'Media:',
        suggestedAdjustment: 'Regolazione Suggerita',
        optimalSynced: 'Sincronizzato',
        rampDown: 'Riduci Hz',
        rampUp: 'Aumenta Hz',
        activeInverterSpeed: 'Velocità Attiva:',
        targetPrefix: 'Obiettivo:',
        recommendedTooltipPrefix: 'Obiettivo ottimale:',
        manualSliderLabel: 'Controllo Manuale Frequenza (20 - 50 Hz)',
        nominalRpmSuffix: 'RPM Nominali',
        syncedBtn: 'Inverter Sincronizzato',
        applyBtnPrefix: 'Applica',
        kpiSuggestedSpeed: 'Frequenza Target VFD',
        kpiAdjustedFlow: 'Portata Regolata',
        kpiVsActivePrefix: 'vs',
        kpiVsActiveSuffix: 'attivo',
        kpiInverterLoad: 'Carico Inverter',
        kpiVsCurrentSuffix: 'kW risparmiati',
        kpiBaseline50Hz: 'Base 50 Hz',
        kpiEnergySaved: 'Energia Risparmiata',
        kpiToBatterySuffix: 'kWh/day risparmiati',
      },
      allocation: {
        title: 'Allocazione Dispacciamento Solare',
        subtitle: 'Ripartizione potenza PV in tempo reale per priorità di zona',
      },
      forecast: {
        title: 'Produzione Idrica · Previsione 24H',
        subtitlePrefix: 'Finestra di picco',
        subtitleMiddle: '10:00 - 14:30',
        subtitleSuffix: 'allineata alla massima irradianza',
        estTotal: 'Stima 114,500 L/day',
        peakLabel: '12h (Picco)',
      },
    },
    tab3: {
      rankBadge: 'SITO AGRIVOLTAICO #1',
      siteCodePrefix: 'SITE CODE:',
      siteTitleSuffix: 'Dossier di Fattibilità Agrivoltaica',
      siteSubtitlePrefix: 'Intelligenza spaziale multicriterio ancorata ai dati NASA POWER presso',
      suitabilityScore: 'Indice di Idoneità',
      tierGrade: 'Classe A Prime',
      confidencePrefix: 'Affidabilità',
      metrics: [
        { label: 'Capacità PV', val: '120 kWp', sub: 'Bifacciale elevato' },
        { label: 'Resa Annua', val: '198 MWh', sub: 'PR 81.4%' },
        { label: 'Pompaggio', val: '145 m³/day', sub: '18m TDH' },
        { label: 'Capex Stimato', val: '108K USD', sub: 'Chiavi in mano + VFD' },
        { label: 'Ritorno', val: '3.4 Anni', sub: 'Zero diesel' },
        { label: 'CO₂ Evitata', val: '142 t/yr', sub: 'Verificata' },
        { label: 'Ombreggiamento', val: '+18%', sub: 'Microclima fresco' },
      ],
      reasoningTitle: 'Analisi Spaziale e Agronomica IA',
      confidenceBadgePrefix: 'Affidabilità Modello',
      reasons: [
        {
          title: 'Verifica Risorsa Solare:',
          bodyBefore: 'L’irradianza media NASA POWER raggiunge',
          bodyAfter: 'garantendo un elevato fattore di capacità per il pompaggio VFD diurno senza cicli gravosi di batteria.',
        },
        {
          title: 'Mitigazione Evapotraspirazione:',
          body: 'Le strutture agrivoltaiche elevate a 3,2 m riducono l’evapotraspirazione superficiale del 18–24% nelle ore più calde.',
        },
        {
          title: 'Economia Idraulica Zero-Diesel:',
          body: 'Il pompaggio VFD diretto in CC elimina la logistica del carburante e stabilizza i margini agricoli.',
        },
      ],
      riskTitle: 'Nota di Mitigazione dei Rischi',
      riskBodyBefore: 'La copertura nuvolosa stagionale o le ondate di calore possono spostare i cicli di pompaggio. Abbina',
      riskBodyHighlight: 'un serbatoio a gravità da 20,000 L',
      riskBodyAfter: 'alle allerte automatiche WhatsApp per coprire eventuali giornate nuvolose.',
      weightsTitle: 'Pesi Multicriterio MCDA',
      weightsSubtitle: 'Modello ponderato per la classificazione dei siti',
      weights: [
        'Irradianza Solare (NASA POWER)',
        'Urgenza Deficit Idrico',
        'Prossimità Falda / Canale',
        'Sinergia Ombreggiamento Colture',
        'ROI Sostituzione Diesel e Rete',
      ],
      solarProfileTitle: 'Curva di Generazione Solare 24H',
      solarProfileSubtitle: 'Profilo orario di potenza PV',
      solarMaxBadge: 'Picco 98.4 kW',
      solarPeakZen: '12:15 (Zenit)',
      irradianceMonthlyTitle: 'Profilo Mensile di Irradianza',
      irradianceMonthlySubtitle: 'Distribuzione stagionale storica (kWh/m²/day)',
      irradianceAvgBadge: 'Media 6.08 kWh/m²',
      months: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
    },
    footer: {
      brandLine: 'SOLVARA Agrivoltaico Planetario • Suite Telemetrica NASA POWER & SMAP',
      resolution: 'Griglia NASA POWER 0.5° × 0.625°',
      iec: 'Prestazioni PV IEC 61724',
      vfdProtocol: 'Controllo VFD Modbus',
    },
    toast: {
      title: 'Allerta Precoce Inviata',
      bodyPrefix: 'Allerta WhatsApp/SMS inviata agli agricoltori in',
      bodyMiddle: 'per',
    },
    whatsappPreview: {
      botName: 'SOLVARA Sat-Alert Bot',
      onlineStatus: 'Online',
      previewTag: 'Anteprima Cellulare Agricoltore',
      todayLabel: 'OGGI',
      copyBtn: 'Copia Messaggio',
      copiedBtn: 'Copiato!',
      closeBtn: 'Chiudi',
    },
    intro: {
      startButton: 'Launch System',
      logoAria: 'Accedi alla piattaforma SOLVARA',
    },
  },
  th: {
    header: {
      subtitle: 'ศูนย์ควบคุมเกษตรโซลาร์เซลล์และระบบชลประทานดาวเทียมระดับโลก',
      langSwitcherLabel: 'ตัวเลือกภาษา',
      langSearchPlaceholder: 'ค้นหาภาษา...',
      langFullLabel: 'อินเทอร์เฟซเต็มรูปแบบ',
      langFallbackNote: 'การแจ้งเตือนภาษาท้องถิ่น + UI อังกฤษ',
      langNoMatch: 'ไม่พบภาษาที่ตรงกัน',
      tabs: {
        macro: 'แผนที่ภัยแล้งและปั๊มน้ำ',
        ops: 'ปฏิบัติการชลประทานแม่นยำ',
        feasibility: 'ข้อมูลเชิงลึกพื้นที่',
      },
      mobileTabs: {
        macro: 'แผนที่ภัยแล้ง',
        ops: 'ปฏิบัติการ',
        feasibility: 'ข้อมูลพื้นที่',
      },
      telemetry: {
        syncing: 'กำลังซิงค์ NASA POWER...',
        live: 'NASA POWER สด',
        ready: 'NASA POWER พร้อมใช้งาน',
        sourceLive: 'API NASA POWER แบบเรียลไทม์',
        sourceFallback: 'ข้อมูลสำรองปรับเทียบ NASA POWER',
        solarDate: 'แสงอาทิตย์',
        moistureDate: 'ความชื้น',
      },
      themeTooltip: {
        toLight: 'สลับเป็นโหมดสว่าง',
        toDark: 'สลับเป็นโหมดมืด',
      },
    },
    tab1: {
      title: 'การติดตามภาวะแห้งแล้งระดับโลกและปั๊มน้ำพลังงานแสงอาทิตย์',
      subtitle: 'ข้อมูลดาวเทียม NASA POWER แบบเรียลไทม์ การตรวจจับอำเภอจริง และการสั่งงานปั๊ม VFD อัตโนมัติ',
      mobileFilterBtn: 'ตัวกรองและคำอธิบาย',
      zonesWord: 'โซน',
      filteredBadge: 'กรองแล้ว',
      filtersTitle: 'ตัวกรองข้อมูลระยะไกล',
      resetFilters: 'รีเซ็ต',
      targetRegionLabel: 'พื้นที่ย่อยเป้าหมาย',
      allRegionsOption: 'ทุกพื้นที่',
      stapleCropLabel: 'พืชผล / สินค้าเกษตร',
      allCropsOption: 'พืชผลทั้งหมด',
      severityLabel: 'ระดับความรุนแรงภัยแล้ง',
      severities: {
        All: 'ทั้งหมด',
        Severe: 'รุนแรง',
        Moderate: 'ปานกลาง',
        Mild: 'เล็กน้อย',
      },
      crops: {
        ...SHARED_CROPS_EN,
        Maize: 'ข้าวโพด',
        Wheat: 'ข้าวสาลี',
        Tomatoes: 'มะเขือเทศ',
        Olives: 'มะกอก',
        Almonds: 'อัลมอนด์',
        Pistachios: 'พิสตาชิโอ',
        Soybeans: 'ถั่วเหลือง',
        Cotton: 'ฝ้าย',
        Citrus: 'ส้ม',
        'Date Palms': 'อินทผลัม',
        Grapes: 'องุ่น',
        Rice: 'ข้าว',
        Horticulture: 'พืชสวน',
        'Chili & Leafy Greens': 'พริกและผักใบ',
      },
      mapLegendTitle: 'คำอธิบายแผนที่',
      legendSevere: 'เครียดน้ำรุนแรง (< 20%)',
      legendModerate: 'เครียดน้ำปานกลาง (20-29%)',
      legendMild: 'เล็กน้อย / เหมาะสม (>= 30%)',
      legendPump: 'สถานีปั๊มน้ำโซลาร์',
      globalExplorer: {
        title: 'เครื่องมือสำรวจพิกัดดาวเทียมและเมืองทั่วโลก',
        subtitle: 'เลือกมาตรฐานพันธมิตร NASA หรือระบุเมือง / พิกัด GPS ใดก็ได้ทั่วโลกเพื่อรับข้อมูล NASA POWER สดและชื่อเขตจริง',
        cityPlaceholder: 'ค้นหาเมืองใดก็ได้ทั่วโลก (เช่น Bangkok, Chiang Mai, Nairobi, Seville)...',
        latLabel: 'LAT',
        lonLabel: 'LON',
        fetchBtn: 'ดึงข้อมูลดาวเทียม NASA',
        fetchingBtn: 'กำลังซิงค์ดาวเทียม...',
        presetsLabel: 'จุดอ้างอิง:',
        syncLangBtn: 'ปรับภาษาตามภูมิภาค',
        liveSourceBadge: 'LIVE NASA POWER API',
        fallbackSourceBadge: 'ข้อมูลสำรองตามละติจูด',
        districtsPrefix: 'เขตพื้นที่',
        geocodeError: 'ไม่พบเมือง ลองชื่อเมืองใหญ่ใกล้เคียงหรือกรอกละติจูด/ลองจิจูดโดยตรง',
        invalidCoordsError: 'กรุณากรอกพิกัดที่ถูกต้อง (ละติจูด -90 ถึง 90, ลองจิจูด -180 ถึง 180)',
        langNames: {
          en: 'English',
          id: 'Bahasa Indonesia',
          ar: 'العربية',
          pt: 'Português',
          es: 'Español',
          hi: 'हिन्दी',
          fr: 'Français',
          ja: '日本語',
          ko: '한국어',
          it: 'Italiano',
          th: 'ไทย',
          sv: 'Svenska',
          no: 'Norsk',
          nl: 'Nederlands',
          de: 'Deutsch',
        },
      },
      simulator: {
        title: 'เครื่องจำลองสภาพอากาศสุดขั้ว (What-If)',
        simActive: 'กำลังจำลองสถานการณ์',
        liveBaseline: 'ฐานข้อมูลสด NASA',
        resetBtn: 'รีเซ็ตเป็นข้อมูล NASA สด',
        rainfallLabel: 'ปริมาณฝนรายวันจำลอง',
        solarLabel: 'ความเข้มแสงอาทิตย์จำลอง',
        extremeDry: '0 mm (แล้งจัด)',
      },
      map: {
        resolutionLabel: 'ความละเอียดเชิงพื้นที่:',
        resolutionValue: 'NASA SMAP / POWER 0.5°',
        pumpCapPrefix: 'กำลังสูบ:',
        pumpStatuses: {
          Active: 'ทำงาน',
          Standby: 'พร้อมใช้งาน',
          Optimizing: 'กำลังปรับสมดุล',
        },
        interactiveHint: 'คลิกเครื่องหมายโซนเพื่อตรวจสอบข้อมูลดาวเทียมและขนาดโซลาร์',
        showAllPrefix: 'แสดงทั้งหมด',
      },
      districtsStrip: {
        title: 'ข้อมูลระยะไกลระดับเขตพื้นที่',
      },
      priorityBanner: {
        title: 'ลำดับความสำคัญการจ่ายน้ำปั๊มโซลาร์ AI',
        pumpSitePrefix: 'จุดสำคัญอันดับแรก:',
        criticalMoistureText: 'ความชื้นดินวิกฤต',
        recordsText: 'บันทึก',
        macroWetnessText: 'ความชื้นดินลุ่มน้ำ',
      },
      telemetryPanel: {
        title: 'ข้อมูลระยะไกลประจำโซน',
        droughtSuffix: 'ภาวะแล้ง',
        plantationSuffix: 'แปลงเพาะปลูก',
        smapMoisture: 'ความชื้นดิน (GWETTOP)',
        criticalDry: 'แห้งวิกฤต',
        moderate: 'ปานกลาง',
        humidOptimal: 'เหมาะสม',
        volumetricDepth: 'ชั้นรากผิวดิน',
        sevenDayTrend: 'แนวโน้มความชื้น 7 วัน',
        deficit: 'ขาดดุล',
        gain: 'เพิ่มขึ้น',
        nasaRadiance: 'รังสีดวงอาทิตย์',
        strong: 'ผลผลิตสูง',
        moderateSolar: 'ปานกลาง',
        solarPumpYield: 'กำลังปั๊มโซลาร์',
        capacityUnit: 'ระดับ',
        surfaceTempLabel: 'อุณหภูมิอากาศผิวดิน (T2M)',
      },
      peatland: {
        eyebrow: 'ระบบเตือนภัยล่วงหน้าระบบนิเวศ',
        moisturePrefix: 'ความชื้นดิน',
        sendWarningBtn: 'ส่งการแจ้งเตือนเกษตรกรทาง WhatsApp/SMS',
        confirmedTitle: 'ส่งการแจ้งเตือนแล้ว',
        confirmedBodyPrefix: 'จัดคิวการแจ้งเตือน WhatsApp/SMS สำหรับเกษตรกรใน',
      },
      solarSizing: {
        eyebrow: 'วิศวกรรม PV อัจฉริยะ',
        title: 'การคำนวณขนาดปั๊มโซลาร์และการประหยัดเชื้อเพลิง',
        arraySizeLabel: 'ขนาดแผงโซลาร์ที่แนะนำ',
        panelUnit: 'แผง 550Wp',
        dailyWaterLabel: 'ปริมาณน้ำสูบเฉลี่ยต่อวัน',
        dailyWaterUnit: 'L/day',
        dailyEnergyUnit: 'kWh/day',
        monthlySavingsLabel: 'ประหยัดค่าน้ำมันต่อเดือน',
        vsDiesel: 'เทียบกับปั๊มดีเซล',
        saveFuelPrefix: 'ลดการใช้',
        saveFuelSuffix: 'L ดีเซล / เดือน',
      },
      advisor: {
        eyebrow: 'เครื่องยนต์วิเคราะห์แบบ Zero-API',
        title: 'ที่ปรึกษาเกษตรอัจฉริยะ SOLVARA AI',
        liveBriefPrefix: 'สรุปสด',
        quickPromptsTitle: 'คำถามด่วนสำหรับนักปฐพีวิทยา',
        analyzingPrefix: 'กำลังวิเคราะห์ข้อมูลดาวเทียม NASA สำหรับ',
        prompts: {
          schedule: 'ตารางชลประทานที่ดีที่สุดวันนี้คือช่วงใด?',
          peatland: 'แผนลดความเครียดระบบนิเวศและไฟป่า?',
          roi: 'เปรียบเทียบความคุ้มค่าปั๊มดีเซลกับโซลาร์?',
        },
      },
    },
    tab2: {
      bannerTitle: 'ระบบควบคุมปั๊มโซลาร์ VFD อัตโนมัติออนไลน์',
      bannerSubtitle: 'การปรับคลื่น MPPT + Variable Frequency Drive แบบวงปิดซิงค์กับ NASA POWER',
      telemetryOk: 'ข้อมูลปกติ',
      kpis: {
        solarOutput: 'กำลังผลิตแผง PV',
        solarSub: 'ติดตามจุด MPPT 98.6%',
        pumpCapacity: 'อัตราการไหลของปั๊ม',
        pumpSub: 'ปรับรอบ VFD อัตโนมัติ',
        waterReserve: 'น้ำสำรองถังพัก',
        waterSub: 'อ่างเก็บน้ำ 20,000 L',
        rain3Day: 'ฝนเฉลี่ย 3 วัน',
        rainLatestPrefix: 'ล่าสุด:',
        rainOptimalSolar: 'แสงแดดเหมาะสม',
        rainActiveRecharge: 'เติมน้ำธรรมชาติ',
        yieldSaved: 'ผลผลิตที่ปกป้องได้',
        yieldSub: 'ป้องกันพืชเหี่ยวเฉา',
      },
      heatmap: {
        title: 'เมทริกซ์ความชื้น 140 แปลงและคลื่นให้น้ำฉุกเฉิน',
        subtitle: 'จำลองการให้น้ำหยดพลังงานแสงอาทิตย์แบบรัศมีทั่วแปลงที่ขาดน้ำ',
        scaleLabel: 'สเกล:',
        reRunBtn: 'เริ่มให้น้ำโซลาร์ฉุกเฉิน',
        pumpingActive: 'กำลังปล่อยคลื่นความชื้น',
        resetDemoBtn: 'รีเซ็ตความเครียดแปลง',
        plotPrefix: 'แปลง #',
        legend: {
          severe: 'รุนแรง',
          high: 'เครียดสูง',
          moderate: 'ปานกลาง',
          low: 'เครียดต่ำ',
          hydrated: 'ชุ่มชื้นแล้ว',
        },
        cellLabels: {
          hydrated: 'ชุ่มชื้น (เหมาะสม)',
          severe: 'เครียดรุนแรง (<15%)',
          high: 'เครียดสูง (15-25%)',
          moderate: 'เครียดปานกลาง (25-40%)',
          low: 'เครียดต่ำ (40-60%)',
        },
      },
      vfd: {
        affinityLawPrefix: 'กฎความคล้าย: P ∝ N³',
        title: 'ตัวปรับปรุงประสิทธิภาพ VFD',
        subtitle: 'ปรับรอบมอเตอร์ปั๊มหอยโข่งตามความชื้นเขตรากแบบเรียลไทม์',
        sourcePlotArray: 'เมทริกซ์แปลง',
        autoSyncOn: 'ซิงค์อัตโนมัติ เปิด',
        autoSyncOff: 'ซิงค์อัตโนมัติ ปิด',
        liveRootMoisturePrefix: 'ความชื้นรากสุทธิ',
        criticalWord: 'วิกฤต',
        hydratedWord: 'ชุ่มชื้น',
        zoneTelemetryPrefix: 'ข้อมูลโซน',
        meanArrayPrefix: 'ค่าเฉลี่ยเมทริกซ์:',
        suggestedAdjustment: 'ค่าปรับที่แนะนำ',
        optimalSynced: 'ซิงค์เหมาะสมแล้ว',
        rampDown: 'ลดความถี่',
        rampUp: 'เพิ่มความถี่',
        activeInverterSpeed: 'ความถี่อินเวอร์เตอร์ปัจจุบัน:',
        targetPrefix: 'เป้าหมาย:',
        recommendedTooltipPrefix: 'เป้าหมายเหมาะสม:',
        manualSliderLabel: 'ปรับความถี่ด้วยตนเอง (20 - 50 Hz)',
        nominalRpmSuffix: 'RPM มาตรฐาน',
        syncedBtn: 'อินเวอร์เตอร์ซิงค์แล้ว',
        applyBtnPrefix: 'ใช้งาน',
        kpiSuggestedSpeed: 'ความเร็ว VFD เป้าหมาย',
        kpiAdjustedFlow: 'อัตราการไหลที่ปรับแล้ว',
        kpiVsActivePrefix: 'เทียบกับ',
        kpiVsActiveSuffix: 'ที่ทำงานอยู่',
        kpiInverterLoad: 'โหลดอินเวอร์เตอร์',
        kpiVsCurrentSuffix: 'kW ที่ประหยัดได้',
        kpiBaseline50Hz: 'ฐานเต็มพิกัด 50 Hz',
        kpiEnergySaved: 'พลังงานที่ประหยัดได้',
        kpiToBatterySuffix: 'kWh/day ที่ประหยัดได้',
      },
      allocation: {
        title: 'การจัดสรรพลังงานโซลาร์',
        subtitle: 'แบ่งจ่ายพลังงาน PV แบบเรียลไทม์ไปยังเขตความสำคัญสูงสุด',
      },
      forecast: {
        title: 'ปริมาณน้ำสูบ · พยากรณ์แสงอาทิตย์ 24 ชม.',
        subtitlePrefix: 'ช่วงเวลาสูบน้ำสูงสุด',
        subtitleMiddle: '10:00 - 14:30',
        subtitleSuffix: 'สอดคล้องกับความเข้มแสงสูงสุด',
        estTotal: 'ประมาณ 114,500 L/day',
        peakLabel: '12 น. (สูงสุด)',
      },
    },
    tab3: {
      rankBadge: 'พื้นที่เกษตรโซลาร์อันดับ #1',
      siteCodePrefix: 'รหัสพื้นที่:',
      siteTitleSuffix: 'รายงานความเป็นไปได้เกษตรโซลาร์เซลล์',
      siteSubtitlePrefix: 'ข้อมูลอัจฉริยะเชิงพื้นที่หลายเกณฑ์อ้างอิงจากดาวเทียม NASA POWER สด ณ',
      suitabilityScore: 'คะแนนความเหมาะสม',
      tierGrade: 'ระดับ Tier-A Prime',
      confidencePrefix: 'ความเชื่อมั่น',
      metrics: [
        { label: 'กำลังติดตั้ง PV', val: '120 kWp', sub: 'Bifacial ยกสูง' },
        { label: 'ผลผลิตต่อปี', val: '198 MWh', sub: 'PR 81.4%' },
        { label: 'กำลังสูบน้ำ', val: '145 m³/day', sub: 'แรงส่ง 18m TDH' },
        { label: 'งบลงทุนประมาณ', val: '108K USD', sub: 'ครบชุด + VFD' },
        { label: 'ระยะคืนทุน', val: '3.4 ปี', sub: 'ทดแทนดีเซล' },
        { label: 'ลดคาร์บอน', val: '142 t/yr', sub: 'รับรอง Tier-1' },
        { label: 'ร่มเงาพืชผล', val: '+18%', sub: 'ปรับสภาพภูมิอากาศจุลภาค' },
      ],
      reasoningTitle: 'การวิเคราะห์เชิงพื้นที่และปฐพีวิทยา AI',
      confidenceBadgePrefix: 'ความเชื่อมั่นโมเดล',
      reasons: [
        {
          title: 'การยืนยันทรัพยากรแสงอาทิตย์:',
          bodyBefore: 'รังสีคลื่นสั้นผิวดินจาก NASA POWER เฉลี่ย',
          bodyAfter: 'ให้ค่า Capacity Factor สูงสำหรับการสูบน้ำ VFD ช่วงกลางวันโดยไม่ต้องใช้แบตเตอรี่ขนาดใหญ่',
        },
        {
          title: 'การลดภาวะขาดน้ำเขตราก:',
          body: 'โครงสร้างแผงเกษตรโซลาร์สูง 3.2 ม. ช่วยลดการระเหยของน้ำจากผิวดินลง 18–24% ในช่วงแดดจัดกลางวัน',
        },
        {
          title: 'เศรษฐศาสตร์ชลประทานปลอดดีเซล:',
          body: 'การขับปั๊ม VFD ด้วยไฟฟ้ากระแสตรงโดยตรงช่วยตัดต้นทุนขนส่งน้ำมันและสร้างเสถียรภาพรายได้เกษตรกรรายย่อย',
        },
      ],
      riskTitle: 'บันทึกการลดความเสี่ยงพื้นที่',
      riskBodyBefore: 'เมฆตามฤดูกาลหรือคลื่นความร้อนจัดอาจเปลี่ยนช่วงการทำงานสูงสุด ควรผสาน',
      riskBodyHighlight: 'ถังเก็บน้ำแรงโน้มถ่วง 20,000 L',
      riskBodyAfter: 'เข้ากับระบบเตือนภัยแล้ง WhatsApp อัตโนมัติเพื่อรองรับช่วงเมฆครึ้มหลายวัน',
      weightsTitle: 'น้ำหนักเกณฑ์ MCDA',
      weightsSubtitle: 'กรอบการให้คะแนนเชิงพื้นที่แบบถ่วงน้ำหนักเพื่อจัดอันดับพื้นที่',
      weights: [
        'ความเข้มรังสีแสงอาทิตย์ (NASA POWER)',
        'ความเร่งด่วนภาวะขาดน้ำดิน',
        'ความใกล้แหล่งน้ำบาดาล / คลองส่งน้ำ',
        'ความเกื้อกูลร่มเงาต่อพืชผล',
        'ผลตอบแทนทดแทนกริดและดีเซล ROI',
      ],
      solarProfileTitle: 'กราฟการผลิตไฟฟ้าโซลาร์ 24 ชม.',
      solarProfileSubtitle: 'โปรไฟล์กำลังผลิตแผง PV รายชั่วโมง',
      solarMaxBadge: 'สูงสุด 98.4 kW',
      solarPeakZen: '12:15 (จุดยอด)',
      irradianceMonthlyTitle: 'โปรไฟล์ความเข้มแสง 12 เดือน',
      irradianceMonthlySubtitle: 'การกระจายค่าเฉลี่ยตามฤดูกาลในหน่วย kWh/m²/day',
      irradianceAvgBadge: 'เฉลี่ย 6.08 kWh/m²',
      months: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
    },
    footer: {
      brandLine: 'SOLVARA เกษตรโซลาร์เซลล์ระดับโลก • ชุดข้อมูล NASA POWER & SMAP',
      resolution: 'กริด NASA POWER 0.5° × 0.625°',
      iec: 'มาตรฐานประสิทธิภาพ PV IEC 61724',
      vfdProtocol: 'การควบคุมความคล้าย VFD Modbus',
    },
    toast: {
      title: 'ส่งคำเตือนล่วงหน้าถึงเกษตรกรแล้ว',
      bodyPrefix: 'ส่งการแจ้งเตือน WhatsApp/SMS ไปยังเกษตรกรใน',
      bodyMiddle: 'สำหรับ',
    },
    whatsappPreview: {
      botName: 'SOLVARA Sat-Alert Bot',
      onlineStatus: 'Online',
      previewTag: 'ตัวอย่างมือถือเกษตรกร',
      todayLabel: 'วันนี้',
      copyBtn: 'คัดลอกข้อความ',
      copiedBtn: 'คัดลอกแล้ว!',
      closeBtn: 'ปิด',
    },
    intro: {
      startButton: 'Launch System',
      logoAria: 'เข้าสู่แพลตฟอร์ม SOLVARA',
    },
  },
  sv: {
    header: {
      subtitle: 'Global plattform för agrivoltaik & satellitstyrd solbevattning',
      langSwitcherLabel: 'Språkväljare',
      langSearchPlaceholder: 'Sök språk...',
      langFullLabel: 'Fullt gränssnitt',
      langFallbackNote: 'Lokala varningar + EN-gränssnitt',
      langNoMatch: 'Inget matchande språk',
      tabs: {
        macro: 'Torka & Pumpkarta',
        ops: 'Precisionsbevattning',
        feasibility: 'Platsintelligens',
      },
      mobileTabs: {
        macro: 'Torkkarta',
        ops: 'Drift',
        feasibility: 'Platsdata',
      },
      telemetry: {
        syncing: 'Synkar NASA POWER...',
        live: 'NASA POWER Live',
        ready: 'NASA POWER Redo',
        sourceLive: 'Live NASA POWER API',
        sourceFallback: 'Kalibrerad NASA POWER-reserv',
        solarDate: 'Sol',
        moistureDate: 'Fukt',
      },
      themeTooltip: {
        toLight: 'Byt till ljust läge',
        toDark: 'Byt till mörkt läge',
      },
    },
    tab1: {
      title: 'Global torkstress & övervakning av solpumpar',
      subtitle: 'Direkt NASA POWER-satellittelemetri, verklig distriktsidentifiering och automatisk VFD-pumpstyrning',
      mobileFilterBtn: 'Filter & Teckenförklaring',
      zonesWord: 'Zoner',
      filteredBadge: 'Filtrerad',
      filtersTitle: 'Telemetrifilter',
      resetFilters: 'Återställ',
      targetRegionLabel: 'Delregion',
      allRegionsOption: 'Alla regioner',
      stapleCropLabel: 'Gröda / Råvara',
      allCropsOption: 'Alla grödor',
      severityLabel: 'Torkans svårighetsgrad',
      severities: {
        All: 'Alla',
        Severe: 'Allvarlig',
        Moderate: 'Måttlig',
        Mild: 'Mild',
      },
      crops: {
        ...SHARED_CROPS_EN,
        Maize: 'Majs',
        Wheat: 'Vete',
        Tomatoes: 'Tomater',
        Olives: 'Oliver',
        Almonds: 'Mandel',
        Pistachios: 'Pistasch',
        Soybeans: 'Sojabönor',
        Cotton: 'Bomull',
        Citrus: 'Citrus',
        'Date Palms': 'Dadelpalmer',
        Grapes: 'Druvor',
        Rice: 'Ris',
        Horticulture: 'Trädgårdsodling',
        'Chili & Leafy Greens': 'Chili & Bladgrönt',
      },
      mapLegendTitle: 'Teckenförklaring',
      legendSevere: 'Svår stress (< 20%)',
      legendModerate: 'Måttlig stress (20-29%)',
      legendMild: 'Mild / Optimal (>= 30%)',
      legendPump: 'Solpumpstation',
      globalExplorer: {
        title: 'Global satellitkoordinat- & stadsutforskare',
        subtitle: 'Välj ett NASA-partnermått eller ange valfri stad / GPS-koordinat globalt för NASA POWER-data och verkliga distriktsnamn',
        cityPlaceholder: 'Sök valfri stad i världen (t.ex. Stockholm, Uppsala, Seville, Nairobi)...',
        latLabel: 'LAT',
        lonLabel: 'LON',
        fetchBtn: 'Hämta NASA-satellitdata',
        fetchingBtn: 'Synkar satellit...',
        presetsLabel: 'Referenspunkter:',
        syncLangBtn: 'Synka språk till region',
        liveSourceBadge: 'LIVE NASA POWER API',
        fallbackSourceBadge: 'LATITUDKALIBRERAD RESERV',
        districtsPrefix: 'Distrikt',
        geocodeError: 'Staden hittades inte. Prova en större närliggande stad eller ange latitud/longitud direkt.',
        invalidCoordsError: 'Ange giltiga koordinater (Latitud -90 till 90, Longitud -180 till 180).',
        langNames: {
          en: 'English',
          id: 'Bahasa Indonesia',
          ar: 'العربية',
          pt: 'Português',
          es: 'Español',
          hi: 'हिन्दी',
          fr: 'Français',
          ja: '日本語',
          ko: '한국어',
          it: 'Italiano',
          th: 'ไทย',
          sv: 'Svenska',
          no: 'Norsk',
          nl: 'Nederlands',
          de: 'Deutsch',
        },
      },
      simulator: {
        title: 'What-If-simulator för extremväder',
        simActive: 'Simulering aktiv',
        liveBaseline: 'Live NASA-baslinje',
        resetBtn: 'Återställ till live NASA-data',
        rainfallLabel: 'Simulerad daglig nederbörd',
        solarLabel: 'Simulerad solinstrålning',
        extremeDry: '0 mm (Extrem torka)',
      },
      map: {
        resolutionLabel: 'Upplösning:',
        resolutionValue: 'NASA SMAP / POWER 0.5°',
        pumpCapPrefix: 'Kap:',
        pumpStatuses: {
          Active: 'Aktiv',
          Standby: 'Vänteläge',
          Optimizing: 'Optimerar',
        },
        interactiveHint: 'Klicka på valfri zonmarkör för telemetri & soldimensionering',
        showAllPrefix: 'Visa alla',
      },
      districtsStrip: {
        title: 'Distriktstelemetri',
      },
      priorityBanner: {
        title: 'AI-prioritering för solpumpsdrift',
        pumpSitePrefix: 'Prioriterad plats:',
        criticalMoistureText: 'kritisk markfuktighet',
        recordsText: 'visar',
        macroWetnessText: 'regional markfuktighet',
      },
      telemetryPanel: {
        title: 'Zontelemetri',
        droughtSuffix: 'Torka',
        plantationSuffix: 'Skifte',
        smapMoisture: 'Markfuktighet (GWETTOP)',
        criticalDry: 'Kritiskt torrt',
        moderate: 'Måttlig',
        humidOptimal: 'Optimal',
        volumetricDepth: 'Ytlig rotzon',
        sevenDayTrend: '7-dagars fukttrend',
        deficit: 'underskott',
        gain: 'ökning',
        nasaRadiance: 'Solstrålning',
        strong: 'Hög avkastning',
        moderateSolar: 'Måttlig',
        solarPumpYield: 'Solpumpskapacitet',
        capacityUnit: 'Steg',
        surfaceTempLabel: 'Lufttemperatur vid ytan (T2M)',
      },
      peatland: {
        eyebrow: 'Tidig varning för ekosystem',
        moisturePrefix: 'Markfuktighet',
        sendWarningBtn: 'Skicka tidig WhatsApp/SMS-varning till lantbrukare',
        confirmedTitle: 'Varning skickad',
        confirmedBodyPrefix: 'WhatsApp/SMS-varning köad för lantbrukare i',
      },
      solarSizing: {
        eyebrow: 'Smart PV-teknik',
        title: 'Dimensionering av solpump & bränslebesparing',
        arraySizeLabel: 'Rekommenderad solcellsyta',
        panelUnit: '550Wp-paneler',
        dailyWaterLabel: 'Beräknat dagligt vattenflöde',
        dailyWaterUnit: 'L/day',
        dailyEnergyUnit: 'kWh/day',
        monthlySavingsLabel: 'Månatlig bränslebesparing',
        vsDiesel: 'jämfört med dieselpump',
        saveFuelPrefix: 'Ersätter',
        saveFuelSuffix: 'L diesel / månad',
      },
      advisor: {
        eyebrow: 'Zero-API Telemetrimotor',
        title: 'SOLVARA AI Agronområdgivare',
        liveBriefPrefix: 'LIVE-RAPPORT',
        quickPromptsTitle: 'Snabbfrågor för agronom',
        analyzingPrefix: 'Analyserar NASA-telemetri för',
        prompts: {
          schedule: 'Bästa bevattningsschema idag?',
          peatland: 'Stress & åtgärdsplan för ekosystemet?',
          roi: 'ROI för diesel vs solpump?',
        },
      },
    },
    tab2: {
      bannerTitle: 'AUTONOM SOLDRIVEN VFD-PUMPSTYRNING ONLINE',
      bannerSubtitle: 'Sluten MPPT + frekvensomriktare synkroniserad med NASA POWER',
      telemetryOk: 'TELEMETRI NORMAL',
      kpis: {
        solarOutput: 'PV-uteffekt',
        solarSub: 'MPPT-följning 98,6%',
        pumpCapacity: 'Pumpflöde',
        pumpSub: 'Variabelt varvtal VFD',
        waterReserve: 'Bufferttankreserv',
        waterSub: '20 000 L reservoar',
        rain3Day: '3-dagars regnsnitt',
        rainLatestPrefix: 'Senaste:',
        rainOptimalSolar: 'Optimalt solljus',
        rainActiveRecharge: 'Aktiv påfyllning',
        yieldSaved: 'Skyddad skörd',
        yieldSub: 'Förhindrar vissningsskador',
      },
      heatmap: {
        title: '140-skiftes fuktmatris & akut bevattningsvåg',
        subtitle: 'Simulera radiell soldriven droppbevattning över torrstressade skiften',
        scaleLabel: 'SKALA:',
        reRunBtn: 'Kör akut solbevattning',
        pumpingActive: 'Bevattningsvåg aktiv',
        resetDemoBtn: 'Återställ fältstress',
        plotPrefix: 'Skifte #',
        legend: {
          severe: 'Svår',
          high: 'Hög stress',
          moderate: 'Måttlig',
          low: 'Låg stress',
          hydrated: 'Bevattnad',
        },
        cellLabels: {
          hydrated: 'Bevattnad (Optimal)',
          severe: 'Svår stress (<15%)',
          high: 'Hög stress (15-25%)',
          moderate: 'Måttlig stress (25-40%)',
          low: 'Låg stress (40-60%)',
        },
      },
      vfd: {
        affinityLawPrefix: 'Affinitetslag: P ∝ N³',
        title: 'VFD-effektivitetsoptimerare',
        subtitle: 'Modulera pumpens varvtal dynamiskt baserat på fuktighet i rotzonen',
        sourcePlotArray: 'Fältmatris',
        autoSyncOn: 'Autosynk PÅ',
        autoSyncOff: 'Autosynk AV',
        liveRootMoisturePrefix: 'Effektiv rotfuktighet',
        criticalWord: 'kritisk',
        hydratedWord: 'bevattnad',
        zoneTelemetryPrefix: 'Zontelemetri',
        meanArrayPrefix: 'Matrissnitt:',
        suggestedAdjustment: 'Föreslaget delta',
        optimalSynced: 'Optimalt synkad',
        rampDown: 'Varva ner',
        rampUp: 'Varva upp',
        activeInverterSpeed: 'Aktiv omriktarfrekvens:',
        targetPrefix: 'Mål:',
        recommendedTooltipPrefix: 'Optimalt mål:',
        manualSliderLabel: 'Manuell frekvensstyrning (20 - 50 Hz)',
        nominalRpmSuffix: 'Nominellt RPM',
        syncedBtn: 'Omriktare synkad',
        applyBtnPrefix: 'Tillämpa',
        kpiSuggestedSpeed: 'Målfrekvens VFD',
        kpiAdjustedFlow: 'Justerat flöde',
        kpiVsActivePrefix: 'mot',
        kpiVsActiveSuffix: 'aktiv',
        kpiInverterLoad: 'Omriktarlast',
        kpiVsCurrentSuffix: 'kW sparat',
        kpiBaseline50Hz: 'Full 50 Hz baslinje',
        kpiEnergySaved: 'Sparad energi',
        kpiToBatterySuffix: 'kWh/day sparat',
      },
      allocation: {
        title: 'Fördelning av solenergi',
        subtitle: 'Realtidsfördelning av PV-effekt mellan prioriterade distriktszoner',
      },
      forecast: {
        title: 'Vattenproduktion · 24H solprognos',
        subtitlePrefix: 'Toppfönster för pumpning',
        subtitleMiddle: '10:00 - 14:30',
        subtitleSuffix: 'anpassat till maximal instrålning',
        estTotal: 'Uppsk. 114 500 L/day',
        peakLabel: '12h (Topp)',
      },
    },
    tab3: {
      rankBadge: 'RANK #1 AGRIVOLTAIK-PLATS',
      siteCodePrefix: 'PLATSKOD:',
      siteTitleSuffix: 'Förstudie för agrivoltaik',
      siteSubtitlePrefix: 'Flerkriterieanalys förankrad i live NASA POWER-telemetri vid',
      suitabilityScore: 'Lämplighetspoäng',
      tierGrade: 'Tier-A Prime',
      confidencePrefix: 'Tillförlitlighet',
      metrics: [
        { label: 'PV-kapacitet', val: '120 kWp', sub: 'Upphöjd bifacial' },
        { label: 'Årsavkastning', val: '198 MWh', sub: 'PR 81.4%' },
        { label: 'Vattenlyft', val: '145 m³/day', sub: '18m TDH lyfthöjd' },
        { label: 'Investering', val: '108K USD', sub: 'Nyckelfärdig + VFD' },
        { label: 'Återbetalning', val: '3,4 år', sub: 'Ersatt diesel' },
        { label: 'CO₂-besparing', val: '142 t/yr', sub: 'Verifierad Tier-1' },
        { label: 'Grödskugga', val: '+18%', sub: 'Mikroklimatvinst' },
      ],
      reasoningTitle: 'AI-baserad rumslig & agronomisk analys',
      confidenceBadgePrefix: 'Modelltillförlitlighet',
      reasons: [
        {
          title: 'Verifiering av solresurs:',
          bodyBefore: 'NASA POWER ytlig kortvågsstrålning ligger i snitt på',
          bodyAfter: 'vilket ger hög kapacitetsfaktor för VFD-pumpning dagtid utan tunga battericykler.',
        },
        {
          title: 'Minskning av rotzonsunderskott:',
          body: 'Upphöjda 3,2 m agrivoltaiska stativ minskar avdunstningen i matjorden med 18–24% under mittdagens värmetoppar.',
        },
        {
          title: 'Dieselfri hydraulekonomi:',
          body: 'Direkt DC-kopplad VFD-pumpning eliminerar bränsletransporter och stabiliserar lönsamheten för lokala odlare.',
        },
      ],
      riskTitle: 'Notering om riskreducering',
      riskBodyBefore: 'Säsongsbetonat molntäcke eller värmeböljor kan förskjuta pumptoppar. Kombinera',
      riskBodyHighlight: '20 000 L gravitationsbuffert',
      riskBodyAfter: 'med automatiska WhatsApp-varningar vid torka över flera molniga dagar.',
      weightsTitle: 'MCDA-kriterievikter',
      weightsSubtitle: 'Viktat rumsligt poängramverk för platsrankning',
      weights: [
        'Solinstrålning (NASA POWER)',
        'Brådskande markfuktsunderskott',
        'Närhet till akvifer / kanal',
        'Skuggsynergi för grödor',
        'ROI för nät- & dieselersättning',
      ],
      solarProfileTitle: '24H solproduktionskurva',
      solarProfileSubtitle: 'Timvis uteffekt från PV-anläggningen',
      solarMaxBadge: 'Topp 98.4 kW',
      solarPeakZen: '12:15 (Zenit)',
      irradianceMonthlyTitle: '12-månaders instrålningsprofil',
      irradianceMonthlySubtitle: 'Historisk säsongs fördelning i kWh/m²/day',
      irradianceAvgBadge: 'Snitt 6.08 kWh/m²',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
    },
    footer: {
      brandLine: 'SOLVARA Planetär Agrivoltaik • NASA POWER & SMAP Telemetrisvit',
      resolution: '0.5° × 0.625° NASA POWER Rutnät',
      iec: 'IEC 61724 PV-prestanda',
      vfdProtocol: 'Modbus VFD Affinitetsstyrning',
    },
    toast: {
      title: 'Tidig varning skickad till lantbrukare',
      bodyPrefix: 'WhatsApp/SMS-varning skickad till odlare i',
      bodyMiddle: 'för',
    },
    whatsappPreview: {
      botName: 'SOLVARA Sat-Alert Bot',
      onlineStatus: 'Online',
      previewTag: 'Mobil förhandsvisning',
      todayLabel: 'IDAG',
      copyBtn: 'Kopiera meddelande',
      copiedBtn: 'Kopierat!',
      closeBtn: 'Stäng',
    },
    intro: {
      startButton: 'Launch System',
      logoAria: 'Öppna SOLVARA-plattformen',
    },
  },
  no: {
    header: {
      subtitle: 'Global plattform for agrivoltaikk og satellittstyrt solvanningsdrift',
      langSwitcherLabel: 'Språkvelger',
      langSearchPlaceholder: 'Søk språk...',
      langFullLabel: 'Fullt grensesnitt',
      langFallbackNote: 'Lokale varsler + EN-grensesnitt',
      langNoMatch: 'Ingen samsvarende språk',
      tabs: {
        macro: 'Tørke- & Pumpekart',
        ops: 'Presisjonsvanning',
        feasibility: 'Stedsintelligens',
      },
      mobileTabs: {
        macro: 'Tørkekart',
        ops: 'Drift',
        feasibility: 'Stedsdata',
      },
      telemetry: {
        syncing: 'Synkroniserer NASA POWER...',
        live: 'NASA POWER Live',
        ready: 'NASA POWER Klar',
        sourceLive: 'Live NASA POWER API',
        sourceFallback: 'Kalibrert NASA POWER-reserve',
        solarDate: 'Sol',
        moistureDate: 'Fuktighet',
      },
      themeTooltip: {
        toLight: 'Bytt til lys modus',
        toDark: 'Bytt til mørk modus',
      },
    },
    tab1: {
      title: 'Global tørkestress og overvåking av solpumper',
      subtitle: 'Direkte NASA POWER-satellittelemetri, ekte distriktsgjenkjenning og automatisk VFD-pumpestyring',
      mobileFilterBtn: 'Filtre & Tegnforklaring',
      zonesWord: 'Soner',
      filteredBadge: 'Filtrert',
      filtersTitle: 'Telemetrifiltre',
      resetFilters: 'Tilbakestill',
      targetRegionLabel: 'Underregion',
      allRegionsOption: 'Alle regioner',
      stapleCropLabel: 'Avling / Vare',
      allCropsOption: 'Alle avlinger',
      severityLabel: 'Tørkegrad',
      severities: {
        All: 'Alle',
        Severe: 'Alvorlig',
        Moderate: 'Moderat',
        Mild: 'Mild',
      },
      crops: {
        ...SHARED_CROPS_EN,
        Maize: 'Mais',
        Wheat: 'Hvete',
        Tomatoes: 'Tomater',
        Olives: 'Oliven',
        Almonds: 'Mandler',
        Pistachios: 'Pistasj',
        Soybeans: 'Soyabønner',
        Cotton: 'Bomull',
        Citrus: 'Sitrus',
        'Date Palms': 'Daddelpalmer',
        Grapes: 'Druer',
        Rice: 'Ris',
        Horticulture: 'Hagebruk',
        'Chili & Leafy Greens': 'Chili og bladgrønt',
      },
      mapLegendTitle: 'Kartforklaring',
      legendSevere: 'Alvorlig stress (< 20%)',
      legendModerate: 'Moderat stress (20-29%)',
      legendMild: 'Mild / Optimal (>= 30%)',
      legendPump: 'Solpumpestasjon',
      globalExplorer: {
        title: 'Global satellittkoordinat- og byutforsker',
        subtitle: 'Velg en NASA-partnerreferanse eller oppgi valgfri by / GPS-koordinater for direkte NASA POWER-data og ekte distriktsnavn',
        cityPlaceholder: 'Søk etter valgfri by i verden (f.eks. Oslo, Bergen, Seville, Nairobi)...',
        latLabel: 'LAT',
        lonLabel: 'LON',
        fetchBtn: 'Hent NASA-satellittdata',
        fetchingBtn: 'Synkroniserer satellitt...',
        presetsLabel: 'Referanser:',
        syncLangBtn: 'Synk språk til region',
        liveSourceBadge: 'LIVE NASA POWER API',
        fallbackSourceBadge: 'BREDDEGRADKALIBRERT RESERVE',
        districtsPrefix: 'Distrikter',
        geocodeError: 'Fant ikke byen. Prøv en større by i nærheten eller oppgi breddegrad/lengdegrad direkte.',
        invalidCoordsError: 'Oppgi gyldige koordinater (Breddegrad -90 til 90, Lengdegrad -180 til 180).',
        langNames: {
          en: 'English',
          id: 'Bahasa Indonesia',
          ar: 'العربية',
          pt: 'Português',
          es: 'Español',
          hi: 'हिन्दी',
          fr: 'Français',
          ja: '日本語',
          ko: '한국어',
          it: 'Italiano',
          th: 'ไทย',
          sv: 'Svenska',
          no: 'Norsk',
          nl: 'Nederlands',
          de: 'Deutsch',
        },
      },
      simulator: {
        title: 'What-If-simulator for ekstremvær',
        simActive: 'Simulering aktiv',
        liveBaseline: 'Live NASA-grunnlinje',
        resetBtn: 'Tilbakestill til live NASA-data',
        rainfallLabel: 'Simulert daglig nedbør',
        solarLabel: 'Simulert solinnstråling',
        extremeDry: '0 mm (Ekstrem tørke)',
      },
      map: {
        resolutionLabel: 'Oppløsning:',
        resolutionValue: 'NASA SMAP / POWER 0.5°',
        pumpCapPrefix: 'Kap:',
        pumpStatuses: {
          Active: 'Aktiv',
          Standby: 'Standby',
          Optimizing: 'Optimerer',
        },
        interactiveHint: 'Klikk på en sonemarkør for telemetri og soldimensjonering',
        showAllPrefix: 'Vis alle',
      },
      districtsStrip: {
        title: 'Distriktstelemetri',
      },
      priorityBanner: {
        title: 'AI-prioritering for solpumpestyring',
        pumpSitePrefix: 'Prioritert sted:',
        criticalMoistureText: 'kritisk jordfuktighet',
        recordsText: 'viser',
        macroWetnessText: 'regional jordfuktighet',
      },
      telemetryPanel: {
        title: 'Sonetelemetri',
        droughtSuffix: 'Tørke',
        plantationSuffix: 'Teig',
        smapMoisture: 'Jordfuktighet (GWETTOP)',
        criticalDry: 'Kritisk tørt',
        moderate: 'Moderat',
        humidOptimal: 'Optimal',
        volumetricDepth: 'Øvre rotsone',
        sevenDayTrend: '7-dagers fuktighetstrend',
        deficit: 'underskudd',
        gain: 'økning',
        nasaRadiance: 'Solstråling',
        strong: 'Høyt utbytte',
        moderateSolar: 'Moderat',
        solarPumpYield: 'Solpumpekapasitet',
        capacityUnit: 'Trinn',
        surfaceTempLabel: 'Overflatelufttemp (T2M)',
      },
      peatland: {
        eyebrow: 'Tidlig varsling for økosystem',
        moisturePrefix: 'Jordfuktighet',
        sendWarningBtn: 'Send tidlig WhatsApp/SMS-varsel til bønder',
        confirmedTitle: 'Varsel sendt',
        confirmedBodyPrefix: 'WhatsApp/SMS-varsel lagt i kø for bønder i',
      },
      solarSizing: {
        eyebrow: 'Smart PV-prosjektering',
        title: 'Dimensjonering av solpumpe & drivstoffsparing',
        arraySizeLabel: 'Anbefalt solcelleanlegg',
        panelUnit: '550Wp-paneler',
        dailyWaterLabel: 'Estimert daglig vannmengde',
        dailyWaterUnit: 'L/day',
        dailyEnergyUnit: 'kWh/day',
        monthlySavingsLabel: 'Månedlig drivstoffsparing',
        vsDiesel: 'mot dieselpumpe',
        saveFuelPrefix: 'Erstatter',
        saveFuelSuffix: 'L diesel / måned',
      },
      advisor: {
        eyebrow: 'Zero-API Telemetrimotor',
        title: 'SOLVARA AI Agronområdgiver',
        liveBriefPrefix: 'LIVE-RAPPORT',
        quickPromptsTitle: 'Hurtigspørsmål for agronom',
        analyzingPrefix: 'Analyserer NASA-telemetri for',
        prompts: {
          schedule: 'Beste vanningsplan i dag?',
          peatland: 'Økosystemstress og tiltaksplan?',
          roi: 'ROI for diesel vs solpumpe?',
        },
      },
    },
    tab2: {
      bannerTitle: 'AUTONOM SOL-VFD PUMPESTYRING ONLINE',
      bannerSubtitle: 'Lukket MPPT + frekvensomformer synkronisert med NASA POWER',
      telemetryOk: 'TELEMETRI NORMAL',
      kpis: {
        solarOutput: 'PV-effekt',
        solarSub: 'MPPT-sporing 98,6%',
        pumpCapacity: 'Pumpekapasitet',
        pumpSub: 'Variabelt turtall VFD',
        waterReserve: 'Buffertankreserve',
        waterSub: '20 000 L reservoar',
        rain3Day: '3-dagers nedbørssnitt',
        rainLatestPrefix: 'Siste:',
        rainOptimalSolar: 'Optimalt sollys',
        rainActiveRecharge: 'Aktiv påfylling',
        yieldSaved: 'Beskyttet avling',
        yieldSub: 'Hindrer visneskader',
      },
      heatmap: {
        title: '140-teigers fuktighetsmatrise og nødbølge',
        subtitle: 'Simuler radiell soldrevet dryppvanning over stressede teiger',
        scaleLabel: 'SKALA:',
        reRunBtn: 'Kjør nødvanning med solkraft',
        pumpingActive: 'Vanningsbølge aktiv',
        resetDemoBtn: 'Tilbakestill feltstress',
        plotPrefix: 'Teig #',
        legend: {
          severe: 'Alvorlig',
          high: 'Høyt stress',
          moderate: 'Moderat',
          low: 'Lavt stress',
          hydrated: 'Vannet',
        },
        cellLabels: {
          hydrated: 'Vannet (Optimal)',
          severe: 'Alvorlig stress (<15%)',
          high: 'Høyt stress (15-25%)',
          moderate: 'Moderat stress (25-40%)',
          low: 'Lavt stress (40-60%)',
        },
      },
      vfd: {
        affinityLawPrefix: 'Affinitetslov: P ∝ N³',
        title: 'VFD-effektivitetsoptimerer',
        subtitle: 'Moduler sentrifugalpumpens turtall dynamisk etter rotsonefuktighet',
        sourcePlotArray: 'Feltmatrise',
        autoSyncOn: 'Autosynk PÅ',
        autoSyncOff: 'Autosynk AV',
        liveRootMoisturePrefix: 'Effektiv rotfuktighet',
        criticalWord: 'kritisk',
        hydratedWord: 'vannet',
        zoneTelemetryPrefix: 'Sonetelemetri',
        meanArrayPrefix: 'Matrisesnitt:',
        suggestedAdjustment: 'Foreslått delta',
        optimalSynced: 'Optimalt synkronisert',
        rampDown: 'Reduser turtall',
        rampUp: 'Øk turtall',
        activeInverterSpeed: 'Aktiv omformerfrekvens:',
        targetPrefix: 'Mål:',
        recommendedTooltipPrefix: 'Optimalt mål:',
        manualSliderLabel: 'Manuell frekvensstyring (20 - 50 Hz)',
        nominalRpmSuffix: 'Nominell RPM',
        syncedBtn: 'Omformer synkronisert',
        applyBtnPrefix: 'Bruk',
        kpiSuggestedSpeed: 'Målfrekvens VFD',
        kpiAdjustedFlow: 'Justert vannmengde',
        kpiVsActivePrefix: 'mot',
        kpiVsActiveSuffix: 'aktiv',
        kpiInverterLoad: 'Omformerlast',
        kpiVsCurrentSuffix: 'kW spart',
        kpiBaseline50Hz: 'Full 50 Hz grunnlinje',
        kpiEnergySaved: 'Spart energi',
        kpiToBatterySuffix: 'kWh/day spart',
      },
      allocation: {
        title: 'Fordeling av solkraft',
        subtitle: 'Sanntidsfordeling av PV-effekt på tvers av prioriterte distriktssoner',
      },
      forecast: {
        title: 'Vannproduksjon · 24T solprognose',
        subtitlePrefix: 'Toppvindu for pumping',
        subtitleMiddle: '10:00 - 14:30',
        subtitleSuffix: 'tilpasset maksimal solinnstråling',
        estTotal: 'Est. 114 500 L/day',
        peakLabel: '12t (Topp)',
      },
    },
    tab3: {
      rankBadge: 'RANG #1 AGRIVOLTAIKK-STED',
      siteCodePrefix: 'STEDSKODE:',
      siteTitleSuffix: 'Mulighetsstudie for agrivoltaikk',
      siteSubtitlePrefix: 'Flerkriterie romlig analyse forankret i live NASA POWER-telemetri ved',
      suitabilityScore: 'Egnethetsscore',
      tierGrade: 'Tier-A Prime',
      confidencePrefix: 'Konfidens',
      metrics: [
        { label: 'PV-kapasitet', val: '120 kWp', sub: 'Opphøyd bifacial' },
        { label: 'Årlig utbytte', val: '198 MWh', sub: 'PR 81.4%' },
        { label: 'Vannløft', val: '145 m³/day', sub: '18m TDH løftehøyde' },
        { label: 'Capex est.', val: '108K USD', sub: 'Nøkkelferdig + VFD' },
        { label: 'Tilbakebetaling', val: '3,4 år', sub: 'Erstatter diesel' },
        { label: 'CO₂-kutt', val: '142 t/yr', sub: 'Verifisert Tier-1' },
        { label: 'Avlingsskygge', val: '+18%', sub: 'Mikroklimafordel' },
      ],
      reasoningTitle: 'AI romlig og agronomisk vurdering',
      confidenceBadgePrefix: 'Modellkonfidens',
      reasons: [
        {
          title: 'Verifisering av solressurs:',
          bodyBefore: 'NASA POWER kortbølget overflatestråling har et snitt på',
          bodyAfter: 'som gir høy kapasitetsfaktor for VFD-pumping på dagtid uten tung batterisykling.',
        },
        {
          title: 'Demping av rotsoneunderskudd:',
          body: 'Opphøyde 3,2 m agrivoltaiske stativer reduserer fordampning fra matjorden med 18–24% under varmetopper midt på dagen.',
        },
        {
          title: 'Dieselfri hydraulisk økonomi:',
          body: 'Direkte DC-koblet VFD-pumping fjerner drivstofflogistikk og stabiliserer marginene for lokale bønder.',
        },
      ],
      riskTitle: 'Merknad om risikoreduksjon',
      riskBodyBefore: 'Sesongmessig skydekke eller hetebølger kan forskyve pumpetopper. Kombiner',
      riskBodyHighlight: '20 000 L gravitasjonslager',
      riskBodyAfter: 'med automatiske WhatsApp-tørkevarsler for å dekke flere overskyede dager.',
      weightsTitle: 'MCDA-kriterievekter',
      weightsSubtitle: 'Vektet romlig poengrammeverk for rangering av steder',
      weights: [
        'Solinnstråling (NASA POWER)',
        'Hastegrad på jordfuktighetsunderskudd',
        'Nærhet til akvifer / kanal',
        'Skyggesynergi for avlinger',
        'ROI for nett- og dieselerstatning',
      ],
      solarProfileTitle: '24T solproduksjonskurve',
      solarProfileSubtitle: 'Timesprofil for PV-anleggets effekt',
      solarMaxBadge: 'Topp 98.4 kW',
      solarPeakZen: '12:15 (Senit)',
      irradianceMonthlyTitle: '12-måneders innstrålingsprofil',
      irradianceMonthlySubtitle: 'Historisk sesongfordeling i kWh/m²/day',
      irradianceAvgBadge: 'Snitt 6.08 kWh/m²',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
    },
    footer: {
      brandLine: 'SOLVARA Planetær Agrivoltaikk • NASA POWER & SMAP Telemetripakke',
      resolution: '0.5° × 0.625° NASA POWER Rutenett',
      iec: 'IEC 61724 PV-ytelse',
      vfdProtocol: 'Modbus VFD Affinitetskontroll',
    },
    toast: {
      title: 'Tidlig varsel sendt til bønder',
      bodyPrefix: 'WhatsApp/SMS-varsel sendt til bønder i',
      bodyMiddle: 'for',
    },
    whatsappPreview: {
      botName: 'SOLVARA Sat-Alert Bot',
      onlineStatus: 'Online',
      previewTag: 'Mobil forhåndsvisning',
      todayLabel: 'I DAG',
      copyBtn: 'Kopier melding',
      copiedBtn: 'Kopiert!',
      closeBtn: 'Lukk',
    },
    intro: {
      startButton: 'Launch System',
      logoAria: 'Åpne SOLVARA-plattformen',
    },
  },
  nl: {
    header: {
      subtitle: 'Wereldwijd platform voor agrivoltaïek & satellietgestuurde zonne-irrigatie',
      langSwitcherLabel: 'Taalkiezer',
      langSearchPlaceholder: 'Zoek taal...',
      langFullLabel: 'Volledige UI',
      langFallbackNote: 'Lokale meldingen + EN-interface',
      langNoMatch: 'Geen overeenkomende taal',
      tabs: {
        macro: 'Droogte- & Pompenkaart',
        ops: 'Precisie-irrigatie',
        feasibility: 'Locatie-intelligentie',
      },
      mobileTabs: {
        macro: 'Droogtekaart',
        ops: 'Operaties',
        feasibility: 'Locatiedata',
      },
      telemetry: {
        syncing: 'NASA POWER synchroniseren...',
        live: 'NASA POWER Live',
        ready: 'NASA POWER Gereed',
        sourceLive: 'Live NASA POWER API',
        sourceFallback: 'Gekalibreerde NASA POWER-back-up',
        solarDate: 'Zon',
        moistureDate: 'Vocht',
      },
      themeTooltip: {
        toLight: 'Schakel naar lichte modus',
        toDark: 'Schakel naar donkere modus',
      },
    },
    tab1: {
      title: 'Wereldwijde droogtestress & zonnepompmonitoring',
      subtitle: 'Live NASA POWER-satelliettelemetrie, echte districtdetectie en geautomatiseerde VFD-pompaansturing',
      mobileFilterBtn: 'Filters & Legenda',
      zonesWord: 'Zones',
      filteredBadge: 'Gefilterd',
      filtersTitle: 'Telemetriefilters',
      resetFilters: 'Reset',
      targetRegionLabel: 'Doelsubregio',
      allRegionsOption: 'Alle regio’s',
      stapleCropLabel: 'Gewas / Product',
      allCropsOption: 'Alle gewassen',
      severityLabel: 'Ernst van droogte',
      severities: {
        All: 'Alle',
        Severe: 'Ernstig',
        Moderate: 'Matig',
        Mild: 'Mild',
      },
      crops: {
        ...SHARED_CROPS_EN,
        Maize: 'Maïs',
        Wheat: 'Tarwe',
        Tomatoes: 'Tomaten',
        Olives: 'Olijven',
        Almonds: 'Amandelen',
        Pistachios: 'Pistachenoten',
        Soybeans: 'Sojabonen',
        Cotton: 'Katoen',
        Citrus: 'Citrus',
        'Date Palms': 'Dadelpalmen',
        Grapes: 'Druiven',
        Rice: 'Rijst',
        Horticulture: 'Tuinbouw',
        'Chili & Leafy Greens': 'Chili & Bladgroenten',
      },
      mapLegendTitle: 'Kaartlegenda',
      legendSevere: 'Ernstige stress (< 20%)',
      legendModerate: 'Matige stress (20-29%)',
      legendMild: 'Mild / Optimaal (>= 30%)',
      legendPump: 'Zonnepompstation',
      globalExplorer: {
        title: 'Wereldwijde satellietcoördinaten- & stedenverkenner',
        subtitle: 'Selecteer een NASA-partnerbenchmark of voer een stad / GPS-coördinaten wereldwijd in voor live NASA POWER-data en echte districtnamen',
        cityPlaceholder: 'Zoek elke stad ter wereld (bijv. Amsterdam, Wageningen, Seville, Nairobi)...',
        latLabel: 'LAT',
        lonLabel: 'LON',
        fetchBtn: 'Haal NASA-satellietdata op',
        fetchingBtn: 'Satelliet synchroniseren...',
        presetsLabel: 'Benchmarks:',
        syncLangBtn: 'Synchroniseer taal met regio',
        liveSourceBadge: 'LIVE NASA POWER API',
        fallbackSourceBadge: 'BREEDTEGRAAD-GEKALIBREERD',
        districtsPrefix: 'Districten',
        geocodeError: 'Stad niet gevonden. Probeer een grotere nabijgelegen stad of voer direct breedte-/lengtegraad in.',
        invalidCoordsError: 'Voer geldige coördinaten in (Breedtegraad -90 tot 90, Lengtegraad -180 tot 180).',
        langNames: {
          en: 'English',
          id: 'Bahasa Indonesia',
          ar: 'العربية',
          pt: 'Português',
          es: 'Español',
          hi: 'हिन्दी',
          fr: 'Français',
          ja: '日本語',
          ko: '한국어',
          it: 'Italiano',
          th: 'ไทย',
          sv: 'Svenska',
          no: 'Norsk',
          nl: 'Nederlands',
          de: 'Deutsch',
        },
      },
      simulator: {
        title: 'What-If-simulator voor extreem weer',
        simActive: 'Simulatie actief',
        liveBaseline: 'Live NASA-basislijn',
        resetBtn: 'Herstel live NASA-data',
        rainfallLabel: 'Gesimuleerde dagelijkse neerslag',
        solarLabel: 'Gesimuleerde zonnestraling',
        extremeDry: '0 mm (Extreme droogte)',
      },
      map: {
        resolutionLabel: 'Resolutie:',
        resolutionValue: 'NASA SMAP / POWER 0.5°',
        pumpCapPrefix: 'Cap:',
        pumpStatuses: {
          Active: 'Actief',
          Standby: 'Stand-by',
          Optimizing: 'Optimaliseren',
        },
        interactiveHint: 'Klik op een zonemarkering voor telemetrie & zonnedimensionering',
        showAllPrefix: 'Toon alle',
      },
      districtsStrip: {
        title: 'Districtstelemetrie',
      },
      priorityBanner: {
        title: 'AI-prioriteit voor zonnepompaansturing',
        pumpSitePrefix: 'Prioriteitslocatie:',
        criticalMoistureText: 'kritisch bodemvocht',
        recordsText: 'toont',
        macroWetnessText: 'regionaal bodemvocht',
      },
      telemetryPanel: {
        title: 'Zonetelemetrie',
        droughtSuffix: 'Droogte',
        plantationSuffix: 'Perceel',
        smapMoisture: 'Bodemvocht (GWETTOP)',
        criticalDry: 'Kritisch droog',
        moderate: 'Matig',
        humidOptimal: 'Optimaal',
        volumetricDepth: 'Oppervlakte-wortelzone',
        sevenDayTrend: '7-daagse vochttrend',
        deficit: 'tekort',
        gain: 'stijging',
        nasaRadiance: 'Zonnestraling',
        strong: 'Hoge opbrengst',
        moderateSolar: 'Matig',
        solarPumpYield: 'Zonnepompcapaciteit',
        capacityUnit: 'Niveaus',
        surfaceTempLabel: 'Luchttemperatuur oppervlak (T2M)',
      },
      peatland: {
        eyebrow: 'Vroegtijdige ecosysteemwaarschuwing',
        moisturePrefix: 'Bodemvocht',
        sendWarningBtn: 'Stuur WhatsApp/SMS-waarschuwing naar boeren',
        confirmedTitle: 'Waarschuwing verzonden',
        confirmedBodyPrefix: 'WhatsApp/SMS-waarschuwing in wachtrij voor boeren in',
      },
      solarSizing: {
        eyebrow: 'Slimme PV-engineering',
        title: 'Zonnepompdimensionering & brandstofbesparing',
        arraySizeLabel: 'Aanbevolen zonnepaneelveld',
        panelUnit: '550Wp-panelen',
        dailyWaterLabel: 'Geschatte dagelijkse wateropbrengst',
        dailyWaterUnit: 'L/day',
        dailyEnergyUnit: 'kWh/day',
        monthlySavingsLabel: 'Maandelijkse brandstofbesparing',
        vsDiesel: 't.o.v. dieselpomp',
        saveFuelPrefix: 'Bespaart',
        saveFuelSuffix: 'L diesel / maand',
      },
      advisor: {
        eyebrow: 'Zero-API Telemetriemotor',
        title: 'SOLVARA AI Agronomisch Adviseur',
        liveBriefPrefix: 'LIVE-RAPPORT',
        quickPromptsTitle: 'Snelle agronoomvragen',
        analyzingPrefix: 'NASA-telemetrie analyseren voor',
        prompts: {
          schedule: 'Beste irrigatieschema vandaag?',
          peatland: 'Ecosysteemstress & mitigatieplan?',
          roi: 'ROI diesel- vs. zonnepomp?',
        },
      },
    },
    tab2: {
      bannerTitle: 'AUTONOME ZONNE-VFD POMPAANSTURING ONLINE',
      bannerSubtitle: 'Gesloten MPPT + frequentieregeling gesynchroniseerd met NASA POWER',
      telemetryOk: 'TELEMETRIE NORMAAL',
      kpis: {
        solarOutput: 'PV-vermogen',
        solarSub: 'MPPT-tracking 98,6%',
        pumpCapacity: 'Pompdebiet',
        pumpSub: 'Variabel toerental VFD',
        waterReserve: 'Buffertankreserve',
        waterSub: '20.000 L reservoir',
        rain3Day: '3-daags neerslaggemiddelde',
        rainLatestPrefix: 'Laatste:',
        rainOptimalSolar: 'Optimale zoninstraling',
        rainActiveRecharge: 'Actieve aanvulling',
        yieldSaved: 'Beschermde oogst',
        yieldSub: 'Voorkomt verwelkingsschade',
      },
      heatmap: {
        title: '140-percelen vochtmatrix & noodirrigatiegolf',
        subtitle: 'Simuleer radiale druppelirrigatie op zonne-energie over gestreste percelen',
        scaleLabel: 'SCHAAL:',
        reRunBtn: 'Start noodirrigatie op zonne-energie',
        pumpingActive: 'Hydratatiegolf actief',
        resetDemoBtn: 'Herstel veldstress',
        plotPrefix: 'Perceel #',
        legend: {
          severe: 'Ernstig',
          high: 'Hoge stress',
          moderate: 'Matig',
          low: 'Lage stress',
          hydrated: 'Gehydrateerd',
        },
        cellLabels: {
          hydrated: 'Gehydrateerd (Optimaal)',
          severe: 'Ernstige stress (<15%)',
          high: 'Hoge stress (15-25%)',
          moderate: 'Matige stress (25-40%)',
          low: 'Lage stress (40-60%)',
        },
      },
      vfd: {
        affinityLawPrefix: 'Affiniteitswet: P ∝ N³',
        title: 'VFD-efficiëntieoptimizer',
        subtitle: 'Moduleer het pomptoerental dynamisch op basis van live wortelzonevocht',
        sourcePlotArray: 'Veldmatrix',
        autoSyncOn: 'Autosync AAN',
        autoSyncOff: 'Autosync UIT',
        liveRootMoisturePrefix: 'Effectief wortelvocht',
        criticalWord: 'kritisch',
        hydratedWord: 'gehydrateerd',
        zoneTelemetryPrefix: 'Zonetelemetrie',
        meanArrayPrefix: 'Matrixgemiddelde:',
        suggestedAdjustment: 'Voorgestelde delta',
        optimalSynced: 'Optimaal gesynchroniseerd',
        rampDown: 'Aftoeren',
        rampUp: 'Optoeren',
        activeInverterSpeed: 'Actieve omvormersnelheid:',
        targetPrefix: 'Doel:',
        recommendedTooltipPrefix: 'Optimaal doel:',
        manualSliderLabel: 'Handmatige frequentie-override (20 - 50 Hz)',
        nominalRpmSuffix: 'Nominaal RPM',
        syncedBtn: 'Omvormer gesynchroniseerd',
        applyBtnPrefix: 'Toepassen',
        kpiSuggestedSpeed: 'Doelfrequentie VFD',
        kpiAdjustedFlow: 'Aangepast debiet',
        kpiVsActivePrefix: 't.o.v.',
        kpiVsActiveSuffix: 'actief',
        kpiInverterLoad: 'Omvormerbelasting',
        kpiVsCurrentSuffix: 'kW bespaard',
        kpiBaseline50Hz: 'Volle 50 Hz basislijn',
        kpiEnergySaved: 'Bespaarde energie',
        kpiToBatterySuffix: 'kWh/day bespaard',
      },
      allocation: {
        title: 'Zonne-energieverdeling',
        subtitle: 'Realtime PV-vermogensverdeling over prioritaire districtszones',
      },
      forecast: {
        title: 'Wateropbrengst · 24U zonneprognose',
        subtitlePrefix: 'Piekpompvenster',
        subtitleMiddle: '10:00 - 14:30',
        subtitleSuffix: 'afgestemd op maximale instraling',
        estTotal: 'Geschat 114.500 L/day',
        peakLabel: '12u (Piek)',
      },
    },
    tab3: {
      rankBadge: 'RANG #1 AGRIVOLTAÏEK-LOCATIE',
      siteCodePrefix: 'LOCATIECODE:',
      siteTitleSuffix: 'Haalbaarheidsdossier Agrivoltaïek',
      siteSubtitlePrefix: 'Multicriteria ruimtelijke analyse gekoppeld aan live NASA POWER-telemetrie bij',
      suitabilityScore: 'Geschiktheidsscore',
      tierGrade: 'Tier-A Prime',
      confidencePrefix: 'Betrouwbaarheid',
      metrics: [
        { label: 'PV-capaciteit', val: '120 kWp', sub: 'Verhoogd bifaciaal' },
        { label: 'Jaaropbrengst', val: '198 MWh', sub: 'PR 81.4%' },
        { label: 'Wateropvoer', val: '145 m³/day', sub: '18m TDH opvoerhoogte' },
        { label: 'Capex schatting', val: '108K USD', sub: 'Turnkey + VFD' },
        { label: 'Terugverdientijd', val: '3,4 jr', sub: 'Diesel bespaard' },
        { label: 'CO₂-reductie', val: '142 t/yr', sub: 'Geverifieerd Tier-1' },
        { label: 'Gewasschaduw', val: '+18%', sub: 'Microklimaatwinst' },
      ],
      reasoningTitle: 'AI ruimtelijke & agronomische onderbouwing',
      confidenceBadgePrefix: 'Modelbetrouwbaarheid',
      reasons: [
        {
          title: 'Verificatie van zonnebron:',
          bodyBefore: 'NASA POWER kortegolf-instraling op het oppervlak bedraagt gemiddeld',
          bodyAfter: 'wat zorgt voor een hoge capaciteitsfactor voor VFD-pompen overdag zonder zware batterijbelasting.',
        },
        {
          title: 'Beperking van wortelzonetekort:',
          body: 'Verhoogde 3,2 m agrivoltaïsche constructies verlagen de verdamping uit de bovenlaag met 18–24% tijdens hittetoppen rond het middaguur.',
        },
        {
          title: 'Dieselvrije hydraulische economie:',
          body: 'Direct DC-gekoppelde VFD-pompen elimineren brandstoftransport en stabiliseren de marges van lokale telers.',
        },
      ],
      riskTitle: 'Notitie risicobeperking locatie',
      riskBodyBefore: 'Seizoensbewolking of extreme hittepieken kunnen pompcycli verschuiven. Combineer',
      riskBodyHighlight: '20.000 L zwaartekrachtbuffer',
      riskBodyAfter: 'met geautomatiseerde WhatsApp-droogtemeldingen om meerdere bewolkte dagen te overbruggen.',
      weightsTitle: 'MCDA-criteriawegingen',
      weightsSubtitle: 'Gewogen ruimtelijk scorekader voor locatieranking',
      weights: [
        'Zonnestraling (NASA POWER)',
        'Urgentie bodemvochttekort',
        'Nabijheid aquifer / kanaal',
        'Schaduwsynergie voor gewassen',
        'ROI net- & dieselvervanging',
      ],
      solarProfileTitle: '24U zonne-opwekcurve',
      solarProfileSubtitle: 'Uurlijks PV-vermogensprofiel',
      solarMaxBadge: 'Piek 98.4 kW',
      solarPeakZen: '12:15 (Zenit)',
      irradianceMonthlyTitle: '12-maands instralingsprofiel',
      irradianceMonthlySubtitle: 'Historische seizoensverdeling in kWh/m²/day',
      irradianceAvgBadge: 'Gem. 6.08 kWh/m²',
      months: ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
    },
    footer: {
      brandLine: 'SOLVARA Planetaire Agrivoltaïek • NASA POWER & SMAP Telemetriesuite',
      resolution: '0.5° × 0.625° NASA POWER Raster',
      iec: 'IEC 61724 PV-prestaties',
      vfdProtocol: 'Modbus VFD Affiniteitsregeling',
    },
    toast: {
      title: 'Vroegtijdige waarschuwing verzonden',
      bodyPrefix: 'WhatsApp/SMS-waarschuwing verzonden naar boeren in',
      bodyMiddle: 'voor',
    },
    whatsappPreview: {
      botName: 'SOLVARA Sat-Alert Bot',
      onlineStatus: 'Online',
      previewTag: 'Mobiele voorvertoning',
      todayLabel: 'VANDAAG',
      copyBtn: 'Kopieer bericht',
      copiedBtn: 'Gekopieerd!',
      closeBtn: 'Sluiten',
    },
    intro: {
      startButton: 'Launch System',
      logoAria: 'Open SOLVARA-platform',
    },
  },
  de: {
    header: {
      subtitle: 'Globale Plattform für Agri-Photovoltaik & satellitengesteuerte Solarbewässerung',
      langSwitcherLabel: 'Sprachauswahl',
      langSearchPlaceholder: 'Sprache suchen...',
      langFullLabel: 'Vollständige UI',
      langFallbackNote: 'Lokale Warnungen + EN-Oberfläche',
      langNoMatch: 'Keine passende Sprache gefunden',
      tabs: {
        macro: 'Dürre- & Pumpenkarte',
        ops: 'Präzisionsbewässerung',
        feasibility: 'Standortanalyse',
      },
      mobileTabs: {
        macro: 'Dürrekarte',
        ops: 'Betrieb',
        feasibility: 'Standortdaten',
      },
      telemetry: {
        syncing: 'Synchronisiere NASA POWER...',
        live: 'NASA POWER Live',
        ready: 'NASA POWER Bereit',
        sourceLive: 'Live NASA POWER API',
        sourceFallback: 'Kalibrierte NASA POWER-Reserve',
        solarDate: 'Solar',
        moistureDate: 'Feuchte',
      },
      themeTooltip: {
        toLight: 'Zum hellen Modus wechseln',
        toDark: 'Zum dunklen Modus wechseln',
      },
    },
    tab1: {
      title: 'Globales Dürrestress- & Solarpumpen-Monitoring',
      subtitle: 'Live-Satellitentelemetrie von NASA POWER, echte Bezirkserkennung und automatisierte VFD-Pumpensteuerung',
      mobileFilterBtn: 'Filter & Legende',
      zonesWord: 'Zonen',
      filteredBadge: 'Gefiltert',
      filtersTitle: 'Telemetriefilter',
      resetFilters: 'Zurücksetzen',
      targetRegionLabel: 'Ziel-Teilregion',
      allRegionsOption: 'Alle Regionen',
      stapleCropLabel: 'Kulturpflanze',
      allCropsOption: 'Alle Kulturen',
      severityLabel: 'Dürre-Schweregrad',
      severities: {
        All: 'Alle',
        Severe: 'Schwer',
        Moderate: 'Mäßig',
        Mild: 'Leicht',
      },
      crops: {
        ...SHARED_CROPS_EN,
        Maize: 'Mais',
        Wheat: 'Weizen',
        Tomatoes: 'Tomaten',
        Olives: 'Oliven',
        Almonds: 'Mandeln',
        Pistachios: 'Pistazien',
        Soybeans: 'Sojabohnen',
        Cotton: 'Baumwolle',
        Citrus: 'Zitrusfrüchte',
        'Date Palms': 'Dattelpalmen',
        Grapes: 'Trauben',
        Rice: 'Reis',
        Horticulture: 'Gartenbau',
        'Chili & Leafy Greens': 'Chili & Blattgemüse',
      },
      mapLegendTitle: 'Kartenlegende',
      legendSevere: 'Starker Stress (< 20%)',
      legendModerate: 'Mäßiger Stress (20-29%)',
      legendMild: 'Leicht / Optimal (>= 30%)',
      legendPump: 'Solarpumpenstation',
      globalExplorer: {
        title: 'Globaler Satellitenkoordinaten- & Städte-Explorer',
        subtitle: 'Wählen Sie einen NASA-Partnerstandort oder geben Sie weltweit eine Stadt / GPS-Koordinaten für Live-NASA-POWER-Daten und echte Bezirksnamen ein',
        cityPlaceholder: 'Weltweit nach Stadt suchen (z. B. Berlin, München, Seville, Nairobi)...',
        latLabel: 'LAT',
        lonLabel: 'LON',
        fetchBtn: 'NASA-Satellitendaten abrufen',
        fetchingBtn: 'Synchronisiere Satellit...',
        presetsLabel: 'Referenzen:',
        syncLangBtn: 'Sprache an Region anpassen',
        liveSourceBadge: 'LIVE NASA POWER API',
        fallbackSourceBadge: 'BREITENGRAD-KALIBRIERTE RESERVE',
        districtsPrefix: 'Bezirke',
        geocodeError: 'Stadt nicht gefunden. Versuchen Sie eine größere Nachbarstadt oder geben Sie Breiten-/Längengrad direkt ein.',
        invalidCoordsError: 'Bitte gültige Koordinaten eingeben (Breitengrad -90 bis 90, Längengrad -180 bis 180).',
        langNames: {
          en: 'English',
          id: 'Bahasa Indonesia',
          ar: 'العربية',
          pt: 'Português',
          es: 'Español',
          hi: 'हिन्दी',
          fr: 'Français',
          ja: '日本語',
          ko: '한국어',
          it: 'Italiano',
          th: 'ไทย',
          sv: 'Svenska',
          no: 'Norsk',
          nl: 'Nederlands',
          de: 'Deutsch',
        },
      },
      simulator: {
        title: 'What-If-Extremwettersimulator',
        simActive: 'Simulation aktiv',
        liveBaseline: 'Live NASA-Basislinie',
        resetBtn: 'Auf Live-NASA-Daten zurücksetzen',
        rainfallLabel: 'Simulierter Tagesniederschlag',
        solarLabel: 'Simulierte Sonneneinstrahlung',
        extremeDry: '0 mm (Extreme Dürre)',
      },
      map: {
        resolutionLabel: 'Räuml. Auflösung:',
        resolutionValue: 'NASA SMAP / POWER 0.5°',
        pumpCapPrefix: 'Kap:',
        pumpStatuses: {
          Active: 'Aktiv',
          Standby: 'Bereitschaft',
          Optimizing: 'Optimiert',
        },
        interactiveHint: 'Auf beliebigen Zonenmarker klicken für Telemetrie & Solarauslegung',
        showAllPrefix: 'Alle anzeigen',
      },
      districtsStrip: {
        title: 'Bezirkstelemetrie',
      },
      priorityBanner: {
        title: 'KI-Priorisierung der Solarpumpen',
        pumpSitePrefix: 'Prioritätsstandort:',
        criticalMoistureText: 'kritische Bodenfeuchte',
        recordsText: 'meldet',
        macroWetnessText: 'regionale Bodenfeuchte',
      },
      telemetryPanel: {
        title: 'Zonentelemetrie',
        droughtSuffix: 'Dürre',
        plantationSuffix: 'Schlag',
        smapMoisture: 'Bodenfeuchte (GWETTOP)',
        criticalDry: 'Kritisch trocken',
        moderate: 'Mäßig',
        humidOptimal: 'Optimal',
        volumetricDepth: 'Obere Wurzelzone',
        sevenDayTrend: '7-Tage-Feuchtetrend',
        deficit: 'Defizit',
        gain: 'Anstieg',
        nasaRadiance: 'Sonneneinstrahlung',
        strong: 'Hoher Ertrag',
        moderateSolar: 'Mäßig',
        solarPumpYield: 'Solarpumpenleistung',
        capacityUnit: 'Stufen',
        surfaceTempLabel: 'Bodennahe Lufttemp. (T2M)',
      },
      peatland: {
        eyebrow: 'Ökosystem-Frühwarnsystem',
        moisturePrefix: 'Bodenfeuchte',
        sendWarningBtn: 'WhatsApp/SMS-Frühwarnung an Landwirte senden',
        confirmedTitle: 'Warnung gesendet',
        confirmedBodyPrefix: 'WhatsApp/SMS-Warnung eingereiht für Landwirte in',
      },
      solarSizing: {
        eyebrow: 'Intelligente PV-Auslegung',
        title: 'Solarpumpendimensionierung & Kraftstoffersparnis',
        arraySizeLabel: 'Empfohlenes Solarfeld',
        panelUnit: '550Wp-Module',
        dailyWaterLabel: 'Geschätzte Tageswassermenge',
        dailyWaterUnit: 'L/day',
        dailyEnergyUnit: 'kWh/day',
        monthlySavingsLabel: 'Monatliche Kraftstoffersparnis',
        vsDiesel: 'gegenüber Dieselpumpe',
        saveFuelPrefix: 'Ersetzt',
        saveFuelSuffix: 'L Diesel / Monat',
      },
      advisor: {
        eyebrow: 'Zero-API Telemetrie-Engine',
        title: 'SOLVARA KI-Agronomieberater',
        liveBriefPrefix: 'LIVE-BERICHT',
        quickPromptsTitle: 'Schnellabfragen für Agronomen',
        analyzingPrefix: 'Analysiere NASA-Telemetrie für',
        prompts: {
          schedule: 'Bester Bewässerungsplan heute?',
          peatland: 'Ökosystemstress & Maßnahmenplan?',
          roi: 'ROI Diesel- vs. Solarpumpe?',
        },
      },
    },
    tab2: {
      bannerTitle: 'AUTONOME SOLAR-VFD-PUMPENSTEUERUNG ONLINE',
      bannerSubtitle: 'Geschlossener Regelkreis MPPT + Frequenzumrichter synchronisiert mit NASA POWER',
      telemetryOk: 'TELEMETRIE NOMINAL',
      kpis: {
        solarOutput: 'PV-Leistung',
        solarSub: 'MPPT-Tracking 98,6%',
        pumpCapacity: 'Pumpenförderstrom',
        pumpSub: 'Variable Drehzahl VFD',
        waterReserve: 'Puffertankreserve',
        waterSub: '20.000 L Speicher',
        rain3Day: '3-Tage-Regenschnitt',
        rainLatestPrefix: 'Letzter:',
        rainOptimalSolar: 'Optimale Sonne',
        rainActiveRecharge: 'Aktive Auffüllung',
        yieldSaved: 'Geschützter Ertrag',
        yieldSub: 'Verhindert Welkeverluste',
      },
      heatmap: {
        title: '140-Parzellen-Feuchtematrix & Notfallwelle',
        subtitle: 'Radiale solarbetriebene Tröpfchenbewässerung über gestresste Parzellen simulieren',
        scaleLabel: 'SKALA:',
        reRunBtn: 'Notfall-Solarbewässerung starten',
        pumpingActive: 'Hydratationswelle aktiv',
        resetDemoBtn: 'Feldstress zurücksetzen',
        plotPrefix: 'Parzelle #',
        legend: {
          severe: 'Schwer',
          high: 'Hoher Stress',
          moderate: 'Mäßig',
          low: 'Geringer Stress',
          hydrated: 'Bewässert',
        },
        cellLabels: {
          hydrated: 'Bewässert (Optimal)',
          severe: 'Schwerer Stress (<15%)',
          high: 'Hoher Stress (15-25%)',
          moderate: 'Mäßiger Stress (25-40%)',
          low: 'Geringer Stress (40-60%)',
        },
      },
      vfd: {
        affinityLawPrefix: 'Affinitätsgesetz: P ∝ N³',
        title: 'VFD-Effizienzoptimierer',
        subtitle: 'Pumpendrehzahl dynamisch anhand der Live-Wurzelzonenfeuchte modulieren',
        sourcePlotArray: 'Feldmatrix',
        autoSyncOn: 'Auto-Sync EIN',
        autoSyncOff: 'Auto-Sync AUS',
        liveRootMoisturePrefix: 'Effektive Wurzelfeuchte',
        criticalWord: 'kritisch',
        hydratedWord: 'bewässert',
        zoneTelemetryPrefix: 'Zonentelemetrie',
        meanArrayPrefix: 'Matrix-Mittel:',
        suggestedAdjustment: 'Empfohlenes Delta',
        optimalSynced: 'Optimal synchronisiert',
        rampDown: 'Herunterregeln',
        rampUp: 'Hochregeln',
        activeInverterSpeed: 'Aktive Umrichterfrequenz:',
        targetPrefix: 'Ziel:',
        recommendedTooltipPrefix: 'Optimales Ziel:',
        manualSliderLabel: 'Manuelle Frequenzvorgabe (20 - 50 Hz)',
        nominalRpmSuffix: 'Nenn-RPM',
        syncedBtn: 'Umrichter synchronisiert',
        applyBtnPrefix: 'Anwenden',
        kpiSuggestedSpeed: 'Ziel-VFD-Frequenz',
        kpiAdjustedFlow: 'Angepasster Durchfluss',
        kpiVsActivePrefix: 'vs.',
        kpiVsActiveSuffix: 'aktiv',
        kpiInverterLoad: 'Umrichterlast',
        kpiVsCurrentSuffix: 'kW gespart',
        kpiBaseline50Hz: 'Volle 50 Hz Basis',
        kpiEnergySaved: 'Gesparte Energie',
        kpiToBatterySuffix: 'kWh/day gespart',
      },
      allocation: {
        title: 'Solarleistungsverteilung',
        subtitle: 'Echtzeit-Aufteilung der PV-Leistung auf priorisierte Bezirkszonen',
      },
      forecast: {
        title: 'Wasserleistung · 24H-Solarprognose',
        subtitlePrefix: 'Spitzen-Pumpfenster',
        subtitleMiddle: '10:00 - 14:30',
        subtitleSuffix: 'abgestimmt auf maximale Einstrahlung',
        estTotal: 'Gesch. 114.500 L/day',
        peakLabel: '12h (Spitze)',
      },
    },
    tab3: {
      rankBadge: 'RANG #1 AGRI-PV-STANDORT',
      siteCodePrefix: 'STANDORTCODE:',
      siteTitleSuffix: 'Agri-PV-Machbarkeitsdossier',
      siteSubtitlePrefix: 'Multikriterielle Raumanalyse auf Basis von Live-NASA-POWER-Telemetrie in',
      suitabilityScore: 'Eignungswert',
      tierGrade: 'Tier-A Prime',
      confidencePrefix: 'Konfidenz',
      metrics: [
        { label: 'PV-Leistung', val: '120 kWp', sub: 'Aufgeständert bifazial' },
        { label: 'Jahresertrag', val: '198 MWh', sub: 'PR 81.4%' },
        { label: 'Wasserförderung', val: '145 m³/day', sub: '18m TDH Förderhöhe' },
        { label: 'Capex-Schätzung', val: '108K USD', sub: 'Schlüsselfertig + VFD' },
        { label: 'Amortisation', val: '3,4 J.', sub: 'Diesel ersetzt' },
        { label: 'CO₂-Einsparung', val: '142 t/yr', sub: 'Verifiziert Tier-1' },
        { label: 'Kulturschatten', val: '+18%', sub: 'Mikroklimavorteil' },
      ],
      reasoningTitle: 'KI-basierte räumliche & agronomische Begründung',
      confidenceBadgePrefix: 'Modellkonfidenz',
      reasons: [
        {
          title: 'Solarressourcen-Verifizierung:',
          bodyBefore: 'Die kurzwellige NASA POWER-Oberflächenstrahlung liegt im Schnitt bei',
          bodyAfter: 'und bietet einen hohen Kapazitätsfaktor für VFD-Pumpen am Tag ohne tiefe Batteriezyklen.',
        },
        {
          title: 'Minderung des Wurzelzonendefizits:',
          body: 'Auf 3,2 m aufgeständerte Agri-PV-Konstruktionen senken die Oberbodenverdunstung während der Mittagshitze um 18–24%.',
        },
        {
          title: 'Dieselfreie Hydraulikökonomie:',
          body: 'Direkt DC-gekoppeltes VFD-Pumpen eliminiert Treibstofflogistik und stabilisiert die Margen kleinerer Betriebe.',
        },
      ],
      riskTitle: 'Hinweis zur Standort-Risikominderung',
      riskBodyBefore: 'Saisonale Bewölkung oder Hitzespitzen können Pumpzyklen verschieben. Kombinieren Sie',
      riskBodyHighlight: '20.000 L Schwerkraftpuffer',
      riskBodyAfter: 'mit automatisierten WhatsApp-Dürrewarnungen, um mehrtägige Wolkenphasen zu überbrücken.',
      weightsTitle: 'MCDA-Kriteriengewichtung',
      weightsSubtitle: 'Gewichtetes räumliches Bewertungsmodell für das Standort-Ranking',
      weights: [
        'Sonneneinstrahlung (NASA POWER)',
        'Dringlichkeit des Bodenfeuchtedefizits',
        'Nähe zu Grundwasserleiter / Kanal',
        'Schattensynergie für Kulturen',
        'Netz- & Dieselersatz-ROI',
      ],
      solarProfileTitle: '24H-Solarerzeugungskurve',
      solarProfileSubtitle: 'Stündliches Leistungsprofil der PV-Anlage',
      solarMaxBadge: 'Spitze 98.4 kW',
      solarPeakZen: '12:15 (Zenit)',
      irradianceMonthlyTitle: '12-Monats-Einstrahlungsprofil',
      irradianceMonthlySubtitle: 'Historische saisonale Verteilung in kWh/m²/day',
      irradianceAvgBadge: 'Schnitt 6.08 kWh/m²',
      months: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    },
    footer: {
      brandLine: 'SOLVARA Planetare Agri-PV • NASA POWER & SMAP Telemetriesuite',
      resolution: '0.5° × 0.625° NASA POWER Raster',
      iec: 'IEC 61724 PV-Leistung',
      vfdProtocol: 'Modbus VFD Affinitätssteuerung',
    },
    toast: {
      title: 'Frühwarnung an Landwirte gesendet',
      bodyPrefix: 'WhatsApp/SMS-Warnung gesendet an Landwirte in',
      bodyMiddle: 'für',
    },
    whatsappPreview: {
      botName: 'SOLVARA Sat-Alert Bot',
      onlineStatus: 'Online',
      previewTag: 'Mobil-Vorschau Landwirt',
      todayLabel: 'HEUTE',
      copyBtn: 'Nachricht kopieren',
      copiedBtn: 'Kopiert!',
      closeBtn: 'Schließen',
    },
    intro: {
      startButton: 'Launch System',
      logoAria: 'SOLVARA-Plattform starten',
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

  if (lang === 'ja') {
    const cardTitle = isPeat
      ? '泥炭地火災・作物萎凋リスク警報'
      : isDesert
      ? '極度高温・乾燥萎凋リスク'
      : '生態系水分不足リスク';
    if (level === 'critical') {
      return {
        cardTitle,
        label: isPeat
          ? '危険 — 泥炭地火災・乾燥リスク極大'
          : isDesert
          ? '危険 — 極度高温・干ばつストレス'
          : '危険 — 土壌水分が危機的水準',
        advice: '直ちに VFD ソーラーフル稼働で散水し、農家へ WhatsApp 早期警報を送信してください。',
      };
    }
    if (level === 'moderate') {
      return {
        cardTitle,
        label: '警戒 — 根域の水分不足',
        advice: '日射ピーク時間帯にソーラー点滴灌漑サイクルを増やし、水分 30% 以上を維持してください。',
      };
    }
    return {
      cardTitle,
      label: '安全 — 生態系水分は良好',
      advice: 'VFD エコモードを維持しつつ NASA POWER 衛星監視を継続してください。',
    };
  }

  if (lang === 'ko') {
    const cardTitle = isPeat
      ? '이탄지 화재 및 작물 시들음 위험'
      : isDesert
      ? '극한 폭염 및 가뭄 시들음 위험'
      : '생태계 수분 결핍 위험';
    if (level === 'critical') {
      return {
        cardTitle,
        label: isPeat
          ? '위험 — 이탄지 화재 및 극심한 가뭄'
          : isDesert
          ? '위험 — 극한 폭염 및 수분 스트레스'
          : '위험 — 심각한 토양 수분 부족',
        advice: '즉시 VFD 태양광 최대 양수를 가동하고 농가에 WhatsApp 조기 경보를 발송하세요.',
      };
    }
    if (level === 'moderate') {
      return {
        cardTitle,
        label: '주의 — 근권부 수분 결핍',
        advice: '일사량 피크 시간대에 태양광 점적 관개 주기를 늘려 30% 이상을 유지하세요.',
      };
    }
    return {
      cardTitle,
      label: '안전 — 생태계 수분 안정적',
      advice: 'VFD 에코 모드를 유지하며 NASA POWER 위성 모니터링을 지속하세요.',
    };
  }

  if (lang === 'it') {
    const cardTitle = isPeat
      ? 'Rischio Incendi Torbiere e Appassimento'
      : isDesert
      ? 'Rischio Calore Estremo e Appassimento'
      : 'Rischio Deficit Idrico Ecosistema';
    if (level === 'critical') {
      return {
        cardTitle,
        label: isDesert
          ? 'CRITICO — CALORE ARIDO ESTREMO'
          : 'CRITICO — SICCITÀ E STRESS GRAVE',
        advice: 'Attiva immediatamente il pompaggio solare VFD al massimo e invia allerta WhatsApp agli agricoltori.',
      };
    }
    if (level === 'moderate') {
      return {
        cardTitle,
        label: 'ALLERTA — DEFICIT ZONA RADICALE',
        advice: 'Aumenta il ciclo di irrigazione solare a goccia nelle ore centrali sopra il 30%.',
      };
    }
    return {
      cardTitle,
      label: 'SICURO — UMIDITÀ PROTETTA',
      advice: 'Mantieni la modalità VFD Eco proseguendo il monitoraggio satellitare NASA POWER.',
    };
  }

  if (lang === 'th') {
    const cardTitle = isPeat
      ? 'ความเสี่ยงไฟป่าพรุและพืชเหี่ยวเฉา'
      : isDesert
      ? 'ความเสี่ยงความร้อนจัดและพืชเหี่ยวแห้ง'
      : 'ความเสี่ยงการขาดความชื้นระบบนิเวศ';
    if (level === 'critical') {
      return {
        cardTitle,
        label: isPeat
          ? 'วิกฤต — เสี่ยงไฟป่าพรุและแห้งแล้งรุนแรง'
          : isDesert
          ? 'วิกฤต — ความร้อนจัดและเครียดน้ำรุนแรง'
          : 'วิกฤต — ความชื้นดินขาดดุลรุนแรง',
        advice: 'เปิดปั๊มโซลาร์ VFD เต็มกำลังทันทีและส่งการแจ้งเตือนด่วน WhatsApp ให้เกษตรกร',
      };
    }
    if (level === 'moderate') {
      return {
        cardTitle,
        label: 'เฝ้าระวัง — เขตรากเริ่มขาดความชื้น',
        advice: 'เพิ่มรอบการให้น้ำหยดโซลาร์ในช่วงแสงแดดสูงสุดเพื่อรักษาระดับความชื้นเกิน 30%',
      };
    }
    return {
      cardTitle,
      label: 'ปลอดภัย — ความชื้นระบบนิเวศสมดุล',
      advice: 'คงโหมดประหยัดพลังงาน VFD Eco และติดตามข้อมูลดาวเทียม NASA POWER อย่างต่อเนื่อง',
    };
  }

  if (lang === 'sv') {
    const cardTitle = isPeat
      ? 'Brand- & vissningsrisk i torvmark'
      : isDesert
      ? 'Extrem hetta & torkstress'
      : 'Risk för fuktunderskott i ekosystemet';
    if (level === 'critical') {
      return {
        cardTitle,
        label: isDesert
          ? 'KRITISK — EXTREM TORR HETTA & VISNING'
          : 'KRITISK — ALLVARLIGT FUKTUNDERSKOTT',
        advice: 'Aktivera full VFD-solpumpning omedelbart och skicka tidig WhatsApp-varning till odlare.',
      };
    }
    if (level === 'moderate') {
      return {
        cardTitle,
        label: 'FÖRHÖJD — FUKTBRIST I ROTZONEN',
        advice: 'Öka droppbevattningen mitt på dagen för att hålla markfuktigheten över 30%.',
      };
    }
    return {
      cardTitle,
      label: 'OPTIMAL — EKOSYSTEMETS FUKT SKYDDAD',
      advice: 'Behåll VFD Eco-läge och fortsätt satellitövervakningen via NASA POWER.',
    };
  }

  if (lang === 'no') {
    const cardTitle = isPeat
      ? 'Brann- og visningsrisiko i torvmyr'
      : isDesert
      ? 'Ekstrem tørkevarme og visningsrisiko'
      : 'Risiko for fuktunderskudd i økosystemet';
    if (level === 'critical') {
      return {
        cardTitle,
        label: isDesert
          ? 'KRITISK — EKSTREM VARME & TØRKESTRESS'
          : 'KRITISK — ALVORLIG FUKTMANGEL',
        advice: 'Start full VFD-solpumping umiddelbart og send tidlig WhatsApp-varsel til bønder.',
      };
    }
    if (level === 'moderate') {
      return {
        cardTitle,
        label: 'FORHØYET — ROTSONEFUKTUNDERSKUDD',
        advice: 'Øk dryppvanningen midt på dagen for å stabilisere jordfuktigheten over 30%.',
      };
    }
    return {
      cardTitle,
      label: 'OPTIMAL — ØKOSYSTEMETS FUKT BESKYTTET',
      advice: 'Behold VFD Eco-modus mens NASA POWER-satellittovervåkingen fortsetter.',
    };
  }

  if (lang === 'nl') {
    const cardTitle = isPeat
      ? 'Veenbrand- & verwelkingsrisico'
      : isDesert
      ? 'Extreme droge hitte & verwelkingsrisico'
      : 'Risico op bodemvochttekort';
    if (level === 'critical') {
      return {
        cardTitle,
        label: isDesert
          ? 'KRITIEK — EXTREME HITTE & DROOGTESTRESS'
          : 'KRITIEK — ERNSTIG VOCHTTEKORT',
        advice: 'Schakel direct volledig VFD-zonnepompen in en stuur een WhatsApp-waarschuwing naar boeren.',
      };
    }
    if (level === 'moderate') {
      return {
        cardTitle,
        label: 'VERHOOGD — TEKORT IN WORTELZONE',
        advice: 'Verhoog de druppelirrigatie rond het middaguur om het bodemvocht boven 30% te houden.',
      };
    }
    return {
      cardTitle,
      label: 'OPTIMAAL — ECOSYSTEEMVOCHT BESCHERMD',
      advice: 'Handhaaf de VFD Eco-modus en blijf NASA POWER-satellietdata volgen.',
    };
  }

  if (lang === 'de') {
    const cardTitle = isPeat
      ? 'Moorbrand- & Welkerisiko'
      : isDesert
      ? 'Extreme Hitze- & Dürrewelke-Gefahr'
      : 'Ökosystem-Feuchtedefizitrisiko';
    if (level === 'critical') {
      return {
        cardTitle,
        label: isDesert
          ? 'KRITISCH — EXTREME HITZE & TROCKENSTRESS'
          : 'KRITISCH — SCHWERES FEUCHTEDEFIZIT',
        advice: 'Sofort volle VFD-Solarpumpenleistung aktivieren und WhatsApp-Frühwarnung an Landwirte senden.',
      };
    }
    if (level === 'moderate') {
      return {
        cardTitle,
        label: 'ERHÖHT — WURZELZONEN-FEUCHTEDEFIZIT',
        advice: 'Mittäglichen Solar-Tröpfchenzyklus erhöhen, um die Bodenfeuchte über 30% zu stabilisieren.',
      };
    }
    return {
      cardTitle,
      label: 'OPTIMAL — ÖKOSYSTEMFEUCHTE GESCHÜTZT',
      advice: 'VFD-Eco-Modus beibehalten und NASA-POWER-Satellitenüberwachung fortsetzen.',
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
  if (lang === 'ja') {
    switch (regime) {
      case 'boost':
        return {
          regimeLabel: '緊急ブーストモード',
          actionAdvice: '根域乾燥が深刻 (<20%)。急速給水のため VFD インバーターを 47–50 Hz で稼働してください。',
        };
      case 'adaptive':
        return {
          regimeLabel: '適応変調モード',
          actionAdvice: '相似則に基づき 38–46 Hz へ調整し、PV 消費電力を最大 35% 削減します。',
        };
      case 'cruise':
        return {
          regimeLabel: '高効率クルーズモード',
          actionAdvice: '水分は安定しています。30–37 Hz で運転して貯水タンク残量を温存してください。',
        };
      default:
        return {
          regimeLabel: 'エコ最適スロットル',
          actionAdvice: '圃場は潤沢です (>55%)。VFD を 22–29 Hz へ下げて消費電力を最大 75% 削減します。',
        };
    }
  }
  if (lang === 'ko') {
    switch (regime) {
      case 'boost':
        return {
          regimeLabel: '비상 부스트 모드',
          actionAdvice: '근권부 건조 심각 (<20%). 신속한 급수를 위해 VFD 인버터를 47–50 Hz로 가동하세요.',
        };
      case 'adaptive':
        return {
          regimeLabel: '적응형 변조 모드',
          actionAdvice: '상사 법칙에 따라 38–46 Hz로 낮춰 PV 소비 전력을 최대 35% 절감하세요.',
        };
      case 'cruise':
        return {
          regimeLabel: '고효율 크루즈 모드',
          actionAdvice: '수분이 안정적입니다. 30–37 Hz로 운전하여 버퍼 저장량을 유지하세요.',
        };
      default:
        return {
          regimeLabel: '에코 최적 절전 모드',
          actionAdvice: '토양 수분 충분 (>55%). VFD를 22–29 Hz로 낮춰 전력 소모를 최대 75% 줄이세요.',
        };
    }
  }
  if (lang === 'it') {
    switch (regime) {
      case 'boost':
        return {
          regimeLabel: 'MODALITÀ BOOST EMERGENZA',
          actionAdvice: 'Secchezza radicale critica (<20%). Imposta l’inverter VFD a 47–50 Hz per reidratazione rapida.',
        };
      case 'adaptive':
        return {
          regimeLabel: 'MODULAZIONE ADATTIVA',
          actionAdvice: 'Riduci a 38–46 Hz per risparmiare fino al 35% di energia PV grazie alla legge cubica.',
        };
      case 'cruise':
        return {
          regimeLabel: 'MODALITÀ CROCIERA EFFICIENTE',
          actionAdvice: 'Umidità bilanciata. Opera a 30–37 Hz per preservare la riserva idrica.',
        };
      default:
        return {
          regimeLabel: 'MODALITÀ ECO OTTIMALE',
          actionAdvice: 'Campo idratato (>55%). Riduci il VFD a 22–29 Hz tagliando i consumi fino al 75%.',
        };
    }
  }

  if (lang === 'th') {
    switch (regime) {
      case 'boost':
        return {
          regimeLabel: 'โหมดเร่งกำลังฉุกเฉิน',
          actionAdvice: 'เขตรากแห้งวิกฤต (<20%) เดินเครื่องอินเวอร์เตอร์ VFD ที่ 47–50 Hz เพื่อคืนความชื้นเร่งด่วน',
        };
      case 'adaptive':
        return {
          regimeLabel: 'โหมดปรับความถี่อัตโนมัติ',
          actionAdvice: 'ลดความถี่ลงที่ 38–46 Hz เพื่อประหยัดพลังงาน PV สูงสุด 35% ตามกฎความคล้ายกำลังสาม',
        };
      case 'cruise':
        return {
          regimeLabel: 'โหมดเดินเครื่องประหยัด',
          actionAdvice: 'ความชื้นสมดุล เดินเครื่องที่ 30–37 Hz เพื่อรักษาปริมาณน้ำสำรองในถัง',
        };
      default:
        return {
          regimeLabel: 'โหมดประหยัดพลังงานสูงสุด ECO',
          actionAdvice: 'แปลงชุ่มชื้นเพียงพอ (>55%) ลดรอบ VFD ลงที่ 22–29 Hz ช่วยประหยัดไฟสูงสุด 75%',
        };
    }
  }
  if (lang === 'sv') {
    switch (regime) {
      case 'boost':
        return {
          regimeLabel: 'AKUT BOOST-LÄGE',
          actionAdvice: 'Kritisk rottorka (<20%). Kör VFD-omriktaren på 47–50 Hz för snabb återfuktning.',
        };
      case 'adaptive':
        return {
          regimeLabel: 'ADAPTIV MODULERING',
          actionAdvice: 'Sänk varvtalet till 38–46 Hz för att minska PV-uttaget med upp till 35% enligt affinitetslagen.',
        };
      case 'cruise':
        return {
          regimeLabel: 'EFFEKTIVT CRUISE-LÄGE',
          actionAdvice: 'Balanserad fuktighet. Kör på 30–37 Hz för att bevara buffertreserver.',
        };
      default:
        return {
          regimeLabel: 'OPTIMALT ECO-LÄGE',
          actionAdvice: 'Fältet välbevattnat (>55%). Sänk VFD till 22–29 Hz och spara upp till 75% energi.',
        };
    }
  }
  if (lang === 'no') {
    switch (regime) {
      case 'boost':
        return {
          regimeLabel: 'NØD-BOOST-MODUS',
          actionAdvice: 'Kritisk rottørke (<20%). Kjør VFD-omformeren på 47–50 Hz for rask vanning.',
        };
      case 'adaptive':
        return {
          regimeLabel: 'ADAPTIV MODULERING',
          actionAdvice: 'Senk turtallet til 38–46 Hz for å kutte PV-forbruket med opptil 35% via affinitetsloven.',
        };
      case 'cruise':
        return {
          regimeLabel: 'EFFEKTIV CRUISE-MODUS',
          actionAdvice: 'Balansert fuktighet. Kjør på 30–37 Hz for å bevare bufferreserver.',
        };
      default:
        return {
          regimeLabel: 'OPTIMAL ECO-MODUS',
          actionAdvice: 'Feltet er vannet (>55%). Senk VFD til 22–29 Hz for å spare opptil 75% strøm.',
        };
    }
  }
  if (lang === 'nl') {
    switch (regime) {
      case 'boost':
        return {
          regimeLabel: 'NOOD-BOOSTMODUS',
          actionAdvice: 'Kritische worteldroogte (<20%). Draai de VFD op 47–50 Hz voor snelle herbevochtiging.',
        };
      case 'adaptive':
        return {
          regimeLabel: 'ADAPTIEVE MODULATIE',
          actionAdvice: 'Regel terug naar 38–46 Hz om tot 35% PV-vermogen te besparen via de kubische wet.',
        };
      case 'cruise':
        return {
          regimeLabel: 'EFFICIËNTE CRUISEMODUS',
          actionAdvice: 'Evenwichtig vochtprofiel. Draai op 30–37 Hz om de bufferreserve te sparen.',
        };
      default:
        return {
          regimeLabel: 'OPTIMALE ECO-MODUS',
          actionAdvice: 'Perceel gehydrateerd (>55%). Verlaag VFD naar 22–29 Hz voor tot 75% energiebesparing.',
        };
    }
  }
  if (lang === 'de') {
    switch (regime) {
      case 'boost':
        return {
          regimeLabel: 'NOTFALL-BOOST-MODUS',
          actionAdvice: 'Kritische Wurzeltrockenheit (<20%). VFD-Umrichter mit 47–50 Hz für schnelle Wiederbefeuchtung betreiben.',
        };
      case 'adaptive':
        return {
          regimeLabel: 'ADAPTIVE MODULATION',
          actionAdvice: 'Drehzahl auf 38–46 Hz drosseln, um gemäß kubischem Affinitätsgesetz bis zu 35% PV-Leistung zu sparen.',
        };
      case 'cruise':
        return {
          regimeLabel: 'EFFIZIENTER CRUISE-MODUS',
          actionAdvice: 'Ausgeglichene Feuchte. Mit 30–37 Hz fahren, um Speicherreserven zu schonen.',
        };
      default:
        return {
          regimeLabel: 'OPTIMALER ECO-MODUS',
          actionAdvice: 'Feld ausreichend bewässert (>55%). VFD auf 22–29 Hz senken und bis zu 75% Energie sparen.',
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
    return `${p.zoneName} (${p.locationName}) affiche ${p.moisture}% d’humidité sur ${p.cropLocalized} avec ${p.solar.toFixed(2)} kWh/m²/day d’irradiance. Activez ${p.pumpId} durant le pic solaire pour pomper ${liters} L/day.`;
  }
  if (lang === 'ja') {
    return `${p.zoneName}（${p.locationName}）の${p.cropLocalized}区画では土壌水分 ${p.moisture}%、日射量 ${p.solar.toFixed(2)} kWh/m²/day を観測しています。日射ピーク時間帯に ${p.pumpId} を稼働させ、日量 ${liters} L/day の灌漑を推奨します。`;
  }
  if (lang === 'ko') {
    return `${p.zoneName}(${p.locationName})의 ${p.cropLocalized} 필지는 토양 수분 ${p.moisture}%, 일사량 ${p.solar.toFixed(2)} kWh/m²/day를 기록 중입니다. 일사 피크 시간대에 ${p.pumpId}를 가동하여 일일 ${liters} L/day 관개를 권장합니다.`;
  }
  if (lang === 'it') {
    return `${p.zoneName} (${p.locationName}) registra ${p.moisture}% di umidità radicale su ${p.cropLocalized} con irradianza di ${p.solar.toFixed(2)} kWh/m²/day. Attiva ${p.pumpId} nelle ore solari di punta per erogare ${liters} L/day.`;
  }
  if (lang === 'th') {
    return `${p.zoneName} (${p.locationName}) วัดความชื้นดินเขตรากได้ ${p.moisture}% บนแปลง ${p.cropLocalized} ที่ค่ารังสีอาทิตย์ ${p.solar.toFixed(2)} kWh/m²/day แนะนำเดินเครื่อง ${p.pumpId} ช่วงแดดสูงสุดเพื่อสูบน้ำ ${liters} L/day`;
  }
  if (lang === 'sv') {
    return `${p.zoneName} (${p.locationName}) visar ${p.moisture}% markfuktighet för ${p.cropLocalized} med ${p.solar.toFixed(2)} kWh/m²/day solstrålning. Aktivera ${p.pumpId} under soltoppen för att leverera ${liters} L/day.`;
  }
  if (lang === 'no') {
    return `${p.zoneName} (${p.locationName}) måler ${p.moisture}% rotfuktighet på ${p.cropLocalized} med ${p.solar.toFixed(2)} kWh/m²/day innstråling. Start ${p.pumpId} i soltoppen for å levere ${liters} L/day.`;
  }
  if (lang === 'nl') {
    return `${p.zoneName} (${p.locationName}) registreert ${p.moisture}% wortelvocht op ${p.cropLocalized} bij ${p.solar.toFixed(2)} kWh/m²/day zoninstraling. Schakel ${p.pumpId} tijdens de zonnepiek in voor ${liters} L/day.`;
  }
  if (lang === 'de') {
    return `${p.zoneName} (${p.locationName}) misst ${p.moisture}% Wurzelzonenfeuchte bei ${p.cropLocalized} und ${p.solar.toFixed(2)} kWh/m²/day Einstrahlung. ${p.pumpId} während der Mittagsspitze für ${liters} L/day aktivieren.`;
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
        body: `Pilotez ${p.pumpId} (${p.pumpFlowRate}) en deux créneaux solaires à ${p.solar.toFixed(2)} kWh/m²/day pour fournir ${waterStr} L/day.`,
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
      body: `Un champ de ${wpStr} Wp (${p.moduleCount} panneaux) génère ${p.dailyEnergyKwh.toFixed(1)} kWh/day et économise ${p.monthlyDieselLiters} L diesel/mois (~${p.monthlySavingsDisplay}/mois).`,
    };
  }

  if (lang === 'ja') {
    if (promptId === 'schedule') {
      return {
        title: `最適灌漑スケジュール (${p.optimalWindow})`,
        body: `日射量 ${p.solar.toFixed(2)} kWh/m²/day の ${p.optimalWindow} に ${p.pumpId}（${p.pumpFlowRate}）を2パルスで運転し、蒸発損失を抑えつつ ${waterStr} L/day を供給してください。`,
      };
    }
    if (promptId === 'peatland') {
      return {
        title: `生態系ストレス緩和策 (${p.region})`,
        body: `${p.locationName} の土壌水分 ${p.moisture}% に基づき VFD 点滴灌漑を継続し、20% 未満へ低下した場合は直ちに WhatsApp 農家警報を発令してください。`,
      };
    }
    return {
      title: `太陽光 vs ディーゼル ROI 内訳`,
      body: `${wpStr} Wp アレイ（${p.moduleCount}× 550Wp）は日量 ${p.dailyEnergyKwh.toFixed(1)} kWh/day を発電し、月間 ${p.monthlyDieselLiters} L の軽油（約 ${p.monthlySavingsDisplay}/月）を削減、回収期間は約 3.4 年です。`,
    };
  }

  if (lang === 'ko') {
    if (promptId === 'schedule') {
      return {
        title: `최적 관개 스케줄 (${p.optimalWindow})`,
        body: `일사량 ${p.solar.toFixed(2)} kWh/m²/day 조건의 ${p.optimalWindow} 동안 ${p.pumpId}(${p.pumpFlowRate})를 2단계 펄스로 가동하여 증발 손실을 줄이고 ${waterStr} L/day를 공급하세요.`,
      };
    }
    if (promptId === 'peatland') {
      return {
        title: `생태계 스트레스 완화 계획 (${p.region})`,
        body: `${p.locationName}의 토양 수분 ${p.moisture}% 수준에서는 VFD 점적 관개로 근권부를 보호하고, 20% 미만 하락 시 즉시 WhatsApp 농가 경보를 발송하세요.`,
      };
    }
    return {
      title: `태양광 vs 디젤 펌프 ROI 분석`,
      body: `${wpStr} Wp 어레이(${p.moduleCount}× 550Wp)는 일일 ${p.dailyEnergyKwh.toFixed(1)} kWh/day를 생산해 월 ${p.monthlyDieselLiters} L의 경유(약 ${p.monthlySavingsDisplay}/월)를 절감하며 약 3.4년 내 회수됩니다.`,
    };
  }

  if (lang === 'it') {
    if (promptId === 'schedule') {
      return {
        title: `Programma Irrigazione Ottimale (${p.optimalWindow})`,
        body: `Aziona ${p.pumpId} (${p.pumpFlowRate}) in due impulsi durante ${p.optimalWindow} a ${p.solar.toFixed(2)} kWh/m²/day per fornire ${waterStr} L/day limitando l’evaporazione.`,
      };
    }
    if (promptId === 'peatland') {
      return {
        title: `Mitigazione Stress Ecosistema (${p.region})`,
        body: `Con umidità al ${p.moisture}% a ${p.locationName}, attiva l’irrigazione a goccia VFD e invia allerte WhatsApp agli agricoltori se scende sotto il 20%.`,
      };
    }
    return {
      title: `Analisi ROI Solare vs Diesel`,
      body: `Un impianto da ${wpStr} Wp (${p.moduleCount}× 550Wp) genera ${p.dailyEnergyKwh.toFixed(1)} kWh/day, sostituendo ${p.monthlyDieselLiters} L di diesel/mese (~${p.monthlySavingsDisplay}/mese) con rientro in ~3,4 anni.`,
    };
  }

  if (lang === 'th') {
    if (promptId === 'schedule') {
      return {
        title: `ตารางสูบน้ำเหมาะสมที่สุด (${p.optimalWindow})`,
        body: `เดินเครื่อง ${p.pumpId} (${p.pumpFlowRate}) เป็น 2 รอบช่วง ${p.optimalWindow} ที่ค่ารังสี ${p.solar.toFixed(2)} kWh/m²/day เพื่อจ่ายน้ำ ${waterStr} L/day โดยลดการระเหย`,
      };
    }
    if (promptId === 'peatland') {
      return {
        title: `แผนลดความเครียดระบบนิเวศ (${p.region})`,
        body: `ที่ความชื้นดิน ${p.moisture}% ใน ${p.locationName} ให้ใช้ระบบน้ำหยด VFD รักษาความชื้นราก และส่งแจ้งเตือน WhatsApp ทันทีหากความชื้นต่ำกว่า 20%`,
      };
    }
    return {
      title: `สรุปความคุ้มค่า ROI โซลาร์ vs ดีเซล`,
      body: `ชุดแผง ${wpStr} Wp (${p.moduleCount}× 550Wp) ผลิตไฟได้ ${p.dailyEnergyKwh.toFixed(1)} kWh/day ทดแทนดีเซล ${p.monthlyDieselLiters} L/เดือน (~${p.monthlySavingsDisplay}/เดือน) คืนทุน ~3.4 ปี`,
    };
  }

  if (lang === 'sv') {
    if (promptId === 'schedule') {
      return {
        title: `Optimalt pumpschema (${p.optimalWindow})`,
        body: `Kör ${p.pumpId} (${p.pumpFlowRate}) i två solanpassade pulser under ${p.optimalWindow} vid ${p.solar.toFixed(2)} kWh/m²/day för att leverera ${waterStr} L/day med minimal avdunstning.`,
      };
    }
    if (promptId === 'peatland') {
      return {
        title: `Stressreducering i ekosystemet (${p.region})`,
        body: `Vid ${p.moisture}% markfuktighet i ${p.locationName}, aktivera VFD-droppbevattning och utlös WhatsApp-varningar om fuktigheten sjunker under 20%.`,
      };
    }
    return {
      title: `ROI-jämförelse: Solpump vs Diesel`,
      body: `Ett system på ${wpStr} Wp (${p.moduleCount}× 550Wp) ger ${p.dailyEnergyKwh.toFixed(1)} kWh/day, ersätter ${p.monthlyDieselLiters} L diesel/månad (~${p.monthlySavingsDisplay}/månad) med ~3,4 års återbetalning.`,
    };
  }

  if (lang === 'no') {
    if (promptId === 'schedule') {
      return {
        title: `Optimal pumpeplan (${p.optimalWindow})`,
        body: `Kjør ${p.pumpId} (${p.pumpFlowRate}) i to soltilpassede pulser i løpet av ${p.optimalWindow} ved ${p.solar.toFixed(2)} kWh/m²/day for å levere ${waterStr} L/day med minimalt fordampningstap.`,
      };
    }
    if (promptId === 'peatland') {
      return {
        title: `Økosystem-tiltaksplan (${p.region})`,
        body: `Ved ${p.moisture}% jordfuktighet i ${p.locationName}, aktiver VFD-dryppvanning og utløs WhatsApp-varsler dersom fuktigheten faller under 20%.`,
      };
    }
    return {
      title: `ROI-analyse: Solpumpe vs Diesel`,
      body: `Et anlegg på ${wpStr} Wp (${p.moduleCount}× 550Wp) produserer ${p.dailyEnergyKwh.toFixed(1)} kWh/day og erstatter ${p.monthlyDieselLiters} L diesel/måned (~${p.monthlySavingsDisplay}/mnd) med ~3,4 års tilbakebetaling.`,
    };
  }

  if (lang === 'nl') {
    if (promptId === 'schedule') {
      return {
        title: `Optimaal pompschema (${p.optimalWindow})`,
        body: `Laat ${p.pumpId} (${p.pumpFlowRate}) draaien in twee zonnepulsen tijdens ${p.optimalWindow} bij ${p.solar.toFixed(2)} kWh/m²/day om ${waterStr} L/day te leveren met minimaal verdampingsverlies.`,
      };
    }
    if (promptId === 'peatland') {
      return {
        title: `Mitigatie ecosysteemstress (${p.region})`,
        body: `Activeer bij ${p.moisture}% bodemvocht in ${p.locationName} VFD-druppelirrigatie en stuur WhatsApp-waarschuwingen zodra het vocht onder 20% zakt.`,
      };
    }
    return {
      title: `ROI-analyse: Zonne- vs. Dieselpomp`,
      body: `Een systeem van ${wpStr} Wp (${p.moduleCount}× 550Wp) levert ${p.dailyEnergyKwh.toFixed(1)} kWh/day, bespaart ${p.monthlyDieselLiters} L diesel/maand (~${p.monthlySavingsDisplay}/mnd) met ~3,4 jaar terugverdientijd.`,
    };
  }

  if (lang === 'de') {
    if (promptId === 'schedule') {
      return {
        title: `Optimaler Pumpzeitplan (${p.optimalWindow})`,
        body: `${p.pumpId} (${p.pumpFlowRate}) in zwei sonnengeführten Pulsen während ${p.optimalWindow} bei ${p.solar.toFixed(2)} kWh/m²/day betreiben, um ${waterStr} L/day verdunstungsarm zu fördern.`,
      };
    }
    if (promptId === 'peatland') {
      return {
        title: `Ökosystem-Stressminderung (${p.region})`,
        body: `Bei ${p.moisture}% Bodenfeuchte in ${p.locationName} VFD-Tröpfchenbewässerung aktivieren und bei unter 20% sofort WhatsApp-Warnungen an Landwirte senden.`,
      };
    }
    return {
      title: `ROI-Vergleich: Solar- vs. Dieselpumpe`,
      body: `Ein Feld mit ${wpStr} Wp (${p.moduleCount}× 550Wp) erzeugt ${p.dailyEnergyKwh.toFixed(1)} kWh/day, ersetzt ${p.monthlyDieselLiters} L Diesel/Monat (~${p.monthlySavingsDisplay}/Monat) bei ~3,4 Jahren Amortisation.`,
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
      `• Irradiance Solaire : *${p.solarKwh.toFixed(2)} kWh/m²/day*`,
      `• Température : *${p.tempC.toFixed(1)}°C*`,
      '',
      `⚡ *Recommandation Pompe Solaire :*`,
      `• Unité : *${p.pumpId}* (${p.pumpName})`,
      `• Volume Cible : *${waterStr} L/day*`,
      `• Créneau Optimal : *${p.optimalWindow}*`,
      '',
      `_Envoyé automatiquement par SOLVARA Sat-Alert à ${p.sentAt}_`,
    ].join('\n');
  }

  if (p.lang === 'ja') {
    const statusTag =
      p.riskLevel === 'critical'
        ? '🚨 *SOLVARA 緊急早期警戒アラート*'
        : p.riskLevel === 'moderate'
        ? '⚠️ *SOLVARA 乾燥注意報*'
        : '✅ *SOLVARA 日次灌漑ブリーフ*';
    return [
      statusTag,
      `📍 *地域:* ${p.locationName}`,
      `🗺️ *地区:* ${p.zoneName} (${p.region})`,
      `🛰️ *GPS:* ${p.coordsStr}`,
      '',
      `📊 *NASA POWER 衛星テレメトリ:*`,
      `• 土壌水分: *${p.moisturePct}%*`,
      `• 日射量: *${p.solarKwh.toFixed(2)} kWh/m²/day*`,
      `• 地表気温: *${p.tempC.toFixed(1)}°C*`,
      '',
      `⚡ *推奨ソーラーポンプ:*`,
      `• ユニット: *${p.pumpId}* (${p.pumpName})`,
      `• 日次目標水量: *${waterStr} L/day*`,
      `• 最適稼働時間: *${p.optimalWindow}*`,
      '',
      `_SOLVARA Sat-Alert により ${p.sentAt} に自動送信_`,
    ].join('\n');
  }

  if (p.lang === 'ko') {
    const statusTag =
      p.riskLevel === 'critical'
        ? '🚨 *SOLVARA 긴급 조기 경보*'
        : p.riskLevel === 'moderate'
        ? '⚠️ *SOLVARA 가뭄 주의보*'
        : '✅ *SOLVARA 일일 관개 브리핑*';
    return [
      statusTag,
      `📍 *지역:* ${p.locationName}`,
      `🗺️ *구역:* ${p.zoneName} (${p.region})`,
      `🛰️ *GPS:* ${p.coordsStr}`,
      '',
      `📊 *NASA POWER 위성 데이터:*`,
      `• 토양 수분: *${p.moisturePct}%*`,
      `• 태양 일사량: *${p.solarKwh.toFixed(2)} kWh/m²/day*`,
      `• 지표 기온: *${p.tempC.toFixed(1)}°C*`,
      '',
      `⚡ *권장 태양광 펌프:*`,
      `• 장치: *${p.pumpId}* (${p.pumpName})`,
      `• 일일 목표 수량: *${waterStr} L/day*`,
      `• 최적 가동 시간: *${p.optimalWindow}*`,
      '',
      `_SOLVARA Sat-Alert를 통해 ${p.sentAt}에 자동 발송됨_`,
    ].join('\n');
  }

  if (p.lang === 'it') {
    const statusTag =
      p.riskLevel === 'critical'
        ? '🚨 *ALLERTA CRITICA PRECOCE SOLVARA*'
        : p.riskLevel === 'moderate'
        ? '⚠️ *AVVISO SICCITÀ SOLVARA*'
        : '✅ *BOLLETTINO IRRIGAZIONE SOLVARA*';
    return [
      statusTag,
      `📍 *Regione:* ${p.locationName}`,
      `🗺️ *Distretto:* ${p.zoneName} (${p.region})`,
      `🛰️ *GPS:* ${p.coordsStr}`,
      '',
      `📊 *Dati Satellitari NASA POWER:*`,
      `• Umidità del Suolo: *${p.moisturePct}%*`,
      `• Radiazione Solare: *${p.solarKwh.toFixed(2)} kWh/m²/day*`,
      `• Temperatura: *${p.tempC.toFixed(1)}°C*`,
      '',
      `⚡ *Pompa Solare Consigliata:*`,
      `• Unità: *${p.pumpId}* (${p.pumpName})`,
      `• Obiettivo Idrico: *${waterStr} L/day*`,
      `• Orario Ottimale: *${p.optimalWindow}*`,
      '',
      `_Inviato automaticamente da SOLVARA Sat-Alert alle ${p.sentAt}_`,
    ].join('\n');
  }

  if (p.lang === 'th') {
    const statusTag =
      p.riskLevel === 'critical'
        ? '🚨 *การแจ้งเตือนภัยแล้งวิกฤต SOLVARA*'
        : p.riskLevel === 'moderate'
        ? '⚠️ *คำแนะนำเฝ้าระวังภัยแล้ง SOLVARA*'
        : '✅ *สรุปการชลประทานรายวัน SOLVARA*';
    return [
      statusTag,
      `📍 *ภูมิภาค:* ${p.locationName}`,
      `🗺️ *เขตพื้นที่:* ${p.zoneName} (${p.region})`,
      `🛰️ *GPS:* ${p.coordsStr}`,
      '',
      `📊 *ข้อมูลดาวเทียม NASA POWER:*`,
      `• ความชื้นดิน: *${p.moisturePct}%*`,
      `• รังสีดวงอาทิตย์: *${p.solarKwh.toFixed(2)} kWh/m²/day*`,
      `• อุณหภูมิผิวดิน: *${p.tempC.toFixed(1)}°C*`,
      '',
      `⚡ *คำแนะนำปั๊มน้ำโซลาร์:*`,
      `• อุปกรณ์: *${p.pumpId}* (${p.pumpName})`,
      `• เป้าหมายน้ำรายวัน: *${waterStr} L/day*`,
      `• ช่วงเวลาทำงานเหมาะสม: *${p.optimalWindow}*`,
      '',
      `_ส่งอัตโนมัติผ่าน SOLVARA Sat-Alert เวลา ${p.sentAt}_`,
    ].join('\n');
  }

  if (p.lang === 'sv') {
    const statusTag =
      p.riskLevel === 'critical'
        ? '🚨 *SOLVARA KRITISK TIDIG VARNING*'
        : p.riskLevel === 'moderate'
        ? '⚠️ *SOLVARA TORKRÅD*'
        : '✅ *SOLVARA DAGLIG BEVATTNINGSRAPPORT*';
    return [
      statusTag,
      `📍 *Region:* ${p.locationName}`,
      `🗺️ *Distrikt:* ${p.zoneName} (${p.region})`,
      `🛰️ *GPS:* ${p.coordsStr}`,
      '',
      `📊 *NASA POWER Satellitdata:*`,
      `• Markfuktighet: *${p.moisturePct}%*`,
      `• Solstrålning: *${p.solarKwh.toFixed(2)} kWh/m²/day*`,
      `• Yttemperatur: *${p.tempC.toFixed(1)}°C*`,
      '',
      `⚡ *Rekommenderad solpump:*`,
      `• Enhet: *${p.pumpId}* (${p.pumpName})`,
      `• Dagligt vattenmål: *${waterStr} L/day*`,
      `• Optimalt driftfönster: *${p.optimalWindow}*`,
      '',
      `_Automatiskt utskick via SOLVARA Sat-Alert kl. ${p.sentAt}_`,
    ].join('\n');
  }

  if (p.lang === 'no') {
    const statusTag =
      p.riskLevel === 'critical'
        ? '🚨 *SOLVARA KRITISK TIDLIG VARSEL*'
        : p.riskLevel === 'moderate'
        ? '⚠️ *SOLVARA TØRKEVARSEL*'
        : '✅ *SOLVARA DAGLIG VANNINGSRAPPORT*';
    return [
      statusTag,
      `📍 *Region:* ${p.locationName}`,
      `🗺️ *Distrikt:* ${p.zoneName} (${p.region})`,
      `🛰️ *GPS:* ${p.coordsStr}`,
      '',
      `📊 *NASA POWER Satellittdata:*`,
      `• Jordfuktighet: *${p.moisturePct}%*`,
      `• Solstråling: *${p.solarKwh.toFixed(2)} kWh/m²/day*`,
      `• Overflatetemp: *${p.tempC.toFixed(1)}°C*`,
      '',
      `⚡ *Anbefalt solpumpe:*`,
      `• Enhet: *${p.pumpId}* (${p.pumpName})`,
      `• Daglig vannmål: *${waterStr} L/day*`,
      `• Optimale driftstimer: *${p.optimalWindow}*`,
      '',
      `_Automatisk utsendelse via SOLVARA Sat-Alert kl. ${p.sentAt}_`,
    ].join('\n');
  }

  if (p.lang === 'nl') {
    const statusTag =
      p.riskLevel === 'critical'
        ? '🚨 *SOLVARA KRITIEKE VROEGE WAARSCHUWING*'
        : p.riskLevel === 'moderate'
        ? '⚠️ *SOLVARA DROOGTEADVIES*'
        : '✅ *SOLVARA DAGELIJKS IRRIGATIEBERICHT*';
    return [
      statusTag,
      `📍 *Regio:* ${p.locationName}`,
      `🗺️ *District:* ${p.zoneName} (${p.region})`,
      `🛰️ *GPS:* ${p.coordsStr}`,
      '',
      `📊 *NASA POWER Satellietdata:*`,
      `• Bodemvocht: *${p.moisturePct}%*`,
      `• Zonnestraling: *${p.solarKwh.toFixed(2)} kWh/m²/day*`,
      `• Oppervlaktetemp.: *${p.tempC.toFixed(1)}°C*`,
      '',
      `⚡ *Aanbevolen zonnepomp:*`,
      `• Eenheid: *${p.pumpId}* (${p.pumpName})`,
      `• Dagelijks waterdoel: *${waterStr} L/day*`,
      `• Optimale draaiuren: *${p.optimalWindow}*`,
      '',
      `_Automatisch verzonden via SOLVARA Sat-Alert om ${p.sentAt}_`,
    ].join('\n');
  }

  if (p.lang === 'de') {
    const statusTag =
      p.riskLevel === 'critical'
        ? '🚨 *SOLVARA KRITISCHE FRÜHWARNUNG*'
        : p.riskLevel === 'moderate'
        ? '⚠️ *SOLVARA DÜRREHINWEIS*'
        : '✅ *SOLVARA TÄGLICHER BEWÄSSERUNGSBERICHT*';
    return [
      statusTag,
      `📍 *Region:* ${p.locationName}`,
      `🗺️ *Bezirk:* ${p.zoneName} (${p.region})`,
      `🛰️ *GPS:* ${p.coordsStr}`,
      '',
      `📊 *NASA POWER Satellitendaten:*`,
      `• Bodenfeuchte: *${p.moisturePct}%*`,
      `• Sonneneinstrahlung: *${p.solarKwh.toFixed(2)} kWh/m²/day*`,
      `• Oberflächentemp.: *${p.tempC.toFixed(1)}°C*`,
      '',
      `⚡ *Empfohlene Solarpumpe:*`,
      `• Einheit: *${p.pumpId}* (${p.pumpName})`,
      `• Tageswasserziel: *${waterStr} L/day*`,
      `• Optimale Betriebszeiten: *${p.optimalWindow}*`,
      '',
      `_Automatischer Versand über SOLVARA Sat-Alert um ${p.sentAt}_`,
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
