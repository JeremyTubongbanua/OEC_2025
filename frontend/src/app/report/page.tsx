import ReportDisaster from '@/components/forms/ReportDisaster';
import React from 'react';

export default function ReportDisastersPage() {
   return (
      <div className="">
         <h1 className="text-center my-10 text-2xl font-semibold text-red-500 underline">
            Report a disaster
         </h1>
         <ReportDisaster />
      </div>
   );
}
