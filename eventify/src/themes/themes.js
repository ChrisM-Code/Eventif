export const themes = {
  light: {
    mode: "light",

    // Page backgrounds
    background: "#F5F7FB",
    surface: "#FFFFFF",
    surfaceAlt: "#EDF2F7",
    elevated: "#FFFFFF",

    // Typography
    text: "#172033",
    heading: "#101828",
    secondary: "#64748B",
    muted: "#94A3B8",
    inverseText: "#FFFFFF",

    // Brand
    accent: "#F97316",
    accentHover: "#EA580C",
    accentSoft: "#FFF1E6",

    // UI
    border: "#E5EAF1",
    divider: "#E9EEF5",
    inputBg: "#FFFFFF",
    inputBorder: "#CBD5E1",

    // Status colors
    success: "#16A34A",
    warning: "#D97706",
    danger: "#DC2626",
    info: "#2563EB",

    // Effects
    shadow: "0 4px 20px rgba(15,23,42,0.05)",
    shadowHover: "0 10px 30px rgba(15,23,42,0.10)",
    overlay: "rgba(15,23,42,0.55)",
  },

  dark: {
    mode: "dark",

    // Page backgrounds
    background: "#0B1220",
    surface: "#111D30",
    surfaceAlt: "#18283D",
    elevated: "#1B2A40",

    // Typography
    text: "#E2E8F0",
    heading: "#F8FAFC",
    secondary: "#A0AEC0",
    muted: "#8292A8",
    inverseText: "#111827",

    // Brand
    accent: "#FB923C",
    accentHover: "#FDBA74",
    accentSoft: "#3B251A",

    // UI
    border: "#26364D",
    divider: "#26364D",
    inputBg: "#16243A",
    inputBorder: "#34465F",

    // Status colors
    success: "#4ADE80",
    warning: "#FBBF24",
    danger: "#F87171",
    info: "#60A5FA",

    // Effects
    shadow: "0 4px 25px rgba(0,0,0,0.20)",
    shadowHover: "0 10px 35px rgba(0,0,0,0.35)",
    overlay: "rgba(0,0,0,0.65)",
  },
};

export const getTheme = (mode) => {
  return themes[mode] || themes.light;
};
