import EnterAddress from '@/components/forms/EnterAddress';
import React from 'react';

export default function FindDisastersPage() {
   return (
      <div className="my-10 flex flex-col items-center">
         <h1 className="text-center text-2xl font-bold text-red-500 mb-10">
            Disaster Tracker
         </h1>
         <EnterAddress />
      </div>
   );
}
