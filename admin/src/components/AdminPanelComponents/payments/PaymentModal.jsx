import { makeStyles } from '@material-ui/core/styles';
import { Modal, Box, Backdrop, Fade, Container } from '@material-ui/core';

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
        padding: '1rem',
        '& h3': {
            marginBottom: '.5em'
        },
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '9px',
            width: '33rem',
            padding: '1.5rem',
            '& h1': {
                fontSize: '2.4rem'
            },
            '& h3': {
                fontSize: '1.6rem',
                marginBottom: '.5em'
            },
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '14px',
            width: '44rem',
            padding: '2rem',
            '& h1': {
                fontSize: '3.6rem'
            },
            '& h3': {
                fontSize: '2rem',
                marginBottom: '.5em'
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
        backgroundColor: theme.myTheme.pirma,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: '#e31c2d',
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
        backgroundColor: theme.myTheme.antra,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: '#36617c',
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

const PaymentModal = ({ paymentModal, setPaymentModal }) => {

    const classes = useStyles();

    const handleClose = () => {
        setPaymentModal({
            ...paymentModal,
            open: false
        });
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={paymentModal.open}
            disableScrollLock={true}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{}}
        >
            <Fade in={paymentModal.open} onExited={() =>
                setPaymentModal({
                    ...paymentModal,
                    clientUsername: '',
                    orderNr: 0,
                    amount: 0,
                    currency: '',
                    payment: '',
                    firstName: '',
                    lastName: '',
                    city: '',
                    address: '',
                    zip: '',
                    createdAt: null,   
                })
            }>
                <Container classes={{root: classes.root}}>
                    <Box>
                        <h3 style={{margin: '0 0 0 .5rem', textAlign: 'left'}}>Apmokėjimas už užsakymą Nr. {paymentModal.orderNr}</h3>
                        <h3 style={{margin: '0 0 0 .5rem', textAlign: 'left'}}>{(paymentModal.amount).toFixed(2)} {paymentModal.currency}</h3>
                        <h3 style={{margin: '0 0 0 .5rem', textAlign: 'left'}}>{paymentModal.firstName} {paymentModal.lastName}</h3>
                        <h3 style={{margin: '0 0 0 .5rem', textAlign: 'left'}}>{paymentModal.clientUsername}</h3>
                        <h3 style={{margin: '0 0 0 .5rem', textAlign: 'left'}}>{
                            {
                                'card': 'Debeto / Kreditinė kortelė.',
                                'hanza': 'AB bank "Swedbank"',     
                                'vb2': 'AB bank "SEB"',
                                'lt_revolut': 'Revolut',
                                'nord': "AS bank Luminor",
                                'mb': 'UAB bank "Medicinos Bankas"',
                                'lku': "Lietuvos kredito unija",
                                'lt_n26': "N26",
                                'sb': 'AB bank "Šiaulių bankas"',
                                'parex': 'AS bank "Citadele"',
                                'wallet': "Paysera",
                                'cash': "Grynais pinigais pristatymo metu.",
                                '': '',
                            }[paymentModal.payment]
                        }</h3>
                        <h3 style={{margin: '0 0 0 .5rem', textAlign: 'left'}}>{paymentModal.city}</h3>
                        <h3 style={{margin: '0 0 0 .5rem', textAlign: 'left'}}>{paymentModal.address}</h3>
                        <h3 style={{margin: '0 0 0 .5rem', textAlign: 'left'}}>{paymentModal.zip}</h3>
                        <h3 style={{margin: '0 0 0 .5rem', textAlign: 'left'}}>{new Date(paymentModal.createdAt).getFullYear()+"-"+('0' + (new Date(paymentModal.createdAt).getMonth() + 1)).slice(-2)+"-"+('0' + new Date(paymentModal.createdAt).getDate()).slice(-2)}</h3>
                    </Box> 
                </Container>
            </Fade>
        </Modal>
    )
}

export default PaymentModal
