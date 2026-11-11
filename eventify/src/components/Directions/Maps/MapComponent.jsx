import { useState, useEffect, useContext, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { FiMaximize2, FiMinimize2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { MapContext } from "../Maps/MapContext";
import styled from "styled-components";
import L from "leaflet";
import PropTypes from "prop-types";

import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

// =====================================================
// 1. STYLED COMPONENTS
// =====================================================

const MapWrapper = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 1200px;
  height: clamp(400px, 65vh, 700px);
  min-height: 450px;

  margin: 1.25rem auto;
  overflow: hidden;

  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};

  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadow};

  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;

  &:fullscreen {
    width: 100vw;
    height: 100vh;
    max-width: none;
    min-height: 0;
    margin: 0;
    border: none;
    border-radius: 0;
    background: ${({ theme }) => theme.surface};
  }

  /* CSS fallback when native fullscreen is unavailable */
  ${({ $expanded }) =>
    $expanded &&
    `
      position: fixed;
      inset: 0;
      z-index: 99999;
      width: 100vw;
      height: 100dvh;
      max-width: none;
      min-height: 0;
      margin: 0;
      border: none;
      border-radius: 0;
    `}

  .leaflet-container {
    flex: 1;
    width: 100%;
    height: 100%;
    min-height: 0;

    background: ${({ theme }) => theme.surfaceAlt};
    font-family: inherit;
    z-index: 1;
  }

  .leaflet-popup-content-wrapper,
  .leaflet-popup-tip {
    background: ${({ theme }) => theme.surface};
    color: ${({ theme }) => theme.text};
  }

  .leaflet-popup-content {
    color: ${({ theme }) => theme.text};
    font-family: inherit;
  }

  .leaflet-popup-content a {
    color: ${({ theme }) => theme.accent};
  }

  .leaflet-control-zoom a {
    background: ${({ theme }) => theme.surface};
    color: ${({ theme }) => theme.text};
    border-color: ${({ theme }) => theme.border};
  }

  .leaflet-control-zoom a:hover {
    background: ${({ theme }) => theme.surfaceAlt};
    color: ${({ theme }) => theme.accent};
  }

  .leaflet-routing-container {
    display: none !important;
  }

  .leaflet-control-attribution {
    background: ${({ theme }) => theme.surface} !important;
    color: ${({ theme }) => theme.secondary} !important;
  }

  @media (max-width: 768px) {
    height: 60vh;
    min-height: 400px;
    margin: 0.75rem auto;
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    height: 55vh;
    min-height: 350px;
  }
`;

const FullscreenButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 1000;

  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};

  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;

  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);

  font-size: 19px;
  cursor: pointer;

  transition: all 0.25s ease;

  &:hover {
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.inverseText};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.accent};
    outline-offset: 3px;
  }

  @media (max-width: 480px) {
    width: 38px;
    height: 38px;
    top: 10px;
    right: 10px;
  }
`;

const MapStatus = styled.div`
  position: absolute;
  inset: 0;
  z-index: 500;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  padding: 1.5rem;
  text-align: center;

  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};

  h3 {
    margin: 0;
    color: ${({ theme }) => theme.heading};
    font-size: 1.1rem;
  }

  p {
    max-width: 400px;
    margin: 0;
    color: ${({ theme }) => theme.secondary};
    font-size: 0.95rem;
  }
`;

const StatusIcon = styled.div`
  width: 52px;
  height: 52px;

  display: grid;
  place-items: center;

  border-radius: 50%;
  background: ${({ theme }) => theme.accentSoft};
  color: ${({ theme }) => theme.accent};

  font-size: 1.5rem;
`;

const StatusButton = styled.button`
  margin-top: 0.5rem;
  padding: 0.7rem 1.2rem;

  border: 1px solid ${({ theme }) => theme.accent};
  border-radius: 8px;

  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.inverseText};

  font-weight: 600;
  cursor: pointer;

  transition: all 0.25s ease;

  &:hover {
    background: ${({ theme }) => theme.accentHover};
    border-color: ${({ theme }) => theme.accentHover};
    transform: translateY(-2px);
  }
`;

const MapInfo = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 1000;

  max-width: calc(100% - 85px);
  padding: 0.65rem 1rem;

  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;

  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  box-shadow: ${({ theme }) => theme.shadow};

  font-size: 0.85rem;
  font-weight: 600;

  span {
    color: ${({ theme }) => theme.accent};
  }

  @media (max-width: 480px) {
    top: 10px;
    left: 10px;
    padding: 0.5rem 0.7rem;
    font-size: 0.75rem;
  }
`;

// =====================================================
// 2. HELPER FUNCTIONS
// =====================================================

const calculateDistance = (loc1, loc2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const earthRadius = 6371;

  const dLat = toRad(loc2[0] - loc1[0]);
  const dLon = toRad(loc2[1] - loc1[1]);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(loc1[0])) *
      Math.cos(toRad(loc2[0])) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return (earthRadius * c).toFixed(2);
};

// =====================================================
// 3. MAP HELPER COMPONENTS
// =====================================================

// Automatically resize the map after fullscreen changes
const MapResize = ({ isFullscreen }) => {
  const map = useMap();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      map.invalidateSize({ pan: false });
    });

    return () => cancelAnimationFrame(frame);
  }, [map, isFullscreen]);

  return null;
};

MapResize.propTypes = {
  isFullscreen: PropTypes.bool.isRequired,
};

// Update map position when event coordinates change
const MapViewportUpdater = ({ coordinates }) => {
  const map = useMap();

  useEffect(() => {
    if (coordinates) {
      map.setView(coordinates, 14, { animate: true });
    }
  }, [coordinates, map]);

  return null;
};

MapViewportUpdater.propTypes = {
  coordinates: PropTypes.arrayOf(PropTypes.number),
};

// =====================================================
// 4. MAIN MAP COMPONENT
// =====================================================

const MapComponent = () => {
  const { userLocation, destination, isMapVisible } = useContext(MapContext);

  const navigate = useNavigate();

  // Map states
  const [eventCoordinates, setEventCoordinates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [distance, setDistance] = useState(null);

  // Fullscreen states
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fallbackFullscreen, setFallbackFullscreen] = useState(false);

  const mapWrapperRef = useRef(null);

  // ---------------------------------------------------
  // FULLSCREEN MANAGEMENT
  // ---------------------------------------------------

  useEffect(() => {
    const handleFullscreenChange = () => {
      const active = document.fullscreenElement === mapWrapperRef.current;

      setIsFullscreen(active);

      if (active) {
        setFallbackFullscreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Support Escape key for CSS fallback fullscreen
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && fallbackFullscreen) {
        setFallbackFullscreen(false);
        setIsFullscreen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [fallbackFullscreen]);

  const toggleFullscreen = async () => {
    const wrapper = mapWrapperRef.current;

    if (!wrapper) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        return;
      }

      if (fallbackFullscreen) {
        setFallbackFullscreen(false);
        setIsFullscreen(false);
        return;
      }

      if (wrapper.requestFullscreen) {
        await wrapper.requestFullscreen();
      } else {
        setFallbackFullscreen(true);
        setIsFullscreen(true);
      }
    } catch (err) {
      console.error("Fullscreen operation failed:", err);

      // Use CSS fallback if native fullscreen fails
      setFallbackFullscreen(true);
      setIsFullscreen(true);
    }
  };

  // ---------------------------------------------------
  // FETCH EVENT LOCATION
  // ---------------------------------------------------

  useEffect(() => {
    if (!destination) {
      setEventCoordinates(null);
      setDistance(null);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();

    const fetchEventLocation = async () => {
      setLoading(true);
      setError(null);
      setEventCoordinates(null);
      setDistance(null);

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
            destination
          )}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Unable to retrieve the event location.");
        }

        const data = await response.json();

        if (!data.length) {
          throw new Error(
            "Location not found. Please check the event address or select another event."
          );
        }

        const lat = Number.parseFloat(data[0].lat);
        const lon = Number.parseFloat(data[0].lon);

        if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
          throw new Error("The event location returned invalid coordinates.");
        }

        const coordinates = [lat, lon];

        setEventCoordinates(coordinates);

        if (userLocation) {
          setDistance(calculateDistance(userLocation, coordinates));
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unable to load the event location.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchEventLocation();

    return () => controller.abort();
  }, [destination, userLocation]);

  // ---------------------------------------------------
  // INITIAL MAP STATE
  // ---------------------------------------------------

  if (!isMapVisible) {
    return (
      <MapWrapper>
        <MapStatus>
          <StatusIcon>📍</StatusIcon>

          <h3>Find Your Event Location</h3>

          <p>Select an event to view its location and get directions.</p>

          <StatusButton type="button" onClick={() => navigate("/events")}>
            Select an Event
          </StatusButton>
        </MapStatus>
      </MapWrapper>
    );
  }

  // ---------------------------------------------------
  // MAP RENDERING
  // ---------------------------------------------------

  const defaultCenter = [0.0236, 37.9062];

  const mapCenter = eventCoordinates || userLocation || defaultCenter;

  return (
    <MapWrapper ref={mapWrapperRef} $expanded={fallbackFullscreen}>
      {/* Fullscreen button */}
      <FullscreenButton
        type="button"
        onClick={toggleFullscreen}
        aria-label={
          isFullscreen ? "Exit fullscreen map" : "View map fullscreen"
        }
        title={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
      >
        {isFullscreen ? <FiMinimize2 /> : <FiMaximize2 />}
      </FullscreenButton>

      {/* Distance information */}
      {distance && !loading && !error && (
        <MapInfo>
          Distance: <span>{distance} km</span>
        </MapInfo>
      )}

      {/* Loading state */}
      {loading && (
        <MapStatus>
          <StatusIcon>⌛</StatusIcon>

          <h3>Finding Event Location</h3>

          <p>Please wait while we locate your event.</p>
        </MapStatus>
      )}

      {/* Error state */}
      {!loading && error && (
        <MapStatus>
          <StatusIcon>!</StatusIcon>

          <h3>Location Unavailable</h3>

          <p>{error}</p>

          <StatusButton type="button" onClick={() => navigate("/events")}>
            Choose Another Event
          </StatusButton>
        </MapStatus>
      )}

      {/* Leaflet map */}
      <MapContainer
        center={mapCenter}
        zoom={eventCoordinates || userLocation ? 13 : 6}
        scrollWheelZoom
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <MapResize isFullscreen={isFullscreen} />

        <MapViewportUpdater coordinates={eventCoordinates} />

        {/* OpenStreetMap tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User location marker */}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={L.icon({
              iconUrl:
                "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-green.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
            })}
          >
            <Popup>Your Current Location</Popup>
          </Marker>
        )}

        {/* Event location marker */}
        {eventCoordinates && (
          <Marker
            position={eventCoordinates}
            icon={L.icon({
              iconUrl:
                "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-red.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
            })}
          >
            <Popup>
              <strong>Event Location</strong>
              <br />
              {destination}
            </Popup>
          </Marker>
        )}

        {/* Route between user and event */}
        {userLocation && eventCoordinates && (
          <Routing
            userLocation={userLocation}
            eventCoordinates={eventCoordinates}
          />
        )}
      </MapContainer>
    </MapWrapper>
  );
};

// =====================================================
// 5. ROUTING COMPONENT
// =====================================================

const Routing = ({ userLocation, eventCoordinates }) => {
  const map = useMap();

  useEffect(() => {
    if (!userLocation || !eventCoordinates) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(userLocation[0], userLocation[1]),
        L.latLng(eventCoordinates[0], eventCoordinates[1]),
      ],

      lineOptions: {
        styles: [
          {
            color: "#F97316",
            weight: 5,
            opacity: 0.85,
          },
        ],
      },

      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
      }),

      createMarker: () => null,

      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
      show: false,
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, userLocation, eventCoordinates]);

  return null;
};

Routing.propTypes = {
  userLocation: PropTypes.arrayOf(PropTypes.number).isRequired,
  eventCoordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
};

// =====================================================
// 6. EXPORT
// =====================================================

export default MapComponent;
