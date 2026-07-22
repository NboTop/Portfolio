import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeMode = 'noir' | 'brutal';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'brutal',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem('app-theme');
    return (savedTheme as ThemeMode) || 'brutal';
  });

  useEffect(() => {
    localStorage.setItem('app-theme', theme);
    // Add theme class to document body
    if (theme === 'brutal') {
      document.body.classList.add('theme-brutal');
    } else {
      document.body.classList.remove('theme-brutal');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'noir' ? 'brutal' : 'noir');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
