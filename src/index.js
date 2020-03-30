import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { createGlobalStyle } from "styled-components";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#5efc82",
      main: "#00c853",
      dark: "#009624",
      contrastText: "#171c34",
    },
    secondary: {
      light: "#62727b",
      main: "#37474f",
      dark: "#102027",
      contrastText: "#fff",
    },
  },
});

const GlobalStyle = createGlobalStyle`
  
  * {
    box-sizing: border-box;
    --accent: #0DB14B;
    --error: #FF0C46;
    --gray-lighter: #AEB7BF;
    --gray-light: #6F767D;
    --gray-medium: #2D3844;
    --gray-dark: #171C34;
    --Ts10: .625rem;
    --Ts12: .75rem;
    --Ts14: .875rem;
    --Ts16: 1rem;
    --Ts18: 1.125rem;
    --Ts20: 1.25rem;
    --Ts22: 1.375rem;
    --Ts24: 1.5rem;
    --Ts26: 1.675rem;
    --Ts28: 1.75rem;
    --Ts30: 1.875rem;
    --Ts32: 2rem;
  }

  html, body, #root {
    display: flex;
    background-color: var(--accent);
    min-width: 100vw;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    font-family: 'Titillium Web', sans-serif;
    font-size: 1rem;
    font-weight: 400;
    color: var(--gray-light);
  }
  
  #root {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <GlobalStyle />
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
