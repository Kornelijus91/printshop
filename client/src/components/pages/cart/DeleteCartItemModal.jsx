import { makeStyles } from '@material-ui/core/styles';
import { Modal, Box, Backdrop, Fade, Button, CircularProgress } from '@material-ui/core';

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
        outline: 'none',
        "&:focus":{
            outline: 'none',
        },
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

const DeleteCartItemModal = ({ deleteModal, setDeleteModal, getCart, setCart }) => {

    const classes = useStyles();

    const deleteFromLocalStorage = () => {
        var items = JSON.parse(localStorage.getItem("cartArray"));
        items = items.filter((item) => item._id !== deleteModal.itemID);
        if (items.length > 0) {
            localStorage.setItem("cartArray", JSON.stringify(items));
            getCart();
        } else {
            localStorage.removeItem("cartArray");
            setCart([]);
        }  
    }

    const deleteItem = async () => {
        setDeleteModal({
            ...deleteModal,
            deleting: true,
        });
        try{
            const deleteCartItem = await fetch("/users/deleteCartItem/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    // "authorization": `JWT ${token}`,
                },
                body: JSON.stringify({
                    cartItemID: deleteModal.itemID,
                }),
            });
            const response = await deleteCartItem.json();
            if (response.success) {
                deleteFromLocalStorage();
                handleClose();
            } else {
                deleteFromLocalStorage();
                handleClose();
            }
        } catch (error) {
            deleteFromLocalStorage();
            handleClose();
        }
    };

    const handleClose = () => {
        setDeleteModal({
            open: false,
            itemID: '',
            deleting: false,
            name: ''
        })
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
            <Fade in={deleteModal.open}>
                <Box classes={{root: classes.root}}>
                    <Box>
                        <h2 className={classes.header}>Ar tikrai norite ištrinti produktą - {deleteModal.name}?</h2>
                        <Box display='flex' justifyContent='center' alignItems='center'>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                className={classes.buttonDelete} 
                                disabled={deleteModal.deleting} 
                                onClick={() => {
                                    deleteItem();
                                }}
                            >
                                {deleteModal.deleting ? <CircularProgress size={20}/> : "Ištrinti" }
                            </Button>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                className={classes.buttonCancel} 
                                disabled={deleteModal.deleting} 
                                onClick={() => {
                                    handleClose();
                                }}
                            >
                                Atšaukti
                            </Button>
                        </Box>
                    </Box> 
                </Box>
            </Fade>
        </Modal>
    )
}

export default DeleteCartItemModal
