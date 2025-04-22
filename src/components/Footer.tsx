
import React from 'react';
import { Link } from 'react-router-dom';
import { Train, Phone, Mail, MapPin, Code, User } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-irctc-blue-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Train className="h-6 w-6" />
              <span className="text-2xl font-bold">IRCTC</span>
            </div>
            <p className="text-gray-300 mb-6">
              Book your train tickets with ease and enjoy a seamless travel experience with our services.
            </p>
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-irctc-orange" />
                <span>+91 1234567890</span>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-irctc-orange" />
                <span>support@irctcclone.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-irctc-orange" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-irctc-orange transition-colors">Home</Link></li>
              <li><Link to="/trains" className="hover:text-irctc-orange transition-colors">Trains</Link></li>
              <li><Link to="/booking" className="hover:text-irctc-orange transition-colors">Book Tickets</Link></li>
              <li><Link to="/pnr" className="hover:text-irctc-orange transition-colors">PNR Status</Link></li>
              <li><Link to="/contact" className="hover:text-irctc-orange transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Information</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-irctc-orange transition-colors">About Us</Link></li>
              <li><Link to="/refund" className="hover:text-irctc-orange transition-colors">Refund Policy</Link></li>
              <li><Link to="/privacy" className="hover:text-irctc-orange transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-irctc-orange transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/faq" className="hover:text-irctc-orange transition-colors">FAQs</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">About Developer</h3>
            <div className="bg-irctc-blue bg-opacity-30 p-4 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <User className="h-6 w-6 text-irctc-orange" />
                <span className="font-semibold">Shivaraj Chinthakindi</span>
              </div>
              <p className="text-sm text-gray-300 mb-2">
                Student at [Your University Name]
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Code className="h-4 w-4 text-irctc-orange" />
                <span>Full Stack Developer</span>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-gray-300 mb-2">
                Subscribe to our newsletter:
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 w-full text-gray-800 border-none focus:outline-none rounded-l-md"
                />
                <button className="bg-irctc-orange hover:bg-irctc-orange/90 px-4 py-2 rounded-r-md transition-colors">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-10 pt-6 text-center">
          <p className="text-gray-300">© {new Date().getFullYear()} IRCTC Clone by Shivaraj Chinthakindi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
