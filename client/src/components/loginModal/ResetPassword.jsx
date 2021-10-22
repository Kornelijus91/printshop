import { useParams, Redirect } from 'react-router-dom';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box, Container, CircularProgress, InputLabel, OutlinedInput, InputAdornment, IconButton, FormControl, Collapse } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Helmet } from "react-helmet";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        backgroundColor: theme.myTheme.trecia,
        height:'88vh'
    },
    form: {
        width: '20rem',
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
    alert: {
        width: '20rem',
        marginBottom: '1rem',
        borderRadius: '10rem',
        boxShadow: "0px 2px 2px #888888",
        padding: '.2rem .2rem .2rem 1rem',
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
    alertBox: {
        width: '20rem',
        margin: 'auto'
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
    h2: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
    },
}));

const ResetPassword = () => {

    let { token } = useParams();
    const classes = useStyles();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [alert, setAlert] = useState({
        show: false,
        message: '',
        style: 'warning',
        height: '2.5rem'
    })
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState({
        password: '',
        cofirmPass: '',
    });

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (prop) => (event) => {
        setPassword({ ...password, [prop]: event.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAlert({
            show: false,
            message: '',
            style: 'warning'
        });
        setIsSubmitting(true);

        const regExp = /[a-z]/g
        const regExp2 = /[A-Z]/g
        const regExp3 = /[0-9]/g

        if(!password.password) {
            setAlert({
                show: true,
                message: 'Įrašykite slaptažodį.',
                style: 'warning',
                height: '2.5rem'
            });
            setIsSubmitting(false);
        } else if (String(password.password).length < 6) {
            setAlert({
                show: true,
                message: 'Slaptažodį turi sudaryti bent 6 simboliai.',
                style: 'warning',
                height: '3.5rem'
            });
            setIsSubmitting(false);
        } else if (!(regExp3.test(String(password.password)) && (regExp2.test(String(password.password)) || regExp.test(String(password.password))))) {
            setAlert({
                show: true,
                message: 'Slaptažodis turi būti sudarytas iš bent vieno skaičiaus ir bent vienos raidės.',
                style: 'warning',
                height: '3.5rem'
            });
            setIsSubmitting(false);
        } else
        if(!password.cofirmPass) {
            setAlert({
                show: true,
                message: 'Patvirtinkite slaptažodį.',
                style: 'warning',
                height: '2.5rem'
            });
            setIsSubmitting(false);
        } else
        if(password.password !== password.cofirmPass) {
            setAlert({
                show: true,
                message: 'Slaptažodžiai nesutampa.',
                style: 'warning',
                height: '2.5rem'
            });
            setIsSubmitting(false);
        } else {
            const request = await fetch(`/users/resetpassword`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    token: token,
                    password: password.password
                })
            })
            var response = await request.json()
            if (response.message) {
                if (response.message === 'expired') {
                    setAlert({
                        show: true,
                        message: 'Nuoroda nebegalioja.',
                        style: 'warning',
                        height: '2.5rem'
                    });
                    setIsSubmitting(false);
                } else if (response.message === 'error') {
                    setAlert({
                        show: true,
                        message: 'Pabandykite vėliau.',
                        style: 'warning',
                        height: '2.5rem'
                    });
                    setIsSubmitting(false);
                } else {
                    setAlert({
                        show: true,
                        message: 'Slaptažodis pakeistas.',
                        style: 'success',
                        height: '2.5rem'
                    });
                    setIsSubmitting(false);
                    setPassword({
                        password: '',
                        cofirmPass: '',
                    });
                    setTimeout(() => setSuccess(true), 3000)
                }
            } else {
                setAlert({
                    show: true,
                    message: 'Pabandykite vėliau.',
                    height: '2.5rem'
                });
                setIsSubmitting(false);
            }
        }

    };

    return (
        <Container maxWidth='xl' className={classes.root}>
            <Helmet>
                <meta name="robots" content="noindex" />
                <title>ARTIS SPAUSDIN</title>
            </Helmet>
            {success &&  <Redirect to="/" />}
            <Box display="flex" justifyContent="center"> 
                <h2 className={classes.h2}>Slaptažodžio keitimas</h2>
            </Box>
            <Collapse in={alert.show}>
                <Box className={classes.alertBox} display="flex" justifyContent="center">
                    <Alert severity={`${alert.style}`} classes={{root: classes.alert, icon: classes.alertIcon}} style={{height: `${alert.height}`}}><p className={classes.alertText}>{alert.message}</p></Alert>
                </Box>
            </Collapse>
            <Box display="flex" justifyContent="center"> 
                <form onSubmit={(e) => handleSubmit(e)}>
                    <FormControl className={classes.form} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password" classes={{root: classes.labelRoot, focused: classes.labelFocused}}>Naujas slaptažodis</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password.password}
                            classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline, input: classes.input}}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        tabIndex="-1"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={137}
                            tabIndex="1"
                        />
                    </FormControl>
                    <br />
                    <FormControl className={classes.form} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-confirm-password" classes={{root: classes.labelRoot, focused: classes.labelFocused}}>Pakartokite slaptažodį</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-confirm-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password.cofirmPass}
                            classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline, input: classes.input}}
                            onChange={handleChange('cofirmPass')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        tabIndex="-1"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={160}
                            tabIndex="2"
                        />
                    </FormControl>
                    <br />
                    <Button variant="contained" color="primary" type="submit" className={classes.button} disabled={isSubmitting}>
                        {isSubmitting ? <CircularProgress size={20}/> : "Išsaugoti" }
                    </Button>
                </form>
            </Box>
        </Container>
    )
}

export default ResetPassword
