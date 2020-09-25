import { createContext, useState } from 'react';
import React from 'react';

export const CurrentUserContext = createContext([{}, () => {}]);

export const CurrentUserProvider = ({ children }) => {
  const [state, setState] = useState({
    isLoading: false,
    isLoggedIn: false,
    currentUser: false
  });
  return (
    <CurrentUserContext.Provider value={[state, setState]}>{children}</CurrentUserContext.Provider>
  );
};
