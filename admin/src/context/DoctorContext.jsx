import React, { createContext } from "react";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  const value = {
    // Add context values here
  };

  return (
    <DoctorContext.Provider value={value}>
      {children} {/* Render children directly */}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
