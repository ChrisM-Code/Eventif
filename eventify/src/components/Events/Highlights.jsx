import styled from "styled-components";
import { FaRegBell } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

const HighlightButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 42px;
  height: 42px;
  padding: 0;

  background: ${({ hasNew, theme }) =>
    hasNew ? theme.accent : theme.surfaceAlt};

  color: ${({ hasNew, theme }) =>
    hasNew ? theme.inverseText : theme.secondary};

  border: 1px solid
    ${({ hasNew, theme }) => (hasNew ? theme.accent : theme.border)};

  border-radius: 12px;
  font-size: 18px;

  cursor: pointer;

  box-shadow: ${({ theme }) => theme.shadow};

  transition: background-color 0.25s ease, color 0.25s ease,
    border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;

  &:hover {
    background: ${({ theme }) => theme.accentHover};
    color: ${({ theme }) => theme.inverseText};
    border-color: ${({ theme }) => theme.accentHover};
    box-shadow: ${({ theme }) => theme.shadowHover};
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.96);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.accent};
    outline-offset: 3px;
  }

  svg {
    display: block;
  }
`;

const NotificationDot = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;

  width: 9px;
  height: 9px;

  background: ${({ theme }) => theme.danger};
  border: 2px solid ${({ theme }) => theme.surface};
  border-radius: 50%;
`;

function Highlights({ hasNewEvent, onClick }) {
  return (
    <Container>
      <HighlightButton
        type="button"
        hasNew={hasNewEvent}
        onClick={onClick}
        aria-label={hasNewEvent ? "New event notifications" : "Notifications"}
        aria-live="polite"
      >
        <FaRegBell aria-hidden="true" />

        {hasNewEvent && <NotificationDot />}
      </HighlightButton>
    </Container>
  );
}

export default Highlights;
