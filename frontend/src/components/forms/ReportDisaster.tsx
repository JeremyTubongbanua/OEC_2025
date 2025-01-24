'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Label } from '../ui/label';
import fetchLngLat from '@/actions/fetchLngLat';

const reportDisasterSchema = z.object({
   address: z.string(),
   radius: z.string(),
   disasterType: z.string(),
   name: z.string(),
   description: z.string(),
   longitude: z.string(),
   latitude: z.string(),
});

export default function ReportDisaster() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: zodResolver(reportDisasterSchema),
      defaultValues: {
         address: '',
         radius: '100',
         disasterType: 'natural',
         name: 'Earthquake',
         description: '123',
         longitude: 43.2610131,
         latitude: -79.9226414,
      },
   });

   function onSubmit(data: {
      name: string;
      description: string;
      address: string;
      radius: string;
      disasterType: string;
      longitude: string;
      latitude: string;
   }) {
      const disasterType = data.disasterType;
      const name = data.name;
      const description = data.description;
      const address = data.address;
      const radius = data.radius;
      const longitude = data.longitude;
      const latitude = data.latitude;


      let get_subhubs_url = `http://40.233.92.183:3000/get_subhubs?radius_km=${radius}&longitude=${longitude}&latitude=${latitude}`;
            console.log('get_subhubs_url:', get_subhubs_url);
            fetch(get_subhubs_url)
               .then(response => response.json())
               .then(data => {
                  // console.log('Subhubs data:', data);
                  let subhubs = data;

                  // for each subhub, make a /disasters call
                  for (let i = 0; i < subhubs.length; i++) {
                     let subhub = subhubs[i];
                     let add_new_disaster_url = `http://${subhub.ip}:${subhub.port}/add_new_disaster`;
                     let payload = {
                        'disaster_type': disasterType,
                        'name': name,
                        'description': description,
                        'longitude': longitude,
                        'latitude': latitude,
                        'radius_km': radius,
                     };

                     // put request
                     fetch(add_new_disaster_url, {
                        method: 'POST',
                        headers: {
                           'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(payload),
                     })
                        .then(response => response.json())
                        .then(data => {
                           console.log('Disaster data:', data);
                        })
                        .catch(error => {
                           console.error('Error adding disaster:', error);
                        });
                  }

                  console.log('Subhubs:', subhubs);
               })
               .catch(error => {
                  console.error('Error fetching subhubs:', error);
               });

      // const formattedAddress = address.replace(/\s+/g, '+');
      // fetchLngLat(formattedAddress).then((data) => {
      //    console.log(data)
      //     try {
      //       lat = Number(data[0].lat);
      //       lng = Number(data[0].lon);
      //       if (lat === 0 && lng === 0) {
      //          throw new Error('Error fetching latitude and longitude');
      //       }
      //       console.log(lat, lng);


      //       // now look at each sub hub and make /disasters calls to each
      //     } catch (error) {
      //       // console.error(error.message);
      //       alert("Error fetching longitude and latitude from Address.. Are you sure the address is entered correctly?");
      //       return;
      //     }
      // });

      // type DisasterData = {
      //    id: string;
      //    ip: string;
      //    latitude: number;
      //    longitude: number;
      //    name: string;
      //    port: string;
      //    radius_km: string;
      //    disasterType: string;
      // };

      // let disasterData: DisasterData[] = [];
      // fetch('http://40.233.92.183:3000/add_new_disaster', {
      //    method: 'POST',
      //    headers: {
      //    'Content-Type': 'application/json',
      //    },
      //    body: JSON.stringify({
      //       radius_km: radius,
      //       longitude: lng,
      //       latitude: lat,
      //       disasterType: disasterType,
      //       name: name,
      //       description: description,
      //    }),
      // }).then((response) => {
      //    response.json().then((data) => {
      //    disasterData = data;
      //    console.log('disasterData', disasterData);
      //    });
      // });
   }

   return (
      <div className="w-100 border-2 rounded-xl p-4 flex flex-col gap-4">
         <h1 className="text-lg font-semibold text-red-500">
            Report a Disaster Near You
         </h1>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
         >
            <div className="flex flex-col gap-1">
               <Label htmlFor="address">Address</Label>
               <div className="flex gap-2">
                 <input
                   {...register('address')}
                   type="text"
                   name="address"
                   className="border p-1 rounded-lg flex-grow"
                 />
                 <Button
                   type="button"
                   onClick={() => {
                     if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                           (position) => {
                              const { latitude, longitude } = position.coords;
                              console.log('Latitude:', latitude, 'Longitude:', longitude);
                           },
                           (error) => {
                              console.error('Error getting location:', error);
                           }
                        );
                     } else {
                        console.error('Geolocation is not supported by this browser.');
                     }
                   }}
                 >
                   Get My Location
                 </Button>
               </div>
            </div>

            <div className="flex flex-col gap-1">
               <Label htmlFor="longitude">Longitude</Label>
               <input
                  {...register('longitude')}
                  type="text"
                  name="longitude"
                  className="border p-1 rounded-lg"
               />
            </div>

            <div className="flex flex-col gap-1">
               <Label htmlFor="latitude">Latitude</Label>
               <input
                  {...register('latitude')}
                  type="text"
                  name="latitude"
                  className="border p-1 rounded-lg"
               />
            </div>

            <div className="flex flex-col gap-1">
               <Label htmlFor="disasterType">Disaster Type</Label>
               <select
                  {...register('disasterType')}
                  name="disasterType"
                  className="border p-1 rounded-lg"
               >
                  <option value="manmade">Manmade</option>
                  <option value="natural">Natural</option>
                  <option value="disease">Disease</option>
               </select>
            </div>

            <div className="flex flex-col gap-1">
               <Label htmlFor="name">Name</Label>
               <input
                  {...register('name')}
                  type="text"
                  name="name"
                  className="border p-1 rounded-lg"
               />
            </div>

            <div className="flex flex-col gap-1">
               <Label htmlFor="name">Description</Label>
               <input
                  {...register('description')}
                  type="text"
                  name="description"
                  className="border p-1 rounded-lg"
               />
            </div>

            <div className="flex flex-col gap-1">
               <Label htmlFor="radius">Radius</Label>
               <select
                 {...register('radius')}
                 name="radius"
                 className="border p-1 rounded-lg"
               >
                 <option value="1">1 km</option>
                 <option value="5">5 km</option>
                 <option value="10">10 km</option>
                 <option value="50">50 km</option>
                 <option value="100">100 km</option>
                 <option value="1000">100000 km</option>
               </select>
            </div>

            <Button type="submit">Submit</Button>

         {errors.address && <span className="text-red-500">Address is required</span>}
         {errors.disasterType && <span className="text-red-500">Disaster type is required</span>}
         </form>
      </div>
   );
}
