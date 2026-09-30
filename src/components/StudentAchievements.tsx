import React, { useState } from 'react';
import {
  Award,
  Sparkles,
  Trophy,
  FileCheck,
  CheckCircle2,
  ExternalLink,
  Plus
} from 'lucide-react';
import { StudentAchievement } from '../data/extendedData';

interface StudentAchievementsProps {
  achievements: StudentAchievement[];
}

export const StudentAchievements: React.FC<StudentAchievementsProps> = ({ achievements }) => {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-semibold">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            Hall of Fame &amp; Student Excellence
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Student Achievements &amp; Honours Registry
          </h2>
          <p className="text-xs text-slate-300">
            Showcase verified state hackathon victories, IEEE research publications, NPTEL national rankings, and patents.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          Submit Verified Achievement
        </button>
      </div>

      {/* Grid of Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {achievements.map(ach => (
          <div
            key={ach.id}
            className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {ach.category}
                </span>
                <span className="text-xs font-mono text-slate-400">{ach.date}</span>
              </div>

              <h3 className="text-base font-bold text-white mb-1.5">{ach.title}</h3>
              <div className="text-xs font-bold text-amber-400 mb-2">{ach.award}</div>

              <div className="text-xs text-slate-300 leading-relaxed mb-4">
                {ach.description}
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1 text-xs">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Achiever Details</div>
                <div className="font-bold text-white">{ach.studentName}</div>
                <div className="text-[11px] text-slate-400">
                  {ach.studentId} • {ach.department}
                </div>
              </div>
            </div>

            <div className="pt-3 mt-4 border-t border-slate-800 flex items-center justify-between text-[11px]">
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Credential
              </span>
              {ach.certificateRef && (
                <span className="font-mono text-slate-500">{ach.certificateRef}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Simple Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                Submit Student Achievement
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="text-slate-300">
              Submit your award, published paper, or competition victory along with proof documentation for verification by the Dean of Student Affairs.
            </p>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Achievement Title</label>
              <input
                type="text"
                placeholder="e.g. National Robotics Competition Winner"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Certificate / Proof Link</label>
              <input
                type="text"
                placeholder="https://drive.google.com/..."
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
              />
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  alert('Achievement submitted for administrative verification.');
                }}
                className="px-5 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold"
              >
                Submit for Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
