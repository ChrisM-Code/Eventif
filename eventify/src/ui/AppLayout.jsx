import styled, { ThemeProvider } from "styled-components";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

import NavBar from "../components/Home/NavBar";

import GlobalStyles from "../themes/GlobalStyles";
import { getTheme, themes } from "../themes/themes";

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

  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};

  transition: all 0.3s ease;
`;

const ThemeButton = styled.button`
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);

  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 50%;

  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};

  cursor: pointer;
  font-size: 18px;
  z-index: 1002;

  transition: all 0.25s ease;

  &:hover {
    background: ${({ theme }) => theme.accent};
    color: #ffffff;
    border-color: ${({ theme }) => theme.accent};
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
    const saved = localStorage.getItem("eventify-theme");
    return saved === "dark" ? "dark" : "light";
  });

  const currentTheme = getTheme(mode);

  useEffect(() => {
    localStorage.setItem("eventify-theme", mode);

    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((previous) => (previous === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={themes[mode]}>
      {/* Global theme styling */}
      <GlobalStyles />

      <LayoutContainer>
        <Header>
          <HeaderContent>
            <NavBar />

            <ThemeButton
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${
                mode === "light" ? "dark" : "light"
              } mode`}
              title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
            >
              {mode === "light" ? <FiMoon /> : <FiSun />}
            </ThemeButton>
          </HeaderContent>
        </Header>

        <MainContent>
          <Outlet
            context={{
              mode,
              toggleTheme,
              currentTheme,
            }}
          />
        </MainContent>
      </LayoutContainer>
    </ThemeProvider>
  );
};

export default AppLayout;
