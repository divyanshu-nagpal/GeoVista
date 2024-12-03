// import React from 'react'

// function Hotels({trip}) {
//   return (
//     <div>
//         <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>
//         <div className='grid grid-cols-3 sm:grid-cols-2'>
//             {trip?.tripData?.hotels?.map((hotel, index) => (
//             <div key={index}>
//                 <img src="/placeholder.jpg" className="rounded-lg" alt={item.name || 'Hotel'} />
//                 <div>
//                     <h2>{hotel.name}</h2>
//                 </div>
//             </div>
//             ))}
//         </div>
//     </div>
//   )
// }

// export default Hotels

import React from 'react';

import HotelCardItem from './HotelCardItem';

function Hotels({ trip }) {
  return (
    <div>
      <h2 className="text-xl font-bold mt-5">Hotel recommendation</h2>

      <div className="grid grid-cols-2 mt-4 md:grid-cols-4 gap-5 w-full">
        {trip?.tripData?.hotel?.map((hotel, index) => (
            <HotelCardItem key={index} hotel={hotel} index={index}/>
        ))}
      </div>
    </div>
  );
}

export default Hotels;