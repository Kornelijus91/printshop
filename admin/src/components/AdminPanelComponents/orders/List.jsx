// import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import OrderSearch from './OrderSearch';

const useStyles = makeStyles((theme) => ({
    accountsBox: {
        // backgroundColor: theme.myTheme.antra,
        borderRadius: '7px',
        padding: '0',
        width: '100%',
        height: '85%',
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '10px',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '14px',
        },
    },
    accountsBoxInner: {
        height: '95%',
        overflowY: 'auto'
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
    header: {
        margin: '0',
        padding: '0',
        fontSize: '1.5rem',
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        [theme.breakpoints.up('xxl')]: {
            fontSize: '2.25rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '3rem',
        },
    },
    item: {
        backgroundColor: theme.myTheme.sriftoSpalva,
        borderRadius: '7px',
        padding: '.5rem .5rem 0 .5rem',
        margin: '.5rem 0',
        maxWidth: '97%',
        '&:hover': {
            cursor: "pointer",
            backgroundColor: '#0d1726',
        },
        [theme.breakpoints.up('md')]: {
            maxWidth: '98.8%',
            padding: '.3rem .3rem .3rem 1.5rem',
        },
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '10px',
            padding: '.7rem',
            margin: '.7rem 0',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '14px',
            padding: '1.2rem',
            margin: '1.2rem 0',
        },
    },
    infosection: {
        height: '100%',
        display: 'flex', 
        justifyContent: 'flex-start', 
        alignItems: 'center',
        fontSize: '1rem',
        fontFamily: theme.myTheme.sriftas,
        color: theme.myTheme.trecia,
        '& p': {
            margin: 0,
            padding: 0,
        }, 
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.35rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2rem',
            // '& p': {
            //     margin: 0,
            //     padding: 0,
            // }, 
        },
    },
    namesum: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        maxWidth: '95%',
    },
    naujas: {
        backgroundColor: '#26a69a',
        borderRadius: '7px',
        padding: '.3em',
        margin: '.5em 0',
        fontSize: '1rem',
        '& p': {
            color: theme.myTheme.trecia,
            fontFamily: theme.myTheme.sriftas,
            padding: 0,
            margin: 0,
        },
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '10px',
            // padding: '.4em',
            margin: '.5em',
            fontSize: '1.35rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '14px',
            // padding: '.6em',
            // margin: '1em 0',
            fontSize: '2rem',
        },
    },
}));

const List = ({ orders, ordersPage, setOrdersPage, setOrdersView, setOrder, setSnackbar, getOrders, user, orderFilter }) => {

    const classes = useStyles();

    const handlePageChange = (event, value) => {
        setOrdersPage(value);
    };

    const makeNotNew = async (orderId) => {
        try {
            const req = await fetch("/administracija/makeNotNew/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `JWT ${user.token}`,
                },
                body: JSON.stringify({
                    id: orderId,
                }),
            });
            const res = await req.json();
            if (res.success) {
                getOrders(ordersPage, orderFilter);
            }
        } catch (error) {
            setSnackbar({
                message: `${error}`,
                open: true,
            });
        }
    };

    return (
        <Box>
            <OrderSearch 
                token={user.token}
                setOrdersView={setOrdersView}
                setOrder={setOrder}
                makeNotNew={makeNotNew}
            />
           {orders.items.length > 0 ?
                <Box classes={{root: classes.accountsBox}}>
                    <Box classes={{root: classes.accountsBoxInner}}>
                        {orders.items.map((item) => 
                            <Grid container display="flex" justifyContent='space-between' alignItems='center' className={classes.item} key={item._id} onClick={() =>
                                {
                                    if (item.new) {
                                        makeNotNew(item._id);
                                    }
                                    setOrder({
                                        id: item._id,
                                        clientID: item.clientID,
                                        clientUsername: item.clientUsername,
                                        delivery: item.delivery,
                                        cartItems: item.cartItems,
                                        createdAt: item.createdAt,
                                        price: item.price,
                                        discountPrice: item.discountPrice,
                                        status: item.status,
                                        gamybosLaikas: item.gamybosLaikas,
                                        sanaudos: item.sanaudos,
                                        uzsakymoNr: item.uzsakymoNr,
                                        payment: item.payment,
                                        shippingMethod: item.shippingMethod,
                                        isankstineSaskaita: item.isankstineSaskaita,
                                        PVMSaskaitaFaktura: item.PVMSaskaitaFaktura,
                                    });
                                    setOrdersView(true);
                                } 
                            }>
                                {item.new &&
                                    <Grid item xl={1} lg={1} md={1} sm={6} xs={6}>
                                        <Box classes={{root: classes.infosection}}>
                                            <Box display='flex' justifyContent='center' alignItems='center' classes={{root: classes.naujas}}>
                                                <p>Naujas</p>
                                            </Box>
                                        </Box>
                                    </Grid>
                                }
                                <Grid item xl={2} lg={2} md={2} sm={6} xs={6}>
                                    <Box classes={{root: classes.infosection}}>
                                        <p>Pateiktas: {new Date(item.createdAt).getFullYear()+"-"+('0' + (new Date(item.createdAt).getMonth() + 1)).slice(-2)+"-"+('0' + new Date(item.createdAt).getDate()).slice(-2)}</p>
                                    </Box>
                                </Grid>
                                <Grid item xl={7} lg={7} md={7} sm={6} xs={6}>
                                    <Box classes={{root: classes.infosection}}>
                                        <p className={classes.namesum}>
                                            {
                                                Array.from(new Set(item.cartItems.map((elem) => {
                                                    return elem.name;
                                                }))).join(", ")
                                            }
                                        </p>
                                    </Box>
                                </Grid>
                                <Grid item xl={2} lg={2} md={2} sm={6} xs={6}>
                                    <Box classes={{root: classes.infosection}} justifyContent='flex-end' >
                                        <p>Statusas:</p>
                                        <Box display='flex' justifyContent='center' alignItems='center' classes={{root: classes.naujas}} style={
                                            item.status === 'Įvykdytas' ? 
                                                {backgroundColor: '#26a69a'}
                                            : item.status === 'Apmokėtas' ? 
                                                {backgroundColor: '#f4a261'}
                                            : item.status === 'Atšauktas' ? 
                                                {backgroundColor: '#E63946'}
                                            :
                                                {backgroundColor: '#457B9D'}
                                        }>
                                            <p>{item.status}</p>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        )}
                    </Box>
                    { orders.totalPages > 1 &&
                        <Box classes={{root: classes.accountsBoxPagination}}>
                            <Pagination 
                                classes={{root: classes.pagination, ul: classes.paginationel}}
                                count={orders.totalPages} 
                                page={ordersPage} 
                                onChange={handlePageChange} 
                                hideNextButton={true}
                                hidePrevButton={true}
                            />
                        </Box>
                    }
                </Box>
            :
                <Box classes={{root: classes.accountsBox}}>
                    <Box style={{width: '100%', height: '100%'}} display='flex' justifyContent='flex-start' alignItems='center'>
                        <h3 className={classes.header} style={{margin: '1rem'}}>Užsakymų nėra.</h3>
                    </Box>
                </Box>
            } 
        </Box>
    )
}

export default List
