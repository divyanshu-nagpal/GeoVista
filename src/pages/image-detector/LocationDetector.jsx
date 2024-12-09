import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, MapPin, Building2, Landmark, Navigation, ImagePlus } from 'lucide-react';
import { analyzeImageWithGemini } from '@/service/AnalyzeImage';

const LocationDetector = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  // ... (keeping all the handlers the same)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setError(null);
      setResult(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      setError(null);
      setResult(null);
    } else {
      setError('Please drop an image file');
    }
  };

  const handleAnalyzeImage = async () => {
    if (!selectedImage) {
      setError("Please select an image first");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const analysisResult = await analyzeImageWithGemini(selectedImage);
      setResult(analysisResult);
    } catch (error) {
      console.error('Error analyzing image:', error);
      setError('Failed to analyze image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        {/* <div className="mb-8">
          <h1 className="text-4xl font-light tracking-tight text-gray-900">
            Location<span className="font-bold text-orange-500">Scout</span>
          </h1>
          <p className="text-gray-500 mt-2 text-sm tracking-wide text-center">
            Upload an image to discover its location and historical significance
          </p>
        </div> */}

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Image Upload */}
          <div className="space-y-6">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="imageInput"
            />
            
            {!selectedImage ? (
              <label
                htmlFor="imageInput"
                className={`aspect-square w-full border-2 border-dashed rounded-3xl cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-4
                  ${isDragging 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-orange-200 hover:border-orange-500 hover:bg-orange-50'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-orange-100 rounded-full opacity-50 animate-pulse"></div>
                  <ImagePlus className="w-12 h-12 text-orange-500 relative" />
                </div>
                <div className="text-center relative z-10">
                  <p className="text-orange-500 font-medium">Drop your image here</p>
                  <p className="text-sm text-gray-400 mt-1">or click to browse</p>
                </div>
              </label>
            ) : (
              <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-gray-100">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected location"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 bg-white/90 text-gray-600 p-2 rounded-full hover:bg-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}

            {error && (
              <div className="bg-orange-50 border border-orange-100 text-orange-600 text-sm p-4 rounded-2xl">
                {error}
              </div>
            )}

            <Button 
              onClick={handleAnalyzeImage} 
              className={`w-full bg-orange-500 hover:bg-orange-600 text-white rounded-2xl py-6 text-lg font-medium
                ${!selectedImage && 'opacity-50 cursor-not-allowed'}`}
              disabled={loading || !selectedImage}
            >
              {loading ? "Analyzing Location..." : "Detect Location"}
            </Button>
          </div>

          {/* Right Column - Results */}
          <div className="relative">
            {result ? (
              <div className="space-y-8">
                <div className="relative">
                  <h2 className="text-5xl font-extralight text-gray-900">
                    {result.placeName}
                  </h2>
                  <div className="absolute -top-3 -right-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                    Detected
                  </div>
                </div>

                {/* Location Stats */}
                <div className="grid grid-cols-2 gap-4 font-light">
                  <div className="col-span-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="w-4 h-4 text-orange-400" />
                      <span className="text-xs text-orange-500 uppercase tracking-wider">Location</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-4 rounded-2xl">
                        <div className="text-2xl">{result.location.city}</div>
                        <div className="text-xs text-gray-400">City</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-2xl">
                        <div className="text-2xl">{result.location.state}</div>
                        <div className="text-xs text-gray-400">State</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-2xl">
                        <div className="text-2xl">{result.location.capital}</div>
                        <div className="text-xs text-gray-400">Capital</div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Navigation className="w-4 h-4 text-orange-400" />
                      <span className="text-xs text-orange-500 uppercase tracking-wider">Coordinates</span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl">
                      <div className="text-xl font-mono">{result.coordinates}</div>
                    </div>
                  </div>
                </div>

                {/* Historical Significance */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Landmark className="w-4 h-4 text-orange-400" />
                    <span className="text-xs text-orange-500 uppercase tracking-wider">Historical Significance</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {result.significance}
                  </p>
                </div>

                {/* Nearby Attractions */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-orange-400" />
                    <span className="text-xs text-orange-500 uppercase tracking-wider">Nearby Attractions</span>
                  </div>
                  <div className="grid gap-2">
                    {result.nearbyAttractions.map((attraction, index) => (
                      <div 
                        key={index} 
                        className="bg-gray-50 p-4 rounded-2xl flex items-center gap-4"
                      >
                        <span className="text-orange-500 text-lg">{index + 1}</span>
                        <p className="text-gray-600">{attraction}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <Camera className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p className="text-lg">Upload an image to discover its location<br/>and historical significance</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetector;