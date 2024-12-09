import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { Home, Map, Camera, LogOut } from "lucide-react";
import axios from "axios";

const Header = ({ router }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [activeRoute, setActiveRoute] = useState("/");
  const user = JSON.parse(localStorage.getItem("user"));

  // Update active route whenever the component mounts or router changes
  useEffect(() => {
    // Function to update active route
    const updateActiveRoute = () => {
      // Get current pathname
      const currentPath = window.location.pathname;
      setActiveRoute(currentPath);
    };

    // Set initial route
    updateActiveRoute();

    // Create an observer to watch for URL changes
    const observer = new MutationObserver(updateActiveRoute);
    observer.observe(document.querySelector("body"), {
      attributes: true,
      childList: true,
      subtree: true
    });

    // Clean up observer on unmount
    return () => observer.disconnect();
  }, []);

  // Listen for router navigation events
  useEffect(() => {
    if (router && router.listen) {
      const unsubscribe = router.listen(({ location }) => {
        setActiveRoute(location.pathname);
      });
      return () => unsubscribe();
    }
  }, [router]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log("Login Failed:", error),
  });

  const GetUserProfile = async (tokenInfo) => {
    try {
      const resp = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      );
      localStorage.setItem("user", JSON.stringify(resp.data));
      setOpenDialog(false);
      const homePage = "/home-page";
      setActiveRoute(homePage);
      router.navigate(homePage);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    const homeRoute = "/";
    setActiveRoute(homeRoute);
    router.navigate(homeRoute);
    window.location.reload();
  };

  // Function to handle navigation and active state
  const handleNavigation = (route) => {
    setActiveRoute(route);
    router.navigate(route);
  };

  // Function to handle logo click
  const handleLogoClick = () => {
    const route = user ? "/home-page" : "/";
    setActiveRoute(route);
    router.navigate(route);
  };

  // Function to determine if the current route matches
  const isActive = (route) => activeRoute === route;

  return (
    <>
      <header className="bg-white shadow-md fixed w-full top-0 z-50 h-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div
              className="flex-shrink-0 cursor-pointer text-orange-600 text-2xl font-bold"
              onClick={handleLogoClick}
            >
              <h1 className="text-4xl font-light tracking-tight text-gray-900">
              Geo<span className="font-bold text-orange-500">Vista</span>
              </h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-6">
              {user && (
                <>
                  <Button
                    variant="ghost"
                    className={`flex items-center gap-2 transition-all duration-200 ${
                      isActive("/home-page")
                        ? "bg-red-50 text-orange-600 font-semibold scale-105"
                        : "text-gray-600 hover:text-orange-600 hover:bg-red-50"
                    }`}
                    onClick={() => handleNavigation("/home-page")}
                  >
                    <Home size={18} />
                    Home
                  </Button>

                  <Button
                    variant="ghost"
                    className={`flex items-center gap-2 transition-all duration-200 ${
                      isActive("/my-trips")
                        ? "bg-orange-50 text-orange-600 font-semibold scale-105"
                        : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                    }`}
                    onClick={() => handleNavigation("/my-trips")}
                  >
                    <Map size={18} />
                    My Trips
                  </Button>
                  <Button
                    variant="ghost"
                    className={`flex items-center gap-2 transition-all duration-200 ${
                      isActive("/image-detect")
                        ? "bg-red-50 text-orange-600 font-semibold scale-105"
                        : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                    }`}
                    onClick={() => handleNavigation("/image-detect")}
                  >
                    <Camera size={18} />
                    Pixplore
                  </Button>
                </>
              )}

             
            </nav>

            {/* Auth Section */}
            <div className="flex items-center">
              {user ? (
                <Popover>
                  <PopoverTrigger>
                    <div className="flex items-center cursor-pointer">
                      <img
                        src={user.picture}
                        alt="Profile"
                        className="h-10 w-10 rounded-full"
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 mt-2" align="end">
                    <div className="py-2">
                      <div className="px-4 pb-2">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                      <hr className="my-2" />
                      <div className="px-2">
                        <Button
                          variant="ghost"
                          className="w-full text-left text-orange-600 hover:text-orange-700 hover:bg-red-50 flex items-center gap-2"
                          onClick={handleLogout}
                        >
                          <LogOut size={18} />
                          Logout
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              ) : (
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-orange-600 text-orange-600 hover:bg-red-50"
                      onClick={() => setOpenDialog(true)}
                    >
                      Sign In
                    </Button>
                  </DialogTrigger>
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
              )}
            </div>
          </div>
        </div>
      </header>
      {/* Spacer div to prevent content from being hidden under fixed header */}
      <div className="h-16" />
    </>
  );
};

export default Header;