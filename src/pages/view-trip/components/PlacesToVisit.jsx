import React from 'react'
import PlaceCardItem from './PlaceCardItem'
import { Clock, Camera, Utensils, Activity } from 'lucide-react';

function formatTime(timeString) {
    if (/^\d{1,2}$/.test(timeString)) {
      const hour = parseInt(timeString);
      const period = hour >= 12 ? 'PM' : 'AM';
      const formattedHour = hour % 12 || 12;
      return `${formattedHour} ${period}`;
    }
    return timeString;
  }
  
  
  function getPlaceDetails(place) {
    if (place.attraction) {
      return (
        <div className="text-sm text-gray-600 space-y-1">
          <div className="flex items-center">
            <Camera className="mr-2 text-blue-500" size={16} />
            <span>Tourist Attraction</span>
          </div>
          {place.duration && (
            <div className="flex items-center">
              <Clock className="mr-2 text-orange-500" size={16} />
              <span>{place.duration} hours</span>
            </div>
          )}
        </div>
      );
    }
  
    if (place.restaurant) {
      return (
        <div className="text-sm text-gray-600 space-y-1">
          <div className="flex items-center">
            <Utensils className="mr-2 text-green-500" size={16} />
            <span>Dining Experience</span>
          </div>
          {place.cuisine && (
            <div className="flex items-center">
              <span className="bg-green-50 text-green-600 px-2 py-1 rounded-full text-xs">
                {place.cuisine} Cuisine
              </span>
            </div>
          )}
        </div>
      );
    }
  
    if (place.activity) {
      return (
        <div className="text-sm text-gray-600 space-y-1">
          <div className="flex items-center">
            <Activity className="mr-2 text-purple-500" size={16} />
            <span>Fun Activity</span>
          </div>
          {place.activityType && (
            <div className="flex items-center">
              <span className="bg-purple-50 text-purple-600 px-2 py-1 rounded-full text-xs">
                {place.activityType}
              </span>
            </div>
          )}
        </div>
      );
    }
  
    return null;
  }
  
  function PlacesToVisit({ trip }) {
    if (!trip?.tripData?.dailyPlans?.length) {
      return (
        <div className="mt-5">
          <h2 className="text-xl font-bold text-orange-900 mb-4">Places to Visit</h2>
          <p className="text-gray-600">No daily plans available for this trip.</p>
        </div>
      );
    }
  
    return (
      <div className="w-full">
        <h2 className="font-bold text-xl text-black mt-5 mb-4">Places to Visit</h2>
        
        <div className="space-y-6">
          {trip.tripData.dailyPlans.map((dayItem, dayIndex) => (
            <div 
              key={dayIndex} 
              className="bg-white border-2 border-orange-100/50 rounded-3xl p-5 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="font-bold text-lg text-orange-600 mb-4 pb-2 border-b-2 border-orange-100 flex items-center">
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full mr-3 text-sm">
                  Day {dayIndex + 1}
                </span>
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                {dayItem?.plan?.map((place, placeIndex) => (
                  <div key={placeIndex} className="flex flex-col">
                    <div className="flex items-center mb-2">
                      {place.time && (
                        <div className="flex items-center mr-3 bg-orange-50 text-orange-600 px-2 py-1 rounded-full text-xs font-semibold">
                          <Clock className="mr-1" size={14} />
                          {formatTime(place.time)}
                        </div>
                      )}
                      <div className="flex-grow border-t-2 border-orange-100/50"></div>
                    </div>
                    <PlaceCardItem
                      place={place} 
                      day={dayIndex + 1} 
                      additionalDetails={getPlaceDetails(place)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default PlacesToVisit;