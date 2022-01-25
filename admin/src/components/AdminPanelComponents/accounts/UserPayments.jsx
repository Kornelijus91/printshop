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

const UserPayments = ({ username, setSnackbar, token, setPaymentModal }) => {

    const classes = useStyles();

    const [userPayments, setUserpayments] = useState({
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
    const [userPaymentsPage, setUserpaymentsPage] = useState(1);

    const handlePageChange = (event, value) => {
        setUserpaymentsPage(value);
    };

    const getUserPayments = async (page) => {
        try {
            const getPaymentsRequest = await fetch("/administracija/getUserPayments/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `JWT ${token}`,
                },
                body: JSON.stringify({
                    page: page,
                    username: username,
                }),
            });
            const getPaymentsResponse = await getPaymentsRequest.json();
            if (getPaymentsResponse.success) {
                setUserpayments({
                    items: getPaymentsResponse.items,
                    totalItems: getPaymentsResponse.totalItems,
                    itemLimit: getPaymentsResponse.itemLimit,
                    currentPage: getPaymentsResponse.currentPage,
                    totalPages: getPaymentsResponse.totalPages,
                    hasNextPage: getPaymentsResponse.hasNextPage,
                    nextPage: getPaymentsResponse.nextPage,
                    hasPrevPage: getPaymentsResponse.hasPrevPage,
                    prevPage: getPaymentsResponse.prevPage,
                    pagingCounter: getPaymentsResponse.pagingCounter
                });
            } else {
                setSnackbar({
                    message: 'Klaida! Nepavyko gauti mokėjimų duomenų iš serverio. Pabandykite vėliau.',
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
        getUserPayments(userPaymentsPage);
        // eslint-disable-next-line
    }, [userPaymentsPage]);

    return (
        <Box classes={{root: classes.root}}>
            <Box>
                {userPayments.items.length > 0 ?
                    <>
                    <Box classes={{root: classes.accountsBoxInner}}>
                        {userPayments.items.map((item) => 
                            <Grid container display="flex" justifyContent='space-between' alignItems='center' className={classes.item} key={item._id} onClick={() =>
                                {
                                    setPaymentModal({
                                        open: true,
                                        clientUsername: item.clientUsername,
                                        orderNr: item.orderNr,
                                        amount: item.amount,
                                        currency: item.currency,
                                        payment: item.payment,
                                        firstName: item.firstName,
                                        lastName: item.lastName,
                                        city: item.city,
                                        address: item.address,
                                        zip: item.zip,
                                        createdAt: item.createdAt,   
                                    });
                                } 
                            }>
                               <Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
                                    <Box classes={{root: classes.infosection}}>
                                        <p>Pateiktas: {new Date(item.createdAt).getFullYear()+"-"+('0' + (new Date(item.createdAt).getMonth() + 1)).slice(-2)+"-"+('0' + new Date(item.createdAt).getDate()).slice(-2)}</p>
                                    </Box>
                                </Grid>
                                <Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
                                    <Box classes={{root: classes.infosection}}>
                                        <p className={classes.namesum}>{item.amount.tofixed(2)} {item.currency}</p>
                                    </Box>
                                </Grid>
                                <Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
                                    <Box classes={{root: classes.infosection}}>
                                        <p className={classes.namesum}>Užsakymo Nr.{item.orderNr}</p>
                                    </Box>
                                </Grid>
                            </Grid>
                        )}
                    </Box>
                    { userPayments.totalPages > 1 &&
                        <Box classes={{root: classes.accountsBoxPagination}}>
                            <Pagination 
                                classes={{root: classes.pagination, ul: classes.paginationel}}
                                count={userPayments.totalPages} 
                                page={userPaymentsPage} 
                                onChange={handlePageChange} 
                                hideNextButton={true}
                                hidePrevButton={true}
                            />
                        </Box>
                    }
                    </>
                :
                    <Box classes={{root: classes.noResult}}>
                        <p style={{margin: '.5rem 0 .5rem 0', padding: '0'}}>Vartotojas nėra atlikęs mokėjimų.</p>
                    </Box>
                } 
            </Box>
        </Box>
    )
}

export default UserPayments
