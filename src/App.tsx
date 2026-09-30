import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CollegeHero } from './components/CollegeHero';
import { InstitutionalHub } from './components/InstitutionalHub';
import { CampusNavigation } from './components/CampusNavigation';
import { PlacementEngine } from './components/PlacementEngine';
import { StudentIntelligence } from './components/StudentIntelligence';
import { NexusAICopilot } from './components/NexusAICopilot';
import { AdminGovernance } from './components/AdminGovernance';
import { SmartCanteen } from './components/SmartCanteen';
import { SmartClassrooms } from './components/SmartClassrooms';
import { LostAndFound } from './components/LostAndFound';
import { IdeasAndFeedback } from './components/IdeasAndFeedback';
import { CampusEvents } from './components/CampusEvents';
import { StudentAchievements } from './components/StudentAchievements';
import { MockAssessments } from './components/MockAssessments';
import { PlacementPrep } from './components/PlacementPrep';
import { CampusAnalytics } from './components/CampusAnalytics';
import { IoTTelemetry } from './components/IoTTelemetry';
import { FacultyPortal } from './components/FacultyPortal';
import { PlacementOfficerPortal } from './components/PlacementOfficerPortal';
import { GoogleSlidesHub } from './components/GoogleSlidesHub';
import { NotificationModal } from './components/NotificationModal';
import { LoginModal } from './components/LoginModal';
import {
  UserSession,
  UserRole,
  DataEnvironment,
  Institution,
  Department,
  Programme,
  FacultyMember,
  Facility,
  ClubItem,
  SupportService,
  LibraryInfo,
  ExamNotice,
  PlacementCompany,
  PlacementDrive,
  StudentProfile,
  DeadlineItem,
  ComplaintItem,
  AcademicResource
} from './types';
import { apiService } from './services/api';
import { OFFICIAL_INSTITUTION } from './data/institutionalData';
import { DEMO_USERS } from './data/demoData';
import {
  EXTENDED_CAMPUS_LOCATIONS,
  EXTENDED_LOST_FOUND,
  EXTENDED_STUDENT_IDEAS,
  EXTENDED_CAMPUS_EVENTS,
  EXTENDED_CLASSROOMS,
  EXTENDED_CANTEEN_MENU,
  EXTENDED_STUDENT_ACHIEVEMENTS,
  EXTENDED_MOCK_QUESTIONS,
  EXTENDED_IOT_TELEMETRY,
  CampusLocation,
  LostFoundItem,
  StudentIdea,
  CampusEvent,
  ClassroomOccupancy,
  CanteenMenuItem,
  StudentAchievement,
  MockQuestion,
  IoTTelemetryData
} from './data/extendedData';

export default function App() {
  const [currentSession, setCurrentSession] = useState<UserSession>(DEMO_USERS[0]);
  const [activeTab, setActiveTab] = useState<string>('institutional');
  const [environmentFilter, setEnvironmentFilter] = useState<'ALL' | DataEnvironment>('ALL');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Core Data States
  const [institution, setInstitution] = useState<Institution>(OFFICIAL_INSTITUTION);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [faculty, setFaculty] = useState<FacultyMember[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [clubs, setClubs] = useState<ClubItem[]>([]);
  const [supportServices, setSupportServices] = useState<SupportService[]>([]);
  const [library, setLibrary] = useState<LibraryInfo | null>(null);
  const [examNotices, setExamNotices] = useState<ExamNotice[]>([]);

  const [companies, setCompanies] = useState<PlacementCompany[]>([]);
  const [drives, setDrives] = useState<PlacementDrive[]>([]);
  const [studentsList, setStudentsList] = useState<StudentProfile[]>([]);
  const [currentStudent, setCurrentStudent] = useState<StudentProfile | null>(null);
  const [deadlines, setDeadlines] = useState<DeadlineItem[]>([]);
  const [complaints, setComplaints] = useState<ComplaintItem[]>([]);
  const [resources, setResources] = useState<AcademicResource[]>([]);

  // Extended Campus Feature States
  const [locations, setLocations] = useState<CampusLocation[]>(EXTENDED_CAMPUS_LOCATIONS);
  const [lostFound, setLostFound] = useState<LostFoundItem[]>(EXTENDED_LOST_FOUND);
  const [ideas, setIdeas] = useState<StudentIdea[]>(EXTENDED_STUDENT_IDEAS);
  const [events, setEvents] = useState<CampusEvent[]>(EXTENDED_CAMPUS_EVENTS);
  const [classrooms, setClassrooms] = useState<ClassroomOccupancy[]>(EXTENDED_CLASSROOMS);
  const [canteenMenu, setCanteenMenu] = useState<CanteenMenuItem[]>(EXTENDED_CANTEEN_MENU);
  const [canteenCrowdStatus, setCanteenCrowdStatus] = useState<string>('Moderate Wait Time (~8 mins)');
  const [canteenQueueCount, setCanteenQueueCount] = useState<number>(14);
  const [achievements, setAchievements] = useState<StudentAchievement[]>(EXTENDED_STUDENT_ACHIEVEMENTS);
  const [mockQuestions, setMockQuestions] = useState<MockQuestion[]>(EXTENDED_MOCK_QUESTIONS);
  const [telemetry, setTelemetry] = useState<IoTTelemetryData>(EXTENDED_IOT_TELEMETRY);

  const [loading, setLoading] = useState(true);

  // Initial Load
  const loadAllData = async () => {
    try {
      const [
        inst,
        depts,
        progs,
        fac,
        facils,
        clbs,
        supp,
        lib,
        notices,
        comps,
        drvs,
        stus,
        dls,
        cmps,
        resrcs,
        locs,
        lf,
        ide,
        evts,
        cls,
        canteen,
        ach,
        mockQ,
        iot
      ] = await Promise.all([
        apiService.getInstitution(),
        apiService.getDepartments(),
        apiService.getProgrammes(),
        apiService.getFaculty(),
        apiService.getFacilities(),
        apiService.getClubs(),
        apiService.getSupportServices(),
        apiService.getLibrary(),
        apiService.getExamNotices(),
        apiService.getCompanies(),
        apiService.getDrives(),
        apiService.getStudents(),
        apiService.getDeadlines(),
        apiService.getComplaints(),
        apiService.getResources(),
        apiService.getCampusLocations(),
        apiService.getLostFound(),
        apiService.getStudentIdeas(),
        apiService.getEvents(),
        apiService.getClassrooms(),
        apiService.getCanteenMenu(),
        apiService.getAchievements(),
        apiService.getMockQuestions(),
        apiService.getIoTTelemetry()
      ]);

      setInstitution(inst);
      setDepartments(depts);
      setProgrammes(progs);
      setFaculty(fac);
      setFacilities(facils);
      setClubs(clbs);
      setSupportServices(supp);
      setLibrary(lib);
      setExamNotices(notices);

      setCompanies(comps);
      setDrives(drvs);
      setStudentsList(stus);
      setCurrentStudent(stus[0]);
      setDeadlines(dls);
      setComplaints(cmps);
      setResources(resrcs);

      setLocations(locs);
      setLostFound(lf);
      setIdeas(ide);
      setEvents(evts);
      setClassrooms(cls);
      setCanteenMenu(canteen.data);
      setCanteenCrowdStatus(canteen.crowdStatus);
      setCanteenQueueCount(canteen.orderQueueCount);
      setAchievements(ach);
      setMockQuestions(mockQ);
      setTelemetry(iot);
    } catch (e) {
      console.error('Error loading initial data', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleRoleChange = (role: UserRole) => {
    const user = DEMO_USERS.find(u => u.role === role) || DEMO_USERS[0];
    setCurrentSession(user);

    if (role === 'PLACEMENT_OFFICER') {
      setActiveTab('placement_portal');
    } else if (role === 'ADMIN') {
      setActiveTab('governance');
    } else if (role === 'FACULTY') {
      setActiveTab('faculty_portal');
    } else if (role === 'STUDENT') {
      setActiveTab('student');
    }
  };

  const refreshDrives = async () => {
    const updated = await apiService.getDrives();
    setDrives(updated);
  };

  const refreshStudent = async () => {
    if (!currentStudent) return;
    const updated = await apiService.getCurrentStudent(currentStudent.student_id);
    setCurrentStudent(updated);
  };

  const refreshDeadlines = async () => {
    const updated = await apiService.getDeadlines();
    setDeadlines(updated);
  };

  const refreshComplaints = async () => {
    const updated = await apiService.getComplaints();
    setComplaints(updated);
  };

  const refreshResources = async () => {
    const updated = await apiService.getResources();
    setResources(updated);
  };

  const refreshLostFound = async () => {
    const updated = await apiService.getLostFound();
    setLostFound(updated);
  };

  const refreshIdeas = async () => {
    const updated = await apiService.getStudentIdeas();
    setIdeas(updated);
  };

  const refreshEvents = async () => {
    const updated = await apiService.getEvents();
    setEvents(updated);
  };

  if (loading || !library || !currentStudent) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-white p-1 border-2 border-amber-500/60 shadow-2xl flex items-center justify-center mx-auto animate-pulse">
            <img
              src="/images/nbkrist-logo.jpg"
              alt="NBKRIST"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">NBKR NEXUS</h2>
            <p className="text-xs text-slate-400">Loading Enterprise Smart Campus &amp; Placement Layer...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Universal Header with Official Logo, Notifications & Role Switcher */}
      <Header
        currentSession={currentSession}
        onRoleChange={handleRoleChange}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        environmentFilter={environmentFilter}
        setEnvironmentFilter={setEnvironmentFilter}
        onOpenNotifications={() => setIsNotificationOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8">
        {/* Prominent Hero with Entrance Arch & Official Logo */}
        <CollegeHero
          institution={institution}
          onNavigateTab={setActiveTab}
        />

        {/* 1. Institutional Hub (Official NBKR) */}
        {activeTab === 'institutional' && (
          <InstitutionalHub
            institution={institution}
            departments={departments}
            programmes={programmes}
            faculty={faculty}
            facilities={facilities}
            clubs={clubs}
            supportServices={supportServices}
            library={library}
            examNotices={examNotices}
          />
        )}

        {/* 2. Campus Map & Navigation */}
        {activeTab === 'navigation' && (
          <CampusNavigation locations={locations} />
        )}

        {/* 3. Student Action Center & Copilot */}
        {activeTab === 'student' && (
          <StudentIntelligence
            currentStudent={currentStudent}
            studentsList={studentsList}
            onSelectStudent={setCurrentStudent}
            deadlines={deadlines}
            complaints={complaints}
            resources={resources}
            currentSession={currentSession}
            onRefreshStudent={refreshStudent}
            onRefreshDeadlines={refreshDeadlines}
            onRefreshComplaints={refreshComplaints}
            onRefreshResources={refreshResources}
          />
        )}

        {/* 4. Placement Intelligence Engine */}
        {activeTab === 'placement' && (
          <PlacementEngine
            companies={companies}
            drives={drives}
            currentStudent={currentStudent}
            currentSession={currentSession}
            onRefreshDrives={refreshDrives}
            onRefreshStudent={refreshStudent}
          />
        )}

        {/* Google Slides Presentation Hub */}
        {activeTab === 'slides' && (
          <GoogleSlidesHub />
        )}

        {/* 5. Mock Assessments */}
        {activeTab === 'assessments' && (
          <MockAssessments questions={mockQuestions} />
        )}

        {/* 6. Placement Preparation & ATS Resume Readiness */}
        {activeTab === 'prep' && (
          <PlacementPrep student={currentStudent} />
        )}

        {/* 7. Smart Classrooms & Labs */}
        {activeTab === 'classrooms' && (
          <SmartClassrooms classrooms={classrooms} />
        )}

        {/* 8. Smart Canteen */}
        {activeTab === 'canteen' && (
          <SmartCanteen
            menu={canteenMenu}
            crowdStatus={canteenCrowdStatus}
            orderQueueCount={canteenQueueCount}
          />
        )}

        {/* 9. Lost & Found */}
        {activeTab === 'lost_found' && (
          <LostAndFound
            items={lostFound}
            onRefresh={refreshLostFound}
          />
        )}

        {/* 10. Ideas & Feedback */}
        {activeTab === 'ideas' && (
          <IdeasAndFeedback
            ideas={ideas}
            onRefresh={refreshIdeas}
          />
        )}

        {/* 11. Campus Events & Fest */}
        {activeTab === 'events' && (
          <CampusEvents
            events={events}
            onRefresh={refreshEvents}
          />
        )}

        {/* 12. Student Achievements */}
        {activeTab === 'achievements' && (
          <StudentAchievements achievements={achievements} />
        )}

        {/* 13. Campus Analytics */}
        {activeTab === 'analytics' && (
          <CampusAnalytics programmes={programmes} />
        )}

        {/* 14. IoT Smart Campus Telemetry */}
        {activeTab === 'iot' && (
          <IoTTelemetry telemetry={telemetry} />
        )}

        {/* 15. Nexus AI Copilot */}
        {activeTab === 'ai_copilot' && (
          <NexusAICopilot currentStudent={currentStudent} />
        )}

        {/* 16. Faculty Portal */}
        {activeTab === 'faculty_portal' && (
          <FacultyPortal
            currentSession={currentSession}
            students={studentsList}
            deadlines={deadlines}
            complaints={complaints}
            onAddDeadline={async (dl) => {
              await apiService.addDeadline(dl);
              refreshDeadlines();
            }}
          />
        )}

        {/* 17. Placement Officer Portal */}
        {activeTab === 'placement_portal' && (
          <PlacementOfficerPortal
            drives={drives}
            companies={companies}
            students={studentsList}
            onOpenCreateDrive={() => setActiveTab('placement')}
          />
        )}

        {/* 18. Admin Governance & Ingestion */}
        {activeTab === 'governance' && (
          <AdminGovernance
            onResetComplete={() => {
              loadAllData();
            }}
          />
        )}
      </main>

      {/* Notification Center Modal */}
      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      {/* Authentication & Credentials Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        currentSession={currentSession}
        onLoginSuccess={(session) => {
          setCurrentSession(session);
          if (session.role === 'STUDENT') setActiveTab('student');
          else if (session.role === 'FACULTY') setActiveTab('faculty_portal');
          else if (session.role === 'PLACEMENT_OFFICER') setActiveTab('placement_portal');
          else if (session.role === 'ADMIN') setActiveTab('governance');
        }}
      />

      {/* Institutional Enterprise Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/90 px-4 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-lg bg-white p-0.5 shrink-0 border border-amber-500/50 flex items-center justify-center">
              <img
                src="/images/nbkrist-logo.jpg"
                alt="NBKRIST Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="text-slate-300 font-bold text-sm">
                N.B.K.R. Institute of Science &amp; Technology (NBKRIST)
              </div>
              <div className="text-slate-400 text-[11px]">
                Autonomous Institute • Estd. 1979 • Vidyanagar, Kota Mandal, SPSR Nellore Dt., AP - 524413
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <a
              href="https://www.nbkrist.org/"
              target="_blank"
              rel="noreferrer"
              className="text-amber-400 hover:text-amber-300 transition-colors"
            >
              Official Website (nbkrist.org)
            </a>
            <span>•</span>
            <span className="text-slate-400">NAAC Grade &apos;A&apos; &amp; NBA Accredited</span>
            <span>•</span>
            <span className="text-slate-400">EAPCET/ECET Code: NBKR</span>
            <span>•</span>
            <span className="text-emerald-400 font-mono">Work is Worship</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
