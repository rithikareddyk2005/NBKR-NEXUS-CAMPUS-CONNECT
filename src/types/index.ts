export type DataEnvironment = 'OFFICIAL_NBKR' | 'DEMO' | 'TEST' | 'PRODUCTION';

export type SourceType = 
  | 'OFFICIAL_WEBSITE' 
  | 'OFFICIAL_DOCUMENT' 
  | 'ADMIN_ENTRY' 
  | 'FACULTY_ENTRY' 
  | 'PLACEMENT_CELL' 
  | 'IMPORTED' 
  | 'DEMO_SEED';

export type VerificationStatus = 
  | 'VERIFIED' 
  | 'PENDING_VERIFICATION' 
  | 'HISTORICAL' 
  | 'DEMO' 
  | 'EXPIRED';

export interface BaseRecord {
  id: string;
  data_environment: DataEnvironment;
  source_type: SourceType;
  source_url: string;
  source_title: string;
  last_verified_at: string;
  verification_status: VerificationStatus;
  created_at?: string;
  updated_at?: string;
}

export interface Institution extends BaseRecord {
  institution_code: string;
  name: string;
  short_name: string;
  institution_type: string;
  affiliation: string;
  eapcet_code: string;
  ecet_code: string;
  established_year: number;
  location: string;
  pincode: string;
  website: string;
  email: string;
  alternate_email: string;
  phone_numbers: string[];
  naac_grade: string;
  nba_accredited: boolean;
  statistics: {
    campus_area: string;
    library_books: string;
    library_periodicals: string;
    placement_recruiters: string;
    campus_wifi: string;
  };
}

export interface Department extends BaseRecord {
  code: string;
  name: string;
  established_year: number;
  description: string;
  hod_name: string;
  hod_email: string;
  faculty_count?: number;
  phd_count?: number;
  specializations?: string[];
  labs?: string[];
}

export interface Programme extends BaseRecord {
  programme_code: string;
  programme_name: string;
  level: 'DIPLOMA' | 'UG' | 'PG';
  department_code: string;
  affiliating_body: string;
  academic_year: string;
  approved_intake: number;
  status: 'ACTIVE' | 'ARCHIVED';
}

export interface FacultyMember extends BaseRecord {
  employee_code: string;
  name: string;
  designation: string;
  department: string;
  email: string;
  phone?: string;
  qualification?: string;
  specialization?: string;
  role?: string;
}

export interface Facility extends BaseRecord {
  name: string;
  category: 'ACADEMIC' | 'TECHNOLOGY' | 'HEALTH' | 'TRANSPORT' | 'UTILITY' | 'FINANCIAL' | 'FOOD' | 'RESIDENTIAL' | 'SAFETY' | 'SERVICE' | 'SUSTAINABILITY' | 'EVENT' | 'SPORTS' | 'INNOVATION';
  description: string;
  highlight: string;
}

export interface ClubItem extends BaseRecord {
  name: string;
  category: 'TECHNICAL' | 'PROFESSIONAL' | 'VALUE_EDUCATION' | 'WELLNESS' | 'CULTURAL' | 'LITERARY';
  incharge_name?: string;
  incharge_designation?: string;
  incharge_dept?: string;
  incharge_email?: string;
  incharge_phone?: string;
  description: string;
}

export interface SupportService extends BaseRecord {
  name: string;
  category: 'SERVICE' | 'NATIONAL_SERVICE' | 'STUDENT_SUPPORT' | 'ENTREPRENEURSHIP';
  description: string;
  coordinator?: string;
}

export interface LibraryDepartmentStat {
  course_group: string;
  volumes: number;
  titles: number;
}

export interface LibraryInfo extends BaseRecord {
  name: string;
  books: number;
  periodicals: number;
  total_volumes: number;
  total_titles: number;
  automation_system: string;
  digital_resources: string[];
  dept_stats: LibraryDepartmentStat[];
}

export interface ExamNotice extends BaseRecord {
  title: string;
  category: 'NOTIFICATION' | 'CIRCULAR' | 'SCHEDULE' | 'RESULT' | 'TIMETABLE';
  published_date: string;
  target_programmes: string;
  regulation?: string;
  pdf_name?: string;
}

export interface PlacementCompany extends BaseRecord {
  name: string;
  sector: string;
  tier: 'Dream' | 'Tier-1' | 'Tier-2' | 'Core';
  avg_ctc: string;
  highest_ctc?: string;
  roles: string[];
  location: string;
}

export interface PlacementDrive extends BaseRecord {
  company_name: string;
  job_title: string;
  ctc: string;
  drive_date: string;
  deadline_date: string;
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED';
  eligibility: {
    minimum_cgpa: number;
    allowed_branches: string[];
    maximum_backlogs: number;
    required_skills: string[];
  };
  rounds: string[];
  total_applicants: number;
  selected_count?: number;
}

export interface StudentProfile extends BaseRecord {
  student_id: string;
  name: string;
  email: string;
  department: string;
  year: number;
  section: string;
  cgpa: number;
  active_backlogs: number;
  history_backlogs: number;
  attendance_pct: number;
  skills: string[];
  certifications: Array<{ title: string; issuer: string; year: number }>;
  projects: Array<{ title: string; tech: string; description: string; link?: string }>;
  applied_drives: Array<{ drive_id: string; company_name: string; status: 'APPLIED' | 'SHORTLISTED' | 'INTERVIEW_SCHEDULED' | 'SELECTED' | 'REJECTED'; applied_at: string }>;
}

export interface DeadlineItem extends BaseRecord {
  title: string;
  category: 'ASSIGNMENT' | 'LAB_RECORD' | 'PLACEMENT' | 'EVENT' | 'PROJECT' | 'ACADEMIC';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  due_date: string;
  days_remaining: number;
  completed: boolean;
  assigned_by?: string;
}

export interface ComplaintItem extends BaseRecord {
  title: string;
  category: 'ELECTRICAL' | 'WATER' | 'FURNITURE' | 'CLEANLINESS' | 'NETWORK' | 'ACADEMIC';
  location: string;
  status: 'OPEN' | 'ASSIGNED' | 'IN_PROGRESS' | 'RESOLVED';
  filed_by: string;
  assigned_to?: string;
  resolution_note?: string;
  submitted_at: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface AcademicResource extends BaseRecord {
  title: string;
  category: 'NOTES' | 'LAB_MANUAL' | 'QUESTION_PAPER' | 'SYLLABUS';
  subject: string;
  semester: string;
  department: string;
  faculty_author?: string;
  file_format: string;
  downloads_count: number;
}

export interface AISourceCitation {
  title: string;
  url: string;
  data_environment: DataEnvironment;
  verification_status: VerificationStatus;
  note?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: AISourceCitation[];
  mode?: 'institutional' | 'student';
}

export type UserRole = 'STUDENT' | 'FACULTY' | 'ADMIN' | 'PLACEMENT_OFFICER';

export interface UserSession {
  email: string;
  name: string;
  role: UserRole;
  data_environment: DataEnvironment;
  student_id?: string;
  employee_code?: string;
}
