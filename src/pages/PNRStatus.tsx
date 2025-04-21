
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { createClient } from '@supabase/supabase-js';
import { Search, Train } from 'lucide-react';

// Initialize Supabase client with fixed URL and key for the demo
const supabase = createClient(
  "https://pefdnxvknbfrjexmrjgo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlZmRueHZrbmJmcmpleG1yamdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk1NjgwNjksImV4cCI6MjAyNTE0NDA2OX0.f06CzSHdlgTd2vwZ4MvUkZrZJJK2DyqPWN1_02xsCyE"
);

const PNRStatus = () => {
  const [pnrNumber, setPnrNumber] = useState('');
  const [pnrStatus, setPnrStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkPNRStatus = async () => {
    if (!pnrNumber || pnrNumber.length < 6) {
      toast.error('Please enter a valid PNR number');
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real-world scenario, this would call a Supabase function
      // For this demo, we'll simulate a PNR status check with mock data
      const mockData = {
        pnr: pnrNumber,
        train_number: "12345",
        train_name: "Rajdhani Express",
        date_of_journey: "23-Apr-2023",
        status: "Confirmed",
        current_station: "New Delhi",
        passenger_details: [
          { seat_number: "A1-23", status: "Confirmed" },
          { seat_number: "A1-24", status: "Confirmed" }
        ]
      };
      
      // Simulate network delay
      setTimeout(() => {
        setPnrStatus(mockData);
        toast.success('PNR status retrieved successfully');
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      toast.error('Could not retrieve PNR status');
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-irctc-blue flex items-center">
        <Train className="mr-2" size={32} />
        PNR Status
      </h1>
      
      <div className="max-w-md mx-auto space-y-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input 
                type="text" 
                placeholder="Enter 10-digit PNR Number" 
                value={pnrNumber}
                onChange={(e) => setPnrNumber(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button 
              onClick={checkPNRStatus} 
              className="w-full bg-irctc-blue hover:bg-irctc-blue-dark"
              disabled={loading}
            >
              {loading ? 'Checking...' : 'Check Status'}
            </Button>
          </div>
        </div>

        {pnrStatus && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-irctc-blue">PNR Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-gray-500">PNR Number</p>
                  <p className="font-medium">{pnrStatus.pnr}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Train Number</p>
                  <p className="font-medium">{pnrStatus.train_number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Train Name</p>
                  <p className="font-medium">{pnrStatus.train_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date of Journey</p>
                  <p className="font-medium">{pnrStatus.date_of_journey}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <p className="text-sm text-gray-500 mb-2">Passenger Status</p>
                <div className="space-y-2">
                  {pnrStatus.passenger_details.map((passenger: any, index: number) => (
                    <div key={index} className="flex justify-between bg-gray-50 p-2 rounded">
                      <span>Passenger {index + 1}</span>
                      <span className="font-medium">{passenger.seat_number}</span>
                      <span className="text-green-600 font-medium">{passenger.status}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <p className="text-sm text-gray-500">Current Station</p>
                <p className="font-medium">{pnrStatus.current_station}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PNRStatus;
