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
        marginBottom: "1.2rem",
        backgroundColor: theme.myTheme.ketvirta,
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        borderRadius: '6px',
        [theme.breakpoints.up('xxl')]: {
            marginBottom: "1.5rem",
            borderRadius: '9px',
            display: 'flex',
            alignItems: 'center',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginBottom: "2rem",
            borderRadius: '12px',
            paddingLeft: '1rem'
        },
    },
    input: {
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.4rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2rem',
            padding: '2rem'
        },
    },
    diasbleOutline: {
        border: 'none',
    },
    button: {
        width: '100%',
        marginBottom: ".5rem",
        borderRadius: '6px',
        height: '2.5rem',
        color: theme.myTheme.trecia,
        backgroundColor: theme.myTheme.pirma,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        [theme.breakpoints.up('xxl')]: {
            marginBottom: ".75rem",
            borderRadius: '9px',
            height: '3.375rem',
            fontSize: '1.2rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginBottom: "1rem",
            borderRadius: '12px',
            height: '4.5rem',
            fontSize: '1.6rem',
        },
    },
    alert: {
        width: '100%',
        borderRadius: '6px',
        padding: '.2rem .2rem .2rem 1rem',
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '9px',
            padding: '.3rem .3rem .3rem 1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '12px',
            padding: '1rem .4rem 1rem 2rem',
        },
    },
    alertBox: {
        marginBottom: '1rem',
        [theme.breakpoints.up('xxl')]: {
            marginBottom: '1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginBottom: '2rem',
        },
    },
    alertText: {
        textAlign: "left",
        margin: 0,
        padding: 0,
        fontFamily: theme.myTheme.sriftas,
        overflowWrap: 'break-word',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.2rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.6rem',
        },
    },
    alertIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.5)',
            marginRight: '1rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
            marginRight: '1.5rem'
        },
    },
    passwordhideIcon: {
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.35)',
            marginRight: '.2rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
            marginRight: '1rem'
        },
    },
    labelRoot: {
        marginTop: '-.6rem',
        color: `${theme.myTheme.sriftoSpalva} !important`,
        padding: '.2rem .5rem .2rem .5rem',
        borderRadius: '6px 6px 0 0',
        backgroundColor: theme.myTheme.ketvirta,
        fontFamily: theme.myTheme.sriftas,
        transform: 'translateX(.5rem) translateY(1.6rem)',
        [theme.breakpoints.up('xxl')]: {
            // marginTop: '-.9rem',
            padding: '.3rem .75rem .3rem .75rem',
            borderRadius: '9px 9px 0 0',
            fontSize: '1.4rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginTop: 0,
            padding: '.4rem 1rem .4rem 1rem',
            borderRadius: '12px 12px 0 0',
            fontSize: '2rem',
        },
    },
    labelFocused: {
        color: `${theme.myTheme.sriftoSpalva} !important`,
        fontFamily: theme.myTheme.sriftas,
        padding: '.2rem .5rem .2rem .5rem',
        borderRadius: '6px 6px 0 0',
        backgroundColor: theme.myTheme.ketvirta,
        [theme.breakpoints.up('xxl')]: {
            padding: '.3rem .75rem .3rem .75rem',
            borderRadius: '9px 9px 0 0',
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '.4rem 1rem .4rem 1rem',
            borderRadius: '12px 12px 0 0',
        },
    },
    labelShrink: {
        [theme.breakpoints.up('xxxl')]: {
            marginTop: '-1rem'
        },
    },
}));

const LoginRegisterForm = ({ setToken, setModalOpen, setLoggedIn, value, setError, error, setOAuthWindow, oAuthWindow, loginValues, setLoginValues, registerValues, setRegisterValues, setUsername, setMoneySpent }) => {

    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    // const [errorHeight, setErrorHeight] = useState('2.5rem')

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
            // setErrorHeight('2.5rem');
            setError("Įrašykite El. Pašto adresą.");
            setIsSubmitting(false);
        } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(loginValues.email).toLowerCase())) {
            // setErrorHeight('2.5rem');
            setError("Neteisingas El. Pašto adresas.");
            setIsSubmitting(false);
        } else if (!loginValues.password) {
            // setErrorHeight('2.5rem');
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
                        // setErrorHeight('3.5rem');
                        setError("Užpildykite laukus tinkama informacija.")
                    } else if (response.status === 401) {
                        // setErrorHeight('3.5rem');
                        setError("Neteisingas vartotojo vardas arba slaptažodis.")
                    } else {
                        if (response.statusText === "google") {
                            // setErrorHeight('3.5rem');
                            setError("Vartotojas jau registruotas su Google.")
                        } else if (response.statusText === "google") {
                            // setErrorHeight('3.5rem');
                            setError("Vartotojas jau registruotas su Facebook.")
                        } else {
                            // setErrorHeight('3.5rem');
                            setError("Toks El. Pašto adresas jau užregistruotas.")
                        }
                    }
                } else {
                    const data = await response.json()
                    setOAuthWindow(!oAuthWindow);
                    setToken(data.token);
                    setUsername(data.username);
                    setMoneySpent(data.moneySpent);
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
            // setErrorHeight('2.5rem');
            setError("Įrašykite El. Pašto adresą.");
            setIsSubmitting(false);
        } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(registerValues.email).toLowerCase())) {
            // setErrorHeight('2.5rem');
            setError("Neteisingas El. Pašto adresas.");
            setIsSubmitting(false);
        } else if (!registerValues.password) {
            // setErrorHeight('2.5rem');
            setError("Įrašykite slaptažodį.");
            setIsSubmitting(false);
        } else if (String(registerValues.password).length < 6) {
            // setErrorHeight('3.5rem');
            setError("Slaptažodį turi sudaryti bent 6 simboliai.");
            setIsSubmitting(false);
        } else if (!(regExp3.test(String(registerValues.password)) && (regExp2.test(String(registerValues.password)) || regExp.test(String(registerValues.password))))) {
            // setErrorHeight('3.5rem');
            setError("Slaptažodis turi būti sudarytas iš bent vieno skaičiaus ir bent vienos raidės.");
            setIsSubmitting(false);
        } else if (!registerValues.cofirmPass) {
            // setErrorHeight('2.5rem');
            setError("Patvirtinkite slaptažodį.");
            setIsSubmitting(false);
        } else if (registerValues.cofirmPass !== registerValues.password) {
            // setErrorHeight('2.5rem');
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
                        // setErrorHeight('3.5rem');
                        setError("Užpildykite laukus tinkama informacija.")
                    } else if (response.status === 401) {
                        // setErrorHeight('3.5rem');
                        setError("Neteisingas vartotojo vardas arba slaptažodis.")
                    } else {
                        if (response.statusText === "google") {
                            // setErrorHeight('3.5rem');
                            setError("Vartotojas jau registruotas su Google.")
                        } else if (response.statusText === "google") {
                            // setErrorHeight('3.5rem');
                            setError("Vartotojas jau registruotas su Facebook.")
                        } else if (response.statusText === "linkedIn") {
                            // setErrorHeight('3.5rem');
                            setError("Vartotojas jau registruotas su Linked In.")
                        } else {
                            // setErrorHeight('3.5rem');
                            setError("Toks El. Pašto adresas jau užregistruotas.")
                        }
                    }
                } else {
                    const data = await response.json()
                    setOAuthWindow(!oAuthWindow);
                    setToken(data.token);
                    setUsername(data.username);
                    setMoneySpent(data.moneySpent);
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
                    <Alert severity="warning" classes={{root: classes.alert, icon: classes.alertIcon}}><p className={classes.alertText}>{error}</p></Alert>
                </Box>
            </Collapse>
            <FormControl className={classes.form} variant="outlined" >
                <InputLabel htmlFor="outlined-adornment-username" classes={{root: classes.labelRoot, focused: classes.labelFocused, shrink: classes.labelShrink}}>El. paštas</InputLabel>
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
                <InputLabel htmlFor="outlined-adornment-password" classes={{root: classes.labelRoot, focused: classes.labelFocused, shrink: classes.labelShrink}}>Slaptažodis</InputLabel>
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
                                classes={{root: classes.passwordhideIcon}}
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
                        <InputLabel htmlFor="outlined-adornment-confirm-password" classes={{root: classes.labelRoot, focused: classes.labelFocused, shrink: classes.labelShrink}}>Patvirtinti slaptažodį</InputLabel>
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
                                        classes={{root: classes.passwordhideIcon}}
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
