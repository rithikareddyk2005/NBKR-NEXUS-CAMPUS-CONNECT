import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  TrendingUp,
  BookOpen,
  Code,
  Layers,
  ChevronRight
} from 'lucide-react';
import { StudentProfile } from '../types';

interface PlacementPrepProps {
  student: StudentProfile;
}

export const PlacementPrep: React.FC<PlacementPrepProps> = ({ student }) => {
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    contact: true,
    singlePage: true,
    actionVerbs: true,
    quantifiedMetrics: false,
    keywordsMatched: true,
    githubLinks: true,
    cgpaMentioned: true,
    certificationsVerified: true
  });

  const toggleCheck = (key: string) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const trueCount = Object.values(checklist).filter(Boolean).length;
  const atsScore = Math.round((trueCount / Object.keys(checklist).length) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30 text-xs font-semibold">
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            Resume Optimization &amp; Interview Roadmaps
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Placement Readiness &amp; ATS Resume Diagnostic
          </h2>
          <p className="text-xs text-slate-300">
            Audit your resume compliance against corporate ATS filters and follow structured interview roadmaps.
          </p>
        </div>

        {/* ATS Score Dial */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center shrink-0 w-full sm:w-auto">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">ATS Score Diagnostic</div>
          <div className={`text-3xl font-black ${atsScore >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
            {atsScore}%
          </div>
          <div className="text-[11px] text-slate-400">
            {atsScore >= 80 ? 'Strong Recruiter Pass Rate' : 'Improve Action Bullets'}
          </div>
        </div>
      </div>

      {/* Grid: Left ATS Checklist, Right Structured Roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: ATS Checklist */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              Corporate ATS Resume Checklist
            </h3>
            <p className="text-xs text-slate-400">
              Check off verified elements in your resume draft to update your campus readiness score.
            </p>

            <div className="space-y-2 pt-2">
              {[
                { id: 'contact', title: 'Professional Contact Info & LinkedIn / GitHub URL' },
                { id: 'singlePage', title: 'Single-page concise layout without tables/images in text' },
                { id: 'actionVerbs', title: 'Action verbs initiating every project bullet (Built, Optimized, Scaled)' },
                { id: 'quantifiedMetrics', title: 'Quantified metrics (e.g., Improved latency by 35%, 10k users)' },
                { id: 'keywordsMatched', title: 'Technical keywords aligned with target job description' },
                { id: 'githubLinks', title: 'Live demo / GitHub repository links for capstone projects' },
                { id: 'cgpaMentioned', title: 'Accurate autonomous CGPA and semester credits mentioned' },
                { id: 'certificationsVerified', title: 'Industry certifications (AWS, Oracle, NPTEL) with issue year' }
              ].map(item => (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-3 rounded-xl border cursor-pointer text-xs flex items-center justify-between transition-colors ${
                    checklist[item.id]
                      ? 'bg-slate-950/80 border-emerald-800/40 text-slate-200'
                      : 'bg-slate-950/30 border-slate-800 text-slate-400'
                  }`}
                >
                  <span>{item.title}</span>
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center border ${
                      checklist[item.id]
                        ? 'bg-emerald-600 border-emerald-500 text-white'
                        : 'border-slate-700'
                    }`}
                  >
                    {checklist[item.id] && '✓'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: 4-Stage Interview Preparation Roadmap */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              90-Day Placement Engineering Roadmap
            </h3>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-400">Phase 1: DSA Foundations (Weeks 1-4)</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300">Days 1–30</span>
                </div>
                <p className="text-xs text-slate-300">
                  Master Two Pointers, Sliding Window, Linked Lists, Binary Trees, and Recursion. Target 75 LeetCode medium questions.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-400">Phase 2: Core Engineering &amp; CS Fundamentals</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300">Days 31–60</span>
                </div>
                <p className="text-xs text-slate-300">
                  Review DBMS (Indexing, B+ Trees, Normalization), OS (Concurrency, Page Replacement), and Computer Networks (TCP/IP handshake).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-purple-400">Phase 3: System Design &amp; Full Stack Mock Projects</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300">Days 61–75</span>
                </div>
                <p className="text-xs text-slate-300">
                  Low-Level Design (SOLID principles, Factory, Strategy pattern) and High-Level Design (Load Balancers, Caching with Redis, Rate Limiters).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-400">Phase 4: Behavioral &amp; STAR Method Interview Drill</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300">Days 76–90</span>
                </div>
                <p className="text-xs text-slate-300">
                  Formulate Situation-Task-Action-Result narratives for conflict resolution, leadership, failure analysis, and company alignment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
