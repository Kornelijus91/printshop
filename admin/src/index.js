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
      main: "#000000",
      light: "#000000",
      dark: "#000000",
    },
    secondary: {
      main: "#ffffff",
      light: "#ffffff",
      dark: "#ffffff",
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
    pirma: '#dddfd4', //RAUDONA
    antra: '#173e43', //MELYNA
    trecia: '#ffffff', //KREMINE
    ketvirta: '#3fb0ac', //SVIESIAI MELYNA
    sriftoSpalva: '#000000', //TAMSIAI MELYNA
    // sriftas: "'Quicksand', sans-serif", //SRIFTO SPALVA]

    juoda: '#000000',
    balta: '#ffffff',
    sZalia: {
        main: '#3fb0ac',
        light: '#56c2bf',
        dark: '#369693',
    },
    tZalia: {
        main: '#173e43',
        light: '#21585f',
        dark: '#0d2326',
    },
    ruda: {
        main: '#dddfd4',
        light: '#f3f4f0',
        dark: '#c5c9b6',
    },
    sriftas: "'GilroyLight', Helvetica, sans-serif", 
    sriftasBold: "'GilroyBold', Helvetica, sans-serif", 
    sriftasGrotesk: "'Grotesk', Helvetica, sans-serif", 
    sriftasLogo: "'LogoFont', Helvetica, sans-serif", 
    
    // ====== Dydziai ====== //
    
    sizeBorderRadiusSmall: 'clamp(0.3125rem, 0.25vw, 0.625rem)', // 5px border radius
    sizeBorderRadiusMedium: 'clamp(.8rem, 0.648vw, 1.6rem)',
    sizeBorderRadiusLarge: 'clamp(20rem, 16vw, 40rem)',
    sizeXXXS: 'clamp(.2rem, 0.16vw, .4rem)',
    sizeXXS: 'clamp(.4rem, 0.32vw, .8rem)',
    sizeXS: 'clamp(.6rem, 0.48vw, 1.2rem)',
    sizeS: 'clamp(.8rem, 0.648vw, 1.6rem)',
    sizeM: 'clamp(1rem, 0.8vw, 2rem)',
    sizeMM: 'clamp(1.2rem, 0.97vw, 2.4rem)',
    sizeL: 'clamp(1.25rem, 1vw, 2.5rem)',
    sizeXL: 'clamp(1.5rem, 1.2vw, 3rem)',
    sizeXXL: 'clamp(2rem, 1.6vw, 4rem)',
    sizeXXXL: 'clamp(2.5rem, 2, 5rem)',
    
    // ===================== //

    cancelButton: {
      margin: '0',
      padding: '.5rem 1rem .5rem 1rem',
      color: '#ffffff',
      fontFamily: "'GilroyLight', Helvetica, sans-serif", 
      backgroundColor: '#3fb0ac',
      '&:hover': {
          backgroundColor: '#369693',
      }, 
      [breakpoints.up('xxl')]:{
          padding: '.75rem 1.5rem .75rem 1.5rem',
          fontSize: '1.5rem',
          borderRadius: '7px',
      },
      [breakpoints.up('xxxl')]:{
          padding: '1rem 1.5rem 1rem 1.5rem',
          fontSize: '2rem',
          borderRadius: '9px',
      },
    },
    saveButton: {
        margin: '0',
        padding: '.5rem 1rem .5rem 1rem',
        color:'#ffffff',
        fontFamily: "'GilroyLight', Helvetica, sans-serif", 
        backgroundColor: '#173e43',
        width: '7rem',
        '&:hover': {
            backgroundColor: '#0d2326',
        }, 
        [breakpoints.up('xxl')]:{
            padding: '.75rem 1.5rem .75rem 1.5rem',
            fontSize: '1.5rem',
            width: '10.5rem',
            borderRadius: '7px',
        },
        [breakpoints.up('xxxl')]:{
            padding: '1rem 1.5rem 1rem 1.5rem',
            fontSize: '2rem',
            width: '14rem',
            borderRadius: '9px',
        },
    },
    buttonDelete: {
      width: '45%',
      margin: "0 1rem 1rem 0",
      borderRadius: '4px',
      height: '2.5rem',
      color: '#ffffff',
      backgroundColor: '#173e43',
      fontFamily: "'GilroyLight', Helvetica, sans-serif", 
      fontWeight: "bold",
      '&:hover': {
          backgroundColor: '#0d2326',
      },
      [breakpoints.up('xxl')]: {
          margin: "0 1.5rem 1.5rem 0",
          borderRadius: '6px',
          height: '3.75rem',
          fontSize: '1.6rem',
      },
      [breakpoints.up('xxxl')]: {
          margin: "0 2rem 2rem 0",
          borderRadius: '8px',
          height: '5rem',
          fontSize: '2rem',
      },
    },
    buttonCancel: {
        width: '45%',
        marginBottom: "1rem",
        borderRadius: '4px',
        height: '2.5rem',
        color: '#ffffff',
        backgroundColor: '#3fb0ac',
        fontFamily: "'GilroyLight', Helvetica, sans-serif", 
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: '#369693',
        },
        [breakpoints.up('xxl')]: {
            marginBottom: "1.5rem",
            borderRadius: '6px',
            height: '3.75rem',
            fontSize: '1.6rem',
        },
        [breakpoints.up('xxxl')]: {
            marginBottom: "2rem",
            borderRadius: '8px',
            height: '5rem',
            fontSize: '2rem',
        },
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
  </ThemeProvider>,
  document.getElementById('root')
);
