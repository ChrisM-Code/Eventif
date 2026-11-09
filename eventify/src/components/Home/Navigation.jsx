import styled from "styled-components";
import NavBar from "./NavBar";

const Container = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;

  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};

  border-bottom: 1px solid ${({ theme }) => theme.border};
  box-shadow: ${({ theme }) => theme.shadow};

  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease, box-shadow 0.3s ease;

  /* Keep navbar content above other page elements */
  isolation: isolate;

  > nav {
    width: 100%;
  }
`;

function Navigation() {
  return (
    <Container>
      <NavBar />
    </Container>
  );
}

export default Navigation;
