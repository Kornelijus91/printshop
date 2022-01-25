import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import PaymentSearch from './PaymentSearch';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '1em 1em 0 0',
        [theme.breakpoints.up('md')]: {
            margin: '1.1em 1em 0 0',
        },
        [theme.breakpoints.up('xl')]: {
            margin: '1em 1em 0 0',
        },
        [theme.breakpoints.up('xxl')]: {
            margin: '2em 1.35em 0 0',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '4em 2em 0 0',
        },
    },
    accountsBox: {
        backgroundColor: theme.myTheme.antra,
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
        maxWidth: '100%',
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

const Payments = ({ user, setSnackbar, setPaymentModal }) => {

    const classes = useStyles();

    const [page, setPage] = useState(1);
    const [payments, setPayments] = useState({
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

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const getPayments = async () => {
        try {
            const request = await fetch("/administracija/getPayments/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `JWT ${user.token}`,
                },
                body: JSON.stringify({
                    page: page,
                }),
            });
            const response = await request.json();
            if (response.success) {
                setPayments({
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
            } else {
                setSnackbar({
                    message: 'Klaida! Nepavyko gauti mokejimų duomenų iš serverio. Pabandykite vėliau.',
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
        getPayments();
        // eslint-disable-next-line
    }, [page]);

    return <Box classes={{root: classes.root}}>
        <PaymentSearch token={user.token} setPaymentModal={setPaymentModal}/>
        {payments.items.length > 0 ?
            <Box classes={{root: classes.accountsBox}}>
                <Box classes={{root: classes.accountsBoxInner}}>
                    {payments.items.map((item) => 
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
                            
                            <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
                                <Box classes={{root: classes.infosection}}>
                                    <p>Pateiktas: {new Date(item.createdAt).getFullYear()+"-"+('0' + (new Date(item.createdAt).getMonth() + 1)).slice(-2)+"-"+('0' + new Date(item.createdAt).getDate()).slice(-2)}</p>
                                </Box>
                            </Grid>
                            <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
                                <Box classes={{root: classes.infosection}}>
                                    <p className={classes.namesum}>
                                       {item.firstName} {item.lastName}
                                    </p>
                                </Box>
                            </Grid>
                            <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
                                <Box classes={{root: classes.infosection}}>
                                    <p className={classes.namesum}>{item.amount.tofixed(2)} {item.currency}</p>
                                </Box>
                            </Grid>
                            <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
                                <Box classes={{root: classes.infosection}}>
                                    <p className={classes.namesum}>Užsakymo Nr.{item.orderNr}</p>
                                </Box>
                            </Grid>
                        </Grid>
                    )}
                </Box>
                { payments.totalPages > 1 &&
                    <Box classes={{root: classes.accountsBoxPagination}}>
                        <Pagination 
                            classes={{root: classes.pagination, ul: classes.paginationel}}
                            count={payments.totalPages} 
                            page={page} 
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
                    <h3 className={classes.header} style={{margin: '1rem'}}>Mokėjimų nėra.</h3>
                </Box>
            </Box>
        } 
    </Box>;
};

export default Payments;
