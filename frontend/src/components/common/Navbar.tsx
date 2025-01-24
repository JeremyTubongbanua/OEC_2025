import Link from 'next/link';

export default function Navbar() {
   return (
      <nav className="flex justify-between items-center py-4 border-b font-mono w-full px-40">
         <Link href={'/'}>LOGO HERE</Link>

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
         </div>
      </nav>
   );
}
