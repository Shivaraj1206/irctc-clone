
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Train, User, Search, LogIn, LogOut } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';

// Initialize Supabase client with fixed URL and key for the demo
// These are public demo credentials that can be used for testing
const supabase = createClient(
  "https://pefdnxvknbfrjexmrjgo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlZmRueHZrbmJmcmpleG1yamdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk1NjgwNjksImV4cCI6MjAyNTE0NDA2OX0.f06CzSHdlgTd2vwZ4MvUkZrZJJK2DyqPWN1_02xsCyE"
);

const NavBar = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check current session on component mount
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };
    
    checkSession();

    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error('Logout failed', { description: error.message });
      } else {
        toast.success('Logged out successfully');
        navigate('/');
      }
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error('An error occurred while logging out');
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Train className="h-6 w-6 text-irctc-blue" />
            <Link to="/" className="text-xl font-bold text-irctc-blue">IRCTC</Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-irctc-blue font-medium">Home</Link>
            <Link to="/trains" className="text-gray-700 hover:text-irctc-blue font-medium">Trains</Link>
            <Button variant="outline" className="text-gray-700 hover:text-irctc-blue font-medium" asChild>
              <Link to="/pnr">
                <Search size={18} className="mr-2" />
                PNR Status
              </Link>
            </Button>
            <Link to="/contact" className="text-gray-700 hover:text-irctc-blue font-medium">Contact</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <Button 
                variant="outline" 
                onClick={handleLogout} 
                className="hidden md:flex items-center gap-2"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </Button>
            ) : (
              <Button 
                variant="outline" 
                className="hidden md:flex items-center gap-2"
                asChild
              >
                <Link to="/login">
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>
              </Button>
            )}
            <Button className="bg-irctc-blue hover:bg-irctc-blue-dark" asChild>
              <Link to="/login?register=true">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
