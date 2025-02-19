import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "../contexts/Context";

import useFetcher from "../services/apiFetcher";
import Loader from "./Loader";

// RENDER COMPONENT + API CALL

const Container = props => {
  const [state, setState] = useContext(Context);

  useFetcher("https://economia.awesomeapi.com.br/all/USD-BRL");

  if (state.isLoading) return <Loader />;
  else return <StyledContainer>{props.children}</StyledContainer>;
};

// STYLED-COMPONENT

const StyledContainer = styled.div`
  margin: 0 5vw;
  padding: 0;
  max-width: 600px;
  width: 90%;
  background-color: white;
  border-radius: 0 0 0.8rem 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Container;
