import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, FormControl, InputLabel, OutlinedInput, InputAdornment, Button, Box, CircularProgress, Collapse } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: '80%',
    },
    form: {
        width: '100%',
    },
    textInput: {
        marginBottom: "1rem",
        backgroundColor: theme.myTheme.ketvirta,
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        borderRadius: '5rem',
        boxShadow: "0px 2px 2px #888888",
        '&:hover': {
            boxShadow: "0px 2px 3px #888888"
        },
    },
    input: {
        height: '.5rem',
    },
    diasbleOutline: {
        border: 'none',
    },
    button: {
        width: '100%',
        marginBottom: ".5rem",
        borderRadius: '10rem',
        height: '2.5rem',
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
        // height: '2.5rem',
        boxShadow: "0px 2px 2px #888888",
        padding: '.2rem .2rem .2rem 1rem',
    },
    alertBox: {
        marginBottom: '1rem',
        
    },
    alertText: {
        textAlign: "left",
        marginTop: '-.1rem',
        padding: "0px",
        fontFamily: theme.myTheme.sriftas,
    },
    alertIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelRoot: {
        marginTop: '-.6rem',
        color: `${theme.myTheme.sriftoSpalva} !important`,
        padding: '.2rem .5rem .2rem .5rem',
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
}));

const LoginRegisterForm = ({ setToken, setModalOpen, setLoggedIn, value, setError, error, setOAuthWindow, oAuthWindow, loginValues, setLoginValues, registerValues, setRegisterValues, setUsername }) => {

    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorHeight, setErrorHeight] = useState('2.5rem')

    const genericErrorMessage = "Klaida! Pabandykite vėliau."

    const handleChange = (prop) => (event) => {
        if (value === "Prisijungti") {
            setLoginValues({ ...loginValues, [prop]: event.target.value });
        } else {
            setRegisterValues({ ...registerValues, [prop]: event.target.value });
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (e) => {
        if (value === "Prisijungti") {
            handleLogin(e);
        } else {
            handleRegister(e);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        
        if (!loginValues.email) {
            setErrorHeight('2.5rem');
            setError("Įrašykite El. Pašto adresą.");
            setIsSubmitting(false);
        } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(loginValues.email).toLowerCase())) {
            setErrorHeight('2.5rem');
            setError("Neteisingas El. Pašto adresas.");
            setIsSubmitting(false);
        } else if (!loginValues.password) {
            setErrorHeight('2.5rem');
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
                        setErrorHeight('3.5rem');
                        setError("Užpildykite laukus tinkama informacija.")
                    } else if (response.status === 401) {
                        setErrorHeight('3.5rem');
                        setError("Neteisingas vartotojo vardas arba slaptažodis.")
                    } else {
                        if (response.statusText === "google") {
                            setErrorHeight('3.5rem');
                            setError("Vartotojas jau registruotas su Google.")
                        } else if (response.statusText === "google") {
                            setErrorHeight('3.5rem');
                            setError("Vartotojas jau registruotas su Facebook.")
                        } else {
                            setErrorHeight('3.5rem');
                            setError("Toks El. Pašto adresas jau užregistruotas.")
                        }
                    }
                } else {
                    const data = await response.json()
                    setOAuthWindow(!oAuthWindow);
                    setToken(data.token);
                    setUsername(data.username);
                    setLoggedIn(true);
                    setModalOpen(false);
                    setLoginValues({
                        email: '',
                        password: '',
                        cofirmPass: '',
                    });
                    setRegisterValues({
                        email: '',
                        password: '',
                        cofirmPass: '',
                    });
                }
            })
            .catch(error => {
                setIsSubmitting(false)
                setError(genericErrorMessage)
            })
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        const regExp = /[a-z]/g
        const regExp2 = /[A-Z]/g
        const regExp3 = /[0-9]/g
        if (!registerValues.email) {
            setErrorHeight('2.5rem');
            setError("Įrašykite El. Pašto adresą.");
            setIsSubmitting(false);
        } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(registerValues.email).toLowerCase())) {
            setErrorHeight('2.5rem');
            setError("Neteisingas El. Pašto adresas.");
            setIsSubmitting(false);
        } else if (!registerValues.password) {
            setErrorHeight('2.5rem');
            setError("Įrašykite slaptažodį.");
            setIsSubmitting(false);
        } else if (String(registerValues.password).length < 6) {
            setErrorHeight('3.5rem');
            setError("Slaptažodis turi sudaryti bent 6 simboliai.");
            setIsSubmitting(false);
        } else if (!(regExp3.test(String(registerValues.password)) && (regExp2.test(String(registerValues.password)) || regExp.test(String(registerValues.password))))) {
            setErrorHeight('3.5rem');
            setError("Slaptažodis turi būti sudarytas iš bent vieno skaičiaus ir bent vienos raidės.");
            setIsSubmitting(false);
        } else if (!registerValues.cofirmPass) {
            setErrorHeight('2.5rem');
            setError("Patvirtinkite slaptažodį.");
            setIsSubmitting(false);
        } else if (registerValues.cofirmPass !== registerValues.password) {
            setErrorHeight('2.5rem');
            setError("Nesutampa slaptažodžiai.");
            setIsSubmitting(false);
        } else {
            fetch("/users/signup/", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: registerValues.email, password: registerValues.password }),
            })
            .then(async response => {
                setIsSubmitting(false)
                if (!response.ok) {
                    if (response.status === 400) {
                        setErrorHeight('3.5rem');
                        setError("Užpildykite laukus tinkama informacija.")
                    } else if (response.status === 401) {
                        setErrorHeight('3.5rem');
                        setError("Neteisingas vartotojo vardas arba slaptažodis.")
                    } else {
                        if (response.statusText === "google") {
                            setErrorHeight('3.5rem');
                            setError("Vartotojas jau registruotas su Google.")
                        } else if (response.statusText === "google") {
                            setErrorHeight('3.5rem');
                            setError("Vartotojas jau registruotas su Facebook.")
                        } else if (response.statusText === "linkedIn") {
                            setErrorHeight('3.5rem');
                            setError("Vartotojas jau registruotas su Linked In.")
                        } else {
                            setErrorHeight('3.5rem');
                            setError("Toks El. Pašto adresas jau užregistruotas.")
                        }
                    }
                } else {
                    const data = await response.json()
                    setOAuthWindow(!oAuthWindow);
                    setToken(data.token);
                    setUsername(data.username);
                    setLoggedIn(true);
                    setModalOpen(false);
                    setLoginValues({
                        email: '',
                        password: '',
                        cofirmPass: '',
                    });
                    setRegisterValues({
                        email: '',
                        password: '',
                        cofirmPass: '',
                    });
                }
            })
            .catch(error => {
                setIsSubmitting(false)
                setError(genericErrorMessage)
            })
        }
    };


    return ( 
        <form className={classes.textField} method="POST" onSubmit={(e) => handleSubmit(e)}>
            <Collapse in={error !== ''}>
                <Box className={classes.alertBox} display='flex' justifyContent='center' alignItems='center'>
                    <Alert severity="warning" classes={{root: classes.alert, icon: classes.alertIcon}} style={{height: `${errorHeight}`}}><p className={classes.alertText}>{error}</p></Alert>
                </Box>
            </Collapse>
            <FormControl className={classes.form} variant="outlined" >
                <InputLabel htmlFor="outlined-adornment-username" classes={{root: classes.labelRoot, focused: classes.labelFocused}}>El. paštas</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-username"
                    type='text'
                    value={value ==="Prisijungti" ? loginValues.email : registerValues.email}
                    onChange={handleChange('email')}
                    classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline, input: classes.input}}
                    labelWidth={85}
                    tabIndex="1"
                />
            </FormControl>
            <FormControl className={classes.form} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password" classes={{root: classes.labelRoot, focused: classes.labelFocused}}>Slaptažodis</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    value={value ==="Prisijungti" ? loginValues.password : registerValues.password}
                    onChange={handleChange('password')}
                    classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline, input: classes.input}}
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
            <Collapse in={value === "Registruotis"}>
                <Box className={classes.confirmBox} display='flex' alignItems='center'>
                    <FormControl className={classes.form} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-confirm-password" classes={{root: classes.labelRoot, focused: classes.labelFocused}}>Patvirtinti slaptažodį</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-confirm-password"
                            type={showPassword ? 'text' : 'password'}
                            value={value ==="Prisijungti" ? loginValues.cofirmPass : registerValues.cofirmPass}
                            onChange={handleChange('cofirmPass')}
                            classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline, input: classes.input}}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        style={{color: "#1D3557"}}
                                        tabIndex="-2"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={148}
                            tabIndex="3"
                        />
                    </FormControl>
                </Box>
            </Collapse>
            <Button variant="contained" color="primary" type="submit" className={classes.button} disabled={isSubmitting}>
                {isSubmitting ? <CircularProgress size={20}/> : value }
            </Button>
        </form>
    )
}

export default LoginRegisterForm
