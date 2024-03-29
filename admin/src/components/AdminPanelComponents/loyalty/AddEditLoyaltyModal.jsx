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
            '& h1': {
                fontSize: '2.4rem'
            },
            '& h3': {
                fontSize: '1.6rem'
            },
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '14px',
            width: '44rem',
            padding: '0 2rem 0 2rem',
            '& h1': {
                fontSize: '3.6rem'
            },
            '& h3': {
                fontSize: '2rem'
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
        color: theme.myTheme.trecia,
        backgroundColor: theme.myTheme.tZalia.main,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        '&:hover': {
            backgroundColor:theme.myTheme.tZalia.dark,
        },
        [theme.breakpoints.up('xxl')]: {
            margin: ".7rem 1.5rem 1.5rem 0",
            borderRadius: '6px',
            height: '3.75rem',
            fontSize: '1.4rem',
            width: '46%',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: "1.5rem 2rem 2rem 0",
            borderRadius: '8px',
            height: '5rem',
            fontSize: '1.8rem',
            width: '47%',
        },
    },
    buttonCancel: {
        width: '45%',
        marginBottom: "1rem",
        borderRadius: '4px',
        height: '2.5rem',
        color: theme.myTheme.trecia,
        backgroundColor: theme.myTheme.sZalia.main,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: theme.myTheme.sZalia.dark,
        },
        [theme.breakpoints.up('xxl')]: {
            margin: ".7rem 0 1.5rem 0",
            borderRadius: '6px',
            height: '3.75rem',
            fontSize: '1.4rem',
            width: '46%',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: "1.5rem 0 2rem 0",
            borderRadius: '8px',
            height: '5rem',
            fontSize: '1.8rem',
            width: '47%',
        },
    },
    nameForm: {
        padding: '.5rem 1rem',
        margin: '0 .5rem 1rem .5rem',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.myTheme.ketvirta,
        // width: 400,
        [theme.breakpoints.up('xxl')]: {
            padding: '.75rem 1.5rem',
            borderRadius: '7px'
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '1rem 2rem',
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

const AddEditLoyaltyModal = ({ user, setSnackbar, addLoyaltyModal, setAddLoyaltyModal, handleLoyaltyAddModalChange, getLoyalty }) => {

    const classes = useStyles();

    const [alert, setAlert] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleClose = () => {
        setAddLoyaltyModal({
            open: false,
            id: '',
            money: 0,
            discount: 0,
        });
        setSubmitting(false);

        setAlert('');
    };

    const addEditLoyalty = async () => {
        setSubmitting(true);
        if(isNaN(Number(addLoyaltyModal.money))){
            setAlert('Pinigų lauke įvesta bloga reikšmė');
            setSubmitting(false);
            return
        }else if (isNaN(Number(addLoyaltyModal.discount))) {
            setAlert('Nuolaidos lauke įvesta bloga reikšmė');
            setSubmitting(false);
            return
        }
        try {
            const addEditLoyaltyRequest = await fetch("/administracija/addEditLoyalty/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `JWT ${user.token}`,
                },
                body: JSON.stringify({
                    id: addLoyaltyModal.id,
                    money: Number(addLoyaltyModal.money),
                    discount: Number(addLoyaltyModal.discount),
                }),
            });
            const addEditLoyaltyResponse= await addEditLoyaltyRequest.json();
            if (addEditLoyaltyResponse.success) {
                handleClose();
                getLoyalty();
                setSnackbar({
                    message: `${addEditLoyaltyResponse.message}`,
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
            open={addLoyaltyModal.open}
            disableScrollLock={true}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{}}
        >
            <Fade in={addLoyaltyModal.open}>
                <Container classes={{root: classes.root}}>
                    <Box>
                        <Collapse in={alert !== ''}>
                            <Box className={classes.alertBox} display='flex' justifyContent='center' alignItems='center'>
                                <Alert severity="warning" classes={{root: classes.alert, icon: classes.alertIcon}}><p className={classes.alertText}>{alert}</p></Alert>
                            </Box>
                        </Collapse>
                        <h1>{addLoyaltyModal.id ? 'Pakeisti' : 'Pridėti'} Tavo reklama klubo lygį</h1>
                        <h3 style={{margin: '0 0 0 .5rem', textAlign: 'left'}}>Išleistų pinigų suma, €</h3>
                        <Paper component="form" className={classes.nameForm}>
                            <InputBase
                                value={addLoyaltyModal.money}
                                onChange={handleLoyaltyAddModalChange('money')}
                                className={classes.input}
                                placeholder="EUR..."
                                inputProps={{ 'aria-label': 'Šablono pavadinimas' }}
                            />
                        </Paper>
                        <h3 style={{margin: '0 0 0 .5rem', textAlign: 'left'}}>Nuolaida, %</h3>
                        <Paper component="form" className={classes.nameForm}>
                            <InputBase
                                value={addLoyaltyModal.discount}
                                onChange={handleLoyaltyAddModalChange('discount')}
                                className={classes.input}
                                placeholder="%..."
                                inputProps={{ 'aria-label': 'Šablono pavadinimas' }}
                            />
                        </Paper>
                        <Box display='flex' justifyContent='center' alignItems='center'>
                            <Button variant="contained" color="primary" className={classes.buttonDelete} disabled={submitting} onClick={addEditLoyalty}>
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

export default AddEditLoyaltyModal
