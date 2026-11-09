import styled from "styled-components";
import { Link } from "react-router-dom";

const LogoN = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0;

  font-size: 1.65rem;
  font-weight: 800;
  letter-spacing: -1px;
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;

  color: ${({ theme }) => theme.heading};

  transition: color 0.25s ease, transform 0.25s ease;

  span {
    color: ${({ theme }) => theme.accent};
    transition: color 0.25s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.accentHover};
    transform: translateY(-1px);

    span {
      color: ${({ theme }) => theme.heading};
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.accent};
    outline-offset: 5px;
    border-radius: 4px;
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

function Logo() {
  return (
    <LogoN to="/" aria-label="Eventify home">
      Event<span>ify</span>
    </LogoN>
  );
}

export default Logo;
