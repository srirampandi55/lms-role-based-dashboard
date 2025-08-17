import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('theme-mode') || 'system';
  });

  const [currentTheme, setCurrentTheme] = useState('light');

  // Apply theme to document
  const applyTheme = (theme) => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    setCurrentTheme(theme);
  };

  // Resolve theme mode to actual theme
  const resolveTheme = (mode) => {
    switch (mode) {
      case 'light':
        return 'light';
      case 'dark':
        return 'dark';
      case 'system':
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      case 'time-based':
        const hour = new Date().getHours();
        return (hour >= 18 || hour < 6) ? 'dark' : 'light';
      default:
        return 'light';
    }
  };

  // Update theme when mode changes
  useEffect(() => {
    const resolvedTheme = resolveTheme(themeMode);
    applyTheme(resolvedTheme);
    localStorage.setItem('theme-mode', themeMode);
  }, [themeMode]);

  // Listen for system theme changes
  useEffect(() => {
    if (themeMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      const handleChange = () => {
        const resolvedTheme = resolveTheme('system');
        applyTheme(resolvedTheme);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [themeMode]);

  // Time-based theme checking
  useEffect(() => {
    if (themeMode === 'time-based') {
      const checkTime = () => {
        const resolvedTheme = resolveTheme('time-based');
        applyTheme(resolvedTheme);
      };

      // Check every minute
      const interval = setInterval(checkTime, 60000);
      return () => clearInterval(interval);
    }
  }, [themeMode]);

  const cycleTheme = () => {
    const modes = ['light', 'dark', 'system', 'time-based'];
    const currentIndex = modes.indexOf(themeMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setThemeMode(nextMode);
  };

  const getThemeIcon = () => {
    switch (themeMode) {
      case 'light': return 'Sun';
      case 'dark': return 'Moon';
      case 'system': return 'Monitor';
      case 'time-based': return 'Clock';
      default: return 'Sun';
    }
  };

  const getThemeLabel = () => {
    switch (themeMode) {
      case 'light': return 'Light';
      case 'dark': return 'Dark';
      case 'system': return 'System';
      case 'time-based': return 'Auto';
      default: return 'Light';
    }
  };

  const value = {
    themeMode,
    currentTheme,
    setThemeMode,
    cycleTheme,
    getThemeIcon,
    getThemeLabel,
    isDarkMode: currentTheme === 'dark'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
