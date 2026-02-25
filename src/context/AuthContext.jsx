import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

 useEffect(() => {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (!token || !storedUser) return;

  try {
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
  } catch {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }
}, []);

 const login = (userData, token) => {
  console.log("LOGIN CALLED:", userData);

  if (!userData) {
    console.log("No user data received");
    return;
  }

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(userData));
  setUser(userData);
};

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};