import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Breadcrumbs, Button, CircularProgress } from '@material-ui/core';
import { Helmet } from "react-helmet";
import { ProjectName } from '../../../Variables.jsx'
import { Link, useHistory } from 'react-router-dom'; 
import Pagination from '@material-ui/lab/Pagination';
import PaymentOptions from './PaymentOptions';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.myTheme.trecia,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 1em', 
        minHeight: '88vh',
        '-moz-box-shadow': 'inset 0 0 5px #000000',
        '-webkit-box-shadow': 'inset 0 0 5px #000000',
        boxShadow: 'inset 0 0 5px #000000',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        textAlign: 'left',
    },
    body: {
        width: '100%',
        [theme.breakpoints.up('lg')]: {
            width: '60%',
        },
    },
    breadcrumbLink: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        textDecoration: 'none',
        '&:hover': {
            color: '#2d5286',
        },
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.4rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.8rem',
        },
    },
    breadcrumbLinkDisabled: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        textDecoration: 'none',
        pointerEvents: 'none',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.4rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '1.8rem',
        },
    },
    breakcrumbs: {
        margin: '.5rem 0 0 0',
        [theme.breakpoints.up('md')]: {
            margin: '1rem 0 0 0',
        },
        [theme.breakpoints.up('xxl')]: {
            margin: '1.5rem 0 0 0',
            fontSize: '1.4rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '2rem 0 0 0',
            fontSize: '1.8rem',
        },
    },
    adresaiHeaser: {
        margin: '1rem 0 ',
        [theme.breakpoints.up('xxl')]: {
            margin: '1.35rem 0',
            fontSize: '2.4rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '2rem 0',
            fontSize: '3.6rem',
        },
    },
    cartItemParent: {
        width: '100%',
        border: `1px solid ${theme.myTheme.sriftoSpalva}`,
        borderRadius: '5px',
        padding: '1em',
        marginBottom: '1em',
        '& h2': {
            padding: 0,
            margin: 0,
        },
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '7px',
            padding: '1.35em',
            marginBottom: '1.35em',
        },
        [theme.breakpoints.up('xxxl')]: {
            border: `2px solid ${theme.myTheme.sriftoSpalva}`,
            borderRadius: '10px',
            padding: '2em',
            marginBottom: '2em',
        },
    },
    PriceText: {
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
    Isbraukta: {
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
    DiscountedPriceText: {
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
            margin: '0 1.4rem 0 0',
            fontSize: '2.4rem',
        },
    },
    accountsBoxPagination: {
        marginTop: '.2rem',
        padding: '0 0 .5rem .2rem',
        [theme.breakpoints.up('xxl')]: {
            marginTop: '.3rem',
            padding: '0 0 .75rem .3rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginTop: '.4rem',
            padding: '0 0 1rem .4rem',
            
        },
    },
    pagination:{
        
    },
    paginationel: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
    },
    cartitms: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginBottom: '1em'
    },
    orderItemTop: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        borderBottom: '1px solid #1D3557',
        paddingBottom: '1em',
        marginBottom: '1em',
        [theme.breakpoints.up('xxxl')]: {
            borderBottom: '2px solid #1D3557',
        },
    },
    orderPaymentBox: {
        borderTop: '1px solid #1D3557',
        padding: '1em 0',
        marginTop: '1em',
        [theme.breakpoints.up('xxxl')]: {
            borderTop: '2px solid #1D3557',
        },
    },
    mokejimoPasirinkimaiBox: {
        padding: '1em 0'
    },
    Button: {
        backgroundColor: theme.myTheme.pirma,
        color: theme.myTheme.trecia,
        '&:hover': {
            backgroundColor: '#e31c2d',
        },
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '7px',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '9px',
        },
    },
    Button2: {
        backgroundColor: theme.myTheme.pirma,
        color: theme.myTheme.trecia,
        width: '100%',
        '&:hover': {
            backgroundColor: '#e31c2d',
        },
        [theme.breakpoints.up('xl')]: {
            width: '22%',
        },
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '7px',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '9px',
        },
    },
    ButtonLabel: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        fontSize: '1rem',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.35rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2rem',
        },
    },
    ButtonDisabled: {
        backgroundColor: '#ee7781',
    },
    header: {
        fontSize: '1.2rem',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.8rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2.4rem',
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
    loadingIcon: {
        color: theme.myTheme.trecia,
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.35)',
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
        },
    },
    paymentParent: {
        padding: '1em 1em 1em 0',
        // [theme.breakpoints.up('xxl')]: {
        //     padding: '1.34em 1.34em 1.34em 0',
        // },
        // [theme.breakpoints.up('xxxl')]: {
        //     padding: '2em 2em 2em 0',
        // },
    },
}));


const Orders = ({ token, loggedIn }) => {

    const classes = useStyles();
    const history = useHistory();

    const [myOrders, setMyOrders] = useState({
        items: [],
        totalItems: 0,
        itemLimit: 0,
        currentPage: 1,
        totalPages: 1,
        hasNextPage: false,
        nextPage: null,
        hasPrevPage: false,
        prevPage: null,
        pagingCounter: 0
    });
    const [page, setPage] = useState(1);
    const [selectedPayment, setSelectedPayment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const pay = async (id) => {
        setSubmitting(true);
        try {
            const res = await fetch("/users/payForOrder/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `JWT ${token}`,
                },
                body: JSON.stringify({
                    orderID: id,
                    selectedPayment: selectedPayment
                }),
            });
            const response = await res.json();
            if (response.success) {
                if (response.paymentURL !== '') {
                    window.location.replace(response.paymentURL)
                } else {
                    history.push('/order');
                    setSubmitting(false);
                }
            } else {
                setSubmitting(false);
            }
        } catch (error) {
            setSubmitting(false);
        }
    };

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo({top: 0, left: 0});
    };

    const orderAgain = (productLink, carItemID) => {
        history.push(`/products/${productLink}/${carItemID}`);
        window.scrollTo({top: 0, left: 0});
    };

    const getMyOrders = async (orderPage) => {
        try {
            const res = await fetch("/users/getMyOrders/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `JWT ${token}`,
                },
                body: JSON.stringify({
                    page: orderPage,
                }),
            });
            const response = await res.json();
            if (response.success) {
                setMyOrders({
                    items: response.items,
                    totalItems: response.totalItems,
                    itemLimit: response.itemLimit,
                    currentPage: response.currentPage,
                    totalPages: response.totalPages,
                    hasNextPage: response.hasNextPage,
                    nextPage: response.nextPage,
                    hasPrevPage: response.hasPrevPage,
                    prevPage: response.prevPage,
                    pagingCounter: response.pagingCounter
                });
            } 
        } catch (error) {
            
        }
    };

    useEffect(() => {
        getMyOrders(page);
        // eslint-disable-next-line
    }, [page])

    useEffect(() => {
        if (!loggedIn) {
            history.push('/');
        }
        // eslint-disable-next-line
    }, [loggedIn])

    return (
        <Box classes={{root: classes.root}}>
            <Helmet>
                <title>Mano užsakymai | {ProjectName}</title>  
            </Helmet>
            <Box classes={{root: classes.body}}>
                <Breadcrumbs aria-label="breadcrumb" className={classes.breakcrumbs}>
                    <Link to='/' className={classes.breadcrumbLink}>Pagrindinis puslapis</Link>
                    <Link to='/orders' className={classes.breadcrumbLinkDisabled}>Mano užsakymai</Link>
                </Breadcrumbs>
                <h1 className={classes.adresaiHeaser}>Mano užsakymai</h1>
                {myOrders.items.length > 0 ?
                    <>
                        {myOrders.items.map((order) => 
                            <Box 
                                classes={{root: classes.cartItemParent}}
                                style={order.status === 'Pateiktas' ?
                                    {boxShadow: '-10px 0 0 0 #E63946'}
                                :
                                    {boxShadow: 'none'}
                                }
                            >
                                <Box classes={{root: classes.orderItemTop}}>
                                    
                                    <h2 className={classes.header}>{new Date(order.createdAt).getFullYear()+"-"+('0' + (new Date(order.createdAt).getMonth() + 1)).slice(-2)+"-"+('0' + new Date(order.createdAt).getDate()).slice(-2)}</h2>
                                    
                                    <Box display='flex' justifyContent='flex-start' alignItems='center'>
                                        <p className={classes.PriceText}>Kaina:</p>
                                        {order.price !== order.discountPrice ? 
                                            <Box display='flex' justifyContent='flex-start' alignItems='center'>
                                                <span className={classes.Isbraukta}>{order.price.toFixed(2)}€</span>
                                                <p className={classes.DiscountedPriceText}>{order.discountPrice.toFixed(2)}€</p>
                                            </Box>
                                        :
                                            <p className={classes.PriceText}>{order.price.toFixed(2)}€</p>
                                        }
                                    </Box>
                                    
                                    <h2 className={classes.header}>Statusas: {(order.status === 'Apmokėtas' && order.payment === 'cash') ? 'Pateiktas' : order.status}</h2>
                                    
                                </Box>
                                {order.cartItems.map((cartItem) => 
                                    
                                    <Box classes={{root: classes.cartitms}}>
                                        <h2 className={classes.header}>{`${cartItem.name} x${cartItem.quantity}`}</h2>
                                        {cartItem.image !== '' && cartItem.productLink &&
                                            <Button 
                                                classes={{root: classes.Button, label: classes.ButtonLabel, disabled: classes.ButtonDisabled }}  
                                                onClick={() => orderAgain(cartItem.productLink, cartItem._id)}     
                                                style={{marginLeft: 'auto'}}                                      
                                            >
                                                Užsakyti dar kart
                                            </Button>
                                        }
                                    </Box>
                                    
                                )}
                                {order.status === 'Pateiktas' ?
                                    <Box classes={{root: classes.orderPaymentBox}}>
                                        <Box display='flex' flexDirection='column' justifyContent='flex-end'>
                                            {order.nuolaidosKodoNuolaida > 0 &&
                                                <h4 className={classes.sumHeaderRed}>Nuolaida su kodu {order.nuolaidosKodas}: -{order.nuolaidosKodoNuolaida}%</h4>
                                            }
                                            {order.price !== order.discountPrice &&
                                                <h4 className={classes.sumHeaderRed}>Pritaikytos nuolaidos: -{(order.price - order.discountPrice).toFixed(2)}€</h4>
                                            }
                                            <h4 className={classes.sumHeaderBlue}>Pristatymas: Nemokamas</h4>
                                            <Box display='flex' justifyContent='flex-end' alignItems='flex-end'>
                                                <p className={classes.PriceText2}>Viso kaina su PVM:</p>
                                                {order.price !== order.discountPrice ?
                                                    <Box display='flex' justifyContent='flex-end' alignItems='flex-start'>
                                                        <span className={classes.Isbraukta2}>{order.price.toFixed(2)}€</span>
                                                        <p className={classes.DiscountedPriceText2}>{order.discountPrice.toFixed(2)}€</p>
                                                    </Box>
                                                :
                                                    <p className={classes.PriceText2}>{order.price.toFixed(2)}€</p>
                                                }
                                            </Box>
                                        </Box>
                                        <Box classes={{root: classes.mokejimoPasirinkimaiBox}}>
                                            <h2 className={classes.header}>Pasirinkite mokėjimo būdą.</h2>
                                            <Box classes={{root: classes.paymentParent}}>
                                                <PaymentOptions selectedPayment={selectedPayment} setSelectedPayment={setSelectedPayment}/>
                                            </Box>
                                        </Box>
                                        <Box display='flex' justifyContent='flex-end'>
                                            <Button 
                                                classes={{root: classes.Button, label: classes.ButtonLabel, disabled: classes.ButtonDisabled }}  
                                                style={{width: '12%'}}
                                                disabled={submitting || selectedPayment === ''}
                                                onClick={() => pay(order._id)}                                              
                                            >
                                                {submitting ? <CircularProgress size={20} className={classes.loadingIcon}/> : 'Mokėti'}
                                            </Button>
                                        </Box>
                                    </Box>
                                    : order.status === 'Įvykdytas' &&
                                    <Box classes={{root: classes.orderPaymentBox}} display='flex' justifyContent='flex-end'>
                                        <Button 
                                            classes={{root: classes.Button2, label: classes.ButtonLabel, disabled: classes.ButtonDisabled }}  
                                            component='a'
                                            href={order.PVMSaskaitaFaktura} 
                                            download 
                                            disabled={order.PVMSaskaitaFaktura === '' || order.PVMSaskaitaFaktura === null || !order.PVMSaskaitaFaktura }     
                                            onClick={() => console.log(order.PVMSaskaitaFaktura)}                                      
                                        >
                                            Parsisiusti sąskaitą
                                        </Button>
                                    </Box>
                                }
                            </Box>
                        )}
                        { myOrders.totalPages > 1 &&
                            <Box classes={{root: classes.accountsBoxPagination}}>
                                <Pagination 
                                    classes={{root: classes.pagination, ul: classes.paginationel}}
                                    count={myOrders.totalPages} 
                                    page={page} 
                                    onChange={handlePageChange} 
                                    // hideNextButton={true}
                                    // hidePrevButton={true}
                                />
                            </Box>
                        }
                    </>
                :
                    <Box classes={{root: classes.cartItemParent}}>
                        <h2 className={classes.header}>Užsakymų neturite.</h2>
                    </Box>
                }
            </Box>
        </Box>
    )
}

export default Orders
