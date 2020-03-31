import React, {useContext} from "react";
import styled from "styled-components";
import {Context} from "../contexts/Context";

const Credits = props => {
  const [state, setState] = useContext(Context)

  if (state.isLoading) return null;
  else {
    return (
      <StyledCredits>
      <Text>react + material-ui + styled-components</Text>
      <div className="divider"></div>
      <Text>
        ana costa eduardo • <a href="https://github.com/anacoxta">github</a> • <a href="https://glitch.com/@anacoxta">glitch</a> •{" "}
        <a href="https://linkedin.com/in/anaeduardo">linkedin</a>
      </Text>
    </StyledCredits>
    )}
};

// STYLED-COMPONENT

const StyledCredits = styled.div`
  display: grid;
  grid-template-rows: repeat(3, min-content);
  max-width: 100%;
  margin: 1rem;
  text-align: center;
  .divider {
    width: 100%;
    height: 1px;
    background-color: white;
    margin: 0.15rem 0;
  }
`;

const Text = styled.p`
  color: white;
  font-weight: 600;
  font-size: 0.8rem;
  letter-spacing: 1px;
  text-align: center;
  margin: 0;

  a, a:visited {
    text-decoration: none;
    color: white;
  }
  a:hover {
    color: darkblue;
  }

  @media (max-width: 645px) {
    & {
      letter-spacing: 0;
      font-weight: 400;
    }
  }

  @media (max-width: 275px) {
    & { font-size: 0.7rem; }
  }
`;

export default Credits;
