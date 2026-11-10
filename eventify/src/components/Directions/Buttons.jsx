import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  FaCalendarAlt,
  FaDirections,
  FaBackspace,
  FaMapMarkerAlt,
} from "react-icons/fa";

import Modal from "./Modal";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";

// Main button wrapper
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;

  width: 100%;
  max-width: 650px;
  margin: 0 auto;
  padding: 1.25rem;

  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadow};

  transition: background-color 0.3s ease, border-color 0.3s ease,
    box-shadow 0.3s ease;

  @media (max-width: 600px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

// Reusable themed button
const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;

  min-height: 46px;
  width: 100%;
  max-width: 190px;
  padding: 0.75rem 1.2rem;

  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.inverseText};

  border: 1px solid ${({ theme }) => theme.accent};
  border-radius: 9px;

  font-size: 0.95rem;
  font-weight: 600;
  white-space: nowrap;

  cursor: pointer;

  transition: background-color 0.25s ease, border-color 0.25s ease,
    transform 0.25s ease, box-shadow 0.25s ease;

  svg {
    flex-shrink: 0;
    font-size: 1rem;
  }

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.accentHover};
    border-color: ${({ theme }) => theme.accentHover};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadowHover};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    max-width: none;
  }
`;

const EventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  width: 100%;
  max-height: 350px;
  overflow-y: auto;
  padding: 0.25rem;
`;

const ModalHeading = styled.h2`
  margin: 0 0 0.5rem;
  color: ${({ theme }) => theme.heading};
  font-size: 1.35rem;
  text-align: center;
`;

const ModalDescription = styled.p`
  margin: 0 0 1.25rem;
  color: ${({ theme }) => theme.secondary};
  font-size: 0.95rem;
  line-height: 1.6;
  text-align: center;
`;

const EventOption = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  width: 100%;
  padding: 1rem;

  background: ${({ theme }) => theme.surfaceAlt};
  color: ${({ theme }) => theme.text};

  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;

  text-align: left;
  cursor: pointer;

  transition: all 0.25s ease;

  &:hover {
    background: ${({ theme }) => theme.accentSoft};
    border-color: ${({ theme }) => theme.accent};
  }

  strong {
    display: block;
    margin-bottom: 0.25rem;
    color: ${({ theme }) => theme.heading};
    font-size: 0.95rem;
  }

  span {
    display: block;
    color: ${({ theme }) => theme.secondary};
    font-size: 0.85rem;
  }

  svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.accent};
  }
`;

const EmptyState = styled.div`
  padding: 1.5rem 1rem;
  text-align: center;

  background: ${({ theme }) => theme.surfaceAlt};
  border: 1px dashed ${({ theme }) => theme.border};
  border-radius: 10px;

  p {
    margin: 0;
    color: ${({ theme }) => theme.secondary};
  }
`;

const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  margin-top: 1.5rem;

  @media (max-width: 600px) {
    flex-direction: column;

    button {
      max-width: none;
    }
  }
`;

// Map wrapper
const MapSection = styled.section`
  width: 100%;
  margin-top: 2rem;
  padding: 1.25rem;

  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadow};

  transition: all 0.3s ease;

  h3 {
    margin: 0 0 1rem;
    color: ${({ theme }) => theme.heading};
    font-size: 1.1rem;

    em {
      color: ${({ theme }) => theme.accent};
      font-style: normal;
    }
  }

  @media (max-width: 600px) {
    padding: 0.75rem;
  }
`;

const StyledMap = styled(MapContainer)`
  width: 100%;
  height: 420px;
  border-radius: 12px;
  z-index: 1;

  @media (max-width: 600px) {
    height: 320px;
  }
`;

const Buttons = ({ events = [] }) => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  // Get the user's current location
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.warn("Unable to retrieve location:", error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  }, []);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowModal(false);
  };

  const handleDirectionsClick = () => {
    if (events.length > 0) {
      setShowModal(true);
    } else {
      navigate("/directions");
    }
  };

  const hasValidCoordinates =
    selectedEvent &&
    Number.isFinite(Number(selectedEvent.lat)) &&
    Number.isFinite(Number(selectedEvent.lng));

  return (
    <>
      <ButtonContainer>
        <StyledButton onClick={() => navigate("/events")}>
          <FaCalendarAlt />
          Events
        </StyledButton>

        <StyledButton onClick={handleDirectionsClick}>
          <FaDirections />
          Directions
        </StyledButton>
      </ButtonContainer>

      {/* Event selection modal */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ModalHeading>Select an Event</ModalHeading>

          <ModalDescription>
            Choose an event to view its location and available directions.
          </ModalDescription>

          {events.length === 0 ? (
            <EmptyState>
              <p>No events are currently available for navigation.</p>
            </EmptyState>
          ) : (
            <EventList>
              {events.map((event, index) => (
                <EventOption
                  key={event.id || `${event.title}-${index}`}
                  onClick={() => handleSelectEvent(event)}
                >
                  <div>
                    <strong>{event.title}</strong>
                    <span>{event.location}</span>
                  </div>

                  <FaMapMarkerAlt />
                </EventOption>
              ))}
            </EventList>
          )}

          <ModalButtonGroup>
            <StyledButton onClick={() => navigate("/events")}>
              <FaBackspace />
              Back to Events
            </StyledButton>
          </ModalButtonGroup>
        </Modal>
      )}

      {/* Selected event map */}
      {selectedEvent && (
        <MapSection>
          <h3>
            Directions to: <em>{selectedEvent.title}</em>
          </h3>

          {!userLocation ? (
            <EmptyState>
              <p>
                Your current location is unavailable. Allow location access in
                your browser to display your position on the map.
              </p>
            </EmptyState>
          ) : !hasValidCoordinates ? (
            <EmptyState>
              <p>
                Coordinates are not available for this event. Please provide
                valid latitude and longitude values.
              </p>
            </EmptyState>
          ) : (
            <StyledMap center={userLocation} zoom={13} scrollWheelZoom>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker position={[userLocation.lat, userLocation.lng]}>
                <Popup>Your Current Location</Popup>
              </Marker>

              <Marker
                position={[
                  Number(selectedEvent.lat),
                  Number(selectedEvent.lng),
                ]}
              >
                <Popup>{selectedEvent.title}</Popup>
              </Marker>
            </StyledMap>
          )}
        </MapSection>
      )}
    </>
  );
};

export default Buttons;
