import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Box, CircularProgress } from '@material-ui/core';
// import { ReactComponent as LinkedInLogo } from '../../media/social/LinkedInLogo.svg';
import { FaLinkedin } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
    button: {
        // width: "80%",
        // height: "2.5rem",
        // marginBottom: "1rem",
        // backgroundColor: "white",
        // borderRadius: '10rem',
        // boxShadow: "0px 2px 2px #888888",
        margin: '0 .5rem .2rem .5rem',
        [theme.breakpoints.up('xxl')]:{
            margin: '0 .75rem .4rem .75rem',
            padding: '1.7rem',
        },
        [theme.breakpoints.up('xxxl')]:{
            margin: '0 1rem .4rem 1rem',
            padding: '3rem',
        },
        '&:hover': {
            backgroundColor: 'white',
            
        },
    },
    icon: {
        color: '#2867B2',
        [theme.breakpoints.up('xxl')]:{
            transform: 'scale(1.35)'
        },
        [theme.breakpoints.up('xxxl')]:{
            transform: 'scale(2)'
        },
    },
  }));

const LinkedInAuthButton = ({ setModalOpen, setLoggedIn, socialSubmitting, setSocialSubmitting, setOAuthWindow, oAuthWindow }) => {

    const classes = useStyles();

    const linkedInAuth = async () => {
        setSocialSubmitting({
            someone: true,
            google: false,
            facebook: false,
            linkedIn: true
        });
        const left = window.screen.width/2-300;
        const top = window.screen.height/2-400;
        const win = window.open("/users/auth/linkedin", "Login with Linked In.", `top=${top}, left=${left}, width=600, height=800, fullscreen=no, menubar=no, status=no, titlebar=no, toolbar=no`); 
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
            <IconButton variant="contained" onClick={linkedInAuth} classes={{root: classes.button}} disabled={socialSubmitting.someone}>
                {/* <LinkedInLogo style={{margin: "0 0 0 .4rem", padding: "0", height: "1.5rem"}} /> */}
                {socialSubmitting.linkedIn ? <CircularProgress size={50} className={classes.icon}/> : <FaLinkedin size={50} className={classes.icon}/>}
            </IconButton>
        </Box>
    )
}

export default LinkedInAuthButton
