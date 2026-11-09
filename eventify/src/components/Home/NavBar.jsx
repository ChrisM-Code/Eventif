import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled, { useTheme } from "styled-components";

import {
  FiMenu,
  FiX,
  FiHome,
  FiInfo,
  FiCalendar,
  FiMapPin,
  FiArrowUpRight,
} from "react-icons/fi";

import Logo from "./Logo";

// Main navbar
const Navbar = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;

  background: ${({ theme }) => theme.surface};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  box-shadow: ${({ theme }) => theme.shadow};

  transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
`;

const NavContainer = styled.nav`
  position: relative;
  width: min(100% - 48px, 1280px);
  min-height: 76px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  @media (max-width: 768px) {
    width: calc(100% - 32px);
    min-height: 68px;
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;

  @media (max-width: 768px) {
    position: absolute;
    top: 100%;
    left: -16px;
    right: -16px;

    display: ${({ $open }) => ($open ? "flex" : "none")};
    flex-direction: column;
    align-items: stretch;
    gap: 7px;

    padding: 16px;

    background: ${({ theme }) => theme.surface};
    border-top: 1px solid ${({ theme }) => theme.border};
    border-bottom: 1px solid ${({ theme }) => theme.border};
    box-shadow: ${({ theme }) => theme.shadowHover};

    animation: ${({ $open }) => ($open ? "menuReveal 0.2s ease-out" : "none")};

    @keyframes menuReveal {
      from {
        opacity: 0;
        transform: translateY(-8px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
`;

const NavItem = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  gap: 9px;

  position: relative;
  padding: 10px 14px;
  border-radius: 9px;

  color: ${({ theme }) => theme.secondary};
  font-size: 0.94rem;
  font-weight: 600;
  white-space: nowrap;
  text-decoration: none;

  transition: all 0.25s ease;

  svg {
    font-size: 17px;
    flex-shrink: 0;
  }

  &:hover {
    color: ${({ theme }) => theme.accent};
    background: ${({ theme }) => theme.accentSoft};
  }

  &.active {
    color: ${({ theme }) => theme.accent};
    background: ${({ theme }) => theme.accentSoft};
  }

  &.active::after {
    content: "";
    position: absolute;
    bottom: 3px;
    left: 14px;
    right: 14px;
    height: 2px;
    border-radius: 5px;
    background: ${({ theme }) => theme.accent};
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 13px 15px;

    &.active::after {
      display: none;
    }
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
`;

const ExploreButton = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;

  padding: 11px 18px;
  border-radius: 9px;

  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.buttonText || "#FFFFFF"};
  border: 1px solid ${({ theme }) => theme.accent};

  font-size: 0.9rem;
  font-weight: 700;
  white-space: nowrap;

  transition: all 0.25s ease;

  &:hover {
    background: ${({ theme }) => theme.accentHover};
    border-color: ${({ theme }) => theme.accentHover};
    color: ${({ theme }) => theme.buttonText || "#FFFFFF"};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadowHover};
  }

  svg {
    font-size: 17px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  width: 42px;
  height: 42px;

  align-items: center;
  justify-content: center;

  background: ${({ theme }) => theme.surfaceAlt};
  color: ${({ theme }) => theme.heading};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 9px;

  font-size: 21px;
  transition: all 0.25s ease;

  &:hover {
    color: ${({ theme }) => theme.accent};
    background: ${({ theme }) => theme.accentSoft};
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();

  // Close mobile menu after navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close menu with Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Navigation links
  const navItems = [
    {
      label: "Home",
      path: "/",
      icon: <FiHome />,
      end: true,
    },
    {
      label: "About",
      path: "/about",
      icon: <FiInfo />,
    },
    {
      label: "Events",
      path: "/events",
      icon: <FiCalendar />,
    },
    {
      label: "Directions",
      path: "/map",
      icon: <FiMapPin />,
    },
  ];

  return (
    <Navbar>
      <NavContainer aria-label="Main navigation">
        <Brand>
          <Logo />
        </Brand>

        <NavLinks id="mobile-navigation" $open={menuOpen}>
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => setMenuOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavItem>
          ))}
        </NavLinks>

        <NavActions>
          <ExploreButton to="/events">
            Explore Events
            <FiArrowUpRight />
          </ExploreButton>

          <MobileMenuButton
            type="button"
            onClick={() => setMenuOpen((previous) => !previous)}
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </MobileMenuButton>
        </NavActions>
      </NavContainer>
    </Navbar>
  );
}

export default NavBar;
