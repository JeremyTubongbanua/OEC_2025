import Link from 'next/link';

import Image from 'next/image';

export default function Navbar() {
   return (
      <nav className="flex justify-between items-center py-2 border-b font-mono w-full px-40">
         <Link href={'/'} className="flex items-center">
            <Image
               src={'/NDCTracker.png'}
               alt="NDC Tracker"
               width={75}
               height={75}
            />
            <div>
               <h1 className="text-2xl font-bold">NDC Tracker</h1>
               <p className="text-sm">National Disaster Canada Tracker</p>
            </div>
         </Link>

         <div className="flex items-center gap-6">
            <Link href="/" className="mr-4  hover:underline">
               Home
            </Link>
            <Link href="/disasters" className="mr-4 hover:underline">
               Find Disasters
            </Link>
            <Link href="/report" className="mr-4 hover:underline">
               Report a Disaster
            </Link>
            <Link href="/admin" className="mr-4 hover:underline">
               Admin
            </Link>
         </div>
      </nav>
   );
}
