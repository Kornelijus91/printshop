import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box, CircularProgress } from '@material-ui/core';
import { ReactComponent as GoogleLogo } from '../../media/social/Googlelogo.svg';

const useStyles = makeStyles({
    button: {
        width: "80%",
        height: "2.5rem",
        marginBottom: "1rem",
        backgroundColor: "white",
        borderRadius: '10rem',
        fontSize: "2rem",
        padding: ".1rem 0 0 0",
        boxShadow: "0px 2px 2px #888888",
        '&:hover': {
            backgroundColor: '#f3f2ef',
            boxShadow: "0px 2px 3px #888888"
        },
    },
    logo: {
        margin: ".1rem 0 0 0",
        padding: "0px",
        height: "1.7rem",
    }
  });

const GoogleAuthButton = ({ setModalOpen, setLoggedIn, socialSubmitting, setSocialSubmitting, setOAuthWindow, oAuthWindow }) => {

    const classes = useStyles();

    const googleAuth = async () => {
        setSocialSubmitting({
            someone: true,
            google: true,
            facebook: false,
            linkedIn: false
        });
        const left = window.screen.width/2-300;
        const top = window.screen.height/2-400;
        const win = window.open("/users/auth/google", "Login with Google.", `top=${top}, left=${left}, width=600, height=800, fullscreen=no, menubar=no, status=no, titlebar=no, toolbar=no`); 
        var pollTimer = window.setInterval(async function() {
            try {
                if (win.document.URL.indexOf('/') !== -1) {
                    clearInterval(pollTimer);
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
            <Button 
                variant="contained" 
                color="primary" 
                onClick={googleAuth} 
                classes={{root: classes.button}}
                disabled={socialSubmitting.someone}
            >
                {socialSubmitting.google ? <CircularProgress size={20}/> : <GoogleLogo className={classes.logo}/>}
            </Button>
        </Box>
    )
}

export default GoogleAuthButton
