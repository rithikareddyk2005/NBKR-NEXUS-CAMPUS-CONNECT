import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Award,
  Plus,
  CheckCircle2,
  Sparkles,
  Ticket
} from 'lucide-react';
import { CampusEvent } from '../data/extendedData';
import { apiService } from '../services/api';

interface CampusEventsProps {
  events: CampusEvent[];
  onRefresh: () => void;
}

export const CampusEvents: React.FC<CampusEventsProps> = ({ events, onRefresh }) => {
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);

  const handleRegister = async (id: string) => {
    try {
      await apiService.registerForEvent(id);
      setRegisteredIds(prev => [...prev, id]);
      onRefresh();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            Vibrant Campus Life &amp; Competitions
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Campus Events, Symposiums &amp; Hackathons
          </h2>
          <p className="text-xs text-slate-300">
            Participate in national symposiums, technical hackathons, athletic meets, and collegiate cultural fests.
          </p>
        </div>
      </div>

      {/* Grid of Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map(evt => {
          const isRegistered = registeredIds.includes(evt.id);

          return (
            <div
              key={evt.id}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {evt.category}
                  </span>
                  <span className="text-xs font-mono text-emerald-400">
                    {evt.registeredCount} Registered
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">{evt.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">{evt.description}</p>

                <div className="space-y-1.5 text-xs text-slate-400 bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 mb-4">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Date: <strong>{evt.date}</strong> ({evt.time})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>Venue: {evt.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>Organizer: {evt.organizer}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {evt.tags.map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  Deadline: <strong className="text-amber-400">{evt.registrationDeadline}</strong>
                </span>

                {isRegistered ? (
                  <span className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Registered!
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleRegister(evt.id)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all"
                  >
                    <Ticket className="w-4 h-4" />
                    Register Now
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
