import { useState, useContext, useMemo } from "react";

import { MapContext } from "../Directions/Maps/MapContext";

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

const InstructionIcon = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto 1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  background: ${({ theme }) => theme.accentSoft};
  color: ${({ theme }) => theme.accent};

  svg {
    font-size: 28px;
  }
`;

const InstructionModalContent = styled.div`
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  text-align: center;
`;

const InstructionSteps = styled.div`
  margin: 1.25rem 0;
  padding: 1rem;

  background: ${({ theme }) => theme.surfaceAlt};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;

  text-align: left;

  p {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin: 0.7rem 0;

    color: ${({ theme }) => theme.text};
    font-size: 0.9rem;
    line-height: 1.5;
  }

  span {
    flex-shrink: 0;
    width: 23px;
    height: 23px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;
    background: ${({ theme }) => theme.accent};
    color: white;

    font-size: 0.75rem;
    font-weight: 700;
  }
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

const Buttons = ({
  events = [],
  eventsLoading = false,
  eventsError = null,
  onRetryEvents,
}) => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const {
    userLocation,
    locationLoading,
    locationError,
    destination,
    updateDestination,
  } = useContext(MapContext);

  // Normalize event coordinates.
  const getEventCoordinates = (event) => {
    const lat = Number(event.lat ?? event.latitude);
    const lng = Number(event.lng ?? event.longitude);

    if (
      (event.lat == null && event.latitude == null) ||
      (event.lng == null && event.longitude == null) ||
      !Number.isFinite(lat) ||
      !Number.isFinite(lng) ||
      lat < -90 ||
      lat > 90 ||
      lng < -180 ||
      lng > 180
    ) {
      return null;
    }

    return [lat, lng];
  };

  // Prepare available events without making another API request.
  const availableEvents = useMemo(() => {
    if (!Array.isArray(events)) return [];

    return events.filter(
      (event) => event && (event.id || event._id) && event.title
    );
  }, [events]);

  // Open directions.
  const handleDirectionsClick = () => {
    setSelectedEvent(null);
    updateDestination(null);
    setShowModal(true);
  };

  // Select an event immediately from the loaded event list.
  const handleSelectEvent = (event) => {
    if (!event) return;

    const coordinates = getEventCoordinates(event);

    setSelectedEvent(event);
    setShowModal(false);

    if (coordinates) {
      updateDestination(coordinates);
    } else {
      updateDestination(null);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const hasValidCoordinates =
    selectedEvent && getEventCoordinates(selectedEvent);

  const mapCenter = destination || userLocation || hasValidCoordinates;

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
        <Modal onClose={handleCloseModal}>
          {eventsLoading ? (
            <>
              <ModalHeading>Loading Events</ModalHeading>
              <ModalDescription>
                Please wait while we retrieve available events...
              </ModalDescription>

              <EmptyState>
                <p>Fetching event information. Please wait.</p>
              </EmptyState>
            </>
          ) : eventsError ? (
            <>
              <ModalHeading>Unable to Load Events</ModalHeading>

              <ModalDescription>
                We couldn't retrieve the events at the moment. Please check your
                connection and try again.
              </ModalDescription>

              <ModalButtonGroup>
                <StyledButton onClick={onRetryEvents} disabled={!onRetryEvents}>
                  Retry
                </StyledButton>

                <StyledButton onClick={handleCloseModal}>Close</StyledButton>
              </ModalButtonGroup>
            </>
          ) : availableEvents.length === 0 ? (
            <InstructionModalContent>
              <InstructionIcon>
                <FaDirections />
              </InstructionIcon>

              <ModalHeading>View Event Directions</ModalHeading>

              <ModalDescription>
                You need to select an event before viewing its directions.
                Browse available events first.
              </ModalDescription>

              <InstructionSteps>
                <p>
                  <span>1</span> Browse available events.
                </p>
                <p>
                  <span>2</span> Select your preferred event.
                </p>
                <p>
                  <span>3</span> View its location on the map.
                </p>
              </InstructionSteps>

              <ModalButtonGroup>
                <StyledButton
                  onClick={() => {
                    setShowModal(false);
                    navigate("/events");
                  }}
                >
                  <FaCalendarAlt />
                  Browse Events
                </StyledButton>
              </ModalButtonGroup>
            </InstructionModalContent>
          ) : (
            <>
              <ModalHeading>Select an Event</ModalHeading>

              <ModalDescription>
                Choose an event to view its location and directions.
              </ModalDescription>

              <EventList>
                {availableEvents.map((event) => (
                  <EventOption
                    key={event.id || event._id}
                    onClick={() => handleSelectEvent(event)}
                  >
                    <div>
                      <strong>{event.title}</strong>
                      <span>{event.location || "Location not specified"}</span>
                    </div>

                    <FaMapMarkerAlt />
                  </EventOption>
                ))}
              </EventList>

              <ModalButtonGroup>
                <StyledButton onClick={handleCloseModal}>Cancel</StyledButton>

                <StyledButton
                  onClick={() => {
                    setShowModal(false);
                    navigate("/events");
                  }}
                >
                  <FaCalendarAlt />
                  All Events
                </StyledButton>
              </ModalButtonGroup>
            </>
          )}
        </Modal>
      )}

      {/* Selected event map */}
      {selectedEvent && (
        <MapSection>
          <h3>
            Directions to: <em>{selectedEvent.title}</em>
          </h3>

          {!hasValidCoordinates ? (
            <EmptyState>
              <p>
                This event does not have valid map coordinates. Please select
                another event or update its location.
              </p>
            </EmptyState>
          ) : (
            <>
              {locationLoading && (
                <ModalDescription>
                  Loading your current location...
                </ModalDescription>
              )}

              {!userLocation && !locationLoading && (
                <EmptyState>
                  <p>
                    {locationError
                      ? "Your current location is unavailable."
                      : "Your current location is unavailable."}
                  </p>
                </EmptyState>
              )}

              <StyledMap
                key={selectedEvent.id || selectedEvent._id}
                center={mapCenter}
                zoom={13}
                scrollWheelZoom
              >
                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {userLocation && (
                  <Marker position={userLocation}>
                    <Popup>Your Current Location</Popup>
                  </Marker>
                )}

                <Marker position={hasValidCoordinates}>
                  <Popup>{selectedEvent.title}</Popup>
                </Marker>
              </StyledMap>
            </>
          )}
        </MapSection>
      )}
    </>
  );
};

export default Buttons;
