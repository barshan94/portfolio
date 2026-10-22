export type RepositoryCategory =
  | "Core software projects"
  | "Digital marketing & growth"
  | "Academic & early experiments"
  | "Portfolio";

export interface GitHubRepository {
  name: string;
  category: RepositoryCategory;
  description: string;
}

const core: GitHubRepository[] = [
  { name: "money-calculator", category: "Core software projects", description: "Personal finance application and ledger-based financial workflows." },
  { name: "asta-store", category: "Core software projects", description: "E-commerce storefront project." },
  { name: "MountRoyalAcademy-website", category: "Core software projects", description: "School website and administration workflows." },
  { name: "student-performance-dashboard", category: "Core software projects", description: "Student performance and academic analytics dashboard." },
  { name: "digital-coaching-management-system", category: "Core software projects", description: "Digital coaching management project." },
  { name: "999_NATIONAL_EMERGENCY_SERVICE", category: "Core software projects", description: "Academic/public-service emergency workflow concept." },
];

const growth: GitHubRepository[] = [
  { name: "KeywordResearch", category: "Digital marketing & growth", description: "Keyword research and SEO work." },
  { name: "KeywordRedearchforAmazonAffiliate", category: "Digital marketing & growth", description: "Amazon affiliate keyword research." },
  { name: "Google-Business-Profile", category: "Digital marketing & growth", description: "Google Business Profile and local search work." },
  { name: "ContentWriting", category: "Digital marketing & growth", description: "Content writing examples and practice." },
  { name: "WebsiteAudit", category: "Digital marketing & growth", description: "Website audit work." },
  { name: "OnPageOptimization", category: "Digital marketing & growth", description: "On-page SEO optimization." },
  { name: "YoutubeSeo", category: "Digital marketing & growth", description: "YouTube SEO work." },
  { name: "CompleteWebsiteusingWordpress", category: "Digital marketing & growth", description: "WordPress website project." },
  { name: "WebsiteCustomizationusingwordpress", category: "Digital marketing & growth", description: "WordPress customization work." },
  { name: "FacebookLiveAdCampaign", category: "Digital marketing & growth", description: "Facebook live advertising campaign work." },
  { name: "Design", category: "Digital marketing & growth", description: "Design-related work and assets." },
  { name: "AutomationsUsingManychat", category: "Digital marketing & growth", description: "Manychat automation experiments." },
];

const academic: GitHubRepository[] = [
  { name: "project", category: "Academic & early experiments", description: "Earlier project repository." },
  { name: "demo", category: "Academic & early experiments", description: "Demonstration and experimentation repository." },
  { name: "lab", category: "Academic & early experiments", description: "Lab exercises and experiments." },
  { name: "trial", category: "Academic & early experiments", description: "Trial and practice repository." },
  { name: "SE-Repo", category: "Academic & early experiments", description: "Software engineering coursework." },
  { name: "Fall_2021", category: "Academic & early experiments", description: "Academic coursework from Fall 2021." },
  { name: "a", category: "Academic & early experiments", description: "Early practice repository." },
  { name: "E-governence", category: "Academic & early experiments", description: "E-governance system project." },
  { name: "Library_Management_service", category: "Academic & early experiments", description: "Library management system project." },
  { name: "Bank_Account_Management", category: "Academic & early experiments", description: "Bank account management project." },
  { name: "Doctor_management_system", category: "Academic & early experiments", description: "Doctor management system project." },
  { name: "Ride_sharing_management", category: "Academic & early experiments", description: "Ride-sharing management project." },
  { name: "Online_shopping_management_system", category: "Academic & early experiments", description: "Online shopping management project." },
  { name: "-Simple_village", category: "Academic & early experiments", description: "Earlier academic or practice repository." },
  { name: "automated_testing", category: "Academic & early experiments", description: "Automated testing exercises." },
  { name: "Basic_programming", category: "Academic & early experiments", description: "Foundational programming exercises." },
  { name: "python_internship", category: "Academic & early experiments", description: "Python internship learning materials." },
  { name: "Dataset", category: "Academic & early experiments", description: "Dataset repository." },
  { name: "Thesis", category: "Academic & early experiments", description: "Thesis and research materials." },
];

const portfolio: GitHubRepository[] = [
  { name: "portfolio", category: "Portfolio", description: "This portfolio website, built with Astro." },
];

export const githubRepositories: GitHubRepository[] = [
  ...core,
  ...growth,
  ...academic,
  ...portfolio,
];

export const repositoryCategories = [
  "All repositories",
  "Core software projects",
  "Digital marketing & growth",
  "Academic & early experiments",
  "Portfolio",
] as const;
