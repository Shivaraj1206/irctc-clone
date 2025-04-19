
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  CreditCard, 
  Calendar, 
  Search, 
  Shield 
} from 'lucide-react';

const features = [
  {
    id: 1,
    title: 'Easy Booking',
    description: 'Book your train tickets in just a few clicks with our simple and intuitive interface',
    icon: Calendar,
  },
  {
    id: 2,
    title: 'Train Search',
    description: 'Find the perfect train for your journey with our powerful search and filtering options',
    icon: Search,
  },
  {
    id: 3,
    title: 'Secure Payments',
    description: 'All transactions are safe and secure with multiple payment options available',
    icon: CreditCard,
  },
  {
    id: 4,
    title: 'Safe Travel',
    description: 'Travel with peace of mind with our safety measures and guidelines in place',
    icon: Shield,
  },
];

const ServiceFeatures = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-2">Why Choose Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">We provide convenient and efficient train booking services with a range of features to enhance your travel experience</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.id} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-irctc-blue/10 mb-4">
                  <feature.icon className="h-6 w-6 text-irctc-blue" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;
