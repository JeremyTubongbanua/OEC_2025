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
         disasterType: '',
      },
   });

   function onSubmit(data: {
      address: string;
      radius: string;
      disasterType: string;
   }) {
      const address = data.address;
      const radius = data.radius;
      const disasterType = data.disasterType;

      let lat = 0;
      let lng = 0;

      const formattedAddress = address.replace(/\s+/g, '+');
      fetchLngLat(formattedAddress).then((data) => {
         lat = Number(data[0].lat);
         lng = Number(data[0].lon);
         console.log(lat, lng);
      });

      type DisasterData = {
         id: string;
         ip: string;
         latitude: number;
         longitude: number;
         name: string;
         port: string;
         radius_km: string;
         disasterType: string;
      };

      let disasterData: DisasterData[] = [];
      fetch(
         `http://40.233.92.183:3000/report_disaster?radius_km=${radius}&longitude=${lng}&latitude=${lat}&disasterType=${disasterType}`
      ).then((response) => {
         response.json().then((data) => {
            disasterData = data;
            console.log('disasterData', disasterData);
         });
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
               <input
                  {...register('address')}
                  type="text"
                  name="address"
                  className="border p-1 rounded-lg"
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

            <Button type="submit">Submit</Button>
         </form>
      </div>
   );
}
