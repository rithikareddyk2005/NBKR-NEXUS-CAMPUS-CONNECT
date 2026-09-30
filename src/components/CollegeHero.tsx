import React from 'react';
import {
  ShieldCheck,
  Compass,
  Briefcase,
  Sparkles,
  Presentation,
  BookOpen,
  Coffee,
  Building,
  Calendar,
  Layers,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Institution } from '../types';

interface CollegeHeroProps {
  institution: Institution;
  onNavigateTab: (tab: string) => void;
}

export const CollegeHero: React.FC<CollegeHeroProps> = ({
  institution,
  onNavigateTab
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl mb-8">
      {/* Background Entrance Arch Image with Gradient Overlay */}
      <div className="relative h-72 sm:h-80 md:h-96 w-full overflow-hidden">
        <img
          src="/images/nbkrist-main.jpg"
          onError={(e) => {
            // fallback to arch if main fails
            (e.target as HTMLImageElement).src = '/images/nbkrist-arch.jpg';
          }}
          alt="N.B.K.R. Institute of Science & Technology Grand Entrance Arch"
          className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.1] transform hover:scale-105 transition-transform duration-700"
        />

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent" />

        {/* Content Floating over the Image */}
        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
          <div className="max-w-4xl space-y-3">
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                AUTONOMOUS INSTITUTE
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-900/80 text-slate-200 border border-slate-700 text-xs font-semibold backdrop-blur-md">
                Estd. 1979 • 47+ Years of Academic Excellence
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold backdrop-blur-md">
                NAAC &apos;A&apos; Grade • NBA Accredited
              </span>
            </div>

            {/* Main Title & Crest Duo */}
            <div className="flex items-center gap-4 pt-1">
              {/* College Logo / Emblem with "WORK IS WORSHIP" */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white p-1 shrink-0 shadow-2xl shadow-black/80 flex items-center justify-center border-2 border-amber-500/60">
                <img
                  src="/images/nbkrist-logo.jpg"
                  alt="N.B.K.R. Institute of Science & Technology Emblem"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback to stylized SVG badge if image load fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  N.B.K.R. Institute of Science &amp; Technology
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 font-medium flex items-center gap-2 mt-1">
                  <span>Vidyanagar, Kota Mandal, Nellore District, Andhra Pradesh - 524413</span>
                  <span className="hidden md:inline">•</span>
                  <span className="hidden md:inline text-amber-400 font-bold">Motto: Work is Worship</span>
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => onNavigateTab('navigation')}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all"
              >
                <Compass className="w-4 h-4" />
                Explore 250+ Acre Campus Map
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('placement')}
                className="px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center gap-1.5 backdrop-blur-md transition-all"
              >
                <Briefcase className="w-4 h-4 text-emerald-400" />
                Placement Drive Radar
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('slides')}
                className="px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center gap-1.5 backdrop-blur-md transition-all"
              >
                <Presentation className="w-4 h-4 text-amber-400" />
                Google Slides Hub
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('ai_copilot')}
                className="px-4 py-2 rounded-xl bg-purple-950/80 hover:bg-purple-900/80 text-purple-200 border border-purple-800/60 font-semibold text-xs flex items-center gap-1.5 backdrop-blur-md transition-all"
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                Ask Nexus AI Copilot
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('canteen')}
                className="px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center gap-1.5 backdrop-blur-md transition-all"
              >
                <Coffee className="w-4 h-4 text-amber-400" />
                Live Canteen Menu
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Matrix Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800 bg-slate-950 border-t border-slate-800 text-xs">
        <button
          type="button"
          onClick={() => onNavigateTab('classrooms')}
          className="p-3.5 text-left hover:bg-slate-900/70 transition-colors group flex items-center justify-between"
        >
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Classroom Hub</div>
            <div className="font-bold text-white group-hover:text-amber-400 transition-colors">Smart Room Availability</div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400" />
        </button>

        <button
          type="button"
          onClick={() => onNavigateTab('lost_found')}
          className="p-3.5 text-left hover:bg-slate-900/70 transition-colors group flex items-center justify-between"
        >
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Campus Care</div>
            <div className="font-bold text-white group-hover:text-amber-400 transition-colors">Lost &amp; Found Registry</div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400" />
        </button>

        <button
          type="button"
          onClick={() => onNavigateTab('assessments')}
          className="p-3.5 text-left hover:bg-slate-900/70 transition-colors group flex items-center justify-between"
        >
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Placement Prep</div>
            <div className="font-bold text-white group-hover:text-amber-400 transition-colors">Mock Technical Assessment</div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400" />
        </button>

        <button
          type="button"
          onClick={() => onNavigateTab('iot')}
          className="p-3.5 text-left hover:bg-slate-900/70 transition-colors group flex items-center justify-between"
        >
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Smart Campus IoT</div>
            <div className="font-bold text-white group-hover:text-amber-400 transition-colors">Solar &amp; RO Telemetry</div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400" />
        </button>
      </div>
    </div>
  );
};
