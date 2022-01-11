import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, InputBase, Divider, Box, Grid, Chip, Button, CircularProgress, ClickAwayListener, Tooltip } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { FaTrash } from 'react-icons/fa';
import {Helmet} from "react-helmet";
import { ProjectName } from '../../../Variables.jsx'
import CreateEmailDialog from './CreateEmailDialog';
import SaveTemplateModal from './SaveTemplateModal';
import DeleteTemplateModal from './DeleteTemplateModal';

const useStyles = makeStyles((theme) => ({
    topStuff:{
        [theme.breakpoints.up('xxl')]: {
            marginTop: '2rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginTop: '4rem',
        },
    },
    root: {
        padding: '.5rem 1rem',
        margin: '1rem 1rem 0 0',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.myTheme.ketvirta,
        // width: 400,
        [theme.breakpoints.up('xxl')]: {
            margin: '1.5rem 1.5rem 0 0',
            borderRadius: '7px'
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '2rem 2rem 0 0',
            borderRadius: '9px'
        },
    },
    input: {
        width: '99%',
        height: '2.5rem',
        marginLeft: theme.spacing(1),
        flex: 1,
        [theme.breakpoints.up('xxl')]: {
            height: '3.75rem',
            fontSize: '1.6rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            height: '5rem',
            fontSize: '2rem',
        },
    },
    divider: {
        height: 28,
        margin: 4,
        [theme.breakpoints.up('xxl')]: {
            height: 42,
            margin: 6,
        },
        [theme.breakpoints.up('xxxl')]: {
            height: 56,
            margin: 8,
        },
    },
    searchResultBox: {
        position: 'absolute',
        backgroundColor: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        borderRadius: '7px',
        zIndex: '10',
        margin: '.5rem 0 0 0',
        width: '99%',
        top: '100%',
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '9px',
            margin: '.75rem 0 0 0',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '14px',
            margin: '1rem 0 0 0',
        },
    },
    item: {
        backgroundColor: theme.myTheme.sriftoSpalva,
        color: theme.myTheme.trecia,
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
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '9px',
            padding: '.45rem',
            margin: '.75rem 0 .75rem .75rem',
            maxWidth: '98.5%',
            '& p': {
               fontSize: '1.6rem'
            },
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '14px',
            padding: '.6rem',
            margin: '1rem',
            maxWidth: '99%',
            '& p': {
                fontSize: '2rem'
             },
        },
    },
    infosection: {
        marginLeft: '1rem',
        [theme.breakpoints.up('xxl')]: {
            marginLeft: '1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginLeft: '2rem',
        },
    },
    parent: {
        position: 'relative',
        zIndex: '1',
    },
    chip: {
        margin: '0 .5rem 0 0',
        backgroundColor: theme.myTheme.sriftoSpalva,
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        [theme.breakpoints.up('xxl')]: {
            margin: '0 .75rem 0 0',
            padding: '.5rem',
            fontSize: '1.2rem',
            height: '3rem',
            borderRadius: '1.5rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0 1rem 0 0',
            padding: '.75rem',
            fontSize: '1.6rem',
            height: '4rem',
            borderRadius: '2rem'
        },
    },
    deleteIcon: {
        color: theme.myTheme.trecia,
        '&:hover': {
            color:'#f2f2f2',
        },
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.5)',
            margin: '0 .5rem 0 .5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)',
            margin: '0 1rem 0 1rem',
        },
    },
    circleicon: {
        color: theme.myTheme.trecia,
        margin: '0',
        padding: '0',
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.5)'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)'
        },
    },
    button: {
        backgroundColor: theme.myTheme.pirma,
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        '&:hover': {
            backgroundColor: '#e31c2d',
        },
        [theme.breakpoints.up('xxl')]: {
            height: '3.75rem',
            fontSize: '1.3rem',
            padding: '1.5rem',
            borderRadius: '7px'
        },
        [theme.breakpoints.up('xxxl')]: {
            height: '5rem',
            fontSize: '1.8rem',
            padding: '2rem',
            borderRadius: '9px'
        },
    },
    buttonBottom: {
        backgroundColor: theme.myTheme.pirma,
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        width: '100%',
        marginBottom: '1rem',
        '&:hover': {
            backgroundColor: '#e31c2d',
        },  
        [theme.breakpoints.up('xxl')]: {
            margin: '.5rem 0',
            padding: '.5rem',
            fontSize: '1.3rem',
            borderRadius: '7px'
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '1rem 0',
            padding: '.7rem',
            fontSize: '1.8rem',
            borderRadius: '9px'
        },
    },
    buttonWrapper: {
        marginRight: '1rem',
        [theme.breakpoints.up('xxl')]: {
            marginRight: '1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginRight: '2rem',
        },
    },
    emailPreview: {
        width: '700px',
        height: '400px',
        frameBorder: "0",
        border: 'none',
        [theme.breakpoints.up('sm')]: {
            width: '1350px',
            height: '600px',
        },
        [theme.breakpoints.up('md')]: {
            width: '1800px',
            height: '1000px',
        },
        [theme.breakpoints.up('lg')]: {
            width: '1600px',
            height: '900px',
        },
        [theme.breakpoints.up('xxl')]: {
            width: '2075px', //2560
            height: '1350px',
        },
        [theme.breakpoints.up('xxxl')]: {
            width: '3200px',
            height: '1800px',
        },
        // zoom: '0.99',
        // '-moz-transform': 'scale(0.99)',
        // '-moz-transform-origin': '0 0',
        // '-o-transform': 'scale(0.99)',
        // '-o-transform-origin': '0 0',
        // '-webkit-transform': 'scale(0.99)',
        // '-webkit-transform-origin': '0 0'
    },
    previewParentBox: {
        marginBottom: '1rem',
        zoom: '50%',
        display: 'inline-block',
        padding: '1rem',
        borderRadius: '7px',
        backgroundColor: theme.myTheme.trecia,
        [theme.breakpoints.up('xxl')]: {
            marginBottom: '1.5rem',
            padding: '1.5rem',
            borderRadius: '9px',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginBottom: '2rem',
            padding: '2rem',
            borderRadius: '14px',
        },
    },
    accountsBox: {
        backgroundColor: theme.myTheme.antra,
        borderRadius: '7px',
        padding: '0 .5rem 0 0',
        width: '98%',
        [theme.breakpoints.up('xxl')]: {
            borderRadius: '9px',
            padding: '0 .6rem 0 0',
        },
        [theme.breakpoints.up('xxxl')]: {
            borderRadius: '14px',
            padding: '0 1rem 0 0',
        },
        // height: '85%',
    },
    accountsBoxInner: {
        // height: '95%',
        overflowY: 'auto'
    },
    accountsBoxPagination: {
        marginTop: '.2rem',
        [theme.breakpoints.up('xxl')]: {
            marginTop: '.3rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginTop: '.4rem',
        },
    },
    pagination: {
        marginBottom: '.5rem',
        [theme.breakpoints.up('xxl')]: {
            marginBottom: '.75rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginBottom: '1rem',
        },
    },
    paginationel: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        marginBottom: '.5rem',
        [theme.breakpoints.up('xxl')]: {
            marginBottom: '.75rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginBottom: '1rem',
        },
    },
    deleteTemplateIcon: {
        color: theme.myTheme.trecia,
        '&:hover': {
            color: '#e6e6e6',
            cursor: 'pointer'
        }, 
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.5)'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)'
        },
    },
    trashsection: {
        display: 'flex', 
        justifyContent: 'flex-end', 
        alignItems: 'center',
        height: '100%'
    },
    header: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        fontSize: '1rem',
        margin: '0',
        padding: '0',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2rem',
        },
    },
    
}));

const Email = ({ newChatrooms, newOrders, user, setSnackbar }) => {

    const classes = useStyles();

    const [search, setSearch] = useState('');
    const [subject, setSubject] = useState('');
    const [gettingAll, setGettingAll] = useState(false);
    const [sending, setSending] = useState(false);
    const [modal, setModal] = useState(false);
    const [saveModal, setSaveModal] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [page, setPage] = useState(1);
    const [letter, setLetter] = useState({
        id: '',
        name: '',
        HTML: '',
        JSON: {}
    });
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
    const [deleteModal, setDeleteModal] = useState({
        submitting: false,
        open: false,
        templateID: '',
        templateName: '',
    });

    const handleChange = async (e) => {
        setSearch(e.target.value);
    };

    const handleTemplateNameChange = async (e) => {
        setLetter({...letter, name: e.target.value});
    };

    const handleSubjectChange = async (e) => {
        setSubject(e.target.value);
    };

    const fetchgetEmailAddress = async () => {
        if (search) {
            try {
                const getEmailAddress = await fetch("/administracija/getEmailAddress/", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `JWT ${user.token}`,
                    },
                    body: JSON.stringify({
                        searchValue: search.replace(/[^a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ ]/g, "")
                    }),
                });
                const getEmailAddressResponse = await getEmailAddress.json();
                if (getEmailAddressResponse.success) {
                    setSearchResults(getEmailAddressResponse.result);
                } else {
                    setSnackbar({
                        message: `${getEmailAddressResponse.error}`,
                        open: true,
                    });
                }
            } catch (error) {
                setSnackbar({
                    message: `${error}`,
                    open: true,
                });
            }
        }
    };

    const getall = async () => {
        setGettingAll(true);
        try {
            const getAllEmailAddresses = await fetch("/administracija/getAllEmailAddresses/", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `JWT ${user.token}`,
                },
            });
            const getAllEmailAddressesResponse = await getAllEmailAddresses.json();
            if (getAllEmailAddressesResponse.success) {
                for (const item of getAllEmailAddressesResponse.result) {
                    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (re.test(String(item.username).toLowerCase()) && !addresses.includes(item.username)) {
                        let arrayCopy = addresses;
                        arrayCopy.push(item.username);
                        setAddresses(arrayCopy);
                    };
                }
                // console.log(getAllEmailAddressesResponse.result);
                setGettingAll(false);
            } else {
                setSnackbar({
                    message: `${getAllEmailAddressesResponse.error}`,
                    open: true,
                });
                setGettingAll(false);
            }
        } catch (error) {
            setSnackbar({
                message: `${error}`,
                open: true,
            });
            setGettingAll(false);
        }
    };

    const addAddress = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(email).toLowerCase()) && !addresses.includes(email)) {
            let arrayCopy = addresses;
            arrayCopy.push(email);
            setAddresses(arrayCopy);
            setSearch('');
        };
    };

    const handleDelete = (addressesToDelete) => () => {
        setAddresses((addresses) => addresses.filter((address) => address !== addressesToDelete));
    };

    const keyPress = (e) => {
        if(e.keyCode === 13){
            e.preventDefault();
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test(String(search).toLowerCase()) && !addresses.includes(search)) {
                let arrayCopy = addresses;
                arrayCopy.push(search);
                setAddresses(arrayCopy);
                setSearch('');
            } else {
                setSnackbar({
                    message: 'Neteisingas el. pašto adresas.',
                    open: true,
                });
            }
        }
    };

    const openModal = () => {
        setModal(true);
    };

    const getAllTemplates = async (page) => {
        try {
            const getTemplatesRequest = await fetch("/administracija/getTemplates/", {
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
            const getTemplatesResponse = await getTemplatesRequest.json();
            if (getTemplatesResponse.success) {
                setPageDetails({
                    items: getTemplatesResponse.items,
                    totalItems: getTemplatesResponse.totalItems,
                    itemLimit: getTemplatesResponse.itemLimit,
                    currentPage: getTemplatesResponse.currentPage,
                    totalPages: getTemplatesResponse.totalPages,
                    hasNextPage: getTemplatesResponse.hasNextPage,
                    nextPage: getTemplatesResponse.nextPage,
                    hasPrevPage: getTemplatesResponse.hasPrevPage,
                    prevPage: getTemplatesResponse.prevPage,
                    pagingCounter: getTemplatesResponse.pagingCounter
                });
            } else {
                setSnackbar({
                    message: 'Klaida! Nepavyko gauti šablonų iš serverio. Pabandykite vėliau.',
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

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const openDeleteModal = (e, deleteID, deleteName) => {
        e.stopPropagation();
        setDeleteModal({
            submitting: false,
            open: true,
            templateID: deleteID,
            templateName: deleteName,
        });
    };

    const send = async () => {
        setSending(true);
        if (addresses.length <= 0) {
            setSnackbar({
                message: 'Trūksta el. pašto adreso.',
                open: true,
            });
            setSending(false);
            return
        } else
        if (!subject) {
            setSnackbar({
                message: 'Trūksta temos.',
                open: true,
            });
            setSending(false);
            return
        } else
        if (!letter.HTML) {
            setSnackbar({
                message: 'Trūksta laiško.',
                open: true,
            });
            setSending(false);
            return
        } else {
            try {
                const sendEmailRequest = await fetch("/administracija/sendEmail/", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `JWT ${user.token}`,
                    },
                    body: JSON.stringify({
                        adress: addresses,
                        subject: subject,
                        letter: letter.HTML
                    }),
                });
                const sendEmailResponse = await sendEmailRequest.json();
                if (sendEmailResponse.success) {
                    setSending(false);
                    setSubject('');
                    setAddresses([]);
                    setLetter({
                        id: '',
                        name: '',
                        HTML: '',
                        JSON: {}
                    });
                    setSnackbar({
                        message: 'Išsiūsta!',
                        open: true,
                    });
                } else {
                    setSending(false);
                    setSnackbar({
                        message: `${sendEmailResponse.error}`,
                        open: true,
                    });
                }
    
            } catch (error) {
                setSending(false);
                setSnackbar({
                    message: `${error}`,
                    open: true,
                });
            }
        }
    };

    useEffect(() => {
        fetchgetEmailAddress();
        // eslint-disable-next-line
    }, [search])

    useEffect(() => {
        getAllTemplates(page);
        // eslint-disable-next-line
    }, [page])

    // useEffect(() => {
    //     console.log(letter);
    //     // eslint-disable-next-line
    // }, [letter])

    return (
        <Box classes={{root: classes.topStuff}}>
            <Helmet defer={false}>
                <title>{newOrders + newChatrooms > 0 ? `(${newOrders + newChatrooms})` : ''} El. Paštas | {ProjectName}</title>  
            </Helmet>
            <CreateEmailDialog 
                modal={modal} 
                setModal={setModal} 
                setLetter={setLetter} 
                letter={letter}
            />
            <SaveTemplateModal 
                user={user}
                saveModal={saveModal}
                setSaveModal={setSaveModal}
                letter={letter}
                handleTemplateNameChange={handleTemplateNameChange}
                setSnackbar={setSnackbar}
                getAllTemplates={getAllTemplates}
            />
            <DeleteTemplateModal 
                deleteModal={deleteModal} 
                setDeleteModal={setDeleteModal} 
                user={user} 
                setSnackbar={setSnackbar} 
                getAllTemplates={getAllTemplates}
                page={pageDetails.totalPages < page ? pageDetails.totalPages : page}
            />
            <Paper component="form" className={classes.root}>
                {addresses.length > 0 && 
                    <>
                        {addresses.length > 5 ?
                            <Chip
                                label={`${addresses.length} el. pašto adresų.`}
                                onDelete={() => setAddresses([])}
                                classes={{root: classes.chip, deleteIcon: classes.deleteIcon}}
                            />
                        :
                            <Box>
                                {addresses.map((data) => 
                                    <Chip
                                        label={data}
                                        onDelete={handleDelete(data)}
                                        classes={{root: classes.chip, deleteIcon: classes.deleteIcon}}
                                    />
                                )}
                            </Box>
                        }
                    </>
                }
                {addresses.length > 0 && 
                    <Divider className={classes.divider} orientation="vertical" />
                }
                <ClickAwayListener onClickAway={() => addAddress(search)}>
                    <Box style={{width: '100%', flex: 1}}>
                        <InputBase
                            value={search}
                            onChange={handleChange}
                            onKeyDown={keyPress}
                            className={classes.input}
                            placeholder="El. Pašto adresas"
                            inputProps={{ 'aria-label': 'El. Pašto adresas' }}
                        />
                    </Box>
                </ClickAwayListener>
                <Divider className={classes.divider} orientation="vertical" />
                <Button onClick={getall} aria-label="visi" disabled={gettingAll} className={classes.button} style={{marginLeft: '.5rem', height: '2.2rem'}}>
                    {gettingAll ? <CircularProgress size={20} className={classes.circleicon}/> : 'Visi' }
                </Button>
            </Paper>
            <Box classes={{root: classes.parent}}>
                {search && searchResults.length > 0 && 
                    <Box classes={{root: classes.searchResultBox}}>
                        {searchResults.map((item) => 
                            <Grid container display="flex" justifyContent='flex-start' alignItems='center' className={classes.item} onClick={() => {
                                addAddress(item.username);
                            }}>
                                {item.firstName &&
                                    <Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
                                        <Box classes={{root: classes.infosection}}>
                                            <p>{item.firstName}</p>
                                        </Box>
                                    </Grid>
                                }
                                {item.lastName &&
                                    <Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
                                        <Box classes={{root: classes.infosection}}>
                                            <p>{item.lastName}</p>
                                        </Box>
                                    </Grid>
                                }
                                <Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
                                    <Box classes={{root: classes.infosection}}>
                                        <p>{item.username}</p>
                                    </Box>
                                </Grid>
                            </Grid>
                        )}
                    </Box>
                }
            </Box>
            <Paper component="form" className={classes.root} style={{marginBottom: '1rem'}}>
                <InputBase
                    value={subject}
                    onChange={handleSubjectChange}
                    className={classes.input}
                    placeholder="Tema"
                    inputProps={{ 'aria-label': 'Tema' }}
                />
            </Paper>
            <Grid container display="flex" justifyContent='flex-start' alignItems='flex-start' >
                <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                    <Grid container >
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            {letter.HTML !== '' && 
                                <>
                                    <h1 className={classes.header}>Peržiūra</h1>
                                    <Box classes={{root: classes.previewParentBox}}>
                                        <iframe srcdoc={letter.HTML} title='Email_preview' className={classes.emailPreview}/>
                                    </Box>
                                </>
                            }
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Grid container>
                                <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                                    <Box classes={{root: classes.buttonWrapper}}>
                                        <Button onClick={openModal} className={classes.buttonBottom}>
                                            {letter.HTML !== '' ? 'Redaguoti laišką' : 'Kurti laišką' }
                                        </Button>
                                    </Box>
                                </Grid>
                                {letter.HTML !== '' &&
                                    <>
                                        <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                                            <Box classes={{root: classes.buttonWrapper}}>
                                                <Button onClick={() => setLetter({ id: '', name: '', HTML: '', JSON: {} })} className={classes.buttonBottom}>
                                                    Ištrinti
                                                </Button>
                                            </Box>
                                        </Grid>
                                        <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                                            <Box classes={{root: classes.buttonWrapper}}>
                                                <Button onClick={() => setSaveModal(true)} className={classes.buttonBottom}>
                                                    Išsaugoti šabloną
                                                </Button>
                                            </Box>
                                        </Grid>
                                        <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                                            <Box classes={{root: classes.buttonWrapper}}>
                                                <Button className={classes.buttonBottom} onClick={send} disabled={sending}>
                                                    {sending ? <CircularProgress size={20} className={classes.circleicon}/> : 'Siūsti' }
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                    {pageDetails.items.length > 0 &&
                        <>
                            <h1 className={classes.header}>Šablonai</h1>
                            <Box classes={{root: classes.accountsBox}}>
                                <Box classes={{root: classes.accountsBoxInner}}>
                                    {pageDetails.items.map((item) => 
                                        <Grid container display="flex" justifyContent='center' alignItems='center' className={classes.item} key={item._id}
                                            onClick={() => {
                                                setLetter({
                                                    id: item._id,
                                                    name: item.name,
                                                    HTML: item.html,
                                                    JSON: item.json
                                                });
                                            }}
                                        >
                                            <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
                                                <p>{item.name}</p>
                                            </Grid>
                                            <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                                                { user.administracija &&
                                                    <Box classes={{root: classes.trashsection}}>
                                                        <Box style={{marginRight: '1rem'}} display='flex' justifyContent='center' alignItems='center'>
                                                            <Tooltip title='Ištrinti' placement="top" arrow>
                                                                <div>
                                                                    <FaTrash size={20} className={classes.deleteTemplateIcon} onClick={(e) => openDeleteModal(e, item._id, item.name)}/> 
                                                                </div>
                                                            </Tooltip>
                                                        </Box> 
                                                    </Box>
                                                }
                                            </Grid>
                                        </Grid>
                                    )}
                                </Box>
                                { pageDetails.totalPages > 1 &&
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
                                }
                            </Box>
                        </>
                    }
                </Grid>
            </Grid>
        </Box>
    )
}

export default Email
