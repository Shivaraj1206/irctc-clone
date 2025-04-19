
import React from 'react';
import { SearchBox } from '@/components/SearchBox';

const HeroSection = () => {
  return (
    <div className="hero-pattern bg-irctc-blue text-white py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in">Book Your Train Tickets</h1>
          <p className="text-lg md:text-xl opacity-90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Fast, secure, and hassle-free online train ticket bookings
          </p>
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <SearchBox />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
