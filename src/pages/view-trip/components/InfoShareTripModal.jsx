import React, { useState } from "react";
import { Share2, X } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";

function InfoShareTripModal({ trip, isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);

  const shareText = `
        *Your Next Adventure Awaits!*

        Destination: ${trip?.userSelection?.location?.label || "Not specified"}  
        Duration: ${trip?.userSelection?.noOfDays || "Not specified"} days  
        Budget: ${trip?.userSelection?.budget || "Not specified"}  
        Travelers: ${trip?.userSelection?.traveler || "Not specified"}  

        Trip Highlights:  
        - Explore breathtaking views  
        - Savor local cuisine  
        - Create unforgettable memories  

        Plan your trip here: ${window.location.href}
        `.trim();


  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(window.location.href);

  const sharingOptions = [
    {
      name: "WhatsApp",
      icon: "https://img.icons8.com/color/48/whatsapp--v1.png",
      url: `https://wa.me/?text=${encodedText}`,
    },
    {
      name: "Twitter",
      icon: "https://img.icons8.com/color/48/twitter--v1.png",
      url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    },
    {
      name: "Gmail",
      icon: "https://img.icons8.com/color/48/gmail--v1.png",
      url: `mailto:?subject=Exciting Trip Details&body=${shareText}`,
    },
    {
      name: "Facebook",
      icon: "https://img.icons8.com/color/48/facebook--v1.png",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
  ];

  const validateTripData = (trip) => {
    if (!trip) {
      console.error("Trip data is null or undefined.");
      return false;
    }

    try {
      // Validate the structure of the trip object
      if (!trip.tripData || !trip.userSelection || !trip.userSelection.location) {
        console.error("Trip data structure is missing key properties:", trip);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Validation error:", error);
      return false;
    }
  };

  const generatePDF = () => {
    setLoading(true);
    setPdfUrl(null);

    try {
      if (!validateTripData(trip)) {
        throw new Error("Invalid trip data");
      }

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Sophisticated color palette
      const CHARCOAL = [54, 69, 79];
      const SAGE_GREEN = [87, 116, 95];
      const CREAM = [255, 253, 208];
      const DARK_TEXT = [20, 20, 20];

      // Custom font registration (if needed)
      doc.addFont("Helvetica", "helvetica", "normal");

      // Background watermark effect
      doc.setFillColor(240, 240, 240);
      doc.rect(0, 0, 210, 297, 'F');

      // Elegant header
      doc.setFillColor(...CHARCOAL);
      doc.rect(0, 0, 210, 30, 'F');
      
      // GeoVista Logo and Title
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.text("GeoVista", 105, 15, { align: 'center' });
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text("Your Travel Companion", 105, 22, { align: 'center' });

      // Trip Overview Section
      doc.setTextColor(...DARK_TEXT);
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.setDrawColor(...SAGE_GREEN);
      
      // Destination Header
      doc.text("Destination Overview", 20, 45);
      doc.setLineWidth(0.5);
      doc.line(20, 50, 190, 50);

      // Destination Details
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`Location: ${trip.userSelection?.location?.label || "Unspecified"}`, 20, 60);
      doc.text(`Duration: ${trip.userSelection?.noOfDays || "N/A"} days`, 20, 70);
      doc.text(`Total Budget: ${trip.userSelection?.budget || "N/A"}`, 20, 80);
      doc.text(`Travelers: ${trip.userSelection?.traveler || "N/A"}`, 20, 90);

      let currentY = 110;

      // Daily Itinerary Section
      if (trip.tripData?.dailyPlans && Array.isArray(trip.tripData.dailyPlans)) {
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("Daily Itinerary", 20, currentY);
        doc.setLineWidth(0.5);
        doc.line(20, currentY + 5, 190, currentY + 5);
        currentY += 15;

        trip.tripData.dailyPlans.forEach((day) => {
          if (currentY > 270) {
            doc.addPage();
            currentY = 20;
          }

          // Day header
          doc.setFillColor(240, 240, 240);
          doc.rect(20, currentY, 170, 10, 'F');
          
          doc.setFont("helvetica", "bold");
          doc.setFontSize(10);
          doc.text(`${day.day || "Day"} (Budget: ${day.Budget || "N/A"})`, 25, currentY + 7);
          currentY += 15;

          const tableData = day.plan?.map((activity) => [
            activity.time || "N/A",
            activity.attraction || activity.restaurant || "N/A",
            activity.address || "N/A",
            activity.description || activity.meal || "N/A",
            activity.meal ? "" : (activity.ticketPrice ? `${activity.ticketPrice}` : "Free"),           
          ]) || [];

          if (tableData.length > 0) {
            doc.autoTable({
              startY: currentY,
              head: [["Time", "Attraction/Meal", "Address", "Description", "Price"]],
              body: tableData,
              theme: 'striped',
              styles: {
                fillColor: [255, 255, 255],
                textColor: [0, 0, 0],
                lineColor: [...SAGE_GREEN],
                lineWidth: 0.1,
              },
              headStyles: {
                fillColor: [...CHARCOAL],
                textColor: [255, 255, 255],
                fontStyle: 'bold'
              }
            });

            currentY = doc.autoTable.previous.finalY + 10;
          } else {
            doc.text("No activities planned for this day.", 20, currentY);
            currentY += 10;
          }
        });
      } else {
        doc.text("No daily plans available.", 20, currentY);
        currentY += 10;
      }

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 280);
      doc.text(`Trip Reference: ${trip.id || 'N/A'}`, 20, 285);

      // Save the PDF
      const pdfBlob = doc.output("blob");
      const pdfBlobUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfBlobUrl);

      // Trigger download
      const link = document.createElement("a");
      link.href = pdfBlobUrl;
      link.download = `Trip_Itinerary_${trip.id || 'Unnamed'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please check your trip data and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-96 p-6 relative">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <Share2 className="w-12 h-12 mx-auto text-red-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">Share Trip</h2>
          <p className="text-gray-500 mt-2">Spread the excitement with your friends!</p>
        </div>

        {/* Sharing Options */}
        <div className="grid grid-cols-2 gap-4">
          {sharingOptions.map((option, index) => (
            <a
              key={index}
              href={option.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all group"
            >
              <img 
                src={option.icon} 
                alt={`${option.name} icon`} 
                className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" 
              />
              <span className="text-gray-700 font-medium">{option.name}</span>
            </a>
          ))}
        </div>
        <br></br>
        <div className="text-center text-gray-600 mb-6">
          {!loading ? "Download your travel details as a PDF" : "Preparing your itinerary..."}
        </div>

        <div className="flex justify-center">
          <button
            onClick={generatePDF}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate PDF"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default InfoShareTripModal;