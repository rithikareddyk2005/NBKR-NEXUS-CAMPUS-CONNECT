import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Clock,
  Building,
  Layers,
  Search,
  CheckCircle2,
  Navigation,
  Info,
  ExternalLink
} from 'lucide-react';
import { CampusLocation } from '../data/extendedData';

interface CampusNavigationProps {
  locations: CampusLocation[];
}

export const CampusNavigation: React.FC<CampusNavigationProps> = ({ locations }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeLocation, setActiveLocation] = useState<CampusLocation>(locations[0] || null);

  const categories = ['ALL', 'ACADEMIC', 'ADMIN', 'FACILITY', 'SPORTS'];

  const filteredLocations = locations.filter(loc => {
    const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.keyFacilities.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategory === 'ALL' || loc.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner with Entrance Arch */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 p-6 md:p-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-semibold">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              250+ Acre Sprawling Green Campus Navigator
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              NBKRIST Campus Spatial Map &amp; Block Navigator
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Find classrooms, computing centers, research laboratories, residential hostels, library stacks, and sports arenas with estimated walking times from the Grand Entrance Gate.
            </p>
          </div>

          <div className="shrink-0 w-full lg:w-72 h-36 rounded-xl overflow-hidden border border-slate-700/80 shadow-lg relative group">
            <img
              src="/images/nbkrist-main.jpg"
              alt="NBKRIST Main Entrance Arch"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent flex items-end p-2.5">
              <span className="text-[11px] font-bold text-white drop-shadow">
                Grand Entrance Arch (Vidyanagar Gate)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search block, lab, or facility..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Location Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLocations.map(loc => (
          <div
            key={loc.id}
            className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700">
                  {loc.code}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {loc.category}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white mb-1.5">{loc.name}</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                {loc.description}
              </p>

              <div className="space-y-1.5 text-xs mb-3">
                <div className="flex items-center gap-1.5 text-amber-400 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{loc.walkingTimeFromMainGate}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Layers className="w-3.5 h-3.5 text-slate-500" />
                  <span>{loc.floors} Floors Building</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  Key Labs &amp; Facilities Located Here:
                </div>
                <div className="flex flex-wrap gap-1">
                  {loc.keyFacilities.map(f => (
                    <span
                      key={f}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">Verified Campus Block</span>
              <button
                type="button"
                onClick={() => alert(`Directions to ${loc.name}: Walk north from Main Entrance Gate along the central avenue for ${loc.walkingTimeFromMainGate}.`)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold text-[11px] flex items-center gap-1 transition-colors"
              >
                <Navigation className="w-3 h-3" />
                Directions
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
