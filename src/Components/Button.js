import React from 'react'
import styled from 'styled-components';


const Button = props => {
  return (
    <StyledButton value="submit" type="submit">{props.content}</StyledButton>
  )
}

const StyledButton = styled.button`
  background-color: #00c853;
  font-family: "Titillium Web", sans-serif;
  text-transform: uppercase;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 1px;
  color: white;
  padding: 0.5rem 0.7rem;
  border: 2px solid #00c853;
  border-radius: 0.3rem;
  transition: opacity 500ms ease;

  &:hover {
    opacity: 0.85;
    transition: all 300ms ease;
  }

  &:active {
    opacity: 0.7;
    transition: all 200ms ease;
    transform: scale(0.95);
    margin-top: -1px;
  }

  &:disabled {
    opacity: 1;
    transition: all 200ms ease;
    cursor: initial;
    transform: none;
    margin-top: 0;
    border: 2px solid #00c853;
    color: #fefefe;
    background-color: #b3b3b3;
  }
`;

export default Button;