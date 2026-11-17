import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'CITIZEN' | 'CMO_ADMIN' | 'DEPARTMENT_OFFICER';
  department?: {
    id: string;
    name: string;
  } | null;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User, refreshToken?: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('civicflow_token');
    const storedUser = localStorage.getItem('civicflow_user');

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      } catch (err) {
        console.error('Failed to parse cached session:', err);
        localStorage.removeItem('civicflow_token');
        localStorage.removeItem('civicflow_user');
      }
    }
    setLoading(false);
  }, []);

  const login = (authToken: string, authUser: User, refreshToken?: string) => {
    setToken(authToken);
    setUser(authUser);
    localStorage.setItem('civicflow_token', authToken);
    localStorage.setItem('civicflow_user', JSON.stringify(authUser));
    if (refreshToken) {
      localStorage.setItem('civicflow_refresh', refreshToken);
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('civicflow_token');
    localStorage.removeItem('civicflow_user');
    localStorage.removeItem('civicflow_refresh');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
