import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Loader2, MapPin, Wallet, Trash2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Link } from 'react-router-dom';
import { SelectTravelList } from '@/constants/options';
import { deleteTrip } from '@/service/firebase-services';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

const UserTripCardItem = ({ trip, onDelete }) => {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const GetPlacePhoto = async () => {
    try {
      const data = { textQuery: trip?.userSelection?.location?.label }
      const resp = await GetPlaceDetails(data);
      
      if (resp.data.places && resp.data.places[0].photos) {
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[1].name);
        setPhotoUrl(PhotoUrl);
      }
    } catch (error) {
      console.error("Error fetching photo:", error);
    }
  }

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteTrip(trip.id);
      onDelete(trip.id); // Update parent component's state
      setShowDeleteDialog(false);
    } catch (error) {
      console.error('Error deleting trip:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Card className="bg-gradient-to-br from-orange-50 to-slate-50 border-none hover:shadow-lg transition-all">
        <CardContent className="p-6">
          <div className="flex flex-col gap-3 mb-4">
            <div className="flex items-start justify-between w-full">
              <div className="flex items-start gap-2 min-w-0 max-w-[80%]">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-slate-500" />
                <h3 className="font-semibold text-lg leading-tight truncate">
                  {trip?.userSelection?.location?.label?.split(/[,\-|•\/\(\)]/)[0]?.trim() || 'Unknown'}
                </h3>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-medium flex items-center gap-1 whitespace-nowrap">
                  <User className="h-3 w-3" />
                  {SelectTravelList.find(item => item.people === trip.userSelection.traveler)?.title.split(' ')[0] || 'Unknown'}
                </span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-slate-400 hover:text-orange-600 hover:bg-orange-50"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="relative w-full overflow-hidden rounded-lg mb-4">
            {(
              <div className="w-full overflow-hidden rounded-xl border-2">
                <img
                  src={photoUrl || '/placeholder.jpg'} 
                  className="object-cover w-full h-[220px]"
                  alt="Trip" 
                />
                <div className="absolute inset-0 bg-orange-900/10 transition-opacity group-hover:bg-orange-900/20" />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{trip.userSelection.noOfDays} Days</span>
              </div>
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                <span>{trip.userSelection.budget}</span>
              </div>
            </div>
            <Link to={`/view-trip/${trip?.id}`} className="block">
              <Button size="sm" className="w-full bg-white text-slate-700 hover:bg-orange-500 hover:text-white">
                View Itinerary
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Trip</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this trip to {trip?.userSelection?.location?.label}? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-orange-600 hover:bg-orange-700 text-white"
              onClick={confirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UserTripCardItem;