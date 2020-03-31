import React from "react";
import "./App.css";

import Container from "./components/Container";
import FormSection from "./components/FormSection";
import Title from "./components/Title";
import DailyRate from "./components/DailyRate";
import Form from "./components/Form";
import ResultSection from "./components/ResultSection";
import Credits from "./components/Credits";

import { ContextProvider } from "./contexts/Context";

const App = () => {

  return (
    <ContextProvider>
      <Container>
        <FormSection>
          <Title />
          <DailyRate />
          <Form />
        </FormSection>
        <ResultSection />
      </Container>
      <Credits />
    </ContextProvider>
  );
};

export default App;
