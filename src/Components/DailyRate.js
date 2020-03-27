import React from "react";
import styled from "styled-components";
import Tooltip from "@material-ui/core/Tooltip";
import { TcGray1, TwSemibold } from "./TypographyHelpers";

// RENDER COMPONENTS

const DailyRate = props => {
  return (
    <StyledDailyRate>
      <Text>
        <TcGray1>Dólar comercial: </TcGray1>
        USD <TwSemibold>1 = X,XXXX</TwSemibold> BRL
      </Text>
      <Tooltip title={"Atualizado em XX/XX/XXXX"} placement="right" arrow>
        <TooltipButton className="btn-tooltip">?</TooltipButton>
      </Tooltip>
    </StyledDailyRate>
  );
};

// STYLED-COMPONENTS

const StyledDailyRate = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr min-content;
  margin: 1rem 0 1.8rem 0;
  align-items: center;
  justify-content: center;
`;

const Text = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  color: var(--gray-medium);
  font-size: 1.125rem;
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
  margin: 0 0 0 0.4rem;
  opacity: 0.6;
  transition: all 200ms ease;

  &:hover {
    opacity: 0.8;
    transform: scale(1.08);
    transition: all 200ms ease;
  }

  NumberInput + & {
    color: red;
  }
`;

export default DailyRate;
