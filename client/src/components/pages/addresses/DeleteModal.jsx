import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Box, Backdrop, Fade, Button, CircularProgress, Collapse } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        textAlign: 'center',
        backgroundColor: theme.myTheme.trecia,
        borderRadius: '7px',
        width: '18rem',
        padding: '0 1rem 0 1rem',
        position: "absolute",  
        top: "30%",
        [theme.breakpoints.up('xs')]: {
            width: '22rem',
        },
        [theme.breakpoints.up('lg')]: {
            top: "35%",
        },
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '10px',
            width: '29.7rem',
            top: "30%",
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '14px',
            width: '44rem',
        },
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
    buttonDelete: {
        width: '45%',
        margin: "0 1rem 1rem 0",
        borderRadius: '5px',
        height: '2.5rem',
        boxShadow: "0px 2px 2px #888888",
        color: theme.myTheme.trecia,
        backgroundColor: theme.myTheme.pirma,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: '#e31c2d',
        },
        [theme.breakpoints.up('xxl')]: {
            margin: "0 1.35rem 1.35rem 0",
            borderRadius: '7px',
            height: '3.375rem',
            boxShadow: "0px 3px 3px #888888",
            fontSize: '1.4rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: "0 2rem 2rem 0",
            borderRadius: '10px',
            height: '5rem',
            boxShadow: "0px 4px 4px #888888",
            fontSize: '1.8rem'
        },
    },
    buttonCancel: {
        width: '45%',
        marginBottom: "1rem",
        borderRadius: '5px',
        height: '2.5rem',
        boxShadow: "0px 2px 2px #888888",
        color: theme.myTheme.trecia,
        backgroundColor: theme.myTheme.antra,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: '#36617c',
        },
        [theme.breakpoints.up('xxl')]: {
            marginBottom: "1.35rem",
            borderRadius: '7px',
            height: '3.375rem',
            boxShadow: "0px 3px 3px #888888",
            fontSize: '1.4rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            marginBottom: "2rem",
            borderRadius: '10px',
            height: '5rem',
            boxShadow: "0px 4px 4px #888888",
            fontSize: '1.8rem'
        },
    },
    header: {
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.6rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2.2rem'
        },
    },
}));

const DeleteModal = ({ deleting, deleteModal, setDeleteModal, deleteAddress, setDeleteAddressId}) => {

    const classes = useStyles();

    const [alert, setAlert] = useState('');

    const handleClose = () => {
        setDeleteModal(false);
        setAlert('');
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={deleteModal}
            disableScrollLock={true}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{}}
        >
            <Fade in={deleteModal}>
                <Box classes={{root: classes.root}}>
                    <Box>
                        <Collapse in={alert !== ''}>
                            <Box className={classes.alertBox} display='flex' justifyContent='center' alignItems='center'>
                                <Alert severity="warning" classes={{root: classes.alert, icon: classes.alertIcon}}><p className={classes.alertText}>{alert}</p></Alert>
                            </Box>
                        </Collapse>
                        <h2 className={classes.header}>Ar tikrai norite ištrinti adresą?</h2>
                        <Box display='flex' justifyContent='center' alignItems='center'>
                            <Button variant="contained" color="primary" className={classes.buttonDelete} disabled={deleting} onClick={() => {deleteAddress(); setDeleteModal(false); setDeleteAddressId('');}}>
                                {deleting ? <CircularProgress size={20}/> : "Ištrinti" }
                            </Button>
                            <Button variant="contained" color="primary" className={classes.buttonCancel} disabled={deleting} onClick={() => {setDeleteModal(false); setDeleteAddressId('');}}>
                                Atšaukti
                            </Button>
                        </Box>
                    </Box> 
                </Box>
            </Fade>
        </Modal>
    )
}

export default DeleteModal
