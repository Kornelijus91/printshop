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
        backgroundColor: theme.myTheme.pirma,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: '#e31c2d',
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
        color: theme.myTheme.trecia,
        backgroundColor: theme.myTheme.antra,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: '#36617c',
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
}));

const DeleteTemplateModal = ({ deleteModal, setDeleteModal, user, setSnackbar, getAllTemplates, page }) => {

    const classes = useStyles();

    const [alert, setAlert] = useState('');

    const handleClose = () => {
        setDeleteModal({
            ...deleteModal,
            open: false,
            submitting: false,
        });
        setAlert('');
    };

    const deleteTemplate = async () => {
        setDeleteModal({
            ...deleteModal,
            submitting: true,
        });
        if (deleteModal.templateID && deleteModal.templateName) {
            try {
                const templateDeleteRequest = await fetch("/administracija/deleteTemplate/", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `JWT ${user.token}`,
                    },
                    body: JSON.stringify({
                        templateID: deleteModal.templateID,
                    }),
                });
                const templateDeleteResponse = await templateDeleteRequest.json();
                if (templateDeleteResponse.success) {
                    getAllTemplates(page);
                    setSnackbar({
                        message: `Šablonas ${deleteModal.templateName} ištrintas.`,
                        open: true,
                    });
                    handleClose();
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
            <Fade in={deleteModal.open} onExited={ () => 
                setDeleteModal({
                    submitting: false,
                    open: false,
                    productID: '',
                    productName: '',
                })
            }>
                <Container classes={{root: classes.root}}>
                    <Box>
                        <Collapse in={alert !== ''}>
                            <Box className={classes.alertBox} display='flex' justifyContent='center' alignItems='center'>
                                <Alert severity="warning" classes={{root: classes.alert, icon: classes.alertIcon}}><p className={classes.alertText}>{alert}</p></Alert>
                            </Box>
                        </Collapse>
                        <h2>Ar tikrai norite ištrinti {deleteModal.templateName}?</h2>
                        <Box display='flex' justifyContent='center' alignItems='center'>
                            <Button variant="contained" color="primary" className={classes.buttonDelete} disabled={deleteModal.submitting} onClick={deleteTemplate}>
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

export default DeleteTemplateModal
