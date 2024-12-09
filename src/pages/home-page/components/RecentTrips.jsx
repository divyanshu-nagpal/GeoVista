import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs, where } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';// Ensure you have this firebase config file
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Calendar, Clock,User } from 'lucide-react';
import { useNavigate, useNavigation } from "react-router-dom";
import { SelectTravelList } from '@/constants/options';

const RecentTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const navigation=useNavigation(); 

  useEffect(() => {
    const fetchRecentTrips = async () => {
      try {
        const user=JSON.parse(localStorage.getItem('user'));
        
        if(!user)
        {
            navigation('/');
            return;
        }

        const tripsRef=query(collection(db,'AITrips'),where('userEmail','==',user?.email));
        // const tripsRef = collection(db, 'AITrips');
        const q = query(tripsRef, orderBy('id', 'desc'), limit(3));
        const querySnapshot = await getDocs(q);
        
        const tripsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setTrips(tripsData);
      } catch (error) {
        console.error('Error fetching trips:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentTrips();
  }, []);

  // Helper function to format the time difference
  const getTimeAgo = (tripId) => {
    if (!tripId) return '';
    const now = new Date();
    const created = new Date(parseInt(tripId)); // Convert trip ID (timestamp) to Date
    const diffInHours = Math.floor((now - created) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `Generated ${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `Generated ${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    }
  };

  return (
    <Card className="bg-white/70 backdrop-blur-lg border border-slate-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Trips</CardTitle>
            <CardDescription>Your latest AI-generated itineraries</CardDescription>
          </div>
          <Button 
            variant="ghost" 
            className="text-orange-500 hover:text-orange-600"
            onClick={() => navigate("/my-trips")}
          >
            View All Trips
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <Card 
                key={trip.id}
                className="bg-gradient-to-br from-slate-50 to-orange-50 border-none hover:shadow-md transition-all"
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{'Adventure'}</h3>
                      <p className="text-slate-500 text-sm">{trip?.userSelection?.location?.label}</p>
                    </div>
                    <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-medium flex items-center gap-1 whitespace-nowrap">
                      <User className="h-3 w-3" />
                      {SelectTravelList.find(item => item.people === trip.userSelection.traveler)?.title.split(' ')[0] || 'Unknown'}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="h-4 w-4" />
                      <span>{trip?.userSelection?.month}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock className="h-4 w-4" />
                      <span>{getTimeAgo(trip.id)}</span>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full bg-white text-slate-700 hover:bg-orange-500 hover:text-white"
                      onClick={() => navigate(`/view-trip/${trip?.id}`)}
                    >
                      View Itinerary
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {trips.length === 0 && (
              <div className="col-span-3 text-center py-8 text-slate-500">
                No trips found. Start planning your first adventure!
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentTrips;