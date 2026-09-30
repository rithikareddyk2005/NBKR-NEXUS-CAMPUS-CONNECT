import React, { useState } from 'react';
import {
  Bell,
  AlertTriangle,
  Calendar,
  Briefcase,
  CheckCircle2,
  X,
  Clock
} from 'lucide-react';

export interface SmartNotification {
  id: string;
  title: string;
  category: 'ACADEMIC' | 'PLACEMENT' | 'EMERGENCY' | 'FACILITY';
  timestamp: string;
  read: boolean;
  priority: 'HIGH' | 'NORMAL';
  body: string;
}

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<SmartNotification[]>([
    {
      id: 'NOT-01',
      title: 'Mandatory ABC / APAAR ID Linking Notice',
      category: 'ACADEMIC',
      timestamp: 'Today, 09:15 AM',
      read: false,
      priority: 'HIGH',
      body: 'All students are instructed to link their 12-digit Academic Bank of Credits ID in the exam portal before final exam registrations.'
    },
    {
      id: 'NOT-02',
      title: 'TechNova Solutions Drive Registration Window Closing',
      category: 'PLACEMENT',
      timestamp: 'Today, 08:30 AM',
      read: false,
      priority: 'HIGH',
      body: 'Software Development Engineer - I track closes registration at 11:59 PM tonight. Eligible students must submit 1-click application.'
    },
    {
      id: 'NOT-03',
      title: 'Central Library Extended Stacks Hours Active',
      category: 'FACILITY',
      timestamp: 'Yesterday, 04:00 PM',
      read: true,
      priority: 'NORMAL',
      body: 'Ground floor reading halls will remain open till 11:30 PM for mid-term exam preparation.'
    },
    {
      id: 'NOT-04',
      title: 'PARAMA 2026 National Symposium Paper Submissions Open',
      category: 'ACADEMIC',
      timestamp: '2 days ago',
      read: true,
      priority: 'NORMAL',
      body: 'Department IEEE & CSI chapters invite research abstract submissions till October 18, 2026.'
    }
  ]);

  if (!isOpen) return null;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Campus Notification Dispatch</h3>
              <p className="text-[11px] text-slate-400">Official circulars, placement alerts &amp; urgent notices</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={markAllRead}
              className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold"
            >
              Mark all read
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 text-sm"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.map(n => (
            <div
              key={n.id}
              className={`p-3.5 rounded-xl border transition-all ${
                n.read
                  ? 'bg-slate-950/50 border-slate-800/80 text-slate-300'
                  : 'bg-slate-950 border-amber-500/40 text-white shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={`text-[9px] font-bold px-2 py-0.2 rounded ${
                    n.priority === 'HIGH'
                      ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {n.category}
                </span>
                <span className="text-[10px] text-slate-500 flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3" />
                  {n.timestamp}
                </span>
              </div>

              <h4 className="text-xs font-bold mb-1">{n.title}</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">{n.body}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 text-center text-[11px] text-slate-500">
          Synced with NBKRIST Campus Notice Dispatch Grid
        </div>
      </div>
    </div>
  );
};
