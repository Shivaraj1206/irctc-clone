
import React from 'react';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useSearchParams } from 'react-router-dom';
import TrainCard, { TrainProps } from '@/components/TrainCard';
import Footer from '@/components/Footer';
import { Filter, Calendar, MapPin } from 'lucide-react';

// Mock data for train listings
const mockTrains: TrainProps[] = [
  {
    id: '1',
    name: 'Rajdhani Express',
    number: '12301',
    departureTime: '16:50',
    arrivalTime: '10:20',
    duration: '17h 30m',
    departureDate: 'Today',
    from: 'New Delhi',
    to: 'Howrah',
    price: 1800,
    availability: 'Available 32',
  },
  {
    id: '2',
    name: 'Shatabdi Express',
    number: '12005',
    departureTime: '06:15',
    arrivalTime: '12:40',
    duration: '6h 25m',
    departureDate: 'Today',
    from: 'New Delhi',
    to: 'Kalka',
    price: 1250,
    availability: 'Available 64',
  },
  {
    id: '3',
    name: 'Duronto Express',
    number: '12213',
    departureTime: '22:00',
    arrivalTime: '14:30',
    duration: '16h 30m',
    departureDate: 'Tomorrow',
    from: 'New Delhi',
    to: 'Mumbai Central',
    price: 2100,
    availability: 'Waiting List',
  },
  {
    id: '4',
    name: 'Vande Bharat Express',
    number: '22435',
    departureTime: '08:00',
    arrivalTime: '14:30',
    duration: '6h 30m',
    departureDate: 'Today',
    from: 'New Delhi',
    to: 'Varanasi',
    price: 1900,
    availability: 'Available 18',
  },
];

const TrainListings = () => {
  const [searchParams] = useSearchParams();
  
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const date = searchParams.get('date') || '';
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-gray-50">
        <div className="bg-irctc-blue py-8">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="input-group">
                  <MapPin className="input-group-icon h-4 w-4" />
                  <Input
                    className="input-with-icon"
                    placeholder="From Station"
                    value={from}
                    readOnly
                  />
                </div>
                
                <div className="input-group">
                  <MapPin className="input-group-icon h-4 w-4" />
                  <Input
                    className="input-with-icon"
                    placeholder="To Station"
                    value={to}
                    readOnly
                  />
                </div>
                
                <div className="input-group">
                  <Calendar className="input-group-icon h-4 w-4" />
                  <Input
                    className="input-with-icon"
                    placeholder="Journey Date"
                    value={date}
                    readOnly
                  />
                </div>
                
                <Button className="bg-irctc-blue hover:bg-irctc-blue-dark">
                  Modify Search
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/4 lg:w-1/5">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Filters</h3>
                  <Filter className="h-4 w-4 text-gray-500" />
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Train Types</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="rajdhani" className="mr-2" />
                        <label htmlFor="rajdhani" className="text-sm">Rajdhani</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="shatabdi" className="mr-2" />
                        <label htmlFor="shatabdi" className="text-sm">Shatabdi</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="duronto" className="mr-2" />
                        <label htmlFor="duronto" className="text-sm">Duronto</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="vande-bharat" className="mr-2" />
                        <label htmlFor="vande-bharat" className="text-sm">Vande Bharat</label>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium mb-2">Departure Time</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="early-morning" className="mr-2" />
                        <label htmlFor="early-morning" className="text-sm">Early Morning (00:00 - 06:00)</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="morning" className="mr-2" />
                        <label htmlFor="morning" className="text-sm">Morning (06:00 - 12:00)</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="afternoon" className="mr-2" />
                        <label htmlFor="afternoon" className="text-sm">Afternoon (12:00 - 18:00)</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="evening" className="mr-2" />
                        <label htmlFor="evening" className="text-sm">Evening (18:00 - 00:00)</label>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium mb-2">Class</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="sleeper" className="mr-2" />
                        <label htmlFor="sleeper" className="text-sm">Sleeper (SL)</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="ac-3" className="mr-2" />
                        <label htmlFor="ac-3" className="text-sm">AC 3 Tier (3A)</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="ac-2" className="mr-2" />
                        <label htmlFor="ac-2" className="text-sm">AC 2 Tier (2A)</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="ac-1" className="mr-2" />
                        <label htmlFor="ac-1" className="text-sm">AC First Class (1A)</label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button variant="outline" className="w-full">Apply Filters</Button>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-3/4 lg:w-4/5">
              <div className="bg-white rounded-lg shadow p-4 mb-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    {from} to {to}
                  </h2>
                  <div className="text-sm text-gray-500">
                    {mockTrains.length} trains found
                  </div>
                </div>
              </div>
              
              {mockTrains.map((train) => (
                <TrainCard key={train.id} train={train} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrainListings;
