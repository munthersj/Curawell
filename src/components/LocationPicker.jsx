/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ✅ Fix default marker icon paths across Vite/CRA/Next
const DefaultIcon = L.icon({
  iconRetinaUrl: new URL(
    "leaflet/dist/images/marker-icon-2x.png",
    import.meta.url
  ).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url)
    .href,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -32],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Helper: pan map when center changes
function FlyTo({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, zoom, { duration: 0.6 });
  }, [center, zoom, map]);
  return null;
}

// Helper: pick coords by clicking on map
function ClickToPick({ onPick }) {
  useMapEvents({
    click(e) {
      onPick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

export default function LocationPicker({
  initialLat = 33.5138,
  initialLon = 36.2765,
  initialZoom = 14,
  height = 380,
  onChange, // (value: {lat, lon, address})
  className = "",
}) {
  const [center, setCenter] = useState([initialLat, initialLon]);
  const [markerPos, setMarkerPos] = useState([initialLat, initialLon]);
  const [zoom, setZoom] = useState(initialZoom);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [address, setAddress] = useState("");
  const abortRef = useRef(null);

  // 🚀 forward selection to parent
  useEffect(() => {
    if (typeof onChange === "function") {
      onChange({ lat: markerPos[0], lon: markerPos[1], address });
    }
  }, [markerPos, address, onChange]);

  // 🔎 search places via Nominatim (free)
  useEffect(() => {
    if (!query || query.trim().length < 3) {
      setResults([]);
      return;
    }
    const controller = new AbortController();
    abortRef.current?.abort();
    abortRef.current = controller;

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      query
    )}&limit=5`;
    fetch(url, {
      signal: controller.signal,
      headers: {
        "Accept-Language": "en",
        "User-Agent": "Curawell-LocationPicker/1.0 (demo)",
      },
    })
      .then((r) => r.json())
      .then((data) => {
        const rows = (data || []).map((d) => ({
          lat: parseFloat(d.lat),
          lon: parseFloat(d.lon),
          label: d.display_name,
        }));
        setResults(rows);
      })
      .catch(() => {});

    return () => controller.abort();
  }, [query]);

  const selectSearchResult = (item) => {
    const pos = [item.lat, item.lon];
    setCenter(pos);
    setMarkerPos(pos);
    setAddress(item.label);
    setResults([]);
  };

  // 📍 Use browser geolocation
  const useMyLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const p = [pos.coords.latitude, pos.coords.longitude];
        setCenter(p);
        setMarkerPos(p);
        setAddress("My current location");
      },
      () => {},
      { enableHighAccuracy: true, timeout: 6000 }
    );
  };

  // 🧭 Nice tiles (neutral / like Google)
  const tileUrl =
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
  const attrib = "&copy; OpenStreetMap contributors &copy; CARTO";

  const containerStyle = useMemo(
    () => ({ height, width: "100%", borderRadius: "12px", overflow: "hidden" }),
    [height]
  );

  return (
    <div className={`w-full ${className}`}>
      {/* Top controls */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center mb-3">
        <div className="relative md:flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a place (min 3 letters)"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#972e6a]"
          />
          {results.length > 0 && (
            <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
              {results.map((r, i) => (
                <li
                  key={`${r.lat}-${r.lon}-${i}`}
                  onClick={() => selectSearchResult(r)}
                  className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-50"
                >
                  {r.label}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          type="button"
          onClick={useMyLocation}
          className="rounded-lg bg-[#972e6a] px-4 py-2 text-white hover:bg-[#88285f] active:scale-[.98]"
        >
          Use my location
        </button>
      </div>

      {/* Map */}
      <MapContainer
        center={center}
        zoom={zoom}
        style={containerStyle}
        scrollWheelZoom={true}
        className="shadow-[0_12px_28px_rgba(0,0,0,.08)] ring-1 ring-black/5"
      >
        <TileLayer
          attribution={attrib}
          url={tileUrl}
          subdomains={["a", "b", "c", "d"]}
          maxZoom={19}
        />
        <FlyTo center={center} zoom={zoom} />
        <ClickToPick
          onPick={(p) => {
            setMarkerPos(p);
            setCenter(p);
          }}
        />

        <Marker
          position={markerPos}
          draggable
          eventHandlers={{
            dragend: (e) => {
              const m = e.target;
              const pos = m.getLatLng();
              setMarkerPos([pos.lat, pos.lng]);
            },
          }}
        >
          <Popup>
            <div className="text-sm">
              <div className="font-semibold">Selected location</div>
              <div>Lat: {markerPos[0].toFixed(6)}</div>
              <div>Lon: {markerPos[1].toFixed(6)}</div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Selected preview */}
      <div className="mt-3 rounded-md border border-gray-200 bg-gray-50 p-3 text-sm">
        <div className="font-semibold text-gray-800">Picked:</div>
        <div className="text-gray-700">
          Lat: {markerPos[0].toFixed(6)} — Lon: {markerPos[1].toFixed(6)}
        </div>
        {address && <div className="text-gray-600 truncate">{address}</div>}
      </div>

      {/* Example wiring to Redux (pseudo) */}
      {/*
        // داخل الأب:
        const onPick = ({lat, lon, address}) => dispatch(updateLocation({lat, lon, address}))
        <LocationPicker onChange={onPick} />
      */}
    </div>
  );
}
