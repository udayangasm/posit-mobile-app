import React, { createContext, useContext, useState } from 'react';

// Create a context
const GlobalContext = createContext();

// Create a provider for the context
export const GlobalProvider = ({ children }) => {
  const [globalValue, setGlobalValue] = useState('initialValue');

  return (
    <GlobalContext.Provider value={{ globalValue, setGlobalValue }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to access the global value and setter function
export const useGlobalValue = () => useContext(GlobalContext);