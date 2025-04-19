
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!, 
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

const PNRStatus = () => {
  const [pnrNumber, setPnrNumber] = useState('');
  const [pnrStatus, setPnrStatus] = useState<any>(null);

  const checkPNRStatus = async () => {
    // In a real-world scenario, this would call a backend function or API
    // For this example, we'll simulate a PNR status check
    try {
      // Simulated PNR status check - replace with actual Supabase function call
      const { data, error } = await supabase
        .from('pnr_statuses')
        .select('*')
        .eq('pnr_number', pnrNumber)
        .single();

      if (error) throw error;

      setPnrStatus(data);
      toast.success('PNR status retrieved successfully');
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
