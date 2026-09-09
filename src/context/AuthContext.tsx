import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getAccessToken, getUser, clearTokens, UserDetails } from "@/lib/api/auth-storage";

interface AuthContextType {
  user: UserDetails | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: UserDetails) => void;
  logout: () => void;
  setUser: (user: UserDetails | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize auth state from localStorage
    const token = getAccessToken();
    const storedUser = getUser();
    if (token && storedUser) {
      setUserState(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = (userData: UserDetails) => {
    setUserState(userData);
  };

  const logout = () => {
    clearTokens();
    setUserState(null);
  };

  const setUser = (userData: UserDetails | null) => {
    setUserState(userData);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}