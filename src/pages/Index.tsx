
import React from 'react';
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import ServiceFeatures from '@/components/ServiceFeatures';
import FeaturedDestinations from '@/components/FeaturedDestinations';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <HeroSection />
        <ServiceFeatures />
        <FeaturedDestinations />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
