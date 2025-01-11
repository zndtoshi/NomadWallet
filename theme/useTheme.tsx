
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Theme {
  colors: {
    background: string;
    text: string;
    button: string;
    buttonText: string;
    // Add other color properties as needed
  };
}

const lightTheme: Theme = {
  colors: {
    background: '#ffffff',
    text: '#000000',
    button: '#1E90FF',
    buttonText: '#ffffff',
    // Add other colors
  },
};

const darkTheme: Theme = {
  colors: {
    background: '#000000',
    text: '#ffffff',
    button: '#1E90FF',
    buttonText: '#ffffff',
    // Add other colors
  },
};

const ThemeContext = createContext<Theme>(lightTheme);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(lightTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
      {/* Optionally, add a button or mechanism to toggle theme */}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);