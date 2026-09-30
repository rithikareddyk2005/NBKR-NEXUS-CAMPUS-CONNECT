import React, { useState } from 'react';
import {
  Building,
  CheckCircle2,
  Clock,
  Users,
  Search,
  Cpu,
  Monitor,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { ClassroomOccupancy } from '../data/extendedData';

interface SmartClassroomsProps {
  classrooms: ClassroomOccupancy[];
}

export const SmartClassrooms: React.FC<SmartClassroomsProps> = ({ classrooms }) => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filtered = classrooms.filter(c => {
    if (filterStatus === 'ALL') return true;
    return c.currentStatus === filterStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30 text-xs font-semibold">
            <Monitor className="w-3.5 h-3.5 text-blue-400" />
            Smart Academic Infrastructure
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Classroom &amp; Computing Lab Live Occupancy
          </h2>
          <p className="text-xs text-slate-300">
            Real-time occupancy sensor feeds across lecture halls, smart classrooms, and specialized research labs.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setFilterStatus('ALL')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              filterStatus === 'ALL' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Rooms ({classrooms.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('AVAILABLE')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              filterStatus === 'AVAILABLE' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Available Now ({classrooms.filter(c => c.currentStatus === 'AVAILABLE').length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('OCCUPIED')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              filterStatus === 'OCCUPIED' ? 'bg-red-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            In Session ({classrooms.filter(c => c.currentStatus === 'OCCUPIED').length})
          </button>
        </div>
      </div>

      {/* Grid of Classrooms */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(room => (
          <div
            key={room.id}
            className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {room.type.replace('_', ' ')}
                </span>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                    room.currentStatus === 'AVAILABLE'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : room.currentStatus === 'OCCUPIED'
                      ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {room.currentStatus.replace('_', ' ')}
                </span>
              </div>

              <h4 className="text-base font-bold text-white mb-1">{room.roomNumber}</h4>
              <p className="text-xs text-slate-400 mb-3">{room.building}</p>

              {room.currentStatus === 'OCCUPIED' && (
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 mb-3 space-y-1 text-xs">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Current Session</div>
                  <div className="font-bold text-amber-300">{room.currentSubject}</div>
                  <div className="text-slate-400">{room.facultyName}</div>
                  <div className="text-[11px] text-emerald-400 pt-0.5">Free from: {room.availableUntil}</div>
                </div>
              )}

              {room.currentStatus === 'AVAILABLE' && (
                <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-800/30 mb-3 text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Free for self-study / group prep until <strong>{room.availableUntil}</strong></span>
                </div>
              )}

              {room.currentStatus === 'SCHEDULED_SOON' && (
                <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/30 mb-3 text-xs text-amber-300">
                  <div className="font-semibold">{room.currentSubject}</div>
                  <div className="text-[11px] text-slate-400">{room.availableUntil}</div>
                </div>
              )}

              <div className="space-y-1 text-xs text-slate-400 mb-2">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                  <span>Capacity: <strong className="text-slate-200">{room.capacity} Students</strong></span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Features:</div>
                <div className="flex flex-wrap gap-1">
                  {room.features.map(f => (
                    <span key={f} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>IoT Occupancy Beacon Verified</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
