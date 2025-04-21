
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { User, Lock, UserPlus, Mail, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Initialize Supabase client with fixed URL and key for the demo
const supabase = createClient(
  "https://pefdnxvknbfrjexmrjgo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlZmRueHZrbmJmcmpleG1yamdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk1NjgwNjksImV4cCI6MjAyNTE0NDA2OX0.f06CzSHdlgTd2vwZ4MvUkZrZJJK2DyqPWN1_02xsCyE"
);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    // Check if register param is present in URL
    if (searchParams.get('register') === 'true') {
      setIsRegistering(true);
    }
  }, [searchParams]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    if (!email || !password) {
      setError('Please enter both email and password');
      setLoading(false);
      return;
    }

    if (isRegistering && password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      if (isRegistering) {
        // Register new user
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            }
          }
        });

        if (error) {
          setError(error.message);
          toast.error('Registration failed', { description: error.message });
        } else {
          toast.success('Registration successful!', { 
            description: 'Please check your email to confirm your account' 
          });
          setIsRegistering(false);
        }
      } else {
        // Login existing user
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          setError(error.message);
          toast.error('Login failed', { description: error.message });
        } else {
          toast.success('Login successful');
          navigate('/');
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      setError('Authentication error occurred');
      toast.error('Authentication error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-irctc-gray">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-irctc-blue">
            {isRegistering ? 'Create Account' : 'Login'}
          </h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/')}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
        
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleAuth} className="space-y-4">
          {isRegistering && (
            <div>
              <label htmlFor="name" className="block mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input 
                  type="text" 
                  id="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  required={isRegistering}
                />
              </div>
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input 
                type="email" 
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input 
                type="password" 
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          {isRegistering && (
            <div>
              <label htmlFor="confirmPassword" className="block mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input 
                  type="password" 
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                  required={isRegistering}
                />
              </div>
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full bg-irctc-blue hover:bg-irctc-blue-dark"
            disabled={loading}
          >
            {loading ? 'Processing...' : isRegistering ? 'Register' : 'Login'}
          </Button>
          
          <div className="mt-4 text-center">
            <Button 
              type="button" 
              variant="link" 
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError(null);
              }}
              className="text-irctc-blue"
            >
              {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
