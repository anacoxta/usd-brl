import React from "react";
import "./App.css";

import Container from "./components/Container";
import FormSection from "./components/FormSection";
import Title from "./components/Title";
import DailyRate from "./components/DailyRate";
import Form from "./components/Form";
import Credits from "./components/Credits";

import useFetcher from "./services/apiFetcher"

const App = () => {

  useFetcher("https://economia.awesomeapi.com.br/all/USiD-BRL");

  return (
    <>
      <Container>
        <FormSection>
          <Title />
          <DailyRate />
          <Form />
        </FormSection>
      </Container>
      <Credits />
    </>
  );
};

export default App;
