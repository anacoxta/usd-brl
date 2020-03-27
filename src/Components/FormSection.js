import React from 'react'
import styled from "styled-components";

const FormSection = props => {
  return <StyledFormSection>{props.children}</StyledFormSection>;
};

const StyledFormSection = styled.section`
  margin: 1.5rem 3rem 3rem 3rem;
  @media (max-width: 700px) {
    margin: 1rem 2rem 2rem 2rem;
  }
`;

export default FormSection;
