import { createContext, useContext, useState } from "react";


const lightTheme = {
  background: "#F4E9FF",
  card: "rgba(255,255,255,0.75)",
  cardSolid: "#FFFFFF",
  text: "#555555",
  subText: "#888888",
  primary: "#A855F7",
  tabBar: "rgba(255,255,255,0.78)",
};

const darkTheme = {
  background: "#2A0E4A",
  card: "rgba(142,121,182,0.85)",
  cardSolid: "#8E79B6",
  text: "#FFFFFF",
  subText: "#E6D9FF",
  primary: "#A855F7",
  tabBar: "rgba(142,121,182,0.85)",
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);