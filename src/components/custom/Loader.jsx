import React, { useState, useEffect } from 'react';
import { 
  Plane, 
  MapPin, 
  Compass, 
  Luggage, 
  Calendar,
  Sun,
  Cloud,
  Mountain,
  Hotel
} from 'lucide-react';

const TripStoryLoader = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  const tripStages = [
    {
      icon: Calendar,
      color: 'text-green-500',
      message: 'Planning Itinerary',
      background: 'bg-green-50'
    },
    {
      icon: Luggage,
      color: 'text-purple-500',
      message: 'Packing Essentials',
      background: 'bg-purple-50'
    },
    {
      icon: Hotel,
      color: 'text-blue-500',
      message: 'Searching Accommodations',
      background: 'bg-blue-50'
    },
    {
      icon: MapPin,
      color: 'text-orange-500',
      message: 'Selecting Destinations',
      background: 'bg-orange-50'
    },
    {
      icon: Compass,
      color: 'text-red-500',
      message: 'Mapping Routes',
      background: 'bg-red-50'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) => (prev + 1) % tripStages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`
      flex items-center justify-center h-screen 
      transition-all duration-700 ease-in-out
      ${tripStages[stage].background}
      relative overflow-hidden
    `}>
      {/* Subtle background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 opacity-10 animate-float">
          <Mountain className="text-gray-300 w-32 h-32" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-10 animate-float-slow">
          <Sun className="text-yellow-300 w-32 h-32" />
        </div>
        <div className="absolute top-10 right-10 opacity-10 animate-float-reverse">
          <Cloud className="text-gray-400 w-32 h-32" />
        </div>
      </div>

      <div className="text-center space-y-6 z-10">
        <div className="flex justify-center items-center space-x-6">
          {tripStages.map((stageData, index) => {
            const Icon = stageData.icon;
            
            return (
              <div 
                key={index} 
                className={`
                  transition-all duration-700 ease-in-out transform
                  ${index === stage 
                    ? `${stageData.color} animate-bounce scale-125` 
                    : 'opacity-30 scale-75 text-gray-400'}
                `}
              >
                <Icon 
                  size={index === stage ? 56 : 48} 
                  strokeWidth={index === stage ? 2 : 1.5}
                  className="transition-all duration-700"
                />
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-3 animate-subtle-pulse">
            Planning Your Adventure
          </h2>
          <p className={`
            text-xl font-medium transition-all duration-700 
            ${tripStages[stage].color}
          `}>
            {tripStages[stage].message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TripStoryLoader;