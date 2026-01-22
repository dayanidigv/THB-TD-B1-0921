import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get token from localStorage
  const getToken = () => localStorage.getItem('token');

  // Logout
  const logout = useCallback(() => {
    console.log('🚪 Logging out...');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    console.log('✅ Logout complete');
  }, []);

  // Load user profile
  const loadUser = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/profile`);
      setUser(response.data.user);
      console.log('✅ User loaded:', response.data.user);
    } catch (error) {
      console.error('❌ Failed to load user:', error.response?.data || error.message);
      logout();
    } finally {
      setLoading(false);
    }
  }, [logout]);

  // Set axios default header
  useEffect(() => {
    const token = getToken();
    if (token) {
      console.log('🔑 Token found, loading user...');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      loadUser();
    } else {
      console.log('ℹ️ No token found');
      setLoading(false);
    }
  }, [loadUser]);

  // Login with email/password
  const login = async (email, password) => {
    console.log('🔐 Sending login request...');
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      email,
      password
    });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);
    console.log('✅ Login successful, token saved');
    return user;
  };

  // Signup with email/password
  const signup = async (name, email, password) => {
    console.log('📝 Sending signup request...');
    const response = await axios.post(`${API_URL}/api/auth/signup`, {
      name,
      email,
      password
    });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);
    console.log('✅ Signup successful, token saved');
    return user;
  };

  // Google login
  const googleLogin = async (credential) => {
    console.log('🔐 Sending Google auth request...');
    const response = await axios.post(`${API_URL}/api/auth/google`, {
      credential
    });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);
    console.log('✅ Google auth successful, token saved');
    return user;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
