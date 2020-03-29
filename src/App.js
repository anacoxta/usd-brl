import React from "react";
import "./App.css";

import Loader from "./components/Loader";
import Container from "./components/Container";
import FormSection from "./components/FormSection";
import Title from "./components/Title";
import DailyRate from "./components/DailyRate";
import Error from "./components/Error";
import Form from "./components/Form";
import Credits from "./components/Credits";

import useFetcher from "./services/apiFetcher";

const App = () => {
  let error = false;
  let isLoading = false;

  useFetcher("https://economia.awesomeapi.com.br/all/USiD-BRL");

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Container>
            <FormSection>
              <Title />
              {error ? <Error /> : <DailyRate />}
              {error ? <Form disabled /> : <Form />}
            </FormSection>
          </Container>
          <Credits />
        </>
      )}
    </>

    // {!loading &&
    //   }
  );
};

export default App;
