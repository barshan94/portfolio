export type GitHubRepositoryGroup = "Core projects" | "Digital marketing & growth" | "Academic & early experiments" | "Portfolio";

export type GitHubRepository = {
  name: string;
  repo: string;
  group: GitHubRepositoryGroup;
  description: string;
  featured?: boolean;
};

export const githubRepositories: GitHubRepository[] = [
  {
    name: "Money Calculator",
    repo: "money-calculator",
    group: "Core projects",
    description: "Personal-finance application with ledger transactions, accounts, loans, repayments, and balance tracking.",
    featured: true,
  },
  {
    name: "ASTA Store",
    repo: "asta-store",
    group: "Core projects",
    description: "E-commerce storefront project.",
    featured: true,
  },
  {
    name: "Mount Royal Academy Website",
    repo: "MountRoyalAcademy-website",
    group: "Core projects",
    description: "School website and education-platform project.",
    featured: true,
  },
  {
    name: "Student Performance Dashboard",
    repo: "student-performance-dashboard",
    group: "Core projects",
    description: "Academic analytics dashboard with illustrative student-performance data.",
    featured: true,
  },
  {
    name: "Digital Coaching Management System",
    repo: "digital-coaching-management-system",
    group: "Core projects",
    description: "Google Apps Script and Sheets project for coaching records and payment tracking.",
    featured: true,
  },
  {
    name: "999 National Emergency Service",
    repo: "999_NATIONAL_EMERGENCY_SERVICE",
    group: "Core projects",
    description: "Public-service workflow concept; not a live emergency-dispatch service.",
    featured: true,
  },
  {
    name: "Keyword Research",
    repo: "KeywordResearch",
    group: "Digital marketing & growth",
    description: "SEO keyword research.",
  },
  {
    name: "Amazon Affiliate Keyword Research",
    repo: "KeywordRedearchforAmazonAffiliate",
    group: "Digital marketing & growth",
    description: "Keyword research for affiliate content.",
  },
  {
    name: "Google Business Profile",
    repo: "Google-Business-Profile",
    group: "Digital marketing & growth",
    description: "Local-search and business-profile work.",
  },
  {
    name: "Content Writing",
    repo: "ContentWriting",
    group: "Digital marketing & growth",
    description: "Content-writing work.",
  },
  {
    name: "Website Audit",
    repo: "WebsiteAudit",
    group: "Digital marketing & growth",
    description: "Website audit and SEO review work.",
  },
  {
    name: "On-Page Optimization",
    repo: "OnPageOptimization",
    group: "Digital marketing & growth",
    description: "On-page SEO work.",
  },
  {
    name: "YouTube SEO",
    repo: "YoutubeSeo",
    group: "Digital marketing & growth",
    description: "Video-search optimization work.",
  },
  {
    name: "WordPress Website Build",
    repo: "CompleteWebsiteusingWordpress",
    group: "Digital marketing & growth",
    description: "Website build using WordPress.",
  },
  {
    name: "WordPress Customization",
    repo: "WebsiteCustomizationusingwordpress",
    group: "Digital marketing & growth",
    description: "WordPress website customization.",
  },
  {
    name: "Facebook Live Ad Campaign",
    repo: "FacebookLiveAdCampaign",
    group: "Digital marketing & growth",
    description: "Paid-campaign project.",
  },
  {
    name: "Design",
    repo: "Design",
    group: "Digital marketing & growth",
    description: "Creative and design work.",
  },
  {
    name: "ManyChat Automations",
    repo: "AutomationsUsingManychat",
    group: "Digital marketing & growth",
    description: "Chat-based marketing automation.",
  },
  {
    name: "Project",
    repo: "project",
    group: "Academic & early experiments",
    description: "Earlier repository; open GitHub to inspect its contents.",
  },
  {
    name: "Demo",
    repo: "demo",
    group: "Academic & early experiments",
    description: "Demonstration repository; open GitHub to inspect its contents.",
  },
  {
    name: "Lab",
    repo: "lab",
    group: "Academic & early experiments",
    description: "Lab and experiment repository.",
  },
  {
    name: "Trial",
    repo: "trial",
    group: "Academic & early experiments",
    description: "Trial repository; open GitHub to inspect its contents.",
  },
  {
    name: "SE Repository",
    repo: "SE-Repo",
    group: "Academic & early experiments",
    description: "Software-engineering coursework repository.",
  },
  {
    name: "Fall 2021",
    repo: "Fall_2021",
    group: "Academic & early experiments",
    description: "Earlier academic repository.",
  },
  {
    name: "A",
    repo: "a",
    group: "Academic & early experiments",
    description: "Earlier repository; open GitHub to inspect its contents.",
  },
  {
    name: "E-Governance",
    repo: "E-governence",
    group: "Academic & early experiments",
    description: "E-governance project repository.",
  },
  {
    name: "Library Management Service",
    repo: "Library_Management_service",
    group: "Academic & early experiments",
    description: "Library-management system project.",
  },
  {
    name: "Bank Account Management",
    repo: "Bank_Account_Management",
    group: "Academic & early experiments",
    description: "Bank-account management project.",
  },
  {
    name: "Doctor Management System",
    repo: "Doctor_management_system",
    group: "Academic & early experiments",
    description: "Doctor-management system project.",
  },
  {
    name: "Ride Sharing Management",
    repo: "Ride_sharing_management",
    group: "Academic & early experiments",
    description: "Ride-sharing management project.",
  },
  {
    name: "Online Shopping Management System",
    repo: "Online_shopping_management_system",
    group: "Academic & early experiments",
    description: "Online-shopping management project.",
  },
  {
    name: "Simple Village",
    repo: "-Simple_village",
    group: "Academic & early experiments",
    description: "Earlier project repository.",
  },
  {
    name: "Automated Testing",
    repo: "automated_testing",
    group: "Academic & early experiments",
    description: "Automated-testing repository.",
  },
  {
    name: "Basic Programming",
    repo: "Basic_programming",
    group: "Academic & early experiments",
    description: "Programming fundamentals and exercises.",
  },
  {
    name: "Python Internship",
    repo: "python_internship",
    group: "Academic & early experiments",
    description: "Python internship work.",
  },
  {
    name: "Dataset",
    repo: "Dataset",
    group: "Academic & early experiments",
    description: "Dataset repository.",
  },
  {
    name: "Blockchain Internet of Things Thesis",
    repo: "Thesis",
    group: "Academic & early experiments",
    description: "Research on blockchain, IoT, and healthcare security.",
    featured: true,
  },
  {
    name: "Portfolio Website",
    repo: "portfolio",
    group: "Portfolio",
    description: "The source code for this portfolio website.",
  },
];

export const githubRepositoryGroups: GitHubRepositoryGroup[] = [
  "Core projects",
  "Digital marketing & growth",
  "Academic & early experiments",
  "Portfolio",
];
