import { createContext, useState, useContext, useEffect } from "react";
import { authService } from "../services";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser();
    }

    const handleUnauthorized = () => {
      setUser(null);
      setError(null);
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);

    return () => {
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, []);

  const fetchUser = async () => {
    try {
      const response = await authService.getCurrentUser();
      setUser(response.data.user);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      localStorage.removeItem("token");
    }
  };

  const register = async (username, email, password, flatCode) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register(
        username,
        email,
        password,
        flatCode,
      );
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      setUser(user);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(email, password);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      setUser(user);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
