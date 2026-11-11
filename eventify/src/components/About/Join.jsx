import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-8px);
  }

  60% {
    transform: translateY(-4px);
  }
`;

const Container = styled.section`
  width: calc(100% - 40px);
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 2.5rem auto;
  padding: 3.5rem 2rem;

  box-shadow: ${({ theme }) => theme.shadow};

  transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadowHover};
  }

  @media (max-width: 768px) {
    width: calc(100% - 24px);
    padding: 2.5rem 1.5rem;
    margin: 1.5rem auto;
  }

  @media (max-width: 480px) {
    padding: 2rem 1rem;
    border-radius: 12px;
  }
`;

const Title = styled.h1`
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 800;
  color: ${({ theme }) => theme.heading};
  margin-bottom: 1.2rem;
  line-height: 1.3;

  span {
    color: ${({ theme }) => theme.accent};
    display: inline-block;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.accentHover};
    }
  }
`;

const Description = styled.p`
  width: 100%;
  max-width: 850px;
  font-size: clamp(0.95rem, 2vw, 1.15rem);
  line-height: 1.9;
  color: ${({ theme }) => theme.secondary};
  margin: 0 auto 1.5rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  font-size: clamp(0.9rem, 2vw, 1.05rem);
  line-height: 1.8;
  color: ${({ theme }) => theme.text};

  strong {
    display: inline-block;
    color: ${({ theme }) => theme.accent};
    font-weight: 700;

    &:hover {
      animation: ${bounce} 0.8s ease-in-out;
    }
  }
`;

const JoinButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  margin-top: 1.5rem;
  padding: 12px 25px;

  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.buttonText || "#FFFFFF"};

  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;

  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.accentHover};
    color: ${({ theme }) => theme.buttonText || "#FFFFFF"};
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadowHover};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.accent};
    outline-offset: 4px;
  }

  &:active {
    transform: translateY(-1px);
  }
`;

function Join() {
  const navigate = useNavigate();

  const handleExploreEvents = () => {
    navigate("/events");
  };

  return (
    <Container>
      <Title>
        Join the <span>Eventfy Community</span>
      </Title>

      <Description>
        Be part of a growing community of event enthusiasts! With Eventfy,
        you're not just attending events; you're creating memories, building
        networks, and enriching your life experiences.
      </Description>

      <List>
        <ListItem>
          <strong>
            Let's make every moment count. Start exploring with Eventfy today!
          </strong>
        </ListItem>
      </List>

      <JoinButton type="button" onClick={handleExploreEvents}>
        Explore Events
      </JoinButton>
    </Container>
  );
}

export default Join;
