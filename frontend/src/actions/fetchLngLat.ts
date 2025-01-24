import { NextApiRequest, NextApiResponse } from 'next';

export default async function fetchLngLat(
   formattedAddress: string
): Promise<any> {
   const response = await fetch(
      `https://geocode.maps.co/search?q=${formattedAddress}&api_key=6794007c8da2c087992317qird44646`
   );

   if (!response.ok) {
      return 'error';
   }

   const data = await response.json();
   console.log(data);
   return data;
}
