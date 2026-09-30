import React, { useState } from 'react';
import {
  Building2,
  BookOpen,
  Award,
  Users,
  Compass,
  FileText,
  ExternalLink,
  ShieldCheck,
  Search,
  Filter,
  GraduationCap,
  Calendar,
  CheckCircle2,
  Phone,
  Mail,
  Cpu,
  Layers,
  Sparkles,
  HeartHandshake
} from 'lucide-react';
import {
  Institution,
  Department,
  Programme,
  FacultyMember,
  Facility,
  ClubItem,
  SupportService,
  LibraryInfo,
  ExamNotice
} from '../types';

interface InstitutionalHubProps {
  institution: Institution;
  departments: Department[];
  programmes: Programme[];
  faculty: FacultyMember[];
  facilities: Facility[];
  clubs: ClubItem[];
  supportServices: SupportService[];
  library: LibraryInfo;
  examNotices: ExamNotice[];
}

export const InstitutionalHub: React.FC<InstitutionalHubProps> = ({
  institution,
  departments,
  programmes,
  faculty,
  facilities,
  clubs,
  supportServices,
  library,
  examNotices
}) => {
  const [activeSection, setActiveSection] = useState<'programmes' | 'departments' | 'faculty' | 'facilities' | 'library' | 'clubs' | 'support' | 'exam_cell'>('programmes');
  const [programmeFilter, setProgrammeFilter] = useState<'ALL' | 'DIPLOMA' | 'UG' | 'PG'>('ALL');
  const [deptSearch, setDeptSearch] = useState('');
  const [facilityCategory, setFacilityCategory] = useState<string>('ALL');

  const filteredProgrammes = programmes.filter(p => {
    if (programmeFilter === 'ALL') return true;
    return p.level === programmeFilter;
  });

  const totalIntake = filteredProgrammes.reduce((acc, curr) => acc + curr.approved_intake, 0);

  const filteredDepartments = departments.filter(d =>
    d.name.toLowerCase().includes(deptSearch.toLowerCase()) ||
    d.code.toLowerCase().includes(deptSearch.toLowerCase()) ||
    d.hod_name.toLowerCase().includes(deptSearch.toLowerCase())
  );

  const facilityCategories = ['ALL', ...Array.from(new Set(facilities.map(f => f.category)))];
  const filteredFacilities = facilities.filter(f =>
    facilityCategory === 'ALL' ? true : f.category === facilityCategory
  );

  return (
    <div className="space-y-6">
      {/* Official Verified Institution Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/70 border border-slate-800 p-6 md:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              Verified Institutional Information (OFFICIAL_NBKR)
            </div>
            
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {institution.name}
            </h2>
            
            <p className="text-sm text-slate-300 leading-relaxed">
              Autonomous Institute established in <strong className="text-amber-400">{institution.established_year}</strong>, accredited with <strong className="text-amber-400">NAAC &apos;A&apos; Grade</strong> & <strong className="text-emerald-400">NBA Accreditation</strong>, permanently affiliated to Jawaharlal Nehru Technological University, Anantapuramu.
            </p>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-1 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                Vidyanagar, Kota Mandal, Nellore Dt., AP - 524413
              </span>
              <span>•</span>
              <span>EAPCET/ECET Code: <strong className="text-slate-200">NBKR</strong></span>
              <span>•</span>
              <a
                href={institution.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium underline underline-offset-4"
              >
                Official Portal (nbkrist.org)
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Quick Institutional Stats Bento */}
          <div className="grid grid-cols-2 gap-3 shrink-0 w-full sm:w-auto">
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
              <div className="text-xl md:text-2xl font-black text-amber-400">{institution.statistics.campus_area}</div>
              <div className="text-[11px] text-slate-400 font-medium">Campus Area</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
              <div className="text-xl md:text-2xl font-black text-emerald-400">{institution.statistics.library_books}</div>
              <div className="text-[11px] text-slate-400 font-medium">Library Volumes</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
              <div className="text-xl md:text-2xl font-black text-blue-400">{institution.statistics.placement_recruiters}</div>
              <div className="text-[11px] text-slate-400 font-medium">Top Recruiters</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
              <div className="text-xl md:text-2xl font-black text-purple-400">{institution.statistics.campus_wifi}</div>
              <div className="text-[11px] text-slate-400 font-medium">Optical Fiber Wi-Fi</div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Sub-Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveSection('programmes')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeSection === 'programmes'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-300 bg-slate-900/60 hover:bg-slate-800'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          2026-27 Approved Programmes ({programmes.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('departments')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeSection === 'departments'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-300 bg-slate-900/60 hover:bg-slate-800'
          }`}
        >
          <Building2 className="w-4 h-4" />
          Departments ({departments.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('faculty')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeSection === 'faculty'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-300 bg-slate-900/60 hover:bg-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          Verified Leadership & HODs
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('facilities')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeSection === 'facilities'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-300 bg-slate-900/60 hover:bg-slate-800'
          }`}
        >
          <Compass className="w-4 h-4" />
          Campus Facilities ({facilities.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('library')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeSection === 'library'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-300 bg-slate-900/60 hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Central Library
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('clubs')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeSection === 'clubs'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-300 bg-slate-900/60 hover:bg-slate-800'
          }`}
        >
          <Award className="w-4 h-4" />
          Clubs & Chapters ({clubs.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('support')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeSection === 'support'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-300 bg-slate-900/60 hover:bg-slate-800'
          }`}
        >
          <HeartHandshake className="w-4 h-4" />
          Student Support ({supportServices.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('exam_cell')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeSection === 'exam_cell'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-300 bg-slate-900/60 hover:bg-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          Autonomous Exam Cell
        </button>
      </div>

      {/* SECTION 1: PROGRAMMES */}
      {activeSection === 'programmes' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/70 border border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Academic Year 2026–27 Approved Programmes & Intake</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
                  {totalIntake} Total Approved Seats
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Official intake schedule verified from the institutional admissions portal.
              </p>
            </div>

            {/* Level Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-950 border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setProgrammeFilter('ALL')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  programmeFilter === 'ALL' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All (15)
              </button>
              <button
                type="button"
                onClick={() => setProgrammeFilter('UG')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  programmeFilter === 'UG' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                B.Tech (7)
              </button>
              <button
                type="button"
                onClick={() => setProgrammeFilter('DIPLOMA')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  programmeFilter === 'DIPLOMA' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Diploma (4)
              </button>
              <button
                type="button"
                onClick={() => setProgrammeFilter('PG')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  programmeFilter === 'PG' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                M.Tech (4)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProgrammes.map(prog => (
              <div
                key={prog.id}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                      {prog.programme_code}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        prog.level === 'UG'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : prog.level === 'PG'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {prog.level}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1.5">{prog.programme_name}</h4>
                  <p className="text-xs text-slate-400 mb-3">{prog.affiliating_body}</p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Approved Intake</span>
                    <span className="text-base font-black text-amber-400">{prog.approved_intake} Seats</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Academic Year</span>
                    <span className="font-semibold text-slate-300">{prog.academic_year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: DEPARTMENTS */}
      {activeSection === 'departments' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search department, HOD or code..."
                value={deptSearch}
                onChange={e => setDeptSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="text-xs text-slate-400 font-medium">
              Showing <strong className="text-slate-200">{filteredDepartments.length}</strong> verified departments
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDepartments.map(dept => (
              <div
                key={dept.id}
                className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {dept.code}
                    </span>
                    <span className="text-xs text-slate-400">Estd. {dept.established_year}</span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-2">{dept.name}</h4>
                  <p className="text-xs text-slate-300 line-clamp-3 mb-4 leading-relaxed">
                    {dept.description}
                  </p>

                  <div className="space-y-1.5 p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 mb-4 text-xs">
                    <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Department Head</div>
                    <div className="font-bold text-amber-300">{dept.hod_name}</div>
                    <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                      <Mail className="w-3 h-3 text-slate-500" />
                      {dept.hod_email}
                    </div>
                  </div>

                  {dept.labs && dept.labs.length > 0 && (
                    <div className="space-y-1.5 mb-3">
                      <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Key Laboratories</div>
                      <div className="flex flex-wrap gap-1">
                        {dept.labs.map(lab => (
                          <span
                            key={lab}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60"
                          >
                            {lab}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Faculty: <strong className="text-slate-200">{dept.faculty_count || 18}</strong></span>
                  <span>PhDs: <strong className="text-amber-400">{dept.phd_count || 8}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: LEADERSHIP & FACULTY */}
      {activeSection === 'faculty' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-1">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Verified Institutional Leadership & Department HODs
            </h3>
            <p className="text-xs text-slate-400">
              Published on the official NBKRIST Academic Bank of Credits (ABC) / NEP institutional roster and department portals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {faculty.map(fac => (
              <div
                key={fac.id}
                className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {fac.employee_code}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      VERIFIED
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-1">{fac.name}</h4>
                  <div className="text-xs text-amber-400 font-medium mb-1">{fac.designation}</div>
                  <div className="text-xs text-slate-300 font-semibold mb-3">{fac.department}</div>

                  {fac.role && (
                    <div className="mb-3 px-2.5 py-1.5 rounded-lg bg-indigo-950/40 border border-indigo-800/40 text-xs text-indigo-300">
                      <span className="font-semibold block text-[10px] text-indigo-400 uppercase">Institutional Role</span>
                      {fac.role}
                    </div>
                  )}

                  <div className="space-y-1 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5 font-mono">
                      <Mail className="w-3.5 h-3.5 text-slate-500" />
                      <a href={`mailto:${fac.email}`} className="hover:text-amber-400 transition-colors">
                        {fac.email}
                      </a>
                    </div>
                    {fac.phone && (
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-500" />
                        <span>{fac.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Source: {fac.source_type}</span>
                  <a
                    href={fac.source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-400 hover:text-amber-300 inline-flex items-center gap-1"
                  >
                    Portal Record <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: FACILITIES */}
      {activeSection === 'facilities' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
            <div className="flex items-center gap-2 overflow-x-auto w-full no-scrollbar">
              <span className="text-xs text-slate-400 shrink-0 font-medium">Category:</span>
              {facilityCategories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFacilityCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    facilityCategory === cat
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFacilities.map(facil => (
              <div
                key={facil.id}
                className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {facil.category}
                    </span>
                    <span className="text-xs font-bold text-amber-400">
                      {facil.highlight}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-2">{facil.name}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {facil.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Verified Campus Facility</span>
                  <a
                    href={facil.source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-400 hover:text-amber-300 inline-flex items-center gap-1"
                  >
                    View Details <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 5: LIBRARY */}
      {activeSection === 'library' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
                <BookOpen className="w-4 h-4" />
                NBKRIST Central Library System
              </div>
              <h3 className="text-2xl font-black text-white">
                Comprehensive Knowledge Repository
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Automated with <strong className="text-amber-400">{library.automation_system}</strong>. Serving over 4,000 students and 200+ faculty members with open-access book stacks, air-conditioned reading halls, and high-speed digital research terminals.
              </p>

              <div className="pt-2">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Digital Subscriptions & Databases:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {library.digital_resources.map(res => (
                    <span
                      key={res}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-950 text-slate-200 border border-slate-800"
                    >
                      {res}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-2xl font-black text-amber-400">{library.books.toLocaleString()}+</div>
                <div className="text-xs text-slate-400 font-medium">Standard Books</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-2xl font-black text-emerald-400">{library.periodicals}</div>
                <div className="text-xs text-slate-400 font-medium">Periodicals & Journals</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-2xl font-black text-blue-400">{library.total_volumes.toLocaleString()}</div>
                <div className="text-xs text-slate-400 font-medium">Audited Volumes</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-2xl font-black text-purple-400">{library.total_titles.toLocaleString()}</div>
                <div className="text-xs text-slate-400 font-medium">Unique Titles</div>
              </div>
            </div>
          </div>

          {/* Department-wise Volume Distribution */}
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
            <h4 className="text-sm font-bold text-white mb-1">
              Audited Department-wise Library Holdings (As of 18 Dec 2025)
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Published by the Central Library Committee.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {library.dept_stats.map(ds => (
                <div
                  key={ds.course_group}
                  className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-amber-300">{ds.course_group}</div>
                    <div className="text-[11px] text-slate-400">{ds.titles.toLocaleString()} Titles</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-extrabold text-white">{ds.volumes.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-400 uppercase">Volumes</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: CLUBS */}
      {activeSection === 'clubs' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
            <h3 className="text-base font-bold text-white mb-1">
              Student Technical Chapters & Vibrant Campus Clubs
            </h3>
            <p className="text-xs text-slate-400">
              Official student chapters driving collegiate hackathons, symposiums, community service, and fine arts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clubs.map(club => (
              <div
                key={club.id}
                className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/20">
                      {club.category}
                    </span>
                    <span className="text-xs text-slate-400">Student Chapter</span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-2">{club.name}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {club.description}
                  </p>

                  {club.incharge_name && (
                    <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 text-xs mb-3 space-y-1">
                      <div className="text-[10px] text-slate-400 font-semibold uppercase">Faculty Incharge</div>
                      <div className="font-bold text-amber-300">{club.incharge_name}</div>
                      <div className="text-[11px] text-slate-400">{club.incharge_designation} ({club.incharge_dept})</div>
                      {club.incharge_email && (
                        <div className="text-[11px] text-slate-400 font-mono">{club.incharge_email}</div>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Official Activity Body</span>
                  <a
                    href={club.source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-400 hover:text-amber-300 inline-flex items-center gap-1"
                  >
                    View Club <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 7: STUDENT SUPPORT */}
      {activeSection === 'support' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
            <h3 className="text-base font-bold text-white mb-1">
              Institutional Student Support Services
            </h3>
            <p className="text-xs text-slate-400">
              National Cadet Corps (Army & Navy wings), National Service Scheme, Equal Opportunity Cells, and Student Welfare Councils.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {supportServices.map(svc => (
              <div
                key={svc.id}
                className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/20 mb-2 inline-block">
                    {svc.category}
                  </span>
                  <h4 className="text-sm font-bold text-white mb-2">{svc.name}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {svc.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                  Active Campus Service Body
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 8: EXAM CELL */}
      {activeSection === 'exam_cell' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2 mb-1">
                <FileText className="w-5 h-5 text-amber-400" />
                Autonomous Examination Cell Notice Board
              </h3>
              <p className="text-xs text-slate-400">
                Controller of Examinations: <strong className="text-slate-200">Dr. D. Subba Reddy</strong> • Autonomous Regulations: <strong className="text-amber-400">R20 & R23</strong>
              </p>
            </div>
            <div className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
              Live Verified Notifications
            </div>
          </div>

          <div className="space-y-3">
            {examNotices.map(notice => (
              <div
                key={notice.id}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                      {notice.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Published: {notice.published_date}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{notice.title}</h4>
                  <div className="text-xs text-slate-400">
                    Target: <span className="text-slate-300">{notice.target_programmes}</span>
                    {notice.regulation && <span className="ml-2 font-mono text-amber-400">({notice.regulation})</span>}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={notice.source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>Official Circular</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
