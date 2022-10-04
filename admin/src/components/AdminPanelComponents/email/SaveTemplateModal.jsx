import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Box, Backdrop, Fade, Button, CircularProgress, Collapse, Container, Paper, InputBase } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        textAlign: 'center',
        backgroundColor: theme.myTheme.sriftoSpalva,
        borderRadius: '7px',
        border: 'none',
        outline: 'none',
        width: '22rem',
        padding: '0 1rem 0 1rem',
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '9px',
            width: '33rem',
            padding: '0 1.5rem 0 1.5rem',
            '& h2': {
                fontSize: '2rem'
            },
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '14px',
            width: '44rem',
            padding: '0 2rem 0 2rem',
            '& h2': {
                fontSize: '3rem'
            },
        }, 
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    alert: {
        width: '100%',
        borderRadius: '4px',
        // height: '2.5rem',
        boxShadow: "0px 2px 2px #888888",
        padding: '.2rem .2rem .2rem 1rem',
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '6px',
            boxShadow: "0px 3px 3px #888888",
            padding: '.3rem .3rem .3rem 1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '8px',
            boxShadow: "0px 4px 4px #888888",
            padding: '.4rem .4rem .4rem 2rem',
        },
    },
    alertBox: {
        margin: '1rem 0 0 0',
        [theme.breakpoints.up('xxl')]: {
            margin: '1.5rem 0 0 0',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '2rem 0 0 0',
        },
    },
    alertText: {
        textAlign: "left",
        marginTop: '-.1rem',
        padding: "0px",
        margin: '0',
        fontFamily: theme.myTheme.sriftas,
        [theme.breakpoints.up('xxl')]: {
            marginTop: '-.15rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginTop: '-.2rem',
        },
    },
    alertIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonDelete: {
        width: '45%',
        margin: "0 1rem 1rem 0",
        borderRadius: '4px',
        height: '2.5rem',
        color: theme.myTheme.balta,
        backgroundColor: theme.myTheme.tZalia.main,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: theme.myTheme.tZalia.dark,
        },
        [theme.breakpoints.up('xxl')]: {
            margin: "0 1.5rem 1.5rem 0",
            borderRadius: '6px',
            height: '3.75rem',
            fontSize: '1.4rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: "0 2rem 2rem 0",
            borderRadius: '8px',
            height: '5rem',
            fontSize: '1.8rem'
        },
    },
    buttonCancel: {
        width: '45%',
        marginBottom: "1rem",
        borderRadius: '4px',
        height: '2.5rem',
        color: theme.myTheme.balta,
        backgroundColor: theme.myTheme.sZalia.main,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: theme.myTheme.sZalia.dark,
        },
        [theme.breakpoints.up('xxl')]: {
            marginBottom: "1.5rem",
            borderRadius: '6px',
            height: '3.75rem',
            fontSize: '1.4rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            marginBottom: "2rem",
            borderRadius: '8px',
            height: '5rem',
            fontSize: '1.8rem'
        },
    },
    nameForm: {
        padding: '.5rem 1rem',
        margin: '1rem .5rem 1rem .5rem',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.myTheme.ketvirta,
        // width: 400,
        [theme.breakpoints.up('xxl')]: {
            padding: '.75rem 1.5rem',
            margin: '1.5rem .75rem 1.5rem .75rem',
            borderRadius: '7px'
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '1rem 2rem',
            margin: '2rem 1rem 2rem 1rem',
            borderRadius: '9px'
        },
    },
    input: {
        width: '100%',
        height: '2.5rem',
        marginLeft: theme.spacing(1),
        flex: 1,
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.4rem',
            height: '3.75rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.8rem',
            height: '5rem',
        },
    },
}));

const SaveTemplateModal = ({ user, saveModal, setSaveModal, letter, handleTemplateNameChange, setSnackbar, getAllTemplates }) => {

    const classes = useStyles();

    const [alert, setAlert] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleClose = () => {
        setSaveModal(false);
        setSubmitting(false);
        getAllTemplates(1);
        setAlert('');
    };

    const saveTempalte = async () => {
        setSubmitting(true);
        try {
            const saveRequest = await fetch("/administracija/saveEmailTemplate/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `JWT ${user.token}`,
                },
                body: JSON.stringify({
                    letterID: letter.id,
                    letterName: letter.name,
                    letterHTML: letter.HTML,
                    letterJSON: letter.JSON
                }),
            });
            const saveResponse= await saveRequest.json();
            if (saveResponse.success) {
                handleClose();
                setSnackbar({
                    message: `${saveResponse.message}`,
                    open: true,
                });
            } else {
                setSubmitting(false);
                setAlert('Klaida! Pabandykite vėliau.');
            }
        } catch (error) {
            setSubmitting(false);
            setAlert('Klaida! Pabandykite vėliau.');
        }
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={saveModal}
            disableScrollLock={true}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{}}
        >
            <Fade in={saveModal}>
                <Container classes={{root: classes.root}}>
                    <Box>
                        <Collapse in={alert !== ''}>
                            <Box className={classes.alertBox} display='flex' justifyContent='center' alignItems='center'>
                                <Alert severity="warning" classes={{root: classes.alert, icon: classes.alertIcon}}><p className={classes.alertText}>{alert}</p></Alert>
                            </Box>
                        </Collapse>
                        <h2>Išsaugoti šabloną</h2>
                        <Paper component="form" className={classes.nameForm}>
                            <InputBase
                                value={letter.name}
                                onChange={handleTemplateNameChange}
                                className={classes.input}
                                placeholder="Šablono pavadinimas..."
                                inputProps={{ 'aria-label': 'Šablono pavadinimas' }}
                            />
                        </Paper>
                        <Box display='flex' justifyContent='center' alignItems='center'>
                            <Button variant="contained" color="primary" className={classes.buttonDelete} disabled={submitting} onClick={saveTempalte}>
                                {submitting ? <CircularProgress size={20}/> : "Išsaugoti" }
                            </Button>
                            <Button variant="contained" color="primary" className={classes.buttonCancel} disabled={submitting} onClick={handleClose}>
                                Atšaukti
                            </Button>
                        </Box>
                    </Box> 
                </Container>
            </Fade>
        </Modal>
    )
}

export default SaveTemplateModal
