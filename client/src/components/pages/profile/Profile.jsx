import { useState, useEffect } from 'react'
import { Container, Box, FormControl, OutlinedInput, InputLabel, IconButton, InputAdornment, Button, CircularProgress, Collapse, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Redirect } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        textAlign: 'left',
        minHeight: '88vh',
        backgroundColor: theme.myTheme.trecia,
        '-moz-box-shadow': 'inset 0 0 5px #000000',
        '-webkit-box-shadow': 'inset 0 0 5px #000000',
        boxShadow: 'inset 0 0 5px #000000',
        [theme.breakpoints.down('sm')]: {
            margin: "0",
            padding: '0',
            width: '100%',
        },
        
    },
    text: {
        fontFamily: theme.myTheme.sriftas,
    },
    form: {
        // width: '100%',
    },
    labelRoot: {
        marginTop: '-.5rem',
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
    textInput: {
        margin: "0 0 .5rem 0",
        width: '20rem',
        backgroundColor: theme.myTheme.ketvirta,
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        borderRadius: '5rem',
        boxShadow: "0px 2px 2px #888888",
        '&:hover': {
            boxShadow: "0px 2px 3px #888888"
        },
        [theme.breakpoints.down('sm')]: {
            width: '26rem',
            margin: 'auto'
        },
        [theme.breakpoints.down('xs')]: {
            width: '20rem',
            margin: 'auto'
        },
    },
    innerBox: {
        [theme.breakpoints.up('xs')]: {
            margin: "0 0 0 2rem",
            width: '100%'
        },
        [theme.breakpoints.up('sm')]: {
            margin: "0 0 0 2rem",
            width: '30rem',
            display: 'flex',
            justifyContent: 'center'
        },
        [theme.breakpoints.up('md')]: {
            margin: "0",
            width: '100%'
        },
    },
    mobilealign: {

    },
    grid: {
        // width: '100%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    gridBox: {
        margin: '0',
        padding: '0',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            marginBottom: "1rem",
            width: '100%',
        },
    },
    griditem: {
        margin: '0',
        padding: '0',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    input: {
        height: '.5rem',
    },
    diasbleOutline: {
        border: 'none',
    },
    alert: {
        width: '100%',
        borderRadius: '10rem',
        // height: '2.5rem',
        boxShadow: "0px 2px 2px #888888",
        padding: '0',
        marginBottom: '1rem',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    alertBox: {
        marginBottom: '1rem',
        // [theme.breakpoints.down('sm')]: {
        //     // width: '100%',
        //     margin: '0 1rem 1rem 0'
        // },  
        [theme.breakpoints.down('sm')]: {
            width: '26rem',
            // marginBottom: '1rem'
        },
        [theme.breakpoints.down('xs')]: {
            width: '20rem',
            // marginBottom: '1rem'
        },
    },
    alertText: {
        textAlign: "left",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: "0",
        margin: "0",
        fontFamily: theme.myTheme.sriftas,
    },
    alertIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: "1rem",
    },
    button: {
        width: '100%',
        margin: "1rem 0 0 0",
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
        [theme.breakpoints.down('sm')]: {
            width: '26rem',
            marginBottom: '2rem'
        },
        [theme.breakpoints.down('xs')]: {
            width: '20rem',
            marginBottom: '2rem'
        },
    },
    header: {
        width: '100%',
        marginRight: '1rem'
    },
}));

const Profile = ({ token, username, loggedIn }) => {

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
        <Container maxWidth='xl' classes={{root: classes.root}}>
            {loggedIn && token ? 
                <Box display='flex' justifyContent='center'>
                    <Box classes={{root: classes.innerBox}}>
                        <Box classes={{root: classes.mobilealign}}>
                            <h1 className={classes.header}>Mano Profilis</h1>

                            <Collapse in={error.message !== ''}>
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
                                <Grid container display='flex' justifyContent='center' spacing={4} className={classes.grid}>
                                    <Grid item xl={6} xs={12} md={6} sm={12} lg={6} className={classes.griditem}>

                                        <FormControl className={classes.form} variant="outlined" >
                                            <InputLabel htmlFor="outlined-adornment-firstName" classes={{root: classes.labelRoot, focused: classes.labelFocused}}>Vardas</InputLabel>
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
                                            <InputLabel htmlFor="outlined-adornment-lastName" classes={{root: classes.labelRoot, focused: classes.labelFocused}}>Pavardė</InputLabel>
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

                            <Grid container display='flex' justifyContent='center' spacing={4} className={classes.grid}>
                                <Grid item xl={6} xs={12} md={6} sm={12} lg={6} className={classes.griditem}>

                                    <FormControl className={classes.form} variant="outlined" >
                                        <InputLabel htmlFor="outlined-adornment-phoneNumber" classes={{root: classes.labelRoot, focused: classes.labelFocused}}>Telefono nr.</InputLabel>
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
                                        <InputLabel htmlFor="outlined-adornment-email" classes={{root: classes.labelRoot, focused: classes.labelFocused}}>El. Paštas</InputLabel>
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

                            <h1 className={classes.header}>Keisti slaptažodį</h1>

                            <Box className={classes.gridBox}>
                                <Grid container display='flex' justifyContent='center' spacing={4} className={classes.grid}>
                                    <Grid item xl={6} xs={12} md={6} sm={12} lg={6} className={classes.griditem}>

                                        <FormControl className={classes.form} variant="outlined">
                                            <InputLabel htmlFor="outlined-adornment-password" classes={{root: classes.labelRoot, focused: classes.labelFocused}}>Naujas slaptažodis</InputLabel>
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
                                                            style={{color: "#1D3557"}}
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
                                            <InputLabel htmlFor="outlined-adornment-confirmPassword" classes={{root: classes.labelRoot, focused: classes.labelFocused}}>Pakartokite slaptažodį</InputLabel>
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
                                                            style={{color: "#1D3557"}}
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
                </Box>
            : 
                <Redirect to="/" />
            }
        </Container>
    )
}

export default Profile
