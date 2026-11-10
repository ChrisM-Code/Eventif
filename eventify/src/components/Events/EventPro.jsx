import styled from "styled-components";
import { useMemo } from "react";
import EventCard from "./EventCard";
import Modal from "./Modal";

// Main event section
const EventSection = styled.section`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 1rem clamp(1rem, 3vw, 2rem) 4rem;

  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};

  transition: background-color 0.3s ease, color 0.3s ease;
`;

// Section heading
const H2 = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  width: 100%;
  margin: 2.5rem 0 1.5rem;

  font-size: clamp(1.4rem, 2.5vw, 1.9rem);
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: -0.5px;
  text-align: center;

  color: ${({ theme }) => theme.heading};

  span {
    color: ${({ theme }) => theme.accent};
  }

  @media (max-width: 480px) {
    margin: 1.75rem 0 1.25rem;
  }
`;

// Event grid
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(1rem, 2vw, 1.5rem);

  width: 100%;
  align-items: stretch;

  & > * {
    width: 100%;
    min-width: 0;
    height: 100%;
  }

  @media (max-width: 1050px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

// Past events section
const PastEventsContainer = styled.div`
  width: 100%;
  padding: clamp(1rem, 2vw, 1.5rem);

  background: ${({ theme }) => theme.surfaceAlt};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 18px;

  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

const PastEventsGrid = styled(Container)`
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: 1050px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

// Past event card wrapper
const PastEventCard = styled.div`
  min-width: 0;
  height: 100%;
  padding: 0.5rem;

  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;

  box-shadow: ${({ theme }) => theme.shadow};
  opacity: 0.9;

  transition: opacity 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;

  &:hover {
    opacity: 1;
    box-shadow: ${({ theme }) => theme.shadowHover};
  }

  /* Past events are displayed without interaction. */
  pointer-events: none;
`;

// Empty state
const EmptyMessage = styled.div`
  grid-column: 1 / -1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;

  width: 100%;
  min-height: 190px;
  padding: 2rem;

  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.secondary};

  border: 1px dashed ${({ theme }) => theme.border};
  border-radius: 16px;

  text-align: center;

  h3 {
    margin: 0;
    color: ${({ theme }) => theme.heading};
    font-size: 1.1rem;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.6;
  }
`;

// Event count
const EventCount = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 28px;
  height: 28px;
  padding: 0 8px;

  background: ${({ theme }) => theme.accentSoft};
  color: ${({ theme }) => theme.accent};

  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
`;

// Event data
const eventData = [
  {
    image: "/images/eve4.jpg",
    title: "AI Summit 2025",
    date: "October 29, 2025",
    time: "9:00 PM - 11:00 PM",
    location: "Cape Town",
    details: "Explore the future of technology at the Blockchain Summit.",
  },
  {
    image: "/images/eve4.jpg",
    title: "AI Summit 2025",
    date: "October 29, 2025",
    time: "9:00 PM - 11:00 PM",
    location: "Cape Town",
    details: "Explore the future of technology at the Blockchain Summit.",
  },
  {
    image: "/images/eve2.jpg",
    title: "Mbaa Ngumbi",
    date: "October 23, 2025",
    time: "9:00 PM - 9:30 PM",
    location: "Nairobi",
    details: "Cinema Premiers",
  },
  {
    image: "/images/eve4.jpg",
    title: "Blockchain Summit 2025",
    date: "October 27, 2024",
    time: "9:00 PM - 11:00 PM",
    location: "Zimbabwe",
    details:
      "Explore the future of blockchain technology at the Blockchain Summit.",
  },
  {
    image: "/images/eve2.jpg",
    title: "Blockchain Summit 2027",
    date: "September 8, 2027",
    time: "9:00 PM - 9:30 PM",
    location: "Nairobi",
    details:
      "Explore the future of blockchain technology at the Blockchain Summit.",
  },
  {
    image: "/images/eve3.jpg",
    title: "Summit 2027",
    date: "September 19, 2027",
    time: "9:00 PM - 9:30 PM",
    location: "Kisumu",
    details:
      "Explore the future of blockchain technology at the Blockchain Summit.",
  },
  {
    image: "/images/eve3.jpg",
    title: "Summit 2027",
    date: "September 25, 2027",
    time: "9:00 PM - 9:30 PM",
    location: "Eldoret",
    details:
      "Explore the future of blockchain technology at the Blockchain Summit.",
  },
  {
    image: "/images/eve4.jpg",
    title: "AI Summit 2026",
    date: "December 29, 2026",
    time: "9:00 PM - 11:00 PM",
    location: "Cape Town",
    details: "Explore the future of technology at the Blockchain Summit.",
  },
];

// Get the event's ending date and time
const getEventEndDate = (event) => {
  const endTime = event.time?.split("-")[1]?.trim();

  if (!event.date || !endTime) return null;

  const parsedDate = new Date(`${event.date} ${endTime}`);

  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
};

const EventPro = ({
  onHighlightClick,
  modalOpen = false,
  selectedEvent = null,
  onCloseModal,
}) => {
  // Separate past and upcoming events without modifying the original data.
  const { upcomingEvents, inactiveEvents } = useMemo(() => {
    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000;

    const upcoming = [];
    const past = [];

    eventData.forEach((event) => {
      const endDate = getEventEndDate(event);

      if (endDate && now - endDate > oneDay) {
        past.push(event);
      } else {
        upcoming.push(event);
      }
    });

    return {
      upcomingEvents: upcoming,
      inactiveEvents: past,
    };
  }, []);

  const handleEventClick = (event) => {
    onHighlightClick?.(event);
  };

  return (
    <EventSection>
      {/* Past events */}
      {inactiveEvents.length > 0 && (
        <>
          <H2>
            Past <span>Events</span>
            <EventCount>{inactiveEvents.length}</EventCount>
          </H2>

          <PastEventsContainer>
            <PastEventsGrid>
              {inactiveEvents.map((event, index) => (
                <PastEventCard key={`${event.title}-${index}`}>
                  <EventCard event={event} />
                </PastEventCard>
              ))}
            </PastEventsGrid>
          </PastEventsContainer>
        </>
      )}

      {/* Upcoming events */}
      <H2>
        Upcoming <span>Events</span>
        <EventCount>{upcomingEvents.length}</EventCount>
      </H2>

      <Container>
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event, index) => (
            <EventCard
              key={`${event.title}-${index}`}
              event={event}
              onClick={() => handleEventClick(event)}
            />
          ))
        ) : (
          <EmptyMessage>
            <h3>No upcoming events</h3>
            <p>
              There are currently no upcoming events available. Please check
              again later.
            </p>
          </EmptyMessage>
        )}
      </Container>

      {/* Event details modal */}
      {modalOpen && selectedEvent && (
        <Modal onClose={onCloseModal}>
          <EventCard event={selectedEvent} />
        </Modal>
      )}
    </EventSection>
  );
};

export default EventPro;
