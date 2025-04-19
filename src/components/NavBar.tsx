
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Train, User, Search } from 'lucide-react';

const NavBar = () => {
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
            <Button variant="outline" className="hidden md:flex items-center gap-2">
              <User size={18} />
              <span>Login</span>
            </Button>
            <Button className="bg-irctc-blue hover:bg-irctc-blue-dark">Sign Up</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
