import React, { createContext, useContext, useEffect, useState } from "react";
import { apiGet } from "../utils/api";

type User = {
  id: number;
  name: string;
  email: string;
} | null;

const AuthContext = createContext({
  user: null as User,
  setUser: (u: User) => {},
});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const data = await apiGet("/auth/me");
        setUser(data);
      } catch (err) {
        console.error("Erro ao carregar usuário:", err);
        localStorage.removeItem("token");
        setUser(null);
      }
    }

    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
