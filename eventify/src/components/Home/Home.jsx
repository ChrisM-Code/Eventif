import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";

import About from "../About/About";
import Events from "../Events/Events";
import Directions from "../Directions/Directions";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-6px);
  }
`;

const HomeCont = styled.section`
  position: relative;
  isolation: isolate;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-height: calc(100vh - 70px);
  padding: 5rem 1.5rem;

  overflow: hidden;
  background-image: linear-gradient(
      135deg,
      rgba(8, 15, 28, 0.82),
      rgba(8, 15, 28, 0.48)
    ),
    url("/images/eve3.jpg");

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(180deg, transparent 65%, rgba(0, 0, 0, 0.25));
  }

  @media (max-width: 768px) {
    min-height: 75vh;
    padding: 4rem 1rem;
    background-position: center;
  }
`;

const MainContent = styled.div`
  width: 100%;
  max-width: 850px;
  margin: 0 auto;
  text-align: center;
  animation: ${fadeIn} 1s ease both;

  h1 {
    color: #ffffff;
    font-size: clamp(2.3rem, 6vw, 4.8rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -1.5px;
    margin: 0 0 1.3rem;

    animation: ${float} 4s ease-in-out infinite;

    span {
      color: ${({ theme }) => theme.accent};
    }
  }

  p {
    max-width: 650px;
    margin: 0 auto;
    color: rgba(255, 255, 255, 0.9);
    font-size: clamp(1rem, 2vw, 1.25rem);
    line-height: 1.8;
  }

  @media (max-width: 768px) {
    h1 {
      letter-spacing: -0.5px;
    }
  }
`;

const DateStamp = styled.div`
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;

  display: flex;
  align-items: center;
  gap: 0.6rem;

  padding: 0.65rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;

  color: #ffffff;
  background: rgba(8, 15, 28, 0.72);
  backdrop-filter: blur(12px);

  font-size: 0.85rem;
  font-weight: 500;

  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 1.5s ease both;

  @media (max-width: 768px) {
    bottom: 1rem;
    right: 50%;
    transform: translateX(50%);
    width: max-content;
    max-width: calc(100% - 2rem);
    font-size: 0.75rem;
  }
`;

const Home = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();

      setCurrentDate(
        now.toLocaleString("en-KE", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };

    updateDate();

    const interval = setInterval(updateDate, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <HomeCont>
        <MainContent>
          <h1>
            Welcome to <span>Eventify</span>
          </h1>

          <p>
            Your one-stop platform to discover, explore, and organize amazing
            events. Connect with people, experience unforgettable moments, and
            make every event count.
          </p>
        </MainContent>

        <DateStamp>{currentDate}</DateStamp>
      </HomeCont>

      <About />
      <Events />
      <Directions />
    </>
  );
};

export default Home;
