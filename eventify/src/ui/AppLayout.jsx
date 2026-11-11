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
  width: 100%;
  z-index: 1000;

  background: ${({ theme }) => theme.surface};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  box-shadow: ${({ theme }) => theme.shadow};
`;

const HeaderContent = styled.div`
  width: 100%;
  min-height: 68px;
  padding: 0 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 768px) {
    min-height: 64px;
    padding: 0 18px;
    gap: 12px;
  }

  @media (max-width: 480px) {
    min-height: 60px;
    padding: 0 14px;
    gap: 10px;
  }

  @media (max-width: 360px) {
    padding: 0 10px;
    gap: 8px;
  }
`;

const NavigationWrapper = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;

  /* Reserve space for the theme and menu controls */
  @media (max-width: 768px) {
    min-width: 0;
  }
`;

const ThemeButtonWrapper = styled.div`
  position: relative;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: 8px;

  @media (max-width: 768px) {
    margin-left: 4px;
  }

  @media (max-width: 480px) {
    margin-left: 2px;
  }
`;

const ThemeButton = styled.button`
  width: 40px;
  height: 40px;
  flex-shrink: 0;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 50%;

  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};

  cursor: pointer;
  font-size: 18px;

  transition: all 0.25s ease;

  &:hover {
    background: ${({ theme }) => theme.accent};
    color: #fff;
    border-color: ${({ theme }) => theme.accent};
    transform: rotate(12deg);
  }

  &:active {
    transform: scale(0.94);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.accent};
    outline-offset: 3px;
  }

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    width: 38px;
    height: 38px;
  }

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
  }

  @media (max-width: 360px) {
    width: 34px;
    height: 34px;
  }
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  min-width: 0;
  min-height: calc(100vh - 65px);

  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};

  transition: background 0.3s ease, color 0.3s ease;
`;

const AppLayout = () => {
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem("eventify-theme") === "dark"
        ? "dark"
        : "light";
    } catch {
      return "light";
    }
  });

  const currentTheme = getTheme(mode);

  useEffect(() => {
    try {
      localStorage.setItem("eventify-theme", mode);
    } catch {
      // Continue if storage is unavailable
    }

    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((previous) => (previous === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={themes[mode]}>
      <GlobalStyles />

      <LayoutContainer>
        <Header>
          <HeaderContent>
            <NavigationWrapper>
              <NavBar />
              <ThemeButtonWrapper>
                <ThemeButton
                  type="button"
                  onClick={toggleTheme}
                  aria-label={`Switch to ${
                    mode === "light" ? "dark" : "light"
                  } mode`}
                  title={`Switch to ${
                    mode === "light" ? "dark" : "light"
                  } mode`}
                >
                  {mode === "light" ? <FiMoon /> : <FiSun />}
                </ThemeButton>
              </ThemeButtonWrapper>
            </NavigationWrapper>
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
