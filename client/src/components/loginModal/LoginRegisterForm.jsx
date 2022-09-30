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
        marginBottom: theme.myTheme.sizeMM,
        backgroundColor: theme.myTheme.sZalia.light,
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
    },
    input: {
        fontSize: theme.myTheme.sizeM,
    },
    diasbleOutline: {
        border: 'none',
    },
    button: {
        width: '100%',
        marginBottom: theme.myTheme.sizeXXS,
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
        height: theme.myTheme.sizeXXXL,
        color: theme.myTheme.balta,
        backgroundColor: theme.myTheme.tZalia.main,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        fontSize: theme.myTheme.sizeM,
    },
    alert: {
        width: '100%',
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
        paddingTop: theme.myTheme.sizeXXXS,
        paddingBottom: theme.myTheme.sizeXXXS,
        paddingRight: theme.myTheme.sizeXXXS,
        paddingLeft: theme.myTheme.sizeM,
    },
    alertBox: {
        marginBottom: theme.myTheme.sizeM,
    },
    alertText: {
        textAlign: "left",
        margin: 0,
        padding: 0,
        fontFamily: theme.myTheme.sriftas,
        overflowWrap: 'break-word',
        fontSize: theme.myTheme.sizeS,
    },
    alertIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.4)',
            marginRight: theme.myTheme.sizeM,
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
        },
    },
    passwordhideIcon: {
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.4)',
            marginRight: '.2rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
            marginRight: '1rem'
        },
    },
    labelRoot: {
        marginTop: '-.6rem',
        color: `${theme.myTheme.juoda} !important`,
        paddingTop: theme.myTheme.sizeXXXS,
        paddingBottom: theme.myTheme.sizeXXXS,
        paddingRight: theme.myTheme.sizeXXS,
        paddingLeft: theme.myTheme.sizeXXS,
        borderRadius: '5px 5px 0 0',
        backgroundColor: theme.myTheme.sZalia.light,
        fontFamily: theme.myTheme.sriftas,
        transform: 'translateX(.5rem) translateY(1.6rem)',
        fontSize: theme.myTheme.sizeM,
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '7px 7px 0 0',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '10px 10px 0 0',
        },
    },
    labelFocused: {
        color: `${theme.myTheme.juoda} !important`,
        fontFamily: theme.myTheme.sriftas,
        paddingTop: theme.myTheme.sizeXXXS,
        paddingBottom: theme.myTheme.sizeXXXS,
        paddingRight: theme.myTheme.sizeXXS,
        paddingLeft: theme.myTheme.sizeXXS,
        borderRadius: '5px 5px 0 0',
        backgroundColor: theme.myTheme.sZalia.light,
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '7px 7px 0 0',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '10px 10px 0 0',
        },
    },
    labelShrink: {
        marginTop: '-clamp(.4rem, 0.32vw, .8rem)',
    },
}));

const LoginRegisterForm = ({ setToken, setModalOpen, setLoggedIn, value, setError, error, setOAuthWindow, oAuthWindow, loginValues, setLoginValues, registerValues, setRegisterValues, setUsername, setMoneySpent }) => {

    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

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
