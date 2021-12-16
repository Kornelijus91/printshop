import { useState, useEffect } from 'react'; //useCallback
import PropTypes from 'prop-types';
import { Badge, Box, Snackbar, Grow, Grid, AppBar, CssBaseline, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { FaUser, FaBoxOpen, FaUserFriends, FaCrown, FaPercent, FaClipboardList, FaChartLine } from 'react-icons/fa'; //FaChartBar
import { HiMail } from "react-icons/hi";
import { MdViewCarousel, MdSettings } from "react-icons/md";
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import AccountsV2 from './AdminPanelComponents/accounts/AccountsV2';
import Products from './AdminPanelComponents/products/Products';
import Carousel from './AdminPanelComponents/carousel/Carousel';
import Email from './AdminPanelComponents/email/Email';
import Loyalty from './AdminPanelComponents/loyalty/Loyalty';
import DiscountCodes from './AdminPanelComponents/discountcodes/DiscountCodes';
import SalesStats from './AdminPanelComponents/stats/SalesStats';
import Treklama01 from '../media/Treklama01.png'
import Orders from './AdminPanelComponents/orders/Orders';
import Settings from './AdminPanelComponents/settings/Settings';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: theme.myTheme.sriftoSpalva,
        height: '100%'
    },
    drawer: {
        [theme.breakpoints.up('lg')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
        [theme.breakpoints.up('xxl')]: {
            width: 360,
        },
        [theme.breakpoints.up('xxxl')]: {
            width: 480,
        },
    },
    appBar: {
        [theme.breakpoints.up('lg')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        [theme.breakpoints.up('xxl')]: {
            width: `calc(100% - ${360}px)`,
            marginLeft: 360,
        },
        [theme.breakpoints.up('xxxl')]: {
            width: `calc(100% - ${480}px)`,
            marginLeft: 480,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    toolbarContainer: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: theme.myTheme.pirma,
        [theme.breakpoints.up('xxl')]: {
            width: 360,
        },
        [theme.breakpoints.up('xxxl')]: {
            width: 480,
        },
    },
    content: {
        flexGrow: 1,
        padding: '.5rem 0 0 .5rem',
        overflowY: 'auto',
        [theme.breakpoints.up('md')]: {
            padding: '0 0 0 1rem',
        },
        [theme.breakpoints.up('xxl')]: {
            padding: '0 0 0 1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '0 0 0 2rem',
        },
        // backgroundColor: theme.myTheme.sriftoSpalva,
        // height: '100%',
    },
    contentInner: {
        
    },
    logo: {
        textAlign: 'center',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        fontSize: '1.2rem',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.8rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2.4rem',
        },
    },
    icon: {
        margin: ' .5rem 1rem .5rem 1rem',
        [theme.breakpoints.up('xxl')]: {
            margin: ' 1rem 1.5rem .75rem 2rem',
            transform: 'scale(1.5)'
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: ' 1.5rem 2rem 1rem 3rem',
            transform: 'scale(2)'
        },
    },
    menuicon: {
        color: theme.myTheme.sriftoSpalva,
        [theme.breakpoints.up('xxl')]: {
            transform: 'scale(1.5)'
        },
        [theme.breakpoints.up('xxxl')]: {
            transform: 'scale(2)'
        },
    },
    menuItem: {
        [theme.breakpoints.up('xxl')]: {
            padding: '1rem 0 1rem 2.5rem',
            // marginLeft: '1.5rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '1.5rem 0 1.5rem 4rem',
            // marginLeft: '2rem'
        },
    },
    menutext: {
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        fontSize: '1.2rem',
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.8rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2.4rem',
        },
    },
    text: {
        textAlign: 'left',
        margin: '0 0 0 .8rem',
        padding: '0',
        textSizeAdjust: 'auto',
        overflowWrap: 'break-word',
        [theme.breakpoints.up('xxl')]: {
            margin: '0 0 0 .5rem',
            fontSize: '1.2rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0',
            fontSize: '1.6rem'
        },
    },
    link: {
        margin: '0 0 1rem .8rem',
        padding: '0',
        color: theme.myTheme.sriftoSpalva,
        fontFamily: theme.myTheme.sriftas,
        '&:hover': {
            color: '#0d1726',
        },
        [theme.breakpoints.up('xxl')]: {
            margin: '0 0 1.5rem .5rem',
            fontSize: '1.2rem'
        },
        [theme.breakpoints.up('xxxl')]: {
            margin: '0 0 2rem 0',
            fontSize: '1.6rem'
        },
    },
    usernameLogoutContainer: {
        maxWidth: '5rem',
        [theme.breakpoints.up('xxl')]: {
            maxWidth: '7.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            maxWidth: '10rem',
        },
    },
    snackbar: {
        backgroundColor: theme.myTheme.antra,
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        [theme.breakpoints.up('xxl')]: {
            fontSize: '1.6rem',
            padding: '1rem',
            borderRadius: '7px',
        },
        [theme.breakpoints.up('xxxl')]: {
            fontSize: '2rem',
            padding: '1.5rem',
            borderRadius: '9px',
        },
    },
    addButton: {
        margin: '0 1em .2em 0',
        padding: '.3rem .6rem .3rem .6rem',
        fontSize: '.9rem',
        fontFamily: theme.myTheme.sriftas,
        color: theme.myTheme.trecia,
        backgroundColor: theme.myTheme.antra,
        '&:hover': {
            backgroundColor: theme.myTheme.sriftoSpalva,
        },
        [theme.breakpoints.up('md')]: {
            margin: '0 1em 0 0',
        },
        [theme.breakpoints.up('xxl')]: {
            padding: '.45rem .9rem .45rem .9rem',
            fontSize: '1.35rem',
            borderRadius: '7px'
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '.6rem 1.2rem .6rem 1.2rem',
            fontSize: '1.8rem',
            borderRadius: '9px'
        },
    },
    filterButton: {
        margin: '0 .7em .2em 0',
        padding: '.2em .4em',
        fontSize: '.5rem',
        fontFamily: theme.myTheme.sriftas,
        color: theme.myTheme.trecia,
        [theme.breakpoints.up('md')]: {
            fontSize: '1rem',
            margin: '0 1em 0 0',
            padding: '.3rem .6rem',
        },
        [theme.breakpoints.up('xxl')]: {
            padding: '.45rem .9rem',
            fontSize: '1.35rem',
            borderRadius: '7px'
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '.6rem 1.2rem',
            fontSize: '1.8rem',
            borderRadius: '9px'
        },
    },
    logoBox: {
        width: '100%',
        padding: '0 1rem 0 1rem',
        [theme.breakpoints.up('xxl')]: {
            padding: '0 1.5rem 1.5rem 1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            padding: '0 2rem 2rem 2rem',
        },
    },
    mainLogo: {
        width: '100%', 
        marginTop: '1rem',
        objectFit: 'contain',
        [theme.breakpoints.up('xxl')]: {
            marginTop: '1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginTop: '2rem',
        },
    },
    uzpisaNaxui: {
        marginBottom: '1rem',
        [theme.breakpoints.up('xxl')]: {
            marginBottom: '1.5rem',
        },
        [theme.breakpoints.up('xxxl')]: {
            marginBottom: '2rem',
        },
    },
    badge: {
        color: theme.myTheme.trecia,
        fontFamily: theme.myTheme.sriftas,
        fontSize: '.67rem',
        backgroundColor: '#26a69a',
        boxShadow: `0 0 0 2px ${theme.myTheme.pirma}`,
    },
}));

function ResponsiveDrawer(props) {
    
    const { window, user, setUser } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [view, setView] = useState({
        value: 8,
        title: 'Užsakymai',
        titleAdditional: '',
    });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: ''
    });
    const [productModalOpen, setProductModalOpen] = useState(false);
    const [carouselView, setCarouselView] = useState(0);
    const [maketavimoKaina, setMaketavimoKaina] = useState(0);
    const [carouselItemInfo, setCarouselItemInfo] = useState({
        id: '',
        title: '',
        bluetext: '',
        redtext: '',
        productLink: '',
        borderRadius: 0,
        size: 20,
        animation: 0,
        image: null,
        imageURL: '',
        imageOriginalName: '',
        position: 0,
    });

    const addCarouselItemButton = () => {
        setCarouselView(1);
        setCarouselItemInfo({
            id: '',
            title: '',
            bluetext: '',
            redtext: '',
            productLink: '',
            borderRadius: 0,
            size: 20,
            animation: 0,
            image: null,
            imageURL: '',
            imageOriginalName: '',
            position: 0,
        });
    };

    const [addLoyaltyModal, setAddLoyaltyModal] = useState({
        open: false,
        id: '',
        money: 0,
        discount: 0,
    });

    const [loyalty, setLoyalty] = useState([]);

    const [codeModal, setCodeModal] = useState({
        open: false,
        id: '',
        code: '',
        discount: 0,
        // oneuse: false,
        valid: new Date().setDate(new Date().getDate() + 7),
    });

    const [ordersPage, setOrdersPage] = useState(1);
    const [orders, setOrders] = useState({
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
    const [newOrders, setNewOrders] = useState(0);
    const [ordersView, setOrdersView] = useState(false);
    const [order, setOrder] = useState({
        id: '',
        clientID: '',
        clientUsername: '',
        delivery: {},
        cartItems: [],
        createdAt: '',
        price: '',
        discountPrice: '',
        nuolaidosKodas: '',
        nuolaidosKodoNuolaida: '',
        status: '',
        TRDiscount: 0,
        uzsakymoNr: 0,
        sanaudos: 0,
    });

    const [orderFilter, setOrderFilter] = useState('Visi');

    const getOrders = async (page, filter) => {
        try {
            const getOrdersRequest = await fetch("/administracija/getOrders/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `JWT ${user.token}`,
                },
                body: JSON.stringify({
                    page: page,
                    filter: filter
                }),
            });
            const getOrdersResponse = await getOrdersRequest.json();
            if (getOrdersResponse.success) {
                setOrders({
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
                setNewOrders(getOrdersResponse.newOrders);
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

    const handleCodeChange = (prop) => (event) => {
        setCodeModal(prev => ({ ...prev, [prop]: event.target.value }));
    };

    const getLoyalty = async () => {
        try {
            const getLoyaltyRequest = await fetch("/users/getLoyalty/", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const getLoyaltyResponse= await getLoyaltyRequest.json();
            if (getLoyaltyResponse.success) {
                setLoyalty(getLoyaltyResponse.data);
            } 
        } catch (error) {
            setSnackbar({
                message: `${error}`,
                open: true,
            });
        }
    };

    const handleLoyaltyAddModalChange = (prop) => (event) => {
        setAddLoyaltyModal(prev => ({ ...prev, [prop]: event.target.value }));
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackbar({
            message: '',
            open: false,
        });
    };

    const handleLogOut = async (e) => {
        e.preventDefault();
        fetch("/users/logout/", {
            credentials: "include",
            headers: {
            "Content-Type": "application/json",
            "authorization": `JWT ${user.token}`,
            },
        }).then(async response => {
            localStorage.setItem("logout", Date.now())
            setUser({
                token: null,
                loggedIn: false,
                username: '',
                personalas: false,
                administracija: false,
            });
        })
    };

    const saveSettings = async () => {
        try {
            const settingsReq = await fetch("/administracija/saveSettings/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `JWT ${user.token}`,
                },
                body: JSON.stringify({
                    maketavimoKaina: maketavimoKaina,
                }),
            });
            const settingsResponse = await settingsReq.json();
            if (settingsResponse.success) {
                setSnackbar({
                    message: 'Nustatymai atnaujinti.',
                    open: true,
                });
            } else {
                setSnackbar({
                    message: 'Klaida! Pabandykite dar karta.',
                    open: true,
                });
            }
        } catch (error) {
            setSnackbar({
                message: 'Klaida! Pabandykite dar karta.',
                open: true,
            });
        }
    };

    useEffect(() => {
        getLoyalty();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        getOrders(ordersPage, orderFilter);
        // eslint-disable-next-line
    }, [ordersPage, orderFilter]);

    useEffect(() => {
        const timer = setTimeout(() => {
            getOrders(ordersPage, orderFilter);
        }, 60 * 1000);
        return () => {
            clearTimeout(timer);
        };
        // eslint-disable-next-line
    }, [getOrders]);

    useEffect(() => {
        if (!ordersView) {
            setOrder({
                id: '',
                clientID: '',
                clientUsername: '',
                delivery: {},
                cartItems: [],
                createdAt: '',
                price: '',
                discountPrice: '',
                nuolaidosKodas: '',
                nuolaidosKodoNuolaida: '',
                status: '',
                TRDiscount: 0,
                sanaudos: 0,
                uzsakymoNr: 0
            });
        }
        // eslint-disable-next-line
    }, [ordersView]);

    const drawer = (
        <div className={classes.toolbarContainer}>
            <div className={classes.toolbar}>
                <Box dispay='flex' justifyContent='center' alignItems='center' style={{paddingTop: '.2rem'}} classes={{root: classes.logoBox}}>
                    <img src={Treklama01} alt='Tavo reklama' className={classes.mainLogo}/>
                </Box>
            </div>
            <Grid container className={classes.uzpisaNaxui}>
                <Grid item xl={3} lg={3} md={3} sm={3} xs={3}> 
                    <FaUser size={24} className={classes.icon}/> 
                </Grid>
                <Grid item xl={9} lg={9} md={9} sm={9} xs={9}> 
                    <Box>
                        <p className={classes.text}>{user.username}</p>
                        <a className={classes.link} href="/" onClick={(e) => handleLogOut(e)}>Atsijungti</a>
                    </Box>
                </Grid>
            </Grid>
            <Divider />
            <List>
                <ListItem className={classes.menuItem} button onClick={() => {
                    setOrdersPage(1);
                    setOrdersView(false);
                    if (view.value !== 8) {
                        setView({value: 8, title: 'Užsakymai', titleAdditional: ''})
                    }
                    if (isWidthDown('md', props.width)) {
                        handleDrawerToggle();
                    }
                }}>
                    <ListItemIcon classes={{root: classes.menuicon}}>
                        <Badge 
                            badgeContent={newOrders} 
                            invisible={newOrders <= 0} 
                            classes={{badge: classes.badge}}
                            anchorOrigin={{ 
                                vertical: 'top', 
                                horizontal: 'right'
                            }}
                        >
                            <FaClipboardList size={24} />
                        </Badge>
                    </ListItemIcon>
                    <ListItemText primary='Užsakymai' classes={{root: classes.menutext}} disableTypography={true}/>
                </ListItem>
                <ListItem className={classes.menuItem} button onClick={() => {
                    if (view.value !== 4) {
                        setView({value: 4, title: 'Statistika', titleAdditional: ''})
                    }
                    if (isWidthDown('md', props.width)) {
                        handleDrawerToggle();
                    }
                }}>
                    <ListItemIcon classes={{root: classes.menuicon}}><FaChartLine size={24} /></ListItemIcon>
                    <ListItemText primary='Statistika' classes={{root: classes.menutext}} disableTypography={true}/>
                </ListItem>
                <ListItem className={classes.menuItem} button onClick={() => {
                    if (view.value !== 0) {
                        setView({value: 0, title: 'Produktai', titleAdditional: ''})
                    }
                    if (isWidthDown('md', props.width)) {
                        handleDrawerToggle();
                    }
                }}>
                    <ListItemIcon classes={{root: classes.menuicon}}><FaBoxOpen size={24} /></ListItemIcon>
                    <ListItemText primary='Produktai' classes={{root: classes.menutext}} disableTypography={true}/>
                </ListItem>
                <ListItem className={classes.menuItem} button onClick={() => {
                    if (view.value !== 1) {
                        setView({value: 1, title: 'Paskyros', titleAdditional: ''});
                    }
                    if (isWidthDown('md', props.width)) {
                        handleDrawerToggle();
                    }
                }}>
                    <ListItemIcon classes={{root: classes.menuicon}}><FaUserFriends size={24} /></ListItemIcon>
                    <ListItemText primary='Paskyros' classes={{root: classes.menutext}} disableTypography={true}/>
                </ListItem>
                <ListItem className={classes.menuItem} button onClick={() => {
                    if (view.value !== 2) {
                        setView({value: 2, title: 'Karuselė', titleAdditional: ''});
                    } 
                    if (isWidthDown('md', props.width)) {
                        handleDrawerToggle();
                    }
                    setCarouselView(0);
                }}>
                    <ListItemIcon classes={{root: classes.menuicon}}><MdViewCarousel size={24} /></ListItemIcon>
                    <ListItemText primary='Karuselė' classes={{root: classes.menutext}} disableTypography={true}/>
                </ListItem>
                <ListItem className={classes.menuItem} button onClick={() => {
                    if (view.value !== 5) {
                        setView({value: 5, title: 'El. Paštas', titleAdditional: ''})
                    }
                    if (isWidthDown('md', props.width)) {
                        handleDrawerToggle();
                    }
                }}>
                    <ListItemIcon classes={{root: classes.menuicon}}><HiMail size={24} /></ListItemIcon>
                    <ListItemText primary='El. Paštas' classes={{root: classes.menutext}} disableTypography={true}/>
                </ListItem>
                <ListItem className={classes.menuItem} button onClick={() => {
                    if (view.value !== 6) {
                        setView({value: 6, title: 'Tavo Reklama klubas', titleAdditional: ''})
                    }
                    if (isWidthDown('md', props.width)) {
                        handleDrawerToggle();
                    }
                }}>
                    <ListItemIcon classes={{root: classes.menuicon}}><FaCrown size={24} /></ListItemIcon>
                    <ListItemText primary='TR Klubas' classes={{root: classes.menutext}} disableTypography={true}/>
                </ListItem>
                <ListItem className={classes.menuItem} button onClick={() => {
                    if (view.value !== 7) {
                        setView({value: 7, title: 'Nuolaidų kodai', titleAdditional: ''})
                    }
                    if (isWidthDown('md', props.width)) {
                        handleDrawerToggle();
                    }
                }}>
                    <ListItemIcon classes={{root: classes.menuicon}}><FaPercent size={24} /></ListItemIcon>
                    <ListItemText primary='Nuolaidų kodai' classes={{root: classes.menutext}} disableTypography={true}/>
                </ListItem>
                <ListItem className={classes.menuItem} button onClick={() => {
                    if (view.value !== 9) {
                        setView({value: 9, title: 'Nustatymai', titleAdditional: ''})
                    }
                    if (isWidthDown('md', props.width)) {
                        handleDrawerToggle();
                    }
                }}>
                    <ListItemIcon classes={{root: classes.menuicon}}><MdSettings size={24} /></ListItemIcon>
                    <ListItemText primary='Nustatymai' classes={{root: classes.menutext}} disableTypography={true}/>
                </ListItem>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <Snackbar
                anchorOrigin={{vertical:'bottom', horizontal: 'left' }}
                open={snackbar.open}
                onClose={handleSnackbarClose}
                message={snackbar.message}
                ContentProps={{
                    className: classes.snackbar
                }}
                TransitionComponent={Grow}
                autoHideDuration={3000}
                key={snackbar.message}
            />
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon style={{color: theme.myTheme.sriftoSpalva}}/>
                    </IconButton>
                    <Grid container dispay='flex' justifyContent='flex-start' alignItems='center'>
                        <Grid 
                            item 
                            xl={3} 
                            lg={3} 
                            md={view.value === 0 || view.value === 2 || view.value === 6 || view.value === 7 || view.value === 8 || view.value === 9 ? 4 : 12} 
                            sm={view.value === 0 || view.value === 2 || view.value === 6 || view.value === 7 || view.value === 8 || view.value === 9 ? 6 : 12} 
                            xs={view.value === 0 || view.value === 2 || view.value === 6 || view.value === 7 || view.value === 8 || view.value === 9 ? 6 : 12}
                        >
                            <Box dispay='flex' justifyContent='flex-start' alignItems='flex-start' >
                                <h1 className={classes.logo} style={{textAlign: 'left'}}>{view.title} {view.titleAdditional}</h1>
                            </Box>
                        </Grid>
                        {view.value === 8 && 
                            <Grid item xl={9} lg={9} md={8} sm={6} xs={6}>
                                {ordersView ?
                                    <Box dispay='flex' justifyContent='center' alignItems='center'>
                                        <Button classes={{root: classes.addButton}} onClick={() => setOrdersView(false)}>Atgal</Button>
                                    </Box>  
                                :
                                    <Box dispay='flex' flexWrap='wrap' justifyContent='center' alignItems='center'>
                                        <Button 
                                            classes={{root: classes.filterButton}} 
                                            style={orderFilter !== 'Visi' ?
                                                    {
                                                        backgroundColor: '#e9c46a',
                                                    }
                                                :
                                                    {
                                                        backgroundColor: '#e9c46a',
                                                        boxShadow: '0 5px 0 0 #1D3557'
                                                    }
                                            }
                                            onClick={() => setOrderFilter('Visi')}
                                        >
                                            Visi
                                        </Button>
                                        <Button 
                                            classes={{root: classes.filterButton}}
                                            style={orderFilter !== 'Apmokėti' ?
                                                    {
                                                        backgroundColor: '#f4a261',
                                                    }
                                                :
                                                    {
                                                        backgroundColor: '#f4a261',
                                                        boxShadow: '0 5px 0 0 #1D3557'
                                                    }
                                            }
                                            onClick={() => setOrderFilter('Apmokėti')}
                                        >
                                            Apmokėti
                                        </Button>
                                        <Button 
                                            classes={{root: classes.filterButton}}
                                            style={orderFilter !== 'Įvykdyti' ?
                                                    {
                                                        backgroundColor: '#26a69a',
                                                    }
                                                :
                                                    {
                                                        backgroundColor: '#26a69a',
                                                        boxShadow: '0 5px 0 0 #1D3557'
                                                    }
                                            }
                                            onClick={() => setOrderFilter('Įvykdyti')}
                                        >
                                            Įvykdyti
                                        </Button>
                                        <Button 
                                            classes={{root: classes.filterButton}}
                                            style={orderFilter !== 'Pateikti' ?
                                                    {
                                                        backgroundColor: '#457B9D',
                                                    }
                                                :
                                                    {
                                                        backgroundColor: '#457B9D',
                                                        boxShadow: '0 5px 0 0 #1D3557'
                                                    }
                                            }
                                            onClick={() => setOrderFilter('Pateikti')}
                                        >
                                            Pateikti
                                        </Button>
                                        <Button 
                                            classes={{root: classes.filterButton}}
                                            style={ orderFilter !== 'Atšaukti' ?
                                                    {
                                                        backgroundColor: '#b61624',
                                                    }
                                                :
                                                    {
                                                        backgroundColor: '#b61624',
                                                        boxShadow: '0 5px 0 0 #1D3557'
                                                    }
                                            }
                                            onClick={() => setOrderFilter('Atšaukti')}
                                        >
                                            Atšaukti
                                        </Button>
                                    </Box>  
                                }
                            </Grid>
                        } 
                        {view.value === 0 && user.administracija &&
                            <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
                                <Box dispay='flex' justifyContent='center' alignItems='center'>
                                    <Button classes={{root: classes.addButton}} onClick={() => setProductModalOpen(true)}>Pridėti produktą</Button>
                                </Box>  
                            </Grid>
                        } 
                        {view.value === 2 && carouselView === 0 && user.administracija &&
                            <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
                                <Box dispay='flex' justifyContent='center' alignItems='center'>
                                    <Button classes={{root: classes.addButton}} onClick={() => addCarouselItemButton()}>Pridėti</Button>
                                </Box>  
                            </Grid>
                        } 
                        {view.value === 6 && user.administracija &&
                            <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
                                <Box dispay='flex' justifyContent='center' alignItems='center'>
                                    <Button classes={{root: classes.addButton}} onClick={() => setAddLoyaltyModal({ ...addLoyaltyModal, open: true })}>Pridėti lygį</Button>
                                </Box>  
                            </Grid>
                        } 
                        {view.value === 7 && user.administracija &&
                            <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
                                <Box dispay='flex' justifyContent='center' alignItems='center'>
                                    <Button classes={{root: classes.addButton}} onClick={() => setCodeModal({ ...codeModal, open: true, valid: new Date().setDate(new Date().getDate() + 7) })}>Pridėti kodą</Button>
                                </Box>  
                            </Grid>
                        } 
                        {view.value === 9 && user.administracija &&
                            <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
                                <Box dispay='flex' justifyContent='center' alignItems='center'>
                                    <Button classes={{root: classes.addButton}} onClick={() => saveSettings()} >Išsaugoti</Button>
                                </Box>  
                            </Grid>
                        } 
                    </Grid>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, 
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden mdDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Box className={classes.contentInner}>
                    {
                        {
                            0: <Products user={user} setSnackbar={setSnackbar} productModalOpen={productModalOpen} setProductModalOpen={setProductModalOpen}/>,
                            1: <AccountsV2 setOrdersView={setOrdersView} setOrder={setOrder} user={user} setSnackbar={setSnackbar} setView={setView} view={view} loyalty={loyalty} getOrders={getOrders} ordersPage={ordersPage} orderFilter={orderFilter}/>,     
                            2: <Carousel user={user} setSnackbar={setSnackbar} carouselView={carouselView} setCarouselView={setCarouselView} carouselItemInfo={carouselItemInfo} setCarouselItemInfo={setCarouselItemInfo}/>,
                            4: <SalesStats user={user} setSnackbar={setSnackbar} />,
                            5: <Email user={user} setSnackbar={setSnackbar}/>,
                            6: <Loyalty user={user} setSnackbar={setSnackbar} addLoyaltyModal={addLoyaltyModal} setAddLoyaltyModal={setAddLoyaltyModal} handleLoyaltyAddModalChange={handleLoyaltyAddModalChange} loyalty={loyalty} getLoyalty={getLoyalty}/>,
                            7: <DiscountCodes user={user} setSnackbar={setSnackbar} codeModal={codeModal} setCodeModal={setCodeModal} handleCodeChange={handleCodeChange}/>,
                            8: <Orders user={user} orderFilter={orderFilter} getOrders={getOrders} newOrders={newOrders} setOrdersPage={setOrdersPage} orders={orders} ordersPage={ordersPage} ordersView={ordersView} setOrdersView={setOrdersView} order={order} setOrder={setOrder} setSnackbar={setSnackbar}/>,
                            9: <Settings maketavimoKaina={maketavimoKaina} setMaketavimoKaina={setMaketavimoKaina} setSnackbar={setSnackbar}/>,
                        }[view.value]
                    }
                </Box>
            </main>
        </div>
    );
}

ResponsiveDrawer.propTypes = {
    window: PropTypes.func,
};

export default withWidth()(ResponsiveDrawer);
