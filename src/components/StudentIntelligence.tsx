import React, { useState } from 'react';
import {
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Wrench,
  Download,
  Filter,
  Search,
  Code,
  CheckSquare,
  Sparkles,
  FileCheck,
  Send
} from 'lucide-react';
import {
  StudentProfile,
  DeadlineItem,
  ComplaintItem,
  AcademicResource,
  UserSession
} from '../types';
import { apiService } from '../services/api';

interface StudentIntelligenceProps {
  currentStudent: StudentProfile;
  studentsList: StudentProfile[];
  onSelectStudent: (student: StudentProfile) => void;
  deadlines: DeadlineItem[];
  complaints: ComplaintItem[];
  resources: AcademicResource[];
  currentSession: UserSession;
  onRefreshStudent: () => void;
  onRefreshDeadlines: () => void;
  onRefreshComplaints: () => void;
  onRefreshResources: () => void;
}

export const StudentIntelligence: React.FC<StudentIntelligenceProps> = ({
  currentStudent,
  studentsList,
  onSelectStudent,
  deadlines,
  complaints,
  resources,
  currentSession,
  onRefreshStudent,
  onRefreshDeadlines,
  onRefreshComplaints,
  onRefreshResources
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'passport' | 'deadlines' | 'complaints' | 'resources'>('passport');

  // New Skill state
  const [newSkillInput, setNewSkillInput] = useState('');

  // New Deadline state
  const [showDeadlineModal, setShowDeadlineModal] = useState(false);
  const [deadlineTitle, setDeadlineTitle] = useState('');
  const [deadlineCategory, setDeadlineCategory] = useState<'ASSIGNMENT' | 'LAB_RECORD' | 'PLACEMENT' | 'EVENT' | 'PROJECT' | 'ACADEMIC'>('ASSIGNMENT');
  const [deadlinePriority, setDeadlinePriority] = useState<'HIGH' | 'MEDIUM' | 'LOW'>('HIGH');
  const [deadlineDueDate, setDeadlineDueDate] = useState('2026-10-08');

  // New Complaint state
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [complaintTitle, setComplaintTitle] = useState('');
  const [complaintCategory, setComplaintCategory] = useState<'ELECTRICAL' | 'WATER' | 'FURNITURE' | 'CLEANLINESS' | 'NETWORK' | 'ACADEMIC'>('ELECTRICAL');
  const [complaintLocation, setComplaintLocation] = useState('');
  const [complaintPriority, setComplaintPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('MEDIUM');

  // Resource Search
  const [resourceSearch, setResourceSearch] = useState('');
  const [resourceCategory, setResourceCategory] = useState<string>('ALL');

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillInput.trim()) return;
    try {
      await apiService.addStudentSkill(currentStudent.student_id, newSkillInput.trim());
      setNewSkillInput('');
      onRefreshStudent();
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleDeadline = async (id: string) => {
    try {
      await apiService.toggleDeadline(id);
      onRefreshDeadlines();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateDeadline = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deadlineTitle.trim()) return;
    try {
      await apiService.addDeadline({
        title: deadlineTitle,
        category: deadlineCategory,
        priority: deadlinePriority,
        due_date: deadlineDueDate,
        assigned_by: 'Course Faculty'
      });
      setShowDeadlineModal(false);
      setDeadlineTitle('');
      onRefreshDeadlines();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateComplaint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintTitle.trim() || !complaintLocation.trim()) return;
    try {
      await apiService.addComplaint({
        title: complaintTitle,
        category: complaintCategory,
        location: complaintLocation,
        priority: complaintPriority,
        filed_by: `${currentStudent.name} (${currentStudent.student_id})`
      });
      setShowComplaintModal(false);
      setComplaintTitle('');
      setComplaintLocation('');
      onRefreshComplaints();
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateComplaintStatus = async (id: string, newStatus: string) => {
    try {
      await apiService.updateComplaintStatus(id, newStatus, 'Status updated via campus portal');
      onRefreshComplaints();
    } catch (e) {
      console.error(e);
    }
  };

  const filteredResources = resources.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(resourceSearch.toLowerCase()) ||
      res.subject.toLowerCase().includes(resourceSearch.toLowerCase());
    const matchesCat = resourceCategory === 'ALL' || res.category === resourceCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner with Student Switcher */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-amber-500/10">
            {currentStudent.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-white">{currentStudent.name}</h2>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                {currentStudent.student_id}
              </span>
            </div>
            <div className="text-xs text-slate-400">
              Department of <strong className="text-slate-200">{currentStudent.department}</strong> • Year {currentStudent.year} Sec {currentStudent.section}
            </div>
          </div>
        </div>

        {/* Alternate Student Selector for Testing */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Switch Demo Student:</span>
          <select
            value={currentStudent.student_id}
            onChange={e => {
              const found = studentsList.find(s => s.student_id === e.target.value);
              if (found) onSelectStudent(found);
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-semibold focus:outline-none focus:border-amber-500"
          >
            {studentsList.map(s => (
              <option key={s.student_id} value={s.student_id}>
                {s.name} ({s.department} • CGPA {s.cgpa})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Sub Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-800 pb-2 no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveSubTab('passport')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeSubTab === 'passport'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
              : 'text-slate-300 bg-slate-900/60 hover:bg-slate-800'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          Academic Passport & Skills
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('deadlines')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeSubTab === 'deadlines'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
              : 'text-slate-300 bg-slate-900/60 hover:bg-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          Deadlines & Tasks ({deadlines.filter(d => !d.completed).length})
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('complaints')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeSubTab === 'complaints'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
              : 'text-slate-300 bg-slate-900/60 hover:bg-slate-800'
          }`}
        >
          <Wrench className="w-4 h-4" />
          Campus Grievance Portal ({complaints.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('resources')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeSubTab === 'resources'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
              : 'text-slate-300 bg-slate-900/60 hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Digital Resource Vault ({resources.length})
        </button>
      </div>

      {/* SUBTAB 1: PASSPORT & SKILLS */}
      {activeSubTab === 'passport' && (
        <div className="space-y-6">
          {/* Metrics Bento */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                Cumulative CGPA
              </span>
              <div className="text-2xl font-black text-amber-400">{currentStudent.cgpa}</div>
              <div className="text-[11px] text-slate-400 mt-1">Scale of 10.0</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                Active Backlogs
              </span>
              <div className={`text-2xl font-black ${currentStudent.active_backlogs === 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {currentStudent.active_backlogs}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {currentStudent.active_backlogs === 0 ? 'Eligible for all drives' : 'Review eligibility rules'}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                Attendance Overall
              </span>
              <div className="text-2xl font-black text-blue-400">{currentStudent.attendance_pct}%</div>
              <div className="text-[11px] text-emerald-400 mt-1">Above mandatory 75%</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                Skills & Tech Stack
              </span>
              <div className="text-2xl font-black text-purple-400">{currentStudent.skills.length}</div>
              <div className="text-[11px] text-slate-400 mt-1">Verified competencies</div>
            </div>
          </div>

          {/* Interactive Skills Radar & Adder */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Code className="w-4 h-4 text-amber-400" />
                  Technical Skill Inventory
                </h3>
                <p className="text-xs text-slate-400">
                  Directly factored by the Placement Intelligence Engine during eligibility matching.
                </p>
              </div>

              <form onSubmit={handleAddSkill} className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Add skill (e.g. Docker, Go)..."
                  value={newSkillInput}
                  onChange={e => setNewSkillInput(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0"
                >
                  + Add
                </button>
              </form>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {currentStudent.skills.map(skill => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Projects and Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Capstone Projects */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Engineering Projects
              </h3>
              <div className="space-y-3">
                {currentStudent.projects.map((proj, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{proj.title}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300">
                        {proj.tech}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Certifications */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-400" />
                Industry Certifications
              </h3>
              <div className="space-y-3">
                {currentStudent.certifications.map((cert, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{cert.title}</div>
                      <div className="text-[11px] text-slate-400">{cert.issuer}</div>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-400 px-2 py-1 rounded bg-slate-900">
                      {cert.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: DEADLINES */}
      {activeSubTab === 'deadlines' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/70 border border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-400" />
                Active Academic Deadlines & Submission Tracker
              </h3>
              <p className="text-xs text-slate-400">
                Track lab records, assignments, project reviews, and placement drive registrations.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowDeadlineModal(true)}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Deadline
            </button>
          </div>

          <div className="space-y-3">
            {deadlines.map(item => (
              <div
                key={item.id}
                className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all ${
                  item.completed
                    ? 'bg-slate-950/50 border-slate-800/60 opacity-60'
                    : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => handleToggleDeadline(item.id)}
                    className={`w-5 h-5 rounded mt-0.5 border flex items-center justify-center transition-colors ${
                      item.completed
                        ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                        : 'border-slate-600 hover:border-amber-400'
                    }`}
                  >
                    {item.completed && <CheckSquare className="w-4 h-4 font-bold" />}
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        item.priority === 'HIGH'
                          ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                          : item.priority === 'MEDIUM'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}>
                        {item.priority}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-slate-950">
                        {item.category}
                      </span>
                    </div>

                    <h4 className={`text-sm font-bold ${item.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                      {item.title}
                    </h4>

                    {item.assigned_by && (
                      <div className="text-xs text-slate-400">Assigned by: {item.assigned_by}</div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs shrink-0 self-end sm:self-center">
                  <div className="text-right">
                    <div className="text-slate-400 text-[10px] uppercase font-semibold">Due Date</div>
                    <div className="font-bold text-slate-200">{item.due_date}</div>
                  </div>

                  {!item.completed && (
                    <span className={`px-2.5 py-1 rounded-lg font-bold text-xs ${
                      item.days_remaining <= 1
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-slate-800 text-amber-300'
                    }`}>
                      {item.days_remaining === 0 ? 'Due Today' : `${item.days_remaining}d remaining`}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: GRIEVANCE & MAINTENANCE PORTAL */}
      {activeSubTab === 'complaints' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/70 border border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Wrench className="w-5 h-5 text-amber-400" />
                Campus Grievance & Facility Maintenance Redressal
              </h3>
              <p className="text-xs text-slate-400">
                Log and track maintenance tickets across classrooms, labs, electrical fittings, and hostels.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowComplaintModal(true)}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              File Grievance / Maintenance Ticket
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {complaints.map(complaint => (
              <div
                key={complaint.id}
                className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {complaint.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        complaint.status === 'OPEN'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : complaint.status === 'ASSIGNED'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : complaint.status === 'IN_PROGRESS'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      ● {complaint.status}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1.5">{complaint.title}</h4>
                  <p className="text-xs text-amber-300/80 mb-3 flex items-center gap-1">
                    <span>📍</span> Location: {complaint.location}
                  </p>

                  <div className="space-y-1 text-[11px] text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800/80 mb-3">
                    <div>Filed by: <span className="text-slate-200">{complaint.filed_by}</span></div>
                    {complaint.assigned_to && (
                      <div>Assigned unit: <span className="text-slate-200">{complaint.assigned_to}</span></div>
                    )}
                    {complaint.resolution_note && (
                      <div className="text-emerald-300 font-semibold mt-1">Note: {complaint.resolution_note}</div>
                    )}
                  </div>
                </div>

                {/* Status action toggle for demonstration */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[10px]">{complaint.submitted_at}</span>
                  <div className="flex items-center gap-1">
                    {complaint.status !== 'RESOLVED' ? (
                      <button
                        type="button"
                        onClick={() => handleUpdateComplaintStatus(complaint.id, 'RESOLVED')}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 text-[10px] font-bold"
                      >
                        Mark Resolved ✓
                      </button>
                    ) : (
                      <span className="text-[10px] text-emerald-400 font-bold">Resolved & Closed</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 4: DIGITAL RESOURCE VAULT */}
      {activeSubTab === 'resources' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/70 border border-slate-800">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search subject or notes..."
                value={resourceSearch}
                onChange={e => setResourceSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar text-xs">
              {['ALL', 'NOTES', 'LAB_MANUAL', 'QUESTION_PAPER'].map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setResourceCategory(cat)}
                  className={`px-3 py-1 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                    resourceCategory === cat
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {cat.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.map(res => (
              <div
                key={res.id}
                className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {res.category}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{res.semester}</span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1.5">{res.title}</h4>
                  <div className="text-xs text-amber-300 font-medium mb-1">Subject: {res.subject}</div>
                  {res.faculty_author && (
                    <div className="text-xs text-slate-400 mb-3">Prepared by: {res.faculty_author}</div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">{res.file_format}</span>
                  <button
                    type="button"
                    onClick={() => alert(`Simulated download started for "${res.title}"`)}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download File
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Add Deadline */}
      {showDeadlineModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-400" />
                Add Academic Deadline
              </h3>
              <button
                type="button"
                onClick={() => setShowDeadlineModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateDeadline} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Task / Assignment Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI Unit Test Preparation"
                  value={deadlineTitle}
                  onChange={e => setDeadlineTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={deadlineCategory}
                    onChange={e => setDeadlineCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
                  >
                    <option value="ASSIGNMENT">ASSIGNMENT</option>
                    <option value="LAB_RECORD">LAB RECORD</option>
                    <option value="PLACEMENT">PLACEMENT</option>
                    <option value="PROJECT">PROJECT</option>
                    <option value="EVENT">EVENT</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Priority</label>
                  <select
                    value={deadlinePriority}
                    onChange={e => setDeadlinePriority(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
                  >
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Due Date</label>
                <input
                  type="date"
                  value={deadlineDueDate}
                  onChange={e => setDeadlineDueDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowDeadlineModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: File Complaint */}
      {showComplaintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Wrench className="w-5 h-5 text-amber-400" />
                File Campus Grievance / Maintenance
              </h3>
              <button
                type="button"
                onClick={() => setShowComplaintModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateComplaint} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Issue Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Projector HDMI cable faulty in Room 301"
                  value={complaintTitle}
                  onChange={e => setComplaintTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Location on Campus</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CSE Block, 3rd Floor Seminar Hall"
                  value={complaintLocation}
                  onChange={e => setComplaintLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={complaintCategory}
                    onChange={e => setComplaintCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
                  >
                    <option value="ELECTRICAL">ELECTRICAL</option>
                    <option value="WATER">WATER & PLUMBING</option>
                    <option value="FURNITURE">FURNITURE</option>
                    <option value="CLEANLINESS">CLEANLINESS</option>
                    <option value="NETWORK">NETWORK / WI-FI</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Priority</label>
                  <select
                    value={complaintPriority}
                    onChange={e => setComplaintPriority(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
                  >
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH (Urgent)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowComplaintModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
