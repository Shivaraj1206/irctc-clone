import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with hardcoded public keys for the demo
// In a production app, these would come from environment variables
const supabase = createClient(
  "https://your-project-url.supabase.co",
  "your-public-anon-key"
);

const PNRStatus = () => {
  const [pnrNumber, setPnrNumber] = useState('');
  const [pnrStatus, setPnrStatus] = useState<any>(null);

  const checkPNRStatus = async () => {
    // In a real-world scenario, this would call a backend function or API
    // For this example, we'll simulate a PNR status check
    try {
      // Simulated PNR status check - replace with actual Supabase function call
      const mockData = {
        train_number: "12345",
        status: "Confirmed",
        current_station: "New Delhi"
      };
      setPnrStatus(mockData);
      toast.success('PNR status retrieved (demo mode)');
    } catch (error) {
      toast.error('Could not retrieve PNR status');
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-irctc-blue">PNR Status</h1>
      <div className="max-w-md mx-auto space-y-4">
        <Input 
          type="text" 
          placeholder="Enter PNR Number" 
          value={pnrNumber}
          onChange={(e) => setPnrNumber(e.target.value)}
        />
        <Button 
          onClick={checkPNRStatus} 
          className="w-full bg-irctc-blue hover:bg-irctc-blue-dark"
        >
          Check Status
        </Button>

        {pnrStatus && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">PNR Details</h2>
            <div className="space-y-2">
              <p><strong>Train Number:</strong> {pnrStatus.train_number}</p>
              <p><strong>Passenger Status:</strong> {pnrStatus.status}</p>
              <p><strong>Current Station:</strong> {pnrStatus.current_station}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PNRStatus;
