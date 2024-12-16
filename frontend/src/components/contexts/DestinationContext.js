import React, { createContext, useState } from 'react';

// Create the context
export const DestinationContext = createContext();

// Provide the context to children
export const DestinationProvider = ({ children }) => {
  const [destination, setDestination] = useState(null);

  return (
    <DestinationContext.Provider value={{ destination, setDestination }}>
      {children}
    </DestinationContext.Provider>
  );
};
