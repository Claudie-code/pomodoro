import React, { createContext, useState } from "react";

// Créer un contexte pour le thème
export const SettingsContext = createContext();

// Créer un composant fournisseur pour fournir le thème à l'application
export const SettingsProvider = ({ children }) => {
  const [workDuration, setWorkDuration] = useState(1500);
  const [breakDuration, setBreakDuration] = useState(300);
  const [seconds, setSeconds] = useState(workDuration);
  const [mode, setMode] = useState("work");

  return (
    <SettingsContext.Provider
      value={{
        workDuration,
        setWorkDuration,
        breakDuration,
        setBreakDuration,
        seconds,
        setSeconds,
        mode,
        setMode,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
