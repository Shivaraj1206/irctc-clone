
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { User, Lock, UserPlus } from 'lucide-react';

// Initialize Supabase client with hardcoded public keys for the demo
// In a production app, these would come from environment variables
const supabase = createClient(
  "https://your-project-url.supabase.co",
  "your-public-anon-key"
);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    try {
      if (isRegistering) {
        // Register new user
        const { data, error } = await supabase.auth.signUp({
          email,
          password
        });

        if (error) {
          toast.error('Registration failed', { description: error.message });
        } else {
          toast.success('Registration successful! Verification email sent.');
          setIsRegistering(false);
        }
      } else {
        // Login existing user
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          toast.error('Login failed', { description: error.message });
        } else {
          toast.success('Login successful');
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast.error('Authentication error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-irctc-gray">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-irctc-blue">
          {isRegistering ? 'Register' : 'Login'}
        </h2>
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2">Email</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
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
          <Button type="submit" className="w-full bg-irctc-blue hover:bg-irctc-blue-dark">
            {isRegistering ? 'Register' : 'Login'}
          </Button>
          
          <div className="mt-4 text-center">
            <Button 
              type="button" 
              variant="link" 
              onClick={() => setIsRegistering(!isRegistering)}
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
