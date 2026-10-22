import React, { createContext, useState, useEffect, useContext } from "react";
import axiosInstance from "../api/axiosConfig";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    const storedRole = localStorage.getItem("userRole");
    if (!storedRole) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.get(`/${storedRole}/data`);
      if (res.data && res.data.success) {
        setUser(res.data.data);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      // Clean up session if verification fails
      setUser(null);
      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userPhone");
      localStorage.removeItem("caseId");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    const resolvedName = userData.name && userData.name !== "Firebase User" && userData.name !== "User"
      ? userData.name
      : (userData.email || userData.phone || "User");
    localStorage.setItem("userRole", userData.role);
    localStorage.setItem("userId", userData._id);
    localStorage.setItem("username", resolvedName);
    localStorage.setItem("userName", resolvedName);
    localStorage.setItem("userEmail", userData.email || "");
    if (userData.phone) {
      localStorage.setItem("userPhone", userData.phone);
    }
    if (token) {
      localStorage.setItem("authToken", token);
      localStorage.setItem("token", token);
    }
  };

  const updateUser = (userData) => {
    setUser((prev) => {
      const merged = { ...(prev || {}), ...userData };
      if (merged.name) {
        localStorage.setItem("username", merged.name);
        localStorage.setItem("userName", merged.name);
      }
      if (merged.email !== undefined) {
        localStorage.setItem("userEmail", merged.email || "");
      }
      if (merged.phone !== undefined) {
        localStorage.setItem("userPhone", merged.phone || "");
      }
      return merged;
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("caseId");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkAuth, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
