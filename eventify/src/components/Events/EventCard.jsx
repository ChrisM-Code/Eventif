import PropTypes from "prop-types";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MapContext } from "../Directions/Maps/MapContext";
import { FiMapPin, FiCalendar, FiClock } from "react-icons/fi";

const Card = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  height: 100%;
  overflow: hidden;

  padding: 12px;

  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};

  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadow};

  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadowHover};
    border-color: ${({ theme }) => theme.accent};
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 11px;
  background: ${({ theme }) => theme.surfaceAlt};
`;

const EventImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;

  transition: transform 0.4s ease;

  ${Card}:hover & {
    transform: scale(1.04);
  }
`;

const EventContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 14px 5px 5px;
  gap: 10px;
`;

const EventTitle = styled.h2`
  margin: 0;
  font-size: clamp(1.05rem, 2vw, 1.25rem);
  font-weight: 750;
  line-height: 1.4;

  color: ${({ theme }) => theme.heading};

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const EventDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

const InfoText = styled.p`
  display: flex;
  align-items: flex-start;
  gap: 9px;

  margin: 0;
  padding: 2px 0;

  color: ${({ theme }) => theme.secondary};
  font-size: 0.9rem;
  line-height: 1.6;
  overflow-wrap: anywhere;

  svg {
    flex-shrink: 0;
    margin-top: 4px;
    color: ${({ theme }) => theme.accent};
    font-size: 15px;
  }
`;

const Description = styled(InfoText)`
  display: block;
  margin-top: 3px;
  color: ${({ theme }) => theme.text};

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const LocationButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  gap: 7px;

  max-width: 100%;
  padding: 8px 13px;
  margin-top: 2px;

  background: ${({ theme }) => theme.accentSoft};
  color: ${({ theme }) => theme.accent};

  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;

  font-size: 0.85rem;
  font-weight: 650;
  overflow-wrap: anywhere;

  transition: all 0.25s ease;

  svg {
    flex-shrink: 0;
  }

  &:hover {
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.inverseText};
    border-color: ${({ theme }) => theme.accent};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.accent};
    outline-offset: 3px;
  }
`;

const EventInfo = ({ children }) => <InfoText>{children}</InfoText>;

EventInfo.propTypes = {
  children: PropTypes.node.isRequired,
};

function EventCard({ event }) {
  const navigate = useNavigate();
  const { updateDestination } = useContext(MapContext);

  if (!event) {
    return <p>No event data available.</p>;
  }

  const handleLocationClick = () => {
    updateDestination(event.location);

    navigate("/map", {
      state: { location: event.location },
    });
  };

  return (
    <Card whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
      {event.image && (
        <ImageWrapper>
          <EventImage src={event.image} alt={event.title} />
        </ImageWrapper>
      )}

      <EventContent>
        <EventTitle>{event.title}</EventTitle>

        <EventDetails>
          <EventInfo>
            <FiCalendar aria-hidden="true" />
            {event.date}
          </EventInfo>

          <EventInfo>
            <FiClock aria-hidden="true" />
            {event.time}
          </EventInfo>
        </EventDetails>

        <LocationButton
          type="button"
          onClick={handleLocationClick}
          aria-label={`Get directions to ${event.location}`}
        >
          <FiMapPin aria-hidden="true" />
          {event.location}
        </LocationButton>

        {event.details && <Description>{event.details}</Description>}
      </EventContent>
    </Card>
  );
}

EventCard.propTypes = {
  event: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventCard;
