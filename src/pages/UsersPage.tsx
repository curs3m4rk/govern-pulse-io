import { useState } from "react";
import { Search, UserPlus, Loader2, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useUsers } from "@/lib/api/user-hooks";
import { toast } from "sonner";

interface User {
  id: string;
  userName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  roles: string[];
}

const roleColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  SuperAdmin: "destructive",
  Admin: "default",
  DepartmentHead: "secondary",
  ProjectManager: "secondary",
  DataEntryOperator: "outline",
  Viewer: "outline",
};

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const { data: users, isLoading, error, refetch } = useUsers();

  const filteredUsers = users?.filter((u) =>
    u.userName.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.fullName.toLowerCase().includes(search.toLowerCase())
  ) || [];

  if (error) {
    toast.error("Failed to load users");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage system users and roles</p>
        </div>
        <Button><UserPlus className="h-4 w-4 mr-2" />Add User</Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
          disabled={isLoading}
        />
      </div>

      <div className="rounded-lg border bg-card overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="font-medium">{u.fullName || u.userName}</TableCell>
                      <TableCell className="text-muted-foreground">{u.email}</TableCell>
                      <TableCell>
                        {u.roles.map((role) => (
                          <Badge
                            key={role}
                            variant={roleColors[role] || "secondary"}
                            className="font-normal mr-1 mb-1"
                          >
                            {role}
                          </Badge>
                        ))}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{u.phoneNumber || "—"}</TableCell>
                      <TableCell>
                        <Badge variant="default" className="bg-success/10 text-success border-transparent">
                          Active
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </>
        )}
      </div>
    </div>
  );
}