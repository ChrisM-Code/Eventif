// src/styles/GlobalStyles.js

import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    min-height: 100%;
    scroll-behavior: smooth;
    background: ${({ theme }) => theme.background};
    color-scheme: ${({ theme }) => theme.mode};
  }

  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;

    font-family: "Inter", "Segoe UI", Arial, sans-serif;
    font-size: 16px;
    line-height: 1.6;

    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};

    transition:
      background-color 0.3s ease,
      color 0.3s ease;
  }

  #root {
    min-height: 100vh;
    width: 100%;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  }

  :root {
    --color-background: ${({ theme }) => theme.background};
    --color-surface: ${({ theme }) => theme.surface};
    --color-surface-alt: ${({ theme }) => theme.surfaceAlt};
    --color-elevated: ${({ theme }) => theme.elevated};

    --color-text: ${({ theme }) => theme.text};
    --color-heading: ${({ theme }) => theme.heading};
    --color-secondary: ${({ theme }) => theme.secondary};
    --color-muted: ${({ theme }) => theme.muted};

    --color-accent: ${({ theme }) => theme.accent};
    --color-accent-hover: ${({ theme }) => theme.accentHover};
    --color-accent-soft: ${({ theme }) => theme.accentSoft};

    --color-border: ${({ theme }) => theme.border};
    --color-divider: ${({ theme }) => theme.divider};

    --color-input: ${({ theme }) => theme.inputBg};
    --color-input-border: ${({ theme }) => theme.inputBorder};

    --color-success: ${({ theme }) => theme.success};
    --color-warning: ${({ theme }) => theme.warning};
    --color-danger: ${({ theme }) => theme.danger};
    --color-info: ${({ theme }) => theme.info};

    --shadow-default: ${({ theme }) => theme.shadow};
    --shadow-hover: ${({ theme }) => theme.shadowHover};

    --transition-theme:
      background-color 0.3s ease,
      color 0.3s ease,
      border-color 0.3s ease,
      box-shadow 0.3s ease;
  }

  /* Typography */

  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    color: ${({ theme }) => theme.heading};
    line-height: 1.25;
    font-weight: 700;
    transition: color 0.3s ease;
  }

  p {
    color: ${({ theme }) => theme.text};
    line-height: 1.7;
  }

  span, label, li {
    transition: color 0.3s ease;
  }

  small {
    color: ${({ theme }) => theme.secondary};
  }

  strong {
    color: ${({ theme }) => theme.heading};
  }

  a {
    color: ${({ theme }) => theme.accent};
    text-decoration: none;
    transition: color 0.25s ease;
  }

  a:hover {
    color: ${({ theme }) => theme.accentHover};
  }

  /* Media */

  img, video, svg {
    max-width: 100%;
  }

  img {
    display: block;
  }

  /* Buttons */

  button, input, textarea, select {
    font: inherit;
  }

  button {
    cursor: pointer;
    color: inherit;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Main layout */

  .page-container {
    width: 100%;
    min-height: 100vh;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: var(--transition-theme);
  }

  .section-container {
    background: ${({ theme }) => theme.surface};
    color: ${({ theme }) => theme.text};
    transition: var(--transition-theme);
  }

  .section-alt {
    background: ${({ theme }) => theme.surfaceAlt};
    color: ${({ theme }) => theme.text};
    transition: var(--transition-theme);
  }

  /* Theme typography helpers */

  .theme-heading {
    color: ${({ theme }) => theme.heading};
  }

  .theme-text {
    color: ${({ theme }) => theme.text};
  }

  .theme-secondary {
    color: ${({ theme }) => theme.secondary};
  }

  .theme-muted {
    color: ${({ theme }) => theme.muted};
  }

  .theme-accent {
    color: ${({ theme }) => theme.accent};
  }

  .theme-inverse {
    color: ${({ theme }) => theme.inverseText};
  }

  /* Cards */

  .theme-card {
    background: ${({ theme }) => theme.surface};
    color: ${({ theme }) => theme.text};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 14px;
    box-shadow: ${({ theme }) => theme.shadow};
    transition: var(--transition-theme);
  }

  .theme-card:hover {
    box-shadow: ${({ theme }) => theme.shadowHover};
  }

  .theme-panel {
    background: ${({ theme }) => theme.elevated};
    color: ${({ theme }) => theme.text};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 12px;
    transition: var(--transition-theme);
  }

  /* Buttons */

  .theme-button {
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.buttonText || theme.inverseText};
    border: 1px solid ${({ theme }) => theme.accent};
    border-radius: 8px;
    padding: 10px 18px;
    font-weight: 600;
    transition: var(--transition-theme);
  }

  .theme-button:hover {
    background: ${({ theme }) => theme.accentHover};
    border-color: ${({ theme }) => theme.accentHover};
    transform: translateY(-2px);
  }

  .theme-button-outline {
    background: transparent;
    color: ${({ theme }) => theme.accent};
    border: 1px solid ${({ theme }) => theme.accent};
    border-radius: 8px;
    padding: 10px 18px;
    transition: var(--transition-theme);
  }

  .theme-button-outline:hover {
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.buttonText};
  }

  /* Forms */

  input, textarea, select, .theme-input {
    background: ${({ theme }) => theme.inputBg};
    color: ${({ theme }) => theme.text};
    border: 1px solid ${({ theme }) => theme.inputBorder};
    border-radius: 8px;
    font-family: inherit;
    transition: var(--transition-theme);
  }

  input::placeholder,
  textarea::placeholder {
    color: ${({ theme }) => theme.muted};
    opacity: 1;
  }

  input:focus,
  textarea:focus,
  select:focus,
  .theme-input:focus {
    outline: none;
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.accent}25;
  }

  option {
    background: ${({ theme }) => theme.surface};
    color: ${({ theme }) => theme.text};
  }

  /* Borders and dividers */

  .theme-border {
    border: 1px solid ${({ theme }) => theme.border};
  }

  .theme-divider {
    border: 0;
    border-top: 1px solid ${({ theme }) => theme.divider};
  }

  hr {
    border: 0;
    border-top: 1px solid ${({ theme }) => theme.border};
  }

  /* Tables */

  table {
    width: 100%;
    border-collapse: collapse;
    color: ${({ theme }) => theme.text};
  }

  th {
    background: ${({ theme }) => theme.surfaceAlt};
    color: ${({ theme }) => theme.heading};
    text-align: left;
  }

  td, th {
    padding: 12px;
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }

  tbody tr:hover {
    background: ${({ theme }) => theme.surfaceAlt};
  }

  /* Modals and overlays */

  .theme-overlay {
    background: ${({ theme }) => theme.overlay};
  }

  .theme-modal {
    background: ${({ theme }) => theme.surface};
    color: ${({ theme }) => theme.text};
    border: 1px solid ${({ theme }) => theme.border};
    box-shadow: ${({ theme }) => theme.shadowHover};
  }

  /* Status colors */

  .text-success {
    color: ${({ theme }) => theme.success};
  }

  .text-warning {
    color: ${({ theme }) => theme.warning};
  }

  .text-danger {
    color: ${({ theme }) => theme.danger};
  }

  .text-info {
    color: ${({ theme }) => theme.info};
  }

  /* Scrollbar */

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.secondary};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.accent};
  }

  /* Accessibility */

  button:focus-visible,
  a:focus-visible,
  input:focus-visible,
  textarea:focus-visible,
  select:focus-visible {
    outline: 2px solid ${({ theme }) => theme.accent};
    outline-offset: 3px;
  }

  ::selection {
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.buttonText};
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

export default GlobalStyles;
