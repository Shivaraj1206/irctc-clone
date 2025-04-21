import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { supabase, getCurrentUser } from '@/utils/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Train, Calendar, Clock, MapPin, User } from 'lucide-react';
import { toast } from 'sonner';

const PNRStatus = () => {
  const [pnrNumber, setPnrNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [pnrData, setPnrData] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pnrNumber || pnrNumber.length !== 10) {
      toast.error('Please enter a valid 10-digit PNR number');
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call with a timeout
      setTimeout(() => {
        // Mock data for demo purposes
        const mockData = {
          pnrNumber,
          trainNumber: '12345',
          trainName: 'Rajdhani Express',
          dateOfJourney: '2023-06-15',
          from: 'New Delhi',
          to: 'Mumbai Central',
          boardingPoint: 'New Delhi',
          reservationUpTo: 'Mumbai Central',
          class: '3A',
          passengers: [
            { 
              number: 1, 
              status: 'Confirmed', 
              coach: 'B2', 
              berth: '23', 
              berthType: 'Side Lower' 
            },
            { 
              number: 2, 
              status: 'Confirmed', 
              coach: 'B2', 
              berth: '24', 
              berthType: 'Side Upper' 
            }
          ],
          chartStatus: 'Chart Prepared'
        };
        
        setPnrData(mockData);
        setLoading(false);
        toast.success('PNR details fetched successfully');
      }, 1500);
    } catch (error) {
      console.error('Error fetching PNR details:', error);
      toast.error('Failed to fetch PNR details');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">PNR Status Enquiry</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="pnr" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter PNR Number
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="pnr"
                    type="text"
                    placeholder="10-digit PNR Number"
                    value={pnrNumber}
                    onChange={(e) => setPnrNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="pl-10"
                    maxLength={10}
                    pattern="[0-9]{10}"
                  />
                </div>
              </div>
              <div className="self-end">
                <Button 
                  type="submit" 
                  className="bg-irctc-blue hover:bg-irctc-blue-dark w-full md:w-auto"
                  disabled={loading}
                >
                  {loading ? 'Checking...' : 'Get Status'}
                </Button>
              </div>
            </form>
          </div>
          
          {pnrData && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="border-b pb-4 mb-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">PNR: {pnrData.pnrNumber}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Train className="text-irctc-blue mt-1" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Train Number/Name</p>
                      <p className="font-medium">{pnrData.trainNumber} - {pnrData.trainName}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="text-irctc-blue mt-1" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Date of Journey</p>
                      <p className="font-medium">{pnrData.dateOfJourney}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="text-irctc-blue mt-1" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">From - To</p>
                      <p className="font-medium">{pnrData.from} - {pnrData.to}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="text-irctc-blue mt-1" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Class</p>
                      <p className="font-medium">{pnrData.class}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-medium mb-3">Passenger Details</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        No.
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Booking Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Current Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Coach
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Berth
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pnrData.passengers.map((passenger: any) => (
                      <tr key={passenger.number}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                          {passenger.number}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {passenger.status}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {passenger.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {passenger.coach}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {passenger.berth} ({passenger.berthType})
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Chart Status:</span> {pnrData.chartStatus}
                </p>
              </div>
            </div>
          )}
          
          {!pnrData && !loading && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <User className="mx-auto text-blue-500 mb-2" size={32} />
              <h3 className="text-lg font-medium text-gray-800 mb-1">No PNR Details</h3>
              <p className="text-gray-600">
                Enter your 10-digit PNR number and click "Get Status" to check your reservation status.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PNRStatus;
