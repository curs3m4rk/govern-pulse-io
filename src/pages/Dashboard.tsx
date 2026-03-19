import { FolderKanban, TrendingUp, AlertTriangle, IndianRupee, Activity, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiCard } from "@/components/KpiCard";
import { dashboardStats, departmentChartData, monthlyTrendData, statusDistribution } from "@/data/mock";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from "recharts";

export default function Dashboard() {
  const budgetUtil = Math.round((dashboardStats.totalSpent / dashboardStats.totalBudget) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Overview of all infrastructure projects</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KpiCard title="Total Projects" value={dashboardStats.totalProjects} icon={FolderKanban} />
        <KpiCard title="Active" value={dashboardStats.activeProjects} icon={Activity} />
        <KpiCard title="Completed" value={dashboardStats.completedProjects} icon={CheckCircle} />
        <KpiCard title="Delayed" value={dashboardStats.delayedProjects} icon={AlertTriangle} />
        <KpiCard title="Budget Utilization" value={`${budgetUtil}%`} subtitle={`₹${dashboardStats.totalSpent}Cr / ₹${dashboardStats.totalBudget}Cr`} icon={IndianRupee} />
        <KpiCard title="Avg. Progress" value={`${dashboardStats.avgProgress}%`} icon={TrendingUp} trend="+4% this month" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardHeader>
            <CardTitle className="text-base font-medium">Projects by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={departmentChartData}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="projects" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="animate-fade-in" style={{ animationDelay: "0.15s" }}>
          <CardHeader>
            <CardTitle className="text-base font-medium">Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={statusDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} innerRadius={60} paddingAngle={4}>
                  {statusDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 ml-4 shrink-0">
              {statusDistribution.map((s) => (
                <div key={s.name} className="flex items-center gap-2 text-sm">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: s.fill }} />
                  <span className="text-muted-foreground">{s.name}</span>
                  <span className="font-medium">{s.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader>
            <CardTitle className="text-base font-medium">Monthly Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="progress" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={{ r: 4 }} name="Progress %" />
                <Line type="monotone" dataKey="spending" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ r: 4 }} name="Spending (₹Cr)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
