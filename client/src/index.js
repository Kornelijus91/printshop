import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Helmet } from "react-helmet";
import { ProjectName} from './Variables.jsx' 
import { themeObject } from './theme';

const theme = createTheme(themeObject);

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
