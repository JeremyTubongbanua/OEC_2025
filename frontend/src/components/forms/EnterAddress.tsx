'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Label } from '../ui/label';
import { Radius } from 'lucide-react';

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

   function onSubmit(data) {
      const formData = new FormData();
      formData.append('address', data.address);

      console.log(data.address);
   }

   return (
      <div className="w-60 border-2 rounded-xl p-2">
         <h1 className="text-lg font-semibold text-red-500">
            Enter Address to Find Location:
         </h1>
         <form onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor="address">Address</Label>
            <input
               {...register('address')}
               type="text"
               name="address"
               className="border p-1"
            />
            <Label htmlFor="radius">Radius</Label>
            <input
               {...register('radius')}
               type="text"
               name="radius"
               className="border p-1"
            />

            <Button type="submit">Submit</Button>
         </form>
      </div>
   );
}
