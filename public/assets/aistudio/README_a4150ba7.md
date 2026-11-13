# ☀️ SOLVARA — Planetary Agrivoltaics & Solar Irrigation

**NASA International Space Apps Challenge 2026 Submission**  
*An interactive satellite telemetry, global agrivoltaics, and precision solar irrigation command platform powered by NASA Earth observation data—engineered to forecast droughts, prevent peatland fires, and optimize clean-energy water pumping in Pontianak, West Kalimantan, Indonesia, and agricultural districts worldwide.*

---

## 📖 Project Overview

Climate change triggers sudden droughts, extreme heatwaves, and rising fuel costs that threaten crop yields and food security—particularly in equatorial alluvial and peatland regions like **Pontianak, West Kalimantan, Indonesia**. **SOLVARA** bridges the gap between raw satellite telemetry and actionable field decisions.

By integrating **agrivoltaics** (overhead solar panels paired with crop cultivation) with **real-time NASA satellite data**, SOLVARA reduces soil moisture evaporation while generating clean solar power to dispatch off-grid irrigation pumps before crops reach critical wilting thresholds or peatlands ignite.

---

## ✨ Core Modules & Features

### 1. 🗺️ Drought & Pump Map (Global + Pontianak Precision)
* **Live NASA POWER Satellite Integration (`services/nasaPower.ts`):** Fetches real-time solar irradiance, rainfall, and soil wetness data globally, featuring real district name detection and **5 NASA Global Partner Presets** alongside Pontianak agricultural zones (*Sungai Beliung, Siantan Hilir, Parit Tokaya, Tanjung Hulu*).
* **Peatland Fire & Drought Early Warning:** Monitors moisture deficits to issue early risk alerts for agricultural droughts and peatland wildfires.
* **🤖 SOLVARA AI Agronomist Advisor:** Built-in intelligent assistant that automatically analyzes selected zone telemetry to provide concise irrigation schedules, peatland fire prevention steps, and ROI summaries.

### 2. 💧 Precision Irrigation Ops & Climate Simulator
* **Real-Time Field Stress Heatmap:** Visualizes 140 micro-plots with an interactive **Emergency Irrigation Simulation** tracking hydration recovery and clean energy allocation (5.4 kW VFD pump dispatch).
* **🎛️ Interactive "What-If" Extreme Weather Simulator:** Sliders allowing farmers and policymakers to stress-test prolonged dry spells or heatwaves and observe real-time water and solar energy impacts.

### 3. ⚡ Agrivoltaic Intelligence & Farmer Cost Calculator
* **Solar Array Sizing & Cost-Savings Calculator (IDR / Rp):** Calculates optimal solar PV capacity, daily water pumped, and monthly fuel savings for smallholder farmers.
* **Multi-Criteria Spatial Feasibility Scoring:** Evaluates dual-use solar farming potential across the **Kapuas Equatorial Basin** based on irradiance, groundwater depth, soil carbon, and grid proximity.

### 4. 📱 Farmer Accessibility & UI/UX
* **WhatsApp Farmer Alert Simulation:** Interactive mobile phone preview displaying localized emergency pump activation and fire-risk alerts for farmers.
* **Global Language Selector (`src/translations.ts`) & Dark/Light Mode:** Seamless multi-language support (including English, Indonesian, and Arabic) with adaptive Dark/Light themes.

---

## 🛰️ NASA Data & APIs Used

SOLVARA integrates authentic open-access Earth observation datasets provided by NASA:

1. **NASA POWER API (Prediction Of Worldwide Energy Resources)**
   * **Endpoint:** `https://power.larc.nasa.gov/api/`
   * **Parameters:**
     * `ALLSKY_SFC_SW_DWN` *(CERES SYN1deg)*: All-Sky Surface Shortwave Downward Irradiance ($\text{MJ/m}^2\text{/day}$ or $\text{kWh/m}^2\text{/day}$) to compute solar array generation and pumping capacity.
     * `PRECTOTCORR` *(MERRA-2)*: Bias-corrected daily precipitation ($\text{mm/day}$) to track rainfall deficits.
     * `GWETTOP` *(MERRA-2)*: Surface soil wetness (0–1 scale) to trigger automated solar irrigation.
2. **NASA SMAP (Soil Moisture Active Passive):**
   * Used as the baseline telemetry framework for volumetric soil moisture modeling (0–5 cm) and 7-day drought deficit trends.

*Primary Case Study Coordinates:* **Sungai Beliung, Pontianak, West Kalimantan, Indonesia** (`Latitude: -0.0677`, `Longitude: 109.2400`).

---

## 🛠️ Tech Stack & Project Structure

* **Frontend:** React, TypeScript, Vite, Tailwind CSS
* **Data & Localization:** Live NASA POWER JSON API (`services/nasaPower.ts`), Multi-language Engine (`src/translations.ts`), Zero-Dependency Custom SVG Visualizations
* **Live App Preview (Google AI Studio):** [View SOLVARA in AI Studio](https://ai.studio)

---

## 🚀 Run Locally

### Prerequisites
* Node.js (v18 or higher)

### Steps
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Configure environment variables:**
   Copy `.env.example` to `.env.local` and add your Gemini API key if required:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```

---

## 🤖 AI Usage Disclosure

In accordance with **NASA International Space Apps Challenge** rules, generative AI tools (Google AI Studio, Bolt.new, and LLM coding assistants) were utilized during the hackathon event to accelerate React/TypeScript prototyping, structure interactive climate simulations, localize multi-language interfaces, and assist with NASA POWER API integration. All scientific parameters, agronomic logic, and local Pontianak geospatial research were curated and verified by Team AFISKU.

---

## 👥 Team AFISKU (6 Members)

Developed collaboratively by **Team AFISKU**:
1. **Asyraf Khairul Azam** – Project Lead, System Architecture & NASA Data Integration
2. **Muhammad Arkan Syahid Purnomo** – Geospatial Research & Agricultural Analysis
3. **Fazrul Agung Pramana** – UI/UX Review & Content Documentation
4. **Andi Arzaschel Nezarsyah** – English Translation & Project Page Management
5. **Fathan Darrel Salim** – Video Storyboarding & Voiceover
6. **Nabil Maulana Fikri** – Quality Assurance & Submission Verification

---
*Developed for the NASA International Space Apps Challenge 2026.*