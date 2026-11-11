import { createContext, useState, useEffect, useCallback } from "react";

import PropTypes from "prop-types";

export const MapContext = createContext(null);

export const MapProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [destination, setDestination] = useState(null);

  const [locationLoading, setLocationLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);

  const [isMapVisible, setIsMapVisible] = useState(false);

  // Fetch GPS location once and reuse cached coordinates.
  useEffect(() => {
    let active = true;

    if (!navigator.geolocation) {
      setLocationLoading(false);
      setLocationError("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!active) return;

        setUserLocation([position.coords.latitude, position.coords.longitude]);

        setLocationLoading(false);
        setLocationError(null);
      },

      (error) => {
        if (!active) return;

        setLocationLoading(false);
        setLocationError(error.message);

        console.warn("Location unavailable:", error.message);
      },

      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      }
    );

    return () => {
      active = false;
    };
  }, []);

  // Update selected event destination without another API request.
  const updateDestination = useCallback((coordinates) => {
    setDestination(coordinates);
    setIsMapVisible(Boolean(coordinates));
  }, []);

  const clearDestination = useCallback(() => {
    setDestination(null);
    setIsMapVisible(false);
  }, []);

  const value = {
    userLocation,
    destination,
    isMapVisible,
    locationLoading,
    locationError,
    updateDestination,
    clearDestination,
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};

MapProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MapProvider;
