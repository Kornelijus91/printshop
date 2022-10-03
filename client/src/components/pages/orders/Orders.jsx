import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { Helmet } from "react-helmet";
import { ProjectName } from '../../../Variables.jsx'
import { useHistory } from 'react-router-dom'; 
import Pagination from '@material-ui/lab/Pagination';
import PaymentOptions from './PaymentOptions';
import Breadcurmbs from '../utils/Breadcurmbs.jsx';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
        textAlign: 'left',
    },
    body: {
        width: '100%'
    },
    adresaiHeaser: {
        fontSize: theme.myTheme.sizeXL,
        margin: '1em 0 ',
    },
    cartItemParent: {
        fontSize: theme.myTheme.sizeM,
        width: '100%',
        border: `1px solid ${theme.myTheme.juoda}`,
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
        padding: '1em',
        marginBottom: '1em',
        '& h2': {
            padding: 0,
            margin: 0,
        },
        [theme.breakpoints.up('xxl')]: {
            border: `1.4px solid ${theme.myTheme.juoda}`,
        },
        [theme.breakpoints.up('xxxl')]: {
            border: `2px solid ${theme.myTheme.juoda}`,
        },
    },
    PriceText: {
        padding: '0',
        margin: '0 .7em 0 0',
        overflowWrap: 'break-word',
        fontSize: theme.myTheme.sizeMM,
        fontWeight: 'bold',
    },
    Isbraukta: {
        fontSize: 'clamp(1.2rem, 0.97vw, 2.4rem)',
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
        padding: '0',
        margin: '0 .7em 0 0',
        overflowWrap: 'break-word',
        fontSize: theme.myTheme.sizeMM,
        fontWeight: 'bold',
        color: theme.myTheme.sZalia.dark,
    },
    accountsBoxPagination: {
        fontSize: theme.myTheme.sizeM,
        marginTop: '.2em',
        padding: '0 0 .5em .2em',
    },
    pagination:{
        fontSize: theme.myTheme.sizeM,
        
    },
    paginationel: {
        fontSize: theme.myTheme.sizeM,
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
    },
    cartitms: {
        fontSize: theme.myTheme.sizeM,
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginBottom: '1em'
    },
    orderItemTop: {
        fontSize: theme.myTheme.sizeM,
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
        fontSize: theme.myTheme.sizeM,
        borderTop: '1px solid #1D3557',
        padding: '1em 0',
        marginTop: '1em',
        [theme.breakpoints.up('xxxl')]: {
            borderTop: '2px solid #1D3557',
        },
    },
    mokejimoPasirinkimaiBox: {
        fontSize: theme.myTheme.sizeM,
        padding: '1em 0'
    },
    Button: {
        backgroundColor: theme.myTheme.tZalia.main,
        color: theme.myTheme.balta,
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
        '&:hover': {
            backgroundColor: theme.myTheme.tZalia.dark,
        },
    },
    Button2: {
        backgroundColor: theme.myTheme.tZalia.main,
        color: theme.myTheme.balta,
        borderRadius: theme.myTheme.sizeBorderRadiusSmall,
        width: '100%',
        '&:hover': {
            backgroundColor: theme.myTheme.tZalia.dark,
        },
        [theme.breakpoints.up('xl')]: {
            width: '22%',
        },
    },
    ButtonLabel: {
        color: theme.myTheme.balta,
        fontFamily: theme.myTheme.sriftas,
        fontSize: theme.myTheme.sizeM,
    },
    ButtonDisabled: {
        backgroundColor: theme.myTheme.tZalia.dark,
    },
    header: {
        fontSize: theme.myTheme.sizeMM,
    },
    sumHeaderRed: {
        fontSize: theme.myTheme.sizeM,
        color: theme.myTheme.sZalia.dark,
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
    DiscountedPriceText2: {
        padding: '0',
        margin: '0 .7em 0 0',
        overflowWrap: 'break-word',
        fontSize: theme.myTheme.sizeMM,
        fontWeight: 'bold',
        color: theme.myTheme.sZalia.dark,
    },
    loadingIcon: {
        color: theme.myTheme.balta,
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.35)',
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
        },
    },
    paymentParent: {
        fontSize: theme.myTheme.sizeM,
        padding: '1em 1em 1em 0',
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
                <Breadcurmbs routes={[{path: 'orders', name: 'Mano užsakymai'}]}/>
                <h1 className={classes.adresaiHeaser}>Mano užsakymai</h1>
                {myOrders.items.length > 0 ?
                    <>
                        {myOrders.items.map((order) => 
                            <Box 
                                classes={{root: classes.cartItemParent}}
                                style={order.status === 'Pateiktas' ?
                                    {boxShadow: '-.8em 0 0 0 #3fb0ac'}
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
                                        {cartItem.image !== '' && cartItem.productLink && order.status === 'Įvykdytas' &&
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
                                            <Box display='flex' justifyContent='flex-end' alignItems='center'>
                                                <p className={classes.PriceText2}>Viso kaina su PVM:</p>
                                                {order.price !== order.discountPrice ?
                                                    <Box display='flex' justifyContent='flex-end' alignItems='flex-start'>
                                                        <span className={classes.Isbraukta}>{order.price.toFixed(2)}€</span>
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
