import React from "react";
import styled from "styled-components";
import { ReactComponent as LoaderIcon } from "../assets/loader.svg";

const Loader = () => {
  return (
    <Div className="wrapper">
      <StyledLoader />
    </Div>
  );
};

export default Loader;

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
