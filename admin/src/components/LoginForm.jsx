import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, FormControl, InputLabel, OutlinedInput, InputAdornment, Button, Box, CircularProgress, Collapse } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Treklama01 from '../media/logo.webp'
import {Helmet} from "react-helmet";
import { ProjectName } from '../Variables.jsx'

const useStyles = makeStyles((theme) => ({
    body: {
        width: '100%',
        height: '100%',
        padding: '0 1rem',
        backgroundColor: theme.myTheme.juoda,
        [theme.breakpoints.up('sm')]: {
            padding: '0',
        },
    },
    textField: {
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '30rem',
        },
        [theme.breakpoints.up('xxl')]: {
            width: '45rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            width: '60rem',
        },
    },
    formParentBox: {
        // width: '100%',
        // backgroundColor: theme.myTheme.pirma,
        borderRadius: '5px',
        padding: '0 1rem 1rem 1rem',
        margin: '1rem 0',
        [theme.breakpoints.up('md')]: {
            margin: '2rem 0',
        },
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '7px',
            padding: '1.5rem',
            margin: '3rem 0',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '9px',
            padding: '2rem',
            margin: '4rem 0',
        },
    },
    form: {
        width: '100%',
        [theme.breakpoints.up('xxl')]: {
            marginBottom: "1rem",
        },
        [theme.breakpoints.up('xxxl')]: {
            marginBottom: "1.5rem",
        },
    },
    textInput: {
        backgroundColor: theme.myTheme.ketvirta,
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        borderRadius: '5px',
        marginBottom: ".75rem",
        [theme.breakpoints.up('sm')]: {
            marginBottom: "1.5rem",
        },
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '7px',
            height: '5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '9px',
            height: '7rem',
        },
    },
    diasbleOutline: {
        border: 'none',
    },
    button: {
        width: '100%',
        marginBottom: ".5rem",
        borderRadius: '5px',
        color: theme.myTheme.trecia,
        backgroundColor: theme.myTheme.tZalia.main,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: theme.myTheme.tZalia.dark
        },
        [theme.breakpoints.up('xxl')]: {
            marginBottom: ".75rem",
            borderRadius: '7px',
            fontSize: '1.4rem',
            height: '3.75rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginBottom: "1rem",
            borderRadius: '9px',
            fontSize: '1.8rem',
            height: '5rem',
        },
    },
    alert: {
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.up('xxl')]: {
            paddingLeft: '1.5rem',
            fontSize: '1.4rem',
            borderRadius: '7px',
            height: '5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            paddingLeft: '2rem',
            fontSize: '1.8rem',
            borderRadius: '9px',
            height: '7rem',
        },
    },
    alertBox: {
        width: '100%',
        marginBottom: '.75rem',
        [theme.breakpoints.up('sm')]: {
            marginBottom: '1.5rem',
        },
        [theme.breakpoints.up('xxl')]: {
            marginBottom: '2.25rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginBottom: '3rem',
        },
    },
    alertText: {
        textAlign: "left",
        margin: '0 0 0 1rem',
        padding: "0",
        fontFamily: theme.myTheme.sriftas,
        [theme.breakpoints.up('xxl')]: {
            margin: '0 0 0 1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0 0 0 2rem',
        },
    },
    alertIcon: {
        margin: '0',
        padding: "0",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.5)',
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
        },
    },
    showPassIcon: {
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.5)',
            marginRight: '.75rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
            marginRight: '1.5rem',
        },
    },
    labelRoot: {
        color: `${theme.myTheme.sriftoSpalva} !important`,
        borderRadius: '2px 2px 0 0',
        backgroundColor: theme.myTheme.ketvirta,
        fontFamily: theme.myTheme.sriftas,
        boxShadow: `0 0 0 5px ${theme.myTheme.ketvirta}`,
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '3px 3px 0 0',
            fontSize: '1.6rem',
            transform: 'translate(1rem, 105%)',
            boxShadow: `0 0 0 7px ${theme.myTheme.ketvirta}`,
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '4px 4px 0 0',
            fontSize: '2rem',
            transform: 'translate(1.5rem, 120%)',
            boxShadow: `0 0 0 9px ${theme.myTheme.ketvirta}`,
        },
    },
    labelFocused: {
        color: `${theme.myTheme.sriftoSpalva} !important`,
        fontFamily: theme.myTheme.sriftas,
        borderRadius: '2px 2px 0 0',
        backgroundColor: theme.myTheme.ketvirta,
        boxShadow: `0 0 0 5px ${theme.myTheme.ketvirta}`,
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '3px 3px 0 0',
            fontSize: '1.6rem',
            boxShadow: `0 0 0 7px ${theme.myTheme.ketvirta}`,
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '4px 4px 0 0',
            fontSize: '2rem',
            boxShadow: `0 0 0 9px ${theme.myTheme.ketvirta}`,
        },
    },
    logoBox: {
        // width: '30rem',
        // [theme.breakpoints.up('xxl')]: {
        //     width: '45rem',
        // },
        // [theme.breakpoints.up('xxxl')]: {
        //     width: '60rem',
        // },
        padding: '.5rem',
        margin: '.75rem 0',
        
        [theme.breakpoints.up('sm')]: {
            padding: '1rem',
            margin: '1.5rem 0',
        },
        [theme.breakpoints.up('xxl')]: {
            padding: '1.5rem',
            // margin: '2.25rem 0',
            
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '2rem',
            // margin: '3rem 0',
            
        },
    },
    mainLogo: {
        width: '100%', 
        objectFit: 'contain',
    },
}));

const LoginForm = ({ setUser }) => {

    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")
    const [loginValues, setLoginValues] = useState({
        email: '',
        password: '',
    });

    const genericErrorMessage = "Klaida! Pabandykite vėliau."

    const handleChange = (prop) => (event) => {
        setLoginValues({ ...loginValues, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        
        if (!loginValues.email) {
            setError("Įrašykite El. Pašto adresą.");
            setIsSubmitting(false);
        } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(loginValues.email).toLowerCase())) {
            setError("Neteisingas El. Pašto adresas.");
            setIsSubmitting(false);
        } else if (!loginValues.password) {
            setError("Įrašykite slaptažodį.");
            setIsSubmitting(false);
        } else {
            fetch("/users/login/", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: loginValues.email, password: loginValues.password }),
            })
            .then(async response => {
                setIsSubmitting(false)
                if (!response.ok) {
                    if (response.status === 400) {
                        setError("Užpildykite laukus tinkama informacija.")
                    } else if (response.status === 401) {
                        setError("Neteisingas vartotojo vardas arba slaptažodis.")
                    } else {
                        if (response.statusText === "google") {
                            setError("Vartotojas jau registruotas su Google.")
                        } else if (response.statusText === "google") {
                            setError("Vartotojas jau registruotas su Facebook.")
                        } else {
                            setError("Toks El. Pašto adresas jau užregistruotas.")
                        }
                    }
                } else {
                    const data = await response.json();
                    if (data.personalas) {
                        setUser({
                            token: data.token,
                            loggedIn: true,
                            username: data.username,
                            personalas: data.personalas,
                            administracija: data.administracija,
                        });
                    } else {
                        fetch("/users/logout/", {
                            credentials: "include",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${data.token}`,
                            },
                        }).then(async response => {
                            window.localStorage.setItem("logout", Date.now())
                            setUser({
                                token: null,
                                loggedIn: false,
                                username: '',
                                personalas: false,
                                administracija: false,
                            });
                        })
                        setError("Nesate personalo narys.")
                    }
                }
            })
            .catch(error => {
                setIsSubmitting(false)
                setError(genericErrorMessage)
            })
        }
    };

    return (
        <Box classes={{root: classes.body}} display='flex' justifyContent='center' alignItems='flex-start'>
            <Helmet>
                <title>Personalas | {ProjectName}</title>  
            </Helmet>
            <Box classes={{root: classes.formParentBox}} >
                <form className={classes.textField} method="POST" onSubmit={(e) => handleLogin(e)}>
                    <Box dispay='flex' justifyContent='center' alignItems='center' classes={{root: classes.logoBox}}>
                        <img src={Treklama01} alt='Tavo reklama' className={classes.mainLogo}/>
                    </Box>
                    <Collapse in={error !== ''}>
                        <Box className={classes.alertBox} >
                            <Alert severity="warning" classes={{root: classes.alert, icon: classes.alertIcon}}><p className={classes.alertText}>{error}</p></Alert>
                        </Box>
                    </Collapse>
                    <FormControl className={classes.form} variant="outlined" >
                        <InputLabel htmlFor="outlined-adornment-username" classes={{root: classes.labelRoot, focused: classes.labelFocused}}>El. paštas</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-username"
                            type='text'
                            value={loginValues.email}
                            onChange={handleChange('email')}
                            classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline}}
                            labelWidth={85}
                            tabIndex="1"
                        />
                    </FormControl>
                    <FormControl className={classes.form} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password" classes={{root: classes.labelRoot, focused: classes.labelFocused}}>Slaptažodis</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={loginValues.password}
                            onChange={handleChange('password')}
                            classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline}}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        tabIndex="-1"
                                        style={{color: '#000000'}}
                                        className={classes.showPassIcon}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={85}
                            tabIndex="2"
                        />
                    </FormControl>
                    
                    <Button variant="contained" color="primary" type="submit" className={classes.button} disabled={isSubmitting}>
                        {isSubmitting ? <CircularProgress size={20}/> : "Prisijungti" }
                    </Button>
                </form>
            </Box>
        </Box>
    )
}

export default LoginForm
