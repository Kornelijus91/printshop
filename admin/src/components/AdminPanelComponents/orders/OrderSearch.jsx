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
        paddingRight: '1em', 
        [theme.breakpoints.up('xxl')]: {
            margin: '1.5rem 0 0 0',
            paddingRight: '1.4em', 
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '2rem 0 0 0',
            paddingRight: '2em', 
        },
    },
    searchResultBox: {
        position: 'absolute',
        backgroundColor: theme.myTheme.ruda.main,
        borderRadius: '7px',
        zIndex: '10',
        width: '100%',
        top: '100%',

        '& p': {
            color: `${theme.myTheme.balta} !important`,
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
        color: `${theme.myTheme.juoda} !important`,
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
        color: `${theme.myTheme.juoda} !important`,
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
        color: theme.myTheme.juoda,
        fontFamily: theme.myTheme.sriftas,
        border: `1px solid ${theme.myTheme.juoda}`,
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
        color: theme.myTheme.juoda,
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
        color: theme.myTheme.balta,
        '& p': {
            color: theme.myTheme.balta,
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

const OrderSearch = ({ token, makeNotNew, setOrdersView, setOrder }) => {

    const classes = useStyles();

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = async (e) => {
        setSearch(e.target.value);
    };

    const fetchSearchAccounts = async () => {
        if (search) {
            try {
                const searchAccounts = await fetch("/administracija/searchOrders/", {
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
        fetchSearchAccounts();
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
                            if (item.new) {
                                makeNotNew(item._id);
                            }
                            setOrder({
                                // id: item._id,
                                // clientID: item.clientID,
                                // clientUsername: item.clientUsername,
                                // delivery: item.delivery,
                                // cartItems: item.cartItems,
                                // createdAt: item.createdAt,
                                // price: item.price,
                                // discountPrice: item.discountPrice,
                                // nuolaidosKodas: item.nuolaidosKodas,
                                // nuolaidosKodoNuolaida: item.nuolaidosKodoNuolaida,
                                // status: item.status,
                                // gamybosLaikas: item.gamybosLaikas,
                                // TRDiscount: item.TRDiscount,
                                // uzsakymoNr: item.uzsakymoNr,
                                // sanaudos: item.sanaudos,
                                // payment: item.payment,
                                // shippingMethod: item.shippingMethod,
                                // isankstineSaskaita: item.isankstineSaskaita,
                                // PVMSaskaitaFaktura: item.PVMSaskaitaFaktura,

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
                                shippingPrice: item.shippingPrice,
                                isankstineSaskaita: item.isankstineSaskaita,
                                PVMSaskaitaFaktura: item.PVMSaskaitaFaktura,
                            });
                            setOrdersView(true);
                        }}>
                            <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
                                <Box classes={{root: classes.infosection}}>
                                    <p>Užsakymo Nr. {item.uzsakymoNr}</p>
                                </Box>
                            </Grid>
                            <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
                                <Box classes={{root: classes.infosection}}>
                                    <p>{new Date(item.createdAt).getFullYear()+"-"+('0' + (new Date(item.createdAt).getMonth() + 1)).slice(-2)+"-"+('0' + new Date(item.createdAt).getDate()).slice(-2)}</p>
                                </Box>
                            </Grid>
                            <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
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
                            <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
                                <Box classes={{root: classes.infosection}}>
                                    <p>Užsakovas: {item.delivery.firstName} {item.delivery.lastName}</p>
                                </Box>
                            </Grid>
                        </Grid>
                    )}
                </Box>
            }
        </FormControl>   
    )
}

export default OrderSearch
