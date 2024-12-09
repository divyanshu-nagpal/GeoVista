import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from "@/constants/options";
import { toast, useToast } from "@/hooks/use-toast";
import { chatSession } from '@/service/AIModal';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/service/firebaseConfig';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { 
  PlaneTakeoff, 
  Wallet, 
  Users, 
  Coins,
  DollarSign,
  Bitcoin,
  Users as UsersGroup,
  Heart,
  Building,
  Mountain,
  Palmtree,
  PersonStanding,
  UserPlus,
  CalendarDays
  
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import MonthsCalendar from './MonthsCalendar';
import LoaderPage from '@/components/custom/loader';

const CreateTrip = () => {
  const navigate = useNavigate();
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  // const [activeSection, setActiveSection] = useState(0);
  // const [formData, setFormData] = useState({month: "",});
  const [isMonthModalOpen, setMonthModalOpen] = useState(false);


  const selectedMonth = formData.month ? formData.month : null;

  const openMonthModal = () => setMonthModalOpen(true);
  const closeMonthModal = () => setMonthModalOpen(false);
  
   
  

  const budgetOptionsWithIcons = [
    { ...SelectBudgetOptions[0], icon: Coins },
    { ...SelectBudgetOptions[1], icon: DollarSign },
    { ...SelectBudgetOptions[2], icon: Bitcoin }
  ];

  const travelListWithIcons = [
    { ...SelectTravelList[0], icon: PersonStanding },
    { ...SelectTravelList[1], icon: Heart },
    { ...SelectTravelList[2], icon: UsersGroup },
    { ...SelectTravelList[3], icon: UserPlus }
  ];

  const locationIcons = [Building, Palmtree, Mountain];

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // const nextSection = activeSection + 1;
    // if (nextSection < 4) {
    //   setActiveSection(nextSection);
    //   document.getElementById(`section-${nextSection}`)?.scrollIntoView({ 
    //     behavior: 'smooth',
    //     block: 'center'
    //   });
    // }
  };

  const OnGenerateTrip = async () => {
    // Check for missing details
    if (!formData?.noOfDays || !formData?.location || !formData?.budget || !formData?.traveler) {
      toast({
        title: "Missing Details",
        description: "Please fill all the details to generate a trip.",
        className: "text-black bg-white border border-orange-600 shadow-lg",
      });
      return;
    }


    // Check for number of days
    if (formData?.noOfDays > 10) {
      toast({
        title: "Trip Duration Too Long",
        description: "Please select a duration shorter than 10 days to proceed.",
        className: "text-black bg-white border border-orange-600 shadow-lg",
      });
      return;
    }

    if (!formData?.month) {
      toast({
        title: "Missing Month of Travel",
        description: "Please select the month you plan to travel.",
        className: "text-black bg-white border border-orange-600 shadow-lg",
      });
      return;
    }

    if (formData?.noOfDays < 1) {
      toast({
        title: "Invalid Trip Duration",
        description: "Trip duration must be at least 1 day. Please adjust your selection.",
        className: "text-black bg-white border border-orange-600 shadow-lg",
      });
      return;
    }

  
    setLoading(true); // Show loader
  
    const FINAL_PROMPT = AI_PROMPT
      .replace('{place}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays);
  
    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      SaveAiTrip(result?.response?.text());
    } catch (error) {
      console.error("Error generating trip:", error);
      toast.error("An error occurred while generating the trip.");
      setLoading(false);
    }
  };
  
  

  const SaveAiTrip = async (TripData) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const docId = Date.now().toString();
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(TripData),
        userEmail: user?.email,
        id: docId
      });
      navigate('/view-trip/' + docId);
    } catch (error) {
      console.error("Error saving trip:", error);
      toast.error("An error occurred while saving the trip.");
    } finally {
      setLoading(false); // Hide loader
    }
  };
  


  const reset = () => {
    setPlace(null);
    setFormData({});
    // setActiveSection(0);
    document.getElementById('section-0')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };


    if (loading) {
      return <LoaderPage />;
    }
    return (
    <div className={`min-h-screen p-6 transition-all duration-300 ${isMonthModalOpen ? "filter blur-sm" : ""}`}>
      <div className="max-w-4xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="font-bold text-5xl text-gray-900 tracking-tight">
            Design Your Perfect Journey
          </h1>
          <p className="text-gray-500 text-xl font-light">
            Let's create an unforgettable travel experience together
          </p>
          <div className="flex justify-center gap-4 text-orange-600 opacity-75">
            <PlaneTakeoff className="w-8 h-8 animate-pulse" />
          </div>
        </div>

        {/* Destination Section */}
        <Card 
          className={`mb-8 bg-gradient-to-b from-white to-orange-50 transition-all duration-600 hover:shadow-xl`}
        >
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-orange-50 rounded-full">
                <PlaneTakeoff className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-medium text-gray-900">
                Where would you like to go?
              </h2>
            </div>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                value: place,
                onChange: (v) => {
                  setPlace(v);
                  handleInputChange("location", v);
                },
                styles: {
                  control: (provided) => ({
                    ...provided,
                    borderColor: '#e5e7eb',
                    borderRadius: '0.75rem',
                    padding: '4px',
                    '&:hover': {
                      borderColor: '#ef4444'
                    }
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isFocused ? '#fef2f2' : 'white',
                    color: '#111827',
                    padding: '12px'
                  })
                }
              }}
            />
            <div className="flex justify-center gap-8 mt-8">
              {locationIcons.map((Icon, index) => (
                <Icon 
                  key={index}
                  className="w-6 h-6 text-gray-400 transition-all duration-300 hover:text-orange-500 hover:scale-110"
                />
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Month Selection Section */}
        <Card   
          className={`mb-8 bg-gradient-to-b from-white to-orange-50 transition-all duration-500 hover:shadow-xl`}
        >
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-orange-50 rounded-full">
                <CalendarDays className="w-6 h-6 text-orange-500" />
              </div>
              <h2 className="text-2xl font-medium text-gray-900">
                When are you planning to travel?
              </h2>
            </div>
            <div className={`relative`}>
              {/* Background Content */}
              <div
                className={`transition-filter duration-300 ${
                  isMonthModalOpen ? "filter blur-sm" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <Button
                    onClick={openMonthModal}
                    variant="outline"
                    className="flex items-center gap-2 px-4 py-2"
                  >
                    <CalendarDays className="w-5 h-5" />
                    {formData.month || "Select Month"}
                  </Button>
                </div>
              </div>

              {/* Modal */}
              <Dialog open={isMonthModalOpen} onOpenChange={setMonthModalOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Select Travel Month</DialogTitle>
                  </DialogHeader>
                  <MonthsCalendar
                    selectedMonth={selectedMonth}
                    onMonthSelect={(month) => {
                      handleInputChange("month", month); // Update form data
                      closeMonthModal(); // Close modal
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>

        </Card>

        {/* Duration Section */}
        <Card 
          className={`mb-8 bg-gradient-to-b from-white to-orange-50 transition-all duration-500 hover:shadow-xl`}
        >
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-orange-50 rounded-full">
              <CalendarDays className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-medium text-gray-900">
                How long is your adventure?
              </h2>
            </div>
            <Input
              placeholder="Number of days (1-10)"
              type="number"
              min="1"
              max="10"
              className="border-gray-200 focus:ring-orange-500 rounded-xl p-6 text-lg"
              value={formData.noOfDays || ""}
              onChange={(e) => handleInputChange("noOfDays", e.target.value)}
              onWheel={(e) => e.target.blur()}
            />
          </CardContent>
        </Card>

        {/* Budget Section */}
        <Card 
          className={`mb-8 bg-gradient-to-b from-white to-orange-50 transition-all duration-500 hover:shadow-xl`}
        >
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-orange-50 rounded-full">
                <Wallet className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-medium text-gray-900">
                What's your budget range?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {budgetOptionsWithIcons.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleInputChange("budget", item.title)}
                  className={`group cursor-pointer rounded-xl p-6 transition-all duration-300
                    ${formData?.budget === item.title 
                      ? 'bg-orange-600 text-white shadow-lg scale-105' 
                      : 'bg-white hover:bg-orange-50 border border-gray-200 hover:shadow-lg hover:scale-102'
                    }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <item.icon className={`w-5 h-5 
                      ${formData?.budget === item.title ? 'text-white' : 'text-orange-600'}`} 
                    />
                    <h3 className={`text-lg font-semibold
                      ${formData?.budget === item.title ? 'text-white' : 'text-gray-900'}`}>
                      {item.title}
                    </h3>
                  </div>
                  <p className={`text-sm
                    ${formData?.budget === item.title ? 'text-orange-50' : 'text-gray-500'}`}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Travel Companions Section */}
        <Card 
          className={`mb-8 bg-gradient-to-b from-white to-orange-50 transition-all duration-500 hover:shadow-xl`}
        >
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-orange-50 rounded-full">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-medium text-gray-900">
                Who's joining your journey?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {travelListWithIcons.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleInputChange("traveler", item.people)}
                  className={`group cursor-pointer rounded-xl p-6 transition-all duration-300
                    ${formData?.traveler === item.people 
                      ? 'bg-orange-500 text-white shadow-lg scale-105' 
                      : 'bg-white hover:bg-orange-50 border border-gray-200 hover:shadow-lg hover:scale-102'
                    }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <item.icon className={`w-5 h-5 
                      ${formData?.traveler === item.people ? 'text-white' : 'text-orange-600'}`} 
                    />
                    <h3 className={`text-sm font-semibold
                      ${formData?.traveler === item.people ? 'text-white' : 'text-gray-900'}`}>
                      {item.title}
                    </h3>
                  </div>
                  
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-12">
          <Button 
            onClick={reset}
            variant="outline"
            className="border-gray-200 text-gray-600 hover:bg-gray-50 px-6 py-3 rounded-xl"
          >
            Start Over
          </Button>
          <Button 
            onClick={OnGenerateTrip}
            disabled={loading}
            className="bg-orange-600 hover:bg-orange-600 text-white px-6 py-3 rounded-xl"
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin mr-2" />
            ) : 'Generate Trip'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;