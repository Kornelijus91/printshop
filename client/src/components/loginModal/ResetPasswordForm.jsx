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
            marginTop: '-.2em',
        },
    },
    labelShrink: {
        [theme.breakpoints.up('xxxl')]: {
            marginTop: '-.3em',
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
    infotext: {
        textAlign: 'left',
        color: theme.myTheme.juoda,
        fontSize: theme.myTheme.sizeM,
    },
    header: {
        fontSize: theme.myTheme.sizeXL,
        color: theme.myTheme.juoda,
        // [theme.breakpoints.up('xxl')]: {
        //     fontSize: '1.5rem'
        // },
        // [theme.breakpoints.up('xxxl')]: {
        //     fontSize: '2.1rem'
        // },
    },
    infotextBox: {
        width: '80%',
        margin: 'auto',
    },
    alert: {
        width: '80%',
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
        paddingTop: theme.myTheme.sizeXXXS,
        paddingBottom: theme.myTheme.sizeXXXS,
        paddingRight: theme.myTheme.sizeXXXS,
        paddingLeft: theme.myTheme.sizeM,
    },
    alertBox: {
        marginBottom: theme.myTheme.sizeM,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
        width: '80%',
        marginBottom: theme.myTheme.sizeXXS,
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
        height: theme.myTheme.sizeXXXL,
        color: theme.myTheme.balta,
        backgroundColor: theme.myTheme.tZalia.main,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        fontSize: theme.myTheme.sizeM,
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
            <h3 className={classes.header}>Slaptažodžio keitimas.</h3>
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
