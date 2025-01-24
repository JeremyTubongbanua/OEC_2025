import 'leaflet/dist/leaflet.css';
import { Circle, MapContainer, TileLayer } from 'react-leaflet';

interface MapProps {
   position: [number, number];
}

function Map({ position }: MapProps) {
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

         <Circle
            center={position}
            radius={1000}
            color="red"
            fillColor="red"
            fillOpacity={0.2}
         />
      </MapContainer>
   );
}

export default Map;
