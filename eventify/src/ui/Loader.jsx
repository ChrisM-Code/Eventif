import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
<<<<<<< HEAD
import imgl1 from "../ui/Images/L1.jpg";
import imgl2 from "../ui/Images/L2.jpg";
import imgl3 from "../ui/Images/L3.jpg";
=======
>>>>>>> 6c3afdb (refactor: improve global UI styling and application layout)

import imgl1 from "./images/L1.jpg";
import imgl2 from "./images/L2.jpg";
import imgl3 from "./images/L3.jpg";

// Keep images outside component
const loaderImages = [imgl1, imgl2, imgl3];

// =====================================
// ANIMATIONS
// =====================================

const fade = keyframes`
  0% {
    opacity: 0.7;
    transform: scale(0.95);
  }

  50% {
    opacity: 1;
    transform: scale(1);
  }

  100% {
    opacity: 0.7;
    transform: scale(0.95);
  }
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

// =====================================
// LOADER OVERLAY
// =====================================

const OverlayContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: ${({ theme }) => theme?.overlay || "rgba(15,23,42,0.55)"};

  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
`;

// =====================================
// SPINNER
// =====================================

const SpinnerWrapper = styled.div`
  position: relative;

  width: clamp(90px, 10vw, 125px);
  height: clamp(90px, 10vw, 125px);

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  &::before {
    content: "";
    position: absolute;
    inset: -5px;

    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: ${({ theme }) => theme?.accent || "#F97316"};
    border-right-color: ${({ theme }) => theme?.accent || "#F97316"};

    animation: ${spin} 1.2s linear infinite;
  }
`;

const LogoSpinner = styled.div`
  width: 100%;
  height: 100%;

  border-radius: 50%;
  overflow: hidden;

  border: 2px solid ${({ theme }) => theme?.accent || "#F97316"};

  box-shadow: 0 0 25px rgba(249, 115, 22, 0.3);

  animation: ${fade} 2s ease-in-out infinite;
`;

const SpinnerImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// =====================================
// LOADING TEXT
// =====================================

const LoadingText = styled.p`
  margin-top: 1.5rem;

  color: ${({ theme }) => theme?.inverseText || "#FFFFFF"};

  font-weight: 600;
  font-size: clamp(0.95rem, 2vw, 1.2rem);

  letter-spacing: 0.5px;
  text-align: center;
`;

// =====================================
// LOADER COMPONENT
// =====================================

const Loader = ({
  isLoading = true,
  message = "Loading Eventify, please wait...",
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setIndex((previous) => (previous + 1) % loaderImages.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <OverlayContainer role="status" aria-live="polite" aria-label={message}>
      <SpinnerWrapper>
        <LogoSpinner>
          <SpinnerImage src={loaderImages[index]} alt="Eventify logo" />
        </LogoSpinner>
      </SpinnerWrapper>

      <LoadingText>{message}</LoadingText>
    </OverlayContainer>
  );
};

export default Loader;
