"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type AppContextType = {
  currentLocale: string;
  currentTheme: string;
  setCurrentLocale: (locale: string) => void;
  setCurrentTheme: (theme: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentLocale, setCurrentLocale] = useState("tr");
  const [currentTheme, setCurrentTheme] = useState("system");

  // Sayfa yüklendiğinde localStorage'dan değerleri oku
  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") || "tr";
    const savedTheme = localStorage.getItem("theme") || "system";
    setCurrentLocale(savedLocale);
    setCurrentTheme(savedTheme);
  }, []);

  // Değerler değiştiğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem("locale", currentLocale);
  }, [currentLocale]);

  useEffect(() => {
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  return (
    <AppContext.Provider
      value={{ currentLocale, currentTheme, setCurrentLocale, setCurrentTheme }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
