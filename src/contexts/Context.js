import React, { createContext } from "react";
import useMergeState from "../customHook/useMergeState";

const Context = createContext([{}, () => {}]);

// Single source of truth
const ContextProvider = props => {
  const [state, setState] = useMergeState({
    isLoading: true,
    error: false,
    exchangeRate: "",
    fetchedDate: "",
    formattedDate: "",
  });

  return <Context.Provider value={[state, setState]}>{props.children}</Context.Provider>;
};

export { Context, ContextProvider };
