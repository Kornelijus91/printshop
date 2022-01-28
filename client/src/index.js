import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'
import CssBaseline from '@material-ui/core/CssBaseline';
import { Helmet } from "react-helmet";
import { ProjectName} from './Variables.jsx' //, ProjectDescription, ProjectLogo, ProjectURL 

const breakpoints = createBreakpoints({})
breakpoints.values.xxl = 2240
breakpoints.values.xxxl = 3740

const theme = createTheme({
  overrides: {
    MuiTooltip: {
      tooltipArrow: {
        backgroundColor: '#A8DADC',
        color: '#1D3557',
        fontFamily: "'Quicksand', sans-serif",
        fontSize: '1rem',
        maxWidth: '20rem',
        [breakpoints.up('xxl')]:{
          fontSize: '1.35rem',
          maxWidth: '30rem',
          borderRadius: '7px',
          padding: '.5rem 1rem',
          margin: "2rem 0",
          top: '-.7rem'
        },
        [breakpoints.up('xxxl')]:{
          fontSize: '2rem',
          maxWidth: '40rem',
          borderRadius: '9px',
          padding: '.7rem 1.5rem',
          margin: "4rem 0",
          top: '-1.5rem'
        },
        // textAlign: 'justify',
        // textJustify: 'inter-word',
      },
      // tooltipPlacementTop: {
      //   [breakpoints.up('xxl')]:{
      //     margin: "2rem 0",
      //   },
      //   [breakpoints.up('xxxl')]:{
      //     margin: "4rem 0",
      //   },
      // },
      arrow : {
        color: '#A8DADC',
        [breakpoints.up('xxl')]:{
          transform: 'scale(1.5)',
        },
        [breakpoints.up('xxxl')]:{
          transform: 'scale(2)',
        },
      },
    },
    MuiBreadcrumbs: {
      root: {
        [breakpoints.down('md')]: {
          fontSize: '.8rem',
        },
      },
    },
    MuiAlert: {
      root: {
        fontFamily: "'Quicksand', sans-serif",
      },
    },
    MuiFormControl: {
      root: {
        "& .MuiOutlinedInput-notchedOutline": {
          border: 'none',
        },
      },
    },
  },
  props: {
    MuiContainer: {
      disableGutters: true,
    },
  },
  breakpoints: {
    values: {
      xs: 450,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1800,
      xxl: 2240,
      xxxl: 3740,
    },
  },
  palette: {
    primary: {
      main: "#E63946",
      light: "#eb606c",
      dark: "#e31c2d",
    },
    warning: {
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f",
    },
    success: {
      main: "#26a69a",
      light: "#26a69a",
      dark: "#26a69a",
    },
    error: {
      main: "#26a69a",
      light: "#26a69a",
      dark: "#26a69a",
    },
    action: {
      disabledBackground: '#f7bbc0',
    }
  },
  myTheme: {
    pirma: '#E63946', //RAUDONA
    antra: '#457B9D', //MELYNA
    trecia: '#F1FAEE', //KREMINE
    ketvirta: '#A8DADC', //SVIESIAI MELYNA
    sriftoSpalva: '#1D3557', //TAMSIAI MELYNA
    sriftas: "'Quicksand', Helvetica, sans-serif" //SRIFTAS
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Helmet>
        <title>{ProjectName}</title>  
        {/* <meta name="description" content={`${ProjectDescription}`} />
        <meta property="og:title" content={`${ProjectName}`} />
        <meta property="og:description" content={`${ProjectDescription}`} />
        <meta property="og:url" content={`${ProjectURL}`} />
        <meta property="og:image" content={`${ProjectLogo}`} />
        <meta property="og:locale" content="lt_LT" /> */}
    </Helmet>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
