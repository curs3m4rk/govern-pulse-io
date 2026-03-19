import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, MapPin, Building } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/StatusBadge";
import { projects, projectUpdates } from "@/data/mock";
import { Button } from "@/components/ui/button";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-muted-foreground">Project not found</p>
        <Button variant="link" asChild><Link to="/projects">Back to Projects</Link></Button>
      </div>
    );
  }

  const updates = projectUpdates.filter((u) => u.projectId === project.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/projects"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight">{project.name}</h1>
            <StatusBadge status={project.status} />
          </div>
          <p className="text-muted-foreground text-sm font-mono">{project.code}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Building, label: "Department", value: project.department },
          { icon: MapPin, label: "State", value: project.state },
          { icon: User, label: "Manager", value: project.manager },
          { icon: Calendar, label: "Timeline", value: `${project.startDate} → ${project.endDate}` },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent">
                <item.icon className="h-4 w-4 text-accent-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-sm font-medium">{item.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Physical Progress</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Overall</span>
              <span className="font-medium">{project.physicalProgress}%</span>
            </div>
            <Progress value={project.physicalProgress} className="h-3" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Financial Progress</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">₹{project.budgetSpent}Cr of ₹{project.budgetAllocated}Cr</span>
              <span className="font-medium">{project.financialProgress}%</span>
            </div>
            <Progress value={project.financialProgress} className="h-3" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Update History</CardTitle></CardHeader>
        <CardContent>
          {updates.length === 0 ? (
            <p className="text-sm text-muted-foreground py-6 text-center">No updates recorded</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Physical %</TableHead>
                  <TableHead>Financial %</TableHead>
                  <TableHead>Remarks</TableHead>
                  <TableHead>Updated By</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {updates.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="text-muted-foreground">{u.date}</TableCell>
                    <TableCell>{u.physicalProgress}%</TableCell>
                    <TableCell>{u.financialProgress}%</TableCell>
                    <TableCell className="max-w-xs truncate">{u.remarks}</TableCell>
                    <TableCell className="text-muted-foreground">{u.updatedBy}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
