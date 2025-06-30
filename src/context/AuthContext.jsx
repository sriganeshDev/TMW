// src/contexts/AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const users = [
    { id: 1, name: "Raashid", email: "raashid@company.com", role: "Admin" },
    { id: 2, name: "Sri Ganesh", email: "ganesh@company.com", role: "Member" },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@company.com",
      role: "Member",
    },
    { id: 4, name: "Bob Smith", email: "bob@company.com", role: "Member" },
  ];

  const login = (email, password) => {
    const user = users.find((u) => u.email === email);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    users,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
