import { createContext, useContext, useMemo, useState } from "react";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // "light" | "dark"
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState("Sunaryo");
  const [selectedMajor, setSelectedMajor] = useState(""); // default filter

  const value = useMemo(() => ({
    theme,
    setTheme,
    isLoggedIn,
    setIsLoggedIn,
    userName,
    setUserName,
    selectedMajor,
    setSelectedMajor
  }), [theme, isLoggedIn, userName, selectedMajor]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
