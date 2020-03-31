import React from "react";
import styled from "styled-components";
import { ReactComponent as LoaderIcon } from "../assets/loader.svg";

// RENDER COMPONENT

const Loader = () => {
  return (
    <Div className="wrapper">
      <StyledLoader />
    </Div>
  );
};

// STYLED-COMPONENTS

const Div = styled.div`
  &.wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const StyledLoader = styled(LoaderIcon)`
  margin: 0;
`;

export default Loader;