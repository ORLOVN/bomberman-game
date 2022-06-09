import React, { createContext, useContext, useMemo } from "react";
import { Roles } from "@/enums";

import useLocalStorage from "./useLocalStorage";

interface AuthContextInterface {
  role: Roles[keyof Roles];
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextInterface>({
  role: "guest",
  login: () => {},
  logout: () => {},
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useLocalStorage("role", "guest");

  const login = () => {
    setRole(Roles.user);
  };

  const logout = () => {
    setRole(Roles.guest);
  };

  const value = useMemo(
    () => ({
      role,
      login,
      logout,
    }),
    [role]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
