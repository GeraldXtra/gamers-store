import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const TOKEN_STORAGE_KEY = "authToken";
const USER_STORAGE_KEY = "authUser";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedToken = sessionStorage.getItem(TOKEN_STORAGE_KEY);
      const storedUser = sessionStorage.getItem(USER_STORAGE_KEY);
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error("Failed to load auth from storage:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (newToken, newUser) => {
    sessionStorage.setItem(TOKEN_STORAGE_KEY, newToken);
    sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    sessionStorage.removeItem(TOKEN_STORAGE_KEY);
    sessionStorage.removeItem(USER_STORAGE_KEY);
    setToken(null);
    setUser(null);
  };

  const updateUser = (updatedFields) => {
    const updatedUser = { ...user, ...updatedFields };
    sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const isAuthenticated = !!token;

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
