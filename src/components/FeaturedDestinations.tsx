
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

const destinations = [
  {
    id: 1,
    name: 'Delhi',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'The capital city with iconic landmarks',
  },
  {
    id: 2,
    name: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1562979314-bee7453e911c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'The city of dreams and business hub',
  },
  {
    id: 3,
    name: 'Kolkata',
    image: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'The cultural capital of India',
  },
  {
    id: 4,
    name: 'Chennai',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'The gateway to South India',
  },
];

const FeaturedDestinations = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-2">Popular Destinations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Explore these top destinations with our train services and enjoy comfortable journeys to your favorite places</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <MapPin className="h-4 w-4 text-irctc-orange mr-1" />
                  <h3 className="font-semibold text-lg">{destination.name}</h3>
                </div>
                <p className="text-gray-600 text-sm">{destination.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
