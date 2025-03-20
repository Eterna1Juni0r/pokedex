import React, { useEffect } from 'react';
import { useTheme } from './useTheme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { theme } = useTheme();

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(theme === 'dark' ? 'light' : 'dark');

    root.classList.add(theme);
  }, [theme]);

  return <div>{children}</div>;
};
