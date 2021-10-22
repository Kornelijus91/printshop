import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, FormControl, InputLabel, OutlinedInput, InputAdornment, Button, Box, CircularProgress, Collapse } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    body: {
        width: '100%',
    },
    textField: {
        width: '30rem',
    },
    form: {
        width: '100%',
    },
    textInput: {
        marginBottom: "1.5rem",
        backgroundColor: theme.myTheme.ketvirta,
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        borderRadius: '5rem',
        boxShadow: "0px 2px 2px #888888",
        '&:hover': {
            boxShadow: "0px 2px 3px #888888"
        },
    },
    diasbleOutline: {
        border: 'none',
    },
    button: {
        width: '100%',
        marginBottom: ".5rem",
        borderRadius: '10rem',
        boxShadow: "0px 2px 2px #888888",
        '&:hover': {
            boxShadow: "0px 2px 3px #888888"
        },
        color: theme.myTheme.trecia,
        backgroundColor: theme.myTheme.pirma,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
    },
    alert: {
        width: '100%',
        borderRadius: '10rem',
        boxShadow: "0px 2px 2px #888888",
    },
    alertBox: {
        marginBottom: '1rem',
    },
    alertText: {
        textAlign: "left",
        margin: '0 0 0 1rem',
        padding: "0",
        fontFamily: theme.myTheme.sriftas,
    },
    alertIcon: {
        margin: '0',
        padding: "0",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelRoot: {
        color: `${theme.myTheme.sriftoSpalva} !important`,
        padding: '0 .5rem 0 .5rem',
        borderRadius: '.5rem .5rem 0 0',
        backgroundColor: theme.myTheme.ketvirta,
        fontFamily: theme.myTheme.sriftas,
    },
    labelFocused: {
        color: `${theme.myTheme.sriftoSpalva} !important`,
        fontFamily: theme.myTheme.sriftas,
        padding: '.2rem .5rem .2rem .5rem',
        borderRadius: '.5rem .5rem 0 0',
        backgroundColor: theme.myTheme.ketvirta,
    },
    header: {
        textAlign: 'center',
        fontFamily: theme.myTheme.sriftas,
        color: `${theme.myTheme.sriftoSpalva} !important`,
    }
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
        <Box classes={{root: classes.body}} display='flex' justifyContent='center' alignItems='center'>
            <form className={classes.textField} method="POST" onSubmit={(e) => handleLogin(e)}>
                <h1 className={classes.header}>Artis Spausdin</h1>
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
                                    style={{color: "#1D3557"}}
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
    )
}

export default LoginForm
