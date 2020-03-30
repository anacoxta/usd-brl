import React, { createContext, useState } from "react";

const Context = createContext([{}, () => {}]);

// Single source of truth
const ContextProvider = props => {
  const [state, setState] = useState({
    isLoading: true,
    error: false,
    exchangeRate: "",
    fetchedDate: "",
    formattedDate: "",
    valueUSD: "",
    valueBRL: "",
    simpleConversion: true,
    iofUSD: "",
    iofURL: "",
    localTaxUSD: "",
    localTaxBRL: "",
    totalUSD: "",
    totalBRL: ""
  })

  return (
    <Context.Provider value={[state, setState]}>
      {props.children}
    </Context.Provider>
  )
}

export {Context, ContextProvider}