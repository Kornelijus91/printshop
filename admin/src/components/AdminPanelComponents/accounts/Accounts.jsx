import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { Container, Box, Grid, CircularProgress } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import SearchField from './SearchField';
import AccountModal from './AccountModal';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '1rem 1rem 1rem 3rem',
        height: '97vh',
        width: '96.5%',
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas
    },
    header: {
        margin: '0',
        padding: '0',
        fontSize: '1.5rem'
    },
    accountsBox: {
        backgroundColor: theme.myTheme.antra,
        borderRadius: '7px',
        padding: '.8rem .7rem .7rem .7rem',
        width: '99%',
        height: '85%',
    },
    accountsBoxInner: {
        height: '95%',
        overflowY: 'auto'
    },
    accountsBoxPagination: {
        marginTop: '.2rem'
    },
    pagination: {
    
    },
    paginationel: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas
    },
    progressIcon: {
        color: theme.myTheme.sriftoSpalva,
    },
    infosection: {
        
    },
    item: {
        backgroundColor: theme.myTheme.sriftoSpalva,
        borderRadius: '7px',
        padding: '.3rem .3rem .3rem 1.5rem',
        margin: '.5rem',
        maxWidth: '99%',
        '&:hover': {
            cursor: "pointer",
            backgroundColor: '#0d1726',
        },
    },
}));

const Accounts = ({ token, administracija, setSnackbar }) => {

    const classes = useStyles();
    const [accountModalOpen, setAccountModalOpen] = useState(false);
    const [accountModalInfo, setAccountModalOpenInfo] = useState({
        userId: '',
        username: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        personalas: '',
        administracija: ''
    });
    const [page, setPage] = useState(1);
    const [pageDetails, setPageDetails] = useState({
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

    const getAllUsers = async (page) => {
        try {
            const getAllUsersRequest = await fetch("/administracija/getUserAccounts/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `JWT ${token}`,
                },
                body: JSON.stringify({
                    page: page,
                }),
            });
            const getAllUsersResponse = await getAllUsersRequest.json();
            if (getAllUsersResponse.success) {
                setPageDetails({
                    items: getAllUsersResponse.items,
                    totalItems: getAllUsersResponse.totalItems,
                    itemLimit: getAllUsersResponse.itemLimit,
                    currentPage: getAllUsersResponse.currentPage,
                    totalPages: getAllUsersResponse.totalPages,
                    hasNextPage: getAllUsersResponse.hasNextPage,
                    nextPage: getAllUsersResponse.nextPage,
                    hasPrevPage: getAllUsersResponse.hasPrevPage,
                    prevPage: getAllUsersResponse.prevPage,
                    pagingCounter: getAllUsersResponse.pagingCounter
                });
            } else {
                setSnackbar({
                    message: 'Klaida! Nepavyko gauti vartotojų duomenų iš serverio. Pabandykite vėliau.',
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
        getAllUsers(page);
        // eslint-disable-next-line
    }, [page])

    return (
        <Container maxWidth='xl' classes={{root: classes.root}}>
            <AccountModal 
                accountModalOpen={accountModalOpen}
                setAccountModalOpen={setAccountModalOpen}
                accountModalInfo={accountModalInfo}
                setAccountModalOpenInfo={setAccountModalOpenInfo}
                token={token}
                administracija={administracija}
                setSnackbar={setSnackbar}
            />
            {/* <h1 className={classes.header}>Paskyros - Iš viso: {pageDetails.totalItems}</h1> */}
            <SearchField 
                token={token}
                setAccountModalOpen={setAccountModalOpen}
                setAccountModalOpenInfo={setAccountModalOpenInfo}
            />
            {pageDetails.items.length > 0 ?
                <Box classes={{root: classes.accountsBox}}>
                    <Box classes={{root: classes.accountsBoxInner}}>
                        {pageDetails.items.map((item) => 
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
                    <Box classes={{root: classes.accountsBoxPagination}}>
                        <Pagination 
                            classes={{root: classes.pagination, ul: classes.paginationel}}
                            count={pageDetails.totalPages} 
                            page={page} 
                            onChange={handlePageChange} 
                            hideNextButton={true}
                            hidePrevButton={true}
                        />
                    </Box>
                </Box>
            :
                <Box classes={{root: classes.accountsBox}}>
                    <Box style={{width: '100%', height: '100%'}} display='flex' justifyContent='center' alignItems='center'>
                        <CircularProgress size={40} className={classes.progressIcon}/>
                    </Box>
                </Box>
            }
        </Container>
    )
}

export default Accounts
