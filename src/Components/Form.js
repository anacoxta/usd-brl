import React, { useState } from "react";
import styled from "styled-components";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import Button from "../components/Button";

const Form = props => {
  const [state, setState] = useState({
    valueUSD: "",
    simpleConversion: true,
  });

  const handleChange = e => {
    // Validates input value using regex
    if (typeof e.target.value === "string") {
      let regExp = /^(\d+(,\d{0,2})?|,?\d{1,2})$/;
  
      if (!regExp.test(e.target.value)) {
        e.target.value = e.target.value.match(regExp)
        console.log("state",state);
      } else {
        // Updates state
        setState({
          ...state,
          [e.target.name]: e.target.value,
        });
        console.log("state",state);
      }
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Loops through state object...
    // If value is a string: converts to number and updates state

    for (let s in state) {
      console.log("s",state[s]);
      if (typeof state[s] === "string") {
        let stringToNumber;
        if (state[s].indexOf(",") !== -1) stringToNumber = state[s].replace(",", ".");
        else stringToNumber = state[s];
        
        stringToNumber = parseFloat(stringToNumber)
        console.log("newValue:",stringToNumber, "typeof:", typeof stringToNumber);
        setState({
          ...state,
          [s]: stringToNumber,
        });
      }
    }
  };
  
  return (
    <StyledForm onSubmit={handleSubmit} disabled={props.disabled}>

      <StyledTextField
        disabled={props.disabled}
        required
        type="text"
        id="valueUSD"
        name="valueUSD"
        label="Valor a ser convertido"
        variant="outlined"
        value={state.valueUSD}
        onChange={handleChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">USD</InputAdornment>,
        }}
      />
      <VerticalLine disabled={props.disabled}/>
      <Button content="Converter" disabled={props.disabled}/>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  align-items: center;
`;

const VerticalLine = styled.div`
  width: 2px;
  background-color: ${props => props.disabled ? "var(--gray-lighter)" : "var(--accent)"};
  height: 2rem;
  margin: 0;
  z-index: 1;
  align-self: center;
`;

// Overiding Material-UI (hence the mess)
const StyledTextField = styled(TextField)`
  background-color: white;
  width: 100%;

  .MuiInputLabel-outlined {
    font-family: "Titillium Web", sans-serif;
    color: #00c853;
    font-size: 1.125rem;

    @media (max-width: 650px) {
      font-size: 1rem;
    }
    @media (max-width: 250px) {
      font-size: 0.875rem;
    }
  }

  .MuiInputLabel-shrink {
    font-size: 1rem;
    font-family: "Titillium Web", sans-serif;
    @media (max-width: 650px) {
      font-size: 0.875rem;
    }
    @media (max-width: 250px) {
      font-size: 0.75rem;
    }
  }

  .MuiInputLabel-outlined.MuiInputLabel-shrink {
    transform: translate(14px, -8px);
    background-color: white;
    padding: 0 0.4rem;
  }
  
  .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline,
  .MuiOutlinedInput-notchedOutline {
    border: 2px solid #00c853;
    border-radius: 0.5rem;
  }

  .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline {
    border: 2px solid var(--gray-lighter);
  }


  .MuiInputBase-input,
  .MuiInputAdornment-root p {
    font-size: 1.125rem;
    color: #2d3844;
    font-family: "Titillium Web", sans-serif;
    @media (max-width: 650px) {
      font-size: 1rem;
    }
    @media (max-width: 250px) {
      font-size: 0.875rem;
    }
  }
  .MuiOutlinedInput-root.Mui-disabled .MuiInputAdornment-root p {
    color: var(--gray-lighter);
  }
`;

export default Form;
