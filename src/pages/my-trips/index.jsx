import { db } from '@/service/firebaseConfig';
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips() {

    const navigation=useNavigation(); 
    const [userTrips,setUserTrips]=useState([]);
    useEffect(()=>{
        GetUserTrips();
    },[])


    //Used to Get all user Trips
    const GetUserTrips=async()=>{
        const user=JSON.parse(localStorage.getItem('user'));
        
        if(!user)
        {
            navigation('/');
            return;
        }

        const q=query(collection(db,'AITrips'),where('userEmail','==',user?.email));
        const querySnapshot = await getDocs(q);
        setUserTrips([]);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        setUserTrips(prevVal=>[...prevVal,doc.data()])
        });

    }


  return (
    <div className='sm:px-10 md:px-32 lg:px-40 xl:px-56 px-6 mt-10'>
        <h2 className='font-bold text-3xl'>My Trips</h2>

        <div className='mt-10 grid grid-cols-2 md:grid-cols-3 gap-5'>
            {userTrips?.length>0?userTrips?.map((trip,tripindex)=>(
                <UserTripCardItem trip={trip} key={tripindex}/>
            ))
            :[1,2,3,4,5,6].map((item,index)=>(
                <div
                    key={index}
                    className="h-[200px] w-full bg-slate-200 animate-pulse rounded-xl"
                ></div>

            ))
        }
        </div>
    </div>
  )
}

export default MyTrips