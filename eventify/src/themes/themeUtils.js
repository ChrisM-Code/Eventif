export const themeColors = {
  background: ({ theme }) => theme.background,
  surface: ({ theme }) => theme.surface,
  surfaceAlt: ({ theme }) => theme.surfaceAlt,
  elevated: ({ theme }) => theme.elevated,

  text: ({ theme }) => theme.text,
  heading: ({ theme }) => theme.heading,
  secondary: ({ theme }) => theme.secondary,
  muted: ({ theme }) => theme.muted,

  accent: ({ theme }) => theme.accent,
  border: ({ theme }) => theme.border,
  shadow: ({ theme }) => theme.shadow,
};

export const themeCard = ({ theme }) => `
  background: ${theme.surface};
  color: ${theme.text};
  border: 1px solid ${theme.border};
  border-radius: 14px;
  box-shadow: ${theme.shadow};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${theme.shadowHover};
  }
`;

export const themeSection = ({ theme }) => `
  background: ${theme.background};
  color: ${theme.text};
  transition: all 0.3s ease;
`;

export const themeHeading = ({ theme }) => `
  color: ${theme.heading};
  transition: color 0.3s ease;
`;

export const themeParagraph = ({ theme }) => `
  color: ${theme.secondary};
  line-height: 1.7;
  transition: color 0.3s ease;
`;

export const themeButton = ({ theme }) => `
  background: ${theme.accent};
  color: ${theme.buttonText || theme.inverseText};
  border: 1px solid ${theme.accent};
  border-radius: 8px;
  padding: 10px 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background: ${theme.accentHover};
    border-color: ${theme.accentHover};
  }
`;

export const themeInput = ({ theme }) => `
  background: ${theme.inputBg};
  color: ${theme.text};
  border: 1px solid ${theme.inputBorder};
  border-radius: 8px;
  padding: 10px 12px;
  transition: all 0.25s ease;

  &::placeholder {
    color: ${theme.muted};
  }

  &:focus {
    outline: none;
    border-color: ${theme.accent};
  }
`;
