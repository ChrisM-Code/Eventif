import styled from "styled-components";
import PropTypes from "prop-types";

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10000;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 1rem;
  background: ${({ theme }) => theme.overlay};
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);

  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;

const ModalContent = styled.div`
  position: relative;

  width: 100%;
  max-width: 500px;
  max-height: min(85vh, 750px);
  overflow-y: auto;

  padding: clamp(1.5rem, 4vw, 2rem);
  border-radius: 16px;

  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: ${({ theme }) => theme.shadowHover};

  text-align: center;

  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease, box-shadow 0.3s ease;

  animation: slideUp 0.25s ease;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(15px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  h1,
  h2,
  h3 {
    color: ${({ theme }) => theme.heading};
  }

  p {
    color: ${({ theme }) => theme.secondary};
  }

  @media (max-width: 480px) {
    max-height: 90vh;
    padding: 1.5rem 1rem;
    border-radius: 12px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 36px;
  height: 36px;
  padding: 0;

  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 50%;

  background: ${({ theme }) => theme.surfaceAlt};
  color: ${({ theme }) => theme.secondary};

  font-size: 1.5rem;
  line-height: 1;

  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.accent};
    border-color: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.inverseText};
    transform: rotate(90deg);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.accent};
    outline-offset: 3px;
  }
`;

const Modal = ({ onClose, children }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <CloseButton type="button" onClick={onClose} aria-label="Close modal">
          &times;
        </CloseButton>

        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
