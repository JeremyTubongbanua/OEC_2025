import { ReactNode } from 'react';
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '../ui/card';
import { useForm } from 'react-hook-form';

interface Disaster {
   name: string;
   description: string;
   radius_km: string;
   longitude: string;
   latitude: string;
   disaster_type: string;
}

interface DisasterDisplayProps {
   disaster: Disaster;
}

export default function DisasterRemove({
   disaster,
}: DisasterDisplayProps): ReactNode {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({});

   return (
      <Card key={disaster.name}>
         <form>
            <CardHeader>
               <CardTitle>
                  <span className="text-xl underline">{disaster.name}</span>
               </CardTitle>
               <CardDescription>
                  <span className="text-red-400">{disaster.description}</span>
               </CardDescription>
            </CardHeader>
            <CardContent>
               <p>
                  <span className="underline font-semibold">
                     Disaster Type:
                  </span>{' '}
                  {disaster.disaster_type}
               </p>
               <p>
                  <span className="underline font-semibold">Radius:</span>{' '}
                  {disaster.radius_km} km
               </p>
               <p>
                  <span className="underline font-semibold">Longitude:</span>{' '}
                  {disaster.longitude}
               </p>
               <p>
                  <span className="underline font-semibold">Latitude:</span>{' '}
                  {disaster.latitude}
               </p>
            </CardContent>
         </form>
      </Card>
   );
}