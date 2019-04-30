import React, { createContext, useReducer } from 'react';
import { reducer, initialState } from './reducers';
import { useActions } from './actions';

const Store = createContext(initialState);

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = useActions(state, dispatch);
  
  return (
    <Store.Provider value={{ state, actions }}>
      {children}
    </Store.Provider>
  );
};

export { Store, StoreProvider };