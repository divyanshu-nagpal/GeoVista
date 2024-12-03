import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({trip}) {
  return (
    <div>
        <h2 className='font-bold text-lg mt-5'>PlacesToVisit</h2>
        <div>
            {trip?.tripData?.dailyPlans.map((dayitem,dayindex)=>(
                <div key={dayindex} className='mt-5'>
                    <h2 className='font-medium text-lg'>{dayitem?.day}</h2>
                    <div className='grid md:grid-cols-2 gap-5'>
                        {dayitem?.plan?.map((place,placeindex)=>(
                            <div key={placeindex} className='my-3'>
                                <h2 className='font-medium text-sm text-orange-400'>{place.time}</h2>
                                <PlaceCardItem place={place}/>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default PlacesToVisit