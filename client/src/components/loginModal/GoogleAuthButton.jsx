import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { IconButton , Box, CircularProgress } from '@material-ui/core';
import { FcGoogle } from "react-icons/fc";

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
        [theme.breakpoints.up('xxl')]:{
            transform: 'scale(1.35)'
        },
        [theme.breakpoints.up('xxxl')]:{
            transform: 'scale(2)'
        },
    },
  }));

const GoogleAuthButton = ({ setModalOpen, setLoggedIn, socialSubmitting, setSocialSubmitting, setOAuthWindow, oAuthWindow }) => {

    const classes = useStyles();

    const googleAuth = async () => {
        setSocialSubmitting({
            someone: true,
            google: true,
            facebook: false,
            linkedIn: false
        });
        // const left = window.screen.width/2-300;
        // const top = window.screen.height/2-400;
        const left = (window.innerWidth - 600) / 2
        const top = (window.innerHeight - 800) / 2
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
        }, 100);
    }

    return (
        <Box display="flex" justifyContent="center">
            <IconButton  
                variant="contained" 
                color="primary" 
                onClick={googleAuth} 
                classes={{root: classes.button}}
                disabled={socialSubmitting.someone}
            >
                {socialSubmitting.google ? <CircularProgress size={50} className={classes.icon}/> : <FcGoogle size={50} className={classes.icon}/>} 
            </IconButton >
        </Box>
    )
}

export default GoogleAuthButton
