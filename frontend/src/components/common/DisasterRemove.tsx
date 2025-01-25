import { ReactNode } from 'react';
import { Card } from '../ui/card';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

// Disaster interface
interface Disaster {
   disaster_id: string;
   name: string;
   description: string;
   radius_km: string;
   longitude: string;
   latitude: string;
   disaster_type: string;
   port: string;
}

// DisasterDisplayProps interface
interface DisasterDisplayProps {
   disaster: Disaster;
}

// adminDisasterSchema
const adminDisasterSchema = z.object({
   disaster_id: z.string(),
   name: z.string(),
   description: z.string(),
   disaster_type: z.string(),
   longitude: z.string(),
   latitude: z.string(),
   radius: z.string(),
});

// DisasterRemove component
export default function DisasterRemove({
   disaster,
}: DisasterDisplayProps): ReactNode {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: zodResolver(adminDisasterSchema),
      defaultValues: {
         disaster_id: disaster.disaster_id,
         name: disaster.name,
         description: disaster.description,
         disaster_type: disaster.disaster_type,
         longitude: disaster.longitude,
         latitude: disaster.latitude,
         radius: disaster.radius_km,
      },
   });

   async function onSubmit(data: {
      disaster_id: string;
      name: string;
      description: string;
      disaster_type: string;
      longitude: string;
      latitude: string;
      radius: string;
   }) {
      console.log(data);
      const response = await fetch(
         `http://40.233.92.183:${disaster.port}/edit_disaster`,
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               disaster_id: data.disaster_id,
               disaster_type: data.disaster_type,
               name: data.name,
               description: data.description,
               longitude: data.longitude,
               latitude: data.latitude,
               radius_km: data.radius,
            }),
         }
      );

      if (response.ok) {
         alert('Disaster edited successfully');
      } else {
         alert('Failed to edit disaster');
      }
   }

   return (
      <Card key={disaster.name}>
         <form
            className="p-4 grid grid-cols-2 gap-2"
            onSubmit={handleSubmit(onSubmit)}
         >
            <div className="flex flex-col col-span-2">
               <Label className="font-semibold text-[14px] text-red-500">
                  Disaster ID:
               </Label>
               <input
                  {...register('disaster_id')}
                  className="p-1 border rounded-lg border-black "
                  readOnly
               />
            </div>
            <div className="flex flex-col">
               <Label className="font-semibold text-[14px] text-red-500">
                  Disaster Name:
               </Label>
               <input
                  {...register('name')}
                  className="p-1 border rounded-lg text-muted-foreground "
               />
            </div>
            <div className="flex flex-col">
               <Label className="font-semibold text-[14px]">Description:</Label>
               <input
                  {...register('description')}
                  className="p-1 border rounded-lg text-muted-foreground "
               />
            </div>

            <div className="flex flex-col">
               <Label className="font-semibold text-[14px]">
                  Disaster Type:
               </Label>
               <select
                  {...register('disaster_type')}
                  className="p-1  border rounded-lg text-muted-foreground "
               >
                  <option value="manmade">Manmade</option>
                  <option value="natural">Natural</option>
                  <option value="biological">Biological</option>
               </select>
            </div>
            <div className="flex flex-col">
               <Label className="font-semibold text-[14px]">Radius:</Label>
               <input
                  {...register('radius')}
                  className="p-1 border rounded-lg text-muted-foreground "
               />
            </div>

            <div className="flex flex-col">
               <Label className="font-semibold text-[14px]">Latitude:</Label>
               <input
                  {...register('latitude')}
                  className="p-1 border rounded-lg text-muted-foreground "
               />
            </div>
            <div className="flex flex-col">
               <Label className="font-semibold text-[14px]">Latitude:</Label>
               <input
                  {...register('longitude')}
                  className="p-1 border rounded-lg text-muted-foreground "
               />
            </div>

            <div className="flex col-span-2 gap-2 mt-4">
               <Button
                  className="col-span-1 bg-blue-500 w-full hover:bg-blue-600 duration-300 transition-all"
                  type="submit"
               >
                  Edit
               </Button>
               <Button
                  className="col-span-1 bg-red-500 w-full hover:bg-red-600 duration-300 transition-all"
                  type="button"
                  onClick={async () => {
                     const response = await fetch(
                        `http://40.233.92.183:${disaster.port}/remove_disaster`,
                        {
                           method: 'POST',
                           headers: {
                              'Content-Type': 'application/json',
                           },
                           body: JSON.stringify({
                              disaster_id: disaster.disaster_id,
                           }),
                        }
                     );

                     if (response.ok) {
                        alert('Disaster removed successfully');
                     } else {
                        alert('Failed to remove disaster');
                     }
                  }}
               >
                  Delete
               </Button>
            </div>
         </form>
      </Card>
   );
}
