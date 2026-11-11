import styled from "styled-components";
import { useMemo, useEffect, useRef, useState } from "react";
import EventCard from "./EventCard";
import Modal from "./Modal";

// ==========================================
// MAIN EVENT SECTION
// ==========================================

const EventSection = styled.section`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 1rem clamp(1rem, 3vw, 2rem) 4rem;

  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};

  transition: background-color 0.3s ease, color 0.3s ease;
`;

// ==========================================
// SECTION HEADING
// ==========================================

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

// ==========================================
// UPCOMING EVENTS GRID
// ==========================================

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

// ==========================================
// PAST EVENTS VIEWPORT
// ==========================================

const PastEventsContainer = styled.section`
  position: relative;
  width: 100%;
  margin: 0.1rem 0 0rem;
  padding: 2rem 0;

  overflow: hidden;

  box-shadow: ${({ theme }) => theme.shadow};

  transition: background 0.3s ease;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: clamp(35px, 8vw, 110px);
    z-index: 5;
    pointer-events: none;
  }

  &::before {
    left: 0;
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.surface},
      transparent
    );
  }

  &::after {
    right: 0;
    background: linear-gradient(
      to left,
      ${({ theme }) => theme.surface},
      transparent
    );
  }
`;

// ==========================================
// PAST EVENTS TRACK
// ==========================================

const PastEventsTrack = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;

  width: max-content;
  flex: 0 0 auto;

  will-change: transform;
  transform: translate3d(0, 0, 0);

  @media (max-width: 650px) {
    gap: 0.85rem;
  }

  @media (prefers-reduced-motion: reduce) {
    will-change: auto;
  }
`;

// ==========================================
// INDIVIDUAL PAST EVENT CARD
// ==========================================

const PastEventCard = styled.div`
  position: relative;
  min-width: 0;
  padding: 0.35rem;

  pointer-events: none;
  cursor: default;
  user-select: none;

  opacity: 0.3;
  transform: scale(0.88) translateY(5px);
  filter: saturate(0.65) blur(0.3px);

  box-shadow: ${({ theme }) => theme.shadow};
  transform-origin: center center;

  transition: opacity 0.65s ease, transform 0.75s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.65s ease, box-shadow 0.65s ease;

  &.is-centered {
    opacity: 1;
    transform: scale(1.045) translateY(-5px);
    filter: saturate(1) blur(0);
    box-shadow: ${({ theme }) => theme.shadowHover};
    z-index: 3;
  }

  @media (max-width: 650px) {
    flex-basis: 225px;

    &.is-centered {
      transform: scale(1.025) translateY(-3px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    transform: none;
    opacity: 1;
    filter: none;
  }
`;

// ==========================================
// EMPTY STATE
// ==========================================

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

// ==========================================
// EVENT COUNT
// ==========================================

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

// ==========================================
// EVENT DATA
// ==========================================

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
    details: "Explore the future of blockchain technology.",
  },
  {
    image: "/images/eve2.jpg",
    title: "Blockchain Summit 2027",
    date: "September 8, 2027",
    time: "9:00 PM - 9:30 PM",
    location: "Nairobi",
    details: "Explore the future of blockchain technology.",
  },
  {
    image: "/images/eve3.jpg",
    title: "Summit 2027",
    date: "September 19, 2027",
    time: "9:00 PM - 9:30 PM",
    location: "Kisumu",
    details: "Explore the future of blockchain technology.",
  },
  {
    image: "/images/eve3.jpg",
    title: "Summit 2027",
    date: "September 25, 2027",
    time: "9:00 PM - 9:30 PM",
    location: "Eldoret",
    details: "Explore the future of blockchain technology.",
  },
  {
    image: "/images/eve4.jpg",
    title: "AI Summit 2026",
    date: "December 29, 2026",
    time: "9:00 PM - 11:00 PM",
    location: "Cape Town",
    details: "Explore the future of technology at the AI Summit.",
  },
];

// ==========================================
// DATE HELPER
// ==========================================

const getEventEndDate = (event) => {
  const endTime = event.time?.split("-")[1]?.trim();

  if (!event.date || !endTime) return null;

  const parsedDate = new Date(`${event.date} ${endTime}`);

  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
};

// ==========================================
// MAIN EVENT COMPONENT
// ==========================================

const EventPro = ({
  onHighlightClick,
  modalOpen = false,
  selectedEvent = null,
  onCloseModal,
}) => {
  // ========================================
  // EVENT FILTERING
  // ========================================

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

  // ========================================
  // CAROUSEL REFERENCES AND STATE
  // ========================================

  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);

  const [centeredIndex, setCenteredIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const pausedRef = useRef(false);

  // ========================================
  // REVERSIBLE CAROUSEL MOVEMENT
  // ========================================

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;

    if (!container || !track || inactiveEvents.length === 0) {
      return;
    }

    let animationFrame;
    let lastTimestamp = 0;
    let lastCenterCheck = 0;

    let position = 0;
    let direction = -1;
    let maxDistance = 0;

    const SPEED = 18; // Pixels per second

    const updateMeasurements = () => {
      const firstCard = cardRefs.current[0];

      if (!firstCard) return;

      const containerWidth = container.clientWidth;
      const cardWidth = firstCard.offsetWidth;

      // Centre the first card at the beginning.
      const sidePadding = Math.max(0, (containerWidth - cardWidth) / 2);

      track.style.paddingLeft = `${sidePadding}px`;
      track.style.paddingRight = `${sidePadding}px`;

      // Measure the total distance without cloning cards.
      maxDistance = Math.max(0, track.scrollWidth - containerWidth);

      // Keep the current position inside the new boundaries.
      position = Math.max(-maxDistance, Math.min(0, position));

      track.style.transform = `translate3d(${position}px, 0, 0)`;
    };

    const updateCenteredCard = (timestamp) => {
      // Update spotlight approximately every 100ms.
      if (timestamp - lastCenterCheck < 100) return;

      lastCenterCheck = timestamp;

      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;

      let closestIndex = -1;
      let closestDistance = Infinity;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;

        const distance = Math.abs(centerX - cardCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex >= 0) {
        setCenteredIndex((previous) =>
          previous === closestIndex ? previous : closestIndex
        );
      }
    };

    const animate = (timestamp) => {
      if (!lastTimestamp) {
        lastTimestamp = timestamp;
      }

      // Prevent large jumps after browser tab inactivity.
      const delta = Math.min((timestamp - lastTimestamp) / 1000, 0.05);

      lastTimestamp = timestamp;

      if (!pausedRef.current && maxDistance > 0) {
        position += direction * SPEED * delta;

        // Reached the final card: reverse towards the first.
        if (position <= -maxDistance) {
          position = -maxDistance;
          direction = 1;
        }

        // Reached the first card: reverse towards the final.
        if (position >= 0) {
          position = 0;
          direction = -1;
        }

        track.style.transform = `translate3d(${position}px, 0, 0)`;
      }

      updateCenteredCard(timestamp);

      animationFrame = requestAnimationFrame(animate);
    };

    updateMeasurements();

    const resizeObserver = new ResizeObserver(() => {
      updateMeasurements();
      updateCenteredCard(performance.now());
    });

    resizeObserver.observe(container);
    resizeObserver.observe(track);

    window.addEventListener("resize", updateMeasurements);

    // Respect the user's reduced-motion preference.
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleMotionChange = () => {
      if (motionQuery.matches) {
        pausedRef.current = true;
        setIsPaused(true);
      } else {
        pausedRef.current = false;
        setIsPaused(false);
      }
    };

    handleMotionChange();

    motionQuery.addEventListener?.("change", handleMotionChange);

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);

      resizeObserver.disconnect();

      window.removeEventListener("resize", updateMeasurements);

      motionQuery.removeEventListener?.("change", handleMotionChange);
    };
  }, [inactiveEvents.length]);

  // ========================================
  // PAUSE / RESUME
  // ========================================

  const handleMouseEnter = () => {
    pausedRef.current = true;
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    pausedRef.current = false;
    setIsPaused(false);
  };

  // ========================================
  // EVENT CLICK
  // ========================================

  const handleEventClick = (event) => {
    onHighlightClick?.(event);
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <EventSection>
      {/* PAST EVENTS */}

      {inactiveEvents.length > 0 && (
        <>
          <H2>
            Past <span>Events</span>
          </H2>

          <PastEventsContainer
            ref={containerRef}
            aria-label="Previously held events"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleMouseEnter}
            onBlur={handleMouseLeave}
          >
            <PastEventsTrack ref={trackRef}>
              {inactiveEvents.map((event, index) => (
                <PastEventCard
                  key={`${event.title}-${index}`}
                  ref={(element) => {
                    cardRefs.current[index] = element;
                  }}
                  className={centeredIndex === index ? "is-centered" : ""}
                  aria-label={event.title}
                  onClick={() => handleEventClick(event)}
                >
                  <EventCard event={event} />
                </PastEventCard>
              ))}
            </PastEventsTrack>
          </PastEventsContainer>
        </>
      )}

      {/* UPCOMING EVENTS */}

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

      {/* EVENT DETAILS MODAL */}

      {modalOpen && selectedEvent && (
        <Modal onClose={onCloseModal}>
          <EventCard event={selectedEvent} />
        </Modal>
      )}
    </EventSection>
  );
};

export default EventPro;
