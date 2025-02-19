import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "../contexts/Context";
import useMergeState from "../customHook/useMergeState";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "../components/Button";

// COMPONENT LOGIC + RENDER COMPONENT

const Form = props => {

  // Local state to be fed by the form
  const [localState, setLocalState] = useMergeState({
    valueUSD: "",
    conversionType: "noTax",
    paymentType: "cash",
    localTaxPercentage: "",
    iofPercentage: "",
  });

  // Access to the global state (through context)
  const [state, setState] = useContext(Context);

  const handleChange = e => {
    // valueUSD
    // ——> Validates input value using regex:
    //     positive numbers with up to two decimal places, separated by a comma
    if (e.target.name === "valueUSD") {
      let regExp = /^(\d+(,\d{0,2})?|,?\d{1,2})$/;
      if (!regExp.test(e.target.value)) {
        e.target.value = e.target.value.match(regExp);
      } else {
        // Updates LOCAL state
        setLocalState({ [e.target.name]: e.target.value });
      }
    }

    // localTaxPercentage
    // ——> Validates input value using regex
    //     positive numbers from 0 to 100, with up to two decimal places, separated by a comma
    else if (e.target.name === "localTaxPercentage") {
      let regExp = /^100(,0{0,2}?)?$|^\d{0,2}(,\d{0,2})?$/;
      if (!regExp.test(e.target.value)) {
        e.target.value = e.target.value.match(regExp);
      } else {
        // Updates LOCAL state
        setLocalState({ [e.target.name]: e.target.value });
      }
    }

    // conversionType and paymentType
    // ——> setLocalState
    else {
      setLocalState({
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    let iofPercentage;
    let localTaxPercentage;
    let valueUSD;

    // Treating data
    for (let s in localState) {
      // valueUSD & localTaxPercentage:
      // Converts string values to numerical values & sets global and local states
      if ((s === "valueUSD" || s === "localTaxPercentage") && typeof localState[s] === "string" && localState[s] !== "") {
        if (localState[s].indexOf(",") !== -1) localState[s] = localState[s].replace(",", ".");
        localState[s] = parseFloat(localState[s]);
        setLocalState({ [s]: localState[s] });
        s === "valueUSD" ? (valueUSD = localState[s]) : (localTaxPercentage = localState[s]);
      }
      // paymentType:
      // Updates iofPercentage variable
      else if (s === "paymentType") {
        localState[s] === "cash" ? (iofPercentage = 1.1) : (iofPercentage = 6.38);
      }
    }

    // CALCULATIONS
    // Simple calculation (no taxes)
    if (localState.conversionType === "noTax") {
      let valueBRL = state.exchangeRate * valueUSD;
      setState({
        // data from the form
        conversionType: localState.conversionType,
        localTaxPercentage: localTaxPercentage,
        iofPercentage: iofPercentage,
        paymentType: localState.paymentType,
        valueUSD: valueUSD,
        // calculated
        valueBRL: valueBRL,
      });
    }

    // Complex calculations (with taxes)
    else {
      if (localTaxPercentage === undefined || localTaxPercentage === "") {
        localTaxPercentage = 0;
      }

      let valueBRL = state.exchangeRate * valueUSD;
      let localTaxUSD = valueUSD * (localTaxPercentage / 100);
      let localTaxBRL = localTaxUSD * state.exchangeRate;
      let iofUSD = (valueUSD + localTaxUSD) * (iofPercentage / 100);
      let iofBRL = iofUSD * state.exchangeRate;
      let totalUSD = valueUSD + localTaxUSD + iofUSD;
      let totalBRL = valueBRL + localTaxBRL + iofBRL;
      setState({
        // data from the form
        conversionType: localState.conversionType,
        localTaxPercentage: localTaxPercentage,
        iofPercentage: iofPercentage,
        paymentType: localState.paymentType,
        valueUSD: valueUSD,
        // calculated
        valueBRL: valueBRL,
        localTaxUSD: localTaxUSD,
        localTaxBRL: localTaxBRL,
        iofUSD: iofUSD,
        iofBRL: iofBRL,
        totalUSD: totalUSD,
        totalBRL: totalBRL,
      });
    }

    // reset the form afterwards
    setLocalState({
      valueUSD: "",
      conversionType: "noTax",
      paymentType: "cash",
      localTaxPercentage: "",
      iofPercentage: "",
    });
  };

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
        InputProps={{endAdornment: <InputAdornment position="end">USD</InputAdornment>}}
      />

      <VerticalLine disabled={typeof state.error === "object"} className="vertical-line" />

      <StyledFormControl component="fieldset" disabled={typeof state.error === "object"}>
        <StyledRadioGroup
          disabled={typeof state.error === "object"}
          aria-label="Tipo de conversão"
          id="conversionType"
          name="conversionType"
          value={localState.conversionType}
          onChange={handleChange}>
          <StyledFormControlLabel id="noTax" value="noTax" control={<Radio />} label="Conversão simples" />
          <StyledFormControlLabel id="withTax" value="withTax" control={<Radio />} label="Considerar taxas" />
        </StyledRadioGroup>
      </StyledFormControl>

      <VerticalLine disabled={typeof state.error === "object"} />

      {localState.conversionType === "withTax" && (
        <>
          <ItemWithTooltip>
            <StyledTextField
              disabled={typeof state.error === "object"}
              type="text"
              id="localTaxPercentage"
              name="localTaxPercentage"
              label="Taxas/Impostos adicionais"
              variant="outlined"
              value={localState.localTaxPercentage}
              onChange={handleChange}
              InputProps={{endAdornment: <InputAdornment position="end">%</InputAdornment>}}
            />
            <Tooltip
              title={"Atenção: Algumas cidades e estados americanos possuem impostos locais que incidem sobre as vendas."}
              placement="right"
              arrow
              aria-hidden="true">
              <TooltipButton className="btn-tooltip" aria-hidden="true">?</TooltipButton>
            </Tooltip>
          </ItemWithTooltip>

          <VerticalLine disabled={typeof state.error === "object"} />

          <ItemWithTooltip>
            <StyledFormControl component="fieldset">
              <RadioGroup
                disabled={typeof state.error === "object"}
                aria-label="Forma de pagamento"
                id="paymentType"
                name="paymentType"
                value={localState.paymentType}
                onChange={handleChange}>
                <StyledFormControlLabel id="cash" value="cash" control={<Radio />} label="Dinheiro" />
                <StyledFormControlLabel id="creditCard" value="creditCard" control={<Radio />} label="Cartão de crédito" />
              </RadioGroup>
            </StyledFormControl>
            <Tooltip
              title={"A taxa IOF cobrada sobre movimentações em dinheiro é de 1,1%, enquanto as movimentações em cartão de crédito são taxadas em 6,38%"}
              aria-hidden="true"
              placement="right"
              arrow>
              <TooltipButton className="btn-tooltip" aria-hidden="true">?</TooltipButton>
            </Tooltip>
          </ItemWithTooltip>

          <VerticalLine />
        </>
      )}

      <Button content="Converter" disabled={typeof state.error === "object"} />
    </StyledForm>
  );
};

// STYLED-COMPONENTS

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

  & + .MuiFormGroup-root {
    border-color: ${props => (props.disabled ? "var(--gray-lighter)" : "var(--accent)")};
  }
`;

const ItemWithTooltip = styled.div`
  display: grid;
  grid-template-columns: max-content min-content;
  align-items: center;
  margin-left: 1.8rem;
`;

const TooltipButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 2px solid #6f767d;
  color: #6f767d;
  font-size: 1.2rem;
  font-weight: 400;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 1rem;
  padding: 0;
  margin: 0 0 0 0.5rem;
  opacity: 0.6;
  transition: all 200ms ease;

  &:hover {
    opacity: 0.8;
    transform: scale(1.08);
    transition: all 200ms ease;
  }
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

const StyledFormControl = styled(FormControl)`
  .MuiFormGroup-root {
    border: 2px solid #00c853;
    border-radius: 0.5rem;
    margin-right: 0;
    padding: 0.25rem 1rem;
  } 

  .MuiFormControlLabel-root {
    margin-right: 0;
  }

  .MuiButtonBase-root.Mui-disabled {
    color: var(--gray-lighter);
    .MuiIconButton-label {
    color: var(--gray-lighter);
    }
  }

  .MuiFormControlLabel-label {
    font-size: 1.125rem;
    font-family: "Titillium Web", sans-serif;
    @media (max-width: 650px) {
      font-size: 1rem;
    }
    @media (max-width: 250px) {
      font-size: 0.875rem;
    }
  }

  .MuiRadio-colorSecondary.Mui-checked {
    color: #00c853;
  }
`;

const StyledRadioGroup = styled(RadioGroup)`
  border-color: ${props => props.disabled ? "var(--gray-lighter)" : "var(--accent)"} !important;
`

const StyledFormControlLabel = styled(FormControlLabel)`
  color: #00c853;
  font-family: "Titillium Web", sans-serif;

  .MuiRadio-root {
    color: #00c853;
  }
`;

export default Form;
