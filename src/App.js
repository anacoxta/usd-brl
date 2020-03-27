import React from "react";
import "./App.css";

import Container from "../src/Components/Container";
import FormSection from "./Components/FormSection";
import Title from "./Components/Title";
import Credits from "./Components/Credits";

const App = () => {
  return (
    <>
      <Container>
        <FormSection>
          <Title />
        </FormSection>
      </Container>
      <Credits />
    </>
  );
};

export default App;
