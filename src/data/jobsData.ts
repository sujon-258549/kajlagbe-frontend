export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type:
    | "Full-time"
    | "Part-time"
    | "Contract"
    | "Remote"
    | "Seasonal"
    | "Consultant";
  salary: string;
  posted: string;
  logo: string;
  tags: string[];
  featured: boolean;
  // Extended Fields
  category: string;
  short_description: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  education: string;
  experience: string;
  vacancy: number;
  deadline: string;
  jobNature: string;
  gender: "Male" | "Female" | "Both" | "Any";
  ageRange: string;
  salaryReview: "Yearly" | "Half-yearly" | "Performance-based";
  lunchFacility: "Full Subsidize" | "Partially Subsidize" | "No";
  festivalBonus: string;
  workingHours: string;
  weekend: string;
  address: string;
  website: string;
  email: string;
  phone: string;
  founded: string;
  companySize: string;
  industry: string;
  skills: string[];
  tools: string[];
  languages: string[];
  visa_sponsorship: boolean;
  relocation_assistance: boolean;
  remote_policy: "Onsite" | "Hybrid" | "Remote";
  department: string;
  reporting_to: string;
  team_size: number;
  performance_bonus: boolean;
  health_insurance: boolean;
  contact_person: string;
  // Job Poster JSON
  job_poster: {
    name: string;
    designation: string;
    email: string;
    phone: string;
    profile_image: string;
    linkedin?: string;
    bio?: string;
  };
  map_coordinates: { lat: number; lng: number };
  social_media: {
    linkedin?: string;
    facebook?: string;
    twitter?: string;
  };
  ceo_name: string;
  ratings: number;
  reviews_count: number;
  application_link: string;
  internal_id: string;
  reference_code: string;
  keywords: string[];
  meta_description: string;
  views_count: number;
  applicants_count: number;
  application_deadline: string;
  is_urgent: boolean;
  // Detailed Location
  job_location: {
    division: string;
    district: string;
    upazila: string;
    union?: string;
    village?: string;
    roadNo?: string;
    houseNo?: string;
    postCode?: string;
    landmark?: string;
  };
  // Work Details
  work_start_time: string;
  work_time_limit: string;
  job_amount: string;
}

const defaultJobDetails = {
  id: 1,
  title: "Senior Software Engineer",
  company: "Tech Solutions Ltd.",
  location: "Dhaka, Bangladesh",
  type: "Full-time" as const,
  salary: "BDT 80,000 - 120,000 per month",
  posted: "2024-01-15",
  logo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
  tags: ["Software", "Engineering", "Tech"],
  featured: true,
  category: "Agriculture",
  short_description:
    "Join our team to contribute to sustainable agricultural practices and growth.",
  description:
    "We are looking for a dedicated professional to join our team. The ideal candidate will have strong skills in their respective field and a passion for agriculture. You will work closely with our team to ensure the success of our projects and operations.",
  responsibilities: [
    "Collaborate with team members to achieve project goals.",
    "Monitor progress and report on key metrics.",
    "Ensure compliance with safety and quality standards.",
    "Participate in regular team meetings and training sessions.",
    "Contribute to continuous improvement initiatives.",
  ],
  requirements: [
    "Relevant degree or diploma in the matching field.",
    "Proven experience in a similar role.",
    "Strong communication and interpersonal skills.",
    "Ability to work independently and as part of a team.",
    "Willingness to learn and adapt to new challenges.",
  ],
  benefits: [
    "Competitive salary.",
    "Health insurance.",
    "Festive bonuses.",
    "Professional development opportunities.",
    "Friendly work environment.",
  ],
  education: "Bachelor's Degree or Equivalent",
  experience: "2-5 Years",
  vacancy: 1,
  deadline: "2026-03-01",
  jobNature: "Permanent",
  gender: "Both" as const,
  ageRange: "25-40 Years",
  salaryReview: "Yearly" as const,
  lunchFacility: "Partially Subsidize" as const,
  festivalBonus: "2 (Yearly)",
  workingHours: "9:00 AM - 5:00 PM",
  weekend: "Friday",
  address: "Corporate HQ, Dhaka, Bangladesh",
  website: "https://kajlagbe.com",
  email: "careers@kajlagbe.com",
  phone: "+8801700000000",
  founded: "2015",
  companySize: "100-500 Employees",
  industry: "Agriculture",
  skills: ["Communication", "Teamwork", "Problem Solving"],
  tools: ["Microsoft Office", "Google Workspace"],
  languages: ["Bangla", "English"],
  visa_sponsorship: false,
  relocation_assistance: false,
  remote_policy: "Onsite" as const,
  department: "Operations",
  reporting_to: "Manager",
  team_size: 10,
  performance_bonus: true,
  health_insurance: true,
  contact_person: "HR Manager",
  job_poster: {
    name: "Mrs. Salma Begum",
    designation: "HR Manager",
    email: "salma.hr@kajlagbefarms.com",
    phone: "+8801700000000",
    profile_image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    linkedin: "https://linkedin.com/in/salma-begum",
    bio: "Experienced HR professional with a passion for building great teams in the agricultural sector.",
  },
  map_coordinates: { lat: 23.8103, lng: 90.4125 },
  social_media: {
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com",
  },
  ceo_name: "John Doe",
  ratings: 4.5,
  reviews_count: 50,
  application_link: "https://kajlagbe.com/apply",
  internal_id: "JOB-000",
  reference_code: "REF-000",
  keywords: ["Job", "Agriculture", "Bangladesh"],
  meta_description: "Exciting opportunity at Kajlagbe. Apply now!",
  views_count: 500,
  applicants_count: 20,
  application_deadline: "2026-03-01",
  is_urgent: false,
  work_start_time: "09:00 AM",
  work_time_limit: "05:00 PM",
  job_amount: "Negotiable",
  job_location: {
    division: "Dhaka",
    district: "Dhaka",
    upazila: "Gulshan",
    union: "Gulshan North",
    village: "Gulshan Model Town",
    roadNo: "12",
    houseNo: "55/A",
    postCode: "1212",
    landmark: "Next to shooting club",
  },
};

const rawJobs = [
  {
    id: 1,
    title: "Senior Agronomist",
    company: "Kajlagbe Farms",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    salary: "80k - 120k BDT",
    posted: "2 days ago",
    logo: "/images/logo/logo-icon.png",
    tags: ["Agriculture", "Research", "Senior Level"],
    featured: true,
    // Overrides for ID 1
    category: "Agriculture & Farming",
    short_description:
      "Lead agronomy research and optimize crop yields in a sustainable manner.",
    description:
      "We are seeking a highly skilled and experienced Senior Agronomist to join our team at Kajlagbe Farms...",
    salaryReview: "Yearly",
    lunchFacility: "Full Subsidize",
  },
  {
    id: 2,
    title: "Organic Farm Manager",
    company: "Green Valley Organics",
    location: "Sylhet, Bangladesh",
    type: "Full-time",
    salary: "50k - 70k BDT",
    posted: "1 week ago",
    logo: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=GV",
    tags: ["Management", "Operations"],
    featured: false,
    category: "Farm Management",
    short_description:
      "Oversee organic vegetable production and farm operations.",
  },
  {
    id: 3,
    title: "Supply Chain Coordinator",
    company: "Fresh Foods Ltd",
    location: "Chittagong, Bangladesh",
    type: "Remote",
    salary: "40k - 60k BDT",
    posted: "3 days ago",
    logo: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=FF",
    tags: ["Logistics", "Supply Chain"],
    featured: false,
    category: "Supply Chain & Logistics",
    short_description:
      "Coordinate supply chain logistics for fresh food distribution.",
  },
  {
    id: 4,
    title: "Agricultural Sales Representative",
    company: "AgroTech Solutions",
    location: "Rajshahi, Bangladesh",
    type: "Part-time",
    salary: "20k - 30k BDT + Comm",
    posted: "Yesterday",
    logo: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=AS",
    tags: ["Sales", "Marketing"],
    featured: true,
    category: "Sales & Marketing",
    short_description: "Drive sales for audio-visual agricultural products.",
  },
  {
    id: 5,
    title: "Quality Control Specialist",
    company: "Pure Harvest",
    location: "Gazipur, Bangladesh",
    type: "Full-time",
    salary: "35k - 50k BDT",
    posted: "5 days ago",
    logo: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=PH",
    tags: ["Quality Assurance", "Food Safety"],
    featured: false,
    category: "Quality Assurance",
    short_description: "Ensure food safety and quality standards are met.",
  },
  {
    id: 6,
    title: "Digital Marketing Executive",
    company: "Kajlagbe HQ",
    location: "Dhaka, Bangladesh",
    type: "Remote",
    salary: "45k - 65k BDT",
    posted: "Just now",
    logo: "/images/logo/logo-icon.png",
    tags: ["Marketing", "Social Media"],
    featured: true,
    category: "Digital Marketing",
    short_description: "Manage digital marketing campaigns and social media.",
  },
  {
    id: 7,
    title: "Field technician",
    company: "Rural Power Co.",
    location: "Barisal, Bangladesh",
    type: "Contract",
    salary: "25k - 35k BDT",
    posted: "4 days ago",
    logo: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=RP",
    tags: ["Technician", "Field Work"],
    featured: false,
    category: "Technical Support",
    short_description: "Provide field support and maintenance for rural power.",
  },
  {
    id: 8,
    title: "Greenhouse Supervisor",
    company: "Nature's Bounty",
    location: "Comilla, Bangladesh",
    type: "Full-time",
    salary: "40k - 55k BDT",
    posted: "6 days ago",
    logo: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=NB",
    tags: ["Supervision", "Greenhouse"],
    featured: true,
    category: "Farm Management",
    short_description: "Supervise greenhouse operations and crop care.",
  },
  {
    id: 9,
    title: "Livestock Manager",
    company: "Dairy Best",
    location: "Pabna, Bangladesh",
    type: "Full-time",
    salary: "45k - 60k BDT",
    posted: "1 week ago",
    logo: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=DB",
    tags: ["Dairy", "Management"],
    featured: false,
    category: "Livestock Management",
    short_description: "Manage dairy farm operations and livestock health.",
  },
  {
    id: 10,
    title: "Pest Control Specialist",
    company: "Safe Crops",
    location: "Bogra, Bangladesh",
    type: "Part-time",
    salary: "15k - 25k BDT",
    posted: "2 days ago",
    logo: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=SC",
    tags: ["Pest Control", "Safety"],
    featured: false,
    category: "Pest Control",
    short_description:
      "Implement pest control measures to protect crops safely.",
  },
  {
    id: 11,
    title: "Customer Support Agent",
    company: "Kajlagbe Support",
    location: "Remote",
    type: "Remote",
    salary: "20k - 30k BDT",
    posted: "Just now",
    logo: "/images/logo/logo-icon.png",
    tags: ["Support", "Customer Service"],
    featured: true,
    category: "Customer Service",
    short_description: "Provide excellent support to our farming community.",
  },
  {
    id: 12,
    title: "Farm Equipment Mechanic",
    company: "Mechanic Bros",
    location: "Jessore, Bangladesh",
    type: "Contract",
    salary: "30k - 45k BDT",
    posted: "3 days ago",
    logo: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=MB",
    tags: ["Mechanic", "Maintenance"],
    featured: false,
    category: "Maintenance",
    short_description: "Repair and maintain farm equipment and machinery.",
  },
  {
    id: 13,
    title: "Soil Scientist",
    company: "Earth Labs",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    salary: "70k - 90k BDT",
    posted: "1 week ago",
    logo: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=EL",
    tags: ["Science", "Research"],
    featured: true,
    category: "Research & Science",
    short_description: "Conduct soil analysis and research for better crops.",
  },
  {
    id: 14,
    title: "Warehouse Assistant",
    company: "Storage Kings",
    location: "Chittagong, Bangladesh",
    type: "Part-time",
    salary: "10k - 15k BDT",
    posted: "Yesterday",
    logo: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=SK",
    tags: ["Logistics", "Warehouse"],
    featured: false,
    category: "Logistics",
    short_description: "Assist with inventory and warehouse operations.",
  },
  {
    id: 15,
    title: "Aquaculture Specialist",
    company: "Blue Waters",
    location: "Khulna, Bangladesh",
    type: "Full-time",
    salary: "55k - 70k BDT",
    posted: "4 days ago",
    logo: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=BW",
    tags: ["fisheries", "Aquaculture"],
    featured: false,
    category: "Aquaculture",
    short_description: "Manage fish farming and water quality.",
  },
  {
    id: 16,
    title: "Junior Developer",
    company: "AgriTech Software",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    salary: "35k - 50k BDT",
    posted: "2 days ago",
    logo: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=AT",
    tags: ["Software", "Development"],
    featured: true,
    category: "IT & Software",
    short_description: "Develop software solutions for agricultural needs.",
  },
  {
    id: 17,
    title: "Delivery Driver",
    company: "Fast Ship",
    location: "Sylhet, Bangladesh",
    type: "Full-time",
    salary: "18k - 25k BDT",
    posted: "1 day ago",
    logo: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=FS",
    tags: ["Delivery", "Logistics"],
    featured: false,
    category: "Logistics",
    short_description: "Deliver products safely and on time.",
  },
  {
    id: 18,
    title: "Accountant",
    company: "Farm Fin",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    salary: "40k - 60k BDT",
    posted: "5 days ago",
    logo: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=FF",
    tags: ["Finance", "Accounting"],
    featured: false,
    category: "Finance",
    short_description: "Manage financial records and farm accounts.",
  },
  {
    id: 19,
    title: "Seasonal Fruit Picker",
    company: "Orchard Hills",
    location: "Rajshahi, Bangladesh",
    type: "Contract",
    salary: "15k - 20k BDT",
    posted: "1 week ago",
    logo: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=OH",
    tags: ["Labor", "Seasonal"],
    featured: false,
    category: "Labor",
    short_description: "Harvest fruits during the peak season.",
  },
  {
    id: 20,
    title: "Irrigation Expert",
    company: "Water Wise",
    location: "Rangpur, Bangladesh",
    type: "Part-time",
    salary: "30k - 40k BDT",
    posted: "3 days ago",
    logo: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=WW",
    tags: ["Water", "Technical"],
    featured: false,
    category: "irrigation",
    short_description: "Design and maintain efficient irrigation systems.",
  },
  {
    id: 21,
    title: "HR Executive",
    company: "People First",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    salary: "35k - 50k BDT",
    posted: "4 days ago",
    logo: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=PF",
    tags: ["HR", "Management"],
    featured: false,
    category: "Human Resources",
    short_description: "Manage recruitment and employee relations.",
  },
  {
    id: 22,
    title: "Veterinary Assistant",
    company: "Animal Care Clinic",
    location: "Mymensingh, Bangladesh",
    type: "Full-time",
    salary: "25k - 35k BDT",
    posted: "2 days ago",
    logo: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=AC",
    tags: ["Medical", "Healthcare"],
    featured: true,
    category: "Veterinary",
    short_description: "Assist with animal care and medical procedures.",
  },
  {
    id: 23,
    title: "Product Designer",
    company: "Creative Crop",
    location: "Remote",
    type: "Contract",
    salary: "60k - 80k BDT",
    posted: "Just now",
    logo: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=CC",
    tags: ["Design", "Creative"],
    featured: true,
    category: "Design",
    short_description: "Design user-friendly interfaces for agri-tech apps.",
  },
  {
    id: 24,
    title: "Poultry Farm Worker",
    company: "Chicken Little",
    location: "Gazipur, Bangladesh",
    type: "Full-time",
    salary: "12k - 18k BDT",
    posted: "Yesterday",
    logo: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=CL",
    tags: ["Labor", "Poultry"],
    featured: false,
    category: "Poultry Farming",
    short_description: "Daily care and feeding of poultry stock.",
  },
  {
    id: 25,
    title: "Agricultural Consultant",
    company: "Grow More",
    location: "Khulna, Bangladesh",
    type: "Consultant",
    salary: "100k - 150k BDT",
    posted: "1 week ago",
    logo: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=GM",
    tags: ["Consulting", "Expert"],
    featured: true,
    category: "Consultancy",
    short_description: "Provide expert advice on agribusiness strategies.",
  },
  {
    id: 26,
    title: "Landscape Architect",
    company: "Green Spaces",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    salary: "50k - 75k BDT",
    posted: "5 days ago",
    logo: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=GS",
    tags: ["Design", "Architecture"],
    featured: false,
    category: "Architecture",
    short_description: "Plan and design outdoor landscapes and gardens.",
  },
  {
    id: 27,
    title: "Grain Inspector",
    company: "Quality Grains",
    location: "Dinajpur, Bangladesh",
    type: "Part-time",
    salary: "20k - 25k BDT",
    posted: "3 days ago",
    logo: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=QG",
    tags: ["Quality", "Inspection"],
    featured: false,
    category: "Quality Control",
    short_description: "Inspect grain quality and assign grades.",
  },
  {
    id: 28,
    title: "Seed Analyst",
    company: "Seed Co.",
    location: "Rajshahi, Bangladesh",
    type: "Full-time",
    salary: "30k - 45k BDT",
    posted: "6 days ago",
    logo: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=SC",
    tags: ["Research", "Lab"],
    featured: false,
    category: "Research",
    short_description: "Analyze seed samples for purity and germination.",
  },
  {
    id: 29,
    title: "Administrative Assistant",
    company: "Farm Office",
    location: "Comilla, Bangladesh",
    type: "Full-time",
    salary: "20k - 30k BDT",
    posted: "2 days ago",
    logo: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=FO",
    tags: ["Admin", "Office"],
    featured: false,
    category: "Administration",
    short_description: "Handle daily office tasks and documentation.",
  },
  {
    id: 30,
    title: "Tractor Operator",
    company: "Heavy Machinery",
    location: "Bogra, Bangladesh",
    type: "Seasonal",
    salary: "25k - 40k BDT",
    posted: "1 week ago",
    logo: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=HM",
    tags: ["Operator", "Machinery"],
    featured: false,
    category: "Machinery Operation",
    short_description: "Operate tractors and heavy farm machinery.",
  },
  {
    id: 31,
    title: "Head of Operations",
    company: "Agro Giants",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    salary: "150k - 200k BDT",
    posted: "Just now",
    logo: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=AG",
    tags: ["Operations", "Management"],
    featured: true,
    category: "Executive",
    short_description: "Lead overall operations and strategic planning.",
  },
  {
    id: 32,
    title: "Event Coordinator",
    company: "Rural Expo",
    location: "Chittagong, Bangladesh",
    type: "Part-time",
    salary: "30k - 50k BDT",
    posted: "4 days ago",
    logo: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=RE",
    tags: ["Events", "Marketing"],
    featured: false,
    category: "Event Management",
    short_description: "Organize rural exhibitions and promotional events.",
  },
] as const;

export const jobs: Job[] = rawJobs.map((job) => ({
  ...defaultJobDetails,
  ...job,
  type: job.type as Job["type"],
  tags: [...job.tags],
}));
