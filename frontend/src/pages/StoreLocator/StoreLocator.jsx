import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./StoreLocator.css";

const stores = [
  {
    id: "brixton",
    name: "Brixton Store",
    phone: "+000 123 456 789",
    email: "gizmos@example.com",
    address: "18 Manhattan Avenue, New York",
    hours: ["Monday to Friday: 9am-9pm", "Saturday to Sunday: 9am-10pm"],
    lat: 51.4613,
    lng: -0.1156,
  },
  {
    id: "london",
    name: "London Store",
    phone: "+000 223 445 667",
    email: "gizmos@example.com",
    address: "80 Dog Kennel Hill, London",
    hours: ["Monday to Friday: 9am-9pm", "Saturday to Sunday: 9am-10pm"],
    lat: 51.4655,
    lng: -0.0827,
  },
  {
    id: "larkhall",
    name: "Larkhall Store",
    phone: "+000 998 335 226",
    email: "gizmos@example.com",
    address: "Larkhall ML9 1US, United Kingdom",
    hours: ["Monday to Friday: 9am-9pm", "Saturday to Sunday: 9am-10pm"],
    lat: 55.7361,
    lng: -3.9772,
  },
];

// Self-contained SVG icons — no external image files, so nothing
// can silently break under a bundler the way Leaflet's default
// marker icons famously do in Vite/webpack projects.
const storeIcon = L.divIcon({
  className: "store-locator-pin",
  html: `<svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 0C6.7 0 0 6.7 0 15c0 11.2 15 25 15 25s15-13.8 15-25C30 6.7 23.3 0 15 0z" fill="#2563eb"/>
    <circle cx="15" cy="15" r="6" fill="#ffffff"/>
  </svg>`,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -36],
});

const selectedIcon = L.divIcon({
  className: "store-locator-pin",
  html: `<svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 0C6.7 0 0 6.7 0 15c0 11.2 15 25 15 25s15-13.8 15-25C30 6.7 23.3 0 15 0z" fill="#f97316"/>
    <circle cx="15" cy="15" r="6" fill="#ffffff"/>
  </svg>`,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -36],
});

const youAreHereIcon = L.divIcon({
  className: "store-locator-you-are-here",
  html: `<span class="store-locator-pulse-ring"></span><span class="store-locator-pulse-dot"></span>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -10],
});

// Fits the initial view to every store — shown immediately on load,
// before/if live location ever becomes available.
const FitStoreBounds = ({ locations }) => {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds(locations.map((s) => [s.lat, s.lng]));
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [locations, map]);
  return null;
};

// Flies to the user's real position the first time a GPS fix arrives.
// Only happens once automatically — later live updates move the dot
// without yanking the view if the person has since panned elsewhere.
const FlyToUserOnFirstFix = ({ position }) => {
  const map = useMap();
  const hasFlown = useRef(false);
  useEffect(() => {
    if (position && !hasFlown.current) {
      hasFlown.current = true;
      map.flyTo([position.lat, position.lng], 15, { duration: 1.5 });
    }
  }, [position, map]);
  return null;
};

// Captures the real Leaflet map instance into a ref so the "Locate me"
// button (rendered outside <MapContainer>) can call flyTo on it.
const MapRefSetter = ({ mapRef }) => {
  const map = useMap();
  useEffect(() => {
    mapRef.current = map;
  }, [map]);
  return null;
};

// Lets the user click anywhere on the map to drop a pin there.
const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });
  return null;
};

const reverseGeocode = async (lat, lng) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
  );
  if (!res.ok) throw new Error("Reverse geocode failed");
  const data = await res.json();
  return data.display_name || "Unknown location";
};

const StoreLocator = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [clickedPosition, setClickedPosition] = useState(null);

  const mapRef = useRef(null);
  const clickedMarkerRef = useRef(null);
  const clickRequestId = useRef(0);

  // Live location tracking — watchPosition keeps updating as the
  // person actually moves, unlike a one-time getCurrentPosition snapshot.
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation isn't supported in this browser.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setLocationError(null);
        setUserPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        });
      },
      (err) => {
        setLocationError(
          err.code === err.PERMISSION_DENIED
            ? "Location access denied — showing store view instead."
            : "Couldn't get your location right now.",
        );
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 15000 },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Re-open the popup only when a NEW spot is clicked, not on every
  // loading -> loaded transition of the same clicked position.
  useEffect(() => {
    if (clickedMarkerRef.current && clickedPosition) {
      clickedMarkerRef.current.openPopup();
    }
  }, [clickedPosition?.lat, clickedPosition?.lng]);

  const handleMapClick = async (latlng) => {
    const requestId = ++clickRequestId.current;
    setClickedPosition({
      lat: latlng.lat,
      lng: latlng.lng,
      address: null,
      loading: true,
    });

    try {
      const address = await reverseGeocode(latlng.lat, latlng.lng);
      if (clickRequestId.current === requestId) {
        setClickedPosition((prev) =>
          prev ? { ...prev, address, loading: false } : prev,
        );
      }
    } catch {
      if (clickRequestId.current === requestId) {
        setClickedPosition((prev) =>
          prev
            ? { ...prev, address: "Address not found", loading: false }
            : prev,
        );
      }
    }
  };

  const handleLocateMe = () => {
    if (mapRef.current && userPosition) {
      mapRef.current.flyTo([userPosition.lat, userPosition.lng], 15, {
        duration: 1.2,
      });
    }
  };

  return (
    <section className="store-locator-page">
      <div className="store-locator-container">
        <nav className="store-locator-breadcrumb" aria-label="breadcrumb">
          <NavLink to="/" end>
            Home
          </NavLink>
          <span className="store-locator-breadcrumb-sep">|</span>
          <span className="store-locator-breadcrumb-current">
            Store Locator
          </span>
        </nav>

        <h1 className="store-locator-title">Store Locator</h1>

        <div className="store-locator-map-wrap">
          <button
            type="button"
            className="store-locator-locate-btn"
            onClick={handleLocateMe}
            disabled={!userPosition}
            aria-label="Center map on my location"
            title={
              userPosition
                ? "Center map on my location"
                : "Waiting for your location…"
            }
          >
            <i className="bi bi-crosshair"></i>
          </button>

          <MapContainer
            center={[53.5, -2]}
            zoom={5}
            scrollWheelZoom={true}
            className="store-locator-map"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapRefSetter mapRef={mapRef} />
            <MapClickHandler onMapClick={handleMapClick} />
            <FitStoreBounds locations={stores} />
            <FlyToUserOnFirstFix position={userPosition} />

            {stores.map((store) => (
              <Marker
                key={store.id}
                position={[store.lat, store.lng]}
                icon={storeIcon}
              >
                <Popup>
                  <strong>{store.name}</strong>
                  <br />
                  {store.address}
                </Popup>
              </Marker>
            ))}

            {userPosition && (
              <>
                <Marker
                  position={[userPosition.lat, userPosition.lng]}
                  icon={youAreHereIcon}
                >
                  <Popup>
                    <strong>You are here</strong>
                    <br />
                    <span className="store-locator-popup-coords">
                      {userPosition.lat.toFixed(5)},{" "}
                      {userPosition.lng.toFixed(5)}
                    </span>
                  </Popup>
                </Marker>
                <Circle
                  center={[userPosition.lat, userPosition.lng]}
                  radius={userPosition.accuracy}
                  pathOptions={{
                    color: "#22c55e",
                    fillColor: "#22c55e",
                    fillOpacity: 0.1,
                    weight: 1,
                  }}
                />
              </>
            )}

            {clickedPosition && (
              <Marker
                ref={clickedMarkerRef}
                position={[clickedPosition.lat, clickedPosition.lng]}
                icon={selectedIcon}
              >
                <Popup>
                  <strong>Selected location</strong>
                  <br />
                  {clickedPosition.loading
                    ? "Looking up address…"
                    : clickedPosition.address}
                  <br />
                  <span className="store-locator-popup-coords">
                    {clickedPosition.lat.toFixed(5)},{" "}
                    {clickedPosition.lng.toFixed(5)}
                  </span>
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>

        {locationError && (
          <p className="store-locator-status store-locator-status-error">
            {locationError}
          </p>
        )}
        {!locationError && !userPosition && (
          <p className="store-locator-status">Locating you…</p>
        )}
        <p className="store-locator-hint">
          Click anywhere on the map to check that location's address.
        </p>

        <div className="store-locator-grid">
          {stores.map((store) => (
            <div className="store-locator-card" key={store.id}>
              <h2 className="store-locator-card-title">{store.name}</h2>

              <div className="store-locator-row">
                <i className="bi bi-pc-display-horizontal"></i>
                <span>{store.phone}</span>
              </div>

              <div className="store-locator-row">
                <i className="bi bi-controller"></i>
                <span>{store.email}</span>
              </div>

              <div className="store-locator-row">
                <i className="bi bi-smartwatch"></i>
                <span>{store.address}</span>
              </div>

              <div className="store-locator-row store-locator-hours">
                <i className="bi bi-headphones"></i>
                <span>
                  {store.hours.map((line, index) => (
                    <span key={index} className="store-locator-hours-line">
                      {line}
                    </span>
                  ))}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoreLocator;
