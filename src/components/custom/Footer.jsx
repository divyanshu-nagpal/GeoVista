import React from 'react';
import { Globe2, MessageSquare, Bell } from 'lucide-react';

const DashboardFooter = ({router}) => {

  const handleNavigation = (route) => {
    router.navigate(route);
  };

  return (
    <footer className="bg-white shadow-md border-t border-slate-200 py-6 mt-20 ">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          {/* Company Info */}
          <div className="w-[500px]">
            <h4 className="font-bold text-lg mb-4 text-slate-800">TripMate AI</h4>
            <p className="text-slate-600 text-sm">
              Your AI-powered travel companion, creating personalized itineraries and helping you discover the world.
            </p>
          </div>

          

          {/* Contact & Social */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-slate-800">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-600 hover:text-red-600">
                <Globe2 className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-600 hover:text-red-600">
                <MessageSquare className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-600 hover:text-red-600">
                <Bell className="h-5 w-5" />
              </a>
            </div>
            <p className="text-slate-500 text-xs mt-4">
              © {new Date().getFullYear()} TripMate AI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;