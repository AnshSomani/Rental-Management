import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios, { AxiosInstance } from 'axios';

// Define the shape of the user data and the context
interface User {
  _id: string;
  fullName: string;
  email: string;
  role: 'customer' | 'lender';
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  api: AxiosInstance;
}

// Create the context with a default value of null
const AuthContext = createContext<AuthContextType | null>(null);

// Create a provider component
interface AuthProviderProps {
  children: ReactNode;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [api] = useState<AxiosInstance>(() => {
    const instance = axios.create({ baseURL: `${API_BASE_URL}/api` });
    return instance;
  });

  // On initial load, check if user data exists in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      const parsed = JSON.parse(storedUser) as User;
      setUser(parsed);
      api.defaults.headers.common['Authorization'] = `Bearer ${parsed.token}`;
    }
  }, [api]);

  // Login function
  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('userInfo', JSON.stringify(userData));
    api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
    delete api.defaults.headers.common['Authorization'];
  };

  // By removing the extra div, this provider becomes invisible to the CSS layout.
  return (
    <AuthContext.Provider value={{ user, login, logout, api }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily use the auth context in other components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
