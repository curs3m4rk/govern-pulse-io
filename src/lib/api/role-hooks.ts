import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./client";
import { RoleRequest, UpdateRoleRequest } from "./types";
import { toast } from "sonner";

export interface RoleResponse {
  name: string;
  normalizedName: string;
  id: string;
  concurrencyStamp: string;
}

export function useRoles() {
  return useQuery({
    queryKey: ["roles"],
    queryFn: () => apiClient.get<RoleResponse[]>("/role/getAllRoles"),
  });
}

export function useRoleByName(roleName: string) {
  return useQuery({
    queryKey: ["role", roleName],
    queryFn: () => apiClient.get<RoleResponse>(`/role/getByName/${roleName}`),
    enabled: !!roleName,
  });
}

export function useCreateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: RoleRequest) =>
      apiClient.post("/role/create", request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast.success("Role created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create role");
    },
  });
}

export function useUpdateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: UpdateRoleRequest) =>
      apiClient.put("/role/update", request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast.success("Role updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update role");
    },
  });
}

export function useDeleteRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (roleName: string) =>
      apiClient.delete(`/role/delete/${roleName}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast.success("Role deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete role");
    },
  });
}