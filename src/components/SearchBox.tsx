
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MapPin, Calendar as CalendarIcon, Search } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export const SearchBox = () => {
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (fromStation && toStation && date) {
      navigate(`/trains?from=${fromStation}&to=${toStation}&date=${format(date, 'yyyy-MM-dd')}`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <label htmlFor="from-station" className="block text-sm font-medium text-gray-700 mb-1">From</label>
            <div className="input-group">
              <MapPin className="input-group-icon h-4 w-4" />
              <Input 
                id="from-station"
                className="input-with-icon"
                placeholder="From Station"
                value={fromStation}
                onChange={(e) => setFromStation(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="md:col-span-1">
            <label htmlFor="to-station" className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <div className="input-group">
              <MapPin className="input-group-icon h-4 w-4" />
              <Input 
                id="to-station"
                className="input-with-icon"
                placeholder="To Station"
                value={toStation}
                onChange={(e) => setToStation(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="md:col-span-1">
            <label htmlFor="journey-date" className="block text-sm font-medium text-gray-700 mb-1">Journey Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  id="journey-date"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="md:col-span-1 flex items-end">
            <Button type="submit" className="w-full bg-irctc-blue hover:bg-irctc-blue-dark">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
