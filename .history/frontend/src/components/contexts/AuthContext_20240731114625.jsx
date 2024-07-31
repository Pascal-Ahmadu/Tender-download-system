import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000";
axios.defaults.baseURL = API_BASE_URL;

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch user on app load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/current", {
          withCredentials: true,
        });
        setUser(res.data.user); // Ensure `res.data.user` is the correct user object
      } catch (err) {
        console.error(err.response ? err.response.data.msg : err.message);
      }
    };

    fetchUser();
  }, []);

  const register = async (username, email, password, confirmPassword) => {
    try {
      await axios.post(
        "/api/auth/register",
        { username, email, password, confirmPassword },
        { withCredentials: true }
      );
      // Optionally fetch user data if needed
    } catch (err) {
      throw new Error(err.response ? err.response.data.msg : err.message);
    }
  };

  const login = async (email, password) => {
    try {
      console.log("Attempting login...");
      const loginResponse = await axios.post(
        "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      console.log("Login response:", loginResponse);

      console.log("Fetching current user...");
      const userResponse = await axios.get("/api/auth/current", {
        withCredentials: true,
      });
      console.log("User response:", userResponse);

      setUser(userResponse.data.user);
    } catch (err) {
      console.error("Login error:", err);
      throw new Error(err.response ? err.response.data.msg : err.message);
    }
  };
  const logout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      setUser(null);
    } catch (err) {
      console.error(err.response ? err.response.data.msg : err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
