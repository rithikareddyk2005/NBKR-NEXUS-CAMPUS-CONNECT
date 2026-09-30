import React, { useState } from 'react';
import {
  Users,
  BookOpen,
  Calendar,
  CheckCircle2,
  FileText,
  Clock,
  Send,
  AlertTriangle,
  Award
} from 'lucide-react';
import { StudentProfile, DeadlineItem, ComplaintItem, UserSession } from '../types';

interface FacultyPortalProps {
  currentSession: UserSession;
  students: StudentProfile[];
  deadlines: DeadlineItem[];
  complaints: ComplaintItem[];
  onAddDeadline: (deadline: any) => void;
}

export const FacultyPortal: React.FC<FacultyPortalProps> = ({
  currentSession,
  students,
  deadlines,
  complaints,
  onAddDeadline
}) => {
  const [postTitle, setPostTitle] = useState('');
  const [postCategory, setPostCategory] = useState<'ASSIGNMENT' | 'LAB_RECORD' | 'PROJECT'>('ASSIGNMENT');
  const [postDueDate, setPostDueDate] = useState('2026-10-12');
  const [postPriority, setPostPriority] = useState<'HIGH' | 'MEDIUM'>('HIGH');

  const handlePostTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim()) return;

    onAddDeadline({
      title: postTitle,
      category: postCategory,
      priority: postPriority,
      due_date: postDueDate,
      assigned_by: `${currentSession.name} (${currentSession.role})`
    });

    setPostTitle('');
    alert(`Course task "${postTitle}" broadcasted to enrolled students.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-semibold">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            Faculty Academic Portal &amp; Course Management
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Faculty Command Center • {currentSession.name}
          </h2>
          <p className="text-xs text-slate-300">
            Publish academic assignments, review enrolled student batches, evaluate lab records, and track departmental maintenance tickets.
          </p>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-center">
          <div className="text-2xl font-black text-amber-400">{students.length}</div>
          <div className="text-xs text-slate-300 font-semibold mt-0.5">Enrolled Demo Students</div>
          <div className="text-[10px] text-slate-400 mt-1">CSE Section A Batch</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-center">
          <div className="text-2xl font-black text-emerald-400">{deadlines.length}</div>
          <div className="text-xs text-slate-300 font-semibold mt-0.5">Active Course Deadlines</div>
          <div className="text-[10px] text-slate-400 mt-1">LMS Sync Active</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-center">
          <div className="text-2xl font-black text-blue-400">89.6%</div>
          <div className="text-xs text-slate-300 font-semibold mt-0.5">Batch Avg Attendance</div>
          <div className="text-[10px] text-slate-400 mt-1">CSE III B.Tech</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-center">
          <div className="text-2xl font-black text-purple-400">{complaints.length}</div>
          <div className="text-xs text-slate-300 font-semibold mt-0.5">Department Tickets</div>
          <div className="text-[10px] text-slate-400 mt-1">Estate Redressal</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Broadcast Assignment Form */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Send className="w-4 h-4 text-amber-400" />
              Broadcast Assignment or Lab Task
            </h3>

            <form onSubmit={handlePostTask} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DBMS Unit 4 Query Optimization Analysis"
                  value={postTitle}
                  onChange={e => setPostTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={postCategory}
                    onChange={e => setPostCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
                  >
                    <option value="ASSIGNMENT">Assignment</option>
                    <option value="LAB_RECORD">Lab Record</option>
                    <option value="PROJECT">Mini Project Review</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Priority</label>
                  <select
                    value={postPriority}
                    onChange={e => setPostPriority(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
                  >
                    <option value="HIGH">High Priority</option>
                    <option value="MEDIUM">Medium Priority</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Submission Deadline</label>
                <input
                  type="date"
                  value={postDueDate}
                  onChange={e => setPostDueDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                Publish to Student Dashboards
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Enrolled Students Roster */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              Student Academic Performance Ledger
            </h3>

            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 text-[10px] uppercase font-mono">
                  <tr>
                    <th className="p-2.5 border-b border-slate-800">Student ID</th>
                    <th className="p-2.5 border-b border-slate-800">Candidate Name</th>
                    <th className="p-2.5 border-b border-slate-800">Branch &amp; Sec</th>
                    <th className="p-2.5 border-b border-slate-800">CGPA</th>
                    <th className="p-2.5 border-b border-slate-800">Attendance</th>
                    <th className="p-2.5 border-b border-slate-800">Backlogs</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {students.map(s => (
                    <tr key={s.student_id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-2.5 font-mono text-amber-300 font-bold">{s.student_id}</td>
                      <td className="p-2.5 font-semibold text-white">{s.name}</td>
                      <td className="p-2.5 text-slate-300">{s.department} - {s.section}</td>
                      <td className="p-2.5 font-bold text-amber-400">{s.cgpa}</td>
                      <td className="p-2.5 text-emerald-400 font-bold">{s.attendance_pct}%</td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          s.active_backlogs === 0
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-red-500/20 text-red-300'
                        }`}>
                          {s.active_backlogs}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
