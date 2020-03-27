import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
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
  }

  html, body, #root {
    display: flex;
    justify-content: center;
    background-color: #0DB14B;
    min-width: 100vw;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    font-family: 'Titillium Web', sans-serif;
    font-size: 1rem;
    font-weight: 400;
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
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
