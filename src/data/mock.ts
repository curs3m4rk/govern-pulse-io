export type ProjectStatus = "active" | "completed" | "delayed" | "on-hold";

export interface Project {
  id: string;
  code: string;
  name: string;
  department: string;
  state: string;
  status: ProjectStatus;
  budgetAllocated: number;
  budgetSpent: number;
  physicalProgress: number;
  financialProgress: number;
  startDate: string;
  endDate: string;
  manager: string;
}

export interface ProjectUpdate {
  id: string;
  projectId: string;
  date: string;
  physicalProgress: number;
  financialProgress: number;
  remarks: string;
  updatedBy: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "SuperAdmin" | "Admin" | "DepartmentHead" | "ProjectManager" | "DataEntryOperator" | "Viewer";
  department: string;
  status: "active" | "inactive";
  lastLogin: string;
}

export const departments = [
  "Public Works", "Transport", "Water Resources", "Urban Development",
  "Rural Development", "Energy", "Health", "Education"
];

export const states = [
  "Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat",
  "Rajasthan", "Uttar Pradesh", "Madhya Pradesh", "Delhi"
];

export const projects: Project[] = [
  { id: "1", code: "PW-2024-001", name: "National Highway Extension - Phase III", department: "Transport", state: "Maharashtra", status: "active", budgetAllocated: 4500, budgetSpent: 2100, physicalProgress: 45, financialProgress: 47, startDate: "2024-01-15", endDate: "2026-06-30", manager: "Rajesh Kumar" },
  { id: "2", code: "WR-2024-002", name: "Smart Water Grid Installation", department: "Water Resources", state: "Karnataka", status: "active", budgetAllocated: 1200, budgetSpent: 480, physicalProgress: 38, financialProgress: 40, startDate: "2024-03-01", endDate: "2025-12-31", manager: "Priya Sharma" },
  { id: "3", code: "UD-2023-015", name: "Metro Rail Corridor - Line 4", department: "Urban Development", state: "Delhi", status: "delayed", budgetAllocated: 8900, budgetSpent: 5200, physicalProgress: 52, financialProgress: 58, startDate: "2023-06-01", endDate: "2025-12-31", manager: "Amit Verma" },
  { id: "4", code: "EN-2024-008", name: "Solar Park Development", department: "Energy", state: "Rajasthan", status: "active", budgetAllocated: 3200, budgetSpent: 1600, physicalProgress: 60, financialProgress: 50, startDate: "2024-02-01", endDate: "2025-08-31", manager: "Sunita Patel" },
  { id: "5", code: "HE-2024-003", name: "District Hospital Modernization", department: "Health", state: "Tamil Nadu", status: "completed", budgetAllocated: 800, budgetSpent: 760, physicalProgress: 100, financialProgress: 95, startDate: "2023-09-01", endDate: "2025-01-31", manager: "Dr. Meena Rao" },
  { id: "6", code: "ED-2024-012", name: "Smart Classroom Initiative", department: "Education", state: "Gujarat", status: "active", budgetAllocated: 450, budgetSpent: 180, physicalProgress: 35, financialProgress: 40, startDate: "2024-04-01", endDate: "2025-03-31", manager: "Vikram Singh" },
  { id: "7", code: "RD-2023-020", name: "Rural Road Connectivity Program", department: "Rural Development", state: "Uttar Pradesh", status: "on-hold", budgetAllocated: 2100, budgetSpent: 630, physicalProgress: 28, financialProgress: 30, startDate: "2023-11-01", endDate: "2025-10-31", manager: "Arun Yadav" },
  { id: "8", code: "PW-2024-005", name: "Bridge Construction - River Crossing", department: "Public Works", state: "Madhya Pradesh", status: "active", budgetAllocated: 1500, budgetSpent: 900, physicalProgress: 55, financialProgress: 60, startDate: "2024-01-01", endDate: "2025-06-30", manager: "Deepak Joshi" },
];

export const projectUpdates: ProjectUpdate[] = [
  { id: "u1", projectId: "1", date: "2025-03-10", physicalProgress: 45, financialProgress: 47, remarks: "Foundation work completed for section B", updatedBy: "Rajesh Kumar" },
  { id: "u2", projectId: "1", date: "2025-02-25", physicalProgress: 40, financialProgress: 42, remarks: "Material procurement for Phase 2 initiated", updatedBy: "Rajesh Kumar" },
  { id: "u3", projectId: "3", date: "2025-03-12", physicalProgress: 52, financialProgress: 58, remarks: "Delay due to land acquisition issues in Sector 7", updatedBy: "Amit Verma" },
];

export const users: User[] = [
  { id: "u1", name: "Rajesh Kumar", email: "rajesh@difc.gov.in", role: "ProjectManager", department: "Transport", status: "active", lastLogin: "2025-03-18" },
  { id: "u2", name: "Priya Sharma", email: "priya@difc.gov.in", role: "ProjectManager", department: "Water Resources", status: "active", lastLogin: "2025-03-17" },
  { id: "u3", name: "Admin User", email: "admin@difc.gov.in", role: "SuperAdmin", department: "Administration", status: "active", lastLogin: "2025-03-18" },
  { id: "u4", name: "Sunita Patel", email: "sunita@difc.gov.in", role: "DepartmentHead", department: "Energy", status: "active", lastLogin: "2025-03-16" },
  { id: "u5", name: "Vikram Singh", email: "vikram@difc.gov.in", role: "DataEntryOperator", department: "Education", status: "active", lastLogin: "2025-03-15" },
  { id: "u6", name: "Arun Yadav", email: "arun@difc.gov.in", role: "Viewer", department: "Rural Development", status: "inactive", lastLogin: "2025-02-20" },
];

export const dashboardStats = {
  totalProjects: projects.length,
  activeProjects: projects.filter(p => p.status === "active").length,
  completedProjects: projects.filter(p => p.status === "completed").length,
  delayedProjects: projects.filter(p => p.status === "delayed").length,
  totalBudget: projects.reduce((s, p) => s + p.budgetAllocated, 0),
  totalSpent: projects.reduce((s, p) => s + p.budgetSpent, 0),
  avgProgress: Math.round(projects.reduce((s, p) => s + p.physicalProgress, 0) / projects.length),
};

export const departmentChartData = departments.slice(0, 6).map(dept => ({
  name: dept.length > 12 ? dept.slice(0, 12) + "…" : dept,
  projects: projects.filter(p => p.department === dept).length,
  budget: projects.filter(p => p.department === dept).reduce((s, p) => s + p.budgetAllocated, 0),
}));

export const monthlyTrendData = [
  { month: "Oct", progress: 28, spending: 1200 },
  { month: "Nov", progress: 32, spending: 1450 },
  { month: "Dec", progress: 35, spending: 1300 },
  { month: "Jan", progress: 39, spending: 1600 },
  { month: "Feb", progress: 42, spending: 1800 },
  { month: "Mar", progress: 46, spending: 1950 },
];

export const statusDistribution = [
  { name: "Active", value: dashboardStats.activeProjects, fill: "hsl(var(--chart-1))" },
  { name: "Completed", value: dashboardStats.completedProjects, fill: "hsl(var(--chart-4))" },
  { name: "Delayed", value: dashboardStats.delayedProjects, fill: "hsl(var(--chart-3))" },
  { name: "On Hold", value: projects.filter(p => p.status === "on-hold").length, fill: "hsl(var(--chart-5))" },
];
