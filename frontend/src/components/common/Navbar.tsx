import Link from 'next/link';

export default function Navbar() {
   return (
      <nav className="flex justify-between items-center py-4 border-b font-mono w-full px-40">
         <Link href={'/'}>LOGO HERE</Link>

         <div>
            <Link href="/login" className="mr-4">
               Login
            </Link>
            <Link href="/signup" className="mr-4">
               Signup
            </Link>
            <Link href="/dashboard" className="mr-4">
               About
            </Link>
         </div>
      </nav>
   );
}
