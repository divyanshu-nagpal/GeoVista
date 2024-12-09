import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Ticket, MapPin, ArrowUpRight } from "lucide-react";

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  const searchQuery = place?.attraction
    ? `${place?.attraction}, ${place?.address}`
    : place?.meal
    ? `${place?.restaurant}, ${place?.address}`
    : place?.activity
    ? `${place?.activity}, ${place?.location || place?.address}`
    : place?.restaurant
    ? `${place?.restaurant}, ${place?.address}`
    : place?.address || "";


  const GetPlacePhoto = async () => {
    try {
      const data = { textQuery: searchQuery }
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
    if (place) {
      GetPlacePhoto();
    }
  }, [place]);

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl border border-orange-50 hover:border-orange-100">
        {/* Image Overlay Container */}
        <div className="relative">
          {/* Image */}
          <div className="h-64 w-full overflow-hidden relative">
            <img
              src={photoUrl || '/placeholder.jpg'} 
              alt={place?.attraction || place?.restaurant || place?.activity}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(e) => { e.target.src = '/placeholder.jpg'; }}
            />
            
            {/* Explore Button */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex justify-between items-center">
                <span className="text-white text-sm">Explore Location</span>
                <ArrowUpRight className="text-white" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-bold text-gray-800 line-clamp-1 flex-grow pr-2">
              {place?.attraction || place?.restaurant || place?.activity}
            </h2>
            
            {place.ticketPrice && (
              <div className="flex items-center bg-orange-50 text-orange-600 px-2 py-1 rounded-full text-xs font-semibold">
                <Ticket className="mr-1 text-orange-500" size={14} />
                {place.ticketPrice}
              </div>
            )}
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 h-10">
          <div>
          {(place?.description || place?.meal)?.split(';').map((item, index) => (
            <span key={index}>
              {item.trim()}
              {index !== (place?.description || place?.meal).split(';').length - 1 && '. '}
            </span>
          ))}
         </div> 
          </p>

          
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;