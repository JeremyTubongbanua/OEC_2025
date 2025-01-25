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

   useEffect(() => {
      if (location) {
         let lat = location.coords.latitude;
         let lng = location.coords.longitude;
         let radius = 100;

         type JeremyData = {
            id: string;
            ip: string;
            latitude: number;
            longitude: number;
            name: string;
            port: string;
            radius_km: string;
         };

         console.log(lat, lng);

         fetch(
            `http://40.233.92.183:3000/get_subhubs?radius_km=${radius}&longitude=${lng}&latitude=${lat}`
         ).then((response) => {
            response.json().then((data) => {
               const jeremydata: JeremyData[] = Array.isArray(data) ? data : [];

               jeremydata.forEach(({ port, name }) => {
                  fetch(`http://40.233.92.183:${port}/disasters`).then(
                     (response) => {
                        response.json().then((data) => {
                           console.log(`Disasters for subhub ${name}:`, data);
                           const disasterDataArray = data.disasters;

                           alert('There are this many disasters in your area: ' + disasterDataArray.length);
                        });
                     }
                  );
               });
            });
         });
      }
   }, [location])

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

      </div>
   );
}
