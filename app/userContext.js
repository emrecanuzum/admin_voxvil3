import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState("");

  return (
    <UserContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
