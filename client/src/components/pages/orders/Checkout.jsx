import { Box, Grid, Button, Tooltip, Collapse, CircularProgress } from '@material-ui/core'; 
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { AiFillEdit } from "react-icons/ai";
import { useHistory } from 'react-router-dom';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
    leftGridItem: {
        borderBottom: '1px solid rgba(204, 204, 204, 0.7)',
        [theme.breakpoints.up('md')]: {
            borderRight: '1px solid rgba(204, 204, 204, 0.7)',
            borderBottom: 'none',
            padding: '0 1em 0 0',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRight: '2px solid rgba(204, 204, 204, 0.7)',
            padding: '0 2em 0 0',
        },
    },
    rightGridItem: {
        
        [theme.breakpoints.up('md')]: {
            padding: '0 0 0 1em',
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '0 0 0 2em',
        },
    },
    icon: {
        color: theme.myTheme.sriftoSpalva,
        margin: '0',
        '&:hover': {
            cursor: "pointer",
            color: '#264673',
        },
        [theme.breakpoints.up('xxl')]: {
           transform: 'scale(1.35)'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)'
        },
    },
    gridItemTitleBox: {
        paddingRight: '1em',
        [theme.breakpoints.up('xxl')]: {
            paddingRight: '1.35em',
        },
        [theme.breakpoints.up('xxxl')]: {
            paddingRight: '2em',
        },
    },
    Isbraukta: {
        padding: '0',
        margin: '0 .7rem 0 0',
        overflowWrap: 'break-word',
        fontSize: '1rem',
        fontWeight: 'bold',
        position: 'relative',
        '&:before': {
            position: 'absolute',
            content: '""',
            width: '100%',
            height: '2px',
            borderRadius: '1px',
            backgroundColor: 'rgba(230, 57, 70, 0.8)',
            right: '0',
            top: '40%',
            '-webkit-transform': 'skewY(-7deg)',
            transform: 'skewY(-7deg)',
        },
        [theme.breakpoints.up('xxl')]: {
            margin: '0 1.05rem 0 0',
            fontSize: '1.35rem',
            '&:before': {
                position: 'absolute',
                content: '""',
                width: '100%',
                height: '3px',
                borderRadius: '2px',
                backgroundColor: 'rgba(230, 57, 70, 0.8)',
                right: '0',
                top: '40%',
                '-webkit-transform': 'skewY(-7deg)',
                transform: 'skewY(-7deg)',
            },
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0 1.4rem 0 0',
            fontSize: '2rem',
            '&:before': {
                position: 'absolute',
                content: '""',
                width: '100%',
                height: '4px',
                borderRadius: '2px',
                backgroundColor: 'rgba(230, 57, 70, 0.8)',
                right: '0',
                top: '40%',
                '-webkit-transform': 'skewY(-7deg)',
                transform: 'skewY(-7deg)',
            },
        },
    },
    DiscountedPriceText: {
        padding: '0',
        margin: '0 .7rem 0 0',
        overflowWrap: 'break-word',
        fontSize: '1rem',
        fontWeight: 'bold',
        color: theme.myTheme.pirma,
        [theme.breakpoints.up('xxl')]: {
            margin: '0 1.05rem 0 0',
            fontSize: '1.35rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0 1.4rem 0 0',
            fontSize: '2rem',
        },
    },
    PriceText: {
        padding: '0',
        margin: '0 .7rem 0 0',
        overflowWrap: 'break-word',
        fontSize: '1rem',
        fontWeight: 'bold',
        [theme.breakpoints.up('xxl')]: {
            margin: '0 1.05rem 0 0',
            fontSize: '1.35rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0 1.4rem 0 0',
            fontSize: '2rem',
        },
    },
    sumHeaderRed: {
        color: theme.myTheme.pirma,
        textAlign: 'right',
        margin: '0 .7rem 0 0',
        [theme.breakpoints.up('xxl')]: {
            margin: '0 1.05rem 0 0',
            fontSize: '1.35rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0 1.4rem 0 0',
            fontSize: '2rem',
        },
    },
    sumHeaderBlue: {
        color: theme.myTheme.sriftoSpalva,
        textAlign: 'right',
        margin: '0 .7rem 0 0',
        [theme.breakpoints.up('xxl')]: {
            margin: '0 1.05rem 0 0',
            fontSize: '1.35rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0 1.4rem 0 0',
            fontSize: '2rem',
        },
    },
    PriceText2: {
        padding: '0',
        margin: '0 .7rem 0 0',
        overflowWrap: 'break-word',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        [theme.breakpoints.up('xxl')]: {
            margin: '0 1.05rem 0 0',
            fontSize: '1.8rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0 1.4rem 0 0',
            fontSize: '2.4rem',
        },
    },
    Isbraukta2: {
        padding: '0',
        margin: '0 .7rem 0 0',
        overflowWrap: 'break-word',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        position: 'relative',
        '&:before': {
            position: 'absolute',
            content: '""',
            width: '100%',
            height: '4px',
            borderRadius: '2px',
            backgroundColor: 'rgba(230, 57, 70, 0.8)',
            right: '0',
            top: '40%',
            '-webkit-transform': 'skewY(-7deg)',
            transform: 'skewY(-7deg)',
        },
        [theme.breakpoints.up('xxl')]: {
            margin: '0 1.05rem 0 0',
            fontSize: '1.8rem',
            '&:before': {
                position: 'absolute',
                content: '""',
                width: '100%',
                height: '6px',
                borderRadius: '3px',
                backgroundColor: 'rgba(230, 57, 70, 0.8)',
                right: '0',
                top: '40%',
                '-webkit-transform': 'skewY(-7deg)',
                transform: 'skewY(-7deg)',
            },
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0 1.4rem 0 0',
            fontSize: '2.4rem',
            '&:before': {
                position: 'absolute',
                content: '""',
                width: '100%',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: 'rgba(230, 57, 70, 0.8)',
                right: '0',
                top: '40%',
                '-webkit-transform': 'skewY(-7deg)',
                transform: 'skewY(-7deg)',
            },
        },
    },
    DiscountedPriceText2: {
        padding: '0',
        margin: '0 .7rem 0 0',
        overflowWrap: 'break-word',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: theme.myTheme.pirma,
        [theme.breakpoints.up('xxl')]: {
            margin: '0 1.05rem 0 0',
            fontSize: '1.8rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0 1.4rem .0 0',
            fontSize: '2.4rem',
        },
    },
    uzsakymasUpper: {
        marginBottom: '1em',
        [theme.breakpoints.up('xxl')]: {
            marginBottom: '1.35em',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginBottom: '2em',
        },
    },
    addButton: {
        width: '100%',
        marginBottom: "2em",
        borderRadius: '6px',
        height: '2.5rem',
        color: theme.myTheme.trecia,
        backgroundColor: theme.myTheme.pirma,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: '#cc0000',
        },
        [theme.breakpoints.up('md')]: {
            width: '20%',
        },
        [theme.breakpoints.up('xxl')]: {
            marginBottom: "2.7em",
            borderRadius: '9px',
            height: '3.375rem',
            fontSize: '1.2rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginBottom: "4em",
            borderRadius: '12px',
            height: '4.5rem',
            fontSize: '1.6rem',
        },
    },
    buttonDisabled: {
        backgroundColor: '#cc0000',
    },
    buttonIcon: {
        color: theme.myTheme.trecia,
        [theme.breakpoints.up('xxl')]: {
           transform: 'scale(1.35)',
           marginLeft: '.5em'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
            marginLeft: '1em'
        },
    },
    mokejimoBudaiBox: {
        borderTop: '1px solid rgba(204, 204, 204, 0.7)',
        borderBottom: '1px solid rgba(204, 204, 204, 0.7)',
        margin: '1em 0',
        paddingBottom: '1em',
        [theme.breakpoints.up('xxl')]: {
            margin: '1.35em 0',
            paddingBottom: '1.35em',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '2em 0',
            paddingBottom: '2em',
            borderTop: '2px solid rgba(204, 204, 204, 0.7)',
            borderBottom: '2px solid rgba(204, 204, 204, 0.7)',
        },
    },
    header: {
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.8rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2.4rem',
        },
    },
    paragraph: {
        fontSize: '1rem',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.35rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2rem',
        },
    },
    alert: {
        width: '100%',
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
        marginBottom: '2em',
        [theme.breakpoints.up('xxl')]: {
            marginBottom: '2.7em',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginBottom: '4em',
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
            transform: 'scale(1.35)',
            marginRight: '1rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
            marginRight: '1.5rem'
        },
    },
    loadingIcon: {
        color: theme.myTheme.trecia,
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.35)',
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
        },
    },
}));

const Checkout = ({ setCart, delivery, setDelivery, setOrderStep, cart, kodoNuolaida, priceSum, loggedIn, token, setKodoNuolaida, pasirinktasGamybosLaikas, findMaxDiscount, getItemProductionCost, roundTwoDec }) => {

    const classes = useStyles();
    const history = useHistory();

    const [alert, setAlert] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const pay = async () => {
        setSubmitting(true);
        setAlert('');
        try {
            if (loggedIn) {
                const res = await fetch("/users/createOrderLoggedIn/", {
                    method: "POST",
                    credentials: "include",
                    headers:
                    {
                        "Content-Type": "application/json",
                        "authorization": `JWT ${token}`,
                    },
                    body: JSON.stringify({
                        cart: cart,
                        delivery: delivery,
                        kodoNuolaida: kodoNuolaida,
                        priceSum: priceSum,
                        production: pasirinktasGamybosLaikas,
                    }),
                });
                const response = await res.json();
                if (response.success) {
                    setSubmitting(false);
                    localStorage.removeItem("cartArray");
                    setKodoNuolaida({
                        kodas: '',
                        nuolaida: 0
                    });
                    setDelivery({
                        ...delivery,
                        city: '',
                        address: '',
                        zipcode: '',
                        juridinis: false,
                        companyName: '',
                        companyCode: '',
                        companyAddress: '',
                        companyPVM: '',
                        pastabaKurjeriui: '',
                    });
                    setCart([]);
                    setOrderStep(2);
                } else {
                    setSubmitting(false);
                    setAlert('Klaida! Pabandykite vėliau');
                }
            } else {
                const res = await fetch("/users/createOrder/", {
                    method: "POST",
                    credentials: "include",
                    headers:
                    {
                        "Content-Type": "application/json",
                        // "authorization": `JWT ${token}`,
                    },
                    body: JSON.stringify({
                        cart: cart,
                        delivery: delivery,
                        kodoNuolaida: kodoNuolaida,
                        priceSum: priceSum,
                        production: pasirinktasGamybosLaikas,
                    }),
                });
                const response = await res.json();
                if (response.success) {
                    setSubmitting(false);
                    localStorage.removeItem("cartArray");
                    setCart([]);
                    setOrderStep(2);
                } else {
                    setSubmitting(false);
                    setAlert('Klaida! Pabandykite vėliau');
                }
            }
        } catch (error) {
            setSubmitting(false);
            setAlert('Klaida! Pabandykite vėliau');
        }
    };

    return (
        <Box>
            <Collapse in={alert !== ''}>
                <Box className={classes.alertBox} display='flex' justifyContent='center' alignItems='center'>
                    <Alert severity="warning" classes={{root: classes.alert, icon: classes.alertIcon}}><p className={classes.alertText}>{alert}</p></Alert>
                </Box>
            </Collapse>
            <Grid container > 
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={classes.leftGridItem}>
                    <Box display='flex' justifyContent='space-between' alignItems='center' classes={{root: classes.gridItemTitleBox}}>
                        <h2 className={classes.header}>Gavėjas</h2>
                        <Tooltip title="Keisti" aria-label="Keisti" placement="top" arrow >
                            <Box display='flex' justifyContent='center' alignItems='center'> 
                                <AiFillEdit size={20} className={classes.icon} onClick={() => setOrderStep(0)}/>
                            </Box>
                        </Tooltip>
                    </Box>
                    <p className={classes.paragraph}>Vardas: <b>{delivery.firstName}</b></p>
                    <p className={classes.paragraph}>Pavardė: <b>{delivery.lastName}</b></p>
                    <p className={classes.paragraph}>Telefono numeris: <b>{delivery.phone}</b></p>
                    <p className={classes.paragraph}>Elektroninis paštas: <b>{delivery.email}</b></p>
                    <p className={classes.paragraph}>Miestas: <b>{delivery.city}</b></p>
                    <p className={classes.paragraph}>Adresas: <b>{delivery.address}</b></p>
                    <p className={classes.paragraph}>Pašto kodas: <b>{delivery.zipcode}</b></p>
                    {delivery.juridinis && 
                        <>
                            <p className={classes.paragraph}>Įmonės pavadinimas: <b>{delivery.companyName}</b></p>
                            <p className={classes.paragraph}>Įmonės kodas: <b>{delivery.companyCode}</b></p>
                            <p className={classes.paragraph}>Įmonės adresas: <b>{delivery.companyAddress}</b></p>
                            <p className={classes.paragraph}>Įmonės PVM kodas: <b>{delivery.companyPVM}</b></p>
                        </>
                    }
                    {delivery.pastabaKurjeriui !== '' && 
                        <p className={classes.paragraph}>Pastaba kurjeriui: <b>{delivery.pastabaKurjeriui}</b></p>
                    }
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={classes.rightGridItem}>
                    <Box display='flex' flexDirection='column' justifyContent='space-between' style={{height: '100%'}}>
                        <Box classes={{root: classes.uzsakymasUpper}}>
                            <Box display='flex' justifyContent='space-between' alignItems='center' classes={{root: classes.gridItemTitleBox}}>
                                <h2 className={classes.header}>Užsakymas</h2>
                                <Tooltip title="Keisti" aria-label="Keisti" placement="top" arrow >
                                    <Box display='flex' justifyContent='center' alignItems='center'> 
                                        <AiFillEdit size={20} className={classes.icon} onClick={() => history.push('/cart')}/>
                                    </Box>
                                </Tooltip>
                            </Box>
                            {cart.map((item, index) => 
                                <Box display='flex' justifyContent='space-between' alignItems='center'>
                                    <p className={classes.paragraph} key={index}>{item.name}: <b>x{item.quantity}</b></p>
                                    <Box display='flex' justifyContent='flex-start' alignItems='center'>
                                         {findMaxDiscount(item.discount)[1] > 0 ? 
                                            <Box display='flex' justifyContent='flex-start' alignItems='flex-start'>
                                                <span className={classes.Isbraukta}>{roundTwoDec(item.price * getItemProductionCost(item.oneDayPriceIncreace, item.twoDayPriceIncreace) + item.maketavimoKaina).toFixed(2)}€</span>
                                                <p className={classes.DiscountedPriceText}>{roundTwoDec(item.price * getItemProductionCost(item.oneDayPriceIncreace, item.twoDayPriceIncreace) * (1 - (findMaxDiscount(item.discount)[1] / 100)) + item.maketavimoKaina).toFixed(2)}€</p>
                                            </Box>
                                        : 
                                            <p className={classes.PriceText}>{roundTwoDec(item.price * getItemProductionCost(item.oneDayPriceIncreace, item.twoDayPriceIncreace) + item.maketavimoKaina).toFixed(2)}€</p>
                                        }
                                    </Box>
                                </Box>
                            )}
                        </Box>
                        <Box display='flex' flexDirection='column' justifyContent='flex-end'>
                            {priceSum.sum !== priceSum.dscSum &&
                                <h4 className={classes.sumHeaderRed}>Pritaikytos nuolaidos: -{(priceSum.sum - priceSum.dscSum).toFixed(2)}€</h4>
                            }
                            <h4 className={classes.sumHeaderBlue}>Gamybos laikas: {pasirinktasGamybosLaikas}</h4>
                            <h4 className={classes.sumHeaderBlue}>Pristatymas: Nemokamas</h4>
                            <Box display='flex' justifyContent='flex-end' alignItems='flex-end'>
                                <p className={classes.PriceText2}>Viso kaina su PVM:</p>
                                {priceSum.sum !== priceSum.dscSum ?
                                    <Box display='flex' justifyContent='flex-end' alignItems='flex-start'>
                                        <span className={classes.Isbraukta2}>{priceSum.sum.toFixed(2)}€</span>
                                        <p className={classes.DiscountedPriceText2}>{priceSum.dscSum.toFixed(2)}€</p>
                                    </Box>
                                :
                                    <p className={classes.PriceText2}>{priceSum.sum.toFixed(2)}€</p>
                                }
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Box classes={{root: classes.mokejimoBudaiBox}}>
                <h2 className={classes.header}>Pasirinkite mokėjimo būdą.</h2>
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <p className={classes.PriceText2}>Kol kas nera :P</p>
                </Box>
            </Box>
            <Box display='flex' justifyContent='space-between' flexWrap="wrap-reverse">
                <Button 
                    classes={{root: classes.addButton}} 
                    onClick={() => {setOrderStep(0); window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}}
                    startIcon={<FaArrowLeft size={17} className={classes.buttonIcon}/>}
                >
                    Atgal
                </Button> 
                <Button 
                    classes={{root: classes.addButton, disabled: classes.buttonDisabled}} 
                    onClick={pay}
                    endIcon={<FaArrowRight size={17} className={classes.buttonIcon}/>}
                    disabled={submitting}
                >
                    {submitting ? <CircularProgress size={20} className={classes.loadingIcon}/> : 'Mokėti'}
                </Button> 
            </Box>
        </Box>
    )
}

export default Checkout
