import styled from "styled-components";
import Header from "./Header";

const EventsContainer = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;

  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};

  transition: background-color 0.3s ease, color 0.3s ease;

  .events-content {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem clamp(1rem, 3vw, 2rem) 3rem;
    flex: 1;
  }

  @media (max-width: 768px) {
    .events-content {
      padding: 1rem 0.75rem 2rem;
    }
  }
`;

function Events() {
  return (
    <EventsContainer className="page-container">
      <div className="events-content">
        <Header />
      </div>
    </EventsContainer>
  );
}

export default Events;
