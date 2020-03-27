import React from 'react'
import styled from "styled-components";
import { ReactComponent as GreenTriangle } from "../assets/greenTriangle.svg";

const Title = () => {
  return (
    <StyledTitle>
      <span>USD</span>
      <StyledGreenTriangle />
      <span>BRL</span>
    </StyledTitle>
  );
};

const StyledTitle = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
  color: #0db14b;
  margin: 0;
  font-size: 5rem;

  @media (max-width: 375px) {
    font-size: 4rem;
  }
  @media (max-width: 340px) {
    font-size: 3.2rem;
  }
`;

const StyledGreenTriangle = styled(GreenTriangle)`
  height: 3rem;
  margin-bottom: -0.4rem;
  margin-left: -1.1rem;
  margin-right: -0.25rem;

  @media (max-width: 375px) {
    height: 2.2rem;
    margin-bottom: -0.3rem;
    margin-left: -1rem;
    margin-right: -0.5rem;
  }
  @media (max-width: 340px) {
    height: 1.8rem;
    margin-bottom: -0.22rem;
    margin-left: -1.05rem;
    margin-right: -0.5rem;
  }
`;

export default Title
