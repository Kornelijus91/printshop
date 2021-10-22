import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { OutlinedInput, InputAdornment, FormControl, Box, Grid } from '@material-ui/core';
import { FaSearch } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
    root: {
        
    },
    form: {
        width: '98.5%',
        margin: '1rem 0 0 0',
        position: 'relative',
        zIndex: '1',
    },
    searchResultBox: {
        position: 'absolute',
        backgroundColor: theme.myTheme.trecia,
        borderRadius: '7px',
        zIndex: '10',
        width: '100%',
        top: '100%'
    },
    labelRoot: {
        color: `${theme.myTheme.trecia} !important`,
        fontFamily: theme.myTheme.sriftas,
        backgroundColor: theme.myTheme.sriftoSpalva,
        padding: '0 .5rem .2rem .5rem',
    },
    labelFocused: {
        padding: '0 .5rem .2rem .5rem',
        backgroundColor: theme.myTheme.sriftoSpalva,
        color: `${theme.myTheme.trecia} !important`,
        fontFamily: theme.myTheme.sriftas,
    },
    textInput: {
        marginBottom: "1rem",
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        border: `1px solid ${theme.myTheme.trecia}`,
    },
    input: {
        
    },
    diasbleOutline: {
        border: 'none',
    },
    searchglass: {
        color: theme.myTheme.trecia,
        marginRight: '1rem'
    },
    infosection: {
        marginLeft: '1rem'
    },
    item: {
        backgroundColor: theme.myTheme.sriftoSpalva,
        borderRadius: '7px',
        padding: '.3rem',
        margin: '.5rem',
        maxWidth: '96.5%',
        overflowWrap: 'break-word',
        '&:hover': {
            cursor: "pointer",
            backgroundColor: '#0d1726',
        },
        [theme.breakpoints.up('sm')]: {
            maxWidth: '98%',
        },
        [theme.breakpoints.up('md')]: {
            maxWidth: '98%',
        },
        [theme.breakpoints.up('lg')]: {
            maxWidth: '99%',
        },
    },
}));

const SearchField = ({ token, setAccountModalOpen, setAccountModalOpenInfo }) => {

    const classes = useStyles();

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = async (e) => {
        setSearch(e.target.value);
    };

    const fetchSearchAccounts = async () => {
        if (search) {
            try {
                const searchAccounts = await fetch("/administracija/searchAccounts/", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `JWT ${token}`,
                    },
                    body: JSON.stringify({
                        searchValue: search.replace(/[^a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ ]/g, "")
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
                        <Grid container display="flex" justifyContent='center' alignItems='flex-start' className={classes.item} onClick={() => {
                            setAccountModalOpenInfo({
                                userId: item._id,
                                username: item.username,
                                firstName: item.firstName,
                                lastName: item.lastName,
                                phoneNumber: item.phoneNumber,
                                personalas: item.personalas,
                                administracija: item.administracija
                            });
                            setAccountModalOpen(true);
                            setSearch('');
                        }}>
                            <Grid item xl={2} lg={2} md={4} sm={6} xs={6}>
                                <Box classes={{root: classes.infosection}}>
                                    <p>{item.username}</p>
                                </Box>
                            </Grid>
                            <Grid item xl={2} lg={2} md={4} sm={6} xs={6}>
                                <Box classes={{root: classes.infosection}}>
                                    <p>{item.firstName}</p>
                                </Box>
                            </Grid>
                            <Grid item xl={2} lg={2} md={4} sm={6} xs={6}>
                                <Box classes={{root: classes.infosection}}>
                                    <p>{item.lastName}</p>
                                </Box>
                            </Grid>
                            <Grid item xl={2} lg={2} md={4} sm={6} xs={6}>
                                <Box classes={{root: classes.infosection}}>
                                    <p>{item.phoneNumber}</p>
                                </Box>
                            </Grid>
                            <Grid item xl={2} lg={2} md={4} sm={6} xs={6}>
                                <Box classes={{root: classes.infosection}}>
                                    <p>Personalas: {item.personalas ? 'Taip' : 'Ne'}</p>
                                </Box>
                            </Grid>
                            <Grid item xl={2} lg={2} md={4} sm={6} xs={6}>
                                <Box classes={{root: classes.infosection}}>
                                    <p>Admin: {item.administracija ? 'Taip' : 'Ne'}</p>
                                </Box>
                            </Grid>
                        </Grid>
                    )}
                </Box>
            }
        </FormControl>   
    )
}

export default SearchField
