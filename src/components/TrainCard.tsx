
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Train, Clock, Calendar } from 'lucide-react';

export interface TrainProps {
  id: string;
  name: string;
  number: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  departureDate: string;
  from: string;
  to: string;
  price: number;
  availability: string;
}

const TrainCard = ({ train }: { train: TrainProps }) => {
  return (
    <Card className="mb-4 overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Train className="h-5 w-5 text-irctc-blue" />
              <h3 className="font-semibold text-lg">{train.name}</h3>
              <Badge variant="outline" className="ml-2">{train.number}</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 text-sm">
              <div>
                <p className="text-gray-500">Departure</p>
                <p className="font-semibold text-base">{train.departureTime}</p>
                <p className="text-xs text-gray-500">{train.from}</p>
              </div>
              
              <div className="hidden md:block">
                <p className="text-gray-500 text-center">Duration</p>
                <div className="flex items-center justify-center mt-1">
                  <Clock className="h-4 w-4 mr-1 text-gray-400" />
                  <p className="font-medium">{train.duration}</p>
                </div>
              </div>
              
              <div>
                <p className="text-gray-500 md:text-right">Arrival</p>
                <p className="font-semibold text-base md:text-right">{train.arrivalTime}</p>
                <p className="text-xs text-gray-500 md:text-right">{train.to}</p>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-3 md:pt-0 md:border-t-0 md:border-l md:pl-6 flex flex-col items-start md:items-end space-y-2">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">{train.departureDate}</span>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-sm">Fare starts at</p>
              <p className="text-2xl font-bold text-irctc-blue">₹{train.price}</p>
            </div>
            <p className="text-sm font-medium text-green-600">{train.availability}</p>
            <Button className="bg-irctc-orange hover:bg-irctc-orange/90 text-white">Book Now</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainCard;
