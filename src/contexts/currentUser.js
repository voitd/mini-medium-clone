import { createContext, useReducer } from 'react';
import React from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, isLoading: true };
    case 'SET_AUTORIZED':
      return { ...state, isLoggedIn: true, isLoading: false, currentUser: action.payload };
    case 'SET_UNAUTORIZED':
      return { ...state, isLoggedIn: false };
    case 'LOGOUT':
      return { ...state, isLoggedIn: false, currentUser: null };
    default:
      return state;
  }
};

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const state = {
    isLoading: false,
    isLoggedIn: false,
    currentUser: false
  };

  const value = useReducer(reducer, state);

  return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>;
};
