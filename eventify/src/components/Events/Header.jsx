import styled from "styled-components";
import EventPro from "./EventPro";

const HeaderContainer = styled.header`
  position: relative;
  display: block;
  width: 100%;
  min-height: 220px;
  margin: 0;
  padding: clamp(3rem, 7vw, 5rem) 1.25rem 2.5rem;
  text-align: center;

  color: ${({ theme }) => theme.text};

  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h1`
  display: block;
  margin: 0 0 1rem;

  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -1.5px;

  color: ${({ theme }) => theme.heading};

  span {
    color: ${({ theme }) => theme.accent};
  }
`;

const Subtitle = styled.p`
  display: block;
  width: 100%;
  max-width: 780px;
  margin: 0 auto;

  font-size: clamp(0.95rem, 2vw, 1.15rem);
  font-weight: 500;
  line-height: 1.8;

  color: ${({ theme }) => theme.secondary};

  strong {
    font-weight: 600;
    color: ${({ theme }) => theme.text};
  }
`;

function Header() {
  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <Title>
            Discover <span>Events</span>
          </Title>

          <Subtitle>
            <strong>
              Welcome to our Events Page! Explore upcoming events and choose the
              ones that inspire you. Your next adventure starts here!
            </strong>
          </Subtitle>
        </HeaderContent>
      </HeaderContainer>
      <EventPro />
    </>
  );
}

export default Header;
