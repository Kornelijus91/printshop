import { useState, useEffect } from 'react'
import { Box, FormControl, OutlinedInput, InputLabel, IconButton, InputAdornment, Button, CircularProgress, Collapse, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Redirect } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { Helmet } from "react-helmet";
import { ProjectName } from '../../../Variables.jsx'
import Breadcurmbs from '../utils/Breadcurmbs.jsx';

const useStyles = makeStyles((theme) => ({
    root: {
        fontSize: theme.myTheme.sizeM,
        width: '100%',
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
        textAlign: 'left',
        padding: '0 1em 1em 1em',
        [theme.breakpoints.up('lg')]: {
            margin: 0,
            padding: 0,
        },
    },
    text: {
        fontFamily: theme.myTheme.sriftas,
    },
    form: {
        width: '100%',
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
            marginTop: '-.3em',
        },
    },
    labelShrink: {
        [theme.breakpoints.up('xxxl')]: {
            marginTop: '-.3em',
        },
    },
    textInput: {
        fontSize: theme.myTheme.sizeM,
        marginBottom: "1.2em",
        backgroundColor: theme.myTheme.sZalia.light,
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
    },
    innerBox: {
        width: '100%'
    },
    grid: {
        width: '100%',
        [theme.breakpoints.up('md')]: {
            spacing: 4,
        },
    },
    gridBox: {
        margin: '0',
        padding: '0',
        width: '100%',
    },
    griditem: {
        fontSize: theme.myTheme.sizeM,
        [theme.breakpoints.up('md')]: {
            paddingRight: '1em'
        },
    },
    input: {
        fontSize: theme.myTheme.sizeM,
    },
    diasbleOutline: {
        border: 'none',
    },
    alert: theme.myTheme.alert,
    alertBox: {
        marginBottom: theme.myTheme.sizeXL,
    },
    alertText: theme.myTheme.alertText,
    alertIcon: theme.myTheme.alertIcon,
    button: theme.myTheme.button,
    header: {
        width: '100%',
        fontSize: theme.myTheme.sizeXL,
        marginRight: '1em',
    },
    passwordhideIcon: {
        fontSize: theme.myTheme.sizeM,
        color: theme.myTheme.juoda,
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.35)',
            marginRight: '.2em'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
            marginRight: '1em'
        },
    },
    paragraph: {
        fontSize: theme.myTheme.sizeMM,
        margin: 0,
        padding: 0,
    },
}));

const Profile = ({ token, username, loggedIn, loyaltydiscountLevel, loyaltydiscount }) => {

    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState({
        color: 'warning',
        message: '',
    })
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
    })
    const [oldProfileData, setOldProfileData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
    })

    const [newPassword, setNewPassword] = useState({
        password: '',
        confirmPassword: '',
    })

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (prop) => (event) => {
        setProfileData({ ...profileData, [prop]: event.target.value });
    };

    const handlePasswordChange = (prop) => (event) => {
        setNewPassword({ ...newPassword, [prop]: event.target.value });
    };

    const getUserData = async () => {
        const fetchUserData = await fetch("/users/me/", {
            credentials: "include",
            headers: {
            "Content-Type": "application/json",
            "authorization": `JWT ${token}`,
            },
        });
        const userData = await fetchUserData.json();
        setProfileData({
            firstName: userData.firstName,
            lastName: userData.lastName,
            phoneNumber: userData.phoneNumber,
            email: userData.username,
        });
        setOldProfileData({
            firstName: userData.firstName,
            lastName: userData.lastName,
            phoneNumber: userData.phoneNumber,
            email: userData.username,
        });
    }

    const compareOldDAta = () => {
        if (profileData.firstName === oldProfileData.firstName && profileData.lastName === oldProfileData.lastName && profileData.phoneNumber === oldProfileData.phoneNumber && profileData.email === oldProfileData.email){
            return true;
        } else {
            return false;
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        if (!profileData.firstName && !profileData.lastName && !profileData.phoneNumber && !newPassword.password && !newPassword.confirmPassword) {
            setError({
                color: 'warning',
                message: 'Neįrašėte nieko, ką būtų galima atnaujinti.',
            });
            setIsSubmitting(false);
        } else if (compareOldDAta() && !newPassword.password && !newPassword.confirmPassword) {
            setError({
                color: 'warning',
                message: 'Nepakeitėte savo duomenų.',
            });
            setIsSubmitting(false);
        } else if (newPassword.password && ((!profileData.firstName && !profileData.lastName && !profileData.phoneNumber) || compareOldDAta())) {
            const regExp = /[a-z]/g
            const regExp2 = /[A-Z]/g
            const regExp3 = /[0-9]/g
            if (!newPassword.confirmPassword){
                setError({
                    color: 'warning',
                    message: 'Pakartokite naują slaptažodį.',
                });
                setIsSubmitting(false);
            } else if (String(newPassword.password).length < 6) {
                setError({
                    color: 'warning',
                    message: 'Slaptažodį turi sudaryti bent 6 simboliai.',
                });
                setIsSubmitting(false);
            } else if (!(regExp3.test(String(newPassword.password)) && (regExp2.test(String(newPassword.password)) || regExp.test(String(newPassword.password))))) {
                setError({
                    color: 'warning',
                    message: 'Slaptažodis turi būti sudarytas iš bent vieno skaičiaus ir bent vienos raidės.',
                });
                setIsSubmitting(false);
            } else if (newPassword.password !== newPassword.confirmPassword) {
                setError({
                    color: 'warning',
                    message: 'Slaptažodžiai nesutampa.',
                });
                setIsSubmitting(false);
            } else {
                const changeUserPassword = await fetch("/users/changepassword/", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                      "Content-Type": "application/json",
                      "authorization": `JWT ${token}`,
                    },
                    body: JSON.stringify({
                        username: username,
                        password: newPassword.password
                    }),
                });
                const changeUserPasswordResponse = await changeUserPassword.json();
                if (changeUserPasswordResponse.success) {
                    setError({
                        color: 'success',
                        message: 'Slaptažodis pakeistas.',
                    });
                    setIsSubmitting(false);
                    setNewPassword({
                        password: '',
                        confirmPassword: '',
                    });
                } else {
                    setError({
                        color: 'warning',
                        message: 'Klaida! Pabandykite vėliau.',
                    });
                    setIsSubmitting(false);
                }
            }
        } else if (!newPassword.password && newPassword.confirmPassword && ((!profileData.firstName && !profileData.lastName && !profileData.phoneNumber) || compareOldDAta())) {
            setError({
                color: 'warning',
                message: 'Įrašykite slaptažodį.',
            });
            setIsSubmitting(false);
        } else if ((profileData.firstName || profileData.lastName || profileData.phoneNumber) && !newPassword.password) {
            const updateUserData = await fetch("/users/updateprofile/", {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                  "authorization": `JWT ${token}`,
                },
                body: JSON.stringify({
                    username: username,
                    firstName: profileData.firstName,
                    lastName: profileData.lastName,
                    phoneNumber: profileData.phoneNumber,
                }),
            });
            const updateUserDataResponse = await updateUserData.json();
            if (updateUserDataResponse.success) {
                setError({
                    color: 'success',
                    message: 'Profilis atnaujintas.',
                });
                setIsSubmitting(false);
                setOldProfileData({
                    firstName: profileData.firstName,
                    lastName: profileData.lastName,
                    phoneNumber: profileData.phoneNumber,
                    email: username,
                });
            } else {
                setError({
                    color: 'warning',
                    message: 'Klaida! Pabandykite vėliau.',
                });
                setIsSubmitting(false);
            }
        } else {
            const regExp = /[a-z]/g
            const regExp2 = /[A-Z]/g
            const regExp3 = /[0-9]/g
            if (!newPassword.confirmPassword){
                setError({
                    color: 'warning',
                    message: 'Pakartokite naują slaptažodį.',
                });
                setIsSubmitting(false);
            } else if (String(newPassword.password).length < 6) {
                setError({
                    color: 'warning',
                    message: 'Slaptažodį turi sudaryti bent 6 simboliai.',
                });
                setIsSubmitting(false);
            } else if (!(regExp3.test(String(newPassword.password)) && (regExp2.test(String(newPassword.password)) || regExp.test(String(newPassword.password))))) {
                setError({
                    color: 'warning',
                    message: 'Slaptažodis turi būti sudarytas iš bent vieno skaičiaus ir bent vienos raidės.',
                });
                setIsSubmitting(false);
            } else if (newPassword.password !== newPassword.confirmPassword) {
                setError({
                    color: 'warning',
                    message: 'Slaptažodžiai nesutampa.',
                });
                setIsSubmitting(false);
            } else {
                const changeUserPassword = await fetch("/users/changepassword/", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                    "Content-Type": "application/json",
                    "authorization": `JWT ${token}`,
                    },
                    body: JSON.stringify({
                        username: username,
                        password: newPassword.password
                    }),
                });
                const changeUserPasswordResponse = await changeUserPassword.json();
                if (changeUserPasswordResponse.success) {
                    const updateUserData = await fetch("/users/updateprofile/", {
                        method: "POST",
                        credentials: "include",
                        headers: {
                        "Content-Type": "application/json",
                        "authorization": `JWT ${token}`,
                        },
                        body: JSON.stringify({
                            username: username,
                            firstName: profileData.firstName,
                            lastName: profileData.lastName,
                            phoneNumber: profileData.phoneNumber,
                        }),
                    });
                    const updateUserDataResponse = await updateUserData.json();
                    if (updateUserDataResponse.success) {
                        setError({
                            color: 'success',
                            message: 'Atnaujintas profilis ir pakeistas slaptažodis.',
                        });
                        setIsSubmitting(false);
                        setOldProfileData({
                            firstName: profileData.firstName,
                            lastName: profileData.lastName,
                            phoneNumber: profileData.phoneNumber,
                            email: username,
                        });
                        setNewPassword({
                            password: '',
                            confirmPassword: '',
                        });
                    } else {
                        setError({
                            color: 'warning',
                            message: 'Klaida! Pabandykite vėliau.',
                        });
                        setIsSubmitting(false);
                    }

                } else {
                    setError({
                        color: 'warning',
                        message: 'Klaida! Pabandykite vėliau.',
                    });
                    setIsSubmitting(false);
                }
            }
        }
    }

    useEffect(() => {
        getUserData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Box classes={{root: classes.root}}>
            <Helmet>
                <title>Profilis | {ProjectName}</title>  
            </Helmet>
            {loggedIn && token ? 
                <Box display='flex' justifyContent='center'>
                    <Box classes={{root: classes.innerBox}}>
                        <Breadcurmbs routes={[{path: 'profile', name: 'Profilis'}]}/>
                        <h1 className={classes.header}>Mano Profilis</h1>
                        <Collapse in={error.message !== ''} onEnter={() => window.scrollTo({top: 0, left: 0})}>
                            <Box className={classes.alertBox} display='flex' justifyContent='flex-start' alignItems='center'>
                                <Alert 
                                    severity={error.color}
                                    classes={{root: classes.alert, icon: classes.alertIcon}} 
                                >
                                    <p className={classes.alertText}>{error.message}</p>
                                </Alert>
                            </Box>
                        </Collapse>

                        <Box className={classes.gridBox}>
                            <Grid container display='flex' justifyContent='center' className={classes.grid}>
                                <Grid item xl={6} xs={12} md={6} sm={12} lg={6} className={classes.griditem}>

                                    <FormControl className={classes.form} variant="outlined" >
                                        <InputLabel htmlFor="outlined-adornment-firstName" classes={{root: classes.labelRoot, focused: classes.labelFocused, shrink: classes.labelShrink}}>Vardas</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-firstName"
                                            type='text'
                                            value={profileData.firstName}
                                            onChange={handleChange('firstName')}
                                            classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline, input: classes.input}}
                                            labelWidth={85}
                                            tabIndex="1"
                                        />
                                    </FormControl>

                                </Grid>
                                <Grid item xl={6} xs={12} md={6} sm={12} lg={6}>

                                    <FormControl className={classes.form} variant="outlined" >
                                        <InputLabel htmlFor="outlined-adornment-lastName" classes={{root: classes.labelRoot, focused: classes.labelFocused, shrink: classes.labelShrink}}>Pavardė</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-lastName"
                                            type='text'
                                            value={profileData.lastName}
                                            onChange={handleChange('lastName')}
                                            classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline, input: classes.input}}
                                            labelWidth={85}
                                            tabIndex="2"
                                        />
                                    </FormControl>

                                </Grid>
                            </Grid>
                        </Box>

                        <Grid container display='flex' justifyContent='center' className={classes.grid}>
                            <Grid item xl={6} xs={12} md={6} sm={12} lg={6} className={classes.griditem}>

                                <FormControl className={classes.form} variant="outlined" >
                                    <InputLabel htmlFor="outlined-adornment-phoneNumber" classes={{root: classes.labelRoot, focused: classes.labelFocused, shrink: classes.labelShrink}}>Telefono nr.</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-phoneNumber"
                                        type='text'
                                        value={profileData.phoneNumber}
                                        onChange={handleChange('phoneNumber')}
                                        classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline, input: classes.input}}
                                        labelWidth={85}
                                        tabIndex="3"
                                    />
                                </FormControl>

                            </Grid>
                            <Grid item xl={6} xs={12} md={6} sm={12} lg={6}>

                                <FormControl className={classes.form} variant="outlined" >
                                    <InputLabel htmlFor="outlined-adornment-email" classes={{root: classes.labelRoot, focused: classes.labelFocused, shrink: classes.labelShrink}}>El. Paštas</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-email"
                                        type='text'
                                        disabled={true}
                                        value={profileData.email}
                                        onChange={handleChange('email')}
                                        classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline, input: classes.input}}
                                        labelWidth={85}
                                        tabIndex="4"
                                    />
                                </FormControl>

                            </Grid>
                        </Grid>

                        <h1 className={classes.header}>Tavo reklama klubas</h1>

                        <Box className={classes.gridBox}>
                            <Grid container display='flex' justifyContent='center' className={classes.grid}>
                                <Grid item xl={6} xs={12} md={6} sm={6} lg={6} className={classes.griditem}>
                                    <h2 className={classes.paragraph}>Lygis: {loyaltydiscountLevel}</h2>
                                </Grid>
                                <Grid item xl={6} xs={12} md={6} sm={6} lg={6} className={classes.griditem}>
                                    <h2 className={classes.paragraph}>Nuolaida: {loyaltydiscount}%</h2>
                                </Grid>
                            </Grid>
                        </Box>

                        <h1 className={classes.header}>Keisti slaptažodį</h1>

                        <Box className={classes.gridBox}>
                            <Grid container display='flex' justifyContent='center' className={classes.grid}>
                                <Grid item xl={6} xs={12} md={6} sm={12} lg={6} className={classes.griditem}>

                                    <FormControl className={classes.form} variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password" classes={{root: classes.labelRoot, focused: classes.labelFocused, shrink: classes.labelShrink}}>Naujas slaptažodis</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={newPassword.password}
                                            onChange={handlePasswordChange('password')}
                                            classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline, input: classes.input}}
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
                                            labelWidth={85}
                                            tabIndex="5"
                                        />
                                    </FormControl>

                                </Grid>
                                <Grid item xl={6} xs={12} md={6} sm={12} lg={6}>

                                    <FormControl className={classes.form} variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-confirmPassword" classes={{root: classes.labelRoot, focused: classes.labelFocused, shrink: classes.labelShrink}}>Pakartokite slaptažodį</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-confirmPassword"
                                            type={showPassword ? 'text' : 'password'}
                                            value={newPassword.confirmPassword}
                                            onChange={handlePasswordChange('confirmPassword')}
                                            classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline, input: classes.input}}
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
                                            labelWidth={85}
                                            tabIndex="6"
                                        />
                                    </FormControl>

                                </Grid>
                            </Grid>
                        </Box>

                        <Button variant="contained" color="primary" className={classes.button} disabled={isSubmitting} onClick={() => {handleSubmit()}}>
                            {isSubmitting ? <CircularProgress size={20}/> : "Išsaugoti pakeitimus" }
                        </Button>
                    </Box>
                </Box>
            : 
                <Redirect to="/" />
            }
        </Box>
    )
}

export default Profile
