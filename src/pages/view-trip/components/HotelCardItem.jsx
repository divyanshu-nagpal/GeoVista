// import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'

// function HotelCardItem({ hotel, index }) {

//     const [photoUrl,setPhotoUrl]=useState();

//     useEffect(()=>{
//       hotel&&GetPlacePhoto();
//     },[hotel])
  
//     const GetPlacePhoto=async()=>{
//       const data={
//         textQuery:hotel?.name
//       }
//       const result= await GetPlaceDetails(data).then(resp=>{
//         console.log(resp.data.places[0].photos[3].name)
//         const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[1].name);
//        setPhotoUrl(PhotoUrl);
//       })
//     }

//   return (
//     <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.name+","+hotel?.address} target='_blank'>
//         <div key={index} className='hover:scale-105 transition:all cursor-pointer'>
//         <img src={photoUrl?photoUrl:'/placeholder.jpg'} className="rounded-lg h-[180px] w-full object-cover" alt={hotel.name || 'Hotel'} />
//         <div className='my-2 flex flex-col'>
//             <h2 className='font-medium'>{hotel?.name}</h2>
//             <h2 className='text-xs text-gray-500'>📍 {hotel?.address}</h2>
//             <h2 className='text-sm'>🏷️ ₹{hotel?.priceInr}</h2>
//             <h2 className='text-sm'>⭐ {hotel?.rating}</h2>
//         </div>
//         </div>
//     </Link>
//   )
// }

// export default HotelCardItem

import React, { useEffect, useState } from 'react'
import { MapPin } from 'lucide-react'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

function HotelCardItem({ hotel, index }) {
 const [photoUrl, setPhotoUrl] = useState(null);
 
 useEffect(() => {
   hotel && GetPlacePhoto();
 }, [hotel]);
 
 const GetPlacePhoto = async () => {
   try {
     const data = { textQuery: hotel?.name }
     const resp = await GetPlaceDetails(data);
     
     if (resp.data.places && resp.data.places[0].photos) {
       const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[1].name);
       setPhotoUrl(PhotoUrl);
     }
   } catch (error) {
     console.error("Error fetching hotel photo:", error);
   }
 }
 
 return (
   <div className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md group">
     <div className="relative aspect-video overflow-hidden">
       <img 
         src={photoUrl || '/placeholder.jpg'} 
         alt={hotel?.name} 
         className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
       />
     </div>
     <div className="p-4 space-y-3">
       <div className="flex justify-between items-start">
         <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
           {hotel?.name}
         </h3>
         <span className="text-sm text-gray-500 font-medium">
           ₹{hotel?.priceInr}
         </span>
       </div>
       <div>
         <p className="text-sm text-gray-600 line-clamp-1 mb-1">
           {hotel?.address}
         </p>
         <div className="flex justify-between items-center">
           <div className="flex items-center space-x-1">
             <span className="text-yellow-500">★</span>
             <span className="text-sm text-gray-700">
               {hotel?.rating}
             </span>
           </div>
           <a 
             href={'https://www.google.com/maps/search/?api=1&query='+hotel?.name+","+hotel?.address} 
             target='_blank'
             rel="noopener noreferrer"
             className="group flex items-center text-sm text-gray-500 group-hover:text-orange-600 transition-colors"
           >
             <MapPin className="w-4 h-4 mr-1.5 text-gray-400 group-hover:text-orange-500 transition-colors" />
             View on Map
           </a>
         </div>
       </div>
     </div>
   </div>
 )
}

export default HotelCardItem