import 'leaflet/dist/leaflet.css';
import { Circle, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

interface Disaster {
   name: string;
   latitude: string;
   longitude: string;
   radius_km: string;
   disaster_type: string;
}

interface MapProps {
   position: [number, number];
   disasters: any[];
}

function Map({ position, disasters }: MapProps) {
   return (
      <MapContainer
         center={position as [number, number]}
         zoom={13}
         style={{ height: '100vh', width: '100%' }}
      >
         <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         />

         {disasters.map((disaster) => (
            <>
               <Circle
                  center={
                     [
                        Number(disaster.latitude),
                        Number(disaster.longitude),
                     ] as [number, number]
                  }
                  radius={1000}
                  key={disaster.name}
                  pathOptions={{ color: 'red' }}
               />
               <Marker
                  position={
                     [
                        Number(disaster.latitude),
                        Number(disaster.longitude),
                     ] as [number, number]
                  }
                  icon={L.icon({
                     iconUrl: '/map-marker.svg',
                     iconSize: [25, 41],
                     iconAnchor: [12, 41],
                  })}
               >
                  <Popup>
                     <h3>{disaster.name}</h3>
                     <p>{disaster.disaster_type}</p>
                  </Popup>
               </Marker>
            </>
         ))}
      </MapContainer>
   );
}

export default Map;
