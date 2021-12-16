// import { useState } from 'react'
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { useState, useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '99%',
        backgroundColor: theme.myTheme.antra,
        padding: '.5em',
        // color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        borderRadius: '7px',
        margin: '1rem 0 0 0',
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
    item: {
        backgroundColor: theme.myTheme.sriftoSpalva,
        borderRadius: '7px',
        padding: '.5rem .5rem 0 .5rem',
        margin: '.5rem',
        maxWidth: '97%',
        '&:hover': {
            cursor: "pointer",
            backgroundColor: '#0d1726',
        },
        [theme.breakpoints.up('md')]: {
            maxWidth: '99%',
            padding: '.3rem .3rem .3rem 1.5rem',
        },
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '10px',
            padding: '.7rem',
            margin: '.7rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '14px',
            padding: '1.2rem',
            margin: '1.2rem',
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
    noResult: {
        width: '99%',
        padding: '1rem',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        fontSize: '1rem',
        borderRadius: '7px',
        [theme.breakpoints.up('xxl')]: {
            padding: '1.5rem',
            fontSize: '1.5rem',
        }, 
        [theme.breakpoints.up('xxxl')]: {
            padding: '2rem',
            fontSize: '2rem',
        },
    },
}));

const UserOrders = ({ userId, setSnackbar, token, getOrders, ordersPage, setView, setOrdersView, setOrder, orderFilter }) => {

    const classes = useStyles();

    const [userOrders, setUserOrders] = useState({
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
    const [userOrdersPage, setUserOrdersPage] = useState(1);

    const handlePageChange = (event, value) => {
        setUserOrdersPage(value);
    };

    const makeNotNew = async (orderId) => {
        try {
            const req = await fetch("/administracija/makeNotNew/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `JWT ${token}`,
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

    const getUserOrders = async (page) => {
        try {
            const getOrdersRequest = await fetch("/administracija/getUserOrders/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `JWT ${token}`,
                },
                body: JSON.stringify({
                    page: page,
                    userId: userId,
                }),
            });
            const getOrdersResponse = await getOrdersRequest.json();
            if (getOrdersResponse.success) {
                setUserOrders({
                    items: getOrdersResponse.items,
                    totalItems: getOrdersResponse.totalItems,
                    itemLimit: getOrdersResponse.itemLimit,
                    currentPage: getOrdersResponse.currentPage,
                    totalPages: getOrdersResponse.totalPages,
                    hasNextPage: getOrdersResponse.hasNextPage,
                    nextPage: getOrdersResponse.nextPage,
                    hasPrevPage: getOrdersResponse.hasPrevPage,
                    prevPage: getOrdersResponse.prevPage,
                    pagingCounter: getOrdersResponse.pagingCounter
                });
            } else {
                setSnackbar({
                    message: 'Klaida! Nepavyko gauti užsakymo duomenų iš serverio. Pabandykite vėliau.',
                    open: true,
                });
            }

        } catch (error) {
            setSnackbar({
                message: `${error}`,
                open: true,
            });
        }
    };

    useEffect(() => {
        getUserOrders(userOrdersPage);
        // eslint-disable-next-line
    }, [userOrdersPage]);

    return (
        <Box classes={{root: classes.root}}>
            <Box>
                {userOrders.items.length > 0 ?
                    <>
                    <Box classes={{root: classes.accountsBoxInner}}>
                        {userOrders.items.map((item) => 
                            <Grid container display="flex" justifyContent='space-between' alignItems='center' className={classes.item} key={item._id} onClick={() =>
                                {
                                    if (item.new) {
                                        makeNotNew(item._id);
                                    }
                                    setOrdersView(true);
                                    setOrder({
                                        id: item._id,
                                        clientID: item.clientID,
                                        clientUsername: item.clientUsername,
                                        delivery: item.delivery,
                                        cartItems: item.cartItems,
                                        createdAt: item.createdAt,
                                        price: item.price,
                                        discountPrice: item.discountPrice,
                                        nuolaidosKodas: item.nuolaidosKodas,
                                        nuolaidosKodoNuolaida: item.nuolaidosKodoNuolaida,
                                        status: item.status,
                                        uzsakymoNr: item.uzsakymoNr,
                                        sanaudos: item.sanaudos,
                                    });
                                    setView({value: 8, title: 'Užsakymai', titleAdditional: ''});
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
                                        <p>Pateiktas: {new Date(item.createdAt).getFullYear()+"-"+(new Date(item.createdAt).getMonth() + 1)+"-"+new Date(item.createdAt).getDate()}</p>
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
                    { userOrders.totalPages > 1 &&
                        <Box classes={{root: classes.accountsBoxPagination}}>
                            <Pagination 
                                classes={{root: classes.pagination, ul: classes.paginationel}}
                                count={userOrders.totalPages} 
                                page={userOrdersPage} 
                                onChange={handlePageChange} 
                                hideNextButton={true}
                                hidePrevButton={true}
                            />
                        </Box>
                    }
                    </>
                :
                    <Box classes={{root: classes.noResult}}>
                        <p style={{margin: '.5rem 0 .5rem 0', padding: '0'}}>Vartotojas nėra pateikęs užsakymų.</p>
                    </Box>
                } 
            </Box>
        </Box>
    )
}

export default UserOrders
