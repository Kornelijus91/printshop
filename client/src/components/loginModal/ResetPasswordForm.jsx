import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { FormControl, InputLabel, OutlinedInput, Fade, CircularProgress, Box, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: '0',
        padding: '0'
    },
    form: {
        width: '80%',
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
    infotext: {
        textAlign: 'left',
        color: theme.myTheme.sriftoSpalva,
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.2rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.7rem'
        },
    },
    header: {
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.5rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2.1rem'
        },
    },
    infotextBox: {
        width: '80%',
        margin: 'auto',
    },
    alert: {
        width: '80%',
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
        display: 'flex',
        justifyContent: 'center',
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
    button: {
        width: '80%',
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
    loadingIcon: {
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.35)'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)'
        },
    },
}));

const ResetPasswordForm = ({setModalOpen}) => {

    const classes = useStyles();

    const [email, setEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState({
        show: true,
        showFade: true,
        message: '',
        type: 'warning',
    })

    const handleChange = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError({
            show: true,
            showFade: true,
            message: '',
            type: 'warning',
        });
        if (!email) {
            setError({
                ...error,
                showFade: false,
                message: 'Įrašykite El. Pašto adresą.',
                type: 'warning',
            });
            setIsSubmitting(false);
        } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email).toLowerCase())) {
            setError({
                ...error,
                showFade: false,
                message: 'Neteisingas El. Pašto adresas.',
                type: 'warning'
            });
            setIsSubmitting(false);
        } else {
            const resPost = await fetch("/users/sendhelp", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email })
            })
            var resPostData = await resPost.json()
            if (resPostData.error) {
                if (resPostData.message === 'google'){
                    setError({
                        ...error,
                        showFade: false,
                        message: 'Paskyra sukurta su Google. Pabandykite prisijungti su Google.',
                        type: 'warning',
                    });
                    setIsSubmitting(false);
                } else if (resPostData.message === 'facebook'){
                    setError({
                        ...error,
                        showFade: false,
                        message: 'Paskyra sukurta su Facebook. Pabandykite prisijungti su Facebook.',
                        type: 'warning',
                    });
                    setIsSubmitting(false);
                } else if (resPostData.message === 'linkedIn'){
                    setError({
                        ...error,
                        showFade: false,
                        message: 'Paskyra sukurta su Linked In. Pabandykite prisijungti su Linked In.',
                        type: 'warning',
                    });
                    setIsSubmitting(false);
                } else if (resPostData.message === 'error'){
                    setError({
                        ...error,
                        showFade: false,
                        message: 'Pabandykite vėliau.',
                        type: 'warning',
                    });
                    setIsSubmitting(false);
                }else {
                    setError({
                        ...error,
                        showFade: false,
                        message: 'Paskyra su tokiu El. pašto adresu neegzistuoja.',
                        type: 'warning',
                    }); 
                    setIsSubmitting(false);
                }
            } else {
                setError({
                    ...error,
                    showFade: false,
                    message: 'Slaptažodžio keitimo nuoroda išsiūsta.',
                    type: 'success',
                }); 
                setIsSubmitting(false);
                setTimeout(() => setModalOpen(false), 3000)
            }
        }
    }

    return (
        <>
            <h3 className={classes.header} style={{color: '#1D3557'}}>Slaptažodžio keitimas.</h3>
            {error.show ? 
                <Fade in={error.showFade} onExited={() => setError({...error, show: false, showFade: false})}>
                    <Box className={classes.infotextBox}>
                        <p className={classes.infotext}>Jūsų el. pašto adresu bus išsiūsta slaptažodžio keitimo nuoroda.</p>
                    </Box>
                </Fade>
            :
                <Fade in={!error.showFade} onExited={() => setError({...error, show: true})}>
                    <Box className={classes.alertBox}>
                        <Alert severity={`${error.type}`} classes={{root: classes.alert, icon: classes.alertIcon}}><p className={classes.alertText}>{error.message}</p></Alert>
                    </Box>
                </Fade>
            }
            <form onSubmit={(e) => handleSubmit(e)}>
                <FormControl className={classes.form} variant="outlined" >
                    <InputLabel htmlFor="username" classes={{root: classes.labelRoot, focused: classes.labelFocused, shrink: classes.labelShrink}}>El. paštas</InputLabel>
                    <OutlinedInput
                        id="username"
                        type='text'
                        value={email}
                        onChange={(e) => handleChange(e)}
                        classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline, input: classes.input}}
                        labelWidth={85}
                        tabIndex="1"
                    />
                </FormControl>
                <Button variant="contained" color="primary" type="submit" className={classes.button} disabled={isSubmitting}>
                    {isSubmitting ? <CircularProgress size={20} className={classes.loadingIcon}/> : "Siųsti" }
                </Button>
            </form>
        </>
    )
}

export default ResetPasswordForm
