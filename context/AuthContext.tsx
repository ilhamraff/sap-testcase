"use client";

import { AuthUser } from "@/types";
import { loginUser as apiLoginUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = "sap_user";
const TOKEN_STORAGE_KEY = "sap_token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Gagal membaca session dari localStorage:", error);
    } finally {
      setIsLoading(false);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const login = async (username: string, password: string) => {
    const data = await apiLoginUser(username, password);

    const authUser: AuthUser = {
       id: data.id,
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      image: data.image,
      accessToken: data.accessToken, 
    }

    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(authUser));
    localStorage.setItem(TOKEN_STORAGE_KEY, data.accessToken);
    setUser(authUser);
  };

  const logout = () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth harus digunakan dalam provider AuthProvider");
  }

  return context;
}
