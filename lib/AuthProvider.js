import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  function setAdmin(value) {
    setIsAdmin(value);
  }

  function setLogin(value) {
    setIsLoginOpen(value);
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const admin = localStorage.getItem('isAdmin');
      setAdmin(admin);
    }
  }, []);

  const value = {
    isAdmin,
    isLoginOpen,
    setLogin,
    setAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
