import styled from "styled-components";
import Join from "./Join";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  width: min(100% - 2rem, 1200px);
  margin: 2rem auto;
  padding: 0;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
  }
`;

const SectionCard = styled.section`
  min-width: 0;
  padding: clamp(1.25rem, 3vw, 2rem);
  border-radius: 16px;

  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: ${({ theme }) => theme.shadow};

  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadowHover};
    transform: translateY(-3px);
  }

  h2 {
    font-size: clamp(1.35rem, 2.5vw, 1.75rem);
    font-weight: 700;
    line-height: 1.3;
    text-align: center;
    margin: 0 0 1.5rem;
    color: ${({ theme }) => theme.heading};

    span {
      color: ${({ theme }) => theme.accent};
      transition: color 0.3s ease;
    }
  }

  ul {
    padding-left: 1.4rem;
    margin: 0;
    list-style: disc;
  }

  li {
    padding-left: 0.25rem;
    margin-bottom: 1rem;
    font-size: clamp(0.95rem, 1.5vw, 1.05rem);
    line-height: 1.8;
    color: ${({ theme }) => theme.secondary};

    &::marker {
      color: ${({ theme }) => theme.accent};
    }

    strong {
      color: ${({ theme }) => theme.heading};
      font-weight: 650;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

function Section() {
  return (
    <>
      <Container>
        <SectionCard>
          <h2>
            What <span>We Offer</span>
          </h2>

          <ul>
            <li>
              <strong>Discover Events:</strong> Explore a wide range of events
              curated for different interests and locations. Use our smart
              filters to find events tailored to your preferences.
            </li>

            <li>
              <strong>Showcase Your Event:</strong> Are you an organizer?
              Eventfy provides an intuitive platform to list your events, reach
              a broader audience, and manage your event details with ease.
            </li>
          </ul>
        </SectionCard>

        <SectionCard>
          <h2>
            Why Choose <span>Eventfy?</span>
          </h2>

          <ul>
            <li>
              <strong>User-Friendly Interface:</strong> Navigate through events
              effortlessly with our sleek and intuitive design.
            </li>

            <li>
              <strong>Global Reach:</strong> Discover events happening around
              the corner or on the other side of the world.
            </li>

            <li>
              <strong>Community Focused:</strong> Build meaningful connections
              by attending events that matter to you.
            </li>
          </ul>
        </SectionCard>
      </Container>

      <Join />
    </>
  );
}

export default Section;
