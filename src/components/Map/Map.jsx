import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";
import useUrlLocation from "../../hooks/useUrlLocation";

function Map({ markerLocations = [] }) {
  const [mapCenter, setMapCenter] = useState([52.3676, 4.9041]);
  const [lat, lng] = useUrlLocation();

  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeoLocation();

  useEffect(() => {
    if (lat !== null && lng !== null) {
      setMapCenter([lat, lng]);
    }
  }, [lat, lng]);

  useEffect(() => {
    if (geoLocationPosition?.lat && geoLocationPosition?.lng) {
      setMapCenter([geoLocationPosition.lat, geoLocationPosition.lng]);
    }
  }, [geoLocationPosition]);

  return (
    <div className="relative h-[42vh] min-h-[300px] overflow-hidden rounded-[2rem] border border-stone-200 bg-sage shadow-md lg:h-full lg:min-h-0">
      <MapContainer
        className="h-full w-full"
        center={mapCenter}
        zoom={11}
        scrollWheelZoom={true}
      >
        <button onClick={getPosition} className="absolute bottom-5 left-5 z-[1000] rounded-2xl border border-stone-200 bg-white px-4 py-3 text-xs font-bold text-ink shadow-lg transition hover:bg-sage focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 disabled:cursor-wait disabled:opacity-60" disabled={isLoadingPosition}>
          {isLoadingPosition ? "Finding you..." : "Use my location"}
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DetectClick />
        <ChangeCenter position={mapCenter} />
        {markerLocations.map((item) => (
          <Marker key={item.id} position={[Number(item.latitude), Number(item.longitude)]}>
            <Popup>{item.host_location}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;

function ChangeCenter({ position }) {
  const map = useMap();

  useEffect(() => {
    map.setView(position);
  }, [map, position]);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvent({
    click: (event) => navigate(`/bookmark/add?lat=${event.latlng.lat}&lng=${event.latlng.lng}`),
  });

  return null;
}
