import { MapProvider } from "./Maps/MapContext";
import MapComponent from "./Maps/MapComponent";
import styled from "styled-components";

const MapPage = styled.main`
  width: 100%;
  min-height: 100vh;
  padding: clamp(1rem, 3vw, 2rem);
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const MapWrapper = styled.section`
  width: 100%;
  max-width: 1400px;
  min-height: 70vh;
  margin: 0 auto;
  padding: clamp(0.75rem, 2vw, 1.5rem);

  display: flex;
  flex-direction: column;
  gap: 1rem;

  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadow};

  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease, box-shadow 0.3s ease;

  @media (max-width: 768px) {
    min-height: 75vh;
    padding: 0.75rem;
    border-radius: 12px;
  }
`;

function Map() {
  return (
    <MapProvider>
      <MapPage className="page-container">
        <MapWrapper>
          <MapComponent />
        </MapWrapper>
      </MapPage>
    </MapProvider>
  );
}

export default Map;
