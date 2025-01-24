'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Label } from '../ui/label';
import { Radius } from 'lucide-react';
import { useTransition } from 'react';
import fetchLngLat from '@/actions/fetchLngLat';

const enterAddressSchema = z.object({
   address: z.string(),
   radius: z.string(),
   //    province: z.string(),
   //    city: z.string(),
   //    postalCode: z.string(),
});

export default function EnterAddress() {
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
      const address = data.address;
      const radius = data.radius;

      let lat = 0;
      let lng = 0;

      const formattedAddress = address.replace(/\s+/g, '+');
      fetchLngLat(formattedAddress).then((data) => {
         lat = Number(data[0].lat);
         lng = Number(data[0].lon);
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

      let jeremydata: JeremyData[] = [];
      fetch(
         `http://40.233.92.183:3000/get_subhubs?radius_km=${radius}&longitude=${lng}&latitude=${lat}`
      ).then((response) => {
         response.json().then((data) => {
            jeremydata = data;
            console.log('jeremy', jeremydata);
         });
      });

      //! Call disaster API -> get a list of disasters and associated area
      jeremydata.forEach((item: any) => {
         fetch(`http://40.233.92.183:${item.port}/disasters`);
      });
   }
   return (
      <div className="w-100 border-2 rounded-xl p-4 flex flex-col gap-4">
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
               />
            </div>
            <div className="flex flex-col gap-1">
               <Label htmlFor="radius">Radius</Label>
               <input
                  {...register('radius')}
                  type="text"
                  name="radius"
                  className="border p-1 rounded-lg"
               />
            </div>

            <Button type="submit">Submit</Button>
         </form>
      </div>
   );
}
