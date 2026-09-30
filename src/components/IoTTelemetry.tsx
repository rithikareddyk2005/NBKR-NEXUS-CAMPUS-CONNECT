import React from 'react';
import {
  Sun,
  Droplets,
  Wifi,
  CloudRain,
  Activity,
  CheckCircle2,
  Cpu,
  Zap,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { IoTTelemetryData } from '../data/extendedData';

interface IoTTelemetryProps {
  telemetry: IoTTelemetryData;
}

export const IoTTelemetry: React.FC<IoTTelemetryProps> = ({ telemetry }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            Smart Campus Infrastructure &amp; Green IoT
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Future IoT Campus Telemetry &amp; Energy Grid
          </h2>
          <p className="text-xs text-slate-300">
            Real-time sensor telemetry tracking the 500 kW rooftop solar array, campus water treatment plant, optical Wi-Fi backbone, and ambient environmental stations.
          </p>
        </div>

        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-mono">Live Ingestion Telemetry Active</span>
        </div>
      </div>

      {/* 4 Sensor Grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Panel 1: 500 kW Solar Array */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="text-sm font-bold text-white">500 kW Rooftop Solar Power Plant</h3>
                <span className="text-[10px] text-slate-400">Rooftop arrays across all academic blocks</span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
              {telemetry.solar.efficiency}% Efficiency
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Instantaneous Power</span>
              <span className="text-2xl font-black text-amber-400">{telemetry.solar.currentKw} kW</span>
              <span className="text-[10px] text-slate-500 block">Peak: {telemetry.solar.peakKw} kW</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Energy Yield Today</span>
              <span className="text-2xl font-black text-emerald-400">{telemetry.solar.kwhToday} kWh</span>
              <span className="text-[10px] text-emerald-400 block">CO2 Saved: {telemetry.solar.co2SavedKg} kg</span>
            </div>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
              style={{ width: `${(telemetry.solar.currentKw / telemetry.solar.peakKw) * 100}%` }}
            />
          </div>
        </div>

        {/* Panel 2: RO Water Plant */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-400" />
              <div>
                <h3 className="text-sm font-bold text-white">Industrial RO Water Treatment Facility</h3>
                <span className="text-[10px] text-slate-400">10,000 L/hr automated potable filtration</span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/30">
              TDS: {telemetry.roPlant.tdsPpm} PPM (Pure)
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Storage Tank Capacity</span>
              <span className="text-2xl font-black text-blue-400">{telemetry.roPlant.tankLevelPct}%</span>
              <span className="text-[10px] text-slate-500 block">Flow: {telemetry.roPlant.flowRateLph.toLocaleString()} L/hr</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Dispersed Today</span>
              <span className="text-2xl font-black text-slate-200">{telemetry.roPlant.totalPurifiedTodayLiters.toLocaleString()} L</span>
              <span className="text-[10px] text-emerald-400 block">{telemetry.roPlant.filterHealth}</span>
            </div>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
              style={{ width: `${telemetry.roPlant.tankLevelPct}%` }}
            />
          </div>
        </div>

        {/* Panel 3: Optical Wi-Fi Network */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Wifi className="w-5 h-5 text-purple-400" />
              <div>
                <h3 className="text-sm font-bold text-white">Campus Optical Fiber Wi-Fi Grid</h3>
                <span className="text-[10px] text-slate-400">200 Mbps dedicated optical backbone</span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">
              {telemetry.network.latencyMs} ms Latency
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Live Throughput</span>
              <span className="text-2xl font-black text-purple-400">{telemetry.network.currentThroughputMbps} Mbps</span>
              <span className="text-[10px] text-slate-500 block">Capacity: {telemetry.network.bandwidthCapacityMbps} Mbps</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Active Connections</span>
              <span className="text-2xl font-black text-slate-200">{telemetry.network.connectedClients}</span>
              <span className="text-[10px] text-slate-400 block">{telemetry.network.activeAccessPoints} APs Active</span>
            </div>
          </div>
        </div>

        {/* Panel 4: Environmental & Weather Station */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <CloudRain className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="text-sm font-bold text-white">Vidyanagar Campus Environmental Station</h3>
                <span className="text-[10px] text-slate-400">Lush 250+ acre green canopy</span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              AQI: {telemetry.environment.aqi} ({telemetry.environment.aqiStatus})
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Ambient Temperature</span>
              <span className="text-2xl font-black text-amber-400">{telemetry.environment.temperatureC} °C</span>
              <span className="text-[10px] text-slate-500 block">Pleasant microclimate</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Relative Humidity</span>
              <span className="text-2xl font-black text-blue-400">{telemetry.environment.humidityPct}%</span>
              <span className="text-[10px] text-slate-500 block">Clean coastal breeze</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
