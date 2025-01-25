import GetUserLocation from '@/components/location/GetUserLocation';
import Link from 'next/link';

export default function Home() {
   return (
      <div className=" bg-gray-50">
         {/* Main header section */}
         <div className="bg-[#26374a] text-white py-10">
            <div className="max-w-7xl mx-auto px-8">
               <h1 className="text-4xl font-bold mb-6">
                  National Disaster Canada Tracker Information Portal
               </h1>
               <p className="text-xl max-w-3xl">
                  Welcome to the National Disaster Canada Tracker Portal. Our
                  mission is to provide accurate and timely information about
                  natural disasters affecting Canada by utilzing accurate
                  information provided by the public.
               </p>
            </div>
         </div>
         {/* Grid for the Key features and the Mission */}
         <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Section */}
            <div className="bg-white rounded-lg shadow-sm p-8">
               <h2 className="text-[#284162] text-2xl font-bold mb-6 border-b pb-4">
                  Our Mission
               </h2>
               <ul className="space-y-4 mb-8 text-gray-700">
                  <li className="flex items-center">
                     <span className="bg-[#7f7f7f] h-2 w-2 rounded-full mr-3"></span>
                     Allows for reporting of disasters and sending of warnings
                     to other users based on geographical location
                  </li>
                  <li className="flex items-center">
                     <span className="bg-[#7f7f7f] h-2 w-2 rounded-full mr-3"></span>
                     Allows for new disasters to be added and modified by the
                     community.
                  </li>
                  <li className="flex items-center">
                     <span className="bg-[#7f7f7f] h-2 w-2 rounded-full mr-3"></span>
                     Tracking of disasters and displaying data on disasters in
                     an easy to read method.
                  </li>
               </ul>
            </div>

            {/* Key Features: Lists features that are neccesary */}
            <div className="bg-white rounded-lg shadow-sm p-8">
               <h2 className="text-[#284162] text-2xl font-bold mb-6 border-b pb-4">
                  Key Features
               </h2>
               <ul className="space-y-4 mb-8 text-gray-700">
                  <li className="flex items-center">
                     <span className="bg-[#7f7f7f] h-2 w-2 rounded-full mr-3"></span>
                     Real-time Disaster Tracking and Monitoring
                  </li>
                  <li className="flex items-center">
                     <span className="bg-[#7f7f7f] h-2 w-2 rounded-full mr-3"></span>
                     Geographic-based Alert System
                  </li>
                  <li className="flex items-center">
                     <span className="bg-[#7f7f7f] h-2 w-2 rounded-full mr-3"></span>
                     Community-driven Reporting, Removing and Editing tools
                  </li>
                  <li className="flex items-center">
                     <span className="bg-[#7f7f7f] h-2 w-2 rounded-full mr-3"></span>
                     Interactive Disaster Maps
                  </li>
               </ul>
            </div>
         </div>
         {/* Buttons for Reporting and checking Disasters near you */}
         <div className="max-w-7xl mx-auto px-8 pb-12">
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
               <Link
                  href="/report"
                  className="bg-[#d3080c] hover:bg-[#af1f23] text-white px-8 py-4 rounded font-semibold text-center transition-colors duration-200"
               >
                  Report a Disaster
               </Link>
               <Link
                  href="/disasters"
                  className="bg-[#318000] hover:bg-[#1d4d00] text-white px-8 py-4 rounded font-semibold text-center transition-colors duration-200"
               >
                  Disasters Near You
               </Link>
            </div>
         </div>
      </div>
   );
}
