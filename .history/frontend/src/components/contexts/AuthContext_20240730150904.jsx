import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to check authentication on mount
  const checkAuth = async () => {
    try {
      const res = await axios.get("/api/auth/me", { withCredentials: true });
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth(); // Check authentication status on component mount
  }, []);

  // Register function
  const register = async (userData) => {
    try {
      await axios.post("/api/auth/register", userData, {
        withCredentials: true,
      });
      await checkAuth(); // Refresh user state
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  // Login function
  const login = async (userData) => {
    try {
      await axios.post("/api/auth/login", userData, { withCredentials: true });
      await checkAuth(); // Refresh user state
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      setUser(null);
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
