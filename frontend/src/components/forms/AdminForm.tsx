'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Label } from '../ui/label';
import { Radius } from 'lucide-react';
import { useState, useTransition } from 'react';
import fetchLngLat from '@/actions/fetchLngLat';
import DisasterDisplay from '../common/DisasterDisplay';

import Map from '@/components/map';
import MapMarker from '/public/map-marker.svg';
import DisasterRemove from '../common/DisasterRemove';

// enterAddressSchema
const enterAddressSchema = z.object({
   address: z.string(),
   radius: z.string(),
   //    province: z.string(),
   //    city: z.string(),
   //    postalCode: z.string(),
});

// AdminForm component
export default function AdminForm() {
   const [disasters, setDisasters] = useState<any[]>([]);
   const [lng, setLng] = useState(0);
   const [lat, setLat] = useState(0);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: zodResolver(enterAddressSchema),
      defaultValues: {
         address: '',
         radius: '100',
         //  province: '',
         //  city: '',
         //  postalCode: '',
      },
   });

   // function to handle form submission
   function onSubmit(data: { address: string; radius: string }) {
      setDisasters([]);
      const address = data.address;
      const radius = data.radius;

      let latdummy = 0;
      let lngdummy = 0;

      // fetch longitude and latitude
      const formattedAddress = address.replace(/\s+/g, '+');
      fetchLngLat(formattedAddress).then((data) => {
         latdummy = Number(data[0].lat);
         lngdummy = Number(data[0].lon);
         setLat(latdummy);
         setLng(lngdummy);
         console.log(lat, lng);
      });

      // fetch subhubs
      type JeremyData = {
         id: string;
         ip: string;
         latitude: number;
         longitude: number;
         name: string;
         port: string;
         radius_km: string;
      };

      // console.log(lat, lng);
      fetch(
         `http://40.233.92.183:3000/get_subhubs?radius_km=${radius}&longitude=${lng}&latitude=${lat}`
      ).then((response) => {
         response.json().then((data) => {
            const jeremydata: JeremyData[] = data;

            jeremydata.forEach(({ port, name }) => {
               fetch(`http://40.233.92.183:${port}/disasters`).then(
                  (response) => {
                     response.json().then((data) => {
                        console.log(`Disasters for subhub ${name}:`, data);
                        const disasterDataArray = data.disasters;

                        disasterDataArray.forEach((disaster) => {
                           setDisasters((prev) => [
                              ...prev,
                              { ...disaster, port },
                           ]);
                        });
                     });
                  }
               );
            });
         });
      });
   }

   console.log(disasters);
   console.log(lat, lng);

   return (
      <div className="w-full border-2 rounded-xl p-4 flex flex-col gap-4">
         <h1 className="text-lg font-semibold text-green-500">
            Use an Address to Retrieve disasters in That Area
         </h1>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
         >
            <div className="flex flex-col gap-1">
               <Label htmlFor="address">Address</Label>
               <input
                  {...register('address')}
                  type="text"
                  name="address"
                  className="border p-1  rounded-lg"
                  required
               />
            </div>
            <div className="flex flex-col gap-1">
               <Label htmlFor="radius">Radius</Label>
               <input
                  {...register('radius')}
                  type="text"
                  name="radius"
                  className="border p-1 rounded-lg"
                  required
               />
            </div>

            <Button type="submit">Submit</Button>
         </form>

         <div className="flex flex-col gap-6">
            {disasters.length > 0 &&
               disasters.map((disaster) => (
                  <DisasterRemove key={disaster.name} disaster={disaster} />
               ))}
         </div>
      </div>
   );
}
