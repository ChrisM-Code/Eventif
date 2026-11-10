// src/components/About/About.jsx

import styled from "styled-components";
import Mission from "./Mission";

const Container = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 3rem 2rem;

  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};

  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;

  box-shadow: ${({ theme }) => theme.shadow};

  transition: all 0.3s ease;

  @media (max-width: 768px) {
    margin: 1rem auto;
    padding: 2rem 1rem;
    border-radius: 12px;
  }
`;

const Heading = styled.h1`
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  color: ${({ theme }) => theme.heading};

  text-align: center;
  font-weight: 800;
  margin-bottom: 1.5rem;

  span {
    color: ${({ theme }) => theme.accent};
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.accentHover};
    }
  }
`;

const Paragraph = styled.p`
  max-width: 850px;
  margin: 0 auto;

  font-size: clamp(1rem, 2vw, 1.125rem);
  line-height: 1.9;

  text-align: center;
  color: ${({ theme }) => theme.secondary};

  strong {
    color: ${({ theme }) => theme.accent};
    font-weight: 700;
  }
`;

function About() {
  return (
    <>
      <Container>
        <Heading>
          About <span>Eventify</span>
        </Heading>

        <Paragraph>
          Welcome to <strong>Eventify</strong>, your ultimate destination for
          discovering and showcasing events happening across various locations!
          Whether you're looking for concerts, workshops, festivals, or
          networking events, Eventify makes it simple to explore, share, and
          engage with events near you or anywhere around the globe.
        </Paragraph>
      </Container>

      <Mission />
    </>
  );
}

export default About;
