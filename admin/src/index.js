import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'

const breakpoints = createBreakpoints({})
breakpoints.values.xxl = 2240
breakpoints.values.xxxl = 3740

const theme = createTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        [breakpoints.up('xxl')]:{
          fontSize: '1.6rem',
          padding: '1rem',
          borderRadius: '7px',
          // paddingLeft: '1rem',
        },
        [breakpoints.up('xxxl')]:{
          fontSize: '2rem',
          padding: '1.5rem',
          borderRadius: '9px',
          // paddingLeft: '1.5rem',
        },
      },
      multiline: {
        [breakpoints.up('xxl')]:{
          fontSize: '1.6rem',
          padding: '1.5rem 0 1.5rem 1.5rem',
          borderRadius: '7px',
        },
        [breakpoints.up('xxxl')]:{
          fontSize: '2rem',
          padding: '2rem 0 2rem 2rem',
          borderRadius: '9px',
        },
      },
      notchedOutline: {
        border: 'none',
      }
    },
    MuiSelect: {
      root: {
        border: 'none',
        outline: 'none',
      }
    },
    MuiTooltip: {
      tooltip: {
        [breakpoints.up('xxl')]:{
          fontSize: '1.4rem',
        },
        [breakpoints.up('xxxl')]:{
          fontSize: '1.8rem',
        },
      },
    },
    MuiMenuItem: {
      root: {
        [breakpoints.up('xxl')]:{
          fontSize: '1.4rem',
        },
        [breakpoints.up('xxxl')]:{
          fontSize: '1.8rem',
        },
      },
    },
    MuiPaginationItem: {
      fontFamily: "'Quicksand', sans-serif",
      root: {
        [breakpoints.up('xxl')]:{
          height: '3rem',
          width: '3rem',
          borderRadius: '50%',
          fontSize: '1.4rem',
          padding: '1rem',
        },
        [breakpoints.up('xxxl')]:{
          height: '5rem',
          width: '5rem',
          fontSize: '1.8rem',
          padding: '1.4rem',
        },
      },
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
      xxl: 2240,
      xxxl: 3740,
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
