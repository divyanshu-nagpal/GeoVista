import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Ensure the path is correct
import { toast } from "@/hooks/use-toast";

export const deleteTrip = async (tripId) => {
    console.log("Deleting trip with ID:", tripId);

  try {
    const tripRef = doc(db, "AITrips", tripId); // Adjust collection name if needed
    await deleteDoc(tripRef); // Delete the document
    window.location.reload();
    // toast({
    //     title: "Deleted Succesfully",
    //     className: "text-black bg-white border border-orange-500 shadow-lg", // Customize color here
    //   })
  } catch (error) {
    console.error("Error deleting trip:", error);
    throw error; // Re-throw error to handle it in your component
  }
};