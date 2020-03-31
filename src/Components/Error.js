import React from "react";
import styled from "styled-components";
import { TwRegular, TwSemibold } from "./TypographyHelpers";

// RENDER COMPONENT

const Error = () => {
  return (
    <StyledError>
      <TwSemibold>ERRO:&nbsp;</TwSemibold>
      <TwRegular>Não foi possível carregar a cotação atual.</TwRegular>
    </StyledError>
  );
};

// STYLED-COMPONENTS

const StyledError = styled.h3`
  width: 100%;
  display: flex;
  margin: 1rem 0 1.8rem 0;
  align-items: center;
  justify-content: center;
  font-size: var(--Ts20);
  line-height: var(--Ts26);
  text-align: center;
  color: var(--error);

  @media (max-width: 545px) {
    & {
      font-size: var(--Ts18);
    }
  }
  @media (max-width: 475px) {
    & {
      font-size: var(--Ts16);
      flex-direction: column;
    }
  }
  @media (max-width: 380px) {
    & {
      font-size: var(--Ts14);
      flex-direction: column;
      line-height: var(--Ts20);
    }
  }
`;

export default Error;
