
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Train } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center px-4">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-irctc-blue/10 p-6">
            <Train className="h-12 w-12 text-irctc-blue" />
          </div>
        </div>
        <h1 className="text-6xl font-bold text-irctc-blue mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Oops! This train has left the station</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved to another route.
        </p>
        <Button asChild size="lg" className="bg-irctc-blue hover:bg-irctc-blue-dark">
          <Link to="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
