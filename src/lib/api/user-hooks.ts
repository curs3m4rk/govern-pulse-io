import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./client";
import { UserDetails, RegisterRequest } from "./types";
import { toast } from "sonner";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => apiClient.get<UserDetails[]>("/user/getAllUsers"),
  });
}

export function useUserByUsername(username: string) {
  return useQuery({
    queryKey: ["user", username],
    queryFn: () => apiClient.get<UserDetails>(`/user/getByUsername/${username}`),
    enabled: !!username,
  });
}

export function useRegisterUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: RegisterRequest) =>
      apiClient.post("/user/register", request, false),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User registered successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Registration failed");
    },
  });
}