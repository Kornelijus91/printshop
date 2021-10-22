import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles({
    button: {
        width: "80%",
        height: "2.5rem",
        marginBottom: "1rem",
        fontFamily: "'Titillium Web', sans-serif",
        fontSize: "1.5rem",
        padding: "0 0 .2rem 0",
        textTransform: 'lowercase',
        backgroundColor: "#4267B2",
        borderRadius: '10rem',
        boxShadow: "0px 2px 2px #888888",
        '&:hover': {
            backgroundColor: '#375695',
            boxShadow: "0px 2px 3px #888888"
        },
    },
  });

const FacebookAuthButton = ({ setModalOpen, setLoggedIn, socialSubmitting, setSocialSubmitting, setOAuthWindow, oAuthWindow }) => {

    const classes = useStyles();

    const facebookAuth = async () => {
        setSocialSubmitting({
            someone: true,
            google: false,
            facebook: true,
            linkedIn: false
        });
        const left = window.screen.width/2-300;
        const top = window.screen.height/2-400;
        const win = window.open("/users/auth/facebook", "Login with Facebook.", `top=${top}, left=${left}, width=600, height=800, fullscreen=no, menubar=no, status=no, titlebar=no, toolbar=no`); 
        var pollTimer = window.setInterval(async function() {
            try {
                if (win.document.URL.indexOf('/') !== -1) {
                    window.clearInterval(pollTimer);
                    win.close();
                    setOAuthWindow(!oAuthWindow);
                    setModalOpen(false);
                    setLoggedIn(true);
                }
            } catch(e) {
                //console.log(e);
            }
            if (win.closed) {
                clearInterval(pollTimer);
                setSocialSubmitting({
                    someone: false,
                    google: false,
                    facebook: false,
                    linkedIn: false
                });
            }
        }, 100);
    }

    return (
        <Box display="flex" justifyContent="center">
            <Button variant="contained" color="primary" onClick={facebookAuth} classes={{root: classes.button}} disableElevation={true} disabled={socialSubmitting.someone}>
                {socialSubmitting.facebook ? <CircularProgress size={20}/> : <p style={{letterSpacing: "0px"}}>facebook</p>}
            </Button>
        </Box>
    )
}

export default FacebookAuthButton
