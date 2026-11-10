import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  background: ${({ theme }) => theme.overlay};
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 1000;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContent = styled.div`
  width: 100%;
  min-width: 250px;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;

  padding: 24px;
  border-radius: 16px;

  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: ${({ theme }) => theme.shadowHover};

  text-align: center;

  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease, box-shadow 0.3s ease;

  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.secondary}
    ${({ theme }) => theme.surfaceAlt};

  @media (max-width: 600px) {
    max-width: 100%;
    padding: 18px;
    border-radius: 14px;
  }
`;

const ModalEventWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 12px;

  color: ${({ theme }) => theme.text};

  h1,
  h2,
  h3,
  h4 {
    color: ${({ theme }) => theme.heading};
  }

  p,
  span {
    color: ${({ theme }) => theme.secondary};
  }

  @media (max-width: 600px) {
    padding: 5px;
    font-size: 0.9rem;
  }
`;

const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 100px;
  padding: 10px 20px;
  margin-top: 20px;

  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.inverseText};

  border: 1px solid ${({ theme }) => theme.accent};
  border-radius: 9px;

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;

  transition: background-color 0.25s ease, border-color 0.25s ease,
    transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    background: ${({ theme }) => theme.accentHover};
    border-color: ${({ theme }) => theme.accentHover};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadow};
  }

  &:active {
    transform: scale(0.97);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.accent};
    outline-offset: 3px;
  }
`;

const Modal = ({ children, onClose }) => (
  <ModalOverlay>
    <ModalContent>
      <ModalEventWrapper>{children}</ModalEventWrapper>

      <CloseButton type="button" onClick={onClose}>
        Close
      </CloseButton>
    </ModalContent>
  </ModalOverlay>
);

export default Modal;
