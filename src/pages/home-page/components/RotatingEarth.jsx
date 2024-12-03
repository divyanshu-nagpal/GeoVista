import React, { useRef, useEffect } from 'react';
import Globe from 'globe.gl';

function RotatingEarth() {
  const containerRef = useRef(null);
  const globeRef = useRef(null);

  useEffect(() => {
    if (!globeRef.current && containerRef.current) {
      // Create new globe instance
      const globe = Globe()
        .globeImageUrl('earth-dark1.jpg')
        .backgroundColor('rgba(0,0,0,0)')
        .width(containerRef.current.clientWidth)
        .height(containerRef.current.clientHeight);

      // Mount the globe
      globe(containerRef.current);

      // Get controls
      const controls = globe.controls();
      
      // Set zoom limits
      controls.minDistance = 280;
      controls.maxDistance = 280;
      
      // Set auto-rotation
      controls.autoRotate = true;
      controls.autoRotateSpeed = 2;
      
      // Wait a frame to ensure the globe is properly initialized
      requestAnimationFrame(() => {
        // Asia centered
        globe.pointOfView({ 
          lat: 20.0479, 
          lng: 105.6197, 
          altitude: 2.5 
        }, 0); // The second parameter (0) makes it instant
        
        // Force the controls to update with the new position
        controls.update();
      });
      
      // Store the globe instance
      globeRef.current = globe;
    }

    // Cleanup function
    return () => {
      if (globeRef.current && containerRef.current) {
        containerRef.current.innerHTML = '';
        globeRef.current = null;
      }
    };
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (globeRef.current && containerRef.current) {
        globeRef.current
          .width(containerRef.current.clientWidth)
          .height(containerRef.current.clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '100%',
        position: 'relative'
      }} 
    />
  );
}

export default RotatingEarth;