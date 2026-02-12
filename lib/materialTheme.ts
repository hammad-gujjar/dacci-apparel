import { createTheme, Shadows } from "@mui/material";
import { Assistant } from "next/font/google";
const assistantFont = Assistant({
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  subsets: ["latin"],
});

const defaultShadows = createTheme().shadows;

export const lightTheme = createTheme({
  colorSchemes: {
    light: true,
  },
  palette: {
    mode: "light",
    common: {
      black: "#030712",
      white: "#fff",
    },
    primary: {
      main: "#8e51ff",
    },
    secondary: {
      main: "#8e51ff",
      light: "#f8fafc",
    },
    background: {
      paper: "#ffffff",
      default: "#ffffff",
    },
    text: {
      primary: "#030712",
      secondary: "#6B7280",
    },
    success: {
      main: "#22c55e",
      light: "#4caf50",
      dark: "#1b5e20",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: assistantFont.style.fontFamily,
  },
  shadows: defaultShadows.map((shadow, index) => {
    if (index === 1) return "0px 2px 1px -1px rgba(0,0,0,0.150),0px 1px 1px 0px rgba(0,0,0,0.150),0px 1px 3px 0px rgba(0,0,0,0.150)";
    if (index === 2) return "none";
    if (index === 8) return "0 5px 5px rgba(0, 0, 0, 0.15)";
    return shadow;
  }) as Shadows,
});

export const darkTheme = createTheme({
  colorSchemes: {
    dark: true,
  },
  palette: {
    mode: "dark",
    common: {
      black: "#030712",
      white: "#fff",
    },
    primary: {
      main: "#8e51ff",
    },
    background: {
      paper: "#212121",
      default: "#212121",
    },
    text: {
      primary: "#d4d4d4",
      secondary: "#9ca3af",
    },
    action: {
      active: "#9ca3af",
    },
  },
  typography: {
    fontFamily: assistantFont.style.fontFamily,
  },
  shadows: defaultShadows.map((shadow, index) => {
    if (index === 1) return "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)";
    if (index === 2) return "none";
    if (index === 8) return "0 5px 5px rgba(0, 0, 0, 0.15)";
    return shadow;
  }) as Shadows,
});