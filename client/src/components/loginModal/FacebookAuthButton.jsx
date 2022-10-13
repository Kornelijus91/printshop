import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Box, CircularProgress } from '@material-ui/core';
import { FaFacebookSquare } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop:0,
        marginBottom: theme.myTheme.sizeXXXS,
        marginRight: theme.myTheme.sizeXXS,
        marginLeft: theme.myTheme.sizeXXS,
        '&:hover': {
            backgroundColor: 'white',
            transition:'background-color .2s ease', 
        },
        [theme.breakpoints.up('xxl')]:{
            padding: '1.7rem',
        },
        [theme.breakpoints.up('xxxl')]:{
            padding: '3rem',
        },
    },
    icon: {
        color: '#4267B2',
        [theme.breakpoints.up('xxl')]:{
            transform: 'scale(1.35)'
        },
        [theme.breakpoints.up('xxxl')]:{
            transform: 'scale(2)'
        },
    },
  }));

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
                console.log(e);
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
            // if (win.closed) {
            //     clearInterval(pollTimer);

            //     setOAuthWindow(!oAuthWindow);
            //     setModalOpen(false);
            //     setLoggedIn(true);

            //     setSocialSubmitting({
            //         someone: false,
            //         google: false,
            //         facebook: false,
            //         linkedIn: false
            //     });
            // }
        }, 100);
    }

    return (
        <Box display="flex" justifyContent="center">
            <IconButton variant="contained" color="primary" onClick={facebookAuth} classes={{root: classes.button}} disableElevation={true} disabled={socialSubmitting.someone}>
                {socialSubmitting.facebook ? <CircularProgress size={50} className={classes.icon}/> : <FaFacebookSquare size={50} className={classes.icon}/>}
            </IconButton>
        </Box>
    )
}

export default FacebookAuthButton
