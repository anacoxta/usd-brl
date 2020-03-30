import React from "react";
import "./App.css";

import Container from "./components/Container";
import FormSection from "./components/FormSection";
import Title from "./components/Title";
import DailyRate from "./components/DailyRate";
import Form from "./components/Form";
import Credits from "./components/Credits";

import { ContextProvider } from "./contexts/Context";

const App = () => {
  // console.log("isloading",isLoading);
  // console.log("error",error);

  return (
    <ContextProvider>
      <Container>
        <FormSection>
          <Title />
          <DailyRate />
          {/* {state.error ? <Form disabled /> : <Form />} */}
          <Form />
        </FormSection>
      </Container>
      <Credits />
    </ContextProvider>

    // {!loading &&
    //   }
  );
};

export default App;
