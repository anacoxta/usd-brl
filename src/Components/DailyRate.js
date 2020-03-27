import React from "react";
import styled from "styled-components";
import Tooltip from "@material-ui/core/Tooltip";
import {
  TcAccent,
  TcGray1,
  TcGray2,
  TcGray3,
  TwRegular,
  TwSemibold,
  TwBlack,
  Ts10,
  Ts12,
  Ts14,
  Ts16,
  Ts18,
  Ts20,
  Ts22,
  Ts24,
  Ts26,
  Ts28,
  Ts30,
  Ts32,
} from "./TypographyHelpers";

// RENDER COMPONENTS

const DailyRate = props => {
  return (
    <StyledDailyRate>
      <Text>
        <TcGray1>Dólar comercial:</TcGray1>
        <span>
          USD <span className="bigger">1 = X,XXXX</span> BRL
        </span>
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
  grid-template-columns: max-content min-content;
  margin: 1rem 0 1.8rem 1rem;
  align-items: center;
  justify-content: center;
`;

const Text = styled.h3`
  font-weight: 400;
  text-transform: uppercase;
  color: var(--gray-medium);
  font-size: var(--Ts20);
  margin: 0;
  display: grid;
  grid-template-columns: max-content;
  grid-template-rows: min-content min-content;
  align-items: center;
  column-gap: 0.3rem;
  justify-content: center;
  text-align: center;
  line-height: var(--Ts26);

  .bigger {
    font-size: var(--Ts22);
    font-weight: 600;
  }

  @media (max-width: 375px) {
    & {
      font-size: var(--Ts16);
      .bigger {
        font-size: var(--Ts18);
      }
    }
  }
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
`;

export default DailyRate;
