import { useState, useEffect } from "react";
import {Helmet} from "react-helmet";
// import { makeStyles } from '@material-ui/core/styles';
// import { Box } from '@material-ui/core';
import Report from './Report';
import { ProjectName } from '../../../Variables.jsx'

// const useStyles = makeStyles((theme) => ({
//     root: {
//         backgroundColor: 'green',
//         width: '200rem',
//         height: '200rem'
//     },
// }));

const StatisticsV2 = () => {

    // const classes = useStyles();

    const [isSignedIn, setIsSignedIn] = useState(false);

    const initAuth = () => {
        return window.gapi.auth2.init({
          client_id: "713874480579-ug40rallntu1usuj6m2fpehdf15t2c2h.apps.googleusercontent.com", //paste your client ID here
          scope: "https://www.googleapis.com/auth/analytics",
        });
    };

    const checkSignedIn = () => {
        return new Promise((resolve, reject) => {
          initAuth() //calls the previous function
            .then(() => {
              const auth = window.gapi.auth2.getAuthInstance(); //returns the GoogleAuth object
              resolve(auth.isSignedIn.get()); //returns whether the current user is currently signed in
            })
            .catch((error) => {
              reject(error);
            });
        });
    };

    const renderButton = () => {
        window.gapi.signin2.render("signin-button", {
          scope: "profile email",
          width: 240,
          height: 50,
          longtitle: true,
          theme: "dark",
          onsuccess: onSuccess,
          onfailure: onFailure,
        });
    };
      
    const onSuccess = (googleUser) => {
        // console.log("Logged in as: " + googleUser.getBasicProfile().getName());
    };
      
    const onFailure = (error) => {
        console.error(error);
    };

    const updateSignin = (signedIn) => { //(3)
        setIsSignedIn(signedIn);
        if (!signedIn) {
        renderButton();
        }
    };

    const init = () => { //(2)
        checkSignedIn()
        .then((signedIn) => {
            updateSignin(signedIn);
        })
        .catch((error) => {
            console.error(error);
        });
    };

    useEffect(() => {
        window.gapi.load("auth2", init); //(1)
    });

    return (
        <div >
            <Helmet>
                <title>Statistika | {ProjectName}</title>  
                
            </Helmet>
            <div className="App">
                {!isSignedIn ? (
                    <div id="signin-button"></div>
                ) : (
                    <Report />
                )}
            </div>
        </div>
    )
}

export default StatisticsV2
