import React, { useState } from 'react';
import { Button } from '../ui/button';
import heroimg from '../../assets/images/bg1.jpg';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Hero() {
  const [openDialog,setOpenDialog]=useState(false);
  const navigate = useNavigate();

  const login=useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    // onSuccess:(codeResp)=>console.log(codeResp),
    onError:(error)=>console.log(error)
  })
  const LoginCheck = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true); // Show the dialog if the user isn't logged in
    } else {
      navigate("/home-page"); // Redirect to the desired page if the user is logged in
      window.location.reload();
    }
  };
  const GetUserProfile = async (tokenInfo) => {
    const resp = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
      {
        headers: {
          Authorization:`Bearer ${tokenInfo?.access_token}`,
          Accept: "Application/json",
        },
      }
    );
    console.log(resp);
    localStorage.setItem("user", JSON.stringify(resp.data));
    setOpenDialog(false);
    navigate("/home-page"); // Redirect to the desired page if the user is logged in
    window.location.reload();
  };
  return (
    <div className="flex flex-col items-center justify-center mx-0 gap-8 text-center">
      {/* Background image section */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background image */}
        <img
          src={heroimg}
          alt="Beautiful travel destination landscape"
          className="absolute inset-0 object-cover w-full h-full brightness-75" // Slightly reduced brightness for better contrast
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4">
          <h1 className="font-extrabold text-3xl md:text-5xl lg:text-6xl mb-6 drop-shadow-lg leading-tight md:leading-snug">
            <span className="text-orange-500">Plan Your Dream Getaway</span> <br />
            With Ease and Confidence
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl max-w-3xl drop-shadow-lg mb-6">
            Say goodbye to overwhelming travel planning. <br />
            Discover personalized itineraries designed just for you.
          </p> 
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 rounded-lg shadow-xl text-lg transform transition-transform duration-200 hover:scale-105"
            onClick={LoginCheck}>
              Start Your Adventure
            </Button>
        </div>
      </div>
            {/* Dialog for Sign In */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription className="text-center">
              <img src="logo.svg" alt="Logo" className="mx-auto mb-4" />
              <h2 className="font-bold text-xl">Sign In with Google</h2>
              <p className="text-gray-600 text-sm">
                Access your account securely with Google authentication.
              </p>
              <Button
                onClick={login}
                className="w-full mt-5 flex items-center gap-3 bg-black text-white hover:bg-gray-800"
              >
                <FcGoogle className="h-6 w-6" /> Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Hero;

