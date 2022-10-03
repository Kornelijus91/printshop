import { makeStyles } from '@material-ui/core/styles';
import { Modal, Box, Backdrop, Fade, Button, CircularProgress } from '@material-ui/core';

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
        outline: 'none',
        "&:focus":{
            outline: 'none',
        },
        [theme.breakpoints.up('xs')]: {
            width: '22em',
        },
        [theme.breakpoints.up('lg')]: {
            top: "35%",
        },
        [theme.breakpoints.up('xxl')]: {
            top: "30%",
        },

    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonDelete: {
        fontSize: theme.myTheme.sizeM,
        width: '45%',
        margin: "0 1em 1em 0",
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
    },
    buttonCancel: {
        fontSize: theme.myTheme.sizeM,
        width: '45%',
        marginBottom: "1em",
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
    },
    header: {
        fontSize: theme.myTheme.sizeMM,
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
            localStorage.emoveItem("cartArray");
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
