import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

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
        setUser(res.data.user);
      } catch (err) {
        console.error(err.response ? err.response.data.msg : err.message);
      }
    };

    fetchUser();
  }, []);

  const register = async (email, password) => {
    try {
      await axios.post(
        "/api/auth/register",
        { email, password },
        { withCredentials: true }
      );
      // Optionally fetch user data if needed
    } catch (err) {
      throw new Error(err.response ? err.response.data.msg : err.message);
    }
  };

  const login = async (email, password) => {
    try {
      await axios.post(
        "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      const res = await axios.get("/api/auth/current", {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (err) {
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

export { AuthProvider, AuthContext };
