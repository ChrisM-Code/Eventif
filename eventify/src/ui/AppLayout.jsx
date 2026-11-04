
import styled, { keyframes } from "styled-components";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import NavBar from "../components/Home/NavBar";

// Global theme configurations
const themes = {
  light: {
    background: "#F5F7FB",
    surface: "#FFFFFF",
    text: "#172033",
    secondary: "#64748B",
    border: "#E5EAF1",
    accent: "#F97316",
    shadow: "0 4px 20px rgba(15, 23, 42, 0.05)",
  },
  dark: {
    background: "#0B1220",
    surface: "#111D30",
    text: "#F1F5F9",
    secondary: "#A0AEC0",
    border: "#26364D",
    accent: "#FB923C",
    shadow: "0 4px 25px rgba(0, 0, 0, 0.2)",
  },
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: background 0.3s ease, color 0.3s ease;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  background: ${({ theme }) => theme.surface};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  box-shadow: ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
`;

const HeaderContent = styled.div`
  position: relative;
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  min-height: calc(100vh - 70px);
  padding: 0;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: background 0.3s ease, color 0.3s ease;

  animation: ${fadeIn} 0.35s ease;

  @media (max-width: 768px) {
    min-height: calc(100vh - 60px);
  }
`;

const ThemeButton = styled.button`
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  z-index: 1002;
  transition: all 0.25s ease;

  &:hover {
    background: ${({ theme }) => theme.accent};
    color: white;
    transform: translateY(-50%) rotate(15deg);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.accent};
    outline-offset: 3px;
  }

  @media (max-width: 768px) {
    right: 12px;
    width: 36px;
    height: 36px;
  }
`;

const AppLayout = () => {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("eventify-theme") || "light";
  });

  const currentTheme = themes[mode];

  useEffect(() => {
    localStorage.setItem("eventify-theme", mode);
    document.documentElement.style.backgroundColor =
      currentTheme.background;
    document.body.style.backgroundColor = currentTheme.background;
    document.body.style.color = currentTheme.text;
    document.documentElement.style.colorScheme =
      mode === "dark" ? "dark" : "light";
  }, [mode, currentTheme]);

  const toggleTheme = () => {
    setMode((previous) => previous === "light" ? "dark" : "light");
  };

  return (
    <LayoutContainer theme={currentTheme}>
      <Header theme={currentTheme}>
        <HeaderContent>
          <NavBar />

          <ThemeButton
            theme={currentTheme}
            onClick={toggleTheme}
            aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
            title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
          >
            {mode === "light" ? <FiMoon /> : <FiSun />}
          </ThemeButton>
        </HeaderContent>
      </Header>

      <MainContent theme={currentTheme}>
        <Outlet context={{ mode, toggleTheme, currentTheme }} />
      </MainContent>
    </LayoutContainer>
  );
};

export default AppLayout;
