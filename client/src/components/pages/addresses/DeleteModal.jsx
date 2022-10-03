import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Box, Backdrop, Fade, Button, CircularProgress, Collapse } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        fontSize: theme.myTheme.sizeM,
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
        textAlign: 'center',
        backgroundColor: theme.myTheme.ruda.main,
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
        width: '18em',
        padding: '0 1em 0 1em',
        position: "absolute",  
        top: "30%",
        [theme.breakpoints.up('xs')]: {
            width: '22em',
        },
        [theme.breakpoints.up('lg')]: {
            top: "35%",
        },
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    alert: theme.myTheme.alert,
    alertBox: theme.myTheme.alertBox,
    alertText: theme.myTheme.alertText,
    alertIcon: theme.myTheme.alertIcon,
    buttonDelete: {
        fontSize: theme.myTheme.sizeS,
        width: '45%',
        margin: "0 1em 1em 0",
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
        height: '2.5em',
        boxShadow: "0px 2px 2px #888888",
        color: theme.myTheme.balta,
        backgroundColor: theme.myTheme.sZalia.main,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: theme.myTheme.sZalia.dark,
        },
        [theme.breakpoints.up('xxl')]: {
            boxShadow: "0px 3px 3px #888888",
        },
        [theme.breakpoints.up('xxxl')]: {
            boxShadow: "0px 4px 4px #888888",
        },
    },
    buttonCancel: {
        fontSize: theme.myTheme.sizeS,
        width: '45%',
        marginBottom: "1em",
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
        height: '2.5em',
        boxShadow: "0px 2px 2px #888888",
        color: theme.myTheme.balta,
        backgroundColor: theme.myTheme.tZalia.main,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: theme.myTheme.tZalia.dark,
        },
        [theme.breakpoints.up('xxl')]: {
            boxShadow: "0px 3px 3px #888888",
        },
        [theme.breakpoints.up('xxxl')]: {
            boxShadow: "0px 4px 4px #888888",
        },
    },
    header: {
        fontSize: theme.myTheme.sizeMM,
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
