import { Badge } from "@/components/ui/badge";
import type { ProjectStatus } from "@/data/mock";

const statusConfig: Record<ProjectStatus, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-accent text-accent-foreground border-transparent" },
  completed: { label: "Completed", className: "bg-success/10 text-success border-transparent" },
  delayed: { label: "Delayed", className: "bg-warning/10 text-warning border-transparent" },
  "on-hold": { label: "On Hold", className: "bg-muted text-muted-foreground border-transparent" },
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const config = statusConfig[status];
  return <Badge variant="outline" className={config.className}>{config.label}</Badge>;
}
