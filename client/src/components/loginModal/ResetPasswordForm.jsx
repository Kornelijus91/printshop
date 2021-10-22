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
    infotext: {
        textAlign: 'left',
        color: theme.myTheme.sriftoSpalva
    },
    infotextBox: {
        width: '80%',
        margin: 'auto'
    },
    alert: {
        width: '100%',
        marginBottom: '1rem',
        borderRadius: '10rem',
        boxShadow: "0px 2px 2px #888888",
        padding: '.2rem .2rem .2rem 1rem'
    },
    alertBox: {
        width: '80%',
        margin: 'auto'
    },
    alertText: {
        textAlign: "left",
        margin: "0px",
        padding: "0px",
        fontFamily: theme.myTheme.sriftas,
    },
    alertIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: '80%',
        marginBottom: ".5rem",
        borderRadius: '10rem',
        height: '2.5rem',
        boxShadow: "0px 2px 2px #888888",
        '&:hover': {
            boxShadow: "0px 2px 3px #888888"
        },
        color: theme.myTheme.trecia,
        fontWeight: "bold",
        fontFamily: theme.myTheme.sriftas,
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
        height: '2.5rem'
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
            height: '2.5rem'
        });
        if (!email) {
            setError({
                ...error,
                showFade: false,
                message: 'Įrašykite El. Pašto adresą.',
                type: 'warning',
                height: '2.5rem'
            });
            setIsSubmitting(false);
        } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email).toLowerCase())) {
            setError({
                ...error,
                showFade: false,
                message: 'Neteisingas El. Pašto adresas.',
                type: 'warning',
                height: '2.5rem'
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
                        height: '3.5rem'
                    });
                    setIsSubmitting(false);
                } else if (resPostData.message === 'facebook'){
                    setError({
                        ...error,
                        showFade: false,
                        message: 'Paskyra sukurta su Facebook. Pabandykite prisijungti su Facebook.',
                        type: 'warning',
                        height: '3.5rem'
                    });
                    setIsSubmitting(false);
                } else if (resPostData.message === 'linkedIn'){
                    setError({
                        ...error,
                        showFade: false,
                        message: 'Paskyra sukurta su Linked In. Pabandykite prisijungti su Linked In.',
                        type: 'warning',
                        height: '3.5rem'
                    });
                    setIsSubmitting(false);
                } else if (resPostData.message === 'error'){
                    setError({
                        ...error,
                        showFade: false,
                        message: 'Pabandykite vėliau.',
                        type: 'warning',
                        height: '2.5rem'
                    });
                    setIsSubmitting(false);
                }else {
                    setError({
                        ...error,
                        showFade: false,
                        message: 'Paskyra su tokiu El. pašto adresu neegzistuoja.',
                        type: 'warning',
                        height: '3.5rem'
                    }); 
                    setIsSubmitting(false);
                }
            } else {
                setError({
                    ...error,
                    showFade: false,
                    message: 'Slaptažodžio keitimo nuoroda išsiūsta.',
                    type: 'success',
                    height: '2.5rem'
                }); 
                setIsSubmitting(false);
                setTimeout(() => setModalOpen(false), 3000)
            }
        }
    }

    return (
        <>
            <h3 style={{color: '#1D3557'}}>Slaptažodžio keitimas.</h3>
            {error.show ? 
                <Fade in={error.showFade} onExited={() => setError({...error, show: false, showFade: false})}>
                    <Box className={classes.infotextBox}>
                        <p className={classes.infotext}>Į jūsų el. pašto adresą bus išsiūsta slaptažodžio keitimo nuoroda.</p>
                    </Box>
                </Fade>
            :
                <Fade in={!error.showFade} onExited={() => setError({...error, show: true})}>
                    <Box className={classes.alertBox}>
                        <Alert severity={`${error.type}`} classes={{root: classes.alert, icon: classes.alertIcon}} style={{height: `${error.height}`}}><p className={classes.alertText}>{error.message}</p></Alert>
                    </Box>
                </Fade>
            }
            <form onSubmit={(e) => handleSubmit(e)}>
                <FormControl className={classes.form} variant="outlined" >
                    <InputLabel htmlFor="username" classes={{root: classes.labelRoot, focused: classes.labelFocused}}>El. paštas</InputLabel>
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
                    {isSubmitting ? <CircularProgress size={20}/> : "Siųsti" }
                </Button>
            </form>
        </>
    )
}

export default ResetPasswordForm
