import React, { useState } from 'react';
import {
  Layers,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  UploadCloud,
  FileCheck,
  CheckCircle2,
  XCircle,
  Database,
  ExternalLink,
  Lock,
  Terminal,
  FileText
} from 'lucide-react';
import { apiService } from '../services/api';

interface AdminGovernanceProps {
  onResetComplete: () => void;
}

export const AdminGovernance: React.FC<AdminGovernanceProps> = ({ onResetComplete }) => {
  const [resetting, setResetting] = useState(false);
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  // CSV Ingestion State
  const [csvType, setCsvType] = useState<'faculty' | 'programme'>('programme');
  const [csvContent, setCsvContent] = useState('');
  const [validationResult, setValidationResult] = useState<any>(null);
  const [validating, setValidating] = useState(false);

  // Sample CSVs matching Sections 37 & 38
  const sampleProgrammeCSV = `programme_code,programme_name,level,department,academic_year,approved_intake,affiliating_body,source_url,verification_status
BTECH-CSE,B.Tech in Computer Science & Engineering,UG,CSE,2026-27,720,JNTUA Anantapuramu,https://www.nbkrist.org/programmes/btech,VERIFIED
BTECH-AIDS,B.Tech in AI & Data Science,UG,AIDS,2026-27,240,JNTUA Anantapuramu,https://www.nbkrist.org/programmes/btech,VERIFIED
MTECH-RAI,M.Tech in Robotics & AI,PG,ME,2026-27,18,JNTUA Anantapuramu,https://www.nbkrist.org/programmes/mtech,VERIFIED`;

  const sampleFacultyCSV = `employee_code,name,designation,department,email,phone,qualification,specialization,source_url,verification_status
NBKR-FAC-012,Dr. K. Balakrishna,Professor,ECE,drkbala@nbkrist.org,9849123456,Ph.D,Microwave Antennas,https://www.nbkrist.org/departments/ece,VERIFIED
NBKR-FAC-013,Dr. P. Haritha,Associate Professor,CSE,haritha.p@nbkrist.org,9440123789,Ph.D,Distributed Systems,https://www.nbkrist.org/departments/cse,VERIFIED`;

  const handleLoadSample = () => {
    if (csvType === 'programme') {
      setCsvContent(sampleProgrammeCSV);
    } else {
      setCsvContent(sampleFacultyCSV);
    }
  };

  const handleValidateCSV = async () => {
    if (!csvContent.trim()) {
      alert('Please enter or load CSV content to validate');
      return;
    }
    setValidating(true);
    setValidationResult(null);
    try {
      const res = await apiService.validateCSV(csvType, csvContent);
      setValidationResult(res);
    } catch (e: any) {
      alert(e.message || 'Validation error');
    } finally {
      setValidating(false);
    }
  };

  const handleResetDemoDatabase = async () => {
    if (!confirm('Execute Demo Database Reset? All demonstration student profiles, mock drives, and complaints will be restored to their baseline state.')) {
      return;
    }
    setResetting(true);
    setResetMessage(null);
    try {
      const res = await apiService.resetDemo();
      if (res.success) {
        setResetMessage(res.message);
        onResetComplete();
      } else {
        alert(res.error || 'Reset failed');
      }
    } catch (e: any) {
      alert(e.message || 'Failed to reset demo state');
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            Institutional Data Governance & Ingestion Hub
          </h2>
          <p className="text-xs text-slate-400">
            Enforces strict separation between verified institutional records (OFFICIAL_NBKR) and test sandbox data (DEMO).
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono">
            CLI: python -m app.db.seed
          </span>
        </div>
      </div>

      {/* Dual Environment Partitioning Matrix (Section 40 & 42) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* OFFICIAL_NBKR Container */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-800/40 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="text-sm font-black text-white">OFFICIAL_NBKR Environment</h3>
                <span className="text-[10px] text-emerald-400 font-semibold">
                  Source: https://www.nbkrist.org/
                </span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
              IMMUTABLE
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
              <span className="text-slate-300">Audited Institution Profile</span>
              <strong className="text-emerald-400">1 Record (NAAC &apos;A&apos;, NBA)</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
              <span className="text-slate-300">Academic Departments</span>
              <strong className="text-emerald-400">9 Engineering &amp; Science Units</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
              <span className="text-slate-300">AY 2026–27 Approved Programmes</span>
              <strong className="text-emerald-400">15 Catalogued (1,690 Seats)</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
              <span className="text-slate-300">Institutional Leadership &amp; HODs</span>
              <strong className="text-emerald-400">11 Verified Personnel</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
              <span className="text-slate-300">Campus Facilities &amp; Utilities</span>
              <strong className="text-emerald-400">18 Audited Facilities</strong>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 italic">
            * Official institutional data cannot be overwritten by demo operations.
          </div>
        </div>

        {/* DEMO Environment Container */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-amber-800/40 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="text-sm font-black text-white">DEMO Environment</h3>
                <span className="text-[10px] text-amber-400 font-semibold">
                  Fictional Evaluation Sandbox
                </span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
              RESETTABLE
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
              <span className="text-slate-300">Demo User Personas</span>
              <strong className="text-amber-400">4 Accounts (Student/Fac/Adm/T&amp;P)</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
              <span className="text-slate-300">Demo Student Profiles</span>
              <strong className="text-amber-400">5 Students with CGPA &amp; Skills</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
              <span className="text-slate-300">Campus Recruitment Drives</span>
              <strong className="text-amber-400">5 Mock Corporate Drives</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
              <span className="text-slate-300">Academic Deadlines</span>
              <strong className="text-amber-400">5 Assignments &amp; Lab Records</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
              <span className="text-slate-300">Grievance &amp; Complaints</span>
              <strong className="text-amber-400">4 Lifecycle Maintenance Tickets</strong>
            </div>
          </div>

          {/* Protected Demo Reset Button (Section 35) */}
          <div className="pt-2">
            <button
              type="button"
              disabled={resetting}
              onClick={handleResetDemoDatabase}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs flex items-center justify-center gap-2 border border-amber-600/30 transition-all disabled:opacity-50"
            >
              <RotateCcw className={`w-4 h-4 ${resetting ? 'animate-spin' : ''}`} />
              <span>{resetting ? 'Resetting Demo State...' : 'Reset Demo Database (Section 35 Safeguard)'}</span>
            </button>
            {resetMessage && (
              <div className="text-xs text-emerald-400 font-semibold mt-2 text-center">
                ✓ {resetMessage}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CSV Ingestion Simulator (Section 36, 37, 38) */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-amber-400" />
              Administrative CSV Ingestion &amp; Schema Validator
            </h3>
            <p className="text-xs text-slate-400">
              Validates institutional additions against official database schemas before publishing.
            </p>
          </div>

          {/* CSV Type Selector */}
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => {
                setCsvType('programme');
                setCsvContent('');
                setValidationResult(null);
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                csvType === 'programme'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              Programme Schema (Sec. 38)
            </button>
            <button
              type="button"
              onClick={() => {
                setCsvType('faculty');
                setCsvContent('');
                setValidationResult(null);
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                csvType === 'faculty'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              Faculty Schema (Sec. 37)
            </button>
          </div>
        </div>

        {/* Expected Schema Pill */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300">
          <span className="text-amber-400 font-bold uppercase tracking-wider block mb-1">
            Mandatory {csvType.toUpperCase()} Column Specification:
          </span>
          {csvType === 'programme' ? (
            <span>programme_code,programme_name,level,department,academic_year,approved_intake,affiliating_body,source_url,verification_status</span>
          ) : (
            <span>employee_code,name,designation,department,email,phone,qualification,specialization,source_url,verification_status</span>
          )}
        </div>

        {/* CSV Editor Area */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Paste CSV Raw Data:</span>
            <button
              type="button"
              onClick={handleLoadSample}
              className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2"
            >
              Load Official Sample CSV
            </button>
          </div>

          <textarea
            rows={5}
            value={csvContent}
            onChange={e => setCsvContent(e.target.value)}
            placeholder="Paste comma-separated rows with column header..."
            className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            disabled={validating || !csvContent.trim()}
            onClick={handleValidateCSV}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50"
          >
            <FileCheck className="w-4 h-4" />
            {validating ? 'Validating CSV...' : 'Validate & Preview Ingestion'}
          </button>
        </div>

        {/* Validation Result & Preview */}
        {validationResult && (
          <div className={`p-4 rounded-xl border space-y-3 ${
            validationResult.success
              ? 'bg-emerald-950/20 border-emerald-800/40'
              : 'bg-red-950/20 border-red-800/40'
          }`}>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                {validationResult.success ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
                <span className="font-bold text-white">
                  {validationResult.success ? 'Schema Validation Passed!' : 'Schema Validation Failed'}
                </span>
              </div>
              <div className="text-slate-300 font-mono text-[11px]">
                Valid Rows: {validationResult.validRows} / {validationResult.totalRows}
              </div>
            </div>

            {validationResult.errors && validationResult.errors.length > 0 && (
              <div className="p-3 rounded-lg bg-red-950/50 border border-red-800/40 text-xs text-red-300 space-y-1">
                {validationResult.errors.map((err: string, i: number) => (
                  <div key={i}>• {err}</div>
                ))}
              </div>
            )}

            {validationResult.preview && validationResult.preview.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  Ingestion Record Preview:
                </div>
                <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-950 text-slate-400 text-[10px] uppercase">
                      <tr>
                        {Object.keys(validationResult.preview[0]).slice(0, 5).map(col => (
                          <th key={col} className="p-2 border-b border-slate-800">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {validationResult.preview.map((rec: any, idx: number) => (
                        <tr key={idx} className="bg-slate-900/60 text-slate-200">
                          {Object.values(rec).slice(0, 5).map((val: any, vIdx: number) => (
                            <td key={vIdx} className="p-2">{String(val)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
