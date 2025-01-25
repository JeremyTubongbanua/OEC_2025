'use client';

import { useEffect, useState } from 'react';

export default function GetUserLocation() {
   const [location, setLocation] = useState<GeolocationPosition | null>(null);
   const [disasterCount, setDisasterCount] = useState(0);

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
         let radius = 20000;

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
         console.log('Fetching subhubs...');

         fetch(
            `http://40.233.92.183:3000/get_subhubs?radius_km=${radius}&longitude=${lng}&latitude=${lat}`
         ).then((response) => {
            response.json().then((data) => {
               const jeremydata: JeremyData[] = Array.isArray(data) ? data : [];
               console.log(jeremydata);

               jeremydata.forEach(({ port, name }) => {
                  fetch(`http://40.233.92.183:${port}/disasters`).then(
                     (response) => {
                        response.json().then((data) => {
                           console.log(`Disasters for subhub ${name}:`, data);
                           const disasterDataArray = data.disasters;

                           setDisasterCount(disasterDataArray.length);
                        });
                     }
                  );
               });
            });
         });
      }
   }, [location]);

   console.log(disasterCount);

   return (
      <>
         {disasterCount > 0 && (
            <div className="border border-red-500 bg-red-200 py-2 w-full text-center">
               <p>
                  There are currently {disasterCount} disasters near you. Stay
                  safe and take necessary precautions!
               </p>
               <p>
                  For more information, please click{' '}
                  <a
                     href="https://www.canada.ca/en/health-canada/services/health-concerns/emergencies-disasters.html"
                     className="underline"
                  >
                     here
                  </a>
                  .
               </p>
            </div>
         )}
      </>
   );
}
