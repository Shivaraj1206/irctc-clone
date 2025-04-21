
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Train, User, Search, LogIn, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { supabase, getCurrentUser, clearCurrentUser } from '@/utils/supabaseClient';

const NavBar = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check current session on component mount
    const checkSession = async () => {
      try {
        // Try Supabase first
        const { data } = await supabase.auth.getSession();
        if (data.session?.user) {
          setUser(data.session.user);
        } else {
          // Fallback to local storage
          const localUser = getCurrentUser();
          setUser(localUser);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        // Fallback to local storage
        const localUser = getCurrentUser();
        setUser(localUser);
      }
    };
    
    checkSession();

    // Set up auth state listener for Supabase
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? getCurrentUser());
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
      // Try Supabase logout
      const { error } = await supabase.auth.signOut();
      
      // Also clear local storage user (whether Supabase worked or not)
      clearCurrentUser();
      
      if (error) {
        console.warn('Supabase logout error, but user session cleared locally:', error.message);
      }
      
      setUser(null);
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error: any) {
      console.error('Logout error:', error);
      // Still try to clear local user
      clearCurrentUser();
      setUser(null);
      toast.success('Logged out successfully');
      navigate('/');
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
            {!user && (
              <Button className="bg-irctc-blue hover:bg-irctc-blue-dark" asChild>
                <Link to="/login?register=true">Sign Up</Link>
              </Button>
            )}
            {user && (
              <div className="flex items-center gap-2">
                <User size={18} className="text-irctc-blue" />
                <span className="text-sm font-medium truncate max-w-[120px]">
                  {user.user_metadata?.full_name || user.name || user.email?.split('@')[0]}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
