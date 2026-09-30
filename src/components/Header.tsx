import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  GraduationCap,
  Sparkles,
  Briefcase,
  Layers,
  ChevronDown,
  Building2,
  BookOpen,
  Wifi,
  Users,
  Compass,
  Coffee,
  HelpCircle,
  Lightbulb,
  Calendar,
  Award,
  BarChart3,
  Activity,
  Bell,
  Monitor,
  Presentation
} from 'lucide-react';
import { UserSession, UserRole, DataEnvironment } from '../types';

interface HeaderProps {
  currentSession: UserSession;
  onRoleChange: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  environmentFilter: 'ALL' | DataEnvironment;
  setEnvironmentFilter: (env: 'ALL' | DataEnvironment) => void;
  onOpenNotifications: () => void;
  onOpenLogin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSession,
  onRoleChange,
  activeTab,
  setActiveTab,
  environmentFilter,
  setEnvironmentFilter,
  onOpenNotifications,
  onOpenLogin
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
      {/* Top Banner Ticker */}
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-indigo-950/60 border-b border-amber-900/30 px-4 py-1 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.2 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              AUTONOMOUS
            </span>
            <span className="hidden sm:inline text-slate-400">Affiliated to JNTUA Anantapuramu</span>
            <span className="hidden md:inline text-slate-600">•</span>
            <span className="text-amber-400 font-semibold">NAAC &apos;A&apos; Grade</span>
            <span className="hidden md:inline text-slate-600">•</span>
            <span className="text-emerald-400 font-semibold">NBA Accredited</span>
            <span className="hidden lg:inline text-slate-600">•</span>
            <span className="hidden lg:inline text-slate-400">EAPCET/ECET: <strong className="text-slate-200">NBKR</strong></span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              250+ Acres
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              44,197+ Books
            </span>
            <span className="flex items-center gap-1">
              <Wifi className="w-3.5 h-3.5 text-emerald-400" />
              200 Mbps Wi-Fi
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-purple-400" />
              150+ Recruiters
            </span>
          </div>
        </div>
      </div>

      {/* Main Brand Bar with Official Logo */}
      <div className="max-w-7xl mx-auto px-4 py-2.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Institution Crest and Name */}
          <div className="flex items-center gap-3">
            {/* Official Logo with gear wheel & "WORK IS WORSHIP" banner */}
            <div className="w-12 h-12 rounded-xl bg-white p-0.5 shrink-0 shadow-lg shadow-amber-500/10 flex items-center justify-center border border-amber-500/60 overflow-hidden">
              <img
                src="/images/nbkrist-logo.jpg"
                alt="NBKRIST Official Crest"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg md:text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                  NBKR <span className="text-amber-400 font-black">NEXUS</span>
                </h1>
                <span className="text-[9px] font-bold tracking-wider px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  SMART CAMPUS
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                N.B.K.R. Institute of Science &amp; Technology <span className="text-slate-500">• Vidyanagar</span>
              </p>
            </div>
          </div>

          {/* Right Controls: Notification Bell, Environment Indicator & Role Switcher */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Notification Bell */}
            <button
              type="button"
              onClick={onOpenNotifications}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 relative transition-colors"
              title="Campus Notifications"
            >
              <Bell className="w-4 h-4 text-amber-400" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-black flex items-center justify-center animate-pulse">
                2
              </span>
            </button>

            {/* Strict Environment Tag */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setEnvironmentFilter('ALL')}
                className={`px-2 py-1 rounded font-medium transition-all ${
                  environmentFilter === 'ALL'
                    ? 'bg-slate-700 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All Data
              </button>
              <button
                type="button"
                onClick={() => setEnvironmentFilter('OFFICIAL_NBKR')}
                className={`px-2 py-1 rounded font-medium flex items-center gap-1 transition-all ${
                  environmentFilter === 'OFFICIAL_NBKR'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-emerald-400 hover:text-emerald-300'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified NBKR
              </button>
              <button
                type="button"
                onClick={() => setEnvironmentFilter('DEMO')}
                className={`px-2 py-1 rounded font-medium flex items-center gap-1 transition-all ${
                  environmentFilter === 'DEMO'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-amber-400 hover:text-amber-300'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                Demo Sandbox
              </button>
            </div>

            {/* Role Switcher & Login */}
            <button
              type="button"
              onClick={onOpenLogin}
              className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center gap-1.5 transition-colors"
              title="View login credentials for Student, Faculty & Admin"
            >
              <span>🔑 Credentials / Sign In</span>
            </button>

            <div className="relative group">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 cursor-pointer transition-colors">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <div className="text-left">
                  <div className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Role Persona</div>
                  <div className="text-xs font-semibold text-slate-100 flex items-center gap-1">
                    {currentSession.role === 'STUDENT' && '🎓 ' + currentSession.name}
                    {currentSession.role === 'FACULTY' && '👨‍🏫 ' + currentSession.name}
                    {currentSession.role === 'ADMIN' && '🛡️ Administrator'}
                    {currentSession.role === 'PLACEMENT_OFFICER' && '💼 Placement Officer'}
                    <ChevronDown className="w-3 h-3 text-slate-400 ml-1" />
                  </div>
                </div>
              </div>

              {/* Role Dropdown */}
              <div className="absolute right-0 mt-1 w-64 p-1.5 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                <div className="px-2 py-1 text-[11px] text-slate-400 font-semibold border-b border-slate-800 mb-1">
                  Switch Active Persona:
                </div>
                <button
                  type="button"
                  onClick={() => onRoleChange('STUDENT')}
                  className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between ${
                    currentSession.role === 'STUDENT' ? 'bg-amber-500/15 text-amber-300 font-bold' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>🎓 Rithika Demo (Student)</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">CSE 3rd Yr</span>
                </button>
                <button
                  type="button"
                  onClick={() => onRoleChange('FACULTY')}
                  className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between ${
                    currentSession.role === 'FACULTY' ? 'bg-amber-500/15 text-amber-300 font-bold' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>👨‍🏫 Dr. Demo Faculty (Faculty)</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">CSE Dept</span>
                </button>
                <button
                  type="button"
                  onClick={() => onRoleChange('PLACEMENT_OFFICER')}
                  className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between ${
                    currentSession.role === 'PLACEMENT_OFFICER' ? 'bg-amber-500/15 text-amber-300 font-bold' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>💼 Placement Officer</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">T&amp;P Desk</span>
                </button>
                <button
                  type="button"
                  onClick={() => onRoleChange('ADMIN')}
                  className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between ${
                    currentSession.role === 'ADMIN' ? 'bg-amber-500/15 text-amber-300 font-bold' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>🛡️ Campus Administrator</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">Root</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Comprehensive Navigation Strip */}
        <nav className="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-slate-800/80 overflow-x-auto no-scrollbar text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('institutional')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'institutional'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            Institutional Hub
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('navigation')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'navigation'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Campus Map &amp; Nav
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('student')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'student'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            Student Action Center
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('placement')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'placement'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            Placement Intelligence
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('slides')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'slides'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Presentation className="w-3.5 h-3.5 text-amber-400" />
            Google Slides
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('assessments')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'assessments'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            Mock Assessment
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('prep')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'prep'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Resume ATS Readiness
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('classrooms')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'classrooms'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            Smart Classrooms
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('canteen')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'canteen'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            Smart Canteen
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('lost_found')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'lost_found'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Lost &amp; Found
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ideas')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'ideas'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            Ideas &amp; Feedback
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('events')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'events'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Events &amp; Fest
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('achievements')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'achievements'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            Achievements
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('analytics')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'analytics'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Analytics
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('iot')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'iot'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            IoT Telemetry
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ai_copilot')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'ai_copilot'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            Nexus AI RAG
          </button>

          {/* Role specific portals */}
          {currentSession.role === 'FACULTY' && (
            <button
              type="button"
              onClick={() => setActiveTab('faculty_portal')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'faculty_portal'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-amber-400" />
              Faculty Portal
            </button>
          )}

          {currentSession.role === 'PLACEMENT_OFFICER' && (
            <button
              type="button"
              onClick={() => setActiveTab('placement_portal')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'placement_portal'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
              T&amp;P Portal
            </button>
          )}

          <button
            type="button"
            onClick={() => setActiveTab('governance')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'governance'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Admin Governance
          </button>
        </nav>
      </div>
    </header>
  );
};
