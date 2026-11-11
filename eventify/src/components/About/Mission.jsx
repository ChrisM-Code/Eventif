// src/components/About/Mission.jsx

import styled from "styled-components";
import Section from "./Section";

const Container = styled.section`
  width: calc(100% - 40px);
  max-width: 1200px;

  margin: 1.5rem auto;
  padding: 3rem 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  box-shadow: ${({ theme }) => theme.shadow};

  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadowHover};
  }

  @media (max-width: 768px) {
    width: calc(100% - 24px);
    padding: 2rem 1.5rem;
    margin: 1rem auto;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
    border-radius: 12px;
  }
`;

const Heading = styled.h1`
  font-size: clamp(1.7rem, 4vw, 2.4rem);
  font-weight: 800;

  color: ${({ theme }) => theme.heading};

  text-align: center;
  margin-bottom: 1.25rem;

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
  width: 100%;
  max-width: 900px;

  font-size: clamp(1rem, 2vw, 1.15rem);
  line-height: 1.9;

  color: ${({ theme }) => theme.secondary};
  text-align: center;

  margin: 0 auto;

  strong {
    color: ${({ theme }) => theme.accent};
    font-weight: 700;
  }

  @media (max-width: 480px) {
    line-height: 1.75;
  }
`;

function Mission() {
  return (
    <>
      <Container>
        <Heading>
          Our <span>Mission</span>
        </Heading>

        <Paragraph>
          At <strong>Eventfy</strong>, we believe in the power of connection.
          Our mission is to bring people together by making it easy to discover
          and participate in events that match their interests, passions, and
          goals. From local community gatherings to international conferences,
          Eventfy bridges the gap between event organizers and attendees.
        </Paragraph>
      </Container>

      <Section />
    </>
  );
}

export default Mission;
