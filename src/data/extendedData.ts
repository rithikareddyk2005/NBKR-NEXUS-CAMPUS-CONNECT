export interface CampusLocation {
  id: string;
  name: string;
  code: string;
  category: 'ACADEMIC' | 'ADMIN' | 'RESIDENTIAL' | 'FACILITY' | 'SPORTS';
  description: string;
  walkingTimeFromMainGate: string;
  keyFacilities: string[];
  floors: number;
  contactPerson?: string;
  image?: string;
}

export interface LostFoundItem {
  id: string;
  title: string;
  type: 'LOST' | 'FOUND';
  category: 'ELECTRONICS' | 'DOCUMENTS' | 'CLOTHING' | 'ACCESSORIES' | 'OTHER';
  location: string;
  dateReported: string;
  description: string;
  reportedBy: string;
  contactInfo: string;
  status: 'ACTIVE' | 'CLAIMED' | 'RETURNED';
  claimInstructions?: string;
}

export interface StudentIdea {
  id: string;
  title: string;
  category: 'ACADEMICS' | 'FACILITIES' | 'TECHNOLOGY' | 'DINING' | 'CAMPUS_LIFE';
  description: string;
  submittedBy: string;
  dateSubmitted: string;
  upvotes: number;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'IN_DEVELOPMENT' | 'IMPLEMENTED';
  adminResponse?: string;
  userUpvoted?: boolean;
}

export interface CampusEvent {
  id: string;
  title: string;
  category: 'SYMPOSIUM' | 'HACKATHON' | 'SPORTS' | 'CULTURAL' | 'WORKSHOP';
  date: string;
  time: string;
  venue: string;
  organizer: string;
  description: string;
  registrationOpen: boolean;
  registrationDeadline: string;
  registeredCount: number;
  maxCapacity?: number;
  tags: string[];
}

export interface ClassroomOccupancy {
  id: string;
  roomNumber: string;
  building: string;
  capacity: number;
  type: 'LECTURE_HALL' | 'SMART_CLASSROOM' | 'COMPUTER_LAB' | 'SEMINAR_HALL';
  currentStatus: 'AVAILABLE' | 'OCCUPIED' | 'SCHEDULED_SOON';
  currentSubject?: string;
  facultyName?: string;
  availableUntil?: string;
  features: string[];
}

export interface CanteenMenuItem {
  id: string;
  name: string;
  category: 'BREAKFAST' | 'LUNCH' | 'SNACKS' | 'BEVERAGES';
  price: number;
  dietary: 'VEG' | 'EGG' | 'HEALTHY';
  available: boolean;
  calories: string;
  timing: string;
}

export interface StudentAchievement {
  id: string;
  title: string;
  studentName: string;
  studentId: string;
  department: string;
  category: 'HACKATHON' | 'RESEARCH_PAPER' | 'NPTEL' | 'SPORTS' | 'PATENT' | 'CLUB';
  date: string;
  award: string;
  description: string;
  certificateRef?: string;
}

export interface MockQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
}

export interface IoTTelemetryData {
  solar: {
    currentKw: number;
    peakKw: number;
    kwhToday: number;
    co2SavedKg: number;
    efficiency: number;
  };
  roPlant: {
    tankLevelPct: number;
    flowRateLph: number;
    tdsPpm: number;
    filterHealth: string;
    totalPurifiedTodayLiters: number;
  };
  network: {
    bandwidthCapacityMbps: number;
    currentThroughputMbps: number;
    activeAccessPoints: number;
    connectedClients: number;
    latencyMs: number;
  };
  environment: {
    aqi: number;
    aqiStatus: 'Good' | 'Moderate';
    temperatureC: number;
    humidityPct: number;
  };
}

export const EXTENDED_CAMPUS_LOCATIONS: CampusLocation[] = [
  {
    id: 'LOC-01',
    name: 'Main Administrative Block & Principal Secretariat',
    code: 'ADMIN-BLK',
    category: 'ADMIN',
    description: 'Houses the Principal Office, Director Chamber, Administrative Officer, Accounts Section, and Autonomous Examination Cell.',
    walkingTimeFromMainGate: '2 mins (150m)',
    keyFacilities: ['Autonomous Exam Cell', 'Principal Chamber', 'Conference Hall', 'Accounts Desk'],
    floors: 3
  },
  {
    id: 'LOC-02',
    name: 'Computer Science & Information Technology Complex',
    code: 'CSE-IT-BLK',
    category: 'ACADEMIC',
    description: 'High-tech academic wing housing CSE, IT, AIML, and AIDS departments with high-performance GPU computing clusters and smart halls.',
    walkingTimeFromMainGate: '4 mins (300m)',
    keyFacilities: ['NVIDIA AI Lab', 'Cloud Computing Center', 'Data Analytics Lab', 'Coding Club Room'],
    floors: 4
  },
  {
    id: 'LOC-03',
    name: 'Dr. B.R. Ambedkar Central Library',
    code: 'CENTRAL-LIB',
    category: 'ACADEMIC',
    description: 'Modern repository with 44,197+ volumes, 267 periodicals, air-conditioned reading halls, digital media center, and book bank section.',
    walkingTimeFromMainGate: '3 mins (250m)',
    keyFacilities: ['Digital Research Section', 'IEEE DELNET Terminals', 'Reading Hall (500 capacity)', 'Reprography'],
    floors: 2
  },
  {
    id: 'LOC-04',
    name: 'Electronics & Communication Engineering Wing',
    code: 'ECE-BLK',
    category: 'ACADEMIC',
    description: 'Industry-standard research labs with Cadence VLSI software, microwave testbenches, DSP suites, and antenna testing facility.',
    walkingTimeFromMainGate: '5 mins (400m)',
    keyFacilities: ['Cadence VLSI Lab', 'Microwave & Optical Lab', 'DSP Lab', 'IoT Innovation Center'],
    floors: 3
  },
  {
    id: 'LOC-05',
    name: 'Mechanical & Civil Engineering Technology Blocks',
    code: 'MECH-CIVIL-BLK',
    category: 'ACADEMIC',
    description: 'Equipped with CNC Machine Centers, Thermal Research Rigs, Robotics Lab, Concrete Strength Lab, and Surveying Stations.',
    walkingTimeFromMainGate: '6 mins (500m)',
    keyFacilities: ['CNC Machining Center', 'Robotics & AI Suite', 'Total Station Survey Lab', 'Automobile Workshop'],
    floors: 3
  },
  {
    id: 'LOC-06',
    name: 'Central Cafeteria & Food Court',
    code: 'CAMPUS-CAFE',
    category: 'FACILITY',
    description: 'Spacious food court serving hygienic South Indian meals, breakfast, fresh juices, and hot refreshments at subsidized rates.',
    walkingTimeFromMainGate: '4 mins (320m)',
    keyFacilities: ['Multi-Cuisine Dining', 'Fresh Juice Counter', 'RO Purified Water', 'Outdoor Lawns'],
    floors: 1
  },
  {
    id: 'LOC-07',
    name: 'Open Air Amphitheater & Indoor Auditorium',
    code: 'AUDITORIUM-COMPLEX',
    category: 'FACILITY',
    description: 'Acoustically designed indoor auditorium (1,000 capacity) plus spectacular 3,000-seat amphitheater for annual convocations and cultural fests.',
    walkingTimeFromMainGate: '5 mins (380m)',
    keyFacilities: ['3,000-seat Open Amphitheater', 'Acoustic Indoor Stage', 'Green Rooms', 'Audio-Visual Suite'],
    floors: 2
  },
  {
    id: 'LOC-08',
    name: 'Sports Pavilion & Olympic-Size Athletic Complex',
    code: 'SPORTS-COMPLEX',
    category: 'SPORTS',
    description: 'Standard 400m athletic track, turf cricket stadium, floodlit basketball & volleyball courts, and modern resistance fitness gymnasium.',
    walkingTimeFromMainGate: '7 mins (550m)',
    keyFacilities: ['400m Athletic Running Track', 'Turf Cricket Stadium', 'Indoor Badminton Courts', 'Modern Gymnasium'],
    floors: 1
  }
];

export const EXTENDED_LOST_FOUND: LostFoundItem[] = [
  {
    id: 'LF-01',
    title: 'Casio fx-991EX Scientific Calculator',
    type: 'FOUND',
    category: 'ELECTRONICS',
    location: 'CSE Block 2nd Floor, Room 204 Desk 12',
    dateReported: '2026-09-29',
    description: 'Black scientific calculator with slide case. Found after III B.Tech DBMS lecture.',
    reportedBy: 'K. Sumanth (Lab Assistant)',
    contactInfo: 'CSE Department Office (Ext. 204)',
    status: 'ACTIVE',
    claimInstructions: 'Show student ID and verify serial number or initials on back cover.'
  },
  {
    id: 'LF-02',
    title: 'Boat Airdopes 141 Case (Dark Blue)',
    type: 'LOST',
    category: 'ELECTRONICS',
    location: 'Central Cafeteria Outdoor Seating Area',
    dateReported: '2026-09-28',
    description: 'Charging case with earbud inside. Left on wooden bench around 1:30 PM.',
    reportedBy: 'Rithika Demo (DEMO-STU-001)',
    contactInfo: 'student@nbknexus.demo',
    status: 'ACTIVE'
  },
  {
    id: 'LF-03',
    title: 'Student ID Card & Library Pass',
    type: 'FOUND',
    category: 'DOCUMENTS',
    location: 'Central Library First Floor Reference Stacks',
    dateReported: '2026-09-27',
    description: 'NBKRIST Student Identity Card belonging to II B.Tech ECE student.',
    reportedBy: 'Library Circulation Desk',
    contactInfo: 'library@nbkrist.org',
    status: 'CLAIMED',
    claimInstructions: 'Claimed and handed over to student on 2026-09-28.'
  },
  {
    id: 'LF-04',
    title: 'Mechanical Workshop Navy Blue Lab Apron',
    type: 'FOUND',
    category: 'CLOTHING',
    location: 'Machine Tools Workshop Area B',
    dateReported: '2026-09-26',
    description: 'Navy blue apron with embroidered NBKRIST crest, size Medium.',
    reportedBy: 'Mr. P. Ramana (Workshop Instructor)',
    contactInfo: 'Mech Workshop Desk',
    status: 'ACTIVE'
  },
  {
    id: 'LF-05',
    title: 'SanDisk 64GB Dual USB Drive',
    type: 'FOUND',
    category: 'ELECTRONICS',
    location: 'Seminar Hall A Podium Terminal',
    dateReported: '2026-09-25',
    description: 'Silver metal casing dual USB-C/A drive containing PPT presentations.',
    reportedBy: 'Audio-Visual Coordinator',
    contactInfo: 'avcell@nbkrist.org',
    status: 'RETURNED'
  }
];

export const EXTENDED_STUDENT_IDEAS: StudentIdea[] = [
  {
    id: 'IDEA-01',
    title: '24/7 Air-Conditioned Study Stacks during Autonomous Exam Weeks',
    category: 'ACADEMICS',
    description: 'Permit students extended late-night access to the Ground Floor Central Library reading halls during mid-term and semester end examinations.',
    submittedBy: 'Ananya Demo (CSE Year 3)',
    dateSubmitted: '2026-09-20',
    upvotes: 218,
    status: 'APPROVED',
    adminResponse: 'Approved by Academic Council. Ground Floor reading stacks will remain open until 11:30 PM with faculty and security supervision.'
  },
  {
    id: 'IDEA-02',
    title: 'Solar-Powered Electric Two-Wheeler Charging Stations in Hostels',
    category: 'FACILITIES',
    description: 'Install EV charging points near Boys & Girls Hostel parking lots powered directly by the institute 500 kW rooftop solar plant.',
    submittedBy: 'Rahul Demo (ECE Year 4)',
    dateSubmitted: '2026-09-22',
    upvotes: 184,
    status: 'UNDER_REVIEW',
    adminResponse: 'Referred to Estate Management & Electrical Maintenance for feasibility analysis.'
  },
  {
    id: 'IDEA-03',
    title: 'Digital Token Pre-Order and Fast-Track Kiosk in Campus Cafeteria',
    category: 'DINING',
    description: 'Introduce QR-based food ordering via NBKR Nexus so students can order lunch during 10-minute break and avoid long queues.',
    submittedBy: 'Priya Demo (EEE Year 3)',
    dateSubmitted: '2026-09-24',
    upvotes: 265,
    status: 'IN_DEVELOPMENT',
    adminResponse: 'In development! Smart Canteen module in NBKR Nexus is rolling out pilot testing.'
  },
  {
    id: 'IDEA-04',
    title: 'Establish Institutional Open Source & Linux Foundation Chapter',
    category: 'TECHNOLOGY',
    description: 'Dedicate server rigs for students contributing to open-source kernels, GNOME, Rust, and Apache foundation repositories.',
    submittedBy: 'Arjun Demo (CSE Year 4)',
    dateSubmitted: '2026-09-18',
    upvotes: 142,
    status: 'IMPLEMENTED',
    adminResponse: 'Implemented under Coding Club & Advanced Computing Center under Prof. M. Nataraja Suresh.'
  }
];

export const EXTENDED_CAMPUS_EVENTS: CampusEvent[] = [
  {
    id: 'EVT-01',
    title: 'PARAMA 2026: National Technical Symposium',
    category: 'SYMPOSIUM',
    date: '2026-10-24',
    time: '09:30 AM - 05:30 PM',
    venue: 'Auditorium Complex & All Department Blocks',
    organizer: 'NBKRIST All Engineering Departments',
    description: 'Flagship national symposium with paper presentations, circuit debugging, CAD design marathons, and coding sprints.',
    registrationOpen: true,
    registrationDeadline: '2026-10-18',
    registeredCount: 480,
    maxCapacity: 800,
    tags: ['National Level', 'Paper Presentation', 'Tech Expo', 'Cash Prizes']
  },
  {
    id: 'EVT-02',
    title: 'Hack-a-Nexus: 36-Hour Autonomous AI & Smart Campus Hackathon',
    category: 'HACKATHON',
    date: '2026-11-06',
    time: 'Starts 08:00 AM',
    venue: 'CSE Advanced Computing Center & Innovation Hub',
    organizer: 'NBKR Coding Club & IEEE Student Branch',
    description: 'Build real-world smart university solutions, cloud platforms, and generative AI apps with industry mentorship and cash prizes of ₹1,00,000.',
    registrationOpen: true,
    registrationDeadline: '2026-10-30',
    registeredCount: 165,
    maxCapacity: 200,
    tags: ['Hackathon', 'Generative AI', 'Cloud', 'Prizes ₹1 Lakh']
  },
  {
    id: 'EVT-03',
    title: 'Inter-Collegiate Sports Carnival & Cricket Tournament',
    category: 'SPORTS',
    date: '2026-10-15',
    time: '07:00 AM - 06:00 PM',
    venue: 'Olympic Athletic Oval & Sports Pavilion',
    organizer: 'Department of Physical Education',
    description: 'Annual multi-sport tournament featuring Cricket, Football, Volleyball, Track & Field Athletics, and Chess.',
    registrationOpen: true,
    registrationDeadline: '2026-10-10',
    registeredCount: 320,
    tags: ['Cricket', 'Athletics', 'Trophy', 'Inter-Branch']
  },
  {
    id: 'EVT-04',
    title: 'NBKR Fest: Mega Cultural Extravaganza',
    category: 'CULTURAL',
    date: '2026-11-20',
    time: '05:00 PM - 10:30 PM',
    venue: '3,000-seat Open Air Amphitheater',
    organizer: 'Cultural & Literary Clubs',
    description: 'Dazzling celebration of acoustic bands, classical and western dance battles, theatrical plays, and celebrity music concert.',
    registrationOpen: true,
    registrationDeadline: '2026-11-12',
    registeredCount: 1250,
    tags: ['Live Band', 'Dance', 'Drama', 'Concert']
  }
];

export const EXTENDED_CLASSROOMS: ClassroomOccupancy[] = [
  {
    id: 'RM-101',
    roomNumber: 'Room 101 (Smart Hall)',
    building: 'CSE Block, 1st Floor',
    capacity: 72,
    type: 'SMART_CLASSROOM',
    currentStatus: 'AVAILABLE',
    availableUntil: '02:00 PM',
    features: ['Epson Interactive Projector', 'Air Conditioned', 'Smart Podium', 'High-Speed Wi-Fi']
  },
  {
    id: 'RM-204',
    roomNumber: 'Room 204 (Lecture Hall)',
    building: 'CSE Block, 2nd Floor',
    capacity: 80,
    type: 'LECTURE_HALL',
    currentStatus: 'OCCUPIED',
    currentSubject: 'CS301PC: Database Management Systems',
    facultyName: 'Dr. A Raja Sekhar Reddy',
    availableUntil: '12:30 PM',
    features: ['Digital Projector', 'Dual Audio System', 'Acoustic Paneling']
  },
  {
    id: 'LAB-COMP-2',
    roomNumber: 'Advanced Computing Lab II',
    building: 'CSE Complex, Ground Floor',
    capacity: 65,
    type: 'COMPUTER_LAB',
    currentStatus: 'AVAILABLE',
    availableUntil: '03:30 PM',
    features: ['65 Intel Core i7 Nodes', 'Ubuntu 24.04 LTS', 'NVIDIA RTX GPUs', 'Gigabit LAN']
  },
  {
    id: 'RM-SEM-A',
    roomNumber: 'Central Seminar Hall A',
    building: 'Admin Block, 2nd Floor',
    capacity: 250,
    type: 'SEMINAR_HALL',
    currentStatus: 'SCHEDULED_SOON',
    currentSubject: 'Placement Cell: Pre-Placement Orientation',
    facultyName: 'Training & Placement Officer',
    availableUntil: 'Starts at 02:00 PM',
    features: ['Dolby Surround Sound', 'Motorized 200" Screen', 'Executive Stage', 'Podium Mics']
  },
  {
    id: 'RM-CAD-1',
    roomNumber: 'CAD/CAM Simulation Center',
    building: 'Mechanical Block, 1st Floor',
    capacity: 50,
    type: 'COMPUTER_LAB',
    currentStatus: 'AVAILABLE',
    availableUntil: 'Full Day Available',
    features: ['AutoCAD & SolidWorks Suites', 'ANSYS Workbenches', '3D Prototyping Link']
  }
];

export const EXTENDED_CANTEEN_MENU: CanteenMenuItem[] = [
  {
    id: 'FOOD-01',
    name: 'South Indian Special Meals (Thali)',
    category: 'LUNCH',
    price: 65,
    dietary: 'VEG',
    available: true,
    calories: '650 kcal',
    timing: '12:00 PM - 03:00 PM'
  },
  {
    id: 'FOOD-02',
    name: 'Ghee Masala Dosa with Sambar & Chutneys',
    category: 'BREAKFAST',
    price: 45,
    dietary: 'VEG',
    available: true,
    calories: '380 kcal',
    timing: '07:30 AM - 11:30 AM'
  },
  {
    id: 'FOOD-03',
    name: 'Steamed Idli (3 pcs) & Vada Combo',
    category: 'BREAKFAST',
    price: 40,
    dietary: 'HEALTHY',
    available: true,
    calories: '290 kcal',
    timing: '07:30 AM - 11:30 AM'
  },
  {
    id: 'FOOD-04',
    name: 'Hyderabadi Veg Dum Biryani & Raitha',
    category: 'LUNCH',
    price: 80,
    dietary: 'VEG',
    available: true,
    calories: '580 kcal',
    timing: '12:30 PM - 02:45 PM'
  },
  {
    id: 'FOOD-05',
    name: 'Filter Coffee / Masala Chai',
    category: 'BEVERAGES',
    price: 15,
    dietary: 'VEG',
    available: true,
    calories: '90 kcal',
    timing: 'All Day'
  },
  {
    id: 'FOOD-06',
    name: 'Fresh Mosambi / Orange Fruit Juice',
    category: 'BEVERAGES',
    price: 35,
    dietary: 'HEALTHY',
    available: true,
    calories: '120 kcal',
    timing: 'All Day'
  }
];

export const EXTENDED_STUDENT_ACHIEVEMENTS: StudentAchievement[] = [
  {
    id: 'ACH-01',
    title: 'First Prize Winner: AP State Level Innovation & Hackathon',
    studentName: 'Rithika Demo',
    studentId: 'DEMO-STU-001',
    department: 'Computer Science and Engineering',
    category: 'HACKATHON',
    date: '2026-08-14',
    award: '₹50,000 Cash Prize & Gold Trophy',
    description: 'Designed IoT Smart University Waste Monitoring System utilizing low-power LoRaWAN nodes and predictive garbage dispatch algorithms.',
    certificateRef: 'AP-INNOV-2026-0428'
  },
  {
    id: 'ACH-02',
    title: 'Research Paper Published in IEEE Access Journal',
    studentName: 'Ananya Demo',
    studentId: 'DEMO-STU-002',
    department: 'Computer Science and Engineering',
    category: 'RESEARCH_PAPER',
    date: '2026-07-22',
    award: 'IEEE Digital Xplore Indexing',
    description: 'Co-authored "Automated Code Smells Detection via Transformer Embeddings" under mentorship of Dr. A Raja Sekhar Reddy.',
    certificateRef: 'IEEE-10.1109/ACCESS.2026.98231'
  },
  {
    id: 'ACH-03',
    title: 'NPTEL Elite + Gold Medal: Cloud Computing & Distributed Systems',
    studentName: 'Arjun Demo',
    studentId: 'DEMO-STU-005',
    department: 'Computer Science and Engineering',
    category: 'NPTEL',
    date: '2026-06-18',
    award: 'Top 1% National Candidate (Score: 94%)',
    description: 'Completed 12-week national curriculum with top 1% score recognized across AICTE guidelines.',
    certificateRef: 'NPTEL26CS48G94'
  }
];

export const EXTENDED_MOCK_QUESTIONS: MockQuestion[] = [
  {
    id: 1,
    topic: 'Data Structures & Algorithms',
    difficulty: 'MEDIUM',
    question: 'What is the worst-case time complexity of searching an element in a Balanced Binary Search Tree (AVL Tree) with n nodes?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correctIndex: 1,
    explanation: 'In an AVL Tree, the height is strictly balanced and bounded by 1.44 * log2(n), guaranteeing O(log n) time complexity for search, insertion, and deletion even in the worst case.'
  },
  {
    id: 2,
    topic: 'Relational Databases (SQL)',
    difficulty: 'MEDIUM',
    question: 'Which SQL clause is executed FIRST during standard query processing by the RDBMS query engine?',
    options: ['SELECT', 'WHERE', 'FROM & JOIN', 'GROUP BY'],
    correctIndex: 2,
    explanation: 'SQL logical query processing evaluates FROM (and JOINs) first to identify the working table source, followed by WHERE, GROUP BY, HAVING, SELECT, and finally ORDER BY.'
  },
  {
    id: 3,
    topic: 'Operating Systems',
    difficulty: 'HARD',
    question: 'Which of the following conditions is NOT one of Coffman\'s four necessary conditions for a Deadlock to occur?',
    options: ['Mutual Exclusion', 'Hold and Wait', 'Preemption Allowed', 'Circular Wait'],
    correctIndex: 2,
    explanation: 'No Preemption (resources cannot be forcibly reclaimed) is required for deadlock. If preemption is allowed, deadlocks cannot persist.'
  },
  {
    id: 4,
    topic: 'Computer Networks',
    difficulty: 'EASY',
    question: 'At which layer of the OSI model does the Address Resolution Protocol (ARP) operate?',
    options: ['Transport Layer', 'Data Link / Network Interface Layer', 'Application Layer', 'Session Layer'],
    correctIndex: 1,
    explanation: 'ARP translates an IP address (Network Layer) into a physical MAC address (Data Link Layer), operating at the Data Link / Network Interface boundary.'
  },
  {
    id: 5,
    topic: 'Python & Object Oriented Programming',
    difficulty: 'EASY',
    question: 'What is the output of `bool([0])` in Python 3?',
    options: ['False', 'True', 'TypeError', 'None'],
    correctIndex: 1,
    explanation: 'In Python, any non-empty list evaluates to True in a boolean context, even if the element inside is 0. An empty list `[]` evaluates to False.'
  }
];

export const EXTENDED_IOT_TELEMETRY: IoTTelemetryData = {
  solar: {
    currentKw: 384.2,
    peakKw: 500.0,
    kwhToday: 1984.5,
    co2SavedKg: 1420.0,
    efficiency: 92.4
  },
  roPlant: {
    tankLevelPct: 88,
    flowRateLph: 9850,
    tdsPpm: 42,
    filterHealth: 'Optimal (Cleaned 4d ago)',
    totalPurifiedTodayLiters: 48500
  },
  network: {
    bandwidthCapacityMbps: 200,
    currentThroughputMbps: 128.4,
    activeAccessPoints: 54,
    connectedClients: 1482,
    latencyMs: 14
  },
  environment: {
    aqi: 38,
    aqiStatus: 'Good',
    temperatureC: 28.5,
    humidityPct: 62
  }
};
