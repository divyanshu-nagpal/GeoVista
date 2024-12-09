import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { 
  IoShareOutline 
} from "react-icons/io5";
import { 
  MapPin, 
  Clock, 
  Wallet, 
  Users
} from 'lucide-react';
import InfoShareTripModal from './InfoShareTripModal';

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  // const GetPlacePhoto = async () => {
  //   const data = {
  //     textQuery: trip?.userSelection?.location?.label,
  //   };

  //   const result = await GetPlaceDetails(data);

  //   const photoName = result.places[0].photos[0]?.name;
  //   if (photoName) {
  //     const url = PHOTO_REF_URL.replace("{NAME}", photoName);
  //     setPhotoUrl(url);
  //   }
  // };
  const GetPlacePhoto = async () => {
    try {
      const data = {  textQuery: trip?.userSelection?.location?.label }
      const resp = await GetPlaceDetails(data);
      
      if (resp.data.places && resp.data.places[0].photos) {
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[1].name);
        setPhotoUrl(PhotoUrl);
      }
    } catch (error) {
      console.error("Error fetching hotel photo:", error);
    }
  }

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl overflow-hidden shadow-2xl">
        <div className="grid md:grid-cols-2">
          {/* Left Column - Image */}
          <div className="relative h-[500px]">
            <img
             src={photoUrl || '/placeholder.jpg'} 
              alt="Destination"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-white/90 rounded-full px-4 py-2 flex items-center gap-2 shadow-md">
              <MapPin className="w-5 h-5 text-orange-600" />
              <span className="font-semibold text-gray-900">
                {trip?.userSelection?.location?.label}
              </span>
            </div>
          </div>

          {/* Right Column - Trip Details */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Trip Overview
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { 
                    icon: Clock, 
                    label: "Trip Duration", 
                    value: `${trip?.userSelection?.noOfDays} Days`,
                    color: "text-orange-600"
                  },
                  { 
                    icon: Wallet, 
                    label: "Budget", 
                    value: trip?.userSelection?.budget,
                    color: "text-orange-600"
                  },
                  { 
                    icon: Users, 
                    label: "Travelers", 
                    value: trip?.userSelection?.traveler,
                    color: "text-orange-600"
                  }
                ].map((detail, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-xl p-5 shadow-md flex items-center space-x-4 hover:shadow-lg transition-all duration-300"
                  >
                    <div className={`p-3 rounded-full bg-orange-50 ${detail.color}`}>
                      <detail.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-500 mb-1">{detail.label}</h3>
                      <p className="font-semibold text-gray-900 text-lg">{detail.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Share Button */}
            <Button 
              onClick={handleShare}
              className="mt-6 w-full bg-orange-600 hover:bg-orange-700 text-white transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <IoShareOutline className="w-5 h-5" />
              Share Trip
            </Button>

            <InfoShareTripModal 
              trip={trip}
              isOpen={isShareModalOpen} 
              onClose={() => setIsShareModalOpen(false)} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;