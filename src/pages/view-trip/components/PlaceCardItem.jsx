import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function PlaceCardItem({place}) {

  //Need to correct proper url for everything
  const searchQuery = place?.attraction
  ? `${place.attraction}, ${place.address}` // For attractions
  : place?.meal
  ? `${place.restaurant}, ${place.address}` // For meals
  : place?.activity
  ? `${place.activity}, ${place.location || place.address}` // For activities
  : place?.restaurant
  ? `${place.restaurant}, ${place.address}` // For restaurants
  : place?.address || ''; // Fallback to address if nothing else is specified



  
  const [photoUrl,setPhotoUrl]=useState();

  useEffect(()=>{
    place&&GetPlacePhoto();
  },[place])

  const GetPlacePhoto=async()=>{
    const data={
      textQuery:searchQuery,
    }
    const result= await GetPlaceDetails(data).then(resp=>{
      console.log(resp.data.places[0].photos[3].name)
      const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[6].name);
     setPhotoUrl(PhotoUrl);
    })
  }

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`}
      target="_blank"
      rel="noopener noreferrer"
    >
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        <img src={photoUrl?photoUrl:'/placeholder.jpg'}
        className='w-[130px] h-[130px] rounded-xl object-cover'/>
        <div>
            <h2 className='font-bold text-lg px-2'>{place?.attraction || place?.meal || place?.activity}</h2>
            <p className='text-sm text-gray-500 px-2'>{place?.description || place?.restaurant}</p>
            <h2 className='mt-2 px-2'>{place.ticketPrice ? `Fee: ${place.ticketPrice}` : ''}</h2>
            
        </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem