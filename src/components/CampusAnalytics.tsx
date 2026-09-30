import React from 'react';
import {
  TrendingUp,
  BarChart3,
  Users,
  Award,
  BookOpen,
  Wrench,
  CheckCircle2,
  Building
} from 'lucide-react';
import { Programme } from '../types';

interface CampusAnalyticsProps {
  programmes: Programme[];
}

export const CampusAnalytics: React.FC<CampusAnalyticsProps> = ({ programmes }) => {
  const btechProgs = programmes.filter(p => p.level === 'UG');
  const totalBTechIntake = btechProgs.reduce((acc, curr) => acc + curr.approved_intake, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-semibold mb-2">
          <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
          Institutional Intelligence &amp; Data Insights
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight">
          NBKRIST Campus Analytics &amp; Performance Metrics
        </h2>
        <p className="text-xs text-slate-300">
          Executive data overview spanning undergraduate admissions distribution, corporate recruitment performance, and campus infrastructure index.
        </p>
      </div>

      {/* Top 4 Macro Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-center">
          <div className="text-2xl font-black text-amber-400">1,410</div>
          <div className="text-xs text-slate-300 font-semibold mt-0.5">Approved B.Tech Intake</div>
          <div className="text-[10px] text-slate-400 mt-1">AY 2026–27 Catalog</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-center">
          <div className="text-2xl font-black text-emerald-400">150+</div>
          <div className="text-xs text-slate-300 font-semibold mt-0.5">Corporate Recruiters</div>
          <div className="text-[10px] text-slate-400 mt-1">Placement &amp; Training Cell</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-center">
          <div className="text-2xl font-black text-blue-400">48,075</div>
          <div className="text-xs text-slate-300 font-semibold mt-0.5">Audited Library Volumes</div>
          <div className="text-[10px] text-slate-400 mt-1">12,812 Unique Titles</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-center">
          <div className="text-2xl font-black text-purple-400">92.4%</div>
          <div className="text-xs text-slate-300 font-semibold mt-0.5">Grievance Resolution Rate</div>
          <div className="text-[10px] text-slate-400 mt-1">Avg 36h Turnaround</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* B.Tech Branch Intake Share */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-400" />
              Undergraduate Intake Distribution (B.Tech 2026–27)
            </h3>
            <span className="text-xs font-mono text-slate-400">{totalBTechIntake} Total Seats</span>
          </div>

          <div className="space-y-3 pt-2">
            {btechProgs.map(prog => {
              const pct = Math.round((prog.approved_intake / totalBTechIntake) * 100);

              return (
                <div key={prog.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200">
                      {prog.programme_name} ({prog.department_code})
                    </span>
                    <span className="font-mono text-amber-400">
                      {prog.approved_intake} seats ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Corporate Placement & Compensation Matrix */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              Recruitment Tiers &amp; CTC Ranges
            </h3>
            <span className="text-xs text-emerald-400 font-semibold">T&amp;P Verified</span>
          </div>

          <div className="space-y-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">Dream Super Tier</span>
                <span className="text-[11px] text-slate-400">Product Engineering &amp; AI Research</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-black text-amber-400">14.0 – 22.0 LPA</span>
                <span className="text-[10px] text-slate-500 block">TechNova &amp; Global Labs</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">Tier-1 High Potential</span>
                <span className="text-[11px] text-slate-400">FinTech &amp; Cloud Infrastructure</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-black text-emerald-400">9.5 – 13.5 LPA</span>
                <span className="text-[10px] text-slate-500 block">DataSphere, FinEdge</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">Core Engineering &amp; Tech</span>
                <span className="text-[11px] text-slate-400">Automotive, Energy &amp; Full Stack</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-black text-blue-400">6.5 – 8.5 LPA</span>
                <span className="text-[10px] text-slate-500 block">InnoSoft, CloudCore</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-800/30 text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Over 85% of eligible students successfully placed across recent cycles.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
