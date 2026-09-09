import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./client";
import {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  LogoutRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from "./types";
import { setTokens, clearTokens, setUser } from "./auth-storage";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export function useLogin() {
  const queryClient = useQueryClient();
  const { login: setAuthenticatedUser } = useAuth();

  return useMutation({
    mutationFn: (credentials: LoginRequest) =>
      apiClient.post<LoginResponse>("/auth/login", credentials, false),
    onSuccess: (data) => {
      const user = {
        userId: data.userId,
        email: data.email,
        userName: data.userName,
        roles: data.roles,
      };

      setTokens(data.accessToken, data.refreshToken);
      setUser(user);
      setAuthenticatedUser(user);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Welcome back!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Login failed. Please check your credentials.");
    },
  });
}

export function useRefreshToken() {
  return useMutation({
    mutationFn: (request: RefreshTokenRequest) =>
      apiClient.post<LoginResponse>("/auth/refresh", request, false),
    onSuccess: (data) => {
      setTokens(data.accessToken, data.refreshToken);
    },
    onError: () => {
      clearTokens();
    },
  });
}

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: LogoutRequest) =>
      apiClient.post("/auth/logout", request),
    onSuccess: () => {
      clearTokens();
      queryClient.clear();
      navigate("/login");
      toast.success("Logged out successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Logout failed");
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (request: ForgotPasswordRequest) =>
      apiClient.post("/auth/forgot-password", request, false),
    onSuccess: () => {
      toast.success("If the email exists, a password reset link has been sent.");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to send reset email");
    },
  });
}

export function useResetPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (request: ResetPasswordRequest) =>
      apiClient.post("/auth/reset-password", request, false),
    onSuccess: () => {
      toast.success("Password has been reset successfully");
      navigate("/login");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to reset password");
    },
  });
}

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (request: { userName: string; email: string; password: string; confirmPassword: string }) =>
      apiClient.post("/user/register", request, false),
    onSuccess: () => {
      toast.success("Registration successful! Please log in.");
      navigate("/login");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Registration failed");
    },
  });
}
