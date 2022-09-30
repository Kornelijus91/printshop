import { useParams, Redirect } from 'react-router-dom';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box, CircularProgress, InputLabel, OutlinedInput, InputAdornment, IconButton, FormControl, Collapse } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Helmet } from "react-helmet";
import { ProjectName } from '../../Variables.jsx'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        width: '100%',
        backgroundColor: theme.myTheme.ruda.main,
        height:'88vh'
    },
    form: {
        width: '18rem',
        [theme.breakpoints.up('md')]: {
            width: 'clamp(20rem, 16vw, 40rem)',
        },
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
    passwordhideIcon: {
        color: theme.myTheme.juoda,
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.4)',
            marginRight: '.2rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
            marginRight: '1rem'
        },
    },
    alert: {
        width: '18rem',
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
        paddingTop: theme.myTheme.sizeXXXS,
        paddingBottom: theme.myTheme.sizeXXXS,
        paddingRight: theme.myTheme.sizeXXXS,
        paddingLeft: theme.myTheme.sizeM,
        [theme.breakpoints.up('md')]: {
            width: 'clamp(20rem, 16vw, 40rem)',
        },
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
    h2: {
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
        fontSize: theme.myTheme.sizeM,
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
            });
            setIsSubmitting(false);
        } else if (String(password.password).length < 6) {
            setAlert({
                show: true,
                message: 'Slaptažodį turi sudaryti bent 6 simboliai.',
                style: 'warning',
            });
            setIsSubmitting(false);
        } else if (!(regExp3.test(String(password.password)) && (regExp2.test(String(password.password)) || regExp.test(String(password.password))))) {
            setAlert({
                show: true,
                message: 'Slaptažodis turi būti sudarytas iš bent vieno skaičiaus ir bent vienos raidės.',
                style: 'warning',
            });
            setIsSubmitting(false);
        } else
        if(!password.cofirmPass) {
            setAlert({
                show: true,
                message: 'Patvirtinkite slaptažodį.',
                style: 'warning',
            });
            setIsSubmitting(false);
        } else
        if(password.password !== password.cofirmPass) {
            setAlert({
                show: true,
                message: 'Slaptažodžiai nesutampa.',
                style: 'warning',
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
                    });
                    setIsSubmitting(false);
                } else if (response.message === 'error') {
                    setAlert({
                        show: true,
                        message: 'Pabandykite vėliau.',
                        style: 'warning',
                    });
                    setIsSubmitting(false);
                } else {
                    setAlert({
                        show: true,
                        message: 'Slaptažodis pakeistas.',
                        style: 'success',
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
                });
                setIsSubmitting(false);
            }
        }

    };

    return (
        <Box className={classes.root}>
            <Helmet>
                <meta name="robots" content="noindex" />
                <title>Slaptažodžio keitimas | {ProjectName}</title>  
            </Helmet>
            {success &&  <Redirect to="/" />}
            <Box display="flex" justifyContent="center"> 
                <h2 className={classes.h2}>Slaptažodžio keitimas</h2>
            </Box>
            <Collapse in={alert.show}>
                <Box className={classes.alertBox} display="flex" justifyContent="center">
                    <Alert severity={`${alert.style}`} classes={{root: classes.alert, icon: classes.alertIcon}}><p className={classes.alertText}>{alert.message}</p></Alert>
                </Box>
            </Collapse>
            <Box display="flex" justifyContent="center"> 
                <form onSubmit={(e) => handleSubmit(e)}>
                    <FormControl className={classes.form} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password" classes={{root: classes.labelRoot, focused: classes.labelFocused, shrink: classes.labelShrink}}>Naujas slaptažodis</InputLabel>
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
                                        classes={{root: classes.passwordhideIcon}}
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
                        <InputLabel htmlFor="outlined-adornment-confirm-password" classes={{root: classes.labelRoot, focused: classes.labelFocused, shrink: classes.labelShrink}}>Pakartokite slaptažodį</InputLabel>
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
                                        classes={{root: classes.passwordhideIcon}}
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
        </Box>
    )
}

export default ResetPassword
