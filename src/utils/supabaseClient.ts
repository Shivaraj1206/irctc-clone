
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with fixed URL and key for the demo
// These are public demo credentials that can be used for testing
const supabaseUrl = "https://pefdnxvknbfrjexmrjgo.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlZmRueHZrbmJmcmpleG1yamdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk1NjgwNjksImV4cCI6MjAyNTE0NDA2OX0.f06CzSHdlgTd2vwZ4MvUkZrZJJK2DyqPWN1_02xsCyE";

export const supabase = createClient(supabaseUrl, supabaseKey);

// Mockup for local auth when Supabase fails
const LOCAL_STORAGE_KEY = 'irctc_auth_users';

// Get all registered users from localStorage
export const getLocalUsers = () => {
  const users = localStorage.getItem(LOCAL_STORAGE_KEY);
  return users ? JSON.parse(users) : [];
};

// Save a new user to localStorage
export const saveLocalUser = (email: string, password: string, name: string) => {
  const users = getLocalUsers();
  users.push({ email, password, name });
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
};

// Check if user exists in local storage
export const checkLocalUser = (email: string, password: string) => {
  const users = getLocalUsers();
  return users.find(user => user.email === email && user.password === password);
};

// Save current user session
export const saveCurrentUser = (user: any) => {
  localStorage.setItem('irctc_current_user', JSON.stringify(user));
};

// Get current user session
export const getCurrentUser = () => {
  const user = localStorage.getItem('irctc_current_user');
  return user ? JSON.parse(user) : null;
};

// Clear current user session
export const clearCurrentUser = () => {
  localStorage.removeItem('irctc_current_user');
};
