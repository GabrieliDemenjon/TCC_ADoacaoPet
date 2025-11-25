import React, { createContext, useContext, useState } from "react";

type User = { id: number; name: string; email: string } | null;

const AuthContext = createContext({
  user: null as User,
  setUser: (u: User) => {},
});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User>(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
