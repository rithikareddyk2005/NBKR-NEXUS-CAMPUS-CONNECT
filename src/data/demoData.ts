import {
  StudentProfile,
  PlacementCompany,
  PlacementDrive,
  DeadlineItem,
  ComplaintItem,
  AcademicResource,
  UserSession
} from '../types';

export const DEMO_USERS: UserSession[] = [
  {
    email: 'student@nbknexus.demo',
    name: 'Rithika Demo',
    role: 'STUDENT',
    student_id: 'DEMO-STU-001',
    data_environment: 'DEMO'
  },
  {
    email: 'faculty@nbknexus.demo',
    name: 'Dr. Demo Faculty One',
    role: 'FACULTY',
    employee_code: 'DEMO-FAC-001',
    data_environment: 'DEMO'
  },
  {
    email: 'admin@nbknexus.demo',
    name: 'Campus Administrator',
    role: 'ADMIN',
    data_environment: 'DEMO'
  },
  {
    email: 'placement@nbknexus.demo',
    name: 'Placement Officer',
    role: 'PLACEMENT_OFFICER',
    data_environment: 'DEMO'
  }
];

export const DEMO_STUDENTS: StudentProfile[] = [
  {
    id: 'STU-001',
    student_id: 'DEMO-STU-001',
    name: 'Rithika Demo',
    email: 'student@nbknexus.demo',
    department: 'CSE',
    year: 3,
    section: 'A',
    cgpa: 7.8,
    active_backlogs: 0,
    history_backlogs: 0,
    attendance_pct: 88.5,
    skills: ['Python', 'SQL', 'Java', 'Machine Learning', 'Data Structures', 'React'],
    certifications: [
      { title: 'Oracle Certified Associate: Java SE 8', issuer: 'Oracle', year: 2025 },
      { title: 'Applied Data Science with Python', issuer: 'IBM / Coursera', year: 2025 },
      { title: 'AWS Academy Cloud Foundations', issuer: 'Amazon Web Services', year: 2026 }
    ],
    projects: [
      {
        title: 'Smart Campus Waste Management System',
        tech: 'IoT, Python, OpenCV',
        description: 'Automated bin load tracking with image recognition for smart garbage collection alerts across university blocks.'
      },
      {
        title: 'Distributed Exam Result Portal',
        tech: 'React, Node.js, PostgreSQL',
        description: 'High concurrency web application with cryptographic grade marksheet verification via SHA-256 tokens.'
      }
    ],
    applied_drives: [
      {
        drive_id: 'DRIVE-001',
        company_name: 'TechNova Solutions',
        status: 'SHORTLISTED',
        applied_at: '2026-09-22'
      }
    ],
    data_environment: 'DEMO',
    source_type: 'DEMO_SEED',
    source_url: 'https://demo.nbknexus.internal/students/001',
    source_title: 'Demo Student Record System',
    last_verified_at: '2026-09-30',
    verification_status: 'DEMO'
  },
  {
    id: 'STU-002',
    student_id: 'DEMO-STU-002',
    name: 'Ananya Demo',
    email: 'ananya.demo@nbknexus.demo',
    department: 'CSE',
    year: 3,
    section: 'A',
    cgpa: 8.6,
    active_backlogs: 0,
    history_backlogs: 0,
    attendance_pct: 92.4,
    skills: ['Python', 'Java', 'DSA', 'SQL', 'Spring Boot', 'Docker'],
    certifications: [
      { title: 'Google Professional Cloud Architect', issuer: 'Google Cloud', year: 2025 }
    ],
    projects: [
      {
        title: 'AI Automated Code Reviewer',
        tech: 'Python, LLMs, FastAPI',
        description: 'Analyzes student pull requests for code smells, cyclomatic complexity, and test coverage.'
      }
    ],
    applied_drives: [],
    data_environment: 'DEMO',
    source_type: 'DEMO_SEED',
    source_url: 'https://demo.nbknexus.internal/students/002',
    source_title: 'Demo Student Record System',
    last_verified_at: '2026-09-30',
    verification_status: 'DEMO'
  },
  {
    id: 'STU-003',
    student_id: 'DEMO-STU-003',
    name: 'Rahul Demo',
    email: 'rahul.demo@nbknexus.demo',
    department: 'ECE',
    year: 4,
    section: 'B',
    cgpa: 7.4,
    active_backlogs: 0,
    history_backlogs: 1,
    attendance_pct: 82.0,
    skills: ['Embedded Systems', 'C', 'IoT', 'MATLAB', 'VLSI Verilog'],
    certifications: [
      { title: 'ARM Microcontroller Architecture', issuer: 'ARM Education', year: 2025 }
    ],
    projects: [
      {
        title: 'Campus Solar Array Power Telemetry',
        tech: 'ESP32, MQTT, C++',
        description: 'Real-time telemetry unit monitoring kilowatt-hour yields across college rooftop panels.'
      }
    ],
    applied_drives: [],
    data_environment: 'DEMO',
    source_type: 'DEMO_SEED',
    source_url: 'https://demo.nbknexus.internal/students/003',
    source_title: 'Demo Student Record System',
    last_verified_at: '2026-09-30',
    verification_status: 'DEMO'
  },
  {
    id: 'STU-004',
    student_id: 'DEMO-STU-004',
    name: 'Priya Demo',
    email: 'priya.demo@nbknexus.demo',
    department: 'EEE',
    year: 3,
    section: 'A',
    cgpa: 8.1,
    active_backlogs: 0,
    history_backlogs: 0,
    attendance_pct: 90.0,
    skills: ['MATLAB', 'Python', 'Electrical Systems', 'Simulink', 'Power World'],
    certifications: [
      { title: 'Smart Grid & Renewable Integration', issuer: 'IEEE Power & Energy', year: 2025 }
    ],
    projects: [
      {
        title: 'EV Battery Management Algorithm',
        tech: 'MATLAB/Simulink, Python',
        description: 'Thermal modeling and state-of-charge estimator for lithium-iron-phosphate battery packs.'
      }
    ],
    applied_drives: [],
    data_environment: 'DEMO',
    source_type: 'DEMO_SEED',
    source_url: 'https://demo.nbknexus.internal/students/004',
    source_title: 'Demo Student Record System',
    last_verified_at: '2026-09-30',
    verification_status: 'DEMO'
  },
  {
    id: 'STU-005',
    student_id: 'DEMO-STU-005',
    name: 'Arjun Demo',
    email: 'arjun.demo@nbknexus.demo',
    department: 'CSE',
    year: 4,
    section: 'B',
    cgpa: 7.9,
    active_backlogs: 0,
    history_backlogs: 0,
    attendance_pct: 85.5,
    skills: ['Python', 'SQL', 'DSA', 'Kubernetes', 'Go'],
    certifications: [
      { title: 'Certified Kubernetes Administrator (CKA)', issuer: 'CNCF', year: 2025 }
    ],
    projects: [
      {
        title: 'High Throughput Message Broker',
        tech: 'Go, gRPC, Protobuf',
        description: 'Lightweight distributed pub-sub engine handling 100k events/sec with sub-millisecond latencies.'
      }
    ],
    applied_drives: [],
    data_environment: 'DEMO',
    source_type: 'DEMO_SEED',
    source_url: 'https://demo.nbknexus.internal/students/005',
    source_title: 'Demo Student Record System',
    last_verified_at: '2026-09-30',
    verification_status: 'DEMO'
  }
];

export const DEMO_COMPANIES: PlacementCompany[] = [
  {
    id: 'COMP-01',
    name: 'TechNova Solutions',
    sector: 'Cloud & AI Enterprise Platforms',
    tier: 'Dream',
    avg_ctc: '14.5 LPA',
    highest_ctc: '22.0 LPA',
    roles: ['Software Development Engineer', 'Cloud Backend Engineer', 'AI Platform Engineer'],
    location: 'Bangalore / Hyderabad',
    data_environment: 'DEMO',
    source_type: 'DEMO_SEED',
    source_url: 'https://demo.nbknexus.internal/companies/technova',
    source_title: 'Demo Placement Portal',
    last_verified_at: '2026-09-30',
    verification_status: 'DEMO'
  },
  {
    id: 'COMP-02',
    name: 'DataSphere Analytics',
    sector: 'Big Data & Financial Intelligence',
    tier: 'Tier-1',
    avg_ctc: '11.2 LPA',
    highest_ctc: '16.5 LPA',
    roles: ['Data Engineer', 'Quantitative Analyst', 'BI Specialist'],
    location: 'Hyderabad',
    data_environment: 'DEMO',
    source_type: 'DEMO_SEED',
    source_url: 'https://demo.nbknexus.internal/companies/datasphere',
    source_title: 'Demo Placement Portal',
    last_verified_at: '2026-09-30',
    verification_status: 'DEMO'
  },
  {
    id: 'COMP-03',
    name: 'CloudCore Technologies',
    sector: 'Infrastructure & Site Reliability',
    tier: 'Tier-1',
    avg_ctc: '9.8 LPA',
    highest_ctc: '14.0 LPA',
    roles: ['DevOps Associate', 'Site Reliability Engineer', 'Network Security Associate'],
    location: 'Pune / Chennai',
    data_environment: 'DEMO',
    source_type: 'DEMO_SEED',
    source_url: 'https://demo.nbknexus.internal/companies/cloudcore',
    source_title: 'Demo Placement Portal',
    last_verified_at: '2026-09-30',
    verification_status: 'DEMO'
  },
  {
    id: 'COMP-04',
    name: 'InnoSoft Systems',
    sector: 'Full Stack & Enterprise Applications',
    tier: 'Core',
    avg_ctc: '7.5 LPA',
    highest_ctc: '10.5 LPA',
    roles: ['Graduate Software Trainee', 'Full Stack Developer', 'Quality Assurance Analyst'],
    location: 'Chennai / Hyderabad',
    data_environment: 'DEMO',
    source_type: 'DEMO_SEED',
    source_url: 'https://demo.nbknexus.internal/companies/innosoft',
    source_title: 'Demo Placement Portal',
    last_verified_at: '2026-09-30',
    verification_status: 'DEMO'
  },
  {
    id: 'COMP-05',
    name: 'FinEdge Digital',
    sector: 'FinTech & Algorithmic Trading',
    tier: 'Tier-1',
    avg_ctc: '10.0 LPA',
    highest_ctc: '18.0 LPA',
    roles: ['Quantitative Software Engineer', 'FinTech Solutions Architect'],
    location: 'Hyderabad / Bangalore',
    data_environment: 'DEMO',
    source_type: 'DEMO_SEED',
    source_url: 'https://demo.nbknexus.internal/companies/finedge',
    source_title: 'Demo Placement Portal',
    last_verified_at: '2026-09-30',
    verification_status: 'DEMO'
  }
];

export const DEMO_PLACEMENT_DRIVES: PlacementDrive[] = [
  {
    id: 'DRIVE-001',
    company_name: 'TechNova Solutions',
    job_title: 'Software Development Engineer - I (Campus Track)',
    ctc: '14.5 LPA CTC',
    drive_date: '2026-10-14',
    deadline_date: '2026-10-06',
    status: 'UPCOMING',
    eligibility: {
      minimum_cgpa: 7.5,
      allowed_branches: ['CSE', 'IT', 'AIML', 'AIDS'],
      maximum_backlogs: 0,
      required_skills: ['Python', 'SQL']
    },
    rounds: ['Online Coding & MCQ Assessment', 'Technical Round 1 (DSA & System Design)', 'Managerial & Cultural Fit', 'HR Round'],
    total_applicants: 124,
    selected_count: 0,
    data_environment: 'DEMO',
    source_type: 'DEMO_SEED',
    source_url: 'https://demo.nbknexus.internal/drives/001',
    source_title: 'Demo Placement Notice',
    last_verified_at: '2026-09-30',
    verification_status: 'DEMO'
  },
  {
    id: 'DRIVE-002',
    company_name: 'DataSphere Analytics',
    job_title: 'Data Engineer & Analytics Specialist',
    ctc: '11.2 LPA CTC',
    drive_date: '2026-10-18',
    deadline_date: '2026-10-09',
    status: 'UPCOMING',
    eligibility: {
      minimum_cgpa: 7.0,
      allowed_branches: ['CSE', 'AIDS', 'AIML', 'IT'],
      maximum_backlogs: 0,
      required_skills: ['SQL', 'Python']
    },
    rounds: ['Data Hackathon & SQL Query Assessment', 'Technical Deep Dive', 'Director Round'],
    total_applicants: 86,
    selected_count: 0,
    data_environment: 'DEMO',
    source_type: 'DEMO_SEED',
    source_url: 'https://demo.nbknexus.internal/drives/002',
    source_title: 'Demo Placement Notice',
    last_verified_at: '2026-09-30',
    verification_status: 'DEMO'
  },
  {
    id: 'DRIVE-003',
    company_name: 'CloudCore Technologies',
    job_title: 'Associate Cloud DevOps Engineer',
    ctc: '9.8 LPA CTC',
    drive_date: '2026-10-22',
    deadline_date: '2026-10-12',
    status: 'UPCOMING',
    eligibility: {
      minimum_cgpa: 7.2,
      allowed_branches: ['CSE', 'ECE', 'IT', 'EEE'],
      maximum_backlogs: 1,
      required_skills: ['Python']
    },
    rounds: ['Aptitude & Linux Assessment', 'System Ops Interview', 'HR Discussion'],
    total_applicants: 95,
    selected_count: 0,
    data_environment: 'DEMO',
    source_type: 'DEMO_SEED',
    source_url: 'https://demo.nbknexus.internal/drives/003',
    source_title: 'Demo Placement Notice',
    last_verified_at: '2026-09-30',
    verification_status: 'DEMO'
  },
  {
    id: 'DRIVE-004',
    company_name: 'InnoSoft Systems',
    job_title: 'Associate Full Stack Engineer',
    ctc: '7.5 LPA CTC',
    drive_date: '2026-10-28',
    deadline_date: '2026-10-20',
    status: 'UPCOMING',
    eligibility: {
      minimum_cgpa: 6.5,
      allowed_branches: ['CSE', 'IT', 'AIML', 'AIDS', 'ECE', 'EEE', 'ME', 'CIVIL'],
      maximum_backlogs: 2,
      required_skills: ['Java', 'SQL']
    },
    rounds: ['Online Cognitive & Technical Test', 'Technical Interview', 'HR Discussion'],
    total_applicants: 210,
    selected_count: 0,
    data_environment: 'DEMO',
    source_type: 'DEMO_SEED',
    source_url: 'https://demo.nbknexus.internal/drives/004',
    source_title: 'Demo Placement Notice',
    last_verified_at: '2026-09-30',
    verification_status: 'DEMO'
  },
  {
    id: 'DRIVE-005',
    company_name: 'FinEdge Digital',
    job_title: 'Quantitative Software Engineer',
    ctc: '10.0 LPA CTC',
    drive_date: '2026-11-04',
    deadline_date: '2026-10-25',
    status: 'UPCOMING',
    eligibility: {
      minimum_cgpa: 7.8,
      allowed_branches: ['CSE', 'IT', 'AIML', 'AIDS', 'EEE'],
      maximum_backlogs: 0,
      required_skills: ['Python', 'Java']
    },
    rounds: ['Algorithmic Assessment', 'Financial Systems Simulation', 'Partner Round'],
    total_applicants: 62,
    selected_count: 0,
    data_environment: 'DEMO',
    source_type: 'DEMO_SEED',
    source_url: 'https://demo.nbknexus.internal/drives/005',
    source_title: 'Demo Placement Notice',
    last_verified_at: '2026-09-30',
    verification_status: 'DEMO'
  }
];

export const DEMO_DEADLINES: DeadlineItem[] = [
  {
    id: 'DL-01',
    title: 'DBMS Assignment 4: Query Optimization & Indexing Plans',
    category: 'ASSIGNMENT',
    priority: 'HIGH',
    due_date: '2026-10-01',
    days_remaining: 1,
    completed: false,
    assigned_by: 'Dr. A Raja Sekhar Reddy',
    data_environment: 'DEMO',
    source_type: 'DEMO_SEED',
    source_url: 'https://demo.nbknexus.internal/deadlines/01',
    source_title: 'Course LMS Portal',
    last_verified_at: '2026-09-30',
    verification_status: 'DEMO'
  },
  {
    id: 'DL-02',
    title: 'Operating Systems Lab Record: Semaphores & Dining Philosophers',
    category: 'LAB_RECORD',
    priority: 'MEDIUM',
    due_date: '2026-10-02',
    days_remaining: 2,
    completed: false,
    assigned_by: 'Prof. M. Nataraja Suresh',
    data_environment: 'DEMO',
    source_type: 'DEMO_SEED',
    source_url: 'https://demo.nbknexus.internal/deadlines/02',
    source_title: 'Course LMS Portal',
    last_verified_at: '2026-09-30',
    verification_status: 'DEMO'
  },
  {
    id: 'DL-03',
    title: 'TechNova Solutions Placement Drive Mandatory Registration Window',
    category: 'PLACEMENT',
    priority: 'HIGH',
    due_date: '2026-09-30',
    days_remaining: 0,
    completed: false,
    assigned_by: 'Placement & Training Cell',
    data_environment: 'DEMO',
    source_type: 'DEMO_SEED',
    source_url: 'https://demo.nbknexus.internal/deadlines/03',
    source_title: 'Placement Notice Board',
    last_verified_at: '2026-09-30',
    verification_status: 'DEMO'
  },
  {
    id: 'DL-04',
    title: 'AI & Machine Learning Weekend Workshop Hands-on Lab Registration',
    category: 'EVENT',
    priority: 'MEDIUM',
    due_date: '2026-10-03',
    days_remaining: 3,
    completed: true,
    assigned_by: 'Coding Club & IEEE',
    data_environment: 'DEMO',
    source_type: 'DEMO_SEED',
    source_url: 'https://demo.nbknexus.internal/deadlines/04',
    source_title: 'Club Event Registry',
    last_verified_at: '2026-09-30',
    verification_status: 'DEMO'
  },
  {
    id: 'DL-05',
    title: 'Capstone Mini Project Stage-1 Architecture Review with Faculty Guide',
    category: 'PROJECT',
    priority: 'HIGH',
    due_date: '2026-10-05',
    days_remaining: 5,
    completed: false,
    assigned_by: 'Department Review Committee',
    data_environment: 'DEMO',
    source_type: 'DEMO_SEED',
    source_url: 'https://demo.nbknexus.internal/deadlines/05',
    source_title: 'Project Coordinator Desk',
    last_verified_at: '2026-09-30',
    verification_status: 'DEMO'
  }
];

export const DEMO_COMPLAINTS: ComplaintItem[] = [
  {
    id: 'COMPL-001',
    title: 'Ceiling Fan #3 Not Working & Humming Noise',
    category: 'ELECTRICAL',
    location: 'CSE Block, 2nd Floor Room 204',
    status: 'OPEN',
    filed_by: 'Rithika Demo (DEMO-STU-001)',
    assigned_to: 'Electrical Maintenance Team',
    submitted_at: '2026-09-29 11:20 AM',
    priority: 'MEDIUM',
    data_environment: 'DEMO',
    source_type: 'DEMO_SEED',
    source_url: 'https://demo.nbknexus.internal/complaints/001',
    source_title: 'Campus Grievance Portal',
    last_verified_at: '2026-09-30',
    verification_status: 'DEMO'
  },
  {
    id: 'COMPL-002',
    title: 'Water Cooler Tap Leakage in Corridors',
    category: 'WATER',
    location: 'Main Administrative Block Ground Floor',
    status: 'ASSIGNED',
    filed_by: 'Rahul Demo (DEMO-STU-003)',
    assigned_to: 'Estate Plumbing Crew',
    submitted_at: '2026-09-28 02:45 PM',
    priority: 'HIGH',
    data_environment: 'DEMO',
    source_type: 'DEMO_SEED',
    source_url: 'https://demo.nbknexus.internal/complaints/002',
    source_title: 'Campus Grievance Portal',
    last_verified_at: '2026-09-30',
    verification_status: 'DEMO'
  },
  {
    id: 'COMPL-003',
    title: 'Ergonomic Chair Hydraulic Arm Loose in Workstation 18',
    category: 'FURNITURE',
    location: 'CSE Advanced Computing Lab II',
    status: 'IN_PROGRESS',
    filed_by: 'Ananya Demo (DEMO-STU-002)',
    assigned_to: 'Carpentry & Furniture Workshop',
    resolution_note: 'Replacement caster and gas cylinder issued from store.',
    submitted_at: '2026-09-26 10:15 AM',
    priority: 'LOW',
    data_environment: 'DEMO',
    source_type: 'DEMO_SEED',
    source_url: 'https://demo.nbknexus.internal/complaints/003',
    source_title: 'Campus Grievance Portal',
    last_verified_at: '2026-09-30',
    verification_status: 'DEMO'
  },
  {
    id: 'COMPL-004',
    title: 'Post-Symposium Cleaning & Sanitization Required',
    category: 'CLEANLINESS',
    location: 'Central Seminar Hall A',
    status: 'RESOLVED',
    filed_by: 'Prof. M. Nataraja Suresh',
    assigned_to: 'Campus Sanitation Unit',
    resolution_note: 'Deep cleaning completed; chairs rearranged and sanitised.',
    submitted_at: '2026-09-24 04:30 PM',
    priority: 'MEDIUM',
    data_environment: 'DEMO',
    source_type: 'DEMO_SEED',
    source_url: 'https://demo.nbknexus.internal/complaints/004',
    source_title: 'Campus Grievance Portal',
    last_verified_at: '2026-09-30',
    verification_status: 'DEMO'
  }
];

export const DEMO_RESOURCES: AcademicResource[] = [
  {
    id: 'RES-01',
    title: 'Database Management Systems Unit 1: Relational Algebra & ER Modeling',
    category: 'NOTES',
    subject: 'DBMS (CS301PC)',
    semester: 'III B.Tech I Sem',
    department: 'CSE / IT',
    faculty_author: 'Dr. A Raja Sekhar Reddy',
    file_format: 'PDF (4.2 MB)',
    downloads_count: 428,
    data_environment: 'DEMO',
    source_type: 'DEMO_SEED',
    source_url: 'https://demo.nbknexus.internal/resources/01',
    source_title: 'Digital Resource Bank',
    last_verified_at: '2026-09-30',
    verification_status: 'DEMO'
  },
  {
    id: 'RES-02',
    title: 'DBMS Unit 2: SQL Formal Queries, Aggregate Functions & Nested Subqueries',
    category: 'NOTES',
    subject: 'DBMS (CS301PC)',
    semester: 'III B.Tech I Sem',
    department: 'CSE / IT',
    faculty_author: 'Dr. A Raja Sekhar Reddy',
    file_format: 'PDF (3.8 MB)',
    downloads_count: 382,
    data_environment: 'DEMO',
    source_type: 'DEMO_SEED',
    source_url: 'https://demo.nbknexus.internal/resources/02',
    source_title: 'Digital Resource Bank',
    last_verified_at: '2026-09-30',
    verification_status: 'DEMO'
  },
  {
    id: 'RES-03',
    title: 'Python Programming Lab Manual: OOP, NumPy, Pandas & Matplotlib Exercises',
    category: 'LAB_MANUAL',
    subject: 'Python Programming (CS302PC)',
    semester: 'III B.Tech I Sem',
    department: 'CSE / AIML / AIDS',
    faculty_author: 'Prof. M. Nataraja Suresh',
    file_format: 'PDF (6.5 MB)',
    downloads_count: 615,
    data_environment: 'DEMO',
    source_type: 'DEMO_SEED',
    source_url: 'https://demo.nbknexus.internal/resources/03',
    source_title: 'Digital Resource Bank',
    last_verified_at: '2026-09-30',
    verification_status: 'DEMO'
  },
  {
    id: 'RES-04',
    title: 'Java Programming Autonomous End-Semester Question Paper (Nov 2025)',
    category: 'QUESTION_PAPER',
    subject: 'Java Programming (CS204PC)',
    semester: 'II B.Tech II Sem',
    department: 'CSE / IT / AIDS',
    faculty_author: 'NBKRIST Autonomous Exam Cell',
    file_format: 'PDF (1.1 MB)',
    downloads_count: 890,
    data_environment: 'DEMO',
    source_type: 'DEMO_SEED',
    source_url: 'https://demo.nbknexus.internal/resources/04',
    source_title: 'Digital Resource Bank',
    last_verified_at: '2026-09-30',
    verification_status: 'DEMO'
  },
  {
    id: 'RES-05',
    title: 'Operating Systems Complete Lecture Notes: Process Sync, Virtual Memory & Deadlocks',
    category: 'NOTES',
    subject: 'Operating Systems (CS303PC)',
    semester: 'III B.Tech I Sem',
    department: 'CSE',
    faculty_author: 'Dr. Narayana Rao Appini',
    file_format: 'PDF (7.8 MB)',
    downloads_count: 512,
    data_environment: 'DEMO',
    source_type: 'DEMO_SEED',
    source_url: 'https://demo.nbknexus.internal/resources/05',
    source_title: 'Digital Resource Bank',
    last_verified_at: '2026-09-30',
    verification_status: 'DEMO'
  }
];
