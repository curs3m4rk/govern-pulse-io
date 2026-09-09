// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiry: string;
  userId: string;
  email: string;
  userName: string;
  roles: string[];
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface LogoutRequest {
  refreshToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  error?: string;
  data?: unknown;
}

// User Types
export interface RegisterRequest {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserDetails {
  id: string;
  userName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  roles: string[];
}

// Role Types
export interface RoleRequest {
  name: string;
}

export interface UpdateRoleRequest {
  currentName: string;
  newName: string;
}

export interface RoleResponse {
  name: string;
  normalizedName: string;
  id: string;
  concurrencyStamp: string;
}

// Generic API Response
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
}