import React, {useContext} from "react";
import styled from "styled-components";
import {Context} from "../contexts/Context";

import useFetcher from "../services/apiFetcher";
import Loader from "./Loader";

const Container = props => {
  const [state, setState] = useContext(Context)
  console.log("state Container:", state);

  useFetcher("https://economia.awesomeapi.com.br/all/USD-BRL");

  if (state.isLoading) return <Loader />;
  else return <StyledContainer>{props.children}</StyledContainer>;
};

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
