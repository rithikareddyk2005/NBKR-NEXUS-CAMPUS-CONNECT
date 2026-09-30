import React, { useState } from 'react';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  X,
  ShieldCheck,
  GraduationCap,
  Users,
  Briefcase,
  KeyRound,
  Copy
} from 'lucide-react';
import { UserSession, UserRole } from '../types';
import { DEMO_USERS } from '../data/demoData';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSession: UserSession;
  onLoginSuccess: (session: UserSession) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  currentSession,
  onLoginSuccess
}) => {
  const [email, setEmail] = useState(currentSession.email || 'student@nbknexus.demo');
  const [password, setPassword] = useState('student123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  // Credential Map according to Section 20 of the specification
  const accounts = [
    {
      role: 'STUDENT' as UserRole,
      title: 'Student Account',
      email: 'student@nbknexus.demo',
      password: 'student123',
      name: 'Rithika Demo (DEMO-STU-001)',
      desc: 'Access Student Action Center, Attendance, Placement Drive Radar, Deadlines & Resource Vault',
      badge: 'B.Tech CSE III Yr',
      icon: GraduationCap,
      color: 'amber'
    },
    {
      role: 'FACULTY' as UserRole,
      title: 'Faculty Account',
      email: 'faculty@nbknexus.demo',
      password: 'faculty123',
      name: 'Dr. Demo Faculty One',
      desc: 'Access Faculty Command Center, Broadcast Course Tasks, Review Enrolled Batches',
      badge: 'CSE Department',
      icon: Users,
      color: 'blue'
    },
    {
      role: 'ADMIN' as UserRole,
      title: 'Administration Account',
      email: 'admin@nbknexus.demo',
      password: 'admin123',
      name: 'Campus Administrator',
      desc: 'Access Institutional Governance Hub, CSV Schema Ingestion, Protected Demo Reset',
      badge: 'Root Admin',
      icon: ShieldCheck,
      color: 'purple'
    },
    {
      role: 'PLACEMENT_OFFICER' as UserRole,
      title: 'Placement Officer Account',
      email: 'placement@nbknexus.demo',
      password: 'placement123',
      name: 'Training & Placement Officer',
      desc: 'Access Placement Officer Portal, Schedule Drives, Filter Eligible Candidate Pools',
      badge: 'T&P Directorate',
      icon: Briefcase,
      color: 'emerald'
    }
  ];

  const handleQuickLogin = (acc: typeof accounts[0]) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setError(null);

    const foundSession = DEMO_USERS.find(u => u.email === acc.email);
    if (foundSession) {
      onLoginSuccess(foundSession);
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim().toLowerCase();
    const matched = accounts.find(
      a => a.email.toLowerCase() === trimmedEmail && a.password === password.trim()
    );

    if (matched) {
      const foundSession = DEMO_USERS.find(u => u.email === matched.email) || {
        email: matched.email,
        name: matched.name,
        role: matched.role,
        data_environment: 'DEMO'
      };
      onLoginSuccess(foundSession);
      onClose();
    } else {
      setError('Invalid credentials. Please click one of the verified 1-Click demo accounts below.');
    }
  };

  const copyCredentials = (accEmail: string, accPass: string) => {
    navigator.clipboard.writeText(`Email: ${accEmail}\nPassword: ${accPass}`);
    setCopiedKey(accEmail);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden my-8">
        {/* Modal Top Bar */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white p-1 border border-amber-500/60 flex items-center justify-center shrink-0 shadow-lg shadow-black/80">
              <img
                src="/images/nbkrist-logo.jpg"
                alt="NBKRIST"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">NBKR Nexus Authentication</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  DEMO PASSWORDS
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Official role credentials for Student, Faculty, Placement Officer &amp; Administration
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Active Session Info */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-400">Currently Authenticated:</span>
              <strong className="text-slate-200">{currentSession.name}</strong>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 font-mono text-amber-400">
                {currentSession.role}
              </span>
            </div>
            <span className="text-[11px] text-emerald-400 font-medium">Session Active</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Institutional Email / User ID
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="student@nbknexus.demo"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Account Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-500 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/60 text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-1">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
              >
                Sign In to NBKR Nexus
              </button>
            </div>
          </form>

          {/* Quick 1-Click Credentials Grid (Section 20 of Specification) */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                Verified Default Institutional Credentials (1-Click Fill &amp; Login)
              </h4>
              <span className="text-[10px] text-slate-500">Sec. 20 Spec</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {accounts.map(acc => {
                const Icon = acc.icon;
                const isSelected = currentSession.email === acc.email;

                return (
                  <div
                    key={acc.email}
                    className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-slate-950 border-amber-500/80 shadow-md shadow-amber-500/10'
                        : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center">
                            <Icon className="w-3.5 h-3.5 text-amber-400" />
                          </div>
                          <span className="text-xs font-bold text-white">{acc.title}</span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-slate-900 text-slate-300 border border-slate-800">
                          {acc.badge}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-400 leading-relaxed mb-3">
                        {acc.desc}
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 text-[11px] font-mono space-y-1 mb-3">
                        <div className="flex items-center justify-between text-slate-300">
                          <span>User: <strong>{acc.email}</strong></span>
                        </div>
                        <div className="flex items-center justify-between text-amber-300">
                          <span>Pass: <strong>{acc.password}</strong></span>
                          <button
                            type="button"
                            onClick={() => copyCredentials(acc.email, acc.password)}
                            className="text-slate-400 hover:text-white"
                            title="Copy credentials"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleQuickLogin(acc)}
                      className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>1-Click Switch &amp; Login</span>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-center text-xs text-slate-400">
          In production, credentials link directly to the NBKRIST LDAP / Active Directory &amp; SAML SSO single sign-on servers.
        </div>
      </div>
    </div>
  );
};
