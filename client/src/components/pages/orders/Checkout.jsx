import { Box, Grid, Button, Tooltip, Collapse, CircularProgress } from '@material-ui/core'; 
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { AiFillEdit } from "react-icons/ai";
import { useHistory } from 'react-router-dom';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import PaymentOptions from './PaymentOptions';

const useStyles = makeStyles((theme) => ({
    leftGridItem: {
        fontSize: theme.myTheme.sizeM,
        borderBottom: `.1em solid ${theme.myTheme.sZalia.light}`,
        [theme.breakpoints.up('md')]: {
            borderRight: `.1em solid ${theme.myTheme.sZalia.light}`,
            borderBottom: 'none',
            padding: '0 1em 0 0',
        },
    },
    rightGridItem: {
        fontSize: theme.myTheme.sizeM,
        [theme.breakpoints.up('md')]: {
            padding: '0 0 0 1em',
        },
    },
    icon: {
        color: theme.myTheme.juoda,
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
        fontSize: theme.myTheme.sizeM,
        paddingRight: '1em',
    },
    Isbraukta: {
        fontSize: theme.myTheme.sizeM,
        padding: '0',
        margin: '0 .7em 0 0',
        overflowWrap: 'break-word',
        fontWeight: 'bold',
        position: 'relative',
        '&:before': {
            position: 'absolute',
            content: '""',
            width: '100%',
            height: '.2em',
            borderRadius: '.1em',
            backgroundColor: '#369693',
            right: '0',
            top: '40%',
            '-webkit-transform': 'skewY(-7deg)',
            transform: 'skewY(-7deg)',
        },
    },
    DiscountedPriceText: {
        fontSize: theme.myTheme.sizeM,
        padding: '0',
        margin: '0 .7em 0 0',
        overflowWrap: 'break-word',
        fontWeight: 'bold',
        color: theme.myTheme.sZalia.main,
    },
    PriceText: {
        fontSize: theme.myTheme.sizeM,
        padding: '0',
        margin: '0 .7em 0 0',
        overflowWrap: 'break-word',
        fontWeight: 'bold',
    },
    sumHeaderRed: {
        fontSize: theme.myTheme.sizeM,
        color: theme.myTheme.sZalia.main,
        textAlign: 'right',
        margin: '0 .7em 0 0',
    },
    sumHeaderBlue: {
        fontSize: theme.myTheme.sizeM,
        color: theme.myTheme.juoda,
        textAlign: 'right',
        margin: '0 .7em 0 0',
    },
    PriceText2: {
        fontSize: theme.myTheme.sizeMM,
        padding: '0',
        margin: '0 .7em 0 0',
        overflowWrap: 'break-word',
        fontWeight: 'bold',
    },
    Isbraukta2: {
        fontSize: theme.myTheme.sizeMM,
        padding: '0',
        margin: '0 .7em 0 0',
        overflowWrap: 'break-word',
        fontWeight: 'bold',
        position: 'relative',
        '&:before': {
            position: 'absolute',
            content: '""',
            width: '100%',
            height: '.2em',
            borderRadius: '.1em',
            backgroundColor: '#369693',
            right: '0',
            top: '40%',
            '-webkit-transform': 'skewY(-7deg)',
            transform: 'skewY(-7deg)',
        },
    },
    DiscountedPriceText2: {
        padding: '0',
        margin: '0 .7em 0 0',
        overflowWrap: 'break-word',
        fontSize: theme.myTheme.sizeMM,
        fontWeight: 'bold',
        color: theme.myTheme.sZalia.main,
    },
    uzsakymasUpper: {
        fontSize: theme.myTheme.sizeM,
        marginBottom: '1em',
    },
    addButton: {
        fontSize: theme.myTheme.sizeS,
        width: '100%',
        marginBottom: "2em",
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
        height: '3em',
        color: theme.myTheme.balta,
        backgroundColor: theme.myTheme.tZalia.main,
        fontFamily: theme.myTheme.sriftas,
        fontWeight: "bold",
        '&:hover': {
            backgroundColor: theme.myTheme.tZalia.dark,
        },
        [theme.breakpoints.up('md')]: {
            width: '20%',
        },
    },
    buttonDisabled: {
        color: theme.myTheme.balta,
        backgroundColor: theme.myTheme.sZalia.light,
    },
    buttonIcon: {
        color: theme.myTheme.balta,
        [theme.breakpoints.up('xxl')]: {
           transform: 'scale(1.35)',
           marginLeft: '.5em',
           marginRight: '.5em'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
            marginLeft: '1em',
            marginRight: '1em'
        },
    },
    mokejimoBudaiBox: {
        fontSize: theme.myTheme.sizeM,
        borderTop: `.1em solid ${theme.myTheme.sZalia.light}`,
        borderBottom: `.1em solid ${theme.myTheme.sZalia.light}`,
        margin: '1em 0',
        paddingBottom: '1em',
    },
    header: {
        fontSize: theme.myTheme.sizeMM,
    },
    paragraph: {
        fontSize: theme.myTheme.sizeM,
    },
    alert: theme.myTheme.alert,
    alertBox: theme.myTheme.alertBox,
    alertText: theme.myTheme.alertText,
    alertIcon: theme.myTheme.alertIcon,
    loadingIcon: {
        color: theme.myTheme.balta,
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.35)',
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
        },
    },
}));

const Checkout = ({ pasirinktasPristatymoBudas, setCart, setDelivery, setKodoNuolaida, delivery, setOrderStep, cart, kodoNuolaida, priceSum, loggedIn, token, pasirinktasGamybosLaikas, findMaxDiscount, getItemProductionCost, roundTwoDec }) => {

    //setPasirinktasPristatymoBudas

    const classes = useStyles();
    const history = useHistory();

    const [alert, setAlert] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState('');

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
                        selectedPaymentMethod: selectedPayment,
                        shippingMethod: pasirinktasPristatymoBudas.name,
                        shippingPrice: pasirinktasPristatymoBudas.price
                    }),
                });
                const response = await res.json();
                if (response.success) {
                    
                    localStorage.removeItem("cartArray");
                    
                    if (response.paymentURL !== '') {
                        window.location.replace(response.paymentURL)
                    } else {
                        setSubmitting(false);
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
                        // setPasirinktasPristatymoBudas('Kurjeriu, nurodytu adresu.');
                    }
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
                        selectedPaymentMethod: selectedPayment,
                        shippingMethod: pasirinktasPristatymoBudas.name,
                        shippingPrice: pasirinktasPristatymoBudas.price
                    }),
                });
                const response = await res.json();
                if (response.success) {
                    localStorage.removeItem("cartArray");
                    if (response.paymentURL !== '') {
                        window.location.replace(response.paymentURL)
                    } else {
                        setSubmitting(false);
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
                        // setPasirinktasPristatymoBudas('Kurjeriu, nurodytu adresu.');
                    }
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
                                            <Box display='flex' justifyContent='center' alignItems='center' style={{textAlign: 'center'}}>
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
                                <h4 className={classes.sumHeaderRed}>Pritaikytos nuolaidos: -{(priceSum.sum - priceSum.dscSum).toFixed(2)} €</h4>
                            }
                            <h4 className={classes.sumHeaderBlue}>Gamybos laikas: {pasirinktasGamybosLaikas}</h4>
                            <h4 className={classes.sumHeaderBlue}>Pristatymas: {pasirinktasPristatymoBudas.price.toFixed(2)} €</h4>
                            <h4 className={classes.sumHeaderBlue}>Pristatymo būdas: {pasirinktasPristatymoBudas.name}</h4>
                            <Box display='flex' justifyContent='flex-end' alignItems='flex-end'>
                                <p className={classes.PriceText2}>Viso kaina su PVM:</p>
                                {priceSum.sum !== priceSum.dscSum ?
                                    <Box display='flex' justifyContent='flex-end' alignItems='center'>
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
                <PaymentOptions selectedPayment={selectedPayment} setSelectedPayment={setSelectedPayment} pasirinktasPristatymoBudas={pasirinktasPristatymoBudas}/>
            </Box>
            <Box display='flex' justifyContent='space-between' flexWrap="wrap-reverse">
                <Button 
                    classes={{root: classes.addButton}} 
                    onClick={() => {setOrderStep(0); window.scrollTo({top: 0, left: 0});}}
                    startIcon={<FaArrowLeft size={17} className={classes.buttonIcon}/>}
                >
                    Atgal
                </Button> 
                <Button 
                    classes={{root: classes.addButton, disabled: classes.buttonDisabled}} 
                    onClick={pay}
                    endIcon={<FaArrowRight size={17} className={classes.buttonIcon}/>}
                    disabled={submitting || selectedPayment === ''}
                >
                    {submitting ? <CircularProgress size={20} className={classes.loadingIcon}/> : 'Mokėti'}
                </Button> 
            </Box>
        </Box>
    )
}

export default Checkout
