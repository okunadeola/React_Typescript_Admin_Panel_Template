
import React, { createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext({
  darkMode : false,
  toggleMode: ()=> {},
  isMenuExpanded : true,
  expandMenu: ()=> {},
});

export const DarkModeContextProvider = ({ children }: {children: React.ReactNode}) => {

  const [darkMode, setDarkMode] = useState( 
    JSON.parse(localStorage.getItem("darkMode") || 'false')
  );

  const [isMenuExpanded, setIsMenuExpanded] = useState(true)

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  const expandMenu = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify( darkMode));
  }, [darkMode]);

  return (

    <DarkModeContext.Provider value={{ darkMode, toggleMode, isMenuExpanded, expandMenu }}>

        {children}

    </DarkModeContext.Provider>

  );
};
 