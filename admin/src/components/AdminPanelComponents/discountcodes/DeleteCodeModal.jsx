import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Box, Backdrop, Fade, Button, CircularProgress, Collapse, Container } from '@material-ui/core';
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
        padding: '0 1rem 0 1rem'
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
    },
    alertBox: {
        margin: '1rem 0 0 0',
    },
    alertText: {
        textAlign: "left",
        marginTop: '-.1rem',
        padding: "0px",
        margin: '0',
        fontFamily: theme.myTheme.sriftas,
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
        backgroundColor: theme.myTheme.pirma,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: '#e31c2d',
        },
    },
    buttonCancel: {
        width: '45%',
        marginBottom: "1rem",
        borderRadius: '4px',
        height: '2.5rem',
        color: theme.myTheme.trecia,
        backgroundColor: theme.myTheme.antra,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: '#36617c',
        },
    },
}));

const DeleteCodeModal = ({ deleteModal, setDeleteModal, user, setSnackbar, getAllCodes }) => {

    const classes = useStyles();

    const [alert, setAlert] = useState('');

    const handleClose = () => {
        setDeleteModal({
            codeID: '',
            open: false,
            submitting: false,
        });
        setAlert('');
    };

    const deleteCode = async () => {
        setDeleteModal({
            ...deleteModal,
            submitting: true,
        });
        if (deleteModal.codeID) {
            try {
                const deleteCodeRequest = await fetch("/administracija/deleteCode/", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `JWT ${user.token}`,
                    },
                    body: JSON.stringify({
                        id: deleteModal.codeID,
                    }),
                });
                const deleteCodeResponse= await deleteCodeRequest.json();
                if (deleteCodeResponse.success) {
                    handleClose();
                    getAllCodes();
                    setSnackbar({
                        message: `Nuolaidos kodas ištrintas.`,
                        open: true,
                    });
                } else {
                    setDeleteModal({
                        ...deleteModal,
                        submitting: false,
                    });
                    setAlert('Klaida! Pabandykite vėliau.');
                }
            } catch (error) {
                setDeleteModal({
                    ...deleteModal,
                    submitting: false,
                });
                setAlert('Klaida! Pabandykite vėliau.');
            }
        }
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={deleteModal.open}
            disableScrollLock={true}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{}}
        >
            <Fade in={deleteModal.open} >
                <Container classes={{root: classes.root}}>
                    <Box>
                        <Collapse in={alert !== ''}>
                            <Box className={classes.alertBox} display='flex' justifyContent='center' alignItems='center'>
                                <Alert severity="warning" classes={{root: classes.alert, icon: classes.alertIcon}}><p className={classes.alertText}>{alert}</p></Alert>
                            </Box>
                        </Collapse>
                        <h2>Ar tikrai norite ištrinti?</h2>
                        <Box display='flex' justifyContent='center' alignItems='center'>
                            <Button variant="contained" color="primary" className={classes.buttonDelete} disabled={deleteModal.submitting} onClick={deleteCode}>
                                {deleteModal.submitting ? <CircularProgress size={20}/> : "Ištrinti" }
                            </Button>
                            <Button variant="contained" color="primary" className={classes.buttonCancel} disabled={deleteModal.submitting} onClick={handleClose}>
                                Atšaukti
                            </Button>
                        </Box>
                    </Box> 
                </Container>
            </Fade>
        </Modal>
    )
}

export default DeleteCodeModal
