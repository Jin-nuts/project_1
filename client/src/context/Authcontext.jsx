import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    isAuthenticated: false,
    token: null,
    user: null,
  });

  // Load token & user from localStorage when app loads
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("authUser");
    if (token && user) {
      setAuthData({
        isAuthenticated: true,
        token,
        user: JSON.parse(user),
      });
    }
  }, []);

  const login = (token, user) => {
    setAuthData({ isAuthenticated: true, token, user });
    localStorage.setItem("authToken", token);
    localStorage.setItem("authUser", JSON.stringify(user));
  };

  const logout = () => {
    setAuthData({ isAuthenticated: false, token: null, user: null });
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider value={{ ...authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
