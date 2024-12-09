import React from 'react';
import HotelCardItem from './HotelCardItem';

function Hotels({ trip }) {
  // Slice the array to first 3 items
  const displayedHotels = trip?.tripData?.hotel?.slice(0, 3) || [];

  return (
    <div>
      <h2 className="text-xl font-bold mt-5">Hotel recommendation</h2>

      <div className="grid grid-cols-2 mt-4 md:grid-cols-3 gap-5 w-full">
        {displayedHotels.map((hotel, index) => (
            <HotelCardItem key={index} hotel={hotel} index={index}/>
        ))}
      </div>
    </div>
  );
}

export default Hotels;