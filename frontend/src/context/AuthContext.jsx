import React, { createContext, useState } from 'react';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (!storedUser) return null;
    const parsedUser = JSON.parse(storedUser);
    return { ...parsedUser, role: parsedUser.role || 'user' };
  });

  const login = (userData) => {
    const normalizedUser = { ...userData, role: userData?.role || 'user' };
    setUser(normalizedUser);
    localStorage.setItem('userInfo', JSON.stringify(normalizedUser));
  };

  const logout = () => {
    setUser(null);
    // take the user out of the box 
    localStorage.removeItem('userInfo');
  };

  return (
    // using this we can use these info anywhere we want right
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};