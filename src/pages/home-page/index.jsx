import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Sparkles, Plane, MapPin, Calendar, Brain, Image, Clock, MessageSquare } from 'lucide-react';
import RotatingEarth from './components/RotatingEarth';
import { useNavigate } from "react-router-dom";
import RecentTrips from './components/RecentTrips';

const DashboardHome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);
  return (
    <div className="min-h-screen p-6 mb-10">
      {/* AI Assistant Floating Card */}
      <div className="max-w-6xl mx-auto mb-8">
        <Card className="bg-white/70 backdrop-blur-lg border border-slate-200 shadow-xl">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row items-center">
              <div className="flex-1 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="h-6 w-6 text-orange-500" />
                  <span className="text-sm font-medium text-orange-500">AI Trip Assistant</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">Where would you like to explore?</h2>
                <p className="text-slate-600 mb-4">Describe your dream destination or type of trip - I'll create the perfect itinerary for you.</p>
                <div className="flex gap-4">
                  <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                  onClick={() => navigate("/create-trip")}>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Start AI Planning
                  </Button>
                </div>
              </div>
        
              <div className="w-[350px] h-[350px] cursor-pointer">
                <RotatingEarth />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-8 pt-10">

      <Card className="bg-white/70 backdrop-blur-lg hover:shadow-lg transition-all cursor-pointer group" onClick={() => navigate("/create-trip")}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors">
              <Plane className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Expedition</h3>
                <p className="text-slate-500">Start your next exploration</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-lg hover:shadow-lg transition-all cursor-pointer group" onClick={() => navigate("/image-detect")}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Pixplore</h3>
                <p className="text-slate-500">Discover places from photos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-lg hover:shadow-lg transition-all cursor-pointer group" onClick={() => navigate("/my-trips")}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors">
              <Calendar className="h-6 w-6" />
                
              </div>
              <div>
                <h3 className="font-semibold">Wanderlist</h3>
                <p className="text-slate-500">All your saved adventures</p>
              </div>
            </div>
          </CardContent>
        </Card>
  
      </div>

      {/* Recent Trips Section */}
      <div className="max-w-6xl mx-auto mb-8 pt-5">
        <RecentTrips />
      </div>
    </div>
  );
};

export default DashboardHome;