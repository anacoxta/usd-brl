import React, {useContext} from "react";
import styled from "styled-components";
import { Context } from "../contexts/Context";
import useMergeState from "../customHook/useMergeState";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "../components/Button";

const Form = props => {
  // Local state to be fed by the form
  const [localState, setLocalState] = useMergeState({
    valueUSD: "",
    simpleConversion: true,
    iofPercentage: "",
    localTaxPercentage: "",
  });

  // Access to the global state (through context)
  const [state, setState] = useContext(Context);
  console.log("state Form:", state);

  const handleChange = e => {
    // Validates input value using regex
    if (typeof e.target.value === "string") {
      let regExp = /^(\d+(,\d{0,2})?|,?\d{1,2})$/;
      if (!regExp.test(e.target.value)) {
        e.target.value = e.target.value.match(regExp);
        console.log("handleChange → localState:", localState);
      } else {
        // Updates LOCAL state
        setLocalState({
          [e.target.name]: e.target.value,
        });
        console.log("handleChange → localState:", localState);
      }
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    let stringToNumber;

    // Loops through local state object...
    for (let s in localState) {
      if (typeof localState[s] === "string" && localState[s] !== "") {
        // Converts string values to numerical values
        if (localState[s].indexOf(",") !== -1) stringToNumber = localState[s].replace(",", ".");
        else stringToNumber = localState[s];
        stringToNumber = parseFloat(stringToNumber);
      }

      // Updates global state (context)
      if (typeof localState[s] === "string" && localState[s] !== "") setState({ [s]: stringToNumber });
      else setState({ [s]: localState[s] });
    }

    // Calculations
    if (localState.simpleConversion === true) {
      let valueBRL = state.exchangeRate * localState.valueUSD
      setState({valueBRL: valueBRL});
      setLocalState({valueBRL: valueBRL});
      console.log("valueBRL",valueBRL);
      console.log("state.valueBRL",state.valueBRL);
    } else {
      console.log("complexConversion",);
    }

  };

  console.log("Form → localState:", localState);

  return (
    <StyledForm onSubmit={handleSubmit} disabled={typeof state.error === "object"}>

      <StyledTextField
        disabled={typeof state.error === "object"}
        required
        type="text"
        id="valueUSD"
        name="valueUSD"
        label="Valor a ser convertido"
        variant="outlined"
        value={localState.valueUSD}
        onChange={handleChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">USD</InputAdornment>,
        }}
      />

      <VerticalLine disabled={typeof state.error === "object"} />

      <StyledTextField
        disabled={typeof state.error === "object"}
        required
        type="text"
        id="localTaxPercentage"
        name="localTaxPercentage"
        label="Taxas locais sobre a venda"
        variant="outlined"
        value={localState.localTaxPercentage}
        onChange={handleChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">%</InputAdornment>,
        }}
      />

      <VerticalLine disabled={typeof state.error === "object"} />

      <Button content="Converter" disabled={typeof state.error === "object"} />

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
  background-color: ${props => (props.disabled ? "var(--gray-lighter)" : "var(--accent)")};
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
