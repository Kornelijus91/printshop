import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Helmet } from "react-helmet";
import { ProjectName} from './Variables.jsx' //, ProjectDescription, ProjectLogo, ProjectURL 


const theme = createTheme({
  overrides: {
    MuiTooltip: {
      tooltipArrow: {
        backgroundColor: '#A8DADC',
        color: '#1D3557',
        fontFamily: "'Quicksand', sans-serif",
        fontSize: '1rem',
        // textAlign: 'justify',
        // textJustify: 'inter-word',
      },
      arrow : {
        color: '#A8DADC',
      },
    },
    MuiAlert: {
      root: {
        fontFamily: "'Quicksand', sans-serif",
      },
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
    }
  },
  myTheme: {
    pirma: '#E63946', //RAUDONA
    antra: '#457B9D', //MELYNA
    trecia: '#F1FAEE', //KREMINE
    ketvirta: '#A8DADC', //SVIESIAI MELYNA
    sriftoSpalva: '#1D3557', //TAMSIAI MELYNA
    sriftas: "'Quicksand', sans-serif" //SRIFTAS
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
