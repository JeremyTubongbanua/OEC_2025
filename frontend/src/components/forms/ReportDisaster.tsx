'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Label } from '../ui/label';

const reportDisasterSchema = z.object({
   address: z.string(),
   radius: z.string(),
   disasterType: z.string(),
   name: z.string(),
   description: z.string(),
   longitude: z.number(),
   latitude: z.number(),
});

export default function ReportDisaster() {
   const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
   } = useForm({
      resolver: zodResolver(reportDisasterSchema),
      defaultValues: {
         address: '1280 Main St W, Hamilton, ON L8S 4L8',
         radius: '100',
         disasterType: 'natural',
         name: 'Earthquake',
         description: '123',
         longitude: -79.9226783,
         latitude: 43.2609974,
      },
   });

   // function to handle form submission

   function onSubmit(data: {
      name: string;
      description: string;
      address: string;
      radius: string;
      disasterType: string;
      longitude: number;
      latitude: number;
   }) {
      const disasterType = data.disasterType;
      const name = data.name;
      const description = data.description;
      const address = data.address;
      const radius = data.radius;
      const longitude = data.longitude;
      const latitude = data.latitude;

      // fetch subhubs
      let get_subhubs_url = `http://40.233.92.183:3000/get_subhubs?radius_km=${radius}&longitude=${longitude}&latitude=${latitude}`;

      fetch(get_subhubs_url)
         .then((response) => response.json())
         .then((data) => {
            // console.log('Subhubs data:', data);
            let subhubs = data;

            // for each subhub, make a /disasters call
            for (let i = 0; i < subhubs.length; i++) {
               let subhub = subhubs[i];
               let add_new_disaster_url = `http://${subhub.ip}:${subhub.port}/add_new_disaster`;
               let payload = {
                  disaster_id:name,
                  disaster_type: disasterType,
                  name: name,
                  description: description,
                  longitude: longitude,
                  latitude: latitude,
                  radius_km: radius,
               };

               // put request
               fetch(add_new_disaster_url, {
                  method: 'POST',
                  headers: {
                     'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(payload),
               })
                  .then((response) => response.json())
                  .then((data) => {
                     console.log('Disaster data:', data);
                  })
                  .catch((error) => {
                     console.error('Error adding disaster:', error);
                  });
            }

            console.log('Subhubs:', subhubs);
         })
         .catch((error) => {
            console.error('Error fetching subhubs:', error);
         });
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
                        console.log('click');
                        if (navigator.geolocation) {
                           navigator.geolocation.getCurrentPosition(
                              (position) => {
                                 console.log(
                                    'Latitude:',
                                    position.coords.latitude,
                                    'Longitude:',
                                    position.coords.longitude
                                 );
                                 setValue('latitude', position.coords.latitude);
                                 setValue(
                                    'longitude',
                                    position.coords.longitude
                                 );
                              },
                              (error) => {
                                 console.error(
                                    'Error getting location:',
                                    error
                                 );
                              }
                           );
                        } else {
                           console.error(
                              'Geolocation is not supported by this browser.'
                           );
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

            {errors.address && (
               <span className="text-red-500">Address is required</span>
            )}
            {errors.disasterType && (
               <span className="text-red-500">Disaster type is required</span>
            )}
         </form>
      </div>
   );
}
