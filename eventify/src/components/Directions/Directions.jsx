import { useContext } from "react";
import styled from "styled-components";
import Buttons from "./Buttons";
import MapComponent from "./Maps/MapComponent";
import { MapContext } from "./Maps/MapContext";

const DirectionsPage = styled.main`
  width: 100%;
  min-height: 100vh;
  padding: 2rem clamp(1rem, 4vw, 3rem) 4rem;

  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};

  transition: background-color 0.3s ease, color 0.3s ease;
`;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: clamp(2rem, 5vw, 3.5rem) 1.5rem;

  text-align: center;

  transition: background-color 0.3s ease, border-color 0.3s ease,
    box-shadow 0.3s ease;

  @media (max-width: 600px) {
    padding: 2rem 1rem;
    border-radius: 14px;
  }
`;

const Heading = styled.h1`
  margin: 0 0 1rem;

  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -1px;

  color: ${({ theme }) => theme.heading};

  span {
    color: ${({ theme }) => theme.accent};
    transition: color 0.3s ease;
  }
`;

const Message = styled.p`
  max-width: 720px;
  margin: 0 auto;

  font-size: clamp(0.95rem, 2vw, 1.1rem);
  line-height: 1.8;

  color: ${({ theme }) => theme.secondary};
`;

const ButtonsSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 1000px;
  margin: 1.5rem auto 2rem;

  transition: var(--transition-theme);

  @media (max-width: 600px) {
    padding: 1rem 0.75rem;
    margin: 1rem auto 1.5rem;
  }
`;

const MapSection = styled.section`
  width: 100%;
  max-width: 1200px;
  min-height: 450px;
  margin: 0 auto;
  padding: 0;

  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 18px;
  box-shadow: ${({ theme }) => theme.shadow};
  overflow: hidden;

  transition: var(--transition-theme);

  @media (max-width: 600px) {
    min-height: 300px;
    border-radius: 12px;
  }
`;

const EmptyMap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  min-height: 300px;
  padding: 2rem;

  color: ${({ theme }) => theme.secondary};
  text-align: center;

  h3 {
    margin: 0;
    color: ${({ theme }) => theme.heading};
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.secondary};
    font-size: 0.9rem;
  }
`;

function Directions() {
  const { destination } = useContext(MapContext);

  return (
    <DirectionsPage className="page-container">
      <Container>
        <Heading>
          Find Your Way <span>with Ease</span>
        </Heading>

        <Message>
          Stay on Eventify for the best experience. Use our real-time directions
          to get to your event hassle-free!
        </Message>
        <ButtonsSection>
          <Buttons />
        </ButtonsSection>
      </Container>

      <MapSection>
        {destination ? (
          <MapComponent />
        ) : (
          <EmptyMap>
            <h3>No destination selected</h3>
            <p>Select an event location to view its directions on the map.</p>
          </EmptyMap>
        )}
      </MapSection>
    </DirectionsPage>
  );
}

export default Directions;
