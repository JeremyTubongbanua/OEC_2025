'use client';

import { useEffect, useState } from 'react';
import LeafletMap from '@/components/map';

export default function GetUserLocation() {
   const [location, setLocation] = useState<GeolocationPosition | null>(null);

   useEffect(() => {
      if ('geolocation' in navigator) {
         navigator.geolocation.getCurrentPosition(
            (pos) => setLocation(pos),
            (err) => console.error('Error:', err),
            {
               enableHighAccuracy: true,
               timeout: 10000,
               maximumAge: 0,
            }
         );
      } else {
         console.error('Geolocation not supported');
      }
   }, []);

   return (
      <div>
         {location ? (
            <div>
               <p>Latitude: {location.coords.latitude}</p>
               <p>Longitude: {location.coords.longitude}</p>
            </div>
         ) : (
            <p>Loading location...</p>
         )}

         <LeafletMap
            position={[location?.coords.latitude, location?.coords.longitude]}
         />
      </div>
   );
}
