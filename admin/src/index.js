import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createTheme({
  overrides: {
    MuiOutlinedInput: {
      notchedOutline: {
        border: 'none',
      }
    },
  },
  props: {
    MuiContainer: {
      disableGutters: true,
    },
  },
  palette: {
    primary: {
      main: "#E63946",
      light: "#eb606c",
      dark: "#e31c2d",
    },
    secondary: {
      main: "#F1FAEE",
      light: "#F1FAEE",
      dark: "#F1FAEE",
    },
    warning: {
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f",
    },
    error: {
      main: "#26a69a",
      light: "#26a69a",
      dark: "#26a69a",
    }
  },
  myTheme: {
    pirma: '#E63946', //RAUDONA
    antra: '#457B9D', //MELYNA
    trecia: '#F1FAEE', //KREMINE
    ketvirta: '#A8DADC', //SVIESIAI MELYNA
    sriftoSpalva: '#1D3557', //TAMSIAI MELYNA
    sriftas: "'Quicksand', sans-serif" //SRIFTO SPALVA
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
  </ThemeProvider>,
  document.getElementById('root')
);
