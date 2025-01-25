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

const enterAddressSchema = z.object({
   address: z.string(),
   radius: z.string(),
   //    province: z.string(),
   //    city: z.string(),
   //    postalCode: z.string(),
});

export default function EnterAddress() {
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

   function onSubmit(data: { address: string; radius: string }) {
      setDisasters([]);
      const address = data.address;
      const radius = data.radius;

      let lat = 0;
      let lng = 0;

      const formattedAddress = address.replace(/\s+/g, '+');
      fetchLngLat(formattedAddress).then((data) => {
         lat = Number(data[0].lat);
         lng = Number(data[0].lon);
         setLat(lat);
         setLng(lng);
         console.log(lat, lng);
      });

      type JeremyData = {
         id: string;
         ip: string;
         latitude: number;
         longitude: number;
         name: string;
         port: string;
         radius_km: string;
      };

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
                           setDisasters((prev) => [...prev, disaster]);
                        });
                     });
                  }
               );
            });
         });
      });

      //! Call disaster API -> get a list of disasters and associated area
   }

   console.log(disasters);
   return (
      <div className="w-full border-2 rounded-xl p-4 flex flex-col gap-4">
         <h1 className="text-lg font-semibold text-red-500">
            Enter an Address to Find Disasters Near You
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

         <div className="flex flex-col gap-10 items-center">
            {disasters.length != 0 && (
               <>
                  <div className="w-full bg-muted p-4 border rounded-lg">
                     <h2 className="text-lg font-semibold text-red-500">
                        Found Disasters:
                     </h2>
                     <div className="grid grid-cols-4 gap-4 mt-4">
                        {disasters.map((disaster) => (
                           <DisasterDisplay
                              disaster={disaster}
                              key={disaster.name}
                           />
                        ))}
                     </div>
                  </div>

                  <Map position={[lat, lng]} disasters={disasters} />
               </>
            )}
         </div>
      </div>
   );
}
