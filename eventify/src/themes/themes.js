// src/styles/theme.js

export const themes = {
  light: {
    mode: "light",

    background: "#F5F7FB",
    surface: "#FFFFFF",
    surfaceAlt: "#EDF2F7",
    elevated: "#FFFFFF",

    text: "#172033",
    heading: "#101828",
    secondary: "#64748B",
    muted: "#94A3B8",
    inverseText: "#FFFFFF",
    buttonText: "#FFFFFF",

    accent: "#F97316",
    accentHover: "#EA580C",
    accentSoft: "#FFF1E6",

    border: "#E5EAF1",
    divider: "#E9EEF5",
    inputBg: "#FFFFFF",
    inputBorder: "#CBD5E1",

    success: "#16A34A",
    warning: "#D97706",
    danger: "#DC2626",
    info: "#2563EB",

    shadow: "0 4px 20px rgba(15,23,42,0.05)",
    shadowHover: "0 10px 30px rgba(15,23,42,0.10)",
    overlay: "rgba(15,23,42,0.55)",
  },

  dark: {
    mode: "dark",

    background: "#0B1220",
    surface: "#111D30",
    surfaceAlt: "#18283D",
    elevated: "#1B2A40",

    text: "#E2E8F0",
    heading: "#F8FAFC",
    secondary: "#A0AEC0",
    muted: "#8292A8",
    inverseText: "#111827",
    buttonText: "#111827",

    accent: "#FB923C",
    accentHover: "#FDBA74",
    accentSoft: "#3B251A",

    border: "#26364D",
    divider: "#26364D",
    inputBg: "#16243A",
    inputBorder: "#34465F",

    success: "#4ADE80",
    warning: "#FBBF24",
    danger: "#F87171",
    info: "#60A5FA",

    shadow: "0 4px 25px rgba(0,0,0,0.20)",
    shadowHover: "0 10px 35px rgba(0,0,0,0.35)",
    overlay: "rgba(0,0,0,0.65)",
  },
};

export const getTheme = (mode) => themes[mode] || themes.light;
