import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// ✅ إصلاح مسارات أيقونة الـ Marker عبر جميع bundlers (Vite/CRA/Next)
// نستخدم import.meta.url لضمان توليد URL صحيح داخل build
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
L.Marker.prototype.options.icon = DefaultIcon; // عيّنها كأيقونة افتراضية

export default function ClinicMap({ lat, lon, zoom = 15, className = "" }) {
  const center = [lat, lon];
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className={className}
      style={{ height: 380, width: "100%", borderRadius: "12px" }}
      scrollWheelZoom={false}
    >
      {/* 🎨 بلاطات فاتحة ومحايدة (قريبة من جوجل) */}
      <TileLayer
        attribution="&copy; OpenStreetMap contributors &copy; CARTO"
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        subdomains={["a", "b", "c", "d"]}
        maxZoom={19}
      />

      <Marker position={center}>
        <Popup>عيادتنا هنا 📍</Popup>
      </Marker>
    </MapContainer>
  );
}
