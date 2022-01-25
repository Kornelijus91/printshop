import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { OutlinedInput, InputAdornment, FormControl, Box, Grid } from '@material-ui/core';
import { FaSearch } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
    root: {
        
    },
    form: {
        width: '100%',
        position: 'relative',
        zIndex: '1',
        [theme.breakpoints.up('xxl')]: {
            margin: '1.5rem 0 0 0',
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '2rem 0 0 0',
        },
    },
    searchResultBox: {
        position: 'absolute',
        backgroundColor: theme.myTheme.trecia,
        borderRadius: '7px',
        zIndex: '10',
        width: '100%',
        top: '100%',
        '& p': {
            color: `${theme.myTheme.trecia} !important`,
            fontFamily: theme.myTheme.sriftas,
        },
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '10px',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '14px',
        },
    },
    labelRoot: {
        color: `${theme.myTheme.trecia} !important`,
        fontFamily: theme.myTheme.sriftas,
        backgroundColor: theme.myTheme.sriftoSpalva,
        padding: '0 .5rem .2rem .5rem',
        [theme.breakpoints.up('xxl')]: {
            padding: '0 .75rem .4rem .75rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '0 1rem .4rem 1rem',
        },
    },
    labelFocused: {
        padding: '0 .5rem .2rem .5rem',
        backgroundColor: theme.myTheme.sriftoSpalva,
        color: `${theme.myTheme.trecia} !important`,
        fontFamily: theme.myTheme.sriftas,
        [theme.breakpoints.up('xxl')]: {
            padding: '0 .75rem .4rem .75rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '0 1rem .4rem 1rem',
        },
    },
    textInput: {
        marginBottom: "1rem",
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        border: `1px solid ${theme.myTheme.trecia}`,
        [theme.breakpoints.up('xxl')]: {
            marginBottom: "1.5rem",
        },
        [theme.breakpoints.up('xxxl')]: {
            marginBottom: "2rem",
        },
    },
    input: {
        
    },
    diasbleOutline: {
        border: 'none',
    },
    searchglass: {
        color: theme.myTheme.trecia,
        marginRight: '1rem',
        [theme.breakpoints.up('xxl')]: {
            margin: '0 1.5rem',
            transform: 'scale(1.5)'
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0 2rem',
            transform: 'scale(2)'
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
            margin: '.8em',
            padding: 0,
        }, 
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.35rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2rem',
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
    namesum: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        maxWidth: '95%',
    },
}));

const PaymentSearch = ({ token, setPaymentModal }) => {

    const classes = useStyles();

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = async (e) => {
        setSearch(e.target.value);
    };

    const fetchSearchPayments = async () => {
        if (search) {
            try {
                const searchAccounts = await fetch("/administracija/searchpayments/", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `JWT ${token}`,
                    },
                    body: JSON.stringify({
                        searchValue: search
                    }),
                });
                const searchAccountsResponse = await searchAccounts.json();
                if (searchAccountsResponse.success) {
                    setSearchResults(searchAccountsResponse.result);
                }
            } catch (error) {

            }
        }
    };

    useEffect(() => {
        fetchSearchPayments();
        if (search === '') {
            setSearchResults([]);
        }
        // eslint-disable-next-line
    }, [search])

    return (
        <FormControl className={classes.form} variant="outlined">
            <OutlinedInput
                id="SearchField"
                type='text'
                value={search}
                onChange={(e) => handleChange(e)}
                classes={{root: classes.textInput, notchedOutline: classes.diasbleOutline, input: classes.input}}
                autoComplete='off'
                startAdornment={
                    <InputAdornment position="start">
                        <FaSearch size={24} className={classes.searchglass} />
                    </InputAdornment>
                }
                tabIndex="1"
            />
            {search && searchResults.length > 0 && 
                <Box classes={{root: classes.searchResultBox}}>
                    {searchResults.map((item) => 
                        <Grid container display="flex" justifyContent='center' alignItems='flex-start' key={item._id} className={classes.item} onClick={() => {
                            setSearch('');
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
                        }}>
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
                                    <p className={classes.namesum}>{(item.amount).toFixed(2)} {item.currency}</p>
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
            }
        </FormControl>   
    )
}

export default PaymentSearch
