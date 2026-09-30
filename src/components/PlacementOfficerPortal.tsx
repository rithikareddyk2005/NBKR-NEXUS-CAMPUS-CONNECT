import React, { useState } from 'react';
import {
  Briefcase,
  Users,
  Award,
  Plus,
  CheckCircle2,
  TrendingUp,
  Building,
  Calendar,
  Filter
} from 'lucide-react';
import { PlacementDrive, PlacementCompany, StudentProfile } from '../types';

interface PlacementOfficerPortalProps {
  drives: PlacementDrive[];
  companies: PlacementCompany[];
  students: StudentProfile[];
  onOpenCreateDrive: () => void;
}

export const PlacementOfficerPortal: React.FC<PlacementOfficerPortalProps> = ({
  drives,
  companies,
  students,
  onOpenCreateDrive
}) => {
  const totalApplicants = drives.reduce((acc, curr) => acc + curr.total_applicants, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
            <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
            Training &amp; Placement Cell Command
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Placement Officer Operations Portal
          </h2>
          <p className="text-xs text-slate-300">
            Schedule on-campus drives, set eligibility filters, evaluate applicant pools, and liaise with corporate recruiters.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenCreateDrive}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          Schedule New Recruitment Drive
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-center">
          <div className="text-2xl font-black text-amber-400">{drives.length}</div>
          <div className="text-xs text-slate-300 font-semibold mt-0.5">Active Campus Drives</div>
          <div className="text-[10px] text-slate-400 mt-1">October–November 2026</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-center">
          <div className="text-2xl font-black text-emerald-400">{totalApplicants}</div>
          <div className="text-xs text-slate-300 font-semibold mt-0.5">Total Registered Candidates</div>
          <div className="text-[10px] text-slate-400 mt-1">Across all branches</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-center">
          <div className="text-2xl font-black text-blue-400">{companies.length}</div>
          <div className="text-xs text-slate-300 font-semibold mt-0.5">Corporate Partners</div>
          <div className="text-[10px] text-slate-400 mt-1">Dream &amp; Tier-1 hiring</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-center">
          <div className="text-2xl font-black text-purple-400">14.5 LPA</div>
          <div className="text-xs text-slate-300 font-semibold mt-0.5">Top CTC Current Drive</div>
          <div className="text-[10px] text-slate-400 mt-1">TechNova Solutions</div>
        </div>
      </div>

      {/* Drives Management Table */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Building className="w-4 h-4 text-amber-400" />
          Scheduled Recruitment Drives Roster
        </h3>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 text-[10px] uppercase font-mono">
              <tr>
                <th className="p-2.5 border-b border-slate-800">Drive ID</th>
                <th className="p-2.5 border-b border-slate-800">Company &amp; Role</th>
                <th className="p-2.5 border-b border-slate-800">Package</th>
                <th className="p-2.5 border-b border-slate-800">Min CGPA</th>
                <th className="p-2.5 border-b border-slate-800">Allowed Branches</th>
                <th className="p-2.5 border-b border-slate-800">Date</th>
                <th className="p-2.5 border-b border-slate-800">Registered</th>
                <th className="p-2.5 border-b border-slate-800">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {drives.map(d => (
                <tr key={d.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-2.5 font-mono text-amber-400 font-bold">{d.id}</td>
                  <td className="p-2.5">
                    <span className="font-bold text-white block">{d.company_name}</span>
                    <span className="text-[11px] text-slate-400">{d.job_title}</span>
                  </td>
                  <td className="p-2.5 font-black text-emerald-400">{d.ctc}</td>
                  <td className="p-2.5 font-bold text-slate-200">{d.eligibility.minimum_cgpa}</td>
                  <td className="p-2.5">
                    <div className="flex flex-wrap gap-1 max-w-[180px]">
                      {d.eligibility.allowed_branches.map(b => (
                        <span key={b} className="text-[9px] px-1 rounded bg-slate-800 text-slate-300">
                          {b}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-2.5 text-slate-300">{d.drive_date}</td>
                  <td className="p-2.5 font-bold text-white">{d.total_applicants} Candidates</td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
