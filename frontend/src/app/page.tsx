import EnterAddress from '@/components/forms/EnterAddress';
import GetUserLocation from '@/components/location/GetUserLocation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
   return (
      <div className="flex flex-col items-center ">
         <div className="my-10">
            <p className="text-lg mb-4">
               Welcome to the Canadian Government's Natural Disaster Information
               Portal. Our mission is to provide accurate and timely information
               about natural disasters affecting Canada. We aim to help citizens
               stay informed and prepared for any natural disaster events.
            </p>
            <h2 className="text-2xl font-bold mb-2">Our Goals</h2>
            <ul className="list-disc list-inside mb-4">
               <li>Provide up-to-date information on natural disasters</li>
               <li>Educate the public on disaster preparedness</li>
               <li>Support communities in disaster recovery efforts</li>
            </ul>
            <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
            <p className="text-lg">
               If you have any questions or need further information, please
               contact us at{' '}
               <a
                  href="mailto:info@canadiangov.ca"
                  className="text-blue-500 underline"
               >
                  info@canadiangov.ca
               </a>
               .
            </p>
         </div>

         <div className="flex gap-10">
            <Link
               href={'/report'}
               className="bg-red-400 hover:bg-red-500 duration-300 transition-all text-lg font-semibold p-4 rounded-lg"
            >
               Report a Disaster
            </Link>
            <Link
               href={'/disasters'}
               className="bg-green-400 hover:bg-green-500 duration-300 transition-all text-lg font-semibold p-4 rounded-lg"
            >
               Disasters Near You
            </Link>
         </div>
      </div>
   );
}
