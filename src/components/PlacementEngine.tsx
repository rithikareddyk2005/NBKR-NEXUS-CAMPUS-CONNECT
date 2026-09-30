import React, { useState } from 'react';
import {
  Briefcase,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Building,
  Calendar,
  DollarSign,
  ChevronRight,
  Filter,
  Plus,
  Send,
  Award,
  Sparkles,
  Users,
  Search
} from 'lucide-react';
import {
  PlacementCompany,
  PlacementDrive,
  StudentProfile,
  UserSession
} from '../types';
import { apiService } from '../services/api';

interface PlacementEngineProps {
  companies: PlacementCompany[];
  drives: PlacementDrive[];
  currentStudent: StudentProfile;
  currentSession: UserSession;
  onRefreshDrives: () => void;
  onRefreshStudent: () => void;
}

export const PlacementEngine: React.FC<PlacementEngineProps> = ({
  companies,
  drives,
  currentStudent,
  currentSession,
  onRefreshDrives,
  onRefreshStudent
}) => {
  const [selectedDrive, setSelectedDrive] = useState<PlacementDrive>(drives[0] || null);
  const [eligibilityResult, setEligibilityResult] = useState<any>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [applySuccessMessage, setApplySuccessMessage] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  // New Drive Form State (Placement Officer)
  const [newCompany, setNewCompany] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newCtc, setNewCtc] = useState('10.0 LPA CTC');
  const [newMinCgpa, setNewMinCgpa] = useState('7.0');
  const [newBranches, setNewBranches] = useState('CSE, IT, AIML, AIDS');
  const [newSkills, setNewSkills] = useState('Python, SQL');
  const [newMaxBacklogs, setNewMaxBacklogs] = useState('0');

  // Trigger evaluation whenever selectedDrive or currentStudent changes
  const runEligibilityCheck = async (drive: PlacementDrive) => {
    setSelectedDrive(drive);
    setIsEvaluating(true);
    setApplySuccessMessage(null);
    try {
      const result = await apiService.checkEligibility(currentStudent.student_id, drive.id);
      setEligibilityResult(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleApply = async () => {
    if (!selectedDrive) return;
    try {
      const res = await apiService.applyToDrive(currentStudent.student_id, selectedDrive.id);
      if (res.success) {
        setApplySuccessMessage(`Application confirmed for ${selectedDrive.company_name}!`);
        onRefreshStudent();
        onRefreshDrives();
        // re-run check
        runEligibilityCheck(selectedDrive);
      } else {
        alert(res.error || 'Failed to apply');
      }
    } catch (e: any) {
      alert(e.message || 'Error submitting application');
    }
  };

  const handleCreateDrive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany || !newRole) {
      alert('Please enter company and job title');
      return;
    }

    const payload = {
      company_name: newCompany,
      job_title: newRole,
      ctc: newCtc,
      minimum_cgpa: parseFloat(newMinCgpa) || 7.0,
      allowed_branches: newBranches.split(',').map(b => b.trim().toUpperCase()),
      required_skills: newSkills.split(',').map(s => s.trim()),
      maximum_backlogs: parseInt(newMaxBacklogs, 10) || 0,
      drive_date: '2026-11-10',
      deadline_date: '2026-11-01'
    };

    const res = await apiService.createDrive(payload);
    if (res.success) {
      setShowCreateModal(false);
      onRefreshDrives();
      alert(`Recruitment drive for ${newCompany} created successfully.`);
    }
  };

  const hasApplied = currentStudent.applied_drives.some(
    ad => ad.drive_id === selectedDrive?.id
  );

  return (
    <div className="space-y-6">
      {/* Strict DEMO Banner (Section 41 Compliance) */}
      <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-200">
          <strong className="block text-amber-300 font-bold uppercase tracking-wider text-[11px] mb-0.5">
            DEMO ENVIRONMENT • Placement Intelligence Engine
          </strong>
          All displayed corporate recruitment drives, CTC figures, applicant logs, and student eligibility evaluations are demonstration data strictly separated from official NBKRIST institutional records.
        </div>
      </div>

      {/* Header & Quick Placement Metrics */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-amber-400" />
            Campus Placement Intelligence & Drive Radar
          </h2>
          <p className="text-xs text-slate-400">
            Real-time candidate-to-drive criteria matching with algorithmic qualification breakdown.
          </p>
        </div>

        {currentSession.role === 'PLACEMENT_OFFICER' && (
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            Schedule New Drive (Officer Mode)
          </button>
        )}
      </div>

      {/* Main Placement Workspace: Left Drive List, Right Real-Time Eligibility Evaluator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Drives Roster */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider px-1 flex items-center justify-between">
            <span>Upcoming Recruitment Drives ({drives.length})</span>
            <span className="text-[10px] text-slate-400">Click drive to check fit</span>
          </div>

          <div className="space-y-3">
            {drives.map(drive => {
              const isSelected = selectedDrive?.id === drive.id;
              const isAppliedForThis = currentStudent.applied_drives.some(ad => ad.drive_id === drive.id);

              return (
                <div
                  key={drive.id}
                  onClick={() => runEligibilityCheck(drive)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-amber-500/80 shadow-md shadow-amber-500/10'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-sm font-bold text-white flex items-center gap-2">
                      <Building className="w-4 h-4 text-amber-400" />
                      {drive.company_name}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      {drive.ctc}
                    </span>
                  </div>

                  <div className="text-xs text-slate-300 font-medium mb-3">{drive.job_title}</div>

                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      Drive: {drive.drive_date}
                    </span>
                    <span>•</span>
                    <span>Min CGPA: <strong className="text-slate-200">{drive.eligibility.minimum_cgpa}</strong></span>
                    <span>•</span>
                    <span>{drive.total_applicants} Applicants</span>
                  </div>

                  <div className="flex items-center justify-between pt-2.5 border-t border-slate-800/80 text-xs">
                    <div className="flex flex-wrap gap-1">
                      {drive.eligibility.allowed_branches.slice(0, 3).map(b => (
                        <span key={b} className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                          {b}
                        </span>
                      ))}
                      {drive.eligibility.allowed_branches.length > 3 && (
                        <span className="text-[10px] text-slate-400">+{drive.eligibility.allowed_branches.length - 3}</span>
                      )}
                    </div>

                    {isAppliedForThis ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        APPLIED
                      </span>
                    ) : (
                      <span className="text-amber-400 font-semibold text-[11px] flex items-center gap-0.5">
                        Inspect Fit <ChevronRight className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Real-Time Eligibility Radar & 1-Click Application */}
        <div className="lg:col-span-7">
          {selectedDrive ? (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
              {/* Drive Details Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[11px] font-mono mb-1.5">
                    DRIVE ID: {selectedDrive.id}
                  </div>
                  <h3 className="text-xl font-black text-white">{selectedDrive.company_name}</h3>
                  <p className="text-sm font-semibold text-amber-400">{selectedDrive.job_title}</p>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <div className="text-xs text-slate-400 font-medium uppercase">Compensation Package</div>
                  <div className="text-2xl font-black text-emerald-400">{selectedDrive.ctc}</div>
                </div>
              </div>

              {/* Real-time Candidate Eligibility Matrix */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Automated Candidate Fit Verification
                  </h4>
                  <span className="text-xs text-slate-400">
                    Candidate: <strong className="text-slate-200">{currentStudent.name}</strong> ({currentStudent.department})
                  </span>
                </div>

                {/* 4 Pillars Breakdown Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* CGPA Pillar */}
                  <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
                    currentStudent.cgpa >= selectedDrive.eligibility.minimum_cgpa
                      ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                      : 'bg-red-950/20 border-red-800/40 text-red-300'
                  }`}>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Minimum CGPA</div>
                      <div className="text-sm font-black">
                        Required: {selectedDrive.eligibility.minimum_cgpa} | Yours: {currentStudent.cgpa}
                      </div>
                    </div>
                    {currentStudent.cgpa >= selectedDrive.eligibility.minimum_cgpa ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                    )}
                  </div>

                  {/* Branch Pillar */}
                  <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
                    selectedDrive.eligibility.allowed_branches.includes(currentStudent.department)
                      ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                      : 'bg-red-950/20 border-red-800/40 text-red-300'
                  }`}>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Permitted Branch</div>
                      <div className="text-sm font-black">
                        Your Branch: {currentStudent.department}
                      </div>
                    </div>
                    {selectedDrive.eligibility.allowed_branches.includes(currentStudent.department) ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                    )}
                  </div>

                  {/* Active Backlogs Pillar */}
                  <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
                    currentStudent.active_backlogs <= selectedDrive.eligibility.maximum_backlogs
                      ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                      : 'bg-red-950/20 border-red-800/40 text-red-300'
                  }`}>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Backlogs Limit</div>
                      <div className="text-sm font-black">
                        Max Allowed: {selectedDrive.eligibility.maximum_backlogs} | Active: {currentStudent.active_backlogs}
                      </div>
                    </div>
                    {currentStudent.active_backlogs <= selectedDrive.eligibility.maximum_backlogs ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                    )}
                  </div>

                  {/* Required Skills Pillar */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Required Skills Match</div>
                      <div className="flex flex-wrap gap-1">
                        {selectedDrive.eligibility.required_skills.map(skill => {
                          const matched = currentStudent.skills.some(
                            cs => cs.toLowerCase() === skill.toLowerCase()
                          );
                          return (
                            <span
                              key={skill}
                              className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                                matched
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                  : 'bg-red-500/20 text-red-300 border border-red-500/30'
                              }`}
                            >
                              {skill} {matched ? '✓' : '✗'}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selection Process Rounds */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Assessment & Interview Sequence:
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {selectedDrive.rounds.map((round, idx) => (
                    <div key={round} className="flex items-center gap-2 text-xs">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-950 text-slate-200 border border-slate-800 font-medium">
                        <strong className="text-amber-400 mr-1.5">R{idx + 1}:</strong>
                        {round}
                      </span>
                      {idx < selectedDrive.rounds.length - 1 && (
                        <span className="text-slate-600">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Application Action Footer */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs text-slate-400">
                    Registration Deadline: <strong className="text-amber-400">{selectedDrive.deadline_date}</strong>
                  </div>
                  {applySuccessMessage && (
                    <div className="text-xs text-emerald-400 font-semibold mt-1">
                      {applySuccessMessage}
                    </div>
                  )}
                </div>

                {hasApplied ? (
                  <button
                    type="button"
                    disabled
                    className="px-6 py-2.5 rounded-xl bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 font-bold text-xs cursor-default flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Application Submitted (In Pipeline)
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleApply}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Submit 1-Click Campus Application
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400">
              Select any recruitment drive from the list to evaluate candidate eligibility.
            </div>
          )}

          {/* Student's Active Application Pipeline */}
          {currentStudent.applied_drives.length > 0 && (
            <div className="mt-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                Your Active Placement Applications
              </h4>
              <div className="space-y-2">
                {currentStudent.applied_drives.map(ad => (
                  <div
                    key={ad.drive_id}
                    className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-white">{ad.company_name}</div>
                      <div className="text-[11px] text-slate-400">Applied on {ad.applied_at}</div>
                    </div>
                    <span className="px-2.5 py-1 rounded font-bold text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {ad.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recruiter Corporate Roster & Hiring Tiers */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
            Verified Partner Corporations (150+ Recruiters Network)
          </h3>
          <span className="text-xs text-slate-400">Demo Companies Registry</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {companies.map(comp => (
            <div
              key={comp.id}
              className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-bold text-white text-sm">{comp.name}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {comp.tier}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-2">{comp.sector}</p>
                <div className="text-xs text-slate-300 mb-3">
                  Locations: <span className="text-slate-400">{comp.location}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Average CTC:</span>
                <span className="font-extrabold text-emerald-400">{comp.avg_ctc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Placement Officer Schedule Drive */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-amber-400" />
                Schedule New Campus Recruitment Drive
              </h3>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateDrive} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Google India / TCS Digital"
                  value={newCompany}
                  onChange={e => setNewCompany(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Job Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Associate Software Engineer"
                  value={newRole}
                  onChange={e => setNewRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">CTC Package</label>
                  <input
                    type="text"
                    value={newCtc}
                    onChange={e => setNewCtc(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Minimum CGPA</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newMinCgpa}
                    onChange={e => setNewMinCgpa(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Eligible Branches (comma separated)</label>
                <input
                  type="text"
                  value={newBranches}
                  onChange={e => setNewBranches(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Required Skills (comma separated)</label>
                <input
                  type="text"
                  value={newSkills}
                  onChange={e => setNewSkills(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                >
                  Publish Recruitment Drive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
